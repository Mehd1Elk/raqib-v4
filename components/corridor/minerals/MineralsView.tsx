'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { MINERALS_TABS } from './minerals-data';
import { MineralsOverview } from './MineralsOverview';
import { MineralsCountries } from './MineralsCountries';
import { MineralsIndustries } from './MineralsIndustries';
import { MineralsSupplyChain } from './MineralsSupplyChain';
import { MineralsGeopolitics } from './MineralsGeopolitics';
import { MineralsExchange } from './MineralsExchange';
import { MadenVenture } from './MadenVenture';

const MineralsMap = dynamic(() => import('./MineralsMap'), { ssr: false });

export function MineralsView() {
  const [activeTab, setActiveTab] = useState('overview');

  function renderTab() {
    switch (activeTab) {
      case 'overview': return <MineralsOverview />;
      case 'carte': return <MineralsMap />;
      case 'pays': return <MineralsCountries />;
      case 'industries': return <MineralsIndustries />;
      case 'supply': return <MineralsSupplyChain />;
      case 'geo': return <MineralsGeopolitics />;
      case 'bourse': return <MineralsExchange />;
      case 'maden': return <MadenVenture />;
      default: return <MineralsOverview />;
    }
  }

  return (
    <div>
      {/* Mineral sub-tabs */}
      <div className="tabs-container" style={{ marginBottom: '1rem' }}>
        <div className="tabs">
          {MINERALS_TABS.map(t => (
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

      {/* Tab content */}
      <div className="tab-content active">
        {renderTab()}
      </div>
    </div>
  );
}
