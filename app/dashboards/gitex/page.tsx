import { fetchGitexDashboard } from '@/lib/supabase/dashboard-queries';
import { DashboardHeader } from '@/components/dashboards/DashboardHeader';
import { DashboardFooter } from '@/components/dashboards/DashboardFooter';
import { StatCard } from '@/components/dashboards/StatCard';
import { SectionPanel } from '@/components/dashboards/SectionPanel';
import { MiniTable } from '@/components/dashboards/MiniTable';
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

  // Parse events for timeline
  const eventEntries = events.map((e) => ({
    id: e.id,
    data: e.data as any,
  }));

  // Contacts qualifies from intelligence
  const contactRows = intelligence.map((c) => {
    const d = c.data as any;
    return {
      cible: d?.cible ?? '\u2014',
      type: d?.type ?? '\u2014',
      notation: d?.notation ?? '\u2014',
      source: d?.source ?? '\u2014',
    };
  });

  // Logistics from operational
  const logisticsRows = [...cgLogistics, ...cdLogistics].map((l) => {
    const d = l.data as any;
    return {
      jalon: d?.jalon ?? d?.agenda ?? '\u2014',
      deadline: d?.deadline ?? d?.itineraire ?? '\u2014',
      responsable: d?.responsable ?? '\u2014',
      statut: d?.statut ?? '\u2014',
    };
  });

  return (
    <div className="min-h-screen bg-cream flex flex-col">
      <DashboardHeader
        title="GITEX · AVRIL 2026"
        subtitle="Dubai · Preparation salon"
        entityColor="#B87D3E"
      />

      <div className="flex-1 max-w-7xl mx-auto w-full py-6 px-6 space-y-6">
        {/* KPIs */}
        <section id="s-kpis">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard label="Cibles identifiees" value={intelligence.length} color="#B87D3E" />
            <StatCard label="Evenements CG" value={events.length} />
            <StatCard label="Jalons logistiques" value={logisticsRows.length} />
            <StatCard label="Contacts qualifies" value={contactRows.filter((c) => c.notation !== '\u2014').length} />
          </div>
        </section>

        {/* Agenda / Events timeline */}
        <SectionPanel id="s-agenda" title="AGENDA GITEX">
          <MiniTable
            columns={[
              { key: 'evenement', label: 'EVENEMENT' },
              { key: 'dates', label: 'DATES' },
              { key: 'lieu', label: 'LIEU' },
              { key: 'cibles', label: 'CIBLES' },
            ]}
            rows={eventEntries.map((e) => ({
              evenement: e.data?.evenement ?? '\u2014',
              dates: e.data?.dates ?? '\u2014',
              lieu: e.data?.lieu ?? '\u2014',
              cibles: e.data?.cibles ?? '\u2014',
            }))}
            emptyMessage="Aucun evenement GITEX programme."
          />
        </SectionPanel>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Cibles profiling */}
          <SectionPanel id="s-contacts" title="CONTACTS QUALIFIES · INTELLIGENCE">
            <MiniTable
              columns={[
                { key: 'cible', label: 'CIBLE' },
                { key: 'type', label: 'TYPE' },
                { key: 'notation', label: 'NOTATION', align: 'center' },
                { key: 'source', label: 'SOURCE' },
              ]}
              rows={contactRows}
              emptyMessage="Aucun contact qualifie."
            />
          </SectionPanel>

          {/* Logistics */}
          <SectionPanel id="s-logistics" title="LOGISTIQUE">
            <MiniTable
              columns={[
                { key: 'jalon', label: 'JALON' },
                { key: 'deadline', label: 'DEADLINE' },
                { key: 'responsable', label: 'RESPONSABLE' },
                { key: 'statut', label: 'STATUT', align: 'center' },
              ]}
              rows={logisticsRows}
              emptyMessage="Aucun jalon logistique."
            />
          </SectionPanel>
        </div>
      </div>

      <GitexClient />
      <DashboardFooter label="GITEX · AVRIL 2026" />
    </div>
  );
}
