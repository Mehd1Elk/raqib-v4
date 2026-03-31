import { C } from '@/lib/constants';

/** Style de carte Mapbox clair / ivory */
export const MAP_STYLE = 'mapbox://styles/mapbox/light-v11';

/** Centre par defaut : Atlantique (entre Afrique et Ameriques) */
export const DEFAULT_CENTER = { longitude: -10, latitude: 20 };
export const DEFAULT_ZOOM = 2;

/** Les 22 pays du Corridor Atlantique (Tanger -> Luanda) */
export const CORRIDOR_COUNTRIES = [
  'MAR', 'MRT', 'SEN', 'GMB', 'GNB', 'GIN', 'SLE', 'LBR',
  'CIV', 'GHA', 'TGO', 'BEN', 'NGA', 'CMR', 'GNQ', 'GAB',
  'COG', 'COD', 'AGO', 'CPV', 'STP', 'BRA',
] as const;

/** Noms francais des pays du corridor */
export const CORRIDOR_NAMES: Record<string, string> = {
  MAR: 'Maroc', MRT: 'Mauritanie', SEN: 'Senegal', GMB: 'Gambie',
  GNB: 'Guinee-Bissau', GIN: 'Guinee', SLE: 'Sierra Leone', LBR: 'Liberia',
  CIV: "Cote d'Ivoire", GHA: 'Ghana', TGO: 'Togo', BEN: 'Benin',
  NGA: 'Nigeria', CMR: 'Cameroun', GNQ: 'Guinee equatoriale', GAB: 'Gabon',
  COG: 'Congo', COD: 'RD Congo', AGO: 'Angola', CPV: 'Cap-Vert',
  STP: 'Sao Tome-et-Principe', BRA: 'Bresil',
};

/** Palette de couleurs pour echelle choropleth */
export const CHOROPLETH_SCALE = [
  '#F0EBDE', // parchment (min)
  '#D4B662', // gold light
  '#B8963E', // gold
  '#8C6E2A', // gold dark
  '#3D5E8C', // sapphire
  '#162B20', // cg green (max)
] as const;

/** Couleurs entites pour les pins */
export const ENTITY_PIN_COLORS: Record<string, string> = {
  noos: C.sapphire,
  aelya: C.emerald,
  myne: C.violet,
  burhan: C.gold,
  yrknown: C.amber,
  diwane: C.bordeaux,
  alguesov: C.teal,
  amana: C.olive,
  cg: C.cgGreen,
  cercle: C.cgGold,
};

/** Villes de l'Arc Conquete 2026 */
export const ARC_CITIES = [
  { name: 'Tanger', lat: 35.7595, lng: -5.8340 },
  { name: 'Casablanca', lat: 33.5731, lng: -7.5898 },
  { name: 'Dakar', lat: 14.6928, lng: -17.4467 },
  { name: 'Abidjan', lat: 5.3600, lng: -4.0083 },
  { name: 'Lagos', lat: 6.5244, lng: 3.3792 },
  { name: 'Douala', lat: 4.0511, lng: 9.7679 },
  { name: 'Libreville', lat: 0.4162, lng: 9.4673 },
  { name: 'Kinshasa', lat: -4.4419, lng: 15.2663 },
  { name: 'Luanda', lat: -8.8390, lng: 13.2894 },
] as const;
