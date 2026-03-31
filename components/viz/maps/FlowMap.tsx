'use client';

import { useMemo, useState, useCallback } from 'react';
import MapGL, { Source, Layer, type MapMouseEvent } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useMapEntries } from './use-map-entries';
import { MAP_STYLE, CORRIDOR_NAMES } from './map-constants';
import type { BaseMapProps, FlowDatum } from './map-types';

interface FlowMapProps extends BaseMapProps {
  /** IDs des layers flux (cg48, remittances, etc.) */
  layerIds: string[];
  /** Champs JSONB pour source / destination */
  fromLatField?: string;
  fromLngField?: string;
  fromNameField?: string;
  toLatField?: string;
  toLngField?: string;
  toNameField?: string;
  /** Champ JSONB pour la valeur du flux */
  valueField?: string;
  /** Donnees pre-calculees */
  data?: FlowDatum[];
  /** Label de la legende */
  legendLabel?: string;
}

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? '';
const FLOW_COLOR = '#B8963E';

/**
 * Genere une courbe de Bezier GeoJSON entre deux points.
 */
function arcBetween(from: [number, number], to: [number, number], steps = 40): [number, number][] {
  const midLng = (from[0] + to[0]) / 2;
  const midLat = (from[1] + to[1]) / 2;
  // Offset perpendiculaire pour la courbe
  const dx = to[0] - from[0];
  const dy = to[1] - from[1];
  const dist = Math.sqrt(dx * dx + dy * dy);
  const offset = dist * 0.2;
  const ctrlLng = midLng + (-dy / dist) * offset;
  const ctrlLat = midLat + (dx / dist) * offset;

  const coords: [number, number][] = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const lng = (1 - t) ** 2 * from[0] + 2 * (1 - t) * t * ctrlLng + t ** 2 * to[0];
    const lat = (1 - t) ** 2 * from[1] + 2 * (1 - t) * t * ctrlLat + t ** 2 * to[1];
    coords.push([lng, lat]);
  }
  return coords;
}

/**
 * FlowMap — Flux de donnees / remittances entre pays corridor (cg48).
 */
