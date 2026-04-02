import React from 'react';
import { Agent } from '../../lib/agents-data';
import { X, PlayCircle, Edit3, Database, CheckCircle2, XCircle } from 'lucide-react';

interface AgentDetailPanelProps {
  agent: Agent | null;
  onClose: () => void;
}

export const AgentDetailPanel: React.FC<AgentDetailPanelProps> = ({ agent, onClose }) => {
  if (!agent) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-stone-900/40 z-40 transition-opacity"
        onClick={onClose}
      />
      
      {/* Panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`Détail agent ${agent.name}`}
        className="fixed right-0 top-0 h-full w-[400px] bg-white border-l border-[#1E0A20] z-50 shadow-2xl overflow-y-auto transform transition-transform duration-300 translate-x-0"
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-start mb-6 border-b border-stone-200 pb-4">
            <div>
              <h2 className="text-xl font-['Playfair_Display'] font-bold text-stone-900 mb-1">
                {agent.id} — {agent.name.toUpperCase()}
              </h2>
              <div className="flex items-center space-x-2 text-xs font-mono text-stone-600">
                <span className="bg-stone-100 px-2 py-0.5 rounded-none text-[#1E0A20] font-semibold">{agent.layer}</span>
                <span>·</span>
                <span>Pôle {agent.pole}</span>
              </div>
            </div>
            <button onClick={onClose} className="p-1 hover:bg-stone-100 rounded-none-full text-stone-500 transition-colors">
              <X size={20} />
            </button>
          </div>

          {/* Properties Grid */}
          <div className="grid grid-cols-2 gap-y-4 gap-x-6 text-sm mb-6 pb-6 border-b border-stone-200">
            <div>
              <span className="block text-xs font-mono text-stone-400 mb-1">MODÈLE</span>
              <span className="font-semibold text-stone-800">{agent.model}</span>
            </div>
            <div>
              <span className="block text-xs font-mono text-stone-400 mb-1">PLATEFORME</span>
              <span className="font-semibold text-stone-800">{agent.platform}</span>
            </div>
            <div>
              <span className="block text-xs font-mono text-stone-400 mb-1">FALLBACK</span>
              <span className="font-semibold text-stone-800">{agent.fallback}</span>
            </div>
          </div>

          {/* Instructions */}
          <div className="mb-6">
            <span className="block text-xs font-mono text-stone-400 mb-2">INSTRUCTIONS</span>
            <p className="text-sm text-stone-700 leading-relaxed bg-stone-50 p-3 rounded-none rounded-none-l-none border-l-2 border-[#1E0A20]">
              {agent.instructions}
            </p>
          </div>

          {/* Details */}
          <div className="space-y-3 mb-8">
            <div className="flex justify-between text-sm py-2 border-b border-stone-100">
              <span className="font-mono text-xs text-stone-400">TON</span>
              <span className="font-medium text-stone-700">{agent.tone}</span>
            </div>
            <div className="flex justify-between text-sm py-2 border-b border-stone-100">
              <span className="font-mono text-xs text-stone-400">LANGUES</span>
              <span className="font-medium text-stone-700">{agent.languages.join(' · ')}</span>
            </div>
            <div className="flex justify-between text-sm py-2 border-b border-stone-100">
              <span className="font-mono text-xs text-stone-400">PÉRIMÈTRE</span>
              <span className="font-medium text-stone-700">{agent.perimeter}</span>
            </div>
            <div className="flex justify-between text-sm py-2 border-b border-stone-100">
              <span className="font-mono text-xs text-stone-400">CONNAISSANCES</span>
              <span className="font-medium text-stone-700 truncate max-w-[200px]" title={agent.knowledge}>
                {agent.knowledge}
              </span>
            </div>
          </div>

          {/* History */}
          <div className="mb-8 font-mono text-xs">
            <span className="block text-stone-400 mb-3 tracking-widest">─── HISTORIQUE (10 dernières) ──────</span>
            <div className="space-y-2">
              {[1, 2, 3].map((item, idx) => (
                <div key={idx} className="flex justify-between items-center text-stone-600">
                  <span>31/03 {18 - idx * 2}:00</span>
                  <span className="text-green-600">+{Math.floor(Math.random() * 20 + 5)} entries</span>
                  <CheckCircle2 size={16} className="text-green-600" />
                </div>
              ))}
              <div className="flex justify-between items-center text-red-500">
                <span>31/03 12:00</span>
                <span>erreur timeout</span>
                <XCircle size={16} className="text-red-500" />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <button className="w-full flex items-center justify-center space-x-2 py-3 bg-[#1E0A20] hover:bg-[#C5A028] text-white font-semibold rounded-none transition-colors shadow-sm">
              <PlayCircle size={18} />
              <span>Lancer maintenant</span>
            </button>
            <button className="w-full flex items-center justify-center space-x-2 py-3 bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold rounded-none transition-colors shadow-sm">
              <Edit3 size={18} />
              <span>Modifier instructions</span>
            </button>
            <button className="w-full flex items-center justify-center space-x-2 py-3 bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold rounded-none transition-colors shadow-sm">
              <Database size={18} />
              <span>Voir les entries produites</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
