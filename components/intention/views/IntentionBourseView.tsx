"use client";

import React, { useState } from 'react';
import { BLOOMBERG_PRUNE_COLORS, COMMON_STYLES } from '../shared/constants';

// 20 Categories
const CATEGORIES_DATA = [
  { id: 1, name: 'CRÉDIT IMMO', price: 42.50, varCode: 8.2, vol: '124K' },
  { id: 2, name: 'ASSURANCE AUTO', price: 12.10, varCode: -3.1, vol: '89K' },
  { id: 3, name: 'EMPLOI TECH', price: 28.00, varCode: 15.4, vol: '210K' },
  { id: 4, name: 'SANTÉ MENTALE', price: 35.80, varCode: 22.1, vol: '430K' },
  { id: 5, name: 'RÉNO ÉNERGIE', price: 110.00, varCode: 5.6, vol: '45K' },
  { id: 6, name: 'MOBILITÉ ÉLEC', price: 65.20, varCode: 12.0, vol: '88K' },
  { id: 7, name: 'CLOUD B2B', price: 85.00, varCode: -1.2, vol: '12K' },
  { id: 8, name: 'CYBERSECURITÉ', price: 140.50, varCode: 18.9, vol: '9K' },
  { id: 9, name: 'MUTUELLE SANTÉ', price: 22.30, varCode: 4.1, vol: '150K' },
  { id: 10, name: 'VOYAGE LUXE', price: 95.00, varCode: 2.5, vol: '34K' },
  { id: 11, name: 'GESTION PATRIMOINE', price: 210.00, varCode: 9.8, vol: '18K' },
  { id: 12, name: 'LOGICIEL RH', price: 45.60, varCode: -5.4, vol: '22K' },
  { id: 13, name: 'ÉDUCATION PRIVÉE', price: 38.00, varCode: 6.7, vol: '76K' },
  { id: 14, name: 'FITNESS PREMIUM', price: 18.50, varCode: -2.1, vol: '110K' },
  { id: 15, name: 'ALIMENTATION BIO', price: 8.90, varCode: 1.2, vol: '320K' },
  { id: 16, name: 'TÉLÉCOMS PRO', price: 55.00, varCode: 3.4, vol: '41K' },
  { id: 17, name: 'FRANCHISES', price: 150.00, varCode: 11.2, vol: '5K' },
  { id: 18, name: 'SERVICES OBSÈQUES', price: 82.00, varCode: 0.5, vol: '14K' },
  { id: 19, name: 'VÉHICULE OCCASION', price: 15.40, varCode: -8.5, vol: '240K' },
  { id: 20, name: 'ASSURANCE EMPRUNTEUR', price: 68.00, varCode: 14.3, vol: '55K' },
].sort((a, b) => b.varCode - a.varCode);

// Simple SVG sparkline
const Sparkline = ({ isPositive }: { isPositive: boolean }) => {
  const color = isPositive ? BLOOMBERG_PRUNE_COLORS.accentPositive : BLOOMBERG_PRUNE_COLORS.accentNegative;
  const pts = isPositive ? "0,20 5,18 10,15 15,19 20,10 25,12 30,5 35,2" : "0,2 5,5 10,2 15,10 20,8 25,15 30,12 35,18";
  return (
    <svg width="35" height="20" viewBox="0 0 35 20" className="overflow-visible">
      <polyline 
        fill="none" 
        stroke={color} 
        strokeWidth="1.5" 
        points={pts} 
      />
    </svg>
  );
};

