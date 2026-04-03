"use client";

import React, { useState } from 'react';
import { MOCK_OBSERVANCE_DATA } from '../shared/mock-data';
import { CLINICAL_TEAL_COLORS } from '../shared/constants';
import { HeartHandshake, UserX, Activity, AlertTriangle, ArrowRight, BrainCircuit } from 'lucide-react';

export default function CaregiverShadowView() {
  const { dyads } = MOCK_OBSERVANCE_DATA;
  const [selectedDyad, setSelectedDyad] = useState(dyads[0]);

  const isCorrelated = selectedDyad.patientHMM >= 3 && (selectedDyad.caregiverExt === "Épuisé" || selectedDyad.caregiverExt === "Fragile");

  return (
    <div className="h-full flex flex-col gap-6 animate-in fade-in duration-500">
      
      <div className="flex justify-between items-end mb-2 shrink-0">
        <div>
          <h3 className="font-['Playfair_Display'] text-[24px] text-white">Shadow Tracking Aidant</h3>
          <p className="font-['Geist'] text-[14px] text-[#8A9BA8]">Couplage des états HMM Patient-Aidant (Dyade clinique)</p>
        </div>
      </div>

      {/* MIRROR VIEW */}
      <div className="flex-1 flex gap-6 min-h-0 relative">
        
        {/* LIAISON CENTRALE - absolute to sit between the panels */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 pt-16">
          <div className="w-32 flex flex-col items-center">
            {isCorrelated ? (
              <>
                <ArrowRight size={32} className="text-[#F44336] animate-pulse mb-2" />
                <div className="bg-[rgba(244,67,54,0.1)] border border-[#F44336]/30 text-[#F44336] px-2 py-1 text-[10px] font-['JetBrains_Mono']">
                  CORRELATION {selectedDyad.correlation.toFixed(2)}
                </div>
              </>
            ) : (
              <>
                <ArrowRight size={24} className="text-[#8A9BA8] opacity-50 mb-2" />
                <div className="bg-[#0B0C10] border border-[#15161A] text-[#8A9BA8] px-2 py-1 text-[10px] font-['JetBrains_Mono']">
                  STABLE
                </div>
              </>
            )}
          </div>
        </div>

        {/* GAUCHE - PATIENT */}
        <div className="flex-1 bg-[#15161A] border-r border-[#0B0C10] p-8 flex flex-col">
          <div className="flex items-center gap-4 mb-8">
            <UserX className="text-[#5AACAC]" size={32} />
            <div>
              <h4 className="font-['JetBrains_Mono'] text-[14px] text-white">PATIENT VECTOR</h4>
              <p className="font-['Geist'] text-[12px] text-[#8A9BA8]">Modèle 4 États (HMM)</p>
            </div>
          </div>

          <div className="flex-1 flex flex-col justify-center gap-8">
            <div className="bg-[#0B0C10] p-6 border-l-4" style={{ borderColor: selectedDyad.patientHMM >= 3 ? CLINICAL_TEAL_COLORS.redDisruptive : CLINICAL_TEAL_COLORS.greenAELYA }}>
              <div className="text-[10px] font-['JetBrains_Mono'] text-[#8A9BA8] tracking-widest mb-2">ÉTAT ACTUEL</div>
              <div className="font-['Playfair_Display'] text-[28px] text-white mb-1">HMM {selectedDyad.patientHMM} / 4</div>
              <div className="font-['Geist'] text-[13px] text-[#8A9BA8]">
                {selectedDyad.patientHMM === 1 ? 'Observance Nominale' : 
                 selectedDyad.patientHMM === 2 ? 'Fragilisation (Retards)' : 
                 selectedDyad.patientHMM === 3 ? 'Micro-ruptures (~20% doses)' : 'Rupture Active'}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#0B0C10] p-4 text-center">
                <div className="text-[10px] font-['JetBrains_Mono'] text-[#8A9BA8] mb-1">SCORE ADHÉSION</div>
                <div className="font-['JetBrains_Mono'] text-[18px] text-white">
                  {selectedDyad.patientHMM === 1 ? '94%' : selectedDyad.patientHMM === 2 ? '81%' : selectedDyad.patientHMM === 3 ? '65%' : '22%'}
                </div>
              </div>
              <div className="bg-[#0B0C10] p-4 text-center border border-[#F44336]/20">
                <div className="text-[10px] font-['JetBrains_Mono'] text-[#F44336] mb-1">DERNIÈRE EMA</div>
                <div className="font-['JetBrains_Mono'] text-[18px] text-white">-2.4</div>
              </div>
            </div>
          </div>
        </div>

        {/* DROITE - AIDANT */}
        <div className="flex-1 bg-[#15161A] p-8 flex flex-col pl-16">
          <div className="flex items-center gap-4 mb-8 justify-end text-right">
            <div>
              <h4 className="font-['JetBrains_Mono'] text-[14px] text-white">CAREGIVER SHADOW</h4>
              <p className="font-['Geist'] text-[12px] text-[#8A9BA8]">Modèle 2 États (Burnout)</p>
            </div>
            <HeartHandshake className="text-[#8E4A9F]" size={32} />
          </div>

          <div className="flex-1 flex flex-col justify-center gap-8">
            <div className="bg-[#0B0C10] p-6 border-r-4 text-right" style={{ borderColor: selectedDyad.caregiverExt === "Engagé" ? CLINICAL_TEAL_COLORS.greenAELYA : selectedDyad.caregiverExt === "Fragile" ? "#FFC107" : CLINICAL_TEAL_COLORS.redDisruptive }}>
              <div className="text-[10px] font-['JetBrains_Mono'] text-[#8A9BA8] tracking-widest mb-2">ÉTAT ACTUEL</div>
              <div className="font-['Playfair_Display'] text-[28px] text-white mb-1">{selectedDyad.caregiverExt.toUpperCase()}</div>
              <div className="font-['Geist'] text-[13px] text-[#8A9BA8]">
                Index de fatigue cognitive et charge émotionnelle
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#0B0C10] p-4 text-center">
                <div className="text-[10px] font-['JetBrains_Mono'] text-[#8A9BA8] mb-1">EMA VITALITÉ</div>
                <div className="font-['JetBrains_Mono'] text-[18px] text-white">
                  {selectedDyad.caregiverExt === "Engagé" ? '8.2/10' : selectedDyad.caregiverExt === "Fragile" ? '5.4/10' : '2.1/10'}
                </div>
              </div>
              <div className="bg-[#0B0C10] p-4 text-center">
                <div className="text-[10px] font-['JetBrains_Mono'] text-[#8A9BA8] mb-1">VITESSE REPONSE</div>
                <div className="font-['JetBrains_Mono'] text-[18px] text-white">
                  {selectedDyad.caregiverExt === "Engagé" ? '< 1h' : selectedDyad.caregiverExt === "Fragile" ? '4h' : '> 24h'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* STATS & TABLE BELOW */}
      <div className="flex gap-6 shrink-0 h-48">
        
        <div className="w-1/3 bg-[#8E4A9F]/10 border border-[#8E4A9F]/30 p-6 flex flex-col justify-center">
          <BrainCircuit size={24} className="text-[#8E4A9F] mb-4" />
          <p className="font-['Geist'] text-[14px] text-[#E0E6ED] leading-relaxed">
            "L'épuisement de l'aidant prédit la rupture d'observance du patient avec un lead time de 14 à 21 jours (Schulz & Sherwood, 2008). NOOS capte ce signal avant même que le patient ne réduise sa prise."
          </p>
        </div>

        <div className="flex-1 bg-[#15161A] p-0 flex flex-col overflow-y-auto no-scrollbar">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-[#0B0C10] font-['JetBrains_Mono'] text-[10px] text-[#8A9BA8] sticky top-0 z-10">
                <th className="p-3 font-normal">DYADE SIMULÉE</th>
                <th className="p-3 font-normal">HMM PATIENT</th>
                <th className="p-3 font-normal">ETAT AIDANT</th>
                <th className="p-3 font-normal">LEAD TIME OBSERVE</th>
                <th className="p-3 font-normal text-right">CORRELATION</th>
              </tr>
            </thead>
            <tbody className="font-['Geist'] text-[12px] text-white">
              {dyads.map((dyad) => (
                <tr 
                  key={dyad.id} 
                  className={`border-b border-[#0B0C10] cursor-pointer transition-colors ${selectedDyad.id === dyad.id ? 'bg-[#15161A] border-l-2 border-l-[#5AACAC]' : 'hover:bg-[#0B0C10]'}`}
                  onClick={() => setSelectedDyad(dyad)}
                >
                  <td className="p-3 pl-4">Cohorte Beta #{dyad.id}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded-sm text-[10px] font-['JetBrains_Mono'] ${dyad.patientHMM >= 3 ? 'bg-[rgba(244,67,54,0.1)] text-[#F44336]' : 'bg-[rgba(76,175,80,0.1)] text-[#4CAF50]'}`}>
                      HMM {dyad.patientHMM}
                    </span>
                  </td>
                  <td className="p-3">{dyad.caregiverExt}</td>
                  <td className="p-3 font-['JetBrains_Mono'] text-[#8A9BA8]">{dyad.delay}</td>
                  <td className="p-3 text-right font-['JetBrains_Mono']">{dyad.correlation.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

    </div>
  );
}
