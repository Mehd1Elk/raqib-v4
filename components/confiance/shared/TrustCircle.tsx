"use client";

import React, { useMemo } from 'react';
import { CONFIANCE_COLORS, CONFIANCE_TYPOGRAPHY } from './constants';

interface TrustCircleProps {
  score: number;
  size?: number;
  hasAlerts?: boolean;
}

export const TrustCircle: React.FC<TrustCircleProps> = ({ score, size = 60, hasAlerts = false }) => {
  const strokeWidth = size * 0.08;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const color = useMemo(() => {
    if (score >= 70) return CONFIANCE_COLORS.scores.green;
    if (score >= 40) return CONFIANCE_COLORS.scores.orange;
    return CONFIANCE_COLORS.scores.red;
  }, [score]);

  return (
    <div style={{ position: 'relative', width: size, height: size, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <style>{`
        @keyframes pulseAlert {
          0% { filter: drop-shadow(0 0 2px ${color}); }
          50% { filter: drop-shadow(0 0 10px ${color}); }
          100% { filter: drop-shadow(0 0 2px ${color}); }
        }
      `}</style>
      <svg
        width={size}
        height={size}
        style={{
          transform: 'rotate(-90deg)',
          animation: hasAlerts ? 'pulseAlert 2s infinite' : 'none'
        }}
      >
        {/* Background track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={CONFIANCE_COLORS.border}
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Progress arc */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.8s ease-in-out', filter: `drop-shadow(0 0 4px ${color}80)` }}
        />
      </svg>
      <div 
        style={{ 
          position: 'absolute', 
          ...CONFIANCE_TYPOGRAPHY.scores,
          color: CONFIANCE_COLORS.text.primary,
          fontSize: size * 0.28
        }}
      >
        {score}
      </div>
    </div>
  );
};
