'use client';

import { useState, useMemo, useCallback } from 'react';
import MapGL, { Source, Layer, type MapMouseEvent } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useMapEntries } from './use-map-entries';
import {
  MAP_STYLE,
  DEFAULT_CENTER,
  CORRIDOR_COUNTRIES,
  CORRIDOR_NAMES,
} from './map-constants';
import type { BaseMapProps } from './map-types';
import type { Json } from '@/lib/supabase/types';

interface CorridorMapProps extends BaseMapProps {
  /** IDs des layers geopolitiques du corridor (cg81-cg90) */
  layerIds?: string[];
  /** Surligner uniquement ces pays (defaut: les 22 du corridor) */
  highlightCountries?: string[];
  /** Champ JSONB pour afficher une metrique dans le tooltip */
  metricField?: string;
  /** Label de la metrique */
  metricLabel?: string;
}

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? '';
const CORRIDOR_COLOR = '#B8963E'; // gold
const CORRIDOR_STROKE = '#8C6E2A'; // gold dark

/**
 * CorridorMap — Carte du corridor atlantique 22 pays surlignés (Tanger -> Luanda).
 * Donnees depuis cg81-cg90.
 */
export function CorridorMap({
  layerIds = [],
  highlightCountries,
  metricField,
  metricLabel = 'Valeur',
  className,
  height = 480,
  interactive = true,
}: CorridorMapProps) {
  const { entries, loading } = useMapEntries(layerIds);
  const [hovered, setHovered] = useState<{ name: string; metric?: string } | null>(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });

  const countries = highlightCountries ?? [...CORRIDOR_COUNTRIES];

  const countryMetrics = useMemo(() => {
    if (!metricField || !entries.length) return {} as Record<string, string>;
    const lookup: Record<string, string> = {};
    for (const entry of entries) {
      const d = entry.data as Record<string, unknown>;
      const code = String(d['pays'] ?? '').toUpperCase();
      const val = d[metricField];
      if (code && val !== undefined) {
        lookup[code] = String(val);
      }
    }
    return lookup;
  }, [entries, metricField]);

  // Expression Mapbox : colorer les pays du corridor
  const fillColor = useMemo(() => {
    const stops: (string | number | string)[] = [];
    for (const code of countries) {
      stops.push(code, CORRIDOR_COLOR);
    }
    return [
      'match',
      ['get', 'iso_3166_1_alpha_3'],
      ...stops,
      'rgba(0,0,0,0)',
    ] as unknown as string;
  }, [countries]);

  const onMouseMove = useCallback((e: MapMouseEvent) => {
    const feature = e.features?.[0];
    if (!feature) {
      setHovered(null);
      return;
    }
    const code = feature.properties?.iso_3166_1_alpha_3;
    if (!code || !countries.includes(code)) {
      setHovered(null);
      return;
    }
    const name = CORRIDOR_NAMES[code] ?? code;
    const metric = countryMetrics[code];
    setHovered({ name, metric });
    setCursor({ x: e.point.x, y: e.point.y });
  }, [countries, countryMetrics]);

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
        initialViewState={{ longitude: -5, latitude: 10, zoom: 2.8 }}
        style={{ width: '100%', height: '100%' }}
        mapStyle={MAP_STYLE}
        interactive={interactive}
        interactiveLayerIds={['corridor-fill']}
        onMouseMove={onMouseMove}
        onMouseLeave={() => setHovered(null)}
      >
        <Source
          id="countries"
          type="vector"
          url="mapbox://mapbox.country-boundaries-v1"
        >
          <Layer
            id="corridor-fill"
            type="fill"
            source-layer="country_boundaries"
            paint={{
              'fill-color': fillColor as unknown as string,
              'fill-opacity': 0.45,
            }}
          />
          <Layer
            id="corridor-stroke"
            type="line"
            source-layer="country_boundaries"
            filter={[
              'in',
              ['get', 'iso_3166_1_alpha_3'],
              ['literal', countries],
            ]}
            paint={{
              'line-color': CORRIDOR_STROKE,
              'line-width': 1.5,
            }}
          />
        </Source>
      </MapGL>

      {/* Tooltip */}
      {hovered && (
        <div
          className="absolute z-10 pointer-events-none bg-ivory/95 backdrop-blur border border-div rounded-md px-3 py-2 shadow-md"
          style={{ left: cursor.x + 12, top: cursor.y - 40 }}
        >
          <p className="text-xs font-semibold text-t1">{hovered.name}</p>
          {hovered.metric && (
            <p className="text-xs text-t2 font-[family-name:var(--font-mn)]">
              {metricLabel} : {hovered.metric}
            </p>
          )}
        </div>
      )}

      {/* Badge corridor */}
      <div className="absolute top-3 left-3 bg-ivory/90 backdrop-blur border border-div rounded-md px-3 py-1.5">
        <p className="text-[10px] text-t1 font-semibold font-[family-name:var(--font-gr)]">
          Corridor Atlantique
        </p>
        <p className="text-[9px] text-t3 font-[family-name:var(--font-mn)]">
          {countries.length} pays — Tanger → Luanda
        </p>
      </div>

      {loading && (
        <div className="absolute inset-0 bg-ivory/50 flex items-center justify-center">
          <div className="h-5 w-5 border-2 border-gold border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
}
