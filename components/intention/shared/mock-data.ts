// =============================================================================
// MOCK DATA — Bloomberg-style simulated markets for GITEX demo
// Données réalistes basées sur les ordres de grandeur vrais
// Les variations ticker changent à chaque refresh (Math.random)
// =============================================================================

// ---------------------------------------------------------------------------
// 1. TICKER_DATA — 20 catégories d'intention avec prix simulés et variations
// ---------------------------------------------------------------------------
export interface TickerCategory {
  id: number;
  name: string;
  price: number;
  varCode: number;
  vol: string;
}

const baseTickerData: Omit<TickerCategory, 'varCode'>[] = [
  { id: 1, name: 'CRÉDIT IMMO', price: 42.50, vol: '124K' },
  { id: 2, name: 'ASSURANCE AUTO', price: 12.10, vol: '89K' },
  { id: 3, name: 'EMPLOI TECH', price: 28.00, vol: '210K' },
  { id: 4, name: 'SANTÉ MENTALE', price: 35.80, vol: '430K' },
  { id: 5, name: 'RÉNO ÉNERGIE', price: 110.00, vol: '45K' },
  { id: 6, name: 'MOBILITÉ ÉLEC', price: 65.20, vol: '88K' },
  { id: 7, name: 'CLOUD B2B', price: 85.00, vol: '12K' },
  { id: 8, name: 'CYBERSECURITÉ', price: 140.50, vol: '9K' },
  { id: 9, name: 'MUTUELLE SANTÉ', price: 22.30, vol: '150K' },
  { id: 10, name: 'VOYAGE LUXE', price: 95.00, vol: '34K' },
  { id: 11, name: 'GESTION PATRIMOINE', price: 210.00, vol: '18K' },
  { id: 12, name: 'LOGICIEL RH', price: 45.60, vol: '22K' },
  { id: 13, name: 'ÉDUCATION PRIVÉE', price: 38.00, vol: '76K' },
  { id: 14, name: 'FITNESS PREMIUM', price: 18.50, vol: '110K' },
  { id: 15, name: 'ALIMENTATION BIO', price: 8.90, vol: '320K' },
  { id: 16, name: 'TÉLÉCOMS PRO', price: 55.00, vol: '41K' },
  { id: 17, name: 'FRANCHISES', price: 150.00, vol: '5K' },
  { id: 18, name: 'SERVICES OBSÈQUES', price: 82.00, vol: '14K' },
  { id: 19, name: 'VÉHICULE OCCASION', price: 15.40, vol: '240K' },
  { id: 20, name: 'ASSURANCE EMPRUNTEUR', price: 68.00, vol: '55K' },
];

/** Generates fresh ticker data with random variations each call */
export function generateTickerData(): TickerCategory[] {
  return baseTickerData.map(cat => ({
    ...cat,
    price: +(cat.price * (1 + (Math.random() - 0.5) * 0.06)).toFixed(2),
    varCode: +((Math.random() - 0.35) * 40).toFixed(1), // bias slightly positive
  })).sort((a, b) => b.varCode - a.varCode);
}

export const TICKER_DATA: TickerCategory[] = generateTickerData();

// ---------------------------------------------------------------------------
// 2. AEYLA_TRANSACTIONS — 50 transactions simulées
// ---------------------------------------------------------------------------
export interface AelyaTransaction {
  ts: string;
  buyer: string;
  cat: string;
  tlevel: string;
  price: number;
  status: 'ACCEPT' | 'REJECT' | 'COUNTER';
}

const categories = [
  'CRÉDIT IMMO', 'ASSURANCE AUTO', 'EMPLOI TECH', 'SANTÉ MENTALE', 'RÉNO ÉNERGIE',
  'MOBILITÉ ÉLEC', 'CLOUD B2B', 'CYBERSECURITÉ', 'MUTUELLE SANTÉ', 'VOYAGE LUXE',
  'GESTION PATRIMOINE', 'LOGICIEL RH', 'ÉDUCATION PRIVÉE', 'FITNESS PREMIUM', 'ALIMENTATION BIO',
];

const statuses: AelyaTransaction['status'][] = ['ACCEPT', 'REJECT', 'COUNTER'];
const tLevels = ['T1', 'T2', 'T3', 'T4', 'T5'];

