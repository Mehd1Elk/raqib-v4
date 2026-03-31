'use client';

import { useState, useMemo, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { useMapEntries } from './use-map-entries';
import { CARTO_TILE_URL, CARTO_ATTRIBUTION, DEFAULT_CENTER, DEFAULT_ZOOM, ENTITY_PIN_COLORS } from './map-constants';
import type { BaseMapProps, PinDatum } from './map-types';
import type { Json } from '@/lib/supabase/types';

interface PinMapProps extends BaseMapProps {
  layerIds: string[];
  titleField?: string;
  subtitleField?: string;
  latField?: string;
  lngField?: string;
  popupFields?: string[];
  data?: PinDatum[];
  entityId?: string;
}

const CITY_COORDS: Record<string, [number, number]> = {
  casablanca: [33.57, -7.59], rabat: [34.02, -6.83], tanger: [35.76, -5.83],
  paris: [48.86, 2.35], londres: [51.51, -0.13], london: [51.51, -0.13],
  dakar: [14.69, -17.45], abidjan: [5.36, -4.01], lagos: [6.52, 3.38],
  kinshasa: [-4.44, 15.27], luanda: [-8.84, 13.29], libreville: [0.42, 9.47],
  douala: [4.05, 9.77], accra: [5.56, -0.19], lome: [6.17, 1.23],
  cotonou: [6.37, 2.39], new_york: [40.71, -74.01], sao_paulo: [-23.55, -46.63],
};

function resolveCityCoords(ville: string): [number, number] | null {
  const key = ville.toLowerCase().replace(/[\s-]/g, '_');
  return CITY_COORDS[key] ?? null;
}

function createPinIcon(color: string): L.DivIcon {
  return L.divIcon({
    className: '',
    iconSize: [24, 32],
    iconAnchor: [12, 32],
    popupAnchor: [0, -32],
    html: `<svg width="24" height="32" viewBox="0 0 24 32" fill="none"><path d="M12 0C5.37 0 0 5.37 0 12c0 9 12 20 12 20s12-11 12-20c0-6.63-5.37-12-12-12z" fill="${color}"/><circle cx="12" cy="12" r="5" fill="#FDFAF3"/></svg>`,
  });
}

export function PinMap({
  layerIds,
  titleField = 'nom',
  subtitleField = 'ville',
  latField = 'lat',
  lngField = 'lng',
  popupFields = [],
  data: externalData,
  entityId,
  className,
  height = 480,
}: PinMapProps) {
  const { entries, loading } = useMapEntries(layerIds);
  const [selected, setSelected] = useState<PinDatum | null>(null);

  const pinColor = entityId ? ENTITY_PIN_COLORS[entityId] ?? '#B8963E' : '#B8963E';
  const icon = useMemo(() => createPinIcon(pinColor), [pinColor]);

  const pins = useMemo<PinDatum[]>(() => {
    if (externalData) return externalData;
    if (!entries.length) return [];

    return entries
      .map((entry) => {
        const d = entry.data as Record<string, unknown>;
        let lat = Number(d[latField]);
        let lng = Number(d[lngField]);

        if ((isNaN(lat) || isNaN(lng)) && d[subtitleField]) {
          const coords = resolveCityCoords(String(d[subtitleField]));
          if (coords) [lat, lng] = coords;
        }

        if (isNaN(lat) || isNaN(lng)) return null;

        return {
          id: entry.id,
          lat,
          lng,
          title: String(d[titleField] ?? 'Sans titre'),
          subtitle: d[subtitleField] ? String(d[subtitleField]) : undefined,
          entityId,
          data: d as Record<string, Json | undefined>,
        } satisfies PinDatum;
      })
      .filter(Boolean) as PinDatum[];
  }, [entries, externalData, titleField, subtitleField, latField, lngField, entityId]);

  return (
    <div className={`relative rounded-lg overflow-hidden border border-div ${className ?? ''}`} style={{ height }}>
      <MapContainer
        center={[DEFAULT_CENTER.latitude, DEFAULT_CENTER.longitude]}
        zoom={DEFAULT_ZOOM + 1}
        style={{ width: '100%', height: '100%' }}
        scrollWheelZoom={true}
        attributionControl={false}
      >
        <TileLayer url={CARTO_TILE_URL} attribution={CARTO_ATTRIBUTION} />

        {pins.map((pin) => (
          <Marker
            key={pin.id}
            position={[pin.lat, pin.lng]}
            icon={icon}
            eventHandlers={{
              click: () => setSelected((prev) => (prev?.id === pin.id ? null : pin)),
            }}
          >
            <Popup>
              <div className="min-w-[180px] max-w-[280px]">
                <h4 className="text-sm font-semibold text-t1 font-[family-name:var(--font-cormorant)]">
                  {pin.title}
                </h4>
                {pin.subtitle && (
                  <p className="text-xs text-t2 mt-0.5">{pin.subtitle}</p>
                )}
                {popupFields.length > 0 && (
                  <div className="mt-2 space-y-1 border-t border-div pt-2">
                    {popupFields.map((field) => {
                      const val = pin.data[field];
                      if (val === undefined || val === null) return null;
                      return (
                        <div key={field} className="flex justify-between gap-2 text-[11px]">
                          <span className="text-t3">{field}</span>
                          <span className="text-t1 font-[family-name:var(--font-jetbrains)] text-right">
                            {String(val)}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Counter */}
      <div className="absolute top-3 right-3 z-[1000] bg-ivory/90 backdrop-blur border border-div rounded-md px-2.5 py-1.5">
        <span className="text-[10px] text-t3 font-[family-name:var(--font-jetbrains)]">
          {pins.length} marqueur{pins.length !== 1 ? 's' : ''}
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
