"use client";

import React from 'react';
import { BLOOMBERG_PRUNE_COLORS, COMMON_STYLES } from '../shared/constants';

const STATS = [
  { label: 'REQUÊTES ÉVALUÉES', value: '847K', subtitle: '24h', color: BLOOMBERG_PRUNE_COLORS.textMain },
  { label: 'TAUX DE REJET', value: '67%', subtitle: 'Protection active', color: BLOOMBERG_PRUNE_COLORS.accentPositive },
  { label: 'TEMPS DÉCISION MOYEN', value: '3.2ms', subtitle: 'P99 8.1ms', color: BLOOMBERG_PRUNE_COLORS.textMain },
  { label: 'CGU SCANNÉES', value: '312', subtitle: '+14 (7j)', color: BLOOMBERG_PRUNE_COLORS.textMain },
  { label: 'COUNTER-OFFERS ÉMISES', value: '28K', subtitle: '3.3% Conv.', color: '#F59E0B' },
  { label: 'REVENUE PRODUCTEURS', value: '€142K', subtitle: '24h', color: BLOOMBERG_PRUNE_COLORS.accentPositive },
];

const TRANSACTIONS = [
  { ts: '10:42:01', buyer: 'B**#8A', cat: 'RÉNO ÉNERGIE', tlevel: 'T4', price: 92.5, status: 'ACCEPT' },
  { ts: '10:41:59', buyer: 'B**#2C', cat: 'SANTÉ MENTALE', tlevel: 'T1', price: 12.0, status: 'REJECT' },
  { ts: '10:41:45', buyer: 'B**#9F', cat: 'CRÉDIT IMMO', tlevel: 'T3', price: 41.0, status: 'COUNTER' },
  { ts: '10:41:30', buyer: 'B**#11', cat: 'ASSURANCE AUTO', tlevel: 'T5', price: 15.5, status: 'ACCEPT' },
  { ts: '10:41:12', buyer: 'B**#9A', cat: 'EMPLOI TECH', tlevel: 'T2', price: 28.0, status: 'REJECT' },
  { ts: '10:40:55', buyer: 'B**#4D', cat: 'MOBILITÉ ÉLEC', tlevel: 'T4', price: 65.2, status: 'ACCEPT' },
  { ts: '10:40:42', buyer: 'B**#8A', cat: 'CLOUD B2B', tlevel: 'T4', price: 85.0, status: 'ACCEPT' },
  { ts: '10:40:10', buyer: 'B**#3B', cat: 'CYBERSECURITÉ', tlevel: 'T2', price: 140.5, status: 'REJECT' },
  { ts: '10:39:58', buyer: 'B**#2C', cat: 'SANTÉ MENTALE', tlevel: 'T5', price: 38.0, status: 'ACCEPT' },
  { ts: '10:39:20', buyer: 'B**#7E', cat: 'MUTUELLE SANTÉ', tlevel: 'T3', price: 20.0, status: 'COUNTER' },
  { ts: '10:38:45', buyer: 'B**#9F', cat: 'CRÉDIT IMMO', tlevel: 'T1', price: 10.0, status: 'REJECT' },
  { ts: '10:38:12', buyer: 'B**#5C', cat: 'VOYAGE LUXE', tlevel: 'T5', price: 98.0, status: 'ACCEPT' },
];

