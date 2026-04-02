import React, { useMemo } from 'react';
import { Activity } from 'lucide-react';

interface Entry {
  id: string;
  data: any;
  [key: string]: any;
}

interface Props {
  data: Entry[];
  onNodeClick?: (entry: Entry) => void;
}

export function AgentActivityTimeline({ data, onNodeClick }: Props) {
  const { agents, minDate, maxDate, blocks } = useMemo(() => {
    if (!data?.length) return { agents: [], minDate: 0, maxDate: 0, blocks: [] };

    let globalMin = Infinity;
    let globalMax = -Infinity;
    const agentMap: Record<string, any[]> = {};

    data.forEach(entry => {
      const d = entry.data || {};
      const name = d.agent_name || d.agent || 'Agent Inconnu';
      
      // Parse dates (start_time, end_time) ou utiliser un fake timestamp si absent
      const start = new Date(d.start_time || d.created_at || Date.now() - 3600000).getTime();
      const end = new Date(d.end_time || d.completed_at || start + 1800000).getTime(); // 30min default duration

      if (start < globalMin) globalMin = start;
      if (end > globalMax) globalMax = end;

      if (!agentMap[name]) agentMap[name] = [];
      agentMap[name].push({
        id: entry.id,
        entry,
        name,
        start,
        end,
        status: d.status || 'success',
        durationMs: end - start
      });
    });

    if (globalMax === globalMin) {
      globalMax = globalMin + 3600000; // +1h au min
    }

    return {
      agents: Object.keys(agentMap),
      minDate: globalMin,
      maxDate: globalMax,
      blocks: agentMap
    };
  }, [data]);

  if (!agents.length) {
    return <div className="p-4 text-stone-500 text-xs font-[family-name:var(--font-jetbrains)] border border-stone-800 bg-[#111]">Aucune activité d'agent trouvée.</div>;
  }

  const durationStr = (ms: number) => {
    const s = Math.floor(ms / 1000);
    if (s < 60) return `${s}s`;
    const m = Math.floor(s / 60);
    return `${m}m ${s % 60}s`;
  };

  const totalRange = maxDate - minDate;

  return (
    <div className="w-full bg-[#111111] border border-stone-800 p-6 overflow-hidden">
      <div className="flex items-center gap-2 mb-6">
        <Activity className="w-4 h-4 text-[#1E0A20]" />
        <h3 className="text-[10px] font-bold text-[#1E0A20] tracking-widest uppercase font-[family-name:var(--font-jetbrains)]">
          Diagramme de Gantt — Activité des Agents
        </h3>
      </div>

      <div className="relative overflow-x-auto custom-scrollbar pb-6">
        <div className="min-w-[800px]">
          {/* Header Temps */}
          <div className="flex mb-4 ml-48 text-[9px] text-stone-500 font-[family-name:var(--font-jetbrains)] relative border-b border-stone-800 pb-2">
            <span className="absolute left-0">Début</span>
            <span className="absolute left-1/2 -translate-x-1/2">Milieu</span>
            <span className="absolute right-0">Fin</span>
          </div>

          <div className="flex flex-col gap-3 relative">
            {/* Lignes verticales de la grille */}
            <div className="absolute top-0 bottom-0 left-48 right-0 pointer-events-none flex justify-between z-0 border-l border-r border-stone-800/30">
              <div className="w-px h-full bg-stone-800/30" />
              <div className="w-px h-full bg-stone-800/30" />
              <div className="w-px h-full bg-stone-800/30" />
              <div className="w-px h-full bg-stone-800/30" />
            </div>

            {agents.map((agent, i) => (
              <div key={agent} className="flex items-center group relative z-10 hover:bg-stone-900/50 rounded-none transition-colors pr-4">
                {/* Agent Name column */}
                <div className="w-48 shrink-0 text-xs text-stone-300 font-bold font-[family-name:var(--font-jetbrains)] truncate pr-4 text-right">
                  {agent}
                </div>
                
                {/* Gantt Area */}
                <div className="flex-1 relative h-8 bg-stone-900/30 rounded-none">
                  {((blocks as Record<string, any[]>)[agent] ?? []).map((block: any, j: number) => {
                    const leftPct = ((block.start - minDate) / totalRange) * 100;
                    const widthPct = Math.max(((block.durationMs) / totalRange) * 100, 1); // au moins 1% de largeur

                    // Couleurs par status
                    const isErr = block.status === 'error' || block.status === 'failed';
                    const bgClass = isErr ? 'bg-red-900/80 border-red-500' : 'bg-[#1E0A20]/80 border-[#1E0A20]';

                    return (
                      <div
                        key={block.id || j}
                        onClick={() => onNodeClick && onNodeClick(block.entry)}
                        className={`absolute top-1/2 -translate-y-1/2 h-5 rounded-none border shadow-sm cursor-pointer hover:brightness-125 transition-all text-[8px] flex items-center justify-center font-[family-name:var(--font-jetbrains)] text-white overflow-hidden whitespace-nowrap px-1 ${bgClass}`}
                        style={{
                          left: `${leftPct}%`,
                          width: `${widthPct}%`,
                        }}
                        title={`${block.name} | ${new Date(block.start).toLocaleTimeString()} | ${durationStr(block.durationMs)}`}
                      >
                        {widthPct > 5 && durationStr(block.durationMs)}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
