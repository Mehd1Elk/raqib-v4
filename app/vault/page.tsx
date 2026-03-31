import { ExternalLink } from 'lucide-react';

export default function VaultPage() {
  return (
    <div className="min-h-screen bg-[#F7F3EA]">
      <div className="flex items-center justify-between px-6 py-3 bg-[#FDFAF3] border-b border-[rgba(60,52,40,0.10)]">
        <div className="flex items-center gap-3">
          <a href="/" className="font-[family-name:var(--font-cormorant)] text-[14px] font-bold italic text-[#918977] hover:text-[#B8963E]">
            Raqib
          </a>
          <span className="text-[#D4CCBA]">&rsaquo;</span>
          <span className="font-[family-name:var(--font-cormorant)] text-[14px] font-bold italic text-[#1C1814]">
            Component Vault
          </span>
          <span className="font-[family-name:var(--font-jetbrains)] text-[8px] text-[#918977] ml-2">
            111 composants &middot; Eigen Cartier
          </span>
        </div>
        <div className="flex items-center gap-4">
          <a href="https://component-vault-ashy.vercel.app" target="_blank" rel="noopener noreferrer" className="font-[family-name:var(--font-jetbrains)] text-[8px] text-[#918977] hover:text-[#B8963E] flex items-center gap-1">
            Ouvrir dans un nouvel onglet <ExternalLink size={10} />
          </a>
          <a href="/eigen?tab=gallery" className="font-[family-name:var(--font-jetbrains)] text-[8px] text-[#B8963E] hover:underline">
            Galerie EIGEN &rarr;
          </a>
        </div>
      </div>

      <iframe
        src="https://component-vault-ashy.vercel.app/embed"
        className="w-full border-0"
        style={{ height: 'calc(100vh - 52px)' }}
        allow="clipboard-write"
        title="Component Vault — Eigen Cartier"
      />
    </div>
  );
}
