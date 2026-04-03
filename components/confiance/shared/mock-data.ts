// ═══════════════════════════════════════════════════════════════════
// MOCK DATA — Intelligence Confiance (GITEX Demo)
// Centralized realistic simulated trust metrics
// ═══════════════════════════════════════════════════════════════════

// ─── Interfaces ────────────────────────────────────────────────────

export interface EntityDimension {
  id: string;
  name: string;
  score: number;
  color: string;
  descHuman: string;
  descAI: string;
}

export interface TrustEntity {
  id: string;
  name: string;
  type: 'Établissement' | 'Modèle IA' | 'Praticien' | 'Supply Chain';
  globalScore: number;
  alerts: number;
  trend: '+' | '-' | '=';
  dimensions: EntityDimension[];
}

export interface AIModel {
  id: string;
  name: string;
  org: string;
  hash: string;
  driftScore: number;
  decisionReceipts: number;
  explainability: number;
  aiActClass: 'Unacceptable' | 'High' | 'Limited' | 'Minimal';
  lastCheckDays: number;
}

export interface AIIncident {
  id: number;
  model: string;
  sector: string;
  impact: string;
  prevention: string;
}

export interface Threat {
  id: string;
  name: string;
  severity: 'CRITIQUE' | 'ÉLEVÉ';
  trend: string;
  keyData: string;
  impact: string;
  defense: string;
  gap: string;
  research: string;
}

export interface ArbitrageZone {
  id: string;
  name: string;
  declaredTrust: number;
  measuredTrust: number;
  opportunityValue: string;
}

export interface Competitor {
  name: string;
  preuvec: boolean;
  bc: boolean;
  aicert: boolean;
  sc: boolean;
  corridor: boolean;
  price: string;
}

export interface DecaySector {
  id: string;
  name: string;
  lambda: number;
  explanation: string;
}

export interface EconomicsSector {
  name: string;
  fraudPct: string;
  complexity: string;
  regulation: string;
  roiTypique: string;
}

export interface EntropySignal {
  id: number;
  signal: string;
  natural: string;
  fraud: string;
  detection: string;
}

export interface Regulation {
  id: string;
  name: string;
  fullName: string;
  status: 'active' | 'upcoming' | 'draft';
  date: string;
  maxPenalty: string;
  tamBurhan: string;
  role: string;
  ffScore: number;
}

export interface ThermoLaw {
  id: number;
  title: string;
  statement: string;
  formula: string;
  application: string;
  implication: string;
}

export interface DeficitData {
  country: string;
  trustScore: number;
  fraudDetected: string;
  fraudEstimated: string;
  tamBurhan: string;
  gap: number;
}

export interface TierData {
  id: number;
  name: string;
  totalSuppliers: number;
  trustFloor: number;
  holesPercentage: number;
  auditCost: string;
  burhanCost: string;
  nodes: { id: string; status: 'CERTIFIED' | 'PARTIAL' | 'UNCERTIFIED' | 'UNKNOWN' }[];
}

export interface SupplyChainCascade {
  anchor: { name: string; score: number };
  tiers: TierData[];
}

// ─── Dimensions Config ─────────────────────────────────────────────

const DIMENSIONS_CONFIG = [
  { id: 'id', name: 'Identité vérifiée (ID)', color: '#00D4B8' },
  { id: 'ct', name: 'Cohérence temporelle (CT)', color: '#C9A84C' },
  { id: 'ra', name: 'Résistance adversariale (RA)', color: '#E84040' },
  { id: 'tr', name: 'Transparence (TR)', color: '#38C060' },
  { id: 'rc', name: 'Réseau de confiance (RC)', color: '#9D4EDD' },
  { id: 'cv', name: 'Conformité vivante (CV)', color: '#00D4B8' },
];

function makeDims(scores: number[], descHuman: string, descAI: string): EntityDimension[] {
  return DIMENSIONS_CONFIG.map((d, i) => ({ ...d, score: scores[i], descHuman, descAI }));
}

