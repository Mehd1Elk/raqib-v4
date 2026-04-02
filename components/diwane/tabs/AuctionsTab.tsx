'use client';

import type { ArtCountry } from '@/lib/diwane/types';

const HERMES = {
  camel: '#C19A6B',
  orange: '#E8600A',
  orangeBg: 'rgba(232,96,10,0.12)',
  brown: '#3C2415',
  rowAlt: 'rgba(60,36,21,0.04)',
};

interface Props { country: ArtCountry }

export function AuctionsTab({ country: c }: Props) {
  const a = c.auctions;

  if (!a) {
    return <p style={{ color: 'var(--text-muted, #918977)' }}>Données enchères non disponibles.</p>;
  }

  return (
    <>
      {/* KPI Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12, marginBottom: 24 }}>
        {[
          { label: 'Volume total', value: a.totalVolume },
          { label: 'Croissance', value: a.growth },
          { label: 'Lot moyen', value: a.averageLot },
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

      {/* Top Records */}
      {a.topRecords && a.topRecords.length > 0 && (
        <div style={{ marginBottom: 24 }}>
          <h3 style={{ fontFamily: 'var(--font-playfair)', color: HERMES.orange, fontSize: '1.1rem', marginBottom: 10 }}>Records enchères</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.78rem' }}>
            <thead>
              <tr style={{ background: HERMES.brown, color: '#F7F3EA' }}>
                <th style={{ padding: '8px 12px', textAlign: 'left', fontWeight: 500 }}>Artiste</th>
                <th style={{ padding: '8px 12px', textAlign: 'left', fontWeight: 500 }}>Oeuvre</th>
                <th style={{ padding: '8px 12px', textAlign: 'right', fontWeight: 500 }}>Prix</th>
                <th style={{ padding: '8px 12px', textAlign: 'left', fontWeight: 500 }}>Maison</th>
                <th style={{ padding: '8px 12px', textAlign: 'left', fontWeight: 500 }}>Date</th>
              </tr>
            </thead>
            <tbody>
              {a.topRecords.map((r, i) => (
                <tr key={i} style={{ background: i % 2 ? HERMES.rowAlt : 'transparent', borderBottom: '1px solid rgba(193,154,107,0.2)' }}>
                  <td style={{ padding: '8px 12px', fontWeight: 500, color: HERMES.brown }}>{r.artist}</td>
                  <td style={{ padding: '8px 12px',  }}>{r.title}</td>
                  <td style={{ padding: '8px 12px', textAlign: 'right', fontWeight: 600, color: HERMES.orange }}>{r.price}</td>
                  <td style={{ padding: '8px 12px' }}>{r.house}</td>
                  <td style={{ padding: '8px 12px', color: 'var(--text-muted, #918977)' }}>{r.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Trends by Medium */}
      {a.trendsByMedium && a.trendsByMedium.length > 0 && (
        <div style={{ marginBottom: 24 }}>
          <h3 style={{ fontFamily: 'var(--font-playfair)', color: HERMES.orange, fontSize: '1.1rem', marginBottom: 10 }}>Tendances par medium</h3>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {a.trendsByMedium.map((t, i) => (
              <div key={i} style={{
                border: `1px solid ${HERMES.camel}`,
                borderRadius: 0,
                padding: '10px 14px',
                background: 'var(--bg-card, #FDFAF3)',
                minWidth: 140,
              }}>
                <div style={{ fontWeight: 500, fontSize: '0.82rem', color: HERMES.brown }}>{t.medium}</div>
                <div style={{ color: HERMES.camel, fontSize: '0.72rem', marginTop: 2 }}>Tendance : <span style={{ fontWeight: 600 }}>{t.trend}</span></div>
                {t.volume && <div style={{ fontSize: '0.68rem', color: 'var(--text-muted, #918977)' }}>Vol. : {t.volume}</div>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Active Houses */}
      {a.activeHouses && a.activeHouses.length > 0 && (
        <div>
          <h3 style={{ fontFamily: 'var(--font-playfair)', color: HERMES.orange, fontSize: '1.1rem', marginBottom: 10 }}>Maisons de vente actives</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 10 }}>
            {a.activeHouses.map((h, i) => (
              <div key={i} style={{
                border: `1px solid ${HERMES.camel}`,
                borderRadius: 0,
                padding: '12px 14px',
                background: 'var(--bg-card, #FDFAF3)',
              }}>
                <div style={{ fontFamily: 'var(--font-playfair)', fontWeight: 600, fontSize: '0.95rem', color: HERMES.brown }}>{h.name}</div>
                <div style={{ fontSize: '0.7rem', color: HERMES.camel }}>{h.hq}{h.founded ? ` · Fondée ${h.founded}` : ''}</div>
                {h.annualVolume && <div style={{ fontSize: '0.75rem', marginTop: 4 }}>Volume : <span style={{ color: HERMES.orange, fontWeight: 600 }}>{h.annualVolume}</span></div>}
                {h.specialties && h.specialties.length > 0 && (
                  <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginTop: 6 }}>
                    {h.specialties.map((s, j) => (
                      <span key={j} style={{
                        background: HERMES.orangeBg,
                        color: HERMES.orange,
                        padding: '2px 6px',
                        borderRadius: 0,
                        fontSize: '0.6rem',
                      }}>{s}</span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
