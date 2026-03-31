/**
 * Donnees statiques pour les visualisations reseau VIZ-NETWORKS.
 * Sources : cd01-cd10 (architecture), cg51-cg60 (inner circle),
 * n61-n70 / d61-d70 (reseau KOL), cd51-cd55 (firewalls), cd09 (synergies).
 */

import type { EntityType } from '@/lib/types';
import { C, ENTITIES } from '@/lib/constants';

// ═══════ ORGANIGRAMME ═══════

export interface OrgNode {
  id: string;
  label: string;
  type: EntityType;
  color: string;
  parent?: string;
}

/** Eigen Holding → 6 subsidiaires → CG SA → Cercle */
export const ORG_NODES: OrgNode[] = [
  { id: 'eigen', label: 'Eigen Holding SAS', type: 'HOLDING', color: C.noir },
  ...ENTITIES.filter((e) => e.type === 'BRIQUE').map((e) => ({
    id: e.id,
    label: e.name,
    type: e.type,
    color: e.color,
    parent: 'eigen',
  })),
  ...ENTITIES.filter((e) => e.type === 'VENTURE').map((e) => ({
    id: e.id,
    label: e.name,
    type: e.type,
    color: e.color,
    parent: 'eigen',
  })),
  {
    id: 'cg',
    label: 'CG SA',
    type: 'HOLDING',
    color: C.cgGreen,
    parent: 'eigen',
  },
  {
    id: 'cercle',
    label: 'Cercle du Gazoduc',
    type: 'ECOSYSTEM',
    color: C.cgGold,
    parent: 'cg',
  },
];

// ═══════ RESEAU KOL ═══════

export interface KOLNode {
  id: string;
  nom: string;
  titre: string;
  institution: string;
  influence_score: number;
  entite: string;
}

export interface KOLLink {
  source: string;
  target: string;
  canal: string;
}

export const KOL_NODES: KOLNode[] = [
  { id: 'kol-1', nom: 'Dr. A. Benali', titre: 'Psychiatre chef', institution: 'CHU Casablanca', influence_score: 0.92, entite: 'noos' },
  { id: 'kol-2', nom: 'Prof. L. Martin', titre: 'Directeur recherche', institution: 'INSERM', influence_score: 0.88, entite: 'noos' },
  { id: 'kol-3', nom: 'S. El Fassi', titre: 'DPO', institution: 'OCP Group', influence_score: 0.75, entite: 'aelya' },
  { id: 'kol-4', nom: 'J. Dupont', titre: 'Avocat RGPD', institution: 'Cabinet Gide', influence_score: 0.82, entite: 'aelya' },
  { id: 'kol-5', nom: 'R. Tazi', titre: 'CTO', institution: 'CDG Capital', influence_score: 0.79, entite: 'myne' },
  { id: 'kol-6', nom: 'M. Senhaji', titre: 'Galeriste', institution: 'Loft Art Gallery', influence_score: 0.85, entite: 'diwane' },
  { id: 'kol-7', nom: 'A. Kettani', titre: 'Blockchain lead', institution: 'UM6P', influence_score: 0.77, entite: 'burhan' },
  { id: 'kol-8', nom: 'F. Alaoui', titre: 'Expert KM', institution: 'UNESCO Rabat', influence_score: 0.81, entite: 'yrknown' },
  { id: 'kol-9', nom: 'H. Berrada', titre: 'Blue Economy', institution: 'ANDA', influence_score: 0.73, entite: 'alguesov' },
  { id: 'kol-10', nom: 'N. Lahlou', titre: 'Philanthropie', institution: 'Fondation Lahlou', influence_score: 0.70, entite: 'amana' },
];

export const KOL_LINKS: KOLLink[] = [
  { source: 'kol-1', target: 'kol-2', canal: 'co-publication' },
  { source: 'kol-1', target: 'kol-8', canal: 'conference' },
  { source: 'kol-3', target: 'kol-4', canal: 'conseil juridique' },
  { source: 'kol-3', target: 'kol-5', canal: 'partenariat donnees' },
  { source: 'kol-5', target: 'kol-7', canal: 'integration technique' },
  { source: 'kol-6', target: 'kol-8', canal: 'patrimoine culturel' },
  { source: 'kol-7', target: 'kol-9', canal: 'tracabilite blockchain' },
  { source: 'kol-9', target: 'kol-10', canal: 'economie sociale' },
  { source: 'kol-2', target: 'kol-4', canal: 'ethique recherche' },
  { source: 'kol-6', target: 'kol-10', canal: 'mecenat' },
];

