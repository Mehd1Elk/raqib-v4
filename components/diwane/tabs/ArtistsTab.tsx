'use client';

import type { ArtCountry } from '@/lib/diwane/types';

const HERMES = {
  camel: '#C19A6B',
  orange: '#E8600A',
  orangeBg: 'rgba(232,96,10,0.12)',
  brown: '#3C2415',
};

interface Props { country: ArtCountry }

function getInitials(name: string): string {
  return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
}

export function ArtistsTab({ country: c }: Props) {
  if (!c.artists || c.artists.length === 0) {
    return <p style={{ color: 'var(--text-muted, #918977)' }}>Données artistes non disponibles.</p>;
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 14 }}>
      {c.artists.map((a, i) => (
        <div key={i} style={{
          border: `1px solid ${HERMES.camel}`,
          borderRadius: 0,
          padding: 16,
          background: 'var(--bg-card, #FDFAF3)',
          display: 'flex',
          gap: 14,
          alignItems: 'flex-start',
        }}>
          {/* Avatar placeholder */}
          <div style={{
            width: 52,
            height: 52,
            borderRadius: 0,
            background: HERMES.orangeBg,
            color: HERMES.orange,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'var(--font-playfair)',
            fontWeight: 700,
            fontSize: '1.1rem',
            flexShrink: 0,
          }}>{getInitials(a.name)}</div>

          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontFamily: 'var(--font-playfair)', fontWeight: 600, fontSize: '1rem', color: HERMES.brown }}>{a.name}</div>
            <div style={{ fontSize: '0.72rem', color: HERMES.camel, marginBottom: 6 }}>
              {a.born && <span>{a.born}{a.died ? ` — ${a.died}` : ''}</span>}
              {a.nationality && <span> · {a.nationality}</span>}
            </div>

            <div style={{ fontSize: '0.75rem', color: 'var(--text, #2A2318)', marginBottom: 6 }}>
              <strong>Medium :</strong> {a.medium}
            </div>

            {a.movement && (
              <span style={{
                background: HERMES.orangeBg,
                color: HERMES.orange,
                padding: '2px 8px',
                borderRadius: 0,
                fontSize: '0.65rem',
                fontWeight: 500,
                display: 'inline-block',
                marginBottom: 6,
              }}>{a.movement}</span>
            )}

            {a.record && (
              <div style={{ fontSize: '0.73rem', marginBottom: 4 }}>
                <strong>Record :</strong>{' '}
                <span style={{ color: HERMES.orange, fontWeight: 600 }}>{a.record}</span>
                {a.recordYear && <span style={{ color: 'var(--text-muted, #918977)', fontSize: '0.65rem' }}> ({a.recordYear})</span>}
              </div>
            )}

            {a.galleries && a.galleries.length > 0 && (
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted, #918977)' }}>
                <strong>Galeries :</strong> {a.galleries.join(', ')}
              </div>
            )}

            {a.bio && (
              <div style={{ fontSize: '0.68rem', color: 'var(--text-muted, #918977)', marginTop: 6, lineHeight: 1.4 }}>{a.bio}</div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