function pad(n: number) { return n.toString().padStart(2, '0'); }
function randomHex(len: number) { return Array.from({ length: len }, () => '0123456789ABCDEF'[Math.floor(Math.random() * 16)]).join(''); }

export const AEYLA_TRANSACTIONS: AelyaTransaction[] = Array.from({ length: 50 }, (_, i) => {
  const h = 10;
  const m = 42 - Math.floor(i * 0.8);
  const s = Math.floor(Math.random() * 60);
  const realM = ((m % 60) + 60) % 60;
  const realH = h + Math.floor(m / 60) - (m < 0 ? 1 : 0);
  return {
    ts: `${pad(Math.max(8, realH))}:${pad(realM)}:${pad(s)}`,
    buyer: `B**#${randomHex(2)}`,
    cat: categories[Math.floor(Math.random() * categories.length)],
    tlevel: tLevels[Math.floor(Math.random() * 5)],
    price: +(5 + Math.random() * 175).toFixed(2),
    status: statuses[Math.floor(Math.random() * 3)],
  };
});

export const AEYLA_STATS = [
  { label: 'REQUÊTES ÉVALUÉES', value: '847K', subtitle: '24h' },
  { label: 'TAUX DE REJET', value: '67%', subtitle: 'Protection active' },
  { label: 'TEMPS DÉCISION MOYEN', value: '3.2ms', subtitle: 'P99 8.1ms' },
  { label: 'CGU SCANNÉES', value: '312', subtitle: '+14 (7j)' },
  { label: 'COUNTER-OFFERS ÉMISES', value: '28K', subtitle: '3.3% Conv.' },
  { label: 'REVENUE PRODUCTEURS', value: '€142K', subtitle: '24h' },
];

// ---------------------------------------------------------------------------
// 3. OBSERVATORY_SAMPLE — 20 pays avec ARPU et gap estimés
// ---------------------------------------------------------------------------
export interface ObservatoryCountry {
  id: string;
  pays: string;
  population: string;
  arpu: number;
  valeurCaptee: number;
  gapIntention: number;
  topCapteur: string;
}

export const OBSERVATORY_SAMPLE: ObservatoryCountry[] = [
  { id: 'FR', pays: 'France', population: '54M', arpu: 42.00, valeurCaptee: 27.2, gapIntention: 3.5, topCapteur: 'Google' },
  { id: 'MA', pays: 'Maroc', population: '28M', arpu: 14.50, valeurCaptee: 4.8, gapIntention: 1.2, topCapteur: 'Meta' },
  { id: 'NG', pays: 'Nigeria', population: '105M', arpu: 6.80, valeurCaptee: 8.5, gapIntention: 2.1, topCapteur: 'Google' },
  { id: 'SN', pays: 'Sénégal', population: '12M', arpu: 8.20, valeurCaptee: 1.1, gapIntention: 0.4, topCapteur: 'TikTok' },
  { id: 'CI', pays: 'Côte d\'Ivoire', population: '15M', arpu: 9.10, valeurCaptee: 1.6, gapIntention: 0.6, topCapteur: 'Meta' },
  { id: 'DE', pays: 'Allemagne', population: '72M', arpu: 48.50, valeurCaptee: 42.1, gapIntention: 5.2, topCapteur: 'Google' },
  { id: 'ZA', pays: 'Afrique du Sud', population: '38M', arpu: 12.40, valeurCaptee: 5.6, gapIntention: 1.5, topCapteur: 'Meta' },
  { id: 'EG', pays: 'Égypte', population: '68M', arpu: 5.20, valeurCaptee: 4.2, gapIntention: 1.8, topCapteur: 'Google' },
  { id: 'KE', pays: 'Kenya', population: '32M', arpu: 7.60, valeurCaptee: 2.9, gapIntention: 0.9, topCapteur: 'Google' },
  { id: 'GH', pays: 'Ghana', population: '18M', arpu: 6.10, valeurCaptee: 1.3, gapIntention: 0.5, topCapteur: 'TikTok' },
  { id: 'TN', pays: 'Tunisie', population: '9M', arpu: 11.80, valeurCaptee: 1.2, gapIntention: 0.4, topCapteur: 'Meta' },
  { id: 'ES', pays: 'Espagne', population: '40M', arpu: 35.20, valeurCaptee: 16.8, gapIntention: 2.4, topCapteur: 'Google' },
  { id: 'AE', pays: 'Émirats Arabes Unis', population: '8M', arpu: 62.00, valeurCaptee: 5.9, gapIntention: 1.8, topCapteur: 'Google' },
  { id: 'SA', pays: 'Arabie Saoudite', population: '28M', arpu: 38.50, valeurCaptee: 12.8, gapIntention: 3.2, topCapteur: 'Google' },
  { id: 'CM', pays: 'Cameroun', population: '16M', arpu: 4.80, valeurCaptee: 0.9, gapIntention: 0.3, topCapteur: 'Meta' },
  { id: 'DZ', pays: 'Algérie', population: '30M', arpu: 6.50, valeurCaptee: 2.3, gapIntention: 0.8, topCapteur: 'Meta' },
  { id: 'PT', pays: 'Portugal', population: '8M', arpu: 28.00, valeurCaptee: 2.7, gapIntention: 0.6, topCapteur: 'Google' },
  { id: 'IT', pays: 'Italie', population: '50M', arpu: 32.00, valeurCaptee: 19.2, gapIntention: 3.1, topCapteur: 'Google' },
  { id: 'TR', pays: 'Turquie', population: '55M', arpu: 10.50, valeurCaptee: 6.9, gapIntention: 2.0, topCapteur: 'Google' },
  { id: 'RW', pays: 'Rwanda', population: '9M', arpu: 3.80, valeurCaptee: 0.4, gapIntention: 0.2, topCapteur: 'Meta' },
].sort((a, b) => b.gapIntention - a.gapIntention);

