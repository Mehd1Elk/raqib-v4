// MYNε Design System — Dark sovereign palette
// Integrates with RAQIB shell via C import from acquisition constants

export const M = {
  bg: '#FDFAF3',
  bgCard: '#FFFFFF',
  bgPanel: '#F5F2EB',
  border: '#D8D4CC',
  gold: '#6B4FA0',
  purple: '#7c3aed',
  green: '#16a34a',
  cyan: '#0891b2',
  red: '#dc2626',
  blue: '#2563eb',
  rose: '#e11d48',
  amber: '#d97706',
  t1: '#1C1917',
  t2: '#57534E',
  t3: '#A8A29E',
} as const;

// Dark sidebar palette (used only in MYNEShell)
export const S = {
  bg: '#09090b',
  border: '#1a1a2e',
  accent: '#a78bfa',
  text: '#f8fafc',
  muted: '#64748b',
} as const;

export const HD = "'Playfair Display', Georgia, serif";
export const BD = "'Outfit', system-ui, sans-serif";
export const MN = "'Space Mono', monospace";

export const MYNE_FONTS = { head: HD, body: BD, mono: MN } as const;

export const PRODUCER_REVENUE_SHARE = 0.53;
export const REVENUE_DISTRIBUTION = { producer: 0.53, platform: 0.11, ecosystem: 0.36 } as const;