// ─── 1. POB_ENTITIES_MOCK ──────────────────────────────────────────

export const POB_ENTITIES_MOCK: TrustEntity[] = [
  {
    id: '1', name: 'CHU Mohammed VI', type: 'Établissement', globalScore: 80, alerts: 0, trend: '+',
    dimensions: makeDims([85, 78, 72, 82, 80, 83], 'Certification FMSAR validée, registre CNOM actif', 'N/A'),
  },
  {
    id: '2', name: 'GPT-4o OpenAI', type: 'Modèle IA', globalScore: 56, alerts: 3, trend: '-',
    dimensions: makeDims([40, 52, 48, 65, 58, 73], 'N/A', 'Drift détecté 12.4% — 3 alertes actives, revalidation requise'),
  },
  {
    id: '3', name: 'AtlantaSanad Holmarcom', type: 'Établissement', globalScore: 81, alerts: 0, trend: '=',
    dimensions: makeDims([84, 80, 76, 85, 78, 83], 'Audit ACAPS conforme, couverture AMO/AMI certifiée', 'N/A'),
  },
  {
    id: '4', name: 'Dr. Khalid M. psychiatre', type: 'Praticien', globalScore: 88, alerts: 0, trend: '+',
    dimensions: makeDims([92, 86, 84, 90, 88, 88], 'CNOM validé, spécialisation psychiatrie Casablanca', 'N/A'),
  },
  {
    id: '5', name: 'Fournisseur Tier 2 anonyme', type: 'Supply Chain', globalScore: 23, alerts: 5, trend: '-',
    dimensions: makeDims([18, 25, 12, 30, 22, 31], 'Certifications expirées, 5 gaps détectés, origine opaque', 'N/A'),
  },
  {
    id: '6', name: 'NOOS Engine v2.1 Eigen', type: 'Modèle IA', globalScore: 94, alerts: 0, trend: '+',
    dimensions: makeDims([96, 93, 95, 94, 92, 94], 'N/A', 'Alignement Eigen absolu — zero drift, preuve continue active'),
  },
];

// ─── 2. AI_MODELS_MOCK ────────────────────────────────────────────

