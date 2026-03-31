import type { Json } from '@/lib/supabase/types';

/** Donnee geographique generique extraite du JSONB */
export interface GeoEntry {
  id: string;
  layerId: string;
  pays?: string;
  ville?: string;
  lat?: number;
  lng?: number;
  data: Record<string, Json | undefined>;
  confidence: number | null;
  source: string | null;
}

/** Donnee choropleth : pays + valeur numerique */
export interface ChoroplethDatum {
  countryCode: string;
  countryName: string;
  value: number;
  label?: string;
}

/** Marqueur pour PinMap */
export interface PinDatum {
  id: string;
  lat: number;
  lng: number;
  title: string;
  subtitle?: string;
  entityId?: string;
  data: Record<string, Json | undefined>;
}

/** Segment de flux pour FlowMap */
export interface FlowDatum {
  id: string;
  from: { lat: number; lng: number; name: string };
  to: { lat: number; lng: number; name: string };
  value: number;
  label?: string;
}

/** Point de chaleur pour HeatMap */
export interface HeatDatum {
  lat: number;
  lng: number;
  intensity: number;
  label?: string;
}

/** Etape d'itineraire pour RouteMap */
export interface RouteDatum {
  order: number;
  city: string;
  lat: number;
  lng: number;
  tripLabel?: string;
  dates?: string;
}

/** Props communes a tous les composants carte */
export interface BaseMapProps {
  className?: string;
  height?: number | string;
  interactive?: boolean;
}
