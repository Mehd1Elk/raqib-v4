export type PlatformCode = 'CC' | 'CW' | 'OC' | 'CX' | 'PP' | 'AG' | 'ML' | 'DS' | 'CA';

export interface Platform {
  code: PlatformCode;
  name: string;
  color: string;
  description: string;
}

export type EntityType = 'BRIQUE' | 'VENTURE' | 'HOLDING' | 'ECOSYSTEM';

export interface Entity {
  id: string;
  name: string;
  color: string;
  description: string;
  type: EntityType;
}

export interface LayerDef {
  id: string;
  name: string;
  platform: PlatformCode;
  rows: number;
}

export interface Category {
  label: string;
  layers: LayerDef[];
}

export interface EntityLayers {
  entityId: string;
  categories: Category[];
}

export interface EntityStats {
  totalLayers: number;
  totalRows: number;
  platformDistribution: Record<PlatformCode, { count: number; rows: number }>;
}
