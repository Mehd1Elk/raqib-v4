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

export function ArtFinanceTab({ country: c }: Props) {
  const f = c.artFinance;

  if (!f) {
    return <p style={{ color: 'var(--text-muted, #918977)' }}>Données finance art non disponibles.</p>;
  }

  return (
    <>
      {/* Lombard Credit */}
      {f.lombardCredits && f.lombardCredits.length > 0 && (
        <div style={{ marginBottom: 24 }}>
          <h3 style={{ fontFamily: 'var(--font-playfair)', color: HERMES.orange, fontSize: '1.1rem', marginBottom: 10 }}>Crédit Lombard</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.78rem' }}>
            <thead>
              <tr style={{ background: HERMES.brown, color: '#F7F3EA' }}>
                <th style={{ padding: '8px 12px', textAlign: 'left', fontWeight: 500 }}>Prestataire</th>
                <th style={{ padding: '8px 12px', textAlign: 'left', fontWeight: 500 }}>LTV</th>
                <th style={{ padding: '8px 12px', textAlign: 'left', fontWeight: 500 }}>Valeur min.</th>
                <th style={{ padding: '8px 12px', textAlign: 'left', fontWeight: 500 }}>Taux</th>
                <th style={{ padding: '8px 12px', textAlign: 'left', fontWeight: 500 }}>Collatéraux</th>
              </tr>
            </thead>
            <tbody>
              {f.lombardCredits.map((lc, i) => (
                <tr key={i} style={{ background: i % 2 ? HERMES.rowAlt : 'transparent', borderBottom: '1px solid rgba(193,154,107,0.2)' }}>
                  <td style={{ padding: '8px 12px', fontWeight: 500, color: HERMES.brown }}>{lc.provider}</td>
                  <td style={{ padding: '8px 12px', color: HERMES.orange, fontWeight: 600 }}>{lc.ltvRange}</td>
                  <td style={{ padding: '8px 12px' }}>{lc.minValue || '—'}</td>
                  <td style={{ padding: '8px 12px' }}>{lc.interestRange || '—'}</td>
                  <td style={{ padding: '8px 12px', fontSize: '0.72rem', color: 'var(--text-muted, #918977)' }}>
                    {lc.collateralTypes?.join(', ') || '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Art Funds */}
      {f.artFunds && f.artFunds.length > 0 && (
        <div style={{ marginBottom: 24 }}>
          <h3 style={{ fontFamily: 'var(--font-playfair)', color: HERMES.orange, fontSize: '1.1rem', marginBottom: 10 }}>Fonds d&apos;art</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 10 }}>
            {f.artFunds.map((fund, i) => (
              <div key={i} style={{
                border: `1px solid ${HERMES.camel}`,
                borderRadius: 0,
                padding: '12px 14px',
                background: 'var(--bg-card, #FDFAF3)',
              }}>
                <div style={{ fontFamily: 'var(--font-playfair)', fontWeight: 600, fontSize: '0.95rem', color: HERMES.brown }}>{fund.name}</div>
                <div style={{ fontSize: '0.72rem', color: HERMES.camel }}>{fund.manager}{fund.vintage ? ` · ${fund.vintage}` : ''}</div>
                {fund.aum && <div style={{ fontSize: '0.78rem', marginTop: 4 }}>AUM : <span style={{ color: HERMES.orange, fontWeight: 600 }}>{fund.aum}</span></div>}
                {fund.strategy && <div style={{ fontSize: '0.7rem', color: 'var(--text-muted, #918977)', marginTop: 2 }}>{fund.strategy}</div>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Insurance */}
      {f.insurance && f.insurance.length > 0 && (
        <div style={{ marginBottom: 24 }}>
          <h3 style={{ fontFamily: 'var(--font-playfair)', color: HERMES.orange, fontSize: '1.1rem', marginBottom: 10 }}>Assurance art</h3>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {f.insurance.map((ins, i) => (
              <div key={i} style={{
                border: `1px solid ${HERMES.camel}`,
                borderRadius: 0,
                padding: '10px 14px',
                background: 'var(--bg-card, #FDFAF3)',
                minWidth: 200,
              }}>
                <div style={{ fontWeight: 500, fontSize: '0.82rem', color: HERMES.brown }}>{ins.provider}</div>
                <div style={{ fontSize: '0.72rem', color: HERMES.camel }}>{ins.coverage}</div>
                {ins.specialty && <div style={{ fontSize: '0.68rem', color: 'var(--text-muted, #918977)', marginTop: 2 }}>{ins.specialty}</div>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Free Ports */}
      {f.freePorts && f.freePorts.length > 0 && (
        <div style={{ marginBottom: 24 }}>
          <h3 style={{ fontFamily: 'var(--font-playfair)', color: HERMES.orange, fontSize: '1.1rem', marginBottom: 10 }}>Ports francs</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 10 }}>
            {f.freePorts.map((fp, i) => (
              <div key={i} style={{
                border: `1px solid ${HERMES.camel}`,
                borderRadius: 0,
                padding: '12px 14px',
                background: 'var(--bg-card, #FDFAF3)',
              }}>
                <div style={{ fontFamily: 'var(--font-playfair)', fontWeight: 600, fontSize: '0.95rem', color: HERMES.brown }}>{fp.name}</div>
                <div style={{ fontSize: '0.72rem', color: HERMES.camel }}>{fp.location}{fp.operator ? ` · ${fp.operator}` : ''}</div>
                {fp.capacity && <div style={{ fontSize: '0.73rem', marginTop: 4 }}>Capacité : {fp.capacity}</div>}
                {fp.services && fp.services.length > 0 && (
                  <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginTop: 6 }}>
                    {fp.services.map((s, j) => (
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

      {/* Tax Regime */}
      {f.taxRegime && f.taxRegime.length > 0 && (
        <div>
          <h3 style={{ fontFamily: 'var(--font-playfair)', color: HERMES.orange, fontSize: '1.1rem', marginBottom: 10 }}>Fiscalité</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.78rem' }}>
            <thead>
              <tr style={{ background: HERMES.brown, color: '#F7F3EA' }}>
                <th style={{ padding: '8px 12px', textAlign: 'left', fontWeight: 500 }}>Type</th>
                <th style={{ padding: '8px 12px', textAlign: 'left', fontWeight: 500 }}>Taux</th>
                <th style={{ padding: '8px 12px', textAlign: 'left', fontWeight: 500 }}>Détails</th>
              </tr>
            </thead>
            <tbody>
              {f.taxRegime.map((t, i) => (
                <tr key={i} style={{ background: i % 2 ? HERMES.rowAlt : 'transparent', borderBottom: '1px solid rgba(193,154,107,0.2)' }}>
                  <td style={{ padding: '8px 12px', fontWeight: 500, color: HERMES.brown }}>{t.type}</td>
                  <td style={{ padding: '8px 12px', color: HERMES.orange, fontWeight: 600 }}>{t.rate}</td>
                  <td style={{ padding: '8px 12px', color: 'var(--text-muted, #918977)' }}>{t.details || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
