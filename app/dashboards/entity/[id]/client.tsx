'use client';

import dynamic from 'next/dynamic';
import type { Database } from '@/lib/supabase/types';
import { DataTable } from '@/components/viz/tables/DataTable';

type EntryRow = Database['public']['Tables']['entries']['Row'];

const ChoroplethMap = dynamic(() => import('@/components/viz/maps/ChoroplethMap').then(m => ({ default: m.ChoroplethMap })), { ssr: false });
const NetworkGraph = dynamic(() => import('@/components/viz/networks/NetworkGraph').then(m => ({ default: m.NetworkGraph })), { ssr: false });
const DataFlowDiagram = dynamic(() => import('@/components/viz/networks/DataFlowDiagram').then(m => ({ default: m.DataFlowDiagram })), { ssr: false });
const GeopoliticsRadarChart = dynamic(() => import('@/components/viz/charts/GeopoliticsRadarChart').then(m => ({ default: m.GeopoliticsRadarChart })), { ssr: false });
const MarketBubbleChart = dynamic(() => import('@/components/viz/charts/MarketBubbleChart').then(m => ({ default: m.MarketBubbleChart })), { ssr: false });
const DealFlowFunnelChart = dynamic(() => import('@/components/viz/charts/DealFlowFunnelChart').then(m => ({ default: m.DealFlowFunnelChart })), { ssr: false });
const SynergyMatrix = dynamic(() => import('@/components/viz/networks/SynergyMatrix').then(m => ({ default: m.SynergyMatrix })), { ssr: false });
const HeatMap = dynamic(() => import('@/components/viz/maps/HeatMap').then(m => ({ default: m.HeatMap })), { ssr: false });
const PinMap = dynamic(() => import('@/components/viz/maps/PinMap').then(m => ({ default: m.PinMap })), { ssr: false });
const EntitiesBarChart = dynamic(() => import('@/components/viz/charts/EntitiesBarChart').then(m => ({ default: m.EntitiesBarChart })), { ssr: false });
const INSEEMap = dynamic(() => import('@/components/viz/maps/INSEEMap').then(m => ({ default: m.INSEEMap })), { ssr: false });

// Entity → map type
const GEO_ENTITIES = ['noos', 'cg', 'alguesov', 'amana'];
const NETWORK_ENTITIES = ['diwane', 'yrknown'];
const FLOW_ENTITIES = ['cercle', 'aelya', 'burhan', 'myne'];

// Entity → primary chart config
const CHART_CONFIG: Record<string, { type: string; layerId: string; label: string }> = {
  noos: { type: 'radar', layerId: 'n01', label: 'RADAR BUDGET SM PAR PAYS' },
  aelya: { type: 'bar', layerId: 'a01', label: 'COMPARATIF LOIS PAR PAYS' },
  myne: { type: 'bubble', layerId: 'm01', label: 'COURTIERS DONNÉES PAR CA' },
  burhan: { type: 'bar', layerId: 'b01', label: 'TPS/GAS PAR BLOCKCHAIN' },
  yrknown: { type: 'network', layerId: 'y01', label: 'EXPERTS + INSTITUTIONS' },
  diwane: { type: 'bubble', layerId: 'd01', label: 'ARTISTES PAR COTE' },
  alguesov: { type: 'heatmap', layerId: 's01', label: 'ZONES RÉCOLTE + DONNÉES TERRAIN' },
  amana: { type: 'pinmap', layerId: 'am01', label: 'ASSOCIATIONS PAR RÉGION' },
  cg: { type: 'funnel', layerId: 'cg01', label: 'DEAL FLOW FUNNEL' },
  cercle: { type: 'synergy', layerId: 'cd01', label: 'MATRICE SYNERGIES' },
};

interface EntityDashboardClientProps {
  entityId: string;
  entityColor: string;
  recentEntries: EntryRow[];
  topLayers: { id: string; name: string; actual_rows: number | null; target_rows: number | null }[];
}

function EntityMap({ entityId }: { entityId: string }) {
  if (GEO_ENTITIES.includes(entityId)) {
    const layerPrefix = entityId === 'noos' ? 'n' : entityId === 'cg' ? 'cg' : entityId === 'alguesov' ? 's' : 'am';
    return (
      <ChoroplethMap
        layerIds={Array.from({ length: 10 }, (_, i) => `${layerPrefix}${String(i + 1).padStart(2, '0')}`)}
        valueField="valeur"
        countryField="pays"
        legendLabel="Données"
      />
    );
  }
  if (NETWORK_ENTITIES.includes(entityId)) return <NetworkGraph />;
  return <DataFlowDiagram />;
}

