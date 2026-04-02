// @ts-nocheck
'use client';

import { useParams } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';
import { ALL_COUNTRIES, COUNTRY_TABS, EU_TABS } from '../../../lib/diwane/data';
import { getRecommendationClass, getRecommendationLabel, getMarketRankLabel, getMarketRankClass } from '../../../lib/diwane/utils';
import { FlagIcon } from '../../../components/corridor/FlagIcon';

export default function CountryArtDetailPage() {
  const params = useParams();
  const countryId = (params.countryId as string).toUpperCase();
  const country = ALL_COUNTRIES.find(c => c.id === countryId);
  const [activeTab, setActiveTab] = useState('overview');

  if (!country) {
    return (
      <div className="diwane-main-content" style={{ padding: '4rem 2rem', textAlign: 'center' }}>
        <h1 style={{ color: 'var(--orange)', fontFamily: 'var(--font-display)', fontSize: '2rem' }}>Pays non trouvé</h1>
        <Link href="/diwane" className="link-button" style={{ marginTop: '2rem', display: 'inline-block' }}>Retour DIWANE</Link>
      </div>
    );
  }

  const isEU = country.region === 'eu';
  const tabs = isEU ? EU_TABS : COUNTRY_TABS;
  const reco = country.recommendation || 'Observer';
  const recoClass = getRecommendationClass(reco);
  const recoLabel = getRecommendationLabel(reco);

  return (
    <div className="diwane-main-content">
      {/* Header */}
      <div className="country-header">
        <div className="country-header-top">
          <FlagIcon code={country.id} size={64} />
          <div>
            <h1>
              <span>{country.name}</span>
              {country.nameAr && <span style={{ marginLeft: '0.5rem', fontSize: '1.2rem', color: 'var(--camel)' }}>{country.nameAr}</span>}
            </h1>
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', marginTop: '0.25rem' }}>
              <span className={`reco-badge ${recoClass}`}>{recoLabel}</span>
              <span className={`rank-badge ${getMarketRankClass(country.artMarket.globalRank)}`}>
                Rang {getMarketRankLabel(country.artMarket.globalRank)}
              </span>
              {country.region === 'africa' ? <span className="africa-tag">Afrique</span> : <span className="eu-tag">Union Européenne</span>}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="tab-container">
          {tabs.map(t => (
            <button key={t.key} className={`tab-button ${activeTab === t.key ? 'active' : ''}`} onClick={() => setActiveTab(t.key)}>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="diwane-section">
        {activeTab === 'overview' && (
          <>
            <div className="info-grid">
              <div className="info-card">
                <div className="info-card-label">Taille du marché</div>
                <div className="info-card-value">{country.artMarket.marketSize || 'N/A'}</div>
              </div>
              <div className="info-card">
                <div className="info-card-label">Rang mondial</div>
                <div className="info-card-value">#{country.artMarket.globalRank || 'N/A'}</div>
              </div>
              <div className="info-card">
                <div className="info-card-label">Galeries</div>
                <div className="info-card-value">{country.artMarket.galleryCount || 'N/A'}</div>
              </div>
              <div className="info-card">
                <div className="info-card-label">Musées</div>
                <div className="info-card-value">{country.artMarket.museumCount || 'N/A'}</div>
              </div>
              <div className="info-card">
                <div className="info-card-label">Foires d&apos;art</div>
                <div className="info-card-value">{country.artMarket.artFairsCount || 'N/A'}</div>
              </div>
              <div className="info-card">
                <div className="info-card-label">Volume enchères</div>
                <div className="info-card-value">{country.artMarket.auctionVolume || 'N/A'}</div>
              </div>
              <div className="info-card">
                <div className="info-card-label">Population</div>
                <div className="info-card-value">{country.population || 'N/A'}</div>
              </div>
              <div className="info-card">
                <div className="info-card-label">Monnaie</div>
                <div className="info-card-value">{country.currency || 'N/A'}</div>
              </div>
            </div>
            {country.artMarket.publicFunding && (
              <div className="info-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
                <div className="info-card">
                  <div className="info-card-label">Financement public</div>
                  <div className="info-card-value" style={{ fontSize: '1rem' }}>{country.artMarket.publicFunding}</div>
                </div>
                {country.artMarket.taxIncentives && (
                  <div className="info-card">
                    <div className="info-card-label">Incitations fiscales</div>
                    <div className="info-card-value" style={{ fontSize: '1rem' }}>{country.artMarket.taxIncentives}</div>
                  </div>
                )}
                {country.artMarket.exportRegulation && (
                  <div className="info-card">
                    <div className="info-card-label">Régulation export</div>
                    <div className="info-card-value" style={{ fontSize: '1rem' }}>{country.artMarket.exportRegulation}</div>
                  </div>
                )}
              </div>
            )}
          </>
        )}

        {activeTab === 'artists' && (
          <>
            {country.topArtists && country.topArtists.length > 0 ? (
              <div className="countries-grid">
                {country.topArtists.map((a, i) => (
                  <div key={i} className="artist-card">
                    <div className="artist-name">{a.name}</div>
                    <div className="artist-medium">{a.medium}</div>
                    {a.movement && <div className="artist-movement">{a.movement}</div>}
                    {a.auctionRecord && <div className="artist-record">Record: {a.auctionRecord}</div>}
                    {a.auctionHouse && <div style={{ fontSize: '0.65rem', color: 'var(--text-faint)' }}>{a.auctionHouse}</div>}
                    <div style={{ fontSize: '0.65rem', color: 'var(--text-faint)', marginTop: '0.25rem' }}>
                      {a.birthYear}{a.deathYear ? ` — ${a.deathYear}` : ''}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ color: 'var(--text-muted)' }}>Données artistes en cours de collecte.</p>
            )}
          </>
        )}

        {activeTab === 'galleries' && (
          <>
            {country.galleries && country.galleries.length > 0 ? (
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Galerie</th>
                    <th>Ville</th>
                    <th>Fondée</th>
                    <th>Spécialité</th>
                  </tr>
                </thead>
                <tbody>
                  {country.galleries.map((g, i) => (
                    <tr key={i}>
                      <td className="highlight">{g.name}</td>
                      <td>{g.city}</td>
                      <td>{g.founded || '—'}</td>
                      <td>{g.specialty || '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p style={{ color: 'var(--text-muted)' }}>Données galeries en cours de collecte.</p>
            )}
          </>
        )}

        {activeTab === 'museums' && (
          <>
            {country.museums && country.museums.length > 0 ? (
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Musée</th>
                    <th>Ville</th>
                    <th>Type</th>
                    <th>Fondé</th>
                    <th>Visiteurs/an</th>
                  </tr>
                </thead>
                <tbody>
                  {country.museums.map((m, i) => (
                    <tr key={i}>
                      <td className="highlight">{m.name}</td>
                      <td>{m.city}</td>
                      <td>{m.type}</td>
                      <td>{m.founded || '—'}</td>
                      <td>{m.annualVisitors || '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p style={{ color: 'var(--text-muted)' }}>Données musées en cours de collecte.</p>
            )}
          </>
        )}

        {activeTab === 'fairs' && (
          <>
            {country.artFairs && country.artFairs.length > 0 ? (
              <div className="countries-grid">
                {country.artFairs.map((f, i) => (
                  <div key={i} className="info-card">
                    <div className="info-card-value" style={{ fontSize: '1.1rem' }}>{f.name}</div>
                    <div className="info-card-sub">{f.city} · {f.frequency}</div>
                    {f.galleries && <div className="info-card-sub">{f.galleries} galeries</div>}
                    {f.visitors && <div className="info-card-sub">{f.visitors} visiteurs</div>}
                    {f.focus && <div className="info-card-label" style={{ marginTop: '0.5rem' }}>{f.focus}</div>}
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ color: 'var(--text-muted)' }}>Aucune foire d&apos;art répertoriée.</p>
            )}
          </>
        )}

        {activeTab === 'auctions' && (
          <>
            {country.auctionRecords && country.auctionRecords.length > 0 ? (
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Artiste</th>
                    <th>Oeuvre</th>
                    <th>Prix</th>
                    <th>Année</th>
                    <th>Maison</th>
                  </tr>
                </thead>
                <tbody>
                  {country.auctionRecords.map((a, i) => (
                    <tr key={i}>
                      <td className="highlight">{a.artist}</td>
                      <td>{a.title}</td>
                      <td style={{ color: 'var(--camel)', fontWeight: 600 }}>{a.price}</td>
                      <td>{a.year}</td>
                      <td>{a.house}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p style={{ color: 'var(--text-muted)' }}>Données enchères disponibles via les fiches artistes.</p>
            )}
          </>
        )}

        {activeTab === 'heritage' && (
          <>
            {country.culturalHeritage ? (
              <div className="info-grid">
                {country.culturalHeritage.unescoSites !== undefined && (
                  <div className="info-card">
                    <div className="info-card-label">Sites UNESCO</div>
                    <div className="info-card-value">{country.culturalHeritage.unescoSites}</div>
                  </div>
                )}
                {country.culturalHeritage.traditionalArts && (
                  <div className="info-card" style={{ gridColumn: 'span 2' }}>
                    <div className="info-card-label">Arts traditionnels</div>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
                      {country.culturalHeritage.traditionalArts.map((a, i) => (
                        <span key={i} className="eigen-badge">{a}</span>
                      ))}
                    </div>
                  </div>
                )}
                {country.culturalHeritage.artMovements && (
                  <div className="info-card" style={{ gridColumn: 'span 2' }}>
                    <div className="info-card-label">Mouvements artistiques</div>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
                      {country.culturalHeritage.artMovements.map((m, i) => (
                        <span key={i} className="reco-badge observe">{m}</span>
                      ))}
                    </div>
                  </div>
                )}
                {country.culturalHeritage.intangibleHeritage && (
                  <div className="info-card" style={{ gridColumn: 'span 2' }}>
                    <div className="info-card-label">Patrimoine immatériel</div>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
                      {country.culturalHeritage.intangibleHeritage.map((h, i) => (
                        <span key={i} className="eigen-badge">{h}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <p style={{ color: 'var(--text-muted)' }}>Données patrimoine en cours de collecte.</p>
            )}
          </>
        )}

        {activeTab === 'education' && (
          <>
            {country.artSchools && country.artSchools.length > 0 ? (
              <table className="data-table">
                <thead>
                  <tr>
                    <th>École</th>
                    <th>Ville</th>
                    <th>Type</th>
                    <th>Fondée</th>
                  </tr>
                </thead>
                <tbody>
                  {country.artSchools.map((s, i) => (
                    <tr key={i}>
                      <td className="highlight">{s.name}</td>
                      <td>{s.city}</td>
                      <td>{s.type}</td>
                      <td>{s.founded || '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p style={{ color: 'var(--text-muted)' }}>Données écoles d&apos;art en cours de collecte.</p>
            )}
          </>
        )}

        {activeTab === 'digital' && (
          <>
            {country.digitalArt ? (
              <div className="info-grid">
                <div className="info-card">
                  <div className="info-card-label">Marché NFT</div>
                  <div className="info-card-value">{country.digitalArt.nftMarketSize || 'N/A'}</div>
                </div>
                {country.digitalArt.regulation && (
                  <div className="info-card">
                    <div className="info-card-label">Régulation</div>
                    <div className="info-card-value" style={{ fontSize: '1rem' }}>{country.digitalArt.regulation}</div>
                  </div>
                )}
              </div>
            ) : (
              <p style={{ color: 'var(--text-muted)' }}>Données art numérique en cours de collecte.</p>
            )}
          </>
        )}

        {activeTab === 'market' && (
          <div className="info-grid">
            <div className="info-card">
              <div className="info-card-label">Taille du marché</div>
              <div className="info-card-value">{country.artMarket.marketSize || 'N/A'}</div>
            </div>
            <div className="info-card">
              <div className="info-card-label">Volume enchères</div>
              <div className="info-card-value">{country.artMarket.auctionVolume || 'N/A'}</div>
            </div>
            <div className="info-card">
              <div className="info-card-label">Financement public</div>
              <div className="info-card-value" style={{ fontSize: '1rem' }}>{country.artMarket.publicFunding || 'N/A'}</div>
            </div>
            <div className="info-card">
              <div className="info-card-label">Incitations fiscales</div>
              <div className="info-card-value" style={{ fontSize: '1rem' }}>{country.artMarket.taxIncentives || 'N/A'}</div>
            </div>
          </div>
        )}
      </div>

      {/* Footer Links */}
      <div className="link-row">
        <Link href="/diwane" className="link-button">Retour DIWANE</Link>
        <Link href="/diwane/compare" className="link-button">Comparateur marchés</Link>
        <Link href="/" className="link-button">Retour RAQIB</Link>
      </div>

      <footer className="diwane-footer">
        <p>RAQIB <span className="highlight">DIWANE</span> Art Market Intelligence · Eigen SAS · 2026</p>
      </footer>
    </div>
  );
}
