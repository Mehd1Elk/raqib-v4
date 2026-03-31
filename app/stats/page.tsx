'use client';

import { useEffect, useEffectEvent, useState } from 'react';
import Link from 'next/link';
import { ENTITIES } from '@/lib/constants';
import {
  fetchEntityStats,
  fetchAgentRuns,
  fetchConfidenceStats,
  subscribeToLayerUpdates,
} from '@/lib/supabase/client-queries';
import type { Database } from '@/lib/supabase/types';

type EntityStatResult = Database['public']['Functions']['entity_stats']['Returns'][number];
type AgentRunRow = Database['public']['Tables']['agent_runs']['Row'];

// ═══════ Quality scores from Mission 1 & 2 audits ═══════
const TERMINOLOGY_SCORES: Record<string, { before: number; after: number }> = {
  noos: { before: 58.5, after: 100 },
  aelya: { before: 96, after: 100 },
  myne: { before: 81, after: 100 },
  burhan: { before: 98, after: 100 },
  yrknown: { before: 96, after: 100 },
  diwane: { before: 98, after: 100 },
  alguesov: { before: 93, after: 100 },
  amana: { before: 93, after: 100 },
  cg: { before: 86, after: 100 },
  cercle: { before: 89, after: 100 },
};
const REGULATORY_SCORE = { before: 90.4, after: 100 };

