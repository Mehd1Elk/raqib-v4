import { NextRequest, NextResponse } from 'next/server';
import { createAcqClient } from '@/lib/acquisition/supabase';

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
    .select('id, name')
    .in('id', parentIds);

  const nameMap = new Map<string, string>();
  (companies || []).forEach((c: Record<string, unknown>) => nameMap.set(c.id as string, c.name as string));

  // Group by parent
  const chainsMap = new Map<string, { company_id: string; company_name: string; tiers: typeof rows; total_nodes: string; total_revenue: string }>();

  for (const row of rows) {
    const cid = row.parent_company_id as string;
    if (!chainsMap.has(cid)) {
      chainsMap.set(cid, {
        company_id: cid,
        company_name: nameMap.get(cid) || 'Inconnu',
        tiers: [],
        total_nodes: '0',
        total_revenue: '€0',
      });
    }
    chainsMap.get(cid)!.tiers.push(row);
  }

  // Compute totals
  const chains = Array.from(chainsMap.values()).map(chain => {
    const lastTier = chain.tiers[chain.tiers.length - 1];
    const totalNodes = (lastTier as Record<string, unknown>)?.count_entities as string || '0';

    let totalRev = 0;
    for (const t of chain.tiers) {
      const rev = (t as Record<string, unknown>).eigen_revenue as string || '';
      const match = rev.match(/€([\d.]+)([MK])/);
      if (match) {
        const val = parseFloat(match[1]);
        totalRev += match[2] === 'M' ? val * 1_000_000 : val * 1_000;
      }
    }

    const revStr = totalRev >= 1_000_000
      ? `€${(totalRev / 1_000_000).toFixed(1)}M/an`
      : `€${(totalRev / 1_000).toFixed(0)}K/an`;

    return { ...chain, total_nodes: totalNodes, total_revenue: revStr };
  });

  return NextResponse.json(chains);
}
