'use client';

import dynamic from 'next/dynamic';
import type { Database } from '@/lib/supabase/types';

type EntryRow = Database['public']['Tables']['entries']['Row'];

const LoadingViz = ({ h = 400 }: { h?: number }) => <div className={`bg-[#F7F3EA] animate-pulse rounded`} style={{ height: h }} />;

const ChoroplethMap = dynamic(() => import('@/components/viz/maps/ChoroplethMap').then(m => ({ default: m.ChoroplethMap })), { ssr: false, loading: () => <LoadingViz h={400} /> });
const EigenOrgChart = dynamic(() => import('@/components/viz/networks/EigenOrgChart').then(m => ({ default: m.EigenOrgChart })), { ssr: false, loading: () => <LoadingViz h={400} /> });
const DealFlowFunnelChart = dynamic(() => import('@/components/viz/charts/DealFlowFunnelChart').then(m => ({ default: m.DealFlowFunnelChart })), { ssr: false, loading: () => <LoadingViz h={300} /> });
const InnerCircleGraph = dynamic(() => import('@/components/viz/networks/InnerCircleGraph').then(m => ({ default: m.InnerCircleGraph })), { ssr: false, loading: () => <LoadingViz h={400} /> });
const InvestorsTreemapChart = dynamic(() => import('@/components/viz/charts/InvestorsTreemapChart').then(m => ({ default: m.InvestorsTreemapChart })), { ssr: false, loading: () => <LoadingViz h={300} /> });
const FundraisingTimeline = dynamic(() => import('@/components/viz/timelines/FundraisingTimeline').then(m => ({ default: m.FundraisingTimeline })), { ssr: false, loading: () => <LoadingViz h={200} /> });
const GeopoliticsRadarChart = dynamic(() => import('@/components/viz/charts/GeopoliticsRadarChart').then(m => ({ default: m.GeopoliticsRadarChart })), { ssr: false, loading: () => <LoadingViz h={300} /> });
const EntitiesBarChart = dynamic(() => import('@/components/viz/charts/EntitiesBarChart').then(m => ({ default: m.EntitiesBarChart })), { ssr: false, loading: () => <LoadingViz h={300} /> });

interface InvestorClientProps {
  fundraisingEntries: EntryRow[];
}

export function InvestorClient({ fundraisingEntries }: InvestorClientProps) {
  return (
    <>
      {/* Rangée 1 — Hero : ChoroplethMap pleine largeur */}
      <section>
        <div className="text-[9px] font-[family-name:var(--font-jetbrains)] text-gold tracking-[2px] mb-2 font-bold">
          CORRIDORS GÉOPOLITIQUES — 22 PAYS
        </div>
        <ChoroplethMap
          layerIds={['cg41', 'cg42', 'cg43', 'cg44', 'cg45', 'cg46', 'cg47', 'cg48', 'cg49', 'cg50']}
          valueField="pib"
          countryField="pays"
          legendLabel="PIB (Md$)"
        />
      </section>

      {/* Rangée 2 — 2 colonnes */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="text-[9px] font-[family-name:var(--font-jetbrains)] text-gold tracking-[2px] mb-2 font-bold">
            ORGANIGRAMME EIGEN HOLDING
          </div>
          <EigenOrgChart />
        </div>
        <div>
          <div className="text-[9px] font-[family-name:var(--font-jetbrains)] text-gold tracking-[2px] mb-2 font-bold">
            ENTONNOIR DEAL FLOW
          </div>
          <DealFlowFunnelChart layerId="cg01" />
        </div>
      </section>

      {/* Rangée 3 — 2 colonnes */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="text-[9px] font-[family-name:var(--font-jetbrains)] text-gold tracking-[2px] mb-2 font-bold">
            CERCLE INTÉRIEUR — RÉSEAU CONTACTS
          </div>
          <InnerCircleGraph />
        </div>
        <div>
          <div className="text-[9px] font-[family-name:var(--font-jetbrains)] text-gold tracking-[2px] mb-2 font-bold">
            FONDS VC PAR AUM
          </div>
          <InvestorsTreemapChart layerId="n51" />
        </div>
      </section>

      {/* Rangée 4 — FundraisingTimeline pleine largeur */}
      <section>
        <div className="text-[9px] font-[family-name:var(--font-jetbrains)] text-gold tracking-[2px] mb-2 font-bold">
          SÉQUENÇAGE LEVÉES EIGEN 2026-2028
        </div>
        <FundraisingTimeline data={fundraisingEntries} />
      </section>

      {/* Rangée 5 — 2 colonnes */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="text-[9px] font-[family-name:var(--font-jetbrains)] text-gold tracking-[2px] mb-2 font-bold">
            RADAR GÉOPOLITIQUE — 5 AXES PAR PAYS
          </div>
          <GeopoliticsRadarChart layerId="cg41" />
        </div>
        <div>
          <div className="text-[9px] font-[family-name:var(--font-jetbrains)] text-gold tracking-[2px] mb-2 font-bold">
            COMPLETION PAR ENTITÉ
          </div>
          <EntitiesBarChart />
        </div>
      </section>
    </>
  );
}
