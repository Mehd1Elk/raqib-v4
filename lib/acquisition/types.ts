export interface AcqCompany {
  id: string;
  name: string;
  hq: string;
  sector: string;
  revenue_b: number;
  employees_k: number;
  corridor_countries: string[];
  eigen_briques: string;
  eigen_score: number;
  tier: 'Tier 0' | 'Tier 1' | 'Tier 2' | 'Tier 3';
  pipeline_stage: 'identified' | 'qualified' | 'approached' | 'demo' | 'negotiation' | 'signed' | 'churned';
  priority: 'P0' | 'P1' | 'P2';
  website?: string;
  notes?: string;
  trojan_horse?: string;
  annual_value_estimate?: number;
  created_at: string;
  updated_at: string;
  matched_regulations?: AcqRegulation[];
  suggested_personas?: PersonaType[];
  contacts?: AcqContact[];
}

export interface AcqContact {
  id: string;
  company_id: string;
  name: string;
  role: string;
  persona: PersonaType;
  email?: string;
  linkedin?: string;
  phone?: string;
  notes?: string;
  last_contact_date?: string;
  next_action?: string;
  priority: 'P0' | 'P1' | 'P2';
  company?: AcqCompany;
}

export type PersonaType = 'drh' | 'dpo' | 'cto' | 'rse' | 'achats' | 'cfo';

export interface AcqRegulation {
  id: string;
  name: string;
  status: string;
  applies_to_sectors: string[];
  applies_to_min_employees: number;
  eigen_briques: string;
  description: string;
  deadline: string;
  penalty: string;
}

export interface AcqEvent {
  id: string;
  name: string;
  city: string;
  dates: string;
  days: number;
  targets: EventTarget[];
}

export interface EventTarget {
  company_name: string;
  contact_name: string;
  approach: string;
  priority: 'P0' | 'P1' | 'P2';
  zone: string;
  day: string;
}

export interface AcqPlaybook {
  id: string;
  persona: PersonaType;
  hook: string;
  script: string;
  objections: { objection: string; reponse: string }[];
  email_template: string;
  cac: string;
  ltv: string;
}

export interface DashboardKPIs {
  total_companies: number;
  p0_count: number;
  pipeline_active: number;
  signed_count: number;
  total_revenue_estimate: number;
  by_stage: Record<string, number>;
  by_sector: Record<string, number>;
  by_priority: Record<string, number>;
}

export interface SupplyChainTier {
  id: string;
  parent_company_id: string;
  tier: number;
  tier_name: string;
  tier_type: string;
  count_entities: string;
  examples: string | null;
  eigen_briques: string;
  contract: string | null;
  legal_force: string | null;
  eigen_revenue: string | null;
  detail: string | null;
}

export interface SupplyChain {
  company_id: string;
  company_name: string;
  sector: string;
  tiers: SupplyChainTier[];
  total_nodes: string;
  total_revenue: string;
  killer_insight: string;
  prescriptor_effect: string;
}

export interface TrojanHorse {
  id: string;
  company_id: string | null;
  group_name: string;
  market: string;
  sector: string;
  contact_name: string;
  contact_relation: string;
  trojan_name: string;
  trojan_emoji: string | null;
  trojan_color: string;
  trojan_one_liner: string;
  emotional_core: string;
  trojan_mechanism: string;
  free_deliverable: string;
  cascade: CascadeStep[];
  total_value: string;
  why_irresistible: string;
  entry_brique: string;
  created_at: string;
}

export interface CascadeStep {
  step: string;
  brick: string;
  next: string;
}
