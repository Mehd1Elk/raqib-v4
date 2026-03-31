import { notFound } from 'next/navigation';
import { ENTITIES } from '@/lib/constants';
import { fetchEntityDashboard } from '@/lib/supabase/dashboard-queries';
import { DashboardHeader } from '@/components/dashboards/DashboardHeader';
import { DashboardFooter } from '@/components/dashboards/DashboardFooter';
import { StatCard } from '@/components/dashboards/StatCard';
import { ProgressBar } from '@/components/dashboards/ProgressBar';
import { SectionPanel } from '@/components/dashboards/SectionPanel';
import { MiniTable } from '@/components/dashboards/MiniTable';
import { EntityDashboardClient } from './client';

type EntityDashboard = Awaited<ReturnType<typeof fetchEntityDashboard>>;
type RecentEntry = EntityDashboard['recentEntries'][number];

export async function generateStaticParams() {
  return ENTITIES.map((e) => ({ id: e.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const entity = ENTITIES.find((e) => e.id === id);
  return { title: entity ? `${entity.name} — Tableau de bord` : 'Entite inconnue' };
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
        {/* Progression globale */}
        <section id="s-progress">
          <div className="mb-4">
            <h2 className="font-[family-name:var(--font-cormorant)] text-xl font-bold italic" style={{ color: entityDef.color }}>
              {entityDef.name}
            </h2>
            <div className="text-[9px] font-[family-name:var(--font-jetbrains)] text-tm uppercase mt-1">
              {entityDef.type} &middot; {entityDef.description}
            </div>
          </div>

          <div className="bg-ivory border border-div rounded p-5 mb-4">
            <ProgressBar pct={completionPct} color={entityDef.color} height="h-3" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard label="Couches" value={`${stats?.populated_layers ?? 0} / ${stats?.total_layers ?? 0}`} />
            <StatCard label="Entries" value={(stats?.total_entries ?? 0).toLocaleString()} />
            <StatCard label="Qualite moy." value={stats?.avg_quality ? stats.avg_quality.toFixed(0) : '\u2014'} />
            <StatCard label="Fraicheur moy." value={stats?.avg_freshness ? stats.avg_freshness.toFixed(0) : '\u2014'} />
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top 5 couches */}
          <SectionPanel id="s-top-layers" title="TOP 5 COUCHES LES PLUS PEUPLEES">
            {dashboard?.topLayers.length ? (
              <div className="space-y-3">
                {dashboard.topLayers.map((l) => (
                  <div key={l.id} className="flex items-center gap-3">
                    <span className="text-[9px] font-[family-name:var(--font-jetbrains)] text-t2 w-16 shrink-0">{l.id}</span>
                    <div className="flex-1">
                      <ProgressBar
                        pct={l.target_rows ? ((l.actual_rows ?? 0) / l.target_rows) * 100 : 0}
                        label={l.name}
                        color={entityDef.color}
                        height="h-1.5"
                      />
                    </div>
                    <span className="text-[9px] font-[family-name:var(--font-jetbrains)] text-tm w-14 text-right">
                      {l.actual_rows ?? 0} / {l.target_rows ?? 0}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-[10px] text-tm font-[family-name:var(--font-jetbrains)]">Aucune couche peuplee.</div>
            )}
          </SectionPanel>

          {/* Distribution plateformes */}
          <SectionPanel id="s-platforms" title="DISTRIBUTION PLATEFORMES">
            <EntityDashboardClient platformData={dashboard?.platformDistribution ?? []} />
          </SectionPanel>
        </div>

        {/* Dernieres entries */}
        <SectionPanel id="s-entries" title="DERNIERES ENTRIES">
          <MiniTable
            columns={[
              { key: 'layer_name', label: 'COUCHE' },
              { key: 'source', label: 'SOURCE' },
              { key: 'confidence', label: 'CONFIANCE', align: 'right' },
              { key: 'created_at', label: 'DATE', align: 'right' },
            ]}
            rows={(dashboard?.recentEntries ?? []).map((e: RecentEntry) => ({
              layer_name: e.layers.name || e.layer_id,
              source: e.source ?? '\u2014',
              confidence: e.confidence != null ? `${(e.confidence * 100).toFixed(0)}%` : '\u2014',
              created_at: e.created_at ? new Date(e.created_at).toLocaleDateString('fr-FR') : '\u2014',
            }))}
            emptyMessage="Aucune entry recente."
          />
        </SectionPanel>
      </div>

      <DashboardFooter label={`TABLEAU DE BORD · ${entityDef.name}`} />
    </div>
  );
}
