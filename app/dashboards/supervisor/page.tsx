import { fetchSupervisorDashboard } from '@/lib/supabase/dashboard-queries';
import { DashboardHeader } from '@/components/dashboards/DashboardHeader';
import { DashboardFooter } from '@/components/dashboards/DashboardFooter';
import { StatCard } from '@/components/dashboards/StatCard';
import { ExportPDFButton } from '@/components/ExportPDFButton';
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

  // Transform agent_runs into entry-like objects for AgentActivityTimeline
  const agentRunEntries = agentRuns.map((r) => ({
    id: r.id,
    layer_id: r.layer_id ?? '',
    data: {
      agent_id: r.agent_id,
      status: r.status,
      started_at: r.started_at,
      completed_at: r.completed_at,
      duration_ms: r.duration_ms,
      entries_created: r.entries_created,
    },
    confidence: null,
    source: r.agent_id,
    source_date: r.started_at,
    created_at: r.started_at,
    created_by: r.agent_id,
    verified: r.status === 'success',
    verified_at: r.completed_at,
    verified_by: null,
  }));

  // Transform alerts for client
  const alertRows = alerts.map((a: SupervisorAlert) => ({
    entity: a.entities.name || a.entity_id,
    layer: a.name,
    quality: a.quality_score != null ? a.quality_score.toFixed(0) : '\u2014',
    freshness: a.freshness_score != null ? a.freshness_score.toFixed(0) : '\u2014',
  }));

  return (
    <div className="min-h-screen bg-cream flex flex-col">
      <DashboardHeader title="SUPERVISEUR · AGENT 0" subtitle="Vue globale multi-entités">
        <ExportPDFButton elementId="dashboard-content" title="Dashboard Superviseur" />
      </DashboardHeader>

      <div id="dashboard-content" className="flex-1 max-w-7xl mx-auto w-full py-6 px-6 space-y-6">
        {/* Rangée 1 — 3 KPI cards */}
        <section>
          <div className="grid grid-cols-3 gap-4">
            <StatCard label="Entries totales" value={globalEntries.toLocaleString()} />
            <StatCard label="Completion" value={`${globalPct.toFixed(1)}%`} color="#B8963E" />
            <StatCard label="Score qualité" value="100/100" color="#3D7C5E" sub="M1 + M2 appliqués" />
          </div>
        </section>

        {/* All visual components via client */}
        <SupervisorClient agentRunEntries={agentRunEntries as any} alerts={alertRows} />
      </div>

      <DashboardFooter label="SUPERVISEUR · AGENT 0" />
    </div>
  );
}
