// RAQIB DIWANE — Art Market Intelligence Module - TypeScript Interfaces
// Covers 49 countries (22 Africa + 27 EU) with art market data

// ---------------------------------------------------------------------------
// Artists
// ---------------------------------------------------------------------------

export interface Artist {
  name: string;
  country: string;
  medium: string;
  birthYear?: string;
  deathYear?: string;
  movement?: string;
  auctionRecord?: string;
  auctionRecordYear?: string;
  auctionHouse?: string;
  notableWorks?: string[];
  represented?: string[];
  bio?: string;
}

// ---------------------------------------------------------------------------
// Galleries
// ---------------------------------------------------------------------------

export interface Gallery {
  name: string;
  city: string;
  founded?: string;
  specialty?: string;
  artists?: string[];
  fairsAttended?: string[];
  website?: string;
}

// ---------------------------------------------------------------------------
// Museums & Institutions
// ---------------------------------------------------------------------------

export interface Museum {
  name: string;
  city: string;
  type: string;
  collection?: string;
  founded?: string;
  annualVisitors?: string;
  notableHoldings?: string[];
}

// ---------------------------------------------------------------------------
// Art Fairs & Biennales
// ---------------------------------------------------------------------------

export interface ArtFair {
  name: string;
  city: string;
  frequency: string;
  founded?: string;
  galleries?: number;
  visitors?: string;
  focus?: string;
}

// ---------------------------------------------------------------------------
// Auction Data
// ---------------------------------------------------------------------------

export interface AuctionRecord {
  artist: string;
  title: string;
  price: string;
  year: string;
  house: string;
  medium?: string;
}

// ---------------------------------------------------------------------------
// Art Market Metrics
// ---------------------------------------------------------------------------

export interface ArtMarketMetrics {
  marketSize?: string;
  globalRank?: number;
  auctionVolume?: string;
  galleryCount?: number;
  museumCount?: number;
  artFairsCount?: number;
  publicFunding?: string;
  taxIncentives?: string;
  exportRegulation?: string;
  copyrightProtection?: string;
}

// ---------------------------------------------------------------------------
// Cultural Heritage
// ---------------------------------------------------------------------------

export interface CulturalHeritage {
  unescoSites?: number;
  intangibleHeritage?: string[];
  traditionalArts?: string[];
  artMovements?: string[];
  culturalPolicy?: string;
}

// ---------------------------------------------------------------------------
// Art Education
// ---------------------------------------------------------------------------

export interface ArtSchool {
  name: string;
  city: string;
  type: string;
  founded?: string;
  programs?: string[];
  notableAlumni?: string[];
}

// ---------------------------------------------------------------------------
// Digital Art & NFT
// ---------------------------------------------------------------------------

export interface DigitalArtScene {
  nftMarketSize?: string;
  platforms?: string[];
  notableArtists?: string[];
  regulation?: string;
}

// ---------------------------------------------------------------------------
// Country (Art Market)
// ---------------------------------------------------------------------------

export interface DiwaneCountry {
  id: string;
  name: string;
  nameAr?: string;
  region: 'africa' | 'eu';
  capital: string;
  population?: string;
  language?: string;
  currency?: string;
  artMarket: ArtMarketMetrics;
  topArtists?: Artist[];
  galleries?: Gallery[];
  museums?: Museum[];
  artFairs?: ArtFair[];
  auctionRecords?: AuctionRecord[];
  culturalHeritage?: CulturalHeritage;
  artSchools?: ArtSchool[];
  digitalArt?: DigitalArtScene;
  recommendation?: string;
}

// ---------------------------------------------------------------------------
// Search
// ---------------------------------------------------------------------------

export interface DiwaneSearchItem {
  id: string;
  name: string;
  type: 'country' | 'artist' | 'gallery' | 'movement' | 'fair';
  country?: string;
}

// ---------------------------------------------------------------------------
// Global Data
// ---------------------------------------------------------------------------

export interface DiwaneStats {
  totalCountries: number;
  totalArtists: number;
  totalGalleries: number;
  totalMuseums: number;
  totalFairs: number;
  globalMarketSize: string;
}

export interface DiwaneAlert {
  text: string;
  type: 'red' | 'orange' | 'green';
}

export interface DiwaneGlobalData {
  stats: DiwaneStats;
  alerts: DiwaneAlert[];
  topAuctions: AuctionRecord[];
}

// ---------------------------------------------------------------------------
// Comparison
// ---------------------------------------------------------------------------

export interface ComparisonIndicator {
  key: string;
  label: string;
  unit?: string;
}

// ---------------------------------------------------------------------------
// Tabs
// ---------------------------------------------------------------------------

export interface DiwaneTab {
  key: string;
  label: string;
}
