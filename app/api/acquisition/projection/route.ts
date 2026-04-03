import { NextResponse } from 'next/server';
import { createAcqClient } from '@/lib/acquisition/supabase';
import { mapCompanies } from '@/lib/acquisition/map-company';
import type { Tier, ProjectionData } from '@/components/acquisition/types';
import { TIER_REVENUE } from '@/components/acquisition/types';

export async function GET() {
  const supabase = await createAcqClient();

  const { data: rows, error } = await supabase
    .from('acq_companies')
    .select('*')
    .order('eigen_score', { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const companies = mapCompanies(rows ?? []);

  // Revenue by tier
  const tierMap = new Map<Tier, { count: number; revenue: number }>();
  for (const t of [0, 1, 2, 3] as Tier[]) tierMap.set(t, { count: 0, revenue: 0 });

  for (const c of companies) {
    const entry = tierMap.get(c.tier)!;
    entry.count += 1;
    entry.revenue += TIER_REVENUE[c.tier].total;
  }

  const by_tier = ([0, 1, 2, 3] as Tier[]).map((t) => ({
    tier: t,
    count: tierMap.get(t)!.count,
    revenue: tierMap.get(t)!.revenue,
  }));

  // Revenue by brique
  const briqueMap = new Map<string, { count: number; revenue: number }>();
  for (const c of companies) {
    for (const b of c.briques ?? []) {
      if (!briqueMap.has(b)) briqueMap.set(b, { count: 0, revenue: 0 });
      const entry = briqueMap.get(b)!;
      entry.count += 1;
      entry.revenue += TIER_REVENUE[c.tier].total;
    }
  }

  const by_brique = Array.from(briqueMap.entries())
    .map(([brique, data]) => ({ brique, ...data }))
    .sort((a, b) => b.revenue - a.revenue);

  const signedCount = companies.filter((c) => c.stage === 'signed').length;
  const totalRevenue = companies.reduce((s, c) => s + TIER_REVENUE[c.tier].total, 0);
  const signedPct = companies.length ? signedCount / companies.length : 0;

  const yearly = [
    { year: 'Y1', signed_pct: signedPct * 0.25, revenue: Math.round(totalRevenue * signedPct * 0.25) },
    { year: 'Y2', signed_pct: signedPct * 0.50, revenue: Math.round(totalRevenue * signedPct * 0.50) },
    { year: 'Y3', signed_pct: signedPct * 0.75, revenue: Math.round(totalRevenue * signedPct * 0.75) },
    { year: 'Y4', signed_pct: signedPct * 1.00, revenue: Math.round(totalRevenue * signedPct * 1.00) },
  ];

  const eu_total = companies
    .filter((c) => c.region === 'EU')
    .reduce((s, c) => s + TIER_REVENUE[c.tier].total, 0);
  const corridor_total = companies
    .filter((c) => c.region === 'Corridor')
    .reduce((s, c) => s + TIER_REVENUE[c.tier].total, 0);

  const projection: ProjectionData = { by_tier, by_brique, yearly, eu_total, corridor_total };

  return NextResponse.json(projection);
}
