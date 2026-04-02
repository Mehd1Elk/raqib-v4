'use client';

import { EU_INDUSTRIES } from './minerals-data';

export function MineralsIndustries() {
  return (
    <div style={{ padding: '1.5rem 0' }}>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--gold-light)', marginBottom: '0.5rem' }}>Industries Européennes</div>
      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
        Demande en minéraux critiques par industrie EU — risque d&apos;approvisionnement et fournisseurs corridor.
      </div>
      <div className="info-grid">
        {EU_INDUSTRIES.map((ind, i) => {
          const riskColor = ind.supplyRisk >= 9 ? 'var(--red)' : ind.supplyRisk >= 7 ? 'var(--orange)' : ind.supplyRisk >= 5 ? 'var(--gold)' : 'var(--green)';
          return (
            <div key={i} className="info-card" style={{ borderLeft: `3px solid ${ind.color}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <div className="info-card-label" style={{ marginBottom: 0, fontSize: '0.75rem' }}>{ind.name}</div>
                <span style={{ fontSize: '0.7rem', color: 'var(--green)', fontWeight: 600 }}>{ind.growth}</span>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.2rem', marginBottom: '0.75rem' }}>
                {ind.minerals.map((m, j) => <span key={j} className="tag">{m}</span>)}
              </div>
              {[
                { label: 'Demande 2030', value: ind.demand2030 },
                { label: 'OEM Clés', value: ind.euCompanies.slice(0, 4).join(', ') },
                { label: 'Impact CRMA', value: ind.crmaImpact },
                { label: 'Fournisseurs Corridor', value: ind.corridorSuppliers },
              ].map((row, j) => (
                <div key={j} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.3rem 0', borderBottom: '1px solid var(--border)', fontSize: '0.75rem' }}>
                  <span style={{ color: 'var(--text-faint)' }}>{row.label}</span>
                  <span style={{ color: 'var(--text)', textAlign: 'right', maxWidth: '60%' }}>{row.value}</span>
                </div>
              ))}
              <div style={{ marginTop: '0.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', marginBottom: '4px' }}>
                  <span style={{ color: 'var(--text-faint)' }}>Risque Approvisionnement</span>
                  <span style={{ color: riskColor, fontWeight: 700 }}>{ind.supplyRisk}/10</span>
                </div>
                <div className="progress-bar"><div className="progress-bar-fill" style={{ width: `${ind.supplyRisk * 10}%`, background: riskColor }} /></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
