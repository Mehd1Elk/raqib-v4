'use client';

import { STAT_CARDS, TOP5_COUNTRIES, CORRIDOR_COUNTRIES, EIGEN_BRIQUES, EU_FORCING_FUNCTIONS } from './minerals-data';
import { FlagIcon } from '../FlagIcon';

export function MineralsOverview() {
  const top5 = TOP5_COUNTRIES.map(id => CORRIDOR_COUNTRIES.find(c => c.id === id)).filter(Boolean);

  function getRiskClass(r: number) {
    if (r <= 2) return 'low';
    if (r <= 4) return 'medium';
    return 'high';
  }

  function getRiskLabel(r: number) {
    if (r <= 2) return 'Faible';
    if (r <= 4) return 'Modéré';
    if (r <= 7) return 'Élevé';
    return 'Critique';
  }

  return (
    <div style={{ padding: '1.5rem 0' }}>
      {/* EIGEN Briques */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
        {EIGEN_BRIQUES.map((b, i) => (
          <div key={i} style={{
            padding: '0.3rem 0.75rem',
            borderRadius: 0,
            border: `1px solid ${b.color}`,
            color: b.color,
            background: `${b.color}10`,
            fontSize: '0.7rem',
            fontWeight: 600,
          }}>
            {b.name} <span style={{ color: 'var(--text-faint)', fontWeight: 400 }}>{b.desc}</span>
          </div>
        ))}
      </div>

      {/* Stat Cards */}
      <div className="kpi-row">
        {STAT_CARDS.map((s, i) => (
          <div key={i} className="kpi">
            <div className="kpi-value">{s.value}</div>
            <div className="kpi-label">{s.label}</div>
            <div style={{ fontSize: '0.65rem', color: 'var(--text-faint)', marginTop: '0.2rem' }}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Top 5 Countries */}
      <div className="subsection">
        <h3>Top 5 — Pays les plus critiques du corridor</h3>
        <div className="countries-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
          {top5.map(c => c && (
            <div key={c.id} className="country-card" style={{ cursor: 'default' }}>
              <div className="country-card-header">
                <FlagIcon code={c.id} size={40} />
                <div>
                  <div className="country-card-name">{c.name}</div>
                  <span className={`risk-score ${getRiskClass(c.risk)}`}>
                    <span className={`risk-dot ${getRiskClass(c.risk)}`} />
                    {getRiskLabel(c.risk)} {c.risk}/10
                  </span>
                </div>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem', margin: '0.5rem 0' }}>
                {c.minerals.slice(0, 6).map((m, j) => <span key={j} className="tag">{m}</span>)}
                {c.minerals.length > 6 && <span className="tag">+{c.minerals.length - 6}</span>}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                <div>{c.production.substring(0, 60)}{c.production.length > 60 ? '...' : ''}</div>
                <div style={{ color: 'var(--gold-dim)', marginTop: '0.25rem' }}>Trade EU: {c.tradeEU}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* EU Forcing Functions */}
      <div className="subsection">
        <h3>Forcing Functions — Réglementation EU</h3>
        <div className="info-grid">
          {EU_FORCING_FUNCTIONS.map((f, i) => (
            <div key={i} className="info-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <div className="info-card-label" style={{ marginBottom: 0 }}>{f.name}</div>
                <span className="tag">{f.status}</span>
              </div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-faint)', marginBottom: '0.3rem' }}>{f.date}</div>
              <div className="info-card-value" style={{ fontSize: '0.82rem' }}>{f.desc}</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--gold-dim)', marginTop: '0.5rem' }}>{f.impact}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