export default function IntentionBourseView() {
  const [selectedCat, setSelectedCat] = useState(CATEGORIES_DATA[0]);

  // Mock Order Book
  const bids = [
    { price: selectedCat.price - 0.5, vol: '12K', type: 'BANQUE DETAIL' },
    { price: selectedCat.price - 0.8, vol: '45K', type: 'COURTIER' },
    { price: selectedCat.price - 1.2, vol: '8K', type: 'ASSURANCE' },
    { price: selectedCat.price - 1.5, vol: '110K', type: 'AGGREGATEUR' },
    { price: selectedCat.price - 2.0, vol: '25K', type: 'BANQUE EN LIGNE' },
  ];

  const asks = [
    { price: selectedCat.price + 0.2, vol: '5K', tlevel: 'T4' },
    { price: selectedCat.price + 0.5, vol: '18K', tlevel: 'T3' },
    { price: selectedCat.price + 0.9, vol: '42K', tlevel: 'T2' },
    { price: selectedCat.price + 1.4, vol: '15K', tlevel: 'T4' },
    { price: selectedCat.price + 2.1, vol: '80K', tlevel: 'T1' },
  ];

  return (
    <div className="flex flex-col space-y-6 h-full overflow-hidden">
      
      {/* 4x5 Grid */}
      <div className="grid grid-cols-4 gap-2 flex-shrink-0">
        {CATEGORIES_DATA.map((cat) => {
          const isPos = cat.varCode >= 0;
          const isSelected = selectedCat.id === cat.id;
          return (
            <div 
              key={cat.id} 
              onClick={() => setSelectedCat(cat)}
              className="p-3 cursor-pointer transition-colors border"
              style={{ 
                backgroundColor: isSelected ? 'rgba(228,212,234,0.05)' : BLOOMBERG_PRUNE_COLORS.cardBg,
                borderColor: isSelected ? BLOOMBERG_PRUNE_COLORS.textMain : BLOOMBERG_PRUNE_COLORS.border,
                borderRadius: 0
              }}
            >
              <div className="flex justify-between items-start mb-2">
                <span style={COMMON_STYLES.categoryLabel}>{cat.name}</span>
                <span style={{ ...COMMON_STYLES.categoryLabel, color: BLOOMBERG_PRUNE_COLORS.textTertiary }}>{cat.vol}</span>
              </div>
              <div className="flex justify-between items-end">
                <div>
                  <div style={{ ...COMMON_STYLES.pricePositive, fontSize: '18px', color: isPos ? BLOOMBERG_PRUNE_COLORS.accentPositive : BLOOMBERG_PRUNE_COLORS.accentNegative }}>
                    €{cat.price.toFixed(2)}
                  </div>
                  <div style={{ ...COMMON_STYLES.tableData, color: isPos ? BLOOMBERG_PRUNE_COLORS.accentPositive : BLOOMBERG_PRUNE_COLORS.accentNegative }}>
                    {isPos ? '↑' : '↓'} {Math.abs(cat.varCode)}%
                  </div>
                </div>
                <div className="pb-1">
                  <Sparkline isPositive={isPos} />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Order Book */}
      <div className="flex-1 flex flex-col min-h-0" style={COMMON_STYLES.card}>
        <div className="p-4" style={{ ...COMMON_STYLES.separator, backgroundColor: '#1E0A20' }}>
          <h3 style={COMMON_STYLES.sectionTitle}>ORDER BOOK : {selectedCat.name}</h3>
        </div>
        
        <div className="flex-1 flex overflow-hidden">
          {/* BIDS (Acheteurs) */}
          <div className="w-1/2 flex flex-col" style={{ borderRight: `1px solid ${BLOOMBERG_PRUNE_COLORS.border}` }}>
            <div className="grid grid-cols-3 p-3" style={COMMON_STYLES.separator}>
              <span style={{ ...COMMON_STYLES.categoryLabel, textAlign: 'left' }}>VOL</span>
              <span style={{ ...COMMON_STYLES.categoryLabel, textAlign: 'center' }}>BUYER TYPE</span>
              <span style={{ ...COMMON_STYLES.categoryLabel, textAlign: 'right' }}>BID (€)</span>
            </div>
            <div className="flex-1 overflow-auto p-2">
              {bids.map((bid, i) => (
                <div key={i} className="grid grid-cols-3 py-2 px-1 hover:bg-white/5 transition-colors cursor-pointer">
                  <span style={{ ...COMMON_STYLES.tableData, color: BLOOMBERG_PRUNE_COLORS.textSecondary }}>{bid.vol}</span>
                  <span style={{ ...COMMON_STYLES.tableData, color: BLOOMBERG_PRUNE_COLORS.textTertiary, textAlign: 'center' }}>{bid.type}</span>
                  <span style={{ ...COMMON_STYLES.pricePositive, textAlign: 'right' }}>{bid.price.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ASKS (Producteurs) */}
          <div className="w-1/2 flex flex-col">
            <div className="grid grid-cols-3 p-3" style={COMMON_STYLES.separator}>
              <span style={{ ...COMMON_STYLES.categoryLabel, textAlign: 'left' }}>ASK (€)</span>
              <span style={{ ...COMMON_STYLES.categoryLabel, textAlign: 'center' }}>T-LEVEL</span>
              <span style={{ ...COMMON_STYLES.categoryLabel, textAlign: 'right' }}>VOL</span>
            </div>
            <div className="flex-1 overflow-auto p-2">
              {asks.map((ask, i) => (
                <div key={i} className="grid grid-cols-3 py-2 px-1 hover:bg-white/5 transition-colors cursor-pointer">
                  <span style={{ ...COMMON_STYLES.priceNegative, textAlign: 'left' }}>{ask.price.toFixed(2)}</span>
                  <span style={{ ...COMMON_STYLES.tableData, color: BLOOMBERG_PRUNE_COLORS.textTertiary, textAlign: 'center' }}>{ask.tlevel}</span>
                  <span style={{ ...COMMON_STYLES.tableData, color: BLOOMBERG_PRUNE_COLORS.textSecondary, textAlign: 'right' }}>{ask.vol}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}
