'use client';

import dynamic from 'next/dynamic';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import { EigenTabNav } from '@/components/eigen/EigenTabNav';
import { EigenOverview } from '@/components/eigen/EigenOverview';
import { EigenGallery } from '@/components/eigen/EigenGallery';
import { EigenConquest } from '@/components/eigen/EigenConquest';
import { EigenTerminal } from '@/components/eigen/EigenTerminal';
import { EigenAgents } from '@/components/eigen/EigenAgents';

const EigenBoard = dynamic(() => import('@/components/eigen/EigenBoard'), { ssr: false });

const TABS: Record<string, React.ComponentType> = {
  overview: EigenOverview,
  agents: EigenAgents,
  gallery: EigenGallery,
  board: EigenBoard,
  conquest: EigenConquest,
  terminal: EigenTerminal,
};

function EigenDashboardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tabParam = searchParams.get('tab') || 'overview';
  
  const [activeTab, setActiveTab] = useState(tabParam);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (tabParam !== activeTab && TABS[tabParam]) {
      setIsTransitioning(true);
      const timer = setTimeout(() => {
        setActiveTab(tabParam);
        setIsTransitioning(false);
      }, 150); // durée de la transition CSS
      return () => clearTimeout(timer);
    }
  }, [tabParam, activeTab]);

  const handleTabChange = (newTab: string) => {
    if (newTab !== tabParam) {
      router.push(`/eigen?tab=${newTab}`);
    }
  };

  const TabComponent = TABS[activeTab] || EigenOverview;

  return (
    <div className="w-screen h-screen flex flex-col bg-[#1C1814] overflow-hidden">
      {/* HEADER SIMPLIFIÉ EIGEN */}
      <div className="h-[52px] shrink-0 flex items-center justify-between px-6 border-b border-[#D4CCBA] bg-[#FDFAF3] z-20">
        <div className="flex items-center gap-3.5">
          <div className="w-1.5 h-1.5 rounded-full bg-[#B8963E]" />
          <span className="font-[family-name:var(--font-cormorant)] text-[22px] font-bold italic text-[#1C1814] tracking-[3px]">
            EIGEN
          </span>
          <div className="w-px h-5 bg-[#D4CCBA]" />
          <span className="text-[9px] text-[#918977] font-[family-name:var(--font-jetbrains)] tracking-[2px] uppercase">
            Sous-système Souverain
          </span>
        </div>
        
        {/* Responsive Mobile Select */}
        <div className="block sm:hidden flex-1 max-w-[150px] ml-auto">
          <select 
            value={tabParam}
            onChange={(e) => handleTabChange(e.target.value)}
            className="w-full bg-[#F2EFE8] border border-[#D4CCBA] text-[#1C1814] text-[10px] font-[family-name:var(--font-jetbrains)] px-2 py-1 outline-none"
          >
            <option value="overview">Vue d'ensemble</option>
            <option value="agents">Agents</option>
            <option value="gallery">Galerie</option>
            <option value="board">Board</option>
            <option value="conquest">Conquête</option>
            <option value="terminal">Terminal</option>
          </select>
        </div>
      </div>

      {/* NAV DES ONGLETS (Cachée sur mobile dans cette version, gérée par le select ci-dessus) */}
      <div className="hidden sm:block shrink-0 z-10 relative">
        <EigenTabNav activeTab={tabParam} onTabSelect={handleTabChange} />
      </div>

      {/* CONTENU ANIMÉ */}
      <div className="flex-1 overflow-hidden relative bg-[#FDFAF3]">
        <div 
          className={`absolute inset-0 w-full h-full transition-opacity duration-150 ease-in-out ${
            isTransitioning ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <TabComponent />
        </div>
      </div>
    </div>
  );
}

export default function EigenDashboardPage() {
  return (
    <Suspense fallback={<div className="bg-[#FDFAF3] w-screen h-screen flex items-center justify-center text-[#918977] font-[family-name:var(--font-jetbrains)] text-xs">Chargement de l'interface EIGEN...</div>}>
      <EigenDashboardContent />
    </Suspense>
  );
}
