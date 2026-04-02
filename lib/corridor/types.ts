// RAQIB Corridor Intelligence Module - TypeScript Interfaces
// Covers 49 countries (22 Africa + 27 EU) with 12 data categories

// ---------------------------------------------------------------------------
// Minerals
// ---------------------------------------------------------------------------

export interface MineralDeposit {
  name: string;
  location: string;
  stage: string;
  operator?: string;
  nationality?: string;
  ownership?: string;
}

export interface Mineral {
  name: string;
  type: string;
  annualProduction: string;
  worldRank: string;
  reserves: string;
  deposits?: MineralDeposit[];
  exportRevenue?: string;
  regulation?: string;
  crmaRelevance: string;
}

// ---------------------------------------------------------------------------
// Enterprises
// ---------------------------------------------------------------------------

export interface Enterprise {
  name: string;
  sector: string;
  revenue: string;
  employees: string;
  ceo: string;
  shareholding: string;
  listed: string;
  founded?: string;
  hq?: string;
  website?: string;
}

export interface EUEnterprise {
  name: string;
  role?: string;
  description?: string;
  africaRelevance?: string;
  relevance?: string;
}

// ---------------------------------------------------------------------------
// Billionaires
// ---------------------------------------------------------------------------

export interface Billionaire {
  name: string;
  fortune: string;
  source: string;
  companies: string;
  age?: string;
  education?: string;
  bio?: string;
}

// ---------------------------------------------------------------------------
// Leaders & Governance
// ---------------------------------------------------------------------------

export interface HeadOfState {
  name: string;
  since?: string;
  party?: string;
  nextElection?: string;
}

export interface HeadOfGov {
  name: string;
  since?: string;
  party?: string;
}

export interface Minister {
  portfolio: string;
  name: string;
}

export interface InstitutionalPosition {
  name: string;
  institution?: string;
  since?: string;
  party?: string;
}

export interface Leaders {
  headOfState?: HeadOfState;
  headOfGov?: HeadOfGov;
  keyMinisters?: Minister[];
  centralBankGov?: InstitutionalPosition;
  investmentAgency?: InstitutionalPosition;
  miningAuthority?: InstitutionalPosition;
  customs?: InstitutionalPosition;
  ambassadorFrance?: InstitutionalPosition;
  ambassadorFromFrance?: InstitutionalPosition;
  unRepresentative?: InstitutionalPosition;
  vicePresident?: InstitutionalPosition;
  [key: string]: unknown;
}

// ---------------------------------------------------------------------------
// Contacts
// ---------------------------------------------------------------------------

export interface Contacts {
  chambers?: string[];
  lawFirms?: string[];
  big4?: string[];
  investmentBanks?: string[];
  businessFrance?: string;
  afd?: string;
  patronat?: string;
  diaspora?: string;
  bpifrance?: string;
  [key: string]: unknown;
}

// ---------------------------------------------------------------------------
// Universities
// ---------------------------------------------------------------------------

export interface University {
  name: string;
  city: string;
  students: string;
  specialties: string;
  ranking?: string;
}

// ---------------------------------------------------------------------------
// Logistics & Infrastructure
// ---------------------------------------------------------------------------

export interface Port {
  name: string;
  capacity: string;
  operator: string;
  draft: string;
  note?: string;
}

export interface Airport {
  name: string;
  traffic: string;
  freight?: string;
}

export interface Logistics {
  ports?: Port[];
  airports?: Airport[];
  railway?: string;
  roads?: string;
  corridors?: string;
  containerCost?: string;
  customsDelay?: string;
  maritimeConnectivity?: string;
  logisticZones?: string[];
}

// ---------------------------------------------------------------------------
// Trade & Investment
// ---------------------------------------------------------------------------

export interface TradeItem {
  product: string;
  value: string;
  destination?: string;
  origin?: string;
}

export interface FDI {
  stock?: string;
  flow?: string;
  topInvestors?: string[];
}

export interface TaxRegime {
  is?: string;
  tva?: string;
  conventions?: string;
}

export interface Trade {
  topExports?: TradeItem[];
  topImports?: TradeItem[];
  tradeBalance?: string;
  fdiInward?: FDI;
  fdiOutward?: string;
  tradeAgreements?: string | string[];
  freeZones?: string;
  profitRepatriation?: string;
  bit?: string;
  taxRegime?: TaxRegime;
}

// ---------------------------------------------------------------------------
// Demographics
// ---------------------------------------------------------------------------

export interface Demographics {
  totalPopulation?: string;
  growthRate?: string;
  urbanPopulation?: string;
  unemployment?: string;
  youthUnemployment?: string;
  hdi?: string;
  lifeExpectancy?: string;
  ageStructure?: string;
  middleClass?: string;
  millionaires?: string;
  diasporaFrance?: string;
  diaspora?: string;
  languages?: string;
  literacy?: string;
  laborForce?: string;
  miningEmployment?: string;
  lobitoCorridorRole?: string;
  euTrade2024?: string;
  povertyRate?: string;
  gdpPerCapitaNominal?: string;
  transitPolitique?: string;
}

