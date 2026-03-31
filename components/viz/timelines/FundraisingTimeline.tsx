import React from 'react';
import { DollarSign, FileText, CheckCircle2 } from 'lucide-react';

interface Entry {
  id: string;
  data: any;
  [key: string]: any;
}

interface Props {
  data: Entry[];
  onNodeClick?: (entry: Entry) => void;
}

const STAGE_COLORS: Record<string, string> = {
  'pre-seed': '#8a712f',
  'seed': '#a38435',
  'série a': '#b8963e',
  'series a': '#b8963e',
  'growth': '#cfb05b',
  'default': '#5c5c5c'
};

export function FundraisingTimeline({ data, onNodeClick }: Props) {
  if (!data?.length) {
    return <div className="p-4 text-stone-500 text-xs font-[family-name:var(--font-jetbrains)] border border-stone-800 bg-[#111]">Aucune donnée de levée de fonds.</div>;
  }

  // Trier par sequencage si possible, ou ordre d'apparition
  // 'sequencage' pourrait être un numéro (1, 2, 3...) ou implicite.
  // On va tabler sur l'ordre actuel pour le moment, car les data sont souvent pré-triées.
  
  return (
    <div className="w-full bg-[#111111] overflow-x-auto p-6 md:p-12 border border-stone-800 custom-scrollbar">
      <div className="relative flex min-w-max items-center h-64">
        {/* Ligne directrice */}
        <div className="absolute top-[30%] left-0 right-0 h-1 bg-stone-900 rounded-full"></div>
        <div className="absolute top-[30%] left-0 right-0 h-1 bg-gradient-to-r from-[#B8963E]/20 via-[#B8963E] to-[#B8963E]/20 blur-[2px]"></div>

        {/* Nœuds de levée */}
        <div className="flex space-x-12 relative z-10 w-full pl-8">
          {data.map((entry, idx) => {
            const d = entry.data || {};
            const typeStr = (d.type || d.type_levee || 'default').toLowerCase();
            const color = STAGE_COLORS[typeStr] || STAGE_COLORS.default;
            const seqLabel = d.sequencage || `S-${idx + 1}`;

            return (
              <div 
                key={entry.id || idx}
                onClick={() => onNodeClick && onNodeClick(entry)}
                className="group relative flex flex-col items-center w-64 cursor-pointer"
              >
                {/* Ligne connectrice vers le point central */}
                <div className="h-6 w-px bg-stone-700 absolute top-[30%] -translate-y-[calc(100%+8px)] group-hover:bg-[#B8963E] transition-colors"></div>

                {/* Point d'ancrage */}
                <div 
                  className="w-4 h-4 rounded-full border-2 absolute top-[30%] -translate-y-1/2 -ml-2 bg-[#111] transition-all duration-300 shadow-[0_0_15px_rgba(0,0,0,0.5)] z-20 group-hover:scale-125 group-hover:shadow-[0_0_15px_rgba(184,150,62,0.8)]"
                  style={{ borderColor: color }}
                />

                {/* Carte au-dessus */}
                <div className="absolute bottom-[calc(70%+16px)] bg-stone-900/80 backdrop-blur-sm border border-stone-800 group-hover:border-[#B8963E]/50 rounded p-3 text-center shadow-lg transition-transform group-hover:-translate-y-2 flex flex-col items-center w-full">
                  <div className="text-[10px] font-bold tracking-widest uppercase mb-1" style={{ color }}>
                    {typeStr.toUpperCase()}
                  </div>
                  <h4 className="text-sm font-bold text-white mb-2 leading-tight">
                    {d.investisseur || 'Investisseur à définir'}
                  </h4>
                  <div className="flex items-center gap-1.5 text-xs text-stone-400 font-[family-name:var(--font-jetbrains)]">
                    <CheckCircle2 className="w-3 h-3 text-emerald-500/80" />
                    Seq: {seqLabel}
                  </div>
                </div>

                {/* Détails en-dessous */}
                <div className="absolute top-[calc(30%+24px)] w-full outline outline-1 outline-stone-800 bg-[#1A1A1A] p-4 text-xs text-stone-300 font-[family-name:var(--font-jetbrains)] flex flex-col gap-2 rounded transition-all group-hover:bg-[#111111] group-hover:outline-[#B8963E]/30">
                  <div className="flex items-start gap-2">
                    <FileText className="w-3.5 h-3.5 mt-0.5 text-stone-500 shrink-0" />
                    <div>
                      <span className="text-stone-500 block text-[9px]">Dossier</span>
                      <span className="line-clamp-2">{d.dossier || 'Aucun dossier référencé'}</span>
                    </div>
                  </div>
                  {d.terme_sheet && (
                    <div className="flex items-start gap-2 border-t border-stone-800 pt-2">
                      <DollarSign className="w-3.5 h-3.5 mt-0.5 text-[#B8963E] shrink-0" />
                      <div>
                        <span className="text-stone-500 block text-[9px]">Term Sheet</span>
                        <span className="truncate block">{d.terme_sheet}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
