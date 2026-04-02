import type { Country, SearchItem } from './types';

export function getRiskClass(score: number): 'low' | 'medium' | 'high' {
  if (score <= 3) return 'low';
  if (score <= 6) return 'medium';
  return 'high';
}

export function getRiskColor(score: number): string {
  if (score <= 3) return 'var(--green)';
  if (score <= 6) return 'var(--orange)';
  return 'var(--red)';
}

export function getRecommendationClass(reco: string): 'invest' | 'observe' | 'caution' | 'avoid' {
  const lower = reco.toLowerCase();
  if (lower.startsWith('investir')) return 'invest';
  if (lower.startsWith('prudence') || lower.includes('prudence')) return 'caution';
  if (lower.startsWith('éviter') || lower.includes('éviter') || lower.includes('risque extrême') || lower.includes('risque extrêmement')) return 'avoid';
  return 'observe';
}

export function getRecommendationLabel(reco: string): string {
  const lower = reco.toLowerCase();
  if (lower.startsWith('investir')) return 'Investir';
  if (lower.startsWith('prudence') || lower.includes('prudence')) return 'Prudence';
  if (lower.startsWith('éviter') || lower.includes('éviter')) return 'Éviter';
  if (lower.includes('risque extrême') || lower.includes('risque extrêmement')) return 'Prudence extrême';
  if (lower.startsWith('sélectif') || lower.startsWith('observer')) return 'Sélectif';
  if (lower.includes('cibler') || lower.includes('secteur') || lower.includes('hub') || lower.includes('pétrole') || lower.includes('manganèse') || lower.includes('uranium') || lower.includes('tourisme')) return 'Sélectif';
  return 'Observer';
}

export function filterSearchIndex(items: SearchItem[], query: string): SearchItem[] {
  const q = query.toLowerCase().trim();
  if (q.length < 2) return [];
  return items.filter(item => item.name.toLowerCase().includes(q)).slice(0, 15);
}

export function getInitials(name: string): string {
  return name.split(' ').map(w => w[0]).slice(0, 2).join('');
}

export function parseTrend(trend: string): { direction: 'up' | 'down' | 'flat'; value: string } {
  if (trend.includes('↑')) return { direction: 'up', value: trend.replace('↑ ', '') };
  if (trend.includes('↓')) return { direction: 'down', value: trend.replace('↓ ', '') };
  return { direction: 'flat', value: trend.replace('→ ', '') };
}
