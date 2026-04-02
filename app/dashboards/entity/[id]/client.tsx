'use client';

import type { Database } from '@/lib/supabase/types';
import { DataTable } from '@/components/viz/tables/DataTable';
import {
  ChoroplethMap,
  NetworkGraph,
  DataFlowDiagram,
  GeopoliticsRadarChart,
  MarketBubbleChart,
  DealFlowFunnelChart,
  SynergyMatrix,
  HeatMap,
  PinMap,
  EntitiesBarChart,
  INSEEMap,
  EigenOrgChart,
  MilestoneTimeline,
  InnerCircleGraph,
} from '@/lib/viz-dynamic';

type EntryRow = Database['public']['Tables']['entries']['Row'];

// Entity → map type
const GEO_ENTITIES = ['noos', 'cg', 'alguesov', 'amana'];
const NETWORK_ENTITIES = ['diwane', 'yrknown'];
const FLOW_ENTITIES = ['cercle', 'aelya', 'burhan', 'myne', 'eigen'];

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
  eigen: { type: 'synergy', layerId: 'ei01', label: 'ARCHITECTURE MULTI-AGENT' },
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

      {/* Rangée 2b — EIGEN: OrgChart hero + compteurs */}
      {entityId === 'eigen' && (
        <section>
          <div className="text-[9px] font-[family-name:var(--font-jetbrains)] text-gold tracking-[2px] mb-2 font-bold">
            ORGANIGRAMME EIGEN HOLDING
          </div>
          <EigenOrgChart />
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div className="bg-ivory border border-div rounded-none p-4 text-center">
              <div className="text-[22px] font-[family-name:var(--font-playfair)] font-bold  text-noir">44</div>
              <div className="text-[8px] font-[family-name:var(--font-jetbrains)] text-tm tracking-[1px]">DOCUMENTS .DOCX</div>
            </div>
            <div className="bg-ivory border border-div rounded-none p-4 text-center">
              <div className="text-[22px] font-[family-name:var(--font-playfair)] font-bold  text-noir">15</div>
              <div className="text-[8px] font-[family-name:var(--font-jetbrains)] text-tm tracking-[1px]">INTERFACES .JSX</div>
            </div>
            <div className="bg-ivory border border-div rounded-none p-4 text-center">
              <div className="text-[22px] font-[family-name:var(--font-playfair)] font-bold  text-noir">100</div>
              <div className="text-[8px] font-[family-name:var(--font-jetbrains)] text-tm tracking-[1px]">COUCHES STRATEGIQUES</div>
            </div>
          </div>
        </section>
      )}

      {/* Rangée 2c — EIGEN: Timeline jalons + Inner Circle */}
      {entityId === 'eigen' && (
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="text-[9px] font-[family-name:var(--font-jetbrains)] text-gold tracking-[2px] mb-2 font-bold">
              JALONS 2026-2028
            </div>
            <MilestoneTimeline data={recentEntries} />
          </div>
          <div>
            <div className="text-[9px] font-[family-name:var(--font-jetbrains)] text-gold tracking-[2px] mb-2 font-bold">
              RÉSEAU ADVISORY
            </div>
            <InnerCircleGraph />
          </div>
        </section>
      )}

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
          <div className="bg-ivory border border-div rounded-none overflow-hidden">
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
                        <div className="mt-1 h-1 bg-parchment rounded-none-none overflow-hidden">
                          <div className="h-full rounded-none-none" style={{ width: `${Math.min(pct, 100)}%`, background: barColor }} />
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
