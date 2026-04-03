"use client";

import React, { useState } from 'react';
import { ConfianceShell } from '../../components/confiance/ConfianceShell';
import { ProofOfBeingView } from '../../components/confiance/views/ProofOfBeingView';
import { TrustPropagationView } from '../../components/confiance/views/TrustPropagationView';
import { AILabView } from '../../components/confiance/views/AILabView';
import { ThermoView } from '../../components/confiance/views/ThermoView';
import { DecayView } from '../../components/confiance/views/DecayView';
import { EntropyView } from '../../components/confiance/views/EntropyView';

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
