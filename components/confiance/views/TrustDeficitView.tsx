"use client";

import React, { useState, useEffect } from 'react';
import { CONFIANCE_COLORS, CONFIANCE_TYPOGRAPHY, CONFIANCE_STYLES } from '../shared/constants';
import { DEFICIT_COUNTRIES_MOCK, type DeficitData } from '../shared/mock-data';

export const TrustDeficitView: React.FC = () => {
  const [data, setData] = useState<DeficitData[]>([]);

  useEffect(() => {
    const fetchDeficits = async () => {
      try {
        const res = await fetch('/api/confiance/deficit');
        if (res.ok) {
          const apiData = await res.json();
          if (apiData.length > 0) {
            setData([...apiData].sort((a: DeficitData, b: DeficitData) => b.gap - a.gap));
            return;
          }
        }
      } catch (e) { /* fallback */ }
      setData([...DEFICIT_COUNTRIES_MOCK].sort((a, b) => b.gap - a.gap));
    };
    fetchDeficits();
  }, []);

  const getScoreColor = (score: number) => {
    if (score >= 70) return CONFIANCE_COLORS.scores.green;
    if (score >= 40) return CONFIANCE_COLORS.scores.orange;
    return CONFIANCE_COLORS.scores.red;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      
      {/* 4 StatCards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
        
        <div style={{ padding: '24px', backgroundColor: CONFIANCE_COLORS.background.card, border: CONFIANCE_STYLES.border, borderRadius: CONFIANCE_STYLES.borderRadius, display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ ...CONFIANCE_TYPOGRAPHY.labels, color: CONFIANCE_COLORS.text.tertiary }}>DÉFICIT TOTAL CORRIDOR</div>
          <div style={{ ...CONFIANCE_TYPOGRAPHY.scores, color: CONFIANCE_COLORS.accent.alert, fontSize: '28px' }}>€46.3Mds</div>
        </div>
        
        <div style={{ padding: '24px', backgroundColor: CONFIANCE_COLORS.background.card, border: CONFIANCE_STYLES.border, borderRadius: CONFIANCE_STYLES.borderRadius, display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ ...CONFIANCE_TYPOGRAPHY.labels, color: CONFIANCE_COLORS.text.tertiary }}>TAM BURHAN CORRIDOR</div>
          <div style={{ ...CONFIANCE_TYPOGRAPHY.scores, color: CONFIANCE_COLORS.accent.proof, fontSize: '28px' }}>€2.7Mds</div>
        </div>

        <div style={{ padding: '24px', backgroundColor: CONFIANCE_COLORS.background.card, border: CONFIANCE_STYLES.border, borderRadius: CONFIANCE_STYLES.borderRadius, display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ ...CONFIANCE_TYPOGRAPHY.labels, color: CONFIANCE_COLORS.text.tertiary }}>TRUST SCORE MOYEN</div>
          <div style={{ ...CONFIANCE_TYPOGRAPHY.scores, color: CONFIANCE_COLORS.scores.orange, fontSize: '28px' }}>46 / 100</div>
        </div>

        <div style={{ padding: '24px', backgroundColor: CONFIANCE_COLORS.background.card, border: CONFIANCE_STYLES.border, borderRadius: CONFIANCE_STYLES.borderRadius, display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ ...CONFIANCE_TYPOGRAPHY.labels, color: CONFIANCE_COLORS.text.tertiary }}>PAYS ANALYSÉS</div>
          <div style={{ ...CONFIANCE_TYPOGRAPHY.scores, color: CONFIANCE_COLORS.text.primary, fontSize: '28px' }}>7</div>
        </div>

      </div>

      {/* Main Table */}
      <div style={{ backgroundColor: CONFIANCE_COLORS.background.card, border: CONFIANCE_STYLES.border, borderRadius: CONFIANCE_STYLES.borderRadius, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}>
            <tr style={{ borderBottom: CONFIANCE_STYLES.separator }}>
              <th style={{ padding: '16px', ...CONFIANCE_TYPOGRAPHY.labels, color: CONFIANCE_COLORS.text.tertiary }}>Pays</th>
              <th style={{ padding: '16px', ...CONFIANCE_TYPOGRAPHY.labels, color: CONFIANCE_COLORS.text.tertiary }}>Trust Score</th>
              <th style={{ padding: '16px', ...CONFIANCE_TYPOGRAPHY.labels, color: CONFIANCE_COLORS.text.tertiary }}>Fraude Détectée</th>
              <th style={{ padding: '16px', ...CONFIANCE_TYPOGRAPHY.labels, color: CONFIANCE_COLORS.text.tertiary }}>Fraude Estimée (Déficit)</th>
              <th style={{ padding: '16px', ...CONFIANCE_TYPOGRAPHY.labels, color: CONFIANCE_COLORS.text.tertiary }}>TAM BURHAN</th>
              <th style={{ padding: '16px', ...CONFIANCE_TYPOGRAPHY.labels, color: CONFIANCE_COLORS.text.tertiary }}>Trust Arbitrage Gap</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => (
              <tr key={row.country} style={{ borderBottom: idx === data.length - 1 ? 'none' : CONFIANCE_STYLES.separator, backgroundColor: idx % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)' }}>
                <td style={{ padding: '16px', ...CONFIANCE_TYPOGRAPHY.subtitles, color: CONFIANCE_COLORS.text.primary }}>{row.country}</td>
                
                <td style={{ padding: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ 
                      width: '12px', 
                      height: '12px', 
                      borderRadius: '50%', 
                      border: `2px solid ${getScoreColor(row.trustScore)}`,
                      backgroundColor: 'transparent'
                    }} />
                    <span style={{ ...CONFIANCE_TYPOGRAPHY.scores, color: getScoreColor(row.trustScore) }}>
                      {row.trustScore}
                    </span>
                  </div>
                </td>

                <td style={{ padding: '16px', ...CONFIANCE_TYPOGRAPHY.scores, color: CONFIANCE_COLORS.text.secondary }}>{row.fraudDetected}</td>
                <td style={{ padding: '16px', ...CONFIANCE_TYPOGRAPHY.scores, color: CONFIANCE_COLORS.accent.alert }}>{row.fraudEstimated}</td>
                <td style={{ padding: '16px', ...CONFIANCE_TYPOGRAPHY.scores, color: CONFIANCE_COLORS.accent.proof }}>{row.tamBurhan}</td>
                
                <td style={{ padding: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '60px', height: '4px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '2px', overflow: 'hidden' }}>
                      <div style={{ width: `${row.gap}%`, height: '100%', backgroundColor: CONFIANCE_COLORS.accent.alert }} />
                    </div>
                    <span style={{ ...CONFIANCE_TYPOGRAPHY.scores, color: CONFIANCE_COLORS.text.primary }}>{row.gap}%</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};
