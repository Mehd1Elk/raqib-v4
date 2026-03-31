import React from 'react';
import { notFound } from 'next/navigation';
import { agentsData } from '../../../../lib/agents-data';
import { AgentProfile } from '../../../../components/eigen/profile/AgentProfile';
import Link from 'next/link';

export default function AgentProfilePage({ params }: { params: { id: string } }) {
  // Decode ID since it might contain # which is handled differently in URL but if passed as path param it's probably standard string
  // Note: if id is #NOOS-01, it is uri encoded. Let's decode it.
  const decodedId = decodeURIComponent(params.id);
  const agent = agentsData.find(a => a.id === decodedId || a.id.replace('#', '') === decodedId);

  if (!agent) {
    notFound();
  }

  return (
    <div className="w-full min-h-screen flex flex-col bg-[#FDFAF3]">
      {/* HEADER BREADCRUMB */}
      <div className="h-[52px] shrink-0 flex items-center px-6 border-b border-[#D4CCBA] bg-[#FDFAF3] z-20">
        <div className="flex items-center gap-2 font-[family-name:var(--font-jetbrains)] text-[10px] tracking-wide text-[#918977] uppercase">
          <Link href="/" className="hover:text-[#1C1814] transition-colors">Raqib</Link>
          <span className="text-[#D4CCBA]">|</span>
          <Link href="/eigen" className="hover:text-[#1C1814] transition-colors">EIGEN</Link>
          <span className="text-[#D4CCBA]">|</span>
          <Link href="/eigen?tab=agents" className="hover:text-[#1C1814] transition-colors">Agents</Link>
          <span className="text-[#D4CCBA]">|</span>
          <span className="text-[#B8963E] font-bold">{agent.id} {agent.name.split(' ')[0]}</span>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <AgentProfile agent={agent} />
      </div>
    </div>
  );
}
