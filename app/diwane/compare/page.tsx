// @ts-nocheck
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ALL_COUNTRIES } from '../../../lib/diwane/data';
import { FlagIcon } from '../../../components/corridor/FlagIcon';

function getIndicatorValue(country: any, key: string): string {
  switch (key) {
    case 'marketSize': return country.marketSize || 'N/A';
    case 'artists': return country.artists?.length?.toString() || '0';
    case 'galleries': return country.galleries?.length?.toString() || '0';
    case 'museums': return country.museums?.length?.toString() || '0';
    case 'fairs': return country.artFairs?.length?.toString() || '0';
    case 'auctionHouses': return country.auctionHouses?.length?.toString() || '0';
    case 'topArtist': return country.artists?.[0]?.name || 'N/A';
    case 'topArtistRecord': return country.artists?.[0]?.auctionRecord || 'N/A';
    case 'collectors': return country.collectors?.length?.toString() || '0';
    case 'artFinance': return country.artFinance?.length?.toString() || '0';
    case 'regulation': return country.regulation ? 'Oui' : 'N/A';
    case 'vatRate': return country.regulation?.vatRate || 'N/A';
    case 'droitDeSuite': return country.regulation?.droitDeSuite || 'N/A';
    default: return 'N/A';
  }
}

const COMPARE_INDICATORS = [
  { key: 'marketSize', label: 'Taille du marché' },
  { key: 'artists', label: 'Artistes référencés' },
  { key: 'galleries', label: 'Galeries' },
  { key: 'museums', label: 'Musées' },
  { key: 'fairs', label: 'Foires d\'art' },
  { key: 'auctionHouses', label: 'Maisons d\'enchères' },
  { key: 'topArtist', label: 'Top artiste' },
  { key: 'topArtistRecord', label: 'Record enchères' },
  { key: 'collectors', label: 'Collectionneurs' },
  { key: 'artFinance', label: 'Art Finance' },
  { key: 'vatRate', label: 'TVA art' },
  { key: 'droitDeSuite', label: 'Droit de suite' },
];

export default function DiwaneComparePage() {
  const [ids, setIds] = useState<[string, string, string]>(['MA', 'NG', 'FR']);

  const countries = ids.map(id => ALL_COUNTRIES.find(c => c.id === id)).filter(Boolean);

  return (
    <div className="diwane-main-content">
      <div className="comparator-container">
        <h1 className="comparator-title">Comparateur March&eacute;s Art</h1>

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
            {COMPARE_INDICATORS.map(ind => (
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
        <p>RAQIB <span className="highlight">DIWANE</span> Art Market Intelligence &middot; Eigen SAS &middot; 2026</p>
      </footer>
    </div>
  );
}
