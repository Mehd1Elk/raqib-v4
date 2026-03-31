import { getAllStaticParams, getLayerMetadata } from '@/lib/static-params';

describe('static params and metadata', () => {
  test('returns 1000 static params', () => {
    expect(getAllStaticParams()).toHaveLength(1000);
  });

  test('includes /noos/n01 in the static params', () => {
    expect(getAllStaticParams()).toContainEqual({ entity: 'noos', layer: 'n01' });
  });

  test('keeps static params unique', () => {
    const unique = new Set(getAllStaticParams().map((param) => `${param.entity}/${param.layer}`));
    expect(unique.size).toBe(1000);
  });

  test('returns full metadata for /noos/n01', () => {
    expect(getLayerMetadata('noos', 'n01')).toMatchObject({
      title: 'Psychiatres par ville/pays (annuaire) — NOOS · Raqib V4',
      entityName: 'NOOS',
      categoryName: 'I · CLINIQUE & PSYCHIATRIE',
      layerName: 'Psychiatres par ville/pays (annuaire)',
      platform: 'Claude Code',
      rows: 17200,
    });
    expect(getLayerMetadata('noos', 'n01')?.description).toContain('NOOS (BRIQUE)');
    expect(getLayerMetadata('noos', 'n01')?.description).toContain('Claude Code');
  });

  test('returns metadata for /cg/cg01 from the current dataset', () => {
    expect(getLayerMetadata('cg', 'cg01')?.layerName).toBe('Vision & Mission Eigen Group');
  });

  test('returns null for unknown params', () => {
    expect(getLayerMetadata('noos', 'missing')).toBeNull();
  });
});
