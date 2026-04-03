"use client";

import React from 'react';
import { CLINICAL_TEAL_COLORS, COMMON_STYLES } from '../shared/constants';
import { Network, ArrowRight } from 'lucide-react';

export default function PosologyOptimizationView() {
  
  return (
    <div className="flex flex-col space-y-6 h-full overflow-hidden text-sm">
      <h2 style={COMMON_STYLES.sectionTitle}>Posology Optimization</h2>
      
      <div className="flex flex-1 space-x-6 min-h-0">
        
        {/* PANNEAU GAUCHE — Pattern Temporel & Recommandation */}
        <div className="w-1/2 space-y-6 flex flex-col">
           {/* PANNEAU HAUT — Pattern temporel de prise */}
           <div className="p-6 flex flex-col h-1/2" style={COMMON_STYLES.card}>
              <h3 style={COMMON_STYLES.label} className="mb-4">PATTERN TEMPOREL (7j × 24h)</h3>
              <div className="flex-1 w-full bg-[#030A0B] relative">
                 {/* Mock Heatmap */}
                 <div className="absolute inset-0 flex">
                    <div className="w-12 border-r flex flex-col justify-between py-2 text-xs" style={{ borderColor: CLINICAL_TEAL_COLORS.border, color: CLINICAL_TEAL_COLORS.textSecondary, fontFamily: 'JetBrains Mono' }}>
                       <span>00h</span><span>06h</span><span>12h</span><span>18h</span><span>24h</span>
                    </div>
                    <div className="flex-1 flex flex-col justify-around p-2">
                       {[0,1,2,3,4,5,6].map(day => (
                          <div key={day} className="flex h-6 w-full gap-1">
                             {Array.from({length: 24}).map((_, h) => {
                               let opacity = 0.05; // default empty
                               if (h >= 7 && h <= 9) opacity = 0.9; // Morning 92%
                               if (h >= 12 && h <= 14) opacity = 0.2; // Noon 28%
                               if (h >= 19 && h <= 21) opacity = 0.8; // Night 85%
                               
                               // Randomize a bit
                               opacity = Math.max(0.05, opacity - (Math.random() * 0.2));
                               
                               return <div key={`${day}-${h}`} className="flex-1 rounded-sm" style={{ backgroundColor: CLINICAL_TEAL_COLORS.accentTeal, opacity }} />
                             })}
                          </div>
                       ))}
                    </div>
                 </div>
              </div>
              <div className="mt-4 flex justify-between" style={{ fontFamily: 'Geist, sans-serif', color: CLINICAL_TEAL_COLORS.textMain }}>
                 <div className="flex items-center space-x-2"><div className="w-3 h-3 bg-[#2DD4BF] opacity-90" /><span>Matin: 92%</span></div>
                 <div className="flex items-center space-x-2"><div className="w-3 h-3 bg-[#2DD4BF] opacity-20" /><span>Midi: 28%</span></div>
                 <div className="flex items-center space-x-2"><div className="w-3 h-3 bg-[#2DD4BF] opacity-80" /><span>Soir: 85%</span></div>
              </div>
           </div>
           
           {/* PANNEAU CENTRAL — Recommandation algorithmique */}
           <div className="p-6 flex-1 flex flex-col justify-center" style={{ ...COMMON_STYLES.card, borderColor: CLINICAL_TEAL_COLORS.accentGold }}>
              <div className="flex items-center space-x-2 mb-4">
                 <Network size={20} color={CLINICAL_TEAL_COLORS.accentGold} />
                 <h3 style={{ ...COMMON_STYLES.label, color: CLINICAL_TEAL_COLORS.accentGold }}>RECOMMANDATION ALGORITHMIQUE [NOOS]</h3>
              </div>
              <p style={{ fontFamily: 'Geist, sans-serif', color: CLINICAL_TEAL_COLORS.textMain, fontSize: '15px', lineHeight: 1.6 }} className="mb-4">
                 Le patient manque la dose de midi 72% du temps (trou d'observance diurne flagrant).<br/><br/>
                 <strong>Recommandation clinique :</strong> Passage à un schéma en biprise (matin 500mg + soir 400mg). Contrôle de la lithiémie à J14 fortement recommandé.
              </p>
              
              <div className="flex justify-between items-center p-4 bg-[#11333A]/20">
                 <div className="text-center">
                    <div style={COMMON_STYLES.label}>OBSERVANCE PROJETÉE</div>
                    <div style={{ ...COMMON_STYLES.value, fontSize: '20px', color: CLINICAL_TEAL_COLORS.accentGreen }}>91% <span className="text-sm opacity-50">vs 58%</span></div>
                 </div>
                 <ArrowRight color={CLINICAL_TEAL_COLORS.textSecondary} />
                 <div className="text-center">
                    <div style={COMMON_STYLES.label}>IMPACT MHFS PROJETÉ</div>
                    <div style={{ ...COMMON_STYLES.value, fontSize: '20px', color: CLINICAL_TEAL_COLORS.accentGold }}>+87 pts</div>
                 </div>
              </div>
           </div>
        </div>
        
        {/* PANNEAU DROIT — Historique des ajustements */}
        <div className="w-1/2 p-6 flex flex-col relative" style={COMMON_STYLES.card}>
           <h3 style={COMMON_STYLES.label} className="mb-6">HISTORIQUE DES AJUSTEMENTS (12 MOIS)</h3>
           
           <div className="flex-1 overflow-auto">
              <table className="w-full text-left" style={{ borderCollapse: 'collapse', fontFamily: 'Geist, sans-serif' }}>
                 <thead>
                    <tr>
                       <th className="pb-3 text-xs" style={{ ...COMMON_STYLES.label, ...COMMON_STYLES.separator }}>Date</th>
                       <th className="pb-3 text-xs" style={{ ...COMMON_STYLES.label, ...COMMON_STYLES.separator }}>Changement</th>
                       <th className="pb-3 text-xs" style={{ ...COMMON_STYLES.label, ...COMMON_STYLES.separator }}>Résultat Obs.</th>
                    </tr>
                 </thead>
                 <tbody>
                    {[
                      { date: "12 Oct 2025", desc: "Triprise → Biprise", res: "+33%", color: CLINICAL_TEAL_COLORS.accentGreen },
                      { date: "04 Aou 2025", desc: "Augmentation dose soir", res: "-12%", color: CLINICAL_TEAL_COLORS.accentRed },
                      { date: "15 Mai 2025", desc: "Switch Lamotrigine", res: "+45%", color: CLINICAL_TEAL_COLORS.accentGreen },
                      { date: "02 Fev 2025", desc: "Biprise → Triprise", res: "-20%", color: CLINICAL_TEAL_COLORS.accentRed },
                      { date: "10 Nov 2024", desc: "Initiation Lithium", res: "65%", color: CLINICAL_TEAL_COLORS.textSecondary },
                    ].map((row, i) => (
                       <tr key={i} className="hover:bg-white/5" style={COMMON_STYLES.separator}>
                          <td className="py-4" style={{ fontFamily: 'JetBrains Mono', color: CLINICAL_TEAL_COLORS.textSecondary }}>{row.date}</td>
                          <td className="py-4" style={{ color: CLINICAL_TEAL_COLORS.textMain }}>{row.desc}</td>
                          <td className="py-4 font-bold" style={{ color: row.color, fontFamily: 'JetBrains Mono' }}>{row.res}</td>
                       </tr>
                    ))}
                 </tbody>
              </table>
           </div>
           
           <div className="absolute bottom-6 left-6 right-6 pt-4 border-t opacity-50 text-justify" style={{ borderColor: CLINICAL_TEAL_COLORS.border, fontFamily: 'JetBrains Mono', fontSize: '10px', color: CLINICAL_TEAL_COLORS.textSecondary }}>
              NOTE P2 : Classification réglementaire — aide à la décision clinique, pas dispositif de prescription. Le psychiatre décide in fine. L'algorithme NOOS propose uniquement un ajustement de confort basé sur les lois de probabilité comportementale.
           </div>
        </div>
        
      </div>
    </div>
  );
}
