'use client';

import { useMemo } from 'react';
import { GEOPOLITICAL_RISKS, CORRIDOR_COUNTRIES } from './minerals-data';

export function MineralsGeopolitics() {
  const sortedRisks = useMemo(() => [...GEOPOLITICAL_RISKS].sort((a, b) => b.severity - a.severity), []);

  function getSeverityColor(s: number) {
    if (s >= 9) return '#A13544';
    if (s >= 7) return '#E07850';
    if (s >= 5) return '#C9A96E';
    return '#5A8A3A';
  }

  function getCategoryColor(cat: string) {
    const map: Record<string, string> = { 'Embargo':'#A13544', 'Réglementation':'#4A7B9D', 'Nationalisme':'#E07850', 'Instabilité':'#A13544', 'Compétition':'#C9A96E', 'Infrastructure':'#5A8A3A', 'Marché':'#D4AF37' };
    return map[cat] || '#9A9790';
  }

  function getRiskColor(r: number) { return r <= 2 ? '#5A8A3A' : r <= 4 ? '#C9A96E' : r <= 7 ? '#E07850' : '#A13544'; }

  return (
    <div style={{ padding: '1.5rem 0' }}>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--gold-light)', marginBottom: '1.5rem' }}>Géopolitique & Risques</div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
        {sortedRisks.map((r, i) => {
          const sevColor = getSeverityColor(r.severity);
          const catColor = getCategoryColor(r.category);
          return (
            <div key={i} className="info-card" style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <div style={{ width: 40, height: 40, borderRadius: 0, border: `2px solid ${sevColor}`, background: `${sevColor}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem', fontWeight: 700, color: sevColor, flexShrink: 0 }}>{r.severity}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 500, color: 'var(--text)', marginBottom: '0.2rem' }}>{r.event}</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-faint)', marginBottom: '0.3rem' }}>{r.date}</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>{r.impact}</div>
                <span className="tag" style={{ background: `${catColor}15`, color: catColor, border: `1px solid ${catColor}30` }}>{r.category}</span>
              </div>
              <div style={{ minWidth: 200, fontSize: '0.72rem', color: 'var(--text-faint)' }}>
                <div style={{ fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--gold-dim)', marginBottom: '0.25rem' }}>Réponse EIGEN</div>
                {r.eigenResponse}
              </div>
            </div>
          );
        })}
      </div>

      {/* Risk × Diversity Matrix */}
      <div className="subsection">
        <h3>Matrice Risque × Diversité Minérale — 22 Pays</h3>
        <div style={{ position: 'relative', height: 300, background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 0, margin: '1rem 0' }}>
          {CORRIDOR_COUNTRIES.map(c => {
            const x = ((c.mineralDiversity - 1) / 9) * 85 + 7;
            const y = 100 - ((c.risk - 1) / 9) * 85 - 7;
            const color = getRiskColor(c.risk);
            return (
              <div key={c.id} title={`${c.name} — Risque: ${c.risk}/10, Diversité: ${c.mineralDiversity}/10`} style={{
                position: 'absolute', left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)',
                width: 28, height: 28, borderRadius: 0, background: `${color}30`, border: `2px solid ${color}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.55rem', fontWeight: 600, color, cursor: 'default',
              }}>{c.id}</div>
            );
          })}
          <div style={{ position: 'absolute', bottom: 4, left: '50%', transform: 'translateX(-50%)', fontSize: '0.6rem', color: 'var(--text-faint)' }}>DIVERSITÉ MINÉRALE →</div>
          <div style={{ position: 'absolute', left: 4, top: '50%', transform: 'translateY(-50%) rotate(-90deg)', fontSize: '0.6rem', color: 'var(--text-faint)' }}>RISQUE →</div>
        </div>
      </div>
    </div>
  );
}
