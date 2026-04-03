"use client";

import React from 'react';
import { CLINICAL_TEAL_COLORS } from '../shared/constants';
import { MOCK_OBSERVANCE_DATA } from '../shared/mock-data';
import { Zap, Clock, Users, ShieldCheck, ArrowUpRight } from 'lucide-react';

const LEVERS = [
  {
    title: "Variable Reward",
    icon: <Zap size={18} />,
    source: "Skinner (1957), Fogg (2009) — N=1420, d=0.45",
    mechanism: "Compense l'oubli non intentionnel par un rappel gamifié aléatoire. Évite la fatigue d'alarme.",
    application: "Notification MYNε conditionnée à un taux de réponse probabiliste.",
    metric: "+18% adhésion à 3 mois"
  },
  {
    title: "Ancrage Temporel",
    icon: <Clock size={18} />,
    source: "Gollwitzer (1999) — N=850, d=0.85",
    mechanism: "Associe la prise à une habitude solide existante (café, brossage).",
    application: "Algorithme NOOS détecte la routine via téléphone et déclenche le cue.",
    metric: "Latence prise < 15 min"
  },
  {
    title: "Social Proof",
    icon: <Users size={18} />,
    source: "Cialdini (1984) — N=2100, d=0.60",
    mechanism: "Montre l'observance du groupe pair pour normaliser l'acte.",
    application: "Affichage '85% des patients de votre cohorte ont validé leur prise ce matin'.",
    metric: "-22% micro-ruptures"
  },
  {
    title: "Réassurance Active",
    icon: <ShieldCheck size={18} />,
    source: "Bandura (1977) — N=640, d=0.75",
    mechanism: "Désamorce l'anxiété liée aux effets secondaires via micro-éducation.",
    application: "Vidéo ÆLYA de 15 sec poussée si consultation web MD sur un effet indésirable.",
    metric: "+40% résilience"
  },
  {
    title: "Autonomie Guidée",
    icon: <ArrowUpRight size={18} />,
    source: "Deci & Ryan (1985) — N=1100, d=0.50",
    mechanism: "Redonne le contrôle au patient rebelle ou fatigué par l'injonction.",
    application: "Interface permettant de décaler la prise de 2h ou bypasser le rappel 1 fois.",
    metric: "-30% abandon total"
  }
];

const PROFILES = ["Méthodique", "Négligent", "Sceptique", "Anxieux", "Rebelle"];

export default function HabitArchitectureView() {
  const { habitProfiles } = MOCK_OBSERVANCE_DATA;

  const getHeatmapColor = (profileIndex: number, leverIndex: number) => {
    // Fake optimal matching logic for heatmap colors
    const optimalPairs = [[0,1], [1,0], [2,2], [3,3], [4,4]]; 
    const isOptimal = optimalPairs.some(p => p[0] === profileIndex && p[1] === leverIndex);
    
    // Diagonal-like pattern for variety
    const score = (profileIndex + leverIndex * 2) % 5;
    
    if (isOptimal) return CLINICAL_TEAL_COLORS.primary; // Vert foncé / Teal
    if (score === 4) return CLINICAL_TEAL_COLORS.primaryHover;
    if (score === 3) return "rgba(90, 172, 172, 0.4)";
    if (score === 2) return "rgba(90, 172, 172, 0.15)";
    return "transparent";
  };

  const getRecommendation = (profileIdx: number, leverIdx: number) => {
    const optimalPairs = [[0,1], [1,0], [2,2], [3,3], [4,4]]; 
    if (optimalPairs.some(p => p[0] === profileIdx && p[1] === leverIdx)) {
      return "Levier dominant recommandé. Maximize l'adhésion.";
    }
    return "Combinaison possible. Effet modéré ou neutre.";
  };

  return (
    <div className="h-full flex flex-col gap-6 animate-in fade-in duration-500">
      
      {/* TOP: 5 COLUMNS */}
      <div className="flex gap-4 shrink-0">
        {LEVERS.map((lever, i) => (
          <div key={i} className="flex-1 bg-[#15161A] p-5 flex flex-col gap-4 border-t-2 border-[#5AACAC] hover:-translate-y-1 transition-transform">
            <div className="flex items-center gap-3 text-[#5AACAC]">
              {lever.icon}
              <h3 className="font-['Playfair_Display'] text-[16px] text-white whitespace-nowrap overflow-hidden text-ellipsis">{lever.title}</h3>
            </div>
            
            <div className="text-[10px] font-['JetBrains_Mono'] text-[#8A9BA8] border-b border-[#0B0C10] pb-2">
              SOURCE <br/><span className="text-white">{lever.source}</span>
            </div>
            
            <div className="text-[12px] font-['Geist'] text-[#E0E6ED] leading-snug">
              {lever.mechanism}
            </div>
            
            <div className="bg-[#0B0C10] p-3 text-[11px] font-['Geist'] text-[#8A9BA8] rounded-sm flex-1">
              <strong className="text-[#5AACAC] block mb-1">NOOS APP :</strong>
              {lever.application}
            </div>
            
            <div className="bg-[rgba(90,172,172,0.1)] text-[#5AACAC] p-2 text-center text-[10px] font-['JetBrains_Mono']">
              {lever.metric}
            </div>
          </div>
        ))}
      </div>

      {/* BOTTOM: MATRIX */}
      <div className="flex-1 bg-[#15161A] p-6 flex flex-col min-h-0">
        <h3 className="font-['Playfair_Display'] text-[20px] text-white mb-6">Matrice d'Affectation Cognitive</h3>
        
        <div className="flex-1 overflow-auto no-scrollbar">
          <table className="w-full border-collapse">
            <thead>
              <tr className="font-['JetBrains_Mono'] text-[10px] text-[#8A9BA8] border-b border-[#0B0C10]">
                <th className="p-3 text-left w-40 sticky left-0 bg-[#15161A]">PROFIL COGNITIF</th>
                {LEVERS.map((l, i) => (
                  <th key={i} className="p-3 text-left border-l border-[#0B0C10] top-0 bg-[#15161A]">
                    {l.title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {PROFILES.map((profile, i) => (
                <tr key={profile} className="border-b border-[#0B0C10]">
                  <td className="p-3 font-['JetBrains_Mono'] text-[12px] text-white bg-[#0B0C10] border-r border-[#15161A] sticky left-0 z-10 w-40">
                    {profile}
                  </td>
                  {LEVERS.map((lever, j) => (
                    <td key={j} className="p-0 border-l border-[#0B0C10] h-20 w-48 relative group">
                      <div 
                        className="absolute inset-0 transition-opacity opacity-50 group-hover:opacity-100"
                        style={{ backgroundColor: getHeatmapColor(i, j) }}
                      />
                      <div className="relative p-3 text-[10px] font-['Geist'] text-[#E0E6ED]/80 leading-snug">
                        {getRecommendation(i, j)}
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
