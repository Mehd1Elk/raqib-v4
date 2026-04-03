"use client";

import React, { useState } from 'react';
import { CLINICAL_TEAL_COLORS, COMMON_STYLES } from '../shared/constants';
import { DIGITAL_TWIN_SCENARIOS } from '../shared/mock-data';
import { Play, TrendingDown, RefreshCcw } from 'lucide-react';

export default function DigitalTwinView() {
  const [scenario, setScenario] = useState('CURRENT');
  
  return (
    <div className="flex flex-col space-y-6 h-full overflow-hidden text-sm">
      <h2 style={COMMON_STYLES.sectionTitle}>Digital Twin Simulation</h2>
      
      {/* PANNEAU HAUT — Sélection du scénario */}
      <div className="p-4 flex space-x-4" style={COMMON_STYLES.card}>
         <button onClick={() => setScenario('STOP')} className="flex-1 p-3 flex items-center justify-center space-x-2 border transition-colors hover:bg-white/5" style={{ borderColor: scenario === 'STOP' ? CLINICAL_TEAL_COLORS.accentRed : CLINICAL_TEAL_COLORS.border, color: scenario === 'STOP' ? CLINICAL_TEAL_COLORS.accentRed : CLINICAL_TEAL_COLORS.textSecondary }}>
            <TrendingDown size={14} />
            <span style={{ fontFamily: 'Geist, sans-serif', fontWeight: 500 }}>Simuler l'arrêt du traitement</span>
         </button>
         <button onClick={() => setScenario('SWITCH')} className="flex-1 p-3 flex items-center justify-center space-x-2 border transition-colors hover:bg-white/5" style={{ borderColor: scenario === 'SWITCH' ? CLINICAL_TEAL_COLORS.accentAmber : CLINICAL_TEAL_COLORS.border, color: scenario === 'SWITCH' ? CLINICAL_TEAL_COLORS.accentAmber : CLINICAL_TEAL_COLORS.textSecondary }}>
            <RefreshCcw size={14} />
            <span style={{ fontFamily: 'Geist, sans-serif', fontWeight: 500 }}>Simuler le changement de molécule</span>
         </button>
         <button onClick={() => setScenario('REDUCTION')} className="flex-1 p-3 flex items-center justify-center space-x-2 border transition-colors hover:bg-white/5" style={{ borderColor: scenario === 'REDUCTION' ? CLINICAL_TEAL_COLORS.accentBlue : CLINICAL_TEAL_COLORS.border, color: scenario === 'REDUCTION' ? CLINICAL_TEAL_COLORS.accentBlue : CLINICAL_TEAL_COLORS.textSecondary }}>
            <Play size={14} />
            <span style={{ fontFamily: 'Geist, sans-serif', fontWeight: 500 }}>Simuler la réduction de dose</span>
         </button>
      </div>
      
      {/* PANNEAU CENTRAL — Timeline de simulation */}
      <div className="flex-1 p-6 flex flex-col relative" style={COMMON_STYLES.card}>
         <div className="flex justify-between items-center mb-6">
            <h3 style={COMMON_STYLES.label}>TRAJECTOIRE PROSPECTIVE (365 JOURS)</h3>
            <span style={{...COMMON_STYLES.label, color: CLINICAL_TEAL_COLORS.accentRed}}>ZONE CRITIQUE {'>'} 50%</span>
         </div>
         
         <div className="flex-1 w-full bg-[#030A0B] relative overflow-hidden border" style={{ borderColor: CLINICAL_TEAL_COLORS.border }}>
            {/* Simulation zones & graphs (mocked via SVG) */}
            <svg width="100%" height="100%" preserveAspectRatio="none" viewBox="0 0 1000 400">
               {/* Grille */}
               <path d="M 0 100 L 1000 100 M 0 200 L 1000 200 M 0 300 L 1000 300" stroke="#11333A" strokeWidth="1" strokeDasharray="4 4" />
               <path d="M 200 0 L 200 400 M 400 0 L 400 400 M 600 0 L 600 400 M 800 0 L 800 400" stroke="#11333A" strokeWidth="1" strokeDasharray="4 4" />
               
               {/* Zone Rouge (risque de rechute) */}
               <rect x="0" y="0" width="1000" height="200" fill="rgba(248, 113, 113, 0.05)" />
               <line x1="0" y1="200" x2="1000" y2="200" stroke="#F87171" strokeWidth="1" strokeDasharray="8 4" opacity="0.5" />
               
               {/* Ligne bleue (Trajectoire actuelle calibrée) */}
               <path d="M 0 220 Q 200 210, 400 250 T 800 260 L 1000 270" fill="none" stroke="#60A5FA" strokeWidth="2" />
               
               {/* Ligne rouge (Scénario) */}
               {scenario !== 'CURRENT' && (
                 <path d="M 0 220 Q 150 200, 300 120 T 600 50 L 1000 40" fill="none" stroke="#F87171" strokeWidth="2" strokeDasharray="4 4" />
               )}
               
               {/* Marqueur de rechute */}
               {scenario === 'STOP' && (
                 <g transform="translate(300, 120)">
                    <circle cx="0" cy="0" r="6" fill="#F87171" />
                    <line x1="-4" y1="-4" x2="4" y2="4" stroke="#051114" strokeWidth="2" />
                    <line x1="-4" y1="4" x2="4" y2="-4" stroke="#051114" strokeWidth="2" />
                    <rect x="15" y="-12" width="230" height="24" fill="#0A1A1E" stroke="#11333A" rx="0" />
                    <text x="25" y="4" fill="#E2F1F3" fontSize="12" fontFamily="Geist, sans-serif">Réhospitalisation probable : Jour 47</text>
                 </g>
               )}
            </svg>
         </div>
         
         <div className="absolute bottom-10 right-10 text-right opacity-50" style={{ fontFamily: 'JetBrains Mono', fontSize: '10px', color: CLINICAL_TEAL_COLORS.textSecondary }}>
            NOTE P1 : Le Digital Twin nécessite ≥6 mois de données longitudinales.<br />
            Simulation calibrée sur données de population avant calibration individuelle.
         </div>
      </div>
      
      {/* PANNEAU BAS — Résumé chiffré */}
      <div className="p-6 grid grid-cols-2 gap-6" style={COMMON_STYLES.card}>
         <div className="space-y-2 border-r pr-6" style={{ borderColor: CLINICAL_TEAL_COLORS.border }}>
            <h4 style={{ ...COMMON_STYLES.label, color: CLINICAL_TEAL_COLORS.accentRed }}>IMPACT CLINIQUE & FINANCIER</h4>
            <p style={{ fontFamily: 'Geist, sans-serif', color: CLINICAL_TEAL_COLORS.textMain, lineHeight: 1.6 }}>
               Probabilité de rechute maniaque à 90 jours : <span style={{ color: CLINICAL_TEAL_COLORS.accentRed, fontWeight: 600 }}>73%</span>.<br />
               Délai médian de réhospitalisation : <span style={{ color: CLINICAL_TEAL_COLORS.accentGold }}>47 jours</span>.<br />
               Coût estimé : <span style={COMMON_STYLES.value}>€18,200</span>.
            </p>
         </div>
         <div className="space-y-2">
            <h4 style={{ ...COMMON_STYLES.label, color: CLINICAL_TEAL_COLORS.accentAmber }}>SCÉNARIO CONTRE-FACTUEL</h4>
            <p style={{ fontFamily: 'Geist, sans-serif', color: CLINICAL_TEAL_COLORS.textMain, lineHeight: 1.6 }}>
               Si switch Lithium → Lamotrigine : probabilité d'observance <span style={{ color: CLINICAL_TEAL_COLORS.accentGreen }}>81%</span> vs 68% actuelle.<br />
               Attention : Risque dépressif multiplié par 1.4 d'après le sous-modèle métabolique.
            </p>
         </div>
      </div>
    </div>
  );
}
