'use client';

import { useState, useMemo, useCallback, useRef } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import L from 'leaflet';
import { useMapEntries } from './use-map-entries';
import { useCountriesGeoJSON } from './use-countries-geojson';
import {
  CARTO_TILE_URL,
  CARTO_ATTRIBUTION,
  CORRIDOR_COUNTRIES,
  CORRIDOR_NAMES,
} from './map-constants';
import { CustomZoomControl } from './CustomZoomControl';
import type { BaseMapProps } from './map-types';
import type { Feature, Geometry } from 'geojson';

interface CorridorMapProps extends BaseMapProps {
  layerIds?: string[];
  highlightCountries?: string[];
  metricField?: string;
  metricLabel?: string;
}

const CORRIDOR_COLOR = '#B8963E';
const CORRIDOR_STROKE = '#8C6E2A';

export function CorridorMap({
  layerIds = [],
  highlightCountries,
  metricField,
  metricLabel = 'Valeur',
  className,
  height = 480,
}: CorridorMapProps) {
  const { entries, loading: entriesLoading } = useMapEntries(layerIds);
  const { geojson: countriesGeoJSON, loading: geoLoading } = useCountriesGeoJSON();
  const [hovered, setHovered] = useState<{ name: string; metric?: string } | null>(null);
  const geoRef = useRef<L.GeoJSON>(null);

  const countries = useMemo(() => new Set(highlightCountries ?? [...CORRIDOR_COUNTRIES]), [highlightCountries]);

  const countryMetrics = useMemo(() => {
    if (!metricField || !entries.length) return new Map<string, string>();
    const lookup = new Map<string, string>();
    for (const entry of entries) {
      const d = entry.data as Record<string, unknown>;
      const code = String(d['pays'] ?? '').toUpperCase();
      const val = d[metricField];
      if (code && val !== undefined) lookup.set(code, String(val));
    }
    return lookup;
  }, [entries, metricField]);

  const style = useCallback((feature?: Feature<Geometry>) => {
    const iso = feature?.properties?.iso_a3;
    const isHighlighted = iso && countries.has(iso);
    return {
      fillColor: isHighlighted ? CORRIDOR_COLOR : 'transparent',
      fillOpacity: isHighlighted ? 0.45 : 0,
      weight: isHighlighted ? 1.5 : 0.2,
      color: isHighlighted ? CORRIDOR_STROKE : '#D4CCBA',
    };
  }, [countries]);

  const onEachFeature = useCallback((feature: Feature<Geometry>, layer: L.Layer) => {
    layer.on({
      mouseover: () => {
        const iso = feature.properties?.iso_a3;
        if (!iso || !countries.has(iso)) return;
        const name = CORRIDOR_NAMES[iso] ?? iso;
        const metric = countryMetrics.get(iso);
        setHovered({ name, metric });
        if (layer instanceof L.Path) {
          layer.setStyle({ fillOpacity: 0.7, weight: 2.5 });
        }
      },
      mouseout: () => {
        setHovered(null);
        if (geoRef.current) geoRef.current.resetStyle(layer);
      },
    });
  }, [countries, countryMetrics]);

  const loading = entriesLoading || geoLoading;

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
        {countriesGeoJSON && (
          <GeoJSON
            ref={geoRef}
            key={countries.size}
            data={countriesGeoJSON}
            style={style}
            onEachFeature={onEachFeature}
          />
        )}
      </MapContainer>

      {/* Tooltip */}
      {hovered && (
        <div className="absolute top-3 right-3 z-[1000] pointer-events-none bg-ivory/95 backdrop-blur border border-div rounded-md px-3 py-2 shadow-md">
          <p className="text-xs font-semibold text-t1">{hovered.name}</p>
          {hovered.metric && (
            <p className="text-xs text-t2 font-[family-name:var(--font-jetbrains)]">
              {metricLabel} : {hovered.metric}
            </p>
          )}
        </div>
      )}

      {/* Badge corridor */}
      <div className="absolute top-3 left-3 z-[1000] bg-ivory/90 backdrop-blur border border-div rounded-md px-3 py-1.5">
        <p className="text-[10px] text-t1 font-semibold font-[family-name:var(--font-cormorant)]">
          Corridor Atlantique
        </p>
        <p className="text-[9px] text-t3 font-[family-name:var(--font-jetbrains)]">
          {countries.size} pays — Tanger &rarr; Luanda
        </p>
      </div>

      {loading && (
        <div className="absolute inset-0 z-[1000] bg-ivory/50 flex items-center justify-center">
          <div className="h-5 w-5 border-2 border-gold border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
}
