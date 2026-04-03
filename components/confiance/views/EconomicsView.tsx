"use client";

import React, { useState, useEffect } from 'react';
import { CONFIANCE_COLORS, CONFIANCE_TYPOGRAPHY, CONFIANCE_STYLES } from '../shared/constants';
import { ECONOMICS_SECTORS_MOCK } from '../shared/mock-data';

const SECTORS = ECONOMICS_SECTORS_MOCK;

export const EconomicsView: React.FC = () => {
  const [ca, setCa] = useState<number>(500); // in millions
  const [suppliers, setSuppliers] = useState<number>(5000);
  const [selectedSector, setSelectedSector] = useState<string>(SECTORS[0]);

  // Derived values
  const riskBase = (ca * 1000000) * 0.05; // 5% baseline risk
  const supplierMultiplier = Math.max(1, suppliers / 1000); // 1x to 50x multiplier based on spread
  
  const costFraud = riskBase * supplierMultiplier * 0.4;
  const costGreenwashing = selectedSector.includes("ESG") || selectedSector.includes("Bio") ? riskBase * 0.3 : 0;
  const costFines = (ca * 1000000) * 0.02; // max 2% CA
  const costDataBreach = suppliers * 1500; // estimated per supplier 

  const totalRisk = costFraud + costGreenwashing + costFines + costDataBreach;
  
  // Cost of Burhan is highly efficient
  const costBurhanFlat = 250000;
  const costBurhanVariable = suppliers * 15;
  const costBurhan = costBurhanFlat + costBurhanVariable;
  
  const roi = (totalRisk / costBurhan).toFixed(1);

  const formatCurrency = (val: number) => {
    if (val >= 1000000000) return `€${(val / 1000000000).toFixed(2)}B`;
    if (val >= 1000000) return `€${(val / 1000000).toFixed(1)}M`;
    if (val >= 1000) return `€${(val / 1000).toFixed(0)}K`;
    return `€${val.toFixed(0)}`;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      
      <div style={{ 
        padding: '24px', 
        backgroundColor: CONFIANCE_COLORS.background.card, 
        border: CONFIANCE_STYLES.border, 
        borderRadius: CONFIANCE_STYLES.borderRadius,
      }}>
        <div style={{ ...CONFIANCE_TYPOGRAPHY.sectionTitles, color: CONFIANCE_COLORS.accent.proof, marginBottom: '24px' }}>
          Calculateur du Coût de la Non-Confiance
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
          
          {/* Controls */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ ...CONFIANCE_TYPOGRAPHY.labels, color: CONFIANCE_COLORS.text.tertiary }}>Secteur d'activité</label>
              <select 
                value={selectedSector}
                onChange={(e) => setSelectedSector(e.target.value)}
                style={{
                  backgroundColor: CONFIANCE_COLORS.background.content,
                  border: CONFIANCE_STYLES.border,
                  color: CONFIANCE_COLORS.text.primary,
                  padding: '12px',
                  borderRadius: '4px',
                  fontFamily: CONFIANCE_TYPOGRAPHY.tableData.fontFamily,
                  outline: 'none'
                }}
              >
                {SECTORS.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <label style={{ ...CONFIANCE_TYPOGRAPHY.labels, color: CONFIANCE_COLORS.text.tertiary }}>Chiffre d'Affaires</label>
                <span style={{ ...CONFIANCE_TYPOGRAPHY.scores, color: CONFIANCE_COLORS.text.primary }}>€{ca}M</span>
              </div>
              <input 
                type="range" min="10" max="5000" step="10" 
                value={ca} onChange={(e) => setCa(Number(e.target.value))}
                style={{ width: '100%', accentColor: CONFIANCE_COLORS.accent.proof }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <label style={{ ...CONFIANCE_TYPOGRAPHY.labels, color: CONFIANCE_COLORS.text.tertiary }}>Fournisseurs / Nœuds Tiers</label>
                <span style={{ ...CONFIANCE_TYPOGRAPHY.scores, color: CONFIANCE_COLORS.text.primary }}>{suppliers.toLocaleString()}</span>
              </div>
              <input 
                type="range" min="50" max="50000" step="50" 
                value={suppliers} onChange={(e) => setSuppliers(Number(e.target.value))}
                style={{ width: '100%', accentColor: CONFIANCE_COLORS.accent.proof }}
              />
            </div>
          </div>

          {/* Results Summary */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', backgroundColor: 'rgba(0,0,0,0.3)', padding: '24px', borderRadius: '8px' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '12px' }}>
              <span style={{ ...CONFIANCE_TYPOGRAPHY.tableData, color: CONFIANCE_COLORS.text.secondary }}>Coût Fraude Sectorielle</span>
              <span style={{ ...CONFIANCE_TYPOGRAPHY.scores, color: CONFIANCE_COLORS.text.primary }}>{formatCurrency(costFraud)}</span>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '12px' }}>
              <span style={{ ...CONFIANCE_TYPOGRAPHY.tableData, color: CONFIANCE_COLORS.text.secondary }}>Coût Greenwashing / Image</span>
              <span style={{ ...CONFIANCE_TYPOGRAPHY.scores, color: CONFIANCE_COLORS.text.primary }}>{formatCurrency(costGreenwashing)}</span>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '12px' }}>
              <span style={{ ...CONFIANCE_TYPOGRAPHY.tableData, color: CONFIANCE_COLORS.text.secondary }}>Risque Amende Conformité (2%)</span>
              <span style={{ ...CONFIANCE_TYPOGRAPHY.scores, color: CONFIANCE_COLORS.text.primary }}>{formatCurrency(costFines)}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '12px' }}>
              <span style={{ ...CONFIANCE_TYPOGRAPHY.tableData, color: CONFIANCE_COLORS.text.secondary }}>Coût Data Breach Supply Chain</span>
              <span style={{ ...CONFIANCE_TYPOGRAPHY.scores, color: CONFIANCE_COLORS.text.primary }}>{formatCurrency(costDataBreach)}</span>
            </div>

            <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ ...CONFIANCE_TYPOGRAPHY.labels, color: CONFIANCE_COLORS.accent.alert, fontSize: '11px' }}>TOTAL RISQUE FINANCIER</span>
                <span style={{ ...CONFIANCE_TYPOGRAPHY.scores, color: CONFIANCE_COLORS.accent.alert, fontSize: '28px' }}>{formatCurrency(totalRisk)}</span>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ ...CONFIANCE_TYPOGRAPHY.labels, color: CONFIANCE_COLORS.scores.green, fontSize: '11px' }}>COÛT BURHAN (INFRA)</span>
                <span style={{ ...CONFIANCE_TYPOGRAPHY.scores, color: CONFIANCE_COLORS.scores.green, fontSize: '22px' }}>{formatCurrency(costBurhan)}</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'rgba(0, 212, 184, 0.1)', padding: '16px', borderRadius: '4px', border: `1px solid ${CONFIANCE_COLORS.accent.proof}` }}>
                <span style={{ ...CONFIANCE_TYPOGRAPHY.labels, color: CONFIANCE_COLORS.accent.proof, fontSize: '14px' }}>R.O.I ESTIMÉ</span>
                <span style={{ ...CONFIANCE_TYPOGRAPHY.scores, color: CONFIANCE_COLORS.accent.proof, fontSize: '36px', textShadow: CONFIANCE_STYLES.glow }}>{roi}×</span>
              </div>

            </div>

          </div>

        </div>
      </div>

      {/* Table Comparatif */}
      <div style={{ padding: '24px', backgroundColor: CONFIANCE_COLORS.background.card, border: CONFIANCE_STYLES.border, borderRadius: CONFIANCE_STYLES.borderRadius }}>
        <div style={{ ...CONFIANCE_TYPOGRAPHY.subtitles, color: CONFIANCE_COLORS.text.primary, marginBottom: '20px' }}>Benchmarks Sectoriels Moyens</div>
        <div style={{ width: '100%', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: CONFIANCE_STYLES.separator }}>
                <th style={{ padding: '12px', ...CONFIANCE_TYPOGRAPHY.labels, color: CONFIANCE_COLORS.text.tertiary }}>Secteur</th>
                <th style={{ padding: '12px', ...CONFIANCE_TYPOGRAPHY.labels, color: CONFIANCE_COLORS.text.tertiary }}>Fraude Moyenne (% CA)</th>
                <th style={{ padding: '12px', ...CONFIANCE_TYPOGRAPHY.labels, color: CONFIANCE_COLORS.text.tertiary }}>Complexité Traceabilité</th>
                <th style={{ padding: '12px', ...CONFIANCE_TYPOGRAPHY.labels, color: CONFIANCE_COLORS.text.tertiary }}>Pression Réglementaire</th>
                <th style={{ padding: '12px', ...CONFIANCE_TYPOGRAPHY.labels, color: CONFIANCE_COLORS.text.tertiary }}>ROI Typique BURHAN</th>
              </tr>
            </thead>
            <tbody>
              {SECTORS.map((sector, i) => (
                <tr key={sector} style={{ borderBottom: i === SECTORS.length - 1 ? 'none' : CONFIANCE_STYLES.separator }}>
                  <td style={{ padding: '12px', ...CONFIANCE_TYPOGRAPHY.tableData, color: CONFIANCE_COLORS.text.primary }}>{sector}</td>
                  <td style={{ padding: '12px', ...CONFIANCE_TYPOGRAPHY.tableData, color: CONFIANCE_COLORS.accent.alert }}>{((i%3)+2).toFixed(1)}%</td>
                  <td style={{ padding: '12px', ...CONFIANCE_TYPOGRAPHY.tableData, color: CONFIANCE_COLORS.text.secondary }}>{['Haute', 'Critique', 'Élevée', 'Extrême', 'Haute', 'Critique'][i]}</td>
                  <td style={{ padding: '12px', ...CONFIANCE_TYPOGRAPHY.tableData, color: CONFIANCE_COLORS.accent.regulatory }}>{['EU FMD', 'DPP EU', 'CS3D', 'Part 145', 'Label Européen', 'AI Act'][i]}</td>
                  <td style={{ padding: '12px', ...CONFIANCE_TYPOGRAPHY.scores, color: CONFIANCE_COLORS.accent.proof }}>{((i%4)*15 + 45)}×</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
