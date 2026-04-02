'use client';

import type { Country } from '../../../lib/corridor/types';
import { getRiskClass, getRiskColor } from '../../../lib/corridor/utils';

interface Props { country: Country }

export function OverviewTab({ country: c }: Props) {
  const riskClass = getRiskClass(c.riskScore);

  return (
    <>
      <div className="kpi-row">
        <div className="kpi"><div className="kpi-label">PIB Nominal</div><div className="kpi-value">{c.gdpNominal || 'N/A'}</div></div>
        <div className="kpi"><div className="kpi-label">PIB PPA</div><div className="kpi-value">{c.gdpPPP || 'N/A'}</div></div>
        <div className="kpi"><div className="kpi-label">PIB/Habitant</div><div className="kpi-value">{c.gdpPerCapita || 'N/A'}</div></div>
        <div className="kpi"><div className="kpi-label">Inflation</div><div className="kpi-value">{c.inflation || 'N/A'}</div></div>
        <div className="kpi"><div className="kpi-label">Score Risque</div><div className="kpi-value" style={{ color: getRiskColor(c.riskScore) }}>{c.riskScore}/10</div></div>
      </div>

      <div className="info-grid">
        {[
          { label: 'Capitale', value: c.capital },
          { label: 'Population', value: c.population, sub: `Densité : ${c.density || 'N/A'}` },
          { label: 'Superficie', value: c.area },
          { label: 'Monnaie', value: c.currency, sub: `${c.exchangeRateEUR || ''} ${c.exchangeRateUSD ? '· ' + c.exchangeRateUSD : ''}` },
          { label: 'Dette publique / PIB', value: c.debtToGDP },
          { label: 'Balance commerciale', value: c.tradeBalance },
          { label: 'Indice de corruption', value: c.corruptionIndex },
          { label: 'Ease of Doing Business', value: c.easeBusiness },
          { label: 'Stabilité politique', value: c.politicalStability },
          { label: 'Langues', value: c.languages },
          { label: 'Fuseau horaire', value: c.timezone },
          { label: 'Organisations', value: c.memberships?.join(', ') },
        ].map((item, i) => (
          <div key={i} className="info-card">
            <div className="info-card-label">{item.label}</div>
            <div className="info-card-value">{item.value || 'N/A'}</div>
            {item.sub && <div className="info-card-sub">{item.sub}</div>}
          </div>
        ))}
      </div>

      {c.gdpGrowth && c.gdpGrowth.length > 0 && (
        <div className="subsection">
          <h3>Croissance du PIB (5 dernières années)</h3>
          <div className="mini-bar-container" style={{ height: 80, alignItems: 'flex-end', gap: 12, padding: '0 0 20px', display: 'flex' }}>
            {(() => {
              const maxVal = Math.max(...c.gdpGrowth!.map(d => Math.abs(d.value)));
              return c.gdpGrowth!.map((d, i) => {
                const height = maxVal > 0 ? (Math.abs(d.value) / maxVal) * 60 : 0;
                const color = d.value >= 0 ? 'var(--gold)' : 'var(--red)';
                return (
                  <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                    <span style={{ fontSize: '0.65rem', color: 'var(--text)', fontWeight: 500 }}>{d.value}%</span>
                    <div style={{ width: 32, height, background: color, borderRadius: 0 }} />
                    <span style={{ fontSize: '0.55rem', color: 'var(--text-faint)' }}>{d.year}</span>
                  </div>
                );
              });
            })()}
          </div>
        </div>
      )}
    </>
  );
}
