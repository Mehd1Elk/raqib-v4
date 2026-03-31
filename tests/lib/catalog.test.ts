import { findLayerRecord, getAllLayerEntries, getDatasetTotals, searchLayerRecords } from '@/lib/catalog';

describe('catalog helpers', () => {
  test('flattens all 1000 layer entries', () => {
    expect(getAllLayerEntries()).toHaveLength(1000);
  });

  test('finds the NOOS n01 layer record', () => {
    const record = findLayerRecord('noos', 'n01');

    expect(record).not.toBeNull();
    expect(record?.category.label).toContain('CLINIQUE');
    expect(record?.layer.name).toContain('Psychiatres');
    expect(record?.platform.code).toBe('CC');
  });

  test('returns null for an unknown layer record', () => {
    expect(findLayerRecord('noos', 'missing')).toBeNull();
  });

  test('searches blockchain results and includes BURHAN entries', () => {
    const results = searchLayerRecords('blockchain');

    expect(results.some((entry) => entry.entityId === 'burhan')).toBe(true);
  });

  test('computes dataset totals for layers and rows', () => {
    expect(getDatasetTotals()).toEqual({
      layers: 1000,
      rows: 587853,
    });
  });
});
