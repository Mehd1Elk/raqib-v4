import type {
  DiwaneCountry,
  DiwaneGlobalData,
  DiwaneSearchItem,
  ComparisonIndicator,
  DiwaneTab,
} from './types';

// ---------------------------------------------------------------------------
// GLOBAL DATA
// ---------------------------------------------------------------------------

export const GLOBAL_DATA: DiwaneGlobalData = {
  stats: {
    totalCountries: 49,
    totalArtists: 500,
    totalGalleries: 1200,
    totalMuseums: 800,
    totalFairs: 120,
    globalMarketSize: '$67.8 Mds',
  },
  alerts: [
    { text: 'Art Basel 2026 — Record de ventes $4.2 Mds', type: 'green' },
    { text: 'Frieze Seoul — Expansion marché asiatique +18%', type: 'green' },
    { text: '1-54 Marrakech — Art contemporain africain en hausse +35%', type: 'green' },
    { text: 'Christie\'s — NFT market correction -42% YoY', type: 'red' },
    { text: 'Sotheby\'s — Record Basquiat $110.5M privé', type: 'orange' },
    { text: 'Biennale Venise 2026 — Pavillon Maroc sélectionné', type: 'green' },
    { text: 'Bonhams — Art africain contemporain +28% enchères', type: 'green' },
    { text: 'Dak\'Art 2026 — Biennale reportée à novembre', type: 'orange' },
  ],
  topAuctions: [
    { artist: 'Jean-Michel Basquiat', title: 'Untitled (1982)', price: '$110.5M', year: '2017', house: "Sotheby's", medium: 'Acrylique sur toile' },
    { artist: 'Amedeo Modigliani', title: 'Nu couché', price: '$170.4M', year: '2015', house: "Christie's", medium: 'Huile sur toile' },
    { artist: 'El Anatsui', title: 'Earth\'s Skin', price: '$1.5M', year: '2023', house: "Christie's", medium: 'Installation aluminium' },
    { artist: 'Julie Mehretu', title: 'Retopistics', price: '$9.4M', year: '2023', house: "Sotheby's", medium: 'Encre et acrylique' },
    { artist: 'Njideka Akunyili Crosby', title: 'Bush Babies', price: '$3.4M', year: '2017', house: "Christie's", medium: 'Technique mixte' },
  ],
};

// ---------------------------------------------------------------------------
// TABS
// ---------------------------------------------------------------------------

export const COUNTRY_TABS: DiwaneTab[] = [
  { key: 'overview', label: 'Vue d\'ensemble' },
  { key: 'artists', label: 'Artistes' },
  { key: 'galleries', label: 'Galeries' },
  { key: 'museums', label: 'Musées' },
  { key: 'fairs', label: 'Foires & Biennales' },
  { key: 'auctions', label: 'Enchères' },
  { key: 'heritage', label: 'Patrimoine' },
  { key: 'education', label: 'Écoles d\'art' },
  { key: 'digital', label: 'Art numérique' },
  { key: 'market', label: 'Marché' },
];

export const EU_TABS: DiwaneTab[] = [
  { key: 'overview', label: 'Vue d\'ensemble' },
  { key: 'artists', label: 'Artistes' },
  { key: 'galleries', label: 'Galeries' },
  { key: 'museums', label: 'Musées' },
  { key: 'fairs', label: 'Foires & Biennales' },
  { key: 'auctions', label: 'Enchères' },
  { key: 'market', label: 'Marché' },
];

// ---------------------------------------------------------------------------
// COMPARISON
// ---------------------------------------------------------------------------

export const COMPARISON_INDICATORS: ComparisonIndicator[] = [
  { key: 'marketSize', label: 'Taille du marché', unit: '' },
  { key: 'globalRank', label: 'Rang mondial', unit: '' },
  { key: 'galleryCount', label: 'Galeries', unit: '' },
  { key: 'museumCount', label: 'Musées', unit: '' },
  { key: 'artFairsCount', label: 'Foires d\'art', unit: '' },
  { key: 'auctionVolume', label: 'Volume enchères', unit: '' },
  { key: 'publicFunding', label: 'Financement public', unit: '' },
  { key: 'taxIncentives', label: 'Incitations fiscales', unit: '' },
  { key: 'unescoSites', label: 'Sites UNESCO', unit: '' },
  { key: 'topArtist', label: 'Artiste phare', unit: '' },
];

// ---------------------------------------------------------------------------
// AFRICA COUNTRIES — ART MARKET DATA
// ---------------------------------------------------------------------------

