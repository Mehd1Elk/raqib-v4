// DIWANE Art Intelligence Module - TypeScript Interfaces
// Covers 49 countries (22 Africa + 27 EU) with art market data

// ---------------------------------------------------------------------------
// Artists (enriched with style, forgery risk, collection size)
// ---------------------------------------------------------------------------

export interface DiwaneArtist {
  name: string;
  born?: string;
  died?: string;
  medium: string;
  movement?: string;
  auctionRecord?: string;
  auctionRecordPriceUsd?: number;
  galleries?: string[];
  collections?: string[];
  significance: string;
  // NEW — enriched fields
  styleDescription?: string;
  techniques?: string[];
  forgeryRisk?: string;
  forgeryNotes?: string;
  estimatedCollectionSize?: string;
  estimatedCollectionValue?: string;
  isEmerging?: boolean;
  isTopRated?: boolean;
  emergingSince?: string;
  marketTrend?: string;
  priceRangeLow?: string;
  priceRangeHigh?: string;
  biography?: string;
  website?: string;
  instagram?: string;
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
// Auction Houses (enriched)
// ---------------------------------------------------------------------------

export interface DiwaneAuctionHouse {
  name: string;
  city: string;
  type?: string;
  specialty?: string;
  founded?: string;
  annualVolume?: string;
  majorSales?: string[];
  keyDepartments?: string[];
  website?: string;
  presenceCountries?: string[];
  notableRecords?: string[];
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
// Collectors (enriched)
// ---------------------------------------------------------------------------

export interface DiwaneCollector {
  name: string;
  type?: string;
  focus?: string;
  collectionSize?: string;
  collectionValueEstimate?: string;
  publicAccess?: boolean;
  foundationName?: string;
  notableAcquisitions?: string[];
  biography?: string;
  influenceLevel?: string;
}

// ---------------------------------------------------------------------------
// Grey Market (NEW)
// ---------------------------------------------------------------------------

export interface DiwaneGreyMarket {
  forgeryPrevalence?: string;
  mainRisks?: string;
  knownForgeryCases?: string[];
  stolenArtIssues?: string;
  illicitTrafficking?: string;
  moneyLaunderingRisk?: string;
  unregulatedSalesEstimate?: string;
  certificationBodies?: string[];
  scientificAnalysisLabs?: string[];
  noosRelevance?: string;
  restitutionIssues?: string;
  dueDiligenceLevel?: string;
}

// ---------------------------------------------------------------------------
// Art Experts (NEW)
// ---------------------------------------------------------------------------

export interface DiwaneArtExpert {
  name: string;
  title?: string;
  institution?: string;
  specialty?: string;
  expertiseType?: string;
  credentials?: string[];
  notableWork?: string;
  publications?: string[];
  contact?: string;
  website?: string;
}

// ---------------------------------------------------------------------------
// Lombard Credit (NEW)
// ---------------------------------------------------------------------------

export interface DiwaneLombardCredit {
  status?: string;
  ltvRatio?: string;
  typicalRate?: string;
  minCollateral?: string;
  eligibleArtTypes?: string[];
  banks?: string[];
  bankDetails?: { name: string; contact?: string; conditions?: string }[];
  privateLenders?: string[];
  freeports?: string[];
  insuranceProviders?: string[];
  artFunds?: string[];
  taxIncentives?: string;
  marketSizeEstimate?: string;
  regulatoryFramework?: string;
  diwaneOpportunity?: string;
}

// ---------------------------------------------------------------------------
// Art Magazines (NEW)
// ---------------------------------------------------------------------------

export interface DiwaneArtMagazine {
  name: string;
  type?: string;
  frequency?: string;
  language?: string;
  focus?: string;
  founded?: string;
  circulation?: string;
  website?: string;
  editor?: string;
  influenceLevel?: string;
}

// ---------------------------------------------------------------------------
// Art Events 2026/2027 (NEW)
// ---------------------------------------------------------------------------

export interface DiwaneArtEvent {
  name: string;
  city: string;
  type?: string;
  dateStart?: string;
  dateEnd?: string;
  year?: number;
  frequency?: string;
  venue?: string;
  expectedGalleries?: number;
  expectedVisitors?: string;
  focus?: string;
  website?: string;
  ticketPrice?: string;
  significance?: string;
  isConfirmed?: boolean;
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
// Country Art Data (core entity — enriched)
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
  // NEW fields
  greyMarket?: DiwaneGreyMarket;
  artExperts?: DiwaneArtExpert[];
  lombardCredit?: DiwaneLombardCredit;
  artMagazines?: DiwaneArtMagazine[];
  artEvents?: DiwaneArtEvent[];
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
