// Design System — PRUNE / NACRE (bicolore luxe)
import type { CSSProperties } from 'react';

export const C = {
  // Surfaces
  nacre: "#FAF8FC",
  nacre2: "#F5F2F8",
  nacre3: "#EEEBF4",
  nacreDark: "#E4E0EE",

  // Sidebar & headers
  prune: "#1E0A20",
  prune2: "#2A1230",
  prune3: "#361A40",
  pruneLight: "#4A2858",

  // Texte
  t1: "#1E0A20",
  t2: "rgba(30,10,32,0.60)",
  t3: "rgba(30,10,32,0.35)",
  t4: "rgba(30,10,32,0.18)",

  // Texte sidebar
  st1: "#FFFFFF",
  st2: "#E4D4EA",
  st3: "rgba(228,212,234,0.55)",
  st4: "rgba(228,212,234,0.30)",

  // Accent
  accent: "#1E0A20",
  accentSoft: "rgba(30,10,32,0.08)",

  // Séparateurs
  div: "rgba(30,10,32,0.08)",
  divL: "rgba(30,10,32,0.04)",
  divSb: "rgba(228,212,234,0.15)",

  // Briques (seules couleurs vives)
  noos: "#5A6E9C",
  aelya: "#5A8A6E",
  myne: "#8B5EB0",
  burhan: "#A87D3E",
  yrknown: "#A0785A",
  raqib: "#5A8A90",
  mizan: "#904A68",

  // Status
  ruby: "#8C3040",
  emerald: "#3A7A5A",
  sapphire: "#3A5A8C",

  // Personas
  drh: "#8C3040",
  dpo: "#5A8A90",
  cto: "#5A6E9C",
  rse: "#3A7A5A",
  achats: "#A87D3E",
  cfo: "#904A68",
} as const;

// Typography
export const GR = '"Playfair Display", "Didot", Georgia, serif';
export const SN = '"Geist", "Helvetica Neue", Helvetica, sans-serif';
export const MN = '"JetBrains Mono", monospace';

export const FONTS = { title: GR, body: SN, mono: MN } as const;

export const thS: CSSProperties = {
  padding: "10px 12px", fontSize: 9, fontFamily: MN,
  letterSpacing: 3, textTransform: "uppercase", fontWeight: 600,
  position: "sticky", top: 0, background: C.nacre3, color: C.t3,
  borderBottom: `0.5px solid ${C.div}`, whiteSpace: "nowrap",
};

export const tdS: CSSProperties = {
  padding: "10px 12px", fontSize: 14, fontFamily: SN, fontWeight: 400,
  borderBottom: `0.5px solid ${C.divL}`, color: C.t1,
};

export const wrap: CSSProperties = { padding: "24px 32px" };

export const BRICKS = [
  { id: "noos", key: "N", n: "NOOS", c: C.noos, icon: "◎" },
  { id: "aelya", key: "A", n: "ÆLYA", c: C.aelya, icon: "◈" },
  { id: "myne", key: "M", n: "MYNε", c: C.myne, icon: "◇" },
  { id: "burhan", key: "B", n: "BURHAN", c: C.burhan, icon: "◆" },
  { id: "yrknown", key: "Y", n: "YrKnown", c: C.yrknown, icon: "◉" },
  { id: "raqib", key: "R", n: "RAQIB", c: C.raqib, icon: "◊" },
  { id: "mizan", key: "Z", n: "MIZAN", c: C.mizan, icon: "⊕" },
] as const;

export const PERSONAS = [
  { id: "drh" as const, n: "DRH", full: "VP People / CHRO", c: C.drh, buys: ["noos", "yrknown"] },
  { id: "dpo" as const, n: "DPO", full: "Data Protection Officer", c: C.dpo, buys: ["aelya"] },
  { id: "cto" as const, n: "CTO", full: "VP Engineering", c: C.cto, buys: ["burhan", "aelya", "myne"] },
  { id: "rse" as const, n: "RSE", full: "CSR / ESG Director", c: C.rse, buys: ["noos", "burhan"] },
  { id: "achats" as const, n: "Achats", full: "CPO / Supply Chain", c: C.achats, buys: ["burhan", "mizan", "raqib"] },
  { id: "cfo" as const, n: "CFO", full: "Directeur Financier", c: C.cfo, buys: ["mizan", "raqib"] },
] as const;

export const SECTORS: Record<string, string> = {
  TEL: "Télécom", BNK: "Banque", INS: "Assurance", ENR: "Énergie",
  PHR: "Pharma/Santé", BTP: "BTP/Infra", TEC: "Tech/IT", LOG: "Logistique",
  CNS: "Conseil/Audit", LUX: "Luxe/Retail", MIN: "Mines", DFI: "DFI/Institution",
  AUT: "Automobile", DEF: "Défense", MED: "Médias", EDU: "Éducation",
  IMM: "Immobilier", AGR: "Agriculture", FMC: "FMCG/Agro", CHM: "Chimie",
  IND: "Industrie", AVA: "Aviation",
};

export const STAGES = [
  "identified", "qualified", "approached", "demo", "negotiation", "signed", "churned",
] as const;

export const STAGE_LABELS: Record<string, string> = {
  identified: "Identifié", qualified: "Qualifié", approached: "Approché",
  demo: "Démo", negotiation: "Négociation", signed: "Signé", churned: "Perdu",
};