export const AI_MODELS_MOCK: AIModel[] = [
  { id: '1', name: 'GPT-4o Medical', org: 'OpenAI', hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', driftScore: 12.4, decisionReceipts: 14502, explainability: 58, aiActClass: 'High', lastCheckDays: 34 },
  { id: '2', name: 'MedLM v2', org: 'Google Health', hash: '8a2b5d4e1f7c9e0a3b6d8f2c5a1e4b7d9c0f3a6e9b2c5d8f1a4e7b0c3d6f9a2b', driftScore: 8.4, decisionReceipts: 340, explainability: 65, aiActClass: 'High', lastCheckDays: 105 },
  { id: '3', name: 'NOOS Engine v2.1', org: 'Eigen', hash: 'fc1c149afbf4c8996fb92427ae41e46e3b0c4429849b934ca495991b7852b855', driftScore: 0.3, decisionReceipts: 89200, explainability: 97, aiActClass: 'Limited', lastCheckDays: 1 },
  { id: '4', name: 'Llama-3-Care', org: 'Meta/Open', hash: '996fb92427ae41e4649b934ca495991be3b0c44298fc1c149afbf4c87852b855', driftScore: 4.8, decisionReceipts: 8900, explainability: 70, aiActClass: 'High', lastCheckDays: 2 },
  { id: '5', name: 'BioNTech DiagAI', org: 'BioNTech', hash: '49b934ca495991b7852b855e3b0c44298fc1c149afbf4c8996fb92427ae41e46', driftScore: 1.2, decisionReceipts: 56000, explainability: 88, aiActClass: 'High', lastCheckDays: 45 },
];

export const AI_INCIDENTS_MOCK: AIIncident[] = [
  { id: 1, model: 'GPT-4o Medical', sector: 'Diagnostic', impact: 'Drift 12.4% — biais ethnique détecté (+15% FP)', prevention: 'Drift Warning émis par BURHAN 12h avant.' },
  { id: 2, model: 'MedLM v2', sector: 'Oncologie', impact: 'Absence d\'auditabilité (340 Decision Receipts)', prevention: 'Modèle bloqué en amont, fallback humain activé.' },
  { id: 3, model: 'Llama-3-Care', sector: 'Urgences', impact: 'Hallucination posologique détectée', prevention: 'EigenProof a flagué la divergence vs formulaire national.' },
];

// ─── 3. THREATS_MOCK ──────────────────────────────────────────────

export const THREATS_MOCK: Threat[] = [
  { id: '1', name: 'Deepfakes & Synthetic Media', severity: 'CRITIQUE', trend: '+300% YoY', keyData: '85% des fausses preuves d\'identité bancaire (2025).', impact: 'Subversion des KYC traditionnels via injection vidéo.', defense: 'Cryptographic Liveness & provenance attestations (Burhan C2).', gap: 'Détection vs Génération: la génération gagne. Seule l\'attestation à la source survit.', research: 'Quantum-resistant origin proofs.' },
  { id: '2', name: 'Model Poisoning', severity: 'CRITIQUE', trend: '+210% YoY', keyData: '40% des LLMs fine-tuned exposés.', impact: 'Biais indétectables, backdoors logicielle.', defense: 'EigenProof sur le dataset d\'entraînement et le RLHF.', gap: 'Manque de traçabilité des données d\'entraînement open-source.', research: 'Zero-Knowledge Machine Learning (ZKML).' },
  { id: '3', name: 'Supply Chain Attacks', severity: 'ÉLEVÉ', trend: '+85% YoY', keyData: 'Attaques Tiers (Rank N-3) en hausse.', impact: 'Injection logicielle ou contrefaçon matérielle bypassing les audits Tier 1.', defense: 'Graphe cryptographique NOOS + signature continue BURHAN.', gap: 'Invisibilité au-delà du fournisseur direct.', research: 'Recursive zk-SNARKs pour supply chains.' },
  { id: '4', name: 'Certificats Frauduleux (ESG/Bio)', severity: 'ÉLEVÉ', trend: '+140% YoY', keyData: '30% des labels environnementaux non-vérifiables.', impact: 'Prime commerciale touchée sans conformité thermodynamique réelle.', defense: 'Oracle IoT inviolable -> Smart Contract.', gap: 'Papier vs Réalité physique.', research: 'Hardware Roots of Trust pour capteurs IoT ESG.' },
  { id: '5', name: 'Identity Theft (AI Agents)', severity: 'CRITIQUE', trend: '+300% YoY', keyData: 'Usurpation de wallets autonomes.', impact: 'Agents AI malicieux agissant sous l\'identité d\'entités légales.', defense: 'DIDs (Decentralized Identifiers) pour AI.', gap: 'Cadre légal absent pour la responsabilité des agents.', research: 'Jurisprudence algorithmique ÆLYA.' },
];

// ─── 4. ARBITRAGE_ZONES_MOCK ──────────────────────────────────────

export const ARBITRAGE_ZONES_MOCK: ArbitrageZone[] = [
  { id: '1', name: 'Certificats médicaux (Maroc)', declaredTrust: 90, measuredTrust: 31, opportunityValue: '€1.4B' },
  { id: '2', name: 'Labels Bio (Souss-Massa)', declaredTrust: 88, measuredTrust: 38, opportunityValue: '€920M' },
  { id: '3', name: 'Audits ESG (Casablanca Finance City)', declaredTrust: 95, measuredTrust: 22, opportunityValue: '€4.5B' },
  { id: '4', name: 'IA en production (Santé)', declaredTrust: 75, measuredTrust: 14, opportunityValue: '€12B' },
  { id: '5', name: 'Médicaments Corridor Afrique', declaredTrust: 60, measuredTrust: 12, opportunityValue: '€3.1B' },
];

// ─── 5. COMPETITORS_MOCK ──────────────────────────────────────────

export const COMPETITORS_MOCK: Competitor[] = [
  { name: 'BURHAN (EIGEN)', preuvec: true, bc: true, aicert: true, sc: true, corridor: true, price: 'Infra (B2B)' },
  { name: 'VeChain', preuvec: false, bc: true, aicert: false, sc: true, corridor: false, price: 'Tx-based' },
  { name: 'EcoVadis', preuvec: false, bc: false, aicert: false, sc: false, corridor: false, price: 'Abo Annuel' },
  { name: 'Holistic AI', preuvec: false, bc: false, aicert: true, sc: false, corridor: false, price: 'SaaS' },
  { name: 'TraceLink', preuvec: false, bc: false, aicert: false, sc: true, corridor: false, price: 'Enterprise' },
];

// ─── 6. DECAY_SECTORS_MOCK ────────────────────────────────────────

export const DECAY_SECTORS_MOCK: DecaySector[] = [
  { id: '1', name: 'Identity (Medical — CNOM Maroc)', lambda: 0.02, explanation: 'Les diplômes et CNOM changent peu, mais les affiliations cliniques peuvent expirer.' },
  { id: '2', name: 'AI Models (Drift — GPT-4o)', lambda: 0.15, explanation: 'Les modèles génératifs dérivent rapidement selon les prompts et le finetuning en prod.' },
  { id: '3', name: 'Supply Chain (Tier 2 — Corridor)', lambda: 0.08, explanation: 'Turnover, faillites, changements de certificats ISO dans le corridor Afrique.' },
  { id: '4', name: 'Cybersecurity Auth', lambda: 0.25, explanation: 'Rotation forcée. Les tokens et sessions expirent naturellement très vite.' },
  { id: '5', name: 'Regulatory (AMDIE / ACAPS)', lambda: 0.05, explanation: 'La régulation marocaine change par cycles (loi 09-08, code numérique), décroissance lente.' },
];

// ─── 7. ECONOMICS_SECTORS_MOCK ────────────────────────────────────

export const ECONOMICS_SECTORS_MOCK: string[] = [
  "Pharmaceutique",
  "Luxe & Traçabilité",
  "Énergie & ESG",
  "Aéronautique",
  "Agroalimentaire Bio",
  "Intelligence Artificielle",
];

// ─── 8. ENTROPY_SIGNALS_MOCK ──────────────────────────────────────

export const ENTROPY_SIGNALS_MOCK: EntropySignal[] = [
  { id: 1, signal: "Vitesse de frappe (Keystrokes)", natural: "Variance naturelle, pauses cognitives", fraud: "120 WPM constants, pas de backspace", detection: "Analyse temporelle des events JS" },
  { id: 2, signal: "Mouvements de souris", natural: "Courbes de Bézier organiques", fraud: "Lignes droites parfaites, snap instantané", detection: "Vecteur CDAO en background" },
  { id: 3, signal: "Réseau socio-professionnel", natural: "Densité progressive, clusters multiples", fraud: "Burst de connexions vides, pas de hubs", detection: "Graphes d'entropie relationnelle" },
  { id: 4, signal: "Séquence de navigation", natural: "Exploration, aller-retours, hésitations", fraud: "Direct path to submission form", detection: "Markov Chain anomalies" },
  { id: 5, signal: "Clozapine / Hypersalivation", natural: "Co-occurrence médicale rare mais avérée", fraud: "Mention scriptée issue de DB leaks", detection: "Correlation LLM textuelle" },
];

// ─── 9. REGULATIONS_MOCK ──────────────────────────────────────────

export const REGULATIONS_MOCK: Regulation[] = [
  { id: '1', name: 'CS3D', fullName: 'Corporate Sustainability Due Diligence Directive', status: 'upcoming', date: '2027', maxPenalty: '5% du CA mondial', tamBurhan: '€3.5B', role: 'BURHAN fournit la preuve cryptographique de la cascade de responsabilité jusqu\'au rang n. NOOS map l\'écosystème.', ffScore: 9 },
  { id: '2', name: 'AI Act', fullName: 'European Artificial Intelligence Act', status: 'active', date: 'Août 2024', maxPenalty: '€35M ou 7% du CA mondial', tamBurhan: '€5.2B', role: 'Validation des données d\'entraînement (EigenProof) et audit algorithmique continu via BURHAN.', ffScore: 10 },
  { id: '3', name: 'EU FMD', fullName: 'Falsified Medicines Directive', status: 'active', date: 'Fév 2019', maxPenalty: 'Révocation licence + Pénal', tamBurhan: '€1.8B', role: 'Couplage sérialisation existante avec ancrage blockchain et validation Corridor Afrique.', ffScore: 7 },
  { id: '4', name: 'DORA', fullName: 'Digital Operational Resilience Act', status: 'upcoming', date: 'Jan 2025', maxPenalty: '2% CA mondial', tamBurhan: '€2.1B', role: 'Monitorage cyber en temps réel et preuves mathématiques de résilience des tiers (ÆLYA).', ffScore: 8 },
  { id: '5', name: 'Loi 09-08', fullName: 'Protection des données personnelles (Maroc)', status: 'active', date: '2009 (CNDP)', maxPenalty: '300K MAD + Pénal', tamBurhan: '€400M', role: 'BURHAN assure la traçabilité des consentements et la conformité CNDP pour le corridor Afrique.', ffScore: 7 },
];

// ─── 10. THERMO_LAWS_MOCK ─────────────────────────────────────────

export const THERMO_LAWS_MOCK: ThermoLaw[] = [
  {
    id: 1,
    title: 'Première Loi : Conservation',
    statement: "La confiance totale dans un système fermé est constante, elle ne fait que changer d'état ou se transférer entre entités.",
    formula: "ΔT_system = 0  =>  T_in = T_out",
    application: "Toute perte de confiance vers une API centralisée (ex: OpenAI) se traduit par une augmentation proportionnelle vers un système self-hosted vérifiable (Noos Engine).",
    implication: "Capitonner les nœuds de fuite de confiance pour récupérer l'énergie trust-native des utilisateurs désabusés.",
  },
  {
    id: 2,
    title: 'Deuxième Loi : Croissance de l\'Entropie',
    statement: "Sans un apport constant d'énergie de vérification (Proof-of-Work ou cryptographie), l'entropie de la confiance (le doute, l'incertitude) ne peut qu'augmenter.",
    formula: "dS_trust ≥ 0  (Isolé)   ;   T(t) = T(0) · e^(-λt)",
    application: "Un profil certifié en 2024 sera perçu comme incertain en 2026 s'il n'y a pas de rafraîchissement synchrone. Le decay est inéluctable.",
    implication: "Imposer un Continuous Audit SDK (BURHAN) pour contrer le decay naturel, créant un revenu récurrent (Trust-as-a-Service).",
  },
  {
    id: 3,
    title: 'Troisième Loi : Le Zéro Absolu',
    statement: "Il est impossible d'atteindre le Zéro Absolu de l'Incertitude (Confiance 100% infinie) car le coût marginal de vérification tend vers l'infini.",
    formula: "lim (cost → ∞) [ Uncertainty ] = ε > 0",
    application: "Inutile d'essayer de prouver l'absolu. L'algorithme d'Eigen cherche la valeur ε optimale où l'effort cryptographique équilibre le risque probabiliste.",
    implication: "On ne vend pas la perfection, on vend le gradient de sécurité optimal (SLA dynamique).",
  },
  {
    id: 4,
    title: 'Quatrième Loi (Onsager) : Symétrie',
    statement: "Les flux de confiance et les forces de vérification sont couplés de manière symétrique en régime linéaire proche de l'équilibre.",
    formula: "L_ab = L_ba  ;  J_trust_A→B ∝ ∇V_proof",
    application: "Si l'on exige des preuves lourdes du fournisseur, il doit exister un gradient économique (paiement, prime) équivalent, sinon le lien se brise.",
    implication: "Le Trust Arbitrage permet de monétiser cette asymétrie. Ceux qui ne peuvent pas prouver paient une prime d'incertitude.",
  },
];

// ─── 11. DEFICIT_COUNTRIES_MOCK ───────────────────────────────────

export const DEFICIT_COUNTRIES_MOCK: DeficitData[] = [
  { country: "Maroc", trustScore: 62, fraudDetected: "€1.2B", fraudEstimated: "€3.8B", tamBurhan: "€240M", gap: 38 },
  { country: "République Démocratique du Congo", trustScore: 24, fraudDetected: "€1.2B", fraudEstimated: "€8.5B", tamBurhan: "€450M", gap: 76 },
  { country: "Nigéria", trustScore: 31, fraudDetected: "€3.4B", fraudEstimated: "€14.2B", tamBurhan: "€850M", gap: 69 },
  { country: "Afrique du Sud", trustScore: 48, fraudDetected: "€4.1B", fraudEstimated: "€11.0B", tamBurhan: "€600M", gap: 52 },
  { country: "Kenya", trustScore: 52, fraudDetected: "€800M", fraudEstimated: "€3.2B", tamBurhan: "€210M", gap: 48 },
  { country: "Sénégal", trustScore: 58, fraudDetected: "€400M", fraudEstimated: "€1.8B", tamBurhan: "€120M", gap: 42 },
  { country: "Côte d'Ivoire", trustScore: 45, fraudDetected: "€1.1B", fraudEstimated: "€4.5B", tamBurhan: "€280M", gap: 55 },
];

// ─── 12. SUPPLY_CHAIN_MOCK ────────────────────────────────────────

export const SUPPLY_CHAIN_MOCK: SupplyChainCascade = {
  anchor: { name: 'OCP Group', score: 91 },
  tiers: [
    {
      id: 1, name: 'Tier 1 — Fournisseurs Directs', totalSuppliers: 380, trustFloor: 82, holesPercentage: 3, auditCost: '3.8M €', burhanCost: '95K €',
      nodes: [
        { id: '1-1', status: 'CERTIFIED' }, { id: '1-2', status: 'CERTIFIED' },
        { id: '1-3', status: 'PARTIAL' }, { id: '1-4', status: 'CERTIFIED' },
        { id: '1-5', status: 'CERTIFIED' },
      ],
    },
    {
      id: 2, name: 'Tier 2 — Sous-traitants', totalSuppliers: 1100, trustFloor: 58, holesPercentage: 18, auditCost: '15M €', burhanCost: '220K €',
      nodes: [
        { id: '2-1', status: 'PARTIAL' }, { id: '2-2', status: 'UNCERTIFIED' },
        { id: '2-3', status: 'CERTIFIED' }, { id: '2-4', status: 'PARTIAL' },
        { id: '2-5', status: 'UNKNOWN' },
      ],
    },
    {
      id: 3, name: 'Tier 3 — Matières Premières', totalSuppliers: 3200, trustFloor: 35, holesPercentage: 48, auditCost: 'Impraticable', burhanCost: '450K €',
      nodes: [
        { id: '3-1', status: 'UNCERTIFIED' }, { id: '3-2', status: 'UNKNOWN' },
        { id: '3-3', status: 'PARTIAL' }, { id: '3-4', status: 'UNKNOWN' },
        { id: '3-5', status: 'UNCERTIFIED' },
      ],
    },
    {
      id: 4, name: 'Tier 4 — Origines Opaques', totalSuppliers: 7500, trustFloor: 10, holesPercentage: 90, auditCost: 'Impossible', burhanCost: '900K €',
      nodes: [
        { id: '4-1', status: 'UNKNOWN' }, { id: '4-2', status: 'UNKNOWN' },
        { id: '4-3', status: 'UNKNOWN' }, { id: '4-4', status: 'UNCERTIFIED' },
        { id: '4-5', status: 'UNKNOWN' },
      ],
    },
  ],
};
