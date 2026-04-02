'use client';

import { useMemo, useState, useCallback } from 'react';
import { MapContainer, TileLayer, Polyline, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { useMapEntries } from './use-map-entries';
import { CARTO_TILE_URL, CARTO_ATTRIBUTION, ARC_CITIES } from './map-constants';
import { CustomZoomControl } from './CustomZoomControl';
import type { BaseMapProps, RouteDatum } from './map-types';

interface RouteMapProps extends BaseMapProps {
  layerId?: string;
  data?: RouteDatum[];
  showStepNumbers?: boolean;
}

const ROUTE_COLOR = '#B8963E';
const STOP_BG = '#162B20';

function createStopIcon(order: number, showNumber: boolean): L.DivIcon {
  return L.divIcon({
    className: '',
    iconSize: [28, 28],
    iconAnchor: [14, 14],
    popupAnchor: [0, -14],
    html: `<div style="width:28px;height:28px;border-radius: 0;background:${STOP_BG};border:2px solid ${ROUTE_COLOR};display:flex;align-items:center;justify-content:center;box-shadow:0 2px 6px rgba(0,0,0,.2)">
      ${showNumber ? `<span style="color:#FDFAF3;font-size:10px;font-weight:700;font-family:'JetBrains Mono',monospace">${order}</span>` : ''}
    </div>`,
  });
}

export function RouteMap({
  layerId,
  data: externalData,
  showStepNumbers = true,
  className,
  height = 480,
}: RouteMapProps) {
  const { entries } = useMapEntries(layerId ?? '');
  const [selected, setSelected] = useState<RouteDatum | null>(null);

  const route = useMemo<RouteDatum[]>(() => {
    if (externalData) return externalData;

    if (entries.length) {
      return entries
        .map((entry, i) => {
          const d = entry.data as Record<string, unknown>;
          const lat = Number(d['lat'] ?? d['latitude']);
          const lng = Number(d['lng'] ?? d['longitude']);
          if (isNaN(lat) || isNaN(lng)) return null;
          return {
            order: Number(d['ordre'] ?? d['order'] ?? i),
            city: String(d['ville'] ?? d['city'] ?? `Etape ${i + 1}`),
            lat,
            lng,
            tripLabel: d['trip'] ? String(d['trip']) : undefined,
            dates: d['dates'] ? String(d['dates']) : undefined,
          } satisfies RouteDatum;
        })
        .filter(Boolean)
        .sort((a, b) => a!.order - b!.order) as RouteDatum[];
    }

    return ARC_CITIES.map((c, i) => ({
      order: i + 1,
      city: c.name,
      lat: c.lat,
      lng: c.lng,
    }));
  }, [entries, externalData]);

  const routePositions = useMemo(
    () => route.map((r): [number, number] => [r.lat, r.lng]),
    [route]
  );

  return (
    <div className={`relative rounded-none-none overflow-hidden border border-div ${className ?? ''}`} style={{ height }}>
      <MapContainer
        center={[12, 0]}
        zoom={3.2}
        style={{ width: '100%', height: '100%' }}
        scrollWheelZoom={true}
        attributionControl={false}
        zoomControl={false}
      >
        <TileLayer url={CARTO_TILE_URL} attribution={CARTO_ATTRIBUTION} />
        <CustomZoomControl />

        {/* Route line */}
        <Polyline
          positions={routePositions}
          pathOptions={{
            color: ROUTE_COLOR,
            weight: 3,
            dashArray: '8 4',
            opacity: 0.85,
          }}
        />

        {/* Stop markers */}
        {route.map((stop) => (
          <Marker
            key={stop.order}
            position={[stop.lat, stop.lng]}
            icon={createStopIcon(stop.order, showStepNumbers)}
            eventHandlers={{
              click: () => setSelected((prev) => (prev?.order === stop.order ? null : stop)),
            }}
          >
            <Popup>
              <div className="min-w-[140px]">
                <h4 className="text-sm font-semibold text-t1 font-[family-name:var(--font-playfair)]">
                  Etape {stop.order} — {stop.city}
                </h4>
                {stop.tripLabel && (
                  <p className="text-xs text-gold font-[family-name:var(--font-jetbrains)] mt-1">
                    {stop.tripLabel}
                  </p>
                )}
                {stop.dates && (
                  <p className="text-xs text-t3 mt-0.5">{stop.dates}</p>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Badge */}
      <div className="absolute top-3 left-3 z-[1000] bg-ivory/90 backdrop-blur border border-div rounded-none-none px-3 py-1.5">
        <p className="text-[10px] text-t1 font-semibold font-[family-name:var(--font-playfair)]">
          Arc Conquete 2026
        </p>
        <p className="text-[9px] text-t3 font-[family-name:var(--font-jetbrains)]">
          {route.length} etapes — Tanger &rarr; Luanda
        </p>
      </div>
    </div>
  );
}
