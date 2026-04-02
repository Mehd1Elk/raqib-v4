'use client';

import type { ArtCountry } from '@/lib/diwane/types';

const HERMES = {
  camel: '#C19A6B',
  orange: '#E8600A',
  orangeBg: 'rgba(232,96,10,0.12)',
  brown: '#3C2415',
};

const TYPE_COLORS: Record<string, string> = {
  private: '#B8963E',
  institutional: '#4A7C59',
  corporate: '#5B6EA8',
  sovereign: '#6E2A3D',
};

interface Props { country: ArtCountry }

function getInitials(name: string): string {
  return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
}

export function CollectorsTab({ country: c }: Props) {
  if (!c.collectors || c.collectors.length === 0) {
    return <p style={{ color: 'var(--text-muted, #918977)' }}>Données collectionneurs non disponibles.</p>;
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 14 }}>
      {c.collectors.map((col, i) => {
        const typeColor = TYPE_COLORS[col.type] || HERMES.camel;
        return (
          <div key={i} style={{
            border: `1px solid ${HERMES.camel}`,
            borderLeft: `3px solid ${typeColor}`,
            borderRadius: 0,
            padding: 16,
            background: 'var(--bg-card, #FDFAF3)',
            display: 'flex',
            gap: 14,
            alignItems: 'flex-start',
          }}>
            <div style={{
              width: 48,
              height: 48,
              borderRadius: 0,
              background: `${typeColor}18`,
              color: typeColor,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'var(--font-playfair)',
              fontWeight: 700,
              fontSize: '1rem',
              flexShrink: 0,
            }}>{getInitials(col.name)}</div>

            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: 'var(--font-playfair)', fontWeight: 600, fontSize: '0.95rem', color: HERMES.brown }}>{col.name}</div>
              <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginTop: 4, marginBottom: 6 }}>
                <span style={{
                  background: `${typeColor}18`,
                  color: typeColor,
                  padding: '2px 8px',
                  borderRadius: 0,
                  fontSize: '0.63rem',
                  fontWeight: 500,
                  textTransform: 'capitalize',
                }}>{col.type}</span>
                {col.city && (
                  <span style={{ fontSize: '0.68rem', color: 'var(--text-muted, #918977)' }}>
                    {col.city}{col.country ? `, ${col.country}` : ''}
                  </span>
                )}
              </div>

              <div style={{ fontSize: '0.75rem', marginBottom: 4 }}>
                <strong>Focus :</strong> {col.focus}
              </div>

              {col.collectionSize && (
                <div style={{ fontSize: '0.73rem' }}>
                  <strong>Collection :</strong> <span style={{ color: HERMES.orange, fontWeight: 600 }}>{col.collectionSize}</span>
                </div>
              )}

              {col.foundation && (
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted, #918977)', marginTop: 4 }}>
                  Fondation : {col.foundation}
                </div>
              )}

              {col.notableWorks && col.notableWorks.length > 0 && (
                <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginTop: 6 }}>
                  {col.notableWorks.map((w, j) => (
                    <span key={j} style={{
                      background: HERMES.orangeBg,
                      color: HERMES.orange,
                      padding: '2px 6px',
                      borderRadius: 0,
                      fontSize: '0.6rem',
                    }}>{w}</span>
                  ))}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
