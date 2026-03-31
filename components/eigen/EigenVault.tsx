'use client';

import { ExternalLink } from 'lucide-react';

export function EigenVault() {
  return (
    <div className="w-full h-full flex flex-col bg-[#FDFAF3]">
      <div className="flex items-center justify-between px-6 py-2 border-b border-[rgba(60,52,40,0.10)]">
        <span className="font-[family-name:var(--font-jetbrains)] text-[9px] text-[#918977] tracking-wider">
          111 COMPOSANTS &middot; EIGEN CARTIER WORKSPACE
        </span>
        <div className="flex items-center gap-4">
          <a
            href="https://component-vault-ashy.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="font-[family-name:var(--font-jetbrains)] text-[8px] text-[#918977] hover:text-[#B8963E] flex items-center gap-1"
          >
            Ouvrir dans un nouvel onglet <ExternalLink size={10} />
          </a>
          <a
            href="/vault"
            className="font-[family-name:var(--font-jetbrains)] text-[8px] text-[#7B5EA7] hover:underline"
          >
            Page complète &rarr;
          </a>
        </div>
      </div>
      <iframe
        src="https://component-vault-ashy.vercel.app/vault"
        className="flex-1 w-full border-0"
        allow="clipboard-write"
        title="Component Vault — Eigen Cartier"
      />
    </div>
  );
}