// ---------------------------------------------------------------------------
// Risk & Opportunity Scoring
// ---------------------------------------------------------------------------

export interface RiskDimension {
  score: number;
  comment: string;
}

export interface RiskScore {
  political?: RiskDimension;
  security?: RiskDimension;
  economic?: RiskDimension;
  regulatory?: RiskDimension;
  logistic?: RiskDimension;
  miningOpportunity?: RiskDimension;
  industrialOpportunity?: RiskDimension;
  digitalOpportunity?: RiskDimension;
  overallRisk: number;
  overallOpportunity: number;
  recommendation: string;
}

// ---------------------------------------------------------------------------
// Industries & Economic Sectors
// ---------------------------------------------------------------------------

export interface KeyIndustry {
  name: string;
  description: string;
  share?: string;
}

export interface SEZ {
  name: string;
  location: string;
  advantages: string;
}

export interface Banking {
  mainBanks?: string[];
  totalAssets?: string;
  bancarisation?: string;
}

export interface Telecom {
  operators?: string[];
  mobilePenetration?: string;
  internetPenetration?: string;
}

export interface Energy {
  mix?: string;
  installedCapacity?: string;
  renewableProjects?: string;
}

export interface Industries {
  gdpBySector?: Record<string, number>;
  keyIndustries?: KeyIndustry[];
  sez?: SEZ[];
  majorProjects?: string[];
  banking?: Banking;
  telecom?: Telecom;
  energy?: Energy;
}

// ---------------------------------------------------------------------------
// Country (core entity)
// ---------------------------------------------------------------------------

export interface GDPGrowth {
  year: string;
  value: number;
}

export interface CriticalMineralDemand {
  name?: string;
  detail?: string;
}

export interface Gigafactory {
  name: string;
  location: string;
  capacity: string;
  status: string;
  operator: string;
}

export interface CRMAInstitution {
  name: string;
  role: string;
  contact: string;
}

export interface Country {
  id: string;
  name: string;
  officialName?: string;
  flag?: string;
  region: 'africa' | 'eu';
  capital: string;
  area?: string;
  population: string;
  density?: string;
  gdpNominal: string;
  gdpPPP?: string;
  gdpPerCapita?: string;
  gdpGrowth?: GDPGrowth[];
  inflation?: string;
  debtToGDP?: string;
  tradeBalance?: string;
  currency: string;
  exchangeRateEUR?: string;
  exchangeRateUSD?: string;
  corruptionIndex?: string;
  easeBusiness?: string;
  politicalStability?: string;
  riskScore: number;
  riskLabel?: string;
  recommendation?: string;
  timezone?: string;
  languages?: string;
  religions?: string;
  memberships?: string[];
  minerals?: Mineral[];
  enterprises?: Enterprise[];
  billionaires?: Billionaire[];
  leaders?: Leaders;
  contacts?: Contacts;
  universities?: University[];
  logistics?: Logistics;
  trade?: Trade;
  demographics?: Demographics;
  risks?: RiskScore;
  industries?: Industries;
  // EU-specific fields
  criticalMineralsDemand?: (string | CriticalMineralDemand)[];
  keyConsumingIndustries?: (string | { name: string })[];
  euCrmaRole?: string;
  keyEnterprisesForCorridor?: (string | EUEnterprise)[];
  crmaContact?: string;
  tradeAfricaHighlights?: string;
  gigafactories?: Gigafactory[];
  crmaInstitutions?: CRMAInstitution[];
  // Extra education fields
  sciPublications?: string;
  patents?: string;
  literacyRate?: string;
  higherEducationRate?: string;
}

// ---------------------------------------------------------------------------
// Global / Dashboard Aggregates
// ---------------------------------------------------------------------------

export interface TopMineral {
  name: string;
  price: string;
  trend: string;
  topProducers: string[];
  crmaStatus: string;
  euDemand: string;
}

export interface Alert {
  text: string;
  level: 'red' | 'orange' | 'green';
}

export interface TopEnterprise {
  name: string;
  country: string;
  sector: string;
  marketCap: string;
}

export interface CorridorStats {
  totalCountries: number;
  africaCountries: number;
  euCountries: number;
  totalPopulation: string;
  corridorGDP: string;
  tradeEUAfrica: string;
  fdiInward: string;
  totalEnterprises: string;
  totalContacts: string;
  totalUniversities: string;
}

export interface GlobalData {
  corridorStats: CorridorStats;
  topMinerals: TopMineral[];
  alerts: Alert[];
  topEnterprises: TopEnterprise[];
}

// ---------------------------------------------------------------------------
// UI Helpers
// ---------------------------------------------------------------------------

export interface ComparisonIndicator {
  key: string;
  label: string;
  extract: (c: Country) => string | undefined;
}

export interface TabDef {
  id: string;
  label: string;
}

export interface SearchItem {
  id: string;
  name: string;
  type: string;
  country?: string;
}
