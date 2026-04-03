"use client";

import React, { useState, useEffect } from 'react';
import { CLINICAL_TEAL_COLORS, COMMON_STYLES } from '../shared/constants';
import { MHFS_COMPONENTS } from '../shared/mock-data';
import { PieChart, Shield } from 'lucide-react';

export default function MHFSScoreView() {
  const [apiMhfs, setApiMhfs] = useState<any[]>([]);
  useEffect(() => {
    fetch('/api/observance/mhfs')
      .then(r => r.json())
      .then(d => { if (Array.isArray(d) && d.length > 0) setApiMhfs(d); })
      .catch(() => {});
  }, []);
  const mhfsRef = apiMhfs.length > 0 ? apiMhfs : MHFS_COMPONENTS;

  const [financial, setFinancial] = useState(85);
  const [pattern, setPattern] = useState(60);
  const [hmmState, setHmmState] = useState(70);
  const [emaQual, setEmaQual] = useState(90);
  const [outcomes, setOutcomes] = useState(40);
  const [caregiver, setCaregiver] = useState(50);
  
  // Calculate MHFS Score (0-1000)
  const score = Math.round(
    (financial * 2.5) +
    (pattern * 2.5) +
    (hmmState * 2.0) +
    (emaQual * 1.5) +
    (outcomes * 1.0) +
    (caregiver * 0.5)
  );

  let scoreColor = CLINICAL_TEAL_COLORS.accentGreen;
  if (score < 400) scoreColor = CLINICAL_TEAL_COLORS.accentRed;
  else if (score < 600) scoreColor = CLINICAL_TEAL_COLORS.accentAmber;
  else if (score > 800) scoreColor = CLINICAL_TEAL_COLORS.accentGold;

  return (
    <div className="flex flex-col space-y-6 h-full overflow-hidden text-sm">
      <h2 style={COMMON_STYLES.sectionTitle}>Mental Health Financial Score (MHFS)</h2>
      
      <div className="flex flex-1 space-x-6 min-h-0">
        
        {/* PANNEAU GAUCHE — Anatomie du MHFS */}
        <div className="w-1/3 p-6 flex flex-col items-center justify-center relative" style={COMMON_STYLES.card}>
           <div className="absolute top-6 left-6 flex items-center space-x-2">
              <PieChart size={18} color={CLINICAL_TEAL_COLORS.accentTeal} />
              <h3 style={COMMON_STYLES.label}>ANATOMIE DU SCORE</h3>
           </div>
           
           <div className="w-48 h-48 relative mt-8">
              {/* Fake Donut Chart via SVG */}
              <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                 {/* Background */}
                 <circle cx="50" cy="50" r="40" fill="transparent" stroke="#11333A" strokeWidth="15" />
                 
                 {/* Flux financiers (25%) */}
                 <circle cx="50" cy="50" r="40" fill="transparent" stroke="#C084FC" strokeWidth="15" strokeDasharray="62.8 188.4" strokeDashoffset="0" />
                 {/* Observance (25%) */}
                 <circle cx="50" cy="50" r="40" fill="transparent" stroke="#2DD4BF" strokeWidth="15" strokeDasharray="62.8 188.4" strokeDashoffset="-62.8" />
                 {/* HMM (20%) */}
                 <circle cx="50" cy="50" r="40" fill="transparent" stroke="#4ADE80" strokeWidth="15" strokeDasharray="50.2 201" strokeDashoffset="-125.6" />
                 {/* EMA (15%) */}
                 <circle cx="50" cy="50" r="40" fill="transparent" stroke="#60A5FA" strokeWidth="15" strokeDasharray="37.7 213.5" strokeDashoffset="-175.8" />
                 {/* Outcomes (10%) */}
                 <circle cx="50" cy="50" r="40" fill="transparent" stroke="#EAB308" strokeWidth="15" strokeDasharray="25.1 226.1" strokeDashoffset="-213.5" />
                 {/* Caregiver (5%) */}
                 <circle cx="50" cy="50" r="40" fill="transparent" stroke="#A7F3D0" strokeWidth="15" strokeDasharray="12.5 238.7" strokeDashoffset="-238.6" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                 <span style={{ fontFamily: 'JetBrains Mono', fontSize: '24px', fontWeight: 600, color: CLINICAL_TEAL_COLORS.textMain }}>1000</span>
              </div>
           </div>
           
           <div className="mt-8 w-full space-y-2 text-xs" style={{ fontFamily: 'Geist, sans-serif' }}>
              <div className="flex justify-between items-center"><span className="flex items-center"><div className="w-2 h-2 rounded-full bg-[#C084FC] mr-2"/>Flux financiers MYNε</span> <span style={COMMON_STYLES.value}>25%</span></div>
              <div className="flex justify-between items-center"><span className="flex items-center"><div className="w-2 h-2 rounded-full bg-[#2DD4BF] mr-2"/>Pattern d'observance</span> <span style={COMMON_STYLES.value}>25%</span></div>
              <div className="flex justify-between items-center"><span className="flex items-center"><div className="w-2 h-2 rounded-full bg-[#4ADE80] mr-2"/>Stabilité HMM</span> <span style={COMMON_STYLES.value}>20%</span></div>
              <div className="flex justify-between items-center"><span className="flex items-center"><div className="w-2 h-2 rounded-full bg-[#60A5FA] mr-2"/>Qualité EMA</span> <span style={COMMON_STYLES.value}>15%</span></div>
              <div className="flex justify-between items-center"><span className="flex items-center"><div className="w-2 h-2 rounded-full bg-[#EAB308] mr-2"/>Outcomes Cliniques</span> <span style={COMMON_STYLES.value}>10%</span></div>
              <div className="flex justify-between items-center"><span className="flex items-center"><div className="w-2 h-2 rounded-full bg-[#A7F3D0] mr-2"/>État Aidant</span> <span style={COMMON_STYLES.value}>5%</span></div>
           </div>
        </div>
        
        {/* PANNEAU CENTRAL — Simulateur de score */}
        <div className="flex-1 p-6 flex flex-col" style={COMMON_STYLES.card}>
           <div className="flex justify-between items-center mb-6 border-b pb-4" style={{ borderColor: CLINICAL_TEAL_COLORS.border }}>
              <h3 style={COMMON_STYLES.label}>SIMULATEUR TEMPS RÉEL</h3>
              <div className="text-right">
                 <div style={COMMON_STYLES.label}>SCORE MHFS COMPOSITE</div>
                 <div style={{ fontFamily: 'JetBrains Mono', fontSize: '42px', fontWeight: 600, color: scoreColor }}>
                    {score}
                 </div>
              </div>
           </div>
           
           <div className="grid grid-cols-2 gap-x-8 gap-y-6">
              {[
                 { label: "Flux financiers", val: financial, set: setFinancial, color: "accent-purple-500" },
                 { label: "Observance", val: pattern, set: setPattern, color: "accent-teal-500" },
                 { label: "HMM Stabilité", val: hmmState, set: setHmmState, color: "accent-green-500" },
                 { label: "Qualité EMA", val: emaQual, set: setEmaQual, color: "accent-blue-500" },
                 { label: "Outcomes", val: outcomes, set: setOutcomes, color: "accent-yellow-500" },
                 { label: "Caregiver", val: caregiver, set: setCaregiver, color: "accent-emerald-300" },
              ].map(slider => (
                 <div key={slider.label} className="space-y-2">
                    <div className="flex justify-between" style={COMMON_STYLES.label}>
                       <span style={{ color: CLINICAL_TEAL_COLORS.textMain, textTransform: 'none' }}>{slider.label}</span>
                       <span style={COMMON_STYLES.value}>{slider.val}/100</span>
                    </div>
                    <input type="range" min="0" max="100" value={slider.val} onChange={e => slider.set(Number(e.target.value))} className={`w-full ${slider.color}`} />
                 </div>
              ))}
           </div>
        </div>
      </div>
      
      {/* PANNEAU BAS — Circuit fermé en 8 étapes */}
      <div className="p-6 h-64 relative flex items-center justify-center overflow-hidden" style={COMMON_STYLES.card}>
         {/* Fake Circle Network via SVG */}
         <div className="absolute inset-0 pointer-events-none opacity-20">
            <svg width="100%" height="100%">
               <circle cx="50%" cy="50%" r="200" fill="transparent" stroke="#2DD4BF" strokeWidth="1" strokeDasharray="4 4" />
            </svg>
         </div>
         
         <div className="text-center z-10 space-y-4">
            <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '18px', color: CLINICAL_TEAL_COLORS.accentGold, letterSpacing: '0.05em' }}>
               LA MALADIE CHRONIQUE COMME ACTIF FINANCIER PRODUCTIF
            </div>
            
            <div className="flex items-center justify-center space-x-2 flex-wrap max-w-4xl mx-auto text-xs" style={{ fontFamily: 'JetBrains Mono', color: CLINICAL_TEAL_COLORS.textSecondary }}>
               <span>NOOS</span><span className="text-teal-500">→</span>
               <span>OBSERVANCE</span><span className="text-teal-500">→</span>
               <span>MYNε (€)</span><span className="text-teal-500">→</span>
               <span>MIZAN</span><span className="text-teal-500">→</span>
               <span className="text-white">MHFS</span><span className="text-teal-500">→</span>
               <span>MICRO-CRÉDIT</span><span className="text-teal-500">→</span>
               <span>INVEST. RETAIL</span><span className="text-teal-500">→</span>
               <span>STABILITÉ SOCIALE</span>
            </div>
         </div>
         
         <div className="absolute top-4 left-4 p-3 bg-[#0A1A1E]" style={{ border: `1px solid ${CLINICAL_TEAL_COLORS.border}`, borderLeft: `3px solid ${CLINICAL_TEAL_COLORS.accentTeal}`, maxWidth: '300px' }}>
            <div className="flex items-center space-x-2 mb-1">
               <Shield size={14} color={CLINICAL_TEAL_COLORS.accentTeal} />
               <div style={{ ...COMMON_STYLES.label, color: CLINICAL_TEAL_COLORS.accentTeal }}>GARDE-FOUS ÉTHIQUES</div>
            </div>
            <div className="text-[10px]" style={{ fontFamily: 'Geist, sans-serif', color: CLINICAL_TEAL_COLORS.textSecondary, lineHeight: 1.4 }}>
               Le MHFS n'est jamais utilisé pour refuser un soin. L'observance est un bonus, jamais un malus. ÆLYA contrôle la divulgation. Le patient est propriétaire de son score.
            </div>
         </div>
      </div>
      
    </div>
  );
}
