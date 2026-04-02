'use client';

import { useNexusStore } from './nexus-store';

export default function NexusMiniInfo() {
  const { selectedEntity, selectedFlow, connectedFlows } = useNexusStore();

  if (!selectedEntity && !selectedFlow) return null;

  /* ── Flow detail ── */
  if (selectedFlow) {
    return (
      <div className="absolute bottom-4 right-4 z-20 w-[280px] bg-[#252019]/90 backdrop-blur-md border border-[rgba(212,182,98,0.15)] rounded-none-none p-4">
        <div className="font-[family-name:var(--font-jetbrains)] text-[7px] text-[rgba(30,10,32,0.60)] tracking-[2px] uppercase mb-2">
          FLUX
        </div>
        <div className="font-[family-name:var(--font-cormorant)] text-[16px] font-bold italic text-white mb-1">
          {selectedFlow.label}
        </div>
        <div className="font-[family-name:var(--font-noto)] text-[10px] text-[rgba(30,10,32,0.60)] mb-3">
          {selectedFlow.source} &rarr; {selectedFlow.target}
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="text-center">
            <div className="font-[family-name:var(--font-cormorant)] text-[18px] text-[#1E0A20]">
              {selectedFlow.volume}%
            </div>
            <div className="font-[family-name:var(--font-jetbrains)] text-[6px] text-[rgba(30,10,32,0.60)]">
              VOLUME
            </div>
          </div>
          <div className="text-center">
            <div className="font-[family-name:var(--font-cormorant)] text-[18px] text-[#1E0A20]">
              {selectedFlow.type}
            </div>
            <div className="font-[family-name:var(--font-jetbrains)] text-[6px] text-[rgba(30,10,32,0.60)]">
              TYPE
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ── Entity detail ── */
  if (!selectedEntity) return null;

  return (
    <div className="absolute bottom-4 right-4 z-20 w-[300px] bg-[#252019]/90 backdrop-blur-md border border-[rgba(212,182,98,0.15)] rounded-none-none p-4">
      <div className="flex items-center gap-3 mb-3">
        <div
          className="w-3 h-3 rounded-none-full"
          style={{ backgroundColor: selectedEntity.color }}
        />
        <span className="font-[family-name:var(--font-cormorant)] text-[16px] font-bold italic text-white">
          {selectedEntity.name}
        </span>
      </div>
      <div className="font-[family-name:var(--font-noto)] text-[10px] text-[rgba(30,10,32,0.60)] mb-3">
        {selectedEntity.tagline}
      </div>

      {/* Mini KPIs */}
      <div className="grid grid-cols-3 gap-2 mb-3">
        <div className="text-center">
          <div className="font-[family-name:var(--font-cormorant)] text-[16px] text-[#1E0A20]">
            1842
          </div>
          <div className="font-[family-name:var(--font-jetbrains)] text-[6px] text-[rgba(30,10,32,0.60)]">
            ENTRIES
          </div>
        </div>
        <div className="text-center">
          <div className="font-[family-name:var(--font-cormorant)] text-[16px] text-[#1E0A20]">
            10
          </div>
          <div className="font-[family-name:var(--font-jetbrains)] text-[6px] text-[rgba(30,10,32,0.60)]">
            AGENTS
          </div>
        </div>
        <div className="text-center">
          <div className="font-[family-name:var(--font-cormorant)] text-[16px] text-[#1E0A20]">
            88
          </div>
          <div className="font-[family-name:var(--font-jetbrains)] text-[6px] text-[rgba(30,10,32,0.60)]">
            SCORE
          </div>
        </div>
      </div>

      {/* Connected flows */}
      {connectedFlows.length > 0 && (
        <>
          <div className="font-[family-name:var(--font-jetbrains)] text-[8px] text-[rgba(30,10,32,0.60)] mb-1 tracking-wider">
            FLUX CONNECTES
          </div>
          <div className="space-y-0.5 mb-3 max-h-[100px] overflow-y-auto">
            {connectedFlows.map((f) => (
              <div
                key={`${f.source}-${f.target}-${f.label}`}
                className="font-[family-name:var(--font-noto)] text-[9px] text-[#1E0A20] py-0.5"
              >
                &rarr; {f.label}
                <span className="text-[rgba(30,10,32,0.60)] ml-1">({f.volume}%)</span>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Action */}
      <a
        href={`/${selectedEntity.id}`}
        className="block mt-2 text-center py-2 bg-[#1E0A20] text-white rounded-none font-[family-name:var(--font-jetbrains)] text-[9px] hover:bg-[#9A7B32] transition-colors"
      >
        OUVRIR {selectedEntity.name}
      </a>
    </div>
  );
}
