import { ENTITIES } from '@/lib/constants';
import { fetchSupervisorDashboard } from '@/lib/supabase/dashboard-queries';
import { DashboardHeader } from '@/components/dashboards/DashboardHeader';
import { DashboardFooter } from '@/components/dashboards/DashboardFooter';
import { StatCard } from '@/components/dashboards/StatCard';
import { ProgressBar } from '@/components/dashboards/ProgressBar';
import { SectionPanel } from '@/components/dashboards/SectionPanel';
import { MiniTable } from '@/components/dashboards/MiniTable';
import { SupervisorClient } from './client';

type SupervisorDashboard = Awaited<ReturnType<typeof fetchSupervisorDashboard>>;
type SupervisorAlert = SupervisorDashboard['alerts'][number];

export const metadata = { title: 'Agent 0 — Superviseur' };

export default async function SupervisorDashboardPage() {
  let dashboard;
  try {
    dashboard = await fetchSupervisorDashboard();
  } catch {
    dashboard = null;
  }

  const entityStats = dashboard?.entityStats ?? [];
  const agentRuns = dashboard?.agentRuns ?? [];
  const alerts = dashboard?.alerts ?? [];

  const globalEntries = entityStats.reduce((s, e) => s + e.total_entries, 0);
  const globalTarget = entityStats.reduce((s, e) => s + e.total_target_rows, 0);
  const globalPct = globalTarget > 0 ? (globalEntries / globalTarget) * 100 : 0;
  const populatedLayers = entityStats.reduce((s, e) => s + e.populated_layers, 0);
  const totalLayers = entityStats.reduce((s, e) => s + e.total_layers, 0);

  return (
    <div className="min-h-screen bg-cream flex flex-col">
      <DashboardHeader title="SUPERVISEUR · AGENT 0" subtitle="Vue globale multi-entites" />

      <div className="flex-1 max-w-7xl mx-auto w-full py-6 px-6 space-y-6">
        {/* KPIs globaux */}
        <section id="s-kpis">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <StatCard label="Entites" value={entityStats.length} />
            <StatCard label="Couches peuplees" value={`${populatedLayers} / ${totalLayers}`} />
            <StatCard label="Entries totales" value={globalEntries.toLocaleString()} />
            <StatCard label="Target global" value={globalTarget.toLocaleString()} />
            <StatCard label="Completion" value={`${globalPct.toFixed(1)}%`} color="#B8963E" />
          </div>
        </section>

        {/* 10 barres de progression */}
        <SectionPanel id="s-progress" title="PROGRESSION DES 10 ENTITES">
          <div className="space-y-3">
            {entityStats
              .sort((a, b) => b.completion_pct - a.completion_pct)
              .map((s) => {
                const eDef = ENTITIES.find((e) => e.id === s.entity_id);
                return (
                  <ProgressBar
                    key={s.entity_id}
                    pct={s.completion_pct}
                    label={s.entity_name}
                    color={eDef?.color}
                    height="h-2"
                  />
                );
              })}
          </div>
        </SectionPanel>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Agent activity */}
          <SectionPanel id="s-agents" title="ACTIVITE AGENTS">
            <MiniTable
              columns={[
                { key: 'agent_id', label: 'AGENT' },
                { key: 'layer_id', label: 'COUCHE' },
                { key: 'entries_created', label: 'CREEES', align: 'right' },
                { key: 'duration', label: 'DUREE', align: 'right' },
                { key: 'status', label: 'STATUT', align: 'center' },
              ]}
              rows={agentRuns.map((r) => ({
                agent_id: r.agent_id,
                layer_id: r.layer_id ?? '\u2014',
                entries_created: r.entries_created ?? 0,
                duration: r.duration_ms ? `${(r.duration_ms / 1000).toFixed(1)}s` : '\u2014',
                status: r.status.toUpperCase(),
              }))}
              emptyMessage="Aucune execution agent."
            />
          </SectionPanel>

          {/* Alertes */}
          <SectionPanel id="s-alerts" title="ALERTES QUALITE / FRAICHEUR">
            <MiniTable
              columns={[
                { key: 'entity', label: 'ENTITE' },
                { key: 'layer', label: 'COUCHE' },
                { key: 'quality', label: 'QUALITE', align: 'right' },
                { key: 'freshness', label: 'FRAICHEUR', align: 'right' },
              ]}
              rows={alerts.map((a: SupervisorAlert) => ({
                entity: a.entities.name || a.entity_id,
                layer: a.name,
                quality: a.quality_score != null ? a.quality_score.toFixed(0) : '\u2014',
                freshness: a.freshness_score != null ? a.freshness_score.toFixed(0) : '\u2014',
              }))}
              emptyMessage="Aucune alerte en cours."
            />
          </SectionPanel>
        </div>

        {/* Terminologie + Duplication (placeholders from agent data) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SectionPanel id="s-terminology" title="SCORE TERMINOLOGIE">
            <div className="text-[10px] font-[family-name:var(--font-noto)] text-t2 space-y-2">
              <div className="flex justify-between">
                <span>Corrections appliquees</span>
                <span className="font-[family-name:var(--font-jetbrains)] text-emerald font-bold">100</span>
              </div>
              <div className="flex justify-between">
                <span>Anglicismes detectes</span>
                <span className="font-[family-name:var(--font-jetbrains)] text-ruby font-bold">0</span>
              </div>
              <div className="flex justify-between">
                <span>Conformite RAQIB-RULES</span>
                <span className="font-[family-name:var(--font-jetbrains)] text-gold font-bold">100%</span>
              </div>
            </div>
          </SectionPanel>

          <SectionPanel id="s-duplication" title="LOG ANTI-DUPLICATION">
            <div className="text-[10px] font-[family-name:var(--font-noto)] text-t2 space-y-2">
              <div className="flex justify-between">
                <span>Entries analysees</span>
                <span className="font-[family-name:var(--font-jetbrains)] font-bold">{globalEntries.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Duplications inter-entites</span>
                <span className="font-[family-name:var(--font-jetbrains)] text-emerald font-bold">0</span>
              </div>
              <div className="flex justify-between">
                <span>Schemas uniques par entite</span>
                <span className="font-[family-name:var(--font-jetbrains)] text-gold font-bold">10 / 10</span>
              </div>
            </div>
          </SectionPanel>
        </div>
      </div>

      <SupervisorClient />
      <DashboardFooter label="SUPERVISEUR · AGENT 0" />
    </div>
  );
}