function EntityChart({ entityId }: { entityId: string }) {
  const config = CHART_CONFIG[entityId];
  if (!config) return <EntitiesBarChart />;

  switch (config.type) {
    case 'radar': return <GeopoliticsRadarChart layerId={config.layerId} />;
    case 'bubble': return <MarketBubbleChart layerId={config.layerId} />;
    case 'funnel': return <DealFlowFunnelChart layerId={config.layerId} />;
    case 'synergy': return <SynergyMatrix />;
    case 'heatmap': return <HeatMap layerIds={[config.layerId]} legendLabel="Intensité récolte" />;
    case 'pinmap': return <PinMap layerIds={[config.layerId]} titleField="nom" subtitleField="region" />;
    case 'network': return <NetworkGraph />;
    default: return <EntitiesBarChart />;
  }
}

export function EntityDashboardClient({ entityId, entityColor, recentEntries, topLayers }: EntityDashboardClientProps) {
  const chartConfig = CHART_CONFIG[entityId];

  return (
    <>
      {/* Rangée 2 — Carte/réseau contextuel */}
      <section>
        <div className="text-[9px] font-[family-name:var(--font-jetbrains)] text-gold tracking-[2px] mb-2 font-bold">
          {GEO_ENTITIES.includes(entityId) ? 'CARTE GÉOGRAPHIQUE' : NETWORK_ENTITIES.includes(entityId) ? 'RÉSEAU' : 'FLUX DONNÉES'}
        </div>
        <EntityMap entityId={entityId} />
      </section>

      {/* Rangée 2b — INSEEMap pour NOOS (vue France détaillée) */}
      {entityId === 'noos' && (
        <section>
          <div className="text-[9px] font-[family-name:var(--font-jetbrains)] text-gold tracking-[2px] mb-2 font-bold">
            FRANCE — DENSITÉ PSYCHIATRES / 100K HAB.
          </div>
          <INSEEMap height={500} />
        </section>
      )}

      {/* Rangée 3 — 2 colonnes */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="text-[9px] font-[family-name:var(--font-jetbrains)] text-gold tracking-[2px] mb-2 font-bold">
            {chartConfig?.label ?? 'VISUALISATION'}
          </div>
          <EntityChart entityId={entityId} />
        </div>
        <div>
          <div className="text-[9px] font-[family-name:var(--font-jetbrains)] text-gold tracking-[2px] mb-2 font-bold">
            TOP 5 COUCHES LES PLUS PEUPLÉES
          </div>
          <div className="bg-ivory border border-div rounded overflow-hidden">
            {topLayers.length === 0 ? (
              <div className="p-6 text-center text-[10px] font-[family-name:var(--font-noto)] text-tm">Aucune couche peuplée.</div>
            ) : (
              <div className="divide-y divide-div-l">
                {topLayers.map((l) => {
                  const pct = l.target_rows ? ((l.actual_rows ?? 0) / l.target_rows) * 100 : 0;
                  const barColor = pct >= 75 ? '#3D7C5E' : pct >= 25 ? '#B87D3E' : '#9C3D3D';
                  return (
                    <div key={l.id} className="px-4 py-2.5 flex items-center gap-3">
                      <span className="text-[9px] font-[family-name:var(--font-jetbrains)] text-t3 w-12 shrink-0">{l.id}</span>
                      <div className="flex-1 min-w-0">
                        <div className="text-[10px] font-[family-name:var(--font-noto)] text-t1 truncate">{l.name}</div>
                        <div className="mt-1 h-1 bg-parchment rounded-full overflow-hidden">
                          <div className="h-full rounded-full" style={{ width: `${Math.min(pct, 100)}%`, background: barColor }} />
                        </div>
                      </div>
                      <span className="text-[8px] font-[family-name:var(--font-jetbrains)] text-tm shrink-0">
                        {l.actual_rows ?? 0}/{l.target_rows ?? 0}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Rangée 4 — Dernières entries */}
      <section>
        <div className="text-[9px] font-[family-name:var(--font-jetbrains)] text-gold tracking-[2px] mb-2 font-bold">
          DERNIÈRES ENTRIES
        </div>
        <DataTable
          entries={recentEntries}
          layerId={`${entityId}-recent`}
          layerName="Entries récentes"
          platformName="Multi"
          totalRows={recentEntries.length}
          pageSize={20}
        />
      </section>
    </>
  );
}
