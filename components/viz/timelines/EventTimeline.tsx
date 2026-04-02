import React from 'react';
import { MapPin, Calendar, Users } from 'lucide-react';

interface Entry {
  id: string;
  data: any;
  [key: string]: any;
}

interface Props {
  data: Entry[];
  onNodeClick?: (entry: Entry) => void;
}

export function EventTimeline({ data, onNodeClick }: Props) {
  if (!data?.length) {
    return <div className="p-4 text-stone-500 text-xs font-[family-name:var(--font-jetbrains)] border border-stone-800 bg-[#111]">Aucun événement trouvé.</div>;
  }

  // Trier par date approximative (on suppose que data.dates est chronologique)
  return (
    <div className="w-full bg-[#111111] border border-stone-800 py-6 overflow-x-auto custom-scrollbar">
      <div className="flex px-8 whitespace-nowrap min-w-max space-x-6">
        {data.map((evt, idx) => {
          const d = evt.data || {};
          return (
            <div 
              key={evt.id || idx}
              onClick={() => onNodeClick && onNodeClick(evt)}
              className="w-80 group cursor-pointer relative"
            >
              {/* Le fil connecteur (sauf dernier) */}
              {idx < data.length - 1 && (
                <div className="absolute top-6 left-1/2 w-full h-px bg-stone-800 -z-10 group-hover:bg-[#1E0A20] transition-colors duration-500"></div>
              )}
              
              <div className="bg-[#1A1A1A] border border-stone-800 group-hover:border-[#1E0A20]/50 rounded-none p-4 h-full flex flex-col transition-all group-hover:-translate-y-1 group-hover:shadow-[0_4px_20px_rgba(30,10,32,0.06)]">
                {/* Header: Date + Marqueur Numérique */}
                <div className="flex justify-between items-start mb-3">
                  <div className="bg-stone-900 text-[#1E0A20] text-[10px] font-[family-name:var(--font-jetbrains)] px-2 py-1 rounded-none">
                    EE-{String(idx + 1).padStart(2, '0')}
                  </div>
                  <div className="text-xs text-stone-400 flex items-center gap-1 font-[family-name:var(--font-jetbrains)]">
                    <Calendar className="w-3 h-3" />
                    {d.dates || 'TBD'}
                  </div>
                </div>

                {/* Titre événement */}
                <h3 className="text-stone-200 font-bold mb-2 group-hover:text-white transition-colors text-balance whitespace-normal line-clamp-2 leading-tight">
                  {d.evenement || 'Événement Non Défini'}
                </h3>
                
                {/* Métadonnées */}
                <div className="mt-auto pt-4 flex flex-col gap-2">
                  <div className="text-[10px] text-stone-400 flex items-center gap-2">
                    <MapPin className="w-3 h-3 text-stone-500" />
                    {d.lieu || 'Localisation Inconnue'}
                  </div>
                  {(d.cibles || d.exposants) && (
                    <div className="text-[10px] text-stone-500 flex items-center gap-2 truncate">
                      <Users className="w-3 h-3" />
                      {String(d.cibles || d.exposants)}
                    </div>
                  )}
                </div>

                {/* Cercle indicateur en haut */}
                <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-none-full bg-[#111111] border-2 border-stone-700 group-hover:border-[#1E0A20] transition-colors shadow"></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
