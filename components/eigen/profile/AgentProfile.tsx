'use client';

import React, { useState } from 'react';
import { Cpu, Play, Pencil, MessageCircle } from 'lucide-react';
import { Agent, agentsData } from '../../../lib/agents-data';
import StatusDot from '../../ui/StatusDot';
import { ActivityHeatmap } from './ActivityHeatmap';
import { AgentChat } from './AgentChat';
import { AgentComparison } from './AgentComparison';
import Link from 'next/link';

function timeAgo(dateString: string) {
  const diff = Date.now() - new Date(dateString).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

function formatDate(date: Date) {
  return date.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' });
}

function getLayerColor(layer: string) {
  switch (layer) {
    case 'L1': return '#64748b'; // stone-500 equivalent maybe? let's use tailwind colors
    case 'L1.5': return '#8b5cf6'; // violet
    case 'L2': return '#0ea5e9'; // sky
    case 'L3': return '#f59e0b'; // amber
    case 'L4': return '#ef4444'; // red
    case 'OPS': return '#10b981'; // emerald
    default: return '#94a3b8'; // slate
  }
}

// Mock upstreams/downstreams
function getUpstreamAgents(agentId: string) {
  return agentsData.slice(0, 2); // just some random links
}
function getDownstreamAgents(agentId: string) {
  return agentsData.slice(2, 4);
}

function Stat({ label, value, alert = false }: { label: string; value: string | number; alert?: boolean }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="font-['JetBrains_Mono'] text-[8px] text-[#918977] uppercase tracking-wider">{label}</span>
      <span className={`font-['Noto_Sans'] text-[16px] ${alert ? 'text-[#9C3D3D] font-bold' : 'text-[#1C1814]'}`}>
        {value}
      </span>
    </div>
  );
}

function ConfigRow({ label, value }: { label: string; value: string | undefined }) {
  return (
    <div className="flex justify-between items-center py-1">
      <span className="font-['JetBrains_Mono'] text-[9px] text-[#918977] uppercase tracking-wider">{label}</span>
      <span className="font-['Noto_Sans'] text-[11px] text-[#1C1814] text-right truncate max-w-[60%]">
        {value || 'N/A'}
      </span>
    </div>
  );
}

