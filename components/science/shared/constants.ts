// Design System — RAQIB_Unified (exact match from Acquisition module)
import type { CSSProperties } from 'react';

export const C = {
  ivory: "#FDFAF3", cream: "#F7F3EA", parchment: "#F0EBDE", linen: "#E8E2D2",
  sand: "#D4CCBA", taupe: "#B8AE9C", stone: "#918977", walnut: "#6B5E4C",
  espresso: "#3D3428", noir: "#1C1814",
  gold: "#B8963E", goldL: "#D4B662", goldD: "#8C6E2A",
  noos: "#3D5E8C", aelya: "#3D7C5E", myne: "#7B5EA7", burhan: "#B8963E",
  yrknown: "#B87D3E", raqib: "#3D7C8C", mizan: "#9C3D5E",
  quantum: "#6366F1",
  ruby: "#9C3D3D", emerald: "#3D7C5E", sapphire: "#3D5E8C",
  div: "rgba(60,52,40,0.10)", divL: "rgba(60,52,40,0.04)",
  t1: "#2A2318", t2: "#6B5E4C", t3: "#918977", tm: "#B8AE9C",
} as const;

export const GR = '"Cormorant Garamond", Georgia, serif';
export const SN = '"Noto Sans", system-ui, sans-serif';
export const MN = '"JetBrains Mono", monospace';

export const FONTS = { title: GR, body: SN, mono: MN } as const;

export const thS: CSSProperties = {
  padding: "8px 12px", fontSize: 8, fontFamily: MN,
  letterSpacing: 1.5, textTransform: "uppercase",
  position: "sticky", top: 0, background: C.cream, color: C.t3,
  borderBottom: `1px solid ${C.div}`, whiteSpace: "nowrap",
};

export const tdS: CSSProperties = {
  padding: "8px 12px", fontSize: 11, fontFamily: SN,
  borderBottom: `1px solid ${C.divL}`, color: C.t1,
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

export const IMPACT_COLORS: Record<string, string> = {
  low: C.stone, medium: C.yrknown, high: C.noos, paradigm_shift: C.gold,
};

export const THREAT_COLORS: Record<string, string> = {
  none: C.stone, watch: C.yrknown, competitor: C.noos, block: C.ruby,
};

export const STATUS_LABELS: Record<string, string> = {
  to_read: 'À lire', reading: 'En lecture', read: 'Lu', applied: 'Appliqué', dismissed: 'Écarté',
};

export const COLLAB_LABELS: Record<string, string> = {
  none: 'Aucun', low: 'Faible', medium: 'Moyen', high: 'Élevé', active: 'Actif',
};
