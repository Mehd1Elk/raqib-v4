import { getAllStaticParams, getLayerMetadata } from '@/lib/static-params';

describe('static params and metadata', () => {
  test('returns 1000 static params', async () => {
    await expect(getAllStaticParams()).resolves.toHaveLength(1000);
  });

  test('includes /noos/n01 in the static params', async () => {
    await expect(getAllStaticParams()).resolves.toContainEqual({ entity: 'noos', layer: 'n01' });
  });

  test('keeps static params unique', async () => {
    const params = await getAllStaticParams();
    const unique = new Set(params.map((param) => `${param.entity}/${param.layer}`));
    expect(unique.size).toBe(1000);
  });

  test('returns full metadata for /noos/n01', async () => {
    await expect(getLayerMetadata('noos', 'n01')).resolves.toMatchObject({
      title: 'Psychiatres par ville/pays (annuaire) — NOOS · Raqib V4',
      entityName: 'NOOS',
      categoryName: 'I · CLINIQUE & PSYCHIATRIE',
      layerName: 'Psychiatres par ville/pays (annuaire)',
      platform: 'Claude Code',
      rows: 17200,
    });
    await expect(getLayerMetadata('noos', 'n01')).resolves.toMatchObject({
      description: expect.stringContaining('NOOS (BRIQUE)'),
    });
    await expect(getLayerMetadata('noos', 'n01')).resolves.toMatchObject({
      description: expect.stringContaining('Claude Code'),
    });
  });

  test('returns metadata for /cg/cg01 from the current dataset', async () => {
    await expect(getLayerMetadata('cg', 'cg01')).resolves.toMatchObject({
      layerName: 'Vision & Mission Eigen Group',
    });
  });

  test('returns null for unknown params', async () => {
    await expect(getLayerMetadata('noos', 'missing')).resolves.toBeNull();
  });
});
