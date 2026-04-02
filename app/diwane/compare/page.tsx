// @ts-nocheck
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ALL_COUNTRIES, COMPARISON_INDICATORS } from '../../../lib/diwane/data';
import { FlagIcon } from '../../../components/corridor/FlagIcon';
import type { DiwaneCountry } from '../../../lib/diwane/types';

function getIndicatorValue(country: DiwaneCountry, key: string): string {
  switch (key) {
    case 'marketSize': return country.artMarket.marketSize || 'N/A';
    case 'globalRank': return country.artMarket.globalRank ? `#${country.artMarket.globalRank}` : 'N/A';
    case 'galleryCount': return country.artMarket.galleryCount?.toString() || 'N/A';
    case 'museumCount': return country.artMarket.museumCount?.toString() || 'N/A';
    case 'artFairsCount': return country.artMarket.artFairsCount?.toString() || 'N/A';
    case 'auctionVolume': return country.artMarket.auctionVolume || 'N/A';
    case 'publicFunding': return country.artMarket.publicFunding || 'N/A';
    case 'taxIncentives': return country.artMarket.taxIncentives || 'N/A';
    case 'unescoSites': return country.culturalHeritage?.unescoSites?.toString() || 'N/A';
    case 'topArtist': return country.topArtists?.[0]?.name || 'N/A';
    default: return 'N/A';
  }
}

export default function DiwaneComparePage() {
  const [ids, setIds] = useState<[string, string, string]>(['MA', 'NG', 'FR']);

  const countries = ids.map(id => ALL_COUNTRIES.find(c => c.id === id)).filter(Boolean) as DiwaneCountry[];

  return (
    <div className="diwane-main-content">
      <div className="comparator-container">
        <h1 className="comparator-title">Comparateur Marchés Art</h1>

        <div className="comparator-selectors">
          {[0, 1, 2].map(i => (
            <select
              key={i}
              className="comparator-select"
              value={ids[i]}
              onChange={e => {
                const next = [...ids] as [string, string, string];
                next[i] = e.target.value;
                setIds(next);
              }}
            >
              {ALL_COUNTRIES.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          ))}
        </div>

        <table className="comparator-table">
          <thead>
            <tr>
              <th>Indicateur</th>
              {countries.map(c => (
                <th key={c.id}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <FlagIcon code={c.id} size={24} />
                    <span>{c.name}</span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {COMPARISON_INDICATORS.map(ind => (
              <tr key={ind.key}>
                <td style={{ color: 'var(--orange)', fontWeight: 500 }}>{ind.label}</td>
                {countries.map(c => (
                  <td key={c.id}>{getIndicatorValue(c, ind.key)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        <div className="link-row" style={{ marginTop: '2rem' }}>
          <Link href="/diwane" className="link-button">Retour DIWANE</Link>
          <Link href="/" className="link-button">Retour RAQIB</Link>
        </div>
      </div>

      <footer className="diwane-footer">
        <p>RAQIB <span className="highlight">DIWANE</span> Art Market Intelligence · Eigen SAS · 2026</p>
      </footer>
    </div>
  );
}
