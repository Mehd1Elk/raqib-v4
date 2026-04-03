"use client";

import React, { useState } from 'react';
import { CLINICAL_TEAL_COLORS } from '../shared/constants';
import { Activity, Beaker, GitMerge, Fingerprint, Coins } from 'lucide-react';

const MOLECULES = [
  "Lithium", "Valproate", "Lamotrigine", 
  "Clozapine", "Rispéridone", "Aripiprazole", "Quétiapine", "Olanzapine",
  "Sertraline", "Fluoxétine", 
  "Méthylphénidate", "Atomoxétine"
];

const CYPS = ["CYP2D6", "CYP1A2", "CYP3A4", "UGT1A4"];

const getCYPColor = (mol: string, cyp: string) => {
  const hash = mol.length + cyp.length;
  const mod = hash % 3;
  if(mol === "Clozapine" && cyp === "CYP1A2") return CLINICAL_TEAL_COLORS.redDisruptive;
  if(mol === "Aripiprazole" && cyp === "CYP2D6") return CLINICAL_TEAL_COLORS.redDisruptive;
  if(mod === 0) return CLINICAL_TEAL_COLORS.redDisruptive;
  if(mod === 1) return "#FFC107";
  return "#2C3440"; // Gris
};

export default function PharmacogenomicView() {
  const [mol, setMol] = useState("Clozapine");
  const [pheno, setPheno] = useState("UM");
  const [tobacco, setTobacco] = useState("Oui");

  return (
    <div className="h-full flex flex-col gap-6 animate-in fade-in duration-500">
      
      {/* TOP ROW: Panels 1 & 2 */}
      <div className="flex-[3] flex gap-6 min-h-0">
        
        {/* PANNEAU 1 — Explication visuelle */}
        <div className="flex-1 bg-[#15161A] p-6 flex flex-col">
          <div className="flex items-center gap-3 mb-6">
            <GitMerge className="text-[#8E4A9F]" size={24} />
            <h3 className="font-['Playfair_Display'] text-[20px] text-white">Métabolisme Hépatique</h3>
          </div>
          
          <div className="flex-1 relative bg-[#0B0C10] p-4 flex flex-col justify-center items-center font-['JetBrains_Mono'] text-[11px] text-[#E0E6ED]">
            <div className="border border-[#15161A] p-3 mb-6 bg-[#15161A]">MOLÉCULE ACTIVE</div>
            
            <div className="flex justify-between w-full max-w-[300px] mb-6">
              <div className="h-10 border-l border-dashed border-[#8A9BA8] ml-4" />
              <div className="h-10 border-l border-[#5AACAC]" />
              <div className="h-10 border-l border-dashed border-[#8A9BA8] mr-4" />
            </div>
            
            <div className="flex justify-between w-full gap-4 mb-6 text-center">
              <div className="flex-1">
                <div className="text-[10px] text-[#F44336] mb-1">METABOLISEUR LENT (PM)</div>
                <div className="text-[9px] text-[#8A9BA8]">Accumulation<br/>Toxicité</div>
              </div>
              <div className="flex-1">
                <div className="text-[10px] text-[#5AACAC] mb-1">NORMAL (EM)</div>
                <div className="text-[9px] text-[#8A9BA8]">Cible 100%</div>
              </div>
              <div className="flex-1">
                <div className="text-[10px] text-[#FFC107] mb-1">ULTRA-RAPIDE (UM)</div>
                <div className="text-[9px] text-[#8A9BA8]">Sous-dosage<br/>Faux Non-observant</div>
              </div>
            </div>
          </div>
        </div>

        {/* PANNEAU 2 — Matrice molécule × CYP */}
        <div className="flex-[2] bg-[#15161A] p-6 flex flex-col">
          <div className="flex items-center gap-3 mb-6">
            <Fingerprint className="text-[#8E4A9F]" size={24} />
            <h3 className="font-['Playfair_Display'] text-[20px] text-white">Carte des Phénotypes</h3>
          </div>

          <div className="flex-1 overflow-auto no-scrollbar">
            <table className="w-full text-left whitespace-nowrap border-collapse">
              <thead>
                <tr className="font-['JetBrains_Mono'] text-[10px] text-[#8A9BA8]">
                  <th className="p-2 border-b border-[#0B0C10] sticky top-0 bg-[#15161A]">MOLÉCULE</th>
                  {CYPS.map(c => <th key={c} className="p-2 border-b border-[#0B0C10] sticky top-0 bg-[#15161A] text-center">{c}</th>)}
                </tr>
              </thead>
              <tbody className="font-['Geist'] text-[12px] text-white">
                {MOLECULES.map((m) => (
                  <tr key={m} className={`border-b border-[#0B0C10] hover:bg-[#0B0C10]/50 cursor-pointer ${mol === m ? 'bg-[#0B0C10]' : ''}`} onClick={() => setMol(m)}>
                    <td className="p-2">{m}</td>
                    {CYPS.map(c => (
                      <td key={c} className="p-2 text-center">
                        <div className="w-12 h-6 border border-[#0B0C10] mx-auto transition-colors" style={{ backgroundColor: getCYPColor(m, c) }} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex justify-between font-['JetBrains_Mono'] text-[9px] text-[#8A9BA8]">
            <span className="flex items-center gap-1"><div className="w-3 h-3 bg-[#F44336]" /> Forte dépendance</span>
            <span className="flex items-center gap-1"><div className="w-3 h-3 bg-[#FFC107]" /> Modérée</span>
            <span className="flex items-center gap-1"><div className="w-3 h-3 bg-[#2C3440]" /> Faible / Nulle</span>
          </div>
        </div>

      </div>

      {/* BOTTOM ROW: Panels 3 & 4 */}
      <div className="flex-[2] flex gap-6 shrink-0">
        
        {/* PANNEAU 3 — Simulateur d'impact */}
        <div className="flex-[2] bg-[#15161A] p-6 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-['Playfair_Display'] text-[20px] text-white">Simulateur d'Ajustement</h3>
            <span className="text-[10px] font-['JetBrains_Mono'] text-[#5AACAC] bg-[rgba(90,172,172,0.1)] px-2 py-1">CALCULATEUR ALGORITHMIQUE</span>
          </div>

          <div className="flex gap-4 mb-6">
            <div className="flex-1">
              <label className="text-[10px] font-['JetBrains_Mono'] text-[#8A9BA8] block mb-2">MOLÉCULE ACTIVE</label>
              <div className="bg-[#0B0C10] p-3 text-[13px] font-['Geist'] text-white border border-[#15161A]">{mol}</div>
            </div>
            <div className="flex-1">
              <label className="text-[10px] font-['JetBrains_Mono'] text-[#8A9BA8] block mb-2">PHÉNOTYPE CYP PREDOMINANT</label>
              <select value={pheno} onChange={e=>setPheno(e.target.value)} className="w-full bg-[#0B0C10] p-3 text-[13px] font-['Geist'] text-white border border-[#15161A] outline-none appearance-none cursor-pointer">
                <option value="PM">Métaboliseur Lent (PM)</option>
                <option value="IM">Métaboliseur Intermédiaire (IM)</option>
                <option value="EM">Métaboliseur Normal (EM)</option>
                <option value="UM">Métaboliseur Ultra-rapide (UM)</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="text-[10px] font-['JetBrains_Mono'] text-[#8A9BA8] block mb-2">TABAGISME (Inducteur 1A2)</label>
              <select value={tobacco} onChange={e=>setTobacco(e.target.value)} className="w-full bg-[#0B0C10] p-3 text-[13px] font-['Geist'] text-white border border-[#15161A] outline-none appearance-none cursor-pointer">
                <option value="Oui">Oui (+1.5x clearence)</option>
                <option value="Non">Non</option>
              </select>
            </div>
          </div>

          <div className="flex-1 bg-[#0B0C10] border-l-2 border-[#5AACAC] p-4 flex flex-col justify-center gap-2">
            <div className="font-['JetBrains_Mono'] text-[14px] text-white">
              <span className="text-[#8A9BA8]">Ajustement Score Observance :</span> <span className={`${pheno === 'UM' ? 'text-[#FFC107]' : pheno === 'PM' ? 'text-[#F44336]' : 'text-[#5AACAC]'}`}>{pheno === 'UM' ? '+15%' : pheno === 'PM' ? '-20%' : '0%'}</span>
            </div>
            <p className="font-['Geist'] text-[13px] text-[#E0E6ED] leading-relaxed">
              Ce patient est {pheno === 'UM' ? 'métaboliseur ultra-rapide' : pheno === 'PM' ? 'métaboliseur lent' : 'métaboliseur normal'}. 
              Son score d'observance basé sur la concentration (TDM) ou le signal clinique doit être corrigé, car ses concentrations plasmatiques seront naturellement {pheno === 'UM' ? 'basses' : pheno === 'PM' ? 'élevées' : 'normales'}. 
              {pheno === 'UM' && " Risque de faux positif de non-observance."}
              {tobacco === 'Oui' && " Le tabagisme accentue le pseudo-évitement thérapeutique via induction 1A2."}
            </p>
          </div>
        </div>

        {/* PANNEAU 4 — Valeur MYNε */}
        <div className="flex-1 bg-[#8E4A9F]/10 border border-[#8E4A9F]/30 p-6 flex flex-col relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#8E4A9F] blur-[80px] opacity-20 group-hover:opacity-40 transition-opacity" />
          
          <div className="flex items-center gap-3 mb-4 relative z-10">
            <Coins className="text-[#8E4A9F]" size={24} />
            <h3 className="font-['Playfair_Display'] text-[20px] text-white">Arbitrage MYNε</h3>
          </div>
          
          <div className="flex-1 flex text-[14px] font-['Geist'] text-[#E0E6ED] leading-relaxed relative z-10 opacity-90 items-center">
            "Les données pharmacogénomiques du corridor constituent la première base PGx psychiatrique d'Afrique. Pricing MYNε : ×5-×10 vs données d'observance brutes. L'intégration de ces phénotypes transforme la donnée d'adhésion en un actif de médecine de précision."
          </div>
        </div>
      </div>

    </div>
  );
}
