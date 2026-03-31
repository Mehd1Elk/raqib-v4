import React from 'react';
import { Flag, ArrowRight, Check, AlertCircle, Clock } from 'lucide-react';

interface Entry {
  id: string;
  data: any;
  [key: string]: any;
}

interface Props {
  data: Entry[];
  onNodeClick?: (entry: Entry) => void;
}

const STATUS_ICONS: Record<string, React.ReactNode> = {
  'terminé': <Check className="w-3 h-3 text-emerald-500" />,
  'done': <Check className="w-3 h-3 text-emerald-500" />,
  'en cours': <Clock className="w-3 h-3 text-blue-400" />,
  'in progress': <Clock className="w-3 h-3 text-blue-400" />,
  'retard': <AlertCircle className="w-3 h-3 text-red-500" />,
  'à faire': <Clock className="w-3 h-3 text-stone-500" />,
  'todo': <Clock className="w-3 h-3 text-stone-500" />
};

export function MilestoneTimeline({ data, onNodeClick }: Props) {
  if (!data?.length) {
    return <div className="p-4 text-stone-500 text-xs font-[family-name:var(--font-jetbrains)] border border-stone-800 bg-[#111]">Aucun jalon critique trouvé.</div>;
  }

  // Trier par date/deadline
  const sortedData = [...data].sort((a, b) => {
    const da = a.data?.deadline || a.data?.agenda || '';
    const db = b.data?.deadline || b.data?.agenda || '';
    return da.localeCompare(db); // Tri lexicographique simple (si format YYYY-MM)
  });

  return (
    <div className="w-full bg-[#111111] overflow-x-auto py-8 border border-stone-800 custom-scrollbar">
      <div className="text-[10px] font-bold text-[#B8963E] mb-6 tracking-widest uppercase font-[family-name:var(--font-jetbrains)] px-8">
        Feuille de Route Raqib/Eigen (2026-2028)
      </div>
      
      <div className="flex px-12 min-w-max">
        {sortedData.map((ms, idx) => {
          const d = ms.data || {};
          const isEnd = idx === sortedData.length - 1;
          const status = (d.statut || 'À FAIRE').toLowerCase();
          const StatusIcon = STATUS_ICONS[status] || <Flag className="w-3 h-3 text-stone-400" />;
          const title = d.jalon || d.feuille_de_route || 'Milestone';

          return (
            <div key={ms.id || idx} className="flex relative items-start group">
              <div 
                className="w-64 cursor-pointer"
                onClick={() => onNodeClick && onNodeClick(ms)}
              >
                {/* Numéro Milestone */}
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full border border-[#B8963E] bg-[#1a1a1a] text-[#B8963E] font-bold text-xs group-hover:scale-110 transition-transform shadow-[0_0_10px_rgba(184,150,62,0.2)]">
                    M{idx + 1}
                  </div>
                  {/* Flèche entre étapes */}
                  {!isEnd && (
                    <ArrowRight className="w-4 h-4 text-stone-700 mx-1 flex-1 group-hover:text-[#B8963E] transition-colors" />
                  )}
                  {isEnd && <div className="flex-1"></div>}
                </div>
                
                {/* Contenu de l'étape */}
                <div className="pr-12 pt-1 border-l border-dashed border-stone-800 ml-4 group-hover:border-[#B8963E]/50 transition-colors h-full min-h-[120px] relative pb-4">
                  <div className="absolute -left-[5px] top-6 w-2 h-2 rounded-full bg-[#B8963E] shadow-[0_0_8px_rgba(184,150,62,0.8)] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  
                  <div className="pl-6 pt-2">
                    <div className="text-[10px] flex items-center justify-between font-[family-name:var(--font-jetbrains)] mb-2">
                      <span className="text-[#B8963E]">{d.deadline || d.agenda || 'TBA'}</span>
                      <span className="flex items-center gap-1 uppercase text-stone-500 bg-stone-900 border border-stone-800 px-1 py-0.5 rounded">
                        {StatusIcon} {status}
                      </span>
                    </div>
                    
                    <h3 className="text-stone-300 font-bold mb-2 group-hover:text-white leading-tight">
                      {title}
                    </h3>
                    
                    {d.responsable && (
                      <div className="text-[10px] text-stone-500 font-[family-name:var(--font-jetbrains)] mt-1">
                        Resp: <span className="text-stone-400">{d.responsable}</span>
                      </div>
                    )}
                    
                    {d.KPI && (
                      <div className="text-[10px] text-stone-500 mt-1 line-clamp-2">
                        KPI: {d.KPI}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
