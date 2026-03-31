import { computeEntityStats } from '@/lib/helpers';
import { getEntityLayers } from '@/lib/mock-data';

describe('computeEntityStats', () => {
  test('computes 100 total layers for NOOS', () => {
    expect(computeEntityStats(getEntityLayers('noos')).totalLayers).toBe(100);
  });

  test('computes the expected NOOS row total', () => {
    expect(computeEntityStats(getEntityLayers('noos')).totalRows).toBe(222560);
  });

  test('computes 100 total layers for CG SA', () => {
    expect(computeEntityStats(getEntityLayers('cg')).totalLayers).toBe(100);
  });

  test('keeps platform distribution counts aligned with the layer total', () => {
    const stats = computeEntityStats(getEntityLayers('alguesov'));
    const platformLayerCount = Object.values(stats.platformDistribution).reduce(
      (sum, platform) => sum + platform.count,
      0,
    );

    expect(platformLayerCount).toBe(stats.totalLayers);
  });
});
