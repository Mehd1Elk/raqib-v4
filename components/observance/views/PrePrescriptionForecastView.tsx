"use client";

import React, { useState } from 'react';
import { CLINICAL_TEAL_COLORS, COMMON_STYLES } from '../shared/constants';
import { Activity, Beaker, FileCheck2 } from 'lucide-react';

export default function PrePrescriptionForecastView() {
  const [age, setAge] = useState(34);
  const [comorbidities, setComorbidities] = useState(1);
  const [nightShift, setNightShift] = useState(false);
  const [weightGainToleration, setWeightGainToleration] = useState(2);
  const [sedationToleration, setSedationToleration] = useState(1);
  
  return (
    <div className="flex flex-col space-y-6 h-full overflow-hidden text-sm">
      <h2 style={COMMON_STYLES.sectionTitle}>Pre-Prescription Forecast</h2>
      
      <div className="flex space-x-6 flex-1 min-h-0">
        
        {/* PANNEAU GAUCHE — Profil patient pré-prescription */}
        <div className="w-1/3 p-6 space-y-6 flex flex-col overflow-y-auto" style={COMMON_STYLES.card}>
          <div className="flex items-center space-x-2 border-b pb-4" style={{ borderColor: CLINICAL_TEAL_COLORS.border }}>
            <Activity size={18} color={CLINICAL_TEAL_COLORS.accentTeal} />
            <h3 style={COMMON_STYLES.label}>PROFIL PATIENT PRÉ-PRESCRIPTION</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-2" style={COMMON_STYLES.separator}>
               <span style={{color: CLINICAL_TEAL_COLORS.textMain, fontFamily: 'Geist, sans-serif'}}>Âge</span>
               <input type="number" value={age} onChange={e => setAge(Number(e.target.value))} className="w-16 bg-transparent text-right border-none outline-none" style={COMMON_STYLES.value} />
            </div>
            
            <div className="flex justify-between items-center pb-2" style={COMMON_STYLES.separator}>
               <span style={{color: CLINICAL_TEAL_COLORS.textMain, fontFamily: 'Geist, sans-serif'}}>Comorbidités métaboliques</span>
               <input type="number" value={comorbidities} onChange={e => setComorbidities(Number(e.target.value))} className="w-16 bg-transparent text-right border-none outline-none" style={COMMON_STYLES.value} />
            </div>

            <div className="flex justify-between items-center pb-2" style={COMMON_STYLES.separator}>
               <span style={{color: CLINICAL_TEAL_COLORS.textMain, fontFamily: 'Geist, sans-serif'}}>Travail de nuit (3x8)</span>
               <input type="checkbox" checked={nightShift} onChange={e => setNightShift(e.target.checked)} className="accent-teal-500" />
            </div>
            
            <div className="space-y-2 pt-4">
               <label className="flex justify-between" style={COMMON_STYLES.label}>
                 <span>Tolérance prise de poids</span>
                 <span>{weightGainToleration}/5</span>
               </label>
               <input type="range" min="0" max="5" value={weightGainToleration} onChange={e => setWeightGainToleration(Number(e.target.value))} className="w-full accent-teal-500" />
            </div>
            
            <div className="space-y-2 pt-4">
               <label className="flex justify-between" style={COMMON_STYLES.label}>
                 <span>Tolérance Sédation</span>
                 <span>{sedationToleration}/5</span>
               </label>
               <input type="range" min="0" max="5" value={sedationToleration} onChange={e => setSedationToleration(Number(e.target.value))} className="w-full accent-teal-500" />
            </div>
          </div>
        </div>

        {/* PANNEAU DROIT — Forecast comparatif */}
        <div className="w-2/3 p-6 space-y-6 flex flex-col" style={COMMON_STYLES.card}>
           <div className="flex items-center space-x-2 border-b pb-4" style={{ borderColor: CLINICAL_TEAL_COLORS.border }}>
            <Beaker size={18} color={CLINICAL_TEAL_COLORS.accentTeal} />
            <h3 style={COMMON_STYLES.label}>FORECAST COMPARATIF (6 MOIS)</h3>
          </div>
          
          <div className="flex-1 space-y-4">
            {[
              { name: "Aripiprazole LAI mensuel", prob: 89, factors: "monoprise, pas de prise de poids, profil négligent → LAI optimal", color: CLINICAL_TEAL_COLORS.accentGreen },
              { name: "Aripiprazole oral", prob: 62, factors: "risque d'oubli nocturne, fluctuation modérée", color: CLINICAL_TEAL_COLORS.accentAmber },
              { name: "Olanzapine oral", prob: 41, factors: "intolérance au poids signalée, sédation diurne non tolérée", color: CLINICAL_TEAL_COLORS.accentRed },
              { name: "Risperidone LAI", prob: 76, factors: "bon profil d'observance, mais risque d'hyperprolactinémie", color: CLINICAL_TEAL_COLORS.accentTeal }
            ].map(mol => (
              <div key={mol.name} className="p-4" style={{ backgroundColor: 'rgba(255, 255, 255, 0.03)', borderLeft: `4px solid ${mol.color}` }}>
                 <div className="flex justify-between items-start mb-2">
                    <div style={{ fontFamily: 'Geist, sans-serif', color: CLINICAL_TEAL_COLORS.textMain, fontWeight: 500 }}>{mol.name}</div>
                    <div style={{ ...COMMON_STYLES.value, fontSize: '24px', color: mol.color }}>{mol.prob}%</div>
                 </div>
                 <div className="w-full bg-[#11333A] h-2 mb-2">
                    <div className="h-2" style={{ width: `${mol.prob}%`, backgroundColor: mol.color }} />
                 </div>
                 <div style={{ fontFamily: 'Geist, sans-serif', fontSize: '11px', color: CLINICAL_TEAL_COLORS.textSecondary }}>
                    Facteurs : {mol.factors}
                 </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* PANNEAU BAS — Certificat BURHAN */}
      <div className="p-6 flex space-x-6 items-center" style={COMMON_STYLES.card}>
         <div className="bg-teal-900/20 p-4 shrink-0 flex items-center justify-center border" style={{ borderColor: CLINICAL_TEAL_COLORS.border }}>
           <FileCheck2 size={32} color={CLINICAL_TEAL_COLORS.accentTeal} />
         </div>
         <div className="flex-1 space-y-2">
            <h4 style={{ ...COMMON_STYLES.label, color: CLINICAL_TEAL_COLORS.accentGold }}>CERTIFICAT DE JUSTIFICATION ÉCONOMIQUE - BURHAN</h4>
            <p style={{ fontFamily: 'Geist, sans-serif', color: CLINICAL_TEAL_COLORS.textMain, lineHeight: 1.6 }}>
               Pour le switch <strong>aripiprazole oral → aripiprazole LAI mensuel</strong>, le différentiel d'observance prédite (62% → 89%) justifie le surcoût de €180/mois. Économie nette projetée sur 12 mois : €18,200 (réhospitalisations évitées).
            </p>
         </div>
         <div>
            <button className="px-6 py-3 font-semibold transition-colors hover:bg-opacity-80" 
              style={{ backgroundColor: CLINICAL_TEAL_COLORS.accentTeal, color: CLINICAL_TEAL_COLORS.bgMain, fontFamily: 'Geist, sans-serif' }}>
              GÉNÉRER CERTIFICAT BURHAN
            </button>
         </div>
      </div>
    </div>
  );
}
