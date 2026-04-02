// Design System — PRUNE / NACRE (Science module)
import type { CSSProperties } from 'react';

export const C = {
  nacre: "#FAF8FC", nacre2: "#F5F2F8", nacre3: "#EEEBF4", nacreDark: "#E4E0EE",
  prune: "#1E0A20", prune2: "#2A1230", prune3: "#361A40", pruneLight: "#4A2858",
  t1: "#1E0A20", t2: "rgba(30,10,32,0.60)", t3: "rgba(30,10,32,0.35)", t4: "rgba(30,10,32,0.18)",
  st1: "#FFFFFF", st2: "#E4D4EA", st3: "rgba(228,212,234,0.55)", st4: "rgba(228,212,234,0.30)",
  accent: "#1E0A20", accentSoft: "rgba(30,10,32,0.08)",
  div: "rgba(30,10,32,0.08)", divL: "rgba(30,10,32,0.04)", divSb: "rgba(228,212,234,0.15)",
  noos: "#5A6E9C", aelya: "#5A8A6E", myne: "#8B5EB0", burhan: "#A87D3E",
  yrknown: "#A0785A", raqib: "#5A8A90", mizan: "#904A68",
  quantum: "#6366F1",
  ruby: "#8C3040", emerald: "#3A7A5A", sapphire: "#3A5A8C",
  // Legacy aliases
  ivory: "#FAF8FC", cream: "#F5F2F8", parchment: "#EEEBF4", linen: "#E4E0EE",
  sand: "rgba(30,10,32,0.35)", taupe: "rgba(30,10,32,0.35)", stone: "rgba(30,10,32,0.60)",
  walnut: "rgba(30,10,32,0.60)", espresso: "#1E0A20", noir: "#1E0A20",
  gold: "#1E0A20", goldL: "#1E0A20", goldD: "#1E0A20", tm: "rgba(30,10,32,0.18)",
} as const;

export const GR = '"Playfair Display", "Didot", Georgia, serif';
export const SN = '"Geist", "Helvetica Neue", Helvetica, sans-serif';
export const MN = '"JetBrains Mono", monospace';
export const FONTS = { title: GR, body: SN, mono: MN } as const;

export const thS: CSSProperties = {
  padding: "10px 12px", fontSize: 9, fontFamily: MN, letterSpacing: 3, textTransform: "uppercase", fontWeight: 600,
  position: "sticky", top: 0, background: C.nacre3, color: C.t3, borderBottom: `0.5px solid ${C.div}`, whiteSpace: "nowrap",
};
export const tdS: CSSProperties = {
  padding: "10px 12px", fontSize: 14, fontFamily: SN, fontWeight: 400, borderBottom: `0.5px solid ${C.divL}`, color: C.t1,
};
export const wrap: CSSProperties = { padding: "24px 32px" };

export type BriqueId = 'noos' | 'aelya' | 'myne' | 'burhan' | 'yrknown' | 'raqib' | 'mizan';
export type DomainId = '1' | '2' | '3' | '4' | '5' | '6' | '7';

export const DOMAINS = [
  { id: '1' as DomainId, name: 'Psychiatrie Computationnelle', brique: 'noos' as BriqueId, short: 'NOOS', color: C.noos, icon: '◎' },
  { id: '2' as DomainId, name: 'Privacy Engineering', brique: 'aelya' as BriqueId, short: 'ÆLYA', color: C.aelya, icon: '◈' },
  { id: '3' as DomainId, name: 'Data Economics', brique: 'myne' as BriqueId, short: 'MYNε', color: C.myne, icon: '◇' },
  { id: '4' as DomainId, name: 'Blockchain & Cryptographie', brique: 'burhan' as BriqueId, short: 'BURHAN', color: C.burhan, icon: '◆' },
  { id: '5' as DomainId, name: 'Knowledge Engineering', brique: 'yrknown' as BriqueId, short: 'YrKnown', color: C.yrknown, icon: '◉' },
  { id: '6' as DomainId, name: 'Multi-Agent & Intelligence', brique: 'raqib' as BriqueId, short: 'RAQIB', color: C.raqib, icon: '◊' },
  { id: '7' as DomainId, name: 'Finance Computationnelle', brique: 'mizan' as BriqueId, short: 'MIZAN', color: C.mizan, icon: '⊕' },
] as const;

export const BRIQUE_COLOR: Record<string, string> = {
  noos: C.noos, aelya: C.aelya, myne: C.myne, burhan: C.burhan,
  yrknown: C.yrknown, raqib: C.raqib, mizan: C.mizan, quantum: C.quantum,
};
export const IMPACT_COLORS: Record<string, string> = { low: C.t3, medium: C.yrknown, high: C.noos, paradigm_shift: C.accent };
export const THREAT_COLORS: Record<string, string> = { none: C.t3, watch: C.yrknown, competitor: C.noos, block: C.ruby };
export const STATUS_LABELS: Record<string, string> = { to_read: 'À lire', reading: 'En lecture', read: 'Lu', applied: 'Appliqué', dismissed: 'Écarté' };
export const COLLAB_LABELS: Record<string, string> = { none: 'Aucun', low: 'Faible', medium: 'Moyen', high: 'Élevé', active: 'Actif' };
