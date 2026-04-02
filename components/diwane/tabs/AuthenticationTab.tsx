'use client';

import type { ArtCountry } from '@/lib/diwane/types';

const HERMES = {
  camel: '#C19A6B',
  orange: '#E8600A',
  orangeBg: 'rgba(232,96,10,0.12)',
  brown: '#3C2415',
  rowAlt: 'rgba(60,36,21,0.04)',
  bordeaux: '#6E2A3D',
};

const METHOD_COLORS: Record<string, { bg: string; fg: string }> = {
  scientific: { bg: 'rgba(91,110,168,0.12)', fg: '#5B6EA8' },
  stylistic: { bg: 'rgba(184,150,62,0.12)', fg: '#B8963E' },
  provenance: { bg: 'rgba(74,124,89,0.12)', fg: '#4A7C59' },
  digital: { bg: 'rgba(110,42,61,0.12)', fg: '#6E2A3D' },
  ai: { bg: 'rgba(232,96,10,0.12)', fg: '#E8600A' },
};

interface Props { country: ArtCountry }

export function AuthenticationTab({ country: c }: Props) {
  const auth = c.authentication;

  if (!auth) {
    return <p style={{ color: 'var(--text-muted, #918977)' }}>Données authentification non disponibles.</p>;
  }

  return (
    <>
      {/* Methods */}
      {auth.methods && auth.methods.length > 0 && (
        <div style={{ marginBottom: 24 }}>
          <h3 style={{ fontFamily: 'var(--font-playfair)', color: HERMES.orange, fontSize: '1.1rem', marginBottom: 10 }}>Méthodes d&apos;authentification</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 10 }}>
            {auth.methods.map((m, i) => {
              const mc = METHOD_COLORS[m.type] || METHOD_COLORS.scientific;
              return (
                <div key={i} style={{
                  border: `1px solid ${HERMES.camel}`,
                  borderLeft: `3px solid ${mc.fg}`,
                  borderRadius: 0,
                  padding: '12px 14px',
                  background: 'var(--bg-card, #FDFAF3)',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ fontFamily: 'var(--font-playfair)', fontWeight: 600, fontSize: '0.95rem', color: HERMES.brown }}>{m.name}</div>
                    <span style={{
                      background: mc.bg,
                      color: mc.fg,
                      padding: '2px 8px',
                      borderRadius: 0,
                      fontSize: '0.6rem',
                      fontWeight: 500,
                      textTransform: 'capitalize',
                      flexShrink: 0,
                    }}>{m.type}</span>
                  </div>
                  {m.provider && <div style={{ fontSize: '0.72rem', color: HERMES.camel, marginTop: 2 }}>{m.provider}</div>}
                  {m.description && <div style={{ fontSize: '0.7rem', color: 'var(--text, #2A2318)', marginTop: 6, lineHeight: 1.4 }}>{m.description}</div>}
                  {m.accuracy && <div style={{ fontSize: '0.7rem', marginTop: 4 }}>Précision : <span style={{ color: HERMES.orange, fontWeight: 600 }}>{m.accuracy}</span></div>}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Forgery Cases */}
      {auth.forgeryCases && auth.forgeryCases.length > 0 && (
        <div style={{ marginBottom: 24 }}>
          <h3 style={{ fontFamily: 'var(--font-playfair)', color: HERMES.orange, fontSize: '1.1rem', marginBottom: 10 }}>Cas de faux / contrefaçon</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.78rem' }}>
            <thead>
              <tr style={{ background: HERMES.brown, color: '#F7F3EA' }}>
                <th style={{ padding: '8px 12px', textAlign: 'left', fontWeight: 500 }}>Affaire</th>
                <th style={{ padding: '8px 12px', textAlign: 'left', fontWeight: 500 }}>Artiste</th>
                <th style={{ padding: '8px 12px', textAlign: 'left', fontWeight: 500 }}>Année</th>
                <th style={{ padding: '8px 12px', textAlign: 'left', fontWeight: 500 }}>Détails</th>
                <th style={{ padding: '8px 12px', textAlign: 'left', fontWeight: 500 }}>Issue</th>
              </tr>
            </thead>
            <tbody>
              {auth.forgeryCases.map((fc, i) => (
                <tr key={i} style={{ background: i % 2 ? HERMES.rowAlt : 'transparent', borderBottom: '1px solid rgba(193,154,107,0.2)' }}>
                  <td style={{ padding: '8px 12px', fontWeight: 500, color: HERMES.brown }}>{fc.title}</td>
                  <td style={{ padding: '8px 12px' }}>{fc.artist || '—'}</td>
                  <td style={{ padding: '8px 12px', color: 'var(--text-muted, #918977)' }}>{fc.year || '—'}</td>
                  <td style={{ padding: '8px 12px', maxWidth: 250, fontSize: '0.72rem' }}>{fc.details}</td>
                  <td style={{ padding: '8px 12px', fontSize: '0.72rem' }}>{fc.outcome || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Certification Bodies */}
      {auth.certificationBodies && auth.certificationBodies.length > 0 && (
        <div style={{ marginBottom: 24 }}>
          <h3 style={{ fontFamily: 'var(--font-playfair)', color: HERMES.orange, fontSize: '1.1rem', marginBottom: 10 }}>Organismes de certification</h3>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {auth.certificationBodies.map((cb, i) => (
              <div key={i} style={{
                border: `1px solid ${HERMES.camel}`,
                borderRadius: 0,
                padding: '10px 14px',
                background: 'var(--bg-card, #FDFAF3)',
                minWidth: 200,
              }}>
                <div style={{ fontWeight: 500, fontSize: '0.82rem', color: HERMES.brown }}>{cb.name}</div>
                <div style={{ fontSize: '0.72rem', color: HERMES.camel }}>{cb.role}</div>
                {cb.country && <div style={{ fontSize: '0.65rem', color: 'var(--text-muted, #918977)' }}>{cb.country}</div>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* NOOS Integration */}
      {auth.noosIntegration && auth.noosIntegration.length > 0 && (
        <div>
          <h3 style={{ fontFamily: 'var(--font-playfair)', color: HERMES.bordeaux, fontSize: '1.1rem', marginBottom: 10 }}>
            Intégration NOOS — Analyse scientifique IA
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 10 }}>
            {auth.noosIntegration.map((n, i) => (
              <div key={i} style={{
                border: `1px solid ${HERMES.bordeaux}`,
                borderRadius: 0,
                padding: '12px 14px',
                background: `rgba(110,42,61,0.04)`,
              }}>
                <div style={{ fontFamily: 'var(--font-playfair)', fontWeight: 600, fontSize: '0.92rem', color: HERMES.bordeaux }}>{n.feature}</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text, #2A2318)', marginTop: 4, lineHeight: 1.4 }}>{n.description}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
