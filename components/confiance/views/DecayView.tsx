"use client";

import React, { useState, useEffect } from 'react';
import { CONFIANCE_COLORS, CONFIANCE_STYLES, CONFIANCE_TYPOGRAPHY } from '../shared/constants';
import { DecayBar } from '../shared/DecayBar';
import { DECAY_SECTORS_MOCK } from '../shared/mock-data';

export const DecayView: React.FC = () => {
  const [sectors, setSectors] = useState(DECAY_SECTORS_MOCK);
  const [months, setMonths] = useState(1);
  const [selectedSector, setSelectedSector] = useState<typeof DECAY_SECTORS_MOCK[0] | null>(null);

  useEffect(() => {
    const fetchDecay = async () => {
      try {
        const res = await fetch('/api/confiance/decay');
        if (res.ok) {
          const apiData = await res.json();
          if (apiData.length > 0) setSectors(apiData);
        }
      } catch (e) { /* fallback already set */ }
    };
    fetchDecay();
  }, []);

  const calculateResidual = (lambda: number, m: number) => {
    // T(t) = T(0) * e^(-lambda * t)
    return Math.max(0, 100 * Math.exp(-lambda * m));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <style>{`
        @keyframes flashRed {
          0% { background-color: ${CONFIANCE_COLORS.accent.alert}; color: #FFF; box-shadow: 0 0 15px ${CONFIANCE_COLORS.accent.alert}; }
          50% { background-color: transparent; color: ${CONFIANCE_COLORS.accent.alert}; box-shadow: none; }
          100% { background-color: ${CONFIANCE_COLORS.accent.alert}; color: #FFF; box-shadow: 0 0 15px ${CONFIANCE_COLORS.accent.alert}; }
        }
      `}</style>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ ...CONFIANCE_TYPOGRAPHY.sectionTitles, color: CONFIANCE_COLORS.text.primary, margin: 0 }}>
          Simulateur de Décroissance (Entropy Decay)
        </h2>
        <div style={{ ...CONFIANCE_TYPOGRAPHY.scores, color: CONFIANCE_COLORS.accent.proof, fontSize: '24px' }}>
          T0 + {months} MOIS
        </div>
      </div>

      <div style={{ backgroundColor: CONFIANCE_COLORS.background.card, padding: '24px', borderRadius: CONFIANCE_STYLES.borderRadius, border: CONFIANCE_STYLES.border }}>
        <input 
          type="range" 
          min="1" max="24" 
          value={months} 
          onChange={(e) => setMonths(Number(e.target.value))}
          style={{ width: '100%', cursor: 'pointer', accentColor: CONFIANCE_COLORS.accent.decay }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px', ...CONFIANCE_TYPOGRAPHY.labels, color: CONFIANCE_COLORS.text.tertiary }}>
          <span>M1</span>
          <span>M6</span>
          <span>M12</span>
          <span>M18</span>
          <span>M24</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(400px, 1fr) 1fr', gap: '32px' }}>
        
        {/* BARS */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {sectors.map(sec => {
            const residual = calculateResidual(sec.lambda, months);
            const isDead = residual < 30;

            return (
              <div 
                key={sec.id}
                onClick={() => setSelectedSector(sec)}
                style={{ 
                  backgroundColor: CONFIANCE_COLORS.background.card, 
                  padding: '16px', 
                  borderRadius: CONFIANCE_STYLES.borderRadius, 
                  border: selectedSector?.id === sec.id ? `1px solid ${CONFIANCE_COLORS.accent.proof}` : CONFIANCE_STYLES.border,
                  cursor: 'pointer',
                  display: 'flex', flexDirection: 'column', gap: '12px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ ...CONFIANCE_TYPOGRAPHY.subtitles, color: CONFIANCE_COLORS.text.primary }}>{sec.name}</span>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    {isDead && (
                      <span style={{ 
                        ...CONFIANCE_TYPOGRAPHY.labels, 
                        border: `1px solid ${CONFIANCE_COLORS.accent.alert}`, 
                        padding: '2px 6px', borderRadius: '4px',
                        animation: 'flashRed 1s infinite'
                      }}>
                        DEAD MAN
                      </span>
                    )}
                    <span style={{ ...CONFIANCE_TYPOGRAPHY.scores, color: isDead ? CONFIANCE_COLORS.accent.alert : CONFIANCE_COLORS.text.primary }}>
                      {residual.toFixed(1)}%
                    </span>
                  </div>
                </div>
                <DecayBar percentage={residual} lambda={sec.lambda} />
              </div>
            );
          })}
        </div>

        {/* DETAILS */}
        {selectedSector && (
          <div style={{ 
            backgroundColor: CONFIANCE_COLORS.background.card, 
            padding: '32px', 
            borderRadius: CONFIANCE_STYLES.borderRadius, 
            border: `1px solid ${CONFIANCE_COLORS.border}`,
            display: 'flex', flexDirection: 'column', gap: '24px',
            alignSelf: 'start', position: 'sticky', top: '24px'
          }}>
            <h3 style={{ ...CONFIANCE_TYPOGRAPHY.sectionTitles, color: CONFIANCE_COLORS.text.primary, margin: 0 }}>
              Analyse du Decay : {selectedSector.name}
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={{ ...CONFIANCE_TYPOGRAPHY.labels, color: CONFIANCE_COLORS.text.secondary }}>Constante Decay (λ)</span>
              <span style={{ ...CONFIANCE_TYPOGRAPHY.scores, color: CONFIANCE_COLORS.text.primary, fontSize: '20px' }}>{selectedSector.lambda.toFixed(3)}</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={{ ...CONFIANCE_TYPOGRAPHY.labels, color: CONFIANCE_COLORS.text.secondary }}>Demi-Vie (T_1/2)</span>
              <span style={{ ...CONFIANCE_TYPOGRAPHY.scores, color: CONFIANCE_COLORS.accent.proof, fontSize: '20px' }}>
                {(Math.log(2) / selectedSector.lambda).toFixed(1)} mois
              </span>
            </div>

            <div style={{ backgroundColor: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: CONFIANCE_STYLES.borderRadius }}>
              <span style={{ ...CONFIANCE_TYPOGRAPHY.labels, color: CONFIANCE_COLORS.text.secondary, display: 'block', marginBottom: '8px' }}>MOTEUR DE DÉCROISSANCE</span>
              <span style={{ ...CONFIANCE_TYPOGRAPHY.tableData, color: CONFIANCE_COLORS.text.primary, lineHeight: 1.5 }}>
                {selectedSector.explanation}
              </span>
            </div>

            <div style={{ 
              borderLeft: `4px solid ${CONFIANCE_COLORS.accent.alert}`, 
              paddingLeft: '16px', 
              display: 'flex', flexDirection: 'column', gap: '8px' 
            }}>
              <span style={{ ...CONFIANCE_TYPOGRAPHY.labels, color: CONFIANCE_COLORS.accent.alert }}>DEAD MAN'S SWITCH</span>
              <span style={{ ...CONFIANCE_TYPOGRAPHY.tableData, color: CONFIANCE_COLORS.text.tertiary, fontSize: '11px', lineHeight: 1.5 }}>
                Si la confiance passe sous 30%, les autorisations du système autonome sont révoquées instantanément. Un {`"Renew"`} asynchrone nécessitera l'approbation du protocole BURHAN.
              </span>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};
