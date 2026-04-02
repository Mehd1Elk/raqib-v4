'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { ALL_COUNTRIES, COMPARISON_INDICATORS } from '../../lib/corridor/data';
import { FlagIcon } from './FlagIcon';

export function CountryComparator() {
  const [selected, setSelected] = useState<[string, string, string]>(['', '', '']);

  const countries = useMemo(() => {
    return selected.map(id => ALL_COUNTRIES.find(c => c.id === id)).filter(Boolean);
  }, [selected]);

  function updateSelect(index: number, value: string) {
    const next = [...selected] as [string, string, string];
    next[index] = value;
    setSelected(next);
  }

  return (
    <>
      <header className="corridor-header">
        <div className="header-top">
          <Link href="/corridor" className="header-logo">
            RAQIB <span>Corridor Intelligence</span>
          </Link>
          <div className="eigen-badges">
            <span className="eigen-badge">Comparateur</span>
          </div>
        </div>
      </header>

      <div className="corridor-main-content">
        <div className="container">
          <Link href="/corridor" className="back-btn" style={{ marginTop: '1rem', display: 'inline-flex' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            Retour au dashboard
          </Link>

          <div className="comparator-section">
            <div className="comparator-header">Comparateur de Pays</div>
            <div className="comparator-selectors">
              {[0, 1, 2].map(i => (
                <select
                  key={i}
                  className="comparator-select"
                  value={selected[i]}
                  onChange={(e) => updateSelect(i, e.target.value)}
                >
                  <option value="">Sélectionner un pays</option>
                  {ALL_COUNTRIES.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              ))}
            </div>

            {countries.length >= 2 ? (
              <table className="comparator-table">
                <thead>
                  <tr>
                    <th>Indicateur</th>
                    {countries.map(c => (
                      <th key={c!.id}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                          <FlagIcon code={c!.id} size={20} /> {c!.name}
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON_INDICATORS.map((ind, i) => (
                    <tr key={i}>
                      <td style={{ fontWeight: 500, color: 'var(--text)' }}>{ind.label}</td>
                      {countries.map(c => (
                        <td key={c!.id}>{ind.extract(c!) || 'N/A'}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p style={{ color: 'var(--text-faint)', fontSize: '0.8rem' }}>
                Sélectionnez au moins 2 pays pour comparer.
              </p>
            )}
          </div>

          <div style={{ textAlign: 'center', margin: '3rem 0' }}>
            <Link href="/corridor" className="export-btn">
              Retour au dashboard
            </Link>
          </div>
        </div>
      </div>

      <footer className="corridor-footer">
        <div className="footer-text">
          RAQIB <span className="gold">Corridor Intelligence</span> · Module MADEN · Eigen SAS · 2026
        </div>
      </footer>
    </>
  );
}
