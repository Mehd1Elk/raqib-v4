'use client';

import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { EigenTabNav } from '@/components/eigen/EigenTabNav';
import { ExportPDFButton } from '@/components/ExportPDFButton';
import { EigenOverview } from '@/components/eigen/EigenOverview';
import { EigenGallery } from '@/components/eigen/EigenGallery';
import { EigenConquest } from '@/components/eigen/EigenConquest';
import { EigenTerminal } from '@/components/eigen/EigenTerminal';
import { EigenAgents } from '@/components/eigen/EigenAgents';
import { EigenVault } from '@/components/eigen/EigenVault';

const EigenBoard = dynamic(() => import('@/components/eigen/EigenBoard'), { ssr: false });

const TABS: Record<string, React.ComponentType> = {
  overview: EigenOverview,
  agents: EigenAgents,
  gallery: EigenGallery,
  board: EigenBoard,
  conquest: EigenConquest,
  terminal: EigenTerminal,
  vault: EigenVault,
};

export function EigenDashboard({ initialTab }: { initialTab: string }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(initialTab);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (initialTab !== activeTab && TABS[initialTab]) {
      setIsTransitioning(true);
      const timer = setTimeout(() => {
        setActiveTab(initialTab);
        setIsTransitioning(false);
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [initialTab, activeTab]);

  const handleTabChange = (newTab: string) => {
    if (newTab !== activeTab) {
      router.push(`/eigen?tab=${newTab}`);
    }
  };

  const TabComponent = TABS[activeTab] || EigenOverview;

  return (
    <div className="w-screen h-screen flex flex-col bg-[#1C1814] overflow-hidden">
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
        <div className="flex items-center gap-3">
          <ExportPDFButton elementId="eigen-content" title="EIGEN Dashboard" />
        </div>
        <div className="block sm:hidden flex-1 max-w-[150px] ml-auto">
          <select
            aria-label="Navigation mobile EIGEN"
            data-testid="eigen-mobile-select"
            value={activeTab}
            onChange={(e) => handleTabChange(e.target.value)}
            className="w-full bg-[#F2EFE8] border border-[#D4CCBA] text-[#1C1814] text-[10px] font-[family-name:var(--font-jetbrains)] px-2 py-1 outline-none"
          >
            <option value="overview">Vue d&apos;ensemble</option>
            <option value="agents">Agents</option>
            <option value="gallery">Galerie</option>
            <option value="board">Board</option>
            <option value="conquest">Conquête</option>
            <option value="terminal">Terminal</option>
            <option value="vault">Vault</option>
          </select>
        </div>
      </div>

      <div className="hidden sm:block shrink-0 z-10 relative">
        <EigenTabNav activeTab={activeTab} onTabSelect={handleTabChange} />
      </div>

      <div id="eigen-content" className="flex-1 overflow-hidden relative bg-[#FDFAF3]">
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
