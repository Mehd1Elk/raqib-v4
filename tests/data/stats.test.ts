import { ENTITIES } from '@/lib/constants';
import { getDatasetTotals, searchLayerRecords } from '@/lib/catalog';
import { computeEntityStats } from '@/lib/helpers';
import { ALL_ENTITY_LAYERS } from '@/lib/mock-data';

describe('dataset stats', () => {
  test('matches global row total with the sum of all entities', () => {
    const entityRows = ALL_ENTITY_LAYERS.reduce(
      (sum, entry) => sum + computeEntityStats(entry.categories).totalRows,
      0,
    );

    expect(getDatasetTotals().rows).toBe(entityRows);
  });

  test('sums platform distribution to 1000 layers', () => {
    const totalLayers = ALL_ENTITY_LAYERS.reduce(
      (sum, entry) => sum + computeEntityStats(entry.categories).totalLayers,
      0,
    );

    expect(totalLayers).toBe(1000);
  });

  test('returns only NOOS results for "psychiatre"', () => {
    const entities = new Set(searchLayerRecords('psychiatre').map((entry) => entry.entityId));

    expect(entities).toEqual(new Set(['noos']));
  });

  test('returns AMANA and AlgueSov results for "Holmarcom" in the current repository dataset', () => {
    const entities = new Set(searchLayerRecords('Holmarcom').map((entry) => entry.entityId));

    expect(entities).toEqual(new Set(['alguesov', 'amana']));
    expect(ENTITIES.some((entity) => entity.id === 'cg')).toBe(true);
    expect(ENTITIES.some((entity) => entity.id === 'cercle')).toBe(true);
  });
});
