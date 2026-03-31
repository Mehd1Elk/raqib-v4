'use client';

import type { Database } from '@/lib/supabase/types';
import { DataTable } from '@/components/viz/tables/DataTable';
import { RouteMap, NetworkGraph, EventTimeline } from '@/lib/viz-dynamic';

type EntryRow = Database['public']['Tables']['entries']['Row'];

interface GitexClientProps {
  eventEntries: EntryRow[];
  contactEntries: EntryRow[];
}

export function GitexClient({ eventEntries, contactEntries }: GitexClientProps) {
  return (
    <>
      {/* Rangée 1 — Hero : RouteMap pleine largeur */}
      <section>
        <div className="text-[9px] font-[family-name:var(--font-jetbrains)] text-gold tracking-[2px] mb-2 font-bold">
          ITINÉRAIRE GITEX MARRAKECH — 38 CIBLES PROFILÉES
        </div>
        <RouteMap layerId="cg61" />
      </section>

      {/* Rangée 2 — 2 colonnes */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="text-[9px] font-[family-name:var(--font-jetbrains)] text-gold tracking-[2px] mb-2 font-bold">
            RÉSEAU CONTACTS GITEX
          </div>
          <NetworkGraph />
        </div>
        <div>
          <div className="text-[9px] font-[family-name:var(--font-jetbrains)] text-gold tracking-[2px] mb-2 font-bold">
            AGENDA JOUR PAR JOUR
          </div>
          <EventTimeline data={eventEntries} />
        </div>
      </section>

      {/* Rangée 3 — DataTable contacts qualifiés */}
      <section>
        <div className="text-[9px] font-[family-name:var(--font-jetbrains)] text-gold tracking-[2px] mb-2 font-bold">
          CONTACTS QUALIFIÉS — FILTRABLE PAR TYPE
        </div>
        <DataTable
          entries={contactEntries}
          layerId="cd61"
          layerName="Intelligence GITEX"
          platformName="Perplexity"
          totalRows={contactEntries.length}
        />
      </section>
    </>
  );
}
