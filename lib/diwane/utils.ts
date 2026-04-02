import type { DiwaneSearchItem } from './types';

export function formatPrice(price: string): string {
  return price;
}

export function getMarketRankLabel(rank: number | undefined): string {
  if (!rank) return 'N/A';
  if (rank <= 5) return 'Top 5';
  if (rank <= 10) return 'Top 10';
  if (rank <= 20) return 'Top 20';
  if (rank <= 30) return 'Top 30';
  return `#${rank}`;
}

export function getMarketRankClass(rank: number | undefined): 'elite' | 'major' | 'emerging' | 'developing' {
  if (!rank) return 'developing';
  if (rank <= 5) return 'elite';
  if (rank <= 15) return 'major';
  if (rank <= 30) return 'emerging';
  return 'developing';
}

export function getMarketRankColor(rank: number | undefined): string {
  if (!rank) return 'var(--text-muted)';
  if (rank <= 5) return 'var(--orange)';
  if (rank <= 15) return 'var(--orange-light)';
  if (rank <= 30) return 'var(--camel)';
  return 'var(--text-muted)';
}

export function getRecommendationClass(reco: string): 'invest' | 'observe' | 'caution' | 'avoid' {
  const lower = reco.toLowerCase();
  if (lower.includes('investir') || lower.includes('collect')) return 'invest';
  if (lower.includes('prudence')) return 'caution';
  if (lower.includes('éviter')) return 'avoid';
  return 'observe';
}

export function getRecommendationLabel(reco: string): string {
  const lower = reco.toLowerCase();
  if (lower.includes('investir') || lower.includes('collect')) return 'Collectionner';
  if (lower.includes('prudence')) return 'Prudence';
  if (lower.includes('éviter')) return 'Éviter';
  if (lower.includes('émergent')) return 'Émergent';
  return 'Observer';
}

export function filterDiwaneSearch(items: DiwaneSearchItem[], query: string): DiwaneSearchItem[] {
  const q = query.toLowerCase().trim();
  if (q.length < 2) return [];
  return items.filter(item => item.name.toLowerCase().includes(q)).slice(0, 15);
}

export function getArtMediumIcon(medium: string): string {
  const m = medium.toLowerCase();
  if (m.includes('peinture') || m.includes('painting')) return '🎨';
  if (m.includes('sculpture')) return '🗿';
  if (m.includes('photo')) return '📷';
  if (m.includes('video') || m.includes('film')) return '🎬';
  if (m.includes('installation')) return '🏗';
  if (m.includes('textile')) return '🧵';
  if (m.includes('céramique') || m.includes('ceramic')) return '🏺';
  return '🎭';
}
