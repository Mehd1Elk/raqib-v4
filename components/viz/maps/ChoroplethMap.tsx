'use client';

import { useState, useMemo, useCallback, useRef } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import L from 'leaflet';
import { useMapEntries } from './use-map-entries';
import { useCountriesGeoJSON } from './use-countries-geojson';
import { CARTO_TILE_URL, CARTO_ATTRIBUTION, DEFAULT_CENTER, DEFAULT_ZOOM, CHOROPLETH_SCALE } from './map-constants';
import type { BaseMapProps, ChoroplethDatum } from './map-types';
import type { Feature, Geometry } from 'geojson';

interface ChoroplethMapProps extends BaseMapProps {
  layerIds: string[];
  valueField: string;
  countryField?: string;
  legendLabel?: string;
  data?: ChoroplethDatum[];
}

function getColor(value: number, min: number, max: number): string {
  if (max === min) return CHOROPLETH_SCALE[Math.floor(CHOROPLETH_SCALE.length / 2)];
  const t = (value - min) / (max - min);
  const idx = Math.min(Math.floor(t * (CHOROPLETH_SCALE.length - 1)), CHOROPLETH_SCALE.length - 1);
  return CHOROPLETH_SCALE[idx];
}

export function ChoroplethMap({
  layerIds,
  valueField,
  countryField = 'pays',
  legendLabel = 'Valeur',
  data: externalData,
  className,
  height = 480,
}: ChoroplethMapProps) {
  const { entries, loading: entriesLoading } = useMapEntries(layerIds);
  const { geojson: countriesGeoJSON, loading: geoLoading } = useCountriesGeoJSON();
  const [hovered, setHovered] = useState<ChoroplethDatum | null>(null);
  const geoRef = useRef<L.GeoJSON>(null);

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

  const dataLookup = useMemo(() => {
    const map = new Map<string, ChoroplethDatum>();
    for (const d of choroplethData) map.set(d.countryCode, d);
    return map;
  }, [choroplethData]);

  const { min, max } = useMemo(() => {
    if (!choroplethData.length) return { min: 0, max: 1 };
    const vals = choroplethData.map((d) => d.value);
    return { min: Math.min(...vals), max: Math.max(...vals) };
  }, [choroplethData]);

  const style = useCallback((feature?: Feature<Geometry>) => {
    const iso = feature?.properties?.iso_a3;
    const datum = iso ? dataLookup.get(iso) : undefined;
    return {
      fillColor: datum ? getColor(datum.value, min, max) : 'transparent',
      fillOpacity: datum ? 0.75 : 0,
      weight: datum ? 0.5 : 0.2,
      color: datum ? '#918977' : '#D4CCBA',
    };
  }, [dataLookup, min, max]);

  const onEachFeature = useCallback((feature: Feature<Geometry>, layer: L.Layer) => {
    layer.on({
      mouseover: () => {
        const iso = feature.properties?.iso_a3;
        const datum = iso ? dataLookup.get(iso) : undefined;
        setHovered(datum ?? null);
        if (datum && layer instanceof L.Path) {
          layer.setStyle({ fillOpacity: 0.9, weight: 2 });
        }
      },
      mouseout: () => {
        setHovered(null);
        if (geoRef.current) geoRef.current.resetStyle(layer);
      },
    });
  }, [dataLookup]);

  const loading = entriesLoading || geoLoading;

  return (
    <div className={`relative rounded-lg overflow-hidden border border-div ${className ?? ''}`} style={{ height }}>
      <MapContainer
        center={[DEFAULT_CENTER.latitude, DEFAULT_CENTER.longitude]}
        zoom={DEFAULT_ZOOM}
        style={{ width: '100%', height: '100%' }}
        scrollWheelZoom={true}
        attributionControl={false}
      >
        <TileLayer url={CARTO_TILE_URL} attribution={CARTO_ATTRIBUTION} />
        {countriesGeoJSON && (
          <GeoJSON
            ref={geoRef}
            key={choroplethData.length}
            data={countriesGeoJSON}
            style={style}
            onEachFeature={onEachFeature}
          />
        )}
      </MapContainer>

      {/* Tooltip */}
      {hovered && (
        <div className="absolute top-3 right-3 z-[1000] pointer-events-none bg-ivory/95 backdrop-blur border border-div rounded-md px-3 py-2 shadow-md">
          <p className="text-xs font-semibold text-t1">{hovered.countryName}</p>
          <p className="text-xs text-t2 font-[family-name:var(--font-jetbrains)]">
            {legendLabel} : {hovered.value.toLocaleString('fr-FR', { maximumFractionDigits: 2 })}
          </p>
        </div>
      )}

      {/* Legend */}
      <div className="absolute bottom-3 left-3 z-[1000] bg-ivory/90 backdrop-blur border border-div rounded-md px-3 py-2">
        <p className="text-[10px] text-t3 mb-1 font-[family-name:var(--font-jetbrains)]">{legendLabel}</p>
        <div className="flex gap-0.5">
          {CHOROPLETH_SCALE.map((color, i) => (
            <div key={i} className="w-5 h-2.5 rounded-sm" style={{ background: color }} />
          ))}
        </div>
        <div className="flex justify-between text-[9px] text-t3 mt-0.5 font-[family-name:var(--font-jetbrains)]">
          <span>{min.toLocaleString('fr-FR', { maximumFractionDigits: 1 })}</span>
          <span>{max.toLocaleString('fr-FR', { maximumFractionDigits: 1 })}</span>
        </div>
      </div>

      {loading && (
        <div className="absolute inset-0 z-[1000] bg-ivory/50 flex items-center justify-center">
          <div className="h-5 w-5 border-2 border-gold border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
}
