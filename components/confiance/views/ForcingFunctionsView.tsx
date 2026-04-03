"use client";

import React, { useState, useEffect } from 'react';
import { CONFIANCE_COLORS, CONFIANCE_TYPOGRAPHY, CONFIANCE_STYLES } from '../shared/constants';
import { REGULATIONS_MOCK, type Regulation } from '../shared/mock-data';

export const ForcingFunctionsView: React.FC = () => {
  const [regulations, setRegulations] = useState<Regulation[]>(REGULATIONS_MOCK);
  const [selectedReg, setSelectedReg] = useState<Regulation>(REGULATIONS_MOCK[0]);

  useEffect(() => {
    const fetchRegs = async () => {
      try {
        const res = await fetch('/api/confiance/regulations');
        if (res.ok) {
          const apiData = await res.json();
          if (apiData.length > 0) { setRegulations(apiData); setSelectedReg(apiData[0]); }
        }
      } catch (e) { /* fallback already set */ }
    };
    fetchRegs();
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', height: '100%' }}>
      
      <div style={{ display: 'flex', gap: '16px', overflowX: 'auto', paddingBottom: '8px' }}>
        {regulations.map(reg => (
          <button
            key={reg.id}
            onClick={() => setSelectedReg(reg)}
            style={{
              padding: '12px 24px',
              backgroundColor: selectedReg.id === reg.id ? 'rgba(79, 195, 247, 0.15)' : CONFIANCE_COLORS.background.card,
              border: selectedReg.id === reg.id ? `1px solid ${CONFIANCE_COLORS.accent.regulatory}` : CONFIANCE_STYLES.border,
              borderRadius: '24px',
              color: selectedReg.id === reg.id ? CONFIANCE_COLORS.accent.regulatory : CONFIANCE_COLORS.text.secondary,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              fontFamily: CONFIANCE_TYPOGRAPHY.subtitles.fontFamily,
              fontWeight: 600,
              fontSize: '14px',
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <span>§</span>
            {reg.name}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '32px', flex: 1 }}>
        
        {/* Timeline Sidebar */}
        <div style={{ width: '250px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{ ...CONFIANCE_TYPOGRAPHY.labels, color: CONFIANCE_COLORS.text.tertiary }}>Timeline Légale</div>
          <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '32px', paddingLeft: '16px', borderLeft: `1px solid ${CONFIANCE_COLORS.border}` }}>
            
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: '-21px', top: '2px', width: '10px', height: '10px', borderRadius: '50%', backgroundColor: selectedReg.status === 'active' ? CONFIANCE_COLORS.scores.green : CONFIANCE_COLORS.text.tertiary }} />
              <div style={{ ...CONFIANCE_TYPOGRAPHY.labels, color: CONFIANCE_COLORS.text.tertiary, marginBottom: '4px' }}>Adoption Initiale</div>
              <div style={{ ...CONFIANCE_TYPOGRAPHY.tableData, color: CONFIANCE_COLORS.text.primary }}>{selectedReg.date}</div>
            </div>

            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: '-21px', top: '2px', width: '10px', height: '10px', borderRadius: '50%', backgroundColor: selectedReg.status === 'upcoming' ? CONFIANCE_COLORS.accent.entropy : CONFIANCE_COLORS.text.tertiary }} />
              <div style={{ ...CONFIANCE_TYPOGRAPHY.labels, color: CONFIANCE_COLORS.text.tertiary, marginBottom: '4px' }}>Entrée en Vigueur Globale</div>
              <div style={{ ...CONFIANCE_TYPOGRAPHY.tableData, color: CONFIANCE_COLORS.text.primary }}>+ 24 mois</div>
            </div>

            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: '-21px', top: '2px', width: '10px', height: '10px', borderRadius: '50%', border: `1px solid ${CONFIANCE_COLORS.accent.alert}`, backgroundColor: 'transparent' }} />
              <div style={{ ...CONFIANCE_TYPOGRAPHY.labels, color: CONFIANCE_COLORS.text.tertiary, marginBottom: '4px' }}>Premières Sanctions</div>
              <div style={{ ...CONFIANCE_TYPOGRAPHY.tableData, color: CONFIANCE_COLORS.text.primary }}>+ 36 mois</div>
            </div>

          </div>
        </div>

        {/* Main Info */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          <div>
            <div style={{ ...CONFIANCE_TYPOGRAPHY.sectionTitles, color: CONFIANCE_COLORS.text.primary, fontSize: '28px' }}>
              {selectedReg.fullName}
            </div>
            <div style={{ ...CONFIANCE_TYPOGRAPHY.labels, color: CONFIANCE_COLORS.accent.regulatory, marginTop: '8px' }}>
              STATUT: {selectedReg.status.toUpperCase()}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '24px' }}>
            
            <div style={{ padding: '24px', backgroundColor: 'rgba(232, 64, 64, 0.05)', border: `1px solid rgba(232, 64, 64, 0.2)`, borderRadius: CONFIANCE_STYLES.borderRadius }}>
              <div style={{ ...CONFIANCE_TYPOGRAPHY.labels, color: CONFIANCE_COLORS.text.tertiary, marginBottom: '12px' }}>Sanction Maximale (Non-Conformité)</div>
              <div style={{ ...CONFIANCE_TYPOGRAPHY.scores, color: CONFIANCE_COLORS.accent.alert, fontSize: '24px' }}>{selectedReg.maxPenalty}</div>
            </div>

            <div style={{ padding: '24px', backgroundColor: 'rgba(0, 212, 184, 0.05)', border: `1px solid rgba(0, 212, 184, 0.2)`, borderRadius: CONFIANCE_STYLES.borderRadius }}>
               <div style={{ ...CONFIANCE_TYPOGRAPHY.labels, color: CONFIANCE_COLORS.text.tertiary, marginBottom: '12px' }}>Total Addressable Market (BURHAN)</div>
              <div style={{ ...CONFIANCE_TYPOGRAPHY.scores, color: CONFIANCE_COLORS.accent.proof, fontSize: '24px' }}>{selectedReg.tamBurhan}</div>
            </div>

          </div>

          <div style={{ padding: '24px', backgroundColor: CONFIANCE_COLORS.background.card, border: CONFIANCE_STYLES.border, borderRadius: CONFIANCE_STYLES.borderRadius, flex: 1 }}>
            <div style={{ ...CONFIANCE_TYPOGRAPHY.subtitles, color: CONFIANCE_COLORS.text.primary, marginBottom: '16px' }}>
              Rôle Opérationnel BURHAN / ÆLYA / NOOS
            </div>
            <div style={{ ...CONFIANCE_TYPOGRAPHY.tableData, color: CONFIANCE_COLORS.text.secondary, lineHeight: '1.6', fontSize: '14px' }}>
              {selectedReg.role}
            </div>
          </div>

          <div style={{ padding: '24px', backgroundColor: CONFIANCE_COLORS.background.card, border: CONFIANCE_STYLES.border, borderRadius: CONFIANCE_STYLES.borderRadius }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
               <div style={{ ...CONFIANCE_TYPOGRAPHY.labels, color: CONFIANCE_COLORS.text.tertiary }}>Forcing Function Score</div>
               <div style={{ ...CONFIANCE_TYPOGRAPHY.scores, color: CONFIANCE_COLORS.text.primary }}>{selectedReg.ffScore} / 10</div>
            </div>
            <div style={{ width: '100%', height: '8px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ 
                width: `${selectedReg.ffScore * 10}%`, 
                height: '100%', 
                backgroundColor: selectedReg.ffScore > 8 ? CONFIANCE_COLORS.accent.proof : selectedReg.ffScore > 6 ? CONFIANCE_COLORS.accent.regulatory : CONFIANCE_COLORS.accent.entropy
              }} />
            </div>
            <div style={{ ...CONFIANCE_TYPOGRAPHY.labels, color: CONFIANCE_COLORS.text.tertiary, marginTop: '8px', textAlign: 'right', fontSize: '8px' }}>
              Mesure l'urgence et la force de contrainte obligeant l'adoption de la preuve cryptographique.
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
