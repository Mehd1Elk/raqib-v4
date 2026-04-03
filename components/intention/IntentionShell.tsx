"use client";

import React, { useState, useEffect } from 'react';
import { BLOOMBERG_PRUNE_COLORS, COMMON_STYLES } from './shared/constants';
import ObservatoryView from './views/ObservatoryView';
import PricingEngineView from './views/PricingEngineView';
import IntentionBourseView from './views/IntentionBourseView';
import ComplianceView from './views/ComplianceView';
import AelyaDashboardView from './views/AelyaDashboardView';
import TransactionLedgerView from './views/TransactionLedgerView';
import IntentionMarketplaceView from './views/IntentionMarketplaceView';
import CorridorFlowsView from './views/CorridorFlowsView';
import ParadigmComparatorView from './views/ParadigmComparatorView';
import CompetitiveLandscapeView from './views/CompetitiveLandscapeView';

const TABS = [
  { id: 'observatory', label: 'Observatoire', icon: '◉' },
  { id: 'pricing', label: 'Pricing Engine', icon: '◆' },
  { id: 'bourse', label: 'Bourse des Intentions', icon: '◈' },
  { id: 'compliance', label: 'Compliance Matrix', icon: '◇' },
  { id: 'aelya', label: 'ÆLYA Performance', icon: '◎' },
  { id: 'ledger', label: 'Transaction Ledger', icon: '⊕' },
  { id: 'marketplace', label: 'Intention Marketplace', icon: '◊' },
  { id: 'corridor', label: 'Corridor Data Flows', icon: '▸' },
  { id: 'paradigme', label: 'Comparateur Paradigme', icon: '⊘' },
  { id: 'competitive', label: 'Competitive Landscape', icon: '⊞' },
];

