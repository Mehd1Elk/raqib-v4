'use client';

import { useState, useMemo } from 'react';
import { CORRIDOR_COUNTRIES } from './minerals-data';
import { FlagIcon } from '../FlagIcon';

export function MineralsCountries() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const sorted = useMemo(() => [...CORRIDOR_COUNTRIES].sort((a, b) => b.mineralDiversity - a.mineralDiversity), []);

  function getRiskClass(r: number) { return r <= 2 ? 'low' : r <= 4 ? 'medium' : 'high'; }
  function getRiskLabel(r: number) { return r <= 2 ? 'Faible' : r <= 4 ? 'Modéré' : r <= 7 ? 'Élevé' : 'Critique'; }

  return (
    <div style={{ padding: '1.5rem 0' }}>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--gold-light)', marginBottom: '0.5rem' }}>22 Pays du Corridor</div>
      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
        Profils complets des pays du corridor EU-Afrique, triés par diversité minérale.
      </div>

      <div className="countries-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
        {sorted.map(c => (
          <div key={c.id}>
            <div className="country-card" onClick={() => setExpandedId(expandedId === c.id ? null : c.id)}>
              <div className="country-card-header">
                <FlagIcon code={c.id} size={40} />
                <div>
                  <div className="country-card-name">{c.name}</div>
                  <span className={`risk-score ${getRiskClass(c.risk)}`}>
                    <span className={`risk-dot ${getRiskClass(c.risk)}`} />
                    {getRiskLabel(c.risk)} {c.risk}/10
                  </span>
                </div>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem', margin: '0.5rem 0' }}>
                {c.minerals.slice(0, 6).map((m, j) => <span key={j} className="tag">{m}</span>)}
                {c.minerals.length > 6 && <span className="tag">+{c.minerals.length - 6}</span>}
              </div>
              <div className="country-card-stats" style={{ gridTemplateColumns: '1fr 1fr' }}>
                <div className="country-card-stat"><div className="country-card-stat-label">Production</div><div className="country-card-stat-value" style={{ fontSize: '0.72rem' }}>{c.production.substring(0, 40)}{c.production.length > 40 ? '...' : ''}</div></div>
                <div className="country-card-stat"><div className="country-card-stat-label">Trade EU</div><div className="country-card-stat-value">{c.tradeEU}</div></div>
              </div>
            </div>
            {expandedId === c.id && (
              <div className="info-grid" style={{ marginTop: '0.5rem', marginBottom: '1rem' }}>
                <div className="info-card"><div className="info-card-label">Production</div><div className="info-card-value" style={{ fontSize: '0.82rem' }}>{c.production}</div></div>
                <div className="info-card"><div className="info-card-label">Réserves</div><div className="info-card-value" style={{ fontSize: '0.82rem' }}>{c.reserves}</div></div>
                <div className="info-card"><div className="info-card-label">Acteurs Clés</div><div className="info-card-value" style={{ fontSize: '0.82rem' }}>{c.keyPlayer}</div></div>
                <div className="info-card"><div className="info-card-label">Pertinence CRMA</div><div className="info-card-value" style={{ fontSize: '0.82rem' }}>{c.crmaRelevance}</div></div>
                <div className="info-card"><div className="info-card-label">Opportunités</div><div className="info-card-value" style={{ fontSize: '0.82rem' }}>{c.opportunity}</div></div>
                <div className="info-card"><div className="info-card-label">Investissement Chinois</div><div className="info-card-value" style={{ fontSize: '0.82rem' }}>{c.chineseInv}</div></div>
                <div className="info-card"><div className="info-card-label">Investissement Occidental</div><div className="info-card-value" style={{ fontSize: '0.82rem' }}>{c.westernInv}</div></div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
