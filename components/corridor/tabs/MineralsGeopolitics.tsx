'use client';

import { GEOPOLITICAL_RISKS, CORRIDOR_COUNTRIES, getCategoryColor, getSeverityColor } from '@/lib/corridor/minerals-data';

const sorted = [...GEOPOLITICAL_RISKS].sort((a, b) => b.severity - a.severity);

export default function MineralsGeopolitics() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: 'var(--gold-light)' }}>Risques geopolitiques — 10 evenements critiques</h3>

      {/* Events */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {sorted.map((r, i) => (
          <div key={i} style={{
            background: 'var(--bg-elevated)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius)',
            padding: '14px 16px',
            display: 'flex',
            gap: 14,
          }}>
            {/* Severity circle */}
            <div style={{
              width: 40, height: 40, borderRadius: '50%', flexShrink: 0,
              background: getSeverityColor(r.severity) + '18',
              border: `2px solid ${getSeverityColor(r.severity)}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 700,
              color: getSeverityColor(r.severity),
            }}>
              {r.severity}
            </div>

            {/* Content */}
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text)' }}>{r.event}</span>
                <span style={{
                  fontSize: '0.56rem', padding: '2px 8px', borderRadius: 10,
                  background: getCategoryColor(r.category) + '18',
                  color: getCategoryColor(r.category),
                  border: `1px solid ${getCategoryColor(r.category)}30`,
                }}>{r.category}</span>
              </div>
              <div style={{ fontSize: '0.64rem', color: 'var(--text-faint)', marginTop: 2 }}>{r.date}</div>
              <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', marginTop: 6, lineHeight: 1.5 }}>{r.impact}</div>

              {/* EIGEN response */}
              <div style={{ marginTop: 8, padding: '6px 10px', background: 'rgba(201,169,110,0.06)', border: '1px solid var(--border-gold)', borderRadius: 'var(--radius)' }}>
                <span style={{ fontSize: '0.58rem', color: 'var(--gold)', fontWeight: 600 }}>EIGEN: </span>
                <span style={{ fontSize: '0.64rem', color: 'var(--gold-dim)' }}>{r.eigenResponse}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Risk × Diversity Matrix */}
      <div style={{
        background: 'var(--bg-elevated)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius)',
        padding: 20,
      }}>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', color: 'var(--gold-light)', marginBottom: 16 }}>Matrice Risque x Diversite minerale</h3>
        <div style={{ position: 'relative', height: 280, background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', overflow: 'hidden' }}>
          {/* Axes labels */}
          <div style={{ position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%) rotate(-90deg)', fontSize: '0.58rem', color: 'var(--text-faint)', whiteSpace: 'nowrap' }}>Risque politique (1-10)</div>
          <div style={{ position: 'absolute', bottom: 4, left: '50%', transform: 'translateX(-50%)', fontSize: '0.58rem', color: 'var(--text-faint)' }}>Diversite minerale (1-10)</div>

          {/* Quadrant labels */}
          <div style={{ position: 'absolute', right: 12, top: 8, fontSize: '0.54rem', color: '#A13544', opacity: 0.6 }}>Haut risque / Haute diversite</div>
          <div style={{ position: 'absolute', left: 36, top: 8, fontSize: '0.54rem', color: '#E07850', opacity: 0.6 }}>Haut risque / Faible diversite</div>
          <div style={{ position: 'absolute', right: 12, bottom: 20, fontSize: '0.54rem', color: '#5A8A3A', opacity: 0.6 }}>Faible risque / Haute diversite</div>

          {/* Grid lines */}
          <div style={{ position: 'absolute', left: 30, right: 0, top: '50%', height: 1, background: 'var(--border)', opacity: 0.5 }} />
          <div style={{ position: 'absolute', top: 0, bottom: 0, left: '50%', width: 1, background: 'var(--border)', opacity: 0.5 }} />

          {/* Country dots */}
          {CORRIDOR_COUNTRIES.map(c => {
            const x = 30 + ((c.mineralDiversity / 10) * (100 - 10)) * 2.4;
            const y = 10 + ((1 - (c.risk / 10)) * 250);
            const color = c.risk >= 7 ? '#A13544' : c.risk >= 4 ? '#E07850' : '#5A8A3A';
            return (
              <div key={c.id} title={`${c.name} (Risque: ${c.risk}, Diversite: ${c.mineralDiversity})`} style={{
                position: 'absolute',
                left: Math.min(Math.max(x, 36), 228),
                top: Math.min(Math.max(y, 10), 260),
                width: 8, height: 8, borderRadius: '50%',
                background: color, border: '1px solid var(--bg)',
                cursor: 'default',
              }}>
                <span style={{ position: 'absolute', left: 12, top: -2, fontSize: '0.52rem', color: 'var(--text-faint)', whiteSpace: 'nowrap' }}>{c.id}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
