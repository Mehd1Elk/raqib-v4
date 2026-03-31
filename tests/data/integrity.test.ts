import { ENTITIES, PLATFORM_CODES } from '@/lib/constants';
import { ALL_ENTITY_LAYERS } from '@/lib/mock-data';

const expectedIdPrefixes = new Map<string, string>([
  ['noos', 'n'],
  ['aelya', 'a'],
  ['myne', 'm'],
  ['burhan', 'b'],
  ['yrknown', 'y'],
  ['diwane', 'd'],
  ['alguesov', 's'],
  ['amana', 'am'],
  ['cg', 'cg'],
  ['cercle', 'cd'],
]);

function getEntityCategories(entityId: string) {
  return ALL_ENTITY_LAYERS.find((entry) => entry.entityId === entityId)?.categories ?? [];
}

function flattenEntityLayers(entityId: string) {
  return getEntityCategories(entityId).flatMap((category) => category.layers);
}

function expectedLayerIds(prefix: string) {
  return Array.from({ length: 100 }, (_, index) => `${prefix}${String(index + 1).padStart(2, '0')}`);
}

describe('dataset integrity', () => {
  test('contains 10 entities', () => {
    expect(ENTITIES).toHaveLength(10);
  });

  test('contains 100 layers per entity', () => {
    for (const entity of ENTITIES) {
      expect(flattenEntityLayers(entity.id)).toHaveLength(100);
    }
  });

  test('contains 1000 layers total', () => {
    const total = ALL_ENTITY_LAYERS.flatMap((entity) => entity.categories.flatMap((category) => category.layers));
    expect(total).toHaveLength(1000);
  });

  test('contains no duplicate layer ids', () => {
    const ids = ALL_ENTITY_LAYERS.flatMap((entity) =>
      entity.categories.flatMap((category) => category.layers.map((layer) => layer.id)),
    );
    expect(new Set(ids).size).toBe(ids.length);
  });

  test('uses only valid platform codes', () => {
    const platformCodes = new Set(PLATFORM_CODES);
    const layers = ALL_ENTITY_LAYERS.flatMap((entity) => entity.categories.flatMap((category) => category.layers));

    for (const layer of layers) {
      expect(platformCodes.has(layer.platform)).toBe(true);
    }
  });

  test('stores positive row counts everywhere', () => {
    const layers = ALL_ENTITY_LAYERS.flatMap((entity) => entity.categories.flatMap((category) => category.layers));

    for (const layer of layers) {
      expect(layer.rows).toBeGreaterThan(0);
    }
  });

  test('contains 10 categories per entity', () => {
    for (const entity of ENTITIES) {
      expect(getEntityCategories(entity.id)).toHaveLength(10);
    }
  });

  test('matches expected id patterns by entity', () => {
    for (const entity of ENTITIES) {
      const prefix = expectedIdPrefixes.get(entity.id);
      expect(prefix).toBeDefined();
      expect(flattenEntityLayers(entity.id).map((layer) => layer.id)).toEqual(expectedLayerIds(prefix!));
    }
  });

  test('keeps layer names unique inside each entity', () => {
    for (const entity of ENTITIES) {
      const names = flattenEntityLayers(entity.id).map((layer) => layer.name);
      expect(new Set(names).size).toBe(names.length);
    }
  });

  test('keeps 10 layers inside each category', () => {
    for (const entity of ALL_ENTITY_LAYERS) {
      for (const category of entity.categories) {
        expect(category.layers).toHaveLength(10);
      }
    }
  });
});
