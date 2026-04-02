'use client';

import React from 'react';
import { Agent } from '../../../lib/agents-data';

function timeAgo(dateString: string) {
  const diff = Date.now() - new Date(dateString).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

function ComparisonRow({ label, value, highlight = false }: { label: string; value: string | number; highlight?: boolean }) {
  return (
    <div className="flex justify-between items-center py-2 border-b border-[rgba(30,10,32,0.04)] last:border-b-0">
      <span className="font-['JetBrains_Mono'] text-[9px] text-[rgba(30,10,32,0.60)] uppercase tracking-wider">{label}</span>
      <span className={`font-['Noto_Sans'] text-[11px] ${highlight ? 'text-[#9C3D3D] font-bold' : 'text-[#1E0A20]'}`}>
        {value}
      </span>
    </div>
  );
}

export function AgentComparison({ agents }: { agents: Agent[] }) {
  if (!agents || agents.length === 0) return null;

  return (
    <div className="bg-[#FAF8FC] border border-[rgba(30,10,32,0.08)] rounded-none-none overflow-hidden">
      <div className="p-3 bg-[#F5F2F8] border-b border-[rgba(30,10,32,0.08)]">
        <h3 className="font-['JetBrains_Mono'] text-[9px] text-[rgba(30,10,32,0.60)] tracking-[2px]">COMPARAISON AGENTS</h3>
      </div>
      <div className="grid divide-x divide-[rgba(30,10,32,0.08)]" style={{ gridTemplateColumns: `repeat(${agents.length}, 1fr)` }}>
        {agents.map(agent => (
          <div key={agent.id} className="p-4">
            <div className="flex items-center gap-2 mb-4">
              <span className="font-['JetBrains_Mono'] text-[8px] bg-[#1E0A20] bg-opacity-10 text-[#1E0A20] px-1.5 py-0.5 rounded-none">
                {agent.layer}
              </span>
              <div className="font-['Playfair_Display'] text-[16px] font-bold italic truncate text-[#1E0A20]" title={agent.name}>
                {agent.name}
              </div>
            </div>
            
            <div className="space-y-1">
              <ComparisonRow label="Pôle" value={agent.pole} />
              <ComparisonRow label="Plateforme" value={agent.platform} />
              <ComparisonRow label="Modèle" value={agent.model} />
              <ComparisonRow label="Entries" value={agent.entriesProduced.toLocaleString()} />
              <ComparisonRow label="Erreurs" value={agent.errorCount} highlight={agent.errorCount > 0} />
              <ComparisonRow label="Dernière act." value={timeAgo(agent.lastRunAt)} />
              <ComparisonRow label="Ton" value={agent.tone} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
