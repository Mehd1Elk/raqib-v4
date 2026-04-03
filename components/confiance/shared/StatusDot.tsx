"use client";

import React from 'react';
import { CONFIANCE_COLORS, CONFIANCE_TYPOGRAPHY } from './constants';

export type TrustStatus = 'IMMUNE' | 'RESISTANT' | 'PARTIAL' | 'VULNERABLE';

interface StatusDotProps {
  status: TrustStatus;
  showLabel?: boolean;
}

export const StatusDot: React.FC<StatusDotProps> = ({ status, showLabel = false }) => {
  const config = {
    'IMMUNE': { color: CONFIANCE_COLORS.scores.green, label: 'IMMUNE' },
    'RESISTANT': { color: CONFIANCE_COLORS.accent.proof, label: 'RÉSISTANT' },
    'PARTIAL': { color: CONFIANCE_COLORS.scores.orange, label: 'PARTIEL' },
    'VULNERABLE': { color: CONFIANCE_COLORS.scores.red, label: 'VULNÉRABLE' },
  };

  const { color, label } = config[status];

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <div 
        style={{
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          backgroundColor: color,
          boxShadow: `0 0 6px ${color}80`
        }} 
      />
      {showLabel && (
        <span style={{ 
          ...CONFIANCE_TYPOGRAPHY.labels, 
          color: CONFIANCE_COLORS.text.primary 
        }}>
          {label}
        </span>
      )}
    </div>
  );
};
