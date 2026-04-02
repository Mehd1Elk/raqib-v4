'use client';

import dynamic from 'next/dynamic';

const NexusCanvas = dynamic(() => import('@/components/nexus/NexusCanvas'), { ssr: false });
const NexusControls = dynamic(() => import('@/components/nexus/NexusControls'), { ssr: false });
const NexusMiniInfo = dynamic(() => import('@/components/nexus/NexusMiniInfo'), { ssr: false });
const A2AOverlay = dynamic(() => import('@/components/nexus/A2AOverlay'), { ssr: false });
const EigenStream = dynamic(() => import('@/components/stream/EigenStream'), { ssr: false });

export default function NexusPageClient() {
  return (
    <div className="h-screen w-screen overflow-hidden bg-[#1E0A20] relative flex">
      <div className="flex-1 relative">
        <NexusCanvas />
        <A2AOverlay />
        <NexusControls />
        <NexusMiniInfo />
      </div>

      <div className="w-[300px] shrink-0 border-l border-[rgba(60,52,40,0.5)] bg-[#FAF8FC] flex flex-col z-20 shadow-2xl">
        <div className="px-4 py-3 border-b border-[rgba(30,10,32,0.08)] bg-[#1E0A20]">
          <h2 className="font-[family-name:var(--font-jetbrains)] text-[10px] text-[#1E0A20] tracking-[2px] uppercase">Nexus Stream Feed</h2>
        </div>
        <div className="flex-1 overflow-hidden">
          <EigenStream />
        </div>
      </div>
    </div>
  );
}
