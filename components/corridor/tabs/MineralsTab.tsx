'use client';

import type { Country } from '../../../lib/corridor/types';

interface Props { country: Country }

export function MineralsTab({ country: c }: Props) {
  if (c.region === 'eu') {
    return (
      <div className="subsection">
        <h3>Demande en minéraux critiques</h3>
        {c.criticalMineralsDemand && (
          <ul className="styled-list">
            {c.criticalMineralsDemand.map((m, i) => {
              const name = typeof m === 'string' ? m : m.name || '';
              const detail = typeof m === 'object' && m.detail ? m.detail : '';
              return <li key={i}><strong>{name}</strong>{detail ? ` — ${detail}` : ''}</li>;
            })}
          </ul>
        )}
        {c.keyConsumingIndustries && (
          <div style={{ marginTop: '1.5rem' }}>
            <div className="info-card-label">Industries consommatrices clés</div>
            <div style={{ marginTop: '0.3rem' }}>
              {c.keyConsumingIndustries.map((ind, i) => {
                const name = typeof ind === 'string' ? ind : ind.name;
                return <span key={i} className="tag" style={{ margin: '0.2rem' }}>{name}</span>;
              })}
            </div>
          </div>
        )}
        {c.euCrmaRole && (
          <div className="info-card" style={{ marginTop: '1rem' }}>
            <div className="info-card-label">Rôle CRMA stratégique</div>
            <div className="info-card-value">{c.euCrmaRole}</div>
          </div>
        )}
      </div>
    );
  }

  if (!c.minerals || c.minerals.length === 0) {
    return <p style={{ color: 'var(--text-muted)' }}>Données minérales non disponibles pour ce pays.</p>;
  }

  return (
    <>
      <table className="data-table">
        <thead>
          <tr>
            <th>Minerai</th><th>Type</th><th>Production annuelle</th><th>Rang mondial</th><th>Réserves</th><th>CRMA</th>
          </tr>
        </thead>
        <tbody>
          {c.minerals.map((m, i) => (
            <tr key={i}>
              <td className="col-name">{m.name}</td>
              <td>{m.type || 'N/A'}</td>
              <td className="col-gold">{m.annualProduction || 'N/A'}</td>
              <td>{m.worldRank || 'N/A'}</td>
              <td>{m.reserves || 'N/A'}</td>
              <td><span className="tag">{m.crmaRelevance || 'N/A'}</span></td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: '2rem' }}>
        {c.minerals.map((m, i) => (
          <div key={i} className="mineral-detail">
            <h4>{m.name} <span style={{ fontSize: '0.7rem', color: 'var(--text-faint)', fontFamily: 'var(--font-body)' }}>{m.type || ''}</span></h4>
            {[
              { label: 'Production annuelle', value: m.annualProduction },
              { label: 'Rang mondial', value: m.worldRank },
              { label: 'Réserves', value: m.reserves },
              { label: "Revenus d'export", value: m.exportRevenue },
              { label: 'Réglementation', value: m.regulation },
              { label: 'Pertinence CRMA', value: m.crmaRelevance },
            ].map((row, j) => (
              <div key={j} className="md-row">
                <span className="md-label">{row.label}</span>
                <span className="md-value">{row.value || 'N/A'}</span>
              </div>
            ))}
            {m.deposits && m.deposits.length > 0 && (
              <div style={{ marginTop: '0.75rem' }}>
                <div style={{ fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-faint)', marginBottom: '0.4rem' }}>Gisements principaux</div>
                <table className="data-table" style={{ fontSize: '0.75rem' }}>
                  <thead><tr><th>Nom</th><th>Localisation</th><th>Stade</th><th>Opérateur</th><th>Nationalité</th></tr></thead>
                  <tbody>
                    {m.deposits.map((d, k) => (
                      <tr key={k}>
                        <td className="col-name">{d.name}</td>
                        <td>{d.location || 'N/A'}</td>
                        <td><span className="tag">{d.stage || 'N/A'}</span></td>
                        <td>{d.operator || 'N/A'}</td>
                        <td>{d.nationality || 'N/A'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
