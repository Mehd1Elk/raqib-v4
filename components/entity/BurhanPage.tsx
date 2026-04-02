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
    <div className="min-h-screen bg-[#F5F2F8] p-8">
      <div className="max-w-6xl mx-auto">
        <div className="font-['JetBrains_Mono'] text-[8px] text-[rgba(30,10,32,0.60)] tracking-[3px] mb-2">SUBSIDIAIRE EIGEN · AUDIT TRAIL</div>
        <h1 className="font-['Playfair_Display'] text-[42px] font-bold italic text-[#1E0A20] flex items-center gap-4">
          <FileCheck size={32} strokeWidth={1} className="text-[#1E0A20]" />
          BURHAN
        </h1>
        <p className="font-['Noto_Sans'] text-[14px] text-[rgba(30,10,32,0.60)] mt-2 max-w-2xl">
          Preuve et traçabilité — audit trail blockchain, notarisation de documents, versioning immuable et conformité réglementaire.
        </p>

        <div className="grid grid-cols-3 gap-4 mt-8">
          <div className="bg-[#FAF8FC] border border-[rgba(30,10,32,0.08)] rounded-none-none p-5">
            <div className="flex items-center gap-2 mb-3">
              <ScrollText size={14} className="text-[#1E0A20]" />
              <span className="font-['JetBrains_Mono'] text-[9px] text-[rgba(30,10,32,0.60)] tracking-wider">ENTRÉES</span>
            </div>
            <div className="font-['Playfair_Display'] text-[36px] font-bold text-[#1E0A20]">23.7K</div>
            <div className="font-['Noto_Sans'] text-[11px] text-[rgba(30,10,32,0.60)]">audit entries</div>
          </div>
          <div className="bg-[#FAF8FC] border border-[rgba(30,10,32,0.08)] rounded-none-none p-5">
            <div className="flex items-center gap-2 mb-3">
              <Lock size={14} className="text-[#1E0A20]" />
              <span className="font-['JetBrains_Mono'] text-[9px] text-[rgba(30,10,32,0.60)] tracking-wider">INTÉGRITÉ</span>
            </div>
            <div className="font-['Playfair_Display'] text-[36px] font-bold text-[#1E0A20]">100%</div>
            <div className="font-['Noto_Sans'] text-[11px] text-[rgba(30,10,32,0.60)]">hash chain valide</div>
          </div>
          <div className="bg-[#FAF8FC] border border-[rgba(30,10,32,0.08)] rounded-none-none p-5">
            <div className="flex items-center gap-2 mb-3">
              <FileCheck size={14} className="text-[#1E0A20]" />
              <span className="font-['JetBrains_Mono'] text-[9px] text-[rgba(30,10,32,0.60)] tracking-wider">COUCHES</span>
            </div>
            <div className="font-['Playfair_Display'] text-[36px] font-bold text-[#1E0A20]">100</div>
            <div className="font-['Noto_Sans'] text-[11px] text-[rgba(30,10,32,0.60)]">couches documentées</div>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="font-['Playfair_Display'] text-[20px] font-bold italic text-[#1E0A20] mb-4">Modules</h2>
          <div className="space-y-3">
            {trails.map(t => (
              <div key={t.name} className="bg-[#FAF8FC] border border-[rgba(30,10,32,0.08)] rounded-none-none p-4 flex items-center justify-between">
                <div>
                  <div className="font-['Noto_Sans'] text-[13px] text-[#1E0A20] font-medium">{t.name}</div>
                  <div className="font-['JetBrains_Mono'] text-[9px] text-[rgba(30,10,32,0.60)] uppercase tracking-wider mt-1">{t.status}</div>
                </div>
                <span className="font-['JetBrains_Mono'] text-[11px] text-[rgba(30,10,32,0.60)]">{t.entries}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex gap-3">
          <a href="/burhan" className="inline-flex items-center gap-2 px-4 py-2 bg-[#1E0A20] text-[#1E0A20] rounded-none font-['JetBrains_Mono'] text-[10px] hover:bg-[#252019]">
            Viewer 100 couches <ArrowRight size={12} />
          </a>
        </div>
      </div>
    </div>
  );
}
