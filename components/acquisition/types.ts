// ── Acquisition Pipeline Types ──────────────────────────

export type AcquisitionStage =
  | 'identified'
  | 'contacted'
  | 'meeting_done'
  | 'proposal_sent'
  | 'negotiation'
  | 'signed'
  | 'churned';

export const STAGE_ORDER: AcquisitionStage[] = [
  'identified',
  'contacted',
  'meeting_done',
  'proposal_sent',
  'negotiation',
  'signed',
  'churned',
];

export const STAGE_LABELS: Record<AcquisitionStage, string> = {
  identified: 'Identifié',
  contacted: 'Contacté',
  meeting_done: 'RDV fait',
  proposal_sent: 'Offre envoyée',
  negotiation: 'Négociation',
  signed: 'Signé',
  churned: 'Churned',
};

export const STAGE_COLORS: Record<AcquisitionStage, string> = {
  identified: '#918977',
  contacted: '#3D5E8C',
  meeting_done: '#7B5EA7',
  proposal_sent: '#B87D3E',
  negotiation: '#B8963E',
  signed: '#3D7C5E',
  churned: '#9C3D3D',
};

export type Priority = 'P0' | 'P1' | 'P2' | 'P3';

export const PRIORITY_COLORS: Record<Priority, string> = {
  P0: '#9C3D3D',
  P1: '#B87D3E',
  P2: '#B8963E',
  P3: '#918977',
};

export type Tier = 0 | 1 | 2 | 3;

export const TIER_REVENUE: Record<Tier, { abo: number; b2b2c: number; total: number; label: string }> = {
  0: { abo: 150_000, b2b2c: 1_950_000, total: 2_100_000, label: 'Abo €150K + B2B2C 13× = €1.95M' },
  1: { abo: 30_000, b2b2c: 150_000, total: 180_000, label: 'Abo €30K + B2B2C 5× = €150K' },
  2: { abo: 5_000, b2b2c: 15_000, total: 20_000, label: 'Abo €5K + B2B2C 3× = €15K' },
  3: { abo: 0, b2b2c: 1_000, total: 1_000, label: 'SDK free + tx = €1K' },
};

export interface AcquisitionCompany {
  id: string;
  name: string;
  sector: string;
  country: string;
  stage: AcquisitionStage;
  priority: Priority;
  tier: Tier;
  score: number;
  briques: string[];
  personas: string[];
  revenue_estimate: number;
  contact_name?: string;
  contact_email?: string;
  notes?: string;
  region: 'EU' | 'Corridor';
  created_at: string;
  updated_at: string;
}

export interface DashboardData {
  total_companies: number;
  p0_count: number;
  pipeline_active: number;
  signed_count: number;
  revenue_estimate_total: number;
  personas_covered: number;
  stages: { stage: AcquisitionStage; count: number; pct: number }[];
  brique_sector_matrix: { brique: string; sectors: Record<string, number> }[];
  top_10: AcquisitionCompany[];
}

export interface ProjectionData {
  by_tier: { tier: Tier; count: number; revenue: number }[];
  by_brique: { brique: string; count: number; revenue: number }[];
  yearly: { year: string; signed_pct: number; revenue: number }[];
  eu_total: number;
  corridor_total: number;
}

// ── Briques ──────────────────────────
export const BRIQUES = ['NOOS', 'ÆLYA', 'MYNε', 'BURHAN', 'YrKnown', 'MIZAN', 'RAQIB'] as const;
export type Brique = (typeof BRIQUES)[number];

export const BRIQUE_COLORS: Record<Brique, string> = {
  NOOS: '#3D5E8C',
  'ÆLYA': '#7B5EA7',
  'MYNε': '#3D7C5E',
  BURHAN: '#B87D3E',
  YrKnown: '#B8963E',
  MIZAN: '#6E2A3D',
  RAQIB: '#9C3D3D',
};

// ── Personas ──────────────────────────
export const PERSONAS = ['DRH', 'DSI', 'DPO', 'COO', 'CEO', 'CFO'] as const;
export type Persona = (typeof PERSONAS)[number];

export const PERSONA_LABELS: Record<Persona, string> = {
  DRH: 'DRH — Ressources Humaines',
  DSI: 'DSI — Systèmes d\'Information',
  DPO: 'DPO — Protection des Données',
  COO: 'COO — Opérations',
  CEO: 'CEO — Direction Générale',
  CFO: 'CFO — Direction Financière',
};

export const PERSONA_COLORS: Record<Persona, string> = {
  DRH: '#3D5E8C',
  DSI: '#7B5EA7',
  DPO: '#3D7C5E',
  COO: '#B87D3E',
  CEO: '#B8963E',
  CFO: '#6E2A3D',
};

// ── Contacts ──────────────────────────
export interface AcquisitionContact {
  id: string;
  company_id: string;
  company_name: string;
  name: string;
  role: string;
  persona: Persona;
  email?: string;
  linkedin?: string;
  phone?: string;
  priority: Priority;
  last_action?: string;
  last_action_date?: string;
  next_action?: string;
  next_action_date?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

// ── Sectors ──────────────────────────
export const SECTORS = [
  'Banque', 'Assurance', 'Energie', 'Pharma', 'Industrie', 'Retail',
  'Telecom', 'Transport', 'Immobilier', 'Construction', 'Agroalimentaire',
  'Luxe', 'Automobile', 'Défense', 'Médias', 'Santé', 'Tech',
  'Mining', 'Tourisme', 'Education', 'Services', 'Chimie',
] as const;

// ── Playbook ──────────────────────────
export interface PlaybookObjection {
  objection: string;
  reponse: string;
}

export interface PlaybookPersona {
  persona: Persona;
  hook: string;
  script_approche: string;
  objections: PlaybookObjection[];
  template_email: string;
  produits: string[];
  prix: string;
  cac: string;
  ltv: string;
}

// ── Regulations ──────────────────────────
export interface Regulation {
  id: string;
  name: string;
  description: string;
  deadline: string;
  penalty: string;
  sectors: string[];
  countries: string[];
  briques_activated: Brique[];
}

// ── Events ──────────────────────────
export type EventName = 'GITEX' | 'ATS' | 'VivaTech';

export interface EventTarget {
  company_id: string;
  company_name: string;
  contact: string;
  approche: string;
  priority: Priority;
}

export interface AcquisitionEvent {
  id: string;
  name: EventName;
  date: string;
  location: string;
  description: string;
  targets: EventTarget[];
}
