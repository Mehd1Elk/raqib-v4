import { findLayerRecord, getAllLayerEntries } from './catalog';

export interface LayerStaticParam {
  entity: string;
  layer: string;
}

export interface LayerMetadataRecord {
  title: string;
  description: string;
  entityName: string;
  categoryName: string;
  layerName: string;
  platform: string;
  rows: number;
}

export function getAllStaticParams(): LayerStaticParam[] {
  return getAllLayerEntries().map((entry) => ({
    entity: entry.entityId,
    layer: entry.layer.id,
  }));
}

export function getLayerMetadata(entityId: string, layerId: string): LayerMetadataRecord | null {
  const entry = findLayerRecord(entityId, layerId);

  if (!entry) {
    return null;
  }

  return {
    title: `${entry.layer.name} — ${entry.entity.name} · Raqib V4`,
    description: `${entry.entity.name} (${entry.entity.type}) · ${entry.category.label} · ${entry.layer.name} · ${entry.platform.name} · ${entry.layer.rows.toLocaleString()} entrées prévues`,
    entityName: entry.entity.name,
    categoryName: entry.category.label,
    layerName: entry.layer.name,
    platform: entry.platform.name,
    rows: entry.layer.rows,
  };
}
