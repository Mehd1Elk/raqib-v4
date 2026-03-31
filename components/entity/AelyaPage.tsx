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
    <div className="min-h-screen bg-[#F7F3EA] p-8">
      <div className="max-w-6xl mx-auto">
        <div className="font-['JetBrains_Mono'] text-[8px] text-[#918977] tracking-[3px] mb-2">SUBSIDIAIRE EIGEN · CONSENTEMENT</div>
        <h1 className="font-['Cormorant_Garamond'] text-[42px] font-bold italic text-[#1C1814] flex items-center gap-4">
          <Shield size={32} strokeWidth={1} className="text-[#B8963E]" />
          AELYA
        </h1>
        <p className="font-['Noto_Sans'] text-[14px] text-[#918977] mt-2 max-w-2xl">
          Plateforme de consentement éclairé — gestion dynamique des autorisations patients, traçabilité RGPD, et interfaces de recueil adaptatives.
        </p>

        <div className="grid grid-cols-3 gap-4 mt-8">
          <div className="bg-[#FDFAF3] border border-[rgba(60,52,40,0.10)] rounded-lg p-5">
            <div className="flex items-center gap-2 mb-3">
              <Activity size={14} className="text-[#B8963E]" />
              <span className="font-['JetBrains_Mono'] text-[9px] text-[#918977] tracking-wider">COUCHES</span>
            </div>
            <div className="font-['Cormorant_Garamond'] text-[36px] font-bold text-[#1C1814]">100</div>
            <div className="font-['Noto_Sans'] text-[11px] text-[#918977]">couches documentées</div>
          </div>
          <div className="bg-[#FDFAF3] border border-[rgba(60,52,40,0.10)] rounded-lg p-5">
            <div className="flex items-center gap-2 mb-3">
              <Users size={14} className="text-[#B8963E]" />
              <span className="font-['JetBrains_Mono'] text-[9px] text-[#918977] tracking-wider">AGENTS</span>
            </div>
            <div className="font-['Cormorant_Garamond'] text-[36px] font-bold text-[#1C1814]">23</div>
            <div className="font-['Noto_Sans'] text-[11px] text-[#918977]">agents assignés</div>
          </div>
          <div className="bg-[#FDFAF3] border border-[rgba(60,52,40,0.10)] rounded-lg p-5">
            <div className="flex items-center gap-2 mb-3">
              <Shield size={14} className="text-[#B8963E]" />
              <span className="font-['JetBrains_Mono'] text-[9px] text-[#918977] tracking-wider">CONFORMITÉ</span>
            </div>
            <div className="font-['Cormorant_Garamond'] text-[36px] font-bold text-[#1C1814]">94%</div>
            <div className="font-['Noto_Sans'] text-[11px] text-[#918977]">score RGPD</div>
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
                <div className="flex items-center gap-3">
                  <div className="w-32 h-1.5 bg-[#F2EFE8] rounded-full overflow-hidden">
                    <div className="h-full bg-[#B8963E] rounded-full" style={{ width: `${m.progress}%` }} />
                  </div>
                  <span className="font-['JetBrains_Mono'] text-[10px] text-[#918977]">{m.progress}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex gap-3">
          <a href="/aelya" className="inline-flex items-center gap-2 px-4 py-2 bg-[#1C1814] text-[#D4B662] rounded font-['JetBrains_Mono'] text-[10px] hover:bg-[#252019]">
            Viewer 100 couches <ArrowRight size={12} />
          </a>
        </div>
      </div>
    </div>
  );
}
