import React from 'react';
import { Agent } from '../../lib/agents-data';
import { Play, RotateCw, AlertTriangle, XCircle, Bot, Cpu } from 'lucide-react';

interface AgentCardProps {
  agent: Agent;
  onClick: (agent: Agent) => void;
  style?: React.CSSProperties;
}

export const AgentCard: React.FC<AgentCardProps> = ({ agent, onClick, style }) => {
  const getLayerStyles = (layer: Agent['layer']) => {
    switch (layer) {
      case 'L1': return 'bg-[#F5F2F8] border-l-[#1E0A20]';
      case 'L1.5': return 'bg-[#FEF3F2] border-l-red-500';
      case 'L2': return 'bg-[#F0F4FE] border-l-blue-600';
      case 'L3': return 'bg-[#F0FEF4] border-l-emerald-500';
      case 'L4': return 'bg-[#FDF4FF] border-l-violet-600';
      case 'OPS': return 'bg-[#F5F2F8] border-l-stone-500';
      default: return 'bg-[#F5F2F8] border-l-gray-400';
    }
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'Claude': return <span className="text-violet-600">●</span>;
      case 'GPT': return <span className="text-green-500">●</span>;
      case 'Gemini': return <span className="text-blue-500">●</span>;
      case 'Mistral': return <span className="text-orange-500">●</span>;
      case 'Qwen': return <span className="text-red-500">●</span>;
      case 'DeepSeek': return <span className="text-indigo-600">●</span>;
      default: return <span className="text-gray-400">●</span>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Actif': return <span className="relative flex h-2 w-2 mr-1"><span className="animate-ping absolute inline-flex h-full w-full rounded-none-full bg-green-400 opacity-75"></span><span className="relative inline-flex rounded-none-full h-2 w-2 bg-green-500"></span></span>;
      case 'En attente': return <span className="h-2 w-2 rounded-none-full bg-amber-500 mr-1" />;
      case 'Erreur': return <span className="h-2 w-2 rounded-none-full bg-red-600 animate-pulse mr-1" />;
      case 'Inactif': return <span className="h-2 w-2 rounded-none-full bg-gray-400 mr-1" />;
      default: return <span className="h-2 w-2 rounded-none-full bg-gray-400 mr-1" />;
    }
  };

  return (
    <div 
      role="button"
      tabIndex={0}
      aria-label={`Ouvrir ${agent.name}`}
      data-testid={`agent-card-${agent.id}`}
      onClick={() => onClick(agent)}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onClick(agent);
        }
      }}
      style={style}
      className={`stagger-card relative flex flex-col justify-between w-[280px] h-[180px] p-3 text-stone-800 border-l-[3px] shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-pointer ${getLayerStyles(agent.layer)}`}
    >
      <div>
        <div className="flex justify-between items-start mb-1">
          <div className="flex items-center space-x-2">
            <Bot size={14} className="text-stone-600" />
            <span 
              className="font-['Playfair_Display'] text-[12px] font-bold truncate max-w-[180px] hover:text-[#1E0A20] hover:underline transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                window.location.href = `/eigen/agent/${encodeURIComponent(agent.id)}`;
              }}
            >
              {agent.name}
            </span>
          </div>
          <span className="text-[10px] text-stone-500 font-mono">{agent.id}</span>
        </div>
        
        <div className="flex items-center text-[9px] text-stone-500 mb-3 space-x-1">
          {getPlatformIcon(agent.platform)}
          <span>{agent.model} · {agent.platform}</span>
        </div>

        <div className="font-mono text-[8px] font-semibold text-stone-700 tracking-wider mb-1">
          {agent.layer} · {agent.pole.toUpperCase()}
        </div>
        
        <div className="text-[9px] text-stone-600 line-clamp-2 leading-snug">
          {agent.instructions}
        </div>
      </div>

      <div className="mt-auto border-t border-stone-200/50 pt-2 flex justify-between items-center text-[9px]">
        <div className="flex items-center space-x-1">
          {getStatusIcon(agent.status)}
          <span className="text-stone-700">{agent.status}</span>
        </div>
        <div className="text-stone-500 flex space-x-2 text-right">
          <span>{agent.entriesProduced} pts</span>
          {agent.errorCount > 0 && <span className="text-red-500 font-bold">{agent.errorCount} err</span>}
        </div>
      </div>
    </div>
  );
};
