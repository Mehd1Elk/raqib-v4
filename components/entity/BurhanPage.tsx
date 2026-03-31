'use client';

import { FileCheck, ArrowRight, Lock, ScrollText } from 'lucide-react';

export default function BurhanPage() {
  const trails = [
    { name: 'Blockchain notarisation', status: 'production', entries: '12,400' },
    { name: 'Document versioning', status: 'beta', entries: '8,200' },
    { name: 'Compliance checker', status: 'alpha', entries: '3,100' },
    { name: 'Cross-entity audit', status: 'design', entries: '\u2014' },
  ];

  return (
    <div className="min-h-screen bg-[#F7F3EA] p-8">
      <div className="max-w-6xl mx-auto">
        <div className="font-['JetBrains_Mono'] text-[8px] text-[#918977] tracking-[3px] mb-2">SUBSIDIAIRE EIGEN · AUDIT TRAIL</div>
        <h1 className="font-['Cormorant_Garamond'] text-[42px] font-bold italic text-[#1C1814] flex items-center gap-4">
          <FileCheck size={32} strokeWidth={1} className="text-[#B8963E]" />
          BURHAN
        </h1>
        <p className="font-['Noto_Sans'] text-[14px] text-[#918977] mt-2 max-w-2xl">
          Preuve et traçabilité — audit trail blockchain, notarisation de documents, versioning immuable et conformité réglementaire.
        </p>

        <div className="grid grid-cols-3 gap-4 mt-8">
          <div className="bg-[#FDFAF3] border border-[rgba(60,52,40,0.10)] rounded-lg p-5">
            <div className="flex items-center gap-2 mb-3">
              <ScrollText size={14} className="text-[#B8963E]" />
              <span className="font-['JetBrains_Mono'] text-[9px] text-[#918977] tracking-wider">ENTRÉES</span>
            </div>
            <div className="font-['Cormorant_Garamond'] text-[36px] font-bold text-[#1C1814]">23.7K</div>
            <div className="font-['Noto_Sans'] text-[11px] text-[#918977]">audit entries</div>
          </div>
          <div className="bg-[#FDFAF3] border border-[rgba(60,52,40,0.10)] rounded-lg p-5">
            <div className="flex items-center gap-2 mb-3">
              <Lock size={14} className="text-[#B8963E]" />
              <span className="font-['JetBrains_Mono'] text-[9px] text-[#918977] tracking-wider">INTÉGRITÉ</span>
            </div>
            <div className="font-['Cormorant_Garamond'] text-[36px] font-bold text-[#1C1814]">100%</div>
            <div className="font-['Noto_Sans'] text-[11px] text-[#918977]">hash chain valide</div>
          </div>
          <div className="bg-[#FDFAF3] border border-[rgba(60,52,40,0.10)] rounded-lg p-5">
            <div className="flex items-center gap-2 mb-3">
              <FileCheck size={14} className="text-[#B8963E]" />
              <span className="font-['JetBrains_Mono'] text-[9px] text-[#918977] tracking-wider">COUCHES</span>
            </div>
            <div className="font-['Cormorant_Garamond'] text-[36px] font-bold text-[#1C1814]">100</div>
            <div className="font-['Noto_Sans'] text-[11px] text-[#918977]">couches documentées</div>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="font-['Cormorant_Garamond'] text-[20px] font-bold italic text-[#1C1814] mb-4">Modules</h2>
          <div className="space-y-3">
            {trails.map(t => (
              <div key={t.name} className="bg-[#FDFAF3] border border-[rgba(60,52,40,0.10)] rounded-lg p-4 flex items-center justify-between">
                <div>
                  <div className="font-['Noto_Sans'] text-[13px] text-[#1C1814] font-medium">{t.name}</div>
                  <div className="font-['JetBrains_Mono'] text-[9px] text-[#918977] uppercase tracking-wider mt-1">{t.status}</div>
                </div>
                <span className="font-['JetBrains_Mono'] text-[11px] text-[#918977]">{t.entries}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex gap-3">
          <a href="/burhan" className="inline-flex items-center gap-2 px-4 py-2 bg-[#1C1814] text-[#D4B662] rounded font-['JetBrains_Mono'] text-[10px] hover:bg-[#252019]">
            Viewer 100 couches <ArrowRight size={12} />
          </a>
        </div>
      </div>
    </div>
  );
}
