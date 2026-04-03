import type { AcquisitionCompany, AcquisitionStage, Priority, Tier } from '@/components/acquisition/types';
import { STAGE_ORDER } from '@/components/acquisition/types';

// Maps DB row (acq_companies) → frontend AcquisitionCompany type
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function mapCompany(row: any): AcquisitionCompany {
  // Map pipeline_stage → stage (handle both old and new column names)
  const rawStage = row.stage || row.pipeline_stage || 'identified';
  const stageMap: Record<string, AcquisitionStage> = {
    identified: 'identified',
    qualified: 'contacted',
    contacted: 'contacted',
    approached: 'meeting_done',
    meeting_done: 'meeting_done',
    demo: 'proposal_sent',
    proposal_sent: 'proposal_sent',
    negotiation: 'negotiation',
    signed: 'signed',
    churned: 'churned',
  };
  const stage: AcquisitionStage = stageMap[rawStage] || 'identified';

  // Map eigen_briques string → briques array
  const briquesStr = row.briques || row.eigen_briques || '';
  const briqueMap: Record<string, string> = {
    N: 'NOOS', A: 'ÆLYA', M: 'MYNε', B: 'BURHAN',
    Y: 'YrKnown', Z: 'MIZAN', R: 'RAQIB',
  };
  const briques: string[] = Array.isArray(briquesStr)
    ? briquesStr
    : briquesStr.split('').filter((c: string) => briqueMap[c]).map((c: string) => briqueMap[c]);

  // Map tier
  const rawTier = row.tier;
  let tier: Tier = 1;
  if (typeof rawTier === 'number') tier = Math.min(3, Math.max(0, rawTier)) as Tier;
  else if (typeof rawTier === 'string') {
    const m = rawTier.match(/(\d)/);
    if (m) tier = Math.min(3, parseInt(m[1])) as Tier;
  }

  return {
    id: row.id,
    name: row.name || '',
    sector: row.sector || '',
    country: row.country || row.hq || '',
    stage,
    priority: (row.priority || 'P2') as Priority,
    tier,
    score: row.score ?? row.eigen_score ?? 50,
    briques,
    personas: row.personas || row.suggested_personas || [],
    revenue_estimate: row.revenue_estimate ?? row.annual_value_estimate ?? 0,
    contact_name: row.contact_name,
    contact_email: row.contact_email,
    notes: row.notes,
    region: (row.region || (row.corridor_countries?.length > 0 ? 'Corridor' : 'EU')) as 'EU' | 'Corridor',
    created_at: row.created_at || '',
    updated_at: row.updated_at || '',
  };
}

export function mapCompanies(rows: unknown[]): AcquisitionCompany[] {
  return (rows || []).map(mapCompany);
}
