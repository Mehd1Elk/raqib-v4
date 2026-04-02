import { NextRequest, NextResponse } from 'next/server';
import { createAcqClient } from '@/lib/acquisition/supabase';
import perplexityData from '@/src/data/acquisition/supply-chain-perplexity.json';

// Build enrichment map from Perplexity JSON
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const enrichMap = new Map<string, any>();
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(perplexityData as any[]).forEach((c: any) => {
  enrichMap.set(c.company, {
    total_nodes: c.total_nodes,
    total_revenue: c.total_eigen_revenue_estimate,
    killer_insight: c.killer_insight,
    prescriptor_effect: c.prescriptor_effect,
    sector: c.sector,
  });
});

export async function GET(req: NextRequest) {
  const supabase = await createAcqClient();
  const companyId = req.nextUrl.searchParams.get('company_id');

  if (companyId) {
    const { data, error } = await supabase
      .from('acq_supply_chain')
      .select('*')
      .eq('parent_company_id', companyId)
      .order('tier', { ascending: true });
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(data || []);
  }

  // Fetch all supply chain rows
  const { data: rows, error } = await supabase
    .from('acq_supply_chain')
    .select('*')
    .order('tier', { ascending: true });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  if (!rows || rows.length === 0) return NextResponse.json([]);

  // Get unique parent company IDs
  const parentIds = [...new Set(rows.map((r: Record<string, unknown>) => r.parent_company_id as string))];

  // Fetch company names
  const { data: companies } = await supabase
    .from('acq_companies')
    .select('id, name, sector')
    .in('id', parentIds);

  const companyInfo = new Map<string, { name: string; sector: string }>();
  (companies || []).forEach((c: Record<string, unknown>) =>
    companyInfo.set(c.id as string, { name: c.name as string, sector: c.sector as string })
  );

  // Group by parent
  const chainsMap = new Map<string, {
    company_id: string;
    company_name: string;
    sector: string;
    tiers: typeof rows;
    total_nodes: string;
    total_revenue: string;
    killer_insight: string;
    prescriptor_effect: string;
  }>();

  for (const row of rows) {
    const cid = row.parent_company_id as string;
    if (!chainsMap.has(cid)) {
      const info = companyInfo.get(cid);
      const enrich = enrichMap.get(info?.name || '');
      chainsMap.set(cid, {
        company_id: cid,
        company_name: info?.name || 'Inconnu',
        sector: enrich?.sector || info?.sector || '',
        tiers: [],
        total_nodes: enrich?.total_nodes || '0',
        total_revenue: enrich?.total_revenue || '€0',
        killer_insight: enrich?.killer_insight || '',
        prescriptor_effect: enrich?.prescriptor_effect || '',
      });
    }
    chainsMap.get(cid)!.tiers.push(row);
  }

  const chains = Array.from(chainsMap.values());
  return NextResponse.json(chains);
}