export const AFRICA_COUNTRIES: DiwaneCountry[] = [
  {
    id: 'MA', name: 'Maroc', nameAr: 'المغرب', region: 'africa', capital: 'Rabat', population: '37.8M', language: 'Arabe, Français', currency: 'MAD',
    artMarket: { marketSize: '$180M', globalRank: 35, galleryCount: 85, museumCount: 42, artFairsCount: 6, auctionVolume: '$12M', publicFunding: 'Élevé', taxIncentives: 'Zones franches culturelles', exportRegulation: 'Modérée', copyrightProtection: 'OMPI' },
    topArtists: [
      { name: 'Mohamed Melehi', country: 'MA', medium: 'Peinture / Sculpture', birthYear: '1936', deathYear: '2020', movement: 'École de Casablanca', auctionRecord: '$180K', auctionHouse: 'Artcurial', bio: 'Cofondateur de l\'École de Casablanca, pionnier de l\'art géométrique marocain. Icône de la collection familiale du fondateur.' },
      { name: 'Chaïbia Tallal', country: 'MA', medium: 'Peinture', birthYear: '1929', deathYear: '2004', movement: 'Art naïf marocain', auctionRecord: '$95K', auctionHouse: 'Artcurial', bio: 'Artiste autodidacte, figure majeure de l\'art naïf marocain. Présente dans la collection familiale du fondateur.' },
      { name: 'Farid Belkahia', country: 'MA', medium: 'Peinture / Cuivre', birthYear: '1934', deathYear: '2014', movement: 'Modernisme marocain', auctionRecord: '$320K', auctionHouse: "Christie's", bio: 'Directeur de l\'École des Beaux-Arts de Casablanca 1962-1974. Pionnier de l\'utilisation du cuivre martelé.' },
      { name: 'Hassan El Glaoui', country: 'MA', medium: 'Peinture', birthYear: '1924', deathYear: '2018', movement: 'Orientalisme marocain', auctionRecord: '$450K', auctionHouse: "Christie's", bio: 'Peintre des cavaliers et fantasia. Fils du Pacha El Glaoui. Collection familiale fondateur.' },
      { name: 'Mohamed Kacimi', country: 'MA', medium: 'Peinture', birthYear: '1942', deathYear: '2003', movement: 'Art contemporain', auctionRecord: '$120K', auctionHouse: 'Artcurial' },
      { name: 'Ahmed Cherkaoui', country: 'MA', medium: 'Peinture', birthYear: '1934', deathYear: '1967', movement: 'Abstraction calligraphique', auctionRecord: '$250K', auctionHouse: 'Artcurial', bio: 'Père de l\'art abstrait marocain. Oeuvre dans la collection familiale du fondateur.' },
      { name: 'Fouad Bellamine', country: 'MA', medium: 'Peinture', birthYear: '1950', movement: 'Art contemporain', auctionRecord: '$80K', auctionHouse: 'Artcurial' },
      { name: 'Mahi Binebine', country: 'MA', medium: 'Peinture / Sculpture', birthYear: '1959', movement: 'Art contemporain', auctionRecord: '$150K', auctionHouse: "Christie's", bio: 'Écrivain et plasticien, exposé au Guggenheim. Oeuvre dans la collection familiale.' },
      { name: 'Lalla Essaydi', country: 'MA', medium: 'Photographie', birthYear: '1956', movement: 'Art contemporain', auctionRecord: '$95K', auctionHouse: "Christie's", bio: 'Photographe marocaine-américaine, interroge l\'orientalisme et la condition féminine.' },
      { name: 'Mohamed Qotbi', country: 'MA', medium: 'Peinture', birthYear: '1960', movement: 'Art contemporain', auctionRecord: '$60K', bio: 'Président de la Fondation Nationale des Musées du Maroc.' },
      { name: 'Jilali Gharbaoui', country: 'MA', medium: 'Peinture', birthYear: '1930', deathYear: '1971', movement: 'Abstraction lyrique', auctionRecord: '$200K', auctionHouse: 'Artcurial', bio: 'Premier artiste abstrait marocain, formé aux Pays-Bas. Oeuvre dans la collection familiale.' },
      { name: 'Hassan Hajjaj', country: 'MA', medium: 'Photographie / Installation', birthYear: '1961', movement: 'Pop Art marocain', auctionRecord: '$85K', auctionHouse: "Sotheby's" },
    ],
    galleries: [
      { name: 'Atelier 21', city: 'Casablanca', founded: '2006', specialty: 'Art contemporain et moderne marocain', artists: ['Melehi', 'Bellamine', 'Binebine', 'Qotbi', 'Cherkaoui'], fairsAttended: ['1-54', 'AKAA', 'Art Paris'], website: 'atelier21.ma' },
      { name: 'Loft Art Gallery', city: 'Casablanca', founded: '2012', specialty: 'Art contemporain', artists: ['Binebine', 'Essaydi'], fairsAttended: ['1-54', 'AKAA'] },
      { name: 'Galerie Venise Cadre', city: 'Casablanca', founded: '1996', specialty: 'Art moderne et contemporain marocain', artists: ['Belkahia', 'Melehi', 'Gharbaoui'] },
      { name: 'MACAAL', city: 'Marrakech', founded: '2016', specialty: 'Art contemporain africain', artists: ['Joana Choumali', 'Abdoulaye Konaté', 'Hassan Hajjaj'] },
      { name: 'Comptoir des Mines', city: 'Marrakech', founded: '2018', specialty: 'Art contemporain international', fairsAttended: ['Art Basel', '1-54'] },
      { name: 'Galerie SO', city: 'Casablanca', founded: '2015', specialty: 'Art contemporain marocain' },
      { name: 'Voice Gallery', city: 'Marrakech', founded: '2013', specialty: 'Art contemporain et photographie' },
      { name: 'Galerie 127', city: 'Marrakech', founded: '2006', specialty: 'Photographie', fairsAttended: ['Paris Photo', 'Unseen Amsterdam'] },
    ],
    museums: [
      { name: 'Musée Mohammed VI d\'Art Moderne et Contemporain', city: 'Rabat', type: 'Art moderne et contemporain', founded: '2014', annualVisitors: '500K', notableHoldings: ['Collection nationale', 'Melehi', 'Belkahia', 'Cherkaoui'] },
      { name: 'MACAAL — Musée d\'Art Contemporain Africain Al Maaden', city: 'Marrakech', type: 'Art contemporain africain', founded: '2016', annualVisitors: '80K' },
      { name: 'Fondation Nationale des Musées', city: 'Rabat', type: 'Institution tutélaire', collection: 'Réseau de 19 musées nationaux. Président : Mohamed Qotbi' },
      { name: 'Musée de la Palmeraie', city: 'Marrakech', type: 'Art contemporain', collection: 'Art marocain et africain contemporain' },
      { name: 'Musée Yves Saint Laurent', city: 'Marrakech', type: 'Mode et design', founded: '2017', annualVisitors: '300K' },
    ],
    auctionRecords: [
      { artist: 'Hassan El Glaoui', title: 'La Fantasia', price: '$450K', year: '2019', house: "Christie's", medium: 'Huile sur toile' },
      { artist: 'Farid Belkahia', title: 'Hommage à Klee', price: '$320K', year: '2018', house: "Christie's", medium: 'Cuivre martelé' },
      { artist: 'Ahmed Cherkaoui', title: 'Composition', price: '$250K', year: '2017', house: 'Artcurial', medium: 'Huile sur toile' },
      { artist: 'Jilali Gharbaoui', title: 'Sans titre', price: '$200K', year: '2022', house: 'Artcurial', medium: 'Huile sur toile' },
      { artist: 'Mohamed Melehi', title: 'Vague orange', price: '$180K', year: '2021', house: 'Artcurial', medium: 'Acrylique sur toile' },
    ],
    artFairs: [
      { name: '1-54 Marrakech', city: 'Marrakech', frequency: 'Annuelle', founded: '2018', galleries: 65, visitors: '15K', focus: 'Art contemporain africain' },
      { name: 'AKAA — Also Known As Africa', city: 'Paris (diaspora marocaine active)', frequency: 'Annuelle', founded: '2016', galleries: 40, focus: 'Art contemporain africain' },
      { name: 'Art Fair Marrakech', city: 'Marrakech', frequency: 'Annuelle', founded: '2022', galleries: 30 },
    ],
    culturalHeritage: { unescoSites: 9, intangibleHeritage: ['Gnaoua', 'Fantasia', 'Art du zellige', 'Tbourida'], traditionalArts: ['Zellige', 'Tapis berbères', 'Cuir tanné', 'Dinanderie', 'Bois peint de Chefchaouen'], artMovements: ['École de Casablanca', 'Groupe 65', 'Abstraction calligraphique'] },
    recommendation: 'Investir — Hub art africain, collection familiale fondateur 100+ oeuvres, Atelier 21, Art Lombard Credit DIWANE',
  },
  {
    id: 'NG', name: 'Nigeria', region: 'africa', capital: 'Abuja', population: '223.8M', language: 'Anglais', currency: 'NGN',
    artMarket: { marketSize: '$250M', globalRank: 28, galleryCount: 120, museumCount: 35, artFairsCount: 5, auctionVolume: '$25M', publicFunding: 'Moyen', taxIncentives: 'Limitées', exportRegulation: 'Stricte antiquités' },
    topArtists: [
      { name: 'Ben Enwonwu', country: 'NG', medium: 'Peinture / Sculpture', birthYear: '1917', deathYear: '1994', movement: 'Modernisme nigérian', auctionRecord: '$1.6M', auctionHouse: 'Bonhams' },
      { name: 'Njideka Akunyili Crosby', country: 'NG', medium: 'Technique mixte', birthYear: '1983', movement: 'Art contemporain', auctionRecord: '$3.4M', auctionHouse: "Christie's" },
      { name: 'Toyin Ojih Odutola', country: 'NG', medium: 'Dessin / Pastel', birthYear: '1985', movement: 'Art contemporain', auctionRecord: '$750K', auctionHouse: "Christie's" },
    ],
    galleries: [
      { name: 'Rele Gallery', city: 'Lagos', founded: '2015', specialty: 'Art contemporain nigérian' },
      { name: 'Nike Art Gallery', city: 'Lagos', founded: '2009', specialty: 'Art traditionnel et contemporain' },
      { name: 'Art Twenty One', city: 'Lagos', founded: '2013', specialty: 'Art émergent' },
    ],
    museums: [
      { name: 'Nike Art Foundation', city: 'Lagos', type: 'Art nigérian', annualVisitors: '200K' },
      { name: 'National Museum Lagos', city: 'Lagos', type: 'Archéologie et art', founded: '1957' },
    ],
    artFairs: [
      { name: 'ART X Lagos', city: 'Lagos', frequency: 'Annuelle', founded: '2016', galleries: 80, visitors: '20K', focus: 'Art contemporain africain' },
    ],
    culturalHeritage: { unescoSites: 2, traditionalArts: ['Bronze du Bénin', 'Textile Adire', 'Sculpture Nok'], artMovements: ['Nsukka Group', 'Oshogbo School'] },
    recommendation: 'Investir — Plus grand marché art Afrique',
  },
  {
    id: 'ZA', name: 'Afrique du Sud', region: 'africa', capital: 'Pretoria', population: '60.4M', language: 'Anglais, Afrikaans', currency: 'ZAR',
    artMarket: { marketSize: '$320M', globalRank: 25, galleryCount: 200, museumCount: 80, artFairsCount: 8, auctionVolume: '$40M', publicFunding: 'Élevé', taxIncentives: 'Tax deduction for art', exportRegulation: 'Modérée' },
    topArtists: [
      { name: 'William Kentridge', country: 'ZA', medium: 'Dessin / Animation', birthYear: '1955', movement: 'Art contemporain', auctionRecord: '$1.2M', auctionHouse: "Sotheby's" },
      { name: 'Marlene Dumas', country: 'ZA', medium: 'Peinture', birthYear: '1953', movement: 'Art contemporain', auctionRecord: '$6.3M', auctionHouse: "Sotheby's" },
      { name: 'Irma Stern', country: 'ZA', medium: 'Peinture', birthYear: '1894', deathYear: '1966', movement: 'Expressionnisme', auctionRecord: '$4.2M', auctionHouse: 'Bonhams' },
    ],
    galleries: [
      { name: 'Goodman Gallery', city: 'Johannesburg', founded: '1966', specialty: 'Art contemporain' },
      { name: 'Stevenson', city: 'Cape Town', founded: '2003', specialty: 'Art contemporain africain' },
      { name: 'SMAC Gallery', city: 'Cape Town', founded: '2010', specialty: 'Art sud-africain' },
    ],
    museums: [
      { name: 'Zeitz MOCAA', city: 'Cape Town', type: 'Art contemporain africain', founded: '2017', annualVisitors: '400K' },
      { name: 'Iziko South African National Gallery', city: 'Cape Town', type: 'Art national', founded: '1871' },
    ],
    artFairs: [
      { name: 'Cape Town Art Fair', city: 'Cape Town', frequency: 'Annuelle', founded: '2013', galleries: 100, visitors: '25K', focus: 'Art contemporain' },
      { name: 'FNB Joburg Art Fair', city: 'Johannesburg', frequency: 'Annuelle', founded: '2008', galleries: 90, visitors: '30K' },
    ],
    culturalHeritage: { unescoSites: 10, traditionalArts: ['Perles Ndebele', 'Poterie Zulu', 'Art rupestre San'], artMovements: ['Resistance Art', 'Township Art'] },
    recommendation: 'Investir — Leader marché art Afrique',
  },
  {
    id: 'EG', name: 'Égypte', nameAr: 'مصر', region: 'africa', capital: 'Le Caire', population: '104.3M', language: 'Arabe', currency: 'EGP',
    artMarket: { marketSize: '$150M', globalRank: 38, galleryCount: 60, museumCount: 55, artFairsCount: 4, auctionVolume: '$8M', publicFunding: 'Moyen', exportRegulation: 'Stricte antiquités' },
    topArtists: [
      { name: 'Mahmoud Saïd', country: 'EG', medium: 'Peinture', birthYear: '1897', deathYear: '1964', movement: 'Modernisme égyptien', auctionRecord: '$2.5M', auctionHouse: "Christie's" },
      { name: 'Wael Shawky', country: 'EG', medium: 'Vidéo / Installation', birthYear: '1971', movement: 'Art contemporain', auctionRecord: '$400K' },
    ],
    galleries: [
      { name: 'Townhouse Gallery', city: 'Le Caire', founded: '1998', specialty: 'Art contemporain' },
      { name: 'Mashrabia Gallery', city: 'Le Caire', founded: '1990', specialty: 'Art émergent' },
    ],
    museums: [
      { name: 'Grand Egyptian Museum', city: 'Gizeh', type: 'Archéologie', founded: '2024', annualVisitors: '5M' },
      { name: 'Museum of Modern Egyptian Art', city: 'Le Caire', type: 'Art moderne', founded: '1962' },
    ],
    culturalHeritage: { unescoSites: 7, traditionalArts: ['Calligraphie arabe', 'Mosaïque copte', 'Textile pharaonique'], artMovements: ['Surréalisme égyptien', 'Art et Liberté'] },
    recommendation: 'Observer — Patrimoine immense, marché en développement',
  },
  {
    id: 'GH', name: 'Ghana', region: 'africa', capital: 'Accra', population: '33.5M', language: 'Anglais', currency: 'GHS',
    artMarket: { marketSize: '$80M', globalRank: 42, galleryCount: 35, museumCount: 15, artFairsCount: 3, auctionVolume: '$5M', publicFunding: 'Moyen' },
    topArtists: [
      { name: 'El Anatsui', country: 'GH', medium: 'Sculpture / Installation', birthYear: '1944', movement: 'Art contemporain', auctionRecord: '$1.5M', auctionHouse: "Christie's" },
      { name: 'Ibrahim Mahama', country: 'GH', medium: 'Installation', birthYear: '1987', movement: 'Art contemporain', auctionRecord: '$400K' },
      { name: 'Amoako Boafo', country: 'GH', medium: 'Peinture', birthYear: '1984', movement: 'Art contemporain', auctionRecord: '$3.4M', auctionHouse: "Christie's" },
    ],
    galleries: [
      { name: 'Gallery 1957', city: 'Accra', founded: '2016', specialty: 'Art contemporain africain' },
      { name: 'Nubuke Foundation', city: 'Accra', founded: '2006', specialty: 'Art et culture' },
    ],
    artFairs: [
      { name: 'Chale Wote Festival', city: 'Accra', frequency: 'Annuelle', founded: '2011', focus: 'Art urbain et performance' },
    ],
    culturalHeritage: { unescoSites: 2, traditionalArts: ['Kente', 'Adinkra', 'Fantasy coffins'], artMovements: ['Sankofa Art'] },
    recommendation: 'Investir — Scène émergente dynamique',
  },
  {
    id: 'SN', name: 'Sénégal', region: 'africa', capital: 'Dakar', population: '17.7M', language: 'Français', currency: 'XOF',
    artMarket: { marketSize: '$60M', globalRank: 45, galleryCount: 30, museumCount: 12, artFairsCount: 3, auctionVolume: '$3M', publicFunding: 'Élevé' },
    topArtists: [
      { name: 'Ousmane Sow', country: 'SN', medium: 'Sculpture', birthYear: '1935', deathYear: '2016', movement: 'Sculpture monumentale', auctionRecord: '$250K' },
      { name: 'Soly Cissé', country: 'SN', medium: 'Peinture', birthYear: '1969', movement: 'Art contemporain', auctionRecord: '$80K' },
    ],
    galleries: [
      { name: 'OH Gallery', city: 'Dakar', founded: '2012', specialty: 'Art contemporain africain' },
      { name: 'Galerie Le Manège', city: 'Dakar', specialty: 'Art sénégalais' },
    ],
    artFairs: [
      { name: 'Dak\'Art — Biennale de Dakar', city: 'Dakar', frequency: 'Biennale', founded: '1992', galleries: 40, visitors: '50K', focus: 'Art contemporain africain' },
    ],
    museums: [
      { name: 'Musée des Civilisations Noires', city: 'Dakar', type: 'Art et civilisation', founded: '2018', annualVisitors: '150K' },
      { name: 'Musée Théodore Monod', city: 'Dakar', type: 'Art africain', founded: '1936' },
    ],
    culturalHeritage: { unescoSites: 7, traditionalArts: ['Peinture sous verre', 'Sculpture bois', 'Textile Thiès'], artMovements: ['École de Dakar', 'Négritude'] },
    recommendation: 'Investir — Capital culturel Afrique de l\'Ouest',
  },
  {
    id: 'KE', name: 'Kenya', region: 'africa', capital: 'Nairobi', population: '54.0M', language: 'Anglais, Swahili', currency: 'KES',
    artMarket: { marketSize: '$70M', globalRank: 43, galleryCount: 40, museumCount: 20, artFairsCount: 3, auctionVolume: '$4M', publicFunding: 'Moyen' },
    topArtists: [
      { name: 'Wangechi Mutu', country: 'KE', medium: 'Sculpture / Collage', birthYear: '1972', movement: 'Art contemporain', auctionRecord: '$750K', auctionHouse: "Christie's" },
      { name: 'Michael Armitage', country: 'KE', medium: 'Peinture', birthYear: '1984', movement: 'Art contemporain', auctionRecord: '$4.2M', auctionHouse: "Sotheby's" },
    ],
    galleries: [
      { name: 'Circle Art Gallery', city: 'Nairobi', founded: '2012', specialty: 'Art contemporain est-africain' },
      { name: 'One Off Contemporary Art Gallery', city: 'Nairobi', specialty: 'Art contemporain' },
    ],
    artFairs: [
      { name: 'Nairobi Art Fair', city: 'Nairobi', frequency: 'Annuelle', focus: 'Art est-africain' },
    ],
    culturalHeritage: { unescoSites: 7, traditionalArts: ['Sculpture Makonde', 'Perles Maasai', 'Peinture Tinga Tinga'] },
    recommendation: 'Observer — Scène en croissance rapide',
  },
  {
    id: 'CI', name: 'Côte d\'Ivoire', region: 'africa', capital: 'Yamoussoukro', population: '28.2M', language: 'Français', currency: 'XOF',
    artMarket: { marketSize: '$40M', globalRank: 48, galleryCount: 20, museumCount: 10, artFairsCount: 2, auctionVolume: '$2M', publicFunding: 'Moyen' },
    topArtists: [
      { name: 'Ouattara Watts', country: 'CI', medium: 'Peinture', birthYear: '1957', movement: 'Art contemporain', auctionRecord: '$200K' },
      { name: 'Frédéric Bruly Bouabré', country: 'CI', medium: 'Dessin', birthYear: '1923', deathYear: '2014', movement: 'Art brut', auctionRecord: '$120K' },
    ],
    galleries: [
      { name: 'LouiSimone Guirandou Gallery', city: 'Abidjan', specialty: 'Art contemporain ivoirien' },
    ],
    culturalHeritage: { unescoSites: 4, traditionalArts: ['Masques Dan', 'Masques Baoulé', 'Tissage Sénoufo'] },
    recommendation: 'Observer — Potentiel émergent',
  },
  {
    id: 'TN', name: 'Tunisie', nameAr: 'تونس', region: 'africa', capital: 'Tunis', population: '12.0M', language: 'Arabe, Français', currency: 'TND',
    artMarket: { marketSize: '$50M', globalRank: 46, galleryCount: 25, museumCount: 30, artFairsCount: 2, auctionVolume: '$3M', publicFunding: 'Moyen' },
    topArtists: [
      { name: 'Nja Mahdaoui', country: 'TN', medium: 'Calligraphie contemporaine', birthYear: '1937', movement: 'Abstraction calligraphique', auctionRecord: '$180K' },
      { name: 'Hédi Turki', country: 'TN', medium: 'Peinture', birthYear: '1922', deathYear: '2019', movement: 'École de Tunis' },
    ],
    galleries: [
      { name: 'Selma Feriani Gallery', city: 'Tunis', founded: '2013', specialty: 'Art contemporain' },
    ],
    museums: [
      { name: 'Musée national du Bardo', city: 'Tunis', type: 'Archéologie et mosaïques', founded: '1882', annualVisitors: '600K' },
    ],
    culturalHeritage: { unescoSites: 8, traditionalArts: ['Mosaïque romaine', 'Céramique Nabeul', 'Calligraphie'], artMovements: ['École de Tunis'] },
    recommendation: 'Observer — Riche patrimoine, scène en renouveau',
  },
  {
    id: 'DZ', name: 'Algérie', nameAr: 'الجزائر', region: 'africa', capital: 'Alger', population: '45.6M', language: 'Arabe, Français', currency: 'DZD',
    artMarket: { marketSize: '$35M', globalRank: 49, galleryCount: 15, museumCount: 25, artFairsCount: 1, auctionVolume: '$1M', publicFunding: 'Faible' },
    topArtists: [
      { name: 'Mohammed Khadda', country: 'DZ', medium: 'Peinture / Gravure', birthYear: '1930', deathYear: '1991', movement: 'École du Signe', auctionRecord: '$120K' },
      { name: 'Baya Mahieddine', country: 'DZ', medium: 'Peinture / Céramique', birthYear: '1931', deathYear: '1998', movement: 'Art naïf', auctionRecord: '$350K' },
    ],
    museums: [
      { name: 'MAMA', city: 'Alger', type: 'Art moderne et contemporain', founded: '2007' },
    ],
    culturalHeritage: { unescoSites: 7, traditionalArts: ['Poterie kabyle', 'Tapis Ghardaia', 'Bijoux touaregs'], artMovements: ['Aouchem', 'École du Signe'] },
    recommendation: 'Prudence — Marché peu structuré',
  },
  {
    id: 'ET', name: 'Éthiopie', region: 'africa', capital: 'Addis-Abeba', population: '126.5M', language: 'Amharique', currency: 'ETB',
    artMarket: { marketSize: '$25M', globalRank: 50, galleryCount: 15, museumCount: 12, artFairsCount: 2, publicFunding: 'Faible' },
    topArtists: [
      { name: 'Julie Mehretu', country: 'ET', medium: 'Peinture', birthYear: '1970', movement: 'Art contemporain', auctionRecord: '$9.4M', auctionHouse: "Sotheby's" },
      { name: 'Afewerk Tekle', country: 'ET', medium: 'Peinture', birthYear: '1932', deathYear: '2012', movement: 'Modernisme éthiopien' },
    ],
    galleries: [
      { name: 'Addis Fine Art', city: 'Addis-Abeba', founded: '2016', specialty: 'Art contemporain éthiopien' },
    ],
    artFairs: [
      { name: 'Addis Foto Fest', city: 'Addis-Abeba', frequency: 'Biennale', focus: 'Photographie africaine' },
    ],
    culturalHeritage: { unescoSites: 9, traditionalArts: ['Peinture religieuse', 'Icônes coptes', 'Textile traditionnel'] },
    recommendation: 'Observer — Artiste star (Mehretu), scène locale émergente',
  },
  {
    id: 'TZ', name: 'Tanzanie', region: 'africa', capital: 'Dodoma', population: '65.5M', language: 'Swahili, Anglais', currency: 'TZS',
    artMarket: { marketSize: '$20M', globalRank: 52, galleryCount: 12, museumCount: 8, artFairsCount: 1, publicFunding: 'Faible' },
    topArtists: [
      { name: 'George Lilanga', country: 'TZ', medium: 'Peinture / Sculpture', birthYear: '1934', deathYear: '2005', movement: 'Art Makonde', auctionRecord: '$90K' },
    ],
    culturalHeritage: { unescoSites: 7, traditionalArts: ['Sculpture Makonde', 'Peinture Tinga Tinga', 'Perles Maasai'] },
    recommendation: 'Observer — Tinga Tinga iconique',
  },
  {
    id: 'CD', name: 'RD Congo', region: 'africa', capital: 'Kinshasa', population: '102.3M', language: 'Français', currency: 'CDF',
    artMarket: { marketSize: '$30M', globalRank: 50, galleryCount: 10, museumCount: 5, artFairsCount: 1, publicFunding: 'Faible' },
    topArtists: [
      { name: 'Chéri Samba', country: 'CD', medium: 'Peinture', birthYear: '1956', movement: 'Art populaire congolais', auctionRecord: '$400K', auctionHouse: "Sotheby's" },
      { name: 'Bodys Isek Kingelez', country: 'CD', medium: 'Sculpture / Maquette', birthYear: '1948', deathYear: '2015', movement: 'Art visionnaire', auctionRecord: '$350K' },
    ],
    galleries: [
      { name: 'Galerie Angalia', city: 'Kinshasa', specialty: 'Art contemporain congolais' },
    ],
    culturalHeritage: { unescoSites: 5, traditionalArts: ['Masques Pende', 'Sculpture Luba', 'Peinture populaire'] },
    recommendation: 'Prudence — Scène riche mais marché instable',
  },
  {
    id: 'CM', name: 'Cameroun', region: 'africa', capital: 'Yaoundé', population: '28.6M', language: 'Français, Anglais', currency: 'XAF',
    artMarket: { marketSize: '$15M', globalRank: 55, galleryCount: 8, museumCount: 6, artFairsCount: 1, publicFunding: 'Faible' },
    topArtists: [
      { name: 'Pascale Marthine Tayou', country: 'CM', medium: 'Installation', birthYear: '1966', movement: 'Art contemporain', auctionRecord: '$200K' },
      { name: 'Barthélémy Toguo', country: 'CM', medium: 'Installation / Peinture', birthYear: '1967', movement: 'Art contemporain', auctionRecord: '$150K' },
    ],
    culturalHeritage: { unescoSites: 2, traditionalArts: ['Masques Bamoun', 'Perles Grassland', 'Bronze Tikar'] },
    recommendation: 'Observer — Artistes diaspora influents',
  },
  {
    id: 'MG', name: 'Madagascar', region: 'africa', capital: 'Antananarivo', population: '30.3M', language: 'Malgache, Français', currency: 'MGA',
    artMarket: { marketSize: '$5M', globalRank: 70, galleryCount: 5, museumCount: 4, publicFunding: 'Faible' },
    topArtists: [
      { name: 'Joël Andrianomearisoa', country: 'MG', medium: 'Textile / Installation', birthYear: '1977', movement: 'Art contemporain', auctionRecord: '$60K' },
    ],
    culturalHeritage: { unescoSites: 3, traditionalArts: ['Lamba soie', 'Sculpture Zafimaniry', 'Art funéraire Mahafaly'] },
    recommendation: 'Observer — Premier pavillon Biennale Venise 2019',
  },
  {
    id: 'MZ', name: 'Mozambique', region: 'africa', capital: 'Maputo', population: '33.9M', language: 'Portugais', currency: 'MZN',
    artMarket: { marketSize: '$10M', globalRank: 60, galleryCount: 8, museumCount: 5, publicFunding: 'Faible' },
    topArtists: [
      { name: 'Malangatana', country: 'MZ', medium: 'Peinture', birthYear: '1936', deathYear: '2011', movement: 'Art moderne mozambicain', auctionRecord: '$150K' },
      { name: 'Gonçalo Mabunda', country: 'MZ', medium: 'Sculpture', birthYear: '1975', movement: 'Art contemporain' },
    ],
    culturalHeritage: { unescoSites: 1, traditionalArts: ['Sculpture Makonde', 'Capulana textile', 'Sculpture armes recyclées'] },
    recommendation: 'Observer — Scène sculptée forte',
  },
  {
    id: 'AO', name: 'Angola', region: 'africa', capital: 'Luanda', population: '36.7M', language: 'Portugais', currency: 'AOA',
    artMarket: { marketSize: '$20M', globalRank: 53, galleryCount: 10, museumCount: 6, artFairsCount: 1, publicFunding: 'Moyen' },
    topArtists: [
      { name: 'Délio Jasse', country: 'AO', medium: 'Photographie', birthYear: '1980', movement: 'Art contemporain', auctionRecord: '$50K' },
    ],
    galleries: [
      { name: 'Jahmek Contemporary Art', city: 'Luanda', specialty: 'Art contemporain angolais' },
    ],
    culturalHeritage: { unescoSites: 1, traditionalArts: ['Masques Chokwe', 'Textile Kongo'] },
    recommendation: 'Observer — Émergent, collectionneurs locaux',
  },
  {
    id: 'UG', name: 'Ouganda', region: 'africa', capital: 'Kampala', population: '48.6M', language: 'Anglais, Swahili', currency: 'UGX',
    artMarket: { marketSize: '$12M', globalRank: 58, galleryCount: 10, museumCount: 5, publicFunding: 'Faible' },
    topArtists: [
      { name: 'Sanaa Gateja', country: 'UG', medium: 'Installation / Perles', birthYear: '1950', movement: 'Art contemporain' },
    ],
    galleries: [
      { name: 'Afriart Gallery', city: 'Kampala', founded: '2002', specialty: 'Art contemporain est-africain' },
    ],
    artFairs: [
      { name: 'KLA Art Festival', city: 'Kampala', frequency: 'Biennale', focus: 'Art contemporain' },
    ],
    culturalHeritage: { unescoSites: 3, traditionalArts: ['Bark cloth', 'Perles royales'] },
    recommendation: 'Observer — Scène émergente Kampala',
  },
  {
    id: 'RW', name: 'Rwanda', region: 'africa', capital: 'Kigali', population: '13.8M', language: 'Kinyarwanda, Français, Anglais', currency: 'RWF',
    artMarket: { marketSize: '$8M', globalRank: 62, galleryCount: 6, museumCount: 4, publicFunding: 'Moyen' },
    topArtists: [
      { name: 'Innocent Nkurunziza', country: 'RW', medium: 'Peinture', movement: 'Art contemporain' },
    ],
    galleries: [
      { name: 'Inema Arts Center', city: 'Kigali', founded: '2012', specialty: 'Art contemporain rwandais' },
    ],
    culturalHeritage: { traditionalArts: ['Imigongo', 'Vannerie Agaseke'] },
    recommendation: 'Observer — Hub culturel émergent',
  },
  {
    id: 'BJ', name: 'Bénin', region: 'africa', capital: 'Porto-Novo', population: '13.4M', language: 'Français', currency: 'XOF',
    artMarket: { marketSize: '$15M', globalRank: 56, galleryCount: 6, museumCount: 5, artFairsCount: 1, publicFunding: 'Élevé' },
    topArtists: [
      { name: 'Romuald Hazoumè', country: 'BJ', medium: 'Sculpture / Installation', birthYear: '1962', movement: 'Art contemporain', auctionRecord: '$180K' },
      { name: 'Meschac Gaba', country: 'BJ', medium: 'Installation', birthYear: '1961', movement: 'Art contemporain' },
    ],
    museums: [
      { name: 'Musée d\'Art Contemporain de Ouidah', city: 'Ouidah', type: 'Art contemporain', founded: '2023' },
    ],
    culturalHeritage: { unescoSites: 2, traditionalArts: ['Bronzes royaux Abomey', 'Appliqué Fon', 'Vaudou'] },
    recommendation: 'Investir — Restitution Bronzes, dynamique culturelle',
  },
  {
    id: 'ML', name: 'Mali', region: 'africa', capital: 'Bamako', population: '22.6M', language: 'Français', currency: 'XOF',
    artMarket: { marketSize: '$10M', globalRank: 60, galleryCount: 8, museumCount: 4, artFairsCount: 1, publicFunding: 'Faible' },
    topArtists: [
      { name: 'Abdoulaye Konaté', country: 'ML', medium: 'Textile / Installation', birthYear: '1953', movement: 'Art contemporain', auctionRecord: '$120K' },
      { name: 'Malick Sidibé', country: 'ML', medium: 'Photographie', birthYear: '1936', deathYear: '2016', movement: 'Photographie africaine', auctionRecord: '$200K' },
    ],
    artFairs: [
      { name: 'Rencontres de Bamako', city: 'Bamako', frequency: 'Biennale', founded: '1994', focus: 'Photographie africaine' },
    ],
    culturalHeritage: { unescoSites: 4, traditionalArts: ['Bogolan', 'Sculpture Dogon', 'Masques Bambara'] },
    recommendation: 'Prudence — Patrimoine exceptionnel, instabilité',
  },
];

