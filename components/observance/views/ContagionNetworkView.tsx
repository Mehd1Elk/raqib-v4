"use client";

import React, { useEffect, useState } from 'react';
import { CLINICAL_TEAL_COLORS } from '../shared/constants';
import { CONTAGION_NETWORK } from '../shared/mock-data';
import { Network, ActivitySquare, ShieldAlert } from 'lucide-react';

export default function ContagionNetworkView() {
  const [nodes, setNodes] = useState<any[]>([]);
  const [links, setLinks] = useState<any[]>([]);
  const [activeNode, setActiveNode] = useState<number | null>(null);

  useEffect(() => {
    setNodes(CONTAGION_NETWORK.nodes);
    setLinks(CONTAGION_NETWORK.links);

    // Simulation d'un nœud qui shift (animation)
    const interval = setInterval(() => {
      setActiveNode(Math.floor(Math.random() * CONTAGION_NETWORK.nodes.length));
      setTimeout(() => setActiveNode(null), 1000);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getStateColor = (state: number) => {
    switch (state) {
      case 1: return CLINICAL_TEAL_COLORS.greenAELYA;
      case 2: return "#FFC107";
      case 3: return "#FF9800";
      case 4: return CLINICAL_TEAL_COLORS.redDisruptive;
      default: return CLINICAL_TEAL_COLORS.primary;
    }
  };

  return (
    <div className="h-full flex flex-col gap-6 animate-in fade-in duration-500">
      
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-['Playfair_Display'] text-[24px] text-white flex items-center gap-3">
            <Network className="text-[#5AACAC]" /> Modélisation Contagion (Beta)
          </h3>
          <p className="font-['Geist'] text-[14px] text-[#8A9BA8] mt-1">Impact du réseau pair-à-pair sur l'adhésion thérapeutique (N=30 simulés)</p>
        </div>
        <div className="bg-[rgba(244,67,54,0.1)] border border-[#F44336]/30 text-[#F44336] px-3 py-1 text-[10px] font-['JetBrains_Mono'] flex items-center gap-2">
          <ShieldAlert size={12} /> EXPERIMENTAL NODE
        </div>
      </div>

      {/* GRAPH CONTAINER */}
      <div className="flex-1 bg-[#15161A] border border-[#0B0C10] relative overflow-hidden flex items-center justify-center p-6">
        <svg width="100%" height="100%" className="absolute inset-0">
          {/* LIENS */}
          {links.map((link, i) => {
            const src = nodes[link.source];
            const tgt = nodes[link.target];
            if (!src || !tgt) return null;
            
            // Si l'un des nœuds est actif, faire clignoter le lien
            const isPulsing = activeNode === link.source || activeNode === link.target;
            
            return (
              <line 
                key={`l-${i}`} 
                x1={`${src.x}%`} y1={`${src.y}%`} 
                x2={`${tgt.x}%`} y2={`${tgt.y}%`} 
                stroke={isPulsing ? "#FF9800" : "rgba(138, 155, 168, 0.15)"} 
                strokeWidth={link.weight * 2}
                className={isPulsing ? "transition-colors duration-300" : "transition-colors duration-1000"}
              />
            );
          })}

          {/* NŒUDS */}
          {nodes.map((n, i) => {
            const isPulsing = activeNode === i;
            return (
              <g key={`n-${i}`}>
                {isPulsing && (
                  <circle 
                    cx={`${n.x}%`} cy={`${n.y}%`} 
                    r="20" fill="none" stroke="#FF9800" strokeWidth="2"
                    className="animate-ping opacity-50"
                  />
                )}
                <circle 
                  cx={`${n.x}%`} cy={`${n.y}%`} 
                  r="6" fill={getStateColor(n.hmmState ?? n.state)}
                  className="transition-colors duration-1000 shadow-[0_0_10px_currentColor]"
                />
              </g>
            );
          })}
        </svg>

        {/* OVERLAY LEGENDE */}
        <div className="absolute top-4 right-4 bg-[#0B0C10]/80 backdrop-blur-sm p-4 border border-[#15161A] font-['JetBrains_Mono'] text-[10px] space-y-2">
          <div className="text-[#8A9BA8] mb-2 border-b border-[#15161A] pb-1 block">ETATS HMM</div>
          <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#4CAF50]"/> 1: Observant</div>
          <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#FFC107]"/> 2: Fragilisé</div>
          <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#FF9800]"/> 3: Rupture Partielle</div>
          <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#F44336]"/> 4: Rupture Totale</div>
        </div>
      </div>

      {/* STATS BELOW */}
      <div className="grid grid-cols-3 gap-6 shrink-0 h-40">
        <div className="bg-[#15161A] p-6 flex flex-col justify-center border-l-4 border-[#4CAF50]">
          <h4 className="font-['JetBrains_Mono'] text-[10px] text-[#8A9BA8] tracking-widest mb-2">CONTAGION POSITIVE</h4>
          <div className="font-['Playfair_Display'] text-[32px] text-white leading-none mb-2">78.4%</div>
          <p className="font-['Geist'] text-[12px] text-[#8A9BA8]">Des pairs d'un patient observant maintiennent leur adhésion.</p>
        </div>
        
        <div className="bg-[#15161A] p-6 flex flex-col justify-center border-l-4 border-[#F44336]">
          <h4 className="font-['JetBrains_Mono'] text-[10px] text-[#8A9BA8] tracking-widest mb-2">CONTAGION NÉGATIVE</h4>
          <div className="font-['Playfair_Display'] text-[32px] text-white leading-none mb-2">24.1%</div>
          <p className="font-['Geist'] text-[12px] text-[#8A9BA8]">Décrochage dans les 14j si un hub du réseau entre en rupture.</p>
        </div>

        <div className="bg-[#15161A] p-6 flex flex-col justify-center border-l-4 border-[#5AACAC]">
          <div className="flex items-center gap-2 mb-2">
            <ActivitySquare size={14} className="text-[#5AACAC]" />
            <h4 className="font-['JetBrains_Mono'] text-[10px] text-[#5AACAC] tracking-widest">NOTE PHASE 2</h4>
          </div>
          <p className="font-['Geist'] text-[13px] text-[#E0E6ED] leading-relaxed italic">
            "Cet onglet nécessite &gt;500 patients/molécule pour un appariement algorithmique significatif. Données actuellement simulées en phase pré-lancement."
          </p>
        </div>
      </div>

    </div>
  );
}
