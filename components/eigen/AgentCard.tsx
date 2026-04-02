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
      case 'L1': return 'bg-[#FAF8FC] border-l-[#1E0A20]';
      case 'L1.5': return 'bg-[#FAF8FC] border-l-[#8C3040]';
      case 'L2': return 'bg-[#FAF8FC] border-l-[#5A6E9C]';
      case 'L3': return 'bg-[#FAF8FC] border-l-[#5A8A6E]';
      case 'L4': return 'bg-[#FAF8FC] border-l-[#8B5EB0]';
      case 'OPS': return 'bg-[#FAF8FC] border-l-[rgba(30,10,32,0.40)]';
      default: return 'bg-[#FAF8FC] border-l-[rgba(30,10,32,0.20)]';
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
      case 'Actif': return <span className="relative flex h-2 w-2 mr-1"><span className="animate-ping absolute inline-flex h-full w-full rounded-none-none bg-green-400 opacity-75"></span><span className="relative inline-flex rounded-none-none h-2 w-2 bg-green-500"></span></span>;
      case 'En attente': return <span className="h-2 w-2 rounded-none-none bg-amber-500 mr-1" />;
      case 'Erreur': return <span className="h-2 w-2 rounded-none-none bg-red-600 animate-pulse mr-1" />;
      case 'Inactif': return <span className="h-2 w-2 rounded-none-none bg-gray-400 mr-1" />;
      default: return <span className="h-2 w-2 rounded-none-none bg-gray-400 mr-1" />;
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
      className={`stagger-card relative flex flex-col justify-between w-[280px] h-[180px] p-3 text-[#1E0A20] border-l-[3px] shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-pointer ${getLayerStyles(agent.layer)}`}
    >
      <div>
        <div className="flex justify-between items-start mb-1">
          <div className="flex items-center space-x-2">
            <Bot size={14} className="text-[rgba(30,10,32,0.60)]" />
            <span
              className="font-[family-name:var(--font-cormorant)] text-[12px] font-bold truncate max-w-[180px] hover:text-[rgba(30,10,32,0.70)] hover:underline transition-colors"
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
        
        <div className="flex items-center text-[9px] text-[rgba(30,10,32,0.45)] mb-3 space-x-1">
          {getPlatformIcon(agent.platform)}
          <span>{agent.model} · {agent.platform}</span>
        </div>

        <div className="font-mono text-[8px] font-semibold text-[rgba(30,10,32,0.60)] tracking-wider mb-1">
          {agent.layer} · {agent.pole.toUpperCase()}
        </div>

        <div className="text-[9px] text-[rgba(30,10,32,0.55)] line-clamp-2 leading-snug">
          {agent.instructions}
        </div>
      </div>

      <div className="mt-auto border-t border-[rgba(30,10,32,0.08)] pt-2 flex justify-between items-center text-[9px]">
        <div className="flex items-center space-x-1">
          {getStatusIcon(agent.status)}
          <span className="text-[rgba(30,10,32,0.70)]">{agent.status}</span>
        </div>
        <div className="text-[rgba(30,10,32,0.45)] flex space-x-2 text-right">
          <span>{agent.entriesProduced} pts</span>
          {agent.errorCount > 0 && <span className="text-red-500 font-bold">{agent.errorCount} err</span>}
        </div>
      </div>
    </div>
  );
};
