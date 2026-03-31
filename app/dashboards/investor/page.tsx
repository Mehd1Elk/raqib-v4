import { fetchInvestorDashboard } from '@/lib/supabase/dashboard-queries';
import { DashboardHeader } from '@/components/dashboards/DashboardHeader';
import { DashboardFooter } from '@/components/dashboards/DashboardFooter';
import { StatCard } from '@/components/dashboards/StatCard';
import { InvestorClient } from './client';

export const metadata = { title: 'Investisseurs Londres — Tableau de bord' };

export default async function InvestorDashboardPage() {
  let dashboard;
  try {
    dashboard = await fetchInvestorDashboard();
  } catch {
    dashboard = null;
  }

  const noosStats = dashboard?.noosStats;
  const dealFlow = dashboard?.dealFlow ?? [];
  const innerCircle = dashboard?.innerCircle ?? [];
  const corridors = dashboard?.corridors ?? [];
  const fundraising = dashboard?.fundraising ?? [];

  return (
    <div className="min-h-screen bg-cream flex flex-col">
      <DashboardHeader
        title="INVESTISSEURS · LONDRES"
        subtitle="ATS London mai 2026 · Vue CG SA"
        entityColor="#162B20"
      />

      <div className="flex-1 max-w-7xl mx-auto w-full py-6 px-6 space-y-6">
        {/* KPI Cards */}
        <section>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard label="NOOS Completion" value={`${noosStats?.completion_pct?.toFixed(1) ?? 0}%`} color="#3D5E8C" />
            <StatCard label="Deal flow CG SA" value={dealFlow.length} />
            <StatCard label="Inner circle" value={innerCircle.length} />
            <StatCard label="Corridors" value={corridors.length} />
          </div>
        </section>

        {/* All visual components via client */}
        <InvestorClient fundraisingEntries={fundraising as any} />
      </div>

      <DashboardFooter label="INVESTISSEURS · LONDRES" />
    </div>
  );
}
