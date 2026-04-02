import React, { useMemo } from 'react';
import { Layers } from 'lucide-react';

interface Entry {
  id: string;
  data: any;
  [key: string]: any;
}

interface Props {
  data: Entry[];
  onNodeClick?: (entry: Entry) => void;
}

export function RegulatoryTimeline({ data, onNodeClick }: Props) {
  const events = useMemo(() => {
    if (!data) return [];
    
    return data
      .map(entry => {
        const d = entry.data;
        const name = d.reference_juridique || d.loi || d.reglementation;
        const dateStr = d.date_application;
        const org = d.organisme || d.autorite_controle || d.juridiction;
        
        let dateObj = null;
        if (dateStr) {
          const parsed = new Date(dateStr);
          if (!isNaN(parsed.getTime())) {
            dateObj = parsed;
          } else {
             // Try to find a year
             const match = String(dateStr).match(/\b(202[0-9]|203[0-9])\b/);
             if (match) {
               dateObj = new Date(parseInt(match[1]), 0, 1);
             }
          }
        }
        
        return {
          ...entry,
          name,
          dateObj,
          dateStr,
          org
        };
      })
      .filter(e => e.dateObj)
      .sort((a, b) => (a.dateObj as Date).getTime() - (b.dateObj as Date).getTime());
  }, [data]);

  const today = new Date('2026-03-31');

  if (!events.length) {
    return <div className="p-4 text-stone-500 text-xs font-[family-name:var(--font-jetbrains)]">Aucune donnée réglementaire trouvée.</div>;
  }

  return (
    <div className="w-full bg-[#111111] overflow-x-auto border-t border-b border-stone-800 py-8 relative custom-scrollbar">
      <div className="min-w-max px-12 relative flex items-center h-48">
        {/* Ligne principale */}
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-stone-800 -translate-y-1/2 z-0"></div>

        {/* Marqueur "Aujourd'hui" */}
        <div className="absolute top-0 bottom-0 z-10 flex flex-col items-center justify-center transition-all" style={{ left: 'clamp(10%, 50%, 90%)' }}>
          <div className="text-[10px] font-bold text-[#B8963E] mb-2 uppercase tracking-widest bg-[#111111] px-2">Aujourd'hui</div>
          <div className="w-px h-full bg-[#B8963E] opacity-50 border-l border-dashed border-[#B8963E]"></div>
        </div>

        {/* Événements */}
        <div className="flex space-x-24 relative z-20">
          {events.map((ev, i) => {
            const isPast = (ev.dateObj as Date) < today;
            return (
              <div 
                key={ev.id || i}
                onClick={() => onNodeClick && onNodeClick(ev)}
                className="relative flex flex-col items-center group cursor-pointer w-48"
              >
                {/* Point sur la ligne */}
                <div 
                  className={`w-3 h-3 rounded-none-none border-2 transition-all duration-300 absolute top-1/2 -translate-y-1/2 ${
                    isPast ? 'bg-[#111111] border-stone-600' : 'bg-[#B8963E] border-[#111111] group-hover:scale-150 group-hover:shadow-[0_0_10px_rgba(184,150,62,0.5)]'
                  }`}
                />
                
                {/* Contenu (alternance haut/bas) */}
                <div className={`absolute w-full ${i % 2 === 0 ? 'bottom-full mb-6' : 'top-full mt-6'} text-center transition-transform group-hover:-translate-y-1`}>
                  <div className="text-[10px] text-[#B8963E] font-[family-name:var(--font-jetbrains)] mb-1">
                    {ev.dateStr}
                  </div>
                  <div className="text-xs text-stone-200 font-bold leading-tight mb-1 group-hover:text-white">
                    {ev.name || 'Règlementation'}
                  </div>
                  <div className="text-[10px] text-stone-500 uppercase tracking-wide">
                    {ev.org || 'Instance'}
                  </div>
                  <div className="mt-2 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Layers className="w-3 h-3 text-stone-500" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
