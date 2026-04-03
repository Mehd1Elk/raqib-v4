"use client";

import React from 'react';
import { BLOOMBERG_PRUNE_COLORS, COMMON_STYLES } from '../shared/constants';

const CORRIDORS = [
  { id: 'fr-ma', name: 'France → Maroc', pop: '1.5M', remit: '€8.2B', top1: 'Crédit Immo', top1Price: '€42', top2: 'Santé Senior', top3: 'Bancaire', tam: '€45M' },
  { id: 'es-ma', name: 'Espagne → Maroc', pop: '800K', remit: '€3.1B', top1: 'Agricole', top1Price: '€28', top2: 'Immo', top3: 'Santé', tam: '€18M' },
  { id: 'it-sn', name: 'Italie → Sénégal', pop: '350K', remit: '€1.4B', top1: 'B2B Trade', top1Price: '€35', top2: 'Logement', top3: 'Scolarité', tam: '€9M' },
  { id: 'fr-sn', name: 'France → Sénégal', pop: '300K', remit: '€1.2B', top1: 'Immobilier', top1Price: '€38', top2: 'Santé', top3: 'Formation', tam: '€8.5M' },
  { id: 'uk-ng', name: 'UK → Nigeria', pop: '220K', remit: '€4.5B', top1: 'Tech Invest', top1Price: '€55', top2: 'Business', top3: 'Real Estate', tam: '€10M' },
  { id: 'fr-ci', name: 'France → Côte d\'Ivoire', pop: '250K', remit: '€0.9B', top1: 'Santé', top1Price: '€22', top2: 'Immobilier', top3: 'Business', tam: '€5M' },
  { id: 'de-gh', name: 'Allemagne → Ghana', pop: '100K', remit: '€0.6B', top1: 'Équipement', top1Price: '€18', top2: 'Immo', top3: 'Scolarité', tam: '€1.5M' },
  { id: 'fr-ml', name: 'France → Mali', pop: '120K', remit: '€1.1B', top1: 'Auto', top1Price: '€15', top2: 'Santé', top3: 'Énergie', tam: '€1.2M' },
  { id: 'fr-cm', name: 'France → Cameroun', pop: '90K', remit: '€0.8B', top1: 'Scolarité', top1Price: '€25', top2: 'Santé', top3: 'Business', tam: '€1.8M' },
  { id: 'pt-ao', name: 'Portugal → Angola', pop: '180K', remit: '€0.5B', top1: 'Immobilier', top1Price: '€30', top2: 'Auto', top3: 'Tech', tam: '€4M' },
  { id: 'es-sn', name: 'Espagne → Sénégal', pop: '70K', remit: '€0.3B', top1: 'Agricole', top1Price: '€12', top2: 'Immo', top3: 'Santé', tam: '€0.5M' },
  { id: 'it-ma', name: 'Italie → Maroc', pop: '400K', remit: '€1.8B', top1: 'Business', top1Price: '€25', top2: 'Immo', top3: 'Retail', tam: '€8M' },
  { id: 'be-ma', name: 'Belgique → Maroc', pop: '350K', remit: '€1.5B', top1: 'Assurance', top1Price: '€32', top2: 'Santé', top3: 'Immo', tam: '€9M' },
  { id: 'nl-ma', name: 'Pays-Bas → Maroc', pop: '400K', remit: '€1.9B', top1: 'Investissement', top1Price: '€45', top2: 'Immo', top3: 'Tech', tam: '€15M' },
  { id: 'uk-gh', name: 'UK → Ghana', pop: '110K', remit: '€1.2B', top1: 'Real Estate', top1Price: '€40', top2: 'Business', top3: 'Scolarité', tam: '€3.5M' }
];

