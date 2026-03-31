import { ENTITIES } from '@/lib/constants';
import { fetchLondonDashboard } from '@/lib/supabase/dashboard-queries';
import { DashboardHeader } from '@/components/dashboards/DashboardHeader';
import { DashboardFooter } from '@/components/dashboards/DashboardFooter';
import { StatCard } from '@/components/dashboards/StatCard';
import { ProgressBar } from '@/components/dashboards/ProgressBar';
import { SectionPanel } from '@/components/dashboards/SectionPanel';
import { MiniTable } from '@/components/dashboards/MiniTable';
import { ChecklistPanel } from '@/components/dashboards/ChecklistPanel';
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

  // Investor target rows
  const investorRows = investorTargets.map((t) => {
    const d = t.data as any;
    return {
      nom: d?.nom ?? d?.nom_fonds ?? '\u2014',
      role: d?.role ?? d?.these ?? '\u2014',
      organisation: d?.organisation ?? d?.geographies ?? '\u2014',
      priorite: d?.priorite ?? d?.AUM_USD ?? '\u2014',
    };
  });

  // Architecture organigramme
  const archRows = architecture.map((a) => {
    const d = a.data as any;
    return {
      entite: d?.entite ?? '\u2014',
      type: d?.type_subsidiaire ?? '\u2014',
      juridiction: d?.juridiction ?? '\u2014',
      stade: d?.stade ?? '\u2014',
      synergies: d?.synergies ?? '\u2014',
    };
  });

  // Portfolio / comparables
  const portfolioRows = portfolio.map((p) => {
    const d = p.data as any;
    return {
      entite: d?.entite_Eigen ?? '\u2014',
      valorisation: d?.valorisation ?? '\u2014',
      jalons: d?.jalons_vesting ?? '\u2014',
      mecanisme: d?.mecanisme_exit ?? '\u2014',
    };
  });

  // Data room checklist from operationnel
  const dataRoomItems = operationnel.map((o) => {
    const d = o.data as any;
    return {
      label: d?.jalon ?? d?.document ?? '\u2014',
      done: d?.statut === 'done' || d?.statut === 'termine' || d?.statut === 'complet',
      detail: d?.deadline ?? d?.responsable ?? undefined,
    };
  });

  // Fallback checklist if no data
  const checklist = dataRoomItems.length
    ? dataRoomItems
    : [
        { label: 'Pitch deck Eigen V4', done: true, detail: 'v4.2 finalisee' },
        { label: 'Financial model 2024-2028', done: true, detail: 'Excel + PDF' },
        { label: 'Term sheet template', done: false, detail: 'En attente CG SA' },
        { label: 'Cap table certified', done: false, detail: 'Audit en cours' },
        { label: 'Legal due diligence memo', done: false, detail: 'Cabinet Gide' },
        { label: 'IP portfolio summary', done: true, detail: '7 briques Eigen' },
        { label: 'Team bios + CVs', done: true },
        { label: 'Market analysis deck', done: false, detail: 'NOOS + MYNe focus' },
      ];

  // Briques entity stats for comparables
  const briques = allStats.filter((s) => {
    const e = ENTITIES.find((en) => en.id === s.entity_id);
    return e?.type === 'BRIQUE';
  });

  return (
    <div className="min-h-screen bg-cream flex flex-col">
      <DashboardHeader
        title="ATS LONDON · MAI 2026"
        subtitle="38 cibles investisseurs · Due diligence"
        entityColor="#162B20"
      />

      <div className="flex-1 max-w-7xl mx-auto w-full py-6 px-6 space-y-6">
        {/* KPIs */}
        <section id="s-kpis">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard label="Cibles investisseurs" value={investorTargets.length || 38} color="#162B20" />
            <StatCard label="Briques Eigen" value={briques.length} />
            <StatCard label="Architecture entites" value={archRows.length} />
            <StatCard label="Data room" value={`${checklist.filter((c) => c.done).length} / ${checklist.length}`} />
          </div>
        </section>

        {/* Investor targets */}
        <SectionPanel id="s-investors" title="CIBLES INVESTISSEURS">
          <MiniTable
            columns={[
              { key: 'nom', label: 'NOM' },
              { key: 'role', label: 'THESE / ROLE' },
              { key: 'organisation', label: 'ORGANISATION' },
              { key: 'priorite', label: 'PRIORITE', align: 'center' },
            ]}
            rows={investorRows}
            emptyMessage="Aucune cible identifiee."
          />
        </SectionPanel>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Architecture organigramme */}
          <SectionPanel id="s-architecture" title="ARCHITECTURE EIGEN">
            <MiniTable
              columns={[
                { key: 'entite', label: 'ENTITE' },
                { key: 'type', label: 'TYPE' },
                { key: 'juridiction', label: 'JURIDICTION' },
                { key: 'stade', label: 'STADE' },
              ]}
              rows={archRows}
              emptyMessage="Aucune donnee architecture."
            />
          </SectionPanel>

          {/* Data room checklist */}
          <SectionPanel id="s-dataroom" title="DATA ROOM CHECKLIST">
            <ChecklistPanel items={checklist} />
          </SectionPanel>
        </div>

        {/* Comparables valorisation */}
        <SectionPanel id="s-comparables" title="COMPARABLES VALORISATION · BRIQUES EIGEN">
          {briques.length > 0 ? (
            <div className="space-y-3">
              {briques.map((b) => {
                const eDef = ENTITIES.find((e) => e.id === b.entity_id);
                return (
                  <div key={b.entity_id} className="flex items-center gap-3">
                    <span className="text-[10px] font-[family-name:var(--font-cormorant)] font-bold italic w-24" style={{ color: eDef?.color }}>
                      {b.entity_name}
                    </span>
                    <ProgressBar pct={b.completion_pct} color={eDef?.color} height="h-2" />
                    <span className="text-[9px] font-[family-name:var(--font-jetbrains)] text-tm w-20 text-right">
                      {b.total_entries} entries
                    </span>
                  </div>
                );
              })}
            </div>
          ) : (
            <MiniTable
              columns={[
                { key: 'entite', label: 'ENTITE' },
                { key: 'valorisation', label: 'VALORISATION' },
                { key: 'jalons', label: 'JALONS' },
                { key: 'mecanisme', label: 'MECANISME EXIT' },
              ]}
              rows={portfolioRows}
              emptyMessage="Aucune donnee de portefeuille."
            />
          )}
        </SectionPanel>
      </div>

      <LondonClient />
      <DashboardFooter label="ATS LONDON · MAI 2026" />
    </div>
  );
}
