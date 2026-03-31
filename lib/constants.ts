import type { Platform, PlatformCode, Entity } from './types';

// ═══════ COLORS ═══════
export const C = {
  ivory: '#FDFAF3',
  cream: '#F7F3EA',
  parchment: '#F0EBDE',
  linen: '#E8E2D2',
  sand: '#D4CCBA',
  taupe: '#B8AE9C',
  stone: '#918977',
  walnut: '#6B5E4C',
  espresso: '#3D3428',
  noir: '#1C1814',
  gold: '#B8963E',
  goldL: '#D4B662',
  goldD: '#8C6E2A',
  ruby: '#9C3D3D',
  emerald: '#3D7C5E',
  sapphire: '#3D5E8C',
  amber: '#B87D3E',
  bordeaux: '#6E2A3D',
  olive: '#5E6E3D',
  violet: '#7B5EA7',
  teal: '#3D7C8C',
  cgGreen: '#162B20',
  cgGold: '#C9A96E',
  div: 'rgba(60,52,40,0.10)',
  divL: 'rgba(60,52,40,0.05)',
  t1: '#2A2318',
  t2: '#6B5E4C',
  t3: '#918977',
  tm: '#B8AE9C',
} as const;

// ═══════ 9 AI PLATFORMS ═══════
export const PLATFORMS: Record<PlatformCode, Platform> = {
  CC: { code: 'CC', name: 'Claude Code', color: '#D97706', description: 'Code complexe, Rust, scraping, APIs, datasets' },
  CW: { code: 'CW', name: 'Cowork', color: '#7C3AED', description: 'Documents, analyses, fiches, rapports' },
  OC: { code: 'OC', name: 'OpenClaw', color: '#059669', description: 'Orchestration, cron, scheduling, notifications' },
  CX: { code: 'CX', name: 'Codex (OpenAI)', color: '#2563EB', description: 'Code parallèle, multi-fichier, CI/CD' },
  PP: { code: 'PP', name: 'Perplexity', color: '#0891B2', description: 'Recherche vérifiée, sources premium' },
  AG: { code: 'AG', name: 'Antigravity (Google)', color: '#DC2626', description: 'Frontend, UX, build-test loop' },
  ML: { code: 'ML', name: 'Mistral (Le Chat)', color: '#F97316', description: 'Vérification FR/EU, NLP français' },
  DS: { code: 'DS', name: 'DeepSeek / Qwen', color: '#6366F1', description: 'Vérification adversariale, open source, local' },
  CA: { code: 'CA', name: 'Claude.ai Projects', color: '#8B5CF6', description: 'Mémoire persistante, contexte agent, cognitif' },
};

// ═══════ 10 ENTITIES ═══════
export const ENTITIES: Entity[] = [
  { id: 'noos', name: 'NOOS', color: C.sapphire, description: 'Algorithmic Psychiatric Assessment Engine', type: 'BRIQUE' },
  { id: 'aelya', name: 'ÆLYA', color: C.emerald, description: 'Consent & Anonymization Agent', type: 'BRIQUE' },
  { id: 'myne', name: 'MYNε', color: C.violet, description: 'Sovereign Data Marketplace', type: 'BRIQUE' },
  { id: 'burhan', name: 'BURHAN', color: C.gold, description: 'Blockchain Audit Trail', type: 'BRIQUE' },
  { id: 'yrknown', name: 'YrKnown', color: C.amber, description: 'Tacit Knowledge Digitization', type: 'BRIQUE' },
  { id: 'diwane', name: 'DIWANE', color: C.bordeaux, description: 'Art Sovereignty & Crédit Lombard', type: 'VENTURE' },
  { id: 'alguesov', name: 'AlgueSov', color: C.teal, description: 'Seaweed Traceability Web 4.0', type: 'VENTURE' },
  { id: 'amana', name: 'AMANA', color: C.olive, description: 'Charitable Trust Infrastructure', type: 'VENTURE' },
  { id: 'cg', name: 'CG SA', color: C.cgGreen, description: 'Corporate Governance & Group Strategy', type: 'HOLDING' },
  { id: 'cercle', name: 'Cercle du Gazoduc', color: C.cgGold, description: 'Ecosystem Orchestration & Sovereign Infrastructure', type: 'ECOSYSTEM' },
];

export const PLATFORM_CODES = Object.keys(PLATFORMS) as PlatformCode[];
