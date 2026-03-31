import type { Category, EntityStats, PlatformCode } from './types';

export function computeEntityStats(categories: Category[]): EntityStats {
  const platformDistribution: Record<string, { count: number; rows: number }> = {};
  let totalLayers = 0;
  let totalRows = 0;

  for (const cat of categories) {
    for (const layer of cat.layers) {
      totalLayers++;
      totalRows += layer.rows;
      if (!platformDistribution[layer.platform]) {
        platformDistribution[layer.platform] = { count: 0, rows: 0 };
      }
      platformDistribution[layer.platform].count++;
      platformDistribution[layer.platform].rows += layer.rows;
    }
  }

  return {
    totalLayers,
    totalRows,
    platformDistribution: platformDistribution as Record<PlatformCode, { count: number; rows: number }>,
  };
}
