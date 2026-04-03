"use client";

import React, { useState } from 'react';
import { CONFIANCE_COLORS, CONFIANCE_STYLES, CONFIANCE_TYPOGRAPHY } from '../shared/constants';
import { THERMO_LAWS_MOCK } from '../shared/mock-data';

const LAWS = THERMO_LAWS_MOCK;

export const ThermoView: React.FC = () => {
  const [activeLaw, setActiveLaw] = useState(LAWS[0]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <h2 style={{ ...CONFIANCE_TYPOGRAPHY.sectionTitles, color: CONFIANCE_COLORS.text.primary, margin: 0 }}>
        Thermodynamique de la Confiance
      </h2>

      <div style={{ display: 'flex', gap: '8px', borderBottom: CONFIANCE_STYLES.separator, paddingBottom: '16px' }}>
        {LAWS.map(law => (
          <button
            key={law.id}
            onClick={() => setActiveLaw(law)}
            style={{
              padding: '8px 16px',
              backgroundColor: activeLaw.id === law.id ? 'rgba(0, 212, 184, 0.1)' : 'transparent',
              border: `1px solid ${activeLaw.id === law.id ? CONFIANCE_COLORS.accent.proof : 'transparent'}`,
              borderRadius: CONFIANCE_STYLES.borderRadius,
              color: activeLaw.id === law.id ? CONFIANCE_COLORS.accent.proof : CONFIANCE_COLORS.text.tertiary,
              ...CONFIANCE_TYPOGRAPHY.labels,
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            Loi {law.id}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div style={{ 
          fontFamily: "'Cormorant Garamond', serif", 
          fontSize: '24px', 
          fontStyle: 'italic', 
          color: CONFIANCE_COLORS.text.primary,
          lineHeight: 1.4
        }}>
          « {activeLaw.statement} »
        </div>

        <div style={{
          backgroundColor: '#000000',
          border: `1px solid ${CONFIANCE_COLORS.accent.proof}`,
          borderRadius: CONFIANCE_STYLES.borderRadius,
          padding: '24px',
          display: 'flex', justifyContent: 'center', alignItems: 'center',
          ...CONFIANCE_TYPOGRAPHY.tableData,
          color: CONFIANCE_COLORS.accent.proof,
          fontSize: '16px',
          boxShadow: CONFIANCE_STYLES.glow
        }}>
          {activeLaw.formula}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginTop: '16px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <h4 style={{ ...CONFIANCE_TYPOGRAPHY.labels, color: CONFIANCE_COLORS.text.secondary, margin: 0 }}>APPLICATION EIGEN</h4>
            <div style={{ ...CONFIANCE_TYPOGRAPHY.subtitles, color: CONFIANCE_COLORS.text.primary, lineHeight: 1.6, fontWeight: 400 }}>
              {activeLaw.application}
            </div>
          </div>
          
          <div style={{ 
            display: 'flex', flexDirection: 'column', gap: '12px',
            borderLeft: `4px solid ${CONFIANCE_COLORS.accent.certification}`,
            backgroundColor: 'rgba(201, 168, 76, 0.05)',
            borderTopRightRadius: CONFIANCE_STYLES.borderRadius,
            borderBottomRightRadius: CONFIANCE_STYLES.borderRadius,
            padding: '16px 16px 16px 20px'
          }}>
            <h4 style={{ ...CONFIANCE_TYPOGRAPHY.labels, color: CONFIANCE_COLORS.accent.certification, margin: 0 }}>IMPLICATION STRATÉGIQUE</h4>
            <div style={{ ...CONFIANCE_TYPOGRAPHY.subtitles, color: CONFIANCE_COLORS.text.primary, lineHeight: 1.6, fontWeight: 400 }}>
              {activeLaw.implication}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
