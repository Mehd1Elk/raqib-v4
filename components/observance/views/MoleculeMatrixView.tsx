"use client";

import React, { useState } from 'react';
import { CLINICAL_TEAL_COLORS } from '../shared/constants';
import { Beaker, Search, RefreshCw, Moon, BarChart2, MessageSquare, Globe, Info } from 'lucide-react';

const CLASSES = [
  {
    name: "Thymorégulateurs",
    molecules: ["Lithium", "Valproate", "Lamotrigine"]
  },
  {
    name: "Antipsychotiques",
    molecules: ["Clozapine", "Rispéridone", "Aripiprazole", "Quétiapine", "Olanzapine"]
  },
  {
    name: "Antidépresseurs",
    molecules: ["Sertraline", "Fluoxétine"]
  },
  {
    name: "Psychostimulants",
    molecules: ["Méthylphénidate", "Atomoxétine"]
  }
];

const SIGNALS = [
  { id: "ema", label: "EMA", icon: <MessageSquare size={14} /> },
  { id: "refill", label: "Refill", icon: <RefreshCw size={14} /> },
  { id: "circadian", label: "Circadien", icon: <Moon size={14} /> },
  { id: "entropy", label: "Entropie", icon: <BarChart2 size={14} /> },
  { id: "linguistic", label: "Linguistic", icon: <Search size={14} /> },
  { id: "environment", label: "Environnement", icon: <Globe size={14} /> }
];

// Helper to generate mock cell data
const getCellData = (mol: string, sig: string) => {
  const hash = mol.length + sig.length;
  let force = hash % 4; // 0: black, 1: grey, 2: teal pale, 3: teal intense
  
  if (mol === "Lithium" && sig === "environment") force = 3;
  if (mol === "Clozapine" && sig === "refill") force = 3;

  const getBg = () => {
    switch (force) {
      case 3: return CLINICAL_TEAL_COLORS.primary; // Intense
      case 2: return CLINICAL_TEAL_COLORS.primaryHover; // Pale
      case 1: return "#2C3440"; // Grey partial
      default: return "#0B0C10"; // Black none
    }
  };

  return {
    force,
    bg: getBg(),
    sensibility: 80 + (hash % 15),
    specificity: 75 + (hash % 20),
    latency: hash % 5 === 0 ? "24h" : "7j"
  };
};

