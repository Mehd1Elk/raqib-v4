"use client";

import React, { useState } from 'react';
import { CLINICAL_TEAL_COLORS, COMMON_STYLES } from '../shared/constants';
import { AlertTriangle, Fingerprint, ShieldAlert } from 'lucide-react';

export default function RelapseForensicsView() {
  const [selectedCase, setSelectedCase] = useState('P-892A');
  
  const CASES = [
    { id: 'P-892A', mol: 'Lithium', date: '12 Nov 2025', stable: '14 mois', cost: '€18,200', cause: 'Épuisement aidant', active: true },
    { id: 'P-441B', mol: 'Aripiprazole', date: '04 Oct 2025', stable: '8 mois', cost: '€12,500', cause: 'Trou d\'observance', active: false },
    { id: 'P-112C', mol: 'Olanzapine', date: '21 Sep 2025', stable: '22 mois', cost: '€21,000', cause: 'Intolérance métabolique', active: false },
    { id: 'P-992D', mol: 'Quetiapine', date: '05 Sep 2025', stable: '5 mois', cost: '€9,800', cause: 'Arrêt brutal', active: false },
    { id: 'P-505E', mol: 'Risperidone', date: '14 Aou 2025', stable: '11 mois', cost: '€15,300', cause: 'Facteur environnemental', active: false },
    { id: 'P-334F', mol: 'Lamotrigine', date: '02 Jui 2025', stable: '18 mois', cost: '€19,100', cause: 'Interaction médicamenteuse', active: false },
    { id: 'P-772G', mol: 'Lithium', date: '19 Jun 2025', stable: '9 mois', cost: '€11,200', cause: 'Toxicité rénale légère', active: false },
    { id: 'P-221H', mol: 'Aripiprazole', date: '08 Mai 2025', stable: '31 mois', cost: '€24,500', cause: 'Stress aigu', active: false },
    { id: 'P-663I', mol: 'Olanzapine', date: '22 Avr 2025', stable: '4 mois', cost: '€8,900', cause: 'Sédation diurne', active: false },
    { id: 'P-884J', mol: 'Quetiapine', date: '11 Mar 2025', stable: '16 mois', cost: '€16,000', cause: 'Oubli répété', active: false },
  ];

  const TIMELINE_EVENTS = [
    { dy: -45, title: "Aidant signale fatigue (EMA aidant : score 3/10)", color: CLINICAL_TEAL_COLORS.accentAmber },
    { dy: -38, title: "Entropie EMA patient augmente de 0.3 → 0.7", color: CLINICAL_TEAL_COLORS.accentAmber },
    { dy: -30, title: "Refill en retard de 3 jours", color: CLINICAL_TEAL_COLORS.accentAmber },
    { dy: -25, title: "Linguistic proof absent — patient ne nomme plus les tremblements", color: CLINICAL_TEAL_COLORS.accentAmber },
    { dy: -21, title: "HMM transition 2→3 — ALERTE FRAGILISATION", color: CLINICAL_TEAL_COLORS.accentRed },
    { dy: -14, title: "Intervention psychiatre — appel téléphonique (délai : 7j vs cible 48-72h)", color: CLINICAL_TEAL_COLORS.accentRed },
    { dy: -7, title: "HMM transition 3→4 — RUPTURE CONFIRMÉE", color: CLINICAL_TEAL_COLORS.accentRed },
    { dy: 0, title: "Réhospitalisation — Service d'urgence — Coût : €18,200", color: CLINICAL_TEAL_COLORS.accentRed },
  ];
  
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