// ---------------------------------------------------------------------------
// 4. ORDER_BOOK — bid/ask simulé pour 5 catégories
// ---------------------------------------------------------------------------
export interface OrderBookEntry {
  price: number;
  vol: string;
  type?: string;   // for bids (buyer type)
  tlevel?: string;  // for asks
}

export interface OrderBookData {
  category: string;
  bids: OrderBookEntry[];
  asks: OrderBookEntry[];
}

export const ORDER_BOOK: OrderBookData[] = [
  {
    category: 'CRÉDIT IMMO',
    bids: [
      { price: 42.00, vol: '12K', type: 'BANQUE DETAIL' },
      { price: 41.70, vol: '45K', type: 'COURTIER' },
      { price: 41.30, vol: '8K', type: 'ASSURANCE' },
      { price: 41.00, vol: '110K', type: 'AGGREGATEUR' },
      { price: 40.50, vol: '25K', type: 'BANQUE EN LIGNE' },
    ],
    asks: [
      { price: 42.70, vol: '5K', tlevel: 'T4' },
      { price: 43.00, vol: '18K', tlevel: 'T3' },
      { price: 43.40, vol: '42K', tlevel: 'T2' },
      { price: 43.90, vol: '15K', tlevel: 'T4' },
      { price: 44.60, vol: '80K', tlevel: 'T1' },
    ],
  },
  {
    category: 'SANTÉ MENTALE',
    bids: [
      { price: 35.30, vol: '22K', type: 'CLINIQUE PRIVÉE' },
      { price: 35.00, vol: '38K', type: 'PLATEFORME TÉLÉ' },
      { price: 34.50, vol: '15K', type: 'MUTUELLE' },
      { price: 34.00, vol: '65K', type: 'AGGREGATEUR' },
      { price: 33.50, vol: '30K', type: 'ASSURANCE' },
    ],
    asks: [
      { price: 36.00, vol: '8K', tlevel: 'T5' },
      { price: 36.50, vol: '25K', tlevel: 'T4' },
      { price: 37.10, vol: '35K', tlevel: 'T3' },
      { price: 37.80, vol: '12K', tlevel: 'T5' },
      { price: 38.50, vol: '50K', tlevel: 'T2' },
    ],
  },
  {
    category: 'CYBERSECURITÉ',
    bids: [
      { price: 140.00, vol: '3K', type: 'ENTERPRISE' },
      { price: 139.50, vol: '8K', type: 'MSSP' },
      { price: 138.80, vol: '2K', type: 'GOV / DEFENSE' },
      { price: 138.00, vol: '12K', type: 'COURTIER B2B' },
      { price: 137.00, vol: '5K', type: 'STARTUP' },
    ],
    asks: [
      { price: 141.00, vol: '2K', tlevel: 'T5' },
      { price: 141.80, vol: '6K', tlevel: 'T4' },
      { price: 142.50, vol: '9K', tlevel: 'T3' },
      { price: 143.50, vol: '4K', tlevel: 'T5' },
      { price: 145.00, vol: '15K', tlevel: 'T2' },
    ],
  },
  {
    category: 'EMPLOI TECH',
    bids: [
      { price: 27.50, vol: '55K', type: 'RECRUTEUR' },
      { price: 27.20, vol: '120K', type: 'JOBBOARD' },
      { price: 26.80, vol: '30K', type: 'CABINET RH' },
      { price: 26.20, vol: '85K', type: 'ESN / SSII' },
      { price: 25.50, vol: '40K', type: 'FREELANCE PLATFORM' },
    ],
    asks: [
      { price: 28.20, vol: '15K', tlevel: 'T4' },
      { price: 28.80, vol: '40K', tlevel: 'T3' },
      { price: 29.50, vol: '60K', tlevel: 'T2' },
      { price: 30.20, vol: '20K', tlevel: 'T4' },
      { price: 31.00, vol: '90K', tlevel: 'T1' },
    ],
  },
  {
    category: 'MOBILITÉ ÉLEC',
    bids: [
      { price: 64.80, vol: '18K', type: 'CONSTRUCTEUR OEM' },
      { price: 64.40, vol: '35K', type: 'CONCESSIONNAIRE' },
      { price: 63.80, vol: '10K', type: 'LEASING' },
      { price: 63.00, vol: '50K', type: 'AGGREGATEUR' },
      { price: 62.00, vol: '22K', type: 'ASSURANCE AUTO' },
    ],
    asks: [
      { price: 65.50, vol: '8K', tlevel: 'T4' },
      { price: 66.20, vol: '22K', tlevel: 'T3' },
      { price: 67.00, vol: '30K', tlevel: 'T2' },
      { price: 68.00, vol: '12K', tlevel: 'T5' },
      { price: 69.50, vol: '45K', tlevel: 'T1' },
    ],
  },
];

