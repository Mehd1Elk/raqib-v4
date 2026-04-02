'use client';

import { useState, useRef, useEffect } from 'react';

export function GlobalNav() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="font-[family-name:var(--font-jetbrains)] text-[9px] text-tm border border-div rounded-none px-3 py-1 hover:border-gold hover:text-gold transition"
      >
        MENU ▾
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1 w-[280px] bg-ivory border border-div rounded-none-none shadow-lg z-50 py-2">
          <div className="px-3 py-1 font-[family-name:var(--font-jetbrains)] text-[8px] text-t3 tracking-[2px]">COCKPIT</div>
          <a href="/nexus" className="block px-3 py-2 hover:bg-[rgba(30,10,32,0.04)] font-[family-name:var(--font-cormorant)] text-[13px]  font-bold text-[#1E0A20]">Nexus &mdash; Carte ecosysteme</a>
          <a href="/eigen" className="block px-3 py-2 hover:bg-[rgba(30,10,32,0.04)] font-[family-name:var(--font-cormorant)] text-[13px]  font-bold text-noir">EIGEN Strategique</a>
          <a href="/eigen?tab=agents" className="block px-3 py-1.5 hover:bg-[rgba(30,10,32,0.04)] font-[family-name:var(--font-noto)] text-[11px] text-walnut pl-6">255 Agents</a>
          <a href="/eigen?tab=board" className="block px-3 py-1.5 hover:bg-[rgba(30,10,32,0.04)] font-[family-name:var(--font-noto)] text-[11px] text-walnut pl-6">Board Meeting</a>
          <a href="/eigen?tab=gallery" className="block px-3 py-1.5 hover:bg-[rgba(30,10,32,0.04)] font-[family-name:var(--font-noto)] text-[11px] text-walnut pl-6">Galerie 59 docs</a>
          <a href="/eigen?tab=conquest" className="block px-3 py-1.5 hover:bg-[rgba(30,10,32,0.04)] font-[family-name:var(--font-noto)] text-[11px] text-walnut pl-6">Conquête 2026</a>
          <a href="/eigen?tab=decisions" className="block px-3 py-1.5 hover:bg-[rgba(30,10,32,0.04)] font-[family-name:var(--font-noto)] text-[11px] text-walnut pl-6">Décisions</a>
          <a href="/eigen?tab=stream" className="block px-3 py-1.5 hover:bg-[rgba(30,10,32,0.04)] font-[family-name:var(--font-noto)] text-[11px] text-walnut pl-6">Stream</a>
          <a href="/eigen?tab=terminal" className="block px-3 py-1.5 hover:bg-[rgba(30,10,32,0.04)] font-[family-name:var(--font-noto)] text-[11px] text-walnut pl-6">Terminal</a>

          <div className="border-t border-div mt-2 pt-2 px-3 font-[family-name:var(--font-jetbrains)] text-[8px] text-t3 tracking-[2px]">DASHBOARDS</div>
          <a href="/dashboards/investor" className="block px-3 py-1.5 hover:bg-[rgba(30,10,32,0.04)] font-[family-name:var(--font-noto)] text-[11px] text-walnut pl-6">Investisseur (Londres)</a>
          <a href="/dashboards/supervisor" className="block px-3 py-1.5 hover:bg-[rgba(30,10,32,0.04)] font-[family-name:var(--font-noto)] text-[11px] text-walnut pl-6">Superviseur (Agent 0)</a>
          <a href="/dashboards/gitex" className="block px-3 py-1.5 hover:bg-[rgba(30,10,32,0.04)] font-[family-name:var(--font-noto)] text-[11px] text-walnut pl-6">GITEX (7 avril)</a>
          <a href="/dashboards/london" className="block px-3 py-1.5 hover:bg-[rgba(30,10,32,0.04)] font-[family-name:var(--font-noto)] text-[11px] text-walnut pl-6">London (ATS mai)</a>

          <div className="border-t border-div mt-2 pt-2 px-3 font-[family-name:var(--font-jetbrains)] text-[8px] text-t3 tracking-[2px]">INTELLIGENCE</div>
          <a href="/corridor" className="block px-3 py-2 hover:bg-[rgba(30,10,32,0.04)] font-[family-name:var(--font-cormorant)] text-[13px]  font-bold" style={{ color: '#1E0A20' }}>Corridor Intelligence — 49 pays</a>

          <div className="border-t border-div mt-2 pt-2 px-3 font-[family-name:var(--font-jetbrains)] text-[8px] text-t3 tracking-[2px]">OUTILS</div>
          <a href="/data" className="block px-3 py-1.5 hover:bg-[rgba(30,10,32,0.04)] font-[family-name:var(--font-cormorant)] text-[13px]  font-bold text-noir">Data Viewer &mdash; 1100 couches</a>
          <a href="/stats" className="block px-3 py-1.5 hover:bg-[rgba(30,10,32,0.04)] font-[family-name:var(--font-noto)] text-[11px] text-walnut pl-6">Stats & Qualité</a>
          <a href="/upload" className="block px-3 py-1.5 hover:bg-[rgba(30,10,32,0.04)] font-[family-name:var(--font-noto)] text-[11px] text-walnut pl-6">Importer datasets</a>
          <a href="/vault" className="block px-3 py-1.5 hover:bg-[rgba(30,10,32,0.04)] font-[family-name:var(--font-noto)] text-[11px] text-walnut pl-6">Vault — 111 composants</a>

          <div className="border-t border-div mt-2 pt-2 px-3 font-[family-name:var(--font-jetbrains)] text-[8px] text-t3 tracking-[2px]">ENTITÉS</div>
          {[
            { label: 'NOOS — Psychiatrie', href: '/entity/noos' },
            { label: 'ÆLYA — Consentement', href: '/entity/aelya' },
            { label: 'MYNε — Marketplace', href: '/entity/myne' },
            { label: 'BURHAN — Audit trail', href: '/entity/burhan' },
            { label: 'YrKnown — Savoir tacite', href: '/entity/yrknown' },
            { label: 'DIWANE', href: '/diwane' },
            { label: 'AlgueSov', href: '/alguesov' },
            { label: 'AMANA', href: '/amana' },
            { label: 'CG SA', href: '/cg' },
            { label: 'Cercle du Gazoduc', href: '/cercle' },
          ].map(e => (
            <a key={e.label} href={e.href} className="block px-3 py-1 hover:bg-[rgba(30,10,32,0.04)] font-[family-name:var(--font-noto)] text-[10px] text-t3 pl-6">{e.label}</a>
          ))}
        </div>
      )}
    </div>
  );
}
