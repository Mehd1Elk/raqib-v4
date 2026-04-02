'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { GLOBAL_DATA, ALL_COUNTRIES, AFRICA_COUNTRIES, EU_COUNTRIES_LIST } from '../../lib/corridor/data';
import { CountryCard } from './CountryCard';
import { AlertTicker } from './AlertTicker';
import { MineralTable } from './MineralTable';
import { CorridorSearch } from './CorridorSearch';
import { useRouter } from 'next/navigation';

type FilterType = 'all' | 'africa' | 'eu' | 'mineral' | 'industry';

export function CorridorDashboard() {
  const router = useRouter();
  const [filter, setFilter] = useState<FilterType>('all');
  const [mineralFilter, setMineralFilter] = useState<string | null>(null);

  const stats = GLOBAL_DATA.corridorStats;

  const entCount = useMemo(() =>
    ALL_COUNTRIES.reduce((s, c) => s + (c.enterprises?.length || 0) + (c.keyEnterprisesForCorridor?.length || 0), 0),
    []
  );

  const uniCount = useMemo(() =>
    ALL_COUNTRIES.reduce((s, c) => s + (c.universities?.length || 0), 0),
    []
  );

  const africaFiltered = useMemo(() => {
    if (mineralFilter) {
      return AFRICA_COUNTRIES.filter(c =>
        c.minerals?.some(m => m.name.toLowerCase().includes(mineralFilter.toLowerCase()))
      );
    }
    if (filter === 'eu') return [];
    if (filter === 'mineral') {
      return AFRICA_COUNTRIES.filter(c => c.minerals && c.minerals.length > 0);
    }
    return AFRICA_COUNTRIES;
  }, [filter, mineralFilter]);

  const euFiltered = useMemo(() => {
    if (mineralFilter) {
      return EU_COUNTRIES_LIST.filter(c =>
        c.criticalMineralsDemand && c.criticalMineralsDemand.length > 0
      );
    }
    if (filter === 'africa') return [];
    return EU_COUNTRIES_LIST;
  }, [filter, mineralFilter]);

  function handleMineralClick(name: string) {
    setMineralFilter(name);
    setFilter('mineral');
  }

  function handleFilterChange(f: FilterType) {
    setFilter(f);
    setMineralFilter(null);
  }

  return (
    <>
      {/* Header */}
      <header className="corridor-header">
        <div className="header-top">
          <Link href="/corridor" className="header-logo" onClick={() => { setFilter('all'); setMineralFilter(null); }}>
            RAQIB <span>Corridor Intelligence</span>
          </Link>
          <div className="eigen-badges">
            <span className="eigen-badge">Module MADEN</span>
            <span className="eigen-badge">Eigen SAS</span>
            <span className="eigen-badge">2026</span>
          </div>
        </div>
        <div className="header-nav">
          <CorridorSearch onSelectCountry={(id) => router.push(`/corridor/${id}`)} />
          <div className="filter-tabs">
            {([
              { key: 'all', label: 'Tous' },
              { key: 'africa', label: 'Afrique' },
              { key: 'eu', label: 'Union Européenne' },
              { key: 'mineral', label: 'Minéraux critiques' },
            ] as { key: FilterType; label: string }[]).map(f => (
              <button
                key={f.key}
                className={`filter-tab ${filter === f.key ? 'active' : ''}`}
                onClick={() => handleFilterChange(f.key)}
              >
                {f.label}
              </button>
            ))}
          </div>
          <div className="header-stats">
            <strong>{ALL_COUNTRIES.length}</strong> pays · <strong>{entCount}</strong> entreprises · <strong>{uniCount}</strong> universités
          </div>
        </div>
      </header>

      <div className="corridor-main-content">
        <div className="container">
          <div className="dashboard">
            {/* Hero */}
            <div className="dashboard-hero">
              <h1>Corridor Intelligence</h1>
              <p>
                Plateforme d&apos;intelligence stratégique couvrant {stats.totalCountries} pays du corridor EU-Afrique.
                Minéraux critiques, entreprises, dirigeants, universités et scoring RAQIB.
              </p>
            </div>

            {/* Macro Stats */}
            <div className="macro-stats">
              <div className="macro-stat">
                <div className="macro-stat-label">Pays couverts</div>
                <div className="macro-stat-value">{ALL_COUNTRIES.length}</div>
                <div className="macro-stat-sub">{AFRICA_COUNTRIES.length} Afrique · {EU_COUNTRIES_LIST.length} UE</div>
              </div>
              <div className="macro-stat">
                <div className="macro-stat-label">Population corridor</div>
                <div className="macro-stat-value">{stats.totalPopulation}</div>
                <div className="macro-stat-sub">EU + Afrique corridor</div>
              </div>
              <div className="macro-stat">
                <div className="macro-stat-label">PIB cumulé corridor</div>
                <div className="macro-stat-value">{stats.corridorGDP}</div>
                <div className="macro-stat-sub">EU + Afrique 2024</div>
              </div>
              <div className="macro-stat">
                <div className="macro-stat-label">Commerce EU-Afrique</div>
                <div className="macro-stat-value">{stats.tradeEUAfrica}</div>
                <div className="macro-stat-sub">Bilatéral 2024</div>
              </div>
              <div className="macro-stat">
                <div className="macro-stat-label">IDE entrants Afrique</div>
                <div className="macro-stat-value">{stats.fdiInward}</div>
                <div className="macro-stat-sub">Flux 2024</div>
              </div>
              <div className="macro-stat">
                <div className="macro-stat-label">Minéraux critiques</div>
                <div className="macro-stat-value">10</div>
                <div className="macro-stat-sub">Trackés en temps réel</div>
              </div>
            </div>

            {/* Ticker */}
            <AlertTicker alerts={GLOBAL_DATA.alerts} />

            {/* Top Minerals */}
            <div className="section-header">
              <h2>Minéraux Critiques — Top 10 Corridor</h2>
            </div>
            <MineralTable minerals={GLOBAL_DATA.topMinerals} onMineralClick={handleMineralClick} />

            {/* Africa Countries */}
            {africaFiltered.length > 0 && (
              <>
                <div className="section-header">
                  <h2>Corridor Afrique</h2>
                  <span className="section-count">
                    {mineralFilter ? `${africaFiltered.length} producteurs de ${mineralFilter}` : `${africaFiltered.length} pays`}
                  </span>
                </div>
                <div className="countries-grid">
                  {africaFiltered.map(c => (
                    <CountryCard key={c.id} country={c} />
                  ))}
                </div>
              </>
            )}

            {/* EU Countries */}
            {euFiltered.length > 0 && (
              <>
                <div className="section-header">
                  <h2>Union Européenne</h2>
                  <span className="section-count">{euFiltered.length} pays</span>
                </div>
                <div className="countries-grid">
                  {euFiltered.map(c => (
                    <CountryCard key={c.id} country={c} />
                  ))}
                </div>
              </>
            )}

            {/* Comparator Link */}
            <div style={{ textAlign: 'center', margin: '3rem 0' }}>
              <Link href="/corridor/compare" className="export-btn" style={{ fontSize: '0.8rem', padding: '0.6rem 1.5rem' }}>
                Comparateur de pays
              </Link>
              <Link href="/" className="export-btn" style={{ fontSize: '0.8rem', padding: '0.6rem 1.5rem', marginLeft: '1rem' }}>
                Retour RAQIB
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="corridor-footer">
        <div className="footer-text">
          RAQIB <span className="gold">Corridor Intelligence</span> · Module MADEN · Eigen SAS · 2026
        </div>
      </footer>
    </>
  );
}