// ---------------------------------------------------------------------------
// 5. INTENTION_FEED — 15 intentions déclarées simulées (personas fictifs)
// ---------------------------------------------------------------------------
export interface IntentionFeedItem {
  id: string;
  user: string;
  location: string;
  query: string;
  budget: string;
  urgency: string;
  category: string;
  basePrice: number;
}

export const INTENTION_FEED: IntentionFeedItem[] = [
  { id: '1', user: 'Fatima K.', location: 'Casablanca', query: 'Cherche crédit immobilier < 3000 DH/mois', budget: '€150K', urgency: '30j', category: 'FINANCE', basePrice: 42 },
  { id: '2', user: 'Ahmed T.', location: 'Dakar', query: 'Assurance auto moto complète', budget: '< 200K CFA/an', urgency: 'Immédiate', category: 'ASSURANCE', basePrice: 15 },
  { id: '3', user: 'Sophie L.', location: 'Paris', query: 'Thérapie TCC anxiété', budget: '€60-80/séance', urgency: '7j', category: 'SANTÉ', basePrice: 35 },
  { id: '4', user: 'Youssef B.', location: 'Rabat', query: 'Achat VÉ (Véhicule Électrique)', budget: '€25K', urgency: '15j', category: 'MOBILITÉ', basePrice: 28 },
  { id: '5', user: 'Marie M.', location: 'Lyon', query: 'Formation Data Science certifiante', budget: '€3K', urgency: '60j', category: 'EDUCATION', basePrice: 18 },
  { id: '6', user: 'Oumar D.', location: 'Abidjan', query: 'Mutuelle famille 4 personnes', budget: '< 50K CFA/mois', urgency: '14j', category: 'SANTÉ', basePrice: 22 },
  { id: '7', user: 'Leïla R.', location: 'Tunis', query: 'Rénovation énergétique appartement 80m²', budget: '€15K', urgency: '45j', category: 'RÉNO ÉNERGIE', basePrice: 110 },
  { id: '8', user: 'Thomas G.', location: 'Marseille', query: 'Gestion de patrimoine > €200K', budget: 'À définir', urgency: '90j', category: 'FINANCE', basePrice: 210 },
  { id: '9', user: 'Amina S.', location: 'Marrakech', query: 'Franchise restauration rapide', budget: '€80K', urgency: '120j', category: 'FRANCHISE', basePrice: 150 },
  { id: '10', user: 'Kwame A.', location: 'Accra', query: 'Cloud hosting B2B startup SaaS', budget: '$500/mois', urgency: 'Immédiate', category: 'CLOUD B2B', basePrice: 85 },
  { id: '11', user: 'Elena P.', location: 'Madrid', query: 'Voyage premium Marrakech 5j/4n', budget: '€3K/couple', urgency: '21j', category: 'VOYAGE LUXE', basePrice: 95 },
  { id: '12', user: 'Ibrahim N.', location: 'Lagos', query: 'Cybersécurité audit PME e-commerce', budget: '$8K', urgency: '30j', category: 'CYBERSECURITÉ', basePrice: 140 },
  { id: '13', user: 'Chloé D.', location: 'Bordeaux', query: 'Assurance emprunteur taux < 0.3%', budget: '€180K prêt', urgency: '14j', category: 'ASSURANCE', basePrice: 68 },
  { id: '14', user: 'Moussa K.', location: 'Bamako', query: 'Télécoms pro fibre entreprise 10 postes', budget: '< 100K CFA/mois', urgency: '30j', category: 'TÉLÉCOMS PRO', basePrice: 55 },
  { id: '15', user: 'Nadia B.', location: 'Casablanca', query: 'Programme fitness premium avec coaching', budget: '500 DH/mois', urgency: '7j', category: 'FITNESS', basePrice: 18 },
];

