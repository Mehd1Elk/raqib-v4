// @ts-nocheck
'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ALL_COUNTRIES, DIWANE_TABS } from '../../../lib/diwane/data';
import { FlagIcon } from '../../../components/corridor/FlagIcon';

// Hook to fetch Supabase data for a tab
function useSupabaseData(endpoint: string, countryId: string, enabled: boolean) {
  const [data, setData] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (!enabled) return;
    setLoading(true);
    fetch(`/api/diwane/${endpoint}?country=${countryId}`)
      .then(r => r.json())
      .then(d => { setData(d.data || []); setLoading(false); })
      .catch(() => { setData([]); setLoading(false); });
  }, [endpoint, countryId, enabled]);
  return { data, loading };
}

function LoadingState() {
  return <div style={{ color: 'var(--text-muted)', padding: '2rem', textAlign: 'center' }}>Chargement des donn&eacute;es Supabase...</div>;
}

function EmptyState({ label }: { label: string }) {
  return <p style={{ color: 'var(--text-muted)' }}>Donn&eacute;es {label} en cours de collecte par l&apos;agent Perplexity.</p>;
}

export default function CountryArtDetailPage() {
  const params = useParams();
  const countryId = (params.countryId as string).toUpperCase();
  const country = ALL_COUNTRIES.find(c => c.id === countryId);
  const [activeTab, setActiveTab] = useState('overview');

  // Supabase data for new tabs
  const experts = useSupabaseData('experts', countryId, activeTab === 'experts');
  const lombard = useSupabaseData('lombard-credit', countryId, activeTab === 'lombard');
  const magazines = useSupabaseData('magazines', countryId, activeTab === 'magazines');
  const events = useSupabaseData('events', countryId, activeTab === 'events');
  const greyMarket = useSupabaseData('grey-market', countryId, activeTab === 'grey-market');
  const emergingArtists = useSupabaseData('emerging-artists', countryId, activeTab === 'emerging');
  const topArtists = useSupabaseData('top-artists', countryId, activeTab === 'top-artists');

  if (!country) {
    return (
      <div className="diwane-main-content" style={{ padding: '4rem 2rem', textAlign: 'center' }}>
        <h1 style={{ color: 'var(--orange)', fontFamily: 'var(--font-display)', fontSize: '2rem' }}>Pays non trouv&eacute;</h1>
        <Link href="/diwane" className="link-button" style={{ marginTop: '2rem', display: 'inline-block' }}>Retour DIWANE</Link>
      </div>
    );
  }

  return (
    <div className="diwane-main-content">
      {/* Header */}
      <div className="country-header">
        <div className="country-header-top">
          <FlagIcon code={country.id} size={64} />
          <div>
            <h1><span>{country.name}</span></h1>
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', marginTop: '0.25rem', flexWrap: 'wrap' }}>
              {country.marketSize && <span style={{ fontSize: '0.75rem', color: 'var(--camel)' }}>{country.marketSize}</span>}
              {country.region === 'africa' ? <span className="africa-tag">Afrique</span> : <span className="eu-tag">Union Europ&eacute;enne</span>}
              <span style={{ fontSize: '0.65rem', color: 'var(--text-faint)' }}>
                {country.artists?.length || 0} artistes &middot; {country.galleries?.length || 0} galeries &middot; {country.museums?.length || 0} mus&eacute;es
              </span>
            </div>
          </div>
        </div>

        {/* Tabs — scrollable */}
        <div className="tab-container" style={{ overflowX: 'auto', gap: '0.15rem' }}>
          {DIWANE_TABS.map(t => (
            <button key={t.id} className={`tab-button ${activeTab === t.id ? 'active' : ''}`} onClick={() => setActiveTab(t.id)} style={{ whiteSpace: 'nowrap', fontSize: '0.65rem', padding: '0.4rem 0.7rem' }}>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="diwane-section">

        {/* ========== VUE D'ENSEMBLE ========== */}
        {activeTab === 'overview' && (
          <>
            {country.marketOverview && (
              <div className="info-card" style={{ marginBottom: '1.5rem' }}>
                <div className="info-card-label">Aper&ccedil;u du march&eacute;</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--hermes-text, #F5EDE3)', lineHeight: '1.6' }}>{country.marketOverview}</div>
              </div>
            )}
            <div className="info-grid">
              <div className="info-card"><div className="info-card-label">Taille du march&eacute;</div><div className="info-card-value">{country.marketSize || 'N/A'}</div></div>
              <div className="info-card"><div className="info-card-label">Artistes</div><div className="info-card-value">{country.artists?.length || 0}</div></div>
              <div className="info-card"><div className="info-card-label">Galeries</div><div className="info-card-value">{country.galleries?.length || 0}</div></div>
              <div className="info-card"><div className="info-card-label">Mus&eacute;es</div><div className="info-card-value">{country.museums?.length || 0}</div></div>
              <div className="info-card"><div className="info-card-label">Foires d&apos;art</div><div className="info-card-value">{country.artFairs?.length || 0}</div></div>
              <div className="info-card"><div className="info-card-label">Maisons d&apos;ench&egrave;res</div><div className="info-card-value">{country.auctionHouses?.length || 0}</div></div>
              <div className="info-card"><div className="info-card-label">Collectionneurs</div><div className="info-card-value">{country.collectors?.length || 0}</div></div>
              <div className="info-card"><div className="info-card-label">Art Finance</div><div className="info-card-value">{country.artFinance?.length || 0}</div></div>
            </div>
            {country.artMovements && country.artMovements.length > 0 && (
              <div className="info-card" style={{ marginTop: '1rem' }}>
                <div className="info-card-label">Mouvements artistiques</div>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
                  {country.artMovements.map((m, i) => (<span key={i} className="eigen-badge">{m}</span>))}
                </div>
              </div>
            )}
          </>
        )}

        {/* ========== ARTISTES (tous) ========== */}
        {activeTab === 'artists' && (
          <>
            {country.artists && country.artists.length > 0 ? (
              <div className="countries-grid">
                {country.artists.map((a, i) => (
                  <div key={i} className="artist-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div className="artist-name">{a.name}</div>
                      {a.forgeryRisk && (
                        <span style={{ fontSize: '0.55rem', padding: '2px 6px', borderRadius: '3px', background: a.forgeryRisk === 'élevé' || a.forgeryRisk === 'très élevé' ? 'rgba(161,53,68,0.3)' : 'rgba(90,138,58,0.3)', color: a.forgeryRisk === 'élevé' || a.forgeryRisk === 'très élevé' ? '#E8600A' : '#5A8A3A' }}>
                          Faux: {a.forgeryRisk}
                        </span>
                      )}
                    </div>
                    <div className="artist-medium">{a.medium}</div>
                    {a.movement && <div className="artist-movement">{a.movement}</div>}
                    {a.styleDescription && <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>{a.styleDescription}</div>}
                    {a.techniques && a.techniques.length > 0 && (
                      <div style={{ display: 'flex', gap: '0.25rem', flexWrap: 'wrap', marginTop: '0.25rem' }}>
                        {a.techniques.map((t, j) => (<span key={j} style={{ fontSize: '0.55rem', background: 'rgba(193,154,107,0.15)', color: 'var(--camel)', padding: '1px 5px', borderRadius: '2px' }}>{t}</span>))}
                      </div>
                    )}
                    {a.auctionRecord && <div className="artist-record">Record: {a.auctionRecord}</div>}
                    {a.priceRangeLow && a.priceRangeHigh && (
                      <div style={{ fontSize: '0.6rem', color: 'var(--camel)' }}>Fourchette: {a.priceRangeLow} — {a.priceRangeHigh}</div>
                    )}
                    {a.estimatedCollectionSize && <div style={{ fontSize: '0.6rem', color: 'var(--text-faint)' }}>Collection: ~{a.estimatedCollectionSize}</div>}
                    {a.marketTrend && (
                      <div style={{ fontSize: '0.6rem', color: a.marketTrend.includes('hausse') ? '#5A8A3A' : a.marketTrend.includes('baisse') ? '#A13544' : 'var(--text-muted)' }}>
                        Tendance: {a.marketTrend}
                      </div>
                    )}
                    {a.galleries && a.galleries.length > 0 && <div style={{ fontSize: '0.6rem', color: 'var(--text-faint)', marginTop: '0.2rem' }}>Galeries: {a.galleries.join(', ')}</div>}
                    {a.significance && <div style={{ fontSize: '0.55rem', color: 'var(--text-muted)', marginTop: '0.2rem', lineHeight: '1.3' }}>{a.significance}</div>}
                    <div style={{ fontSize: '0.55rem', color: 'var(--text-faint)', marginTop: '0.2rem' }}>{a.born}{a.died ? ` \u2014 ${a.died}` : ''}</div>
                  </div>
                ))}
              </div>
            ) : <EmptyState label="artistes" />}
          </>
        )}

        {/* ========== TOP COTÉS (Supabase) ========== */}
        {activeTab === 'top-artists' && (
          <>
            {topArtists.loading ? <LoadingState /> : topArtists.data && topArtists.data.length > 0 ? (
              <div className="countries-grid">
                {topArtists.data.map((a: any, i: number) => (
                  <div key={i} className="artist-card" style={{ borderLeft: '3px solid var(--hermes-orange, #E8600A)' }}>
                    <div className="artist-name">{a.name}</div>
                    <div className="artist-medium">{a.medium}</div>
                    {a.movement && <div className="artist-movement">{a.movement}</div>}
                    {a.style_description && <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>{a.style_description}</div>}
                    {a.auction_record && <div className="artist-record">Record: {a.auction_record}</div>}
                    {a.price_range_low && <div style={{ fontSize: '0.6rem', color: 'var(--camel)' }}>Fourchette: {a.price_range_low} — {a.price_range_high}</div>}
                    {a.estimated_collection_size && <div style={{ fontSize: '0.6rem', color: 'var(--text-faint)' }}>Collection: ~{a.estimated_collection_size}</div>}
                    {a.forgery_risk && <div style={{ fontSize: '0.6rem', color: '#E8600A' }}>Risque faux: {a.forgery_risk}</div>}
                    {a.market_trend && <div style={{ fontSize: '0.6rem', color: a.market_trend.includes('hausse') ? '#5A8A3A' : '#A13544' }}>Tendance: {a.market_trend}</div>}
                    {a.significance && <div style={{ fontSize: '0.55rem', color: 'var(--text-muted)', marginTop: '0.2rem', lineHeight: '1.3' }}>{a.significance}</div>}
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState label="artistes les plus cot\u00e9s" />
            )}
            {/* Fallback from static data */}
            {(!topArtists.data || topArtists.data.length === 0) && !topArtists.loading && country.artists && country.artists.length > 0 && (
              <div style={{ marginTop: '1rem' }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--camel)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Depuis donn&eacute;es statiques</div>
                <div className="countries-grid">
                  {country.artists.filter(a => a.auctionRecord).slice(0, 6).map((a, i) => (
                    <div key={i} className="artist-card" style={{ borderLeft: '3px solid var(--hermes-orange, #E8600A)' }}>
                      <div className="artist-name">{a.name}</div>
                      <div className="artist-medium">{a.medium}</div>
                      {a.auctionRecord && <div className="artist-record">Record: {a.auctionRecord}</div>}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {/* ========== ÉMERGENTS (Supabase) ========== */}
        {activeTab === 'emerging' && (
          <>
            {emergingArtists.loading ? <LoadingState /> : emergingArtists.data && emergingArtists.data.length > 0 ? (
              <div className="countries-grid">
                {emergingArtists.data.map((a: any, i: number) => (
                  <div key={i} className="artist-card" style={{ borderLeft: '3px solid #5A8A3A' }}>
                    <div className="artist-name">{a.name} <span style={{ fontSize: '0.55rem', color: '#5A8A3A' }}>&Eacute;MERGENT</span></div>
                    <div className="artist-medium">{a.medium}</div>
                    {a.emerging_since && <div style={{ fontSize: '0.6rem', color: 'var(--camel)' }}>Depuis {a.emerging_since}</div>}
                    {a.style_description && <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>{a.style_description}</div>}
                    {a.price_range_low && <div style={{ fontSize: '0.6rem', color: 'var(--camel)' }}>Fourchette: {a.price_range_low} — {a.price_range_high}</div>}
                    {a.market_trend && <div style={{ fontSize: '0.6rem', color: '#5A8A3A' }}>Tendance: {a.market_trend}</div>}
                    {a.significance && <div style={{ fontSize: '0.55rem', color: 'var(--text-muted)', marginTop: '0.2rem', lineHeight: '1.3' }}>{a.significance}</div>}
                  </div>
                ))}
              </div>
            ) : <EmptyState label="artistes \u00e9mergents" />}
          </>
        )}

        {/* ========== GALERIES ========== */}
        {activeTab === 'galleries' && (
          <>
            {country.galleries && country.galleries.length > 0 ? (
              <table className="data-table">
                <thead><tr><th>Galerie</th><th>Ville</th><th>Fond&eacute;e</th><th>Sp&eacute;cialit&eacute;</th><th>Foires</th></tr></thead>
                <tbody>
                  {country.galleries.map((g, i) => (
                    <tr key={i}>
                      <td className="highlight">{g.website ? <a href={g.website.startsWith('http') ? g.website : `https://${g.website}`} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--hermes-orange, #E8600A)' }}>{g.name}</a> : g.name}</td>
                      <td>{g.city}</td><td>{g.founded || '\u2014'}</td><td style={{ fontSize: '0.7rem' }}>{g.specialty || '\u2014'}</td>
                      <td style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>{g.fairs?.join(', ') || '\u2014'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : <EmptyState label="galeries" />}
          </>
        )}

        {/* ========== MUSÉES ========== */}
        {activeTab === 'museums' && (
          <>
            {country.museums && country.museums.length > 0 ? (
              <div className="countries-grid">
                {country.museums.map((m, i) => (
                  <div key={i} className="info-card">
                    <div className="info-card-value" style={{ fontSize: '1rem' }}>{m.website ? <a href={m.website.startsWith('http') ? m.website : `https://${m.website}`} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--hermes-orange, #E8600A)' }}>{m.name}</a> : m.name}</div>
                    <div className="info-card-sub">{m.city} &middot; {m.type || 'Mus\u00e9e'}</div>
                    {m.collection && <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '0.25rem', lineHeight: '1.3' }}>{m.collection}</div>}
                    {m.visitors && <div style={{ fontSize: '0.6rem', color: 'var(--camel)', marginTop: '0.15rem' }}>{m.visitors}</div>}
                  </div>
                ))}
              </div>
            ) : <EmptyState label="mus\u00e9es" />}
          </>
        )}

        {/* ========== ENCHÈRES (maisons) ========== */}
        {activeTab === 'auctions' && (
          <>
            {country.auctionHouses && country.auctionHouses.length > 0 ? (
              <div className="countries-grid">
                {country.auctionHouses.map((ah, i) => (
                  <div key={i} className="info-card">
                    <div className="info-card-value" style={{ fontSize: '1.1rem' }}>{ah.name}</div>
                    <div className="info-card-sub">{ah.city}{ah.type ? ` \u00b7 ${ah.type}` : ''}</div>
                    {ah.specialty && <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>{ah.specialty}</div>}
                    {ah.annualVolume && <div style={{ fontSize: '0.65rem', color: 'var(--camel)', marginTop: '0.15rem' }}>Volume: {ah.annualVolume}</div>}
                    {ah.majorSales && ah.majorSales.length > 0 && (
                      <div style={{ marginTop: '0.5rem' }}>
                        <div style={{ fontSize: '0.6rem', color: 'var(--camel)', textTransform: 'uppercase', letterSpacing: '1px' }}>Ventes majeures</div>
                        {ah.majorSales.map((s, j) => (<div key={j} style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '0.1rem' }}>&bull; {s}</div>))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : <EmptyState label="maisons d'ench\u00e8res" />}
          </>
        )}

        {/* ========== COLLECTIONNEURS ========== */}
        {activeTab === 'collectors' && (
          <>
            {country.collectors && country.collectors.length > 0 ? (
              <div className="countries-grid">
                {country.collectors.map((col, i) => (
                  <div key={i} className="info-card">
                    <div className="info-card-value" style={{ fontSize: '1rem' }}>{col.name}</div>
                    {col.type && <div className="info-card-sub">{col.type}{col.influenceLevel ? ` \u00b7 ${col.influenceLevel}` : ''}</div>}
                    {col.focus && <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>{col.focus}</div>}
                    {col.collectionSize && <div style={{ fontSize: '0.65rem', color: 'var(--camel)', marginTop: '0.15rem' }}>{col.collectionSize}</div>}
                    {col.collectionValueEstimate && <div style={{ fontSize: '0.65rem', color: 'var(--hermes-orange, #E8600A)' }}>Valeur: {col.collectionValueEstimate}</div>}
                    {col.foundationName && <div style={{ fontSize: '0.6rem', color: 'var(--text-faint)' }}>Fondation: {col.foundationName}</div>}
                    {col.notableAcquisitions && col.notableAcquisitions.length > 0 && (
                      <div style={{ marginTop: '0.25rem' }}>
                        {col.notableAcquisitions.map((acq, j) => (<div key={j} style={{ fontSize: '0.55rem', color: 'var(--text-muted)' }}>&bull; {acq}</div>))}
                      </div>
                    )}
                    {col.publicAccess !== undefined && (
                      <div style={{ fontSize: '0.55rem', marginTop: '0.15rem', color: col.publicAccess ? '#5A8A3A' : 'var(--text-faint)' }}>
                        {col.publicAccess ? 'Ouvert au public' : 'Collection priv\u00e9e'}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : <EmptyState label="collectionneurs" />}
          </>
        )}

        {/* ========== FOIRES ========== */}
        {activeTab === 'fairs' && (
          <>
            {country.artFairs && country.artFairs.length > 0 ? (
              <div className="countries-grid">
                {country.artFairs.map((f, i) => (
                  <div key={i} className="info-card">
                    <div className="info-card-value" style={{ fontSize: '1.1rem' }}>{f.name}</div>
                    <div className="info-card-sub">{f.city}{f.frequency ? ` \u00b7 ${f.frequency}` : ''}</div>
                    {f.significance && <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.25rem', lineHeight: '1.3' }}>{f.significance}</div>}
                  </div>
                ))}
              </div>
            ) : <EmptyState label="foires d'art" />}
          </>
        )}

        {/* ========== AGENDA 2026/2027 (Supabase) ========== */}
        {activeTab === 'events' && (
          <>
            {events.loading ? <LoadingState /> : events.data && events.data.length > 0 ? (
              <table className="data-table">
                <thead><tr><th>&Eacute;v&eacute;nement</th><th>Ville</th><th>Type</th><th>Dates</th><th>Visiteurs</th><th>Focus</th></tr></thead>
                <tbody>
                  {events.data.map((ev: any, i: number) => (
                    <tr key={i}>
                      <td className="highlight">{ev.website ? <a href={ev.website} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--hermes-orange, #E8600A)' }}>{ev.name}</a> : ev.name}</td>
                      <td>{ev.city}</td>
                      <td><span className="eigen-badge">{ev.type || 'event'}</span></td>
                      <td style={{ fontSize: '0.7rem' }}>{ev.date_start || ''}{ev.date_end ? ` \u2192 ${ev.date_end}` : ''}</td>
                      <td>{ev.expected_visitors || '\u2014'}</td>
                      <td style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>{ev.focus || '\u2014'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : <EmptyState label="\u00e9v\u00e9nements 2026/2027" />}
          </>
        )}

        {/* ========== ART FINANCE ========== */}
        {activeTab === 'finance' && (
          <>
            {country.artFinance && country.artFinance.length > 0 ? (
              <div className="countries-grid">
                {country.artFinance.map((f, i) => (
                  <div key={i} className="info-card">
                    <div className="info-card-value" style={{ fontSize: '1rem' }}>{f.institution}</div>
                    <div className="info-card-sub">{f.type}</div>
                    {f.services && <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>{f.services}</div>}
                    {f.contact && <div style={{ fontSize: '0.6rem', color: 'var(--camel)', marginTop: '0.15rem' }}>Contact: {f.contact}</div>}
                  </div>
                ))}
              </div>
            ) : <EmptyState label="Art Finance" />}
          </>
        )}

        {/* ========== CRÉDIT LOMBARD (Supabase) ========== */}
        {activeTab === 'lombard' && (
          <>
            {lombard.loading ? <LoadingState /> : lombard.data && lombard.data.length > 0 ? (
              lombard.data.map((lc: any, i: number) => (
                <div key={i}>
                  <div className="info-grid">
                    <div className="info-card"><div className="info-card-label">Statut</div><div className="info-card-value" style={{ color: lc.status === 'actif' ? '#5A8A3A' : lc.status === 'inexistant' ? '#A13544' : '#E8600A' }}>{lc.status || 'N/A'}</div></div>
                    <div className="info-card"><div className="info-card-label">LTV Ratio</div><div className="info-card-value">{lc.ltv_ratio || 'N/A'}</div></div>
                    <div className="info-card"><div className="info-card-label">Taux typique</div><div className="info-card-value">{lc.typical_rate || 'N/A'}</div></div>
                    <div className="info-card"><div className="info-card-label">Collat&eacute;ral min.</div><div className="info-card-value">{lc.min_collateral || 'N/A'}</div></div>
                    <div className="info-card"><div className="info-card-label">Taille march&eacute;</div><div className="info-card-value">{lc.market_size_estimate || 'N/A'}</div></div>
                    <div className="info-card"><div className="info-card-label">Incitations fiscales</div><div className="info-card-value" style={{ fontSize: '0.85rem' }}>{lc.tax_incentives || 'N/A'}</div></div>
                  </div>
                  {lc.banks && lc.banks.length > 0 && (
                    <div className="info-card" style={{ marginTop: '1rem' }}>
                      <div className="info-card-label">Banques partenaires</div>
                      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
                        {lc.banks.map((b: string, j: number) => (<span key={j} className="eigen-badge">{b}</span>))}
                      </div>
                    </div>
                  )}
                  {lc.freeports && lc.freeports.length > 0 && (
                    <div className="info-card" style={{ marginTop: '0.5rem' }}>
                      <div className="info-card-label">Ports francs</div>
                      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
                        {lc.freeports.map((f: string, j: number) => (<span key={j} className="eigen-badge">{f}</span>))}
                      </div>
                    </div>
                  )}
                  {lc.diwane_opportunity && (
                    <div className="info-card" style={{ marginTop: '0.5rem', borderLeft: '3px solid var(--hermes-orange, #E8600A)' }}>
                      <div className="info-card-label">Opportunit&eacute; DIWANE</div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--hermes-text, #F5EDE3)' }}>{lc.diwane_opportunity}</div>
                    </div>
                  )}
                </div>
              ))
            ) : <EmptyState label="Cr\u00e9dit Lombard" />}
          </>
        )}

        {/* ========== MARCHÉ GRIS (Supabase) ========== */}
        {activeTab === 'grey-market' && (
          <>
            {greyMarket.loading ? <LoadingState /> : greyMarket.data && greyMarket.data.length > 0 ? (
              greyMarket.data.map((gm: any, i: number) => (
                <div key={i}>
                  <div className="info-grid">
                    <div className="info-card"><div className="info-card-label">Pr&eacute;valence faux</div><div className="info-card-value" style={{ color: gm.forgery_prevalence === 'élevée' || gm.forgery_prevalence === 'très élevée' ? '#A13544' : '#5A8A3A' }}>{gm.forgery_prevalence || 'N/A'}</div></div>
                    <div className="info-card"><div className="info-card-label">Due diligence</div><div className="info-card-value">{gm.due_diligence_level || 'N/A'}</div></div>
                    <div className="info-card"><div className="info-card-label">Risque blanchiment</div><div className="info-card-value" style={{ fontSize: '0.85rem' }}>{gm.money_laundering_risk || 'N/A'}</div></div>
                    <div className="info-card"><div className="info-card-label">Ventes non r&eacute;gul&eacute;es</div><div className="info-card-value">{gm.unregulated_sales_estimate || 'N/A'}</div></div>
                  </div>
                  {gm.main_risks && <div className="info-card" style={{ marginTop: '0.5rem' }}><div className="info-card-label">Risques principaux</div><div style={{ fontSize: '0.85rem', color: 'var(--hermes-text, #F5EDE3)' }}>{gm.main_risks}</div></div>}
                  {gm.known_forgery_cases && gm.known_forgery_cases.length > 0 && (
                    <div className="info-card" style={{ marginTop: '0.5rem' }}>
                      <div className="info-card-label">Cas de faux connus</div>
                      {gm.known_forgery_cases.map((c: string, j: number) => (<div key={j} style={{ fontSize: '0.7rem', color: '#A13544', marginTop: '0.15rem' }}>&bull; {c}</div>))}
                    </div>
                  )}
                  {gm.certification_bodies && gm.certification_bodies.length > 0 && (
                    <div className="info-card" style={{ marginTop: '0.5rem' }}>
                      <div className="info-card-label">Organismes de certification</div>
                      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
                        {gm.certification_bodies.map((cb: string, j: number) => (<span key={j} className="eigen-badge">{cb}</span>))}
                      </div>
                    </div>
                  )}
                  {gm.noos_relevance && (
                    <div className="info-card" style={{ marginTop: '0.5rem', borderLeft: '3px solid var(--hermes-orange, #E8600A)' }}>
                      <div className="info-card-label">NOOS (IA Expertise)</div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--hermes-text, #F5EDE3)' }}>{gm.noos_relevance}</div>
                    </div>
                  )}
                </div>
              ))
            ) : <EmptyState label="March\u00e9 Gris" />}
          </>
        )}

        {/* ========== EXPERTS (Supabase) ========== */}
        {activeTab === 'experts' && (
          <>
            {experts.loading ? <LoadingState /> : experts.data && experts.data.length > 0 ? (
              <div className="countries-grid">
                {experts.data.map((ex: any, i: number) => (
                  <div key={i} className="info-card">
                    <div className="info-card-value" style={{ fontSize: '1rem' }}>{ex.name}</div>
                    {ex.title && <div className="info-card-sub">{ex.title}</div>}
                    {ex.institution && <div style={{ fontSize: '0.7rem', color: 'var(--camel)' }}>{ex.institution}</div>}
                    {ex.specialty && <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>{ex.specialty}</div>}
                    {ex.expertise_type && <span className="eigen-badge">{ex.expertise_type}</span>}
                    {ex.notable_work && <div style={{ fontSize: '0.6rem', color: 'var(--text-faint)', marginTop: '0.25rem' }}>{ex.notable_work}</div>}
                    {ex.website && <div style={{ marginTop: '0.15rem' }}><a href={ex.website} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.55rem', color: 'var(--hermes-orange, #E8600A)' }}>Site web</a></div>}
                  </div>
                ))}
              </div>
            ) : <EmptyState label="experts en art" />}
          </>
        )}

        {/* ========== MAGAZINES (Supabase) ========== */}
        {activeTab === 'magazines' && (
          <>
            {magazines.loading ? <LoadingState /> : magazines.data && magazines.data.length > 0 ? (
              <table className="data-table">
                <thead><tr><th>Magazine</th><th>Type</th><th>Fr&eacute;quence</th><th>Langue</th><th>Focus</th><th>Rayonnement</th></tr></thead>
                <tbody>
                  {magazines.data.map((mag: any, i: number) => (
                    <tr key={i}>
                      <td className="highlight">{mag.website ? <a href={mag.website} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--hermes-orange, #E8600A)' }}>{mag.name}</a> : mag.name}</td>
                      <td>{mag.type || '\u2014'}</td>
                      <td>{mag.frequency || '\u2014'}</td>
                      <td>{mag.language || '\u2014'}</td>
                      <td style={{ fontSize: '0.7rem' }}>{mag.focus || '\u2014'}</td>
                      <td><span className="eigen-badge">{mag.influence_level || '\u2014'}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : <EmptyState label="magazines d'art" />}
          </>
        )}

        {/* ========== RÉGLEMENTATION ========== */}
        {activeTab === 'regulation' && (
          <>
            {country.regulation ? (
              <div className="info-grid">
                {country.regulation.vatRate && <div className="info-card"><div className="info-card-label">TVA / Taxe ventes art</div><div style={{ fontSize: '0.85rem', color: 'var(--hermes-text, #F5EDE3)' }}>{country.regulation.vatRate}</div></div>}
                {country.regulation.droitDeSuite && <div className="info-card"><div className="info-card-label">Droit de suite</div><div style={{ fontSize: '0.85rem', color: 'var(--hermes-text, #F5EDE3)' }}>{country.regulation.droitDeSuite}</div></div>}
                {country.regulation.exportRules && <div className="info-card"><div className="info-card-label">R&egrave;gles export</div><div style={{ fontSize: '0.85rem', color: 'var(--hermes-text, #F5EDE3)' }}>{country.regulation.exportRules}</div></div>}
                {country.regulation.importRules && <div className="info-card"><div className="info-card-label">R&egrave;gles import</div><div style={{ fontSize: '0.85rem', color: 'var(--hermes-text, #F5EDE3)' }}>{country.regulation.importRules}</div></div>}
                {country.regulation.heritageProtection && <div className="info-card" style={{ gridColumn: 'span 2' }}><div className="info-card-label">Protection patrimoine</div><div style={{ fontSize: '0.85rem', color: 'var(--hermes-text, #F5EDE3)' }}>{country.regulation.heritageProtection}</div></div>}
                {country.regulation.antiMoneyLaundering && <div className="info-card"><div className="info-card-label">Anti-blanchiment</div><div style={{ fontSize: '0.85rem', color: 'var(--hermes-text, #F5EDE3)' }}>{country.regulation.antiMoneyLaundering}</div></div>}
                {country.regulation.culturalRestitution && <div className="info-card"><div className="info-card-label">Restitution culturelle</div><div style={{ fontSize: '0.85rem', color: 'var(--hermes-text, #F5EDE3)' }}>{country.regulation.culturalRestitution}</div></div>}
              </div>
            ) : <EmptyState label="r\u00e9glementation" />}
          </>
        )}

        {/* ========== ÉDUCATION ========== */}
        {activeTab === 'education' && (
          <>
            {country.artEducation && country.artEducation.length > 0 ? (
              <table className="data-table">
                <thead><tr><th>&Eacute;cole</th><th>Ville</th><th>Type</th></tr></thead>
                <tbody>{country.artEducation.map((s, i) => (<tr key={i}><td className="highlight">{s.name}</td><td>{s.city}</td><td>{s.type || '\u2014'}</td></tr>))}</tbody>
              </table>
            ) : <EmptyState label="\u00e9coles d'art" />}
          </>
        )}

        {/* ========== DIWANE × EIGEN ========== */}
        {activeTab === 'eigen' && (
          <div className="info-grid">
            {[
              { name: 'BURHAN', desc: 'Provenance Blockchain', detail: `Traçabilité blockchain de la provenance des œuvres d'art en ${country.name}. Certificats numériques immuables.`, color: 'var(--hermes-orange, #E8600A)' },
              { name: 'NOOS', desc: 'Expertise IA', detail: `Détection de faux par IA. Analyse stylistique, spectrométrique et historique des œuvres du marché ${country.name.toLowerCase()}.`, color: 'var(--hermes-orange, #E8600A)' },
              { name: 'ÆLYA', desc: 'Droits artistes', detail: `Protection des droits de reproduction et consentement des artistes de ${country.name}. Royalties numériques.`, color: 'var(--camel, #C19A6B)' },
              { name: 'MYNε', desc: 'Marketplace Data Art', detail: `Marketplace de données du marché de l'art. Prix, tendances et analytics pour ${country.name}.`, color: 'var(--camel, #C19A6B)' },
              { name: 'YrKnown', desc: 'Savoir-faire restauration', detail: `Documentation des savoir-faire de restauration et d'expertise tacite des artisans de ${country.name}.`, color: 'var(--camel, #C19A6B)' },
              { name: 'RAQIB', desc: 'Intelligence marché', detail: `Intelligence complète du marché de l'art de ${country.name} : artistes, galeries, enchères, collectionneurs.`, color: 'var(--hermes-orange, #E8600A)' },
              { name: 'MIZAN', desc: 'Paiement multi-devises', detail: `Paiement sécurisé multi-devises pour transactions d'œuvres. ${country.region === 'africa' ? 'Support devises africaines + EUR/USD.' : 'Support EUR + devises internationales.'}`, color: 'var(--hermes-orange, #E8600A)' },
            ].map((brick, i) => (
              <div key={i} className="info-card" style={{ borderLeft: `3px solid ${brick.color}` }}>
                <div className="info-card-label">{brick.name} &mdash; {brick.desc}</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--hermes-text, #F5EDE3)' }}>{brick.detail}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="link-row">
        <Link href="/diwane" className="link-button">Retour DIWANE</Link>
        <Link href="/diwane/compare" className="link-button">Comparateur</Link>
        <Link href="/" className="link-button">Retour RAQIB</Link>
      </div>
      <footer className="diwane-footer">
        <p>RAQIB <span className="highlight">DIWANE</span> Art Market Intelligence &middot; Eigen SAS &middot; 2026</p>
      </footer>
    </div>
  );
}
