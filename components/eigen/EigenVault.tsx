'use client';

import { ExternalLink } from 'lucide-react';

export function EigenVault() {
  return (
    <div className="w-full h-full flex flex-col bg-[#FAF8FC]">
      <div className="flex items-center justify-between px-6 py-2 border-b border-[rgba(30,10,32,0.08)]">
        <span className="font-[family-name:var(--font-jetbrains)] text-[9px] text-[rgba(30,10,32,0.60)] tracking-wider">
          111 COMPOSANTS &middot; EIGEN CARTIER WORKSPACE
        </span>
        <div className="flex items-center gap-4">
          <a
            href="https://component-vault-ashy.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="font-[family-name:var(--font-jetbrains)] text-[8px] text-[rgba(30,10,32,0.60)] hover:text-[#1E0A20] flex items-center gap-1"
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
        src="https://component-vault-ashy.vercel.app/embed"
        className="flex-1 w-full border-0"
        allow="clipboard-write"
        title="Component Vault — Eigen Cartier"
      />
    </div>
  );
}