export const INTENTION_BIDS_MAP: Record<string, { buyer: string; price: number; isRecommended: boolean; reason?: string }[]> = {
  '1': [
    { buyer: 'Crédit du Maroc', price: 42, isRecommended: true, reason: 'Meilleur prix + taux historique 2.1%' },
    { buyer: 'Attijariwafa', price: 38, isRecommended: false },
    { buyer: 'BOA', price: 35, isRecommended: false },
  ],
  '2': [
    { buyer: 'AXA Sénégal', price: 15, isRecommended: true, reason: 'Couverture optimale pour ce profil' },
    { buyer: 'Sanlam', price: 12, isRecommended: false },
  ],
  '3': [
    { buyer: 'Qare', price: 35, isRecommended: true, reason: 'Match parfait avec spécialité TCC' },
    { buyer: 'Livi', price: 30, isRecommended: false },
    { buyer: 'Doctolib Therapy', price: 28, isRecommended: false },
  ],
  '4': [
    { buyer: 'Renault Maroc', price: 28, isRecommended: true, reason: 'Offre promotionnelle en cours' },
    { buyer: 'Peugeot', price: 25, isRecommended: false },
  ],
  '5': [
    { buyer: 'Le Wagon', price: 18, isRecommended: true, reason: 'Financement CPF possible' },
    { buyer: 'OpenClassrooms', price: 15, isRecommended: false },
  ],
  '6': [
    { buyer: 'NSIA Assurances', price: 22, isRecommended: true, reason: 'Meilleur réseau hospitalier Abidjan' },
    { buyer: 'Allianz CI', price: 19, isRecommended: false },
  ],
  '7': [
    { buyer: 'Elysia Réno', price: 110, isRecommended: true, reason: 'Certifié RGE + devis en 48h' },
    { buyer: 'Hellio', price: 95, isRecommended: false },
  ],
  '8': [
    { buyer: 'Rothschild & Co', price: 210, isRecommended: true, reason: 'Gestion sous mandat adaptée' },
    { buyer: 'Nalo', price: 180, isRecommended: false },
    { buyer: 'Yomoni', price: 160, isRecommended: false },
  ],
  '9': [
    { buyer: 'O\'Tacos', price: 150, isRecommended: true, reason: 'Zone exclusive disponible Marrakech' },
    { buyer: 'Tacos de Lyon', price: 120, isRecommended: false },
  ],
  '10': [
    { buyer: 'AWS Africa', price: 85, isRecommended: true, reason: 'Région Lagos disponible, latence < 20ms' },
    { buyer: 'Azure', price: 78, isRecommended: false },
  ],
  '11': [
    { buyer: 'Royal Mansour', price: 95, isRecommended: true, reason: 'Package couple all-inclusive' },
    { buyer: 'Four Seasons', price: 88, isRecommended: false },
  ],
  '12': [
    { buyer: 'Deloitte Nigeria', price: 140, isRecommended: true, reason: 'Audit certifié ISO 27001' },
    { buyer: 'CyberNGR', price: 110, isRecommended: false },
  ],
  '13': [
    { buyer: 'Cardif (BNP)', price: 68, isRecommended: true, reason: 'Taux 0.22% garanti 12 mois' },
    { buyer: 'April', price: 62, isRecommended: false },
  ],
  '14': [
    { buyer: 'Orange Mali', price: 55, isRecommended: true, reason: 'Couverture fibre zone industrielle' },
    { buyer: 'Moov Africa', price: 48, isRecommended: false },
  ],
  '15': [
    { buyer: 'FitFactory Casa', price: 18, isRecommended: true, reason: 'Coaching hybride + app tracking' },
    { buyer: 'Gold\'s Gym', price: 15, isRecommended: false },
  ],
};

