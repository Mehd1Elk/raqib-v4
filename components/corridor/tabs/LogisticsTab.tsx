'use client';

import type { Country } from '../../../lib/corridor/types';

interface Props { country: Country }

export function LogisticsTab({ country: c }: Props) {
  if (!c.logistics) return <p style={{ color: 'var(--text-muted)' }}>Données logistiques non disponibles.</p>;
  const lg = c.logistics;

  const otherFields = [
    { key: 'railway' as const, label: 'Réseau ferroviaire' },
    { key: 'roads' as const, label: 'Réseau routier' },
    { key: 'corridors' as const, label: 'Corridors logistiques' },
    { key: 'containerCost' as const, label: 'Coût logistique (export)' },
    { key: 'customsDelay' as const, label: 'Délai de dédouanement' },
    { key: 'maritimeConnectivity' as const, label: 'Connectivité maritime vers EU' },
  ];

  return (
    <>
      {lg.ports && lg.ports.length > 0 && (
        <div className="subsection">
          <h3>Ports principaux</h3>
          <table className="data-table">
            <thead><tr><th>Port</th><th>Capacité</th><th>Opérateur</th><th>Tirant d&apos;eau</th><th>Note</th></tr></thead>
            <tbody>
              {lg.ports.map((p, i) => (
                <tr key={i}><td className="col-name">{p.name}</td><td className="col-gold">{p.capacity || 'N/A'}</td><td>{p.operator || 'N/A'}</td><td>{p.draft || 'N/A'}</td><td style={{ fontSize: '0.72rem' }}>{p.note || ''}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {lg.airports && lg.airports.length > 0 && (
        <div className="subsection">
          <h3>Aéroports internationaux</h3>
          <table className="data-table">
            <thead><tr><th>Aéroport</th><th>Trafic passagers</th><th>Fret</th></tr></thead>
            <tbody>
              {lg.airports.map((a, i) => (
                <tr key={i}><td className="col-name">{a.name}</td><td>{a.traffic || 'N/A'}</td><td>{a.freight || 'N/A'}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="info-grid">
        {otherFields.map((f, i) => {
          const val = lg[f.key];
          if (!val) return null;
          return (
            <div key={i} className="info-card">
              <div className="info-card-label">{f.label}</div>
              <div className="info-card-value" style={{ fontSize: '0.82rem' }}>{val}</div>
            </div>
          );
        })}
      </div>

      {lg.logisticZones && lg.logisticZones.length > 0 && (
        <div style={{ marginTop: '1rem' }}>
          <span style={{ fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-faint)' }}>Zones logistiques</span>
          <div style={{ marginTop: '0.3rem' }}>
            {lg.logisticZones.map((z, i) => <span key={i} className="tag" style={{ margin: '0.15rem' }}>{z}</span>)}
          </div>
        </div>
      )}
    </>
  );
}
