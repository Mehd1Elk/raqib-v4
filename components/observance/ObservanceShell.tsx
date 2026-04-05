"use client";

import React, { useState } from 'react';
import { CLINICAL_TEAL_COLORS } from './shared/constants';
import { HeartPulse } from 'lucide-react';
import ObservanceEngineView from './views/ObservanceEngineView';
import MoleculeMatrixView from './views/MoleculeMatrixView';
import EnvironmentalCorrectionView from './views/EnvironmentalCorrectionView';
import PharmacogenomicView from './views/PharmacogenomicView';
import HabitArchitectureView from './views/HabitArchitectureView';
import ContagionNetworkView from './views/ContagionNetworkView';
import CaregiverShadowView from './views/CaregiverShadowView';
import DigitalTwinView from './views/DigitalTwinView';
import MHFSScoreView from './views/MHFSScoreView';
import PosologyOptimizationView from './views/PosologyOptimizationView';
import PrePrescriptionForecastView from './views/PrePrescriptionForecastView';
import RelapseForensicsView from './views/RelapseForensicsView';
import MyneIncentiveView from './views/MyneIncentiveView';

const SIDEBAR_TABS = [
  {
    category: "MOTEUR CLINIQUE",
    items: [
      { id: "engine", label: "Observance Engine", icon: "◉", color: CLINICAL_TEAL_COLORS.primary },
      { id: "molecule", label: "Molécule × Signal", icon: "◆", color: CLINICAL_TEAL_COLORS.primary },
      { id: "environment", label: "Correction Environnementale", icon: "◈", color: CLINICAL_TEAL_COLORS.steelRAQIB },
      { id: "pharmacogenomic", label: "Correction Pharmacogénomique", icon: "◇", color: CLINICAL_TEAL_COLORS.purpleMYNE },
    ]
  },
  {
    category: "SCIENCES COMPORTEMENTALES",
    items: [
      { id: "habit", label: "Architecture Habitude", icon: "◎", color: CLINICAL_TEAL_COLORS.primary },
      { id: "contagion", label: "Réseau Contagion", icon: "⊕", color: CLINICAL_TEAL_COLORS.greenAELYA },
      { id: "caregiver", label: "Tracking Aidant", icon: "⊗", color: CLINICAL_TEAL_COLORS.greenAELYA },
    ]
  },
  {
    category: "EXTENSIONS DISRUPTIVES",
    items: [
      { id: "forecast", label: "Forecast Pré-Prescription", icon: "▸", color: CLINICAL_TEAL_COLORS.redDisruptive },
      { id: "twin", label: "Digital Twin", icon: "⊘", color: CLINICAL_TEAL_COLORS.goldBURHAN },
      { id: "posology", label: "Optimisation Posologie", icon: "⊞", color: CLINICAL_TEAL_COLORS.goldBURHAN },
      { id: "forensics", label: "Forensics Rechute", icon: "⊟", color: CLINICAL_TEAL_COLORS.redDisruptive },
    ]
  },
  {
    category: "CONVERGENCE MYNε",
    items: [
      { id: "simulator", label: "Simulateur MYNε", icon: "◊", color: CLINICAL_TEAL_COLORS.purpleMYNE },
      { id: "incentive", label: "Incentive MYNε", icon: "◈", color: CLINICAL_TEAL_COLORS.purpleMYNE },
      { id: "score", label: "Score MHFS", icon: "★", color: CLINICAL_TEAL_COLORS.goldBURHAN },
    ]
  }
];

