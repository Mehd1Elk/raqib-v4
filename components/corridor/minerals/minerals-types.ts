export interface CorridorMineralCountry {
  id: string;
  name: string;
  flag: string;
  minerals: string[];
  production: string;
  reserves: string;
  keyPlayer: string;
  crmaRelevance: string;
  risk: number;
  lat: number;
  lng: number;
  tradeEU: string;
  opportunity: string;
  chineseInv: string;
  westernInv: string;
  mineralDiversity: number;
}

export interface EUIndustry {
  id: string;
  name: string;
  minerals: string[];
  demand2030: string;
  euCompanies: string[];
  growth: string;
  crmaImpact: string;
  supplyRisk: number;
  corridorSuppliers: string;
  color: string;
}

export interface SupplyChainStage {
  stage: string;
  description: string;
  actors: string;
  eigenRole: string;
  bottleneck: string;
  valueCapture: string;
  value: string;
}

export interface GeopoliticalRisk {
  event: string;
  date: string;
  impact: string;
  severity: number;
  eigenResponse: string;
  category: string;
}

export interface ExchangeMineral {
  mineral: string;
  price: string;
  change: string;
  trend: 'up' | 'down' | 'stable';
  supply: string;
  corridorSource: string;
  category: string;
}

export interface MarketSize {
  value: string;
  label: string;
  desc: string;
}

export interface EigenBriqueIntegration {
  brique: string;
  role: string;
  price: string;
  color: string;
}

export interface MVACHub {
  city: string;
  country: string;
  flag: string;
  focus: string;
  rationale: string;
  capex: string;
  type: string;
}

export interface VentureModel {
  name: string;
  arabic: string;
  meaning: string;
  tagline: string;
  thesis: string;
  tam: MarketSize;
  sam: MarketSize;
  som: MarketSize;
  eigenIntegration: EigenBriqueIntegration[];
  hubs: MVACHub[];
  makerspaces: string;
  trojanHorse: string;
  cascadeEU: string;
}

export interface EigenBrique {
  name: string;
  desc: string;
  color: string;
}

export interface StatCard {
  value: string;
  label: string;
  sub: string;
}

export interface ForcingFunction {
  name: string;
  fullName?: string;
  date: string;
  desc: string;
  impact: string;
  status: string;
}

export interface MineralsTab {
  id: string;
  label: string;
}
