'use client';

import { useEffect, useEffectEvent, useState } from 'react';
import Link from 'next/link';
import { ENTITIES } from '@/lib/constants';
import { fetchEntityStats, fetchAgentRuns, subscribeToLayerUpdates } from '@/lib/supabase/client-queries';
import type { Database } from '@/lib/supabase/types';

type EntityStatResult = Database['public']['Functions']['entity_stats']['Returns'][number];
type AgentRunRow = Database['public']['Tables']['agent_runs']['Row'];

function CompletionBar({ pct }: { pct: number }) {
  const color = pct >= 75 ? '#3D7C5E' : pct >= 25 ? '#B87D3E' : pct > 0 ? '#9C3D3D' : '#D4CCBA';
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-parchment rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${pct}%`, background: color }}
        />
      </div>
      <span
        className="text-[9px] font-[family-name:var(--font-jetbrains)] font-bold w-10 text-right"
        style={{ color }}
      >
        {pct.toFixed(0)}%
      </span>
    </div>
  );
}

export default function StatsPage() {
  const [stats, setStats] = useState<EntityStatResult[]>([]);
  const [runs, setRuns] = useState<AgentRunRow[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = useEffectEvent(async () => {
    try {
      const [statsData, runsData] = await Promise.all([
        fetchEntityStats(),
        fetchAgentRuns(10),
      ]);
      setStats(statsData);
      setRuns(runsData);
    } catch {
      // Supabase not available
    }
    setLoading(false);
  });

  useEffect(() => {
    void loadData();
  }, []);

  // Realtime: refresh stats when layers are updated
  useEffect(() => {
    const unsub = subscribeToLayerUpdates(() => {
      void loadData();
    });
    return unsub;
  }, []);

  const globalStats = stats.reduce(
    (acc, s) => ({
      totalLayers: acc.totalLayers + s.total_layers,
      populatedLayers: acc.populatedLayers + s.populated_layers,
      totalEntries: acc.totalEntries + s.total_entries,
      totalTarget: acc.totalTarget + s.total_target_rows,
    }),
    { totalLayers: 0, populatedLayers: 0, totalEntries: 0, totalTarget: 0 }
  );

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <div className="h-[52px] flex items-center justify-between px-6 border-b border-div bg-ivory">
        <div className="flex items-center gap-3.5">
          <div className="w-1.5 h-1.5 rounded-full bg-gold" />
          <Link
            href="/"
            className="font-[family-name:var(--font-cormorant)] text-[22px] font-bold italic text-noir tracking-[3px] no-underline hover:text-gold transition-colors"
          >
            Raqib
          </Link>
          <span className="font-[family-name:var(--font-cormorant)] text-[15px] text-sand">
            رقيب
          </span>
          <div className="w-px h-5 bg-div" />
          <span className="text-[9px] text-t3 font-[family-name:var(--font-jetbrains)] tracking-[2px]">
            V4 · PROGRESSION GLOBALE
          </span>
        </div>
        <Link
          href="/"
          className="text-[9px] font-[family-name:var(--font-jetbrains)] text-tm hover:text-gold no-underline transition-colors"
        >
          ← DASHBOARD
        </Link>
      </div>

      <div className="max-w-6xl mx-auto py-8 px-6">
        {/* Global summary */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {[
            { label: 'COUCHES', value: `${globalStats.populatedLayers} / ${globalStats.totalLayers}` },
            { label: 'ENTRIES TOTALES', value: globalStats.totalEntries.toLocaleString() },
            { label: 'TARGET TOTAL', value: globalStats.totalTarget.toLocaleString() },
            { label: 'COMPLETION', value: globalStats.totalTarget > 0 ? `${((globalStats.totalEntries / globalStats.totalTarget) * 100).toFixed(1)}%` : '0%' },
          ].map((item) => (
            <div key={item.label} className="bg-ivory border border-div rounded p-4">
              <div className="text-[8px] font-[family-name:var(--font-jetbrains)] text-tm tracking-[1px] mb-1">
                {item.label}
              </div>
              <div className="text-lg font-[family-name:var(--font-cormorant)] font-bold italic text-noir">
                {item.value}
              </div>
            </div>
          ))}
        </div>

        {/* Entity progress table */}
        <div className="bg-ivory border border-div rounded overflow-hidden mb-8">
          <div className="px-4 py-3 border-b border-div">
            <span className="text-[10px] font-[family-name:var(--font-jetbrains)] text-gold tracking-[1px] font-bold">
              PROGRESSION PAR ENTITÉ
            </span>
          </div>

          {loading ? (
            <div className="p-8 text-center text-[10px] font-[family-name:var(--font-jetbrains)] text-tm animate-pulse">
              Chargement des statistiques...
            </div>
          ) : stats.length === 0 ? (
            <div className="p-8 text-center text-[10px] font-[family-name:var(--font-noto)] text-tm">
              Aucune donnée disponible. Le seed Supabase n&apos;est peut-être pas encore exécuté.
            </div>
          ) : (
            <table className="w-full text-[10px] font-[family-name:var(--font-noto)]">
              <thead>
                <tr className="border-b border-div bg-cream">
                  <th className="text-left px-4 py-2 font-semibold text-t3 font-[family-name:var(--font-jetbrains)]">ENTITÉ</th>
                  <th className="text-left px-4 py-2 font-semibold text-t3 font-[family-name:var(--font-jetbrains)]">TYPE</th>
                  <th className="text-right px-4 py-2 font-semibold text-t3 font-[family-name:var(--font-jetbrains)]">PEUPLÉES</th>
                  <th className="text-right px-4 py-2 font-semibold text-t3 font-[family-name:var(--font-jetbrains)]">ENTRIES</th>
                  <th className="text-right px-4 py-2 font-semibold text-t3 font-[family-name:var(--font-jetbrains)]">FRESHNESS</th>
                  <th className="text-right px-4 py-2 font-semibold text-t3 font-[family-name:var(--font-jetbrains)]">QUALITY</th>
                  <th className="px-4 py-2 font-semibold text-t3 font-[family-name:var(--font-jetbrains)] w-[200px]">COMPLETION</th>
                </tr>
              </thead>
              <tbody>
                {stats.map((s) => {
                  const entity = ENTITIES.find((e) => e.id === s.entity_id);
                  return (
                    <tr key={s.entity_id} className="border-b border-div-l hover:bg-cream/50">
                      <td className="px-4 py-2.5">
                        <span className="font-[family-name:var(--font-cormorant)] font-bold italic text-[12px]" style={{ color: entity?.color }}>
                          {s.entity_name}
                        </span>
                      </td>
                      <td className="px-4 py-2.5 text-[8px] font-[family-name:var(--font-jetbrains)] text-t3">
                        {s.entity_type}
                      </td>
                      <td className="px-4 py-2.5 text-right font-[family-name:var(--font-jetbrains)]">
                        {s.populated_layers} / {s.total_layers}
                      </td>
                      <td className="px-4 py-2.5 text-right font-[family-name:var(--font-jetbrains)]">
                        {s.total_entries.toLocaleString()}
                      </td>
                      <td className="px-4 py-2.5 text-right font-[family-name:var(--font-jetbrains)]">
                        {s.avg_freshness > 0 ? s.avg_freshness.toFixed(0) : '—'}
                      </td>
                      <td className="px-4 py-2.5 text-right font-[family-name:var(--font-jetbrains)]">
                        {s.avg_quality > 0 ? s.avg_quality.toFixed(0) : '—'}
                      </td>
                      <td className="px-4 py-2.5">
                        <CompletionBar pct={s.completion_pct ?? 0} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>

        {/* Agent runs */}
        <div className="bg-ivory border border-div rounded overflow-hidden">
          <div className="px-4 py-3 border-b border-div">
            <span className="text-[10px] font-[family-name:var(--font-jetbrains)] text-gold tracking-[1px] font-bold">
              DERNIÈRES EXÉCUTIONS AGENTS
            </span>
          </div>

          {runs.length === 0 ? (
            <div className="p-8 text-center text-[10px] font-[family-name:var(--font-noto)] text-tm">
              Aucune exécution d&apos;agent enregistrée.
            </div>
          ) : (
            <table className="w-full text-[10px] font-[family-name:var(--font-noto)]">
              <thead>
                <tr className="border-b border-div bg-cream">
                  <th className="text-left px-4 py-2 font-semibold text-t3 font-[family-name:var(--font-jetbrains)]">AGENT</th>
                  <th className="text-left px-4 py-2 font-semibold text-t3 font-[family-name:var(--font-jetbrains)]">LAYER</th>
                  <th className="text-right px-4 py-2 font-semibold text-t3 font-[family-name:var(--font-jetbrains)]">CREATED</th>
                  <th className="text-right px-4 py-2 font-semibold text-t3 font-[family-name:var(--font-jetbrains)]">DURÉE</th>
                  <th className="text-center px-4 py-2 font-semibold text-t3 font-[family-name:var(--font-jetbrains)]">STATUT</th>
                </tr>
              </thead>
              <tbody>
                {runs.map((run) => {
                  const statusColor = run.status === 'success' ? '#3D7C5E' : run.status === 'running' ? '#B87D3E' : '#9C3D3D';
                  return (
                    <tr key={run.id} className="border-b border-div-l hover:bg-cream/50">
                      <td className="px-4 py-2 font-[family-name:var(--font-jetbrains)]">{run.agent_id}</td>
                      <td className="px-4 py-2 font-[family-name:var(--font-jetbrains)]">{run.layer_id ?? '—'}</td>
                      <td className="px-4 py-2 text-right font-[family-name:var(--font-jetbrains)] text-t3">
                        {run.entries_created ?? 0}
                      </td>
                      <td className="px-4 py-2 text-right font-[family-name:var(--font-jetbrains)] text-t3">
                        {run.duration_ms ? `${(run.duration_ms / 1000).toFixed(1)}s` : '—'}
                      </td>
                      <td className="px-4 py-2 text-center">
                        <span
                          className="px-2 py-0.5 rounded text-[8px] font-[family-name:var(--font-jetbrains)] font-semibold"
                          style={{ color: statusColor, background: `${statusColor}0D`, border: `1px solid ${statusColor}22` }}
                        >
                          {run.status.toUpperCase()}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="h-[26px] flex items-center justify-between px-6 border-t border-div bg-ivory">
        <span className="text-[7px] text-tm font-[family-name:var(--font-jetbrains)]">
          RAQIB V4 · PROGRESSION GLOBALE
        </span>
        <span className="text-[7px] text-gold font-[family-name:var(--font-jetbrains)]">
          EIGEN HOLDING SAS
        </span>
      </div>
    </div>
  );
}
