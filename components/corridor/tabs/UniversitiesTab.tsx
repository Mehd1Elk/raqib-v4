'use client';

import type { Country } from '../../../lib/corridor/types';

interface Props { country: Country }

export function UniversitiesTab({ country: c }: Props) {
  if (!c.universities || c.universities.length === 0) {
    return <p style={{ color: 'var(--text-muted)' }}>Données non disponibles.</p>;
  }

  return (
    <>
      <table className="data-table">
        <thead>
          <tr><th>Université</th><th>Ville</th><th>Étudiants</th><th>Spécialités</th><th>Ranking</th></tr>
        </thead>
        <tbody>
          {c.universities.map((u, i) => (
            <tr key={i}>
              <td className="col-name">{u.name}</td>
              <td>{u.city || 'N/A'}</td>
              <td>{u.students || 'N/A'}</td>
              <td style={{ fontSize: '0.72rem' }}>{u.specialties || 'N/A'}</td>
              <td>{u.ranking || 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {(c.sciPublications || c.patents || c.literacyRate) && (
        <div className="kpi-row" style={{ marginTop: '1.5rem' }}>
          {c.sciPublications && <div className="kpi"><div className="kpi-label">Publications scientifiques</div><div className="kpi-value">{c.sciPublications}</div></div>}
          {c.patents && <div className="kpi"><div className="kpi-label">Brevets déposés</div><div className="kpi-value">{c.patents}</div></div>}
          {c.literacyRate && <div className="kpi"><div className="kpi-label">Taux d&apos;alphabétisation</div><div className="kpi-value">{c.literacyRate}</div></div>}
          {c.higherEducationRate && <div className="kpi"><div className="kpi-label">Scolarisation supérieure</div><div className="kpi-value">{c.higherEducationRate}</div></div>}
        </div>
      )}
    </>
  );
}
