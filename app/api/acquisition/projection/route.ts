import { NextResponse } from 'next/server';
import { createAcqClient } from '@/lib/acquisition/supabase';
import { computeRevenue } from '@/lib/acquisition/engine';

export async function GET() {
  const supabase = await createAcqClient();
  const { data: companies, error } = await supabase.from('acq_companies').select('tier, sector, eigen_briques, pipeline_stage');
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const rows = companies || [];
  const by_tier: Record<string, { count: number; revenue: number }> = {};
  const by_sector: Record<string, { count: number; revenue: number }> = {};
  const by_brique: Record<string, { count: number; revenue: number }> = {};
  let total = 0;

  for (const c of rows) {
    const rev = computeRevenue(c.tier);
    total += rev;

    if (!by_tier[c.tier]) by_tier[c.tier] = { count: 0, revenue: 0 };
    by_tier[c.tier].count++;
    by_tier[c.tier].revenue += rev;

    if (!by_sector[c.sector]) by_sector[c.sector] = { count: 0, revenue: 0 };
    by_sector[c.sector].count++;
    by_sector[c.sector].revenue += rev;

    for (const ch of c.eigen_briques || '') {
      if ('NAMBYRZQ'.includes(ch)) {
        if (!by_brique[ch]) by_brique[ch] = { count: 0, revenue: 0 };
        by_brique[ch].count++;
        by_brique[ch].revenue += rev;
      }
    }
  }

  return NextResponse.json({ by_tier, by_sector, by_brique, total });
}