export default function AelyaDashboardView() {
  const getStatusColor = (status: string) => {
    if (status === 'ACCEPT') return BLOOMBERG_PRUNE_COLORS.accentPositive;
    if (status === 'REJECT') return BLOOMBERG_PRUNE_COLORS.accentNegative;
    return '#F59E0B'; // COUNTER -> Orange
  };

  return (
    <div className="flex flex-col space-y-6 h-full overflow-hidden">
      <h2 style={COMMON_STYLES.sectionTitle}>Dashboard Performance ÆLYA</h2>

      {/* 6 StatCards */}
      <div className="grid grid-cols-6 gap-4 flex-shrink-0">
        {STATS.map((stat, i) => (
          <div key={i} className="p-3 flex flex-col justify-between h-24" style={COMMON_STYLES.card}>
            <div style={{ ...COMMON_STYLES.categoryLabel, fontSize: '8px' }}>{stat.label}</div>
            <div>
              <div style={{ 
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: '20px',
                fontWeight: 600,
                color: stat.color 
              }}>
                {stat.value}
              </div>
              <div style={{ ...COMMON_STYLES.categoryLabel, fontSize: '8px', color: BLOOMBERG_PRUNE_COLORS.textTertiary, marginTop: '2px', textTransform: 'none' }}>
                {stat.subtitle}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex space-x-6 flex-1 min-h-0">
        {/* GRAPH */}
        <div className="w-1/3 p-6 flex flex-col" style={COMMON_STYLES.card}>
          <div style={COMMON_STYLES.sectionTitle} className="mb-6">Le Paradoxe du Rejet</div>
          <p style={{ ...COMMON_STYLES.categoryLabel, color: BLOOMBERG_PRUNE_COLORS.textSecondary, marginBottom: '20px', lineHeight: 1.5 }}>
            Plus ÆLYA rejette d'offres (protection data), plus la rareté augmente, faisant grimper le prix unitaire des acceptations.
          </p>
          <div className="flex-1 relative border-l border-b flex items-end" style={{ borderColor: BLOOMBERG_PRUNE_COLORS.border }}>
            {/* SVG Curve */}
            <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full preserve-3d" preserveAspectRatio="none">
              <path 
                d="M 0 95 Q 40 90, 70 50 T 100 5" 
                fill="none" 
                stroke={BLOOMBERG_PRUNE_COLORS.accentPositive} 
                strokeWidth="2" 
                vectorEffect="non-scaling-stroke"
              />
              {/* Point */}
              <circle cx="67" cy="45" r="3" fill={BLOOMBERG_PRUNE_COLORS.accentPositive} />
            </svg>
            <div className="absolute text-[8px]" style={{ left: '67%', top: '35%', fontFamily: '"JetBrains Mono", monospace', color: BLOOMBERG_PRUNE_COLORS.textMain }}>
              67% REJECT
            </div>
            {/* Axis labels */}
            <div className="absolute -bottom-5 w-full flex justify-between text-[8px]" style={{ fontFamily: '"JetBrains Mono", monospace', color: BLOOMBERG_PRUNE_COLORS.textTertiary }}>
              <span>0% Taux de rejet</span>
              <span>100%</span>
            </div>
            <div className="absolute -left-12 h-full flex flex-col justify-between items-end text-[8px] pb-5" style={{ fontFamily: '"JetBrains Mono", monospace', color: BLOOMBERG_PRUNE_COLORS.textTertiary }}>
              <span>HAUT</span>
              <span className="transform -rotate-90 origin-bottom-right mb-4 whitespace-nowrap text-[8px]">Rev. par Acceptation</span>
              <span>BAS</span>
            </div>
          </div>
        </div>

        {/* TRANSACTIONS TABLE */}
        <div className="w-2/3 flex flex-col" style={COMMON_STYLES.card}>
          <div className="p-4" style={{ ...COMMON_STYLES.separator, backgroundColor: '#1E0A20' }}>
            <h3 style={COMMON_STYLES.categoryLabel}>DERNIÈRES TRANSACTIONS</h3>
          </div>
          <div className="flex-1 overflow-auto">
            <table className="w-full text-left" style={{ borderCollapse: 'collapse' }}>
              <thead className="sticky top-0 bg-[#120D18]">
                <tr>
                  {['TS', 'BUYER', 'CATÉGORIE', 'T-LEVEL', 'PRIX', 'STATUT'].map((h, i) => (
                    <th key={i} className="p-3" style={{ ...COMMON_STYLES.categoryLabel, ...COMMON_STYLES.separator }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {TRANSACTIONS.map((tx, i) => (
                  <tr key={i} className="hover:bg-white/5 transition-colors" style={COMMON_STYLES.separator}>
                    <td className="p-3" style={{ ...COMMON_STYLES.tableData, color: BLOOMBERG_PRUNE_COLORS.textTertiary }}>{tx.ts}</td>
                    <td className="p-3" style={{ ...COMMON_STYLES.tableData, color: BLOOMBERG_PRUNE_COLORS.textSecondary }}>{tx.buyer}</td>
                    <td className="p-3" style={{ ...COMMON_STYLES.tableData }}>{tx.cat}</td>
                    <td className="p-3" style={{ ...COMMON_STYLES.tableData }}>{tx.tlevel}</td>
                    <td className="p-3" style={{ ...COMMON_STYLES.pricePositive, color: BLOOMBERG_PRUNE_COLORS.textMain }}>€{tx.price.toFixed(2)}</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5" style={{ 
                        ...COMMON_STYLES.categoryLabel, 
                        color: getStatusColor(tx.status), 
                        border: `1px solid ${getStatusColor(tx.status)}40`, // 40 = 25% opacity rough hex
                        backgroundColor: `${getStatusColor(tx.status)}10` 
                      }}>
                        {tx.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
