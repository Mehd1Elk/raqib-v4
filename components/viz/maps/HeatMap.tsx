'use client';

import { useMemo } from 'react';
import MapGL, { Source, Layer } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useMapEntries } from './use-map-entries';
import { MAP_STYLE, DEFAULT_CENTER, DEFAULT_ZOOM } from './map-constants';
import type { BaseMapProps, HeatDatum } from './map-types';

interface HeatMapProps extends BaseMapProps {
  /** IDs des layers donnees terrain AlgueSov (s71-s80) */
  layerIds: string[];
  /** Champ JSONB latitude */
  latField?: string;
  /** Champ JSONB longitude */
  lngField?: string;
  /** Champ JSONB pour l'intensite */
  intensityField?: string;
  /** Donnees pre-calculees */
  data?: HeatDatum[];
  /** Label legende */
  legendLabel?: string;
  /** Rayon du heatmap en pixels */
  radius?: number;
  /** Centre de la carte */
  center?: { longitude: number; latitude: number };
  /** Zoom initial */
  zoom?: number;
}

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? '';

/**
 * HeatMap — Carte de chaleur pour les donnees terrain AlgueSov (s71-s80).
 */
export function HeatMap({
  layerIds,
  latField = 'lat',
  lngField = 'lng',
  intensityField = 'valeur',
  data: externalData,
  legendLabel = 'Intensite',
  radius = 20,
  center,
  zoom,
  className,
  height = 480,
  interactive = true,
}: HeatMapProps) {
  const { entries, loading } = useMapEntries(layerIds);

  const geojson = useMemo(() => {
    const points: HeatDatum[] = externalData ?? [];

    if (!externalData && entries.length) {
      for (const entry of entries) {
        const d = entry.data as Record<string, unknown>;
        const lat = Number(d[latField]);
        const lng = Number(d[lngField]);
        const intensity = Number(d[intensityField] ?? 1);
        if (isNaN(lat) || isNaN(lng)) continue;
        points.push({ lat, lng, intensity: isNaN(intensity) ? 1 : intensity });
      }
    }

    return {
      type: 'FeatureCollection' as const,
      features: points.map((p) => ({
        type: 'Feature' as const,
        properties: { intensity: p.intensity },
        geometry: {
          type: 'Point' as const,
          coordinates: [p.lng, p.lat],
        },
      })),
    };
  }, [entries, externalData, latField, lngField, intensityField]);

  if (!MAPBOX_TOKEN) {
    return (
      <div className={`bg-cream rounded-lg border border-div flex items-center justify-center ${className ?? ''}`} style={{ height }}>
        <p className="text-t3 text-sm font-[family-name:var(--font-mn)]">
          Token Mapbox manquant — definir NEXT_PUBLIC_MAPBOX_TOKEN
        </p>
      </div>
    );
  }

  return (
    <div className={`relative rounded-lg overflow-hidden border border-div ${className ?? ''}`} style={{ height }}>
      <MapGL
        mapboxAccessToken={MAPBOX_TOKEN}
        initialViewState={{
          longitude: center?.longitude ?? -10,
          latitude: center?.latitude ?? 28,
          zoom: zoom ?? 4,
        }}
        style={{ width: '100%', height: '100%' }}
        mapStyle={MAP_STYLE}
        interactive={interactive}
      >
        <Source id="heat-data" type="geojson" data={geojson}>
          <Layer
            id="heat-layer"
            type="heatmap"
            paint={{
              'heatmap-weight': ['get', 'intensity'],
              'heatmap-intensity': [
                'interpolate', ['linear'], ['zoom'],
                0, 0.5,
                9, 2,
              ],
              'heatmap-color': [
                'interpolate', ['linear'], ['heatmap-density'],
                0, 'rgba(253,250,243,0)',
                0.2, '#D4B662',
                0.4, '#B8963E',
                0.6, '#B87D3E',
                0.8, '#9C3D3D',
                1, '#6E2A3D',
              ],
              'heatmap-radius': [
                'interpolate', ['linear'], ['zoom'],
                0, radius * 0.5,
                9, radius * 2,
              ],
              'heatmap-opacity': 0.8,
            }}
          />
        </Source>
      </MapGL>

      {/* Legende */}
      <div className="absolute bottom-3 left-3 bg-ivory/90 backdrop-blur border border-div rounded-md px-3 py-2">
        <p className="text-[10px] text-t3 mb-1 font-[family-name:var(--font-mn)]">{legendLabel}</p>
        <div className="flex gap-0.5">
          {['#D4B662', '#B8963E', '#B87D3E', '#9C3D3D', '#6E2A3D'].map((color) => (
            <div key={color} className="w-4 h-2.5 rounded-sm" style={{ background: color }} />
          ))}
        </div>
        <div className="flex justify-between text-[9px] text-t3 mt-0.5 font-[family-name:var(--font-mn)]">
          <span>Faible</span>
          <span>Fort</span>
        </div>
      </div>

      {/* Compteur */}
      <div className="absolute top-3 right-3 bg-ivory/90 backdrop-blur border border-div rounded-md px-2.5 py-1.5">
        <span className="text-[10px] text-t3 font-[family-name:var(--font-mn)]">
          {geojson.features.length} point{geojson.features.length !== 1 ? 's' : ''}
        </span>
      </div>

      {loading && (
        <div className="absolute inset-0 bg-ivory/50 flex items-center justify-center">
          <div className="h-5 w-5 border-2 border-gold border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
}
