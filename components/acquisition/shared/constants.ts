// Design System — RAQIB_Unified (exact match)
import type { CSSProperties } from 'react';

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
  drh: "#C94040", dpo: "#3D7A7A", cto: "#5A5ABE", rse: "#5A8E52",
  achats: "#B8860B", cfo: "#7A4A7A",
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