// ═══════ Shared CompletionBar ═══════
function CompletionBar({ pct, color }: { pct: number; color?: string }) {
  const barColor = color ?? (pct >= 75 ? '#3D7C5E' : pct >= 25 ? '#B87D3E' : pct > 0 ? '#9C3D3D' : '#D4CCBA');
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-parchment rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${Math.min(pct, 100)}%`, background: barColor }}
        />
      </div>
      <span
        className="text-[9px] font-[family-name:var(--font-jetbrains)] font-bold w-10 text-right"
        style={{ color: barColor }}
      >
        {pct.toFixed(0)}%
      </span>
    </div>
  );
}

// ═══════ ProgressDashboard ═══════
function ProgressDashboard({
  stats,
  lastUpdate,
}: {
  stats: EntityStatResult[];
  lastUpdate: Date | null;
}) {
  return (
    <div className="bg-ivory border border-div rounded overflow-hidden mb-8">
      <div className="px-4 py-3 border-b border-div flex items-center justify-between">
        <span className="text-[10px] font-[family-name:var(--font-jetbrains)] text-gold tracking-[1px] font-bold">
          PROGRESSION PAR ENTITÉ — ACTUAL / TARGET ROWS
        </span>
        {lastUpdate && (
          <span className="text-[8px] font-[family-name:var(--font-jetbrains)] text-tm">
            MAJ {lastUpdate.toLocaleTimeString('fr-FR')}
          </span>
        )}
      </div>
      <div className="p-4 space-y-3">
        {stats.map((s) => {
          const entity = ENTITIES.find((e) => e.id === s.entity_id);
          const pct = s.total_target_rows > 0 ? (s.total_entries / s.total_target_rows) * 100 : 0;
          const barColor = pct >= 75 ? '#3D7C5E' : pct >= 25 ? '#B87D3E' : '#9C3D3D';
          return (
            <div key={s.entity_id}>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ background: entity?.color }}
                  />
                  <span
                    className="text-[11px] font-[family-name:var(--font-cormorant)] font-bold italic"
                    style={{ color: entity?.color }}
                  >
                    {s.entity_name}
                  </span>
                  <span className="text-[8px] font-[family-name:var(--font-jetbrains)] text-t3">
                    {s.entity_type}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[9px] font-[family-name:var(--font-jetbrains)] text-t2">
                    {s.total_entries.toLocaleString()} / {s.total_target_rows.toLocaleString()}
                  </span>
                  <span className="text-[8px] font-[family-name:var(--font-jetbrains)] text-tm">
                    {s.populated_layers}/{s.total_layers} couches
                  </span>
                </div>
              </div>
              <CompletionBar pct={pct} color={barColor} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ═══════ QualityScore ═══════
function QualityScore({
  stats,
  confidenceData,
}: {
  stats: EntityStatResult[];
  confidenceData: { entity_id: string; high_confidence: number; total: number }[];
}) {
  return (
    <div className="bg-ivory border border-div rounded overflow-hidden mb-8">
      <div className="px-4 py-3 border-b border-div">
        <span className="text-[10px] font-[family-name:var(--font-jetbrains)] text-gold tracking-[1px] font-bold">
          QUALITÉ — SCORES MISSIONS & CONFIANCE
        </span>
      </div>

      {/* Mission scores summary */}
      <div className="grid grid-cols-2 gap-4 p-4 border-b border-div">
        <div className="bg-cream rounded p-3">
          <div className="text-[8px] font-[family-name:var(--font-jetbrains)] text-tm tracking-[1px] mb-1">
            M1 TERMINOLOGIE (MOY.)
          </div>
          <div className="text-lg font-[family-name:var(--font-cormorant)] font-bold italic text-emerald">
            100/100
          </div>
          <div className="text-[8px] font-[family-name:var(--font-jetbrains)] text-tm">
            avant : {(Object.values(TERMINOLOGY_SCORES).reduce((a, v) => a + v.before, 0) / 10).toFixed(1)}
          </div>
        </div>
        <div className="bg-cream rounded p-3">
          <div className="text-[8px] font-[family-name:var(--font-jetbrains)] text-tm tracking-[1px] mb-1">
            M2 RÉGLEMENTAIRE
          </div>
          <div className="text-lg font-[family-name:var(--font-cormorant)] font-bold italic text-emerald">
            {REGULATORY_SCORE.after}/100
          </div>
          <div className="text-[8px] font-[family-name:var(--font-jetbrains)] text-tm">
            avant : {REGULATORY_SCORE.before}
          </div>
        </div>
      </div>

      {/* Per-entity detail */}
      <table className="w-full text-[10px] font-[family-name:var(--font-noto)]">
        <thead>
          <tr className="border-b border-div bg-cream">
            <th className="text-left px-4 py-2 font-semibold text-t3 font-[family-name:var(--font-jetbrains)]">ENTITÉ</th>
            <th className="text-center px-4 py-2 font-semibold text-t3 font-[family-name:var(--font-jetbrains)]">M1 AVANT</th>
            <th className="text-center px-4 py-2 font-semibold text-t3 font-[family-name:var(--font-jetbrains)]">M1 APRÈS</th>
            <th className="text-center px-4 py-2 font-semibold text-t3 font-[family-name:var(--font-jetbrains)]">CONFIANCE ≥ 0.85</th>
            <th className="px-4 py-2 font-semibold text-t3 font-[family-name:var(--font-jetbrains)] w-[140px]">RATIO</th>
          </tr>
        </thead>
        <tbody>
          {stats.map((s) => {
            const entity = ENTITIES.find((e) => e.id === s.entity_id);
            const termScore = TERMINOLOGY_SCORES[s.entity_id];
            const conf = confidenceData.find((c) => c.entity_id === s.entity_id);
            const confPct = conf && conf.total > 0 ? (conf.high_confidence / conf.total) * 100 : 0;
            return (
              <tr key={s.entity_id} className="border-b border-div-l hover:bg-cream/50">
                <td className="px-4 py-2.5">
                  <span
                    className="font-[family-name:var(--font-cormorant)] font-bold italic text-[12px]"
                    style={{ color: entity?.color }}
                  >
                    {s.entity_name}
                  </span>
                </td>
                <td className="px-4 py-2.5 text-center font-[family-name:var(--font-jetbrains)] text-tm">
                  {termScore?.before ?? '—'}
                </td>
                <td className="px-4 py-2.5 text-center font-[family-name:var(--font-jetbrains)] text-emerald font-bold">
                  {termScore?.after ?? '—'}
                </td>
                <td className="px-4 py-2.5 text-center font-[family-name:var(--font-jetbrains)]">
                  {conf ? `${conf.high_confidence} / ${conf.total}` : '—'}
                </td>
                <td className="px-4 py-2.5">
                  <CompletionBar pct={confPct} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

// ═══════ Main Page ═══════
export default function StatsPage() {
  const [stats, setStats] = useState<EntityStatResult[]>([]);
  const [runs, setRuns] = useState<AgentRunRow[]>([]);
  const [confidenceData, setConfidenceData] = useState<{ entity_id: string; high_confidence: number; total: number }[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  const loadData = useEffectEvent(async () => {
    try {
      const [statsData, runsData, confData] = await Promise.all([
        fetchEntityStats(),
        fetchAgentRuns(10),
        fetchConfidenceStats(),
      ]);
      setStats(statsData);
      setRuns(runsData);
      setConfidenceData(confData);
      setLastUpdate(new Date());
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

  // Auto-refresh every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      void loadData();
    }, 30_000);
    return () => clearInterval(interval);
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

  const totalHighConf = confidenceData.reduce((a, c) => a + c.high_confidence, 0);
  const totalConf = confidenceData.reduce((a, c) => a + c.total, 0);

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
        <div className="grid grid-cols-5 gap-4 mb-8">
          {[
            { label: 'COUCHES', value: `${globalStats.populatedLayers} / ${globalStats.totalLayers}` },
            { label: 'ENTRIES TOTALES', value: globalStats.totalEntries.toLocaleString() },
            { label: 'TARGET TOTAL', value: globalStats.totalTarget.toLocaleString() },
            { label: 'COMPLETION', value: globalStats.totalTarget > 0 ? `${((globalStats.totalEntries / globalStats.totalTarget) * 100).toFixed(1)}%` : '0%' },
            { label: 'CONFIANCE ≥ 0.85', value: totalConf > 0 ? `${((totalHighConf / totalConf) * 100).toFixed(0)}%` : '—' },
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

        {loading ? (
          <div className="p-8 text-center text-[10px] font-[family-name:var(--font-jetbrains)] text-tm animate-pulse">
            Chargement des statistiques...
          </div>
        ) : stats.length === 0 ? (
          <div className="p-8 text-center text-[10px] font-[family-name:var(--font-noto)] text-tm">
            Aucune donnée disponible.
          </div>
        ) : (
          <>
            {/* ProgressDashboard */}
            <ProgressDashboard stats={stats} lastUpdate={lastUpdate} />

            {/* QualityScore */}
            <QualityScore stats={stats} confidenceData={confidenceData} />
          </>
        )}

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
          RAQIB V4 · PROGRESSION GLOBALE · Refresh auto 30s
        </span>
        <span className="text-[7px] text-gold font-[family-name:var(--font-jetbrains)]">
          EIGEN HOLDING SAS
        </span>
      </div>
    </div>
  );
}
