'use client';

import type { ArtCountry } from '@/lib/diwane/types';

const HERMES = {
  camel: '#C19A6B',
  orange: '#E8600A',
  orangeBg: 'rgba(232,96,10,0.12)',
  brown: '#3C2415',
  rowAlt: 'rgba(60,36,21,0.04)',
};

const STATUS_COLORS: Record<string, { bg: string; fg: string }> = {
  active: { bg: 'rgba(74,124,89,0.12)', fg: '#4A7C59' },
  pending: { bg: 'rgba(184,150,62,0.12)', fg: '#B8963E' },
  proposed: { bg: 'rgba(91,110,168,0.12)', fg: '#5B6EA8' },
};

interface Props { country: ArtCountry }

function RegulationSection({ title, items }: { title: string; items: NonNullable<ArtCountry['regulation']>['patrimony'] }) {
  if (!items || items.length === 0) return null;

  return (
    <div style={{ marginBottom: 24 }}>
      <h3 style={{ fontFamily: 'var(--font-playfair)', color: HERMES.orange, fontSize: '1.1rem', marginBottom: 10 }}>{title}</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.78rem' }}>
        <thead>
          <tr style={{ background: HERMES.brown, color: '#F7F3EA' }}>
            <th style={{ padding: '8px 12px', textAlign: 'left', fontWeight: 500 }}>Domaine</th>
            <th style={{ padding: '8px 12px', textAlign: 'left', fontWeight: 500 }}>Loi / Cadre</th>
            <th style={{ padding: '8px 12px', textAlign: 'left', fontWeight: 500 }}>Description</th>
            <th style={{ padding: '8px 12px', textAlign: 'left', fontWeight: 500 }}>Autorité</th>
            <th style={{ padding: '8px 12px', textAlign: 'center', fontWeight: 500 }}>Statut</th>
          </tr>
        </thead>
        <tbody>
          {items.map((r, i) => {
            const sc = STATUS_COLORS[r.status || 'active'] || STATUS_COLORS.active;
            return (
              <tr key={i} style={{ background: i % 2 ? HERMES.rowAlt : 'transparent', borderBottom: '1px solid rgba(193,154,107,0.2)' }}>
                <td style={{ padding: '8px 12px', fontWeight: 500, color: HERMES.brown }}>{r.domain}</td>
                <td style={{ padding: '8px 12px', fontSize: '0.72rem' }}>{r.law || '—'}</td>
                <td style={{ padding: '8px 12px', maxWidth: 280, fontSize: '0.72rem', color: 'var(--text, #2A2318)' }}>{r.description}</td>
                <td style={{ padding: '8px 12px', fontSize: '0.72rem' }}>{r.authority || '—'}</td>
                <td style={{ padding: '8px 12px', textAlign: 'center' }}>
                  <span style={{
                    background: sc.bg,
                    color: sc.fg,
                    padding: '2px 8px',
                    borderRadius: 0,
                    fontSize: '0.65rem',
                    fontWeight: 500,
                    textTransform: 'capitalize',
                  }}>{r.status || 'active'}</span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export function RegulationTab({ country: c }: Props) {
  const r = c.regulation;

  if (!r) {
    return <p style={{ color: 'var(--text-muted, #918977)' }}>Données réglementation non disponibles.</p>;
  }

  return (
    <>
      <RegulationSection title="Patrimoine culturel" items={r.patrimony} />
      <RegulationSection title="Export / Import" items={r.exportImport} />
      <RegulationSection title="Droit de suite" items={r.droitDeSuite} />
      <RegulationSection title="Anti-blanchiment (AML)" items={r.aml} />
      <RegulationSection title="Restitution" items={r.restitution} />

      {!r.patrimony?.length && !r.exportImport?.length && !r.droitDeSuite?.length && !r.aml?.length && !r.restitution?.length && (
        <p style={{ color: 'var(--text-muted, #918977)' }}>Aucune réglementation documentée.</p>
      )}
    </>
  );
}
