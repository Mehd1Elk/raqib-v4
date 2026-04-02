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

export function GalleriesTab({ country: c }: Props) {
  if (!c.galleries || c.galleries.length === 0) {
    return <p style={{ color: 'var(--text-muted, #918977)' }}>Données galeries non disponibles.</p>;
  }

  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.78rem' }}>
        <thead>
          <tr style={{ background: HERMES.brown, color: '#F7F3EA' }}>
            <th style={{ padding: '8px 12px', textAlign: 'left', fontWeight: 500 }}>Galerie</th>
            <th style={{ padding: '8px 12px', textAlign: 'left', fontWeight: 500 }}>Ville</th>
            <th style={{ padding: '8px 12px', textAlign: 'left', fontWeight: 500 }}>Directeur</th>
            <th style={{ padding: '8px 12px', textAlign: 'left', fontWeight: 500 }}>Spécialité</th>
            <th style={{ padding: '8px 12px', textAlign: 'left', fontWeight: 500 }}>Foires</th>
          </tr>
        </thead>
        <tbody>
          {c.galleries.map((g, i) => (
            <tr key={i} style={{ background: i % 2 ? HERMES.rowAlt : 'transparent', borderBottom: '1px solid rgba(193,154,107,0.2)' }}>
              <td style={{ padding: '10px 12px', fontWeight: 500, color: HERMES.brown }}>
                {g.name}
                {g.founded && <div style={{ fontSize: '0.63rem', color: HERMES.camel }}>Fondée {g.founded}</div>}
              </td>
              <td style={{ padding: '10px 12px' }}>
                {g.city}
                {g.country && <span style={{ color: 'var(--text-muted, #918977)', fontSize: '0.68rem' }}> · {g.country}</span>}
              </td>
              <td style={{ padding: '10px 12px' }}>{g.director || '—'}</td>
              <td style={{ padding: '10px 12px' }}>
                <span style={{
                  background: HERMES.orangeBg,
                  color: HERMES.orange,
                  padding: '2px 8px',
                  borderRadius: 0,
                  fontSize: '0.68rem',
                }}>{g.specialty}</span>
              </td>
              <td style={{ padding: '10px 12px', fontSize: '0.72rem', color: 'var(--text-muted, #918977)' }}>
                {g.fairs && g.fairs.length > 0 ? g.fairs.join(', ') : '—'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
