'use client';

import { useState, useEffect } from 'react';
import { C, GR, MN, SN, thS, tdS, wrap, BRICKS, SECTORS, STAGES, STAGE_LABELS } from './shared/constants';
import { StatCard } from './shared/StatCard';
import { SectionTitle } from './shared/SectionTitle';
import { ScoreBadge } from './shared/ScoreBadge';
import { Pill } from './shared/Pill';
import { fetchDashboard, fetchCompanies } from '@/lib/acquisition/api';
import type { DashboardKPIs, AcqCompany } from '@/lib/acquisition/types';

function fmt(n: number): string {
  if (n >= 1_000_000) return `€${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `€${(n / 1_000).toFixed(0)}K`;
  return `€${n}`;
}

export default function DashboardView() {
  const [kpis, setKpis] = useState<DashboardKPIs | null>(null);
  const [top10, setTop10] = useState<AcqCompany[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([fetchDashboard(), fetchCompanies({ limit: '10' })])
      .then(([k, c]) => { setKpis(k); setTop10(c); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div style={{ ...wrap, fontFamily: MN, fontSize: 10, color: C.t3 }}>Chargement du dashboard...</div>;
  if (!kpis) return <div style={{ ...wrap, fontFamily: SN, fontSize: 12, color: C.t3 }}>Aucune donnée disponible.</div>;

  const maxStage = Math.max(...Object.values(kpis.by_stage), 1);

  return (
    <div style={wrap}>
      <SectionTitle title="Dashboard" count={kpis.total_companies} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 32 }}>
        <StatCard label="Total Entreprises" value={kpis.total_companies} />
        <StatCard label="Priorité P0" value={kpis.p0_count} color={C.ruby} />
        <StatCard label="Pipeline Actif" value={kpis.pipeline_active} color={C.emerald} />
        <StatCard label="Signés" value={kpis.signed_count} color={C.gold} />
        <StatCard label="Revenue Estimé" value={fmt(kpis.total_revenue_estimate)} color={C.goldD} />
        <StatCard label="Secteurs Couverts" value={Object.keys(kpis.by_sector).length} color={C.sapphire} />
      </div>

      <SectionTitle title="Pipeline Funnel" />
      <div style={{ marginBottom: 32 }}>
        {STAGES.map(stage => {
          const count = kpis.by_stage[stage] || 0;
          const pct = kpis.total_companies > 0 ? Math.round((count / kpis.total_companies) * 100) : 0;
          const w = Math.max(2, (count / maxStage) * 100);
          return (
            <div key={stage} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 6 }}>
              <span style={{ fontFamily: MN, fontSize: 8, color: C.t3, width: 80, textTransform: 'uppercase', letterSpacing: 1, textAlign: 'right' }}>
                {STAGE_LABELS[stage] || stage}
              </span>
              <div style={{ flex: 1, background: C.divL, height: 16, borderRadius: 2 }}>
                <div style={{
                  width: `${w}%`, height: '100%', borderRadius: 2, opacity: 0.7,
                  background: stage === 'signed' ? C.emerald : stage === 'churned' ? C.ruby : C.gold,
                }} />
              </div>
              <span style={{ fontFamily: MN, fontSize: 9, color: C.t2, width: 40, textAlign: 'right' }}>{count}</span>
              <span style={{ fontFamily: MN, fontSize: 8, color: C.t3, width: 30 }}>{pct}%</span>
            </div>
          );
        })}
      </div>

      <SectionTitle title="Top 10 par Score" count={top10.length} />
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thS}>Entreprise</th>
              <th style={thS}>HQ</th>
              <th style={thS}>Secteur</th>
              {BRICKS.map(b => <th key={b.key} style={{ ...thS, textAlign: 'center', color: b.c }} title={b.n}>{b.icon}</th>)}
              <th style={thS}>Score</th>
              <th style={thS}>Tier</th>
              <th style={thS}>Priority</th>
            </tr>
          </thead>
          <tbody>
            {top10.map(c => (
              <tr key={c.id}
                onMouseEnter={e => (e.currentTarget.style.background = C.parchment)}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                <td style={{ ...tdS, fontFamily: GR, fontWeight: 700, fontStyle: 'italic', fontSize: 12 }}>{c.name}</td>
                <td style={tdS}>{c.hq}</td>
                <td style={tdS}><Pill label={SECTORS[c.sector] || c.sector} /></td>
                {BRICKS.map(b => (
                  <td key={b.key} style={{ ...tdS, textAlign: 'center' }}>
                    <span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', background: c.eigen_briques?.includes(b.key) ? b.c : C.divL }} />
                  </td>
                ))}
                <td style={{ ...tdS, textAlign: 'center' }}><ScoreBadge score={c.eigen_score} /></td>
                <td style={tdS}><Pill label={c.tier} color={C.walnut} /></td>
                <td style={tdS}><Pill label={c.priority} color={c.priority === 'P0' ? C.ruby : c.priority === 'P1' ? C.gold : C.t3} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
