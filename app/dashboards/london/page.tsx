import { fetchLondonDashboard } from '@/lib/supabase/dashboard-queries';
import { DashboardHeader } from '@/components/dashboards/DashboardHeader';
import { DashboardFooter } from '@/components/dashboards/DashboardFooter';
import { StatCard } from '@/components/dashboards/StatCard';
import { LondonClient } from './client';

export const metadata = { title: 'ATS London Mai 2026 — Tableau de bord' };

export default async function LondonDashboardPage() {
  let dashboard;
  try {
    dashboard = await fetchLondonDashboard();
  } catch {
    dashboard = null;
  }

  const investorTargets = dashboard?.investorTargets ?? [];
  const architecture = dashboard?.architecture ?? [];
  const portfolio = dashboard?.portfolio ?? [];
  const operationnel = dashboard?.operationnel ?? [];
  const allStats = dashboard?.allStats ?? [];

  const totalEntries = allStats.reduce((s, e) => s + e.total_entries, 0);

  return (
    <div className="min-h-screen bg-cream flex flex-col">
      <DashboardHeader
        title="ATS LONDON · MAI 2026"
        subtitle="38 cibles investisseurs · Due diligence"
        entityColor="#162B20"
      />

      <div className="flex-1 max-w-7xl mx-auto w-full py-6 px-6 space-y-6">
        {/* KPIs */}
        <section>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard label="Cibles investisseurs" value={investorTargets.length || 38} color="#162B20" />
            <StatCard label="Entries totales" value={totalEntries.toLocaleString()} />
            <StatCard label="Architecture" value={`${architecture.length} entités`} />
            <StatCard label="Data room" value={`${operationnel.length} docs`} />
          </div>
        </section>

        {/* Visual components via client */}
        <LondonClient
          milestoneEntries={operationnel as any}
          fundraisingEntries={portfolio as any}
        />
      </div>

      <DashboardFooter label="ATS LONDON · MAI 2026" />
    </div>
  );
}
