"use client";

import React, { useState } from 'react';
import { CLINICAL_TEAL_COLORS, COMMON_STYLES } from '../shared/constants';
import { FORENSICS_CASES } from '../shared/mock-data';
import { AlertTriangle, Fingerprint, ShieldAlert } from 'lucide-react';

export default function RelapseForensicsView() {
  const [selectedCase, setSelectedCase] = useState(FORENSICS_CASES[0]?.id ?? 'P-892A');

  const CASES = FORENSICS_CASES.map((c, i) => ({
    id: c.id,
    mol: c.molecule,
    date: c.dateRelapse,
    stable: c.stableDuration,
    cost: `€${c.costHospitalization.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}`,
    cause: c.cause,
    active: i === 0,
  }));

  const currentCase = FORENSICS_CASES.find(c => c.id === selectedCase) ?? FORENSICS_CASES[0];
  const TIMELINE_EVENTS = currentCase.timeline.map(t => ({
    dy: t.day,
    title: t.event,
    color: t.day >= -7 ? CLINICAL_TEAL_COLORS.accentRed : CLINICAL_TEAL_COLORS.accentAmber,
  }));
  
  return (
    <div className="flex flex-col space-y-6 h-full overflow-hidden text-sm">
      <h2 style={COMMON_STYLES.sectionTitle}>Relapse Forensics</h2>
      
      {/* PANNEAU HAUT — Sélection du cas */}
      <div className="p-0 overflow-x-auto" style={COMMON_STYLES.card}>
         <table className="w-full text-left whitespace-nowrap" style={{ borderCollapse: 'collapse', fontFamily: 'Geist, sans-serif' }}>
            <thead>
               <tr>
                  {['Patient ID', 'Molécule', 'Date rechute', 'Stabilité avant', 'Coût hospitalisation'].map((h, i) => (
                     <th key={i} className="p-4 bg-[#11333A]/30 text-xs" style={{ ...COMMON_STYLES.label, ...COMMON_STYLES.separator }}>{h}</th>
                  ))}
               </tr>
            </thead>
            <tbody>
               {CASES.slice(0, 5).map(c => (
                  <tr key={c.id} 
                      onClick={() => setSelectedCase(c.id)}
                      className="cursor-pointer transition-colors" 
                      style={{ 
                         ...COMMON_STYLES.separator, 
                         backgroundColor: selectedCase === c.id ? 'rgba(45, 212, 191, 0.1)' : 'transparent',
                         borderLeft: selectedCase === c.id ? `4px solid ${CLINICAL_TEAL_COLORS.accentTeal}` : '4px solid transparent'
                      }}>
                     <td className="p-4" style={{ fontFamily: 'JetBrains Mono', color: CLINICAL_TEAL_COLORS.accentTeal }}>{c.id}</td>
                     <td className="p-4" style={{ color: CLINICAL_TEAL_COLORS.textMain }}>{c.mol}</td>
                     <td className="p-4" style={{ color: CLINICAL_TEAL_COLORS.textSecondary }}>{c.date}</td>
                     <td className="p-4" style={{ color: CLINICAL_TEAL_COLORS.textMain }}>{c.stable}</td>
                     <td className="p-4 font-bold" style={{ color: CLINICAL_TEAL_COLORS.accentRed }}>{c.cost}</td>
                  </tr>
               ))}
            </tbody>
         </table>
      </div>
      
      <div className="flex flex-1 space-x-6 min-h-0">
         {/* PANNEAU CENTRAL — Autopsie chronologique */}
         <div className="w-2/3 p-6 flex flex-col overflow-y-auto" style={COMMON_STYLES.card}>
            <div className="flex items-center space-x-2 mb-6">
               <Fingerprint size={18} color={CLINICAL_TEAL_COLORS.accentTeal} />
               <h3 style={COMMON_STYLES.label}>AUTOPSIE CHRONOLOGIQUE</h3>
            </div>
            
            <div className="relative border-l ml-4 space-y-6 flex-1" style={{ borderColor: CLINICAL_TEAL_COLORS.border }}>
               {TIMELINE_EVENTS.map((ev, i) => (
                  <div key={i} className="relative pl-6">
                     <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full" style={{ backgroundColor: ev.color, boxShadow: ev.dy === 0 ? `0 0 10px ${ev.color}` : 'none' }} />
                     <div className="flex space-x-4 items-start">
                        <div className="w-16 font-bold pt-0.5" style={{ fontFamily: 'JetBrains Mono', color: ev.color }}>J{ev.dy}</div>
                        <div className="flex-1" style={{ fontFamily: 'Geist, sans-serif', color: CLINICAL_TEAL_COLORS.textMain, fontWeight: ev.dy === 0 || ev.dy === -7 ? 600 : 400 }}>
                           {ev.title}
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         </div>
         
         {/* PANNEAU BAS — Root Cause Analysis */}
         <div className="w-1/3 flex flex-col space-y-6">
            <div className="p-6 flex-1 space-y-6" style={COMMON_STYLES.card}>
               <div className="flex items-center space-x-2 border-b pb-4" style={{ borderColor: CLINICAL_TEAL_COLORS.border }}>
                  <ShieldAlert size={18} color={CLINICAL_TEAL_COLORS.accentAmber} />
                  <h3 style={COMMON_STYLES.label}>ROOT CAUSE ANALYSIS</h3>
               </div>
               
               <div className="space-y-4">
                  <div>
                     <div style={{ ...COMMON_STYLES.label, color: CLINICAL_TEAL_COLORS.accentRed }}>CAUSE PRIMAIRE</div>
                     <div className="mt-1" style={{ fontFamily: 'Geist, sans-serif', color: CLINICAL_TEAL_COLORS.textMain }}>Épuisement aidant (non détecté — onglet Caregiver non activé)</div>
                  </div>
                  <div>
                     <div style={{ ...COMMON_STYLES.label, color: CLINICAL_TEAL_COLORS.accentAmber }}>CAUSE SECONDAIRE</div>
                     <div className="mt-1" style={{ fontFamily: 'Geist, sans-serif', color: CLINICAL_TEAL_COLORS.textMain }}>Retard d'intervention (7j vs cible 48-72h)</div>
                  </div>
                  <div>
                     <div style={{ ...COMMON_STYLES.label, color: CLINICAL_TEAL_COLORS.textSecondary }}>FACTEUR ENVIRONNEMENTAL</div>
                     <div className="mt-1" style={{ fontFamily: 'Geist, sans-serif', color: CLINICAL_TEAL_COLORS.textMain }}>Ramadan (RAQIB non pondéré)</div>
                  </div>
                  <div className="mt-6 p-4 bg-teal-900/20 border" style={{ borderColor: CLINICAL_TEAL_COLORS.border }}>
                     <div style={{ ...COMMON_STYLES.label, color: CLINICAL_TEAL_COLORS.accentTeal }}>RECOMMANDATION SYSTÈME</div>
                     <div className="mt-2 text-[13px]" style={{ fontFamily: 'Geist, sans-serif', color: CLINICAL_TEAL_COLORS.textMain, lineHeight: 1.5 }}>
                        Activer Caregiver Shadow Tracking.<br/>Réduire seuil alerte HMM→3 pendant Ramadan.
                     </div>
                  </div>
               </div>
            </div>
            
            <div className="p-4 flex items-center justify-between" style={{ ...COMMON_STYLES.card, borderColor: CLINICAL_TEAL_COLORS.accentGold }}>
               <div className="flex-1">
                  <div style={{ ...COMMON_STYLES.label, color: CLINICAL_TEAL_COLORS.accentGold }}>PRODUIT DATA CESSIBLE</div>
                  <div className="text-[11px] mt-1" style={{ fontFamily: 'JetBrains Mono', color: CLINICAL_TEAL_COLORS.textSecondary }}>Acheteurs : Assureurs, JCIA, Pharma</div>
               </div>
               <div style={{ ...COMMON_STYLES.value, fontSize: '20px', color: CLINICAL_TEAL_COLORS.accentGold }}>€500-2k</div>
            </div>
         </div>
      </div>
    </div>
  );
}
