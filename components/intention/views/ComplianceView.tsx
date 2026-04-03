"use client";

import React, { useState } from 'react';
import { BLOOMBERG_PRUNE_COLORS, COMMON_STYLES } from '../shared/constants';

const DATA_CATEGORIES = [
  "IDENTITÉ", "FINANCIER", "SANTÉ", "LOCATION", 
  "COMPORTEMENT", "BIOMÉTRIQUE", "SOCIAL"
];

const COUNTRIES = [
  "FR", "DE", "UK", "ES", "IT", "MA", "SN", "CI", "NG", "ZA",
  "US", "CA", "BR", "JP", "SG", "IN", "AE", "SA", "AU", "KR"
];

const REGULATIONS = [
  { id: 1, name: "RGPD (EU)", score: 9 },
  { id: 2, name: "CCPA (US-CA)", score: 7 },
  { id: 3, name: "Law 09-08 (MA)", score: 6 },
  { id: 4, name: "NDPR (NG)", score: 5 },
  { id: 5, name: "POPIA (ZA)", score: 8 },
  { id: 6, name: "LGPD (BR)", score: 7 },
  { id: 7, name: "APPI (JP)", score: 8 },
  { id: 8, name: "PDPA (SG)", score: 9 },
  { id: 9, name: "HIPAA (US)", score: 10 },
  { id: 10, name: "ePrivacy (EU)", score: 8 },
  // ... mock remaining below to hit ~20 if needed, but 10 is fine for illustration
];

export default function ComplianceView() {
  
  // Helper to generate random status for mock
  const getStatus = (catIndex: number, countryIndex: number) => {
    const val = (catIndex * 3 + countryIndex * 7) % 10;
    if (val < 2) return { code: '✗', color: BLOOMBERG_PRUNE_COLORS.accentNegative, label: 'bloqué' };
    if (val < 5) return { code: '⚠', color: '#F59E0B', label: 'conditions' }; // Orange
    return { code: '✓', color: BLOOMBERG_PRUNE_COLORS.accentPositive, label: 'autorisé' };
  };

  return (
    <div className="flex flex-col space-y-6 h-full overflow-hidden">
      <h2 style={COMMON_STYLES.sectionTitle}>Compliance Matrix</h2>

      {/* MATRIX */}
      <div className="flex-shrink-0 overflow-x-auto" style={COMMON_STYLES.card}>
        <table className="w-full text-center" style={{ borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th className="p-3 text-left sticky left-0 bg-[#120D18]" style={{ ...COMMON_STYLES.categoryLabel, ...COMMON_STYLES.separator, borderRight: `1px solid ${BLOOMBERG_PRUNE_COLORS.border}` }}>
                CATÉGORIES
              </th>
              {COUNTRIES.map(c => (
                <th key={c} className="p-3" style={{ ...COMMON_STYLES.categoryLabel, ...COMMON_STYLES.separator }}>
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {DATA_CATEGORIES.map((cat, i) => (
              <tr key={cat} className="hover:bg-white/5 transition-colors" style={COMMON_STYLES.separator}>
                <td className="p-3 text-left sticky left-0 bg-[#120D18]" style={{ ...COMMON_STYLES.tableData, borderRight: `1px solid ${BLOOMBERG_PRUNE_COLORS.border}` }}>
                  {cat}
                </td>
                {COUNTRIES.map((c, j) => {
                  const status = getStatus(i, j);
                  return (
                    <td key={c} className="p-3" title={status.label}>
                      <span style={{ color: status.color, fontSize: '14px', fontFamily: '"JetBrains Mono", monospace' }}>
                        {status.code}
                      </span>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* REGULATIONS LIST */}
      <div className="flex-1 overflow-auto" style={COMMON_STYLES.card}>
        <div className="p-4" style={{ ...COMMON_STYLES.separator, backgroundColor: '#1E0A20' }}>
          <h3 style={COMMON_STYLES.categoryLabel}>RÉGLEMENTATIONS ACTIVES (ALIGNMENT SCORE)</h3>
        </div>
        <div className="p-4 grid grid-cols-2 gap-x-8 gap-y-4">
          {REGULATIONS.map(reg => (
            <div key={reg.id} className="flex items-center space-x-4">
              <div className="w-1/3" style={{ ...COMMON_STYLES.tableData, fontWeight: 500 }}>
                {reg.name}
              </div>
              <div className="flex-1 flex items-center space-x-2">
                <div className="flex-1 h-1.5 bg-black/50" style={{ border: `0.5px solid ${BLOOMBERG_PRUNE_COLORS.border}` }}>
                  <div 
                    className="h-full" 
                    style={{ 
                      width: `${(reg.score / 10) * 100}%`,
                      backgroundColor: reg.score > 7 ? BLOOMBERG_PRUNE_COLORS.accentPositive : (reg.score > 5 ? '#F59E0B' : BLOOMBERG_PRUNE_COLORS.accentNegative)
                    }} 
                  />
                </div>
                <div style={{ ...COMMON_STYLES.categoryLabel, width: '20px', textAlign: 'right' }}>
                  {reg.score}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
    </div>
  );
}
