// DIWANE — Art Sovereignty & Crédit Lombard — TypeScript Interfaces

// ---------------------------------------------------------------------------
// Art Market Overview
// ---------------------------------------------------------------------------

export interface ArtMarketStats {
  totalSize: string;
  growth: string;
  onlineShare: string;
  auctionShare: string;
  privateShare: string;
  topSegments?: { name: string; share: string }[];
}

export interface ArtMovement {
  name: string;
  period: string;
  keyArtists: string[];
  description?: string;
}

export interface ArtEvent {
  name: string;
  type: 'fair' | 'biennial' | 'festival' | 'auction' | 'exhibition';
  city: string;
  date?: string;
  significance?: string;
}

// ---------------------------------------------------------------------------
// Artists
// ---------------------------------------------------------------------------

export interface Artist {
  name: string;
  medium: string;
  born?: string;
  died?: string;
  nationality?: string;
  movement?: string;
  record?: string;
  recordYear?: string;
  galleries?: string[];
  museums?: string[];
  bio?: string;
}

// ---------------------------------------------------------------------------
// Galleries
// ---------------------------------------------------------------------------

export interface Gallery {
  name: string;
  city: string;
  country?: string;
  director?: string;
  specialty: string;
  fairs?: string[];
  founded?: string;
  artists?: string[];
  website?: string;
}

// ---------------------------------------------------------------------------
// Museums & Institutions
// ---------------------------------------------------------------------------

export interface Museum {
  name: string;
  type: 'museum' | 'foundation' | 'cultural-center' | 'institute';
  city: string;
  country?: string;
  collection?: string;
  director?: string;
  annualVisitors?: string;
  founded?: string;
  specialties?: string[];
}

// ---------------------------------------------------------------------------
// Auctions
// ---------------------------------------------------------------------------

export interface AuctionRecord {
  artist: string;
  title: string;
  price: string;
  house: string;
  date: string;
  medium?: string;
}

export interface AuctionHouse {
  name: string;
  hq: string;
  annualVolume?: string;
  specialties?: string[];
  founded?: string;
}

export interface AuctionStats {
  totalVolume: string;
  growth: string;
  averageLot?: string;
  topRecords?: AuctionRecord[];
  activeHouses?: AuctionHouse[];
  trendsByMedium?: { medium: string; trend: string; volume?: string }[];
}

// ---------------------------------------------------------------------------
// Collectors & Patrons
// ---------------------------------------------------------------------------

export interface Collector {
  name: string;
  type: 'private' | 'institutional' | 'corporate' | 'sovereign';
  focus: string;
  collectionSize?: string;
  notableWorks?: string[];
  foundation?: string;
  city?: string;
  country?: string;
}

// ---------------------------------------------------------------------------
// Art Finance
// ---------------------------------------------------------------------------

export interface LombardCredit {
  provider: string;
  ltvRange: string;
  minValue?: string;
  interestRange?: string;
  collateralTypes?: string[];
}

export interface ArtFund {
  name: string;
  manager: string;
  aum?: string;
  strategy?: string;
  vintage?: string;
}

export interface FreePort {
  name: string;
  location: string;
  capacity?: string;
  operator?: string;
  services?: string[];
}

export interface ArtFinanceData {
  lombardCredits?: LombardCredit[];
  artFunds?: ArtFund[];
  insurance?: { provider: string; coverage: string; specialty?: string }[];
  freePorts?: FreePort[];
  taxRegime?: { type: string; rate: string; details?: string }[];
}

// ---------------------------------------------------------------------------
// Regulation
// ---------------------------------------------------------------------------

export interface RegulationItem {
  domain: string;
  law?: string;
  description: string;
  authority?: string;
  status?: 'active' | 'pending' | 'proposed';
}

export interface RegulationData {
  patrimony?: RegulationItem[];
  exportImport?: RegulationItem[];
  droitDeSuite?: RegulationItem[];
  aml?: RegulationItem[];
  restitution?: RegulationItem[];
}

// ---------------------------------------------------------------------------
// Authentication & Forgery
// ---------------------------------------------------------------------------

export interface AuthenticationMethod {
  name: string;
  type: 'scientific' | 'stylistic' | 'provenance' | 'digital' | 'ai';
  provider?: string;
  description?: string;
  accuracy?: string;
}

export interface ForgeryCase {
  title: string;
  artist?: string;
  year?: string;
  details: string;
  outcome?: string;
}

export interface AuthenticationData {
  methods?: AuthenticationMethod[];
  forgeryCases?: ForgeryCase[];
  certificationBodies?: { name: string; role: string; country?: string }[];
  noosIntegration?: { feature: string; description: string }[];
}

// ---------------------------------------------------------------------------
// EIGEN Integration
// ---------------------------------------------------------------------------

export interface EigenBrick {
  id: string;
  name: string;
  artApplication: string;
  features: string[];
  status?: 'active' | 'beta' | 'planned';
}

// ---------------------------------------------------------------------------
// Art Country (main entity)
// ---------------------------------------------------------------------------

export interface ArtCountry {
  id: string;
  name: string;
  flag?: string;
  region: string;
  artMarket?: ArtMarketStats;
  movements?: ArtMovement[];
  events?: ArtEvent[];
  artists?: Artist[];
  galleries?: Gallery[];
  museums?: Museum[];
  auctions?: AuctionStats;
  collectors?: Collector[];
  artFinance?: ArtFinanceData;
  regulation?: RegulationData;
  authentication?: AuthenticationData;
  eigenBricks?: EigenBrick[];
}

// ---------------------------------------------------------------------------
// Diwane-prefixed aliases for data.ts compatibility
// ---------------------------------------------------------------------------
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type DiwaneGlobalData   = any;
export type DiwaneCountryArt   = any;
export type DiwaneArtist       = any;
export type DiwaneGallery      = any;
export type DiwaneMuseum       = any;
export type DiwaneAuctionHouse = any;
export type DiwaneArtFair      = any;
export type DiwaneArtFinance   = any;
export type DiwaneRegulation   = any;
export type DiwaneCollector    = any;
export type DiwaneArtEducation = any;
export type DiwaneTabDef       = any;
export type DiwaneSearchItem   = any;
