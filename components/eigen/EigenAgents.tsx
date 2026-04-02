'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { AgentCard } from './AgentCard';
import { AgentDetailPanel } from './AgentDetailPanel';
import { AgentListTable } from './AgentListTable';
import { Search, Filter, LayoutGrid, List, Network, Download, GitBranch, Users } from 'lucide-react';
import { agentsData, Agent, AgentLayer, AgentPole, AgentPlatform, AgentStatus } from '../../lib/agents-data';
import CohortGrid from './CohortGrid';

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
  const router = useRouter();
  const [view, setView] = useState<'org' | 'cohorts' | 'grid' | 'list'>('grid');
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [localAgents, setLocalAgents] = useState<Agent[]>(agentsData);
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

    // Fetch real data
    fetch('/api/agents')
      .then(res => res.json())
      .then(data => {
        if (data && Array.isArray(data)) {
          // Merge based on id but trust the DB data
          const merged = agentsData.map((a) => {
            const real = data.find((d: any) => d.id === a.id);
            return real ? { ...a, ...real } : a;
          });
          setLocalAgents(merged);
        }
      })
      .catch(console.error);

    return () => clearInterval(timer);
  }, []);

  const filteredAgents = useMemo(() => {
    return localAgents.filter(a => {
      if (layerFilter !== 'ALL' && a.layer !== layerFilter) return false;
      if (poleFilter !== 'ALL' && a.pole !== poleFilter) return false;
      if (platformFilter !== 'ALL' && a.platform !== platformFilter) return false;
      if (statusFilter !== 'ALL' && a.status !== statusFilter) return false;
      if (modelFilter !== 'ALL' && !a.model.includes(modelFilter)) return false;
      if (search && !a.name.toLowerCase().includes(search.toLowerCase()) && !a.id.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [search, layerFilter, poleFilter, platformFilter, statusFilter, modelFilter]);

  const activeCount = localAgents.filter(a => ['Actif', 'active', 'actif'].includes(a.status as string)).length;
  const errorCount = localAgents.filter(a => ['Erreur', 'error', 'erreur'].includes(a.status as string)).length;
  const entriesTotal = localAgents.reduce((acc, a) => acc + (a.entriesProduced || 0), 0);
  const layerSummary = LAYER_ORDER.map((layer) => `${localAgents.filter((agent) => agent.layer === layer).length} ${layer}`);

  return (
    <div className="relative w-full h-full min-h-[800px] bg-[#FDFCFB] font-sans flex flex-col overflow-hidden">
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
      {view === 'org' && (
        <div className="absolute inset-0 z-0">
          {isLoaded && <AgentOrgTree onSelectAgent={(id) => {
            const a = localAgents.find(ag => ag.id === id);
            if (a) router.push(`/eigen/agent/${encodeURIComponent(a.id)}`);
          }} />}
        </div>
      )}
      
      {/* Floating Header */}
      <header className={`shrink-0 relative z-10 ${view === 'org' ? 'bg-white/70 backdrop-blur-md' : 'bg-[#FDFCFB]'} border-b border-[#E5E0D8]/50 px-6 py-4 flex flex-col space-y-3`}>
        {/* Row 1 -- Title + Stats */}
        <div className="flex justify-between items-center">
          <h1 className="font-mono text-[12px] text-[#D4AF37] font-bold tracking-widest uppercase">
            {count} AGENTS — Écosystème EIGEN
          </h1>
          <div className="flex space-x-4 text-[10px] font-mono font-medium text-stone-500 uppercase tracking-wide">
            <span className="text-emerald-600 flex items-center space-x-1"><span className="w-1.5 h-1.5 rounded-none-none bg-emerald-500 animate-pulse"></span><span>{activeCount} actifs</span></span>
            <span className={errorCount > 0 ? 'text-red-500' : ''}>{errorCount} erreurs</span>
            <span>~{Math.round(entriesTotal / 30)} livrables/jour</span>
          </div>
        </div>

        {/* Row 2 -- Layer summary */}
        <div className="text-[10px] font-mono font-medium text-stone-500 uppercase tracking-wide">
          {layerSummary.join(' · ')}
        </div>

        {/* Row 3 -- Toggle 4 vues */}
        <div className="flex items-center gap-3 pt-2 border-t border-stone-200/50">
          <span className="font-mono text-[8px] text-stone-400 uppercase tracking-wider shrink-0">Vue</span>
          <div className="flex border border-[#E5E0D8] rounded-none overflow-hidden bg-white">
            {[
              { id: 'org', label: 'ORGANIGRAMME', icon: GitBranch },
              { id: 'cohorts', label: 'COHORTES', icon: Users },
              { id: 'grid', label: 'GRILLE', icon: LayoutGrid },
              { id: 'list', label: 'LISTE', icon: List },
            ].map(v => (
              <button
                key={v.id}
                onClick={() => setView(v.id as any)}
                className={`flex items-center gap-1.5 px-3 py-1.5 font-mono text-[9px] uppercase font-bold tracking-wider transition-colors ${
                  view === v.id
                    ? 'bg-[#B8963E] text-white'
                    : 'text-stone-500 hover:text-[#B8963E] hover:bg-stone-50'
                }`}
              >
                <v.icon size={12} strokeWidth={2} />
                {v.label}
              </button>
            ))}
          </div>
        </div>

        {/* Row 4 -- Filters (hidden in org view) */}
        {view !== 'org' && (
          <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-stone-200/50">
            <div className="relative flex-1 min-w-[200px] max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" size={14} />
              <input
                type="text"
                aria-label="Recherche agents"
                placeholder="Rechercher par hash ou nom..."
                className="w-full pl-9 pr-3 py-1.5 bg-stone-50 border border-stone-200 rounded-none text-xs focus:outline-none focus:ring-1 focus:ring-[#D4AF37] focus:border-[#D4AF37] text-stone-700 font-mono transition-all"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>

            <div className="flex bg-stone-50 border border-stone-200 rounded-none p-0.5 space-x-0.5">
              {(['ALL', ...LAYER_ORDER]).map(l => (
                <button
                  key={l}
                  onClick={() => setLayerFilter(l as any)}
                  className={`px-3 py-1 text-[10px] uppercase font-bold rounded-none transition-colors ${layerFilter === l ? 'bg-[#D4AF37] text-white shadow-sm' : 'text-stone-500 hover:bg-stone-200'}`}
                >
                  {l}
                </button>
              ))}
            </div>

            <select
              aria-label="Filtrer par pole"
              className="bg-stone-50 border border-stone-200 rounded-none text-xs px-2 py-1.5 text-stone-600 outline-none w-[140px]"
              value={poleFilter}
              onChange={e => setPoleFilter(e.target.value as any)}
            >
              <option value="ALL">Tous les poles</option>
              {POLES.map(p => <option key={p} value={p}>{p}</option>)}
            </select>

            <select
              aria-label="Filtrer par plateforme"
              className="bg-stone-50 border border-stone-200 rounded-none text-xs px-2 py-1.5 text-stone-600 outline-none w-[120px]"
              value={platformFilter}
              onChange={e => setPlatformFilter(e.target.value as any)}
            >
              <option value="ALL">Plateformes</option>
              {PLATFORMS.map(p => <option key={p} value={p}>{p}</option>)}
            </select>

            <select
              aria-label="Filtrer par statut"
              className="bg-stone-50 border border-stone-200 rounded-none text-xs px-2 py-1.5 text-stone-600 outline-none w-[120px]"
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value as any)}
            >
              <option value="ALL">Tous Statuts</option>
              {STATUSES.map(p => <option key={p} value={p}>{p}</option>)}
            </select>

            <select
              aria-label="Filtrer par modele"
              className="bg-stone-50 border border-stone-200 rounded-none text-xs px-2 py-1.5 text-stone-600 outline-none w-[120px]"
              value={modelFilter}
              onChange={e => setModelFilter(e.target.value)}
            >
              <option value="ALL">Modeles LLM</option>
              {MODELS.map(p => <option key={p} value={p}>{p}</option>)}
            </select>

            <div data-testid="agents-count" className="ml-auto text-xs font-mono text-stone-500">
              Affichage {filteredAgents.length} / {agentsData.length} agents
            </div>
          </div>
        )}
      </header>

      {/* Main Content for Lists/Grids/Cohorts */}
      {view !== 'org' && (
        <main className="flex-1 overflow-auto px-6 py-6 bg-[#FDFCFB]">
          {!isLoaded ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="w-[280px] h-[180px] bg-stone-100 animate-pulse rounded-none border border-stone-200" />
              ))}
            </div>
          ) : view === 'cohorts' ? (
            <div className="animate-in fade-in duration-500"><CohortGrid agentsData={localAgents} /></div>
          ) : view === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 justify-items-center sm:justify-items-start animate-in fade-in duration-500">
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
          ) : view === 'list' ? (
            <div className="animate-in fade-in duration-500"><AgentListTable data={filteredAgents} onRowClick={setSelectedAgent} /></div>
          ) : null}
        </main>
      )}
      {view === 'org' && (
        <div className="flex-1 relative z-0" />
      )}
      <AgentDetailPanel agent={selectedAgent} onClose={() => setSelectedAgent(null)} />
    </div>
  );
};
