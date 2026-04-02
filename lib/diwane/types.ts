// DIWANE Art Intelligence Module - TypeScript Interfaces
// Covers 49 countries (22 Africa + 27 EU) with art market data

// ---------------------------------------------------------------------------
// Artists
// ---------------------------------------------------------------------------

export interface DiwaneArtist {
  name: string;
  born?: string;
  died?: string;
  medium: string;
  movement?: string;
  auctionRecord?: string;
  galleries?: string[];
  collections?: string[];
  significance: string;
}

// ---------------------------------------------------------------------------
// Galleries
// ---------------------------------------------------------------------------

export interface DiwaneGallery {
  name: string;
  city: string;
  founded?: string;
  director?: string;
  specialty?: string;
  artists?: string[];
  website?: string;
  fairs?: string[];
}

// ---------------------------------------------------------------------------
// Museums
// ---------------------------------------------------------------------------

export interface DiwaneMuseum {
  name: string;
  city: string;
  type?: string;
  collection?: string;
  director?: string;
  visitors?: string;
  website?: string;
}

// ---------------------------------------------------------------------------
// Auction Houses
// ---------------------------------------------------------------------------

export interface DiwaneAuctionHouse {
  name: string;
  city: string;
  specialty?: string;
  majorSales?: string[];
}

// ---------------------------------------------------------------------------
// Art Fairs
// ---------------------------------------------------------------------------

export interface DiwaneArtFair {
  name: string;
  city: string;
  frequency?: string;
  significance?: string;
}

// ---------------------------------------------------------------------------
// Art Finance
// ---------------------------------------------------------------------------

export interface DiwaneArtFinance {
  institution: string;
  type: string;
  services?: string;
  contact?: string;
}

// ---------------------------------------------------------------------------
// Regulation
// ---------------------------------------------------------------------------

export interface DiwaneRegulation {
  vatRate?: string;
  droitDeSuite?: string;
  exportRules?: string;
  importRules?: string;
  heritageProtection?: string;
  antiMoneyLaundering?: string;
  culturalRestitution?: string;
  taxOnSales?: string;
}

// ---------------------------------------------------------------------------
// Collectors
// ---------------------------------------------------------------------------

export interface DiwaneCollector {
  name: string;
  type?: string;
  focus?: string;
  collectionSize?: string;
  publicAccess?: boolean;
}

// ---------------------------------------------------------------------------
// Art Education
// ---------------------------------------------------------------------------

export interface DiwaneArtEducation {
  name: string;
  city: string;
  type?: string;
}

// ---------------------------------------------------------------------------
// Country Art Data (core entity)
// ---------------------------------------------------------------------------

export interface DiwaneCountryArt {
  id: string;
  name: string;
  flag?: string;
  region: 'africa' | 'eu';
  marketOverview?: string;
  marketSize?: string;
  artMovements?: string[];
  artists: DiwaneArtist[];
  galleries: DiwaneGallery[];
  museums: DiwaneMuseum[];
  auctionHouses?: DiwaneAuctionHouse[];
  artFairs?: DiwaneArtFair[];
  artFinance?: DiwaneArtFinance[];
  regulation?: DiwaneRegulation;
  collectors?: DiwaneCollector[];
  artEducation?: DiwaneArtEducation[];
}

// ---------------------------------------------------------------------------
// Global / Dashboard Aggregates
// ---------------------------------------------------------------------------

export interface DiwaneAlert {
  text: string;
  level: 'red' | 'orange' | 'green';
}

export interface DiwaneTopArtist {
  name: string;
  country: string;
  medium: string;
  auctionRecord: string;
}

export interface DiwaneTopAuction {
  artist: string;
  title: string;
  price: string;
  house: string;
  date?: string;
}

export interface DiwaneMarketTrend {
  label: string;
  value: string;
  trend: string;
}

export interface DiwaneStats {
  totalCountries: number;
  africaCountries: number;
  euCountries: number;
  totalArtists: string;
  totalGalleries: string;
  totalMuseums: string;
  globalArtMarket: string;
  africanArtMarket: string;
  euArtMarket: string;
}

export interface DiwaneGlobalData {
  stats: DiwaneStats;
  topArtists: DiwaneTopArtist[];
  topAuctions: DiwaneTopAuction[];
  alerts: DiwaneAlert[];
  marketTrends: DiwaneMarketTrend[];
}

// ---------------------------------------------------------------------------
// UI Helpers
// ---------------------------------------------------------------------------

export interface DiwaneTabDef {
  id: string;
  label: string;
}

export interface DiwaneSearchItem {
  id: string;
  name: string;
  type: string;
  country?: string;
}

// --- BACKWARD COMPATIBILITY TYPE ALIASES ---
// Maps old type names to new Diwane-prefixed versions
export type Artist = DiwaneArtist;
export type Gallery = DiwaneGallery;
export type Museum = DiwaneMuseum;
export type ArtFair = DiwaneArtFair;
export type AuctionRecord = DiwaneTopAuction;
export type DiwaneCountry = DiwaneCountryArt;
export type DiwaneTab = DiwaneTabDef;
export interface ComparisonIndicator {
  id: string;
  label: string;
  icon: string;
}
export interface ArtMarketMetrics {
  marketSize?: string;
  globalRank?: number;
  growth?: string;
  mainAuctionHouses?: string[];
}
export interface CulturalHeritage {
  unescoSites?: number;
  intangibleHeritage?: string[];
  restitutionStatus?: string;
}
export interface ArtSchool {
  name: string;
  city: string;
  type?: string;
  notable?: string;
}
export interface DigitalArtScene {
  nftPresence?: string;
  digitalPlatforms?: string[];
  techHubs?: string[];
}
