'use client';

import dynamic from 'next/dynamic';
import type { Database } from '@/lib/supabase/types';
import { DataTable } from '@/components/viz/tables/DataTable';

type EntryRow = Database['public']['Tables']['entries']['Row'];

const LoadingViz = ({ h = 400 }: { h?: number }) => <div className={`bg-[#F7F3EA] animate-pulse rounded`} style={{ height: h }} />;

const RouteMap = dynamic(() => import('@/components/viz/maps/RouteMap').then(m => ({ default: m.RouteMap })), { ssr: false, loading: () => <LoadingViz /> });
const NetworkGraph = dynamic(() => import('@/components/viz/networks/NetworkGraph').then(m => ({ default: m.NetworkGraph })), { ssr: false, loading: () => <LoadingViz /> });
const EventTimeline = dynamic(() => import('@/components/viz/timelines/EventTimeline').then(m => ({ default: m.EventTimeline })), { ssr: false, loading: () => <LoadingViz h={200} /> });

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