export default function DiasporaView() {
  return (
    <div className="flex flex-col space-y-6 h-full">
      <h2 style={COMMON_STYLES.sectionTitle}>La Diaspora comme Market Maker</h2>
      
      {/* StatCards */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'DIASPORA EU-AFRIQUE', value: '14M', color: BLOOMBERG_PRUNE_COLORS.textMain },
          { label: 'REMITTANCES/AN VERS AFRIQUE', value: '$48B', color: BLOOMBERG_PRUNE_COLORS.accentPositive },
          { label: 'REVENUE MYNE/AN PAR PERS.', value: '€103', color: BLOOMBERG_PRUNE_COLORS.accentPositive },
        ].map((stat, i) => (
          <div key={i} className="p-4 flex flex-col justify-between h-24" style={COMMON_STYLES.card}>
            <div style={COMMON_STYLES.categoryLabel}>{stat.label}</div>
            <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '24px', fontWeight: 600, color: stat.color }}>
              {stat.value}
            </div>
          </div>
        ))}
      </div>

      {/* SVG Schema */}
      <div className="w-full flexjustify-center p-6" style={COMMON_STYLES.card}>
        <div style={{ ...COMMON_STYLES.categoryLabel, marginBottom: '16px' }}>FLUX D'INTENTION TRANSNATIONAUX</div>
        <svg width="100%" height="200" viewBox="0 0 800 200" className="opacity-80">
          {/* Nodes EU (Left) */}
          <g transform="translate(100, 20)">
            {['France', 'Espagne', 'Italie', 'Belgique', 'UK', 'Allemagne', 'Pays-Bas', 'Portugal'].map((pays, i) => (
              <text key={i} x="0" y={i * 20} fill={BLOOMBERG_PRUNE_COLORS.textSecondary} fontSize="10" fontFamily='"JetBrains Mono", monospace'>{pays}</text>
            ))}
          </g>
          {/* Nodes Africa (Right) */}
          <g transform="translate(600, 20)">
            {['Maroc', 'Sénégal', 'Nigeria', 'Côte d\'Ivoire', 'Ghana', 'Mali', 'Cameroun', 'Angola'].map((pays, i) => (
              <text key={i} x="0" y={i * 20} fill={BLOOMBERG_PRUNE_COLORS.textSecondary} fontSize="10" fontFamily='"JetBrains Mono", monospace'>{pays}</text>
            ))}
          </g>
          {/* Arcs */}
          <path d="M 160 20 Q 400 50 580 20" stroke="#22C55E" strokeWidth="8" fill="none" opacity="0.6"/> {/* Finance */}
          <path d="M 160 40 Q 400 100 580 40" stroke="#22C55E" strokeWidth="4" fill="none" opacity="0.5"/> 
          <path d="M 160 60 Q 400 120 580 80" stroke="#3B82F6" strokeWidth="3" fill="none" opacity="0.6"/> {/* Sante */}
          <path d="M 160 80 Q 400 100 580 60" stroke="#A855F7" strokeWidth="2" fill="none" opacity="0.6"/> {/* Emploi */}
          <path d="M 160 100 Q 400 150 580 140" stroke="#22C55E" strokeWidth="5" fill="none" opacity="0.5"/>
          <path d="M 160 120 Q 400 160 580 100" stroke="#3B82F6" strokeWidth="2" fill="none" opacity="0.5"/>
          <path d="M 160 140 Q 400 80 580 160" stroke="#A855F7" strokeWidth="1" fill="none" opacity="0.5"/>
        </svg>
        <div className="flex justify-center space-x-6 mt-4" style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '10px' }}>
          <span className="text-green-500">■ Finance</span>
          <span className="text-blue-500">■ Santé</span>
          <span className="text-purple-500">■ Emploi</span>
        </div>
      </div>

      {/* Main Table */}
      <div className="flex-1 overflow-auto" style={COMMON_STYLES.card}>
        <table className="w-full text-left" style={{ borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              {['Corridor', 'Population', 'Remittance Annuel', 'Top Int. #1', 'Prix Int.', 'Top Int. #2', 'Top Int. #3', 'TAM MYNε'].map((h, i) => (
                <th key={i} className="p-4" style={{ ...COMMON_STYLES.categoryLabel, ...COMMON_STYLES.separator }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {CORRIDORS.map((row) => (
              <tr key={row.id} className="hover:bg-white/5 cursor-pointer transition-colors" style={COMMON_STYLES.separator}>
                <td className="p-4" style={{ ...COMMON_STYLES.tableData, fontWeight: 500 }}>{row.name}</td>
                <td className="p-4" style={{ ...COMMON_STYLES.tableData, color: BLOOMBERG_PRUNE_COLORS.textSecondary }}>{row.pop}</td>
                <td className="p-4" style={COMMON_STYLES.pricePositive}>{row.remit}</td>
                <td className="p-4" style={COMMON_STYLES.tableData}>{row.top1}</td>
                <td className="p-4" style={COMMON_STYLES.pricePositive}>{row.top1Price}</td>
                <td className="p-4" style={{ ...COMMON_STYLES.tableData, color: BLOOMBERG_PRUNE_COLORS.textSecondary }}>{row.top2}</td>
                <td className="p-4" style={{ ...COMMON_STYLES.tableData, color: BLOOMBERG_PRUNE_COLORS.textSecondary }}>{row.top3}</td>
                <td className="p-4" style={{ ...COMMON_STYLES.pricePositive, color: '#A855F7' }}>{row.tam}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Insight */}
      <div className="p-6" style={{ background: 'rgba(34,197,94,0.04)', border: `1px solid rgba(34,197,94,0.2)`, borderRadius: 0 }}>
        <p style={{ fontFamily: '"Playfair Display", serif', fontSize: '18px', color: BLOOMBERG_PRUNE_COLORS.accentPositive, margin: 0, lineHeight: 1.5 }}>
          "La diaspora produit des intentions à valeur EU (€12-42/intention) depuis un ancrage Afrique. Aucune des 32 initiatives pionnières n'a ciblé cette population. MYNε est le premier outil conçu pour la double intention."
        </p>
      </div>
    </div>
  );
}
