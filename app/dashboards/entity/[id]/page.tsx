import { notFound } from 'next/navigation';
import { ENTITIES } from '@/lib/constants';
import { fetchEntityDashboard } from '@/lib/supabase/dashboard-queries';
import { DashboardHeader } from '@/components/dashboards/DashboardHeader';
import { DashboardFooter } from '@/components/dashboards/DashboardFooter';
import { StatCard } from '@/components/dashboards/StatCard';
import { ProgressBar } from '@/components/dashboards/ProgressBar';
import { EntityDashboardClient } from './client';

export async function generateStaticParams() {
  return ENTITIES.map((e) => ({ id: e.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const entity = ENTITIES.find((e) => e.id === id);
  return { title: entity ? `${entity.name} — Tableau de bord` : 'Entité inconnue' };
}

export default async function EntityDashboardPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const entityDef = ENTITIES.find((e) => e.id === id);
  if (!entityDef) notFound();

  let dashboard;
  try {
    dashboard = await fetchEntityDashboard(id);
  } catch {
    dashboard = null;
  }

  const stats = dashboard?.stats;
  const completionPct = stats?.completion_pct ?? 0;

  return (
    <div className="min-h-screen bg-cream flex flex-col">
      <DashboardHeader
        title={`TABLEAU DE BORD · ${entityDef.name}`}
        subtitle={entityDef.description}
        entityColor={entityDef.color}
      />

      <div className="flex-1 max-w-7xl mx-auto w-full py-6 px-6 space-y-6">
        {/* Rangée 1 — ProgressBar + StatCards */}
        <section>
          <div className="bg-ivory border border-div rounded-none p-5 mb-4">
            <ProgressBar pct={completionPct} color={entityDef.color} height="h-3" showPct />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard label="Entries" value={(stats?.total_entries ?? 0).toLocaleString()} />
            <StatCard label="Couches peuplées" value={`${stats?.populated_layers ?? 0} / ${stats?.total_layers ?? 0}`} />
            <StatCard label="Score qualité" value={stats?.avg_quality ? stats.avg_quality.toFixed(0) : '\u2014'} />
            <StatCard label="Fraîcheur" value={stats?.avg_freshness ? stats.avg_freshness.toFixed(0) : '\u2014'} />
          </div>
        </section>

        {/* All visual components via client */}
        <EntityDashboardClient
          entityId={id}
          entityColor={entityDef.color}
          recentEntries={(dashboard?.recentEntries ?? []) as any}
          topLayers={dashboard?.topLayers ?? []}
        />
      </div>

      <DashboardFooter label={`TABLEAU DE BORD · ${entityDef.name}`} />
    </div>
  );
}