export default function ObservanceShell() {
  const [activeTab, setActiveTab] = useState("engine");

  const renderActiveView = () => {
    switch (activeTab) {
      case "engine": return <ObservanceEngineView />;
      case "molecule": return <MoleculeMatrixView />;
      case "environment": return <EnvironmentalCorrectionView />;
      case "pharmacogenomic": return <PharmacogenomicView />;
      case "habit": return <HabitArchitectureView />;
      case "contagion": return <ContagionNetworkView />;
      case "caregiver": return <CaregiverShadowView />;
      case "twin": return <DigitalTwinView />;
      case "score": return <MHFSScoreView />;
      case "posology": return <PosologyOptimizationView />;
      case "forecast": return <PrePrescriptionForecastView />;
      case "forensics": return <RelapseForensicsView />;
      case "incentive": return <MyneIncentiveView />;
      default: return (
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <h2 className="text-2xl font-['Playfair_Display'] text-[#8A9BA8] mb-4">View In Development</h2>
            <p className="font-['JetBrains_Mono'] text-[#5AACAC]">{activeTab.toUpperCase()}</p>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#0B0C10] text-[#E0E6ED] font-['Geist'] selection:bg-[#5AACAC]/30">
      
      {/* SIDEBAR */}
      <div className="w-64 border-r border-[#15161A] flex flex-col bg-[#0B0C10] z-20 shrink-0">
        <div className="p-6 border-b border-[#15161A] flex flex-col gap-1">
          <h1 className="font-['Cormorant_Garamond'] font-normal text-[18px] text-[#5AACAC] tracking-wider leading-none">
            Observance
          </h1>
          <span className="font-sans text-[12px] text-[rgba(90,172,172,0.40)] leading-none">مراقبة</span>
        </div>
        
        <div className="overflow-y-auto flex-1 p-4 no-scrollbar">
          {SIDEBAR_TABS.map((block, i) => (
            <div key={i} className="mb-6">
              <div className="text-[7px] uppercase tracking-widest text-[#8A9BA8]/50 pb-2 mb-2 border-b border-[rgba(90,172,172,0.12)]">
                {block.category}
              </div>
              <ul className="space-y-1">
                {block.items.map(item => {
                  const isActive = activeTab === item.id;
                  return (
                    <li key={item.id}>
                      <button
                        onClick={() => setActiveTab(item.id)}
                        className={`w-full text-left px-2 py-1.5 flex items-center gap-3 transition-colors duration-200 outline-none
                          ${isActive ? 'bg-[#15161A] text-white' : 'text-[#8A9BA8] hover:text-[#E0E6ED] hover:bg-[#15161A]/50'}`}
                      >
                        <span style={{ color: isActive ? item.color : '#8A9BA8' }} className="text-sm shrink-0">
                          {item.icon}
                        </span>
                        <span className="text-[11px] font-['JetBrains_Mono'] tracking-wide truncate">
                          {item.label}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#0B0C10] relative">
        
        {/* VITALS BANDEAU */}
        <div className="h-12 border-b border-[#15161A] flex items-center px-6 shrink-0 bg-[#0B0C10]/80 backdrop-blur-md justify-between font-['JetBrains_Mono'] text-[10px] text-[#8A9BA8]">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <HeartPulse size={12} className="text-[#5AACAC] animate-pulse" />
              <span className="text-[#5AACAC]">SYSTEM NOMINAL</span>
            </div>
            <div className="flex items-center gap-2 border-l border-[#15161A] pl-6">
              <span className="opacity-50">LATENCY:</span>
              <span className="text-[#E0E6ED]">12ms</span>
            </div>
            <div className="flex items-center gap-2 border-l border-[#15161A] pl-6">
              <span className="opacity-50">ACTIVE DYADS:</span>
              <span className="text-[#4CAF50]">14,250</span>
            </div>
            <div className="flex items-center gap-2 border-l border-[#15161A] pl-6">
              <span className="opacity-50">HMM DRIFT:</span>
              <span className="text-[#F44336]">845 CRITICAL</span>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="opacity-50">MYNε INDEX:</span>
              <span className="text-[#8E4A9F]">€42.5K</span>
            </div>
            <div className="flex items-center gap-2 border-l border-[#15161A] pl-6">
              <span className="opacity-50">MHFS ACCURACY:</span>
              <span className="text-[#D4AF37]">94.2%</span>
            </div>
          </div>
        </div>
        
        {/* VIEW CONTAINER */}
        <div className="flex-1 overflow-auto relative p-6">
          <div className="max-w-[1600px] mx-auto h-full">
            {renderActiveView()}
          </div>
        </div>

      </div>
    </div>
  );
}
