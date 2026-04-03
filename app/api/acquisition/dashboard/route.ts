import { NextResponse } from 'next/server';
import { createAcqClient } from '@/lib/acquisition/supabase';
import { mapCompanies } from '@/lib/acquisition/map-company';
import type { AcquisitionStage, DashboardData } from '@/components/acquisition/types';
import { STAGE_ORDER } from '@/components/acquisition/types';

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

  const stageCounts = new Map<AcquisitionStage, number>();
  for (const s of STAGE_ORDER) stageCounts.set(s, 0);
  for (const c of companies) stageCounts.set(c.stage, (stageCounts.get(c.stage) ?? 0) + 1);

  const total = companies.length || 1;
  const stages = STAGE_ORDER.map((s) => ({
    stage: s,
    count: stageCounts.get(s) ?? 0,
    pct: Math.round(((stageCounts.get(s) ?? 0) / total) * 100),
  }));

  const allPersonas = new Set<string>();
  const briquesMap = new Map<string, Map<string, number>>();

  for (const c of companies) {
    for (const p of c.personas ?? []) allPersonas.add(p);
    for (const b of c.briques ?? []) {
      if (!briquesMap.has(b)) briquesMap.set(b, new Map());
      const sectorMap = briquesMap.get(b)!;
      sectorMap.set(c.sector, (sectorMap.get(c.sector) ?? 0) + 1);
    }
  }

  const brique_sector_matrix = Array.from(briquesMap.entries()).map(([brique, sectorMap]) => ({
    brique,
    sectors: Object.fromEntries(sectorMap),
  }));

  const dashboard: DashboardData = {
    total_companies: companies.length,
    p0_count: companies.filter((c) => c.priority === 'P0').length,
    pipeline_active: companies.filter((c) => c.stage !== 'identified').length,
    signed_count: companies.filter((c) => c.stage === 'signed').length,
    revenue_estimate_total: companies.reduce((sum, c) => sum + (c.revenue_estimate ?? 0), 0),
    personas_covered: allPersonas.size,
    stages,
    brique_sector_matrix,
    top_10: companies.slice(0, 10),
  };

  return NextResponse.json(dashboard);
}
