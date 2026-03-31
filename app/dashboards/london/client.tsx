'use client';

import type { Database } from '@/lib/supabase/types';
import {
  CorridorMap,
  EigenOrgChart,
  SynergyMatrix,
  DataFlowDiagram,
  FirewallDiagram,
  MilestoneTimeline,
  FundraisingTimeline,
} from '@/lib/viz-dynamic';

type EntryRow = Database['public']['Tables']['entries']['Row'];

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
