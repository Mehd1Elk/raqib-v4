'use client';

import { EXCHANGE_DATA } from './minerals-data';

export function MineralsExchange() {
  return (
    <div style={{ padding: '1.5rem 0' }}>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--gold-light)', marginBottom: '0.5rem' }}>Bourse des Minéraux</div>
      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
        Cotations Q1 2026 — Prix, tendances, dynamiques d&apos;approvisionnement et sources corridor.
      </div>
      <div className="info-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))' }}>
        {EXCHANGE_DATA.map((e, i) => {
          const trendIcon = e.trend === 'up' ? '▲' : e.trend === 'down' ? '▼' : '—';
          const trendColor = e.trend === 'up' ? 'var(--green)' : e.trend === 'down' ? 'var(--red)' : 'var(--text-muted)';
          return (
            <div key={i} className="info-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 500, color: 'var(--text)' }}>{e.mineral}</div>
                <span className="tag">{e.category}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', marginBottom: '0.75rem' }}>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--gold)', fontWeight: 500 }}>{e.price}</span>
                <span style={{ fontSize: '0.8rem', fontWeight: 600, color: trendColor }}>{trendIcon} {e.change}</span>
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>{e.supply}</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--gold-dim)' }}>Corridor : {e.corridorSource}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
