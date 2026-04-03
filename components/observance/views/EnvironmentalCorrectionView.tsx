"use client";

import React, { useState, useEffect } from 'react';
import { MOCK_OBSERVANCE_DATA, ENVIRONMENTAL_CORRECTIONS } from '../shared/mock-data';
import { CLINICAL_TEAL_COLORS } from '../shared/constants';
import { Globe2, ThermometerSun, Map, Clock } from 'lucide-react';

// Approximated map nodes for visualization
const NODES = Array.from({ length: 20 }).map((_, i) => ({
  id: i,
  x: 10 + Math.random() * 80,
  y: 10 + Math.random() * 80,
  risk: Math.random() // 0 to 1
}));

export default function EnvironmentalCorrectionView() {
  const [molecule, setMolecule] = useState("Lithium");
  const [factor, setFactor] = useState("Chaleur Extrême");
  const [apiEnv, setApiEnv] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/observance/environment')
      .then(r => r.json())
      .then(d => { if (Array.isArray(d) && d.length > 0) setApiEnv(d); })
      .catch(() => {});
  }, []);

  const factors = ["Chaleur Extrême", "Photopériode", "Ramadan", "Saison des Pluies", "Altitude"];
  const molecules = ["Lithium", "Valproate", "Antidépresseurs", "Antipsychotiques"];

  const environmentalFactors = apiEnv.length > 0
    ? apiEnv.map(e => ({
        molecule: e.molecule,
        factor: e.factor_type === 'temperature' ? 'Chaleur Extrême' : e.factor_type === 'photoperiod' ? 'Photopériode' : e.factor_type === 'ramadan' ? 'Ramadan' : e.factor_type,
        country: e.country,
        multiplier: `${e.risk_multiplier}x`,
        adjustment: `${Math.round((e.threshold ?? 0) * 100)}%`,
        season: e.season,
        source: e.evidence?.split('(')[1]?.replace(')', '') || 'Littérature',
      }))
    : MOCK_OBSERVANCE_DATA.environmentalFactors;

  // Determine node color based on risk and selection
  const getNodeColor = (risk: number) => {
    if (molecule === "Lithium" && factor === "Chaleur Extrême") {
      return risk > 0.7 ? CLINICAL_TEAL_COLORS.redDisruptive : (risk > 0.4 ? "#FF9800" : CLINICAL_TEAL_COLORS.greenAELYA);
    }
    if (factor === "Photopériode") {
      return risk > 0.5 ? CLINICAL_TEAL_COLORS.steelRAQIB : CLINICAL_TEAL_COLORS.primary;
    }
    if (factor === "Ramadan") {
      return "#FFC107";
    }
    return CLINICAL_TEAL_COLORS.primaryHover;
  };

  return (
    <div className="h-full flex flex-col gap-6 animate-in fade-in duration-500">
      
      <div className="flex-1 flex gap-6 min-h-0">
        
        {/* MAP CONTAINER */}
        <div className="flex-[2] bg-[#15161A] border border-[#0B0C10] p-6 relative overflow-hidden flex flex-col">
          <div className="flex justify-between items-start mb-6 z-10">
            <div>
              <h3 className="font-['Playfair_Display'] text-[24px] text-white">Corridor Environnemental</h3>
              <p className="font-['Geist'] text-[14px] text-[#8A9BA8]">Topologie des risques spatio-temporels d'observance</p>
            </div>
            <div className="flex gap-4">
              <div className="bg-[#0B0C10] p-2 flex items-center gap-2 font-['JetBrains_Mono'] text-[11px] text-white">
                <ThermometerSun size={14} className="text-[#F44336]" /> {factor}
              </div>
              <div className="bg-[#0B0C10] p-2 flex items-center gap-2 font-['JetBrains_Mono'] text-[11px] text-white">
                <Globe2 size={14} className="text-[#5AACAC]" /> {molecule}
              </div>
            </div>
          </div>

          <div className="flex-1 relative bg-[#0B0C10]/50 rounded-sm">
            {/* SVG SCHEMATIC MAP */}
            <svg width="100%" height="100%" className="absolute inset-0 z-0">
              {/* Fake connections */}
              {NODES.map((n, i) => {
                if (i === 0) return null;
                const prev = NODES[i - 1];
                return (
                  <line 
                    key={`l-${i}`} 
                    x1={`${prev.x}%`} y1={`${prev.y}%`} 
                    x2={`${n.x}%`} y2={`${n.y}%`} 
                    stroke="rgba(90,172,172,0.1)" strokeWidth="1" 
                  />
                );
              })}
            </svg>
            
            {/* NODES */}
            {NODES.map((n, i) => (
              <div 
                key={`n-${i}`}
                className="absolute w-3 h-3 rounded-full -ml-1.5 -mt-1.5 transition-colors duration-1000 z-10 shadow-[0_0_10px_currentColor]"
                style={{ 
                  left: `${n.x}%`, 
                  top: `${n.y}%`, 
                  backgroundColor: getNodeColor(n.risk),
                  color: getNodeColor(n.risk)
                }}
              />
            ))}
          </div>
        </div>

        {/* SIDE PANEL */}
        <div className="flex-1 bg-[#15161A] p-6 flex flex-col gap-6">
          <div>
            <label className="text-[10px] font-['JetBrains_Mono'] text-[#8A9BA8] block mb-2">MOLÉCULE ACTIVE</label>
            <div className="flex flex-wrap gap-2">
              {molecules.map(m => (
                <button 
                  key={m}
                  onClick={() => setMolecule(m)}
                  className={`px-3 py-1.5 font-['JetBrains_Mono'] text-[11px] transition-colors border ${molecule === m ? 'bg-[rgba(90,172,172,0.1)] border-[#5AACAC] text-white' : 'border-transparent bg-[#0B0C10] text-[#8A9BA8] hover:text-white'}`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-[10px] font-['JetBrains_Mono'] text-[#8A9BA8] block mb-2">FACTEUR ENVIRONNEMENTAL</label>
            <div className="flex flex-col gap-2">
              {factors.map(f => (
                <button 
                  key={f}
                  onClick={() => setFactor(f)}
                  className={`w-full text-left px-4 py-2 font-['Geist'] text-[13px] flex justify-between items-center transition-colors border-l-2 ${factor === f ? 'bg-[#0B0C10] border-[#5AACAC] text-white' : 'border-transparent text-[#8A9BA8] hover:bg-[#0B0C10]/50'}`}
                >
                  {f}
                  {factor === f && <div className="w-1.5 h-1.5 bg-[#5AACAC] rounded-full" />}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-auto bg-[#0B0C10] p-4 font-['Geist'] text-[13px] text-[#E0E6ED] border-l-2 border-[#F44336]">
            <strong className="font-['JetBrains_Mono'] text-[11px] tracking-wide text-[#F44336] block mb-2">IMPACT CLINIQUE</strong>
            Pour l'interaction {molecule} × {factor}, on observe une dérive de l'observance nominale. Le moteur a automatiquement ajusté les seuils d'alerte sur les zones à fort risque (rouge).
          </div>
        </div>
      </div>

      {/* BOTTOM TABLE */}
      <div className="bg-[#15161A] p-4 shrink-0 overflow-x-auto">
        <table className="w-full text-left whitespace-nowrap">
          <thead>
            <tr className="border-b border-[#0B0C10] font-['JetBrains_Mono'] text-[10px] text-[#8A9BA8] [&_th]:pb-2 [&_th]:font-normal tracking-wide">
              <th>MOLÉCULE</th>
              <th>FACTEUR</th>
              <th>PAYS / ZONE</th>
              <th>MULTIPLICATEUR RISQUE</th>
              <th>AJUSTEMENT SEUIL</th>
              <th>SAISONNALITÉ</th>
              <th className="text-right">SOURCE</th>
            </tr>
          </thead>
          <tbody className="font-['Geist'] text-[13px] text-[#E0E6ED]">
            {environmentalFactors.map((env, i) => (
              <tr key={i} className="border-b border-[#0B0C10] hover:bg-[#0B0C10]/50 transition-colors">
                <td className="py-3 font-semibold">{env.molecule}</td>
                <td>{env.factor}</td>
                <td className="font-['JetBrains_Mono'] text-[12px]">{env.country}</td>
                <td className="font-['JetBrains_Mono'] text-[12px] text-[#F44336]">{env.multiplier}</td>
                <td className="font-['JetBrains_Mono'] text-[12px] text-[#5AACAC]">{env.adjustment}</td>
                <td><div className="flex items-center gap-2"><Clock size={12} className="text-[#8A9BA8]" /> {env.season}</div></td>
                <td className="text-right text-[#8A9BA8]">{env.source}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    
    </div>
  );
}
