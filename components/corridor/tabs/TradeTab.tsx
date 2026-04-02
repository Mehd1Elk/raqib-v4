'use client';

import type { Country } from '../../../lib/corridor/types';

interface Props { country: Country }

export function TradeTab({ country: c }: Props) {
  if (!c.trade) return <p style={{ color: 'var(--text-muted)' }}>Données commerciales non disponibles.</p>;
  const t = c.trade;

  return (
    <>
      {t.topExports && (
        <div className="subsection"><h3>Top Exports</h3>
          <table className="data-table">
            <thead><tr><th>Produit</th><th>Valeur</th><th>Destination</th></tr></thead>
            <tbody>{t.topExports.map((e, i) => <tr key={i}><td className="col-name">{e.product}</td><td className="col-gold">{e.value}</td><td>{e.destination}</td></tr>)}</tbody>
          </table>
        </div>
      )}

      {t.topImports && (
        <div className="subsection"><h3>Top Imports</h3>
          <table className="data-table">
            <thead><tr><th>Produit</th><th>Valeur</th><th>Origine</th></tr></thead>
            <tbody>{t.topImports.map((im, i) => <tr key={i}><td className="col-name">{im.product}</td><td className="col-gold">{im.value}</td><td>{im.origin}</td></tr>)}</tbody>
          </table>
        </div>
      )}

      <div className="kpi-row">
        {t.tradeBalance && <div className="kpi"><div className="kpi-label">Balance commerciale</div><div className="kpi-value">{t.tradeBalance}</div></div>}
        {t.fdiInward?.stock && <div className="kpi"><div className="kpi-label">IDE entrants (stock)</div><div className="kpi-value">{t.fdiInward.stock}</div></div>}
        {t.fdiInward?.flow && <div className="kpi"><div className="kpi-label">IDE entrants (flux)</div><div className="kpi-value">{t.fdiInward.flow}</div></div>}
        {t.fdiOutward && <div className="kpi"><div className="kpi-label">IDE sortants</div><div className="kpi-value">{t.fdiOutward}</div></div>}
      </div>

      {t.fdiInward?.topInvestors && (
        <div style={{ margin: '1rem 0' }}>
          <span style={{ fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-faint)' }}>Top 5 pays investisseurs</span>
          <div style={{ marginTop: '0.3rem' }}>
            {t.fdiInward.topInvestors.map((inv, i) => <span key={i} className="tag" style={{ margin: '0.15rem' }}>{inv}</span>)}
          </div>
        </div>
      )}

      <div className="info-grid">
        {[
          { key: 'tradeAgreements', label: 'Accords commerciaux' },
          { key: 'freeZones', label: 'Zones franches & incitations' },
          { key: 'profitRepatriation', label: 'Rapatriement des profits' },
          { key: 'bit', label: "Traités bilatéraux d'investissement" },
        ].map((f, i) => {
          const val = t[f.key as keyof typeof t];
          if (!val) return null;
          const display = Array.isArray(val) ? val.join(', ') : String(val);
          return (
            <div key={i} className="info-card">
              <div className="info-card-label">{f.label}</div>
              <div className="info-card-value" style={{ fontSize: '0.82rem' }}>{display}</div>
            </div>
          );
        })}

        {t.taxRegime && (
          <div className="info-card">
            <div className="info-card-label">Régime fiscal</div>
            <div className="info-card-value" style={{ fontSize: '0.82rem' }}>IS : {t.taxRegime.is || 'N/A'} · TVA : {t.taxRegime.tva || 'N/A'}</div>
            {t.taxRegime.conventions && <div className="info-card-sub">{t.taxRegime.conventions}</div>}
          </div>
        )}
      </div>
    </>
  );
}
