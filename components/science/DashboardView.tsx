'use client';

import { useState, useEffect } from 'react';
import { C, GR, SN, MN, DOMAINS, wrap, BRIQUE_COLOR } from './shared/constants';
import StatCard from './shared/StatCard';
import SectionTitle from './shared/SectionTitle';
import Pill from './shared/Pill';
import EmptyState from './shared/EmptyState';
import type { SciDashboardKPIs, SciBreakthrough } from '@/lib/science/types';

export default function DashboardView() {
  const [kpis, setKpis] = useState<SciDashboardKPIs | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/science/dashboard')
      .then(r => r.json())
      .then(d => { setKpis(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div style={{ ...wrap, fontFamily: GR, fontStyle: 'italic', color: C.t3 }}>Chargement…</div>;
  if (!kpis) return <EmptyState icon="◈" title="Aucune donnée" subtitle="Les tables sci_ sont vides. Lancez le seed pour peupler les données." />;

  const { total_papers, total_labs, total_patents, total_conferences, total_breakthroughs, by_domain, recent_breakthroughs } = kpis;

  return (
    <div style={wrap}>
      <SectionTitle title="Intelligence Scientifique" subtitle="Vue macro — 7 domaines × 12 vues" />

      {/* KPI Cards */}
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 32 }}>
        <StatCard label="Papers" value={total_papers} accent={C.noos} />
        <StatCard label="Laboratoires" value={total_labs} accent={C.aelya} />
        <StatCard label="Brevets" value={total_patents} accent={C.burhan} />
        <StatCard label="Conférences" value={total_conferences} accent={C.yrknown} />
        <StatCard label="Breakthroughs" value={total_breakthroughs} accent={C.gold} />
      </div>

      {/* Radar Chart — 7 domains */}
      <SectionTitle title="Couverture par Domaine" subtitle="Papers · Labs · Brevets par domaine" />
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 32 }}>
        <div style={{ flex: 1, minWidth: 360 }}>
          <RadarChart data={by_domain} />
        </div>
        <div style={{ flex: 1, minWidth: 300 }}>
          <DomainTable data={by_domain} />
        </div>
      </div>

      {/* Breakthroughs Feed */}
      <SectionTitle title="Dernières Percées" subtitle={`${recent_breakthroughs.length} breakthroughs récentes`} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {recent_breakthroughs.map((bt: SciBreakthrough) => (
          <BreakthroughCard key={bt.id} bt={bt} />
        ))}
        {recent_breakthroughs.length === 0 && (
          <EmptyState icon="↯" title="Aucune percée" subtitle="Les breakthroughs apparaîtront ici." />
        )}
      </div>
    </div>
  );
}

function RadarChart({ data }: { data: Record<string, { papers: number; labs: number; patents: number }> }) {
  const cx = 180, cy = 160, r = 120;
  const domains = DOMAINS;

  const maxVal = Math.max(1, ...Object.values(data).map(d => d.papers + d.labs + d.patents));

  const points = domains.map((dom, i) => {
    const angle = (Math.PI * 2 * i) / domains.length - Math.PI / 2;
    const val = data[dom.id] ? (data[dom.id].papers + data[dom.id].labs + data[dom.id].patents) : 0;
    const ratio = val / maxVal;
    return {
      x: cx + Math.cos(angle) * r * ratio,
      y: cy + Math.sin(angle) * r * ratio,
      lx: cx + Math.cos(angle) * (r + 20),
      ly: cy + Math.sin(angle) * (r + 20),
      dom,
      val,
    };
  });

  const polygon = points.map(p => `${p.x},${p.y}`).join(' ');

  return (
    <svg width={360} height={320} style={{ background: C.cream, borderRadius: 8, border: `1px solid ${C.div}` }}>
      {/* Grid circles */}
      {[0.25, 0.5, 0.75, 1].map(scale => (
        <circle key={scale} cx={cx} cy={cy} r={r * scale} fill="none" stroke={C.div} strokeWidth={0.5} />
      ))}
      {/* Grid lines */}
      {domains.map((_, i) => {
        const angle = (Math.PI * 2 * i) / domains.length - Math.PI / 2;
        return <line key={i} x1={cx} y1={cy} x2={cx + Math.cos(angle) * r} y2={cy + Math.sin(angle) * r} stroke={C.div} strokeWidth={0.5} />;
      })}
      {/* Data polygon */}
      <polygon points={polygon} fill={`${C.gold}25`} stroke={C.gold} strokeWidth={1.5} />
      {/* Points + labels */}
      {points.map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y} r={3} fill={p.dom.color} />
          <text x={p.lx} y={p.ly} textAnchor="middle" dominantBaseline="middle"
            style={{ fontSize: 8, fontFamily: MN, fill: p.dom.color, fontWeight: 600 }}>
            {p.dom.short}
          </text>
        </g>
      ))}
    </svg>
  );
}

