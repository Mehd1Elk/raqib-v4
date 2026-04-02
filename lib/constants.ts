import type { Platform, PlatformCode, Entity } from './types';

// ═══════ COLORS — PRUNE/NACRE ═══════
export const C = {
  // Nacre (light backgrounds)
  ivory:     '#FAF8FC',   // nacre
  cream:     '#F5F2F8',   // nacre2
  parchment: '#EEEBF4',   // nacre3
  linen:     '#E4E0EE',   // nacreDark
  // Legacy warm aliases → prune palette
  sand:      'rgba(30,10,32,0.35)',
  taupe:     'rgba(30,10,32,0.35)',
  stone:     'rgba(30,10,32,0.60)',
  walnut:    'rgba(30,10,32,0.60)',
  espresso:  '#1E0A20',
  noir:      '#1E0A20',
  // Gold → prune (no gold in PRUNE/NACRE)
  gold:      '#1E0A20',
  goldL:     '#1E0A20',
  goldD:     '#1E0A20',
  // Brique accent colors
  ruby:      '#8C3040',
  emerald:   '#5A8A6E',
  sapphire:  '#5A6E9C',
  amber:     '#A87D3E',
  bordeaux:  '#904A68',
  olive:     '#5A8A6E',
  violet:    '#8B5EB0',
  teal:      '#5A8A90',
  cgGreen:   '#1E0A20',
  cgGold:    '#E4D4EA',
  // Dividers
  div:       'rgba(30,10,32,0.08)',
  divL:      'rgba(30,10,32,0.04)',
  // Text hierarchy
  t1:        '#1E0A20',
  t2:        'rgba(30,10,32,0.60)',
  t3:        'rgba(30,10,32,0.35)',
  tm:        'rgba(30,10,32,0.18)',
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
  { id: 'eigen', name: 'EIGEN Stratégique', color: '#4A2858', description: 'Intelligence stratégique · Architecture · Acquisition · Conquête · Gouvernance', type: 'CERVEAU' },
];

export const PLATFORM_CODES = Object.keys(PLATFORMS) as PlatformCode[];
