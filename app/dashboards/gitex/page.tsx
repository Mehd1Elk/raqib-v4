import { fetchGitexDashboard } from '@/lib/supabase/dashboard-queries';
import { DashboardHeader } from '@/components/dashboards/DashboardHeader';
import { DashboardFooter } from '@/components/dashboards/DashboardFooter';
import { StatCard } from '@/components/dashboards/StatCard';
import { ExportPDFButton } from '@/components/ExportPDFButton';
import { GitexClient } from './client';

export const metadata = { title: 'GITEX Avril 2026 — Tableau de bord' };

export default async function GitexDashboardPage() {
  let dashboard;
  try {
    dashboard = await fetchGitexDashboard();
  } catch {
    dashboard = null;
  }

  const events = dashboard?.events ?? [];
  const intelligence = dashboard?.intelligence ?? [];
  const cgLogistics = dashboard?.cgLogistics ?? [];
  const cdLogistics = dashboard?.cdLogistics ?? [];

  return (
    <div className="min-h-screen bg-cream flex flex-col">
      <DashboardHeader
        title="GITEX · AVRIL 2026"
        subtitle="Marrakech · Palais des Congrès"
        entityColor="#B87D3E"
      >
        <ExportPDFButton elementId="dashboard-content" title="Dashboard GITEX" />
      </DashboardHeader>

      <div id="dashboard-content" className="flex-1 max-w-7xl mx-auto w-full py-6 px-6 space-y-6">
        {/* KPIs */}
        <section>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard label="Cibles identifiées" value={intelligence.length} color="#B87D3E" />
            <StatCard label="Événements CG" value={events.length} />
            <StatCard label="Jalons logistiques" value={cgLogistics.length + cdLogistics.length} />
            <StatCard label="Contacts qualifiés" value={intelligence.filter((c) => (c.data as any)?.notation).length} />
          </div>
        </section>

        {/* Visual components via client */}
        <GitexClient eventEntries={events as any} contactEntries={intelligence as any} />
      </div>

      <DashboardFooter label="GITEX · AVRIL 2026" />
    </div>
  );
}
