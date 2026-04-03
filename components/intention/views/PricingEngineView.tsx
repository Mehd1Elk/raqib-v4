"use client";

import React, { useState } from 'react';
import { BLOOMBERG_PRUNE_COLORS, COMMON_STYLES } from '../shared/constants';

const CATEGORIES = [
  "Rénovation Énergétique", "Crédit Immobilier", "Assurance Vie", 
  "Transition Flotte Auto", "SaaS B2B RH", "Santé Mentale", 
  "Mobilité Électrique", "Wealth Management"
];

const CORRIDORS = ["France", "Maroc", "pan-EU", "pan-Afrique"];
const FREQUENCIES = ["one-shot", "mensuel", "streaming"];

export default function PricingEngineView() {
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [tLevel, setTLevel] = useState(3);
  const [volume, setVolume] = useState(10000);
  const [corridor, setCorridor] = useState(CORRIDORS[0]);
  const [frequency, setFrequency] = useState(FREQUENCIES[0]);

  // Mock calculations
  const basePrice = 25;
  const multiplier = (tLevel * 0.4) + (frequency === 'streaming' ? 1.5 : 1.0);
  const unitPrice = basePrice * multiplier;
  
  const producerRev = unitPrice * 0.53;
  const aelyaFee = unitPrice * 0.15;
  const burhanFee = unitPrice * 0.10;
  const buyerPrice = unitPrice * 1.35; // Example markup
  const cacActual = buyerPrice * 2.5; 
  const roi = ((cacActual - buyerPrice) / buyerPrice) * 100;

  return (
    <div className="flex flex-col space-y-6 h-full overflow-hidden">
      <h2 style={COMMON_STYLES.sectionTitle}>Pricing Engine</h2>
      
      <div className="flex space-x-6">
        {/* Input Panel */}
        <div className="w-1/3 p-6 space-y-6 flex flex-col" style={COMMON_STYLES.card}>
          
          <div>
            <label className="block mb-2" style={COMMON_STYLES.categoryLabel}>Catégorie d'Intention</label>
            <select 
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-transparent border p-2 outline-none"
              style={{ borderColor: BLOOMBERG_PRUNE_COLORS.border, color: BLOOMBERG_PRUNE_COLORS.textMain, ...COMMON_STYLES.tableData }}
            >
              {CATEGORIES.map(c => <option key={c} value={c} className="bg-[#120D18]">{c}</option>)}
            </select>
          </div>

          <div>
            <label className="block mb-2 flex justify-between" style={COMMON_STYLES.categoryLabel}>
              <span>T-Level (Trust)</span>
              <span style={{ color: BLOOMBERG_PRUNE_COLORS.accentPositive }}>T{tLevel}</span>
            </label>
            <input 
              type="range" min="0" max="5" step="1" 
              value={tLevel} onChange={(e) => setTLevel(parseInt(e.target.value))}
              className="w-full accent-[#22C55E]"
            />
          </div>

          <div>
            <label className="block mb-2 flex justify-between" style={COMMON_STYLES.categoryLabel}>
              <span>Volume</span>
              <span style={{ color: BLOOMBERG_PRUNE_COLORS.textMain }}>{volume.toLocaleString()}</span>
            </label>
            <input 
              type="range" min="1000" max="10000000" step="1000" 
              value={volume} onChange={(e) => setVolume(parseInt(e.target.value))}
              className="w-full accent-[rgba(228,212,234,0.55)]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-2" style={COMMON_STYLES.categoryLabel}>Corridor</label>
              <select 
                value={corridor} onChange={(e) => setCorridor(e.target.value)}
                className="w-full bg-transparent border p-2 outline-none"
                style={{ borderColor: BLOOMBERG_PRUNE_COLORS.border, color: BLOOMBERG_PRUNE_COLORS.textMain, ...COMMON_STYLES.tableData }}
              >
                {CORRIDORS.map(c => <option key={c} value={c} className="bg-[#120D18]">{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block mb-2" style={COMMON_STYLES.categoryLabel}>Fréquence</label>
              <select 
                value={frequency} onChange={(e) => setFrequency(e.target.value)}
                className="w-full bg-transparent border p-2 outline-none"
                style={{ borderColor: BLOOMBERG_PRUNE_COLORS.border, color: BLOOMBERG_PRUNE_COLORS.textMain, ...COMMON_STYLES.tableData }}
              >
                {FREQUENCIES.map(f => <option key={f} value={f} className="bg-[#120D18]">{f}</option>)}
              </select>
            </div>
          </div>

        </div>

        {/* Output Panel */}
        <div className="w-2/3 p-6 grid grid-cols-2 gap-6" style={COMMON_STYLES.card}>
          <div className="col-span-2 border-b pb-4" style={{ borderColor: BLOOMBERG_PRUNE_COLORS.border }}>
            <div style={COMMON_STYLES.categoryLabel}>PRIX UNITAIRE INTENTION</div>
            <div style={{ ...COMMON_STYLES.pricePositive, fontSize: '32px' }}>€{unitPrice.toFixed(2)}</div>
          </div>
          
          <div className="space-y-4 pt-2">
            {[
              { label: 'REVENUE PRODUCTEUR (53%)', value: \`€\${producerRev.toFixed(2)}\`, color: BLOOMBERG_PRUNE_COLORS.textMain },
              { label: 'FRAIS ÆLYA (15%)', value: \`€\${aelyaFee.toFixed(2)}\`, color: BLOOMBERG_PRUNE_COLORS.textSecondary },
              { label: 'FRAIS BURHAN (10%)', value: \`€\${burhanFee.toFixed(2)}\`, color: BLOOMBERG_PRUNE_COLORS.textSecondary },
            ].map((item, i) => (
              <div key={i} className="flex justify-between items-center">
                <span style={COMMON_STYLES.categoryLabel}>{item.label}</span>
                <span style={{ ...COMMON_STYLES.tableData, color: item.color }}>{item.value}</span>
              </div>
            ))}
          </div>

          <div className="space-y-4 pt-2 pl-6 border-l" style={{ borderColor: BLOOMBERG_PRUNE_COLORS.border }}>
            <div className="flex justify-between items-center">
              <span style={COMMON_STYLES.categoryLabel}>PRIX BUYER FINAL</span>
              <span style={{ ...COMMON_STYLES.tableData, fontWeight: 600, color: '#FFFFFF' }}>€{buyerPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span style={COMMON_STYLES.categoryLabel}>CAC PUBLICITAIRE ACTUEL</span>
              <span style={{ ...COMMON_STYLES.tableData, color: BLOOMBERG_PRUNE_COLORS.accentNegative, textDecoration: 'line-through' }}>
                €{cacActual.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-center bg-[#1E0A20] p-3 -mx-3 mt-4" style={{ border: \`1px solid \${BLOOMBERG_PRUNE_COLORS.border}\` }}>
              <span style={COMMON_STYLES.categoryLabel}>ROI VS CAC</span>
              <span style={COMMON_STYLES.pricePositive}>+{roi.toFixed(1)}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Table bottom */}
      <div className="flex-1 overflow-auto" style={COMMON_STYLES.card}>
        <table className="w-full text-left" style={{ borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              {['Catégorie', 'CAC Attention', 'Prix Intention', 'Gain d\'efficience'].map((h, i) => (
                <th key={i} className="p-4 bg-[#1E0A20]" style={{ ...COMMON_STYLES.categoryLabel, ...COMMON_STYLES.separator }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {CATEGORIES.map((c, i) => {
              const cac = 120 + i * 45;
              const intPrice = 30 + i * 12;
              const eff = ((cac - intPrice)/cac) * 100;
              return (
                <tr key={c} className="hover:bg-white/5 transition-colors" style={COMMON_STYLES.separator}>
                  <td className="p-4" style={{ ...COMMON_STYLES.tableData }}>{c}</td>
                  <td className="p-4" style={{ ...COMMON_STYLES.tableData, color: BLOOMBERG_PRUNE_COLORS.accentNegative }}>€{cac.toFixed(2)}</td>
                  <td className="p-4" style={COMMON_STYLES.pricePositive}>€{intPrice.toFixed(2)}</td>
                  <td className="p-4" style={COMMON_STYLES.pricePositive}>↑ {eff.toFixed(1)}%</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

    </div>
  );
}
