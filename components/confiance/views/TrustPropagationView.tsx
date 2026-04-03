"use client";

import React, { useState } from 'react';
import { CONFIANCE_COLORS, CONFIANCE_STYLES, CONFIANCE_TYPOGRAPHY } from '../shared/constants';

interface TierData {
  id: number;
  name: string;
  totalSuppliers: number;
  trustFloor: number;
  holesPercentage: number;
  auditCost: string;
  burhanCost: string;
  nodes: { id: string; status: 'CERTIFIED' | 'PARTIAL' | 'UNCERTIFIED' | 'UNKNOWN' }[];
}

const MOCK_CASCADE = {
  anchor: { name: 'TotalEnergies', score: 94 },
  tiers: [
    {
      id: 1, name: 'Tier 1 — Direct Suppliers', totalSuppliers: 450, trustFloor: 85, holesPercentage: 2, auditCost: '4.5M €', burhanCost: '120K €',
      nodes: [
        { id: '1-1', status: 'CERTIFIED' as const }, { id: '1-2', status: 'CERTIFIED' as const }, 
        { id: '1-3', status: 'PARTIAL' as const }, { id: '1-4', status: 'CERTIFIED' as const }, 
        { id: '1-5', status: 'CERTIFIED' as const }
      ]
    },
    {
      id: 2, name: 'Tier 2 — Sub-contractors', totalSuppliers: 1200, trustFloor: 65, holesPercentage: 15, auditCost: '18M €', burhanCost: '250K €',
      nodes: [
        { id: '2-1', status: 'PARTIAL' as const }, { id: '2-2', status: 'UNCERTIFIED' as const }, 
        { id: '2-3', status: 'CERTIFIED' as const }, { id: '2-4', status: 'PARTIAL' as const }, 
        { id: '2-5', status: 'UNKNOWN' as const }
    ]
    },
    {
      id: 3, name: 'Tier 3 — Raw Materials', totalSuppliers: 3500, trustFloor: 40, holesPercentage: 45, auditCost: 'Impraticable', burhanCost: '500K €',
      nodes: [
        { id: '3-1', status: 'UNCERTIFIED' as const }, { id: '3-2', status: 'UNKNOWN' as const }, 
        { id: '3-3', status: 'PARTIAL' as const }, { id: '3-4', status: 'UNKNOWN' as const }, 
        { id: '3-5', status: 'UNCERTIFIED' as const }
      ]
    },
    {
      id: 4, name: 'Tier 4 — Opaque origins', totalSuppliers: 8000, trustFloor: 12, holesPercentage: 88, auditCost: 'Impossible', burhanCost: '1M €',
      nodes: [
        { id: '4-1', status: 'UNKNOWN' as const }, { id: '4-2', status: 'UNKNOWN' as const }, 
        { id: '4-3', status: 'UNKNOWN' as const }, { id: '4-4', status: 'UNCERTIFIED' as const }, 
        { id: '4-5', status: 'UNKNOWN' as const }
      ]
    }
  ]
};

