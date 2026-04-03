"use client";

import React, { useState } from 'react';
import { CONFIANCE_COLORS, CONFIANCE_TYPOGRAPHY, CONFIANCE_STYLES } from './shared/constants';

interface ConfianceShellProps {
  children: React.ReactNode;
  activeTab: number;
  setActiveTab: (tab: number) => void;
}

const TABS = [
  { id: 1, label: 'Proof of Being', icon: '◈' },
  { id: 2, label: 'Trust Propagation', icon: '◎' },
  { id: 3, label: 'AI Authentication Lab', icon: '⬡' },
  { id: 4, label: 'Thermodynamique', icon: '≡' },
  { id: 5, label: 'Decay & Dead Man', icon: '◉' },
  { id: 6, label: "Matrice d'Entropie", icon: '∂' },
  { id: 7, label: 'Trust Arbitrage', icon: '△' },
  { id: 8, label: 'Trust Economics', icon: '◆' },
  { id: 9, label: 'Forcing Functions', icon: '§' },
  { id: 10, label: 'Adversarial Watch', icon: '⚡' },
  { id: 11, label: 'Trust Deficit Mondial', icon: '⊕' },
  { id: 12, label: 'Competitive Landscape', icon: '⊞' },
];

export const ConfianceShell: React.FC<ConfianceShellProps> = ({ children, activeTab, setActiveTab }) => {
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString('fr-FR'));

  React.useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date().toLocaleTimeString('fr-FR')), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw', backgroundColor: CONFIANCE_COLORS.background.content, color: CONFIANCE_COLORS.text.primary, overflow: 'hidden' }}>
      
      {/* SIDEBAR */}
      <aside style={{ width: '260px', backgroundColor: CONFIANCE_COLORS.background.sidebar, borderRight: CONFIANCE_STYLES.separator, display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '4px', borderBottom: CONFIANCE_STYLES.separator }}>
          <div style={{ 
            fontFamily: "'Cormorant Garamond', serif", 
            fontSize: '20px', 
            fontWeight: 300, 
            letterSpacing: '3px', 
            textTransform: 'uppercase',
            color: CONFIANCE_COLORS.accent.proof 
          }}>
            Confiance
          </div>
          <div style={{ fontSize: '14px', color: 'rgba(0, 212, 184, 0.40)' }}>
            برهان
          </div>
        </div>

        <nav style={{ flex: 1, overflowY: 'auto', padding: '16px 0' }}>
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 24px',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: activeTab === tab.id ? CONFIANCE_COLORS.accent.proof : CONFIANCE_COLORS.text.secondary,
                borderLeft: activeTab === tab.id ? `3px solid ${CONFIANCE_COLORS.accent.proof}` : '3px solid transparent',
                backgroundColor: activeTab === tab.id ? 'rgba(0, 212, 184, 0.05)' : 'transparent',
                textAlign: 'left'
              }}
            >
              <span style={{ fontSize: '16px', fontWeight: activeTab === tab.id ? 600 : 400 }}>{tab.icon}</span>
              <span style={{ ...CONFIANCE_TYPOGRAPHY.subtitles }}>{tab.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative' }}>
        
        {/* HEADER */}
        <header style={{ height: '60px', borderBottom: CONFIANCE_STYLES.separator, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px', backgroundColor: CONFIANCE_COLORS.background.content }}>
          <div style={{ ...CONFIANCE_TYPOGRAPHY.sectionTitles, color: CONFIANCE_COLORS.text.primary, letterSpacing: '1px' }}>
            {TABS.find(t => t.id === activeTab)?.label}
          </div>
          <div style={{ ...CONFIANCE_TYPOGRAPHY.tableData, color: CONFIANCE_COLORS.text.secondary }}>
            {currentTime} UTC
          </div>
        </header>

        {/* CONTENT */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
          {children}
        </div>

        {/* FOOTER */}
        <footer style={{ height: '40px', borderTop: CONFIANCE_STYLES.separator, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px', backgroundColor: CONFIANCE_COLORS.background.content }}>
          <div style={{ ...CONFIANCE_TYPOGRAPHY.labels, color: CONFIANCE_COLORS.text.tertiary }}>
            RAQIB V4 · INTELLIGENCE DE LA CONFIANCE · PROOF-TO-BE
          </div>
          <div style={{ ...CONFIANCE_TYPOGRAPHY.labels, color: CONFIANCE_COLORS.accent.certification }}>
            CRIT DE LA CONFIANCE NUMÉRIQUE
          </div>
        </footer>
      </main>

    </div>
  );
};