export default function IntentionShell() {
  const [activeTab, setActiveTab] = useState('observatory');
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('fr-FR', {
        hour: '2-digit', minute: '2-digit', second: '2-digit'
      }) + ' UTC');
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const renderActiveView = () => {
    switch (activeTab) {
      case 'observatory': return <ObservatoryView />;
      case 'pricing': return <PricingEngineView />;
      case 'bourse': return <IntentionBourseView />;
      case 'compliance': return <ComplianceView />;
      case 'aelya': return <AelyaDashboardView />;
      case 'ledger': return <TransactionLedgerView />;
      case 'marketplace': return <IntentionMarketplaceView />;
      case 'corridor': return <CorridorFlowsView />;
      case 'paradigme': return <ParadigmComparatorView />;
      case 'competitive': return <CompetitiveLandscapeView />;
      default: return (
        <div className="flex h-full items-center justify-center pt-20">
          <p style={{ ...COMMON_STYLES.categoryLabel, color: BLOOMBERG_PRUNE_COLORS.textSecondary }}>
            MODULE EN COURS DE DÉPLOIEMENT...
          </p>
        </div>
      );
    }
  };

  return (
    <div className="flex h-screen w-full overflow-hidden" style={{ backgroundColor: BLOOMBERG_PRUNE_COLORS.contentBg, color: BLOOMBERG_PRUNE_COLORS.textMain }}>
      {/* SIDEBAR */}
      <div 
        className="w-64 flex flex-col flex-shrink-0" 
        style={{ 
          backgroundColor: BLOOMBERG_PRUNE_COLORS.sidebarBg,
          borderRight: `1px solid ${BLOOMBERG_PRUNE_COLORS.border}`
        }}
      >
        <div className="py-8 px-6 flex flex-col items-center border-b" style={{ ...COMMON_STYLES.separator }}>
          <h1 style={{ 
            fontFamily: '"Playfair Display", serif',
            fontSize: '20px',
            fontWeight: 400,
            textTransform: 'uppercase',
            letterSpacing: '3px',
            color: '#FFFFFF'
          }}>
            Intention
          </h1>
          <span style={{ fontSize: '14px', color: 'rgba(228,212,234,0.40)', marginTop: '4px' }}>
            نية
          </span>
        </div>

        <nav className="flex-1 overflow-y-auto py-4">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="w-full text-left px-5 py-3 transition-colors flex items-center space-x-3 outline-none"
                style={{
                  backgroundColor: isActive ? 'rgba(228,212,234,0.05)' : 'transparent',
                  borderLeft: `2px solid ${isActive ? BLOOMBERG_PRUNE_COLORS.textMain : 'transparent'}`,
                  ...COMMON_STYLES.categoryLabel,
                  color: isActive ? BLOOMBERG_PRUNE_COLORS.textMain : BLOOMBERG_PRUNE_COLORS.textSecondary,
                  letterSpacing: '1px' // slight override for tabs
                }}
              >
                <span className="text-sm">{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col relative h-full overflow-hidden">
        
        {/* HEADER */}
        <header 
          className="h-16 flex items-center justify-between px-6 flex-shrink-0"
          style={{ ...COMMON_STYLES.separator, backgroundColor: BLOOMBERG_PRUNE_COLORS.sidebarBg }}
        >
          <div style={COMMON_STYLES.sectionTitle}>
            {TABS.find(t => t.id === activeTab)?.label}
          </div>
          <div className="flex items-center space-x-6">
            <span style={{ ...COMMON_STYLES.categoryLabel, color: BLOOMBERG_PRUNE_COLORS.accentPositive }}>
              SYSTEM OPERATIONAL
            </span>
            <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '12px', color: BLOOMBERG_PRUNE_COLORS.textSecondary }}>
              {currentTime}
            </span>
          </div>
        </header>

        {/* TICKER BANDEAU */}
        <div 
          className="h-8 flex items-center overflow-hidden flex-shrink-0"
          style={{ 
            backgroundColor: BLOOMBERG_PRUNE_COLORS.cardBg,
            ...COMMON_STYLES.separator 
          }}
        >
          <div className="whitespace-nowrap flex space-x-8 animate-marquee" style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '10px' }}>
            <span style={{ color: BLOOMBERG_PRUNE_COLORS.textMain }}>
              CRÉDIT IMMO CASA <span style={{ color: BLOOMBERG_PRUNE_COLORS.accentPositive }}>€42 ↑8%</span>
            </span>
            <span style={{ color: BLOOMBERG_PRUNE_COLORS.textSecondary }}>·</span>
            <span style={{ color: BLOOMBERG_PRUNE_COLORS.textMain }}>
              ASSURANCE AUTO DAKAR <span style={{ color: BLOOMBERG_PRUNE_COLORS.accentNegative }}>€12 ↓3%</span>
            </span>
            <span style={{ color: BLOOMBERG_PRUNE_COLORS.textSecondary }}>·</span>
            <span style={{ color: BLOOMBERG_PRUNE_COLORS.textMain }}>
              EMPLOI TECH PARIS <span style={{ color: BLOOMBERG_PRUNE_COLORS.accentPositive }}>€28 ↑15%</span>
            </span>
            <span style={{ color: BLOOMBERG_PRUNE_COLORS.textSecondary }}>·</span>
            <span style={{ color: BLOOMBERG_PRUNE_COLORS.textMain }}>
              SANTÉ MENTALE FR <span style={{ color: BLOOMBERG_PRUNE_COLORS.accentPositive }}>€35 ↑22%</span>
            </span>
            
            {/* DUPLICATE FOR INFINITE EFFECT */}
            <span style={{ color: BLOOMBERG_PRUNE_COLORS.textSecondary }}>·</span>
            <span style={{ color: BLOOMBERG_PRUNE_COLORS.textMain }}>
              CRÉDIT IMMO CASA <span style={{ color: BLOOMBERG_PRUNE_COLORS.accentPositive }}>€42 ↑8%</span>
            </span>
            <span style={{ color: BLOOMBERG_PRUNE_COLORS.textSecondary }}>·</span>
            <span style={{ color: BLOOMBERG_PRUNE_COLORS.textMain }}>
              ASSURANCE AUTO DAKAR <span style={{ color: BLOOMBERG_PRUNE_COLORS.accentNegative }}>€12 ↓3%</span>
            </span>
            <span style={{ color: BLOOMBERG_PRUNE_COLORS.textSecondary }}>·</span>
            <span style={{ color: BLOOMBERG_PRUNE_COLORS.textMain }}>
              EMPLOI TECH PARIS <span style={{ color: BLOOMBERG_PRUNE_COLORS.accentPositive }}>€28 ↑15%</span>
            </span>
            <span style={{ color: BLOOMBERG_PRUNE_COLORS.textSecondary }}>·</span>
            <span style={{ color: BLOOMBERG_PRUNE_COLORS.textMain }}>
              SANTÉ MENTALE FR <span style={{ color: BLOOMBERG_PRUNE_COLORS.accentPositive }}>€35 ↑22%</span>
            </span>
          </div>
        </div>

        {/* CONTENT AREA */}
        <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
          {renderActiveView()}
        </div>

        {/* FOOTER */}
        <footer 
          className="h-10 flex items-center justify-between px-6 flex-shrink-0"
          style={{ 
            backgroundColor: BLOOMBERG_PRUNE_COLORS.sidebarBg,
            borderTop: `1px solid ${BLOOMBERG_PRUNE_COLORS.border}`
          }}
        >
          <div style={{ ...COMMON_STYLES.categoryLabel, color: BLOOMBERG_PRUNE_COLORS.textTertiary }}>
            RAQIB V4 · INTELLIGENCE DE L'INTENTION · ÉCONOMIE DE L'INTENTION
          </div>
          <div style={{ ...COMMON_STYLES.categoryLabel, color: BLOOMBERG_PRUNE_COLORS.textTertiary }}>
            BLOOMBERG DES DONNÉES
          </div>
        </footer>

        {/* Add custom keyframes for marquee directly inside the component scope or require it in global styles.
            Tailwind usually doesn't have animate-marquee without config. We'll add inline style for the animation. */}
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            display: inline-flex;
            animation: marquee 20s linear infinite;
            padding-left: 2rem;
          }
          .animate-marquee:hover {
            animation-play-state: paused;
          }
          .scrollbar-hide::-webkit-scrollbar {
              display: none;
          }
          .scrollbar-hide {
              -ms-overflow-style: none;
              scrollbar-width: none;
          }
        `}} />
      </div>
    </div>
  );
}
