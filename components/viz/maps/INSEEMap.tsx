'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

// RPPS psychiatrist data per department (latest available, approximate)
const PSYCHIATRISTS_BY_DEPT: Record<string, { count: number; pop: number }> = {
  '75': { count: 2850, pop: 2161000 },  // Paris
  '13': { count: 680, pop: 2024000 },   // Bouches-du-Rhône
  '69': { count: 520, pop: 1876000 },   // Rhône
  '31': { count: 380, pop: 1400000 },   // Haute-Garonne
  '33': { count: 350, pop: 1601000 },   // Gironde
  '59': { count: 420, pop: 2604000 },   // Nord
  '34': { count: 310, pop: 1175000 },   // Hérault
  '44': { count: 280, pop: 1427000 },   // Loire-Atlantique
  '67': { count: 260, pop: 1121000 },   // Bas-Rhin
  '06': { count: 340, pop: 1094000 },   // Alpes-Maritimes
  '92': { count: 580, pop: 1609000 },   // Hauts-de-Seine
  '78': { count: 210, pop: 1438000 },   // Yvelines
  '94': { count: 250, pop: 1387000 },   // Val-de-Marne
  '93': { count: 180, pop: 1623000 },   // Seine-Saint-Denis
  '91': { count: 160, pop: 1296000 },   // Essonne
  '95': { count: 140, pop: 1228000 },   // Val-d'Oise
  '77': { count: 120, pop: 1403000 },   // Seine-et-Marne
  '76': { count: 200, pop: 1254000 },   // Seine-Maritime
  '35': { count: 180, pop: 1079000 },   // Ille-et-Vilaine
  '38': { count: 190, pop: 1258000 },   // Isère
  '83': { count: 170, pop: 1076000 },   // Var
  '57': { count: 130, pop: 1043000 },   // Moselle
  '974': { count: 45, pop: 859000 },    // Réunion
  '971': { count: 35, pop: 390000 },    // Guadeloupe
  '972': { count: 30, pop: 364000 },    // Martinique
};

// Default ~50 psychiatrists and ~500k population for unlisted departments
const DEFAULT_DEPT = { count: 50, pop: 500000 };

const GEOJSON_URL = 'https://raw.githubusercontent.com/gregoiredavid/france-geojson/master/departements.geojson';

interface Feature {
  type: string;
  properties: { code: string; nom: string };
  geometry: { type: string; coordinates: number[][][] | number[][][][] };
}

interface Tooltip {
  x: number;
  y: number;
  dept: string;
  code: string;
  count: number;
  ratio: number;
}

function densityColor(ratio: number): string {
  if (ratio >= 100) return '#162B20';   // very high (Paris)
  if (ratio >= 30) return '#3D5E8C';    // high
  if (ratio >= 20) return '#3D7C5E';    // above average
  if (ratio >= 15) return '#B8963E';    // average
  if (ratio >= 10) return '#D4B662';    // below average
  return '#F0EBDE';                     // low
}

