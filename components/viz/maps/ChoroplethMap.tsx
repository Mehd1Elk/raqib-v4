'use client';

import { useState, useCallback, useMemo } from 'react';
import MapGL, { Source, Layer, type MapMouseEvent } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useMapEntries } from './use-map-entries';
import { MAP_STYLE, DEFAULT_CENTER, DEFAULT_ZOOM, CHOROPLETH_SCALE } from './map-constants';
import type { BaseMapProps, ChoroplethDatum } from './map-types';

interface ChoroplethMapProps extends BaseMapProps {
  /** IDs des layers Supabase (ex: n31-n40, cg41-cg50) */
  layerIds: string[];
  /** Champ JSONB a utiliser comme valeur numerique */
  valueField: string;
  /** Champ JSONB pour le code pays ISO-3 */
  countryField?: string;
  /** Label de la legende */
  legendLabel?: string;
  /** Donnees pre-calculees (optionnel, sinon fetch depuis layerIds) */
  data?: ChoroplethDatum[];
}

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? '';

/**
 * ChoroplethMap — Carte du monde coloree par valeur.
 * Utilise les donnees des layers epidemiologie (n31-n40) ou marches macro (cg41-cg50).
 */
export function ChoroplethMap({
  layerIds,
  valueField,
  countryField = 'pays',
  legendLabel = 'Valeur',
  data: externalData,
  className,
  height = 480,
  interactive = true,
}: ChoroplethMapProps) {
  const { entries, loading } = useMapEntries(layerIds);
  const [hovered, setHovered] = useState<ChoroplethDatum | null>(null);
  const [cursor, setCursor] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const choroplethData = useMemo<ChoroplethDatum[]>(() => {
    if (externalData) return externalData;
    if (!entries.length) return [];

    const lookup: Record<string, { total: number; count: number; name: string }> = {};
    for (const entry of entries) {
      const d = entry.data as Record<string, unknown>;
      const code = String(d[countryField] ?? '').toUpperCase();
      const val = Number(d[valueField]);
      if (!code || isNaN(val)) continue;
      const prev = lookup[code] ?? { total: 0, count: 0, name: code };
      lookup[code] = { total: prev.total + val, count: prev.count + 1, name: prev.name };
    }

    return Object.entries(lookup).map(([code, { total, count, name }]) => ({
      countryCode: code,
      countryName: name,
      value: total / count,
    }));
  }, [entries, externalData, valueField, countryField]);

  const { min, max } = useMemo(() => {
    if (!choroplethData.length) return { min: 0, max: 1 };
    const vals = choroplethData.map((d) => d.value);
    return { min: Math.min(...vals), max: Math.max(...vals) };
  }, [choroplethData]);

  // Expression Mapbox pour colorer par pays
  const fillColor = useMemo(() => {
    if (!choroplethData.length) return CHOROPLETH_SCALE[0];

    const stops: (string | number)[] = [];
    for (const d of choroplethData) {
      const t = max === min ? 0.5 : (d.value - min) / (max - min);
      const idx = Math.min(Math.floor(t * (CHOROPLETH_SCALE.length - 1)), CHOROPLETH_SCALE.length - 1);
      stops.push(d.countryCode, CHOROPLETH_SCALE[idx]);
    }

    return [
      'match',
      ['get', 'iso_3166_1_alpha_3'],
      ...stops,
      'rgba(0,0,0,0)',
    ] as unknown as string;
  }, [choroplethData, min, max]);

  const onMouseMove = useCallback((e: MapMouseEvent) => {
    const feature = e.features?.[0];
    if (!feature) {
      setHovered(null);
      return;
    }
    const code = feature.properties?.iso_3166_1_alpha_3;
    const found = choroplethData.find((d) => d.countryCode === code);
    setHovered(found ?? null);
    setCursor({ x: e.point.x, y: e.point.y });
  }, [choroplethData]);

  const onMouseLeave = useCallback(() => setHovered(null), []);

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
        initialViewState={{ ...DEFAULT_CENTER, zoom: DEFAULT_ZOOM }}
        style={{ width: '100%', height: '100%' }}
        mapStyle={MAP_STYLE}
        interactive={interactive}
        interactiveLayerIds={['choropleth-fill']}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
      >
        <Source
          id="countries"
          type="vector"
          url="mapbox://mapbox.country-boundaries-v1"
        >
          <Layer
            id="choropleth-fill"
            type="fill"
            source-layer="country_boundaries"
            paint={{
              'fill-color': fillColor as unknown as string,
              'fill-opacity': 0.75,
            }}
          />
          <Layer
            id="choropleth-stroke"
            type="line"
            source-layer="country_boundaries"
            paint={{
              'line-color': '#918977',
              'line-width': 0.5,
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
          <p className="text-xs font-semibold text-t1">{hovered.countryName}</p>
          <p className="text-xs text-t2 font-[family-name:var(--font-mn)]">
            {legendLabel} : {hovered.value.toLocaleString('fr-FR', { maximumFractionDigits: 2 })}
          </p>
        </div>
      )}

      {/* Legende */}
      <div className="absolute bottom-3 left-3 bg-ivory/90 backdrop-blur border border-div rounded-md px-3 py-2">
        <p className="text-[10px] text-t3 mb-1 font-[family-name:var(--font-mn)]">{legendLabel}</p>
        <div className="flex gap-0.5">
          {CHOROPLETH_SCALE.map((color, i) => (
            <div key={i} className="w-5 h-2.5 rounded-sm" style={{ background: color }} />
          ))}
        </div>
        <div className="flex justify-between text-[9px] text-t3 mt-0.5 font-[family-name:var(--font-mn)]">
          <span>{min.toLocaleString('fr-FR', { maximumFractionDigits: 1 })}</span>
          <span>{max.toLocaleString('fr-FR', { maximumFractionDigits: 1 })}</span>
        </div>
      </div>

      {/* Chargement */}
      {loading && (
        <div className="absolute inset-0 bg-ivory/50 flex items-center justify-center">
          <div className="h-5 w-5 border-2 border-gold border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
}
