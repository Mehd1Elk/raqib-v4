'use client';

import { useEffect, useState } from 'react';
import { StatCard } from '@/components/dashboards/StatCard';
import { FunnelChart } from '@/components/dashboards/FunnelChart';
import type { DashboardData, AcquisitionCompany } from './types';
import { STAGE_COLORS, STAGE_LABELS, PRIORITY_COLORS } from './types';

function fmt(n: number): string {
  if (n >= 1_000_000) return `€${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `€${(n / 1_000).toFixed(0)}K`;
  return `€${n}`;
}

export function DashboardView() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/acquisition/dashboard')
      .then((r) => r.json())
      .then((d) => { if (!d.error) setData(d); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-ivory border border-div rounded-none p-4 h-20" />
          ))}
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="bg-ivory border border-div rounded-none p-8 text-center">
        <p className="font-[family-name:var(--font-jetbrains)] text-[10px] text-t3">
          Aucune donnée acquisition disponible
        </p>
      </div>
    );
  }

  const funnelStages = data.stages.map((s) => ({
    label: STAGE_LABELS[s.stage],
    value: s.count,
    color: STAGE_COLORS[s.stage],
  }));

  const allSectors = Array.from(
    new Set(data.brique_sector_matrix.flatMap((b) => Object.keys(b.sectors)))
  ).sort();

  return (
    <div className="space-y-6">
      {/* ── 6 StatCards ── */}
      <section>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <StatCard label="Total entreprises" value={data.total_companies} />
          <StatCard label="P0 count" value={data.p0_count} color="#9C3D3D" />
          <StatCard label="Pipeline actif" value={data.pipeline_active} color="#3D5E8C" />
          <StatCard label="Signed" value={data.signed_count} color="#3D7C5E" />
          <StatCard label="Revenue estimé" value={fmt(data.revenue_estimate_total)} color="#B8963E" />
          <StatCard label="Personas couverts" value={data.personas_covered} color="#7B5EA7" />
        </div>
      </section>

      {/* ── Pipeline Funnel ── */}
      <section className="bg-ivory border border-div rounded-none p-5">
        <h3 className="text-[9px] font-[family-name:var(--font-jetbrains)] text-tm tracking-[2px] uppercase mb-4">
          Pipeline Funnel
        </h3>
        <FunnelChart stages={funnelStages} />
      </section>

      {/* ── Matrice briques × secteurs ── */}
      {data.brique_sector_matrix.length > 0 && (
        <section className="bg-ivory border border-div rounded-none p-5 overflow-x-auto">
          <h3 className="text-[9px] font-[family-name:var(--font-jetbrains)] text-tm tracking-[2px] uppercase mb-4">
            Matrice Briques × Secteurs
          </h3>
          <table className="w-full text-left">
            <thead>
              <tr className="bg-noir text-ivory">
                <th className="text-[8px] font-[family-name:var(--font-jetbrains)] tracking-[1px] uppercase px-3 py-2">
                  Brique
                </th>
                {allSectors.map((s) => (
                  <th
                    key={s}
                    className="text-[8px] font-[family-name:var(--font-jetbrains)] tracking-[1px] uppercase px-3 py-2 text-center"
                  >
                    {s}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.brique_sector_matrix.map((row, i) => (
                <tr key={row.brique} className={i % 2 === 0 ? 'bg-cream' : 'bg-ivory'}>
                  <td className="text-[9px] font-[family-name:var(--font-jetbrains)] text-t1 px-3 py-2 font-medium">
                    {row.brique}
                  </td>
                  {allSectors.map((s) => {
                    const count = row.sectors[s] ?? 0;
                    return (
                      <td key={s} className="px-3 py-2 text-center">
                        {count > 0 ? (
                          <span
                            className="inline-block rounded-none-none"
                            style={{
                              width: Math.min(8 + count * 4, 24),
                              height: Math.min(8 + count * 4, 24),
                              background: '#B8963E',
                              opacity: Math.min(0.3 + count * 0.2, 1),
                            }}
                            title={`${count} entreprise${count > 1 ? 's' : ''}`}
                          />
                        ) : (
                          <span className="text-[8px] text-tm">—</span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}

      {/* ── Top 10 entreprises par score ── */}
      <section className="bg-ivory border border-div rounded-none p-5">
        <h3 className="text-[9px] font-[family-name:var(--font-jetbrains)] text-tm tracking-[2px] uppercase mb-4">
          Top 10 Entreprises par Score
        </h3>
        <div className="space-y-2">
          {data.top_10.map((company, i) => (
            <Top10Row key={company.id} company={company} rank={i + 1} />
          ))}
          {data.top_10.length === 0 && (
            <p className="text-[10px] font-[family-name:var(--font-noto)] text-t3 text-center py-4">
              Aucune entreprise dans le pipeline
            </p>
          )}
        </div>
      </section>
    </div>
  );
}

function Top10Row({ company, rank }: { company: AcquisitionCompany; rank: number }) {
  return (
    <div className="flex items-center gap-3 px-3 py-2 rounded-none hover:bg-cream transition-colors">
      <span className="text-[10px] font-[family-name:var(--font-playfair)] font-bold  text-tm w-5 text-right">
        {rank}
      </span>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-[family-name:var(--font-playfair)] font-semibold text-t1 truncate">
            {company.name}
          </span>
          <span
            className="text-[7px] font-[family-name:var(--font-jetbrains)] px-1.5 py-0.5 rounded-none"
            style={{
              color: PRIORITY_COLORS[company.priority],
              background: `${PRIORITY_COLORS[company.priority]}15`,
            }}
          >
            {company.priority}
          </span>
        </div>
        <span className="text-[8px] font-[family-name:var(--font-jetbrains)] text-t3">
          {company.sector} · {company.country}
        </span>
      </div>
      <div className="text-right shrink-0">
        <div className="text-[11px] font-[family-name:var(--font-jetbrains)] font-bold text-gold">
          {company.score}
        </div>
        <div className="text-[8px] font-[family-name:var(--font-jetbrains)] text-t3">
          {STAGE_LABELS[company.stage]}
        </div>
      </div>
    </div>
  );
}
