'use client';

import type { Database } from '@/lib/supabase/types';
import {
  ChoroplethMap,
  EigenOrgChart,
  DealFlowFunnelChart,
  InnerCircleGraph,
  InvestorsTreemapChart,
  FundraisingTimeline,
  GeopoliticsRadarChart,
  EntitiesBarChart,
} from '@/lib/viz-dynamic';

type EntryRow = Database['public']['Tables']['entries']['Row'];

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
