'use client';

import { VENTURE_MODEL } from './minerals-data';
import { FlagIcon } from '../FlagIcon';

export function MadenVenture() {
  const v = VENTURE_MODEL;

  return (
    <div style={{ padding: '1.5rem 0' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: '4rem', color: 'var(--gold)', lineHeight: 1 }}>{v.arabic}</div>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 400, color: 'var(--text)', letterSpacing: '0.15em', marginTop: '0.5rem' }}>{v.name}</div>
        <div style={{ fontSize: '0.7rem', color: 'var(--text-faint)', marginTop: '0.25rem' }}>{v.meaning}</div>
        <div style={{ fontSize: '0.8rem', color: 'var(--gold-dim)', marginTop: '0.5rem', letterSpacing: '0.05em' }}>{v.tagline}</div>
      </div>

      {/* Thesis */}
      <div className="info-card" style={{ borderLeft: '3px solid var(--gold)', marginBottom: '2rem' }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: '1rem',  color: 'var(--text)', lineHeight: 1.7 }}>{v.thesis}</div>
      </div>

      {/* TAM / SAM / SOM */}
      <div className="kpi-row" style={{ marginBottom: '2rem' }}>
        {[v.tam, v.sam, v.som].map((t, i) => (
          <div key={i} className="kpi">
            <div className="kpi-value" style={{ fontSize: '2rem' }}>{t.value}</div>
            <div className="kpi-label">{t.label}</div>
            <div style={{ fontSize: '0.68rem', color: 'var(--text-faint)', marginTop: '0.3rem' }}>{t.desc}</div>
          </div>
        ))}
      </div>

      {/* 7 EIGEN Briques */}
      <div className="subsection">
        <h3>Intégration des 7 Briques EIGEN</h3>
        <div className="info-grid">
          {v.eigenIntegration.map((e, i) => (
            <div key={i} className="info-card" style={{ borderLeft: `3px solid ${e.color}` }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 500, color: e.color, marginBottom: '0.5rem' }}>{e.brique}</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>{e.role}</div>
              <div style={{ fontSize: '0.7rem', color: 'var(--gold-dim)' }}>{e.price}</div>
            </div>
          ))}
        </div>
      </div>

      {/* MVAC Hubs */}
      <div className="subsection">
        <h3>MVAC — Mineral Value-Addition Centers</h3>
        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>{v.makerspaces}</div>
        <div className="info-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
          {v.hubs.map((h, i) => (
            <div key={i} className="info-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <FlagIcon code={h.flag} size={24} />
                <span style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', color: 'var(--text)' }}>{h.city}</span>
              </div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-faint)', marginBottom: '0.3rem' }}>{h.country}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--gold)', marginBottom: '0.5rem' }}>{h.focus}</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>{h.rationale}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="tag">{h.type}</span>
                <span style={{ fontSize: '0.7rem', color: 'var(--gold-dim)' }}>CAPEX : {h.capex}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Go-to-Market */}
      <div className="subsection">
        <h3>Go-to-Market</h3>
        <div className="info-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
          <div className="info-card" style={{ borderLeft: '3px solid var(--gold)' }}>
            <div className="info-card-label">Trojan Horse</div>
            <div className="info-card-value" style={{ fontSize: '0.82rem' }}>{v.trojanHorse}</div>
          </div>
          <div className="info-card" style={{ borderLeft: '3px solid var(--green)' }}>
            <div className="info-card-label">Cascade EU</div>
            <div className="info-card-value" style={{ fontSize: '0.82rem' }}>{v.cascadeEU}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
