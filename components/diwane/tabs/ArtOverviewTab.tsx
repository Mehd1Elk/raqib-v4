'use client';

import type { ArtCountry } from '@/lib/diwane/types';

const HERMES = {
  camel: '#C19A6B',
  orange: '#E8600A',
  orangeBg: 'rgba(232,96,10,0.12)',
  brown: '#3C2415',
  brownLight: '#5A3E2B',
  rowAlt: 'rgba(60,36,21,0.04)',
};

interface Props { country: ArtCountry }

export function ArtOverviewTab({ country: c }: Props) {
  const market = c.artMarket;

  return (
    <>
      {/* KPI Row */}
      {market && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 12, marginBottom: 24 }}>
          {[
            { label: 'Taille du marché', value: market.totalSize },
            { label: 'Croissance', value: market.growth },
            { label: 'Part en ligne', value: market.onlineShare },
            { label: 'Part enchères', value: market.auctionShare },
            { label: 'Part privée', value: market.privateShare },
          ].map((kpi, i) => (
            <div key={i} style={{
              background: 'var(--bg-card, #FDFAF3)',
              border: `1px solid ${HERMES.camel}`,
              borderRadius: 0,
              padding: '14px 16px',
            }}>
              <div style={{ fontSize: '0.68rem', color: 'var(--text-muted, #918977)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{kpi.label}</div>
              <div style={{ fontSize: '1.3rem', fontFamily: 'var(--font-playfair)', fontWeight: 600, color: HERMES.orange, marginTop: 4 }}>{kpi.value || 'N/A'}</div>
            </div>
          ))}
        </div>
      )}

      {/* Top Segments */}
      {market?.topSegments && market.topSegments.length > 0 && (
        <div style={{ marginBottom: 24 }}>
          <h3 style={{ fontFamily: 'var(--font-playfair)', color: HERMES.orange, fontSize: '1.1rem', marginBottom: 10 }}>Segments principaux</h3>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {market.topSegments.map((s, i) => (
              <span key={i} style={{
                background: HERMES.orangeBg,
                color: HERMES.orange,
                padding: '4px 12px',
                borderRadius: 0,
                fontSize: '0.75rem',
                fontWeight: 500,
              }}>{s.name} — {s.share}</span>
            ))}
          </div>
        </div>
      )}

      {/* Art Movements */}
      {c.movements && c.movements.length > 0 && (
        <div style={{ marginBottom: 24 }}>
          <h3 style={{ fontFamily: 'var(--font-playfair)', color: HERMES.orange, fontSize: '1.1rem', marginBottom: 10 }}>Mouvements artistiques</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 10 }}>
            {c.movements.map((m, i) => (
              <div key={i} style={{
                border: `1px solid ${HERMES.camel}`,
                borderRadius: 0,
                padding: '12px 14px',
                background: 'var(--bg-card, #FDFAF3)',
              }}>
                <div style={{ fontFamily: 'var(--font-playfair)', fontWeight: 600, fontSize: '0.95rem', color: HERMES.brown }}>{m.name}</div>
                <div style={{ fontSize: '0.7rem', color: HERMES.camel, marginBottom: 6 }}>{m.period}</div>
                <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                  {m.keyArtists.map((a, j) => (
                    <span key={j} style={{
                      background: HERMES.orangeBg,
                      color: HERMES.orange,
                      padding: '2px 8px',
                      borderRadius: 0,
                      fontSize: '0.65rem',
                    }}>{a}</span>
                  ))}
                </div>
                {m.description && <div style={{ fontSize: '0.7rem', color: 'var(--text-muted, #918977)', marginTop: 6 }}>{m.description}</div>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Events */}
      {c.events && c.events.length > 0 && (
        <div>
          <h3 style={{ fontFamily: 'var(--font-playfair)', color: HERMES.orange, fontSize: '1.1rem', marginBottom: 10 }}>Événements clés</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.78rem' }}>
            <thead>
              <tr style={{ background: HERMES.brown, color: '#F7F3EA' }}>
                <th style={{ padding: '8px 12px', textAlign: 'left', fontWeight: 500 }}>Événement</th>
                <th style={{ padding: '8px 12px', textAlign: 'left', fontWeight: 500 }}>Type</th>
                <th style={{ padding: '8px 12px', textAlign: 'left', fontWeight: 500 }}>Ville</th>
                <th style={{ padding: '8px 12px', textAlign: 'left', fontWeight: 500 }}>Date</th>
              </tr>
            </thead>
            <tbody>
              {c.events.map((e, i) => (
                <tr key={i} style={{ background: i % 2 ? HERMES.rowAlt : 'transparent' }}>
                  <td style={{ padding: '8px 12px', fontWeight: 500 }}>{e.name}</td>
                  <td style={{ padding: '8px 12px' }}>
                    <span style={{
                      background: HERMES.orangeBg,
                      color: HERMES.orange,
                      padding: '2px 8px',
                      borderRadius: 0,
                      fontSize: '0.68rem',
                      textTransform: 'capitalize',
                    }}>{e.type}</span>
                  </td>
                  <td style={{ padding: '8px 12px' }}>{e.city}</td>
                  <td style={{ padding: '8px 12px', color: 'var(--text-muted, #918977)' }}>{e.date || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!market && (!c.movements || c.movements.length === 0) && (!c.events || c.events.length === 0) && (
        <p style={{ color: 'var(--text-muted, #918977)' }}>Données marché art non disponibles.</p>
      )}
    </>
  );
}
