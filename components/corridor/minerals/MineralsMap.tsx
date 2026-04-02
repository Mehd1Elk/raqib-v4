'use client';

import { CORRIDOR_COUNTRIES } from './minerals-data';
import { FlagIcon } from '../FlagIcon';

export default function MineralsMap() {
  function getRiskColor(r: number) { return r <= 2 ? '#5A8A3A' : r <= 4 ? '#C9A96E' : r <= 7 ? '#E07850' : '#A13544'; }

  return (
    <div style={{ padding: '1.5rem 0' }}>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--gold-light)', marginBottom: '0.5rem' }}>Carte des Sites Miniers</div>
      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
        22 pays du corridor avec positionnement géographique et niveau de risque.
      </div>

      {/* Stats bar */}
      <div className="kpi-row" style={{ marginBottom: '1.5rem' }}>
        {[
          { value: '22', label: 'Pays' },
          { value: '34+', label: 'Minéraux' },
          { value: '€32B+', label: 'Trade EU/an' },
          { value: '~30%', label: 'Part mondiale' },
          { value: '<5%', label: 'Valeur capturée' },
        ].map((s, i) => (
          <div key={i} className="kpi">
            <div className="kpi-value">{s.value}</div>
            <div className="kpi-label">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', fontSize: '0.7rem' }}>
        {[
          { color: '#5A8A3A', label: 'Faible (1-2)' },
          { color: '#C9A96E', label: 'Modéré (3-4)' },
          { color: '#E07850', label: 'Élevé (5-7)' },
          { color: '#A13544', label: 'Critique (8-10)' },
        ].map((l, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <div style={{ width: 8, height: 8, borderRadius: 0, background: l.color }} />
            <span style={{ color: 'var(--text-faint)' }}>{l.label}</span>
          </div>
        ))}
      </div>

      {/* Country list as table */}
      <table className="data-table">
        <thead>
          <tr>
            <th>Pays</th>
            <th>Risque</th>
            <th>Diversité</th>
            <th>Trade EU</th>
            <th>Minéraux principaux</th>
          </tr>
        </thead>
        <tbody>
          {[...CORRIDOR_COUNTRIES].sort((a, b) => a.risk - b.risk).map(c => (
            <tr key={c.id}>
              <td className="col-name" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <FlagIcon code={c.id} size={20} /> {c.name}
              </td>
              <td>
                <span style={{ color: getRiskColor(c.risk), fontWeight: 600 }}>{c.risk}/10</span>
              </td>
              <td>{c.mineralDiversity}/10</td>
              <td className="col-gold">{c.tradeEU}</td>
              <td style={{ fontSize: '0.72rem' }}>{c.minerals.slice(0, 4).join(', ')}{c.minerals.length > 4 ? '...' : ''}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
