'use client';

import { useMemo, useState, useCallback } from 'react';
import MapGL, { Marker, Source, Layer, Popup } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useMapEntries } from './use-map-entries';
import { MAP_STYLE, ARC_CITIES } from './map-constants';
import type { BaseMapProps, RouteDatum } from './map-types';

interface RouteMapProps extends BaseMapProps {
  /** Layer ID pour l'itineraire (ex: cg68) */
  layerId?: string;
  /** Donnees pre-calculees (sinon utilise ARC_CITIES par defaut) */
  data?: RouteDatum[];
  /** Afficher les numeros d'etape */
  showStepNumbers?: boolean;
}

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? '';
const ROUTE_COLOR = '#B8963E';
const STOP_COLOR = '#162B20';

/**
 * RouteMap — Itineraire Arc Conquete 2026 (cg68) avec les 7 trips / 9 villes.
 */
export function RouteMap({
  layerId,
  data: externalData,
  showStepNumbers = true,
  className,
  height = 480,
  interactive = true,
}: RouteMapProps) {
  const { entries } = useMapEntries(layerId ?? '');
  const [selected, setSelected] = useState<RouteDatum | null>(null);

  const route = useMemo<RouteDatum[]>(() => {
    if (externalData) return externalData;

    // Essayer de construire depuis les entries Supabase
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

    // Defaut : les 9 villes de l'Arc Conquete
    return ARC_CITIES.map((c, i) => ({
      order: i + 1,
      city: c.name,
      lat: c.lat,
      lng: c.lng,
    }));
  }, [entries, externalData]);

  // GeoJSON LineString pour la route
  const routeLine = useMemo(() => ({
    type: 'Feature' as const,
    properties: {},
    geometry: {
      type: 'LineString' as const,
      coordinates: route.map((r) => [r.lng, r.lat]),
    },
  }), [route]);

  const onStopClick = useCallback((stop: RouteDatum) => {
    setSelected((prev) => (prev?.order === stop.order ? null : stop));
  }, []);

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
        initialViewState={{ longitude: 0, latitude: 12, zoom: 3.2 }}
        style={{ width: '100%', height: '100%' }}
        mapStyle={MAP_STYLE}
        interactive={interactive}
      >
        {/* Ligne de route */}
        <Source id="route-line" type="geojson" data={routeLine}>
          <Layer
            id="route-line-layer"
            type="line"
            paint={{
              'line-color': ROUTE_COLOR,
              'line-width': 3,
              'line-dasharray': [2, 1],
              'line-opacity': 0.85,
            }}
          />
        </Source>

        {/* Marqueurs etape */}
        {route.map((stop) => (
          <Marker
            key={stop.order}
            latitude={stop.lat}
            longitude={stop.lng}
            anchor="center"
            onClick={(e) => {
              e.originalEvent.stopPropagation();
              onStopClick(stop);
            }}
          >
            <div className="cursor-pointer relative">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center shadow-md border-2"
                style={{
                  background: STOP_COLOR,
                  borderColor: ROUTE_COLOR,
                }}
              >
                {showStepNumbers && (
                  <span className="text-[10px] font-bold text-ivory font-[family-name:var(--font-mn)]">
                    {stop.order}
                  </span>
                )}
              </div>
              <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap text-[9px] text-t1 font-semibold font-[family-name:var(--font-sn)]">
                {stop.city}
              </span>
            </div>
          </Marker>
        ))}

        {/* Popup detail */}
        {selected && (
          <Popup
            latitude={selected.lat}
            longitude={selected.lng}
            anchor="bottom"
            offset={20}
            onClose={() => setSelected(null)}
            closeOnClick={false}
            className="[&_.mapboxgl-popup-content]:!bg-ivory [&_.mapboxgl-popup-content]:!rounded-lg [&_.mapboxgl-popup-content]:!border [&_.mapboxgl-popup-content]:!border-div [&_.mapboxgl-popup-content]:!shadow-md [&_.mapboxgl-popup-content]:!p-3"
          >
            <div className="min-w-[140px]">
              <h4 className="text-sm font-semibold text-t1 font-[family-name:var(--font-gr)]">
                Etape {selected.order} — {selected.city}
              </h4>
              {selected.tripLabel && (
                <p className="text-xs text-gold font-[family-name:var(--font-mn)] mt-1">
                  {selected.tripLabel}
                </p>
              )}
              {selected.dates && (
                <p className="text-xs text-t3 mt-0.5">{selected.dates}</p>
              )}
            </div>
          </Popup>
        )}
      </MapGL>

      {/* Badge itineraire */}
      <div className="absolute top-3 left-3 bg-ivory/90 backdrop-blur border border-div rounded-md px-3 py-1.5">
        <p className="text-[10px] text-t1 font-semibold font-[family-name:var(--font-gr)]">
          Arc Conquete 2026
        </p>
        <p className="text-[9px] text-t3 font-[family-name:var(--font-mn)]">
          {route.length} etapes — Tanger → Luanda
        </p>
      </div>
    </div>
  );
}
