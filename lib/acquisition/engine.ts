import type { AcqCompany, AcqRegulation, PersonaType } from './types';

export function computeTier(revenue_b: number): string {
  if (revenue_b >= 50) return 'Tier 0';
  if (revenue_b >= 5) return 'Tier 1';
  if (revenue_b >= 0.5) return 'Tier 2';
  return 'Tier 3';
}

export function computeScore(eigen_briques: string): number {
  const len = eigen_briques.replace(/[^NAMBYRZQ]/g, '').length;
  return Math.min(10, Math.max(1, Math.round(len * 1.5)));
}

export function computePriority(score: number): 'P0' | 'P1' | 'P2' {
  if (score >= 9) return 'P0';
  if (score >= 7) return 'P1';
  return 'P2';
}

export function computePersonas(eigen_briques: string): PersonaType[] {
  const personas: Set<PersonaType> = new Set();
  if (eigen_briques.includes('N')) personas.add('drh');
  if (eigen_briques.includes('A')) personas.add('dpo');
  if (eigen_briques.includes('B')) { personas.add('cto'); personas.add('rse'); personas.add('achats'); }
  if (eigen_briques.includes('M')) { personas.add('cto'); personas.add('cfo'); }
  if (eigen_briques.includes('Z')) { personas.add('cfo'); personas.add('achats'); }
  if (eigen_briques.includes('Y')) personas.add('drh');
  if (eigen_briques.includes('R')) personas.add('rse');
  return Array.from(personas);
}

export function matchRegulations(company: AcqCompany, regulations: AcqRegulation[]): AcqRegulation[] {
  return regulations.filter(reg =>
    reg.applies_to_sectors.includes(company.sector) &&
    (company.employees_k * 1000) >= reg.applies_to_min_employees
  );
}

export function computeRevenue(tier: string): number {
  switch (tier) {
    case 'Tier 0': return 1950000;
    case 'Tier 1': return 150000;
    case 'Tier 2': return 15000;
    case 'Tier 3': return 1000;
    default: return 0;
  }
}
