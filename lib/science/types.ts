// Intelligence Scientifique — TypeScript interfaces

export type BriqueId = 'noos' | 'aelya' | 'myne' | 'burhan' | 'yrknown' | 'raqib' | 'mizan';
export type DomainId = '1' | '2' | '3' | '4' | '5' | '6' | '7';
export type PaperStatus = 'to_read' | 'reading' | 'read' | 'applied' | 'dismissed';
export type ThreatLevel = 'none' | 'watch' | 'competitor' | 'block';
export type CollabPotential = 'none' | 'low' | 'medium' | 'high' | 'active';
export type ImpactLevel = 'low' | 'medium' | 'high' | 'paradigm_shift';
export type Priority = 'P0' | 'P1' | 'P2';

export interface SciPaper {
  id: string;
  title: string;
  authors: string[];
  abstract: string;
  journal: string;
  year: number;
  doi: string;
  url: string;
  domain: DomainId;
  subdomain: string;
  brique: BriqueId;
  relevance_score: number;
  impact_factor: number;
  citations: number;
  eigen_application: string;
  status: PaperStatus;
  tags: string[];
  added_by: string;
  created_at: string;
}

export interface SciLab {
  id: string;
  name: string;
  university: string;
  country: string;
  domain: DomainId;
  lead_researcher: string;
  url: string;
  description: string;
  brique: BriqueId;
  collaboration_potential: CollabPotential;
  last_publication: string;
  h_index: number;
  notes: string;
}

export interface SciPatent {
  id: string;
  title: string;
  assignee: string;
  patent_number: string;
  filing_date: string;
  domain: DomainId;
  brique: BriqueId;
  abstract: string;
  relevance: string;
  threat_level: ThreatLevel;
  url: string;
}

export interface SciConference {
  id: string;
  name: string;
  dates: string;
  location: string;
  domain: DomainId;
  brique: BriqueId;
  deadline_submission: string;
  deadline_registration: string;
  key_speakers: string[];
  notes: string;
  priority: Priority;
}

export interface SciBreakthrough {
  id: string;
  title: string;
  date: string;
  domain: DomainId;
  brique: BriqueId;
  source: string;
  summary: string;
  impact: ImpactLevel;
  eigen_implication: string;
  url: string;
}

export interface SciBibliography {
  id: string;
  paper_id: string;
  brique: BriqueId;
  context: string;
  added_at: string;
  paper?: SciPaper;
}

export interface SciDashboardKPIs {
  total_papers: number;
  total_labs: number;
  total_patents: number;
  total_conferences: number;
  total_breakthroughs: number;
  by_domain: Record<DomainId, { papers: number; labs: number; patents: number }>;
  by_status: Record<PaperStatus, number>;
  by_brique: Record<BriqueId, number>;
  recent_breakthroughs: SciBreakthrough[];
}

export const DOMAIN_MAP: Record<DomainId, { name: string; brique: BriqueId; short: string }> = {
  '1': { name: 'Psychiatrie Computationnelle & IA Santé', brique: 'noos', short: 'NOOS' },
  '2': { name: 'Privacy Engineering & Consent Tech', brique: 'aelya', short: 'ÆLYA' },
  '3': { name: 'Data Economics & Sovereign Data Markets', brique: 'myne', short: 'MYNε' },
  '4': { name: 'Blockchain, Cryptographie & Audit Trail', brique: 'burhan', short: 'BURHAN' },
  '5': { name: 'Knowledge Engineering & Cognitive Science', brique: 'yrknown', short: 'YrKnown' },
  '6': { name: 'Multi-Agent Systems & Territorial Intelligence', brique: 'raqib', short: 'RAQIB' },
  '7': { name: 'Computational Finance & Cross-Border Settlement', brique: 'mizan', short: 'MIZAN' },
};