export const TrustPropagationView: React.FC = () => {
  const [selectedTier, setSelectedTier] = useState<TierData | null>(null);

  const getNodeColor = (status: string) => {
    switch(status) {
      case 'CERTIFIED': return CONFIANCE_COLORS.scores.green;
      case 'PARTIAL': return CONFIANCE_COLORS.scores.orange;
      case 'UNCERTIFIED': return CONFIANCE_COLORS.scores.red;
      case 'UNKNOWN': return 'transparent';
      default: return CONFIANCE_COLORS.scores.green;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', alignItems: 'center' }}>
      <style>{`
        @keyframes blinkRed {
          0% { border-color: ${CONFIANCE_COLORS.accent.alert}; box-shadow: 0 0 10px ${CONFIANCE_COLORS.accent.alert}; }
          50% { border-color: transparent; box-shadow: none; }
          100% { border-color: ${CONFIANCE_COLORS.accent.alert}; box-shadow: 0 0 10px ${CONFIANCE_COLORS.accent.alert}; }
        }
      `}</style>
      
      <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
        <h2 style={{ ...CONFIANCE_TYPOGRAPHY.sectionTitles, color: CONFIANCE_COLORS.text.primary, margin: 0 }}>
          Trust Propagation — Supply Chain Cascade
        </h2>
      </div>

      <div style={{ display: 'flex', width: '100%', gap: '32px' }}>
        {/* CASCADE VISUALIZATION */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '40px', position: 'relative' }}>
          
          {/* ANCHOR */}
          <div style={{ 
            width: '120px', height: '120px', borderRadius: '50%', 
            backgroundColor: CONFIANCE_COLORS.background.card,
            border: `2px solid ${CONFIANCE_COLORS.scores.green}`,
            boxShadow: `0 0 30px ${CONFIANCE_COLORS.scores.green}40`,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            zIndex: 2
          }}>
            <div style={{ ...CONFIANCE_TYPOGRAPHY.subtitles, color: CONFIANCE_COLORS.text.primary }}>{MOCK_CASCADE.anchor.name}</div>
            <div style={{ ...CONFIANCE_TYPOGRAPHY.scores, fontSize: '24px', color: CONFIANCE_COLORS.scores.green }}>{MOCK_CASCADE.anchor.score}</div>
          </div>

          {/* TIERS */}
          {MOCK_CASCADE.tiers.map((tier, idx) => (
            <div key={tier.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', position: 'relative' }}>
              {/* SVG Link to previous row */}
              <svg style={{ position: 'absolute', top: '-40px', left: 0, width: '100%', height: '40px', zIndex: 1 }}>
                <path d="M 50% 0 L 50% 40" stroke={CONFIANCE_COLORS.border} strokeWidth="2" opacity={1 - (idx * 0.2)} />
                <path d="M 50% 0 L 20% 40" stroke={CONFIANCE_COLORS.border} strokeWidth="1" opacity={(1 - (idx * 0.2)) * 0.5} />
                <path d="M 50% 0 L 80% 40" stroke={CONFIANCE_COLORS.border} strokeWidth="1" opacity={(1 - (idx * 0.2)) * 0.5} />
              </svg>

              <div 
                onClick={() => setSelectedTier(tier)}
                style={{ 
                  display: 'flex', gap: '24px', padding: '16px 32px', cursor: 'pointer',
                  backgroundColor: selectedTier?.id === tier.id ? 'rgba(255,255,255,0.02)' : 'transparent',
                  borderRadius: CONFIANCE_STYLES.borderRadius,
                  border: selectedTier?.id === tier.id ? `1px solid ${CONFIANCE_COLORS.accent.proof}` : '1px solid transparent',
                  zIndex: 2
                }}
              >
                {tier.nodes.map(node => (
                  <div 
                    key={node.id} 
                    style={{
                      width: '40px', height: '40px', borderRadius: '50%',
                      backgroundColor: node.status === 'UNKNOWN' ? 'transparent' : getNodeColor(node.status),
                      border: node.status === 'UNKNOWN' ? '2px solid transparent' : 'none',
                      animation: node.status === 'UNKNOWN' ? 'blinkRed 1.5s infinite' : 'none',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: CONFIANCE_COLORS.text.primary,
                      fontSize: '10px',
                      ...CONFIANCE_TYPOGRAPHY.labels
                    }}
                  >
                    {node.status === 'UNKNOWN' ? '???' : ''}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* DETAILS PANEL */}
        {selectedTier && (
          <div style={{ 
            width: '350px', backgroundColor: CONFIANCE_COLORS.background.card, 
            border: CONFIANCE_STYLES.border, borderRadius: CONFIANCE_STYLES.borderRadius,
            padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px',
            boxShadow: CONFIANCE_STYLES.glow
          }}>
            <h3 style={{ ...CONFIANCE_TYPOGRAPHY.sectionTitles, color: CONFIANCE_COLORS.text.primary, margin: 0 }}>
              {selectedTier.name}
            </h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: CONFIANCE_STYLES.separator, paddingBottom: '8px' }}>
                <span style={{ ...CONFIANCE_TYPOGRAPHY.labels, color: CONFIANCE_COLORS.text.secondary }}>Total Fournisseurs</span>
                <span style={{ ...CONFIANCE_TYPOGRAPHY.tableData, color: CONFIANCE_COLORS.text.primary }}>{selectedTier.totalSuppliers}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: CONFIANCE_STYLES.separator, paddingBottom: '8px' }}>
                <span style={{ ...CONFIANCE_TYPOGRAPHY.labels, color: CONFIANCE_COLORS.text.secondary }}>Trust Floor Dérivé</span>
                <span style={{ ...CONFIANCE_TYPOGRAPHY.scores, color: selectedTier.trustFloor > 50 ? CONFIANCE_COLORS.scores.green : selectedTier.trustFloor > 20 ? CONFIANCE_COLORS.scores.orange : CONFIANCE_COLORS.scores.red }}>{selectedTier.trustFloor}%</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: CONFIANCE_STYLES.separator, paddingBottom: '8px' }}>
                <span style={{ ...CONFIANCE_TYPOGRAPHY.labels, color: CONFIANCE_COLORS.text.secondary }}>Trous de certification</span>
                <span style={{ ...CONFIANCE_TYPOGRAPHY.scores, color: CONFIANCE_COLORS.accent.alert }}>{selectedTier.holesPercentage}%</span>
              </div>
              
              <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ ...CONFIANCE_TYPOGRAPHY.subtitles, color: CONFIANCE_COLORS.text.primary }}>Comparatif Coûts d'Audit</div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ ...CONFIANCE_TYPOGRAPHY.labels, color: CONFIANCE_COLORS.text.tertiary }}>Audit Manuel Traditionnel</span>
                  <span style={{ ...CONFIANCE_TYPOGRAPHY.tableData, color: CONFIANCE_COLORS.text.secondary }}>{selectedTier.auditCost}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', backgroundColor: 'rgba(0, 212, 184, 0.1)', padding: '8px', borderRadius: '4px' }}>
                  <span style={{ ...CONFIANCE_TYPOGRAPHY.labels, color: CONFIANCE_COLORS.accent.proof }}>Passage via BURHAN SDK</span>
                  <span style={{ ...CONFIANCE_TYPOGRAPHY.scores, color: CONFIANCE_COLORS.accent.proof }}>{selectedTier.burhanCost}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