export function AgentProfile({ agent }: { agent: Agent }) {
  const layerColor = getLayerColor(agent.layer);
  const [showChat, setShowChat] = useState(false);
  const [showCompare, setShowCompare] = useState(false);
  
  // Mock recent activity log
  const recentActivity = Array.from({ length: 4 }).map((_, i) => {
    const d = new Date(); d.setDate(d.getDate() - i);
    return {
      id: i,
      success: Math.random() > 0.1,
      timestamp: d,
      description: `Génération rapport analytique phase ${i+1}`,
      entriesCreated: Math.floor(Math.random() * 50) + 10,
    };
  });

  return (
    <div className="max-w-5xl mx-auto py-8 px-6 font-sans">
      
      {/* HEADER — comme un profil GitHub/HuggingFace */}
      <div className="bg-[#FDFAF3] border border-[rgba(60,52,40,0.10)] rounded-lg p-6 mb-4 shadow-sm relative overflow-hidden">
        {/* Subtle background element */}
        <div className="absolute top-0 right-0 w-64 h-64 -translate-y-1/2 translate-x-1/2 pointer-events-none opacity-5">
           <Cpu size={256} />
        </div>

        <div className="flex items-start gap-5 relative z-10">
          {/* Avatar grand */}
          <div className="w-20 h-20 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: layerColor + '15', border: `1.5px solid ${layerColor}30` }}>
            <Cpu size={32} strokeWidth={1.5} style={{ color: layerColor }} />
          </div>
          <div className="flex-1 mt-1">
            <div className="flex items-center gap-3">
              <h2 className="font-['Cormorant_Garamond'] text-[28px] font-bold italic tracking-tight text-[#1C1814]">{agent.name}</h2>
              <span className="font-['JetBrains_Mono'] text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider" style={{ backgroundColor: layerColor + '20', color: layerColor }}>
                {agent.layer}
              </span>
              <StatusDot status={agent.status === 'Actif' ? 'active' : agent.status === 'Erreur' ? 'error' : agent.status === 'Inactif' ? 'inactive' : 'standby'} size={10} />
            </div>
            <div className="font-['JetBrains_Mono'] text-[11px] text-[#918977] mt-1.5 flex items-center gap-2">
              <span className="bg-[rgba(60,52,40,0.05)] px-1.5 py-0.5 rounded text-[#6B5E4C]">{agent.id}</span>
              <span>·</span>
              <span>{agent.pole}</span>
              <span>·</span>
              <span>{agent.platform}</span>
            </div>
            <div className="font-['Noto_Sans'] text-[12px] text-[#6B5E4C] mt-4 leading-relaxed max-w-2xl bg-white/50 p-3 rounded border border-white">
              {agent.instructions}
            </div>
          </div>
        </div>

        {/* Stats horizontales */}
        <div className="grid grid-cols-5 gap-6 mt-8 pt-5 border-t border-[rgba(60,52,40,0.10)]">
          <Stat label="Entries produites" value={agent.entriesProduced.toLocaleString()} />
          <Stat label="Livrables/jour" value={agent.entriesProduced > 0 ? Math.max(1, Math.floor(agent.entriesProduced / 30)) : 0} />
          <Stat label="Taux de succès" value={agent.errorCount > 0 ? `${(100 - (agent.errorCount / Math.max(agent.entriesProduced, 1)) * 100).toFixed(1)}%` : '99.9%'} />
          <Stat label="Dernière activité" value={timeAgo(agent.lastRunAt)} />
          <Stat label="Erreurs" value={agent.errorCount} alert={agent.errorCount > 0} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {/* SPECS TECHNIQUES — comme un model card HuggingFace */}
        <div className="bg-[#FDFAF3] border border-[rgba(60,52,40,0.10)] rounded-lg p-5 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-['JetBrains_Mono'] text-[10px] text-[#918977] tracking-[2px] font-bold">CONFIGURATION MODÈLE</h3>
            <span className="w-2 h-2 rounded-full bg-[#B8963E]" />
          </div>
          <div className="space-y-2.5">
            <ConfigRow label="Modèle principal" value={agent.model} />
            <ConfigRow label="Plateforme" value={agent.platform} />
            <ConfigRow label="Modèle de repli (Fallback)" value={agent.fallback || 'Aucun'} />
            <ConfigRow label="Ton / Personnalité" value={agent.tone} />
            <ConfigRow label="Langues supportées" value={agent.languages?.join(', ') || 'FR, EN'} />
            <ConfigRow label="Périmètre d'action" value={agent.perimeter || 'EIGEN OS'} />
          </div>
        </div>

        <div className="bg-[#FDFAF3] border border-[rgba(60,52,40,0.10)] rounded-lg p-5 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-['JetBrains_Mono'] text-[10px] text-[#918977] tracking-[2px] font-bold">BASE DE CONNAISSANCES</h3>
              <NetworkIcon />
            </div>
            <div className="flex flex-wrap gap-1.5">
              {((agent.knowledge as any)?.split(',') || ['Base de données souveraine Raqib', 'Guides métier']).map((k: string, idx: number) => (
                <span key={idx} className="font-['JetBrains_Mono'] text-[9px] px-2.5 py-1 bg-white border border-[#E5E0D8] text-[#6B5E4C] rounded-sm hover:border-[#B8963E] transition-colors cursor-default shadow-sm">{k.trim()}</span>
              ))}
            </div>
          </div>
          
          <div className="mt-6 pt-4 border-t border-[rgba(60,52,40,0.06)]">
            <h3 className="font-['JetBrains_Mono'] text-[10px] text-[#918977] tracking-[2px] mb-3 font-bold">DÉPENDANCES WORKFLOW</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="font-['JetBrains_Mono'] text-[8px] text-[#918977] uppercase">En amont</span>
                <div className="mt-1 flex flex-col gap-1">
                  {getUpstreamAgents(agent.id).map(a => (
                    <Link key={a.id} href={`/eigen/agent/${a.id}`} className="font-['Noto_Sans'] text-[11px] text-[#3D7C5E] hover:underline flex items-center gap-1">
                       <span className="w-1 h-1 bg-[#3D7C5E] rounded-full" /> {a.name}
                    </Link>
                  ))}
                </div>
              </div>
              <div>
                 <span className="font-['JetBrains_Mono'] text-[8px] text-[#918977] uppercase">En aval</span>
                 <div className="mt-1 flex flex-col gap-1">
                  {getDownstreamAgents(agent.id).map(a => (
                    <Link key={a.id} href={`/eigen/agent/${a.id}`} className="font-['Noto_Sans'] text-[11px] text-[#B87D3E] hover:underline flex items-center gap-1">
                      <span className="w-1 h-1 bg-[#B87D3E] rounded-full" /> {a.name}
                    </Link>
                  ))}
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ACTIVITÉ RÉCENTE — feed style GitHub contributions */}
      <div className="relative bg-[#FDFAF3] border border-[rgba(60,52,40,0.10)] rounded-lg p-5 mb-6 shadow-sm overflow-hidden">
        {/* Decorative corner lines */}
         <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none opacity-20" style={{ background: 'linear-gradient(135deg, transparent 50%, #B8963E 50%)' }} />

        <div className="flex justify-between items-end mb-5">
          <h3 className="font-['JetBrains_Mono'] text-[10px] text-[#918977] tracking-[2px] font-bold">CARTE D'ACTIVITÉ (30 DERNIERS JOURS)</h3>
          <span className="font-['JetBrains_Mono'] text-[9px] text-[#6B5E4C] uppercase bg-white px-2 py-0.5 rounded border border-[#E5E0D8]">Intensité opérationnelle</span>
        </div>
        
        {/* Heatmap style GitHub contributions */}
        <div className="bg-white/50 p-4 rounded border border-[rgba(60,52,40,0.05)] inline-block mb-6 shadow-inner">
           <ActivityHeatmap agentId={agent.id} />
        </div>
        
        {/* Liste des dernières actions */}
        <h4 className="font-['JetBrains_Mono'] text-[9px] text-[#918977] tracking-wider mb-3">DERNIERS LIVRABLES SOUMIS</h4>
        <div className="space-y-2 bg-white/30 rounded p-2">
          {recentActivity.map(activity => (
            <div key={activity.id} className="flex items-center gap-4 py-2 px-3 hover:bg-white rounded transition-colors group cursor-pointer border border-transparent hover:border-[rgba(60,52,40,0.10)]">
              <StatusDot status={activity.success ? 'active' : 'error'} size={8} />
              <span className="font-['JetBrains_Mono'] text-[10px] text-[#918977] w-[90px]">{formatDate(activity.timestamp)}</span>
              <span className="font-['Noto_Sans'] text-[12px] text-[#1C1814] flex-1 group-hover:text-[#B8963E] transition-colors">{activity.description}</span>
              <span className="font-['JetBrains_Mono'] text-[10px] text-[#3D7C5E] bg-[#3D7C5E15] px-2 py-0.5 rounded font-bold">+{activity.entriesCreated}</span>
              <span className="font-['Noto_Sans'] text-[11px] text-[#918977] w-[60px] text-right">Réf: #0{Math.floor(Math.random()*999)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ACTIONS */}
      {showChat || showCompare ? null : (
        <div className="flex flex-wrap gap-4 mt-8">
          <button className="flex items-center gap-2 px-5 py-2.5 bg-[#B8963E] text-white rounded font-['JetBrains_Mono'] text-[11px] uppercase tracking-wider font-bold shadow-md hover:bg-[#a38435] transition-colors transform hover:-translate-y-0.5">
            <Play size={14} fill="currentColor" /> Lancer maintenant
          </button>
          <button 
            onClick={() => setShowChat(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-white border border-[rgba(60,52,40,0.20)] rounded font-['JetBrains_Mono'] text-[11px] uppercase tracking-wider text-[#1C1814] hover:border-[#B8963E] hover:text-[#B8963E] transition-all shadow-sm"
          >
            <MessageCircle size={14} /> Parler à cet agent
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-[rgba(60,52,40,0.20)] rounded font-['JetBrains_Mono'] text-[11px] uppercase tracking-wider text-[#1C1814] hover:border-[#B8963E] hover:text-[#B8963E] transition-all shadow-sm">
            <Pencil size={14} /> Modifier instructions
          </button>
          <button 
            onClick={() => setShowCompare(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-transparent border border-dashed border-[#918977] rounded font-['JetBrains_Mono'] text-[11px] uppercase tracking-wider text-[#6B5E4C] hover:border-[#1C1814] hover:text-[#1C1814] transition-all ml-auto"
          >
            Comparer
          </button>
        </div>
      )}

      {showChat && (
        <div className="mt-8 animate-in slide-in-from-bottom-4 duration-500">
          <div className="flex justify-between items-center mb-4">
             <h3 className="font-['JetBrains_Mono'] text-[12px] text-[#1C1814] font-bold uppercase tracking-widest flex items-center gap-2">
               <MessageCircle size={16} className="text-[#B8963E]" /> Canal de communication direct
             </h3>
             <button onClick={() => setShowChat(false)} className="text-[10px] font-['JetBrains_Mono'] text-[#918977] hover:text-[#1C1814] uppercase shrink-0 px-2 py-1">Fermer</button>
          </div>
          <AgentChat agent={agent} />
        </div>
      )}

      {showCompare && (
        <div className="mt-8 animate-in slide-in-from-bottom-4 duration-500">
           <div className="flex justify-between items-center mb-4">
             <h3 className="font-['JetBrains_Mono'] text-[12px] text-[#1C1814] font-bold uppercase tracking-widest flex items-center gap-2">
                Comparaison de Profils
             </h3>
             <button onClick={() => setShowCompare(false)} className="text-[10px] font-['JetBrains_Mono'] text-[#918977] hover:text-[#1C1814] uppercase shrink-0 px-2 py-1">Fermer</button>
          </div>
          <AgentComparison agents={[agent, agentsData.find(a => a.layer === agent.layer && a.id !== agent.id) || agentsData[1], agentsData.find(a => a.pole === agent.pole && a.id !== agent.id) || agentsData[2]]} />
        </div>
      )}

    </div>
  );
}

function NetworkIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#918977" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="5" r="3"></circle>
      <circle cx="6" cy="12" r="3"></circle>
      <circle cx="18" cy="19" r="3"></circle>
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
    </svg>
  );
}
