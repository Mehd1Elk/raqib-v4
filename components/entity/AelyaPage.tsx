'use client';

import { Shield, ArrowRight, Activity, Users } from 'lucide-react';

export default function AelyaPage() {
  const modules = [
    { name: 'Consentement dynamique', status: 'production', progress: 92 },
    { name: 'Audit trail RGPD', status: 'beta', progress: 78 },
    { name: 'Interface patient', status: 'alpha', progress: 55 },
    { name: 'API partenaires', status: 'design', progress: 30 },
  ];

  return (
    <div className="min-h-screen bg-[#F5F2F8] p-8">
      <div className="max-w-6xl mx-auto">
        <div className="font-['JetBrains_Mono'] text-[8px] text-[rgba(30,10,32,0.60)] tracking-[3px] mb-2">SUBSIDIAIRE EIGEN · CONSENTEMENT</div>
        <h1 className="font-['Playfair_Display'] text-[42px] font-bold italic text-[#1E0A20] flex items-center gap-4">
          <Shield size={32} strokeWidth={1} className="text-[#1E0A20]" />
          AELYA
        </h1>
        <p className="font-['Noto_Sans'] text-[14px] text-[rgba(30,10,32,0.60)] mt-2 max-w-2xl">
          Plateforme de consentement éclairé — gestion dynamique des autorisations patients, traçabilité RGPD, et interfaces de recueil adaptatives.
        </p>

        <div className="grid grid-cols-3 gap-4 mt-8">
          <div className="bg-[#FAF8FC] border border-[rgba(30,10,32,0.08)] rounded-none-none p-5">
            <div className="flex items-center gap-2 mb-3">
              <Activity size={14} className="text-[#1E0A20]" />
              <span className="font-['JetBrains_Mono'] text-[9px] text-[rgba(30,10,32,0.60)] tracking-wider">COUCHES</span>
            </div>
            <div className="font-['Playfair_Display'] text-[36px] font-bold text-[#1E0A20]">100</div>
            <div className="font-['Noto_Sans'] text-[11px] text-[rgba(30,10,32,0.60)]">couches documentées</div>
          </div>
          <div className="bg-[#FAF8FC] border border-[rgba(30,10,32,0.08)] rounded-none-none p-5">
            <div className="flex items-center gap-2 mb-3">
              <Users size={14} className="text-[#1E0A20]" />
              <span className="font-['JetBrains_Mono'] text-[9px] text-[rgba(30,10,32,0.60)] tracking-wider">AGENTS</span>
            </div>
            <div className="font-['Playfair_Display'] text-[36px] font-bold text-[#1E0A20]">23</div>
            <div className="font-['Noto_Sans'] text-[11px] text-[rgba(30,10,32,0.60)]">agents assignés</div>
          </div>
          <div className="bg-[#FAF8FC] border border-[rgba(30,10,32,0.08)] rounded-none-none p-5">
            <div className="flex items-center gap-2 mb-3">
              <Shield size={14} className="text-[#1E0A20]" />
              <span className="font-['JetBrains_Mono'] text-[9px] text-[rgba(30,10,32,0.60)] tracking-wider">CONFORMITÉ</span>
            </div>
            <div className="font-['Playfair_Display'] text-[36px] font-bold text-[#1E0A20]">94%</div>
            <div className="font-['Noto_Sans'] text-[11px] text-[rgba(30,10,32,0.60)]">score RGPD</div>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="font-['Playfair_Display'] text-[20px] font-bold italic text-[#1E0A20] mb-4">Modules</h2>
          <div className="space-y-3">
            {modules.map(m => (
              <div key={m.name} className="bg-[#FAF8FC] border border-[rgba(30,10,32,0.08)] rounded-none-none p-4 flex items-center justify-between">
                <div>
                  <div className="font-['Noto_Sans'] text-[13px] text-[#1E0A20] font-medium">{m.name}</div>
                  <div className="font-['JetBrains_Mono'] text-[9px] text-[rgba(30,10,32,0.60)] uppercase tracking-wider mt-1">{m.status}</div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-32 h-1.5 bg-[#F2EFE8] rounded-none-full overflow-hidden">
                    <div className="h-full bg-[#1E0A20] rounded-none-full" style={{ width: `${m.progress}%` }} />
                  </div>
                  <span className="font-['JetBrains_Mono'] text-[10px] text-[rgba(30,10,32,0.60)]">{m.progress}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex gap-3">
          <a href="/aelya" className="inline-flex items-center gap-2 px-4 py-2 bg-[#1E0A20] text-[#1E0A20] rounded-none font-['JetBrains_Mono'] text-[10px] hover:bg-[#252019]">
            Viewer 100 couches <ArrowRight size={12} />
          </a>
        </div>
      </div>
    </div>
  );
}
