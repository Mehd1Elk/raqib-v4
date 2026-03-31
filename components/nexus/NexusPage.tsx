'use client';

import dynamic from 'next/dynamic';

const NexusCanvas = dynamic(() => import('@/components/nexus/NexusCanvas'), { ssr: false });
const NexusControls = dynamic(() => import('@/components/nexus/NexusControls'), { ssr: false });
const NexusMiniInfo = dynamic(() => import('@/components/nexus/NexusMiniInfo'), { ssr: false });
const EigenStream = dynamic(() => import('@/components/stream/EigenStream'), { ssr: false });

export default function NexusPageClient() {
  return (
    <div className="h-screen w-screen overflow-hidden bg-[#1C1814] relative flex">
      <div className="flex-1 relative">
        <NexusCanvas />
        <NexusControls />
        <NexusMiniInfo />
      </div>

      <div className="w-[300px] shrink-0 border-l border-[rgba(60,52,40,0.5)] bg-[#FDFAF3] flex flex-col z-20 shadow-2xl">
        <div className="px-4 py-3 border-b border-[rgba(60,52,40,0.10)] bg-[#1C1814]">
          <h2 className="font-[family-name:var(--font-jetbrains)] text-[10px] text-[#D4B662] tracking-[2px] uppercase">Nexus Stream Feed</h2>
        </div>
        <div className="flex-1 overflow-hidden">
          <EigenStream />
        </div>
      </div>
    </div>
  );
}