export function FlowMap({
  layerIds,
  fromLatField = 'from_lat',
  fromLngField = 'from_lng',
  fromNameField = 'from_name',
  toLatField = 'to_lat',
  toLngField = 'to_lng',
  toNameField = 'to_name',
  valueField = 'valeur',
  data: externalData,
  legendLabel = 'Volume',
  className,
  height = 480,
  interactive = true,
}: FlowMapProps) {
  const { entries, loading } = useMapEntries(layerIds);
  const [hovered, setHovered] = useState<FlowDatum | null>(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });

  const flows = useMemo<FlowDatum[]>(() => {
    if (externalData) return externalData;
    if (!entries.length) return [];

    return entries
      .map((entry) => {
        const d = entry.data as Record<string, unknown>;
        const fromLat = Number(d[fromLatField]);
        const fromLng = Number(d[fromLngField]);
        const toLat = Number(d[toLatField]);
        const toLng = Number(d[toLngField]);
        const value = Number(d[valueField] ?? 1);

        if ([fromLat, fromLng, toLat, toLng].some(isNaN)) return null;

        return {
          id: entry.id,
          from: { lat: fromLat, lng: fromLng, name: String(d[fromNameField] ?? '') },
          to: { lat: toLat, lng: toLng, name: String(d[toNameField] ?? '') },
          value: isNaN(value) ? 1 : value,
        } satisfies FlowDatum;
      })
      .filter(Boolean) as FlowDatum[];
  }, [entries, externalData, fromLatField, fromLngField, fromNameField, toLatField, toLngField, toNameField, valueField]);

  const { maxValue, geojson } = useMemo(() => {
    const maxVal = flows.reduce((max, f) => Math.max(max, f.value), 1);

    const features = flows.map((flow, i) => ({
      type: 'Feature' as const,
      id: i,
      properties: {
        flowId: flow.id,
        fromName: flow.from.name,
        toName: flow.to.name,
        value: flow.value,
        width: Math.max(1, (flow.value / maxVal) * 5),
      },
      geometry: {
        type: 'LineString' as const,
        coordinates: arcBetween(
          [flow.from.lng, flow.from.lat],
          [flow.to.lng, flow.to.lat]
        ),
      },
    }));

    return {
      maxValue: maxVal,
      geojson: { type: 'FeatureCollection' as const, features },
    };
  }, [flows]);

  const onMouseMove = useCallback((e: MapMouseEvent) => {
    const feature = e.features?.[0];
    if (!feature) {
      setHovered(null);
      return;
    }
    const flowId = feature.properties?.flowId;
    const found = flows.find((f) => f.id === flowId);
    setHovered(found ?? null);
    setCursor({ x: e.point.x, y: e.point.y });
  }, [flows]);

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
        interactiveLayerIds={['flow-lines']}
        onMouseMove={onMouseMove}
        onMouseLeave={() => setHovered(null)}
      >
        <Source id="flow-data" type="geojson" data={geojson}>
          <Layer
            id="flow-lines"
            type="line"
            paint={{
              'line-color': FLOW_COLOR,
              'line-width': ['get', 'width'],
              'line-opacity': 0.7,
            }}
          />
        </Source>

        {/* Points d'origine et destination */}
        {flows.map((flow) => (
          <Source
            key={`pts-${flow.id}`}
            id={`pts-${flow.id}`}
            type="geojson"
            data={{
              type: 'FeatureCollection',
              features: [
                {
                  type: 'Feature',
                  properties: { type: 'origin' },
                  geometry: { type: 'Point', coordinates: [flow.from.lng, flow.from.lat] },
                },
                {
                  type: 'Feature',
                  properties: { type: 'destination' },
                  geometry: { type: 'Point', coordinates: [flow.to.lng, flow.to.lat] },
                },
              ],
            }}
          >
            <Layer
              id={`pts-layer-${flow.id}`}
              type="circle"
              paint={{
                'circle-radius': 4,
                'circle-color': '#162B20',
                'circle-stroke-color': FLOW_COLOR,
                'circle-stroke-width': 1.5,
              }}
            />
          </Source>
        ))}
      </MapGL>

      {/* Tooltip */}
      {hovered && (
        <div
          className="absolute z-10 pointer-events-none bg-ivory/95 backdrop-blur border border-div rounded-md px-3 py-2 shadow-md"
          style={{ left: cursor.x + 12, top: cursor.y - 40 }}
        >
          <p className="text-xs font-semibold text-t1">
            {hovered.from.name} → {hovered.to.name}
          </p>
          <p className="text-xs text-t2 font-[family-name:var(--font-mn)]">
            {legendLabel} : {hovered.value.toLocaleString('fr-FR')}
          </p>
        </div>
      )}

      {/* Legende */}
      <div className="absolute bottom-3 left-3 bg-ivory/90 backdrop-blur border border-div rounded-md px-3 py-2">
        <p className="text-[10px] text-t3 mb-1 font-[family-name:var(--font-mn)]">Flux</p>
        <div className="flex items-center gap-2 text-[9px] text-t3 font-[family-name:var(--font-mn)]">
          <div className="flex items-center gap-1">
            <div className="w-6 h-[1px]" style={{ background: FLOW_COLOR }} />
            <span>Faible</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-6 h-[4px] rounded-sm" style={{ background: FLOW_COLOR }} />
            <span>Fort</span>
          </div>
        </div>
      </div>

      {/* Compteur */}
      <div className="absolute top-3 right-3 bg-ivory/90 backdrop-blur border border-div rounded-md px-2.5 py-1.5">
        <span className="text-[10px] text-t3 font-[family-name:var(--font-mn)]">
          {flows.length} flux
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
