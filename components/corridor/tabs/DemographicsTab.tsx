'use client';

import type { Country } from '../../../lib/corridor/types';

interface Props { country: Country }

export function DemographicsTab({ country: c }: Props) {
  if (!c.demographics) return <p style={{ color: 'var(--text-muted)' }}>Données démographiques non disponibles.</p>;
  const d = c.demographics;

  return (
    <>
      <div className="kpi-row">
        <div className="kpi"><div className="kpi-label">Population totale</div><div className="kpi-value">{d.totalPopulation || 'N/A'}</div></div>
        <div className="kpi"><div className="kpi-label">Croissance</div><div className="kpi-value">{d.growthRate || 'N/A'}</div></div>
        <div className="kpi"><div className="kpi-label">Pop. urbaine</div><div className="kpi-value">{d.urbanPopulation || 'N/A'}</div></div>
        <div className="kpi"><div className="kpi-label">Chômage</div><div className="kpi-value text-orange">{d.unemployment || 'N/A'}</div></div>
        <div className="kpi"><div className="kpi-label">Chômage jeunes</div><div className="kpi-value text-red">{d.youthUnemployment || 'N/A'}</div></div>
      </div>

      <div className="info-grid" style={{ marginTop: '1.5rem' }}>
        <div className="info-card"><div className="info-card-label">IDH</div><div className="info-card-value">{d.hdi || 'N/A'}</div></div>
        <div className="info-card"><div className="info-card-label">Espérance de vie</div><div className="info-card-value">{d.lifeExpectancy || 'N/A'}</div></div>
        <div className="info-card"><div className="info-card-label">Structure par âge</div><div className="info-card-value" style={{ fontSize: '0.82rem' }}>{d.ageStructure || 'N/A'}</div></div>
        <div className="info-card"><div className="info-card-label">Classe moyenne</div><div className="info-card-value">{d.middleClass || 'N/A'}</div></div>
        <div className="info-card"><div className="info-card-label">Millionnaires</div><div className="info-card-value gold">{d.millionaires || 'N/A'}</div></div>
        <div className="info-card"><div className="info-card-label">Diaspora en France</div><div className="info-card-value">{d.diasporaFrance || 'N/A'}</div></div>
        <div className="info-card"><div className="info-card-label">Langues</div><div className="info-card-value" style={{ fontSize: '0.82rem' }}>{d.languages || 'N/A'}</div></div>
        <div className="info-card"><div className="info-card-label">Alphabétisation</div><div className="info-card-value">{d.literacy || 'N/A'}</div></div>
      </div>
    </>
  );
}
