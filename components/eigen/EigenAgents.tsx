'use client';

import React, { useState, useMemo, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { AgentCard } from './AgentCard';
import { AgentDetailPanel } from './AgentDetailPanel';
import { AgentListTable } from './AgentListTable';
import { Search, Filter, LayoutGrid, List, Network, Download } from 'lucide-react';
import { agentsData, Agent, AgentLayer, AgentPole, AgentPlatform, AgentStatus } from '../../lib/agents-data';

// D3 Tree loads on client side only
const AgentOrgTree = dynamic(() => import('./AgentOrgTree').then(mod => mod.default), {
  ssr: false,
  loading: () => <div className="h-full w-full flex items-center justify-center font-mono text-stone-500 animate-pulse">Chargement de l&apos;organigramme...</div>
});

const LAYER_ORDER = ['L1', 'L1.5', 'L2', 'L3', 'L4', 'OPS'];
const POLES: AgentPole[] = ['Neurosciences & Santé', 'IA & Ingénierie', 'Données & Conformité', 'Marché & Acquisition', 'Communication & Design', 'Raqib', 'Viz', 'Réserve'];
const PLATFORMS: AgentPlatform[] = ['Claude', 'GPT', 'Gemini', 'Mistral', 'Qwen', 'DeepSeek'];
const STATUSES: AgentStatus[] = ['Actif', 'En attente', 'Erreur', 'Inactif'];
const MODELS = ['Opus', 'Sonnet', 'Haiku', 'GPT-4o', 'GPT-5.2', 'Gemini 3 Pro', 'Mistral Large', 'Qwen 2.5', 'DeepSeek R1', 'Claude Opus 4.6'];

export const EigenAgents: React.FC = () => {
  const [view, setView] = useState<'grid' | 'list' | 'tree'>('grid');
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Filters State
  const [search, setSearch] = useState('');
  const [layerFilter, setLayerFilter] = useState<AgentLayer | 'ALL'>('ALL');
  const [poleFilter, setPoleFilter] = useState<AgentPole | 'ALL'>('ALL');
  const [platformFilter, setPlatformFilter] = useState<AgentPlatform | 'ALL'>('ALL');
  const [statusFilter, setStatusFilter] = useState<AgentStatus | 'ALL'>('ALL');
  const [modelFilter, setModelFilter] = useState<string>('ALL');

  // Stats Counter Animation
  const [count, setCount] = useState(0);

  useEffect(() => {
    setIsLoaded(true);
    let start = 0;
    const end = 237;
    const duration = 1500;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, []);

  const filteredAgents = useMemo(() => {
    return agentsData.filter(a => {
      if (layerFilter !== 'ALL' && a.layer !== layerFilter) return false;
      if (poleFilter !== 'ALL' && a.pole !== poleFilter) return false;
      if (platformFilter !== 'ALL' && a.platform !== platformFilter) return false;
      if (statusFilter !== 'ALL' && a.status !== statusFilter) return false;
      if (modelFilter !== 'ALL' && !a.model.includes(modelFilter)) return false;
      if (search && !a.name.toLowerCase().includes(search.toLowerCase()) && !a.id.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [search, layerFilter, poleFilter, platformFilter, statusFilter, modelFilter]);

  const activeCount = agentsData.filter(a => a.status === 'Actif').length;
  const errorCount = agentsData.filter(a => a.status === 'Erreur').length;
  const entriesTotal = agentsData.reduce((acc, a) => acc + a.entriesProduced, 0);
  const layerSummary = LAYER_ORDER.map((layer) => `${agentsData.filter((agent) => agent.layer === layer).length} ${layer}`);

  return (
    <div className="relative w-full h-full min-h-[800px] bg-[#FDFCFB] font-sans overflow-hidden">
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .stagger-card {
          opacity: 0;
          animation: fadeIn 0.4s ease-out forwards;
        }
      `}</style>

      {/* BACKGROUND ORG TREE */}
      <div className="absolute inset-0 z-0">
        {isLoaded && <AgentOrgTree onSelectAgent={(id) => { const a = agentsData.find(ag => ag.id === id); if (a) setSelectedAgent(a); }} />}
      </div>
      
      {/* Floating Header */}
      <header className="absolute top-0 left-0 right-0 z-10 bg-white/70 backdrop-blur-md border-b border-[#E5E0D8]/50 px-6 py-4 flex flex-col space-y-3 shadow-sm">
        <div className="flex justify-between items-center">
          <h1 className="font-mono text-[12px] text-[#D4AF37] font-bold tracking-widest uppercase">
            {count} AGENTS — Écosystème EIGEN
          </h1>
          <div className="flex bg-stone-100 p-1 rounded">
            <button
              aria-label="Vue grille"
              onClick={() => setView('grid')}
              className={`p-1.5 rounded transition-colors ${view === 'grid' ? 'bg-white shadow-sm text-[#D4AF37]' : 'text-stone-500 hover:text-stone-800'}`}
            >
              <LayoutGrid size={16} />
            </button>
            <button
              aria-label="Vue liste"
              onClick={() => setView('list')}
              className={`p-1.5 rounded transition-colors ${view === 'list' ? 'bg-white shadow-sm text-[#D4AF37]' : 'text-stone-500 hover:text-stone-800'}`}
            >
              <List size={16} />
            </button>
            <button
              aria-label="Vue organigramme"
              onClick={() => setView('tree')}
              className={`p-1.5 rounded transition-colors ${view === 'tree' ? 'bg-white shadow-sm text-[#D4AF37]' : 'text-stone-500 hover:text-stone-800'}`}
            >
              <Network size={16} />
            </button>
          </div>
        </div>
        
        <div className="flex justify-between items-center text-[10px] font-mono font-medium text-stone-500 uppercase tracking-wide">
          <div className="flex space-x-3">
            <span>{layerSummary.join(' · ')}</span>
          </div>
          <div className="flex space-x-4 border-l pl-4 border-stone-200">
            <span className="text-emerald-600 flex items-center space-x-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span><span>{activeCount} actifs</span></span>
            <span className={errorCount > 0 ? 'text-red-500' : ''}>{errorCount} erreurs</span>
            <span>~{Math.round(entriesTotal / 30)} livrables/jour</span>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-stone-200/50">
            <div className="relative flex-1 min-w-[200px] max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" size={14} />
              <input 
                type="text" 
                aria-label="Recherche agents"
                placeholder="Rechercher par hash ou nom..." 
                className="w-full pl-9 pr-3 py-1.5 bg-stone-50 border border-stone-200 rounded text-xs focus:outline-none focus:ring-1 focus:ring-[#D4AF37] focus:border-[#D4AF37] text-stone-700 font-mono transition-all"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            
            <div className="flex bg-stone-50 border border-stone-200 rounded p-0.5 space-x-0.5">
              {(['ALL', ...LAYER_ORDER]).map(l => (
                <button 
                  key={l} 
                  onClick={() => setLayerFilter(l as any)}
                  className={`px-3 py-1 text-[10px] uppercase font-bold rounded transition-colors ${layerFilter === l ? 'bg-[#D4AF37] text-white shadow-sm' : 'text-stone-500 hover:bg-stone-200'}`}
                >
                  {l}
                </button>
              ))}
            </div>

            <select
              aria-label="Filtrer par pôle"
              className="bg-stone-50 border border-stone-200 rounded text-xs px-2 py-1.5 text-stone-600 outline-none w-[140px]"
              value={poleFilter}
              onChange={e => setPoleFilter(e.target.value as any)}
            >
              <option value="ALL">Tous les pôles</option>
              {POLES.map(p => <option key={p} value={p}>{p}</option>)}
            </select>

            <select
              aria-label="Filtrer par plateforme"
              className="bg-stone-50 border border-stone-200 rounded text-xs px-2 py-1.5 text-stone-600 outline-none w-[120px]"
              value={platformFilter}
              onChange={e => setPlatformFilter(e.target.value as any)}
            >
              <option value="ALL">Plateformes</option>
              {PLATFORMS.map(p => <option key={p} value={p}>{p}</option>)}
            </select>

            <select
              aria-label="Filtrer par statut"
              className="bg-stone-50 border border-stone-200 rounded text-xs px-2 py-1.5 text-stone-600 outline-none w-[120px]"
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value as any)}
            >
              <option value="ALL">Tous Statuts</option>
              {STATUSES.map(p => <option key={p} value={p}>{p}</option>)}
            </select>

            <select
              aria-label="Filtrer par modèle"
              className="bg-stone-50 border border-stone-200 rounded text-xs px-2 py-1.5 text-stone-600 outline-none w-[120px]"
              value={modelFilter}
              onChange={e => setModelFilter(e.target.value)}
            >
              <option value="ALL">Modèles LLM</option>
              {MODELS.map(p => <option key={p} value={p}>{p}</option>)}
            </select>

            <div data-testid="agents-count" className="ml-auto text-xs font-mono text-stone-500">
              Affichage {filteredAgents.length} / {agentsData.length} agents
            </div>
          </div>
      </header>

      {/* Main Content for Grid and List (Overlays tree) */}
      {view !== 'tree' && (
        <main className="absolute inset-0 z-20 pt-[140px] px-6 pb-6 overflow-auto bg-[#FDFCFB]/95 backdrop-blur-2xl">
          {!isLoaded ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="w-[280px] h-[180px] bg-stone-100 animate-pulse rounded border border-stone-200" />
              ))}
            </div>
          ) : view === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 justify-items-center sm:justify-items-start">
              {filteredAgents.map((agent, index) => (
                <AgentCard 
                  key={agent.id} 
                  agent={agent} 
                  onClick={setSelectedAgent}
                  style={{ animationDelay: `${index * 50}ms` }} 
                />
              ))}
              {filteredAgents.length === 0 && (
                <div className="col-span-full py-20 text-center text-stone-400 font-mono text-sm">Aucun agent ne correspond aux filtres.</div>
              )}
            </div>
          ) : (
            <AgentListTable data={filteredAgents} onRowClick={setSelectedAgent} />
          )}
        </main>
      )}

      <AgentDetailPanel agent={selectedAgent} onClose={() => setSelectedAgent(null)} />
    </div>
  );
};
