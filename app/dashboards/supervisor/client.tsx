'use client';

import dynamic from 'next/dynamic';
import type { Database } from '@/lib/supabase/types';

type EntryRow = Database['public']['Tables']['entries']['Row'];

const EntitiesBarChart = dynamic(() => import('@/components/viz/charts/EntitiesBarChart').then(m => ({ default: m.EntitiesBarChart })), { ssr: false });
const AgentActivityTimeline = dynamic(() => import('@/components/viz/timelines/AgentActivityTimeline').then(m => ({ default: m.AgentActivityTimeline })), { ssr: false });
const PlatformsPieChart = dynamic(() => import('@/components/viz/charts/PlatformsPieChart').then(m => ({ default: m.PlatformsPieChart })), { ssr: false });
const TimelineLineChart = dynamic(() => import('@/components/viz/charts/TimelineLineChart').then(m => ({ default: m.TimelineLineChart })), { ssr: false });

interface SupervisorClientProps {
  agentRunEntries: EntryRow[];
  alerts: { entity: string; layer: string; quality: string; freshness: string }[];
}

export function SupervisorClient({ agentRunEntries, alerts }: SupervisorClientProps) {
  return (
    <>
      {/* Rangée 2 — EntitiesBarChart pleine largeur */}
      <section>
        <div className="text-[9px] font-[family-name:var(--font-jetbrains)] text-gold tracking-[2px] mb-2 font-bold">
          PROGRESSION PAR ENTITÉ — 10 BARRES
        </div>
        <EntitiesBarChart />
      </section>

      {/* Rangée 3 — 2 colonnes */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="text-[9px] font-[family-name:var(--font-jetbrains)] text-gold tracking-[2px] mb-2 font-bold">
            GANTT AGENTS — ACTIVITÉ TEMPS RÉEL
          </div>
          <AgentActivityTimeline data={agentRunEntries} />
        </div>
        <div>
          <div className="text-[9px] font-[family-name:var(--font-jetbrains)] text-gold tracking-[2px] mb-2 font-bold">
            DISTRIBUTION 1000 COUCHES PAR PLATEFORME
          </div>
          <PlatformsPieChart />
        </div>
      </section>

      {/* Rangée 4 — TimelineLineChart pleine largeur */}
      <section>
        <div className="text-[9px] font-[family-name:var(--font-jetbrains)] text-gold tracking-[2px] mb-2 font-bold">
          ÉVOLUTION ENTRIES / JOUR
        </div>
        <TimelineLineChart />
      </section>

      {/* Rangée 5 — Alertes */}
      <section className="bg-ivory border border-div rounded overflow-hidden">
        <div className="px-4 py-3 border-b border-div">
          <span className="text-[10px] font-[family-name:var(--font-jetbrains)] text-ruby tracking-[1px] font-bold">
            ALERTES EN COURS
          </span>
        </div>
        {alerts.length === 0 ? (
          <div className="p-6 text-center text-[10px] font-[family-name:var(--font-noto)] text-tm">
            Aucune alerte active — tous les scores sont nominaux.
          </div>
        ) : (
          <div className="divide-y divide-div-l">
            {alerts.map((a, i) => (
              <div key={i} className="px-4 py-2.5 flex items-center gap-4 hover:bg-cream/50">
                <span className="w-1.5 h-1.5 rounded-full bg-ruby shrink-0" />
                <span className="text-[10px] font-[family-name:var(--font-cormorant)] font-bold italic text-t1 w-24">{a.entity}</span>
                <span className="text-[10px] font-[family-name:var(--font-noto)] text-t2 flex-1 truncate">{a.layer}</span>
                <span className="text-[9px] font-[family-name:var(--font-jetbrains)] text-tm">Q:{a.quality}</span>
                <span className="text-[9px] font-[family-name:var(--font-jetbrains)] text-tm">F:{a.freshness}</span>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
