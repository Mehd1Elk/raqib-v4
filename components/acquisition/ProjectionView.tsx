'use client';

import { useState, useEffect } from 'react';
import { C, GR, MN, SN, thS, tdS, wrap, BRICKS, SECTORS } from './shared/constants';
import { SectionTitle } from './shared/SectionTitle';
import { StatCard } from './shared/StatCard';
import { fetchProjection } from '@/lib/acquisition/api';

function fmt(n: number): string {
  if (n >= 1_000_000) return `€${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `€${(n / 1_000).toFixed(0)}K`;
  return `€${n}`;
}

interface ProjectionData {
  by_tier: Record<string, { count: number; revenue: number }>;
  by_sector: Record<string, { count: number; revenue: number }>;
  by_brique: Record<string, { count: number; revenue: number }>;
  total: number;
}

export default function ProjectionView() {
  const [data, setData] = useState<ProjectionData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjection().then(d => setData(d as unknown as ProjectionData)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  if (loading) return <div style={{ ...wrap, fontFamily: MN, fontSize: 10, color: C.t3 }}>Chargement projection...</div>;
  if (!data) return <div style={{ ...wrap, fontFamily: SN, fontSize: 12, color: C.t3 }}>Aucune donnée.</div>;

  const tiers = ['Tier 0', 'Tier 1', 'Tier 2', 'Tier 3'];
  const years = [
    { label: 'Y1', pct: 0.10 },
    { label: 'Y2', pct: 0.30 },
    { label: 'Y3', pct: 0.60 },
    { label: 'Y4', pct: 1.00 },
  ];

  return (
    <div style={wrap}>
      <SectionTitle title="Projection Revenue" />

      {/* Summary cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 32 }}>
        <StatCard label="Revenue Total Pipeline" value={fmt(data.total)} color={C.accent} />
        <StatCard label="EU Estimate (60%)" value={fmt(data.total * 0.6)} color={C.sapphire} />
        <StatCard label="Corridor Estimate (40%)" value={fmt(data.total * 0.4)} color={C.emerald} />
      </div>

      {/* By Tier */}
      <SectionTitle title="Revenue par Tier" />
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 32 }}>
        <thead>
          <tr>
            <th style={thS}>Tier</th>
            <th style={thS}>Entreprises</th>
            <th style={thS}>Rev / Entreprise</th>
            <th style={thS}>Revenue Total</th>
            {years.map(y => <th key={y.label} style={thS}>{y.label} ({Math.round(y.pct * 100)}%)</th>)}
          </tr>
        </thead>
        <tbody>
          {tiers.map(tier => {
            const d = data.by_tier[tier] || { count: 0, revenue: 0 };
            const perCompany = d.count > 0 ? d.revenue / d.count : 0;
            return (
              <tr key={tier}>
                <td style={{ ...tdS, fontFamily: GR, fontWeight: 400 }}>{tier}</td>
                <td style={{ ...tdS, fontFamily: MN, fontSize: 10, textAlign: 'right' }}>{d.count}</td>
                <td style={{ ...tdS, fontFamily: MN, fontSize: 10, textAlign: 'right' }}>{fmt(perCompany)}</td>
                <td style={{ ...tdS, fontFamily: MN, fontSize: 10, textAlign: 'right', fontWeight: 700, color: C.accent }}>{fmt(d.revenue)}</td>
                {years.map(y => (
                  <td key={y.label} style={{ ...tdS, fontFamily: MN, fontSize: 10, textAlign: 'right' }}>{fmt(d.revenue * y.pct)}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* By Brique */}
      <SectionTitle title="Revenue par Brique" />
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 32 }}>
        <thead>
          <tr>
            <th style={thS}>Brique</th>
            <th style={thS}>Entreprises</th>
            <th style={thS}>Revenue</th>
          </tr>
        </thead>
        <tbody>
          {BRICKS.map(b => {
            const d = data.by_brique[b.key] || { count: 0, revenue: 0 };
            return (
              <tr key={b.key}>
                <td style={tdS}>
                  <span style={{ color: b.c, marginRight: 6 }}>{b.icon}</span>
                  <span style={{ fontFamily: GR, fontWeight: 400, color: b.c }}>{b.n}</span>
                </td>
                <td style={{ ...tdS, fontFamily: MN, fontSize: 10, textAlign: 'right' }}>{d.count}</td>
                <td style={{ ...tdS, fontFamily: MN, fontSize: 10, textAlign: 'right', fontWeight: 700, color: b.c }}>{fmt(d.revenue)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Top sectors */}
      <SectionTitle title="Top Secteurs" />
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr><th style={thS}>Secteur</th><th style={thS}>Entreprises</th><th style={thS}>Revenue</th></tr>
        </thead>
        <tbody>
          {Object.entries(data.by_sector)
            .sort((a, b) => b[1].revenue - a[1].revenue)
            .slice(0, 10)
            .map(([sec, d]) => (
              <tr key={sec}>
                <td style={tdS}>{SECTORS[sec] || sec}</td>
                <td style={{ ...tdS, fontFamily: MN, fontSize: 10, textAlign: 'right' }}>{d.count}</td>
                <td style={{ ...tdS, fontFamily: MN, fontSize: 10, textAlign: 'right', fontWeight: 700, color: C.accent }}>{fmt(d.revenue)}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
