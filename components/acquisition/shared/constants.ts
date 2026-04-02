// Design System — RAQIB_Unified (exact match)

export const C = {
  ivory: "#FDFAF3", cream: "#F7F3EA", parchment: "#F0EBDE", linen: "#E8E2D2",
  sand: "#D4CCBA", taupe: "#B8AE9C", stone: "#918977", walnut: "#6B5E4C",
  espresso: "#3D3428", noir: "#1C1814",
  gold: "#B8963E", goldL: "#D4B662", goldD: "#8C6E2A",
  noos: "#3D5E8C", aelya: "#3D7C5E", myne: "#7B5EA7", burhan: "#B8963E",
  yrknown: "#B87D3E", raqib: "#3D7C8C", mizan: "#9C3D5E",
  ruby: "#9C3D3D", emerald: "#3D7C5E", sapphire: "#3D5E8C",
  div: "rgba(60,52,40,0.10)", divL: "rgba(60,52,40,0.04)",
  t1: "#2A2318", t2: "#6B5E4C", t3: "#918977", tm: "#B8AE9C",
} as const;

export const FONTS = {
  title: '"Cormorant Garamond", Georgia, serif',
  body: '"Noto Sans", system-ui, sans-serif',
  mono: '"JetBrains Mono", monospace',
} as const;

export const thS: React.CSSProperties = {
  padding: "8px 12px",
  fontSize: 8,
  fontFamily: FONTS.mono,
  letterSpacing: 1.5,
  textTransform: "uppercase",
  position: "sticky",
  top: 0,
  background: C.cream,
  color: C.t3,
  borderBottom: `1px solid ${C.div}`,
};

export const tdS: React.CSSProperties = {
  padding: "8px 12px",
  fontSize: 11,
  fontFamily: FONTS.body,
  borderBottom: `1px solid ${C.divL}`,
  color: C.t1,
};

export const BRIQUES = [
  { key: "N", name: "NOOS", color: C.noos },
  { key: "A", name: "ÆLYA", color: C.aelya },
  { key: "M", name: "MYNε", color: C.myne },
  { key: "B", name: "BURHAN", color: C.burhan },
  { key: "Y", name: "YrKnown", color: C.yrknown },
  { key: "R", name: "RAQIB", color: C.raqib },
  { key: "Z", name: "MIZAN", color: C.mizan },
] as const;

export const PERSONAS = {
  drh: { label: "DRH", color: "#C94040" },
  dpo: { label: "DPO", color: "#3D7A7A" },
  cto: { label: "CTO", color: "#5A5ABE" },
  rse: { label: "RSE", color: "#5A8E52" },
  achats: { label: "Achats", color: "#B8860B" },
  cfo: { label: "CFO", color: "#7A4A7A" },
} as const;
