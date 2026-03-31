'use client';

import { BookOpen, ArrowRight, Lightbulb, Network } from 'lucide-react';

export default function YrKnownPage() {
  const modules = [
    { name: 'Knowledge graph', status: 'beta', nodes: '4,200' },
    { name: 'Expert profiling', status: 'alpha', nodes: '890' },
    { name: 'Tacit capture engine', status: 'design', nodes: '\u2014' },
    { name: 'Semantic search', status: 'alpha', nodes: '2,100' },
  ];

  return (
    <div className="min-h-screen bg-[#F7F3EA] p-8">
      <div className="max-w-6xl mx-auto">
        <div className="font-['JetBrains_Mono'] text-[8px] text-[#918977] tracking-[3px] mb-2">SUBSIDIAIRE EIGEN · SAVOIR TACITE</div>
        <h1 className="font-['Cormorant_Garamond'] text-[42px] font-bold italic text-[#1C1814] flex items-center gap-4">
          <BookOpen size={32} strokeWidth={1} className="text-[#B8963E]" />
          YrKnown
        </h1>
        <p className="font-['Noto_Sans'] text-[14px] text-[#918977] mt-2 max-w-2xl">
          Capitalisation du savoir tacite — knowledge graph, profiling d&apos;experts, capture sémantique et recherche contextuelle.
        </p>

        <div className="grid grid-cols-3 gap-4 mt-8">
          <div className="bg-[#FDFAF3] border border-[rgba(60,52,40,0.10)] rounded-lg p-5">
            <div className="flex items-center gap-2 mb-3">
              <Network size={14} className="text-[#B8963E]" />
              <span className="font-['JetBrains_Mono'] text-[9px] text-[#918977] tracking-wider">NOEUDS</span>
            </div>
            <div className="font-['Cormorant_Garamond'] text-[36px] font-bold text-[#1C1814]">7.2K</div>
            <div className="font-['Noto_Sans'] text-[11px] text-[#918977]">noeuds knowledge graph</div>
          </div>
          <div className="bg-[#FDFAF3] border border-[rgba(60,52,40,0.10)] rounded-lg p-5">
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb size={14} className="text-[#B8963E]" />
              <span className="font-['JetBrains_Mono'] text-[9px] text-[#918977] tracking-wider">EXPERTS</span>
            </div>
            <div className="font-['Cormorant_Garamond'] text-[36px] font-bold text-[#1C1814]">45</div>
            <div className="font-['Noto_Sans'] text-[11px] text-[#918977]">profils experts</div>
          </div>
          <div className="bg-[#FDFAF3] border border-[rgba(60,52,40,0.10)] rounded-lg p-5">
            <div className="flex items-center gap-2 mb-3">
              <BookOpen size={14} className="text-[#B8963E]" />
              <span className="font-['JetBrains_Mono'] text-[9px] text-[#918977] tracking-wider">COUCHES</span>
            </div>
            <div className="font-['Cormorant_Garamond'] text-[36px] font-bold text-[#1C1814]">100</div>
            <div className="font-['Noto_Sans'] text-[11px] text-[#918977]">couches documentées</div>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="font-['Cormorant_Garamond'] text-[20px] font-bold italic text-[#1C1814] mb-4">Modules</h2>
          <div className="space-y-3">
            {modules.map(m => (
              <div key={m.name} className="bg-[#FDFAF3] border border-[rgba(60,52,40,0.10)] rounded-lg p-4 flex items-center justify-between">
                <div>
                  <div className="font-['Noto_Sans'] text-[13px] text-[#1C1814] font-medium">{m.name}</div>
                  <div className="font-['JetBrains_Mono'] text-[9px] text-[#918977] uppercase tracking-wider mt-1">{m.status}</div>
                </div>
                <span className="font-['JetBrains_Mono'] text-[11px] text-[#918977]">{m.nodes}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex gap-3">
          <a href="/yrknown" className="inline-flex items-center gap-2 px-4 py-2 bg-[#1C1814] text-[#D4B662] rounded font-['JetBrains_Mono'] text-[10px] hover:bg-[#252019]">
            Viewer 100 couches <ArrowRight size={12} />
          </a>
        </div>
      </div>
    </div>
  );
}
