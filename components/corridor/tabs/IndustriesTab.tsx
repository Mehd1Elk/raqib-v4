'use client';

import type { Country } from '../../../lib/corridor/types';

interface Props { country: Country }

export function IndustriesTab({ country: c }: Props) {
  if (!c.industries) return <p style={{ color: 'var(--text-muted)' }}>Données industrielles non disponibles.</p>;
  const ind = c.industries;

  return (
    <>
      {ind.gdpBySector && (
        <div className="subsection">
          <h3>Répartition du PIB par secteur</h3>
          <div className="kpi-row">
            {Object.entries(ind.gdpBySector).map(([k, v]) => (
              <div key={k} className="kpi">
                <div className="kpi-label">{k.charAt(0).toUpperCase() + k.slice(1)}</div>
                <div className="kpi-value">{v}%</div>
                <div className="progress-bar" style={{ marginTop: '0.4rem' }}><div className="progress-bar-fill" style={{ width: `${v}%` }} /></div>
              </div>
            ))}
          </div>
        </div>
      )}

      {ind.keyIndustries && (
        <div className="subsection">
          <h3>Secteurs clés</h3>
          <div className="info-grid">
            {ind.keyIndustries.map((ki, i) => (
              <div key={i} className="info-card">
                <div className="info-card-label">{ki.name}</div>
                <div className="info-card-value" style={{ fontSize: '0.85rem' }}>{ki.description}</div>
                {ki.share && <div className="info-card-sub">{ki.share}</div>}
              </div>
            ))}
          </div>
        </div>
      )}

      {ind.sez && ind.sez.length > 0 && (
        <div className="subsection">
          <h3>Zones Économiques Spéciales</h3>
          <table className="data-table">
            <thead><tr><th>Nom</th><th>Localisation</th><th>Avantages</th></tr></thead>
            <tbody>
              {ind.sez.map((s, i) => (
                <tr key={i}><td className="col-name">{s.name}</td><td>{s.location}</td><td>{s.advantages}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {ind.majorProjects && (
        <div className="subsection">
          <h3>Projets d&apos;infrastructure majeurs</h3>
          <ul className="styled-list">
            {ind.majorProjects.map((p, i) => <li key={i}>{p}</li>)}
          </ul>
        </div>
      )}

      {ind.banking && (
        <div className="subsection">
          <h3>Secteur bancaire</h3>
          <div className="kpi-row">
            <div className="kpi"><div className="kpi-label">Total actifs</div><div className="kpi-value">{ind.banking.totalAssets || 'N/A'}</div></div>
            <div className="kpi"><div className="kpi-label">Taux de bancarisation</div><div className="kpi-value">{ind.banking.bancarisation || 'N/A'}</div></div>
          </div>
          <div style={{ marginTop: '0.5rem' }}>
            {(ind.banking.mainBanks || []).map((b, i) => <span key={i} className="tag" style={{ margin: '0.15rem' }}>{b}</span>)}
          </div>
        </div>
      )}

      {ind.telecom && (
        <div className="subsection">
          <h3>Télécommunications</h3>
          <div className="kpi-row">
            <div className="kpi"><div className="kpi-label">Pénétration mobile</div><div className="kpi-value">{ind.telecom.mobilePenetration || 'N/A'}</div></div>
            <div className="kpi"><div className="kpi-label">Pénétration internet</div><div className="kpi-value">{ind.telecom.internetPenetration || 'N/A'}</div></div>
          </div>
          <div style={{ marginTop: '0.5rem' }}>
            {(ind.telecom.operators || []).map((o, i) => <span key={i} className="tag" style={{ margin: '0.15rem' }}>{o}</span>)}
          </div>
        </div>
      )}

      {ind.energy && (
        <div className="subsection">
          <h3>Énergie</h3>
          <div className="info-grid">
            <div className="info-card"><div className="info-card-label">Mix énergétique</div><div className="info-card-value" style={{ fontSize: '0.8rem' }}>{ind.energy.mix || 'N/A'}</div></div>
            <div className="info-card"><div className="info-card-label">Capacité installée</div><div className="info-card-value">{ind.energy.installedCapacity || 'N/A'}</div></div>
            <div className="info-card"><div className="info-card-label">Projets renouvelables</div><div className="info-card-value" style={{ fontSize: '0.8rem' }}>{ind.energy.renewableProjects || 'N/A'}</div></div>
          </div>
        </div>
      )}
    </>
  );
}
