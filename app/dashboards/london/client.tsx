'use client';

import dynamic from 'next/dynamic';
import type { Database } from '@/lib/supabase/types';

type EntryRow = Database['public']['Tables']['entries']['Row'];

const CorridorMap = dynamic(() => import('@/components/viz/maps/CorridorMap').then(m => ({ default: m.CorridorMap })), { ssr: false });
const EigenOrgChart = dynamic(() => import('@/components/viz/networks/EigenOrgChart').then(m => ({ default: m.EigenOrgChart })), { ssr: false });
const SynergyMatrix = dynamic(() => import('@/components/viz/networks/SynergyMatrix').then(m => ({ default: m.SynergyMatrix })), { ssr: false });
const DataFlowDiagram = dynamic(() => import('@/components/viz/networks/DataFlowDiagram').then(m => ({ default: m.DataFlowDiagram })), { ssr: false });
const FirewallDiagram = dynamic(() => import('@/components/viz/networks/FirewallDiagram').then(m => ({ default: m.FirewallDiagram })), { ssr: false });
const MilestoneTimeline = dynamic(() => import('@/components/viz/timelines/MilestoneTimeline').then(m => ({ default: m.MilestoneTimeline })), { ssr: false });
const FundraisingTimeline = dynamic(() => import('@/components/viz/timelines/FundraisingTimeline').then(m => ({ default: m.FundraisingTimeline })), { ssr: false });

interface LondonClientProps {
  milestoneEntries: EntryRow[];
  fundraisingEntries: EntryRow[];
}

export function LondonClient({ milestoneEntries, fundraisingEntries }: LondonClientProps) {
  return (
    <>
      {/* Rangée 1 — CorridorMap pleine largeur */}
      <section>
        <div className="text-[9px] font-[family-name:var(--font-jetbrains)] text-gold tracking-[2px] mb-2 font-bold">
          CORRIDOR 22 PAYS — TANGER → LUANDA
        </div>
        <CorridorMap
          highlightCountries={[
            'MAR', 'SEN', 'CIV', 'GHA', 'NGA', 'CMR', 'GAB', 'COG', 'COD', 'AGO',
            'FRA', 'BEL', 'DEU', 'GBR', 'ESP', 'PRT', 'NLD', 'SWE', 'DNK', 'ITA', 'TUN', 'EGY',
          ]}
          metricField="pib"
          metricLabel="PIB corridor"
        />
      </section>

      {/* Rangée 2 — 2 colonnes */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="text-[9px] font-[family-name:var(--font-jetbrains)] text-gold tracking-[2px] mb-2 font-bold">
            ORGANIGRAMME EIGEN
          </div>
          <EigenOrgChart />
        </div>
        <div>
          <div className="text-[9px] font-[family-name:var(--font-jetbrains)] text-gold tracking-[2px] mb-2 font-bold">
            MATRICE SYNERGIES 10×10 ENTITÉS
          </div>
          <SynergyMatrix />
        </div>
      </section>

      {/* Rangée 3 — 2 colonnes */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="text-[9px] font-[family-name:var(--font-jetbrains)] text-gold tracking-[2px] mb-2 font-bold">
            FLUX DONNÉES NOOS → ÆLYA → MYNε → BURHAN
          </div>
          <DataFlowDiagram />
        </div>
        <div>
          <div className="text-[9px] font-[family-name:var(--font-jetbrains)] text-gold tracking-[2px] mb-2 font-bold">
            5 FIREWALLS GOUVERNANCE
          </div>
          <FirewallDiagram />
        </div>
      </section>

      {/* Rangée 4 — Timelines pleine largeur */}
      <section>
        <div className="text-[9px] font-[family-name:var(--font-jetbrains)] text-gold tracking-[2px] mb-2 font-bold">
          JALONS EIGEN 2026-2028
        </div>
        <MilestoneTimeline data={milestoneEntries} />
      </section>
      <section>
        <div className="text-[9px] font-[family-name:var(--font-jetbrains)] text-gold tracking-[2px] mb-2 font-bold">
          TIMELINE LEVÉES DE FONDS
        </div>
        <FundraisingTimeline data={fundraisingEntries} />
      </section>
    </>
  );
}
