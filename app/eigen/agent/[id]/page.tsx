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
    const { createClient } = await import('../../../../lib/supabase/server');
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('agent_registry')
      .select('*')
      .eq('id', id)
      .single();
    if (error || !data) return null;
    const statusMap: Record<string, string> = {
      active: 'Actif', error: 'Erreur', inactive: 'Inactif', pending: 'En attente',
    };
    return {
      id: data.id,
      name: data.name ?? data.id,
      layer: data.layer ?? 'OPS',
      pole: data.pole ?? 'Raqib',
      platform: data.platform ?? 'Claude',
      model: data.model ?? 'Unknown',
      status: (statusMap[data.status ?? ''] ?? data.status ?? 'En attente') as Agent['status'],
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
