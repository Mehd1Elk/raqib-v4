import { ENTITIES, PLATFORMS } from './constants';
import { ARTIFACT_MAP } from './artifact-mapping';
import { findLayerRecord, getAllLayerEntries } from './catalog';
import type { Database } from './supabase/types';
import type { Category, Entity, LayerDef, PlatformCode } from './types';

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

export interface LayerPageRecord {
  entity: Entity;
  category: Category;
  layer: LayerDef;
  platformName: string;
  actualRows: number;
  status: string | null;
  lastPopulatedAt: string | null;
}

interface RemoteLayerRecord {
  entityColor: string;
  entityId: string;
  entityName: string;
  entityType: Entity['type'];
  categoryName: string;
  layerId: string;
  layerName: string;
  platformCode: PlatformCode;
  platformName: string;
  rows: number;
  actualRows: number;
  status: string | null;
  lastPopulatedAt: string | null;
}

let remoteLayerRecordsPromise: Promise<RemoteLayerRecord[] | null> | null = null;

const EIGEN_LAYER_NAMES: Record<string, string> = {
  ei81: 'NOOS Platform Vitrine',
  ei82: 'NOOS Platform Vitrine',
  ei83: 'BURHAN Portals Demo',
  ei84: 'AELYA Masterplan',
  ei85: 'CG Conquete 2026',
  ei86: 'Eigen Conquest Calendar',
  ei87: 'Raqib Corridor Intelligence',
  ei88: 'NOOS Constitution Juridique V2',
  ei89: 'NOOS Ecosysteme Integral',
};

function getEigenArtifactPageRecord(entityId: string, layerId: string): LayerPageRecord | null {
  if (entityId !== 'eigen') {
    return null;
  }

  const artifactName = ARTIFACT_MAP[layerId];
  const entity = ENTITIES.find((item) => item.id === 'eigen');

  if (!artifactName || !entity) {
    return null;
  }

  const layerName =
    EIGEN_LAYER_NAMES[layerId] ??
    artifactName.replace(/\.(jsx|html)$/i, '').replace(/-/g, ' ');

  return {
    entity,
    category: { label: 'IX · Interfaces & Artefacts', layers: [] },
    layer: {
      id: layerId,
      name: layerName,
      platform: 'AG',
      rows: 1,
    },
    platformName: PLATFORMS.AG.name,
    actualRows: 1,
    status: 'artifact',
    lastPopulatedAt: null,
  };
}

function getFallbackPageRecord(entityId: string, layerId: string): LayerPageRecord | null {
  const eigenRecord = getEigenArtifactPageRecord(entityId, layerId);

  if (eigenRecord) {
    return eigenRecord;
  }

  const entry = findLayerRecord(entityId, layerId);

  if (!entry) {
    return null;
  }

  return {
    entity: entry.entity,
    category: entry.category,
    layer: entry.layer,
    platformName: entry.platform.name,
    actualRows: 0,
    status: null,
    lastPopulatedAt: null,
  };
}

function formatLayerMetadata(record: LayerPageRecord): LayerMetadataRecord {
  return {
    title: `${record.layer.name} — ${record.entity.name} · Raqib V4`,
    description: `${record.entity.name} (${record.entity.type}) · ${record.category.label} · ${record.layer.name} · ${record.platformName} · ${record.layer.rows.toLocaleString()} entrées prévues`,
    entityName: record.entity.name,
    categoryName: record.category.label,
    layerName: record.layer.name,
    platform: record.platformName,
    rows: record.layer.rows,
  };
}

async function fetchRemoteLayerRecords(): Promise<RemoteLayerRecord[] | null> {
  if (process.env.NODE_ENV === 'test') {
    return null;
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return null;
  }

  const { createClient } = await import('@supabase/supabase-js');
  const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });

  // Supabase default limit is 1000 rows — fetch in two pages to get all 1100+
  const selectQuery = 'id, name, entity_id, platform_code, target_rows, actual_rows, status, last_populated_at, categories!inner(name), entities!inner(name, type, color), platforms!inner(name)';

  const { data: page1, error: err1 } = await supabase
    .from('layers')
    .select(selectQuery)
    .order('entity_id')
    .order('category_id')
    .order('id')
    .range(0, 999);

  if (err1) throw err1;

  const { data: page2, error: err2 } = await supabase
    .from('layers')
    .select(selectQuery)
    .order('entity_id')
    .order('category_id')
    .order('id')
    .range(1000, 1999);

  if (err2) throw err2;

  const data = [...(page1 ?? []), ...(page2 ?? [])];

  return data.map((row) => {
    const category = row.categories as unknown as { name: string };
    const entity = row.entities as unknown as { name: string; type: Entity['type']; color: string };
    const platform = row.platforms as unknown as { name: string };

    return {
      entityColor: entity.color,
      entityId: row.entity_id,
      entityName: entity.name,
      entityType: entity.type,
      categoryName: category.name,
      layerId: row.id,
      layerName: row.name,
      platformCode: row.platform_code as PlatformCode,
      platformName: platform.name,
      rows: row.target_rows ?? 0,
      actualRows: row.actual_rows ?? 0,
      status: row.status,
      lastPopulatedAt: row.last_populated_at,
    };
  });
}

async function getRemoteLayerRecords() {
  if (!remoteLayerRecordsPromise) {
    remoteLayerRecordsPromise = fetchRemoteLayerRecords().catch(() => null);
  }

  return remoteLayerRecordsPromise;
}

function toEntity(record: RemoteLayerRecord): Entity {
  return (
    ENTITIES.find((entity) => entity.id === record.entityId) ?? {
      id: record.entityId,
      name: record.entityName,
      color: record.entityColor,
      description: '',
      type: record.entityType,
    }
  );
}

export async function getAllStaticParams(): Promise<LayerStaticParam[]> {
  const remoteRecords = await getRemoteLayerRecords();

  if (remoteRecords) {
    return remoteRecords.map((record) => ({
      entity: record.entityId,
      layer: record.layerId,
    }));
  }

  const params = getAllLayerEntries().map((entry) => ({
    entity: entry.entityId,
    layer: entry.layer.id,
  }));

  if (process.env.NODE_ENV !== 'test') {
    return [
      ...params,
      ...Object.keys(ARTIFACT_MAP).map((layer) => ({
        entity: 'eigen',
        layer,
      })),
    ];
  }

  return params;
}

export async function getLayerPageRecord(entityId: string, layerId: string): Promise<LayerPageRecord | null> {
  const remoteRecords = await getRemoteLayerRecords();

  if (remoteRecords) {
    const record = remoteRecords.find((entry) => entry.entityId === entityId && entry.layerId === layerId);

    if (record) {
      return {
        entity: toEntity(record),
        category: { label: record.categoryName, layers: [] },
        layer: {
          id: record.layerId,
          name: record.layerName,
          platform: record.platformCode,
          rows: record.rows,
        },
        platformName: PLATFORMS[record.platformCode]?.name ?? record.platformName,
        actualRows: record.actualRows,
        status: record.status,
        lastPopulatedAt: record.lastPopulatedAt,
      };
    }
  }

  return getFallbackPageRecord(entityId, layerId);
}

export async function getLayerMetadata(entityId: string, layerId: string): Promise<LayerMetadataRecord | null> {
  const record = await getLayerPageRecord(entityId, layerId);

  if (!record) {
    return null;
  }

  return formatLayerMetadata(record);
}