function DomainTable({ data }: { data: Record<string, { papers: number; labs: number; patents: number }> }) {
  return (
    <div style={{ background: C.cream, borderRadius: 8, border: `1px solid ${C.div}`, overflow: 'hidden' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ padding: '8px 12px', fontSize: 8, fontFamily: MN, letterSpacing: 1.5, textTransform: 'uppercase' as const, color: C.t3, textAlign: 'left', borderBottom: `1px solid ${C.div}` }}>Domaine</th>
            <th style={{ padding: '8px 12px', fontSize: 8, fontFamily: MN, letterSpacing: 1.5, textTransform: 'uppercase' as const, color: C.t3, textAlign: 'right', borderBottom: `1px solid ${C.div}` }}>Papers</th>
            <th style={{ padding: '8px 12px', fontSize: 8, fontFamily: MN, letterSpacing: 1.5, textTransform: 'uppercase' as const, color: C.t3, textAlign: 'right', borderBottom: `1px solid ${C.div}` }}>Labs</th>
            <th style={{ padding: '8px 12px', fontSize: 8, fontFamily: MN, letterSpacing: 1.5, textTransform: 'uppercase' as const, color: C.t3, textAlign: 'right', borderBottom: `1px solid ${C.div}` }}>Brevets</th>
          </tr>
        </thead>
        <tbody>
          {DOMAINS.map(dom => {
            const d = data[dom.id] || { papers: 0, labs: 0, patents: 0 };
            return (
              <tr key={dom.id}>
                <td style={{ padding: '8px 12px', fontSize: 11, fontFamily: SN, borderBottom: `1px solid ${C.divL}` }}>
                  <span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: 2, background: dom.color, marginRight: 8, verticalAlign: 'middle' }} />
                  {dom.short}
                </td>
                <td style={{ padding: '8px 12px', fontSize: 11, fontFamily: MN, fontWeight: 600, color: C.t1, textAlign: 'right', borderBottom: `1px solid ${C.divL}` }}>{d.papers}</td>
                <td style={{ padding: '8px 12px', fontSize: 11, fontFamily: MN, fontWeight: 600, color: C.t1, textAlign: 'right', borderBottom: `1px solid ${C.divL}` }}>{d.labs}</td>
                <td style={{ padding: '8px 12px', fontSize: 11, fontFamily: MN, fontWeight: 600, color: C.t1, textAlign: 'right', borderBottom: `1px solid ${C.divL}` }}>{d.patents}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function BreakthroughCard({ bt }: { bt: SciBreakthrough }) {
  const isParadigm = bt.impact === 'paradigm_shift';
  const dom = DOMAINS.find(d => d.id === bt.domain);
  const impactLabel: Record<string, string> = { low: 'Faible', medium: 'Moyen', high: 'Élevé', paradigm_shift: 'Changement de paradigme' };

  return (
    <div style={{
      background: isParadigm ? `linear-gradient(135deg, ${C.gold}15, ${C.cream})` : C.cream,
      border: `1px solid ${isParadigm ? C.gold : C.div}`,
      borderRadius: 6, padding: '12px 16px',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
        <Pill label={dom?.short || bt.domain} color={dom?.color || C.t3} />
        <Pill label={impactLabel[bt.impact] || bt.impact} color={isParadigm ? C.gold : C.t3} />
        <span style={{ fontFamily: MN, fontSize: 9, color: C.t3, marginLeft: 'auto' }}>{bt.date}</span>
      </div>
      <div style={{ fontFamily: GR, fontSize: 14, fontWeight: 700, fontStyle: 'italic', color: C.t1, marginBottom: 4 }}>
        {bt.title}
      </div>
      <div style={{ fontFamily: SN, fontSize: 11, color: C.t2, marginBottom: 6 }}>{bt.summary}</div>
      <div style={{ fontFamily: SN, fontSize: 10, color: BRIQUE_COLOR[bt.brique] || C.gold, fontWeight: 500 }}>
        → {bt.eigen_implication}
      </div>
    </div>
  );
}
