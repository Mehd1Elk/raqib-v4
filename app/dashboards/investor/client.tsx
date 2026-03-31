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
import CollapsibleSection from '@/components/ui/CollapsibleSection';

type EntryRow = Database['public']['Tables']['entries']['Row'];

interface InvestorClientProps {
  fundraisingEntries: EntryRow[];
}

export function InvestorClient({ fundraisingEntries }: InvestorClientProps) {
  return (
    <>
      {/* Rangée 1 — Hero : ChoroplethMap pleine largeur */}
      <CollapsibleSection title="Corridors Géopolitiques" badge="22 pays" defaultOpen={true}>
        <ChoroplethMap
          layerIds={['cg41', 'cg42', 'cg43', 'cg44', 'cg45', 'cg46', 'cg47', 'cg48', 'cg49', 'cg50']}
          valueField="pib"
          countryField="pays"
          legendLabel="PIB (Md$)"
        />
      </CollapsibleSection>

      {/* Rangée 2 — 2 colonnes */}
      <CollapsibleSection title="Structure & Deal Flow" defaultOpen={false}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
        </div>
      </CollapsibleSection>

      {/* Rangée 3 — 2 colonnes */}
      <CollapsibleSection title="Réseau & Investisseurs" defaultOpen={false}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
        </div>
      </CollapsibleSection>

      {/* Rangée 4 — FundraisingTimeline pleine largeur */}
      <CollapsibleSection title="Séquençage Levées" badge="2026-2028" defaultOpen={false}>
        <FundraisingTimeline data={fundraisingEntries} />
      </CollapsibleSection>

      {/* Rangée 5 — 2 colonnes */}
      <CollapsibleSection title="Analyse Géopolitique & Completion" defaultOpen={false}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
        </div>
      </CollapsibleSection>
    </>
  );
}