// ---------------------------------------------------------------------------
// 6. LEDGER_ENTRIES — 30 entrées de transaction ledger avec hash BURHAN simulé
// ---------------------------------------------------------------------------
export interface LedgerEntry {
  id: string;
  timestamp: string;
  buyer: string;
  category: string;
  tLevel: string;
  volume: string;
  price: number;
  hash: string;
  status: 'CERTIFIED' | 'PENDING' | 'DISPUTED';
}

function generateHash(): string {
  return `0x${randomHex(4)}...${randomHex(4)}`;
}

const ledgerCategories = ['FINANCE', 'SANTÉ', 'MOBILITÉ', 'E-COMMERCE', 'ASSURANCE', 'ÉNERGIE', 'CLOUD', 'ÉDUCATION'];
const ledgerStatuses: LedgerEntry['status'][] = ['CERTIFIED', 'CERTIFIED', 'CERTIFIED', 'PENDING', 'DISPUTED']; // weighted toward CERTIFIED

export const LEDGER_ENTRIES: LedgerEntry[] = Array.from({ length: 30 }, (_, i) => {
  const hour = 4;
  const minute = 59 - i * 2;
  const realMin = ((minute % 60) + 60) % 60;
  const realHour = hour + Math.floor(minute / 60) - (minute < 0 ? 1 : 0);
  return {
    id: (i + 1).toString(),
    timestamp: `2026-04-03 ${pad(Math.max(3, realHour))}:${pad(realMin)}:${pad(Math.floor(Math.random() * 60))}`,
    buyer: `B-0x${randomHex(4)}`,
    category: ledgerCategories[Math.floor(Math.random() * ledgerCategories.length)],
    tLevel: tLevels[Math.floor(Math.random() * 5)],
    volume: `${Math.floor(2 + Math.random() * 98)} MB`,
    price: +(5 + Math.random() * 200).toFixed(2),
    hash: generateHash(),
    status: ledgerStatuses[Math.floor(Math.random() * ledgerStatuses.length)],
  };
});

// ---------------------------------------------------------------------------
// 7. CORRIDOR_FLOWS — 15 flux inter-pays avec volumes
// ---------------------------------------------------------------------------
export interface CorridorNode {
  id: string;
  x: number;
  y: number;
  label: string;
}

export interface CorridorEdge {
  source: string;
  target: string;
  volume: number;
  color: string;
  category: string;
}

export interface CorridorFlow {
  id: string;
  route: string;
  category: string;
  volumeLabel: string;
  valeur: number;
  tLevel: string;
  reglementation: string;
}

export const CORRIDOR_NODES: CorridorNode[] = [
  { id: 'FR', x: 200, y: 100, label: 'FRANCE' },
  { id: 'DE', x: 300, y: 80, label: 'GERMANY' },
  { id: 'ES', x: 100, y: 150, label: 'SPAIN' },
  { id: 'MA', x: 150, y: 250, label: 'MOROCCO' },
  { id: 'SN', x: 100, y: 350, label: 'SENEGAL' },
  { id: 'CI', x: 200, y: 380, label: 'COTE D\'IVOIRE' },
  { id: 'GH', x: 280, y: 360, label: 'GHANA' },
  { id: 'NG', x: 350, y: 320, label: 'NIGERIA' },
  { id: 'KE', x: 500, y: 300, label: 'KENYA' },
  { id: 'ZA', x: 300, y: 500, label: 'SOUTH AFRICA' },
  { id: 'AE', x: 520, y: 180, label: 'UAE' },
  { id: 'EG', x: 420, y: 200, label: 'EGYPT' },
  { id: 'TN', x: 240, y: 180, label: 'TUNISIA' },
];

