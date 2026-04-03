"use client";

import React, { useState, useEffect } from 'react';
import { CONFIANCE_COLORS, CONFIANCE_TYPOGRAPHY, CONFIANCE_STYLES } from '../shared/constants';
import { THREATS_MOCK, type Threat } from '../shared/mock-data';

export const AdversarialWatchView: React.FC = () => {
  const [threats, setThreats] = useState<Threat[]>(THREATS_MOCK);
  const [selectedThreat, setSelectedThreat] = useState<Threat>(THREATS_MOCK[0]);

  useEffect(() => {
    const fetchThreats = async () => {
      try {
        const res = await fetch('/api/confiance/threats');
        if (res.ok) {
          const apiData = await res.json();
          if (apiData.length > 0) { setThreats(apiData); setSelectedThreat(apiData[0]); }
        }
      } catch (e) { /* fallback already set */ }
    };
    fetchThreats();
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px' }}>
        {threats.map(threat => (
          <button
            key={threat.id}
            onClick={() => setSelectedThreat(threat)}
            style={{
              padding: '16px',
              backgroundColor: selectedThreat.id === threat.id ? 'rgba(255,255,255,0.05)' : CONFIANCE_COLORS.background.card,
              border: selectedThreat.id === threat.id ? `1px solid ${CONFIANCE_COLORS.text.secondary}` : CONFIANCE_STYLES.border,
              borderRadius: CONFIANCE_STYLES.borderRadius,
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'all 0.2s'
            }}
          >
            <div style={{ 
              display: 'inline-block', 
              padding: '2px 6px', 
              borderRadius: '2px', 
              ...CONFIANCE_TYPOGRAPHY.labels, 
              backgroundColor: threat.severity === 'CRITIQUE' ? 'rgba(232, 64, 64, 0.15)' : 'rgba(232, 144, 64, 0.15)',
              color: threat.severity === 'CRITIQUE' ? CONFIANCE_COLORS.accent.alert : CONFIANCE_COLORS.scores.orange,
              width: 'max-content'
            }}>
              {threat.severity}
            </div>
            <div style={{ ...CONFIANCE_TYPOGRAPHY.subtitles, color: CONFIANCE_COLORS.text.primary, height: '40px' }}>
              {threat.name}
            </div>
            <div style={{ ...CONFIANCE_TYPOGRAPHY.scores, color: CONFIANCE_COLORS.text.secondary, fontSize: '14px' }}>
              {threat.trend}
            </div>
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '32px', backgroundColor: CONFIANCE_COLORS.background.card, border: CONFIANCE_STYLES.border, borderRadius: CONFIANCE_STYLES.borderRadius }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div style={{ ...CONFIANCE_TYPOGRAPHY.sectionTitles, color: CONFIANCE_COLORS.text.primary, fontSize: '32px' }}>
            {selectedThreat.name}
          </div>
          <div style={{ ...CONFIANCE_TYPOGRAPHY.scores, color: CONFIANCE_COLORS.accent.alert, fontSize: '24px' }}>
            {selectedThreat.trend}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginTop: '16px' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
             <div style={{ ...CONFIANCE_TYPOGRAPHY.labels, color: CONFIANCE_COLORS.text.tertiary }}>Données Clés</div>
             <div style={{ ...CONFIANCE_TYPOGRAPHY.tableData, color: CONFIANCE_COLORS.text.primary, fontSize: '14px' }}>{selectedThreat.keyData}</div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
             <div style={{ ...CONFIANCE_TYPOGRAPHY.labels, color: CONFIANCE_COLORS.accent.alert }}>Impact Vectoriel</div>
             <div style={{ ...CONFIANCE_TYPOGRAPHY.tableData, color: CONFIANCE_COLORS.text.primary, fontSize: '14px' }}>{selectedThreat.impact}</div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '16px', backgroundColor: 'rgba(0, 212, 184, 0.05)', borderLeft: `3px solid ${CONFIANCE_COLORS.accent.proof}` }}>
             <div style={{ ...CONFIANCE_TYPOGRAPHY.labels, color: CONFIANCE_COLORS.accent.proof }}>Défense Eigen (Burhan)</div>
             <div style={{ ...CONFIANCE_TYPOGRAPHY.tableData, color: CONFIANCE_COLORS.text.primary, fontSize: '14px' }}>{selectedThreat.defense}</div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '16px', backgroundColor: 'rgba(232, 144, 64, 0.05)', borderLeft: `3px solid ${CONFIANCE_COLORS.scores.orange}` }}>
             <div style={{ ...CONFIANCE_TYPOGRAPHY.labels, color: CONFIANCE_COLORS.scores.orange }}>Gap Ouvert</div>
             <div style={{ ...CONFIANCE_TYPOGRAPHY.tableData, color: CONFIANCE_COLORS.text.primary, fontSize: '14px' }}>{selectedThreat.gap}</div>
          </div>

          <div style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column', gap: '8px', padding: '16px', backgroundColor: 'rgba(79, 195, 247, 0.05)', borderLeft: `3px solid ${CONFIANCE_COLORS.accent.regulatory}` }}>
             <div style={{ ...CONFIANCE_TYPOGRAPHY.labels, color: CONFIANCE_COLORS.accent.regulatory }}>Recherche en Cours (Black Ops)</div>
             <div style={{ ...CONFIANCE_TYPOGRAPHY.tableData, color: CONFIANCE_COLORS.text.primary, fontSize: '14px' }}>{selectedThreat.research}</div>
          </div>

        </div>

      </div>

      <div style={{ 
        padding: '24px',
        textAlign: 'center',
        borderTop: CONFIANCE_STYLES.separator,
        borderBottom: CONFIANCE_STYLES.separator
      }}>
        <div style={{ ...CONFIANCE_TYPOGRAPHY.sectionTitles, color: CONFIANCE_COLORS.text.secondary, fontStyle: 'normal' }}>
          "Chaque vecteur exploite l'absence de preuve continue. EIGEN supprime la condition commune."
        </div>
      </div>

    </div>
  );
};
