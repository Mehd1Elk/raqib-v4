'use client';

import { useMemo, useState, useCallback } from 'react';
import { MapContainer, TileLayer, Polyline, CircleMarker, Tooltip } from 'react-leaflet';
import { useMapEntries } from './use-map-entries';
import { CARTO_TILE_URL, CARTO_ATTRIBUTION } from './map-constants';
import { CustomZoomControl } from './CustomZoomControl';
import type { BaseMapProps, FlowDatum } from './map-types';
import type { LatLngExpression } from 'leaflet';

interface FlowMapProps extends BaseMapProps {
  layerIds: string[];
  fromLatField?: string;
  fromLngField?: string;
  fromNameField?: string;
  toLatField?: string;
  toLngField?: string;
  toNameField?: string;
  valueField?: string;
  data?: FlowDatum[];
  legendLabel?: string;
}

const FLOW_COLOR = '#B8963E';
const DOT_COLOR = '#162B20';

function arcBetween(from: [number, number], to: [number, number], steps = 40): LatLngExpression[] {
  const midLng = (from[1] + to[1]) / 2;
  const midLat = (from[0] + to[0]) / 2;
  const dx = to[1] - from[1];
  const dy = to[0] - from[0];
  const dist = Math.sqrt(dx * dx + dy * dy);
  const offset = dist * 0.2;
  const ctrlLng = midLng + (-dy / dist) * offset;
  const ctrlLat = midLat + (dx / dist) * offset;

  const coords: LatLngExpression[] = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const lng = (1 - t) ** 2 * from[1] + 2 * (1 - t) * t * ctrlLng + t ** 2 * to[1];
    const lat = (1 - t) ** 2 * from[0] + 2 * (1 - t) * t * ctrlLat + t ** 2 * to[0];
    coords.push([lat, lng]);
  }
  return coords;
}

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
}: FlowMapProps) {
  const { entries, loading } = useMapEntries(layerIds);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

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

  const maxValue = useMemo(() => flows.reduce((max, f) => Math.max(max, f.value), 1), [flows]);

  const hoveredFlow = flows.find((f) => f.id === hoveredId);

  return (
    <div className={`relative rounded-lg overflow-hidden border border-div ${className ?? ''}`} style={{ height }}>
      <MapContainer
        center={[10, -5]}
        zoom={2.8}
        style={{ width: '100%', height: '100%' }}
        scrollWheelZoom={true}
        attributionControl={false}
        zoomControl={false}
      >
        <TileLayer url={CARTO_TILE_URL} attribution={CARTO_ATTRIBUTION} />
        <CustomZoomControl />

        {flows.map((flow) => {
          const width = Math.max(1, (flow.value / maxValue) * 5);
          const positions = arcBetween(
            [flow.from.lat, flow.from.lng],
            [flow.to.lat, flow.to.lng]
          );
          return (
            <Polyline
              key={flow.id}
              positions={positions}
              pathOptions={{
                color: FLOW_COLOR,
                weight: flow.id === hoveredId ? width + 2 : width,
                opacity: flow.id === hoveredId ? 1 : 0.7,
              }}
              eventHandlers={{
                mouseover: () => setHoveredId(flow.id),
                mouseout: () => setHoveredId(null),
              }}
            />
          );
        })}

        {flows.map((flow) => (
          <CircleMarker
            key={`from-${flow.id}`}
            center={[flow.from.lat, flow.from.lng]}
            radius={4}
            pathOptions={{ color: FLOW_COLOR, fillColor: DOT_COLOR, fillOpacity: 1, weight: 1.5 }}
          />
        ))}
        {flows.map((flow) => (
          <CircleMarker
            key={`to-${flow.id}`}
            center={[flow.to.lat, flow.to.lng]}
            radius={4}
            pathOptions={{ color: FLOW_COLOR, fillColor: DOT_COLOR, fillOpacity: 1, weight: 1.5 }}
          />
        ))}
      </MapContainer>

      {/* Tooltip */}
      {hoveredFlow && (
        <div className="absolute top-3 right-3 z-[1000] pointer-events-none bg-ivory/95 backdrop-blur border border-div rounded-md px-3 py-2 shadow-md">
          <p className="text-xs font-semibold text-t1">
            {hoveredFlow.from.name} &rarr; {hoveredFlow.to.name}
          </p>
          <p className="text-xs text-t2 font-[family-name:var(--font-jetbrains)]">
            {legendLabel} : {hoveredFlow.value.toLocaleString('fr-FR')}
          </p>
        </div>
      )}

      {/* Legend */}
      <div className="absolute bottom-3 left-3 z-[1000] bg-ivory/90 backdrop-blur border border-div rounded-md px-3 py-2">
        <p className="text-[10px] text-t3 mb-1 font-[family-name:var(--font-jetbrains)]">Flux</p>
        <div className="flex items-center gap-2 text-[9px] text-t3 font-[family-name:var(--font-jetbrains)]">
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

      {/* Counter */}
      <div className="absolute top-3 right-3 z-[999] bg-ivory/90 backdrop-blur border border-div rounded-md px-2.5 py-1.5">
        <span className="text-[10px] text-t3 font-[family-name:var(--font-jetbrains)]">
          {flows.length} flux
        </span>
      </div>

      {loading && (
        <div className="absolute inset-0 z-[1000] bg-ivory/50 flex items-center justify-center">
          <div className="h-5 w-5 border-2 border-gold border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
}