export const CORRIDOR_COLORS = {
  SANTÉ: '#3B82F6',
  FINANCE: '#EAB308',
  MOBILE: '#06B6D4',
};

export const CORRIDOR_EDGES: CorridorEdge[] = [
  { source: 'FR', target: 'MA', volume: 8, color: CORRIDOR_COLORS.FINANCE, category: 'FINANCE' },
  { source: 'ES', target: 'MA', volume: 4, color: CORRIDOR_COLORS.MOBILE, category: 'MOBILE' },
  { source: 'FR', target: 'SN', volume: 5, color: CORRIDOR_COLORS.SANTÉ, category: 'SANTÉ' },
  { source: 'MA', target: 'CI', volume: 3, color: CORRIDOR_COLORS.FINANCE, category: 'FINANCE' },
  { source: 'DE', target: 'NG', volume: 6, color: CORRIDOR_COLORS.MOBILE, category: 'MOBILE' },
  { source: 'FR', target: 'CI', volume: 4, color: CORRIDOR_COLORS.FINANCE, category: 'FINANCE' },
  { source: 'NG', target: 'KE', volume: 5, color: CORRIDOR_COLORS.FINANCE, category: 'FINANCE' },
  { source: 'ZA', target: 'NG', volume: 7, color: CORRIDOR_COLORS.SANTÉ, category: 'SANTÉ' },
  { source: 'AE', target: 'EG', volume: 5, color: CORRIDOR_COLORS.FINANCE, category: 'FINANCE' },
  { source: 'FR', target: 'TN', volume: 3, color: CORRIDOR_COLORS.SANTÉ, category: 'SANTÉ' },
  { source: 'DE', target: 'MA', volume: 4, color: CORRIDOR_COLORS.MOBILE, category: 'MOBILE' },
  { source: 'EG', target: 'KE', volume: 3, color: CORRIDOR_COLORS.FINANCE, category: 'FINANCE' },
  { source: 'AE', target: 'NG', volume: 4, color: CORRIDOR_COLORS.MOBILE, category: 'MOBILE' },
];

export const CORRIDOR_FLOWS: CorridorFlow[] = [
  { id: '1', route: 'FR → MA', category: 'FINANCE', volumeLabel: '4.2 PB/mo', valeur: 1250000, tLevel: 'T4', reglementation: 'RGPD / CNDP' },
  { id: '2', route: 'DE → NG', category: 'MOBILE', volumeLabel: '3.8 PB/mo', valeur: 980000, tLevel: 'T3', reglementation: 'NDPR / RGPD' },
  { id: '3', route: 'ZA → NG', category: 'SANTÉ', volumeLabel: '3.1 PB/mo', valeur: 850000, tLevel: 'T5', reglementation: 'POPIA / NDPR' },
  { id: '4', route: 'FR → SN', category: 'SANTÉ', volumeLabel: '2.5 PB/mo', valeur: 720000, tLevel: 'T5', reglementation: 'RGPD / CDP' },
  { id: '5', route: 'ES → MA', category: 'MOBILE', volumeLabel: '2.1 PB/mo', valeur: 610000, tLevel: 'T2', reglementation: 'RGPD / CNDP' },
  { id: '6', route: 'NG → KE', category: 'FINANCE', volumeLabel: '1.9 PB/mo', valeur: 580000, tLevel: 'T4', reglementation: 'NDPR / DPA' },
  { id: '7', route: 'FR → CI', category: 'FINANCE', volumeLabel: '1.5 PB/mo', valeur: 450000, tLevel: 'T4', reglementation: 'RGPD / ARTCI' },
  { id: '8', route: 'MA → CI', category: 'FINANCE', volumeLabel: '1.2 PB/mo', valeur: 320000, tLevel: 'T4', reglementation: 'CNDP / ARTCI' },
  { id: '9', route: 'AE → EG', category: 'FINANCE', volumeLabel: '2.8 PB/mo', valeur: 920000, tLevel: 'T4', reglementation: 'PDPL / EG-DPL' },
  { id: '10', route: 'FR → TN', category: 'SANTÉ', volumeLabel: '1.1 PB/mo', valeur: 310000, tLevel: 'T5', reglementation: 'RGPD / INPDP' },
  { id: '11', route: 'DE → MA', category: 'MOBILE', volumeLabel: '1.8 PB/mo', valeur: 520000, tLevel: 'T3', reglementation: 'RGPD / CNDP' },
  { id: '12', route: 'EG → KE', category: 'FINANCE', volumeLabel: '1.4 PB/mo', valeur: 410000, tLevel: 'T3', reglementation: 'EG-DPL / DPA' },
  { id: '13', route: 'AE → NG', category: 'MOBILE', volumeLabel: '2.0 PB/mo', valeur: 640000, tLevel: 'T3', reglementation: 'PDPL / NDPR' },
  { id: '14', route: 'FR → GH', category: 'SANTÉ', volumeLabel: '0.9 PB/mo', valeur: 280000, tLevel: 'T4', reglementation: 'RGPD / DPA-GH' },
  { id: '15', route: 'ZA → KE', category: 'FINANCE', volumeLabel: '1.6 PB/mo', valeur: 490000, tLevel: 'T4', reglementation: 'POPIA / DPA' },
];

