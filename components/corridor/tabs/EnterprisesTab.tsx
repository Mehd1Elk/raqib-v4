'use client';

import type { Country } from '../../../lib/corridor/types';

interface Props { country: Country }

export function EnterprisesTab({ country: c }: Props) {
  if (c.region === 'eu' && c.keyEnterprisesForCorridor) {
    return (
      <div className="subsection">
        <h3>Entreprises clés pour le corridor EU-Afrique</h3>
        <div className="info-grid">
          {c.keyEnterprisesForCorridor.map((e, i) => {
            const name = typeof e === 'string' ? e : e.name;
            const role = typeof e === 'object' ? (e.role || e.description || '') : '';
            const relevance = typeof e === 'object' ? (e.africaRelevance || e.relevance || '') : '';
            return (
              <div key={i} className="info-card">
                <div className="info-card-label">{name}</div>
                <div className="info-card-value" style={{ fontSize: '0.85rem' }}>{role}</div>
                {relevance && <div className="info-card-sub">Pertinence Afrique : {relevance}</div>}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  if (!c.enterprises || c.enterprises.length === 0) {
    return <p style={{ color: 'var(--text-muted)' }}>Données entreprises non disponibles.</p>;
  }

  return (
    <>
      <div style={{ fontSize: '0.7rem', color: 'var(--text-faint)', marginBottom: '1rem' }}>
        Top {c.enterprises.length} entreprises
      </div>
      <div style={{ overflowX: 'auto' }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>Entreprise</th><th>Secteur</th><th>CA</th><th>Employés</th><th>CEO</th><th>Actionnariat</th><th>Cotation</th>
            </tr>
          </thead>
          <tbody>
            {c.enterprises.map((e, i) => (
              <tr key={i}>
                <td className="col-name">
                  {e.name}
                  <div style={{ fontSize: '0.6rem', color: 'var(--text-faint)' }}>
                    Fondée: {e.founded || 'N/A'}{e.website ? ` · ${e.website}` : ''}
                  </div>
                </td>
                <td>{e.sector || 'N/A'}</td>
                <td className="col-gold">{e.revenue || 'N/A'}</td>
                <td>{e.employees || 'N/A'}</td>
                <td>{e.ceo || 'N/A'}</td>
                <td style={{ fontSize: '0.72rem' }}>{e.shareholding || 'N/A'}</td>
                <td>{e.listed || 'Non coté'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
