'use client';

import type { ArtCountry } from '@/lib/diwane/types';

const HERMES = {
  camel: '#C19A6B',
  orange: '#E8600A',
  orangeBg: 'rgba(232,96,10,0.12)',
  brown: '#3C2415',
  rowAlt: 'rgba(60,36,21,0.04)',
};

const TYPE_LABELS: Record<string, string> = {
  museum: 'Musée',
  foundation: 'Fondation',
  'cultural-center': 'Centre culturel',
  institute: 'Institut',
};

interface Props { country: ArtCountry }

export function MuseumsTab({ country: c }: Props) {
  if (!c.museums || c.museums.length === 0) {
    return <p style={{ color: 'var(--text-muted, #918977)' }}>Données musées/institutions non disponibles.</p>;
  }

  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.78rem' }}>
        <thead>
          <tr style={{ background: HERMES.brown, color: '#F7F3EA' }}>
            <th style={{ padding: '8px 12px', textAlign: 'left', fontWeight: 500 }}>Institution</th>
            <th style={{ padding: '8px 12px', textAlign: 'left', fontWeight: 500 }}>Type</th>
            <th style={{ padding: '8px 12px', textAlign: 'left', fontWeight: 500 }}>Collection</th>
            <th style={{ padding: '8px 12px', textAlign: 'left', fontWeight: 500 }}>Directeur</th>
            <th style={{ padding: '8px 12px', textAlign: 'left', fontWeight: 500 }}>Visiteurs/an</th>
          </tr>
        </thead>
        <tbody>
          {c.museums.map((m, i) => (
            <tr key={i} style={{ background: i % 2 ? HERMES.rowAlt : 'transparent', borderBottom: '1px solid rgba(193,154,107,0.2)' }}>
              <td style={{ padding: '10px 12px', fontWeight: 500, color: HERMES.brown }}>
                {m.name}
                <div style={{ fontSize: '0.63rem', color: HERMES.camel }}>{m.city}{m.country ? ` · ${m.country}` : ''}</div>
              </td>
              <td style={{ padding: '10px 12px' }}>
                <span style={{
                  background: HERMES.orangeBg,
                  color: HERMES.orange,
                  padding: '2px 8px',
                  borderRadius: 0,
                  fontSize: '0.68rem',
                }}>{TYPE_LABELS[m.type] || m.type}</span>
              </td>
              <td style={{ padding: '10px 12px', maxWidth: 200 }}>
                {m.collection || '—'}
                {m.specialties && m.specialties.length > 0 && (
                  <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginTop: 4 }}>
                    {m.specialties.map((s, j) => (
                      <span key={j} style={{
                        background: 'rgba(193,154,107,0.15)',
                        color: HERMES.camel,
                        padding: '1px 6px',
                        borderRadius: 0,
                        fontSize: '0.6rem',
                      }}>{s}</span>
                    ))}
                  </div>
                )}
              </td>
              <td style={{ padding: '10px 12px' }}>{m.director || '—'}</td>
              <td style={{ padding: '10px 12px', fontWeight: 500, color: HERMES.orange }}>{m.annualVisitors || '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