// ---------------------------------------------------------------------------
// 8. FATIMA_COMPARISON — données du comparateur paradigmatique
// ---------------------------------------------------------------------------
export interface FatimaMultiplier {
  label: string;
  value: number;
}

export const FATIMA_MULTIPLIERS: FatimaMultiplier[] = [
  { label: '1 PERSONNE', value: 1 },
  { label: '37M (MAROC)', value: 37000000 },
  { label: '500M (CORRIDOR)', value: 500000000 },
];

export interface FatimaComparisonData {
  attention: {
    dataValuePerPerson: number;      // €194/an
    revenueRecovered: number;        // €0/an
    adsPerWeek: number;              // 847
    timeCapted: number;              // 766 heures/an
    controlPercent: string;
    agent: string;
    consentPerYear: number;          // 312 fois
  };
  intention: {
    dataValuePerPerson: number;      // €194/an
    revenueRecovered: number;        // €103/an (53%)
    adsPerWeek: number;              // 0
    timeLiberated: number;           // 766 heures/an
    controlPercent: string;
    agent: string;
    intentionsPerMonth: number;      // 3
    pricePerIntention: number;       // €22
    cguScanned: number;              // 312
    rejectRate: string;              // 67%
  };
}

export const FATIMA_COMPARISON: FatimaComparisonData = {
  attention: {
    dataValuePerPerson: 194,
    revenueRecovered: 0,
    adsPerWeek: 847,
    timeCapted: 766,
    controlPercent: '0%',
    agent: 'AUCUN',
    consentPerYear: 312,
  },
  intention: {
    dataValuePerPerson: 194,
    revenueRecovered: 103,
    adsPerWeek: 0,
    timeLiberated: 766,
    controlPercent: '100%',
    agent: 'ÆLYA (312 CGU SCANNÉES, 67% REJECT)',
    intentionsPerMonth: 3,
    pricePerIntention: 22,
    cguScanned: 312,
    rejectRate: '67%',
  },
};

// ---------------------------------------------------------------------------
// Aggregated export for convenience
// ---------------------------------------------------------------------------
export const MOCK_DATA = {
  ticker: TICKER_DATA,
  generateTickerData,
  aelyaTransactions: AEYLA_TRANSACTIONS,
  aelyaStats: AEYLA_STATS,
  observatory: OBSERVATORY_SAMPLE,
  orderBook: ORDER_BOOK,
  intentionFeed: INTENTION_FEED,
  intentionBidsMap: INTENTION_BIDS_MAP,
  ledgerEntries: LEDGER_ENTRIES,
  corridorNodes: CORRIDOR_NODES,
  corridorEdges: CORRIDOR_EDGES,
  corridorFlows: CORRIDOR_FLOWS,
  corridorColors: CORRIDOR_COLORS,
  fatimaMultipliers: FATIMA_MULTIPLIERS,
  fatimaComparison: FATIMA_COMPARISON,
} as const;