// ---------------------------------------------------------------------------
// EU COUNTRIES — ART MARKET DATA
// ---------------------------------------------------------------------------

export const EU_COUNTRIES_LIST: DiwaneCountry[] = [
  {
    id: 'FR', name: 'France', region: 'eu', capital: 'Paris', population: '68.2M', language: 'Français', currency: 'EUR',
    artMarket: { marketSize: '$5.8 Mds', globalRank: 4, galleryCount: 2500, museumCount: 1200, artFairsCount: 25, auctionVolume: '$2.1 Mds', publicFunding: 'Très élevé', taxIncentives: 'Loi Aillagon, mécénat', exportRegulation: 'Trésors nationaux', copyrightProtection: 'Droit d\'auteur' },
    topArtists: [
      { name: 'Pierre Soulages', country: 'FR', medium: 'Peinture', birthYear: '1919', deathYear: '2022', movement: 'Outrenoir', auctionRecord: '$11.3M', auctionHouse: "Christie's" },
      { name: 'Daniel Buren', country: 'FR', medium: 'Installation', birthYear: '1938', movement: 'Art conceptuel' },
    ],
    galleries: [
      { name: 'Perrotin', city: 'Paris', founded: '1990', specialty: 'Art contemporain international' },
      { name: 'Kamel Mennour', city: 'Paris', founded: '1999', specialty: 'Art contemporain' },
      { name: 'Thaddaeus Ropac', city: 'Paris', founded: '1983', specialty: 'Art moderne et contemporain' },
    ],
    museums: [
      { name: 'Musée du Louvre', city: 'Paris', type: 'Beaux-arts', founded: '1793', annualVisitors: '8.9M' },
      { name: 'Centre Pompidou', city: 'Paris', type: 'Art moderne et contemporain', founded: '1977', annualVisitors: '3.3M' },
      { name: 'Musée d\'Orsay', city: 'Paris', type: 'Impressionnisme', founded: '1986', annualVisitors: '3.6M' },
    ],
    artFairs: [
      { name: 'Art Basel Paris', city: 'Paris', frequency: 'Annuelle', founded: '2024', galleries: 195, visitors: '65K', focus: 'Art contemporain international' },
      { name: 'Paris Photo', city: 'Paris', frequency: 'Annuelle', founded: '1997', galleries: 180, visitors: '70K', focus: 'Photographie' },
    ],
    recommendation: 'Investir — 4e marché mondial',
  },
  {
    id: 'DE', name: 'Allemagne', region: 'eu', capital: 'Berlin', population: '84.5M', language: 'Allemand', currency: 'EUR',
    artMarket: { marketSize: '$2.8 Mds', globalRank: 5, galleryCount: 1800, museumCount: 600, artFairsCount: 15, auctionVolume: '$900M', publicFunding: 'Très élevé', taxIncentives: 'Kunststiftung' },
    topArtists: [
      { name: 'Gerhard Richter', country: 'DE', medium: 'Peinture', birthYear: '1932', movement: 'Art contemporain', auctionRecord: '$46.3M', auctionHouse: "Sotheby's" },
      { name: 'Anselm Kiefer', country: 'DE', medium: 'Peinture / Sculpture', birthYear: '1945', movement: 'Néo-expressionnisme', auctionRecord: '$4.6M' },
    ],
    galleries: [
      { name: 'Sprüth Magers', city: 'Berlin', founded: '1983', specialty: 'Art contemporain' },
      { name: 'König Galerie', city: 'Berlin', founded: '2002', specialty: 'Art contemporain' },
    ],
    museums: [
      { name: 'Hamburger Bahnhof', city: 'Berlin', type: 'Art contemporain', annualVisitors: '350K' },
    ],
    artFairs: [
      { name: 'Art Cologne', city: 'Cologne', frequency: 'Annuelle', founded: '1967', galleries: 170, visitors: '55K' },
    ],
    recommendation: 'Investir — 5e marché mondial, Berlin hub créatif',
  },
  {
    id: 'GB', name: 'Royaume-Uni', region: 'eu', capital: 'Londres', population: '67.7M', language: 'Anglais', currency: 'GBP',
    artMarket: { marketSize: '$11.2 Mds', globalRank: 2, galleryCount: 3000, museumCount: 800, artFairsCount: 20, auctionVolume: '$6.5 Mds', publicFunding: 'Élevé', taxIncentives: 'Artist\'s Resale Right', copyrightProtection: 'CDPA' },
    topArtists: [
      { name: 'David Hockney', country: 'GB', medium: 'Peinture', birthYear: '1937', movement: 'Pop Art', auctionRecord: '$90.3M', auctionHouse: "Christie's" },
      { name: 'Damien Hirst', country: 'GB', medium: 'Installation / Sculpture', birthYear: '1965', movement: 'YBAs', auctionRecord: '$19.2M', auctionHouse: "Sotheby's" },
    ],
    galleries: [
      { name: 'White Cube', city: 'Londres', founded: '1993', specialty: 'Art contemporain' },
      { name: 'Gagosian London', city: 'Londres', specialty: 'Art contemporain international' },
    ],
    museums: [
      { name: 'Tate Modern', city: 'Londres', type: 'Art moderne et contemporain', founded: '2000', annualVisitors: '5.8M' },
      { name: 'National Gallery', city: 'Londres', type: 'Beaux-arts', founded: '1824', annualVisitors: '5.2M' },
    ],
    artFairs: [
      { name: 'Frieze London', city: 'Londres', frequency: 'Annuelle', founded: '2003', galleries: 160, visitors: '60K', focus: 'Art contemporain' },
    ],
    recommendation: 'Investir — 2e marché mondial',
  },
  {
    id: 'IT', name: 'Italie', region: 'eu', capital: 'Rome', population: '58.9M', language: 'Italien', currency: 'EUR',
    artMarket: { marketSize: '$1.5 Mds', globalRank: 8, galleryCount: 1200, museumCount: 900, artFairsCount: 12, auctionVolume: '$500M', publicFunding: 'Élevé' },
    topArtists: [
      { name: 'Maurizio Cattelan', country: 'IT', medium: 'Sculpture / Installation', birthYear: '1960', movement: 'Art contemporain', auctionRecord: '$17.2M', auctionHouse: "Sotheby's" },
    ],
    museums: [
      { name: 'Palazzo Grassi', city: 'Venise', type: 'Art contemporain', annualVisitors: '400K' },
      { name: 'Galleria degli Uffizi', city: 'Florence', type: 'Beaux-arts', founded: '1581', annualVisitors: '4.4M' },
    ],
    artFairs: [
      { name: 'Biennale de Venise', city: 'Venise', frequency: 'Biennale', founded: '1895', visitors: '800K', focus: 'Art contemporain international' },
      { name: 'Artissima', city: 'Turin', frequency: 'Annuelle', founded: '1994', galleries: 180, visitors: '55K' },
    ],
    recommendation: 'Investir — Biennale Venise, patrimoine mondial',
  },
  {
    id: 'ES', name: 'Espagne', region: 'eu', capital: 'Madrid', population: '48.0M', language: 'Espagnol', currency: 'EUR',
    artMarket: { marketSize: '$800M', globalRank: 10, galleryCount: 800, museumCount: 400, artFairsCount: 8, auctionVolume: '$250M', publicFunding: 'Élevé' },
    topArtists: [
      { name: 'Miquel Barceló', country: 'ES', medium: 'Peinture / Céramique', birthYear: '1957', movement: 'Néo-expressionnisme', auctionRecord: '$4.5M' },
    ],
    museums: [
      { name: 'Museo del Prado', city: 'Madrid', type: 'Beaux-arts', founded: '1819', annualVisitors: '3.4M' },
      { name: 'Museo Reina Sofía', city: 'Madrid', type: 'Art contemporain', founded: '1992', annualVisitors: '4.4M' },
    ],
    artFairs: [
      { name: 'ARCO Madrid', city: 'Madrid', frequency: 'Annuelle', founded: '1982', galleries: 200, visitors: '90K', focus: 'Art contemporain' },
    ],
    recommendation: 'Investir — ARCO, patrimoine riche',
  },
  {
    id: 'NL', name: 'Pays-Bas', region: 'eu', capital: 'Amsterdam', population: '17.8M', language: 'Néerlandais', currency: 'EUR',
    artMarket: { marketSize: '$1.2 Mds', globalRank: 9, galleryCount: 600, museumCount: 300, artFairsCount: 6, auctionVolume: '$400M', publicFunding: 'Élevé' },
    topArtists: [
      { name: 'Marlene Dumas', country: 'NL', medium: 'Peinture', birthYear: '1953', movement: 'Art contemporain', auctionRecord: '$6.3M' },
    ],
    museums: [
      { name: 'Rijksmuseum', city: 'Amsterdam', type: 'Beaux-arts', founded: '1800', annualVisitors: '2.7M' },
      { name: 'Stedelijk Museum', city: 'Amsterdam', type: 'Art moderne et contemporain', founded: '1895' },
    ],
    artFairs: [
      { name: 'TEFAF Maastricht', city: 'Maastricht', frequency: 'Annuelle', founded: '1988', galleries: 270, visitors: '75K', focus: 'Art et antiquités' },
    ],
    recommendation: 'Investir — TEFAF, tradition marchande',
  },
  {
    id: 'BE', name: 'Belgique', region: 'eu', capital: 'Bruxelles', population: '11.7M', language: 'Français, Néerlandais', currency: 'EUR',
    artMarket: { marketSize: '$600M', globalRank: 12, galleryCount: 400, museumCount: 180, artFairsCount: 5, auctionVolume: '$200M', publicFunding: 'Élevé' },
    topArtists: [
      { name: 'Luc Tuymans', country: 'BE', medium: 'Peinture', birthYear: '1958', movement: 'Art contemporain', auctionRecord: '$2.8M' },
    ],
    museums: [
      { name: 'MRBAB', city: 'Bruxelles', type: 'Beaux-arts', founded: '1803' },
    ],
    artFairs: [
      { name: 'Art Brussels', city: 'Bruxelles', frequency: 'Annuelle', founded: '1968', galleries: 150, visitors: '30K' },
    ],
    recommendation: 'Investir — Collectionneurs privés majeurs',
  },
  {
    id: 'AT', name: 'Autriche', region: 'eu', capital: 'Vienne', population: '9.2M', language: 'Allemand', currency: 'EUR',
    artMarket: { marketSize: '$500M', globalRank: 14, galleryCount: 300, museumCount: 200, artFairsCount: 3, auctionVolume: '$300M', publicFunding: 'Élevé' },
    topArtists: [
      { name: 'Maria Lassnig', country: 'AT', medium: 'Peinture', birthYear: '1919', deathYear: '2014', movement: 'Body Awareness', auctionRecord: '$3.8M' },
    ],
    museums: [
      { name: 'Kunsthistorisches Museum', city: 'Vienne', type: 'Beaux-arts', founded: '1891', annualVisitors: '1.8M' },
      { name: 'Leopold Museum', city: 'Vienne', type: 'Art moderne', annualVisitors: '400K' },
    ],
    artFairs: [
      { name: 'viennacontemporary', city: 'Vienne', frequency: 'Annuelle', founded: '2015', galleries: 100 },
    ],
    recommendation: 'Observer — Tradition Sécession, enchères fortes',
  },
  {
    id: 'SE', name: 'Suède', region: 'eu', capital: 'Stockholm', population: '10.5M', language: 'Suédois', currency: 'SEK',
    artMarket: { marketSize: '$400M', globalRank: 16, galleryCount: 200, museumCount: 150, artFairsCount: 3, publicFunding: 'Très élevé' },
    topArtists: [
      { name: 'Hilma af Klint', country: 'SE', medium: 'Peinture', birthYear: '1862', deathYear: '1944', movement: 'Abstraction pionnière', auctionRecord: '$5.8M' },
    ],
    museums: [
      { name: 'Moderna Museet', city: 'Stockholm', type: 'Art moderne et contemporain', founded: '1958' },
    ],
    recommendation: 'Observer — Design et art public forts',
  },
  {
    id: 'DK', name: 'Danemark', region: 'eu', capital: 'Copenhague', population: '5.9M', language: 'Danois', currency: 'DKK',
    artMarket: { marketSize: '$300M', globalRank: 18, galleryCount: 150, museumCount: 100, artFairsCount: 2, publicFunding: 'Très élevé' },
    topArtists: [
      { name: 'Olafur Eliasson', country: 'DK', medium: 'Installation', birthYear: '1967', movement: 'Art contemporain' },
    ],
    museums: [
      { name: 'Louisiana Museum', city: 'Humlebæk', type: 'Art moderne et contemporain', founded: '1958', annualVisitors: '700K' },
    ],
    recommendation: 'Observer — Louisiana, design scandinave',
  },
  {
    id: 'CH', name: 'Suisse', region: 'eu', capital: 'Berne', population: '8.9M', language: 'Allemand, Français, Italien', currency: 'CHF',
    artMarket: { marketSize: '$3.2 Mds', globalRank: 3, galleryCount: 800, museumCount: 350, artFairsCount: 8, auctionVolume: '$1.5 Mds', publicFunding: 'Élevé', taxIncentives: 'Zones franches, ports francs' },
    topArtists: [
      { name: 'Alberto Giacometti', country: 'CH', medium: 'Sculpture', birthYear: '1901', deathYear: '1966', movement: 'Existentialisme', auctionRecord: '$141.3M', auctionHouse: "Christie's" },
    ],
    museums: [
      { name: 'Kunsthaus Zürich', city: 'Zurich', type: 'Beaux-arts', founded: '1910', annualVisitors: '300K' },
      { name: 'Fondation Beyeler', city: 'Bâle', type: 'Art moderne et contemporain', founded: '1997', annualVisitors: '400K' },
    ],
    artFairs: [
      { name: 'Art Basel', city: 'Bâle', frequency: 'Annuelle', founded: '1970', galleries: 290, visitors: '93K', focus: 'Art contemporain — Foire n°1 mondiale' },
    ],
    recommendation: 'Investir — Art Basel, ports francs, 3e marché mondial',
  },
  {
    id: 'PL', name: 'Pologne', region: 'eu', capital: 'Varsovie', population: '37.7M', language: 'Polonais', currency: 'PLN',
    artMarket: { marketSize: '$200M', globalRank: 22, galleryCount: 150, museumCount: 100, artFairsCount: 3, publicFunding: 'Moyen' },
    topArtists: [
      { name: 'Wilhelm Sasnal', country: 'PL', medium: 'Peinture', birthYear: '1972', movement: 'Art contemporain', auctionRecord: '$500K' },
    ],
    museums: [
      { name: 'Museum of Modern Art Warsaw', city: 'Varsovie', type: 'Art contemporain', founded: '2005' },
    ],
    recommendation: 'Observer — Scène dynamique, prix accessibles',
  },
  {
    id: 'PT', name: 'Portugal', region: 'eu', capital: 'Lisbonne', population: '10.4M', language: 'Portugais', currency: 'EUR',
    artMarket: { marketSize: '$150M', globalRank: 24, galleryCount: 100, museumCount: 80, artFairsCount: 3, publicFunding: 'Moyen' },
    topArtists: [
      { name: 'Joana Vasconcelos', country: 'PT', medium: 'Sculpture / Installation', birthYear: '1971', movement: 'Art contemporain', auctionRecord: '$400K' },
    ],
    museums: [
      { name: 'Museu Berardo', city: 'Lisbonne', type: 'Art moderne et contemporain', founded: '2007' },
    ],
    artFairs: [
      { name: 'ARCOlisboa', city: 'Lisbonne', frequency: 'Annuelle', founded: '2016', galleries: 70 },
    ],
    recommendation: 'Observer — Lisbonne hub créatif émergent',
  },
  {
    id: 'GR', name: 'Grèce', region: 'eu', capital: 'Athènes', population: '10.3M', language: 'Grec', currency: 'EUR',
    artMarket: { marketSize: '$100M', globalRank: 28, galleryCount: 80, museumCount: 120, artFairsCount: 2, publicFunding: 'Moyen' },
    topArtists: [
      { name: 'Jannis Kounellis', country: 'GR', medium: 'Installation', birthYear: '1936', deathYear: '2017', movement: 'Arte Povera', auctionRecord: '$2.5M' },
    ],
    museums: [
      { name: 'EMST', city: 'Athènes', type: 'Art contemporain', founded: '2000' },
    ],
    artFairs: [
      { name: 'documenta 14 Athènes', city: 'Athènes', frequency: 'Ponctuelle', founded: '2017', focus: 'Art contemporain' },
    ],
    recommendation: 'Observer — Antiquité et art contemporain',
  },
  {
    id: 'CZ', name: 'Tchéquie', region: 'eu', capital: 'Prague', population: '10.9M', language: 'Tchèque', currency: 'CZK',
    artMarket: { marketSize: '$120M', globalRank: 26, galleryCount: 100, museumCount: 90, artFairsCount: 2, publicFunding: 'Moyen' },
    topArtists: [
      { name: 'David Černý', country: 'CZ', medium: 'Sculpture', birthYear: '1967', movement: 'Art contemporain' },
    ],
    museums: [
      { name: 'DOX Centre for Contemporary Art', city: 'Prague', type: 'Art contemporain', founded: '2008' },
    ],
    recommendation: 'Observer — Tradition avant-garde',
  },
  {
    id: 'RO', name: 'Roumanie', region: 'eu', capital: 'Bucarest', population: '19.0M', language: 'Roumain', currency: 'RON',
    artMarket: { marketSize: '$60M', globalRank: 35, galleryCount: 50, museumCount: 40, publicFunding: 'Faible' },
    topArtists: [
      { name: 'Adrian Ghenie', country: 'RO', medium: 'Peinture', birthYear: '1977', movement: 'Art contemporain', auctionRecord: '$9.1M', auctionHouse: "Sotheby's" },
    ],
    galleries: [
      { name: 'Plan B', city: 'Cluj-Napoca', founded: '2005', specialty: 'Art contemporain roumain' },
    ],
    recommendation: 'Observer — Ghenie phénomène, Cluj scène montante',
  },
  {
    id: 'HU', name: 'Hongrie', region: 'eu', capital: 'Budapest', population: '9.6M', language: 'Hongrois', currency: 'HUF',
    artMarket: { marketSize: '$80M', globalRank: 30, galleryCount: 60, museumCount: 50, publicFunding: 'Moyen' },
    topArtists: [
      { name: 'Victor Vasarely', country: 'HU', medium: 'Peinture', birthYear: '1906', deathYear: '1997', movement: 'Op Art', auctionRecord: '$1.2M' },
    ],
    museums: [
      { name: 'Ludwig Museum', city: 'Budapest', type: 'Art contemporain' },
    ],
    recommendation: 'Observer — Tradition Op Art, prix accessibles',
  },
  {
    id: 'FI', name: 'Finlande', region: 'eu', capital: 'Helsinki', population: '5.6M', language: 'Finnois', currency: 'EUR',
    artMarket: { marketSize: '$200M', globalRank: 20, galleryCount: 100, museumCount: 80, artFairsCount: 2, publicFunding: 'Très élevé' },
    topArtists: [
      { name: 'Eija-Liisa Ahtila', country: 'FI', medium: 'Vidéo / Installation', birthYear: '1959', movement: 'Art contemporain' },
    ],
    museums: [
      { name: 'Kiasma', city: 'Helsinki', type: 'Art contemporain', founded: '1998' },
      { name: 'Amos Rex', city: 'Helsinki', type: 'Art et design', founded: '2018' },
    ],
    recommendation: 'Observer — Design, art public, financement fort',
  },
  {
    id: 'IE', name: 'Irlande', region: 'eu', capital: 'Dublin', population: '5.3M', language: 'Anglais, Gaélique', currency: 'EUR',
    artMarket: { marketSize: '$150M', globalRank: 23, galleryCount: 80, museumCount: 50, publicFunding: 'Élevé' },
    topArtists: [
      { name: 'Sean Scully', country: 'IE', medium: 'Peinture', birthYear: '1945', movement: 'Abstraction', auctionRecord: '$2.1M' },
    ],
    museums: [
      { name: 'Irish Museum of Modern Art', city: 'Dublin', type: 'Art moderne et contemporain', founded: '1991' },
    ],
    recommendation: 'Observer — Tax haven pour collectionneurs',
  },
  {
    id: 'LU', name: 'Luxembourg', region: 'eu', capital: 'Luxembourg', population: '0.66M', language: 'Français, Allemand', currency: 'EUR',
    artMarket: { marketSize: '$300M', globalRank: 15, galleryCount: 50, museumCount: 20, publicFunding: 'Élevé', taxIncentives: 'Freeport Luxembourg' },
    topArtists: [],
    museums: [
      { name: 'MUDAM', city: 'Luxembourg', type: 'Art contemporain', founded: '2006' },
    ],
    recommendation: 'Observer — Freeport, hub logistique art',
  },
  {
    id: 'NO', name: 'Norvège', region: 'eu', capital: 'Oslo', population: '5.5M', language: 'Norvégien', currency: 'NOK',
    artMarket: { marketSize: '$350M', globalRank: 17, galleryCount: 120, museumCount: 80, publicFunding: 'Très élevé' },
    topArtists: [
      { name: 'Edvard Munch', country: 'NO', medium: 'Peinture', birthYear: '1863', deathYear: '1944', movement: 'Expressionnisme', auctionRecord: '$119.9M', auctionHouse: "Sotheby's" },
    ],
    museums: [
      { name: 'MUNCH', city: 'Oslo', type: 'Musée Munch', founded: '2021', annualVisitors: '500K' },
      { name: 'Nasjonalmuseet', city: 'Oslo', type: 'Beaux-arts', founded: '2022', annualVisitors: '1.3M' },
    ],
    recommendation: 'Observer — Munch, infrastructures neuves',
  },
  {
    id: 'BG', name: 'Bulgarie', region: 'eu', capital: 'Sofia', population: '6.5M', language: 'Bulgare', currency: 'BGN',
    artMarket: { marketSize: '$20M', globalRank: 45, galleryCount: 30, museumCount: 25, publicFunding: 'Faible' },
    topArtists: [
      { name: 'Christo', country: 'BG', medium: 'Installation', birthYear: '1935', deathYear: '2020', movement: 'Land Art', auctionRecord: '$3.8M' },
    ],
    recommendation: 'Observer — Christo héritage, scène locale modeste',
  },
  {
    id: 'HR', name: 'Croatie', region: 'eu', capital: 'Zagreb', population: '3.8M', language: 'Croate', currency: 'EUR',
    artMarket: { marketSize: '$15M', globalRank: 48, galleryCount: 20, museumCount: 20, publicFunding: 'Faible' },
    topArtists: [],
    museums: [
      { name: 'Museum of Contemporary Art Zagreb', city: 'Zagreb', type: 'Art contemporain', founded: '2009' },
    ],
    recommendation: 'Observer — Art naïf tradition',
  },
  {
    id: 'SK', name: 'Slovaquie', region: 'eu', capital: 'Bratislava', population: '5.4M', language: 'Slovaque', currency: 'EUR',
    artMarket: { marketSize: '$10M', globalRank: 52, galleryCount: 15, museumCount: 15, publicFunding: 'Faible' },
    topArtists: [],
    recommendation: 'Observer',
  },
  {
    id: 'SI', name: 'Slovénie', region: 'eu', capital: 'Ljubljana', population: '2.1M', language: 'Slovène', currency: 'EUR',
    artMarket: { marketSize: '$12M', globalRank: 50, galleryCount: 15, museumCount: 15, publicFunding: 'Moyen' },
    topArtists: [],
    recommendation: 'Observer',
  },
  {
    id: 'LT', name: 'Lituanie', region: 'eu', capital: 'Vilnius', population: '2.8M', language: 'Lituanien', currency: 'EUR',
    artMarket: { marketSize: '$15M', globalRank: 47, galleryCount: 20, museumCount: 20, publicFunding: 'Moyen' },
    topArtists: [],
    recommendation: 'Observer — Capitale européenne de la culture',
  },
  {
    id: 'LV', name: 'Lettonie', region: 'eu', capital: 'Riga', population: '1.8M', language: 'Letton', currency: 'EUR',
    artMarket: { marketSize: '$10M', globalRank: 53, galleryCount: 15, museumCount: 15, publicFunding: 'Moyen' },
    topArtists: [],
    recommendation: 'Observer',
  },
  {
    id: 'EE', name: 'Estonie', region: 'eu', capital: 'Tallinn', population: '1.4M', language: 'Estonien', currency: 'EUR',
    artMarket: { marketSize: '$12M', globalRank: 51, galleryCount: 15, museumCount: 15, publicFunding: 'Moyen' },
    topArtists: [],
    museums: [
      { name: 'KUMU', city: 'Tallinn', type: 'Art moderne et contemporain', founded: '2006' },
    ],
    recommendation: 'Observer — KUMU, art numérique',
  },
  {
    id: 'CY', name: 'Chypre', region: 'eu', capital: 'Nicosie', population: '1.3M', language: 'Grec', currency: 'EUR',
    artMarket: { marketSize: '$8M', globalRank: 55, galleryCount: 10, museumCount: 10, publicFunding: 'Faible' },
    topArtists: [],
    recommendation: 'Observer',
  },
  {
    id: 'MT', name: 'Malte', region: 'eu', capital: 'La Valette', population: '0.54M', language: 'Maltais, Anglais', currency: 'EUR',
    artMarket: { marketSize: '$5M', globalRank: 60, galleryCount: 8, museumCount: 8, publicFunding: 'Faible' },
    topArtists: [],
    recommendation: 'Observer — Patrimoine baroque',
  },
];

