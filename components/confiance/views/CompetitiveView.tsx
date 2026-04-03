"use client";

import React from 'react';
import { CONFIANCE_COLORS, CONFIANCE_TYPOGRAPHY, CONFIANCE_STYLES } from '../shared/constants';

const COMPETITORS = [
  { name: 'BURHAN (EIGEN)', preuvec: true, bc: true, aicert: true, sc: true, corridor: true, price: 'Infra (B2B)' },
  { name: 'VeChain', preuvec: false, bc: true, aicert: false, sc: true, corridor: false, price: 'Tx-based' },
  { name: 'EcoVadis', preuvec: false, bc: false, aicert: false, sc: false, corridor: false, price: 'Abo Annuel' },
  { name: 'Holistic AI', preuvec: false, bc: false, aicert: true, sc: false, corridor: false, price: 'SaaS' },
  { name: 'TraceLink', preuvec: false, bc: false, aicert: false, sc: true, corridor: false, price: 'Enterprise' },
];

export const CompetitiveView: React.FC = () => {

  const CheckIcon = () => (
    <span style={{ color: CONFIANCE_COLORS.scores.green, fontWeight: 800 }}>✓</span>
  );

  const CrossIcon = () => (
    <span style={{ color: CONFIANCE_COLORS.scores.red, fontWeight: 800, opacity: 0.5 }}>✗</span>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      
      {/* SVG Radar Comparison - visually approximate with SVG */}
      <div style={{ 
        padding: '32px', 
        backgroundColor: CONFIANCE_COLORS.background.card, 
        border: CONFIANCE_STYLES.border, 
        borderRadius: CONFIANCE_STYLES.borderRadius,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '400px',
        position: 'relative'
      }}>
        <div style={{ position: 'absolute', top: '24px', left: '24px', ...CONFIANCE_TYPOGRAPHY.subtitles, color: CONFIANCE_COLORS.text.primary }}>
          Matrice Dimensionnelle (Radar)
        </div>
        
        <svg width="400" height="350" viewBox="-150 -150 300 300" style={{ overflow: 'visible' }}>
          {/* Base Radar Grid */}
          {[0.2, 0.4, 0.6, 0.8, 1].map((scale, i) => (
            <polygon 
              key={i} 
              points="0,-100 70.7,-70.7 100,0 70.7,70.7 0,100 -70.7,70.7 -100,0 -70.7,-70.7" 
              fill="none" 
              stroke="rgba(255,255,255,0.05)" 
              strokeWidth="1"
              transform={`scale(${scale})`}
            />
          ))}
          {/* Axes */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
            <line key={i} x1="0" y1="0" x2="0" y2="-100" stroke="rgba(255,255,255,0.1)" strokeWidth="1" transform={`rotate(${angle})`} />
          ))}
          
          {/* Labels */}
          <text x="0" y="-115" textAnchor="middle" fill={CONFIANCE_COLORS.text.tertiary} style={{ ...CONFIANCE_TYPOGRAPHY.labels }}>Preuve Continue</text>
          <text x="80" y="-80" textAnchor="start" fill={CONFIANCE_COLORS.text.tertiary} style={{ ...CONFIANCE_TYPOGRAPHY.labels }}>Blockchain</text>
          <text x="115" y="5" textAnchor="start" fill={CONFIANCE_COLORS.text.tertiary} style={{ ...CONFIANCE_TYPOGRAPHY.labels }}>AI Cert</text>
          <text x="80" y="90" textAnchor="start" fill={CONFIANCE_COLORS.text.tertiary} style={{ ...CONFIANCE_TYPOGRAPHY.labels }}>Trust Score</text>
          <text x="0" y="125" textAnchor="middle" fill={CONFIANCE_COLORS.text.tertiary} style={{ ...CONFIANCE_TYPOGRAPHY.labels }}>Supply Chain</text>
          <text x="-80" y="90" textAnchor="end" fill={CONFIANCE_COLORS.text.tertiary} style={{ ...CONFIANCE_TYPOGRAPHY.labels }}>AI Act Comp.</text>
          <text x="-115" y="5" textAnchor="end" fill={CONFIANCE_COLORS.text.tertiary} style={{ ...CONFIANCE_TYPOGRAPHY.labels }}>Corridor Afriq.</text>
          <text x="-80" y="-80" textAnchor="end" fill={CONFIANCE_COLORS.text.tertiary} style={{ ...CONFIANCE_TYPOGRAPHY.labels }}>Pricing/Perf</text>

          {/* Average competitors area (rough shape) */}
          <polygon 
            points="0,-20 80,-80 0,0 0,20 0,80 -20,20 -10,0 0,-40" 
            fill="rgba(255,255,255,0.05)" 
            stroke="rgba(255,255,255,0.2)" 
            strokeWidth="1"
          />

          {/* BURHAN area (max score 100 on all axes) */}
          <polygon 
            points="0,-100 70.7,-70.7 100,0 70.7,70.7 0,100 -70.7,70.7 -100,0 -70.7,-70.7" 
            fill="rgba(0, 212, 184, 0.15)" 
            stroke={CONFIANCE_COLORS.accent.proof} 
            strokeWidth="2"
          />
        </svg>

        {/* Legend */}
        <div style={{ position: 'absolute', bottom: '24px', right: '24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '12px', height: '12px', backgroundColor: 'rgba(0, 212, 184, 0.15)', border: `2px solid ${CONFIANCE_COLORS.accent.proof}` }} />
            <span style={{ ...CONFIANCE_TYPOGRAPHY.labels, color: CONFIANCE_COLORS.text.primary }}>BURHAN</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '12px', height: '12px', backgroundColor: 'rgba(255,255,255,0.05)', border: `2px solid rgba(255,255,255,0.2)` }} />
            <span style={{ ...CONFIANCE_TYPOGRAPHY.labels, color: CONFIANCE_COLORS.text.secondary }}>Concurrents (Moyen)</span>
          </div>
        </div>

      </div>

      {/* Main Table */}
      <div style={{ backgroundColor: CONFIANCE_COLORS.background.card, border: CONFIANCE_STYLES.border, borderRadius: CONFIANCE_STYLES.borderRadius, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center' }}>
          <thead style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}>
            <tr style={{ borderBottom: CONFIANCE_STYLES.separator }}>
              <th style={{ padding: '16px', textAlign: 'left', ...CONFIANCE_TYPOGRAPHY.labels, color: CONFIANCE_COLORS.text.tertiary }}>Solution</th>
              <th style={{ padding: '16px', ...CONFIANCE_TYPOGRAPHY.labels, color: CONFIANCE_COLORS.text.tertiary }}>Preuve Continue</th>
              <th style={{ padding: '16px', ...CONFIANCE_TYPOGRAPHY.labels, color: CONFIANCE_COLORS.text.tertiary }}>Ancrage Blockchain</th>
              <th style={{ padding: '16px', ...CONFIANCE_TYPOGRAPHY.labels, color: CONFIANCE_COLORS.text.tertiary }}>AI Certification</th>
              <th style={{ padding: '16px', ...CONFIANCE_TYPOGRAPHY.labels, color: CONFIANCE_COLORS.text.tertiary }}>Supply Chain Cascade</th>
              <th style={{ padding: '16px', ...CONFIANCE_TYPOGRAPHY.labels, color: CONFIANCE_COLORS.text.tertiary }}>Corridor Afrique</th>
              <th style={{ padding: '16px', ...CONFIANCE_TYPOGRAPHY.labels, color: CONFIANCE_COLORS.text.tertiary }}>Modèle / Pricing</th>
            </tr>
          </thead>
          <tbody>
            {COMPETITORS.slice(1).map((comp, idx) => (
              <tr key={comp.name} style={{ borderBottom: CONFIANCE_STYLES.separator, backgroundColor: idx % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)' }}>
                <td style={{ padding: '16px', textAlign: 'left', ...CONFIANCE_TYPOGRAPHY.subtitles, color: CONFIANCE_COLORS.text.secondary }}>{comp.name}</td>
                <td style={{ padding: '16px' }}>{comp.preuvec ? <CheckIcon /> : <CrossIcon />}</td>
                <td style={{ padding: '16px' }}>{comp.bc ? <CheckIcon /> : <CrossIcon />}</td>
                <td style={{ padding: '16px' }}>{comp.aicert ? <CheckIcon /> : <CrossIcon />}</td>
                <td style={{ padding: '16px' }}>{comp.sc ? <CheckIcon /> : <CrossIcon />}</td>
                <td style={{ padding: '16px' }}>{comp.corridor ? <CheckIcon /> : <CrossIcon />}</td>
                <td style={{ padding: '16px', ...CONFIANCE_TYPOGRAPHY.tableData, color: CONFIANCE_COLORS.text.tertiary }}>{comp.price}</td>
              </tr>
            ))}
            {/* BURHAN STICKY ROW */}
            <tr style={{ backgroundColor: 'rgba(0, 212, 184, 0.08)' }}>
              <td style={{ padding: '16px', textAlign: 'left', ...CONFIANCE_TYPOGRAPHY.subtitles, color: CONFIANCE_COLORS.accent.proof }}>{COMPETITORS[0].name}</td>
              <td style={{ padding: '16px' }}><CheckIcon /></td>
              <td style={{ padding: '16px' }}><CheckIcon /></td>
              <td style={{ padding: '16px' }}><CheckIcon /></td>
              <td style={{ padding: '16px' }}><CheckIcon /></td>
              <td style={{ padding: '16px' }}><CheckIcon /></td>
              <td style={{ padding: '16px', ...CONFIANCE_TYPOGRAPHY.scores, color: CONFIANCE_COLORS.accent.proof }}>{COMPETITORS[0].price}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div style={{ 
        padding: '24px',
        backgroundColor: 'rgba(200, 160, 32, 0.05)',
        border: `1px solid rgba(200, 160, 32, 0.3)`,
        borderRadius: CONFIANCE_STYLES.borderRadius,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
      }}>
        <div style={{ 
          ...CONFIANCE_TYPOGRAPHY.sectionTitles, 
          color: CONFIANCE_COLORS.accent.burhan,
          letterSpacing: '1px',
        }}>
          "Seule infrastructure combinant proof cryptographique + certification continue + AI authentication + supply chain 4 tiers + corridor Afrique + thermodynamique de la confiance."
        </div>
      </div>

    </div>
  );
};
