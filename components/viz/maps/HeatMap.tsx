'use client';

import { useMemo } from 'react';
import { MapContainer, TileLayer, CircleMarker } from 'react-leaflet';
import { useMapEntries } from './use-map-entries';
import { CARTO_TILE_URL, CARTO_ATTRIBUTION } from './map-constants';
import { CustomZoomControl } from './CustomZoomControl';
import type { BaseMapProps, HeatDatum } from './map-types';

interface HeatMapProps extends BaseMapProps {
  layerIds: string[];
  latField?: string;
  lngField?: string;
  intensityField?: string;
  data?: HeatDatum[];
  legendLabel?: string;
  radius?: number;
  center?: { longitude: number; latitude: number };
  zoom?: number;
}

const HEAT_COLORS = ['#1E0A20', '#1E0A20', '#B87D3E', '#9C3D3D', '#6E2A3D'];

function getHeatColor(intensity: number, maxIntensity: number): string {
  if (maxIntensity === 0) return HEAT_COLORS[0];
  const t = Math.min(intensity / maxIntensity, 1);
  const idx = Math.min(Math.floor(t * (HEAT_COLORS.length - 1)), HEAT_COLORS.length - 1);
  return HEAT_COLORS[idx];
}

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
}: HeatMapProps) {
  const { entries, loading } = useMapEntries(layerIds);

  const points = useMemo<HeatDatum[]>(() => {
    if (externalData) return externalData;
    if (!entries.length) return [];

    const result: HeatDatum[] = [];
    for (const entry of entries) {
      const d = entry.data as Record<string, unknown>;
      const lat = Number(d[latField]);
      const lng = Number(d[lngField]);
      const intensity = Number(d[intensityField] ?? 1);
      if (isNaN(lat) || isNaN(lng)) continue;
      result.push({ lat, lng, intensity: isNaN(intensity) ? 1 : intensity });
    }
    return result;
  }, [entries, externalData, latField, lngField, intensityField]);

  const maxIntensity = useMemo(() => points.reduce((max, p) => Math.max(max, p.intensity), 1), [points]);

  return (
    <div className={`relative rounded-none-none overflow-hidden border border-div ${className ?? ''}`} style={{ height }}>
      <MapContainer
        center={[center?.latitude ?? 28, center?.longitude ?? -10]}
        zoom={zoom ?? 4}
        style={{ width: '100%', height: '100%' }}
        scrollWheelZoom={true}
        attributionControl={false}
        zoomControl={false}
      >
        <TileLayer url={CARTO_TILE_URL} attribution={CARTO_ATTRIBUTION} />
        <CustomZoomControl />

        {points.map((p, i) => (
          <CircleMarker
            key={i}
            center={[p.lat, p.lng]}
            radius={Math.max(6, (p.intensity / maxIntensity) * radius)}
            pathOptions={{
              color: 'transparent',
              fillColor: getHeatColor(p.intensity, maxIntensity),
              fillOpacity: 0.6,
            }}
          />
        ))}
      </MapContainer>

      {/* Legend */}
      <div className="absolute bottom-3 left-3 z-[1000] bg-ivory/90 backdrop-blur border border-div rounded-none-none px-3 py-2">
        <p className="text-[10px] text-t3 mb-1 font-[family-name:var(--font-jetbrains)]">{legendLabel}</p>
        <div className="flex gap-0.5">
          {HEAT_COLORS.map((color) => (
            <div key={color} className="w-4 h-2.5 rounded-none-sm" style={{ background: color }} />
          ))}
        </div>
        <div className="flex justify-between text-[9px] text-t3 mt-0.5 font-[family-name:var(--font-jetbrains)]">
          <span>Faible</span>
          <span>Fort</span>
        </div>
      </div>

      {/* Counter */}
      <div className="absolute top-3 right-3 z-[1000] bg-ivory/90 backdrop-blur border border-div rounded-none-none px-2.5 py-1.5">
        <span className="text-[10px] text-t3 font-[family-name:var(--font-jetbrains)]">
          {points.length} point{points.length !== 1 ? 's' : ''}
        </span>
      </div>

      {loading && (
        <div className="absolute inset-0 z-[1000] bg-ivory/50 flex items-center justify-center">
          <div className="h-5 w-5 border-2 border-gold border-t-transparent rounded-none-full animate-spin" />
        </div>
      )}
    </div>
  );
}