export default function MoleculeMatrixView() {
  const [selectedCell, setSelectedCell] = useState<{mol: string, sig: string, data: any} | null>(null);

  return (
    <div className="h-full flex gap-6 animate-in fade-in duration-500">
      
      {/* MATRIX */}
      <div className="flex-1 overflow-auto bg-[#15161A] p-6 relative">
        <div className="flex mb-4">
          <div className="w-40 shrink-0"></div>
          {SIGNALS.map(sig => (
            <div key={sig.id} className="w-20 shrink-0 flex flex-col items-center gap-2 font-['JetBrains_Mono'] text-[#8A9BA8] text-[10px]">
              {sig.icon}
              <span>{sig.label}</span>
            </div>
          ))}
        </div>

        {CLASSES.map((cls, i) => (
          <div key={cls.name} className="mb-4">
            <div className="text-[10px] font-['JetBrains_Mono'] text-[#5AACAC] mb-2 uppercase tracking-wide">
              {cls.name}
            </div>
            {cls.molecules.map(mol => (
              <div key={mol} className="flex mb-1">
                <div className="w-40 shrink-0 flex items-center pr-4 border-r border-[#0B0C10] font-['Geist'] text-[13px] text-[#E0E6ED]">
                  {mol}
                </div>
                {SIGNALS.map(sig => {
                  const data = getCellData(mol, sig.id);
                  const isSelected = selectedCell?.mol === mol && selectedCell?.sig === sig.id;
                  return (
                    <div 
                      key={sig.id} 
                      className={`w-20 shrink-0 h-10 border border-[#0B0C10] cursor-pointer group relative transition-colors ${isSelected ? 'ring-2 ring-white z-10' : ''}`}
                      style={{ backgroundColor: data.bg }}
                      onClick={() => setSelectedCell({ mol, sig: sig.id, data })}
                    >
                      {/* TOOLTIP */}
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block w-48 bg-[#0B0C10] border border-[#15161A] p-3 text-[11px] font-['JetBrains_Mono'] z-50 pointer-events-none shadow-xl">
                        <div className="text-white mb-2 pb-1 border-b border-[#15161A]">{mol} × {sig.label}</div>
                        <div className="flex justify-between text-[#8A9BA8] mb-1"><span>SENS:</span> <span className="text-[#5AACAC]">{data.sensibility}%</span></div>
                        <div className="flex justify-between text-[#8A9BA8] mb-1"><span>SPEC:</span> <span className="text-[#5AACAC]">{data.specificity}%</span></div>
                        <div className="flex justify-between text-[#8A9BA8]"><span>LATENCE:</span> <span className="text-white">{data.latency}</span></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        ))}
        
        {/* LEGENDE */}
        <div className="mt-8 pt-4 border-t border-[#0B0C10] flex gap-6 font-['JetBrains_Mono'] text-[10px] text-[#8A9BA8]">
          <div className="flex items-center gap-2"><div className="w-3 h-3 bg-[#5AACAC]"></div> Applicable (+ force)</div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 bg-[#4A9F9F]"></div> Moyenne</div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 bg-[#2C3440]"></div> Partiel</div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 bg-[#0B0C10] border border-[#15161A]"></div> N/A</div>
        </div>
      </div>

      {/* DETAIL PANEL */}
      <div className="w-[400px] bg-[#15161A] p-6 shrink-0 flex flex-col">
        {selectedCell ? (
          <>
            <div className="mb-6 flex items-start justify-between">
              <div>
                <div className="text-[10px] font-['JetBrains_Mono'] text-[#5AACAC] mb-1">MATRICE CROISÉE</div>
                <h3 className="font-['Playfair_Display'] text-[24px] text-white leading-tight">
                  {selectedCell.mol} <br />× {SIGNALS.find(s=>s.id === selectedCell.sig)?.label}
                </h3>
              </div>
              <Beaker className="text-[#5AACAC]" size={32} />
            </div>

            <div className="space-y-6 flex-1">
              <div className="bg-[#0B0C10] p-4 font-['JetBrains_Mono'] text-[12px] space-y-2">
                <div className="flex justify-between"><span className="text-[#8A9BA8]">FORCE DU SIGNAL</span> <span className="text-white">{selectedCell.data.force}/3</span></div>
                <div className="flex justify-between"><span className="text-[#8A9BA8]">SENSIBILITÉ CLINIQUE</span> <span className="text-[#5AACAC]">{selectedCell.data.sensibility}%</span></div>
                <div className="flex justify-between"><span className="text-[#8A9BA8]">SPÉCIFICITÉ</span> <span className="text-[#5AACAC]">{selectedCell.data.specificity}%</span></div>
                <div className="flex justify-between"><span className="text-[#8A9BA8]">LATENCE D'ALERTE</span> <span className="text-white">{selectedCell.data.latency}</span></div>
              </div>

              <div>
                <h4 className="font-['Geist'] text-[14px] text-white mb-2 flex items-center gap-2">
                  <Info size={14} className="text-[#5AACAC]" /> Explication Clinique
                </h4>
                <p className="font-['Geist'] text-[13px] text-[#8A9BA8] leading-relaxed">
                  Le signal {SIGNALS.find(s=>s.id === selectedCell.sig)?.label} est particulièrement pertinent pour le {selectedCell.mol}. Les variations observées sur ce vecteur précèdent généralement de {selectedCell.data.latency} l'apparition des symptômes pathognomoniques de la rupture.
                </p>
              </div>

              <div className="border-t border-[#0B0C10] pt-4">
                <span className="text-[10px] font-['JetBrains_Mono'] text-[#8A9BA8] block mb-2">SOURCE SCIENTIFIQUE</span>
                <div className="font-['Geist'] text-[12px] text-white">
                  "Predictive markers of non-adherence in {selectedCell.mol} therapy via {SIGNALS.find(s=>s.id === selectedCell.sig)?.label.toLowerCase()} analysis."
                  <br /><span className="text-[#5AACAC]">Journal of Clinical Psychiatry, 2024.</span>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center opacity-50">
            <Beaker size={48} className="text-[#8A9BA8] mb-4" />
            <p className="font-['Geist'] text-[14px] text-[#E0E6ED]">Sélectionnez une intersection molécule × signal pour voir l'analyse détaillée.</p>
          </div>
        )}
      </div>

    </div>
  );
}
