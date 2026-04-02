'use client';

import { useEffect, useState } from 'react';
import type { ProjectionData, Tier } from './types';
import { TIER_REVENUE } from './types';

function fmt(n: number): string {
  if (n >= 1_000_000) return `€${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000) return `€${(n / 1_000).toFixed(0)}K`;
  return `€${n}`;
}

function pct(n: number): string {
  return `${(n * 100).toFixed(1)}%`;
}

export function ProjectionView() {
  const [data, setData] = useState<ProjectionData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/acquisition/projection')
      .then((r) => r.json())
      .then((d) => { if (!d.error) setData(d); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="bg-ivory border border-div rounded-none p-5 h-40" />
        ))}
      </div>
    );
  }

  if (!data) {
    return (
      <div className="bg-ivory border border-div rounded-none p-8 text-center">
        <p className="font-[family-name:var(--font-jetbrains)] text-[10px] text-t3">
          Aucune projection disponible
        </p>
      </div>
    );
  }

  const maxTierRevenue = Math.max(...data.by_tier.map((t) => t.revenue), 1);
  const maxBriqueRevenue = Math.max(...data.by_brique.map((b) => b.revenue), 1);
  const maxYearlyRevenue = Math.max(...data.yearly.map((y) => y.revenue), 1);
  const grandTotal = data.eu_total + data.corridor_total;

  return (
    <div className="space-y-6">
      {/* ── Revenue par Tier ── */}
      <section className="bg-ivory border border-div rounded-none p-5">
        <h3 className="text-[9px] font-[family-name:var(--font-jetbrains)] text-tm tracking-[2px] uppercase mb-4">
          Revenue par Tier
        </h3>
        <div className="space-y-3">
          {data.by_tier.map((t) => (
            <TierRow
              key={t.tier}
              tier={t.tier as Tier}
              count={t.count}
              revenue={t.revenue}
              maxRevenue={maxTierRevenue}
            />
          ))}
        </div>
        {/* Tier formula legend */}
        <div className="mt-4 pt-3 border-t border-div grid grid-cols-2 md:grid-cols-4 gap-2">
          {([0, 1, 2, 3] as Tier[]).map((t) => (
            <div key={t} className="text-[7px] font-[family-name:var(--font-jetbrains)] text-t3">
              <span className="text-t2 font-medium">Tier {t}:</span> {TIER_REVENUE[t].label}
            </div>
          ))}
        </div>
      </section>

      {/* ── Revenue par Brique ── */}
      <section className="bg-ivory border border-div rounded-none p-5">
        <h3 className="text-[9px] font-[family-name:var(--font-jetbrains)] text-tm tracking-[2px] uppercase mb-4">
          Revenue par Brique
        </h3>
        <div className="space-y-2">
          {data.by_brique.map((b) => (
            <div key={b.brique} className="flex items-center gap-3">
              <span className="text-[9px] font-[family-name:var(--font-jetbrains)] text-t2 w-28 text-right shrink-0 truncate">
                {b.brique}
              </span>
              <div className="flex-1 relative">
                <div
                  className="h-6 rounded-none flex items-center px-3 transition-all duration-500"
                  style={{
                    width: `${Math.max((b.revenue / maxBriqueRevenue) * 100, 8)}%`,
                    background: '#B8963E',
                  }}
                >
                  <span className="text-[9px] font-[family-name:var(--font-jetbrains)] text-ivory font-bold">
                    {fmt(b.revenue)}
                  </span>
                </div>
              </div>
              <span className="text-[8px] font-[family-name:var(--font-jetbrains)] text-t3 w-12 text-right shrink-0">
                {b.count} co.
              </span>
            </div>
          ))}
          {data.by_brique.length === 0 && (
            <p className="text-[10px] font-[family-name:var(--font-noto)] text-t3 text-center py-4">
              Aucune brique
            </p>
          )}
        </div>
      </section>

      {/* ── Projection Y1→Y4 ── */}
      <section className="bg-ivory border border-div rounded-none p-5">
        <h3 className="text-[9px] font-[family-name:var(--font-jetbrains)] text-tm tracking-[2px] uppercase mb-4">
          Projection Y1 → Y4
        </h3>
        <div className="space-y-3">
          {data.yearly.map((y) => (
            <div key={y.year} className="flex items-center gap-3">
              <span className="text-[10px] font-[family-name:var(--font-playfair)] font-bold  text-t1 w-8 shrink-0">
                {y.year}
              </span>
              <div className="flex-1 relative">
                <div
                  className="h-8 rounded-none flex items-center justify-between px-3 transition-all duration-500"
                  style={{
                    width: `${Math.max((y.revenue / maxYearlyRevenue) * 100, 12)}%`,
                    background: yearColor(y.year),
                  }}
                >
                  <span className="text-[10px] font-[family-name:var(--font-jetbrains)] text-ivory font-bold">
                    {fmt(y.revenue)}
                  </span>
                </div>
              </div>
              <span className="text-[8px] font-[family-name:var(--font-jetbrains)] text-t3 w-16 text-right shrink-0">
                {pct(y.signed_pct)} signé
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── EU vs Corridor ── */}
      <section className="bg-ivory border border-div rounded-none p-5">
        <h3 className="text-[9px] font-[family-name:var(--font-jetbrains)] text-tm tracking-[2px] uppercase mb-4">
          Total EU vs Corridor
        </h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-[8px] font-[family-name:var(--font-jetbrains)] text-tm tracking-[1px] uppercase mb-1">
              EU
            </div>
            <div className="text-lg font-[family-name:var(--font-playfair)] font-bold  text-[#3D5E8C]">
              {fmt(data.eu_total)}
            </div>
            {grandTotal > 0 && (
              <div className="text-[8px] font-[family-name:var(--font-jetbrains)] text-t3 mt-0.5">
                {pct(data.eu_total / grandTotal)}
              </div>
            )}
          </div>
          <div className="text-center">
            <div className="text-[8px] font-[family-name:var(--font-jetbrains)] text-tm tracking-[1px] uppercase mb-1">
              Corridor
            </div>
            <div className="text-lg font-[family-name:var(--font-playfair)] font-bold  text-[#B87D3E]">
              {fmt(data.corridor_total)}
            </div>
            {grandTotal > 0 && (
              <div className="text-[8px] font-[family-name:var(--font-jetbrains)] text-t3 mt-0.5">
                {pct(data.corridor_total / grandTotal)}
              </div>
            )}
          </div>
          <div className="text-center">
            <div className="text-[8px] font-[family-name:var(--font-jetbrains)] text-tm tracking-[1px] uppercase mb-1">
              Total
            </div>
            <div className="text-lg font-[family-name:var(--font-playfair)] font-bold  text-gold">
              {fmt(grandTotal)}
            </div>
          </div>
        </div>

        {/* Visual bar */}
        {grandTotal > 0 && (
          <div className="flex h-3 rounded-none overflow-hidden mt-4">
            <div
              className="transition-all duration-500"
              style={{
                width: `${(data.eu_total / grandTotal) * 100}%`,
                background: '#3D5E8C',
              }}
            />
            <div
              className="transition-all duration-500"
              style={{
                width: `${(data.corridor_total / grandTotal) * 100}%`,
                background: '#B87D3E',
              }}
            />
          </div>
        )}
      </section>
    </div>
  );
}

// ── Helpers ─────────────────────────────────────────────

function TierRow({
  tier,
  count,
  revenue,
  maxRevenue,
}: {
  tier: Tier;
  count: number;
  revenue: number;
  maxRevenue: number;
}) {
  const colors: Record<Tier, string> = {
    0: '#9C3D3D',
    1: '#B87D3E',
    2: '#3D5E8C',
    3: '#918977',
  };

  return (
    <div className="flex items-center gap-3">
      <span className="text-[10px] font-[family-name:var(--font-playfair)] font-bold  text-t1 w-12 shrink-0">
        Tier {tier}
      </span>
      <div className="flex-1 relative">
        <div
          className="h-7 rounded-none flex items-center px-3 transition-all duration-500"
          style={{
            width: `${Math.max((revenue / maxRevenue) * 100, 8)}%`,
            background: colors[tier],
          }}
        >
          <span className="text-[9px] font-[family-name:var(--font-jetbrains)] text-ivory font-bold">
            {fmt(revenue)}
          </span>
        </div>
      </div>
      <span className="text-[8px] font-[family-name:var(--font-jetbrains)] text-t3 w-16 text-right shrink-0">
        {count} entreprise{count !== 1 ? 's' : ''}
      </span>
    </div>
  );
}

function yearColor(year: string): string {
  const map: Record<string, string> = {
    Y1: '#918977',
    Y2: '#3D5E8C',
    Y3: '#B8963E',
    Y4: '#3D7C5E',
  };
  return map[year] ?? '#918977';
}