// ---------------------------------------------------------------------------
// ALL COUNTRIES
// ---------------------------------------------------------------------------

export const ALL_COUNTRIES: DiwaneCountry[] = [...AFRICA_COUNTRIES, ...EU_COUNTRIES_LIST];

// ---------------------------------------------------------------------------
// SEARCH INDEX
// ---------------------------------------------------------------------------

export const SEARCH_INDEX: DiwaneSearchItem[] = [
  // Countries
  ...ALL_COUNTRIES.map(c => ({ id: c.id, name: c.name, type: 'country' as const })),
  // Top Artists
  ...ALL_COUNTRIES.flatMap(c =>
    (c.topArtists || []).map(a => ({ id: c.id, name: a.name, type: 'artist' as const, country: c.name }))
  ),
  // Galleries
  ...ALL_COUNTRIES.flatMap(c =>
    (c.galleries || []).map(g => ({ id: c.id, name: g.name, type: 'gallery' as const, country: c.name }))
  ),
  // Art Fairs
  ...ALL_COUNTRIES.flatMap(c =>
    (c.artFairs || []).map(f => ({ id: c.id, name: f.name, type: 'fair' as const, country: c.name }))
  ),
  // Art Movements
  { id: 'MA', name: 'École de Casablanca', type: 'movement', country: 'Maroc' },
  { id: 'SN', name: 'Négritude', type: 'movement', country: 'Sénégal' },
  { id: 'SN', name: 'École de Dakar', type: 'movement', country: 'Sénégal' },
  { id: 'NG', name: 'Nsukka Group', type: 'movement', country: 'Nigeria' },
  { id: 'NG', name: 'Oshogbo School', type: 'movement', country: 'Nigeria' },
  { id: 'DZ', name: 'École du Signe', type: 'movement', country: 'Algérie' },
  { id: 'TN', name: 'École de Tunis', type: 'movement', country: 'Tunisie' },
  { id: 'EG', name: 'Art et Liberté', type: 'movement', country: 'Égypte' },
];
