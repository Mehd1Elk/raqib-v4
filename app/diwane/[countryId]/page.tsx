// @ts-nocheck
'use client';

import { useParams } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';
import { ALL_COUNTRIES, DIWANE_TABS } from '../../../lib/diwane/data';
import { FlagIcon } from '../../../components/corridor/FlagIcon';

export default function CountryArtDetailPage() {
  const params = useParams();
  const countryId = (params.countryId as string).toUpperCase();
  const country = ALL_COUNTRIES.find(c => c.id === countryId);
  const [activeTab, setActiveTab] = useState('overview');

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
            <h1>
              <span>{country.name}</span>
            </h1>
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', marginTop: '0.25rem' }}>
              {country.marketSize && <span style={{ fontSize: '0.75rem', color: 'var(--camel)' }}>{country.marketSize}</span>}
              {country.region === 'africa' ? <span className="africa-tag">Afrique</span> : <span className="eu-tag">Union Europ&eacute;enne</span>}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="tab-container" style={{ overflowX: 'auto' }}>
          {DIWANE_TABS.map(t => (
            <button key={t.id} className={`tab-button ${activeTab === t.id ? 'active' : ''}`} onClick={() => setActiveTab(t.id)}>
              {t.label}
            </button>
          ))}
          <button className={`tab-button ${activeTab === 'eigen' ? 'active' : ''}`} onClick={() => setActiveTab('eigen')}>
            DIWANE &times; EIGEN
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="diwane-section">

        {/* ========== 1. VUE D'ENSEMBLE ========== */}
        {activeTab === 'overview' && (
          <>
            {country.marketOverview && (
              <div className="info-card" style={{ marginBottom: '1.5rem' }}>
                <div className="info-card-label">Aper&ccedil;u du march&eacute;</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--hermes-text, #F5EDE3)', lineHeight: '1.6' }}>{country.marketOverview}</div>
              </div>
            )}
            <div className="info-grid">
              <div className="info-card">
                <div className="info-card-label">Taille du march&eacute;</div>
                <div className="info-card-value">{country.marketSize || 'N/A'}</div>
              </div>
              <div className="info-card">
                <div className="info-card-label">Artistes r&eacute;f&eacute;renc&eacute;s</div>
                <div className="info-card-value">{country.artists?.length || 0}</div>
              </div>
              <div className="info-card">
                <div className="info-card-label">Galeries</div>
                <div className="info-card-value">{country.galleries?.length || 0}</div>
              </div>
              <div className="info-card">
                <div className="info-card-label">Mus&eacute;es</div>
                <div className="info-card-value">{country.museums?.length || 0}</div>
              </div>
              <div className="info-card">
                <div className="info-card-label">Foires d&apos;art</div>
                <div className="info-card-value">{country.artFairs?.length || 0}</div>
              </div>
              <div className="info-card">
                <div className="info-card-label">Maisons d&apos;ench&egrave;res</div>
                <div className="info-card-value">{country.auctionHouses?.length || 0}</div>
              </div>
            </div>
            {country.artMovements && country.artMovements.length > 0 && (
              <div className="info-card" style={{ marginTop: '1rem' }}>
                <div className="info-card-label">Mouvements artistiques</div>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
                  {country.artMovements.map((m, i) => (
                    <span key={i} className="eigen-badge">{m}</span>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {/* ========== 2. ARTISTES ========== */}
        {activeTab === 'artists' && (
          <>
            {country.artists && country.artists.length > 0 ? (
              <div className="countries-grid">
                {country.artists.map((a, i) => (
                  <div key={i} className="artist-card">
                    <div className="artist-name">{a.name}</div>
                    <div className="artist-medium">{a.medium}</div>
                    {a.movement && <div className="artist-movement">{a.movement}</div>}
                    {a.auctionRecord && <div className="artist-record">Record: {a.auctionRecord}</div>}
                    {a.galleries && a.galleries.length > 0 && (
                      <div style={{ fontSize: '0.65rem', color: 'var(--text-faint)', marginTop: '0.25rem' }}>
                        Galeries: {a.galleries.join(', ')}
                      </div>
                    )}
                    {a.collections && a.collections.length > 0 && (
                      <div style={{ fontSize: '0.65rem', color: 'var(--text-faint)', marginTop: '0.15rem' }}>
                        Collections: {a.collections.join(', ')}
                      </div>
                    )}
                    {a.significance && (
                      <div style={{ fontSize: '0.6rem', color: 'var(--text-muted)', marginTop: '0.25rem', lineHeight: '1.3' }}>
                        {a.significance}
                      </div>
                    )}
                    <div style={{ fontSize: '0.6rem', color: 'var(--text-faint)', marginTop: '0.25rem' }}>
                      {a.born}{a.died ? ` \u2014 ${a.died}` : ''}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ color: 'var(--text-muted)' }}>Donn&eacute;es artistes en cours de collecte.</p>
            )}
          </>
        )}

        {/* ========== 3. GALERIES ========== */}
        {activeTab === 'galleries' && (
          <>
            {country.galleries && country.galleries.length > 0 ? (
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Galerie</th>
                    <th>Ville</th>
                    <th>Fond&eacute;e</th>
                    <th>Sp&eacute;cialit&eacute;</th>
                    <th>Foires</th>
                  </tr>
                </thead>
                <tbody>
                  {country.galleries.map((g, i) => (
                    <tr key={i}>
                      <td className="highlight">
                        {g.website ? <a href={g.website.startsWith('http') ? g.website : `https://${g.website}`} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--hermes-orange, #E8600A)' }}>{g.name}</a> : g.name}
                      </td>
                      <td>{g.city}</td>
                      <td>{g.founded || '\u2014'}</td>
                      <td style={{ fontSize: '0.7rem' }}>{g.specialty || '\u2014'}</td>
                      <td style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>{g.fairs?.join(', ') || '\u2014'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p style={{ color: 'var(--text-muted)' }}>Donn&eacute;es galeries en cours de collecte.</p>
            )}
          </>
        )}

        {/* ========== 4. MUSÉES ========== */}
        {activeTab === 'museums' && (
          <>
            {country.museums && country.museums.length > 0 ? (
              <div className="countries-grid">
                {country.museums.map((m, i) => (
                  <div key={i} className="info-card">
                    <div className="info-card-value" style={{ fontSize: '1rem' }}>
                      {m.website ? <a href={m.website.startsWith('http') ? m.website : `https://${m.website}`} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--hermes-orange, #E8600A)' }}>{m.name}</a> : m.name}
                    </div>
                    <div className="info-card-sub">{m.city} &middot; {m.type || 'Mus\u00e9e'}</div>
                    {m.collection && <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '0.25rem', lineHeight: '1.3' }}>{m.collection}</div>}
                    {m.director && <div style={{ fontSize: '0.6rem', color: 'var(--text-faint)', marginTop: '0.15rem' }}>Dir: {m.director}</div>}
                    {m.visitors && <div style={{ fontSize: '0.6rem', color: 'var(--camel)', marginTop: '0.15rem' }}>{m.visitors}</div>}
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ color: 'var(--text-muted)' }}>Donn&eacute;es mus&eacute;es en cours de collecte.</p>
            )}
          </>
        )}

        {/* ========== 5. ENCHÈRES ========== */}
        {activeTab === 'auctions' && (
          <>
            {country.auctionHouses && country.auctionHouses.length > 0 ? (
              <div className="countries-grid">
                {country.auctionHouses.map((ah, i) => (
                  <div key={i} className="info-card">
                    <div className="info-card-value" style={{ fontSize: '1.1rem' }}>{ah.name}</div>
                    <div className="info-card-sub">{ah.city}</div>
                    {ah.specialty && <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>{ah.specialty}</div>}
                    {ah.majorSales && ah.majorSales.length > 0 && (
                      <div style={{ marginTop: '0.5rem' }}>
                        <div style={{ fontSize: '0.6rem', color: 'var(--camel)', textTransform: 'uppercase', letterSpacing: '1px' }}>Ventes majeures</div>
                        {ah.majorSales.map((s, j) => (
                          <div key={j} style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>&bull; {s}</div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ color: 'var(--text-muted)' }}>Donn&eacute;es ench&egrave;res en cours de collecte.</p>
            )}
          </>
        )}

        {/* ========== 6. FOIRES ========== */}
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
            ) : (
              <p style={{ color: 'var(--text-muted)' }}>Aucune foire d&apos;art r&eacute;pertori&eacute;e.</p>
            )}
          </>
        )}

        {/* ========== 7. ART FINANCE ========== */}
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
            ) : (
              <div className="info-card">
                <div className="info-card-label">Art Finance</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  Donn&eacute;es Art Finance en cours de collecte pour ce pays.
                  Le march&eacute; mondial des pr&ecirc;ts art-backed est estim&eacute; &agrave; $34-40 Mds (2025).
                </div>
              </div>
            )}
          </>
        )}

        {/* ========== 8. RÉGLEMENTATION ========== */}
        {activeTab === 'regulation' && (
          <>
            {country.regulation ? (
              <div className="info-grid">
                {country.regulation.vatRate && (
                  <div className="info-card">
                    <div className="info-card-label">TVA / Taxe sur ventes art</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--hermes-text, #F5EDE3)' }}>{country.regulation.vatRate}</div>
                  </div>
                )}
                {country.regulation.droitDeSuite && (
                  <div className="info-card">
                    <div className="info-card-label">Droit de suite</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--hermes-text, #F5EDE3)' }}>{country.regulation.droitDeSuite}</div>
                  </div>
                )}
                {country.regulation.exportRules && (
                  <div className="info-card">
                    <div className="info-card-label">R&egrave;gles d&apos;export</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--hermes-text, #F5EDE3)' }}>{country.regulation.exportRules}</div>
                  </div>
                )}
                {country.regulation.importRules && (
                  <div className="info-card">
                    <div className="info-card-label">R&egrave;gles d&apos;import</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--hermes-text, #F5EDE3)' }}>{country.regulation.importRules}</div>
                  </div>
                )}
                {country.regulation.heritageProtection && (
                  <div className="info-card" style={{ gridColumn: 'span 2' }}>
                    <div className="info-card-label">Protection du patrimoine</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--hermes-text, #F5EDE3)' }}>{country.regulation.heritageProtection}</div>
                  </div>
                )}
                {country.regulation.antiMoneyLaundering && (
                  <div className="info-card">
                    <div className="info-card-label">Anti-blanchiment (AML)</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--hermes-text, #F5EDE3)' }}>{country.regulation.antiMoneyLaundering}</div>
                  </div>
                )}
                {country.regulation.culturalRestitution && (
                  <div className="info-card">
                    <div className="info-card-label">Restitution culturelle</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--hermes-text, #F5EDE3)' }}>{country.regulation.culturalRestitution}</div>
                  </div>
                )}
                {country.regulation.taxOnSales && (
                  <div className="info-card">
                    <div className="info-card-label">Fiscalit&eacute; ventes</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--hermes-text, #F5EDE3)' }}>{country.regulation.taxOnSales}</div>
                  </div>
                )}
              </div>
            ) : (
              <p style={{ color: 'var(--text-muted)' }}>Donn&eacute;es r&eacute;glementation en cours de collecte.</p>
            )}
          </>
        )}

        {/* ========== 9. COLLECTIONNEURS ========== */}
        {activeTab === 'collectors' && (
          <>
            {country.collectors && country.collectors.length > 0 ? (
              <div className="countries-grid">
                {country.collectors.map((col, i) => (
                  <div key={i} className="info-card">
                    <div className="info-card-value" style={{ fontSize: '1rem' }}>{col.name}</div>
                    {col.type && <div className="info-card-sub">{col.type}</div>}
                    {col.focus && <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>{col.focus}</div>}
                    {col.collectionSize && <div style={{ fontSize: '0.65rem', color: 'var(--camel)', marginTop: '0.15rem' }}>{col.collectionSize}</div>}
                    {col.publicAccess !== undefined && (
                      <div style={{ fontSize: '0.6rem', color: col.publicAccess ? 'var(--hermes-green, #5A8A3A)' : 'var(--text-faint)', marginTop: '0.15rem' }}>
                        {col.publicAccess ? 'Ouvert au public' : 'Collection priv\u00e9e'}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ color: 'var(--text-muted)' }}>Donn&eacute;es collectionneurs en cours de collecte.</p>
            )}
          </>
        )}

        {/* ========== 10. ÉDUCATION ========== */}
        {activeTab === 'education' && (
          <>
            {country.artEducation && country.artEducation.length > 0 ? (
              <table className="data-table">
                <thead>
                  <tr>
                    <th>&Eacute;cole</th>
                    <th>Ville</th>
                    <th>Type</th>
                  </tr>
                </thead>
                <tbody>
                  {country.artEducation.map((s, i) => (
                    <tr key={i}>
                      <td className="highlight">{s.name}</td>
                      <td>{s.city}</td>
                      <td>{s.type || '\u2014'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p style={{ color: 'var(--text-muted)' }}>Donn&eacute;es &eacute;coles d&apos;art en cours de collecte.</p>
            )}
          </>
        )}

        {/* ========== 11. DIWANE × EIGEN ========== */}
        {activeTab === 'eigen' && (
          <div className="info-grid">
            <div className="info-card" style={{ borderLeft: '3px solid var(--hermes-orange, #E8600A)' }}>
              <div className="info-card-label">BURHAN &mdash; Provenance Blockchain</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--hermes-text, #F5EDE3)' }}>
                Tra&ccedil;abilit&eacute; blockchain de la provenance des &oelig;uvres d&apos;art en {country.name}. Certificats num&eacute;riques immuables pour chaque transaction.
              </div>
            </div>
            <div className="info-card" style={{ borderLeft: '3px solid var(--hermes-orange, #E8600A)' }}>
              <div className="info-card-label">NOOS &mdash; Expertise IA</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--hermes-text, #F5EDE3)' }}>
                D&eacute;tection de faux par intelligence artificielle. Analyse stylistique, spectrom&eacute;trique et historique des &oelig;uvres du march&eacute; {country.name.toLowerCase()}.
              </div>
            </div>
            <div className="info-card" style={{ borderLeft: '3px solid var(--camel, #C19A6B)' }}>
              <div className="info-card-label">&AElig;LYA &mdash; Droits artistes</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--hermes-text, #F5EDE3)' }}>
                Protection des droits de reproduction et de consentement des artistes de {country.name}. Gestion des royalties num&eacute;riques.
              </div>
            </div>
            <div className="info-card" style={{ borderLeft: '3px solid var(--camel, #C19A6B)' }}>
              <div className="info-card-label">MYN&#949; &mdash; Marketplace Data Art</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--hermes-text, #F5EDE3)' }}>
                Marketplace de donn&eacute;es du march&eacute; de l&apos;art. Prix, tendances et analytics pour {country.name}.
              </div>
            </div>
            <div className="info-card" style={{ borderLeft: '3px solid var(--camel, #C19A6B)' }}>
              <div className="info-card-label">YrKnown &mdash; Savoir-faire restauration</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--hermes-text, #F5EDE3)' }}>
                Documentation des savoir-faire de restauration et d&apos;expertise tacite des artisans de {country.name}.
              </div>
            </div>
            <div className="info-card" style={{ borderLeft: '3px solid var(--hermes-orange, #E8600A)' }}>
              <div className="info-card-label">RAQIB &mdash; Intelligence march&eacute;</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--hermes-text, #F5EDE3)' }}>
                Intelligence compl&egrave;te du march&eacute; de l&apos;art de {country.name} : artistes, galeries, ench&egrave;res, collectionneurs, r&eacute;glementation.
              </div>
            </div>
            <div className="info-card" style={{ borderLeft: '3px solid var(--hermes-orange, #E8600A)', gridColumn: 'span 2' }}>
              <div className="info-card-label">MIZAN &mdash; Paiement multi-devises</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--hermes-text, #F5EDE3)' }}>
                Paiement s&eacute;curis&eacute; multi-devises pour les transactions d&apos;&oelig;uvres d&apos;art. {country.region === 'africa' ? 'Support des devises africaines locales et EUR/USD.' : 'Support EUR et devises internationales.'}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer Links */}
      <div className="link-row">
        <Link href="/diwane" className="link-button">Retour DIWANE</Link>
        <Link href="/diwane/compare" className="link-button">Comparateur march&eacute;s</Link>
        <Link href="/" className="link-button">Retour RAQIB</Link>
      </div>

      <footer className="diwane-footer">
        <p>RAQIB <span className="highlight">DIWANE</span> Art Market Intelligence &middot; Eigen SAS &middot; 2026</p>
      </footer>
    </div>
  );
}
