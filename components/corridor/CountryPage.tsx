'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { ALL_COUNTRIES, COUNTRY_TABS, EU_TABS } from '../../lib/corridor/data';
import { FlagIcon } from './FlagIcon';
import { RecommendationBadge } from './RecommendationBadge';
import { OverviewTab } from './tabs/OverviewTab';
import { MineralsTab } from './tabs/MineralsTab';
import { IndustriesTab } from './tabs/IndustriesTab';
import { EnterprisesTab } from './tabs/EnterprisesTab';
import { BillionairesTab } from './tabs/BillionairesTab';
import { LeadersTab } from './tabs/LeadersTab';
import { ContactsTab } from './tabs/ContactsTab';
import { UniversitiesTab } from './tabs/UniversitiesTab';
import { LogisticsTab } from './tabs/LogisticsTab';
import { TradeTab } from './tabs/TradeTab';
import { DemographicsTab } from './tabs/DemographicsTab';
import { RisksTab } from './tabs/RisksTab';
import type { Country } from '../../lib/corridor/types';

interface CountryPageProps {
  countryId: string;
}

export function CountryPage({ countryId }: CountryPageProps) {
  const country = useMemo(() => ALL_COUNTRIES.find(c => c.id === countryId.toUpperCase()), [countryId]);
  const [activeTab, setActiveTab] = useState('overview');

  if (!country) {
    return (
      <div className="corridor-main-content">
        <div className="container" style={{ padding: '4rem 2rem', textAlign: 'center' }}>
          <h2 style={{ color: 'var(--gold)', fontFamily: 'var(--font-display)' }}>Pays non trouvé</h2>
          <p style={{ color: 'var(--text-muted)', marginTop: '1rem' }}>Le code pays &quot;{countryId}&quot; n&apos;existe pas dans la base RAQIB.</p>
          <Link href="/corridor" className="back-btn" style={{ marginTop: '2rem', display: 'inline-flex' }}>
            Retour au dashboard
          </Link>
        </div>
      </div>
    );
  }

  const isEU = country.region === 'eu';
  const tabs = isEU ? EU_TABS : COUNTRY_TABS;
  const reco = country.recommendation || (country.riskScore <= 3 ? 'Investir' : country.riskScore <= 6 ? 'Observer' : 'Prudence');

  function renderTab() {
    switch (activeTab) {
      case 'overview': return <OverviewTab country={country as Country} />;
      case 'minerals': return <MineralsTab country={country as Country} />;
      case 'industries': return <IndustriesTab country={country as Country} />;
      case 'enterprises': return <EnterprisesTab country={country as Country} />;
      case 'billionaires': return <BillionairesTab country={country as Country} />;
      case 'leaders': return <LeadersTab country={country as Country} />;
      case 'contacts': return <ContactsTab country={country as Country} />;
      case 'universities': return <UniversitiesTab country={country as Country} />;
      case 'logistics': return <LogisticsTab country={country as Country} />;
      case 'trade': return <TradeTab country={country as Country} />;
      case 'demographics': return <DemographicsTab country={country as Country} />;
      case 'risks': return <RisksTab country={country as Country} />;
      default: return <p style={{ color: 'var(--text-muted)' }}>Section non disponible</p>;
    }
  }

  return (
    <>
      <header className="corridor-header">
        <div className="header-top">
          <Link href="/corridor" className="header-logo">
            RAQIB <span>Corridor Intelligence</span>
          </Link>
          <div className="eigen-badges">
            <span className="eigen-badge">Module MADEN</span>
            <span className="eigen-badge">Eigen SAS</span>
          </div>
        </div>
      </header>

      <div className="corridor-main-content">
        <div className="container">
          <Link href="/corridor" className="back-btn" style={{ marginTop: '1rem', display: 'inline-flex' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            Retour au dashboard
          </Link>

          <div className="raqib-update-banner">
            Données compilées par RAQIB — Dernière mise à jour : {new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
          </div>

          <div className="country-page-header">
            <div className="country-page-flag">
              <FlagIcon code={country.id} size={72} />
            </div>
            <div className="country-page-title">
              <h1>{country.name}</h1>
              <div className="subtitle">{country.officialName || country.name} · {country.capital || ''}</div>
            </div>
            <div style={{ marginLeft: 'auto' }}>
              <RecommendationBadge recommendation={reco} />
            </div>
          </div>

          <div className="tabs-container">
            <div className="tabs">
              {tabs.map(t => (
                <button
                  key={t.id}
                  className={`tab ${activeTab === t.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(t.id)}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div className="tab-content active">
            {renderTab()}
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