// ═══════ INNER CIRCLE CG ═══════

export interface InnerCircleNode {
  id: string;
  nom: string;
  role: string;
  organisation: string;
  connexion_eigen: string;
  priorite: 'P0' | 'P1' | 'P2';
}

export interface InnerCircleLink {
  source: string;
  target: string;
  canal: string;
}

export const INNER_CIRCLE_NODES: InnerCircleNode[] = [
  { id: 'ic-kenza', nom: 'Kenza', role: 'Connectrice Holmarcom', organisation: 'Holmarcom', connexion_eigen: 'AMANA, CG SA', priorite: 'P0' },
  { id: 'ic-brahim', nom: 'Brahim', role: 'Canal BOA', organisation: 'Bank of Africa', connexion_eigen: 'BURHAN, MYNe', priorite: 'P0' },
  { id: 'ic-thomas', nom: 'Thomas', role: 'Liaison Lazard', organisation: 'Lazard', connexion_eigen: 'CG SA, DIWANE', priorite: 'P0' },
  { id: 'ic-karim', nom: 'Karim', role: 'Pont CGEM', organisation: 'CGEM', connexion_eigen: 'Cercle, AlgueSov', priorite: 'P1' },
  { id: 'ic-christian', nom: 'Christian', role: 'Reseaux europeens', organisation: 'Independant', connexion_eigen: 'NOOS, AELYA', priorite: 'P1' },
];

export const INNER_CIRCLE_LINKS: InnerCircleLink[] = [
  { source: 'ic-kenza', target: 'ic-brahim', canal: 'Holmarcom → BOA' },
  { source: 'ic-kenza', target: 'ic-karim', canal: 'Holmarcom → CGEM' },
  { source: 'ic-brahim', target: 'ic-thomas', canal: 'BOA → Lazard' },
  { source: 'ic-thomas', target: 'ic-christian', canal: 'Lazard → EU' },
  { source: 'ic-karim', target: 'ic-christian', canal: 'CGEM → EU' },
  { source: 'ic-kenza', target: 'ic-thomas', canal: 'deal flow' },
];

export const INNER_CIRCLE_TARGETS = [
  { id: 'tgt-holmarcom', label: 'Holmarcom', linkedTo: 'ic-kenza' },
  { id: 'tgt-boa', label: 'Bank of Africa', linkedTo: 'ic-brahim' },
  { id: 'tgt-lazard', label: 'Lazard', linkedTo: 'ic-thomas' },
  { id: 'tgt-cgem', label: 'CGEM', linkedTo: 'ic-karim' },
];

// ═══════ MATRICE SYNERGIES (cd09) ═══════

const entityIds = ENTITIES.map((e) => e.id);

/** Matrice 10x10 : intensite de synergie 0-1 entre entites */
export const SYNERGY_MATRIX: number[][] = [
  //  noos  aelya myne  burhan yrknown diwane alguesov amana cg    cercle
  [0,    0.9,  0.6,  0.5,   0.7,    0.2,   0.1,     0.3,  0.4,  0.3], // noos
  [0.9,  0,    0.8,  0.7,   0.4,    0.3,   0.2,     0.2,  0.5,  0.4], // aelya
  [0.6,  0.8,  0,    0.85,  0.5,    0.4,   0.3,     0.2,  0.6,  0.5], // myne
  [0.5,  0.7,  0.85, 0,     0.4,    0.5,   0.6,     0.3,  0.5,  0.4], // burhan
  [0.7,  0.4,  0.5,  0.4,   0,      0.7,   0.3,     0.4,  0.3,  0.3], // yrknown
  [0.2,  0.3,  0.4,  0.5,   0.7,    0,     0.2,     0.5,  0.6,  0.5], // diwane
  [0.1,  0.2,  0.3,  0.6,   0.3,    0.2,   0,       0.4,  0.3,  0.7], // alguesov
  [0.3,  0.2,  0.2,  0.3,   0.4,    0.5,   0.4,     0,    0.7,  0.8], // amana
  [0.4,  0.5,  0.6,  0.5,   0.3,    0.6,   0.3,     0.7,  0,    0.95],// cg
  [0.3,  0.4,  0.5,  0.4,   0.3,    0.5,   0.7,     0.8,  0.95, 0],   // cercle
];

