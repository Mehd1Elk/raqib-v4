'use client';

import { ShoppingCart, ArrowRight, TrendingUp, Package } from 'lucide-react';

export default function MynePage() {
  const verticals = [
    { name: 'Marketplace B2B', status: 'live', revenue: '€2.4M ARR' },
    { name: 'Procurement SaaS', status: 'beta', revenue: '€180K MRR' },
    { name: 'Supply chain analytics', status: 'alpha', revenue: 'Pre-revenue' },
    { name: 'Vendor scoring AI', status: 'design', revenue: 'Roadmap Q3' },
  ];

  return (
    <div className="min-h-screen bg-[#F7F3EA] p-8">
      <div className="max-w-6xl mx-auto">
        <div className="font-['JetBrains_Mono'] text-[8px] text-[#918977] tracking-[3px] mb-2">SUBSIDIAIRE EIGEN · MARKETPLACE</div>
        <h1 className="font-['Cormorant_Garamond'] text-[42px] font-bold italic text-[#1C1814] flex items-center gap-4">
          <ShoppingCart size={32} strokeWidth={1} className="text-[#B8963E]" />
          MYNe
        </h1>
        <p className="font-['Noto_Sans'] text-[14px] text-[#918977] mt-2 max-w-2xl">
          Marketplace souveraine et outils de procurement — scoring fournisseurs, analytics supply chain, et intégration ERP.
        </p>

        <div className="grid grid-cols-3 gap-4 mt-8">
          <div className="bg-[#FDFAF3] border border-[rgba(60,52,40,0.10)] rounded-lg p-5">
            <div className="flex items-center gap-2 mb-3">
              <Package size={14} className="text-[#B8963E]" />
              <span className="font-['JetBrains_Mono'] text-[9px] text-[#918977] tracking-wider">COUCHES</span>
            </div>
            <div className="font-['Cormorant_Garamond'] text-[36px] font-bold text-[#1C1814]">100</div>
            <div className="font-['Noto_Sans'] text-[11px] text-[#918977]">couches documentées</div>
          </div>
          <div className="bg-[#FDFAF3] border border-[rgba(60,52,40,0.10)] rounded-lg p-5">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp size={14} className="text-[#B8963E]" />
              <span className="font-['JetBrains_Mono'] text-[9px] text-[#918977] tracking-wider">PIPELINE</span>
            </div>
            <div className="font-['Cormorant_Garamond'] text-[36px] font-bold text-[#1C1814]">€2.6M</div>
            <div className="font-['Noto_Sans'] text-[11px] text-[#918977]">ARR combiné</div>
          </div>
          <div className="bg-[#FDFAF3] border border-[rgba(60,52,40,0.10)] rounded-lg p-5">
            <div className="flex items-center gap-2 mb-3">
              <ShoppingCart size={14} className="text-[#B8963E]" />
              <span className="font-['JetBrains_Mono'] text-[9px] text-[#918977] tracking-wider">VENDORS</span>
            </div>
            <div className="font-['Cormorant_Garamond'] text-[36px] font-bold text-[#1C1814]">340</div>
            <div className="font-['Noto_Sans'] text-[11px] text-[#918977]">fournisseurs référencés</div>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="font-['Cormorant_Garamond'] text-[20px] font-bold italic text-[#1C1814] mb-4">Verticales</h2>
          <div className="space-y-3">
            {verticals.map(v => (
              <div key={v.name} className="bg-[#FDFAF3] border border-[rgba(60,52,40,0.10)] rounded-lg p-4 flex items-center justify-between">
                <div>
                  <div className="font-['Noto_Sans'] text-[13px] text-[#1C1814] font-medium">{v.name}</div>
                  <div className="font-['JetBrains_Mono'] text-[9px] text-[#918977] uppercase tracking-wider mt-1">{v.status}</div>
                </div>
                <span className="font-['JetBrains_Mono'] text-[11px] text-[#B8963E]">{v.revenue}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex gap-3">
          <a href="/myne" className="inline-flex items-center gap-2 px-4 py-2 bg-[#1C1814] text-[#D4B662] rounded font-['JetBrains_Mono'] text-[10px] hover:bg-[#252019]">
            Viewer 100 couches <ArrowRight size={12} />
          </a>
        </div>
      </div>
    </div>
  );
}
