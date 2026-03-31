import { searchLayerRecords } from '@/lib/catalog';

describe('search layer records', () => {
  test('matches case-insensitively', () => {
    const lowercase = searchLayerRecords('psychiatre').map((entry) => entry.layer.id);
    const uppercase = searchLayerRecords('PSYCHIATRE').map((entry) => entry.layer.id);

    expect(lowercase.length).toBeGreaterThan(0);
    expect(uppercase).toEqual(lowercase);
  });

  test('matches entity names as well as layer names', () => {
    const results = searchLayerRecords('AlgueSov');

    expect(results.length).toBeGreaterThan(0);
    expect(results.every((entry) => entry.entityId === 'alguesov')).toBe(true);
  });

  test('returns an empty array for a missing term', () => {
    expect(searchLayerRecords('term-that-does-not-exist')).toEqual([]);
  });
});
