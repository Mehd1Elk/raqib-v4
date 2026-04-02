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

  // Return all 5 chains grouped by parent company
  const { data: rows, error } = await supabase
    .from('acq_supply_chain')
    .select('*, acq_companies!parent_company_id(id, name)')
    .order('tier', { ascending: true });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // Group by parent
  const chainsMap = new Map<string, { company_id: string; company_name: string; tiers: typeof rows; total_nodes: string; total_revenue: string }>();

  for (const row of (rows || [])) {
    const company = (row as Record<string, unknown>).acq_companies as { id: string; name: string } | null;
    const cid = row.parent_company_id;
    if (!chainsMap.has(cid)) {
      chainsMap.set(cid, {
        company_id: cid,
        company_name: company?.name || 'Inconnu',
        tiers: [],
        total_nodes: '0',
        total_revenue: '€0',
      });
    }
    chainsMap.get(cid)!.tiers.push(row);
  }

  // Compute totals
  const chains = Array.from(chainsMap.values()).map(chain => {
    // Parse total nodes from last tier (biggest)
    const lastTier = chain.tiers[chain.tiers.length - 1];
    const totalNodes = lastTier?.count_entities || '0';

    // Sum revenue
    let totalRev = 0;
    for (const t of chain.tiers) {
      const match = (t.eigen_revenue || '').match(/€([\d.]+)([MK])/);
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
