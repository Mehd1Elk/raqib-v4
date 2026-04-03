// MYNε Design System — Dark sovereign palette
// Integrates with RAQIB shell via C import from acquisition constants

export const M = {
  bg: '#000000',
  bgCard: '#09090b',
  bgPanel: '#0f0f11',
  border: '#1a1a2e',
  gold: '#d4a574',
  purple: '#a78bfa',
  green: '#22c55e',
  cyan: '#06b6d4',
  red: '#ef4444',
  blue: '#3b82f6',
  rose: '#f43f5e',
  amber: '#f97316',
  t1: '#f8fafc',
  t2: '#94a3b8',
  t3: '#64748b',
} as const;

export const HD = "'Playfair Display', Georgia, serif";
export const BD = "'Outfit', system-ui, sans-serif";
export const MN = "'Space Mono', monospace";

export const MYNE_FONTS = { head: HD, body: BD, mono: MN } as const;

export const PRODUCER_REVENUE_SHARE = 0.53;
export const REVENUE_DISTRIBUTION = { producer: 0.53, platform: 0.11, ecosystem: 0.36 } as const;
