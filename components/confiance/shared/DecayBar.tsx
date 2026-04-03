"use client";

import React from 'react';
import { CONFIANCE_COLORS, CONFIANCE_STYLES, CONFIANCE_TYPOGRAPHY } from './constants';

interface DecayBarProps {
  percentage: number; // 0 to 100
  lambda: number;
}

export const DecayBar: React.FC<DecayBarProps> = ({ percentage, lambda }) => {
  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '4px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ ...CONFIANCE_TYPOGRAPHY.labels, color: CONFIANCE_COLORS.text.secondary }}>
          REMAINING TRUST
        </span>
        <span style={{ ...CONFIANCE_TYPOGRAPHY.tableData, color: CONFIANCE_COLORS.text.primary }}>
          λ = {lambda.toFixed(3)}
        </span>
      </div>
      <div 
        style={{ 
          width: '100%', 
          height: '6px', 
          backgroundColor: 'rgba(255, 107, 107, 0.15)', // Light decay base
          borderRadius: CONFIANCE_STYLES.borderRadius,
          overflow: 'hidden'
        }}
      >
        <div 
          style={{
            height: '100%',
            width: `${Math.max(0, Math.min(100, percentage))}%`,
            backgroundColor: percentage < 30 ? CONFIANCE_COLORS.accent.alert : CONFIANCE_COLORS.accent.decay,
            transition: 'width 0.3s ease-out, background-color 0.3s ease-out',
            boxShadow: percentage < 30 ? `0 0 8px ${CONFIANCE_COLORS.accent.alert}` : `0 0 5px ${CONFIANCE_COLORS.accent.decay}`
          }}
        />
      </div>
    </div>
  );
};