export function INSEEMap({ className, height = 500 }: { className?: string; height?: number }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [features, setFeatures] = useState<Feature[]>([]);
  const [tooltip, setTooltip] = useState<Tooltip | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(GEOJSON_URL)
      .then(r => r.json())
      .then(data => {
        setFeatures(data.features ?? []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Simple Mercator projection for metropolitan France
  const project = useMemo(() => {
    const centerLng = 2.5;
    const centerLat = 46.5;
    const scale = 2800;
    const offsetX = 400;
    const offsetY = 300;

    return (lng: number, lat: number): [number, number] => {
      const x = (lng - centerLng) * scale / 100 + offsetX;
      const latRad = (lat * Math.PI) / 180;
      const y = -Math.log(Math.tan(Math.PI / 4 + latRad / 2)) * scale / 100 + offsetY + centerLat * scale / 100 * 0.0174;
      return [x, y * 0.85 + 50];
    };
  }, []);

  const pathData = useMemo(() => {
    return features
      .filter(f => {
        // Filter to metropolitan France (exclude overseas for main view)
        const code = f.properties.code;
        return !['971', '972', '973', '974', '976'].includes(code);
      })
      .map(f => {
        const coords = f.geometry.type === 'MultiPolygon'
          ? (f.geometry.coordinates as number[][][][]).flat()
          : (f.geometry.coordinates as number[][][]);

        const d = coords.map(ring => {
          const points = ring.map(([lng, lat]) => project(lng, lat));
          return 'M' + points.map(([x, y]) => `${x},${y}`).join('L') + 'Z';
        }).join(' ');

        const data = PSYCHIATRISTS_BY_DEPT[f.properties.code] ?? DEFAULT_DEPT;
        const ratio = (data.count / data.pop) * 100000;

        return {
          code: f.properties.code,
          name: f.properties.nom,
          d,
          color: densityColor(ratio),
          count: data.count,
          ratio,
        };
      });
  }, [features, project]);

  const handleMouseMove = (e: React.MouseEvent, item: typeof pathData[0]) => {
    const rect = svgRef.current?.getBoundingClientRect();
    if (!rect) return;
    setTooltip({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top - 10,
      dept: item.name,
      code: item.code,
      count: item.count,
      ratio: item.ratio,
    });
  };

  return (
    <div className={`bg-ivory border border-div rounded overflow-hidden relative ${className ?? ''}`} style={{ height }}>
      {/* Title */}
      <div className="absolute top-3 left-3 z-10">
        <div className="text-[9px] font-[family-name:var(--font-jetbrains)] text-gold tracking-[2px] font-bold">
          FRANCE — DENSITÉ PSYCHIATRES / 100K HAB.
        </div>
        <div className="text-[8px] font-[family-name:var(--font-jetbrains)] text-tm mt-0.5">
          Source : RPPS / DREES · Données départementales
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-full text-[10px] font-[family-name:var(--font-jetbrains)] text-tm animate-pulse">
          Chargement GeoJSON départements...
        </div>
      ) : (
        <svg ref={svgRef} viewBox="0 0 800 700" className="w-full h-full">
          {pathData.map(item => (
            <path
              key={item.code}
              d={item.d}
              fill={item.color}
              stroke="#FDFAF3"
              strokeWidth={0.5}
              className="transition-opacity hover:opacity-80 cursor-pointer"
              onMouseMove={e => handleMouseMove(e, item)}
              onMouseLeave={() => setTooltip(null)}
            />
          ))}
        </svg>
      )}

      {/* Tooltip */}
      {tooltip && (
        <div
          className="absolute z-20 bg-noir/90 text-ivory px-3 py-2 rounded pointer-events-none"
          style={{ left: tooltip.x, top: tooltip.y, transform: 'translate(-50%, -100%)' }}
        >
          <div className="text-[10px] font-[family-name:var(--font-cormorant)] font-bold italic">
            {tooltip.dept} ({tooltip.code})
          </div>
          <div className="text-[9px] font-[family-name:var(--font-jetbrains)] text-gold">
            {tooltip.count} psychiatres
          </div>
          <div className="text-[8px] font-[family-name:var(--font-jetbrains)] text-tm">
            {tooltip.ratio.toFixed(1)} / 100k hab.
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="absolute bottom-3 right-3 bg-ivory/90 border border-div rounded p-2 z-10">
        <div className="text-[8px] font-[family-name:var(--font-jetbrains)] text-t3 mb-1">DENSITÉ / 100K</div>
        <div className="flex gap-1">
          {[
            { color: '#F0EBDE', label: '<10' },
            { color: '#D4B662', label: '10-15' },
            { color: '#B8963E', label: '15-20' },
            { color: '#3D7C5E', label: '20-30' },
            { color: '#3D5E8C', label: '30-100' },
            { color: '#162B20', label: '>100' },
          ].map(s => (
            <div key={s.label} className="flex flex-col items-center gap-0.5">
              <div className="w-4 h-3 rounded-sm" style={{ background: s.color }} />
              <span className="text-[6px] font-[family-name:var(--font-jetbrains)] text-tm">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