export const SYNERGY_ENTITIES = ENTITIES.map((e) => ({ id: e.id, name: e.name, color: e.color }));

// ═══════ FIREWALLS GOUVERNANCE (cd51-cd55) ═══════

export interface FirewallNode {
  id: string;
  label: string;
  mecanisme: string;
  type: 'firewall' | 'entite' | 'flux';
}

export interface FirewallLink {
  source: string;
  target: string;
  label: string;
}

export const FIREWALL_NODES: FirewallNode[] = [
  { id: 'fw-1', label: 'Firewall Juridique', mecanisme: 'SAS distinctes par brique, pas de confusion de patrimoine', type: 'firewall' },
  { id: 'fw-2', label: 'Firewall Donnees', mecanisme: 'AELYA consent gate entre toutes les briques', type: 'firewall' },
  { id: 'fw-3', label: 'Firewall Financier', mecanisme: 'SPV separes, pas de cross-collateralisation', type: 'firewall' },
  { id: 'fw-4', label: 'Firewall Operationnel', mecanisme: 'Equipes, KPIs et budgets distincts par entite', type: 'firewall' },
  { id: 'fw-5', label: 'Firewall Reputationnel', mecanisme: 'Marques distinctes, communication cloisonnee', type: 'firewall' },
  { id: 'fw-eigen', label: 'Eigen Holding', mecanisme: '', type: 'entite' },
  { id: 'fw-briques', label: 'Briques Tech', mecanisme: '', type: 'entite' },
  { id: 'fw-ventures', label: 'Ventures', mecanisme: '', type: 'entite' },
  { id: 'fw-flux-data', label: 'Flux donnees', mecanisme: '', type: 'flux' },
  { id: 'fw-flux-capital', label: 'Flux capitaux', mecanisme: '', type: 'flux' },
];

export const FIREWALL_LINKS: FirewallLink[] = [
  { source: 'fw-eigen', target: 'fw-1', label: 'controle' },
  { source: 'fw-1', target: 'fw-briques', label: 'SAS separees' },
  { source: 'fw-1', target: 'fw-ventures', label: 'SAS separees' },
  { source: 'fw-briques', target: 'fw-2', label: 'donnees' },
  { source: 'fw-ventures', target: 'fw-2', label: 'donnees' },
  { source: 'fw-flux-data', target: 'fw-2', label: 'consent gate' },
  { source: 'fw-eigen', target: 'fw-3', label: 'SPV' },
  { source: 'fw-flux-capital', target: 'fw-3', label: 'non cross-collateral' },
  { source: 'fw-eigen', target: 'fw-4', label: 'equipes' },
  { source: 'fw-eigen', target: 'fw-5', label: 'marques' },
];

// ═══════ DATA FLOW BRIQUES ═══════

export interface DataFlowNode {
  id: string;
  label: string;
  color: string;
  type: 'brique' | 'transversal';
}

export interface DataFlowLink {
  source: string;
  target: string;
  label: string;
  type: 'data' | 'audit' | 'consent' | 'knowledge';
}

export const DATA_FLOW_NODES: DataFlowNode[] = [
  { id: 'df-noos', label: 'NOOS', color: C.sapphire, type: 'brique' },
  { id: 'df-aelya', label: 'AELYA', color: C.emerald, type: 'brique' },
  { id: 'df-myne', label: 'MYNe', color: C.violet, type: 'brique' },
  { id: 'df-burhan', label: 'BURHAN', color: C.gold, type: 'brique' },
  { id: 'df-yrknown', label: 'YrKnown', color: C.amber, type: 'transversal' },
];

export const DATA_FLOW_LINKS: DataFlowLink[] = [
  { source: 'df-noos', target: 'df-aelya', label: 'consentement patient', type: 'consent' },
  { source: 'df-aelya', target: 'df-myne', label: 'donnees anonymisees', type: 'data' },
  { source: 'df-myne', target: 'df-burhan', label: 'preuve echange', type: 'audit' },
  { source: 'df-burhan', target: 'df-noos', label: 'audit trail', type: 'audit' },
  { source: 'df-yrknown', target: 'df-noos', label: 'savoir clinique', type: 'knowledge' },
  { source: 'df-yrknown', target: 'df-aelya', label: 'regles consentement', type: 'knowledge' },
  { source: 'df-yrknown', target: 'df-myne', label: 'taxonomies', type: 'knowledge' },
  { source: 'df-yrknown', target: 'df-burhan', label: 'standards audit', type: 'knowledge' },
];
