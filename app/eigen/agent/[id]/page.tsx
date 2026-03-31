import React from 'react';
import { notFound } from 'next/navigation';
import { agentsData, type Agent } from '../../../../lib/agents-data';
import { AgentProfile } from '../../../../components/eigen/profile/AgentProfile';
import Link from 'next/link';

function findLocalAgent(id: string): Agent | undefined {
  const decoded = decodeURIComponent(id);
  return agentsData.find(
    (a) =>
      a.id === decoded ||
      a.id.replace('#', '') === decoded ||
      a.name === decoded,
  );
}

async function findSupabaseAgent(id: string): Promise<Agent | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/agents/${encodeURIComponent(id)}`, {
      cache: 'no-store',
    });
    if (!res.ok) return null;
    const data = await res.json();
    if (data.error) return null;
    return {
      id: data.id,
      name: data.name ?? data.id,
      layer: data.layer ?? 'OPS',
      pole: data.pole ?? 'Raqib',
      platform: data.platform ?? 'Claude',
      model: data.model ?? 'Unknown',
      status: data.status === 'active' ? 'Actif' : data.status === 'error' ? 'Erreur' : data.status === 'inactive' ? 'Inactif' : (data.status ?? 'En attente'),
      entriesProduced: data.entries_produced ?? 0,
    } as Agent;
  } catch {
    return null;
  }
}

export default async function AgentProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const agent = findLocalAgent(id) ?? (await findSupabaseAgent(id));

  if (!agent) {
    notFound();
  }

  return (
    <div className="w-full min-h-screen flex flex-col bg-[#FDFAF3]">
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
