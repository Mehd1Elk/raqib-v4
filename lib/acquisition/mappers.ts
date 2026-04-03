import type { AcquisitionCompany, AcquisitionStage, Priority, Tier } from '@/components/acquisition/types';

const BRIQUE_KEY_MAP: Record<string, string> = {
  N: 'NOOS', A: 'ÆLYA', M: 'MYNε', B: 'BURHAN', Y: 'YrKnown', Z: 'MIZAN', R: 'RAQIB',
};

const EU_COUNTRIES = new Set(['FR', 'GB', 'DE', 'ES', 'PT', 'NL', 'CH', 'IT', 'BE', 'AT', 'SE', 'NO', 'DK', 'FI', 'PL', 'LU']);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function mapCompany(row: any): AcquisitionCompany {
  const tierStr: string = row.tier ?? 'Tier 3';
  const tierNum = parseInt(tierStr.replace('Tier ', ''), 10);
  const tier: Tier = ([0, 1, 2, 3].includes(tierNum) ? tierNum : 3) as Tier;

  const eigenBriques: string = row.eigen_briques ?? '';
  const briques = eigenBriques.split('').filter(c => BRIQUE_KEY_MAP[c]).map(c => BRIQUE_KEY_MAP[c]);

  return {
    id: row.id,
    name: row.name,
    sector: row.sector,
    country: row.hq ?? row.country ?? '',
    stage: (row.pipeline_stage ?? row.stage ?? 'identified') as AcquisitionStage,
    priority: (row.priority ?? 'P2') as Priority,
    tier,
    score: row.eigen_score ?? row.score ?? 0,
    briques,
    personas: [],
    revenue_estimate: row.annual_value_estimate ?? row.revenue_estimate ?? 0,
    notes: row.notes,
    region: EU_COUNTRIES.has(row.hq ?? '') ? 'EU' : 'Corridor',
    created_at: row.created_at,
    updated_at: row.updated_at,
  };
}
