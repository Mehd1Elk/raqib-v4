// @ts-nocheck
'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { GLOBAL_DATA, ALL_COUNTRIES, AFRICA_COUNTRIES, EU_COUNTRIES_LIST } from '../../lib/diwane/data';
import { CountryArtCard } from './CountryArtCard';
import { DiwaneSearch } from './DiwaneSearch';
import { ArtistCard } from './ArtistCard';
import { useRouter } from 'next/navigation';

type FilterType = 'all' | 'africa' | 'eu';

export function DiwaneDashboard() {
  const router = useRouter();
  const [filter, setFilter] = useState<FilterType>('all');

  const stats = GLOBAL_DATA.stats;
  const alerts = GLOBAL_DATA.alerts;
  const topAuctions = GLOBAL_DATA.topAuctions;
  const marketTrends = GLOBAL_DATA.marketTrends;

  const galleryCount = useMemo(() =>
    ALL_COUNTRIES.reduce((s, c) => s + (c.galleries?.length || 0), 0), []
  );

  const museumCount = useMemo(() =>
    ALL_COUNTRIES.reduce((s, c) => s + (c.museums?.length || 0), 0), []
  );

  const artistCount = useMemo(() =>
    ALL_COUNTRIES.reduce((s, c) => s + (c.artists?.length || 0), 0), []
  );

  const africaFiltered = useMemo(() => {
    if (filter === 'eu') return [];
    return AFRICA_COUNTRIES;
  }, [filter]);

  const euFiltered = useMemo(() => {
    if (filter === 'africa') return [];
    return EU_COUNTRIES_LIST;
  }, [filter]);

  return (
    <>
      {/* Header */}
      <header className="diwane-header">
        <div className="header-top">
          <Link href="/diwane" className="header-logo" onClick={() => setFilter('all')}>
            <span className="arabic">&#1583;&#1610;&#1608;&#1575;&#1606;</span> DIWANE <span>Art Market Intelligence</span>
          </Link>
          <div className="eigen-badges">
            <span className="eigen-badge">BURHAN</span>
            <span className="eigen-badge">NOOS</span>
            <span className="eigen-badge">&#198;LYA</span>
            <span className="eigen-badge">MYN&#949;</span>
            <span className="eigen-badge">YrKnown</span>
            <span className="eigen-badge">RAQIB</span>
            <span className="eigen-badge">MIZAN</span>
          </div>
        </div>
        <div className="header-nav">
          <DiwaneSearch onSelectCountry={(id) => router.push(`/diwane/${id}`)} />
          <div className="filter-tabs">
            {([
              { key: 'all', label: 'Tous' },
              { key: 'africa', label: 'Afrique' },
              { key: 'eu', label: 'Union Européenne' },
            ] as { key: FilterType; label: string }[]).map(f => (
              <button
                key={f.key}
                className={`filter-tab ${filter === f.key ? 'active' : ''}`}
                onClick={() => setFilter(f.key)}
              >
                {f.label}
              </button>
            ))}
          </div>
          <div className="header-stats">
            <strong>{ALL_COUNTRIES.length}</strong> pays &middot; <strong>{artistCount}</strong> artistes &middot; <strong>{galleryCount}</strong> galeries &middot; <strong>{museumCount}</strong> mus&eacute;es
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="diwane-main-content">
        {/* Hero */}
        <div className="diwane-hero">
          <h1><span className="hero-arabic">&#1583;&#1610;&#1608;&#1575;&#1606;</span> DIWANE</h1>
          <p>
            Intelligence du march&eacute; de l&apos;art sur {ALL_COUNTRIES.length} pays &mdash; Afrique et Europe.
            Artistes, galeries, mus&eacute;es, foires, ench&egrave;res, collectionneurs, finance et r&eacute;glementation.
          </p>
        </div>

        {/* Macro Stats */}
        <div className="macro-stats-grid">
          <div className="macro-stat">
            <div className="macro-stat-value">{stats.totalCountries}</div>
            <div className="macro-stat-label">Pays</div>
          </div>
          <div className="macro-stat">
            <div className="macro-stat-value">{stats.totalArtists}</div>
            <div className="macro-stat-label">Artistes r&eacute;f&eacute;renc&eacute;s</div>
          </div>
          <div className="macro-stat">
            <div className="macro-stat-value">{stats.totalGalleries}</div>
            <div className="macro-stat-label">Galeries</div>
          </div>
          <div className="macro-stat">
            <div className="macro-stat-value">{stats.totalMuseums}</div>
            <div className="macro-stat-label">Mus&eacute;es</div>
          </div>
          <div className="macro-stat">
            <div className="macro-stat-value">{stats.globalArtMarket}</div>
            <div className="macro-stat-label">March&eacute; mondial</div>
          </div>
          <div className="macro-stat">
            <div className="macro-stat-value">{stats.africanArtMarket}</div>
            <div className="macro-stat-label">March&eacute; art africain</div>
          </div>
        </div>

        {/* Market Trends */}
        {marketTrends && marketTrends.length > 0 && (
          <div className="diwane-section">
            <div className="section-title">Tendances march&eacute;</div>
            <div className="macro-stats-grid">
              {marketTrends.map((t, i) => (
                <div key={i} className="macro-stat">
                  <div className="macro-stat-value" style={{ fontSize: '1.1rem' }}>{t.value}</div>
                  <div className="macro-stat-label">{t.label}</div>
                  <div style={{ color: t.trend.includes('\u2191') ? 'var(--hermes-green, #5A8A3A)' : 'var(--text-muted)', fontSize: '0.7rem', marginTop: '0.25rem' }}>{t.trend}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Ticker */}
        <div className="ticker-container">
          <div className="ticker-track">
            {[...alerts, ...alerts].map((a, i) => (
              <span key={i} className={`ticker-item ${a.level}`}>
                &#9679; {a.text}
              </span>
            ))}
          </div>
        </div>

        {/* Top Auctions */}
        <div className="diwane-section">
          <div className="section-title">Records d&apos;ench&egrave;res</div>
          <table className="data-table">
            <thead>
              <tr>
                <th>Artiste</th>
                <th>Oeuvre</th>
                <th>Prix</th>
                <th>Maison</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {topAuctions.map((a, i) => (
                <tr key={i}>
                  <td className="highlight">{a.artist}</td>
                  <td>{a.title}</td>
                  <td style={{ color: 'var(--camel)', fontWeight: 600 }}>{a.price}</td>
                  <td>{a.house}</td>
                  <td>{a.date || ''}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Featured Artists */}
        <div className="diwane-section">
          <div className="section-title">Artistes phares</div>
          <div className="countries-grid">
            {ALL_COUNTRIES.flatMap(c => (c.artists || []).slice(0, 1).map(a => ({ ...a, countryName: c.name }))).slice(0, 12).map((a, i) => (
              <ArtistCard key={i} artist={a} countryName={a.countryName} />
            ))}
          </div>
        </div>

        {/* Africa Countries */}
        {africaFiltered.length > 0 && (
          <div className="diwane-section">
            <div className="section-title">Afrique &mdash; {africaFiltered.length} march&eacute;s</div>
            <div className="countries-grid">
              {africaFiltered.map(c => (
                <CountryArtCard key={c.id} country={c} />
              ))}
            </div>
          </div>
        )}

        {/* EU Countries */}
        {euFiltered.length > 0 && (
          <div className="diwane-section">
            <div className="section-title">Union Europ&eacute;enne &mdash; {euFiltered.length} march&eacute;s</div>
            <div className="countries-grid">
              {euFiltered.map(c => (
                <CountryArtCard key={c.id} country={c} />
              ))}
            </div>
          </div>
        )}

        {/* Links */}
        <div className="link-row">
          <Link href="/diwane/compare" className="link-button">Comparateur march&eacute;s art</Link>
          <Link href="/diwane/expertise" className="link-button">NOOS de l&apos;Art</Link>
          <Link href="/" className="link-button">Retour RAQIB</Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="diwane-footer">
        <p>RAQIB <span className="highlight">DIWANE</span> Art Market Intelligence &middot; Eigen SAS &middot; 2026</p>
      </footer>
    </>
  );
}
