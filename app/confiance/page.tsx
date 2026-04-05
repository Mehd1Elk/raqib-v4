"use client";

import React, { useState } from 'react';
import { ConfianceShell } from '../../components/confiance/ConfianceShell';
import { ProofOfBeingView } from '../../components/confiance/views/ProofOfBeingView';
import { TrustPropagationView } from '../../components/confiance/views/TrustPropagationView';
import { AILabView } from '../../components/confiance/views/AILabView';
import { ThermoView } from '../../components/confiance/views/ThermoView';
import { DecayView } from '../../components/confiance/views/DecayView';
import { EntropyView } from '../../components/confiance/views/EntropyView';
import { ArbitrageView } from '../../components/confiance/views/ArbitrageView';
import { EconomicsView } from '../../components/confiance/views/EconomicsView';
import { ForcingFunctionsView } from '../../components/confiance/views/ForcingFunctionsView';
import { AdversarialWatchView } from '../../components/confiance/views/AdversarialWatchView';
import { TrustDeficitView } from '../../components/confiance/views/TrustDeficitView';
import { CompetitiveView } from '../../components/confiance/views/CompetitiveView';

export default function ConfiancePage() {
  const [activeTab, setActiveTab] = useState(1);

  const renderContent = () => {
    switch (activeTab) {
      case 1:
        return <ProofOfBeingView />;
      case 2:
        return <TrustPropagationView />;
      case 3:
        return <AILabView />;
      case 4:
        return <ThermoView />;
      case 5:
        return <DecayView />;
      case 6:
        return <EntropyView />;
      case 7:
        return <ArbitrageView />;
      case 8:
        return <EconomicsView />;
      case 9:
        return <ForcingFunctionsView />;
      case 10:
        return <AdversarialWatchView />;
      case 11:
        return <TrustDeficitView />;
      case 12:
        return <CompetitiveView />;
      default:
        return (
          <div style={{ color: 'rgba(200, 196, 188, 0.30)', fontFamily: "'DM Sans', sans-serif" }}>
            Vue en cours de construction...
          </div>
        );
    }
  };

  return (
    <ConfianceShell activeTab={activeTab} setActiveTab={setActiveTab}>
      {renderContent()}
    </ConfianceShell>
  );
}
