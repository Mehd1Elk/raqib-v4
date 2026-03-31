import { fetchInvestorDashboard } from '@/lib/supabase/dashboard-queries';
import { DashboardHeader } from '@/components/dashboards/DashboardHeader';
import { DashboardFooter } from '@/components/dashboards/DashboardFooter';
import { StatCard } from '@/components/dashboards/StatCard';
import { SectionPanel } from '@/components/dashboards/SectionPanel';
import { ProgressBar } from '@/components/dashboards/ProgressBar';
import { MiniTable } from '@/components/dashboards/MiniTable';
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
  const corridors = dashboard?.corridors ?? [];
  const innerCircle = dashboard?.innerCircle ?? [];
  const fundraising = dashboard?.fundraising ?? [];

  // Build deal flow funnel from entries data
  const dealFlowStages = [
    { label: 'Identifiees', value: dealFlow.length, color: '#3D5E8C' },
    { label: 'Qualifiees', value: dealFlow.filter((d) => (d.data as any)?.notation_anti_feature_risk).length, color: '#3D7C5E' },
    { label: 'Due diligence', value: dealFlow.filter((d) => (d.data as any)?.moat).length, color: '#B8963E' },
    { label: 'Investies', value: dealFlow.filter((d) => (d.data as any)?.axe_CG).length, color: '#6E2A3D' },
  ];

  // Inner circle nodes for network
  const networkNodes = innerCircle.slice(0, 12).map((e, i) => ({
    id: e.id,
    label: (e.data as any)?.nom ?? `Contact ${i + 1}`,
    group: (e.data as any)?.role?.includes('invest') ? 'investor' : (e.data as any)?.role?.includes('conseil') ? 'advisor' : 'partner',
    size: (e.data as any)?.priorite === 'P0' ? 3 : 1,
  }));
  const networkEdges = networkNodes.map((n) => ({ from: '__center__', to: n.id }));

  // Corridor data for table
  const corridorRows = corridors.map((c) => {
    const d = c.data as any;
    return {
      pays: d?.pays ?? '\u2014',
      corridor_rang: d?.corridor_rang ?? '\u2014',
      risque: d?.risque_souverain ?? '\u2014',
      opportunite: d?.opportunite_fiscale ?? '\u2014',
    };
  });

  return (
    <div className="min-h-screen bg-cream flex flex-col">
      <DashboardHeader
        title="INVESTISSEURS · LONDRES"
        subtitle="ATS London mai 2026 · Vue CG SA"
        entityColor="#162B20"
      />

      <div className="flex-1 max-w-7xl mx-auto w-full py-6 px-6 space-y-6">
        {/* NOOS completion */}
        <section id="s-noos">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <StatCard label="NOOS Completion" value={`${noosStats?.completion_pct?.toFixed(1) ?? 0}%`} color="#3D5E8C" />
            <StatCard label="Deal flow CG SA" value={dealFlow.length} />
            <StatCard label="Inner circle" value={innerCircle.length} />
            <StatCard label="Corridors" value={corridors.length} />
          </div>
          <div className="bg-ivory border border-div rounded p-4">
            <ProgressBar
              pct={noosStats?.completion_pct ?? 0}
              label="NOOS"
              color="#3D5E8C"
              height="h-3"
            />
          </div>
        </section>

        {/* Deal flow funnel + Inner circle network */}
        <InvestorClient
          dealFlowStages={dealFlowStages}
          networkNodes={networkNodes}
          networkEdges={networkEdges}
        />

        {/* Corridor map table */}
        <SectionPanel id="s-corridors" title="CORRIDORS GEOPOLITIQUES">
          <MiniTable
            columns={[
              { key: 'pays', label: 'PAYS' },
              { key: 'corridor_rang', label: 'RANG CORRIDOR' },
              { key: 'risque', label: 'RISQUE', align: 'center' },
              { key: 'opportunite', label: 'OPPORTUNITE', align: 'center' },
            ]}
            rows={corridorRows}
            emptyMessage="Aucune donnee corridor."
          />
        </SectionPanel>

        {/* Fundraising timeline */}
        <SectionPanel id="s-fundraising" title="TIMELINE LEVEE DE FONDS">
          <MiniTable
            columns={[
              { key: 'event', label: 'EVENEMENT' },
              { key: 'dates', label: 'DATES' },
              { key: 'lieu', label: 'LIEU' },
              { key: 'cibles', label: 'CIBLES' },
            ]}
            rows={fundraising.map((f) => {
              const d = f.data as any;
              return {
                event: d?.evenement ?? '\u2014',
                dates: d?.dates ?? '\u2014',
                lieu: d?.lieu ?? '\u2014',
                cibles: d?.cibles ?? '\u2014',
              };
            })}
            emptyMessage="Aucun evenement de levee."
          />
        </SectionPanel>
      </div>

      <DashboardFooter label="INVESTISSEURS · LONDRES" />
    </div>
  );
}
