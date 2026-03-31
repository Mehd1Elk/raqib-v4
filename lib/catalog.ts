import { ENTITIES, PLATFORMS } from './constants';
import { computeEntityStats } from './helpers';
import { ALL_ENTITY_LAYERS } from './mock-data';
import type { Category, Entity, EntityStats, LayerDef, Platform } from './types';

export interface LayerCatalogEntry {
  category: Category;
  categoryIndex: number;
  entity: Entity;
  entityId: string;
  entityIndex: number;
  layer: LayerDef;
  layerIndex: number;
  platform: Platform;
  stats: EntityStats;
}

const ALL_LAYER_ENTRIES: LayerCatalogEntry[] = ALL_ENTITY_LAYERS.flatMap((entityLayers, entityIndex) => {
  const entity = ENTITIES[entityIndex];
  const stats = computeEntityStats(entityLayers.categories);

  if (!entity) {
    return [];
  }

  return entityLayers.categories.flatMap((category, categoryIndex) =>
    category.layers.flatMap((layer, layerIndex) => {
      const platform = PLATFORMS[layer.platform];

      if (!platform) {
        return [];
      }

      return [
        {
          category,
          categoryIndex,
          entity,
          entityId: entityLayers.entityId,
          entityIndex,
          layer,
          layerIndex,
          platform,
          stats,
        },
      ];
    }),
  );
});

export function getAllLayerEntries() {
  return ALL_LAYER_ENTRIES;
}

export function findLayerRecord(entityId: string, layerId: string) {
  return ALL_LAYER_ENTRIES.find((entry) => entry.entityId === entityId && entry.layer.id === layerId) ?? null;
}

export function searchLayerRecords(query: string) {
  const normalized = query.trim().toLocaleLowerCase();

  if (!normalized) {
    return [];
  }

  return ALL_LAYER_ENTRIES.filter((entry) => {
    return (
      entry.layer.id.toLocaleLowerCase().includes(normalized) ||
      entry.layer.name.toLocaleLowerCase().includes(normalized) ||
      entry.entity.name.toLocaleLowerCase().includes(normalized) ||
      entry.category.label.toLocaleLowerCase().includes(normalized) ||
      entry.platform.name.toLocaleLowerCase().includes(normalized)
    );
  });
}

export function getDatasetTotals() {
  return ALL_LAYER_ENTRIES.reduce(
    (totals, entry) => {
      totals.layers += 1;
      totals.rows += entry.layer.rows;
      return totals;
    },
    { layers: 0, rows: 0 },
  );
}
