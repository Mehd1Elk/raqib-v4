import type { GlobalData, ComparisonIndicator, TabDef, Country, SearchItem } from './types';

/* ============================================
   RAQIB — Corridor Intelligence Platform
   Master Data File
   Combines all country data + global data
   ============================================ */

// --- GLOBAL DATA ---
export const GLOBAL_DATA: GlobalData = {
  corridorStats: {
    totalCountries: 49,
    africaCountries: 22,
    euCountries: 27,
    totalPopulation: "1.95 milliard",
    corridorGDP: "~$19 000 Mds",
    tradeEUAfrica: "€380 Mds/an",
    fdiInward: "€52 Mds/an",
    totalEnterprises: "250+",
    totalContacts: "200+",
    totalUniversities: "100+"
  },

  topMinerals: [
    {name: "Cobalt", price: "$28 500/t", trend: "↑ +12%", topProducers: ["RDC (75%)", "Maroc", "Madagascar"], crmaStatus: "Critique", euDemand: "50 000 t/an (batteries VE)"},
    {name: "Lithium", price: "$12 000/t", trend: "↓ -35%", topProducers: ["RDC (exploration)", "Mali", "Ghana (exploration)"], crmaStatus: "Critique", euDemand: "78 000 t LCE/an"},
    {name: "Coltan (Tantale)", price: "$120/kg", trend: "→ stable", topProducers: ["RDC (60%)", "Rwanda", "Nigeria"], crmaStatus: "Critique", euDemand: "1 500 t/an"},
    {name: "Manganèse", price: "$4.2/dmtu", trend: "↑ +8%", topProducers: ["Gabon (#3)", "Ghana", "Côte d'Ivoire"], crmaStatus: "Critique", euDemand: "2 Mt/an (acier, batteries)"},
    {name: "Bauxite", price: "$55/t", trend: "→ stable", topProducers: ["Guinée (#2 mondial)", "Ghana", "Sierra Leone"], crmaStatus: "Stratégique", euDemand: "15 Mt/an (aluminium)"},
    {name: "Phosphates", price: "$300/t roche", trend: "↑ +5%", topProducers: ["Maroc (#1 mondial)", "Sénégal", "Togo"], crmaStatus: "Stratégique", euDemand: "8 Mt/an (fertilisants)"},
    {name: "Or", price: "$2 650/oz", trend: "↑ +28%", topProducers: ["Ghana (#1 Afrique)", "Mali", "Burkina Faso"], crmaStatus: "Non CRM", euDemand: "500 t/an"},
    {name: "Uranium", price: "$82/lb", trend: "↑ +45%", topProducers: ["Niger", "Namibie"], crmaStatus: "Stratégique", euDemand: "15 000 t/an (nucléaire)"},
    {name: "Diamants", price: "Variable", trend: "↓ -15%", topProducers: ["RDC", "Angola", "Sierra Leone"], crmaStatus: "Non CRM", euDemand: "Joaillerie + industriel"},
    {name: "Étain", price: "$29 000/t", trend: "↑ +15%", topProducers: ["RDC", "Rwanda", "Nigeria"], crmaStatus: "Critique", euDemand: "25 000 t/an (soudure, électronique)"}
  ],

  alerts: [
    {text: "RDC — Escalade militaire Est du pays, M23 actif. Impact sur production de coltan et cobalt.", level: "red"},
    {text: "Ghana — Production record 6M oz or en 2025. Réforme des royalties minières en cours.", level: "green"},
    {text: "Niger — Relations tendues avec la France post-coup 2023. Orano/uranium en renégociation.", level: "red"},
    {text: "Guinée — Transition militaire prolongée. Projet Simandou (fer) avance malgré instabilité.", level: "orange"},
    {text: "Maroc — Croissance 5.1% au S1 2025. Exports phosphates +21%.", level: "green"},
    {text: "Nigeria — Inflation en baisse à 15.1% (déc. 2025). Réformes Tinubu en cours.", level: "orange"},
    {text: "Sénégal — Première production pétrolière (Sangomar) en juin 2024. GNL Tortue en 2025.", level: "green"},
    {text: "Mali — Retrait de la MINUSMA. Groupe Wagner présent. Risque sécuritaire élevé.", level: "red"},
    {text: "Côte d'Ivoire — Ouattara réélu avec 91%. Stabilité politique confirmée. Or: 58t en 2024.", level: "green"},
    {text: "Burkina Faso — Transition militaire. Production aurifère en hausse malgré insécurité.", level: "red"},
    {text: "Angola — Diversification post-pétrole en cours. IDE en hausse +15%.", level: "orange"},
    {text: "Gabon — Transition militaire ordonnée. COMILOG/Eramet maintient production manganèse.", level: "orange"},
    {text: "UE CRMA — Règlement Matières Premières Critiques adopté. Objectifs 2030: 10% extraction, 40% transformation, 25% recyclage.", level: "green"},
    {text: "Rwanda — Croissance 9.4% en 2025. Hub tech et coltan stratégique.", level: "green"}
  ],

  topEnterprises: [
    {name: "Dangote Group", country: "Nigeria", sector: "Conglomérat (Ciment, Pétrole, Sucre)", marketCap: "$30 Mds"},
    {name: "OCP Group", country: "Maroc", sector: "Phosphates / Fertilisants", marketCap: "Non coté (~$20 Mds estimé)"},
    {name: "Attijariwafa Bank", country: "Maroc", sector: "Banque panafricaine", marketCap: "$15.6 Mds"},
    {name: "MTN Group (Nigeria)", country: "Nigeria", sector: "Télécommunications", marketCap: "$8 Mds (Nigeria)"},
    {name: "Managem Group", country: "Maroc", sector: "Mines (Cobalt, Or, Argent)", marketCap: "$6.1 Mds"},
    {name: "Maroc Telecom", country: "Maroc", sector: "Télécommunications", marketCap: "$11.1 Mds"},
    {name: "Sonatel (Orange Sénégal)", country: "Sénégal", sector: "Télécommunications", marketCap: "$4.5 Mds"},
    {name: "Newmont Ghana", country: "Ghana", sector: "Mines (Or)", marketCap: "Filiale ($55 Mds groupe)"},
    {name: "BUA Group", country: "Nigeria", sector: "Ciment, Sucre, Immobilier", marketCap: "$6 Mds"},
    {name: "Ecobank Transnational", country: "Togo (panafricain)", sector: "Banque panafricaine", marketCap: "$1.5 Mds"}
  ]
};

// --- COMPARISON INDICATORS ---
export const COMPARISON_INDICATORS: ComparisonIndicator[] = [
  {key: "population", label: "Population", extract: (c: Country) => c.population},
  {key: "gdpNominal", label: "PIB Nominal", extract: (c: Country) => c.gdpNominal},
  {key: "gdpPPP", label: "PIB PPA", extract: (c: Country) => c.gdpPPP},
  {key: "gdpPerCapita", label: "PIB/habitant", extract: (c: Country) => c.gdpPerCapita},
  {key: "inflation", label: "Inflation", extract: (c: Country) => c.inflation},
  {key: "debtToGDP", label: "Dette/PIB", extract: (c: Country) => c.debtToGDP},
  {key: "riskScore", label: "Score Risque RAQIB", extract: (c: Country) => c.riskScore + "/10"},
  {key: "corruptionIndex", label: "Indice Corruption", extract: (c: Country) => c.corruptionIndex},
  {key: "recommendation", label: "Recommandation RAQIB", extract: (c: Country) => c.recommendation},
  {key: "currency", label: "Monnaie", extract: (c: Country) => c.currency}
];

// --- TAB DEFINITIONS ---
export const COUNTRY_TABS: TabDef[] = [
  {id: "overview", label: "Vue d'ensemble"},
  {id: "minerals", label: "Minéraux"},
  {id: "industries", label: "Industries"},
  {id: "enterprises", label: "Entreprises"},
  {id: "billionaires", label: "Fortunes"},
  {id: "leaders", label: "Dirigeants"},
  {id: "contacts", label: "Contacts"},
  {id: "universities", label: "Universités"},
  {id: "logistics", label: "Logistique"},
  {id: "trade", label: "Commerce"},
  {id: "demographics", label: "Démographie"},
  {id: "risks", label: "Risques"}
];

// --- EU TAB DEFINITIONS (lighter) ---
export const EU_TABS: TabDef[] = [
  {id: "overview", label: "Vue d'ensemble"},
  {id: "minerals", label: "Demande minéraux"},
  {id: "enterprises", label: "Entreprises clés"},
  {id: "contacts", label: "Contacts CRMA"}
];

// --- MOROCCO & NIGERIA DATA ---
// ============================================================
// RAQIB Corridor Intelligence Platform
// Data File — Part 1: Morocco & Nigeria
// Generated: April 2026 — Sources: IMF, World Bank, TI, USGS,
// NBS Nigeria, Bank Al-Maghrib, CBN, OCP, NNPC, NPA, FAAN,
// Nairametrics, PwC Nigeria, Trading Economics, World Economics
// ============================================================

export const DATA_MOROCCO: Country = {
  id: "MA",
  name: "Maroc",
  officialName: "Royaume du Maroc",
  flag: "🇲🇦",
  region: "africa",
  capital: "Rabat",
  area: "446 550 km²",
  population: "37.8 millions (2025)",
  density: "84.6 hab/km²",
  gdpNominal: "154 Mds USD (2025)",
  gdpPPP: "455 Mds USD (2025)",
  gdpPerCapita: "4 080 USD",
  gdpGrowth: [
    {year: "2021", value: 8.0},
    {year: "2022", value: 1.3},
    {year: "2023", value: 3.0},
    {year: "2024", value: 3.4},
    {year: "2025", value: 4.5}
  ],
  inflation: "1.3% (2025)",
  debtToGDP: "69.5%",
  tradeBalance: "-18.2 Mds USD",
  currency: "Dirham marocain (MAD)",
  exchangeRateEUR: "1 EUR = 10.8 MAD",
  exchangeRateUSD: "1 USD = 9.9 MAD",
  corruptionIndex: "Score 38/100 — Rang 97/180 (TI 2024)",
  easeBusiness: "Rang 53/190 (World Bank 2020)",
  politicalStability: "-0.37 (World Bank 2023)",
  riskScore: 4,
  riskLabel: "Modéré",
  recommendation: "Investir",
  timezone: "UTC+1 (GMT+1)",
  languages: "Arabe, Amazigh (officielles), Français",
  religions: "Islam (99%), autres (1%)",
  memberships: ["UA", "UMA", "OCI", "Ligue arabe", "Partenaire avancé UE"],

  // MINERALS
  minerals: [
    {
      name: "Phosphates",
      type: "Industriel / Fertilisants",
      annualProduction: "40 Mt (2024)",
      worldRank: "1er exportateur mondial",
      reserves: "50 milliards de tonnes (75% des réserves mondiales)",
      deposits: [
        {name: "Khouribga", location: "32.88°N, 6.90°W", stage: "Production", operator: "OCP", nationality: "Maroc", ownership: "100% État"},
        {name: "Gantour (Benguerir/Youssoufia)", location: "32.09°N, 8.01°W", stage: "Production", operator: "OCP", nationality: "Maroc", ownership: "100% État"},
        {name: "Boucraa", location: "26.35°N, 12.85°W", stage: "Production", operator: "Phosboucraa (filiale OCP)", nationality: "Maroc", ownership: "100% État"}
      ],
      exportRevenue: "€5.2 Mds (jan-jul 2025)",
      regulation: "Code minier 2015, royalties 3-5%, OCP monopole d'État",
      crmaRelevance: "Élevée — phosphates critiques pour sécurité alimentaire EU"
    },
    {
      name: "Cobalt",
      type: "Batterie / Critique",
      annualProduction: "2 300 t (2024)",
      worldRank: "7e mondial",
      reserves: "Non disponible",
      deposits: [
        {name: "Bou Azzer", location: "30.48°N, 6.91°W", stage: "Production", operator: "Managem", nationality: "Maroc", ownership: "Managem Group (Al Mada)"}
      ],
      exportRevenue: "~200 M USD",
      regulation: "Code minier 2015, royalties variables",
      crmaRelevance: "Très élevée — Cobalt sur liste CRM de l'UE"
    },
    {
      name: "Zinc",
      type: "Industriel",
      annualProduction: "69 000 t minerai (2024)",
      worldRank: "Top 20 mondial",
      reserves: "Non disponible",
      deposits: [
        {name: "Draa Sfar", location: "31.71°N, 8.12°W", stage: "Production", operator: "Managem", nationality: "Maroc", ownership: "Managem Group"},
        {name: "Tighza", location: "33.09°N, 6.26°W", stage: "Production", operator: "Managem", nationality: "Maroc", ownership: "Managem Group"}
      ],
      exportRevenue: "Non disponible",
      regulation: "Code minier 2015",
      crmaRelevance: "Modérée"
    },
    {
      name: "Argent",
      type: "Précieux",
      annualProduction: "297 t (2024)",
      worldRank: "11e mondial",
      reserves: "Non disponible",
      deposits: [
        {name: "Imiter", location: "31.32°N, 5.63°W", stage: "Production", operator: "Managem", nationality: "Maroc", ownership: "Managem Group"},
        {name: "Zgounder", location: "30.88°N, 7.42°W", stage: "Production", operator: "Aya Gold & Silver", nationality: "Canada", ownership: "100% Aya Gold & Silver"}
      ],
      exportRevenue: "Non disponible",
      regulation: "Code minier 2015, royalties sur l'argent",
      crmaRelevance: "Modérée"
    },
    {
      name: "Or",
      type: "Précieux",
      annualProduction: "~1.5 t (2024)",
      worldRank: "Non classé parmi les top",
      reserves: "Non disponible",
      deposits: [
        {name: "Akka", location: "29.40°N, 8.25°W", stage: "Production", operator: "Managem", nationality: "Maroc", ownership: "Managem Group"}
      ],
      exportRevenue: "Non disponible",
      regulation: "Code minier 2015",
      crmaRelevance: "Faible"
    },
    {
      name: "Fluorine",
      type: "Industriel",
      annualProduction: "100 000 t (2024)",
      worldRank: "3e mondial",
      reserves: "Non disponible",
      deposits: [
        {name: "El Hammam", location: "33.55°N, 5.75°W", stage: "Production", operator: "Samine (Managem)", nationality: "Maroc", ownership: "Managem Group"}
      ],
      exportRevenue: "Non disponible",
      regulation: "Code minier 2015",
      crmaRelevance: "Élevée — Fluorine sur liste CRM"
    },
    {
      name: "Barytine",
      type: "Industriel",
      annualProduction: "850 000 t (2024)",
      worldRank: "2e mondial",
      reserves: "Non disponible",
      deposits: [
        {name: "Jbel Irhoud", location: "31.85°N, 8.87°W", stage: "Production", operator: "Divers opérateurs", nationality: "Maroc", ownership: "Privé"}
      ],
      exportRevenue: "Non disponible",
      regulation: "Code minier 2015",
      crmaRelevance: "Élevée — Barytine sur liste CRM"
    }
  ],

  // INDUSTRIES
  industries: {
    gdpBySector: {agriculture: 12, industry: 26, services: 52, mining: 10},
    keyIndustries: [
      {name: "Automobile", description: "1er producteur automobile d'Afrique. Usines Renault (Tanger, Casablanca), Stellantis (Kénitra). Production >500 000 véhicules/an. Écosystème fournisseurs intégré.", share: "Exports autos: ~€12 Mds/an"},
      {name: "Aéronautique", description: "150+ entreprises (Boeing, Safran, Airbus). Hub Casablanca-Nouaceur. CA secteur: ~€2 Mds.", share: ">19 000 emplois"},
      {name: "Phosphates & chimie", description: "OCP Group — leader mondial. Transformation locale (DAP, TSP, acide phosphorique). Investissements $13 Mds 2023-2027.", share: "~5% PIB"},
      {name: "Énergie renouvelable", description: "Noor Ouarzazate (580 MW CSP), parc éolien Tarfaya (300 MW). Objectif 52% renouvelable d'ici 2030.", share: "Capacité installée: 4.5 GW renouvelable"},
      {name: "Textile & cuir", description: "Secteur historique d'exportation, principalement vers l'UE. ~200 000 emplois directs.", share: "~€4 Mds exports"},
      {name: "Tourisme", description: "14.5 M de touristes en 2024, revenus ~€9 Mds. Stratégie 2030: 17.5 M touristes.", share: "7% PIB"}
    ],
    sez: [
      {name: "Tanger Med Zones", location: "Tanger", advantages: "Zone franche, IS 0% pendant 5 ans, exonération douanière"},
      {name: "Casablanca Finance City (CFC)", location: "Casablanca", advantages: "IS réduit à 15%, hub financier pour l'Afrique"},
      {name: "Technopolis", location: "Rabat", advantages: "Zone dédiée aux TIC, offshoring, R&D"},
      {name: "Kénitra Atlantic Free Zone", location: "Kénitra", advantages: "Zone automobile, exonérations fiscales 5 ans"}
    ],
    majorProjects: [
      "Ligne à Grande Vitesse (LGV) Kénitra-Marrakech — Lancement travaux 2025",
      "Port Nador West Med — Capacité 3M TEU, livraison 2028",
      "Port Dakhla Atlantique — En construction, vocation logistique Afrique de l'Ouest",
      "Gazoduc Nigeria-Maroc — Projet stratégique, études avancées",
      "Stade de Casablanca (Coupe du Monde 2030) — 115 000 places"
    ],
    banking: {
      mainBanks: ["Attijariwafa Bank", "BMCE Bank of Africa", "Banque Centrale Populaire", "CIH Bank", "Crédit du Maroc", "Société Générale Maroc"],
      totalAssets: "~€150 Mds",
      bancarisation: "56% (2024)"
    },
    telecom: {
      operators: ["Maroc Telecom (Vivendi)", "Orange Maroc", "Inwi"],
      mobilePenetration: "138%",
      internetPenetration: "90%"
    },
    energy: {
      mix: "Charbon 35%, Gaz 12%, Éolien 15%, Solaire 8%, Hydraulique 5%, Importations 25%",
      installedCapacity: "11.7 GW (2024)",
      renewableProjects: "Noor Midelt (800 MW), Parc éolien Boujdour (300 MW), Programme solaire 2030"
    }
  },

  // TOP ENTERPRISES
  enterprises: [
    {name: "OCP Group", sector: "Mines / Chimie / Fertilisants", revenue: "€9.8 Mds (2024)", employees: "21 000", ceo: "Mostafa Terrab", shareholding: "État marocain 95%, BCP 5%", listed: "Non coté", founded: "1920", hq: "Casablanca", website: "ocpgroup.ma"},
    {name: "Attijariwafa Bank", sector: "Banque", revenue: "€5.3 Mds", employees: "20 000+", ceo: "Mohamed El Kettani", shareholding: "Al Mada 47.9%, CIMR 8.8%", listed: "Casablanca Stock Exchange (ATW)", founded: "2003 (fusion)", hq: "Casablanca", website: "attijariwafabank.com"},
    {name: "Maroc Telecom", sector: "Télécommunications", revenue: "€3.7 Mds (2024)", employees: "8 000+", ceo: "Abdeslam Ahizoune", shareholding: "Vivendi 53%, État 22%, Flottant 25%", listed: "Casablanca / Euronext Paris (IAM)", founded: "1998", hq: "Rabat", website: "iam.ma"},
    {name: "Managem Group", sector: "Mines (Cobalt, Or, Argent, Zinc)", revenue: "€1.4 Mds (2024)", employees: "7 500", ceo: "Imad Toumi", shareholding: "Al Mada 78.6%", listed: "Casablanca Stock Exchange (MNG)", founded: "1928", hq: "Casablanca", website: "managemgroup.com"},
    {name: "Banque Centrale Populaire (BCP)", sector: "Banque", revenue: "€2.9 Mds", employees: "13 000", ceo: "Kamal Mokdad", shareholding: "Banques Populaires Régionales, État", listed: "Casablanca Stock Exchange (BCP)", founded: "1961", hq: "Casablanca", website: "gbp.ma"},
    {name: "Marsa Maroc", sector: "Logistique portuaire", revenue: "€600 M", employees: "2 500", ceo: "Mohamed Abdeljalil", shareholding: "État 51%, Tanger Med SA 35%", listed: "Casablanca Stock Exchange (MARSA)", founded: "2006", hq: "Casablanca", website: "marsamaroc.co.ma"},
    {name: "TAQA Morocco (TAGA)", sector: "Énergie", revenue: "€1.5 Mds", employees: "1 600", ceo: "Abdelmajid Iraqui Houssaini", shareholding: "Abu Dhabi TAQA 91%", listed: "Casablanca Stock Exchange (TQM)", founded: "1997", hq: "Jorf Lasfar", website: "taqamorocco.ma"},
    {name: "Cosumar", sector: "Agroalimentaire (sucre)", revenue: "€1.2 Mds", employees: "3 000", ceo: "Hassan Ouriaghli", shareholding: "Wilmar International 32%, SNI/Al Mada", listed: "Casablanca Stock Exchange (CSR)", founded: "1929", hq: "Casablanca", website: "cosumar.co.ma"},
    {name: "Groupe Addoha", sector: "Immobilier", revenue: "€400 M", employees: "5 000", ceo: "Anas Sefrioui", shareholding: "Anas Sefrioui ~52%", listed: "Casablanca Stock Exchange (ADH)", founded: "1988", hq: "Casablanca", website: "groupeaddoha.com"},
    {name: "LafargeHolcim Maroc", sector: "Matériaux de construction", revenue: "€700 M", employees: "2 800", ceo: "Non disponible", shareholding: "Holcim 64.7%", listed: "Casablanca Stock Exchange (LHM)", founded: "1928", hq: "Casablanca", website: "lafargeholcim.ma"},
    {name: "Renault Maroc (SOMACA)", sector: "Automobile", revenue: "€5 Mds exports", employees: "12 000 (Tanger+Casa)", ceo: "Marc Nassif", shareholding: "Renault Group 80%", listed: "Non coté", founded: "1959", hq: "Tanger / Casablanca", website: "renault.ma"},
    {name: "TotalEnergies Maroc", sector: "Énergie / Distribution", revenue: "€800 M", employees: "400", ceo: "Non disponible", shareholding: "TotalEnergies SE 100%", listed: "Non coté", founded: "1926", hq: "Casablanca", website: "totalenergies.ma"},
    {name: "BMCE Bank of Africa", sector: "Banque", revenue: "€2.3 Mds", employees: "15 000 (groupe)", ceo: "Othman Benjelloun (Président)", shareholding: "FinanceCom 30%, CDC 9%, BFCM 5%", listed: "Casablanca Stock Exchange (BOA)", founded: "1959", hq: "Casablanca", website: "bankofafrica.ma"},
    {name: "Marjane Holding", sector: "Distribution / Retail", revenue: "€2.5 Mds", employees: "12 000+", ceo: "Nadia Fassi-Fehri", shareholding: "Al Mada 100%", listed: "Non coté", founded: "1990", hq: "Casablanca", website: "marjane.ma"},
    {name: "CIH Bank", sector: "Banque", revenue: "€350 M", employees: "2 500", ceo: "Lotfi Sekkat", shareholding: "CDG 68%", listed: "Casablanca Stock Exchange (CIH)", founded: "1920", hq: "Casablanca", website: "cihbank.ma"},
    {name: "Inwi", sector: "Télécommunications", revenue: "€650 M", employees: "1 400", ceo: "Nadia Fassi-Fehri", shareholding: "Al Mada 69%, Zain 31%", listed: "Non coté", founded: "1999", hq: "Casablanca", website: "inwi.ma"},
    {name: "Royal Air Maroc", sector: "Transport aérien", revenue: "€2 Mds", employees: "4 500", ceo: "Hamid Addou", shareholding: "État 100%", listed: "Non coté", founded: "1957", hq: "Casablanca", website: "royalairmaroc.com"},
    {name: "Office National de l'Électricité et de l'Eau (ONEE)", sector: "Énergie / Eau", revenue: "€3 Mds", employees: "13 000", ceo: "Abderrahim El Hafidi", shareholding: "État 100%", listed: "Non coté", founded: "1963", hq: "Casablanca", website: "one.org.ma"},
    {name: "Stellantis Kénitra", sector: "Automobile", revenue: "€2 Mds exports", employees: "5 000", ceo: "Samir Cherfan (région MENA)", shareholding: "Stellantis NV 100%", listed: "Non coté (filiale)", founded: "2019", hq: "Kénitra", website: "stellantis.com"},
    {name: "Groupe Alliances", sector: "Immobilier / Tourisme", revenue: "€250 M", employees: "3 000", ceo: "Ahmed Ammor", shareholding: "Alami Lazraq ~45%", listed: "Casablanca Stock Exchange (ADI)", founded: "1994", hq: "Casablanca", website: "alliancesdarna.com"}
  ],

  // BILLIONAIRES & POWER PLAYERS
  billionaires: [
    {name: "Aziz Akhannouch", fortune: "~2 Mds USD", source: "Pétrole (Afriquia), Agroalimentaire, Assurances", companies: "Afriquia (Akwa Group), Al Mada", age: "63", education: "Université Sherbrooke (Canada)", bio: "Chef du gouvernement depuis 2021. Président du RNI. Fortune familiale via Akwa Group."},
    {name: "Othman Benjelloun", fortune: "~1.5 Mds USD", source: "Banque, Assurances, Telecom", companies: "BMCE Bank of Africa, FinanceCom, RMA Watanya", age: "92", education: "EPFL Lausanne", bio: "Doyen du patronat marocain. Président-fondateur de BMCE Bank, présent dans 30+ pays africains."},
    {name: "Anas Sefrioui", fortune: "~1 Mds USD", source: "Immobilier", companies: "Addoha Group, CIMENTS DE L'ATLAS", age: "63", education: "Autodidacte", bio: "Fondateur d'Addoha, plus grand promoteur immobilier du Maroc. Actif au Maroc et en Afrique de l'Ouest."},
    {name: "Moulay Hafid Elalamy (MHE)", fortune: "~500 M USD", source: "Assurances, Textile, Industrie", companies: "Saham Group (vendu à Sanlam), Industries MHE", age: "64", education: "Business (France)", bio: "Ex-Ministre de l'Industrie. Architecte du Plan d'Accélération Industrielle. Patron de Saham, vendu au sud-africain Sanlam."},
    {name: "Miloud Chaabi", fortune: "~500 M USD (décédé 2016, famille)", source: "Immobilier, Distribution", companies: "Ynna Holding, Asswak Assalam", age: "Décédé (2016)", education: "Non disponible", bio: "Fondateur d'Ynna Holding, l'un des plus grands groupes privés du Maroc. Fortune gérée par la famille."}
  ],

  // GOVERNMENT LEADERS
  leaders: {
    headOfState: {name: "Roi Mohammed VI", since: "1999", party: "Monarchie constitutionnelle", nextElection: "N/A (monarchie héréditaire)"},
    headOfGov: {name: "Aziz Akhannouch", since: "2021", party: "RNI (Rassemblement National des Indépendants)"},
    keyMinisters: [
      {portfolio: "Affaires Étrangères", name: "Nasser Bourita"},
      {portfolio: "Intérieur", name: "Abdelouafi Laftit"},
      {portfolio: "Économie et Finances", name: "Nadia Fettah Alaoui"},
      {portfolio: "Industrie et Commerce", name: "Ryad Mezzour"},
      {portfolio: "Énergie, Transition et Développement durable", name: "Leila Benali"},
      {portfolio: "Agriculture, Pêche, Eau et Forêts", name: "Ahmed Bouari"},
      {portfolio: "Éducation nationale", name: "Mohamed Saad Berrada"},
      {portfolio: "Enseignement supérieur et Recherche", name: "Azzedine El Midaoui"},
      {portfolio: "Santé et Protection sociale", name: "Amine Tahraoui"},
      {portfolio: "Transport et Logistique", name: "Abdessamad Kayouh"},
      {portfolio: "Équipement et Eau", name: "Nizar Baraka"},
      {portfolio: "Transition numérique", name: "Amal El Fallah Seghrouchni"},
      {portfolio: "Investissement et Convergence", name: "Karim Zidane"},
      {portfolio: "Justice", name: "Abdellatif Ouahbi"},
      {portfolio: "Défense nationale", name: "Abdellatif Loudiyi"},
      {portfolio: "Budget", name: "Faouzi Lekjaa"},
      {portfolio: "Tourisme et Artisanat", name: "Fatim-Zahra Ammor"},
      {portfolio: "Jeunesse, Culture et Communication", name: "Mohamed Mehdi Bensaid"},
      {portfolio: "Solidarité et Famille", name: "Naima Ben Yahia"},
      {portfolio: "Emploi et Compétences", name: "Younes Sekkouri"},
      {portfolio: "Urbanisme et Aménagement", name: "Fatima Ezzahra El Mansouri"}
    ],
    centralBankGov: {name: "Abdellatif Jouahri", institution: "Bank Al-Maghrib"},
    investmentAgency: {name: "Ali Seddiki", institution: "AMDIE (Agence Marocaine de Développement des Investissements et des Exportations)"},
    miningAuthority: {name: "Non disponible", institution: "Direction des Mines — Ministère de l'Énergie"},
    customs: {name: "Nabyl Lakhdar", institution: "Administration des Douanes et Impôts Indirects (ADII)"},
    ambassadorFrance: {name: "Samira Sitaïl", institution: "Ambassadeur du Maroc en France"},
    ambassadorFromFrance: {name: "Christophe Lecourtier", institution: "Ambassadeur de France au Maroc"},
    unRepresentative: {name: "Omar Hilale", institution: "Représentant permanent du Maroc à l'ONU"}
  },

  // CONTACTS
  contacts: {
    chambers: ["Chambre Française de Commerce et d'Industrie du Maroc (CFCIM)", "Chambre de Commerce Européenne au Maroc"],
    businessFrance: "Bureau Business France Casablanca & Rabat",
    bpifrance: "Bpifrance — Bureau Casablanca",
    afd: "AFD Maroc — Bureau Rabat",
    lawFirms: ["CMS Francis Lefebvre Maroc", "Gide Loyrette Nouel Casablanca", "LPA-CGR Avocats Casablanca", "DLA Piper (partenaire local)"],
    big4: ["Deloitte Casablanca", "PwC Maroc", "EY Maroc", "KPMG Maroc"],
    investmentBanks: ["CDG Capital", "Attijari Finances Corp", "BMCE Capital", "CFG Bank"],
    patronat: "CGEM (Confédération Générale des Entreprises du Maroc)",
    diaspora: "3 millions de Marocains en Europe (dont 1.5 M en France)"
  },

  // UNIVERSITIES
  universities: [
    {name: "Université Mohammed V de Rabat", city: "Rabat", students: "90 000", specialties: "Droit, Sciences, Médecine", ranking: "1ère au Maroc (THE 2024)"},
    {name: "Université Cadi Ayyad", city: "Marrakech", students: "100 000", specialties: "Sciences, Ingénierie, Médecine", ranking: "2e au Maroc"},
    {name: "Université Hassan II", city: "Casablanca", students: "120 000", specialties: "Sciences économiques, Ingénierie", ranking: "3e au Maroc"},
    {name: "Université Mohammed VI Polytechnique (UM6P)", city: "Benguerir", students: "4 500", specialties: "IA, Mining, Agriculture, Recherche de pointe", ranking: "Top 5 Afrique en recherche"},
    {name: "Al Akhawayn University", city: "Ifrane", students: "2 300", specialties: "Business, Sciences sociales (anglophone)", ranking: "Top business school Afrique du Nord"},
    {name: "EHTP", city: "Casablanca", students: "1 200", specialties: "Génie civil, Télécommunications", ranking: "Top école d'ingénieurs"},
    {name: "EMI (École Mohammadia d'Ingénieurs)", city: "Rabat", students: "2 000", specialties: "Ingénierie multidisciplinaire", ranking: "1ère école d'ingénieurs publique"},
    {name: "ISCAE", city: "Casablanca / Rabat", students: "1 500", specialties: "Commerce, Management", ranking: "Top école de commerce publique"},
    {name: "INPT", city: "Rabat", students: "1 000", specialties: "Télécommunications, IA, Cybersécurité", ranking: "Top 3 écoles d'ingénieurs"}
  ],
  sciPublications: "~12 000/an",
  patents: "~500/an",
  literacyRate: "77.7%",
  higherEducationRate: "38%",

  // LOGISTICS
  logistics: {
    ports: [
      {name: "Tanger Med", capacity: "9 M TEU/an", operator: "APM Terminals / Marsa Maroc", draft: "18 m", note: "1er port d'Afrique, 23e mondial"},
      {name: "Casablanca", capacity: "1.4 M TEU/an", operator: "Marsa Maroc / Somaport", draft: "14 m"},
      {name: "Jorf Lasfar", capacity: "Port industriel (OCP)", operator: "Marsa Maroc", draft: "15 m"},
      {name: "Nador West Med", capacity: "3 M TEU (en construction)", operator: "TMPA", draft: "18 m"}
    ],
    airports: [
      {name: "Mohammed V (Casablanca)", traffic: "12 M pax/an", freight: "87 000 t"},
      {name: "Marrakech-Menara", traffic: "7 M pax/an", freight: "Non disponible"},
      {name: "Rabat-Salé", traffic: "1.5 M pax/an", freight: "Non disponible"}
    ],
    railway: "2 200 km de voies, LGV Al Boraq (Tanger-Casa 2h). Extension LGV vers Marrakech et Agadir planifiée.",
    roads: "57 000 km (dont 1 800 km d'autoroutes). Réseau en bon état.",
    corridors: "Corridor Tanger Med — Afrique de l'Ouest, Liaison maritime vers EU (Algeciras, Marseille, Gênes)",
    containerCost: "~800 USD/conteneur export",
    customsDelay: "4 jours (moyen)",
    logisticZones: ["Tanger Med Logistics Zone", "MITA Casablanca", "Kénitra Atlantic Free Zone"],
    maritimeConnectivity: "Lignes régulières vers Algeciras, Barcelone, Marseille, Gênes, Rotterdam, Hambourg"
  },

  // TRADE & INVESTMENT
  trade: {
    topExports: [
      {product: "Automobiles & pièces", value: "€12 Mds", destination: "UE (France, Espagne, Allemagne)"},
      {product: "Phosphates & dérivés", value: "€5.2 Mds", destination: "Inde, Brésil, UE, Afrique"},
      {product: "Câblage électrique", value: "€3.5 Mds", destination: "UE"},
      {product: "Textile & habillement", value: "€4 Mds", destination: "France, Espagne, UK"},
      {product: "Aéronautique", value: "€2 Mds", destination: "France, USA"},
      {product: "Produits agricoles", value: "€3.5 Mds", destination: "UE, Russie"},
      {product: "Électronique", value: "€2 Mds", destination: "UE"},
      {product: "Produits de la mer", value: "€2.5 Mds", destination: "UE, Japon"}
    ],
    topImports: [
      {product: "Produits énergétiques", value: "€12 Mds", origin: "USA, Arabie Saoudite, Russie"},
      {product: "Machines & équipements", value: "€5 Mds", origin: "Chine, UE"},
      {product: "Céréales", value: "€3 Mds", origin: "France, Ukraine, Canada"},
      {product: "Matières plastiques", value: "€2 Mds", origin: "UE, Asie"},
      {product: "Véhicules & pièces", value: "€2.5 Mds", origin: "UE, Turquie"}
    ],
    tradeBalance: "-€18 Mds (2024)",
    fdiInward: {stock: "€65 Mds", flow: "€2.3 Mds/an", topInvestors: ["France", "Émirats arabes unis", "USA", "Espagne", "UK"]},
    fdiOutward: "€5 Mds stock (principalement Afrique subsaharienne)",
    tradeAgreements: ["ZLECAF", "Accord d'Association UE-Maroc", "Accord Agadir (Tunisie, Égypte, Jordanie)", "ALE USA-Maroc", "ALE Turquie-Maroc"],
    taxRegime: {is: "IS 20-35% (progressif)", tva: "TVA 20%", conventions: "60+ conventions fiscales (dont France, USA, UK)"},
    freeZones: "Tanger Med, CFC, Atlantic Free Zone — IS 0% pendant 5 ans puis 20%",
    profitRepatriation: "Libre transfert pour investissements étrangers enregistrés. Aucune restriction majeure.",
    bit: "72 traités bilatéraux d'investissement signés"
  },

  // DEMOGRAPHICS
  demographics: {
    totalPopulation: "37.8 millions (2025)",
    growthRate: "1.0%/an",
    ageStructure: "27% de 0-14 ans, 66% de 15-64 ans, 7% de 65+ ans. Âge médian: 30 ans.",
    urbanPopulation: "65%",
    unemployment: "13.0% (2024)",
    youthUnemployment: "35.8%",
    hdi: "0.698 — Rang 120/191",
    lifeExpectancy: "77 ans",
    middleClass: "34% de la population (revenu journalier 10-20 USD)",
    millionaires: "5 600 (Knight Frank 2024)",
    diasporaFrance: "1.5 million en France, 3 millions en Europe",
    languages: "Arabe, Amazigh (officielles), Français (langue des affaires)",
    literacy: "77.7%"
  },

  // RISK & OPPORTUNITIES
  risks: {
    political: {score: 4, comment: "Monarchie stable, tensions sociales limitées. Contentieux Sahara occidental."},
    security: {score: 3, comment: "Faible menace terroriste, forces de sécurité efficaces."},
    economic: {score: 4, comment: "Dépendance énergétique et céréalière. Déficit commercial structurel."},
    regulatory: {score: 4, comment: "Cadre juridique en amélioration. Corruption persistante dans l'administration."},
    logistic: {score: 3, comment: "Excellentes infrastructures portuaires et autoroutières. LGV opérationnel."},
    miningOpportunity: {score: 9, comment: "Leader mondial des phosphates. Cobalt, fluorine, barytine."},
    industrialOpportunity: {score: 8, comment: "Hub automobile et aéronautique. Zones franches attractives."},
    digitalOpportunity: {score: 7, comment: "CFC, startups tech, 90% pénétration internet, fibre en expansion."},
    overallRisk: 3.6,
    overallOpportunity: 8.0,
    recommendation: "Investir"
  }
};

// ============================================================
// NIGERIA
// Sources: IMF WEO Oct 2024, NBS Nigeria, CBN, NNPC, NPA, FAAN,
// Trading Economics, PwC Nigeria Budget Outlook 2025,
// Transparency International 2024, World Bank WGI 2024,
// Nairametrics, Premium Times, Channels TV, Guardian Nigeria
// ============================================================

export const DATA_NIGERIA: Country = {
  id: "NG",
  name: "Nigeria",
  officialName: "Federal Republic of Nigeria",
  flag: "🇳🇬",
  region: "africa",
  capital: "Abuja",
  area: "923 768 km²",
  population: "~224 millions (2025)",
  density: "242 hab/km²",
  gdpNominal: "~253 Mds USD (2024, rebased NBS)",
  gdpPPP: "~1 320 Mds USD (2024)",
  gdpPerCapita: "~1 130 USD (nominal, 2024)",
  gdpGrowth: [
    {year: "2021", value: 3.6},
    {year: "2022", value: 3.3},
    {year: "2023", value: 2.9},
    {year: "2024", value: 3.2},
    {year: "2025", value: 3.9}
  ],
  inflation: "34.8% (déc. 2024) / ~15.1% (déc. 2025, rebasé 2024)",
  debtToGDP: "52.9% (2024)",
  tradeBalance: "+$11.4 Mds USD (2024, surplus — excédent pétrolier)",
  currency: "Naira nigérian (NGN)",
  exchangeRateEUR: "1 EUR = ~1 740 NGN (2025)",
  exchangeRateUSD: "1 USD = ~1 535 NGN (taux officiel 2024)",
  corruptionIndex: "Score 26/100 — Rang 140/180 (TI 2024)",
  easeBusiness: "Rang 131/190 (World Bank 2020)",
  politicalStability: "-2.0 (World Bank 2024)",
  riskScore: 6,
  riskLabel: "Élevé",
  recommendation: "Sélectif — Secteurs pétrolier, télécoms, ciment, agroalimentaire",
  timezone: "UTC+1 (WAT)",
  languages: "Anglais (officiel), Haoussa, Yoruba, Igbo, + 500 langues locales",
  religions: "Islam ~50%, Christianisme ~48%, religions traditionnelles ~2%",
  memberships: ["UA", "CEDEAO (ECOWAS)", "OCI", "Commonwealth", "OPEP", "ZLECAF (AfCFTA)", "G77"],

  // MINERALS
  minerals: [
    {
      name: "Pétrole brut",
      type: "Hydrocarbure / Énergie",
      annualProduction: "~1.58 Mbpd — y compris condensats (2024)",
      worldRank: "1er producteur africain, 13e mondial",
      reserves: "23 milliards de barils prouvés",
      deposits: [
        {name: "Erha Field (offshore profond)", location: "3.5°N, 4.5°E", stage: "Production", operator: "ExxonMobil / SNEPCO", nationality: "USA", ownership: "JV avec NNPC"},
        {name: "Bonga Field (offshore profond)", location: "4.0°N, 3.7°E", stage: "Production", operator: "Shell (SNEPCO)", nationality: "UK/Pays-Bas", ownership: "JV Shell/NNPC/TotalEnergies/Eni"},
        {name: "Escravos (Niger Delta)", location: "5.5°N, 5.2°E", stage: "Production", operator: "Chevron Nigeria", nationality: "USA", ownership: "JV NNPC 60%/Chevron 40%"},
        {name: "OML 58 (Terra Nova)", location: "Niger Delta onshore", stage: "Production", operator: "TotalEnergies EP Nigeria", nationality: "France", ownership: "JV NNPC/TotalEnergies"},
        {name: "Blocs OML Seplat (Delta/Edo/Imo)", location: "Niger Delta onshore", stage: "Production", operator: "Seplat Energy", nationality: "Nigeria", ownership: "Seplat Energy Plc"}
      ],
      exportRevenue: "~$40 Mds/an (pétrole brut 2024)",
      regulation: "Petroleum Industry Act (PIA) 2021 — régime fiscal réformé. NNPC Ltd (privatisé commercial). Royalties 5-20% selon profondeur.",
      crmaRelevance: "Non applicable (hydrocarbure)"
    },
    {
      name: "Gaz naturel",
      type: "Hydrocarbure / Énergie",
      annualProduction: "~50 Bcm/an (dont ~70% encore torché ou réinjecté)",
      worldRank: "9e réserves mondiales prouvées",
      reserves: "209 000 Mm³ prouvés (3e africain)",
      deposits: [
        {name: "Liquéfaction NLNG (Bonny Island)", location: "4.44°N, 7.17°E", stage: "Production / Export LNG", operator: "Nigeria LNG Ltd (NLNG)", nationality: "Nigeria/international", ownership: "NNPC 49%, Shell 25.6%, TotalEnergies 15%, Eni 10.4%"}
      ],
      exportRevenue: "~$7 Mds LNG exports (2024)",
      regulation: "PIA 2021. Objectif «Decade of Gas». NLNG Train 7 en construction (capacité +35%).",
      crmaRelevance: "Non applicable"
    },
    {
      name: "Étain (Cassitérite)",
      type: "Industriel / Électronique",
      annualProduction: "~6 000 t étain contenu (2024)",
      worldRank: "Top 15 mondial",
      reserves: "Non disponible officiellement",
      deposits: [
        {name: "Plateau de Jos (État du Plateau)", location: "9.55°N, 8.89°E", stage: "Production artisanale et semi-industrielle", operator: "Opérateurs artisanaux multiples + quelques industriels", nationality: "Nigeria / international", ownership: "Licences minières privées — MMSD"},
        {name: "Nassarawa", location: "8.53°N, 7.71°E", stage: "Exploration / Production", operator: "Divers", nationality: "Nigeria", ownership: "Mixte public-privé"}
      ],
      exportRevenue: "~$50 M USD (estimation)",
      regulation: "Nigerian Minerals and Mining Act 2007. Royalties 3-5%. Cadastre minier géré par le Mining Cadastre Office.",
      crmaRelevance: "Modérée — Étain sur liste CRM EU"
    },
    {
      name: "Coltan (Colombite-Tantalite)",
      type: "Batterie / Électronique critique",
      annualProduction: "~210 t Ta₂O₅ équivalent (2024, estimation)",
      worldRank: "Top 10 mondial",
      reserves: "Significatives — État du Plateau, Kogi, Nasarawa",
      deposits: [
        {name: "Gidan-Tagwai (Nasarawa)", location: "8.44°N, 8.12°E", stage: "Production artisanale", operator: "Artisanal Mining Groups (AMG)", nationality: "Nigeria", ownership: "Licences artisanales"},
        {name: "Kogi State deposits", location: "7.80°N, 6.74°E", stage: "Exploration", operator: "Diverses juniors minières", nationality: "Nigeria/international", ownership: "Privé"}
      ],
      exportRevenue: "~$30-50 M USD (estimation)",
      regulation: "Mining Act 2007. Problèmes de traçabilité et d'exploitation artisanale non régulée.",
      crmaRelevance: "Très élevée — Tantale sur liste CRM EU; coltan stratégique pour batteries et condensateurs"
    },
    {
      name: "Or",
      type: "Précieux",
      annualProduction: "~3-5 t or fin déclaré (production artisanale dominante 2024)",
      worldRank: "6e réserves africaines (21 Mt évaluées)",
      reserves: "Estimé à 21 Mt valorisées à ~1 Md USD (2023)",
      deposits: [
        {name: "Osun-Ijero (Sud-Ouest)", location: "7.80°N, 4.75°E", stage: "Production artisanale", operator: "Opérateurs locaux", nationality: "Nigeria", ownership: "Privé / artisanal"},
        {name: "Birnin Gwari (Kaduna)", location: "11.00°N, 6.77°E", stage: "Production artisanale", operator: "Artisanal", nationality: "Nigeria", ownership: "Artisanal"},
        {name: "Maru (Zamfara)", location: "12.35°N, 6.63°E", stage: "Production artisanale (zone conflictuelle)", operator: "Artisanal", nationality: "Nigeria", ownership: "Artisanal — sécurité préoccupante"}
      ],
      exportRevenue: "Non disponible (large part informelle)",
      regulation: "Mining Act 2007. Forte proportion d'exploitation artisanale non déclarée. Programme de formalisation AMSCO/MMSD en cours.",
      crmaRelevance: "Faible (non sur liste CRM EU)"
    },
    {
      name: "Plomb / Zinc",
      type: "Industriel",
      annualProduction: "Non disponible officiel (production largement artisanale)",
      worldRank: "Non classé",
      reserves: "Importantes — États d'Ebonyi, Cross River, Benue",
      deposits: [
        {name: "Abakaliki (Ebonyi)", location: "6.32°N, 8.11°E", stage: "Production artisanale / semi-industrielle", operator: "Opérateurs privés", nationality: "Nigeria", ownership: "Privé"}
      ],
      exportRevenue: "Non disponible",
      regulation: "Mining Act 2007",
      crmaRelevance: "Modérée"
    },
    {
      name: "Calcaire (Limestone)",
      type: "Construction / Ciment",
      annualProduction: "~35 Mt (2024 — intrants industrie ciment)",
      worldRank: "Non classé",
      reserves: "Abondantes dans tous les États (Sokoto, Cross River, Ewekoro, Yandev)",
      deposits: [
        {name: "Yandev (Benue)", location: "7.47°N, 8.77°E", stage: "Production industrielle", operator: "Dangote Cement / Ashaka Cement", nationality: "Nigeria", ownership: "Dangote Industries / Holcim"},
        {name: "Ewekoro (Ogun)", location: "6.97°N, 3.26°E", stage: "Production industrielle", operator: "WAPCO / Lafarge Africa", nationality: "Nigeria / Suisse", ownership: "Holcim 82%"},
        {name: "Sokoto (Sokoto State)", location: "13.06°N, 5.24°E", stage: "Production industrielle", operator: "BUA Cement", nationality: "Nigeria", ownership: "BUA Group / Abdulsamad Rabiu"}
      ],
      exportRevenue: "Consommation domestique principalement",
      regulation: "Mining Act 2007. Secteur attractif pour industrie cimentière.",
      crmaRelevance: "Faible"
    },
    {
      name: "Charbon",
      type: "Énergie / Industriel",
      annualProduction: "~30 000 t (2024, très sous-exploité)",
      worldRank: "Non classé",
      reserves: "~2.7 milliards de tonnes (États d'Enugu, Kogi, Anambra, Benue)",
      deposits: [
        {name: "Onyeama Coal Mine (Enugu)", location: "6.54°N, 7.49°E", stage: "Production intermittente", operator: "Nigerian Coal Corporation", nationality: "Nigeria", ownership: "État fédéral"}
      ],
      exportRevenue: "Non disponible",
      regulation: "Mining Act 2007. Ressource historiquement peu développée face au pétrole.",
      crmaRelevance: "Faible"
    },
    {
      name: "Bitume naturel",
      type: "Construction / Industriel",
      annualProduction: "Non disponible (non exploité commercialement)",
      worldRank: "2e réserves mondiales prouvées",
      reserves: "42 milliards de tonnes (États d'Ondo, Lagos, Ogun, Edo) — les plus grandes après le Canada",
      deposits: [
        {name: "Agbabu (Ondo State)", location: "6.76°N, 4.82°E", stage: "Exploration / Pré-développement", operator: "Diverses compagnies (permis accordés)", nationality: "Nigeria / international", ownership: "Mixte"}
      ],
      exportRevenue: "Non disponible — ressource quasi inexploitée",
      regulation: "Mining Act 2007. Fort potentiel de développement — matériau d'infrastructure et exportation.",
      crmaRelevance: "Élevée — potentiel stratégique pour construction infrastructure Afrique"
    }
  ],

  // INDUSTRIES
  industries: {
    gdpBySector: {agriculture: 24, industry: 22, services: 51, mining: 3},
    keyIndustries: [
      {name: "Pétrole & Gaz", description: "Pilier historique de l'économie. NNPC Ltd (commercialisé 2023). PIA 2021 attire investissements upstream. Dangote Refinery (650 000 bpd) opérationnel 2024 — ambition 1.4 Mbpd d'ici 2028.", share: ">90% des recettes d'exportation"},
      {name: "Ciment & Matériaux de construction", description: "Dangote Cement (leader africain, 27.7 Mt/an, 2024), BUA Cement, Lafarge Africa. Nigeria = 1er producteur africain de ciment. Demande dopée par urbanisation et grands chantiers.", share: "Dangote Cement: ₦3 580 Mds revenus (2024)"},
      {name: "Télécommunications", description: "MTN Nigeria (leader), Airtel Nigeria, Glo, 9Mobile. Pénétration mobile 115%. Déploiement 5G en cours. Secteur fintech dynamique (Flutterwave, Paystack/Stripe, Interswitch).", share: "~14% du PIB (incluant services numériques)"},
      {name: "Agroalimentaire", description: "Agro-industrie dominée par Dangote Sugar, Flour Mills, BUA Foods, Nestlé Nigeria. Agriculture = 24% PIB. Cacao, sésame, noix de cajou, sorgho — principaux exports non-pétroliers.", share: "24% PIB agriculture"},
      {name: "Services financiers & Banque", description: "17 banques universelles régulées par CBN. Access Bank (1er par revenus), Zenith Bank, GTCO, UBA, First Bank. Boom du fintech (3 licences de banques numériques). Marché boursier NGX (Nigerian Exchange Group).", share: "Total actifs secteur bancaire: ~$180 Mds (2024)"},
      {name: "Raffinage & Pétrochimie", description: "Dangote Petroleum Refinery (650 000 bpd, la plus grande au monde lors de son lancement). Indorama Eleme Petrochemicals. Objectif: autosuffisance en carburant d'ici 2025.", share: "Capacité nationale de raffinage: ~975 000 bpd (2025)"}
    ],
    sez: [
      {name: "Lekki Free Trade Zone (LFTZ)", location: "Lagos", advantages: "Zone franche, exemption d'impôts, libre rapatriement des profits. Dangote Refinery en zone LFTZ. Partenariat Chine-Nigeria."},
      {name: "Calabar Free Trade Zone (CEPZA)", location: "Calabar (Cross River)", advantages: "1ère zone franche du Nigeria (1992). 152 ha. Exonération douanière totale, IS 0% en zone."},
      {name: "Kano Free Trade Zone", location: "Kano", advantages: "Zone agro-industrielle et manufacturière. Accès marché Afrique de l'Ouest et sahélienne."},
      {name: "Onne Oil & Gas Free Zone", location: "Rivers State", advantages: "Zone dédiée Oil & Gas. Hub de services pétroliers offshore. Exonérations fiscales et douanières."},
      {name: "Ogun-Guangdong Free Trade Zone", location: "Ogun State", advantages: "Joint-venture Nigeria-Chine. Manufacturier, textile, électronique. 3 000 ha."},
      {name: "Dangote Industries Free Zone", location: "Lekki (Lagos)", advantages: "Zone privée autour du complexe Dangote (raffinerie, engrais, pétrochimie). 2 500 ha."}
    ],
    majorProjects: [
      "Dangote Petroleum Refinery — 650 000 bpd opérationnel (2024), extension 1.4 Mbpd prévue 2028",
      "NLNG Train 7 (Bonny Island) — Ajout 8 Mtpa GNL, livraison ~2025-2026, investissement $4.5 Mds",
      "Lagos-Calabar Coastal Highway — 700 km de routes côtières, projet phare Tinubu",
      "Sokoto-Badagry Superhighway — 1 058 km, désenclavement Sahel et corridor atlantique",
      "Lekki Deep Sea Port — Capacité 2.5 M TEU/an, entièrement opérationnel depuis 2024",
      "Abuja-Kaduna-Kano Rail (Standard Gauge) — Extension vers Maradi (Niger) en construction",
      "Nigeria-Maroc Gas Pipeline — 5 660 km, pipeline régional structurant; études avancées",
      "Siemens Power Compact — 7 GW d'énergie additionnelle d'ici 2025 (accord gouvernemental)"
    ],
    banking: {
      mainBanks: ["Access Holdings (Access Bank)", "Zenith Bank", "Guaranty Trust Holding Company (GTCO)", "United Bank for Africa (UBA)", "First Bank of Nigeria", "Fidelity Bank", "Stanbic IBTC", "Union Bank"],
      totalAssets: "~$180 Mds (secteur consolidé 2024)",
      bancarisation: "~55% adultes (2024, incluant mobile money)"
    },
    telecom: {
      operators: ["MTN Nigeria (leader, ~40% de parts de marché)", "Airtel Nigeria", "Globacom (Glo)", "9Mobile"],
      mobilePenetration: "~115% (abonnements actifs 2024)",
      internetPenetration: "~55% (2024)"
    },
    energy: {
      mix: "Gaz 85%, Hydraulique 10%, Pétrole & autres 5% (capacité installée). Forte dépendance aux groupes électrogènes (délestages chroniques).",
      installedCapacity: "~15.7 GW (2024, dont seulement ~4-5 GW distribués effectivement)",
      renewableProjects: "Objectif 30 GW renouvelables d'ici 2030. Projets solaires off-grid en développement. Programme Siemens-FGN 7 GW."
    }
  },

  // TOP ENTERPRISES
  enterprises: [
    {
      name: "Dangote Industries Ltd (Groupe Dangote)",
      sector: "Conglomérat — Ciment, Raffinage, Sucre, Engrais, Sel",
      revenue: "~$20+ Mds (objectif consolidé 2024, incluant raffinerie)",
      employees: "30 000+",
      ceo: "Aliko Dangote (Président fondateur) / Arvind Pathak (CEO Dangote Cement)",
      shareholding: "Aliko Dangote ~85% (Dangote Cement coté); Dangote Industries Ltd privé",
      listed: "Dangote Cement: Nigerian Exchange Group (DANGCEM). Dangote Sugar (DANGSUGAR). Dangote Industries Ltd non coté.",
      founded: "1981",
      hq: "Lagos",
      website: "dangote.com"
    },
    {
      name: "MTN Nigeria Communications Plc",
      sector: "Télécommunications",
      revenue: "₦3 000+ Mds (2024)",
      employees: "~5 000 directs",
      ceo: "Karl Toriola",
      shareholding: "MTN Group SA 75.6%, flottant public 24.4%",
      listed: "Nigerian Exchange Group (MTNN)",
      founded: "2001",
      hq: "Lagos",
      website: "mtnonline.com"
    },
    {
      name: "Access Holdings Plc (Access Bank)",
      sector: "Banque / Services financiers",
      revenue: "₦4 900 Mds (2024) — 1ère banque par revenus",
      employees: "28 000+",
      ceo: "Bolaji Agbede (Group CEO interim 2024-2025)",
      shareholding: "Flottant public (coté NGX)",
      listed: "Nigerian Exchange Group (ACCESSCORP)",
      founded: "1989",
      hq: "Lagos",
      website: "accessbankplc.com"
    },
    {
      name: "Zenith Bank Plc",
      sector: "Banque",
      revenue: "₦4 000 Mds (2024)",
      employees: "8 500+",
      ceo: "Adaora Umeoji",
      shareholding: "Flottant institutionnel et public",
      listed: "Nigerian Exchange Group (ZENITHBANK) / London Stock Exchange (GDR)",
      founded: "1990",
      hq: "Lagos",
      website: "zenithbank.com"
    },
    {
      name: "Guaranty Trust Holding Company (GTCO)",
      sector: "Banque / Fintech / Services financiers diversifiés",
      revenue: "₦3 200 Mds (2024 estimation)",
      employees: "12 000+",
      ceo: "Segun Agbaje",
      shareholding: "Flottant institutionnel et public",
      listed: "Nigerian Exchange Group (GTCO) / London Stock Exchange (GDR)",
      founded: "1990",
      hq: "Lagos",
      website: "gtbank.com"
    },
    {
      name: "United Bank for Africa (UBA) Plc",
      sector: "Banque — Présence 20+ pays africains",
      revenue: "₦2 800 Mds (2024 estimation)",
      employees: "25 000+ (groupe Afrique)",
      ceo: "Oliver Alawuba",
      shareholding: "Tony Elumelu ~5%, flottant",
      listed: "Nigerian Exchange Group (UBA)",
      founded: "1949",
      hq: "Lagos",
      website: "ubagroup.com"
    },
    {
      name: "Seplat Energy Plc",
      sector: "Exploration & Production pétrolière et gazière",
      revenue: "₦1 652 Mds (~$1.1 Md USD, 2024)",
      employees: "1 200+",
      ceo: "Roger Brown",
      shareholding: "SEPLAT Petroleum Development Co. / Platform Petroleum (partenaires fondateurs) + flottant",
      listed: "Nigerian Exchange Group (SEPLAT) / London Stock Exchange (SEPL)",
      founded: "2009",
      hq: "Lagos",
      website: "seplatnigeria.com"
    },
    {
      name: "Nigerian National Petroleum Company Ltd (NNPC Ltd)",
      sector: "Pétrole & Gaz — Entreprise nationale",
      revenue: "Non disponible publiquement (commercialisé 2023 sous PIA 2021)",
      employees: "15 000+",
      ceo: "Bayo Ojulari (Group CEO, nommé 2025)",
      shareholding: "État fédéral nigérian 100%",
      listed: "Non coté (NNPC Ltd — entité commerciale depuis PIA 2021)",
      founded: "1977 (NNPC) / 2022 (NNPC Ltd)",
      hq: "Abuja",
      website: "nnpcgroup.com"
    },
    {
      name: "Nigeria LNG Limited (NLNG)",
      sector: "Gaz naturel liquéfié — Export LNG",
      revenue: "~$7 Mds (2024, estimation ventes LNG)",
      employees: "3 500+ directs",
      ceo: "Philip Mshelbila",
      shareholding: "NNPC 49%, Shell 25.6%, TotalEnergies 15%, Eni 10.4%",
      listed: "Non coté",
      founded: "1989",
      hq: "Port Harcourt",
      website: "nlng.com"
    },
    {
      name: "BUA Cement Plc",
      sector: "Ciment & Matériaux de construction",
      revenue: "₦876 Mds (~$584 M USD, 2024)",
      employees: "5 000+",
      ceo: "Yusuf Binji",
      shareholding: "Abdulsamad Rabiu (BUA Group) ~98%",
      listed: "Nigerian Exchange Group (BUACEMENT)",
      founded: "2020 (fusion Cement Co. of Northern Nigeria + Obu Cement)",
      hq: "Lagos",
      website: "buacement.com"
    },
    {
      name: "BUA Foods Plc",
      sector: "Agroalimentaire — Sucre, Farine, Pâtes, Huile",
      revenue: "₦1 300 Mds (2024, estimation)",
      employees: "8 000+",
      ceo: "Ayodele Abioye",
      shareholding: "Abdulsamad Rabiu (BUA Group) ~97%",
      listed: "Nigerian Exchange Group (BUAFOODS)",
      founded: "2021 (scission de BUA International)",
      hq: "Lagos",
      website: "buafoods.com"
    },
    {
      name: "Airtel Africa Plc",
      sector: "Télécommunications (14 pays africains)",
      revenue: "$1.9 Mds (2024, groupe Afrique)",
      employees: "~4 000 directs Afrique",
      ceo: "Sunil Taldar",
      shareholding: "Airtel Africa (Bharti Airtel) ~57%, flottant",
      listed: "London Stock Exchange (AAF) / Nigerian Exchange Group (AIRTELAFRI)",
      founded: "2010 (opérations Nigeria depuis 2001)",
      hq: "Lagos (Nigeria) / Londres",
      website: "airtelafrica.com"
    },
    {
      name: "First Bank of Nigeria Holdings",
      sector: "Banque",
      revenue: "₦2 500 Mds (2024, estimation)",
      employees: "8 000+",
      ceo: "Olusegun Alebiosu",
      shareholding: "FBN Holdings coté — actionnariat institutionnel et public",
      listed: "Nigerian Exchange Group (FBNH)",
      founded: "1894",
      hq: "Lagos",
      website: "firstbanknigeria.com"
    },
    {
      name: "Flour Mills of Nigeria Plc",
      sector: "Agroalimentaire — Farine, Agro-industrie, Engrais",
      revenue: "₦2 100 Mds (2024, estimation)",
      employees: "6 500+",
      ceo: "Omoboyede Olusanya",
      shareholding: "George Coumantaros family ~56%, flottant",
      listed: "Nigerian Exchange Group (FLOURMILL)",
      founded: "1960",
      hq: "Lagos",
      website: "flourmillsofnigeria.com"
    },
    {
      name: "Nestlé Nigeria Plc",
      sector: "Agroalimentaire (FMCG) — Milo, Maggi, Nescafé",
      revenue: "₦700 Mds (2024, estimation)",
      employees: "2 500+",
      ceo: "Wassim Elhusseini",
      shareholding: "Nestlé SA (Suisse) 66.3%, flottant local 33.7%",
      listed: "Nigerian Exchange Group (NESTLE)",
      founded: "1961",
      hq: "Lagos",
      website: "nestle-cwa.com"
    },
    {
      name: "Julius Berger Nigeria Plc",
      sector: "Construction & Infrastructure",
      revenue: "₦800 Mds (2024, estimation)",
      employees: "15 000+ (dont sous-traitants)",
      ceo: "Lars Richter",
      shareholding: "Bilfinger SE (Allemagne) ~50.3%, flottant",
      listed: "Nigerian Exchange Group (JBERGER)",
      founded: "1965",
      hq: "Abuja",
      website: "julius-berger.com"
    },
    {
      name: "TotalEnergies EP Nigeria Ltd / TotalEnergies Marketing Nigeria",
      sector: "Énergie — E&P et Distribution",
      revenue: "Non disponible séparément (filiale TotalEnergies SE)",
      employees: "1 200+",
      ceo: "Non disponible",
      shareholding: "TotalEnergies SE (France) 100%",
      listed: "Non coté (filiale) / TotalEnergies SE coté NYSE/Euronext Paris (TTE)",
      founded: "1962 (présence Nigeria)",
      hq: "Lagos / Port Harcourt",
      website: "totalenergies.com.ng"
    },
    {
      name: "Oando Plc",
      sector: "Énergie — E&P, Distribution, Gaz",
      revenue: "₦2 000 Mds (2024, estimation)",
      employees: "2 500+",
      ceo: "Wale Tinubu",
      shareholding: "Wale Tinubu & Ocean & Oil Holdings ~60%, flottant",
      listed: "Nigerian Exchange Group (OANDO) / Johannesburg Stock Exchange (JSE)",
      founded: "2003 (fusion Unipetrol/Agip marketing assets)",
      hq: "Lagos",
      website: "oandoplc.com"
    },
    {
      name: "Lafarge Africa Plc (WAPCO)",
      sector: "Ciment & Matériaux de construction",
      revenue: "₦850 Mds (2024, estimation)",
      employees: "2 000+",
      ceo: "Khaled El Dokani",
      shareholding: "Holcim (Suisse) ~82%, flottant local",
      listed: "Nigerian Exchange Group (WAPCO)",
      founded: "1959",
      hq: "Lagos",
      website: "lafricaonline.com"
    },
    {
      name: "Interswitch Group",
      sector: "Fintech / Paiements numériques",
      revenue: "~$150 M USD (2024, estimation)",
      employees: "1 200+",
      ceo: "Mitchell Elegbe",
      shareholding: "Mitchell Elegbe / Helios Investment Partners / Visa ~20%",
      listed: "Non coté (unicorne fintech, valorisé $1 Md)",
      founded: "2002",
      hq: "Lagos",
      website: "interswitchgroup.com"
    }
  ],

  // BILLIONAIRES & POWER PLAYERS
  billionaires: [
    {
      name: "Aliko Dangote",
      fortune: "~$13.5 Mds USD (2025) — Homme le plus riche d'Afrique",
      source: "Ciment, Raffinage pétrolier, Sucre, Sel, Engrais",
      companies: "Dangote Industries Ltd, Dangote Cement, Dangote Petroleum Refinery",
      age: "67",
      education: "Université Al-Azhar (Égypte), Maîtrise Commerce London",
      bio: "Fondateur et président du groupe Dangote — le plus grand conglomérat industriel africain. Sa raffinerie de 650 000 bpd (la plus grande au monde) est entrée en production en 2024, projetant sa fortune vers $24 Mds. Président de la Dangote Foundation."
    },
    {
      name: "Abdulsamad Rabiu",
      fortune: "~$7.9 Mds USD (2025)",
      source: "Ciment (BUA Cement), Agroalimentaire (BUA Foods), Sucre",
      companies: "BUA Group, BUA Cement Plc, BUA Foods Plc",
      age: "64",
      education: "King's College London (UK)",
      bio: "Fondateur du BUA Group — 2e fortune nigériane. BUA Cement contrôle des mines de calcaire au Sokoto et dans d'autres États. BUA Foods leader du sucre et de la farine."
    },
    {
      name: "Mike Adenuga",
      fortune: "~$4.6 Mds USD (2025)",
      source: "Télécommunications (Glo), Pétrole, Banque",
      companies: "Globacom Ltd, Conoil Plc, Equitorial Trust Bank",
      age: "72",
      education: "Université d'Ife (Obafemi Awolowo University)",
      bio: "Fondateur de Globacom (Glo) — 3e opérateur télécoms nigérian avec présence en 5 pays africains. Actif dans le pétrole via Conoil."
    },
    {
      name: "Femi Otedola",
      fortune: "~$2.8 Mds USD (2025)",
      source: "Pétrole (Forte Oil / Ardova), Banque, Énergie",
      companies: "Geregu Power Plc, First Bank of Nigeria (actionnaire majeur), Zenon Petroleum",
      age: "63",
      education: "Université de Lagos",
      bio: "Magnat de l'énergie et de la finance nigériane. Contrôle Geregu Power Plc (coté NGX). Actionnaire clé de First Bank après bataille de gouvernance 2021."
    },
    {
      name: "Tony Elumelu",
      fortune: "~$1.6 Mds USD (2025)",
      source: "Banque (UBA), Investissements, Philanthropie",
      companies: "Transcorp Plc, United Bank for Africa, Heirs Holdings",
      age: "61",
      education: "Université d'Ambrose Alli, Eko (MBA)",
      bio: "Président d'UBA et fondateur de la Fondation Tony Elumelu (TEF) — programme panafricain de soutien aux entrepreneurs. Ardent défenseur de l'Africapitalism."
    },
    {
      name: "Folorunsho Alakija",
      fortune: "~$2.5 Mds USD (2025) — Femme la plus riche du Nigeria",
      source: "Pétrole (Famfa Oil), Mode, Imprimerie",
      companies: "Famfa Oil Ltd, Rose of Sharon Group",
      age: "74",
      education: "Non disponible",
      bio: "PDG de Famfa Oil — opère le bloc pétrolier OML 127 (Agbami) avec Star Deep Water Petroleum (filiale Chevron). Première femme milliardaire d'Afrique selon Forbes."
    }
  ],

  // GOVERNMENT LEADERS
  leaders: {
    headOfState: {name: "Bola Ahmed Tinubu", since: "29 mai 2023", party: "APC (All Progressives Congress)", nextElection: "2027 (élection présidentielle)"},
    vicePresident: {name: "Kashim Shettima", since: "29 mai 2023", party: "APC"},
    keyMinisters: [
      {portfolio: "Finance & Coordonnateur de l'Économie", name: "Wale Edun"},
      {portfolio: "Affaires Étrangères", name: "Yusuf Tuggar"},
      {portfolio: "Défense", name: "Mohammed Badaru Abubakar"},
      {portfolio: "Ressources pétrolières (Pétrole & Gaz)", name: "Bola Tinubu (Président, interim)"},
      {portfolio: "État – Ressources pétrolières (Pétrole)", name: "Heineken Lokpobiri"},
      {portfolio: "État – Ressources pétrolières (Gaz)", name: "Ekperikpe Ekpo"},
      {portfolio: "Développement des Mines solides", name: "Dele Alake"},
      {portfolio: "Communications, Innovation & Économie numérique", name: "Bosun Tijani"},
      {portfolio: "Énergie", name: "Adebayo Adelabu"},
      {portfolio: "Industrie, Commerce & Investissement", name: "Doris Anite"},
      {portfolio: "Agriculture & Sécurité alimentaire", name: "Abubakar Kyari"},
      {portfolio: "Transport", name: "Sa'idu Ahmed Alkali"},
      {portfolio: "Travaux (Works)", name: "Dave Umahi"},
      {portfolio: "Santé & Protection sociale", name: "Muhammad Ali Pate"},
      {portfolio: "FCT (Territoire de la capitale fédérale)", name: "Nyesom Wike"},
      {portfolio: "Justice / Procureur général", name: "Lateef Fagbemi"},
      {portfolio: "Marine & Économie bleue", name: "Gboyega Oyetola"},
      {portfolio: "Logement & Développement urbain", name: "Ahmed Musa Dangiwa"},
      {portfolio: "Information & Orientation nationale", name: "Mohammed Idris Malagi"},
      {portfolio: "Aviation & Développement aérospatial", name: "Festus Keyamo"},
      {portfolio: "Développement de l'acier", name: "Shuaibu Audu"},
      {portfolio: "Budget & Planification économique", name: "Abubakar Atiku Bagudu"},
      {portfolio: "Ressources en eau & Assainissement", name: "Joseph Utsev"},
      {portfolio: "Environnement", name: "Balarabe Abbas Lawal"},
      {portfolio: "Tourisme", name: "Lola Ade-John"},
      {portfolio: "Sports", name: "John Enoh"},
      {portfolio: "Jeunesse", name: "Jamila Bio Ibrahim"},
      {portfolio: "Affaires des femmes", name: "Imaan Sulaiman-Ibrahim"},
      {portfolio: "Intérieur", name: "Olubunmi Tunji-Ojo"}
    ],
    centralBankGov: {name: "Olayemi (Yemi) Cardoso", institution: "Central Bank of Nigeria (CBN) — en poste depuis octobre 2023"},
    investmentAgency: {name: "Non disponible", institution: "Nigerian Investment Promotion Commission (NIPC)"},
    miningAuthority: {name: "Non disponible", institution: "Mining Cadastre Office (MCO) — sous le Ministère des Mines solides"},
    customs: {name: "Non disponible", institution: "Nigeria Customs Service (NCS)"},
    ambassadorFrance: {name: "Ayodele Oke (agrément accordé 2026)", institution: "Ambassadeur du Nigeria en France (nommé 2026)"},
    ambassadorFromFrance: {name: "Non disponible", institution: "Ambassade de France au Nigeria — Abuja"},
    unRepresentative: {name: "Sen. Jimoh Ibrahim (nommé 2026)", institution: "Représentant permanent du Nigeria à l'ONU"}
  },

  // CONTACTS
  contacts: {
    chambers: ["French-Nigerian Chamber of Commerce (FNCC)", "Lagos Chamber of Commerce & Industry (LCCI)", "Abuja Chamber of Commerce"],
    businessFrance: "Antenne Business France Lagos",
    bpifrance: "Non disponible — opérations indirectes via AFD",
    afd: "AFD Nigeria — Bureau Abuja",
    lawFirms: ["Aelex (Lagos)", "Aluko & Oyebode", "Banwo & Ighodalo", "PUNUKA Attorneys & Solicitors", "Gide Loyrette Nouel (présence régionale)"],
    big4: ["Deloitte Nigeria", "PwC Nigeria", "EY Nigeria", "KPMG Nigeria"],
    investmentBanks: ["Stanbic IBTC Capital", "Chapel Hill Denham", "Renaissance Capital Nigeria", "CardinalStone Partners"],
    patronat: "Manufacturers Association of Nigeria (MAN) / Nigerian Association of Chambers of Commerce (NACCIMA)",
    diaspora: "~1.7 million de Nigérians en Europe (dont ~60 000 en France)"
  },

  // UNIVERSITIES
  universities: [
    {name: "Covenant University", city: "Ota (Ogun State)", students: "12 000", specialties: "Business, Sciences, Ingénierie, Technologies", ranking: "1ère au Nigeria — THE World University Rankings 2024 (801-1000 mondial)"},
    {name: "University of Ibadan", city: "Ibadan (Oyo State)", students: "20 000+", specialties: "Médecine, Sciences sociales, Lettres, Sciences", ranking: "2e au Nigeria (THE 2024)"},
    {name: "Federal University of Technology Akure (FUTA)", city: "Akure (Ondo State)", students: "15 000", specialties: "Ingénierie, Technologie, Sciences appliquées", ranking: "3e au Nigeria (THE 2024)"},
    {name: "University of Lagos (UNILAG)", city: "Lagos", students: "50 000+", specialties: "Droit, Business, Sciences, Médecine", ranking: "4e au Nigeria (THE 2024)"},
    {name: "University of Nigeria, Nsukka (UNN)", city: "Nsukka (Enugu State)", students: "35 000", specialties: "Sciences humaines, Ingénierie, Agriculture", ranking: "Top 10 Nigeria"},
    {name: "Obafemi Awolowo University (OAU)", city: "Ile-Ife (Osun State)", students: "35 000", specialties: "Médecine, Droit, Sciences sociales", ranking: "Top 10 Nigeria"},
    {name: "Bayero University Kano", city: "Kano", students: "40 000", specialties: "Sciences islamiques, Technologie, Agriculture", ranking: "5e au Nigeria (THE 2024)"},
    {name: "University of Ilorin", city: "Ilorin (Kwara State)", students: "30 000", specialties: "Sciences médicales, Ingénierie, Sciences humaines", ranking: "Top 10 Nigeria"},
    {name: "Afe Babalola University", city: "Ado-Ekiti (Ekiti State)", students: "6 000", specialties: "Droit, Médecine, Sciences, Ingénierie", ranking: "Top 10 Nigeria (THE 2024)"}
  ],
  sciPublications: "~8 000/an",
  patents: "~200/an",
  literacyRate: "~62% (adultes 15+, 2021)",
  higherEducationRate: "~10% (taux de scolarisation supérieur)",

  // LOGISTICS
  logistics: {
    ports: [
      {name: "Lekki Deep Sea Port", capacity: "2.5 M TEU/an (phase 1)", operator: "CMA Terminals Nigeria / Tolaram Group", draft: "16.5 m", note: "Nouveau port en eau profonde, opérationnel 2024 — driver de croissance container"},
      {name: "Apapa Port Complex (Lagos)", capacity: "~1.5 M TEU/an", operator: "APM Terminals / ENL Consortium", draft: "13 m (upgrade prévu 16 m d'ici 2030)"},
      {name: "Tin Can Island Port (Lagos)", capacity: "~800 000 TEU/an", operator: "TICT (Tin Can Island Container Terminal)", draft: "10.5 m"},
      {name: "Onne Oil & Gas Free Zone Port", capacity: "Port industriel spécialisé O&G", operator: "Intels Nigeria", draft: "12.5 m", note: "Principal hub services pétroliers offshore"},
      {name: "Port Harcourt Port Complex", capacity: "~200 000 TEU/an", operator: "PTOL / Josepdam Ports & Logistics", draft: "8 m"},
      {name: "Calabar Port", capacity: "~100 000 TEU/an", operator: "NICT", draft: "7.5 m"}
    ],
    airports: [
      {name: "Murtala Muhammed International Airport (Lagos)", traffic: "16.8 M pax/an (2024)", freight: "150 M kg (2024)"},
      {name: "Nnamdi Azikiwe International Airport (Abuja)", traffic: "5.48 M pax/an (2024)", freight: "14.1 M kg"},
      {name: "Mallam Aminu Kano International Airport (Kano)", traffic: "~2 M pax/an (2024)", freight: "14.2 M kg"},
      {name: "Port Harcourt International Airport", traffic: "1.19 M pax/an (2024)", freight: "4 M kg"}
    ],
    railway: "~3 500 km de voies (voie étroite et voie standard). Lignes principales: Lagos-Ibadan (standard gauge, opérationnel 2021), Abuja-Kaduna. Extension Kaduna-Kano-Maradi en cours. Projet Lagos-Calabar coastal rail.",
    roads: "~195 000 km (dont ~5 000 km fédéraux). Qualité variable — réseau dégradé dans le Nord et certains États du Sud. Chantiers majeurs: Lagos-Calabar Coastal Highway (700 km), Sokoto-Badagry (1 058 km).",
    corridors: "Corridor Lagos — Abidjan (CEDEAO), Corridor Nord (Lagos-Kano-Maradi-Niamey), Corridor Niger Delta (pétrole & gaz)",
    containerCost: "~1 200-1 500 USD/conteneur export (délais douaniers et congestion portuaire pénalisants)",
    customsDelay: "7-12 jours (moyen — problème chronique de congestion portuaire Lagos)",
    logisticZones: ["Lekki Free Trade Zone", "Onne Oil & Gas Free Zone", "Calabar Free Trade Zone", "Ogun-Guangdong FTZ"],
    maritimeConnectivity: "Lignes régulières: Maersk, MSC, CMA CGM, Hapag-Lloyd, Evergreen. Principaux ports connectés: Rotterdam, Hambourg, Shanghai, Singapore, Le Havre"
  },

  // TRADE & INVESTMENT
  trade: {
    topExports: [
      {product: "Pétrole brut", value: "~$40 Mds", destination: "Inde, Pays-Bas, Espagne, France, USA"},
      {product: "Gaz naturel liquéfié (LNG)", value: "~$7 Mds", destination: "Europe (Espagne, France, Portugal, Italie), Asie"},
      {product: "Produits pétroliers raffinés", value: "~$3 Mds (2024, Dangote Refinery)", destination: "Afrique de l'Ouest"},
      {product: "Cacao & dérivés", value: "~$1.5 Mds", destination: "UE, USA"},
      {product: "Sésame", value: "~$500 M", destination: "Chine, Inde, Japon"},
      {product: "Noix de cajou", value: "~$400 M", destination: "Asie, UE"},
      {product: "Minéraux solides (Coltan, Étain, Or)", value: "~$200-300 M", destination: "Asie, Europe"}
    ],
    topImports: [
      {product: "Carburants & produits pétroliers raffinés", value: "~$10 Mds (avant raffinerie Dangote)", origin: "Europe, USA, Asie"},
      {product: "Machines & équipements industriels", value: "~$5 Mds", origin: "Chine, UE, USA"},
      {product: "Produits alimentaires (blé, riz, sucre)", value: "~$4 Mds", origin: "Brésil, USA, Ukraine, Inde"},
      {product: "Véhicules & pièces", value: "~$2 Mds", origin: "Chine, Japon, UE"},
      {product: "Médicaments & équipements médicaux", value: "~$1.5 Mds", origin: "Inde, UE, USA"},
      {product: "Produits chimiques", value: "~$1.5 Mds", origin: "Chine, UE"}
    ],
    tradeBalance: "+$11.4 Mds USD (2024 — excédent commercial, dopé exportations pétrolières)",
    fdiInward: {stock: "$69.2 Mds (2024)", flow: "$1.08 Mds (FDI direct 2024)", topInvestors: ["UK", "USA", "Chine", "Pays-Bas", "France", "Afrique du Sud"]},
    fdiOutward: "Limité — essentiellement Afrique de l'Ouest (UBA, Access Bank, GTBank présents dans 20+ pays)",
    tradeAgreements: ["AfCFTA (gazetted 2025 — 90% zéro droits intra-Afrique)", "ECOWAS (CEDEAO) — ETLS", "AGOA (Africa Growth and Opportunity Act — USA)", "Commonwealth Preference"],
    taxRegime: {is: "IS 30% (grandes entreprises), 20% (PME), 0% (micro)", tva: "TVA 7.5%", conventions: "~15 conventions fiscales (dont UK, France, Chine, Pays-Bas)"},
    freeZones: "Zones franches sous NEPZA — IS 0%, exonération douanière, rapatriement libre des profits",
    profitRepatriation: "Autorisé — soumis à justification de l'investissement initial. Contrôles CBN possibles en période de pression sur le NGN.",
    bit: "22 traités bilatéraux d'investissement signés (dont France, UK, USA, Chine)"
  },

  // DEMOGRAPHICS
  demographics: {
    totalPopulation: "~224 millions (2025)",
    growthRate: "2.4%/an — l'une des plus rapides au monde",
    ageStructure: "43% de 0-14 ans, 54% de 15-64 ans, 3% de 65+ ans. Âge médian: 18 ans.",
    urbanPopulation: "~54% (2024, urbanisation rapide)",
    unemployment: "~4.2% officiel NBS (redéfini 2023) — mais sous-emploi très élevé (~55%)",
    youthUnemployment: "~23% actifs cherchant emploi + 32% sous-employés (WEF 2025)",
    hdi: "0.548 — Rang 163/191 (PNUD 2024)",
    lifeExpectancy: "55 ans",
    middleClass: "~11% de la population (revenu journalier >10 USD)",
    millionaires: "~39 000 (Knight Frank 2024)",
    diasporaFrance: "~60 000 Nigérians en France, ~1.7 millions en Europe",
    languages: "Anglais (officiel), Haoussa, Yoruba, Igbo — + 500 langues locales",
    literacy: "~62% adultes (15+)"
  },

  // RISK & OPPORTUNITIES
  risks: {
    political: {score: 7, comment: "Démocratie fédérale fragile. Élections contestées (2023). Rivalités ethniques et religieuses. Gouvernance régionale très inégale. Réformes Tinubu courageuses mais socialement douloureuses (suppression subvention carburant 2023)."},
    security: {score: 8, comment: "Menace Boko Haram / ISWAP au Nord-Est. Banditisme armé au Nord-Ouest (Zamfara, Katsina). Instabilité Niger Delta récurrente. Revendications sécessionnistes Biafra (IPOB, Sud-Est). Enlèvements fréquents."},
    economic: {score: 6, comment: "Inflation élevée (34.8% déc. 2024). Dépendance pétrolière structurelle. Naira sous pression depuis flottement 2023. Dangote Refinery potentiellement transformateur pour réduire importations carburant."},
    regulatory: {score: 6, comment: "PIA 2021 réformateur pour le secteur pétrolier. Mining Act 2007 peu appliqué. Corruption persistante (score 26/100 TI 2024). Bureaucratie lourde malgré efforts de digitalisation (NIPC One-Stop-Shop)."},
    logistic: {score: 7, comment: "Congestion portuaire chronique (Apapa). Infrastructures routières dégradées hors grands axes. Énergie insuffisante (load shedding permanent). Lekki Deep Sea Port nouveau point positif."},
    miningOpportunity: {score: 7, comment: "Immense sous-sol inexploité (coltan, étain, or, bitume, charbon). Secteur minier = seulement 0.3% du PIB — potentiel de multiplication x5 à x10. Initiative Gouvernement Tinubu / Ministre Dele Alake pour formaliser l'artisanal mining."},
    industrialOpportunity: {score: 7, comment: "Dangote Refinery = réduction importations carburant et chimie. Ciment = export potentiel Afrique de l'Ouest. Agroalimentaire dopé par population 224 M. Zones franches actives."},
    digitalOpportunity: {score: 8, comment: "Écosystème fintech africain le plus dynamique (Lagos = Silicon Savannah). Flutterwave, Paystack, Interswitch, Kuda, PalmPay. 55% pénétration internet, croissance rapide 5G. Programme Bosun Tijani: 3 millions de jeunes formés au numérique."},
    overallRisk: 6.8,
    overallOpportunity: 7.3,
    recommendation: "Sélectif — Secteurs: Pétrole & Gaz (PIA reformed), Ciment, Télécoms & Fintech, Agroalimentaire, Mines solides (long terme)"
  }
};

// Export for use in RAQIB platform

// --- SENEGAL, CÔTE D'IVOIRE, GHANA DATA ---
// ============================================================
// RAQIB Corridor Intelligence Platform
// Data File — Part 2: Senegal, Côte d'Ivoire, Ghana
// Generated: April 2026 — Sources: IMF WEO 2024/2025, World Bank,
// Transparency International 2024, USGS Mineral Yearbook 2024,
// BCEAO, Bank of Ghana, Endeavour Mining, Woodside Energy,
// Ghana Minerals Commission, Trading Economics, OEC World,
// African Development Bank, ECOWAS, Reuters Africa
// ============================================================

// ============================================================
// SÉNÉGAL
// Sources: ANSD Sénégal, BCEAO, Ministère des Finances Sénégal,
// IMF Art. IV 2024, Endeavour Mining, Woodside Energy,
// Resolute Mining, Eramet, Industries Chimiques du Sénégal,
// Sonatel / Orange, Transparency International 2024
// ============================================================

export const DATA_SENEGAL: Country = {
  id: "SN",
  name: "Sénégal",
  officialName: "République du Sénégal",
  flag: "🇸🇳",
  region: "africa",
  capital: "Dakar",
  area: "196 722 km²",
  population: "~18.5 millions (2025)",
  density: "94 hab/km²",
  gdpNominal: "~31 Mds USD (2025)",
  gdpPPP: "~72 Mds USD (2025)",
  gdpPerCapita: "~1 670 USD (nominal 2025)",
  gdpGrowth: [
    {year: "2021", value: 6.5},
    {year: "2022", value: 4.8},
    {year: "2023", value: 4.4},
    {year: "2024", value: 7.1},
    {year: "2025", value: 8.8}
  ],
  inflation: "4.9% (2024)",
  debtToGDP: "99.7% (2024, révisé à la hausse par FMI)",
  tradeBalance: "-4.2 Mds USD (2024, hors pétrole)",
  currency: "Franc CFA de l'Afrique de l'Ouest (XOF)",
  exchangeRateEUR: "1 EUR = 655.96 XOF (fixe BCEAO)",
  exchangeRateUSD: "1 USD ≈ 605 XOF (2025)",
  corruptionIndex: "Score 43/100 — Rang 75/180 (TI 2024)",
  easeBusiness: "Rang 123/190 (World Bank 2020)",
  politicalStability: "-0.12 (World Bank 2024)",
  riskScore: 4,
  riskLabel: "Modéré",
  recommendation: "Investir — Nouveau producteur pétrolier, stabilité démocratique",
  timezone: "UTC+0 (GMT)",
  languages: "Français (officiel), Wolof (lingua franca), Pulaar, Sérère, Diola, Mandingue",
  religions: "Islam (~97%), Christianisme (~3%)",
  memberships: ["UA", "CEDEAO (ECOWAS)", "UEMOA", "OCI", "Ligue arabe (observateur)", "ZLECAF (AfCFTA)", "Commonwealth (observateur)"],

  // MINERALS
  minerals: [
    {
      name: "Phosphates",
      type: "Industriel / Fertilisants",
      annualProduction: "~2.4 Mt minerai (2024)",
      worldRank: "Top 15 mondial",
      reserves: "~100 Mt estimées",
      deposits: [
        {name: "Taiba (Mboro)", location: "14.97°N, 17.00°W", stage: "Production", operator: "Industries Chimiques du Sénégal (ICS)", nationality: "Sénégal/Inde", ownership: "Groupe IFFCO (Inde) 85%, État sénégalais 15%"},
        {name: "Matam (phosphates alumino-calciques)", location: "15.65°N, 13.26°W", stage: "Exploration avancée", operator: "SOCHISEN / SEPHOS", nationality: "Sénégal", ownership: "Privé sénégalais"}
      ],
      exportRevenue: "~200 M USD/an",
      regulation: "Code minier 2016 (révisé 2019). Royalties 3-7%. ICS principal opérateur.",
      crmaRelevance: "Élevée — Phosphates critiques pour sécurité alimentaire UE"
    },
    {
      name: "Or",
      type: "Précieux",
      annualProduction: "~17 t or fin (2024)",
      worldRank: "7e africain",
      reserves: "~8 Mt d'or estimées dans la ceinture birimienne",
      deposits: [
        {name: "Sabodala-Massawa", location: "12.66°N, 11.77°W", stage: "Production", operator: "Endeavour Mining", nationality: "Canada / UK", ownership: "Endeavour Mining 90%, Gouvernement 10%"},
        {name: "Mako", location: "12.45°N, 11.90°W", stage: "Production", operator: "Resolute Mining / Managem", nationality: "Australie / Maroc", ownership: "Resolute Mining 90%, État 10%"},
        {name: "Boto", location: "12.90°N, 11.60°W", stage: "Construction / Développement", operator: "Endeavour Mining", nationality: "Canada / UK", ownership: "Endeavour Mining 90%"},
        {name: "Kabewest", location: "13.10°N, 12.00°W", stage: "Exploration", operator: "Barrick Gold (partenariat)\", nationality: \"Canada", ownership: "Barrick Gold JV"}
      ],
      exportRevenue: "~1.1 Mds USD (2024)",
      regulation: "Code minier 2016. Royalties 3-5%. ITIE membre. Participation État 10% minimum obligatoire.",
      crmaRelevance: "Faible (or non sur liste CRM UE)"
    },
    {
      name: "Zircon & Ilménite (minéraux lourds)",
      type: "Industriel / Critique",
      annualProduction: "Zircon ~50 000 t, Ilménite ~800 000 t (2024)",
      worldRank: "Top 5 mondial pour le zircon",
      reserves: "Gisement côtier majeur",
      deposits: [
        {name: "Grande Côte (Lompoul)", location: "15.35°N, 16.85°W", stage: "Production", operator: "Eramet (TiZir Grande Côte Operations)", nationality: "France", ownership: "Eramet 90%, État sénégalais 10%"}
      ],
      exportRevenue: "~150 M USD/an",
      regulation: "Code minier 2016. Eramet sous convention minière spécifique.",
      crmaRelevance: "Très élevée — Zircon et Titane sur liste CRM de l'UE"
    },
    {
      name: "Pétrole brut",
      type: "Hydrocarbure / Énergie",
      annualProduction: "~100 000 bpj (2024 — première année de production)",
      worldRank: "Nouveau producteur africain (2024)",
      reserves: "~630 M barils (champ Sangomar)",
      deposits: [
        {name: "Sangomar Field (offshore)", location: "13.20°N, 17.00°W", stage: "Production (1ère huile juin 2024)", operator: "Woodside Energy", nationality: "Australie", ownership: "Woodside 82%, Petrosen (État) 18%"}
      ],
      exportRevenue: "~2.5 Mds USD/an (projection 2025)",
      regulation: "Code pétrolier 2019. Petrosen (société nationale). Contrats de partage de production (PSA).",
      crmaRelevance: "Non applicable (hydrocarbure)"
    },
    {
      name: "Gaz naturel (GNL)",
      type: "Hydrocarbure / Énergie",
      annualProduction: "Production GNL attendue fin 2025 (projet GTA)",
      worldRank: "Futur exportateur (GTA, Sénégal-Mauritanie)",
      reserves: "~15 Tcf (projet Greater Tortue Ahmeyim avec Mauritanie)",
      deposits: [
        {name: "Greater Tortue Ahmeyim (GTA) — offshore Sénégal/Mauritanie", location: "20.35°N, 18.00°W", stage: "Développement — 1er LNG cargo attendu 2025", operator: "BP / Kosmos Energy / Petrosen / SMHPM", nationality: "UK / USA / Sénégal / Mauritanie", ownership: "BP 56%, Kosmos 27%, Petrosen 10%, SMHPM 7%"}
      ],
      exportRevenue: "~1 Md USD/an (projection 2026+)",
      regulation: "Accord intergouvernemental Sénégal-Mauritanie 2018. Code pétrolier 2019.",
      crmaRelevance: "Non applicable"
    },
    {
      name: "Fer (minerai)",
      type: "Industriel",
      annualProduction: "Pas encore en production",
      worldRank: "Réserves significatives non exploitées",
      reserves: "~750 Mt estimées (Falémé)",
      deposits: [
        {name: "Falémé (gisement de fer de haute teneur)", location: "12.85°N, 12.25°W", stage: "Développement suspendu — projets de relance 2024-2026", operator: "Arcelor Mittal (convention 2023)", nationality: "Luxembourg/multinational", ownership: "ArcelorMittal 95%, État 5%"}
      ],
      exportRevenue: "Non disponible (pas encore en production)",
      regulation: "Code minier 2016. Convention spécifique avec ArcelorMittal signée 2023.",
      crmaRelevance: "Modérée"
    }
  ],

  // INDUSTRIES
  industries: {
    gdpBySector: {agriculture: 17, industry: 25, services: 52, mining: 6},
    keyIndustries: [
      {name: "Pétrole & Gaz", description: "Nouveau producteur depuis juin 2024 (champ Sangomar, Woodside). Projet GTA (GNL) avec Mauritanie. Transformation de la structure économique attendue sur 2024-2030.", share: "~8% PIB prévu 2025"},
      {name: "Mines (Or, Phosphates, Zircon)", description: "Or: ~17 t/an (Endeavour Mining, Resolute). Phosphates: ICS (IFFCO). Zircon/Ilménite: Eramet (TiZir).", share: "~6% PIB"},
      {name: "Pêche & industries maritimes", description: "Secteur vital. 600 000 emplois directs/indirects. Exportations vers l'UE, l'Asie. Dakar: 1er port de pêche d'Afrique de l'Ouest.", share: "~3% PIB"},
      {name: "Agroalimentaire", description: "Arachide (huile, pâte — SUNEOR), tomate, mil. Sécurité alimentaire enjeu majeur.", share: "~5% PIB"},
      {name: "BTP & Infrastructures", description: "FONSIS, PPP actifs. Autoroute à péage Dakar-Diamniadio, Train Express Régional (TER). Eiffage Sénégal leader.", share: "~6% PIB"},
      {name: "Tourisme", description: "~1.5 M visiteurs (2024). Destinations: Dakar, Casamance, Saly. Impact réduit vs potentiel.", share: "~5% PIB"}
    ],
    sez: [
      {name: "Dakar Integrated Special Economic Zone (DISEZ)", location: "Diamniadio", advantages: "Zone franche industrielle, IS 15% pendant 25 ans, exonération douanière"},
      {name: "Parc Industriel de Diamniadio (PID)", location: "Diamniadio (25 km de Dakar)", advantages: "Zones industrie légère et manufacturière, infrastructures modernes"},
      {name: "Plateforme Industrielle d'Accueil (PIA) de Thiès", location: "Thiès", advantages: "Industrie textile, chimique"},
      {name: "Zone Économique Spéciale de Saint-Louis", location: "Saint-Louis", advantages: "Agropole, industries liées au poisson"}
    ],
    majorProjects: [
      "Projet GNL Greater Tortue Ahmeyim (GTA) — BP/Kosmos — 1er GNL prévu 2025",
      "Extension champ Sangomar Phase 2 — Woodside — 2026+",
      "Plateforme industrielle de Diamniadio — Phase 2 en cours",
      "Train Express Régional (TER) Dakar-Diamniadio — Opérationnel depuis 2021",
      "Port Autonome de Dakar — Extension du terminal à conteneurs (DP World, capacité 1.5 M TEU)",
      "Autoroute Dakar-Thiès-Touba (péage) — En travaux",
      "Projet de raffinerie (SAR réhabilitation) — Financement en discussion"
    ],
    banking: {
      mainBanks: ["CBAO / Attijariwafa Bank Sénégal", "Société Générale Sénégal", "Banque de l'Habitat du Sénégal (BHS)", "BICIS (BNP Paribas)", "Ecobank Sénégal", "Coris Bank Sénégal", "Bank of Africa Sénégal", "BNDE (banque de développement)"],
      totalAssets: "~6.5 Mds USD",
      bancarisation: "~21% (2024)"
    },
    telecom: {
      operators: ["Sonatel / Orange Sénégal", "Expresso Sénégal (Sudatel)", "Free Sénégal (Yérim Sow)"],
      mobilePenetration: "~107%",
      internetPenetration: "~56%"
    },
    energy: {
      mix: "Fioul lourd 40%, Charbon 15%, Gaz 18%, Solaire 15%, Hydraulique interconnexion 5%, Divers 7%",
      installedCapacity: "~1.4 GW (2024)",
      renewableProjects: "Parc solaire de Taïba N'Diaye (158 MW, Lekela), Parc éolien Taïba N'Diaye (158 MW), Programme Yelp (solaire rural), OMVG (hydraulique sous-régionale)"
    }
  },

  // TOP ENTERPRISES
  enterprises: [
    {name: "Sonatel (Orange Sénégal)", sector: "Télécommunications", revenue: "~650 M USD (2024)", employees: "2 000 directs, ~8 000 indirects", ceo: "Sékou Dramé", shareholding: "Orange SA 42.3%, État sénégalais 27.7%, Flottant BRVM 30%", listed: "BRVM (SNTS)", founded: "1985", hq: "Dakar", website: "orange.sn"},
    {name: "Industries Chimiques du Sénégal (ICS)", sector: "Mines / Engrais (Phosphates)", revenue: "~200 M USD (estimation 2024)", employees: "2 500", ceo: "Non disponible", shareholding: "IFFCO (Inde) 85%, État sénégalais 15%", listed: "Non coté", founded: "1976", hq: "Dakar / Mboro", website: "ics.sn"},
    {name: "Woodside Energy Sénégal", sector: "Pétrole & Gaz", revenue: "~2 Mds USD (Sangomar, projection 2025)", employees: "~500 au Sénégal", ceo: "Meg O'Neill (CEO Woodside global)", shareholding: "Woodside Energy 82%, Petrosen 18%", listed: "Non coté (filiale ASX: WDS)", founded: "2024 (début prod.)", hq: "Dakar / Perth", website: "woodside.com"},
    {name: "Petrosen (Société des Pétroles du Sénégal)", sector: "Pétrole & Gaz (État)", revenue: "Non disponible (dividendes pétroliers)", employees: "~400", ceo: "Thierno Seydou Nourou Sy", shareholding: "État sénégalais 100%", listed: "Non coté", founded: "1981", hq: "Dakar", website: "petrosen.sn"},
    {name: "Eramet / TiZir (Grande Côte Operations)", sector: "Mines (Zircon, Ilménite)", revenue: "~150 M USD (estimation)", employees: "~800", ceo: "Christel Bories (CEO Eramet global)", shareholding: "Eramet 90%, État sénégalais 10%", listed: "Non coté (filiale Euronext: ERA)", founded: "2014 (début prod.)", hq: "Lompoul", website: "eramet.com"},
    {name: "Endeavour Mining Sénégal (Sabodala-Massawa)", sector: "Mines (Or)", revenue: "~600 M USD (Sabodala-Massawa 2024)", employees: "~3 000 directs + indirects", ceo: "Ian Cockerill (CEO Endeavour global)", shareholding: "Endeavour Mining 90%, État sénégalais 10%", listed: "Non coté (filiale TSX/LSE: EDV)", founded: "2005 (Sabodala)", hq: "Kédougou / Dakar", website: "endeavourmining.com"},
    {name: "Resolute Mining (Mine de Mako)", sector: "Mines (Or)", revenue: "~200 M USD (Mako 2024)", employees: "~700", ceo: "Terry Holohan (CEO Resolute global)", shareholding: "Resolute Mining 90%, État sénégalais 10%", listed: "Non coté (filiale ASX: RSG)", founded: "2016 (Mako)", hq: "Kédougou", website: "resolutemining.com"},
    {name: "CBAO Attijariwafa Bank Sénégal", sector: "Banque", revenue: "~80 M USD (PNB)", employees: "1 500", ceo: "Non disponible", shareholding: "Attijariwafa Bank 79.2%, actionnaires locaux", listed: "BRVM (CBAO)", founded: "1975", hq: "Dakar", website: "cbao.sn"},
    {name: "Société Générale Sénégal", sector: "Banque", revenue: "~70 M USD (PNB)", employees: "1 100", ceo: "Non disponible", shareholding: "Société Générale France 58.4%, divers", listed: "BRVM (SGBS)", founded: "1962", hq: "Dakar", website: "societegenerale.sn"},
    {name: "Ecobank Sénégal", sector: "Banque", revenue: "~55 M USD (PNB)", employees: "850", ceo: "Non disponible", shareholding: "ETI (Ecobank Transnational) 82%", listed: "Non coté", founded: "1999", hq: "Dakar", website: "ecobank.com/sn"},
    {name: "Eiffage Sénégal", sector: "BTP & Concessions", revenue: "~350 M USD (2024)", employees: "5 000+", ceo: "Benjamin Kofi Dosu", shareholding: "Eiffage SA (France) 100%", listed: "Non coté (filiale)", founded: "1987", hq: "Dakar", website: "eiffage.sn"},
    {name: "Bolloré Africa Logistics Sénégal", sector: "Logistique & Transport", revenue: "~100 M USD (estimation)", employees: "1 200", ceo: "Non disponible", shareholding: "Bolloré Logistics (France) 100%", listed: "Non coté", founded: "1986", hq: "Dakar", website: "bollore-logistics.com"},
    {name: "SUNEOR (ex-Sonacos)", sector: "Agroalimentaire (huile arachide)", revenue: "~80 M USD", employees: "1 000 (saisonnier)", ceo: "Non disponible", shareholding: "Groupe ADVENS (France) 67%, État sénégalais 33%", listed: "Non coté", founded: "1942", hq: "Dakar / Ziguinchor", website: "suneor.sn"},
    {name: "Société Africaine de Raffinage (SAR)", sector: "Énergie (Raffinage pétrolier)", revenue: "~1.5 Mds USD (chiffre d'affaires)", employees: "600", ceo: "Non disponible", shareholding: "État sénégalais 41%, Total 27%, SAR actionnaires divers", listed: "Non coté", founded: "1963", hq: "Dakar (M'bao)", website: "sar.sn"},
    {name: "Senelec", sector: "Énergie (Électricité)", revenue: "~400 M USD", employees: "3 000", ceo: "Pape Mademba Bitèye", shareholding: "État sénégalais 100%", listed: "Non coté", founded: "1983", hq: "Dakar", website: "senelec.sn"},
    {name: "Ageroute Sénégal", sector: "Infrastructures routières (État)", revenue: "Non disponible (agence)", employees: "350", ceo: "Non disponible", shareholding: "État sénégalais 100%", listed: "Non coté", founded: "2000", hq: "Dakar", website: "ageroute.sn"},
    {name: "Compagnie Sucrière Sénégalaise (CSS)", sector: "Agroalimentaire (Sucre)", revenue: "~100 M USD", employees: "5 000 (saisonnier)", ceo: "Non disponible", shareholding: "Jean-Claude Mimran (famille suisse-française) 100%", listed: "Non coté", founded: "1970", hq: "Richard-Toll", website: "Non disponible"},
    {name: "SENICO (Sénégal Import-Export)", sector: "Commerce / Distribution", revenue: "Non disponible", employees: "Non disponible", ceo: "Non disponible", shareholding: "Privé sénégalais", listed: "Non coté", founded: "Non disponible", hq: "Dakar", website: "Non disponible"},
    {name: "Dakar Dem Dikk (DDD)", sector: "Transport urbain", revenue: "~30 M USD", employees: "1 800", ceo: "Non disponible", shareholding: "État sénégalais 100%", listed: "Non coté", founded: "2001", hq: "Dakar", website: "ddd.sn"},
    {name: "Wave Mobile Money", sector: "Fintech / Mobile money", revenue: "Non disponible (privé US)", employees: "~500 au Sénégal", ceo: "Drew Durbin (global)", shareholding: "Wave Inc. (USA) — Sequoia, Founders Fund actionnaires", listed: "Non coté (licorne africaine)", founded: "2018", hq: "Dakar (bureau régional)", website: "wave.com"}
  ],

  // BILLIONAIRES & POWER PLAYERS
  billionaires: [
    {name: "Yérim Sow", fortune: "~160 M USD (estimation)", source: "Télécommunications, Immobilier, Médias", companies: "Teyliom Group (Free Sénégal, Canal Olympia, immobilier)", age: "~55", education: "Ingénieur (France)", bio: "Fondateur de Teyliom Group, actif dans les télécoms (Free Sénégal), l'hôtellerie (Fleur de Lys) et les médias en Afrique de l'Ouest."},
    {name: "Famille Mimran", fortune: "~500 M USD (estimation, famille franco-suisse)", source: "Sucre, Immobilier, Agro", companies: "Compagnie Sucrière Sénégalaise (CSS), Grands Moulins de Dakar, Soboa", age: "Famille multi-générationnelle", education: "Non disponible", bio: "Famille historiquement influente au Sénégal depuis les années 1960. Contrôle la CSS (Richard-Toll) et les Grands Moulins de Dakar."},
    {name: "Thierno Seydou Nourou Sy", fortune: "Non disponible (dirigeant public)", source: "Pétrole (Petrosen)", companies: "Petrosen (DG)", age: "Non disponible", education: "Non disponible", bio: "Directeur Général de Petrosen depuis 2019. Acteur central de la transition pétrolière sénégalaise."},
    {name: "Baïdy Agne", fortune: "Non disponible", source: "Industrie, Commerce", companies: "Président CNP (Conseil National du Patronat)", age: "Non disponible", education: "Non disponible", bio: "Président du Conseil National du Patronat sénégalais depuis 2021. Voix du secteur privé auprès du gouvernement Sonko/Faye."}
  ],

  // GOVERNMENT LEADERS
  leaders: {
    headOfState: {name: "Bassirou Diomaye Faye", since: "Avril 2024", party: "PASTEF (Patriotes Africains du Sénégal pour le Travail, l'Éthique et la Fraternité)", nextElection: "2029"},
    headOfGov: {name: "Ousmane Sonko", since: "Novembre 2024 (après dissolution Assemblée)", party: "PASTEF"},
    keyMinisters: [
      {portfolio: "Affaires Étrangères", name: "Yassine Fall"},
      {portfolio: "Finances et Budget", name: "Cheikh Diba"},
      {portfolio: "Énergie, Pétrole et Mines", name: "Birame Souleye Diop"},
      {portfolio: "Industrie et Commerce", name: "Serigne Guèye Diop"},
      {portfolio: "Infrastructure et Transports", name: "El Malick Ndiaye"},
      {portfolio: "Agriculture, Souveraineté alimentaire", name: "Mabouba Diagne"},
      {portfolio: "Pêche et Économie maritime", name: "Fatou Diouf"},
      {portfolio: "Environnement et Transition écologique", name: "Daouda Ngom"},
      {portfolio: "Éducation nationale", name: "Moustapha Guirassy"},
      {portfolio: "Enseignement supérieur", name: "Abdourahmane Diouf"},
      {portfolio: "Santé", name: "Ibrahima Sy"},
      {portfolio: "Justice", name: "Ousmane Diagne"},
      {portfolio: "Intérieur", name: "Jean Baptiste Tine"},
      {portfolio: "Forces armées", name: "Birame Diop"}
    ],
    centralBankGov: {name: "Jean-Claude Kassi Brou", institution: "BCEAO (Banque Centrale des États de l'Afrique de l'Ouest) — Gouverneur régional"},
    investmentAgency: {name: "Non disponible", institution: "APIX (Agence de Promotion des Investissements et des Grands Travaux)"},
    miningAuthority: {name: "Non disponible", institution: "Direction des Mines et de la Géologie — DGMG"},
    customs: {name: "Non disponible", institution: "Direction Générale des Douanes du Sénégal"},
    ambassadorFrance: {name: "Samba Hamady Ba", institution: "Ambassadeur du Sénégal en France"},
    ambassadorFromFrance: {name: "Christophe Bigot", institution: "Ambassadeur de France au Sénégal"},
    unRepresentative: {name: "Cheikh Niang", institution: "Représentant permanent du Sénégal à l'ONU"}
  },

  // CONTACTS
  contacts: {
    chambers: ["Chambre de Commerce, d'Industrie et d'Agriculture de Dakar (CCIAD)", "Chambre Française de Commerce et d'Industrie du Sénégal (CCFS)"],
    businessFrance: "Business France — Bureau Dakar",
    bpifrance: "Non disponible directement (AFD relais)",
    afd: "AFD Sénégal — Bureau Dakar (l'un des plus actifs en Afrique)",
    lawFirms: ["Geni & Kebe (cabinet local référence)", "SCPA Faye & Associés", "CMS Francis Lefebvre Sénégal", "DLA Piper (partenaire local Dakar)"],
    big4: ["Deloitte Sénégal", "PwC Sénégal", "EY Sénégal", "KPMG Sénégal"],
    investmentBanks: ["Banque Atlantique Sénégal", "CGF Bourse", "BOAD (Banque Ouest Africaine de Développement)"],
    patronat: "Conseil National du Patronat du Sénégal (CNP)",
    diaspora: "~700 000 Sénégalais en Europe (dont ~300 000 en France). Transferts: ~2.9 Mds USD/an (16% PIB)"
  },

  // UNIVERSITIES
  universities: [
    {name: "Université Cheikh Anta Diop de Dakar (UCAD)", city: "Dakar", students: "90 000+", specialties: "Droit, Sciences, Médecine, Lettres", ranking: "1ère au Sénégal, Top 10 Afrique francophone"},
    {name: "Université Gaston Berger de Saint-Louis (UGB)", city: "Saint-Louis", students: "15 000", specialties: "Sciences appliquées, Droit, Économie", ranking: "2e au Sénégal"},
    {name: "Université Alioune Diop de Bambey (UADB)", city: "Bambey", students: "8 000", specialties: "Agro-écologie, Sciences sociales", ranking: "Régionale"},
    {name: "École Supérieure Polytechnique (ESP — UCAD)", city: "Dakar", students: "4 000", specialties: "Ingénierie, Génie civil, IA", ranking: "Top école ingénieurs Sénégal"},
    {name: "Institut Supérieur de Management (ISM)", city: "Dakar", students: "5 000", specialties: "Business, Management, Finance", ranking: "Top school privée Sénégal"},
    {name: "École Nationale Supérieure de Commerce (ENSA)", city: "Dakar", students: "2 000", specialties: "Commerce, Finance", ranking: "Publique référente"},
    {name: "Université du Sine Saloum El-Hadji Ibrahima Niasse (USSEIN)", city: "Kaolack", students: "3 000", specialties: "Agriculture, Sciences", ranking: "Nouvelle université publique"}
  ],
  sciPublications: "~3 000/an",
  patents: "~50/an",
  literacyRate: "58.2%",
  higherEducationRate: "14%",

  // LOGISTICS
  logistics: {
    ports: [
      {name: "Port Autonome de Dakar", capacity: "500 000 TEU/an (en expansion vers 1.5 M TEU avec DP World)", operator: "Port Autonome de Dakar / DP World (terminal à conteneurs)", draft: "14 m", note: "Principal hub maritime d'Afrique de l'Ouest centrale. Terminus du corridor Dakar-Bamako."},
      {name: "Terminal Vraquier de Dakar (TVD)", capacity: "~3 M t/an (vrac)", operator: "Necotrans / Bolloré", draft: "12 m"},
      {name: "Port de Ziguinchor", capacity: "Régional (Casamance)", operator: "PAD", draft: "5 m"}
    ],
    airports: [
      {name: "Blaise Diagne International Airport (AIBD)", traffic: "~3.5 M pax/an (2024)", freight: "~20 000 t"},
      {name: "Aéroport de Ziguinchor", traffic: "Régional", freight: "Non disponible"}
    ],
    railway: "Dakar-Bamako Express (ferroviaire historique en mauvais état). Train Express Régional (TER) Dakar-Diamniadio-AIBD — opérationnel depuis 2021 (36 km).",
    roads: "~16 665 km (dont ~1 700 km bitumés). Autoroute à péage Dakar-Diamniadio-AIBD. Dakar-Thiès-Touba en travaux.",
    corridors: "Corridor Dakar-Bamako (Mali). Corridor Dakar-Ziguinchor (maritime). Corridor sénégambien (Gambie).",
    containerCost: "~900 USD/conteneur export",
    customsDelay: "5 jours (moyen — amélioration en cours)",
    logisticZones: ["Plateforme Industrielle de Diamniadio (PID)", "DISEZ Diamniadio", "Zone Franche de Dakar Port"],
    maritimeConnectivity: "Lignes directes vers Marseille, Le Havre, Hambourg, Las Palmas, Abidjan. Hub triangulaire avec Tenerife."
  },

  // TRADE & INVESTMENT
  trade: {
    topExports: [
      {product: "Pétrole brut (Sangomar)", value: "~2.5 Mds USD (2025)", destination: "Asie, Europe"},
      {product: "Or", value: "~1.1 Mds USD", destination: "Suisse, Dubaï"},
      {product: "Zircon / Ilménite", value: "~150 M USD", destination: "Europe, Chine"},
      {product: "Produits de la mer (poissons, crustacés)", value: "~450 M USD", destination: "UE, Asie"},
      {product: "Phosphates & acide phosphorique", value: "~200 M USD", destination: "Inde, Asie"},
      {product: "Arachides & produits dérivés", value: "~150 M USD", destination: "Asie, Europe"}
    ],
    topImports: [
      {product: "Produits pétroliers raffinés", value: "~1.5 Mds USD", origin: "Europe, Golfe"},
      {product: "Riz", value: "~500 M USD", origin: "Inde, Thaïlande, Vietnam"},
      {product: "Machines & équipements", value: "~400 M USD", origin: "Chine, France"},
      {product: "Médicaments", value: "~300 M USD", origin: "France, Inde"},
      {product: "Blé", value: "~250 M USD", origin: "France, Argentine"}
    ],
    tradeBalance: "-4.2 Mds USD (2024, hors pétrole)",
    fdiInward: {stock: "~7.5 Mds USD", flow: "~1.5 Mds USD/an", topInvestors: ["France", "Australie", "Chine", "UK", "Canada", "Inde"]},
    fdiOutward: "Faible (économie en développement)",
    tradeAgreements: ["ZLECAF (AfCFTA)", "Accord de partenariat économique UE-CEDEAO (APE — signé non ratifié)", "UEMOA (Zone de libre-échange)", "Accord de Cotonou"],
    taxRegime: {is: "IS 30%", tva: "TVA 18%", conventions: "25+ conventions fiscales bilatérales (France, Maroc, Chine, Mauritanie…)"},
    freeZones: "DISEZ Diamniadio — IS 15% pendant 25 ans, exonération douanière",
    profitRepatriation: "Libre dans les zones UEMOA. Aucune restriction majeure pour les investisseurs étrangers déclarés.",
    bit: "30+ traités bilatéraux d'investissement signés"
  },

  // DEMOGRAPHICS
  demographics: {
    totalPopulation: "~18.5 millions (2025)",
    growthRate: "2.7%/an",
    ageStructure: "43% de 0-14 ans, 53% de 15-64 ans, 4% de 65+ ans. Âge médian: 19 ans.",
    urbanPopulation: "48%",
    unemployment: "~19.4% (2024, estimé)",
    youthUnemployment: "~35%",
    hdi: "0.511 — Rang 169/191 (PNUD 2024)",
    lifeExpectancy: "67 ans",
    middleClass: "~30% (moins de 10 USD/jour — définition UA)",
    millionaires: "~600 (estimation Knight Frank)",
    diasporaFrance: "~300 000 en France, ~700 000 en Europe et Amérique du Nord",
    languages: "Français (officiel), Wolof (70% locuteurs), Pulaar, Sérère, Diola",
    literacy: "58.2%"
  },

  // RISK & OPPORTUNITIES
  risks: {
    political: {score: 4, comment: "Démocratie consolidée. Alternance apaisée (2024). Réformes du gouvernement PASTEF : réévaluation des contrats pétroliers et miniers. Risque de populisme économique."},
    security: {score: 3, comment: "Stable au Nord et Centre. Tensions résiduelles en Casamance (rebelles MFDC). Risque jihadiste au Sahel limitrophe (Mali, Guinée-Bissau)."},
    economic: {score: 4, comment: "Boom pétrolier et gazier transformationnel 2024-2030. Mais dette révisée à la hausse (~99% PIB). Dépendance alimentaire structurelle."},
    regulatory: {score: 5, comment: "Renégociation en cours de plusieurs contrats pétroliers et miniers par le gouvernement Sonko/Faye. Risque de rétroactivité réglementaire à surveiller."},
    logistic: {score: 4, comment: "Port de Dakar — hub régional. TER opérationnel. Réseau routier en amélioration. Corridors vers Mali stratégiques."},
    miningOpportunity: {score: 7, comment: "Or, Zircon, Phosphates, Pétrole, GNL. Ceinture birimienne prometteuse. Nouveau régime moins permissif possible."},
    industrialOpportunity: {score: 6, comment: "Zones industrielles de Diamniadio. BTP très actif. Pêche et agroalimentaire sous-industrialisés."},
    digitalOpportunity: {score: 6, comment: "Hub numérique en développement. Wave Money leader fintech régional. Dakar hub startups Afrique de l'Ouest."},
    overallRisk: 4.0,
    overallOpportunity: 6.5,
    recommendation: "Investir — Boom pétrolier et gazier, surveiller les renégociations contractuelles"
  }
};

// ============================================================
// CÔTE D'IVOIRE
// Sources: INS Côte d'Ivoire, BCEAO, Ministère des Mines CI,
// IMF Art. IV 2024, World Bank, Endeavour Mining, Perseus Mining,
// Allied Gold Corp, Transparency International 2024,
// Conseil Café-Cacao, ICCO, ANRMP CI
// ============================================================

export const DATA_COTEDIVOIRE: Country = {
  id: "CI",
  name: "Côte d'Ivoire",
  officialName: "République de Côte d'Ivoire",
  flag: "🇨🇮",
  region: "africa",
  capital: "Yamoussoukro (officielle) / Abidjan (économique)",
  area: "322 463 km²",
  population: "~30 millions (2025)",
  density: "93 hab/km²",
  gdpNominal: "~80 Mds USD (2025)",
  gdpPPP: "~165 Mds USD (2025)",
  gdpPerCapita: "~2 650 USD (nominal 2025)",
  gdpGrowth: [
    {year: "2021", value: 7.4},
    {year: "2022", value: 6.7},
    {year: "2023", value: 6.5},
    {year: "2024", value: 6.5},
    {year: "2025", value: 6.3}
  ],
  inflation: "4.4% (2024)",
  debtToGDP: "58.1% (2024)",
  tradeBalance: "+3.2 Mds USD (2024, excédent porté par le cacao et l'or)",
  currency: "Franc CFA de l'Afrique de l'Ouest (XOF)",
  exchangeRateEUR: "1 EUR = 655.96 XOF (fixe BCEAO)",
  exchangeRateUSD: "1 USD ≈ 605 XOF (2025)",
  corruptionIndex: "Score 38/100 — Rang 97/180 (TI 2024)",
  easeBusiness: "Rang 110/190 (World Bank 2020)",
  politicalStability: "-0.45 (World Bank 2024)",
  riskScore: 4,
  riskLabel: "Modéré",
  recommendation: "Investir — Locomotive de l'Afrique de l'Ouest, fort dynamisme économique",
  timezone: "UTC+0 (GMT)",
  languages: "Français (officiel), Dioula (lingua franca commerciale), Baoulé, Bété, Sénoufo + 70 langues locales",
  religions: "Islam ~43%, Christianisme ~35%, Religions traditionnelles ~22%",
  memberships: ["UA", "CEDEAO (ECOWAS)", "UEMOA", "OCI", "ZLECAF (AfCFTA)", "G77", "ITIE"],

  // MINERALS
  minerals: [
    {
      name: "Or",
      type: "Précieux",
      annualProduction: "~58 t or fin (2024)",
      worldRank: "2e africain (en progression)",
      reserves: "Estimé à 200 Mt gisements identifiés",
      deposits: [
        {name: "Ity Mine (Flotouo)", location: "7.50°N, 7.57°W", stage: "Production", operator: "Endeavour Mining", nationality: "Canada / UK", ownership: "Endeavour Mining 80%, SODEMI 20%"},
        {name: "Yaouré Mine (Bouaflé)", location: "6.82°N, 5.73°W", stage: "Production", operator: "Perseus Mining", nationality: "Australie", ownership: "Perseus Mining 86%, État CI 14%"},
        {name: "Agbaou Mine (Oumé)", location: "6.37°N, 5.48°W", stage: "Production", operator: "Allied Gold Corp", nationality: "Canada", ownership: "Allied Gold 90%, État CI 10%"},
        {name: "Bonikro Mine (Hiré)", location: "5.75°N, 5.85°W", stage: "Production", operator: "Allied Gold Corp", nationality: "Canada", ownership: "Allied Gold 89%, État CI 11%"},
        {name: "Sissingué Mine (Boundiali)", location: "9.52°N, 6.57°W", stage: "Production", operator: "Perseus Mining", nationality: "Australie", ownership: "Perseus Mining 86%"},
        {name: "Abujar (West Africa Resources)", location: "7.00°N, 8.00°W", stage: "Exploration / Développement", operator: "West African Resources", nationality: "Australie", ownership: "West African Resources 90%"}
      ],
      exportRevenue: "~3.5 Mds USD (2024)",
      regulation: "Code minier 2014 (révisé 2023). Royalties 3-6% selon production. Participation État 10-20% obligatoire. ITIE membre depuis 2008.",
      crmaRelevance: "Faible (or non sur liste CRM UE)"
    },
    {
      name: "Manganèse",
      type: "Industriel / Acier",
      annualProduction: "~2.5 Mt minerai (2024)",
      worldRank: "Top 10 africain",
      reserves: "Importantes — région de Grand Lahou et Bondoukou",
      deposits: [
        {name: "Bondoukou (Nord-Est)", location: "8.03°N, 2.80°W", stage: "Production partielle", operator: "Mining Compagnie de l'Est (MCE)", nationality: "Côte d'Ivoire", ownership: "Privé ivoirien"},
        {name: "Grand Lahou (Sud)", location: "5.13°N, 5.03°W", stage: "Exploration", operator: "Diverses juniors", nationality: "International", ownership: "Licences privées"}
      ],
      exportRevenue: "~150 M USD (estimation)",
      regulation: "Code minier 2014/2023. Royalties 3%.",
      crmaRelevance: "Élevée — Manganèse sur liste CRM de l'UE"
    },
    {
      name: "Nickel",
      type: "Batterie / Inox / Critique",
      annualProduction: "Non encore en production industrielle",
      worldRank: "Réserves significatives non exploitées",
      reserves: "~33 Mt de minerai latéritique estimé (Biankouma-Touba)",
      deposits: [
        {name: "Biankouma-Sipilou (Ouest)", location: "7.73°N, 7.62°W", stage: "Exploration avancée", operator: "SMFCI / BHP (anciennement Falconbridge)", nationality: "International", ownership: "Non disponible (droits en discussion)"}
      ],
      exportRevenue: "Non disponible (pas en production)",
      regulation: "Code minier 2014/2023.",
      crmaRelevance: "Très élevée — Nickel sur liste CRM de l'UE (batteries VE)"
    },
    {
      name: "Bauxite",
      type: "Industriel / Aluminium",
      annualProduction: "Peu exploité actuellement",
      worldRank: "Réserves significatives",
      reserves: "~1.1 Md t estimées (Bofosso, Man)",
      deposits: [
        {name: "Bofosso (région de Man, Ouest)", location: "7.40°N, 7.55°W", stage: "Exploration", operator: "Non disponible", nationality: "Non disponible", ownership: "Non disponible"}
      ],
      exportRevenue: "Non disponible",
      regulation: "Code minier 2014/2023.",
      crmaRelevance: "Modérée (Aluminium sur liste CRM UE)"
    },
    {
      name: "Diamants (artisanaux)",
      type: "Précieux",
      annualProduction: "~300 000 carats (production artisanale estimée 2024)",
      worldRank: "Petit producteur africain",
      reserves: "Région de Séguéla et Bouaflé",
      deposits: [
        {name: "Séguéla (région Marahoué)", location: "7.96°N, 6.68°W", stage: "Production artisanale", operator: "Opérateurs artisanaux", nationality: "Côte d'Ivoire", ownership: "Artisanal — Processus de Kimberley"}
      ],
      exportRevenue: "~20 M USD (estimation artisanale)",
      regulation: "Code minier 2014/2023. Processus de Kimberley (certificats d'origine).",
      crmaRelevance: "Faible"
    },
    {
      name: "Pétrole & Gaz offshore",
      type: "Hydrocarbure / Énergie",
      annualProduction: "~25 000 bpj pétrole + gaz domestique (2024)",
      worldRank: "Petit producteur africain",
      reserves: "Blocs offshore Abidjan et San Pedro en exploration",
      deposits: [
        {name: "Bloc CI-202 / CI-401 (offshore)", location: "Golfe de Guinée, offshore Abidjan", stage: "Production et Exploration", operator: "Foxtrot International / Eni / TotalEnergies", nationality: "International", ownership: "Foxtrot 51%, Eni, TotalEnergies, PETROCI"}
      ],
      exportRevenue: "~300 M USD (gaz domestique + pétrole 2024)",
      regulation: "Code pétrolier 2012 révisé. PETROCI (société nationale). PSA.",
      crmaRelevance: "Non applicable"
    }
  ],

  // INDUSTRIES
  industries: {
    gdpBySector: {agriculture: 18, industry: 23, services: 51, mining: 8},
    keyIndustries: [
      {name: "Cacao & Chocolaterie", description: "#1 mondial — 40% de la production mondiale de cacao (2.2 M t en 2023/24). Exportation de fèves et beurre de cacao (transformation locale en hausse via FEDECACI). Barry Callebaut, Cargill, Olam présents à Abidjan.", share: "~15% PIB direct + indirect"},
      {name: "Or (mines industrielles)", description: "58 t en 2024 (Endeavour, Perseus, Allied Gold). 2e africain. Secteur en forte croissance.", share: "~8% PIB"},
      {name: "Noix de cajou", description: "#1 mondial en production brute (~900 000 t). Transformation locale en hausse (objectif 50% d'ici 2030).", share: "~2% PIB direct"},
      {name: "Café & Hévéa & Huile de palme", description: "3e producteur africain de café. 1er africain caoutchouc naturel. Huile de palme: 500 000 t/an (SIPEF, Palmci).", share: "~4% PIB"},
      {name: "BTP & Immobilier", description: "Forte activité portée par le Plan National de Développement (PND 2021-2025). Abidjan: métropole en expansion rapide (6+ M habitants).", share: "~6% PIB"},
      {name: "Services financiers", description: "1ère place financière d'Afrique francophone subsaharienne. BRVM (bourse régionale). NSIA, Ecobank, Société Générale CI.", share: "~8% PIB"}
    ],
    sez: [
      {name: "Zone Franche d'Abidjan (ZFA / Plateforme Industrielle d'Abidjan)", location: "Vridi / Port d'Abidjan", advantages: "IS 0% pendant 10 ans, exonération douanière, franchise zone portuaire"},
      {name: "Zone Économique Spéciale de Grand-Bassam (PIZE)", location: "Grand-Bassam (30 km Abidjan)", advantages: "IS 25% réduit pendant 15 ans, infrastructures modernes"},
      {name: "Zone Industrielle de Yopougon", location: "Abidjan-Yopougon", advantages: "Première zone industrielle de CI (50+ entreprises)"},
      {name: "Agropole Centre (Yamoussoukro)", location: "Yamoussoukro", advantages: "Agro-industrie, transformation agricole, investissements PPP"}
    ],
    majorProjects: [
      "Troisième Pont d'Abidjan (Pont Henri Konan Bédié) — élargi et modernisation",
      "Métro d'Abidjan (Ligne 1 — 37 km) — En construction, financement AFD/France",
      "Autoroute de contournement Nord d'Abidjan (Y4) — En travaux",
      "Port de San Pedro Phase 2 — Expansion capacité cacao et minerai",
      "Centrale thermique d'Atinkou (390 MW, gaz) — Livraison 2024-2025",
      "Programme solaire 200 MW (Synergy Construction, plan PND 2025)",
      "Corridor ferroviaire Abidjan-Ouagadougou (Sitarail) — Réhabilitation en cours"
    ],
    banking: {
      mainBanks: ["Société Générale Côte d'Ivoire (SGCI)", "Ecobank Côte d'Ivoire", "NSIA Banque CI", "Standard Chartered CI", "Banque Atlantique CI", "Bridge Bank CI (BNP Paribas)", "Coris Bank International CI", "UBA Côte d'Ivoire", "BNI (Banque Nationale d'Investissement)"],
      totalAssets: "~18 Mds USD",
      bancarisation: "~26% (2024)"
    },
    telecom: {
      operators: ["Orange Côte d'Ivoire", "MTN Côte d'Ivoire", "Moov Africa CI (Maroc Telecom)"],
      mobilePenetration: "~130%",
      internetPenetration: "~48%"
    },
    energy: {
      mix: "Gaz naturel 65%, Hydraulique 20%, Pétrole 10%, Solaire 5%",
      installedCapacity: "~2.3 GW (2024, dont 300 MW exports sous-région)",
      renewableProjects: "Solaire Boundiali (37 MW), Centrale hydraulique Singrobo (44 MW), Programme solaire 200 MW PND 2025"
    }
  },

  // TOP ENTERPRISES
  enterprises: [
    {name: "Orange Côte d'Ivoire", sector: "Télécommunications", revenue: "~800 M USD (2024)", employees: "2 200", ceo: "Idrissa Diop", shareholding: "Orange SA France 72%, flottant BRVM 28%", listed: "BRVM (ORAC)", founded: "1996", hq: "Abidjan", website: "orange.ci"},
    {name: "MTN Côte d'Ivoire", sector: "Télécommunications / Mobile money", revenue: "~600 M USD", employees: "1 800", ceo: "Djibril Ouattara", shareholding: "MTN Group (Afrique du Sud) 65%, État CI 13%, Flottant BRVM", listed: "BRVM (MTCI)", founded: "1996", hq: "Abidjan", website: "mtn.ci"},
    {name: "Société Ivoirienne de Raffinage (SIR)", sector: "Énergie (Raffinage pétrolier)", revenue: "~1.5 Mds USD", employees: "800", ceo: "Daouda Coulibaly", shareholding: "État CI 47.3%, TotalEnergies 16.5%, Shell 7.5%, Divers", listed: "Non coté", founded: "1965", hq: "Abidjan (Vridi)", website: "sir.ci"},
    {name: "Compagnie Ivoirienne d'Électricité (CIE)", sector: "Énergie (Électricité distribution)", revenue: "~500 M USD", employees: "5 000", ceo: "Ahmadou Bakayoko", shareholding: "EDF (via SODECI-Bouygues) 40%, État CI 35%, Flottant", listed: "BRVM (CIE)", founded: "1990", hq: "Abidjan", website: "cie.ci"},
    {name: "SODECI (Eau)", sector: "Eau potable (distribution)", revenue: "~150 M USD", employees: "1 800", ceo: "Sylvain Adou", shareholding: "Bouygues Eau (France) 46%, État CI 24%, Flottant BRVM", listed: "BRVM (SDCI)", founded: "1960", hq: "Abidjan", website: "sodeci.ci"},
    {name: "Endeavour Mining CI (Ity Mine)", sector: "Mines (Or)", revenue: "~500 M USD (Ity 2024)", employees: "~2 000 au site", ceo: "Ian Cockerill (global)", shareholding: "Endeavour Mining 80%, SODEMI 20%", listed: "Non coté (TSX/LSE: EDV)", founded: "2012 (Ity)", hq: "Abidjan / Flotouo", website: "endeavourmining.com"},
    {name: "Perseus Mining CI (Yaouré)", sector: "Mines (Or)", revenue: "~350 M USD (Yaouré 2024)", employees: "~1 800", ceo: "Jeff Quartermaine (global)", shareholding: "Perseus Mining 86%, État CI 14%", listed: "Non coté (ASX/TSX: PRU)", founded: "2021 (Yaouré)", hq: "Abidjan", website: "perseusmining.com"},
    {name: "Solibra (Société de Limonaderies et Brasseries d'Afrique)", sector: "Agroalimentaire (Bières, softs)", revenue: "~250 M USD", employees: "1 200", ceo: "Non disponible", shareholding: "Castel Group (France) 100%", listed: "Non coté", founded: "1955", hq: "Abidjan", website: "solibra.ci"},
    {name: "NSIA Groupe", sector: "Assurances & Banque (panafricain)", revenue: "~300 M USD (Groupe)", employees: "3 000+ (groupe Afrique)", ceo: "Jean Kacou Diagou", shareholding: "Famille Diagou (CI) 100% (privé)", listed: "Non coté", founded: "1998", hq: "Abidjan", website: "groupensia.com"},
    {name: "Ecobank Côte d'Ivoire", sector: "Banque", revenue: "~180 M USD (PNB)", employees: "1 600", ceo: "Non disponible", shareholding: "ETI (Ecobank Transnational) 79%", listed: "Non coté", founded: "1988", hq: "Abidjan", website: "ecobank.com/ci"},
    {name: "Société Générale Côte d'Ivoire (SGCI)", sector: "Banque", revenue: "~200 M USD (PNB)", employees: "1 400", ceo: "Non disponible", shareholding: "Société Générale France 72.6%", listed: "BRVM (SGCI)", founded: "1963", hq: "Abidjan", website: "societegenerale.ci"},
    {name: "PALMCI (Hévéa/Palmiers à huile)", sector: "Agroalimentaire / Plantation", revenue: "~120 M USD", employees: "8 000 (plantation)", ceo: "Non disponible", shareholding: "OLAM 66%, État CI 34%", listed: "BRVM (PALC)", founded: "1996", hq: "Abidjan", website: "palmci.ci"},
    {name: "Cargill Cocoa & Chocolate CI", sector: "Négoce / Transformation cacao", revenue: "~3 Mds USD (achats cacao CI, estimation)", employees: "~500 locaux", ceo: "Non disponible (filiale Cargill USA)", shareholding: "Cargill Inc. (USA) 100%", listed: "Non coté", founded: "1998", hq: "Abidjan / San Pedro", website: "cargill.com"},
    {name: "Barry Callebaut CI", sector: "Chocolaterie / Transformation cacao", revenue: "~1.5 Mds USD (achats CI, estimation)", employees: "~600", ceo: "Non disponible (filiale Suisse)", shareholding: "Barry Callebaut AG (Suisse) 100%", listed: "Non coté (groupe SWX: BARN)", founded: "2001", hq: "Abidjan", website: "barry-callebaut.com"},
    {name: "Air Côte d'Ivoire", sector: "Transport aérien", revenue: "~180 M USD", employees: "900", ceo: "René Decurey", shareholding: "État CI 42%, Air France 20%, Partenaires CEDEAO 38%", listed: "Non coté", founded: "2012", hq: "Abidjan", website: "aircotedivoire.ci"},
    {name: "Foxtrot International CI", sector: "Pétrole & Gaz offshore", revenue: "~300 M USD", employees: "~200", ceo: "Non disponible", shareholding: "Foxtrot International 51%, PETROCI 20%, Groupe Vitol 29%", listed: "Non coté", founded: "1995", hq: "Abidjan", website: "Non disponible"},
    {name: "SIPEF CI (Hévéa)", sector: "Plantation (Caoutchouc naturel)", revenue: "~80 M USD", employees: "5 000 (plantation)", ceo: "Non disponible", shareholding: "SIPEF NV (Belgique) 74%", listed: "Non coté (filiale Euronext: SIP)", founded: "1991", hq: "Aboisso", website: "sipef.com"},
    {name: "CI-Énergies (ex-SOGEPE)", sector: "Énergie (Gestion secteur)", revenue: "Non disponible (agence)", employees: "Non disponible", ceo: "Non disponible", shareholding: "État CI 100%", listed: "Non coté", founded: "1998", hq: "Abidjan", website: "Non disponible"},
    {name: "Port Autonome d'Abidjan (PAA)", sector: "Logistique / Infrastructure", revenue: "~200 M USD", employees: "1 500", ceo: "Hien Yacouba Sié", shareholding: "État CI 100%", listed: "Non coté", founded: "1950", hq: "Abidjan", website: "portabidjan.ci"},
    {name: "BNI (Banque Nationale d'Investissement)", sector: "Banque de développement", revenue: "~80 M USD", employees: "600", ceo: "Non disponible", shareholding: "État CI 100%", listed: "Non coté", founded: "1959", hq: "Abidjan", website: "bni.ci"}
  ],

  // BILLIONAIRES & POWER PLAYERS
  billionaires: [
    {name: "Jean Kacou Diagou", fortune: "~500 M USD (estimation)", source: "Assurances, Banque, Immobilier", companies: "NSIA Groupe (16 pays Afrique)", age: "~68", education: "HEC Paris", bio: "Fondateur et PDG du Groupe NSIA, présent dans 16 pays africains (assurances, banques, immobilier). Figure majeure du capitalisme ivoirien."},
    {name: "Famille Sidy Diallo (groupe Comafrique)", fortune: "Non disponible", source: "Commerce, Import-Export, BTP", companies: "Comafrique Technologies, Diallo Group", age: "Non disponible", education: "Non disponible", bio: "Famille d'affaires fondée par Sidy Diallo (ancien président FIF). Présente dans le commerce, les TIC et la distribution."},
    {name: "Tidjane Thiam", fortune: "~100 M USD (estimation)", source: "Finance internationale", companies: "Ex-CEO Credit Suisse, Président PPD (parti politique CI)", age: "~61", education: "ENPC Paris, Insead", bio: "Ancien CEO de Prudential UK et Credit Suisse (2015-2020). Revenu en CI pour la politique. Potentiel futur acteur économique."},
    {name: "Marcel Zadi Kessy", fortune: "Non disponible (décédé 2020)", source: "Industrie, Commerce", companies: "CFAO Afrique (ex-directeur Afrique)", age: "Décédé (2020)", education: "Non disponible", bio: "Figure historique du secteur privé ivoirien. Ancien président du CGECI."},
    {name: "Ahmadou Gon Coulibaly (famille)", fortune: "Non disponible", source: "Politique, réseaux économiques", companies: "Proches de la famille dirigeante RDR/RHDP", age: "Décédé (2020)", education: "Non disponible", bio: "Ex-PM ivoirien décédé. Sa famille reste influente dans le cercle économique Ouattara."}
  ],

  // GOVERNMENT LEADERS
  leaders: {
    headOfState: {name: "Alassane Ouattara", since: "2011 (réélu octobre 2025)", party: "RHDP (Rassemblement des Houphouëtistes pour la Démocratie et la Paix)", nextElection: "2030"},
    headOfGov: {name: "Robert Beugré Mambé", since: "Avril 2024", party: "RHDP (Indépendant technocrate)"},
    keyMinisters: [
      {portfolio: "Affaires Étrangères", name: "Léon Kacou Adom"},
      {portfolio: "Économie et Finances", name: "Adama Coulibaly"},
      {portfolio: "Mines, Pétrole et Énergie", name: "Mamadou Sangafowa-Coulibaly"},
      {portfolio: "Commerce et Industrie", name: "Souleymane Diarrassouba"},
      {portfolio: "Infrastructure et Entretien routier", name: "Amédé Koffi Kouakou"},
      {portfolio: "Agriculture et Développement rural", name: "Kobenan Kouassi Adjoumani"},
      {portfolio: "Eau et Forêts", name: "Laurent Tchagba"},
      {portfolio: "Éducation nationale", name: "Mariatou Koné"},
      {portfolio: "Enseignement supérieur", name: "Adama Diawara"},
      {portfolio: "Santé et Hygiène publique", name: "Pierre Dimba"},
      {portfolio: "Intérieur et Sécurité", name: "Vagondo Diomandé"},
      {portfolio: "Défense", name: "Téné Birahima Ouattara"},
      {portfolio: "Justice", name: "Gnénéma Coulibaly"},
      {portfolio: "Numérique et Digitalisation", name: "Kobenan Gnangbo Silué"},
      {portfolio: "Budget et Portefeuille de l'État", name: "Moussa Sanogo"}
    ],
    centralBankGov: {name: "Jean-Claude Kassi Brou", institution: "BCEAO (Banque Centrale des États de l'Afrique de l'Ouest) — Gouverneur régional"},
    investmentAgency: {name: "Non disponible", institution: "CEPICI (Centre de Promotion des Investissements en Côte d'Ivoire)"},
    miningAuthority: {name: "Non disponible", institution: "Direction Générale des Mines et de la Géologie (DGMG-CI)"},
    customs: {name: "Non disponible", institution: "Direction Générale des Douanes de Côte d'Ivoire"},
    ambassadorFrance: {name: "Ahmed Cissé", institution: "Ambassadeur de Côte d'Ivoire en France"},
    ambassadorFromFrance: {name: "Jean-Christophe Belliard", institution: "Ambassadeur de France en Côte d'Ivoire"},
    unRepresentative: {name: "Issa Sangaré", institution: "Représentant permanent de la CI à l'ONU"}
  },

  // CONTACTS
  contacts: {
    chambers: ["Chambre de Commerce et d'Industrie de Côte d'Ivoire (CCI-CI)", "Chambre Française de Commerce et d'Industrie de Côte d'Ivoire (CFCI)"],
    businessFrance: "Business France — Bureau Abidjan",
    bpifrance: "Non disponible directement (AFD et PROPARCO relais)",
    afd: "AFD Côte d'Ivoire — Bureau Abidjan (activité majeure infrastructure et énergie)",
    lawFirms: ["SCPA Amon & Associés (référence locale)", "Gide Loyrette Nouel Abidjan", "CMS Bureau Francis Lefebvre CI", "Lexing Alain Bensoussan (TIC)"],
    big4: ["Deloitte Côte d'Ivoire", "PwC Côte d'Ivoire", "EY Côte d'Ivoire", "KPMG Côte d'Ivoire"],
    investmentBanks: ["BOAD (Banque Ouest Africaine de Développement)", "BNI CI", "Société Générale CIB Abidjan", "Bloomfield Investment Corporation"],
    patronat: "Confédération Générale des Entreprises de Côte d'Ivoire (CGECI)",
    diaspora: "~800 000 Ivoiriens en Europe (France principalement). Transferts: ~750 M USD/an"
  },

  // UNIVERSITIES
  universities: [
    {name: "Université Félix Houphouët-Boigny (UFHB)", city: "Abidjan-Cocody", students: "80 000+", specialties: "Droit, Sciences, Médecine, Lettres", ranking: "1ère en Côte d'Ivoire, Top 15 Afrique francophone"},
    {name: "Université Nangui Abrogoua", city: "Abidjan-Abobo", students: "30 000", specialties: "Sciences fondamentales, Biologie", ranking: "2e à Abidjan"},
    {name: "Université Alassane Ouattara", city: "Bouaké", students: "20 000", specialties: "Sciences économiques, Droit", ranking: "Principale université du Centre"},
    {name: "Institut National Polytechnique Félix Houphouët-Boigny (INPHB)", city: "Yamoussoukro", students: "8 000", specialties: "Ingénierie, Industrie, Commerce (GRANDE ÉCOLE)", ranking: "Top école d'ingénieurs Afrique francophone"},
    {name: "ESCA École de Management", city: "Abidjan", students: "2 000", specialties: "Business, Management", ranking: "Top école de commerce privée CI"},
    {name: "Université Jean Lorougnon Guédé", city: "Daloa", students: "10 000", specialties: "Sciences, Agronomie", ranking: "Régionale Ouest"}
  ],
  sciPublications: "~4 000/an",
  patents: "~100/an",
  literacyRate: "54.1%",
  higherEducationRate: "16%",

  // LOGISTICS
  logistics: {
    ports: [
      {name: "Port Autonome d'Abidjan (PAA)", capacity: "900 000 TEU/an (extension 1.5 M TEU en cours)", operator: "Port Autonome d'Abidjan / Bolloré Africa Logistics / APM Terminals", draft: "14 m", note: "1er port à conteneurs d'Afrique de l'Ouest. Hub régional pour Mali, Burkina, Niger, Guinée."},
      {name: "Port de San Pedro", capacity: "~1.5 M t vrac (cacao, bois)", operator: "Port Autonome de San Pedro", draft: "12 m", note: "Principal port d'exportation du cacao mondial"}
    ],
    airports: [
      {name: "Aéroport International Félix Houphouët-Boigny (Abidjan)", traffic: "~3 M pax/an (2024)", freight: "~50 000 t"},
      {name: "Aéroport de Yamoussoukro", traffic: "Régional (non disponible)", freight: "Non disponible"}
    ],
    railway: "Sitarail (Abidjan-Ouagadougou, 1 260 km) — opérationnel mais vieillissant. Réhabilitation planifiée. Métro d'Abidjan Ligne 1 en construction (livraison 2028).",
    roads: "~81 996 km (dont ~6 500 km bitumés). Réseau centré sur Abidjan. Autoroutes A1 (Abidjan-Yamoussoukro), A3 (Grand-Bassam).",
    corridors: "Corridor Abidjan-Lagos (ECOWAS Highway). Corridor Abidjan-Ouagadougou-Bamako (ferroviaire + route). Corridor San Pedro-Man (Ouest).",
    containerCost: "~850 USD/conteneur export",
    customsDelay: "5 jours (moyen — amélioration post-2020)",
    logisticZones: ["Zone Franche d'Abidjan (Vridi)", "Plateforme Industrielle Grand-Bassam", "Zone Industrielle de Yopougon"],
    maritimeConnectivity: "Lignes régulières vers Marseille, Le Havre, Anvers, Rotterdam. Hub sous-régional Afrique de l'Ouest."
  },

  // TRADE & INVESTMENT
  trade: {
    topExports: [
      {product: "Cacao & dérivés (beurre, pâte, poudre)", value: "~6 Mds USD", destination: "UE (Pays-Bas, Belgique, Allemagne, France), USA"},
      {product: "Or (mine industrielle)", value: "~3.5 Mds USD", destination: "Suisse, Dubaï"},
      {product: "Caoutchouc naturel", value: "~1.2 Mds USD", destination: "Chine, Inde, UE"},
      {product: "Pétrole brut & dérivés", value: "~800 M USD", destination: "Sous-région Afrique de l'Ouest"},
      {product: "Noix de cajou (brutes & transformées)", value: "~700 M USD", destination: "Inde, Vietnam, UE"},
      {product: "Huile de palme", value: "~350 M USD", destination: "Afrique de l'Ouest, Asie"}
    ],
    topImports: [
      {product: "Produits pétroliers raffinés", value: "~2 Mds USD", origin: "Europe, Moyen-Orient"},
      {product: "Riz", value: "~700 M USD", origin: "Thaïlande, Inde, Vietnam"},
      {product: "Machines & équipements", value: "~1.5 Mds USD", origin: "Chine, UE, USA"},
      {product: "Véhicules & pièces", value: "~600 M USD", origin: "Japon, Chine, UE"},
      {product: "Médicaments", value: "~400 M USD", origin: "France, Inde"}
    ],
    tradeBalance: "+3.2 Mds USD (2024)",
    fdiInward: {stock: "~15 Mds USD", flow: "~2 Mds USD/an", topInvestors: ["France", "UK", "USA", "Chine", "Pays-Bas", "Maroc"]},
    fdiOutward: "Faible (quelques groupes panafricains — NSIA, Ecobank CI)",
    tradeAgreements: ["ZLECAF (AfCFTA)", "APE UE-CEDEAO (en négociation finale)", "UEMOA (zone libre-échange)", "Accord CEDEAO"],
    taxRegime: {is: "IS 25% (taux général)", tva: "TVA 18%", conventions: "30+ conventions fiscales bilatérales (France, Maroc, Tunisie, Mauricie…)"},
    freeZones: "Zone Franche d'Abidjan (Vridi) — IS 0% 10 ans, exonération douanière",
    profitRepatriation: "Libre dans la zone UEMOA. Autorisé pour investisseurs étrangers avec procédures BCEAO.",
    bit: "25+ traités bilatéraux d'investissement signés"
  },

  // DEMOGRAPHICS
  demographics: {
    totalPopulation: "~30 millions (2025)",
    growthRate: "2.5%/an",
    ageStructure: "41% de 0-14 ans, 55% de 15-64 ans, 4% de 65+ ans. Âge médian: 20 ans.",
    urbanPopulation: "52%",
    unemployment: "~9.4% (2024, officiel — sous-emploi élevé)",
    youthUnemployment: "~22%",
    hdi: "0.534 — Rang 159/191 (PNUD 2024)",
    lifeExpectancy: "59 ans",
    middleClass: "~34% (définition UA)",
    millionaires: "~1 200 (estimation)",
    diasporaFrance: "~250 000 en France, ~800 000 dans la sous-région CEDEAO",
    languages: "Français (officiel, 40% locuteurs actifs), Dioula (50%+ commerce), 70 langues locales",
    literacy: "54.1%"
  },

  // RISK & OPPORTUNITIES
  risks: {
    political: {score: 4, comment: "Régime stable mais concentré autour d'Ouattara (réélu 2025). Opposition affaiblie. Succession politique à terme incertaine. Tensions nord-sud historiques maîtrisées."},
    security: {score: 4, comment: "Calme relatif post-crise 2010-2011. Risque jihadiste frontalier (Burkina, Mali). Incidents dans le nord-ouest (Bounkani). Abidjan et côte stables."},
    economic: {score: 3, comment: "Croissance parmi les plus fortes d'Afrique (6%+). Dépendance cacao-or. Dégradation infrastructure rurale. Dette maîtrisée (58%)."},
    regulatory: {score: 4, comment: "Cadre minier et investissement amélioré. CEPICI efficace. Quelques lourdeurs administratives. Plan National de Développement ambitieux."},
    logistic: {score: 4, comment: "Port d'Abidjan: hub régional n°1. Réseau routier en amélioration. Chantier métro. Corridor logistique vers Mali/Burkina stratégique."},
    miningOpportunity: {score: 8, comment: "Or en forte progression (58 t), Manganèse, Nickel non exploité, Bauxite. Ceinture birimienne prolixe."},
    industrialOpportunity: {score: 8, comment: "1ère économie Afrique francophone subsaharienne. Transformation cacao (Barry Callebaut, Cargill). BTP, énergie, logistique."},
    digitalOpportunity: {score: 7, comment: "Hub numérique d'Abidjan. Mobile money MTN MoMo / Orange Money. StartupActCI. Attractivité pour l'offshoring francophone."},
    overallRisk: 3.8,
    overallOpportunity: 7.7,
    recommendation: "Investir — Locomotive économique de l'Afrique de l'Ouest"
  }
};

// ============================================================
// GHANA
// Sources: Ghana Statistical Service (GSS), Bank of Ghana (BoG),
// Minerals Commission Ghana, Ghana Chamber of Mines 2024,
// IMF Art. IV 2024, World Bank, Newmont Corporation,
// Gold Fields Ltd, AngloGold Ashanti, Tullow Oil,
// Transparency International 2024, Trading Economics 2025
// ============================================================

export const DATA_GHANA: Country = {
  id: "GH",
  name: "Ghana",
  officialName: "Republic of Ghana",
  flag: "🇬🇭",
  region: "africa",
  capital: "Accra",
  area: "238 533 km²",
  population: "~34 millions (2025)",
  density: "142 hab/km²",
  gdpNominal: "~80 Mds USD (2025, après rebasing)",
  gdpPPP: "~225 Mds USD (2025)",
  gdpPerCapita: "~2 350 USD (nominal 2025)",
  gdpGrowth: [
    {year: "2021", value: 5.4},
    {year: "2022", value: 3.1},
    {year: "2023", value: 2.9},
    {year: "2024", value: 5.7},
    {year: "2025", value: 5.0}
  ],
  inflation: "23.1% (décembre 2024 — en forte décrue depuis 54% en 2022)",
  debtToGDP: "84.8% (2024 — restructuration dette externe en cours post-crise 2022)",
  tradeBalance: "+1.8 Mds USD (2024 — excédent or et pétrole)",
  currency: "Cedi ghanéen (GHS)",
  exchangeRateEUR: "1 EUR ≈ 17.5 GHS (2025)",
  exchangeRateUSD: "1 USD ≈ 16 GHS (officiel, 2025)",
  corruptionIndex: "Score 43/100 — Rang 75/180 (TI 2024)",
  easeBusiness: "Rang 118/190 (World Bank 2020)",
  politicalStability: "-0.18 (World Bank 2024)",
  riskScore: 5,
  riskLabel: "Modéré-Élevé",
  recommendation: "Sélectif — Mines d'or leaders, secteur financier solide, surveiller stabilisation macro",
  timezone: "UTC+0 (GMT)",
  languages: "Anglais (officiel), Twi, Ga, Ewe, Fanti, Dagomba + nombreuses langues locales",
  religions: "Christianisme ~71%, Islam ~19%, Religions traditionnelles ~10%",
  memberships: ["UA", "CEDEAO (ECOWAS)", "Commonwealth", "ZLECAF (AfCFTA)", "G77", "ITIE", "ONU (membre fondateur actif)"],

  // MINERALS
  minerals: [
    {
      name: "Or",
      type: "Précieux",
      annualProduction: "~6 M oz or fin (~186 t) — Record historique 2025 (Ghana Chamber of Mines)",
      worldRank: "1er africain, 6e mondial",
      reserves: "~1 000 t de réserves prouvées (mines industrielles)",
      deposits: [
        {name: "Ahafo Mine (Brong-Ahafo)", location: "7.02°N, 2.35°W", stage: "Production", operator: "Newmont Corporation", nationality: "USA", ownership: "Newmont 100% (redevance GNPC/État)"},
        {name: "Ahafo North Extension", location: "7.10°N, 2.50°W", stage: "Construction / Mise en production 2025", operator: "Newmont Corporation", nationality: "USA", ownership: "Newmont 100%"},
        {name: "Tarkwa Mine (Western Region)", location: "5.30°N, 2.01°W", stage: "Production", operator: "Gold Fields Ltd", nationality: "Afrique du Sud", ownership: "Gold Fields 90%, GNPC/État 10%"},
        {name: "Damang Mine (Western Region)", location: "5.58°N, 2.07°W", stage: "Production", operator: "Gold Fields Ltd", nationality: "Afrique du Sud", ownership: "Gold Fields 90%"},
        {name: "Obuasi Mine (Ashanti Region)", location: "6.20°N, 1.68°W", stage: "Production (redevelopment)", operator: "AngloGold Ashanti", nationality: "Afrique du Sud", ownership: "AngloGold Ashanti 90%, Gouvernement Ghana 10%"},
        {name: "Edikan Mine (Western Region)", location: "5.38°N, 1.33°W", stage: "Production", operator: "Perseus Mining", nationality: "Australie", ownership: "Perseus Mining 90%"},
        {name: "Namdini Mine (Upper East Region)", location: "10.65°N, 0.68°W", stage: "Construction / Production 2025", operator: "Shandong Gold / Cardinal Resources", nationality: "Chine / Australie", ownership: "Shandong Gold 97%"},
        {name: "Akyem Mine (Eastern Region)", location: "6.38°N, 0.98°W", stage: "Production", operator: "Newmont Corporation (anciennement Zijin Mining)", nationality: "USA", ownership: "Newmont 100%"},
        {name: "Chirano Mine (Western Region)", location: "6.28°N, 2.60°W", stage: "Production", operator: "Kinross Gold", nationality: "Canada", ownership: "Kinross 90%, Gouvernement Ghana 10%"}
      ],
      exportRevenue: "~9.2 Mds USD (2024)",
      regulation: "Minerals and Mining Act 2006 (Act 703). Royalties 5%. Participation État 10% minimum (carried interest). Minerals Commission (régulateur). Programme AKOBEN d'évaluation environnementale.",
      crmaRelevance: "Faible (or non sur liste CRM UE)"
    },
    {
      name: "Manganèse",
      type: "Industriel / Acier",
      annualProduction: "~5 M t minerai (2024 — parmi les plus hauts d'Afrique)",
      worldRank: "3e africain, Top 10 mondial",
      reserves: "~120 Mt de minerai",
      deposits: [
        {name: "Nsuta Mine (Western Region)", location: "5.42°N, 1.93°W", stage: "Production", operator: "Ghana Manganese Company (GMC — Consolidated Minerals / POSCO)", nationality: "Australie / Corée du Sud", ownership: "Consolidated Minerals 90%, État Ghana 10%"}
      ],
      exportRevenue: "~500 M USD (2024)",
      regulation: "Minerals and Mining Act 2006. Royalties 3%.",
      crmaRelevance: "Élevée — Manganèse sur liste CRM de l'UE"
    },
    {
      name: "Bauxite",
      type: "Industriel / Aluminium",
      annualProduction: "~1.7 M t (2024)",
      worldRank: "10e mondial",
      reserves: "~900 Mt estimées (Atewa, Nyinahin, Awaso)",
      deposits: [
        {name: "Awaso Mine (Western Region)", location: "6.55°N, 2.38°W", stage: "Production", operator: "Ghana Bauxite Company (GBC — Bosai Minerals, Chine)", nationality: "Chine", ownership: "Bosai Minerals (Chine) 80%, Ghana 20%"},
        {name: "Nyinahin (Ashanti Region)", location: "6.85°N, 2.05°W", stage: "Exploration avancée", operator: "Norsk Hydro / VALCO (projet)", nationality: "Norvège / USA", ownership: "En développement"},
        {name: "Atewa Range (Eastern Region)", location: "6.18°N, 0.58°W", stage: "Contesté — Forêt classée / projet minier suspendu", operator: "Shandong Bosai (projet controversé)", nationality: "Chine", ownership: "Suspendu — protection forêt primaire Atewa"}
      ],
      exportRevenue: "~100 M USD (2024)",
      regulation: "Minerals and Mining Act 2006. Bauxite aluminium project intégré (Volta Aluminium — VALCO) à l'étude.",
      crmaRelevance: "Élevée — Aluminium sur liste CRM UE"
    },
    {
      name: "Diamants",
      type: "Précieux / Industriel",
      annualProduction: "~330 000 carats (2024)",
      worldRank: "Petit producteur africain",
      reserves: "~8 Mt de minerai (Birim River Basin)",
      deposits: [
        {name: "Akwatia (Eastern Region — Birim River Basin)", location: "6.03°N, 0.80°W", stage: "Production artisanale et semi-industrielle", operator: "Ghana Diamond Company (GDC)", nationality: "Ghana", ownership: "État Ghana / privé ghanéen"}
      ],
      exportRevenue: "~10 M USD (2024)",
      regulation: "Minerals and Mining Act 2006. Processus de Kimberley.",
      crmaRelevance: "Faible"
    },
    {
      name: "Pétrole brut",
      type: "Hydrocarbure / Énergie",
      annualProduction: "~130 000 bpj (Jubilee + TEN fields, 2024)",
      worldRank: "Producteur africain significatif",
      reserves: "~660 M barils prouvés (Jubilee + TEN + Deepwater Tano)",
      deposits: [
        {name: "Jubilee Field (offshore deep water)", location: "4.67°N, 2.95°W", stage: "Production (depuis 2010)", operator: "Tullow Oil / Kosmos Energy / GNPC", nationality: "UK / USA / Ghana", ownership: "Tullow Oil 35.5%, Kosmos Energy 15.05%, Aker Energy 6.96%, GNPC 13.75%, Petro SA 1%"},
        {name: "TEN Fields (Tweneboa-Enyenra-Ntomme, offshore)", location: "4.80°N, 3.10°W", stage: "Production (depuis 2016)", operator: "Tullow Oil / Kosmos Energy / GNPC", nationality: "UK / USA / Ghana", ownership: "Tullow Oil 47.2%, Kosmos 17%, GNPC 15%, Vitol 9%, PetroAfrica 3.5%"}
      ],
      exportRevenue: "~2.2 Mds USD (2024)",
      regulation: "Petroleum Revenue Management Act (PRMA) 2011. GNPC (Ghana National Petroleum Corporation). PIAC (surveillance indépendante recettes pétrolières).",
      crmaRelevance: "Non applicable"
    },
    {
      name: "Sel (Sodium)",
      type: "Industriel / Alimentaire",
      annualProduction: "~300 000 t (2024)",
      worldRank: "Non disponible",
      reserves: "Côte du Volta (marais salants)",
      deposits: [
        {name: "Ada (Greater Accra) — Songor Lagoon", location: "5.80°N, 0.63°E", stage: "Production artisanale et semi-industrielle", operator: "Divers opérateurs locaux", nationality: "Ghana", ownership: "Communautés locales / privé"}
      ],
      exportRevenue: "Faible (consommation locale)",
      regulation: "Minerals and Mining Act 2006.",
      crmaRelevance: "Faible"
    }
  ],

  // INDUSTRIES
  industries: {
    gdpBySector: {agriculture: 20, industry: 32, services: 41, mining: 7},
    keyIndustries: [
      {name: "Or (mines industrielles)", description: "Record 6 M oz en 2025. Newmont (Ahafo, Akyem), Gold Fields (Tarkwa, Damang), AngloGold Ashanti (Obuasi), Perseus (Edikan), Shandong (Namdini). 1er africain.", share: "~35% des exportations totales"},
      {name: "Pétrole & Gaz (offshore)", description: "Jubilee Field + TEN Fields. Tullow Oil / Kosmos / GNPC. ~130 000 bpj. Déclin progressif sans nouveaux développements.", share: "~13% des exportations"},
      {name: "Cacao (agriculture export)", description: "2e producteur mondial (~800 000 t/an). COCOBOD régulateur. Exportation principalement brute (fèves). Transformation locale sous-développée.", share: "~20% des exportations"},
      {name: "Services financiers & Banque", description: "GCB Bank, Ecobank, Stanbic, Fidelity, Absa Ghana. Secteur en restructuration post-crise 2017-2019 (9 banques dissoutes). Digitalisation avancée.", share: "~9% PIB"},
      {name: "Télécommunications", description: "MTN Ghana (leader — 57% parts de marché), Vodafone Ghana, AirtelTigo. MoMo MTN transformationnel (>30 M utilisateurs).", share: "~7% PIB"},
      {name: "BTP & Énergie", description: "GRIDCO, Electricity Company of Ghana (ECG), Ghana Gas. Problème d'électricité (délestage). Projets énergie solaire (Bui Solar Park 250 MW).", share: "~8% PIB"}
    ],
    sez: [
      {name: "Ghana Free Zones Board (GFZB)", location: "Tema / Accra / Regions", advantages: "IS 0% pendant 10 ans (extension possible), exonération droits de douane, facilitation exports"},
      {name: "Accra Digital Centre", location: "Accra", advantages: "Hub numérique, startups tech, centres d'appels"},
      {name: "Tema Port Industrial Zone", location: "Tema (Grand Accra)", advantages: "Proximité port, traitement et transformation minière, import-export facilité"},
      {name: "Kumasi Industrial Estate", location: "Kumasi (Ashanti)", advantages: "Transformation agroalimentaire, bois, produits locaux"}
    ],
    majorProjects: [
      "Ahafo North Gold Mine (Newmont) — Mise en production 2025, 300 000 oz/an",
      "Namdini Gold Mine (Shandong Gold) — Construction, ~280 000 oz/an",
      "Jubilee South Phase 1A & 1B (Tullow/Kosmos) — Extension reserves offshore",
      "Accra Digital Centre Phase 2 — Hub tech Afrique de l'Ouest anglophone",
      "Bui Solar Park (250 MW) — En développement",
      "Komenda Sugar Factory — Réhabilitation en cours",
      "Tema Port Expansion (Meridian Port Services) — Nouveau terminal 3.5 M TEU",
      "Programme de restructuration dette (FMI $3 Mds — débuté 2023, en cours 2024-2026)"
    ],
    banking: {
      mainBanks: ["GCB Bank", "Ecobank Ghana", "Absa Ghana (ex-Barclays)", "Stanbic Bank Ghana", "Standard Chartered Ghana", "Fidelity Bank Ghana", "CalBank", "First National Bank Ghana", "Republic Bank Ghana"],
      totalAssets: "~22 Mds USD",
      bancarisation: "~57% (2024 — forte pénétration mobile money)"
    },
    telecom: {
      operators: ["MTN Ghana (57% parts de marché)", "Vodafone Ghana (Telecel Ghana depuis 2024)", "AirtelTigo Ghana (Bharti / TIGO)"],
      mobilePenetration: "~140%",
      internetPenetration: "~72%"
    },
    energy: {
      mix: "Gaz naturel 50%, Hydraulique (Akosombo) 32%, Fioul lourd 10%, Solaire 5%, Biomasse 3%",
      installedCapacity: "~5.4 GW (2024, dont 4.8 GW fiable)",
      renewableProjects: "Bui Solar Park (250 MW, en dev.), Renewables Africa (solaire distribué), Programme ROOFTOP SOLAR gouvernement Mahama"
    }
  },

  // TOP ENTERPRISES
  enterprises: [
    {name: "MTN Ghana", sector: "Télécommunications / Fintech (MoMo)", revenue: "~1.3 Mds USD (2024)", employees: "2 500 directs + 30 000 agents", ceo: "Selorm Adadevoh", shareholding: "MTN Group (Afrique du Sud) 63.5%, Flottant GSE 36.5%", listed: "Ghana Stock Exchange (MTNGH)", founded: "1994", hq: "Accra", website: "mtn.com.gh"},
    {name: "Newmont Ghana (Ahafo / Akyem)", sector: "Mines (Or)", revenue: "~2.5 Mds USD (production Ghana 2024)", employees: "~5 000 directs + sous-traitants", ceo: "Tom Palmer (CEO Newmont global)", shareholding: "Newmont Corporation (USA) 100% (redevances État Ghana)", listed: "Non coté (NYSE: NEM)", founded: "2004 (Ahafo acquis)", hq: "Accra / Brong-Ahafo", website: "newmont.com"},
    {name: "Gold Fields Ghana (Tarkwa & Damang)", sector: "Mines (Or)", revenue: "~1.2 Mds USD (Ghana 2024)", employees: "~7 000 directs", ceo: "Mike Fraser (CEO Gold Fields global)", shareholding: "Gold Fields Ltd (Afrique du Sud) 90%, État Ghana 10%", listed: "Non coté (JSE: GFI / NYSE: GFI)", founded: "1993 (Tarkwa)", hq: "Accra / Western Region", website: "goldfields.com"},
    {name: "AngloGold Ashanti (Obuasi Mine)", sector: "Mines (Or — Redevelopment)", revenue: "~600 M USD (Obuasi 2024)", employees: "~3 500 directs", ceo: "Alberto Calderon (CEO AGA global)", shareholding: "AngloGold Ashanti 90%, État Ghana 10%", listed: "Non coté (NYSE: AU / JSE: ANG)", founded: "1897 (Obuasi historique)", hq: "Accra / Obuasi", website: "anglogoldashanti.com"},
    {name: "Tullow Oil Ghana", sector: "Pétrole & Gaz (offshore)", revenue: "~900 M USD (Ghana ops 2024)", employees: "~500 Ghana", ceo: "Richard Miller (CEO Tullow global)", shareholding: "Tullow Oil PLC (UK) 35.5% (Jubilee)", listed: "Non coté (LSE: TLW)", founded: "2007 (découverte Jubilee)", hq: "Accra", website: "tullowoil.com"},
    {name: "Kosmos Energy Ghana", sector: "Pétrole & Gaz (offshore)", revenue: "~700 M USD (Ghana ops)", employees: "~200 Ghana", ceo: "Andrew Inglis (CEO Kosmos global)", shareholding: "Kosmos Energy Ltd (USA) 15% (Jubilee)", listed: "Non coté (NYSE: KOS)", founded: "2004", hq: "Accra", website: "kosmosenergy.com"},
    {name: "GCB Bank", sector: "Banque", revenue: "~200 M USD (PNB)", employees: "3 200", ceo: "Kofi Adomakoh", shareholding: "État Ghana 21.4%, SSNIT 17.5%, Flottant GSE 61.1%", listed: "Ghana Stock Exchange (GCB)", founded: "1953", hq: "Accra", website: "gcb.com.gh"},
    {name: "Ecobank Ghana", sector: "Banque", revenue: "~150 M USD (PNB)", employees: "2 000", ceo: "Clifford Mettle", shareholding: "ETI (Ecobank Transnational) 65.5%, Flottant GSE", listed: "Ghana Stock Exchange (EBG)", founded: "1989", hq: "Accra", website: "ecobank.com/gh"},
    {name: "Ghana Manganese Company (Nsuta Mine)", sector: "Mines (Manganèse)", revenue: "~500 M USD (2024)", employees: "~1 200", ceo: "Non disponible", shareholding: "Consolidated Minerals (Australie) 90%, État Ghana 10%", listed: "Non coté", founded: "1916 (mine historique)", hq: "Nsuta / Accra", website: "consolidatedminerals.com"},
    {name: "Guinness Ghana Breweries", sector: "Agroalimentaire (Bières)", revenue: "~120 M USD", employees: "600", ceo: "Non disponible", shareholding: "Diageo PLC (UK) 54%, Flottant GSE 46%", listed: "Ghana Stock Exchange (GGBL)", founded: "1971", hq: "Accra", website: "guinness.com.gh"},
    {name: "Absa Ghana (ex-Barclays Ghana)", sector: "Banque", revenue: "~130 M USD (PNB)", employees: "1 800", ceo: "Non disponible", shareholding: "Absa Group (Afrique du Sud) 91.5%", listed: "Ghana Stock Exchange (ACCESS)", founded: "1917 (Barclays era)", hq: "Accra", website: "absa.com.gh"},
    {name: "Perseus Mining Ghana (Edikan Mine)", sector: "Mines (Or)", revenue: "~250 M USD (Edikan 2024)", employees: "~1 500", ceo: "Jeff Quartermaine (global)", shareholding: "Perseus Mining ASX/TSX 90%", listed: "Non coté (ASX: PRU)", founded: "2011", hq: "Cape Coast / Accra", website: "perseusmining.com"},
    {name: "Kinross Gold Ghana (Chirano Mine)", sector: "Mines (Or)", revenue: "~180 M USD (Chirano 2024)", employees: "~1 000", ceo: "J. Paul Rollinson (CEO Kinross global)", shareholding: "Kinross Gold (Canada) 90%, État Ghana 10%", listed: "Non coté (TSX/NYSE: K)", founded: "2005 (Chirano acquis)", hq: "Bibiani / Accra", website: "kinross.com"},
    {name: "Stanbic Bank Ghana", sector: "Banque", revenue: "~120 M USD (PNB)", employees: "1 000", ceo: "Kwamina Asomaning", shareholding: "Standard Bank Group (Afrique du Sud) 90%", listed: "Ghana Stock Exchange (SCB)", founded: "1999", hq: "Accra", website: "stanbicbank.com.gh"},
    {name: "Ghana National Petroleum Corporation (GNPC)", sector: "Pétrole & Gaz (État)", revenue: "~600 M USD (dividendes + opérations)", employees: "~800", ceo: "Opoku Ahweneeh Danquah", shareholding: "État Ghana 100%", listed: "Non coté", founded: "1983", hq: "Accra", website: "gnpcghana.com"},
    {name: "Electricity Company of Ghana (ECG)", sector: "Énergie (Distribution électricité)", revenue: "~900 M USD", employees: "8 000", ceo: "Non disponible", shareholding: "État Ghana 100% (concession PDS suspendue)", listed: "Non coté", founded: "1967", hq: "Accra", website: "ecgonline.info"},
    {name: "Ghana Cocoa Board (COCOBOD)", sector: "Agriculture (Cacao — régulateur + acheteur)", revenue: "~3 Mds USD (achats fèves)", employees: "~5 000", ceo: "Joseph Boahene Aidoo", shareholding: "État Ghana 100%", listed: "Non coté", founded: "1947", hq: "Accra", website: "cocobod.gh"},
    {name: "Vodafone Ghana (Telecel Ghana depuis 2024)", sector: "Télécommunications", revenue: "~350 M USD", employees: "1 200", ceo: "Non disponible (post-rachat Telecel)", shareholding: "Telecel Group (acquis Vodafone Ghana 2024) 70%, Gouvernement Ghana 30%", listed: "Non coté", founded: "2008 (Vodafone), 2024 (Telecel)", hq: "Accra", website: "telecel.com.gh"},
    {name: "Fidelity Bank Ghana", sector: "Banque", revenue: "~100 M USD (PNB)", employees: "2 500", ceo: "Julian Kingsley Opuni", shareholding: "Actionnaires ghanéens privés (FMO Pays-Bas 8.5%)", listed: "Non coté", founded: "2006", hq: "Accra", website: "fidelitybank.com.gh"},
    {name: "Cal Bank Ghana", sector: "Banque", revenue: "~75 M USD (PNB)", employees: "1 000", ceo: "Philip Owiredu", shareholding: "Actionnaires ghanéens, IFC (Banque mondiale) 8.7%", listed: "Ghana Stock Exchange (CAL)", founded: "1990", hq: "Accra", website: "calbank.net"}
  ],

  // BILLIONAIRES & POWER PLAYERS
  billionaires: [
    {name: "Ernesto Taricone", fortune: "~200 M USD (estimation)", source: "Poissons & Thon (industrie)", companies: "Tropical Tuna Company / Sea Trade Ghana", age: "Non disponible", education: "Non disponible", bio: "Homme d'affaires italo-ghanéen. Acteur majeur de l'industrie thonière en Afrique de l'Ouest."},
    {name: "Ibrahim Mahama", fortune: "~200 M USD (estimation)", source: "Mines, Ingénierie, BTP", companies: "Engineers & Planners Ghana (mines, logistique)", age: "~55", education: "Non disponible", bio: "Frère du Président John Mahama. Fondateur d'Engineers & Planners, active dans les mines, la logistique lourde et l'agro-industrie."},
    {name: "Kwame Pianim", fortune: "Non disponible", source: "Finance, Conseil", companies: "New World Investments, Consultant", age: "~78", education: "MIT (USA)", bio: "Économiste et figure intellectuelle du secteur privé ghanéen. Ancien conseiller économique, actif dans l'investissement."},
    {name: "Sam Jonah (Sir)", fortune: "~100 M USD (estimation)", source: "Mines (Or), Finance", companies: "Ex-CEO AngloGold Ashanti Ghana, Jonah Capital (Afrique du Sud)", age: "~74", education: "Camborne School of Mines (UK)", bio: "Ancien CEO d'Ashanti Goldfields (avant fusion AngloGold). 1er Africain noir à diriger une société minière mondiale. Anobli par la Reine d'Angleterre."},
    {name: "Togbe Afede XIV", fortune: "~150 M USD (estimation)", source: "Finance, Immobilier, Médias", companies: "Strategic African Securities, Premier Health, Président GFA (Football)", age: "~60", education: "Yale School of Management (USA)", bio: "Banquier d'affaires et homme d'affaires prominent. Ex-VP du Parlement ghanéen. Actionnaire stratégique dans les services financiers et l'immobilier."}
  ],

  // GOVERNMENT LEADERS
  leaders: {
    headOfState: {name: "John Dramani Mahama", since: "Janvier 2025", party: "NDC (National Democratic Congress)", nextElection: "Décembre 2028"},
    headOfGov: {name: "John Dramani Mahama (système présidentiel — pas de PM)", since: "Janvier 2025", party: "NDC"},
    keyMinisters: [
      {portfolio: "Affaires Étrangères", name: "Samuel Okudzeto Ablakwa"},
      {portfolio: "Finances", name: "Cassiel Ato Forson"},
      {portfolio: "Mines et Ressources naturelles", name: "Samuel Abu Jinapor"},
      {portfolio: "Énergie et Pétrole", name: "John Jinapor"},
      {portfolio: "Commerce et Industrie", name: "Ekow Ainoo"},
      {portfolio: "Agriculture, Forêts et Alimentation", name: "Eric Opoku"},
      {portfolio: "Travaux publics et Logement", name: "Kojo Oppong Nkrumah"},
      {portfolio: "Éducation", name: "Haruna Iddrisu"},
      {portfolio: "Santé", name: "Kwabena Mintah Akandoh"},
      {portfolio: "Intérieur", name: "Muntaka Mubarak"},
      {portfolio: "Justice et Procureur général", name: "Dominic Ayine"},
      {portfolio: "Défense", name: "Edward Bawa"},
      {portfolio: "Communications et Digitalisation", name: "Samuel Nartey George"},
      {portfolio: "Tourisme, Culture et Arts", name: "Abla Dzifa Gomashie"},
      {portfolio: "Genre", name: "Laadi Ayamba"}
    ],
    centralBankGov: {name: "Ernest Addison", institution: "Bank of Ghana (BoG)"},
    investmentAgency: {name: "Non disponible", institution: "Ghana Investment Promotion Centre (GIPC)"},
    miningAuthority: {name: "Kenneth Ashigbey (CEO Ghana Chamber of Mines)", institution: "Minerals Commission Ghana (régulateur) + Ghana Chamber of Mines (industrie)"},
    customs: {name: "Non disponible", institution: "Ghana Revenue Authority (GRA) — Customs Division"},
    ambassadorFrance: {name: "Non disponible", institution: "Ambassadeur du Ghana en France"},
    ambassadorFromFrance: {name: "Éveline Decorps", institution: "Ambassadeur de France au Ghana"},
    unRepresentative: {name: "Harold Adlai Agyeman", institution: "Représentant permanent du Ghana à l'ONU"}
  },

  // CONTACTS
  contacts: {
    chambers: ["Ghana National Chamber of Commerce and Industry (GNCCI)", "French-Ghanaian Chamber of Commerce (CHAMBRE FRANCO-GHANEENNE)", "Ghana Chamber of Mines", "Ghana Chamber of Bulk Oil Distributors"],
    businessFrance: "Business France — Bureau Accra",
    bpifrance: "Non disponible directement (PROPARCO et British International Investment présents)",
    afd: "AFD Ghana — Bureau Accra (actif dans énergie, eau, développement urbain)",
    lawFirms: ["Reindorf Chambers (référence locale)", "Bentsi-Enchill, Letsa & Ankomah (BEL&A)", "Hogan Lovells Accra", "ENSafrica Ghana", "Sam Okudzeto & Associates"],
    big4: ["Deloitte Ghana", "PwC Ghana", "EY Ghana", "KPMG Ghana"],
    investmentBanks: ["IC Securities Ghana", "Databank Financial Services", "Stanbic Investment Management", "Cal Brokers Ghana"],
    patronat: "Ghana Employers Association (GEA) / Association of Ghana Industries (AGI)",
    diaspora: "~1 million de Ghanéens au Royaume-Uni, ~300 000 aux USA. Transferts: ~4.7 Mds USD/an (2024)"
  },

  // UNIVERSITIES
  universities: [
    {name: "University of Ghana (UG)", city: "Legon, Accra", students: "45 000", specialties: "Sciences sociales, Médecine, Sciences fondamentales, MBA", ranking: "1ère au Ghana, Top 5 Afrique anglophone subsaharienne"},
    {name: "Kwame Nkrumah University of Science and Technology (KNUST)", city: "Kumasi", students: "35 000", specialties: "Ingénierie, Mining, Architecture, Médecine", ranking: "1ère ingénierie Ghana, Top 3 Afrique STEM"},
    {name: "University of Cape Coast (UCC)", city: "Cape Coast", students: "30 000", specialties: "Éducation, Sciences sociales, Agriculture", ranking: "3e Ghana"},
    {name: "University for Development Studies (UDS)", city: "Tamale", students: "20 000", specialties: "Agriculture, Médecine, Développement", ranking: "Principale université Nord Ghana"},
    {name: "Ghana Institute of Management and Public Administration (GIMPA)", city: "Accra", students: "5 000", specialties: "MBA, Administration publique, Droit", ranking: "Top école de gestion Ghana"},
    {name: "Ashesi University", city: "Berekuso (près Accra)", students: "1 500", specialties: "Ingénierie, Business, Sciences informatiques (anglophone, libéral arts)", ranking: "Top école privée Afrique (Times HE 2024)"},
    {name: "University of Mines and Technology (UMaT)", city: "Tarkwa", students: "4 000", specialties: "Ingénierie minière, Géologie, Environnement", ranking: "Référence industrie minière Ghana"}
  ],
  sciPublications: "~8 000/an",
  patents: "~200/an",
  literacyRate: "79.0%",
  higherEducationRate: "24%",

  // LOGISTICS
  logistics: {
    ports: [
      {name: "Tema Port (Meridian Port Services)", capacity: "3.5 M TEU/an (nouveau terminal Phase 2 opérationnel 2024)", operator: "Meridian Port Services (APM Terminals / Ghana Ports — joint venture)", draft: "16 m", note: "Principal port commercial du Ghana. Hub sous-région pour Burkina Faso, Niger, Mali (transit nord)."},
      {name: "Takoradi Port (Western Region)", capacity: "~4 M t vrac (minerai, cacao, pétrole)", operator: "Ghana Ports and Harbours Authority (GPHA) / Bolloré", draft: "12 m", note: "Port minier et pétrolier. Exportation manganèse Nsuta, bauxite Awaso."}
    ],
    airports: [
      {name: "Kotoka International Airport (Accra)", traffic: "~3.4 M pax/an (2024)", freight: "~60 000 t"},
      {name: "Kumasi Airport", traffic: "~200 000 pax/an (régional)", freight: "Non disponible"},
      {name: "Tamale Airport", traffic: "~100 000 pax/an (régional)", freight: "Non disponible"}
    ],
    railway: "Réseau ferroviaire vieillissant (~1 200 km) — Liaisons Accra-Kumasi et Takoradi-Kumasi non pleinement opérationnelles. Projet de réhabilitation en cours (PPP). Connexion mines manganèse-bauxite-port Takoradi via train minier.",
    roads: "~67 448 km (dont ~14 000 km bitumés). Autoroute Accra-Tema (1ère autoroute Afrique subsaharienne). Accra-Kumasi Highway. Réseau en amélioration.",
    corridors: "Corridor Tema-Burkina Faso (Ouagadougou — 1 150 km). Corridor Takoradi-mines Ouest Ghana. Corridor Accra-Lagos (ECOWAS Highway A1).",
    containerCost: "~950 USD/conteneur export",
    customsDelay: "6 jours (moyen — améliorations avec ICUMS GRA)",
    logisticZones: ["Tema Industrial Area", "Ghana Free Zones (Tema + Accra Digital)", "Kumasi Industrial Estate"],
    maritimeConnectivity: "Lignes régulières vers Rotterdam, Anvers, Felixstowe, Tanger Med, Dakar. Hub anglophone d'Afrique de l'Ouest."
  },

  // TRADE & INVESTMENT
  trade: {
    topExports: [
      {product: "Or (mine industrielle)", value: "~9.2 Mds USD", destination: "Suisse, Dubaï, USA, Inde"},
      {product: "Pétrole brut (offshore)", value: "~2.2 Mds USD", destination: "Chine, Italie, Pays-Bas"},
      {product: "Cacao & dérivés", value: "~2.5 Mds USD", destination: "UE (Pays-Bas, Allemagne), USA"},
      {product: "Manganèse (minerai)", value: "~500 M USD", destination: "Chine, Inde, UE"},
      {product: "Bois & produits forestiers", value: "~200 M USD", destination: "Chine, UE, Inde"},
      {product: "Bauxite", value: "~100 M USD", destination: "Chine"}
    ],
    topImports: [
      {product: "Produits pétroliers raffinés", value: "~3 Mds USD", origin: "Europe, Golfe, Nigeria"},
      {product: "Machines & équipements", value: "~2 Mds USD", origin: "Chine, USA, UE"},
      {product: "Véhicules & pièces", value: "~800 M USD", origin: "Japon, Chine, UE"},
      {product: "Médicaments", value: "~600 M USD", origin: "Inde, USA, UK"},
      {product: "Riz & Blé", value: "~600 M USD", origin: "Thaïlande, Inde, USA"}
    ],
    tradeBalance: "+1.8 Mds USD (2024)",
    fdiInward: {stock: "~20 Mds USD", flow: "~1.5 Mds USD/an", topInvestors: ["USA", "UK", "Chine", "Afrique du Sud", "Canada", "Australie"]},
    fdiOutward: "Faible (économie en développement — quelques investissements ECOWAS)",
    tradeAgreements: ["ZLECAF (AfCFTA — Ghana siège secrétariat à Accra)", "APE UE-CEDEAO (en cours)", "Accord CEDEAO", "AGOA (US-Africa)", "Commonwealth Preferential Trade"],
    taxRegime: {is: "IS 25% (général) / 35% mines / 15% manufacturing en zones libres", tva: "TVA 15%", conventions: "30+ conventions fiscales bilatérales (UK, USA, France, Allemagne, Chine, Suède, Italie…)"},
    freeZones: "Ghana Free Zones Board — IS 0% pendant 10 ans, exonération douanière. Conditions: 70% production exportée.",
    profitRepatriation: "Libre avec enregistrement Bank of Ghana. Quelques restrictions sur les montants importants.",
    bit: "35+ traités bilatéraux d'investissement signés"
  },

  // DEMOGRAPHICS
  demographics: {
    totalPopulation: "~34 millions (2025)",
    growthRate: "2.2%/an",
    ageStructure: "37% de 0-14 ans, 59% de 15-64 ans, 4% de 65+ ans. Âge médian: 22 ans.",
    urbanPopulation: "58%",
    unemployment: "~14.7% (2024 — sous-emploi structurel élevé)",
    youthUnemployment: "~28%",
    hdi: "0.602 — Rang 145/191 (PNUD 2024)",
    lifeExpectancy: "64 ans",
    middleClass: "~40% (définition UA — parmi les plus élevés d'Afrique subsaharienne)",
    millionaires: "~2 200 (estimation Knight Frank 2024)",
    diasporaFrance: "~50 000 en France / ~1 million au Royaume-Uni / ~300 000 aux USA",
    languages: "Anglais (officiel), Twi (40% locuteurs), Ga, Ewe, Fanti, Haoussa",
    literacy: "79.0%"
  },

  // RISK & OPPORTUNITIES
  risks: {
    political: {score: 4, comment: "Démocratie consolidée (alternance Mahama jan. 2025 — NDC). Institutions solides mais polarisation bipartite. Sécurité nationale maîtrisée. Sécrétariat AfCFTA hébergé à Accra (signal de crédibilité)."},
    security: {score: 3, comment: "Stable en général. Tensions nord (Bolgatanga) et zones frontières Burkina/Côte d'Ivoire. Criminalité urbaine Accra maîtrisable. Pas de risque jihadiste sur territoire national."},
    economic: {score: 5, comment: "Crise économique 2022-2023 sévère (inflation 54%, défaut dette externe). Restructuration en cours avec FMI ($3 Mds). Rebond 2024 (+5.7%). Dette élevée (84% PIB). Stabilisation Cedi en cours."},
    regulatory: {score: 4, comment: "Cadre minier solide (Minerals Commission). GIPC actif. Complexité administrative et bureaucratie. Énergétique problème récurrent (délestage / dumsor). GRA efficace sur douanes."},
    logistic: {score: 4, comment: "Port Tema agrandi (3.5 M TEU). Réseau routier en amélioration. Chemin de fer vieillissant (réhabilitation PPP). Hub logistique régional Afrique de l'Ouest anglophone."},
    miningOpportunity: {score: 9, comment: "Record or 2025 (6 M oz). Manganèse top africain. Bauxite largement inexploité. Pétrole offshore. Shandong Gold (Namdini), Newmont (Ahafo North) — nouveaux projets en production."},
    industrialOpportunity: {score: 6, comment: "Transformation cacao sous-exploitée. Bauxite-aluminium: projet VALCO à relancer. Manufacture légère. Hub anglophone pour services BPO/fintech."},
    digitalOpportunity: {score: 7, comment: "Siège AfCFTA à Accra. MTN MoMo révolutionnaire (>30 M utilisateurs). Ashesi University (IA, tech). Hub startup anglophone Afrique de l'Ouest. Accra Digital Centre."},
    overallRisk: 4.2,
    overallOpportunity: 7.3,
    recommendation: "Investir sélectivement — Champion minier africain, surveiller la stabilisation macro post-crise 2022"
  }
};

// --- EU & REMAINING AFRICA DATA ---
// ============================================================
// RAQIB Corridor Intelligence Platform
// Data File — Part 2: 17 Remaining African Countries + 27 EU Countries
// Generated: April 2026
// Sources: IMF WEO 2025, World Bank, USGS Minerals Yearbook 2024,
// Transparency International CPI 2024, AfDB, CRMA EU 2023,
// Trading Economics, UN Comtrade, Mining Intelligence
// ============================================================

// ============================================================
// SECTION A: 17 REMAINING AFRICAN CORRIDOR COUNTRIES
// ============================================================

export const DATA_REMAINING_AFRICA: Country[] = [

  // ============================================================
  // 1. MAURITANIE 🇲🇷
  // ============================================================
  {
    id: "MR",
    name: "Mauritanie",
    officialName: "République Islamique de Mauritanie",
    flag: "🇲🇷",
    region: "africa",
    capital: "Nouakchott",
    area: "1 030 700 km²",
    population: "~4.9 millions (2025)",
    density: "4.8 hab/km²",
    gdpNominal: "~10.5 Mds USD (2025)",
    gdpPPP: "~26 Mds USD (2025)",
    gdpPerCapita: "~2 100 USD",
    gdpGrowth: [
      {year: "2021", value: 2.4},
      {year: "2022", value: 6.4},
      {year: "2023", value: 6.5},
      {year: "2024", value: 5.5},
      {year: "2025", value: 5.8}
    ],
    inflation: "4.1% (2025)",
    debtToGDP: "57.2%",
    tradeBalance: "-1.2 Mds USD",
    currency: "Ouguiya mauritanien (MRU)",
    exchangeRateEUR: "1 EUR = 41 MRU",
    exchangeRateUSD: "1 USD = 38 MRU",
    corruptionIndex: "Score 27/100 — Rang 140/180 (TI 2024)",
    easeBusiness: "Rang 152/190 (World Bank 2020)",
    politicalStability: "-0.62 (World Bank 2023)",
    riskScore: 6,
    riskLabel: "Élevé",
    recommendation: "Cibler secteurs ressources avec partenaire local solide",
    timezone: "UTC+0",
    languages: "Arabe (officielle), Pulaar, Soninké, Wolof, Français",
    religions: "Islam (99.9%)",
    memberships: ["UA", "UMA", "CEDEAO (observateur)", "OCI", "Ligue arabe"],

    minerals: [
      {
        name: "Minerai de fer",
        type: "Industriel",
        annualProduction: "~12 Mt/an (2024)",
        worldRank: "Top 20 mondial",
        reserves: "~1 milliard de tonnes (Kédia d'Idjill)",
        deposits: [
          {name: "Kédia d'Idjill (Zouerate)", location: "22.73°N, 12.47°W", stage: "Production", operator: "SNIM", nationality: "Mauritanie", ownership: "État mauritanien 78.35%"}
        ],
        exportRevenue: "~800 M USD",
        regulation: "Code minier 2012 révisé, SNIM monopole quasi-étatique",
        crmaRelevance: "Modérée"
      },
      {
        name: "Or",
        type: "Précieux",
        annualProduction: "~250 000 oz/an (Tasiast)",
        worldRank: "Top 30 mondial",
        reserves: "~7 Mt d'or (Tasiast — ressources mesurées)",
        deposits: [
          {name: "Tasiast", location: "20.50°N, 14.67°W", stage: "Production", operator: "Kinross Gold", nationality: "Canada", ownership: "Kinross Gold 100%"}
        ],
        exportRevenue: "~450 M USD",
        regulation: "Contrat de concession Kinross, redevances 3%",
        crmaRelevance: "Faible"
      },
      {
        name: "Cuivre",
        type: "Industriel / Critique",
        annualProduction: "~35 000 t/an",
        worldRank: "Non classé",
        reserves: "~200 Mt ressources (Guelb Moghrein)",
        deposits: [
          {name: "Guelb Moghrein (Akjoujt)", location: "19.75°N, 14.38°W", stage: "Production", operator: "First Quantum Minerals", nationality: "Canada", ownership: "First Quantum 80%"}
        ],
        exportRevenue: "~120 M USD",
        regulation: "Convention minière First Quantum",
        crmaRelevance: "Élevée — Cuivre critique pour transition énergétique"
      },
      {
        name: "Pétrole & Gaz",
        type: "Hydrocarbures",
        annualProduction: "~5 000 b/j (Chinguetti déclinant); GNL Grand Tortue/Ahmeyim en montée",
        worldRank: "Producteur mineur",
        reserves: "Grand Tortue/Ahmeyim: ~15 Tcf de gaz (offshore)",
        deposits: [
          {name: "Chinguetti", location: "Offshore", stage: "Production déclinante", operator: "Woodside/SMHPM", nationality: "Australie/Mauritanie", ownership: "Woodside 35%, État MR 18%"},
          {name: "Grand Tortue / Ahmeyim (GTA)", location: "Offshore profond MR-Sénégal", stage: "Production 1ère phase", operator: "BP 56%, Kosmos 27%, SMHPM 10%", nationality: "UK/USA/Mauritanie", ownership: "Joint venture"}
        ],
        exportRevenue: "~200 M USD (en hausse avec GTA)",
        regulation: "Code pétrolier 1988 révisé, SMHPM (Société Mauritanienne des Hydrocarbures)",
        crmaRelevance: "Modérée — GNL pour diversification énergétique UE"
      },
      {
        name: "Pêche",
        type: "Ressource marine",
        annualProduction: "~800 000 t/an (ZEE parmi les plus riches au monde)",
        worldRank: "Top 5 Afrique",
        reserves: "ZEE 230 000 km²",
        deposits: [
          {name: "Zone Économique Exclusive mauritanienne", location: "Atlantique Est", stage: "Production", operator: "IMROP / Licences internationales", nationality: "Mauritanie + UE + Chine + Russie", ownership: "État/concessions"}
        ],
        exportRevenue: "~600 M USD",
        regulation: "Accord de pêche UE-Mauritanie (2019-2024), renégociation en cours",
        crmaRelevance: "Faible (non minerai)"
      }
    ],

    enterprises: [
      {name: "SNIM (Société Nationale Industrielle et Minière)", sector: "Mines — Fer", revenue: "~800 M USD", employees: "~5 000", ceo: "Mokhtar Ould Djay", shareholding: "État MR 78.35%, privés 21.65%", listed: "Non coté", hq: "Nouadhibou"},
      {name: "Kinross Tasiast", sector: "Mines — Or", revenue: "~450 M USD", employees: "~2 000", ceo: "Direction Kinross", shareholding: "Kinross Gold 100%", listed: "TSX/NYSE (KGC)", hq: "Tasiast / Toronto"},
      {name: "First Quantum (Guelb Moghrein)", sector: "Mines — Cuivre/Or", revenue: "~120 M USD (MR)", employees: "~800", ceo: "Direction First Quantum", shareholding: "First Quantum 80%", listed: "TSX (FM)", hq: "Akjoujt / Vancouver"},
      {name: "BP Mauritanie (GTA)", sector: "Pétrole & Gaz", revenue: "En montée (phase 1 GNL)", employees: "~500", ceo: "Direction BP", shareholding: "BP 56%, Kosmos 27%, SMHPM 10%", listed: "LSE (BP)", hq: "Nouakchott / Londres"},
      {name: "SMHPM (Société Mauritanienne des Hydrocarbures)", sector: "Pétrole & Gaz (État)", revenue: "Non disponible", employees: "~300", ceo: "PDG gouvernemental", shareholding: "État MR 100%", listed: "Non coté", hq: "Nouakchott"},
      {name: "Mauritanian Airlines International", sector: "Transport aérien", revenue: "Non disponible", employees: "~200", ceo: "Non disponible", shareholding: "État + privé", listed: "Non coté", hq: "Nouakchott"}
    ],

    leaders: {
      headOfState: {name: "Mohamed Ould Ghazouani", since: "2019", party: "Union pour la République (UPR)", nextElection: "2024 (réélu juin 2024)"},
      headOfGov: {name: "Mokhtar Ould Djay", since: "2023", party: "UPR"},
      keyMinisters: [
        {portfolio: "Affaires Étrangères", name: "Mokhtar Ould Djay (PM+AE)"},
        {portfolio: "Mines & Pétrole", name: "Nany Ould Chrougha"},
        {portfolio: "Finances", name: "Sid Ahmed Ould Raiss"},
        {portfolio: "Défense", name: "Général Hanena Ould Sidi"}
      ],
      centralBankGov: {name: "Cheikh El Kebir Moulaye Taher", institution: "Banque Centrale de Mauritanie"},
      miningAuthority: {name: "Non disponible", institution: "Ministère du Pétrole, des Mines et de l'Énergie"}
    },

    contacts: {
      chambers: ["Chambre de Commerce, d'Industrie et d'Agriculture de Mauritanie (CCIAM)"],
      afd: "AFD Mauritanie — Bureau Nouakchott",
      lawFirms: ["Cabinet d'avocats local — Partenaires AFD/Banque Mondiale"],
      patronat: "Union Nationale du Patronat de Mauritanie (UNPM)"
    },

    universities: [
      {name: "Université de Nouakchott Al Aasriya", city: "Nouakchott", students: "~20 000", specialties: "Droit, Sciences, Lettres"},
      {name: "Académie Navale de Mauritanie", city: "Nouadhibou", students: "~500", specialties: "Maritime, Pêche"}
    ],
    literacyRate: "67%",

    demographics: {
      totalPopulation: "4.9 millions (2025)",
      growthRate: "2.8%/an",
      urbanPopulation: "57%",
      unemployment: "12% (officiel)",
      hdi: "0.540 — Rang 158/191",
      lifeExpectancy: "65 ans",
      languages: "Arabe, Pulaar, Soninké, Wolof, Hassaniya"
    },

    risks: {
      political: {score: 5, comment: "Stabilité sous Ghazouani. Risques sahéliens en bordure Est."},
      security: {score: 6, comment: "Frontières avec le Sahel instable (Mali). Groupes jihadistes actifs au nord."},
      economic: {score: 6, comment: "Économie mono-exportatrice (fer + or). Développement GTA gazier = opportunité."},
      regulatory: {score: 6, comment: "Cadre minier en amélioration mais bureaucratie forte. Corruption significative."},
      logistic: {score: 7, comment: "Réseau routier limité. Port de Nouadhibou à moderniser. Désert = contrainte logistique."},
      miningOpportunity: {score: 7, comment: "Fer (SNIM), or (Kinross), cuivre (First Quantum), GNL offshore (GTA). Pipeline de projets."},
      overallRisk: 6,
      overallOpportunity: 7,
      recommendation: "Cibler secteurs ressources avec partenaire local solide"
    }
  },

  // ============================================================
  // 2. GAMBIE 🇬🇲
  // ============================================================
  {
    id: "GM",
    name: "Gambie",
    officialName: "République de Gambie",
    flag: "🇬🇲",
    region: "africa",
    capital: "Banjul",
    area: "11 295 km²",
    population: "~2.7 millions (2025)",
    density: "239 hab/km²",
    gdpNominal: "~2.5 Mds USD (2025)",
    gdpPPP: "~7.1 Mds USD (2025)",
    gdpPerCapita: "~930 USD",
    gdpGrowth: [
      {year: "2021", value: 5.6},
      {year: "2022", value: 4.9},
      {year: "2023", value: 5.3},
      {year: "2024", value: 5.1},
      {year: "2025", value: 5.5}
    ],
    inflation: "7.2% (2025)",
    debtToGDP: "80.0%",
    tradeBalance: "-450 M USD",
    currency: "Dalasi gambien (GMD)",
    exchangeRateEUR: "1 EUR = 75 GMD",
    exchangeRateUSD: "1 USD = 69 GMD",
    corruptionIndex: "Score 37/100 — Rang 101/180 (TI 2024)",
    easeBusiness: "Rang 155/190 (World Bank 2020)",
    politicalStability: "-0.20 (World Bank 2023)",
    riskScore: 6,
    riskLabel: "Modéré-Élevé",
    recommendation: "Tourisme et agroalimentaire — marché limité",
    timezone: "UTC+0",
    languages: "Anglais (officiel), Mandinka, Wolof, Fula",
    religions: "Islam (96%), Christianisme (4%)",
    memberships: ["UA", "CEDEAO", "Commonwealth", "OCI"],

    minerals: [
      {
        name: "Zircon & Ilménite (sables minéralisés)",
        type: "Minerais lourds",
        annualProduction: "Faible — production artisanale",
        worldRank: "Non classé",
        reserves: "Potentiel côtier identifié mais non exploité commercialement",
        deposits: [{name: "Zone côtière gambienne", location: "Côte atlantique", stage: "Exploration", operator: "Non attribué", nationality: "-", ownership: "-"}],
        exportRevenue: "Marginal",
        regulation: "Mines Act 2005",
        crmaRelevance: "Faible"
      },
      {
        name: "Arachides",
        type: "Agricole",
        annualProduction: "~130 000 t/an",
        worldRank: "Top 20 Afrique",
        reserves: "Agriculture saisonnière",
        deposits: [{name: "Bassin arachidier gambien", location: "Régions rurales", stage: "Production", operator: "GAMCOTRAP / agriculteurs", nationality: "Gambie", ownership: "Privé/État"}],
        exportRevenue: "~50 M USD",
        regulation: "Ministry of Agriculture",
        crmaRelevance: "Non applicable"
      },
      {
        name: "Pêche",
        type: "Ressource marine",
        annualProduction: "~50 000 t/an",
        worldRank: "Non classé",
        reserves: "ZEE limitée (~4 500 km²)",
        deposits: [{name: "ZEE gambienne", location: "Atlantique", stage: "Production", operator: "Licences internationales", nationality: "Gambie + Chine + UE", ownership: "Concessions"}],
        exportRevenue: "~30 M USD",
        regulation: "Fisheries Act",
        crmaRelevance: "Faible"
      }
    ],

    enterprises: [
      {name: "Gambia Groundnut Corporation (GGC)", sector: "Agroalimentaire", revenue: "~50 M USD", employees: "~500", ceo: "DG gouvernemental", shareholding: "État 100%", listed: "Non coté", hq: "Banjul"},
      {name: "GAMTEL (Gambia Telecommunications)", sector: "Télécoms", revenue: "~20 M USD", employees: "~800", ceo: "DG gouvernemental", shareholding: "État 100%", listed: "Non coté", hq: "Banjul"},
      {name: "Africell Gambia", sector: "Télécoms mobile", revenue: "~40 M USD", employees: "~300", ceo: "Direction Africell", shareholding: "Africell Holding (Liban/UAE)", listed: "Non coté", hq: "Banjul"},
      {name: "Trust Bank Gambia", sector: "Banque", revenue: "~15 M USD", employees: "~300", ceo: "CEO local", shareholding: "IFC + privé local", listed: "Non coté", hq: "Banjul"},
      {name: "Gambia Tourism Board / Hôtellerie Senegambia", sector: "Tourisme", revenue: "~150 M USD (secteur)", employees: ">5 000 (indirect)", ceo: "Direction gouvernementale", shareholding: "Mixte public-privé", listed: "Non coté", hq: "Banjul / Senegambia"}
    ],

    leaders: {
      headOfState: {name: "Adama Barrow", since: "2017", party: "Parti National du Peuple (NPP)", nextElection: "Décembre 2026"},
      headOfGov: {name: "Adama Barrow (Président-PM)", since: "2017", party: "NPP"},
      keyMinisters: [
        {portfolio: "Affaires Étrangères", name: "Mamadou Tangara"},
        {portfolio: "Finances & Affaires économiques", name: "Seedy Keita"},
        {portfolio: "Mines & Énergie", name: "Abdoulie Jobe"},
        {portfolio: "Agriculture", name: "Demba Sabally"}
      ],
      centralBankGov: {name: "Buah Saidy", institution: "Central Bank of The Gambia"}
    },

    contacts: {
      chambers: ["Gambia Chamber of Commerce and Industry (GCCI)"],
      afd: "AFD Dakar (couvrant Gambie)",
      patronat: "GCCI"
    },

    universities: [
      {name: "University of the Gambia", city: "Banjul / Serekunda", students: "~5 000", specialties: "Médecine, Sciences, Droit"}
    ],
    literacyRate: "58%",

    demographics: {
      totalPopulation: "2.7 millions (2025)",
      growthRate: "2.8%/an",
      urbanPopulation: "64%",
      unemployment: "10% (officiel)",
      hdi: "0.500 — Rang 174/191",
      lifeExpectancy: "62 ans",
      languages: "Anglais, Mandinka, Wolof, Fula"
    },

    risks: {
      political: {score: 5, comment: "Barrow réélu 2021. Tensions politiques post-Jammeh persistent."},
      security: {score: 4, comment: "Pays enclavé et stable. Risques régionaux (CEDEAO instable)."},
      economic: {score: 7, comment: "Économie très petite et dépendante des envois de fonds (23% PIB)."},
      regulatory: {score: 6, comment: "Réformes post-Jammeh en cours. Institutions fragiles."},
      logistic: {score: 7, comment: "Réseau routier limité. Port de Banjul modeste. Dépendant du Sénégal."},
      miningOpportunity: {score: 2, comment: "Ressources minérales quasi-nulles. Économie agricole et touristique."},
      overallRisk: 6,
      overallOpportunity: 2,
      recommendation: "Tourisme et agroalimentaire — marché limité"
    }
  },

  // ============================================================
  // 3. GUINÉE-BISSAU 🇬🇼
  // ============================================================
  {
    id: "GW",
    name: "Guinée-Bissau",
    officialName: "República da Guiné-Bissau",
    flag: "🇬🇼",
    region: "africa",
    capital: "Bissau",
    area: "36 125 km²",
    population: "~2.1 millions (2025)",
    density: "58 hab/km²",
    gdpNominal: "~1.8 Mds USD (2025)",
    gdpPPP: "~4.2 Mds USD (2025)",
    gdpPerCapita: "~860 USD",
    gdpGrowth: [
      {year: "2021", value: 6.4},
      {year: "2022", value: 4.2},
      {year: "2023", value: 4.5},
      {year: "2024", value: 4.8},
      {year: "2025", value: 5.0}
    ],
    inflation: "5.8% (2025)",
    debtToGDP: "79.2%",
    tradeBalance: "-300 M USD",
    currency: "Franc CFA BCEAO (XOF) — Zone UEMOA",
    exchangeRateEUR: "1 EUR = 655.96 XOF (fixe)",
    exchangeRateUSD: "1 USD = ~604 XOF",
    corruptionIndex: "Score 20/100 — Rang 163/180 (TI 2024)",
    easeBusiness: "Rang 174/190 (World Bank 2020)",
    politicalStability: "-1.22 (World Bank 2023)",
    riskScore: 8,
    riskLabel: "Très élevé",
    recommendation: "Prudence extrême — instabilité politique chronique",
    timezone: "UTC+0",
    languages: "Portugais (officiel), Crioulo, Fula, Mandinka",
    religions: "Islam (46%), Croyances animistes (31%), Christianisme (23%)",
    memberships: ["UA", "CEDEAO", "CPLP", "OCI", "UEMOA"],

    minerals: [
      {
        name: "Noix de cajou",
        type: "Agricole (export principal)",
        annualProduction: "~200 000 t/an",
        worldRank: "5e mondial",
        reserves: "Agriculture pérenne",
        deposits: [{name: "Plantations nationales", location: "Territoire national", stage: "Production", operator: "Agriculteurs + exportateurs privés", nationality: "Guinée-Bissau + Inde", ownership: "Privé"}],
        exportRevenue: "~200 M USD (90% des exports)",
        regulation: "ARFA — Autorité de Régulation Filière Agricole",
        crmaRelevance: "Non applicable"
      },
      {
        name: "Bauxite",
        type: "Minéral industriel",
        annualProduction: "Potentiel non exploité commercialement",
        worldRank: "Non classé",
        reserves: "~1 milliard de tonnes estimé (Boe Sunguru, Cade)",
        deposits: [
          {name: "Boe Sunguru", location: "Centre-Est", stage: "Exploration", operator: "Non attribué", nationality: "-", ownership: "-"},
          {name: "Cade (Farim)", location: "Nord-Est", stage: "Exploration préliminaire", operator: "Diverses juniors", nationality: "Internationale", ownership: "Non attribué"}
        ],
        exportRevenue: "Nul (non exploité)",
        regulation: "Code minier en révision",
        crmaRelevance: "Élevée si exploité — bauxite pour aluminium, critique pour industrie UE"
      },
      {
        name: "Phosphates (Farim)",
        type: "Industriel / Fertilisants",
        annualProduction: "0 — En attente de financement",
        worldRank: "Non classé",
        reserves: "~440 Mt (Farim — étude de faisabilité réalisée)",
        deposits: [
          {name: "Farim", location: "14.97°N, 15.23°W", stage: "Développement bloqué", operator: "COVEC (Chine) — accord non finalisé", nationality: "Chine", ownership: "En négociation"}
        ],
        exportRevenue: "0 (non exploité)",
        regulation: "Licence accordée mais non activée",
        crmaRelevance: "Élevée — phosphates sur liste sécurité alimentaire UE"
      }
    ],

    enterprises: [
      {name: "ARFA (Autorité Régulation Filière Anacarde)", sector: "Agriculture — Cajou", revenue: "~5 M USD (redevances)", employees: "~100", ceo: "DG gouvernemental", shareholding: "État 100%", listed: "Non coté", hq: "Bissau"},
      {name: "Olam Agri Guinea-Bissau", sector: "Négoce agricole — Cajou", revenue: "~80 M USD (GW)", employees: "~200 saisonniers", ceo: "Direction Olam", shareholding: "Olam International (Singapour)", listed: "Non coté", hq: "Bissau / Singapour"},
      {name: "Banco da África Ocidental (BAO)", sector: "Banque", revenue: "~10 M USD", employees: "~150", ceo: "DG local", shareholding: "Groupe portugais + BAfD", listed: "Non coté", hq: "Bissau"},
      {name: "Orange Guinée-Bissau", sector: "Télécoms", revenue: "~25 M USD", employees: "~80", ceo: "Direction Orange", shareholding: "Orange SA (France) 100%", listed: "Euronext (ORA)", hq: "Bissau"},
      {name: "Guinée-Bissau Telecom (Guitel)", sector: "Télécoms fixe", revenue: "~5 M USD", employees: "~200", ceo: "DG gouvernemental", shareholding: "État 100%", listed: "Non coté", hq: "Bissau"}
    ],

    leaders: {
      headOfState: {name: "Umaro Sissoco Embaló", since: "2020", party: "MADEM G15", nextElection: "2025"},
      headOfGov: {name: "Rui Duarte de Barros", since: "2023", party: "Technocrate"},
      keyMinisters: [
        {portfolio: "Affaires Étrangères", name: "Carlos Moreira"},
        {portfolio: "Finances", name: "João Fadiá"},
        {portfolio: "Mines & Industrie", name: "Non disponible"},
        {portfolio: "Agriculture", name: "Non disponible"}
      ],
      centralBankGov: {name: "Siège BCEAO Dakar", institution: "BCEAO (Zone CFA)"}
    },

    contacts: {
      chambers: ["Chambre de Commerce, d'Industrie, d'Agriculture et des Services (CCAIAS)"],
      afd: "AFD Dakar (couvrant Guinée-Bissau)",
      patronat: "CNP — Confédération Nationale des Patrons"
    },

    universities: [
      {name: "Université de Guinée-Bissau (UNIOGB)", city: "Bissau", students: "~3 000", specialties: "Droit, Agriculture, Sciences"}
    ],
    literacyRate: "59%",

    demographics: {
      totalPopulation: "2.1 millions (2025)",
      growthRate: "2.5%/an",
      urbanPopulation: "44%",
      unemployment: "7% (officiel — sous-emploi massif)",
      hdi: "0.483 — Rang 177/191",
      lifeExpectancy: "59 ans"
    },

    risks: {
      political: {score: 9, comment: "9 coups d'État ou tentatives depuis 1974. Instabilité chronique."},
      security: {score: 7, comment: "Trafic de drogue (cocaïne Amérique Latine–Europe) via le pays. Instabilité institutionnelle."},
      economic: {score: 8, comment: "Mono-exportateur cajou (90% exports). Dépendant de l'aide internationale."},
      regulatory: {score: 9, comment: "Institutions très fragiles. Corruption systémique."},
      logistic: {score: 8, comment: "Infrastructures très dégradées. Port de Bissau limité."},
      miningOpportunity: {score: 4, comment: "Bauxite et phosphates à fort potentiel mais non exploités faute de stabilité."},
      overallRisk: 8,
      overallOpportunity: 3,
      recommendation: "Prudence extrême — instabilité politique chronique"
    }
  },

  // ============================================================
  // 4. GUINÉE 🇬🇳
  // ============================================================
  {
    id: "GN",
    name: "Guinée",
    officialName: "République de Guinée",
    flag: "🇬🇳",
    region: "africa",
    capital: "Conakry",
    area: "245 857 km²",
    population: "~14 millions (2025)",
    density: "57 hab/km²",
    gdpNominal: "~22 Mds USD (2025)",
    gdpPPP: "~36 Mds USD (2025)",
    gdpPerCapita: "~1 570 USD",
    gdpGrowth: [
      {year: "2021", value: 5.2},
      {year: "2022", value: 4.7},
      {year: "2023", value: 5.6},
      {year: "2024", value: 6.1},
      {year: "2025", value: 6.5}
    ],
    inflation: "11.2% (2025)",
    debtToGDP: "44.8%",
    tradeBalance: "+3.2 Mds USD (surplus minier)",
    currency: "Franc guinéen (GNF)",
    exchangeRateEUR: "1 EUR = 9 400 GNF",
    exchangeRateUSD: "1 USD = 8 650 GNF",
    corruptionIndex: "Score 25/100 — Rang 147/180 (TI 2024)",
    easeBusiness: "Rang 156/190 (World Bank 2020)",
    politicalStability: "-0.80 (World Bank 2023)",
    riskScore: 7,
    riskLabel: "Élevé — Transition militaire",
    recommendation: "Opportunités minières majeures avec gestion risque politique",

    industries: {
      gdpBySector: {
        agriculture: 24,
        industry: 32,
        services: 44,
        mining: 22,
      },
      keyIndustries: [
        {
          name: "Bauxite — #2 mondial",
          description: "La Guinée produit plus de 100 Mt/an de bauxite (2024), soit environ 25% de la production mondiale. Principaux opérateurs : SMB-Winning (Chine/Singapour), CBG (Alcoa/Rio Tinto), EGA. Exportations quasi-exclusivement vers la Chine. Royalties et fiscalité minière révisées par la junte CNRD.",
          share: "~22% PIB, ~65% revenus export",
        },
        {
          name: "Fer — Simandou (méga-projet mondial)",
          description: "Simandou est le plus grand gisement de minerai de fer inexploité au monde (2.4 Mds t, teneur 65% Fe — qualité exceptionnelle). Deux blocs : Simandou Nord (SMB-Winning/Chine) et Simandou Sud (Rio Tinto/Chalco/IFC). Infrastructure ferroviaire (670 km) et port transguinéen en construction. Production cible : 120 Mt/an. Début production novembre 2025 (phase 1). Investissement total >$20 Mds.",
          share: "Impact GDP +4–6% estimé 2026–2030",
        },
        {
          name: "Or & Diamants",
          description: "Production aurifère ~30 t/an via AngloGold Ashanti (Siguiri, 85%). Diamants : ~600 000 carats/an. Potentiel de croissance avec nouvelles explorations.",
          share: "~20% revenus export (or) + ~5% (diamants)",
        },
        {
          name: "Hydroélectricité",
          description: "Capacité hydroélectrique majeure. Barrage Kaléta (240 MW, opérationnel 2015, CMEC Chine). Barrage Souapiti (450 MW, opérationnel 2021, CMEC). Nouveaux projets : Koukoutamba (294 MW), Amaria (300 MW). Potentiel total estimé 6 000 MW.",
          share: "Secteur énergie ~3% PIB",
        },
        {
          name: "Alumine & Transformation bauxite",
          description: "Raffinerie de Fria (Friguia, UC Rusal, ~750 000 t/an d'alumine — intermittente). Projets SPIC Alumine (2027, 2 Mt/an) et 6 nouvelles raffineries planifiées (7 Mt de capacité totale à 2030). Objectif : valorisation locale de la bauxite avant export.",
          share: "~10% revenus export actuels, cible 30% à 2030",
        },
      ],
      sez: [
        {
          name: "ZES de Kaloum",
          location: "Presqu'île de Kaloum, Conakry",
          advantages: "Zone économique spéciale dans le quartier d'affaires de Conakry. Facilités administratives, guichet unique investisseur. Développement services financiers et logistique portuaire.",
        },
        {
          name: "Zone Industrielle de Kagbélen",
          location: "Coyah / Kagbélen (30 km de Conakry)",
          advantages: "Zone industrielle dédiée à l'agro-industrie, transformation alumine, industries légères. Exonérations fiscales. Connexion route Conakry-Mamou.",
        },
      ],
      majorProjects: [
        "Simandou Sud (Rio Tinto/Chalco/IFC) — Phase 1 production démarrée novembre 2025, cible 120 Mt/an de minerai de fer haute qualité",
        "Simandou Nord (SMB-Winning/Xinfa) — Construction infrastructure rail-port transguinéen (670 km + port Matakong)",
        "Raffinerie d'alumine SPIC (Boké, 2 Mt alumine/an, mise en service prévue 2027, investissement ~$2 Mds)",
        "Plan 6 raffineries alumine (gouvernement CNRD, objectif 7 Mt capacité totale à 2030)",
        "Fonds Souverain de Guinée ($1 Mds, création prévue T2 2026 — revenus Simandou)",
        "Koukoutamba Hydropower (294 MW, Tinkisso River, financement BID/BAfD)",
        "Amaria Hydropower (300 MW — études AFD/BAfD)",
      ],
      banking: {
        mainBanks: [
          "BCRG — Banque Centrale de la République de Guinée (régulateur)",
          "Ecobank Guinée (Ecobank Transnational — groupe panafricain)",
          "Société Générale Guinée",
          "BICIGUI (Banque Internationale pour le Commerce et l'Industrie de Guinée)",
          "Orabank Guinée",
          "UBA Guinée (United Bank for Africa)",
        ],
        totalAssets: "~3 Mds USD (système bancaire consolidé 2024)",
        bancarisation: "~10% de la population adulte (accès services financiers formels)",
      },
      telecom: {
        operators: [
          "Orange Guinée (filiale Orange SA France, leader marché)",
          "MTN Guinée (MTN Group)",
          "Cellcom Guinée",
        ],
        mobilePenetration: "95% (taux de pénétration mobile, 2024)",
        internetPenetration: "30% (2024)",
      },
      energy: {
        mix: "Hydroélectrique 60%, Thermique (fuel/diesel) 40%",
        installedCapacity: "~1 100 MW (2024 — Kaléta 240 MW + Souapiti 450 MW opérationnels)",
        renewableProjects: "Koukoutamba (294 MW — financement BID), Amaria (300 MW — études), extension Souapiti, solaire rural en développement",
      },
    } ,

    logistics: {
      ports: [
        {
          name: "Port Autonome de Conakry",
          capacity: "~500 000 TEU/an (capacité conteneurs), 30 Mt marchandises diverses",
          operator: "Bollore Africa Logistics / Guinée Manutention Terminaux (GMT) — concession",
          draft: "11m",
          note: "Principal port Guinée. Hub d'exportation bauxite partiel. Modernisation en cours. Congestion chronique.",
        },
        {
          name: "Port de Kamsar (CBK)",
          capacity: "~100 Mt/an de bauxite (terminal spécialisé)",
          operator: "Compagnie des Bauxites de Kamsar / CBG + SMB-Winning (terminaux dédiés)",
          draft: "14m (accès Capesize partiels)",
          note: "Terminal bauxite majeur, Boké. Deuxième port mondial d'exportation de bauxite. Transit 182.8 Mt de bauxite en 2025.",
        },
        {
          name: "Port de Matakong (en construction — Simandou)",
          capacity: "150 Mt/an de minerai de fer (prévision pleine capacité)",
          operator: "Infrastructure Simandou — TransGuinéen",
          draft: "20m+ (eau profonde — Capesize complets)",
          note: "Nouveau port en eau profonde dédié au minerai de fer Simandou. En construction, livraison 2026.",
        },
      ],
      airports: [
        {
          name: "Aéroport International de Conakry-Gbessia",
          traffic: "~600 000 passagers/an (2024)",
          freight: "~8 000 t fret/an",
        },
        {
          name: "Aéroport de Simandou (sous construction)",
          traffic: "Usage minier / personnel (prévision 2026)",
          freight: "Non disponible",
        },
      ],
      railway: "Réseau ferroviaire limité et spécialisé : CBG Railway (Sangarédi–Kamsar, 136 km, bauxite). Chemin de Fer Transgabonais (non applicable Guinée). GRAND PROJET : Simandou Railway (670 km — mine vers côte, en construction — terminé partiellement 2025–2026). Aucun réseau ferroviaire voyageurs.",
      roads: "~44 000 km dont ~4 000 km bitumés. Route Conakry–Coyah–Mamou bitumée. Accès intérieur difficile en saison des pluies. Projets BAfD d'amélioration routes régionales.",
      corridors: "Corridor Simandou (Mine–Port Matakong, 670 km rail + route). Corridor Transgambien (Conakry–Dakar via Gambie). Liaison transfrontalière Sierra Leone et Libéria (commerces régionaux).",
      containerCost: "~2 800 USD/conteneur 20' import CIF Conakry (2024)",
      customsDelay: "12–20 jours (port Conakry — délais douaniers importants)",
      logisticZones: [
        "Port Autonome de Conakry — zone logistique portuaire",
        "Zone Industrielle Kagbélen",
        "Zone Franche de Kamsar (bauxite)",
      ],
      maritimeConnectivity: "Accès direct Atlantique via Conakry et Kamsar. Liaisons régulières vers Chine (bauxite), Europe (Anvers, Hambourg), Asie. Routes maritimes Kamsar–Qingdao (Chine) = principale destination bauxite.",
    } ,

    trade: {
      topExports: [
        { product: "Bauxite (minerai brut)", value: "~4.5 Mds USD (2025)", destination: "Chine (85%), Russie, Ukraine" },
        { product: "Or (AngloGold Ashanti Siguiri)", value: "~1.5 Mds USD", destination: "Suisse, Dubaï, Afrique du Sud" },
        { product: "Alumine (Friguia/Rusal)", value: "~200 M USD", destination: "Russie, Chine, Europe de l'Est" },
        { product: "Diamants", value: "~150 M USD", destination: "Belgique (Anvers), Dubaï" },
        { product: "Minerai de fer Simandou (démarrage 2025)", value: "~500 M USD (2025 — phase 1)", destination: "Chine, Corée, Japon" },
      ],
      topImports: [
        { product: "Produits pétroliers raffinés", value: "~800 M USD", origin: "Nigeria, Sénégal, importation" },
        { product: "Machines et équipements miniers", value: "~700 M USD", origin: "Chine, UE" },
        { product: "Produits alimentaires", value: "~600 M USD", origin: "Maroc, Sénégal, Thaïlande (riz)" },
        { product: "Véhicules", value: "~300 M USD", origin: "Chine, Japon, UE" },
        { product: "Ciment et matériaux construction", value: "~250 M USD", origin: "Maroc, Chine" },
      ],
      tradeBalance: "+3.2 Mds USD (surplus minier, 2024) — réserves FX triplées à $4.1 Mds fin 2025",
      fdiInward: {
        stock: "~15 Mds USD (dont ~11 Mds investissements Simandou)",
        flow: "~3 Mds USD/an (2023–2025, majoritairement Simandou)",
        topInvestors: ["Chine (SMB-Winning, Chalco, Xinfa)", "Australie/UK (Rio Tinto)", "UAE (EGA)", "Russie (UC Rusal)", "Afrique du Sud (AngloGold)"],
      },
      fdiOutward: "Très faible — moins de $50 M USD/an",
      tradeAgreements: [
        "ZLECAF (signataire)",
        "CEDEAO (suspendue participation institutions depuis coup 2021, commerce maintenu)",
        "ACP-UE (Accord de Partenariat Économique — APE Afrique de l'Ouest)",
        "OCI (Organisation de la Coopération Islamique)",
      ],
      taxRegime: {
        is: "IS 35% (standard). Taux réduits et exonérations négociées dans les conventions minières (10–15 ans exonération IS).",
        tva: "TVA 18%",
        conventions: "Conventions de double imposition limitées : France, Maroc. Révision conventions minières par CNRD depuis 2022.",
      },
      freeZones: "ZES Kaloum (Conakry) — facilités fiscales et administratives. Zone Franche de Kamsar (exportations bauxite). Régime minier spécifique par convention individuelle.",
      profitRepatriation: "Autorisée via BCRG. Contrôle des changes modéré. GNF instable — transactions minières souvent en USD. Difficultés pratiques de transfert.",
      bit: "Traités bilatéraux d'investissement avec : France, USA, Suisse, Allemagne, Chine, Belgique (ICSID arbitration disponible).",
    } ,

    billionaires: [
      {
        name: "Kerfalla Camara",
        fortune: "~$500 M USD (estimation)",
        source: "Mines (diamants, or), logistique, immobilier — KPC Group",
        companies: "KPC Group (Kerfalla Personal Corporation), participations minières diverses",
        age: "Non disponible",
        education: "Non disponible",
        bio: "Homme d'affaires guinéen influent, proche des cercles politiques successifs. KPC Group actif dans les mines, la logistique portuaire et l'immobilier à Conakry. Figures emblématiques du secteur privé guinéen lié aux ressources naturelles.",
      },
      {
        name: "Ibrahima Kassory Fofana",
        fortune: "Non disponible",
        source: "Politique et réseaux d'affaires — ex-Premier Ministre de Guinée (2018–2021)",
        companies: "Participations diverses (non publiques)",
        age: "Non disponible",
        education: "Sciences économiques, formation en Europe",
        bio: "Economiste et homme politique, ex-Premier Ministre sous Alpha Condé. Arrêté par la junte CNRD en 2022, placé en détention pour malversations. Illustre les réseaux politico-économiques liés aux ressources minières guinéennes.",
      },
      {
        name: "Saloum Nimaga",
        fortune: "Non disponible",
        source: "Bauxite et import-export — Foutah Group",
        companies: "Foutah Mining & Trading, négoce Conakry",
        age: "Non disponible",
        education: "Non disponible",
        bio: "Homme d'affaires actif dans le négoce de bauxite et l'import-export en Guinée. Représentatif de la classe d'entrepreneurs locaux dans le secteur des ressources.",
      },
    ],


    timezone: "UTC+0",
    languages: "Français (officiel), Pular, Malinké, Soussou",
    religions: "Islam (89%), Christianisme (7%), Animisme (4%)",
    memberships: ["UA", "CEDEAO (suspendue)", "OCI"],

    minerals: [
      {
        name: "Bauxite",
        type: "Industriel — Aluminium",
        annualProduction: "~100 Mt/an (2024) — 2e mondial après Australie",
        worldRank: "2e mondial",
        reserves: "~7.4 milliards de tonnes (25% réserves mondiales)",
        deposits: [
          {name: "Sangarédi (CBG)", location: "11.13°N, 13.83°W", stage: "Production", operator: "CBG — Halco Mining (Alcoa/Rio Tinto/Dadco)", nationality: "USA/Canada/Guinée", ownership: "CBG (Alcoa 45%, Alcan 45%, État GN 49%)"},
          {name: "Boké (SMB-Winning)", location: "10.93°N, 14.30°W", stage: "Production", operator: "SMB-Winning Consortium", nationality: "Chine/Singapour/Guinée", ownership: "Winning Shipping 50%, Shandong Weiqiao 35%, UMS 10%, État 5%"},
          {name: "Dian Dian", location: "12.41°N, 12.87°W", stage: "Exploration avancée", operator: "Emirates Global Aluminium", nationality: "UAE", ownership: "EGA 100%"}
        ],
        exportRevenue: "~4 Mds USD",
        regulation: "Code minier 2011 révisé 2022, royalties 1.5% valeur exports",
        crmaRelevance: "Très élevée — Bauxite/Aluminium sur liste CRM UE"
      },
      {
        name: "Or",
        type: "Précieux",
        annualProduction: "~30 t/an (2024)",
        worldRank: "Top 15 Afrique",
        reserves: "Estimations Siguiri: ~5 Moz réserves prouvées",
        deposits: [
          {name: "Siguiri", location: "11.41°N, 9.17°W", stage: "Production", operator: "AngloGold Ashanti (85%)", nationality: "Afrique du Sud", ownership: "AngloGold 85%, État GN 15%"}
        ],
        exportRevenue: "~1.5 Mds USD",
        regulation: "Code minier 2011",
        crmaRelevance: "Faible"
      },
      {
        name: "Diamants",
        type: "Précieux",
        annualProduction: "~600 000 carats/an",
        worldRank: "Top 10 Afrique",
        reserves: "Kérouané, Macenta, Beyla",
        deposits: [
          {name: "Kérouané", location: "9.27°N, 9.02°W", stage: "Production artisanale + industrielle", operator: "Divers — AREDOR", nationality: "Guinée + Australie", ownership: "Mixte"}
        ],
        exportRevenue: "~150 M USD",
        regulation: "Processus de Kimberley",
        crmaRelevance: "Faible"
      },
      {
        name: "Minerai de fer (Simandou)",
        type: "Industriel — Acier",
        annualProduction: "0 (début production prévu 2025-2026)",
        worldRank: "Potentiellement 2e mondial",
        reserves: "~2.4 milliards de tonnes (65% Fe — minerai très haute qualité)",
        deposits: [
          {name: "Simandou Nord (Blocs 1&2)", location: "9.05°N, 9.80°W", stage: "Construction infrastructure", operator: "SMB-Winning / Xinfa Group (Chine)", nationality: "Chine", ownership: "SMB-Winning 100%"},
          {name: "Simandou Sud (Blocs 3&4)", location: "9.05°N, 9.80°W", stage: "Construction", operator: "Rio Tinto / Winning Consortium / Chalco / IFC", nationality: "Australie/UK/Chine", ownership: "Rio Tinto 45.05%, Simfer Jersey 39.95%, GoG 15%"}
        ],
        exportRevenue: "Prévu: ~5 Mds USD/an à pleine capacité",
        regulation: "Convention de base Simandou — infrastructure rail-port transnational (940 km)",
        crmaRelevance: "Très élevée — Sécurité approvisionnement acier EU"
      },
      {
        name: "Alumine (raffinerie)",
        type: "Transformation — Aluminium",
        annualProduction: "~750 000 t/an (Friguia, Boké)",
        worldRank: "Non classé mondial",
        reserves: "Dépend stock bauxite national",
        deposits: [
          {name: "Friguia (Alumine)", location: "Fria — 10.47°N, 13.55°W", stage: "Production (intermittente)", operator: "UC Rusal (Russie)", nationality: "Russie", ownership: "Rusal 100%"}
        ],
        exportRevenue: "~200 M USD",
        regulation: "Contrat Rusal — Friguia",
        crmaRelevance: "Élevée"
      }
    ],

    enterprises: [
      {name: "SMB-Winning Consortium", sector: "Mines — Bauxite", revenue: "~2 Mds USD", employees: "~8 000", ceo: "Fadi Wazni (CEO SMB)", shareholding: "Winning Shipping 50%, Shandong Weiqiao 35%, UMS 10%, État 5%", listed: "Non coté", hq: "Conakry / Singapour"},
      {name: "CBG (Compagnie des Bauxites de Guinée)", sector: "Mines — Bauxite", revenue: "~1.5 Mds USD", employees: "~2 500", ceo: "DG", shareholding: "Halco Mining (Alcoa/Rio Tinto) 51%, État GN 49%", listed: "Non coté", hq: "Conakry / Boké"},
      {name: "Rio Tinto Simfer (Simandou)", sector: "Mines — Fer", revenue: "Investissement $11 Mds", employees: "~5 000 (chantier)", ceo: "Direction Rio Tinto", shareholding: "Rio Tinto 45.05%, Chalco 39.95%, IFC 2%", listed: "ASX/LSE/NYSE (RIO)", hq: "Conakry / Londres"},
      {name: "AngloGold Ashanti Guinea (Siguiri)", sector: "Mines — Or", revenue: "~300 M USD (GN)", employees: "~2 500", ceo: "Direction AngloGold", shareholding: "AngloGold Ashanti 85%, État GN 15%", listed: "JSE/NYSE (AU)", hq: "Siguiri / Johannesburg"},
      {name: "UC Rusal Friguia", sector: "Alumine", revenue: "~200 M USD (GN)", employees: "~1 800", ceo: "Direction Rusal", shareholding: "UC Rusal 100%", listed: "MOEX (RUAL)", hq: "Fria / Moscou"},
      {name: "Ecobank Guinée", sector: "Banque", revenue: "~80 M USD", employees: "~400", ceo: "DG local", shareholding: "Ecobank Transnational Inc. (ETI)", listed: "NSE (ETI)", hq: "Conakry"},
      {name: "Orange Guinée", sector: "Télécoms", revenue: "~200 M USD", employees: "~400", ceo: "Direction Orange", shareholding: "Orange SA 100%", listed: "Euronext (ORA)", hq: "Conakry"}
    ],

    leaders: {
      headOfState: {name: "Mamadi Doumbouya", since: "2021 (coup d'État septembre 2021)", party: "CNRD — Comité National du Rassemblement et du Développement", nextElection: "Transition — calendrier incertain"},
      headOfGov: {name: "Bah Oury", since: "2023", party: "Technocrate — CNRD"},
      keyMinisters: [
        {portfolio: "Affaires Étrangères", name: "Morissanda Kouyaté"},
        {portfolio: "Mines & Géologie", name: "Bouna Sylla"},
        {portfolio: "Économie & Finances", name: "Moussa Cissé"},
        {portfolio: "Défense", name: "Colonel Aboubacar Sidiki Camara"}
      ],
      centralBankGov: {name: "Karamo Kaba", institution: "Banque Centrale de la République de Guinée (BCRG)"},
      miningAuthority: {name: "Non disponible", institution: "Ministère des Mines et de la Géologie"}
    },

    contacts: {
      chambers: ["Chambre de Commerce, d'Industrie et d'Artisanat de Guinée (CCIAG)"],
      afd: "AFD Guinée — Bureau Conakry",
      lawFirms: ["Geni & Kebe (cabinet régional)", "Cabinet local Conakry"],
      patronat: "CPGCI — Confédération Patronale et des Groupements Professionnels de Guinée"
    },

    universities: [
      {name: "Université Gamal Abdel Nasser de Conakry (UGANC)", city: "Conakry", students: "~40 000", specialties: "Sciences, Médecine, Droit"},
      {name: "Université Julius Nyerere de Kankan", city: "Kankan", students: "~15 000", specialties: "Lettres, Sciences sociales"}
    ],
    literacyRate: "45%",

    demographics: {
      totalPopulation: "14 millions (2025)",
      growthRate: "2.7%/an",
      urbanPopulation: "37%",
      unemployment: "6.5% (officiel — sous-emploi élevé)",
      hdi: "0.465 — Rang 182/191",
      lifeExpectancy: "59 ans",
      languages: "Français, Pular (40%), Malinké (30%), Soussou (20%)"
    },

    risks: {
      political: {score: 8, comment: "Junte militaire CNRD au pouvoir. Transition politique incertaine. CEDEAO suspension."},
      security: {score: 6, comment: "Tensions inter-ethniques historiques. Région forestière instable. Capitale globalement sous contrôle."},
      economic: {score: 6, comment: "Économie minière en forte croissance (Simandou). Inflation structurelle."},
      regulatory: {score: 7, comment: "Révision des conventions minières par la junte. Risque de renégociation des contrats."},
      logistic: {score: 7, comment: "Infrastructures insuffisantes. Simandou nécessite 940 km de chemin de fer nouveau."},
      miningOpportunity: {score: 10, comment: "Bauxite #2 mondial, Simandou fer géant, or, diamants. Potentiel minier parmi les plus élevés d'Afrique."},
      overallRisk: 7,
      overallOpportunity: 9,
      recommendation: "Opportunités minières majeures avec gestion risque politique"
    }
  },

  // ============================================================
  // 5. SIERRA LEONE 🇸🇱
  // ============================================================
  {
    id: "SL",
    name: "Sierra Leone",
    officialName: "Republic of Sierra Leone",
    flag: "🇸🇱",
    region: "africa",
    capital: "Freetown",
    area: "71 740 km²",
    population: "~8.8 millions (2025)",
    density: "123 hab/km²",
    gdpNominal: "~4.5 Mds USD (2025)",
    gdpPPP: "~14 Mds USD (2025)",
    gdpPerCapita: "~510 USD",
    gdpGrowth: [
      {year: "2021", value: 4.1},
      {year: "2022", value: 3.5},
      {year: "2023", value: 5.2},
      {year: "2024", value: 5.5},
      {year: "2025", value: 5.8}
    ],
    inflation: "43.5% (2024 — crise)",
    debtToGDP: "85.0%",
    tradeBalance: "-500 M USD",
    currency: "Leone sierra-léonais (SLE — nouveau Leone depuis 2022)",
    exchangeRateEUR: "1 EUR = 25 SLE",
    exchangeRateUSD: "1 USD = 23 SLE",
    corruptionIndex: "Score 35/100 — Rang 110/180 (TI 2024)",
    easeBusiness: "Rang 163/190 (World Bank 2020)",
    politicalStability: "-0.65 (World Bank 2023)",
    riskScore: 7,
    riskLabel: "Élevé",
    recommendation: "Secteur minier à cibler avec due diligence approfondie",
    timezone: "UTC+0",
    languages: "Anglais (officiel), Krio, Mende, Temne",
    religions: "Islam (77%), Christianisme (22%)",
    memberships: ["UA", "CEDEAO", "Commonwealth", "OCI"],

    minerals: [
      {
        name: "Diamants",
        type: "Précieux",
        annualProduction: "~400 000 carats/an",
        worldRank: "Top 10 mondial",
        reserves: "Kono District — réserves alluviales + kimberlites",
        deposits: [
          {name: "Kono District", location: "8.88°N, 11.08°W", stage: "Production (artisanale + industrielle)", operator: "Octea Mining + artisanaux", nationality: "UK/Divers", ownership: "Mixte"}
        ],
        exportRevenue: "~150 M USD",
        regulation: "Diamond Area Community Development Fund, Processus Kimberley",
        crmaRelevance: "Faible"
      },
      {
        name: "Minerai de fer (Tonkolili)",
        type: "Industriel",
        annualProduction: "Suspendu (infrastructure dégradée)",
        worldRank: "Non classé (production stoppée)",
        reserves: "~12.8 milliards de tonnes (Tonkolili — très important)",
        deposits: [
          {name: "Tonkolili", location: "8.68°N, 11.87°W", stage: "Suspendu — en redéveloppement", operator: "SL Mining (Timis Mining)", nationality: "Australie/UK", ownership: "Timis Mining 100%"}
        ],
        exportRevenue: "0 (suspendu)",
        regulation: "Convention minière en renegociation",
        crmaRelevance: "Modérée si redémarré"
      },
      {
        name: "Rutile (TiO₂)",
        type: "Industriel — Pigments/Titane",
        annualProduction: "~100 000 t/an",
        worldRank: "Top 3 mondial",
        reserves: "~60 Mt rutile (Sierra Rutile — Bonthe District)",
        deposits: [
          {name: "Sierra Rutile (Bonthe)", location: "7.62°N, 12.53°W", stage: "Production", operator: "Sierra Rutile (Iluka Resources, Australie)", nationality: "Australie", ownership: "Iluka Resources 100%"}
        ],
        exportRevenue: "~120 M USD",
        regulation: "Convention Sierra Rutile",
        crmaRelevance: "Élevée — Titanium/Rutile sur liste CRM UE"
      },
      {
        name: "Bauxite",
        type: "Industriel — Aluminium",
        annualProduction: "~1 Mt/an",
        worldRank: "Non classé",
        reserves: "~180 Mt (Port Loko, Bonthe)",
        deposits: [
          {name: "Port Loko / Bonthe", location: "Nord-Ouest", stage: "Production limitée", operator: "Vimetco (Roumanie)", nationality: "Roumanie/Pays-Bas", ownership: "Vimetco NV"}
        ],
        exportRevenue: "~50 M USD",
        regulation: "Code minier",
        crmaRelevance: "Modérée"
      }
    ],

    enterprises: [
      {name: "Sierra Rutile (Iluka Resources)", sector: "Mines — Rutile/Zircon", revenue: "~120 M USD", employees: "~1 200", ceo: "Direction Iluka", shareholding: "Iluka Resources (ASX: ILU) 100%", listed: "ASX (ILU)", hq: "Bonthe / Perth"},
      {name: "SL Mining (Tonkolili Iron)", sector: "Mines — Fer", revenue: "Suspendu", employees: "~200 (garde-mine)", ceo: "Direction Timis Group", shareholding: "Timis Mining 100%", listed: "Non coté", hq: "Freetown / Monaco"},
      {name: "Octea Diamond Mining (Koidu)", sector: "Mines — Diamants", revenue: "~80 M USD", employees: "~700", ceo: "Direction Octea", shareholding: "Octea Group (offshore)", listed: "Non coté", hq: "Kono"},
      {name: "Rokel Commercial Bank", sector: "Banque", revenue: "~20 M USD", employees: "~300", ceo: "CEO local", shareholding: "État SL + IFC + privé", listed: "Non coté", hq: "Freetown"},
      {name: "Orange Sierra Leone", sector: "Télécoms", revenue: "~80 M USD", employees: "~200", ceo: "Direction Orange", shareholding: "Orange SA", listed: "Euronext (ORA)", hq: "Freetown"}
    ],

    leaders: {
      headOfState: {name: "Julius Maada Bio", since: "2018 (réélu 2023)", party: "Sierra Leone People's Party (SLPP)", nextElection: "2028"},
      headOfGov: {name: "Julius Maada Bio (Président exécutif)", since: "2018", party: "SLPP"},
      keyMinisters: [
        {portfolio: "Affaires Étrangères", name: "Timothy Musa Kabba"},
        {portfolio: "Mines & Ressources minérales", name: "Julius Mattai"},
        {portfolio: "Finances", name: "Sheku Bangura"},
        {portfolio: "Défense", name: "Kellie Conteh"}
      ],
      centralBankGov: {name: "William Kponeh", institution: "Bank of Sierra Leone"}
    },

    contacts: {
      chambers: ["Sierra Leone Chamber of Commerce, Industry and Agriculture (SLCCIA)"],
      afd: "AFD Ghana / Accra (couvrant Sierra Leone)",
      patronat: "SLCCIA"
    },

    universities: [
      {name: "University of Sierra Leone (Fourah Bay College)", city: "Freetown", students: "~10 000", specialties: "Sciences, Ingénierie, Droit"},
      {name: "Ernest Bai Koroma University", city: "Makeni", students: "~3 000", specialties: "Sciences sociales"}
    ],
    literacyRate: "48%",

    demographics: {
      totalPopulation: "8.8 millions (2025)",
      growthRate: "2.1%/an",
      urbanPopulation: "44%",
      unemployment: "12% (officiel)",
      hdi: "0.477 — Rang 181/191",
      lifeExpectancy: "61 ans"
    },

    risks: {
      political: {score: 6, comment: "Bio réélu 2023 dans un contexte tendu. Risques post-électoral réduits."},
      security: {score: 6, comment: "Pays post-conflit (fin guerre civile 2002). Sécurité globalement maintenue."},
      economic: {score: 8, comment: "Inflation très élevée (43%). Dépendance aux matières premières."},
      regulatory: {score: 6, comment: "Réformes minières en cours. EITI membre."},
      logistic: {score: 7, comment: "Infrastructures dégradées. Port de Freetown limité. Réseau routier médiocre."},
      miningOpportunity: {score: 7, comment: "Rutile (#3 mondial), diamants, fer (Tonkolili — à redémarrer), bauxite."},
      overallRisk: 7,
      overallOpportunity: 6,
      recommendation: "Secteur minier à cibler avec due diligence approfondie"
    }
  },

  // ============================================================
  // 6. LIBERIA 🇱🇷
  // ============================================================
  {
    id: "LR",
    name: "Liberia",
    officialName: "Republic of Liberia",
    flag: "🇱🇷",
    region: "africa",
    capital: "Monrovia",
    area: "111 369 km²",
    population: "~5.4 millions (2025)",
    density: "48 hab/km²",
    gdpNominal: "~4.3 Mds USD (2025)",
    gdpPPP: "~7.8 Mds USD (2025)",
    gdpPerCapita: "~800 USD",
    gdpGrowth: [
      {year: "2021", value: 5.0},
      {year: "2022", value: 4.8},
      {year: "2023", value: 4.5},
      {year: "2024", value: 5.0},
      {year: "2025", value: 5.5}
    ],
    inflation: "8.0% (2025)",
    debtToGDP: "57.0%",
    tradeBalance: "-450 M USD",
    currency: "Dollar libérien (LRD)",
    exchangeRateEUR: "1 EUR = 215 LRD",
    exchangeRateUSD: "1 USD = 198 LRD",
    corruptionIndex: "Score 29/100 — Rang 133/180 (TI 2024)",
    easeBusiness: "Rang 175/190 (World Bank 2020)",
    politicalStability: "-0.28 (World Bank 2023)",
    riskScore: 6,
    riskLabel: "Modéré-Élevé",
    recommendation: "Fer et caoutchouc — secteurs porteurs avec partenaires établis",
    timezone: "UTC+0",
    languages: "Anglais (officiel), Kpelle, Bassa, Grebo",
    religions: "Christianisme (86%), Islam (12%)",
    memberships: ["UA", "CEDEAO", "Mano River Union"],

    minerals: [
      {
        name: "Minerai de fer",
        type: "Industriel",
        annualProduction: "~4 Mt/an (ArcelorMittal Nimba)",
        worldRank: "Non classé",
        reserves: "~2.5 milliards de tonnes (Nimba Range, Bong Range)",
        deposits: [
          {name: "Mount Nimba (Nimba Range)", location: "7.57°N, 8.53°W", stage: "Production", operator: "ArcelorMittal Liberia", nationality: "Luxembourg/Inde", ownership: "ArcelorMittal 90%, GoL 10%"},
          {name: "Bong Range", location: "7.19°N, 10.02°W", stage: "Développement", operator: "China Unions", nationality: "Chine", ownership: "China Unions 80%, GoL 20%"}
        ],
        exportRevenue: "~400 M USD",
        regulation: "Convention minière ArcelorMittal 2005 révisée 2013",
        crmaRelevance: "Modérée"
      },
      {
        name: "Or",
        type: "Précieux",
        annualProduction: "~3 000 kg/an",
        worldRank: "Non classé",
        reserves: "Bea Mountain, Grand Bassa",
        deposits: [
          {name: "Bea Mountain (Cestos City)", location: "5.67°N, 9.59°W", stage: "Production", operator: "Hummingbird Resources (Bluestone Resources)", nationality: "UK", ownership: "Hummingbird 100%"}
        ],
        exportRevenue: "~100 M USD",
        regulation: "Minerals and Mining Law 2000 révisée",
        crmaRelevance: "Faible"
      },
      {
        name: "Caoutchouc (Hévéa)",
        type: "Agricole industriel",
        annualProduction: "~70 000 t/an caoutchouc naturel",
        worldRank: "Top 10 Afrique",
        reserves: "~200 000 ha plantations (dont Firestone 40 000 ha)",
        deposits: [
          {name: "Firestone Plantation (Harbel)", location: "6.20°N, 10.38°W", stage: "Production", operator: "Firestone Natural Rubber (Bridgestone subsidiary)", nationality: "USA/Japon", ownership: "Bridgestone 100%"},
          {name: "Guthrie / Sime Darby", location: "Nord-Ouest Liberia", stage: "Production", operator: "Sime Darby Plantation", nationality: "Malaisie", ownership: "Sime Darby 100%"}
        ],
        exportRevenue: "~150 M USD",
        regulation: "Liberia Rubber Planters Association",
        crmaRelevance: "Modérée — caoutchouc naturel pour industrie européenne"
      },
      {
        name: "Diamants",
        type: "Précieux",
        annualProduction: "~50 000 carats/an",
        worldRank: "Non classé",
        reserves: "Lofa, Nimba (alluvionnaires)",
        deposits: [
          {name: "Lofa County", location: "8.15°N, 9.71°W", stage: "Artisanal", operator: "Artisanaux", nationality: "Liberia", ownership: "Privé/artisanal"}
        ],
        exportRevenue: "~15 M USD",
        regulation: "Processus de Kimberley (réintégré 2007)",
        crmaRelevance: "Faible"
      }
    ],

    enterprises: [
      {name: "ArcelorMittal Liberia", sector: "Mines — Fer", revenue: "~400 M USD", employees: "~5 000", ceo: "Direction ArcelorMittal", shareholding: "ArcelorMittal 90%, Gouvernement LR 10%", listed: "Euronext Amsterdam (MT)", hq: "Buchanan / Luxembourg"},
      {name: "Firestone Natural Rubber (Bridgestone)", sector: "Caoutchouc", revenue: "~200 M USD", employees: "~8 000 (avec familles)", ceo: "Direction Bridgestone", shareholding: "Bridgestone Corporation 100%", listed: "TSE (5108)", hq: "Harbel / Tokyo"},
      {name: "Sime Darby Plantation Liberia", sector: "Huile de palme / Caoutchouc", revenue: "~100 M USD (LR)", employees: "~3 000", ceo: "Direction Sime Darby", shareholding: "Sime Darby Plantation Bhd 100%", listed: "KLSE (5285)", hq: "Bomi County / Kuala Lumpur"},
      {name: "Liberia Bank for Development & Investment (LBDI)", sector: "Banque", revenue: "~15 M USD", employees: "~300", ceo: "CEO local", shareholding: "IFC + privé local", listed: "Non coté", hq: "Monrovia"},
      {name: "Orange Liberia", sector: "Télécoms", revenue: "~70 M USD", employees: "~200", ceo: "Direction Orange", shareholding: "Orange SA 100%", listed: "Euronext (ORA)", hq: "Monrovia"}
    ],

    leaders: {
      headOfState: {name: "Joseph Boakai", since: "Janvier 2024", party: "Unity Party (UP)", nextElection: "2029"},
      headOfGov: {name: "Joseph Boakai (Président exécutif)", since: "2024", party: "UP"},
      keyMinisters: [
        {portfolio: "Affaires Étrangères", name: "Sara Beysolow Nyanti"},
        {portfolio: "Mines & Énergie", name: "Emmanuel Urey"},
        {portfolio: "Finances", name: "Augustine Ngafuan"},
        {portfolio: "Agriculture", name: "Alexander Nuetah"}
      ],
      centralBankGov: {name: "J. Aloysius Tarlue Jr.", institution: "Central Bank of Liberia (CBL)"}
    },

    contacts: {
      chambers: ["Liberia Chamber of Commerce (LCC)"],
      afd: "AFD Abidjan (couvrant Liberia)",
      patronat: "LCC"
    },

    universities: [
      {name: "University of Liberia", city: "Monrovia", students: "~25 000", specialties: "Droit, Sciences, Ingénierie"},
      {name: "Cuttington University", city: "Suacoco", students: "~3 000", specialties: "Sciences, Santé"}
    ],
    literacyRate: "48%",

    demographics: {
      totalPopulation: "5.4 millions (2025)",
      growthRate: "2.5%/an",
      urbanPopulation: "52%",
      unemployment: "13% (officiel)",
      hdi: "0.481 — Rang 179/191",
      lifeExpectancy: "64 ans"
    },

    risks: {
      political: {score: 5, comment: "Boakai élu démocratiquement en 2024. Transition pacifique."},
      security: {score: 5, comment: "Stabilité post-guerre civile maintenue. Risques régionaux (Sierra Leone, Guinée)."},
      economic: {score: 7, comment: "Économie fragile. Forte dépendance minerais et caoutchouc."},
      regulatory: {score: 6, comment: "EITI membre. Réformes minières en cours sous Boakai."},
      logistic: {score: 7, comment: "Port de Monrovia à moderniser. Réseau routier insuffisant."},
      miningOpportunity: {score: 7, comment: "Fer (ArcelorMittal), or (Hummingbird), diamants. Caoutchouc (Firestone/Bridgestone)."},
      overallRisk: 6,
      overallOpportunity: 6,
      recommendation: "Fer et caoutchouc — secteurs porteurs avec partenaires établis"
    }
  },

  // ============================================================
  // 7. TOGO 🇹🇬
  // ============================================================
  {
    id: "TG",
    name: "Togo",
    officialName: "République Togolaise",
    flag: "🇹🇬",
    region: "africa",
    capital: "Lomé",
    area: "56 785 km²",
    population: "~9.2 millions (2025)",
    density: "162 hab/km²",
    gdpNominal: "~8.5 Mds USD (2025)",
    gdpPPP: "~22 Mds USD (2025)",
    gdpPerCapita: "~920 USD",
    gdpGrowth: [
      {year: "2021", value: 6.0},
      {year: "2022", value: 5.8},
      {year: "2023", value: 5.2},
      {year: "2024", value: 5.5},
      {year: "2025", value: 5.8}
    ],
    inflation: "4.5% (2025)",
    debtToGDP: "72.0%",
    tradeBalance: "-600 M USD",
    currency: "Franc CFA BCEAO (XOF)",
    exchangeRateEUR: "1 EUR = 655.96 XOF (fixe)",
    exchangeRateUSD: "1 USD = ~604 XOF",
    corruptionIndex: "Score 30/100 — Rang 127/180 (TI 2024)",
    easeBusiness: "Rang 97/190 (World Bank 2020)",
    politicalStability: "-0.43 (World Bank 2023)",
    riskScore: 5,
    riskLabel: "Modéré",
    recommendation: "Hub logistique régional — Port de Lomé stratégique",
    timezone: "UTC+0",
    languages: "Français (officiel), Ewe, Kabiyé",
    religions: "Christianisme (43%), Islam (20%), Animisme (37%)",
    memberships: ["UA", "CEDEAO", "UEMOA", "OCI"],

    minerals: [
      {
        name: "Phosphates",
        type: "Industriel / Fertilisants",
        annualProduction: "~1.5 Mt/an",
        worldRank: "Top 10 mondial",
        reserves: "~60 Mt estimées (Hahotoé, Kpogamé)",
        deposits: [
          {name: "Hahotoé", location: "6.33°N, 1.38°E", stage: "Production", operator: "Office Togolais des Phosphates (OTP)", nationality: "Togo", ownership: "État 100%"},
          {name: "Kpogamé", location: "6.37°N, 1.40°E", stage: "Développement", operator: "OTP + partenaires", nationality: "Togo", ownership: "OTP + privé"}
        ],
        exportRevenue: "~200 M USD",
        regulation: "Code minier 2012, OTP monopole",
        crmaRelevance: "Élevée — phosphates pour fertilisants, sécurité alimentaire UE"
      },
      {
        name: "Clinker / Calcaire",
        type: "Matériaux de construction",
        annualProduction: "~3 Mt clinker/an",
        worldRank: "Hub régional Afrique de l'Ouest",
        reserves: "Gisements calcaires importants",
        deposits: [
          {name: "Tabligbo", location: "6.59°N, 1.50°E", stage: "Production", operator: "CIMTOGO (Heidelberg Materials)", nationality: "Allemagne", ownership: "Heidelberg Materials 70%"}
        ],
        exportRevenue: "~300 M USD (ré-exportations vers hinterland)",
        regulation: "Code minier",
        crmaRelevance: "Faible"
      },
      {
        name: "Fer (Nangbéto)",
        type: "Industriel",
        annualProduction: "0 — en exploration",
        worldRank: "Non classé",
        reserves: "Non évalué",
        deposits: [
          {name: "Bassar", location: "9.28°N, 0.78°E", stage: "Exploration", operator: "Non attribué", nationality: "-", ownership: "-"}
        ],
        exportRevenue: "Nul",
        regulation: "Code minier",
        crmaRelevance: "Faible"
      }
    ],

    enterprises: [
      {name: "Port Autonome de Lomé (PAL)", sector: "Logistique portuaire", revenue: "~150 M USD", employees: "~800", ceo: "Fogan Adaboro", shareholding: "État togolais 100%", listed: "Non coté", hq: "Lomé"},
      {name: "CIMTOGO (Heidelberg Materials)", sector: "Ciment / Clinker", revenue: "~200 M USD", employees: "~700", ceo: "Direction Heidelberg", shareholding: "Heidelberg Materials 70%, État TG 30%", listed: "Xetra (HBCK)", hq: "Lomé / Heidelberg"},
      {name: "Office Togolais des Phosphates (OTP)", sector: "Mines — Phosphates", revenue: "~200 M USD", employees: "~2 500", ceo: "DG gouvernemental", shareholding: "État TG 100%", listed: "Non coté", hq: "Lomé"},
      {name: "Togocom (ancienne Togo Telecom)", sector: "Télécoms", revenue: "~120 M USD", employees: "~1 500", ceo: "DG", shareholding: "État + Axian Group (Madagascar)", listed: "Non coté", hq: "Lomé"},
      {name: "Ecobank Togo", sector: "Banque", revenue: "~80 M USD", employees: "~600", ceo: "DG local", shareholding: "ETI (Ecobank Transnational Inc.)", listed: "NSE (ETI)", hq: "Lomé"},
      {name: "BCEAO Agence Lomé", sector: "Banque centrale régionale", revenue: "N/A", employees: "~200", ceo: "Directeur national", shareholding: "BCEAO (zone CFA)", listed: "N/A", hq: "Lomé"}
    ],

    leaders: {
      headOfState: {name: "Faure Gnassingbé", since: "2005 (fils de Gnassingbé Eyadéma)", party: "Union pour la République (UNIR)", nextElection: "Réforme constitutionnelle 2024 — Président devient non exécutif"},
      headOfGov: {name: "Victoire Tomégah-Dogbé", since: "2020", party: "UNIR"},
      keyMinisters: [
        {portfolio: "Affaires Étrangères", name: "Robert Dussey"},
        {portfolio: "Mines & Énergie", name: "Mila Aziablé"},
        {portfolio: "Finances", name: "Sani Yaya"},
        {portfolio: "Industrie & Commerce", name: "Kodjo Adedze"}
      ],
      centralBankGov: {name: "Siège BCEAO Dakar", institution: "BCEAO — Directeur national Togo"}
    },

    contacts: {
      chambers: ["Chambre de Commerce et d'Industrie du Togo (CCIT)"],
      afd: "AFD Togo — Bureau Lomé",
      lawFirms: ["SCPA Villéger & Sanvee", "Cabinet Agbénonci"],
      patronat: "Conseil National du Patronat du Togo (CNPT)"
    },

    universities: [
      {name: "Université de Lomé", city: "Lomé", students: "~50 000", specialties: "Droit, Sciences, Médecine"},
      {name: "Université de Kara", city: "Kara", students: "~15 000", specialties: "Sciences sociales, Lettres"}
    ],
    literacyRate: "66%",

    demographics: {
      totalPopulation: "9.2 millions (2025)",
      growthRate: "2.5%/an",
      urbanPopulation: "44%",
      unemployment: "6.9% (officiel)",
      hdi: "0.539 — Rang 162/191",
      lifeExpectancy: "62 ans"
    },

    risks: {
      political: {score: 5, comment: "Gnassingbé au pouvoir depuis 2005. Réforme constitutionnelle 2024 modifie régime."},
      security: {score: 5, comment: "Nord du pays exposé aux groupes jihadistes (Burkina Faso border). Sud stable."},
      economic: {score: 5, comment: "Croissance solide. Port de Lomé hub régional."},
      regulatory: {score: 5, comment: "Doing Business favorable par rapport aux pairs. Zone franche de Lomé."},
      logistic: {score: 4, comment: "Port de Lomé — tirant d'eau 16m, terminal à conteneurs DP World. Hub pour hinterland (Burkina, Mali, Niger)."},
      miningOpportunity: {score: 6, comment: "Phosphates, clinker/ciment (hub régional). Potentiel fer et manganèse en exploration."},
      overallRisk: 5,
      overallOpportunity: 6,
      recommendation: "Hub logistique régional — Port de Lomé stratégique"
    }
  },

  // ============================================================
  // 8. BÉNIN 🇧🇯
  // ============================================================
  {
    id: "BJ",
    name: "Bénin",
    officialName: "République du Bénin",
    flag: "🇧🇯",
    region: "africa",
    capital: "Porto-Novo (officielle) / Cotonou (économique)",
    area: "114 763 km²",
    population: "~13.7 millions (2025)",
    density: "119 hab/km²",
    gdpNominal: "~19.6 Mds USD (2025)",
    gdpPPP: "~55 Mds USD (2025)",
    gdpPerCapita: "~1 430 USD",
    gdpGrowth: [
      {year: "2021", value: 7.2},
      {year: "2022", value: 6.3},
      {year: "2023", value: 6.4},
      {year: "2024", value: 6.5},
      {year: "2025", value: 6.8}
    ],
    inflation: "2.8% (2025)",
    debtToGDP: "52.8%",
    tradeBalance: "-1.8 Mds USD",
    currency: "Franc CFA BCEAO (XOF)",
    exchangeRateEUR: "1 EUR = 655.96 XOF (fixe)",
    exchangeRateUSD: "1 USD = ~604 XOF",
    corruptionIndex: "Score 43/100 — Rang 71/180 (TI 2024)",
    easeBusiness: "Rang 149/190 (World Bank 2020)",
    politicalStability: "-0.15 (World Bank 2023)",
    riskScore: 4,
    riskLabel: "Modéré",
    recommendation: "Hub logistique et coton — attractive, Port Cotonou à surveiller",
    timezone: "UTC+1",
    languages: "Français (officiel), Fon, Yoruba, Bariba",
    religions: "Islam (27.7%), Christianisme (25.5%), Vodoun (11.6%), Autres (35.2%)",
    memberships: ["UA", "CEDEAO", "UEMOA", "OCI"],

    minerals: [
      {
        name: "Coton",
        type: "Agricole industriel",
        annualProduction: "~700 000 t coton-graine/an — 1er producteur Afrique",
        worldRank: "1er Afrique subsaharienne",
        reserves: "Agriculture — 280 000 ha",
        deposits: [{name: "Bassin cotonnier (Nord Bénin)", location: "Atacora, Borgou, Alibori", stage: "Production", operator: "AIC / SONAPRA / égreneurs privés", nationality: "Bénin", ownership: "Mixte"}],
        exportRevenue: "~700 M USD",
        regulation: "AIC — Association Interprofessionnelle du Coton",
        crmaRelevance: "Faible"
      },
      {
        name: "Pétrole (offshore)",
        type: "Hydrocarbures",
        annualProduction: "~2 000 b/j (très limité)",
        worldRank: "Producteur marginal",
        reserves: "Blocs offshore en exploration (Total, Eni)",
        deposits: [
          {name: "Bloc offshore B (Sèmè field)", location: "Offshore Cotonou", stage: "Production marginale / exploration", operator: "Petrobel + Fortesa", nationality: "Italie/USA", ownership: "Mixte État + privé"}
        ],
        exportRevenue: "~30 M USD",
        regulation: "Code pétrolier 1989",
        crmaRelevance: "Faible"
      },
      {
        name: "Calcaire / Marbre",
        type: "Matériaux de construction",
        annualProduction: "Carrières locales",
        worldRank: "Non classé",
        reserves: "Atacora, Zou",
        deposits: [{name: "Carrières Atacora", location: "Nord Bénin", stage: "Production artisanale", operator: "Divers", nationality: "Bénin", ownership: "Privé"}],
        exportRevenue: "Marginal",
        regulation: "Code minier",
        crmaRelevance: "Faible"
      }
    ],

    enterprises: [
      {name: "Port Autonome de Cotonou (PAC)", sector: "Logistique portuaire", revenue: "~120 M USD", employees: "~1 200", ceo: "DG gouvernemental", shareholding: "État béninois 100%", listed: "Non coté", hq: "Cotonou"},
      {name: "SONAPRA (Société Nationale des Produits Agricoles)", sector: "Agriculture — Coton", revenue: "~500 M USD (coton filière)", employees: "~500", ceo: "DG gouvernemental", shareholding: "État BJ 100%", listed: "Non coté", hq: "Cotonou"},
      {name: "Bénin Control SA (BIVAC/Bureau Veritas)", sector: "Inspection portuaire", revenue: "~30 M USD", employees: "~200", ceo: "Direction Bureau Veritas", shareholding: "Bureau Veritas 100%", listed: "Euronext (BVI)", hq: "Cotonou / Paris"},
      {name: "Ecobank Bénin", sector: "Banque", revenue: "~80 M USD", employees: "~500", ceo: "DG local", shareholding: "ETI (Ecobank)", listed: "NSE (ETI)", hq: "Cotonou"},
      {name: "MTN Bénin", sector: "Télécoms", revenue: "~200 M USD", employees: "~300", ceo: "Direction MTN", shareholding: "MTN Group 100%", listed: "JSE (MTN)", hq: "Cotonou / Johannesburg"},
      {name: "BOA Bénin (Banque of Africa)", sector: "Banque", revenue: "~100 M USD", employees: "~700", ceo: "DG local", shareholding: "Bank of Africa Group (BMCE/BOA)", listed: "BRVM (BOA-BJ)", hq: "Cotonou"}
    ],

    leaders: {
      headOfState: {name: "Patrice Talon", since: "2016 (réélu 2021)", party: "Indépendant / Rupture", nextElection: "2026"},
      headOfGov: {name: "Patrice Talon (Président exécutif)", since: "2016", party: "Indépendant"},
      keyMinisters: [
        {portfolio: "Affaires Étrangères", name: "Olushegun Adjadi Bakari"},
        {portfolio: "Économie & Finances", name: "Romuald Wadagni"},
        {portfolio: "Mines & Ressources", name: "Samou Seïdou Adambi"},
        {portfolio: "Agriculture", name: "Gaston Dossouhoui"}
      ],
      centralBankGov: {name: "Siège BCEAO Dakar", institution: "BCEAO — Directeur national Bénin"}
    },

    contacts: {
      chambers: ["Chambre de Commerce et d'Industrie du Bénin (CCIB)"],
      afd: "AFD Bénin — Bureau Cotonou",
      lawFirms: ["Cabinet Kossi Afanou", "Cabinet Sodonon Judicael"],
      patronat: "CONEB — Conseil National des Entreprises du Bénin"
    },

    universities: [
      {name: "Université d'Abomey-Calavi (UAC)", city: "Cotonou", students: "~80 000", specialties: "Sciences, Droit, Médecine"},
      {name: "Université de Parakou", city: "Parakou", students: "~20 000", specialties: "Sciences agronomiques, Droit"}
    ],
    literacyRate: "45%",

    demographics: {
      totalPopulation: "13.7 millions (2025)",
      growthRate: "2.8%/an",
      urbanPopulation: "50%",
      unemployment: "2.3% (officiel — sous-emploi élevé)",
      hdi: "0.525 — Rang 163/191",
      lifeExpectancy: "61 ans"
    },

    risks: {
      political: {score: 4, comment: "Talon — réformes économiques. Critiques sur démocratie. Stabilité maintenue."},
      security: {score: 5, comment: "Nord exposé aux groupes jihadistes (Sahel). Cotonou et côte stables."},
      economic: {score: 4, comment: "Croissance solide ~6.5%. Commerce transit vers Niger (suspendu après coup 2023)."},
      regulatory: {score: 4, comment: "Réformes PME en cours. CPI — Centre de Promotion des Investissements actif."},
      logistic: {score: 4, comment: "Port de Cotonou — hub majeur Afrique de l'Ouest. Autoroute Cotonou-Niamey."},
      miningOpportunity: {score: 3, comment: "Ressources minérales limitées. Atout: coton #1 Afrique, transit commercial."},
      overallRisk: 4,
      overallOpportunity: 5,
      recommendation: "Hub logistique et coton — attractive, Port Cotonou à surveiller"
    }
  },

  // ============================================================
  // 9. CAMEROUN 🇨🇲
  // ============================================================
  {
    id: "CM",
    name: "Cameroun",
    officialName: "République du Cameroun",
    flag: "🇨🇲",
    region: "africa",
    capital: "Yaoundé",
    area: "475 442 km²",
    population: "~28 millions (2025)",
    density: "59 hab/km²",
    gdpNominal: "~47 Mds USD (2025)",
    gdpPPP: "~130 Mds USD (2025)",
    gdpPerCapita: "~1 680 USD",
    gdpGrowth: [
      {year: "2021", value: 3.5},
      {year: "2022", value: 3.8},
      {year: "2023", value: 4.0},
      {year: "2024", value: 4.1},
      {year: "2025", value: 4.5}
    ],
    inflation: "6.2% (2025)",
    debtToGDP: "42.5%",
    tradeBalance: "-500 M USD",
    currency: "Franc CFA BEAC (XAF)",
    exchangeRateEUR: "1 EUR = 655.96 XAF (fixe)",
    exchangeRateUSD: "1 USD = ~604 XAF",
    corruptionIndex: "Score 26/100 — Rang 140/180 (TI 2024)",
    easeBusiness: "Rang 167/190 (World Bank 2020)",
    politicalStability: "-1.20 (World Bank 2023)",
    riskScore: 6,
    riskLabel: "Modéré-Élevé (crise anglophone)",
    recommendation: "Secteur pétrolier, bois, cacao — opérations prudentes zones stables",
    timezone: "UTC+1",
    languages: "Français et Anglais (officielles), Fulfulde, Bassa, Beti, Ewondo",
    religions: "Christianisme (70%), Islam (20%), Animisme (10%)",
    memberships: ["UA", "CEMAC", "Commonwealth", "OCI"],

    minerals: [
      {
        name: "Pétrole",
        type: "Hydrocarbures",
        annualProduction: "~75 000 b/j (2024, déclinant)",
        worldRank: "Non classé — producteur mineur",
        reserves: "~200 Mt prouvées",
        deposits: [
          {name: "Bassin du Rio del Rey (offshore)", location: "Offshore Sud-Ouest", stage: "Production", operator: "TotalEnergies, Perenco, SNH", nationality: "France/UK/Cameroun", ownership: "SNH 20%, TotalEnergies 40%, Perenco 40%"}
        ],
        exportRevenue: "~1.8 Mds USD",
        regulation: "Code pétrolier 1999. SNH (Société Nationale des Hydrocarbures)",
        crmaRelevance: "Faible"
      },
      {
        name: "Bauxite (Minim-Martap / Ngaoundal)",
        type: "Industriel — Aluminium",
        annualProduction: "0 — en développement",
        worldRank: "Non classé (non exploité)",
        reserves: "~1.1 milliard de tonnes (Minim-Martap — haute qualité)",
        deposits: [
          {name: "Minim-Martap / Ngaoundal", location: "6.27°N, 12.63°E", stage: "Développement (financement en cours)", operator: "Cameroon Alumina Limited (Hindalco/Hydromine)", nationality: "Inde/USA", ownership: "Hindalco 42.5%, Hydromine 42.5%, CamIron 15%"}
        ],
        exportRevenue: "0 (non exploité)",
        regulation: "Convention de base 2008",
        crmaRelevance: "Très élevée si exploité"
      },
      {
        name: "Minerai de fer (Mbalam-Nabeba)",
        type: "Industriel",
        annualProduction: "0 — en développement",
        worldRank: "Non classé",
        reserves: "~2.4 milliards de tonnes (Mbalam)",
        deposits: [
          {name: "Mbalam (Cam-Congo border)", location: "3.61°N, 14.22°E", stage: "Développement bloqué — financement insuffisant", operator: "Sundance Resources (Australie)", nationality: "Australie", ownership: "Sundance Resources"}
        ],
        exportRevenue: "0",
        regulation: "Convention minière",
        crmaRelevance: "Modérée"
      },
      {
        name: "Cobalt / Nickel / Manganèse (Lomié)",
        type: "Critique",
        annualProduction: "Exploration",
        worldRank: "Non classé",
        reserves: "Potentiel estimé — Lomié Sud-Est",
        deposits: [
          {name: "Lomié", location: "3.15°N, 13.62°E", stage: "Exploration", operator: "Geovic Cameroun", nationality: "USA", ownership: "Geovic 60%, État CM 40%"}
        ],
        exportRevenue: "0",
        regulation: "Contrat Geovic",
        crmaRelevance: "Très élevée — Cobalt, Nickel, Manganèse sur liste CRM UE"
      },
      {
        name: "Bois tropicaux",
        type: "Forestier",
        annualProduction: "~3 Mt/an bois exploité",
        worldRank: "2e Afrique (derrière RDC)",
        reserves: "22 millions ha de forêt dense",
        deposits: [{name: "Forêt du Bassin du Congo", location: "Sud et Est Cameroun", stage: "Production", operator: "Pallisco, SEBC, SFID, Rougier (France)", nationality: "Cameroun + France", ownership: "Privé concessions"}],
        exportRevenue: "~600 M USD",
        regulation: "Code forestier 1994 révisé, certification FSC partielle",
        crmaRelevance: "Faible"
      }
    ],

    enterprises: [
      {name: "Société Nationale des Hydrocarbures (SNH)", sector: "Pétrole & Gaz", revenue: "~1.5 Mds USD", employees: "~1 500", ceo: "Adolphe Moudiki", shareholding: "État CM 100%", listed: "Non coté", hq: "Yaoundé"},
      {name: "TotalEnergies Cameroun E&P", sector: "Pétrole", revenue: "~800 M USD (CM)", employees: "~500", ceo: "Direction TotalEnergies", shareholding: "TotalEnergies SE 100%", listed: "Euronext (TTE)", hq: "Douala / Paris"},
      {name: "Perenco Cameroun", sector: "Pétrole & Gaz", revenue: "~700 M USD (CM)", employees: "~600", ceo: "Direction Perenco", shareholding: "Famille Perrodo (France/UK) 100%", listed: "Non coté", hq: "Douala / Paris"},
      {name: "Société Générale Cameroun (SGC)", sector: "Banque", revenue: "~150 M USD", employees: "~1 000", ceo: "DG local", shareholding: "Société Générale France 58%", listed: "Non coté", hq: "Douala"},
      {name: "MTN Cameroun", sector: "Télécoms", revenue: "~600 M USD", employees: "~500", ceo: "Direction MTN", shareholding: "MTN Group 70%", listed: "JSE (MTN)", hq: "Douala / Johannesburg"},
      {name: "Orange Cameroun", sector: "Télécoms", revenue: "~350 M USD", employees: "~400", ceo: "Direction Orange", shareholding: "Orange SA 94%", listed: "Euronext (ORA)", hq: "Douala"},
      {name: "Eneo Cameroun (Energy of Cameroon)", sector: "Énergie électrique", revenue: "~500 M USD", employees: "~3 500", ceo: "Joël Nana Kontchou", shareholding: "ActisCapital 56%, État CM 44%", listed: "Non coté", hq: "Douala"}
    ],

    leaders: {
      headOfState: {name: "Paul Biya", since: "1982 (doyen des dirigeants africains)", party: "RDPC — Rassemblement Démocratique du Peuple Camerounais", nextElection: "2025 (incertain — âge 91 ans)"},
      headOfGov: {name: "Joseph Dion Ngute", since: "2019", party: "RDPC"},
      keyMinisters: [
        {portfolio: "Affaires Étrangères", name: "Lejeune Mbella Mbella"},
        {portfolio: "Mines & Développement technologique", name: "Gabriel Dodo Ndoke"},
        {portfolio: "Finances", name: "Louis Paul Motazé"},
        {portfolio: "Défense", name: "Bello Bouba Maigari"},
        {portfolio: "Délégué à la Présidence (Défense)", name: "Joseph Beti Assomo"}
      ],
      centralBankGov: {name: "Abbas Mahamat Tolli", institution: "Banque des États de l'Afrique Centrale (BEAC) — siège Yaoundé"}
    },

    contacts: {
      chambers: ["Chambre de Commerce, d'Industrie, des Mines et de l'Artisanat (CCIMA)", "Groupement Inter-patronal du Cameroun (GICAM)"],
      afd: "AFD Cameroun — Bureau Yaoundé",
      lawFirms: ["Gide Loyrette Nouel Douala", "SCPA Juris-Afrique"],
      patronat: "GICAM — Groupement Inter-patronal du Cameroun"
    },

    universities: [
      {name: "Université de Yaoundé I", city: "Yaoundé", students: "~50 000", specialties: "Sciences, Médecine"},
      {name: "Université de Douala", city: "Douala", students: "~60 000", specialties: "Économie, Droit"},
      {name: "ENSP — École Nationale Supérieure Polytechnique", city: "Yaoundé", students: "~2 000", specialties: "Ingénierie", ranking: "Top école technique Cameroun"}
    ],
    literacyRate: "77%",

    demographics: {
      totalPopulation: "28 millions (2025)",
      growthRate: "2.6%/an",
      urbanPopulation: "59%",
      unemployment: "3.9% (officiel — sous-emploi massif)",
      hdi: "0.576 — Rang 151/191",
      lifeExpectancy: "59 ans"
    },

    risks: {
      political: {score: 7, comment: "Biya (91 ans) — succession incertaine. Crise anglophone dans NOSO (Nord-Ouest/Sud-Ouest)."},
      security: {score: 7, comment: "Crise anglophone active. Boko Haram dans le Nord. Frontière RCA instable."},
      economic: {score: 5, comment: "Économie diversifiée. Pétrole déclinant. Potentiel bauxite/fer non exploité."},
      regulatory: {score: 6, comment: "Corruption structurelle. EITI membre. Codes miniers à renforcer."},
      logistic: {score: 5, comment: "Port de Douala — hub Afrique centrale. Réseau routier insuffisant."},
      miningOpportunity: {score: 8, comment: "Bauxite (1.1 Mds t), fer (Mbalam), cobalt/nickel (Lomié). Potentiel majeur non exploité."},
      overallRisk: 6,
      overallOpportunity: 7,
      recommendation: "Secteur pétrolier, bois, cacao — opérations prudentes zones stables"
    }
  },

  // ============================================================
  // 10. GABON 🇬🇦
  // ============================================================
  {
    id: "GA",
    name: "Gabon",
    officialName: "République Gabonaise",
    flag: "🇬🇦",
    region: "africa",
    capital: "Libreville",
    area: "267 668 km²",
    population: "~2.4 millions (2025)",
    density: "9 hab/km²",
    gdpNominal: "~21 Mds USD (2025)",
    gdpPPP: "~39 Mds USD (2025)",
    gdpPerCapita: "~8 750 USD (revenu intermédiaire supérieur)",
    gdpGrowth: [
      {year: "2021", value: 1.5},
      {year: "2022", value: 3.0},
      {year: "2023", value: 2.3},
      {year: "2024", value: 2.8},
      {year: "2025", value: 3.2}
    ],
    inflation: "3.5% (2025)",
    debtToGDP: "68.0%",
    tradeBalance: "+5.2 Mds USD (surplus hydrocarbures + manganèse)",
    currency: "Franc CFA BEAC (XAF)",
    exchangeRateEUR: "1 EUR = 655.96 XAF (fixe)",
    exchangeRateUSD: "1 USD = ~604 XAF",
    corruptionIndex: "Score 31/100 — Rang 123/180 (TI 2024)",
    easeBusiness: "Rang 169/190 (World Bank 2020)",
    politicalStability: "-0.55 (World Bank 2023)",
    riskScore: 5,
    riskLabel: "Modéré (transition en cours)",
    recommendation: "Manganèse et pétrole — stabilité post-coup à confirmer",

    industries: {
      gdpBySector: {
        agriculture: 6.5,
        industry: 53.5,
        services: 38.2,
        mining: 35,
      },
      keyIndustries: [
        {
          name: "Pétrole — secteur historique dominant",
          description: "Production actuelle ~200 000 b/j (2024, en déclin depuis le pic des années 1990). Principaux opérateurs : TotalEnergies (opérateur Block 17 offshore), Perenco (onshore + offshore), Maurel & Prom (Pertamina 72%), BW Offshore, Vaalco Energy, CNOOC. Gabon Oil Company (GOC) = bras de l'État. Membre OPEP jusqu'en 2023 (suspension). Réserves ~2 Mds barils.",
          share: "~35% PIB, ~60% revenus fiscaux",
        },
        {
          name: "Manganèse — COMILOG/Eramet (#3 mondial)",
          description: "Mine de Moanda (#1 producteur mondial hors Australie, ~4 Mt/an). COMILOG (filiale Eramet France, 63.7%) = leader mondial production manganèse. Transport via Transgabonais (648 km Moanda–Owendo). Export vers UE (Dunkerque, Norway Eramet) et Asie. Manganèse critique pour batteries EV et acier inoxydable (liste CRM UE).",
          share: "~5% PIB (impact plus élevé sur exports)",
        },
        {
          name: "Bois & Industrie forestière",
          description: "88% du territoire gabonais couvert de forêt tropicale (22 M ha). Interdiction d'exportation de grumes brutes depuis 2010 (transformation locale obligatoire). Zone Économique Spéciale de Nkok (Olam International) = hub de transformation bois. Espèces nobles : okoumé, ozigo, padouk. Opérateurs : Rougier Gabon, CEB (Compagnie Équatoriale des Bois), Precious Wood.",
          share: "~3% PIB",
        },
        {
          name: "Fer — Baniaka & Bélinga (projets en développement)",
          description: "Gisement de Baniaka (projet Genmin/Sinohydro, 5–10 Mt/an, EIS approuvé). Bélinga (~1 Mds t réserves, Fortescue Metals — en exploration). Potentiel majeur mais développement ralenti par manque d'infrastructure ferroviaire vers côte.",
          share: "0 production actuelle",
        },
        {
          name: "Huile de palme & Agro-industrie",
          description: "Olam International (Singapour) = opérateur leader via ZES Nkok. Plantations palm oil (~50 000 ha), caoutchouc, cacao. SOSUHO (sucre). Ambition de Gabon d'être hub agro-industrie CEMAC.",
          share: "~4% PIB agri total",
        },
      ],
      sez: [
        {
          name: "ZES de Nkok",
          location: "Nkok (30 km de Libreville), Province de l'Estuaire",
          advantages: "Zone économique spéciale gérée par Arise IIP (ex-Olam Gabon). Transformation bois, agro-industrie, services industriels. Exonérations fiscales 25 ans, guichet unique, infrastructure clé en main. 70+ entreprises installées. Zone la plus développée d'Afrique centrale.",
        },
        {
          name: "ZES de Port-Gentil",
          location: "Port-Gentil, Province de l'Ogooué-Maritime",
          advantages: "Hub pétrolier et gazier. Base opérationnelle TotalEnergies, Perenco. Services parapétroliers. Accès offshore direct. Zone franche hydrocarbures.",
        },
      ],
      majorProjects: [
        "Baniaka Iron Ore (Genmin + Sinohydro — 5–10 Mt/an minerai de fer, financement en cours, production visée 2027–2028)",
        "Belinga Iron Ore (Fortescue Metals/FMG — exploration avancée, ~1 Mds t réserves)",
        "Expansion manganèse Eramet/COMILOG (augmentation capacité Moanda à 7 Mt/an)",
        "Grand Poubara Hydropower (160 MW sur Ogooué, financement BAfD)",
        "Millennial Potash — Projet Banio (potasse marine, Mayumba)",
        "Olam Agri expansion (Palm oil ZES Nkok, augmentation capacité)",
        "Modernisation port d'Owendo (Arise Ports — terminal conteneurs + vrac minéralier)",
      ],
      banking: {
        mainBanks: [
          "BGFI Bank Gabon (#1 CEMAC zone par actifs, filiale de BGFI Holding)",
          "UGB — Union Gabonaise de Banque (filiale Attijariwafa Bank Maroc)",
          "BICIG — Banque Internationale pour le Commerce et l'Industrie du Gabon",
          "Société Générale Gabon",
          "Orabank Gabon",
        ],
        totalAssets: "~6 Mds USD (système bancaire consolidé 2024)",
        bancarisation: "25% de la population adulte",
      },
      telecom: {
        operators: [
          "Airtel Gabon (Airtel Africa)",
          "Moov Africa Gabon (ex-Gabon Telecom — Maroc Telecom 51%)",
        ],
        mobilePenetration: "140% (multi-SIM, taux de pénétration des lignes)",
        internetPenetration: "65% (2024 — l'un des meilleurs d'Afrique centrale)",
      },
      energy: {
        mix: "Hydroélectrique 40%, Gaz naturel 35%, Pétrole/Fuel 25%",
        installedCapacity: "~800 MW (2024)",
        renewableProjects: "Grand Poubara (160 MW — BAfD financement), extension Centrale de Kinguélé, solaire rural UNDP",
      },
    } ,

    logistics: {
      ports: [
        {
          name: "Port d'Owendo",
          capacity: "~350 000 TEU/an (conteneurs), 5 Mt vrac",
          operator: "Arise Ports & Logistics (ex-Bolloré Gabon, concession 30 ans)",
          draft: "13m",
          note: "Principal port commercial Gabon. Terminus du Transgabonais pour manganèse et bois. Modernisation en cours par Arise IIP.",
        },
        {
          name: "Port de Port-Gentil",
          capacity: "Base pétrolière offshore — trafic hydrocarbures et vrac sec",
          operator: "Société du Port Môle et des Terminaux de Port-Gentil (SPMTPG)",
          draft: "10m",
          note: "Hub opérations pétrolières offshore. Services support TotalEnergies, Perenco, Maurel & Prom.",
        },
        {
          name: "Port de Mayumba",
          capacity: "Développement planifié — exportation minerai de fer Baniaka/Bélinga",
          operator: "Non attribué — projet d'infrastructure en cours",
          draft: "20m+ (eau profonde — cible Capesize)",
          note: "Port en eau profonde projeté pour les futurs exports de minerai de fer (Baniaka, Bélinga). Financement à confirmer.",
        },
      ],
      airports: [
        {
          name: "Aéroport International Léon-Mba de Libreville",
          traffic: "~700 000 passagers/an (2024)",
          freight: "~15 000 t fret/an",
        },
        {
          name: "Aéroport de Port-Gentil",
          traffic: "~150 000 passagers/an",
          freight: "~3 000 t fret/an",
        },
        {
          name: "Aéroport de Franceville-Mvengue",
          traffic: "~50 000 passagers/an",
          freight: "~500 t fret/an",
        },
      ],
      railway: "Transgabonais : 648 km (Libreville/Owendo – Franceville). Géré par SETRAG (filiale Eramet/Arise). Principal usage : transport manganèse (COMILOG) et bois. Passagers en déclin. Réhabilitation progressive sous Arise.",
      roads: "~9 400 km dont ~3 600 km bitumés. Réseau en amélioration mais lacunes en forêt dense. Route Libreville–Lambaréné–Mouila en réhabilitation (BAfD).",
      corridors: "Corridor Transgabonais (Owendo–Franceville, manganèse + bois). Corridor Libreville–Douala (route + maritime). Corridor futur Baniaka/Bélinga vers port Mayumba (fer).",
      containerCost: "~2 500 USD/conteneur 20' import CIF Owendo (2024)",
      customsDelay: "7–12 jours (douanes Owendo — amélioration post-Arise)",
      logisticZones: [
        "ZES de Nkok — hub agro-industrie et bois (Arise IIP)",
        "Zone portuaire Owendo (Arise Ports)",
        "Zone pétrolière Port-Gentil",
      ],
      maritimeConnectivity: "Accès direct Atlantique via Owendo et Port-Gentil. Liaisons régulières vers Europe (Anvers, Le Havre — manganèse), Asie (Chine — manganèse), Amérique. Compagnies : MSC, CMA-CGM, Maersk.",
    } ,

    trade: {
      topExports: [
        { product: "Pétrole brut", value: "~4 Mds USD", destination: "Chine (50%), USA, Inde, Europe" },
        { product: "Manganèse (COMILOG/Eramet)", value: "~900 M USD", destination: "UE (Dunkerque/Norvège), Chine, Japon" },
        { product: "Bois transformé (sciages, placages)", value: "~300 M USD", destination: "Chine, UE, Moyen-Orient" },
        { product: "Huile de palme (Olam)", value: "~150 M USD", destination: "Asie, régional" },
        { product: "Minerai de fer (Baniaka — démarrage)", value: "Non disponible (production 2027+)", destination: "Chine (cible)" },
      ],
      topImports: [
        { product: "Machines et équipements", value: "~700 M USD", origin: "UE (France), Chine" },
        { product: "Produits alimentaires", value: "~500 M USD", origin: "France, Cameroun, Maroc" },
        { product: "Produits pétroliers raffinés", value: "~400 M USD", origin: "Nigeria, Congo, importation" },
        { product: "Véhicules", value: "~200 M USD", origin: "France, Japon, Chine" },
        { product: "Médicaments et équipements médicaux", value: "~150 M USD", origin: "France, UE" },
      ],
      tradeBalance: "+5.2 Mds USD (surplus hydrocarbures + manganèse, 2024)",
      fdiInward: {
        stock: "~8 Mds USD (2024)",
        flow: "~800 M USD/an",
        topInvestors: ["France (TotalEnergies, Perenco, Eramet)", "UK (Perenco — famille Perrodo)", "Singapour (Olam/Arise)", "Chine (CNOOC, Sinohydro)", "USA (Vaalco)"],
      },
      fdiOutward: "Très faible — moins de $100 M USD/an",
      tradeAgreements: [
        "ZLECAF (signataire)",
        "CEMAC (Union douanière Afrique Centrale)",
        "ACP-UE (Accord de Partenariat Économique Afrique centrale — APE en discussion)",
        "OCI",
      ],
      taxRegime: {
        is: "IS 30% (standard). Régimes préférentiels ZES Nkok (exonération 25 ans) et conventions minières/pétrolières individuelles.",
        tva: "TVA 18%",
        conventions: "Conventions de double imposition : France, Belgique, Canada, Maroc, Maurice. BEAC régule devises zone CEMAC.",
      },
      freeZones: "ZES de Nkok (Arise IIP) — zone franche industrielle. ZES Port-Gentil (hydrocarbures). Régimes contractuels pétrole et mines.",
      profitRepatriation: "Réglementée par BEAC (Banque des États Afrique Centrale). XAF = monnaie CFA garantie parité EUR — stabilité de change. Rapatriement possible via comptes en devises BEAC.",
      bit: "Traités bilatéraux d'investissement avec : France, USA, Chine, Allemagne, Belgique, Suisse, Italie (ICSID disponible).",
    } ,

    billionaires: [
      {
        name: "Famille Bongo (Ali Bongo Ondimba)",
        fortune: "Estimée $1–2 Mds USD (biens saisis post-coup 2023)",
        source: "Rentes pétrolières, immobilier (France, Gabon, international), fonds politiques",
        companies: "Participations diverses (non publiques), immobilier Paris 16e, villas Côte d'Azur",
        age: "Ali Bongo : 65 ans (né 1959) — renversé août 2023",
        education: "Droit Paris II, Sciences Po",
        bio: "Président du Gabon de 2009 à août 2023 (renversé par coup d'État CTRI). Fils d'Omar Bongo (43 ans au pouvoir). Fortune familiale liée aux rentes pétrolières de l'État gabonais. Biens gelés par la junte CTRI depuis septembre 2023. Enquête 'biens mal acquis' en France.",
      },
      {
        name: "Samuel Dossou-Aworet",
        fortune: "~200 M USD (estimation)",
        source: "Services pétroliers — Petrolin Group",
        companies: "Petrolin Group (trading pétrole, services parapétroliers), actif Afrique de l'Ouest et Centrale",
        age: "Non disponible",
        education: "Ingénieur, formation internationale",
        bio: "Entrepreneur béno-gabonais fondateur du Petrolin Group (services et négoce pétrole). Actif dans plusieurs pays d'Afrique sub-saharienne. Figure de l'entrepreneuriat africain dans le secteur énergétique.",
      },
      {
        name: "Frédéric Abikou Remanda",
        fortune: "Non disponible",
        source: "Industrie du bois et immobilier — Groupe Rougier Gabon",
        companies: "Rougier Gabon (filiale Rougier SA France), concessions forestières",
        age: "Non disponible",
        education: "Non disponible",
        bio: "Représentatif de l'industrie forestière gabonaise. Rougier Gabon = acteur majeur de la transformation du bois depuis l'interdiction d'export de grumes (2010). Secteur en restructuration sous la junte CTRI.",
      },
    ],


    timezone: "UTC+1",
    languages: "Français (officiel), Fang, Myènè, Bapounou",
    religions: "Christianisme (80%), Islam (10%), Animisme (10%)",
    memberships: ["UA", "CEMAC", "OPEP (suspendu 2023)", "OCI"],

    minerals: [
      {
        name: "Manganèse",
        type: "Industriel — Acier",
        annualProduction: "~4 Mt/an (2024) — 3e mondial",
        worldRank: "3e mondial",
        reserves: "~230 Mt (Moanda — mine COMILOG)",
        deposits: [
          {name: "Moanda (COMILOG)", location: "1.57°S, 13.23°E", stage: "Production", operator: "COMILOG (filiale Eramet)", nationality: "France", ownership: "Eramet 63.7%, État GA 26.2%, Moanda Dev. 10.1%"},
          {name: "Ndjolé / Owendo (transport)", location: "Rail Moanda-Owendo (700 km)", stage: "Production", operator: "COMILOG / SETRAG", nationality: "France/Gabon", ownership: "Eramet / État GA"}
        ],
        exportRevenue: "~900 M USD",
        regulation: "Convention COMILOG/Eramet. État gabonais actionnaire.",
        crmaRelevance: "Très élevée — Manganèse sur liste CRM UE (acier, batteries)"
      },
      {
        name: "Pétrole",
        type: "Hydrocarbures",
        annualProduction: "~200 000 b/j (2024)",
        worldRank: "Producteur mineur Afrique",
        reserves: "~2 Mds barils",
        deposits: [
          {name: "Bassin sédimentaire côtier (offshore/onshore)", location: "Côte atlantique", stage: "Production", operator: "TotalEnergies, Perenco, Maurel & Prom, Vaalco", nationality: "France/UK/USA", ownership: "Divers + État GA"}
        ],
        exportRevenue: "~4 Mds USD",
        regulation: "Code pétrolier révisé. Gabon Oil Company (GOC)",
        crmaRelevance: "Faible"
      },
      {
        name: "Bois tropicaux",
        type: "Forestier",
        annualProduction: "~1 Mt bois (post-interdiction grumes 2010)",
        worldRank: "Hub régional bois transformé",
        reserves: "~88% territoire en forêt tropicale (22 M ha)",
        deposits: [{name: "Forêt dense équatoriale gabonaise", location: "Territoire national", stage: "Production (transformé localement)", operator: "Rougier Gabon, CEB, Precious Wood", nationality: "France/Suisse/Gabon", ownership: "Privé concessions"}],
        exportRevenue: "~300 M USD",
        regulation: "Interdiction export grumes brutes depuis 2010 — transformation locale obligatoire",
        crmaRelevance: "Faible"
      },
      {
        name: "Minerai de fer (Bélinga)",
        type: "Industriel",
        annualProduction: "0 — non exploité",
        worldRank: "Non classé",
        reserves: "~1 milliard de tonnes",
        deposits: [
          {name: "Bélinga", location: "1.08°N, 13.18°E", stage: "Exploration avancée — bloqué", operator: "Complexe Minéralier et Ferroviaire de Bélinga (CMFB)", nationality: "Gabon/Chine", ownership: "En révision post-coup 2023"}
        ],
        exportRevenue: "0",
        regulation: "Convention en révision",
        crmaRelevance: "Modérée"
      }
    ],

    enterprises: [
      {name: "COMILOG (Eramet)", sector: "Mines — Manganèse", revenue: "~1.5 Mds USD (groupe Eramet)", employees: "~6 000 (Gabon)", ceo: "PDG Eramet: Christel Bories", shareholding: "Eramet 63.7%, État GA 26.2%", listed: "Euronext Paris (ERA)", hq: "Moanda / Paris"},
      {name: "TotalEnergies Gabon", sector: "Pétrole", revenue: "~1.5 Mds USD (GA)", employees: "~800", ceo: "Direction TotalEnergies", shareholding: "TotalEnergies SE (opérateur)", listed: "Euronext (TTE)", hq: "Port-Gentil / Paris"},
      {name: "Perenco Gabon", sector: "Pétrole & Gaz", revenue: "~1 Mds USD (GA)", employees: "~800", ceo: "Direction Perenco", shareholding: "Famille Perrodo 100%", listed: "Non coté", hq: "Port-Gentil / Paris"},
      {name: "Gabon Oil Company (GOC)", sector: "Pétrole (État)", revenue: "Particip. diverses", employees: "~300", ceo: "DG gouvernemental", shareholding: "État GA 100%", listed: "Non coté", hq: "Libreville"},
      {name: "Maurel & Prom Gabon", sector: "Pétrole & Gaz", revenue: "~300 M USD (GA)", employees: "~300", ceo: "Direction M&P (PT Pertamina)", shareholding: "Pertamina 72%, M&P coté", listed: "Euronext Paris (MAU)", hq: "Port-Gentil / Paris"},
      {name: "BGFI Bank Gabon", sector: "Banque", revenue: "~150 M USD", employees: "~800", ceo: "DG local", shareholding: "BGFI Holding (Gabon) + Société Générale", listed: "Non coté", hq: "Libreville"}
    ],

    leaders: {
      headOfState: {name: "Brice Clotaire Oligui Nguema", since: "Août 2023 (coup d'État — renversement Ali Bongo)", party: "CTRI — Comité pour la Transition et la Restauration des Institutions", nextElection: "Transition — élections prévues 2025"},
      headOfGov: {name: "Raymond Ndong Sima", since: "2023", party: "Technocrate — CTRI"},
      keyMinisters: [
        {portfolio: "Affaires Étrangères", name: "Régis Immongault Tatangani"},
        {portfolio: "Mines & Hydrocarbures", name: "Vianey Bissielou"},
        {portfolio: "Économie & Finances", name: "Jean-Marie Ogandaga"},
        {portfolio: "Défense", name: "Brigitte Onkanowa"}
      ],
      centralBankGov: {name: "Abbas Mahamat Tolli", institution: "BEAC — Banque des États de l'Afrique Centrale"}
    },

    contacts: {
      chambers: ["Chambre de Commerce, d'Agriculture, d'Industrie, des Mines et de l'Artisanat du Gabon (CCAIMAG)"],
      afd: "AFD Gabon — Bureau Libreville",
      lawFirms: ["Cabinet Fabrice Sawegnon (Libreville)", "Gide Loyrette Nouel Libreville"],
      patronat: "CGECI — Confédération Générale des Entreprises du Congo/Gabon (PATRONAT Gabon)"
    },

    universities: [
      {name: "Université Omar Bongo (UOB)", city: "Libreville", students: "~25 000", specialties: "Droit, Lettres, Sciences sociales"},
      {name: "Université des Sciences et Techniques de Masuku (USTM)", city: "Franceville", students: "~5 000", specialties: "Sciences, Géologie, Mines"}
    ],
    literacyRate: "84%",

    demographics: {
      totalPopulation: "2.4 millions (2025)",
      growthRate: "2.4%/an",
      urbanPopulation: "90% (l'un des plus urbanisés d'Afrique)",
      unemployment: "20% (officiel)",
      hdi: "0.706 — Rang 119/191 (revenu intermédiaire supérieur)",
      lifeExpectancy: "67 ans"
    },

    risks: {
      political: {score: 6, comment: "Junte CTRI après coup août 2023. Transition vers civil planifiée. Climat des affaires préservé."},
      security: {score: 4, comment: "Pays globalement stable. Tension politique interne limitée."},
      economic: {score: 5, comment: "PIB per capita élevé (~8 750 USD). Dépendant pétrole (déclin) + manganèse."},
      regulatory: {score: 5, comment: "Révision des codes miniers post-coup. Risque renégociation contrats."},
      logistic: {score: 5, comment: "Port d'Owendo modernisé. Trans-Gabon railway (700 km Libreville-Franceville)."},
      miningOpportunity: {score: 8, comment: "Manganèse #3 mondial (COMILOG/Eramet). Pétrole mature. Fer Bélinga à développer."},
      overallRisk: 5,
      overallOpportunity: 7,
      recommendation: "Manganèse et pétrole — stabilité post-coup à confirmer"
    }
  },

  // ============================================================
  // 11. CONGO-BRAZZAVILLE 🇨🇬
  // ============================================================
  {
    id: "CG",
    name: "Congo-Brazzaville",
    officialName: "République du Congo",
    flag: "🇨🇬",
    region: "africa",
    capital: "Brazzaville",
    area: "342 000 km²",
    population: "~6.1 millions (2025)",
    density: "17.8 hab/km²",
    gdpNominal: "~13.5 Mds USD (2025)",
    gdpPPP: "~23 Mds USD (2025)",
    gdpPerCapita: "~2 200 USD",
    gdpGrowth: [
      {year: "2021", value: 0.5},
      {year: "2022", value: 2.8},
      {year: "2023", value: 3.5},
      {year: "2024", value: 3.8},
      {year: "2025", value: 4.2}
    ],
    inflation: "3.2% (2025)",
    debtToGDP: "88.5%",
    tradeBalance: "+4.5 Mds USD (surplus pétrolier)",
    currency: "Franc CFA BEAC (XAF)",
    exchangeRateEUR: "1 EUR = 655.96 XAF (fixe)",
    exchangeRateUSD: "1 USD = ~604 XAF",
    corruptionIndex: "Score 21/100 — Rang 158/180 (TI 2024)",
    easeBusiness: "Rang 180/190 (World Bank 2020)",
    politicalStability: "-0.70 (World Bank 2023)",
    riskScore: 6,
    riskLabel: "Élevé",
    recommendation: "Pétrole et potasse — secteurs spécialisés avec risque de gouvernance",
    timezone: "UTC+1",
    languages: "Français (officiel), Lingala, Munukutuba, Kikongo",
    religions: "Christianisme (80%), Islam (2%), Animisme (18%)",
    memberships: ["UA", "CEMAC", "OPEP"],

    minerals: [
      {
        name: "Pétrole",
        type: "Hydrocarbures",
        annualProduction: "~250 000 b/j (2024)",
        worldRank: "4e producteur Afrique subsaharienne",
        reserves: "~1.6 Mds barils",
        deposits: [
          {name: "Moho Bilondo (offshore)", location: "Offshore atlantique", stage: "Production", operator: "TotalEnergies 53.5%, SNPC 15%", nationality: "France/Congo", ownership: "TotalEnergies opérateur"},
          {name: "Likouala (onshore)", location: "Nord Congo", stage: "Production", operator: "Eni (35%), SNPC", nationality: "Italie/Congo", ownership: "Eni opérateur"}
        ],
        exportRevenue: "~5 Mds USD",
        regulation: "Code pétrolier 1994. SNPC (Société Nationale des Pétroles du Congo)",
        crmaRelevance: "Faible"
      },
      {
        name: "Potasse (Sintoukola)",
        type: "Industriel — Fertilisants",
        annualProduction: "0 — en développement",
        worldRank: "Non classé",
        reserves: "~1.4 milliard de tonnes (Sintoukola — potasse marine)",
        deposits: [
          {name: "Sintoukola", location: "4.00°S, 12.35°E", stage: "Développement — financement en cours", operator: "MagIndustries (Canada)", nationality: "Canada/Chine", ownership: "MagIndustries 65%, Sinopec 35%"}
        ],
        exportRevenue: "0 (non exploité)",
        regulation: "Convention minière",
        crmaRelevance: "Élevée — potasse pour fertilisants, sécurité alimentaire UE"
      },
      {
        name: "Bois tropicaux (Forêt Congo)",
        type: "Forestier",
        annualProduction: "~700 000 t/an bois scié",
        worldRank: "Hub secondaire Afrique centrale",
        reserves: "~22.5 M ha forêt dense",
        deposits: [{name: "Forêt du Congo", location: "Nord et Centre Congo", stage: "Production", operator: "CIB (Congolaise Industrielle du Bois) — Danzer", nationality: "Allemagne/Suisse", ownership: "Danzer Group"}],
        exportRevenue: "~300 M USD",
        regulation: "Code forestier 2000",
        crmaRelevance: "Faible"
      },
      {
        name: "Fer (Mayoko-Moussondji)",
        type: "Industriel",
        annualProduction: "0 — suspendu",
        worldRank: "Non classé",
        reserves: "~1 milliard de tonnes",
        deposits: [
          {name: "Mayoko", location: "2.33°S, 12.81°E", stage: "Suspendu — Sundance Resources", nationality: "Australie", ownership: "Sundance Resources"}
        ],
        exportRevenue: "0",
        regulation: "Convention suspendue",
        crmaRelevance: "Modérée"
      }
    ],

    enterprises: [
      {name: "TotalEnergies Congo (E&P)", sector: "Pétrole", revenue: "~1.5 Mds USD (CG)", employees: "~600", ceo: "Direction TotalEnergies", shareholding: "TotalEnergies SE 53.5% (Moho)", listed: "Euronext (TTE)", hq: "Pointe-Noire / Paris"},
      {name: "Eni Congo", sector: "Pétrole & Gaz", revenue: "~800 M USD (CG)", employees: "~400", ceo: "Direction Eni", shareholding: "Eni SpA (opérateur)", listed: "Borsa Italiana (ENI)", hq: "Pointe-Noire / Rome"},
      {name: "SNPC (Société Nationale des Pétroles du Congo)", sector: "Pétrole (État)", revenue: "~500 M USD", employees: "~800", ceo: "DG gouvernemental", shareholding: "État CG 100%", listed: "Non coté", hq: "Brazzaville"},
      {name: "La Congolaise de Banque (LCB)", sector: "Banque", revenue: "~50 M USD", employees: "~400", ceo: "DG local", shareholding: "BNP Paribas 25%, État CG 75%", listed: "Non coté", hq: "Brazzaville"},
      {name: "MTN Congo", sector: "Télécoms", revenue: "~150 M USD", employees: "~300", ceo: "Direction MTN", shareholding: "MTN Group 99%", listed: "JSE (MTN)", hq: "Brazzaville / Johannesburg"}
    ],

    leaders: {
      headOfState: {name: "Denis Sassou Nguesso", since: "1979-1992 + 1997 à aujourd'hui", party: "PCT — Parti Congolais du Travail", nextElection: "2026"},
      headOfGov: {name: "Anatole Collinet Makosso", since: "2021", party: "PCT"},
      keyMinisters: [
        {portfolio: "Affaires Étrangères", name: "Jean-Claude Gakosso"},
        {portfolio: "Hydrocarbures", name: "Bruno Jean-Richard Itoua"},
        {portfolio: "Mines & Géologie", name: "Pierre Oba"},
        {portfolio: "Finances", name: "Jean-Baptiste Ondaye"}
      ],
      centralBankGov: {name: "Abbas Mahamat Tolli", institution: "BEAC"}
    },

    contacts: {
      chambers: ["Chambre de Commerce, d'Industrie, d'Agriculture et des Métiers de Congo (CCIAM)"],
      afd: "AFD Congo — Bureau Brazzaville",
      lawFirms: ["Cabinet Libongo & Partners", "Gide Loyrette Nouel Brazzaville"],
      patronat: "UNICONGO — Union des Entreprises du Congo"
    },

    universities: [
      {name: "Université Marien Ngouabi", city: "Brazzaville", students: "~25 000", specialties: "Droit, Sciences, Médecine"}
    ],
    literacyRate: "80%",

    demographics: {
      totalPopulation: "6.1 millions (2025)",
      growthRate: "2.6%/an",
      urbanPopulation: "67%",
      unemployment: "11% (officiel)",
      hdi: "0.571 — Rang 153/191",
      lifeExpectancy: "63 ans"
    },

    risks: {
      political: {score: 6, comment: "Sassou Nguesso — longévité au pouvoir. Stabilité formelle maintenue."},
      security: {score: 5, comment: "Piscine de Pool instable (milices Ninja). Reste du pays stable."},
      economic: {score: 6, comment: "Forte dépendance pétrolière (70% exports). Potasse futur levier."},
      regulatory: {score: 7, comment: "Corruption élevée (TI Score 21). Contrats opaques. BEAC supervise devises."},
      logistic: {score: 6, comment: "Port de Pointe-Noire (hub Afrique centrale). Rail Brazzaville-Pointe-Noire 510 km."},
      miningOpportunity: {score: 6, comment: "Pétrole (TotalEnergies, Eni), potasse (Sintoukola). Fer non exploité."},
      overallRisk: 6,
      overallOpportunity: 6,
      recommendation: "Pétrole et potasse — secteurs spécialisés avec risque de gouvernance"
    }
  },

  // ============================================================
  // 12. RDC 🇨🇩
  // ============================================================
  {
    id: "CD",
    name: "RDC — Congo-Kinshasa",
    officialName: "République Démocratique du Congo",
    flag: "🇨🇩",
    region: "africa",
    capital: "Kinshasa",
    area: "2 344 858 km²",
    population: "~105 millions (2025) — 3e Afrique",
    density: "44.8 hab/km²",
    gdpNominal: "~65 Mds USD (2025)",
    gdpPPP: "~130 Mds USD (2025)",
    gdpPerCapita: "~620 USD (l'un des plus bas du monde)",
    gdpGrowth: [
      {year: "2021", value: 6.2},
      {year: "2022", value: 8.8},
      {year: "2023", value: 8.4},
      {year: "2024", value: 6.5},
      {year: "2025", value: 6.8}
    ],
    inflation: "23.0% (2025)",
    debtToGDP: "18.6%",
    tradeBalance: "+4.5 Mds USD (surplus minier)",
    currency: "Franc congolais (CDF)",
    exchangeRateEUR: "1 EUR = 3 150 CDF",
    exchangeRateUSD: "1 USD = 2 900 CDF",
    corruptionIndex: "Score 20/100 — Rang 162/180 (TI 2024)",
    easeBusiness: "Rang 183/190 (World Bank 2020)",
    politicalStability: "-2.68 (World Bank 2023) — parmi les plus bas mondiaux",
    riskScore: 9,
    riskLabel: "Très élevé",
    recommendation: "Secteur minier critique mondial — engagement avec gestion risque extrême",

    industries: {
      gdpBySector: {
        agriculture: 20,
        industry: 33,
        services: 38,
        mining: 13.8,
      },
      keyIndustries: [
        {
          name: "Mines — Cobalt & Cuivre",
          description: "RDC = 75% de la production mondiale de cobalt et ~2.5 Mt/an de cuivre. Glencore, CMOC, Ivanhoe Mines opèrent à Kolwezi/Katanga. Cobalt critique pour batteries VE (chaîne d'approvisionnement UE).",
          share: "~30% PIB minier",
        },
        {
          name: "Hydroélectricité — Potentiel Inga",
          description: "Potentiel hydroélectrique estimé à 100 000 MW (le plus grand du monde). Inga I (351 MW) et Inga II (1 424 MW) opérationnels mais dégradés. Grand Inga III (4 800 MW) en projet. Fournirait de l'énergie à toute l'Afrique subsaharienne.",
          share: "Capacité installée actuelle : 2 800 MW",
        },
        {
          name: "Télécommunications",
          description: "Marché de 105 millions d'habitants. Mobile Money (M-Pesa via Vodacom) en forte croissance. 4G déployée dans les grandes villes. Fibre optique backbone en construction.",
          share: "~3% PIB",
        },
        {
          name: "Agriculture & Agro-industrie",
          description: "Café, huile de palme, caoutchouc, cacao. Potentiel agricole immense (80 M ha de terres arables dont 10% exploitées). Principalement subsistance. Agro-industrie émergente (FERONIA, plantations Kinshasa).",
          share: "20% PIB",
        },
        {
          name: "Coltan (Tantale-Niobium)",
          description: "RDC possède 64% des réserves mondiales de coltan. Extraction principalement artisanale au Kivu. Mineral critique pour l'électronique (condensateurs, smartphones, défense). Problématique des minerais de conflit.",
          share: "~2% PIB (sous-déclaré)",
        },
      ],
      sez: [
        {
          name: "ZES de Maluku",
          location: "Maluku, province de Kinshasa",
          advantages: "Zone Économique Spéciale dédiée à l'agro-industrie et à la transformation industrielle. Exonérations fiscales 10 ans, guichet unique investisseur. Accès fleuve Congo pour transport.",
        },
        {
          name: "ZES de Musoshi-Kasumbalesa",
          location: "Kasumbalesa, Haut-Katanga (frontière Zambie)",
          advantages: "Zone industrielle minière au cœur de la Copper Belt. Accès direct au corridor de Lobito. Transformation des minerais cuivre/cobalt sur place. Régime douanier préférentiel.",
        },
      ],
      majorProjects: [
        "Port en eau profonde de Banana (DP World, 2025–2028, investissement $350 M — premier port maritime RDC sur Atlantique)",
        "Corridor ferroviaire de Lobito (réhabilitation Kolwezi–Lobito, financement UE/USA $5 Mds, transport minerais Katanga vers Atlantique)",
        "Grand Inga III hydroélectrique (4 800 MW, études ADB/World Bank, partenariat TotalEnergies envisagé)",
        "Réhabilitation Route Nationale 1 Kinshasa–Matadi (Banque Mondiale, désenclavement Bas-Congo)",
        "Backbone fibre optique national (projet gouvernemental, liaison provinces, 5G préparation Kinshasa)",
        "Manono Lithium (AVZ Minerals, développement en suspens — litige ownership avec Dathomir/CATH en cours)",
        "Busanga Hydropower (240 MW, Lualaba — financement Sinohydro, mise en service 2025)",
      ],
      banking: {
        mainBanks: [
          "Rawbank (plus grande banque privée RDC, actionnaire Rawji Group)",
          "Equity BCDC (Equity Group Kenya 66.3%, fusion Ex-BCDC)",
          "TMB — Trust Merchant Bank (privé congolais, réseau national)",
          "FBN Bank RDC (FBN Holdings Nigeria)",
          "Bank of Africa RDC (BOA Group / BMCE)",
          "Sofibanque (privé congolais, Kinshasa)",
        ],
        totalAssets: "~8 Mds USD (système bancaire consolidé 2024)",
        bancarisation: "~8% de la population adulte (accès services bancaires formels)",
      },
      telecom: {
        operators: [
          "Vodacom Congo (M-Pesa mobile money, ~15M abonnés)",
          "Airtel RDC (Airtel Africa plc, ~12M abonnés)",
          "Orange RDC (~9M abonnés)",
          "Africell RDC (~6M abonnés)",
        ],
        mobilePenetration: "45% (2024)",
        internetPenetration: "23% (2024, principalement mobile)",
      },
      energy: {
        mix: "Hydroélectrique 96%, Thermique (diesel/gaz) 4%",
        installedCapacity: "2 800 MW (principalement Inga I 351 MW + Inga II 1 424 MW — vétustes, production effective ~1 200 MW)",
        renewableProjects: "Grand Inga III (4 800 MW — études en cours), Busanga (240 MW — mise en service 2025), Ruzizi III (147 MW partagé RDC/Rwanda/Burundi), Zongo II (150 MW)",
      },
    } ,

    logistics: {
      ports: [
        {
          name: "Port de Matadi",
          capacity: "~1 Mt/an marchandises générales, ~100 000 TEU/an",
          operator: "SCTP — Société Commerciale des Transports et des Ports (État RDC)",
          draft: "7m (accès limité grands navires — port fluvial Fleuve Congo)",
          note: "Principal port fluvial RDC, à 150 km de l'embouchure. Accès maritime limité par la profondeur.",
        },
        {
          name: "Port de Banana (Deep Sea — en construction)",
          capacity: "Capacité prévue : 350 000 TEU/an à terme",
          operator: "DP World (Dubai Ports World) — concession 30 ans",
          draft: "15m (eau profonde, accès directs navires Panamax)",
          note: "Premier port en eau profonde de RDC sur l'Atlantique. Investissement $350 M. Début construction 2025, livraison estimée 2028.",
        },
        {
          name: "Port de Boma",
          capacity: "~50 000 t/an marchandises diverses",
          operator: "SCTP / privé partiel",
          draft: "6m",
          note: "Port secondaire fluvial, Bas-Congo. Rôle de transit régional.",
        },
      ],
      airports: [
        {
          name: "Aéroport International de N'Djili (Kinshasa)",
          traffic: "~1.5 M passagers/an (2024)",
          freight: "~25 000 t fret/an",
        },
        {
          name: "Aéroport International de Luano (Lubumbashi)",
          traffic: "~500 000 passagers/an",
          freight: "~5 000 t fret/an",
        },
        {
          name: "Aéroport de Goma",
          traffic: "~300 000 passagers/an",
          freight: "~2 000 t fret/an",
        },
      ],
      railway: "Réseau SNCC (Société Nationale des Chemins de fer du Congo) : ~5 000 km mais majoritairement dégradé et inopérationnel. CFM (Chemin de Fer Matadi-Kinshasa) : 366 km — principal lien rail Kinshasa-Matadi. Extension Lobito corridor vers Kolwezi en cours (financé UE/USA).",
      roads: "~153 000 km dont seulement ~3% bitumés. Route Nationale 1 (Kinshasa-Matadi) réhabilitée partiellement. Accès à l'Est quasi-impossible en saison des pluies. Fleuve Congo = principale voie de transport intérieure (14 000 km navigables).",
      corridors: "Corridor de Lobito (Lobito Angola — Kolwezi RDC — Dar es Salaam, financement G7 $5 Mds). Northern Corridor (transit via Rwanda et Kenya). BEIRA Corridor (via Zimbabwe-Mozambique pour le Sud).",
      containerCost: "~3 800 USD/conteneur 20' import CIF Matadi (2024)",
      customsDelay: "15–30 jours (délais douaniers et congestion port Matadi — parmi les plus longs d'Afrique)",
      logisticZones: [
        "ZES Maluku (Kinshasa — agro-industrie)",
        "Kasumbalesa Free Trade Zone (Katanga — minerais)",
        "Zone Industrielle de Kinshasa (ZIK)",
      ],
      maritimeConnectivity: "Accès Atlantique via Matadi (fluvial, limité) ou en transit par Dar es Salaam (Tanzanie) et Durban (Afrique du Sud) pour minerais Katanga. Port Banana (DP World) changera la donne 2028.",
    } ,

    trade: {
      topExports: [
        { product: "Cuivre (cathodes et concentrés)", value: "~8 Mds USD", destination: "Chine (70%), UE, Inde" },
        { product: "Cobalt (minerai et raffiné)", value: "~10 Mds USD", destination: "Chine (90%), Corée du Sud, UE" },
        { product: "Or (officiel + transit)", value: "~2.5 Mds USD", destination: "Dubaï, Suisse, Afrique du Sud" },
        { product: "Diamants", value: "~300 M USD", destination: "Belgique (Anvers), Dubaï" },
        { product: "Coltan/Tantale", value: "~350 M USD", destination: "Chine, UE, USA" },
      ],
      topImports: [
        { product: "Machines et équipements miniers", value: "~3 Mds USD", origin: "Chine, UE, USA" },
        { product: "Produits alimentaires et denrées", value: "~2.5 Mds USD", origin: "Afrique du Sud, Kenya, UE" },
        { product: "Carburants et produits pétroliers", value: "~2 Mds USD", origin: "Angola, Nigeria, importation" },
        { product: "Véhicules et transport", value: "~1 Mds USD", origin: "Chine, Japon, UE" },
        { product: "Médicaments et équipements médicaux", value: "~500 M USD", origin: "UE, Inde" },
      ],
      tradeBalance: "+4.5 Mds USD (surplus minier, 2024)",
      fdiInward: {
        stock: "~19 Mds USD (2024)",
        flow: "~2.5 Mds USD/an",
        topInvestors: ["Chine", "Suisse (Glencore)", "Canada (Ivanhoe)", "Afrique du Sud", "Belgique", "USA"],
      },
      fdiOutward: "Très faible — moins de $100 M USD/an",
      tradeAgreements: [
        "ZLECAF (Zone de Libre-Échange Continentale Africaine — signataire)",
        "SADC (Protocole commercial SADC)",
        "COMESA (membre actif)",
        "EAC (adhésion 2022)",
        "ACP-UE (Accord de Cotonou / APE SADC)",
      ],
      taxRegime: {
        is: "IS 35% (taux standard entreprises — réductions secteur minier contractuelles)",
        tva: "TVA 16%",
        conventions: "Convention de double imposition avec : Belgique, Afrique du Sud, France (en négociation), Mauritius",
      },
      freeZones: "ZES Maluku (Kinshasa) — fiscalité réduite 10 ans. ZES Kasumbalesa (Katanga). Régime Code Minier 2018 avec royalties spécifiques (10% cobalt, 3.5% cuivre).",
      profitRepatriation: "Autorisée via Banque Centrale du Congo (BCC). Délais importants en pratique (30–60 jours). Contrôle des changes strict. USD = monnaie de facto pour grands contrats.",
      bit: "Traités bilatéraux d'investissement avec : USA, Belgique, France, Chine, Afrique du Sud, Corée du Sud, Allemagne (liste non exhaustive — ICSID arbitration disponible).",
    } ,

    billionaires: [
      {
        name: "Dan Gertler",
        fortune: "~1.5 Mds USD",
        source: "Mining — droits miniers cobalt/cuivre via DGI (Fleurette Group)",
        companies: "Fleurette Group, DGI (Dan Gertler International), participations Glencore (ex)",
        age: "51 ans (né 1973)",
        education: "Diplomé Tel Aviv — Business",
        bio: "Homme d'affaires israélo-congolais, proche de l'ex-président Kabila. A acquis des droits miniers majeurs (Katanga, Mutanda). Sous sanctions OFAC USA depuis 2017 (corruption présumée). Partiellement levées 2021 sous administration Trump.",
      },
      {
        name: "Moïse Katumbi",
        fortune: "~500 M USD (estimation)",
        source: "Mines (participations Katanga), immobilier, football (TP Mazembe)",
        companies: "Katanga Mining (participations), TP Mazembe FC, Hyppolite Mining, Immobilier Lubumbashi",
        age: "59 ans (né 1964)",
        education: "Business management, Afrique du Sud",
        bio: "Ancien gouverneur du Katanga (2007–2015). Leader politique d'opposition (Ensemble pour la République). Richesse construite dans le secteur minier du Katanga et la gestion du club de football continental TP Mazembe. En opposition à Tshisekedi.",
      },
      {
        name: "Albert Yuma Mulimbi",
        fortune: "Non disponible (influence économique majeure)",
        source: "Réseau minier — Gécamines (Président du CA), affiliations industrielles",
        companies: "Gécamines (Président Conseil Administration), Fédération des Entreprises du Congo (FEC)",
        age: "Non disponible",
        education: "Ingénieur et juriste",
        bio: "Figure clé de l'économie congolaise. Président du Conseil d'Administration de Gécamines (compagnie minière d'État), position permettant participation aux grandes décisions d'attribution minière. Président de la FEC (patronat RDC). Réseau complexe liant État et secteur privé minier.",
      },
      {
        name: "Sindika Dokolo",
        fortune: "~800 M USD (au décès en 2020)",
        source: "Collection d'art africain, investissements miniers Angola/RDC, réseau familial",
        companies: "Fondation Sindika Dokolo (art), participations diverses Angola/RDC",
        age: "Décédé en 2020 (48 ans)",
        education: "École de commerce, Danemark",
        bio: "Collecteur d'art africain de renommée internationale et homme d'affaires. Marié à Isabel dos Santos (Angola). Réseau d'affaires spanning RDC-Angola. Décédé lors d'un accident de plongée à Dubaï en 2020.",
      },
    ],


    timezone: "UTC+1 (Kinshasa) / UTC+2 (Est)",
    languages: "Français (officiel), Lingala, Kikongo, Swahili, Tshiluba",
    religions: "Christianisme (95.8%), Islam (1.5%)",
    memberships: ["UA", "SADC", "EAC", "CEEAC"],

    minerals: [
      {
        name: "Cobalt",
        type: "Critique — Batteries/Transition énergétique",
        annualProduction: "~170 000 t/an (2024) — 75% mondial",
        worldRank: "1er mondial (incontesté)",
        reserves: "~4.5 millions de tonnes",
        deposits: [
          {name: "Mutanda (Glencore)", location: "10.15°S, 26.12°E", stage: "Production", operator: "Glencore 100%", nationality: "Suisse/UK", ownership: "Glencore 100%"},
          {name: "Tenke Fungurume (CMOC)", location: "10.60°S, 26.10°E", stage: "Production", operator: "CMOC Group 80%, Gécamines 20%", nationality: "Chine/RDC", ownership: "CMOC 80%"},
          {name: "Kamoa-Kakula (Ivanhoe)", location: "10.87°S, 25.93°E", stage: "Production", operator: "Ivanhoe Mines 39.6%, Zijin 39.6%, Crystal River 9.5%", nationality: "Canada/Chine/Congo", ownership: "Ivanhoe co-opérateur"}
        ],
        exportRevenue: "~10 Mds USD",
        regulation: "Code minier 2018 (royalties 10% cobalt). Gécamines actionnaire mineur obligatoire.",
        crmaRelevance: "Maximale — Cobalt #1 sur liste CRM UE. Dependance critique UE."
      },
      {
        name: "Cuivre",
        type: "Industriel / Critique",
        annualProduction: "~2.5 Mt/an (2024) — 2e Afrique",
        worldRank: "2e Afrique (derrière Zambie), ~5e mondial",
        reserves: "~80 Mt",
        deposits: [
          {name: "Kamoa-Kakula", location: "10.87°S, 25.93°E", stage: "Production", operator: "Ivanhoe Mines / Zijin Mining", nationality: "Canada/Chine", ownership: "Ivanhoe 39.6%, Zijin 39.6%"},
          {name: "Tenke Fungurume", location: "10.60°S, 26.10°E", stage: "Production", operator: "CMOC Group", nationality: "Chine", ownership: "CMOC 80%, Gécamines 20%"},
          {name: "Kamoto (KCC — Glencore)", location: "10.87°S, 25.40°E", stage: "Production", operator: "Glencore 75%, Gécamines 25%", nationality: "Suisse", ownership: "Glencore opérateur"}
        ],
        exportRevenue: "~8 Mds USD",
        regulation: "Code minier 2018",
        crmaRelevance: "Très élevée — Cuivre critique pour transition énergétique UE"
      },
      {
        name: "Coltan (Columbite-Tantalite)",
        type: "Critique — Électronique/Défense",
        annualProduction: "~2 000 t/an",
        worldRank: "1er mondial",
        reserves: "~64% réserves mondiales (Kivu)",
        deposits: [
          {name: "Nord-Kivu / Sud-Kivu (artisanal)", location: "1.50°S, 29.00°E", stage: "Production artisanale + semi-industrielle", operator: "Artisanaux + PMH", nationality: "RDC", ownership: "Artisanal"}
        ],
        exportRevenue: "~350 M USD (officiel — sous-estimation)",
        regulation: "ITRI Tin Supply Chain Initiative (iTSCi). Problème conflits armés et minerais de sang.",
        crmaRelevance: "Maximale — Tantale sur liste CRM UE"
      },
      {
        name: "Lithium",
        type: "Critique — Batteries",
        annualProduction: "Non encore en production commerciale",
        worldRank: "Réserves estimées parmi les plus importantes mondiales",
        reserves: "Manono (Katanga) — ~400 Mt spodumène, teneur 1.65% Li₂O — projet majeur",
        deposits: [
          {name: "Manono (AVZ Minerals)", location: "7.31°S, 27.41°E", stage: "Développement — litiges AVZ vs Dathomir/CATH", operator: "AVZ Minerals (Australie)", nationality: "Australie/Chine", ownership: "AVZ 75%, Cominière 25%"}
        ],
        exportRevenue: "0 (non exploité commercialement)",
        regulation: "Code minier 2018. Litiges ownership en cours.",
        crmaRelevance: "Maximale — Lithium #1 sur liste CRM UE"
      },
      {
        name: "Or",
        type: "Précieux",
        annualProduction: "~45 t/an (officiel — sous-estimation, trafic important)",
        worldRank: "Top 10 Afrique",
        reserves: "Iturie, Nord-Kivu, Maniema",
        deposits: [
          {name: "Kibali (Ituri)", location: "3.63°N, 29.56°E", stage: "Production", operator: "AngloGold Ashanti 45%, Barrick Gold 45%, SOKIMO 10%", nationality: "Afrique du Sud/Canada/RDC", ownership: "AngloGold + Barrick co-opérateurs"}
        ],
        exportRevenue: "~2.5 Mds USD (officiel + informel)",
        regulation: "Code minier 2018",
        crmaRelevance: "Faible"
      }
    ],

    enterprises: [
      {name: "Glencore RDC (Mutanda, Kamoto)", sector: "Mines — Cobalt/Cuivre", revenue: "~6 Mds USD (RDC)", employees: "~15 000", ceo: "Gary Nagle (Glencore Global)", shareholding: "Glencore plc 100%", listed: "LSE (GLEN)", hq: "Kolwezi / Baar (Suisse)"},
      {name: "Ivanhoe Mines (Kamoa-Kakula)", sector: "Mines — Cuivre/Cobalt", revenue: "~3 Mds USD (RDC)", employees: "~10 000", ceo: "Marna Cloete", shareholding: "Ivanhoe 39.6%, Zijin 39.6%, Cominière (RDC) 20%", listed: "TSX/JSE (IVN)", hq: "Kolwezi / Vancouver"},
      {name: "CMOC Group (Tenke Fungurume)", sector: "Mines — Cobalt/Cuivre", revenue: "~3.5 Mds USD (RDC)", employees: "~8 000", ceo: "Li Chaochun", shareholding: "CMOC Group (Chine) 80%, Gécamines 20%", listed: "HKEX/SSE (603993)", hq: "Fungurume / Luoyang"},
      {name: "Gécamines (La Générale des Carrières et des Mines)", sector: "Mines — État", revenue: "~300 M USD (participations)", employees: "~5 000", ceo: "Guy Robert Lukama", shareholding: "État RDC 100%", listed: "Non coté", hq: "Lubumbashi"},
      {name: "AngloGold Ashanti / Barrick (Kibali)", sector: "Mines — Or", revenue: "~600 M USD (RDC)", employees: "~3 000", ceo: "AngloGold: Alberto Calderon / Barrick: Mark Bristow", shareholding: "AngloGold 45%, Barrick 45%, SOKIMO 10%", listed: "NYSE (AU/GOLD)", hq: "Durbuy / Ituri"},
      {name: "Equity BCDC (Banque)", sector: "Banque", revenue: "~200 M USD", employees: "~3 500", ceo: "DG local", shareholding: "Equity Group Kenya 66.3%", listed: "NSE (EQTY)", hq: "Kinshasa / Nairobi"},
      {name: "Airtel RDC", sector: "Télécoms", revenue: "~400 M USD", employees: "~500", ceo: "Direction Airtel Africa", shareholding: "Airtel Africa plc 100%", listed: "LSE (AAF)", hq: "Kinshasa / Londres"}
    ],

    leaders: {
      headOfState: {name: "Félix Tshisekedi", since: "2019 (réélu décembre 2023)", party: "UDPS — Union pour la Démocratie et le Progrès Social", nextElection: "Décembre 2028"},
      headOfGov: {name: "Jean-Michel Sama Lukonde (Premier Ministre)", since: "2024", party: "Coalition UDPS"},
      keyMinisters: [
        {portfolio: "Affaires Étrangères", name: "Thérèse Kayikwamba Wagner"},
        {portfolio: "Mines", name: "Kizito Pakabomba"},
        {portfolio: "Hydrocarbures", name: "Aimé Molendo Sakombi"},
        {portfolio: "Finances", name: "Jean-Michel Sama Lukonde"},
        {portfolio: "Défense", name: "Jean-Pierre Bemba Gombo"}
      ],
      centralBankGov: {name: "Jean-Marie Okito Oniankoy", institution: "Banque Centrale du Congo (BCC)"},
      miningAuthority: {name: "Non disponible", institution: "CTCPM — Cellule Technique de Coordination et de Planification Minière"}
    },

    contacts: {
      chambers: ["Fédération des Entreprises du Congo (FEC)", "Chambre de Commerce Belgo-Congolaise"],
      afd: "AFD RDC — Bureau Kinshasa",
      lawFirms: ["Gide Loyrette Nouel Kinshasa", "CMS Francis Lefebvre (partenaire local)", "Peter & Kim (Kinshasa)"],
      big4: ["Deloitte RDC", "PwC RDC (Kinshasa)", "EY RDC", "KPMG RDC"],
      patronat: "FEC — Fédération des Entreprises du Congo"
    },

    universities: [
      {name: "Université de Kinshasa (UNIKIN)", city: "Kinshasa", students: "~30 000", specialties: "Médecine, Droit, Sciences"},
      {name: "Université de Lubumbashi (UNILU)", city: "Lubumbashi", students: "~25 000", specialties: "Mines, Géologie, Polytechnique"},
      {name: "ISTA — Institut Supérieur des Techniques Appliquées", city: "Kinshasa", students: "~10 000", specialties: "Ingénierie, Informatique"}
    ],
    literacyRate: "80%",

    demographics: {
      totalPopulation: "105 millions (2025)",
      growthRate: "3.2%/an — l'une des plus fortes au monde",
      urbanPopulation: "47%",
      unemployment: "Non disponible (informel massif)",
      hdi: "0.481 — Rang 179/191",
      lifeExpectancy: "61 ans",
      languages: "Français (officiel), Lingala, Kikongo, Swahili, Tshiluba"
    },

    risks: {
      political: {score: 9, comment: "Tshisekedi réélu 2023 — légitimité contestée. Crise Est (M23, Rwanda implication)."},
      security: {score: 9, comment: "Conflit armé actif à l'Est (Kivu, Ituri). >100 groupes armés. MONUSCO. Mines de Kivu dans zone de conflit."},
      economic: {score: 7, comment: "Croissance forte (6-8%) tirée par cobalt. Pauvreté extrême massive."},
      regulatory: {score: 8, comment: "Code minier 2018 controversé (royalties 10% cobalt). Litiges fréquents. Corruption structurelle."},
      logistic: {score: 9, comment: "Infrastructures catastrophiques. Fleuve Congo logistique principale. Routes quasi-inexistantes à l'Est."},
      miningOpportunity: {score: 10, comment: "Cobalt #1 mondial (75%), cuivre, coltan, lithium (Manono), or. Pays = clé de la transition énergétique mondiale."},
      overallRisk: 9,
      overallOpportunity: 10,
      recommendation: "Secteur minier critique mondial — engagement avec gestion risque extrême"
    }
  },

  // ============================================================
  // 13. ANGOLA 🇦🇴
  // ============================================================
  {
    id: "AO",
    name: "Angola",
    officialName: "República de Angola",
    flag: "🇦🇴",
    region: "africa",
    capital: "Luanda",
    area: "1 246 700 km²",
    population: "~36 millions (2025)",
    density: "28.9 hab/km²",
    gdpNominal: "~80 Mds USD (2025)",
    gdpPPP: "~240 Mds USD (2025)",
    gdpPerCapita: "~2 220 USD",
    gdpGrowth: [
      {year: "2021", value: 1.2},
      {year: "2022", value: 3.5},
      {year: "2023", value: 1.0},
      {year: "2024", value: 3.2},
      {year: "2025", value: 3.5}
    ],
    inflation: "23.0% (2025)",
    debtToGDP: "88.0%",
    tradeBalance: "+18 Mds USD (surplus pétrolier)",
    currency: "Kwanza angolais (AOA)",
    exchangeRateEUR: "1 EUR = 1 050 AOA",
    exchangeRateUSD: "1 USD = 965 AOA",
    corruptionIndex: "Score 33/100 — Rang 116/180 (TI 2024)",
    easeBusiness: "Rang 173/190 (World Bank 2020)",
    politicalStability: "0.03 (World Bank 2023) — relatif",
    riskScore: 5,
    riskLabel: "Modéré",
    recommendation: "Hub pétrolier majeur — diversification à suivre sous Lourenço",

    industries: {
      gdpBySector: {
        agriculture: 8,
        industry: 55,
        services: 37,
        mining: 30,
      },
      keyIndustries: [
        {
          name: "Pétrole — #2 Afrique subsaharienne",
          description: "Angola = 2e producteur africain de pétrole (~1.1 M bpd en 2024). Principaux opérateurs : TotalEnergies (Block 17, Girassol, Dalia, Pazflor), Chevron (Block 0 Cabinda), BP (Block 18), Eni, ExxonMobil, CNOOC. Sonangol = compagnie nationale (participation obligatoire). Réserves ~8.5 Mds barils. Déclin progressif de la production sans nouvelles découvertes majeures.",
          share: "~30% PIB, ~95% revenus export",
        },
        {
          name: "Diamants — #4 mondial",
          description: "Angola = 4e producteur mondial de diamants (~8 M carats/an, revenus ~$2.1 Mds 2025). Principaux gisements : Catoca (Lunda Sul, ENDIAMA 41% + Alrosa 41%), Luele (Lunda Norte, Lucapa Diamond). ENDIAMA = compagnie nationale. Diamants angolais réputés pour haute qualité (gem quality élevé). Nouveau code minier 2022 sous Lourenço.",
          share: "~5% PIB, ~3% revenus export",
        },
        {
          name: "Terres Rares — Longonjo (Pensana PLC)",
          description: "Gisement de Longonjo (Huambo Province) = l'un des plus importants gisements de terres rares hors Chine. Pensana PLC (UK) = opérateur. Oxyde de néodyme-praséodyme (NdPr) pour aimants permanents VE. Production démarrée 2024–2025. Chaîne de valeur planifiée jusqu'à Humber Refinery (UK). Hautement stratégique pour UE (liste CRM).",
          share: "Émergent — <1% PIB actuel",
        },
        {
          name: "Hydroélectricité — Laúca & Caculo Cabaça",
          description: "Angola = potentiel hydroélectrique majeur (~150 GW estimé). Laúca Dam (2 070 MW, opérationnel 2017–2024) = plus grand barrage d'Afrique sub-saharienne. Caculo Cabaça (2 172 MW, construction en cours — China Three Gorges/CCCC). Capanda (520 MW), Cambambe (960 MW). Objectif d'exporter électricité vers pays voisins.",
          share: "Secteur énergie ~3% PIB (en expansion)",
        },
        {
          name: "Pêche & Économie maritime",
          description: "Angola possède 1 600 km de côtes Atlantique. Industrie de la pêche importante (sardines, thon, crustacés). Exportations poissons ~$300 M/an. Pêche artisanale et industrielle. Potentiel transformé insuffisamment exploité.",
          share: "~2% PIB",
        },
      ],
      sez: [
        {
          name: "ZEE de Luanda-Bengo",
          location: "Province de Bengo, 30 km nord de Luanda",
          advantages: "Zona Económica Especial Luanda-Bengo. Créée 2006. Industries manufacturières, agro-industrie, textile, montage auto. Exonérations IS 10–15 ans, droits douane 0% importations équipement. Infrastructure dédiée. ~160 entreprises installées.",
        },
        {
          name: "ZEE de Viana",
          location: "Viana (banlieue industrielle de Luanda)",
          advantages: "Zone industrielle de Viana — industries légères, montage, logistique. Proximité port de Luanda. Infrastructure routière. Préférentiel pour industries de substitution aux importations.",
        },
        {
          name: "Lobito Free Trade Zone (en planification)",
          location: "Lobito, Province de Benguela",
          advantages: "Zone franche en développement autour du hub du Corridor de Lobito. Terminus du Benguela Railway (CFB). Transformation minerais, logistique, industries légères. Financement UE/USA dans le cadre du Lobito Atlantic Railway Partnership.",
        },
      ],
      majorProjects: [
        "Corridor de Lobito — Benguela Railway (CFB 1 344 km Lobito–frontière RDC/Zambie, financement USA+UE $5 Mds, extension vers Kolwezi 2026–2028)",
        "Caculo Cabaça Hydroelectric (2 172 MW sur Kwanza — China Three Gorges Corp, mise en service prévue 2027)",
        "NAIL — Novo Aeroporto Internacional de Luanda (15 M pax capacité, construction avancée, livraison partielle 2025–2026)",
        "Longonjo REE Mine — Phase 2 (Pensana PLC, terres rares NdPr, production en cours 2025, export UK Humber Refinery)",
        "Soyo LNG Expansion (Angola LNG — TotalEnergies/Chevron/BP/Eni/Sonangol, augmentation capacité)",
        "Luanda Bay Deep Sea Port (projet modernisation/extension port Luanda — appel d'offres DP World)",
        "Namibe New City Project (développement industriel côte sud)",
      ],
      banking: {
        mainBanks: [
          "BAI — Banco Angolano de Investimentos (#1 banque Angola par actifs, privé)",
          "BFA — Banco de Fomento Angola (BPI Portugal 48.1% + UNITEL/privé angolais)",
          "BPC — Banco de Poupança e Crédito (État Angola 100%)",
          "BIC — Banco BIC Angola (actionnaires privés angolais + Isabel dos Santos ex)",
          "Standard Bank Angola (Standard Bank Afrique du Sud 70%)",
        ],
        totalAssets: "~40 Mds USD (système bancaire consolidé 2024 — le plus important d'Afrique centrale-australe hors Afrique du Sud)",
        bancarisation: "35% de la population adulte (accès services bancaires formels)",
      },
      telecom: {
        operators: [
          "Unitel (#1 marché Angola, fondé Isabel dos Santos, nationalisé partiellement — actionnariat: Sonangol 25%, Portugal Telecom 25%, CTH 25%, Geni 25%)",
          "Movicel (Angola Telecom/État — #2 marché)",
          "Africell Angola (Africell Group, nouveau entrant)",
        ],
        mobilePenetration: "45% (2024)",
        internetPenetration: "30% (2024 — en croissance via 4G Luanda)",
      },
      energy: {
        mix: "Hydroélectrique 65%, Gaz naturel 25%, Pétrole/Thermique 10%",
        installedCapacity: "~6 500 MW (2024 — dont Laúca 2 070 MW, Capanda 520 MW, Cambambe 960 MW)",
        renewableProjects: "Caculo Cabaça (2 172 MW — Three Gorges, 2027), Soyo Gas-to-Power (gaz naturel 750 MW), solaire Benguela (50 MW), éolien côtier (études)",
      },
    } ,

    logistics: {
      ports: [
        {
          name: "Port de Luanda",
          capacity: "~800 000 TEU/an, 15 Mt marchandises diverses",
          operator: "ANGT — Angola National Grains Terminal + Sonils (conteneurs), Port Administration Luanda",
          draft: "12m",
          note: "Principal port Angola. Très congestionné historiquement. Modernisation en cours. Hub import national et hub pétrolier offshore.",
        },
        {
          name: "Port de Lobito",
          capacity: "~500 000 TEU/an (capacité après modernisation)",
          operator: "Gestão do Porto do Lobito — concession partielle Arise IIP",
          draft: "12m",
          note: "2e port Angola. Terminus du Benguela Railway (Corridor de Lobito vers RDC/Zambie). Hub stratégique pour minerais Copper Belt. Investissements USA+UE massifs.",
        },
        {
          name: "Port de Namibe (Moçâmedes)",
          capacity: "~3 Mt vrac sec, 30 000 TEU",
          operator: "Administration Port de Namibe (État)",
          draft: "10m",
          note: "Port sud Angola. Exportation minerai de fer (Cassinga). Développement futur pour pêche industrielle et export mineral.",
        },
        {
          name: "Terminal pétrolier de Cabinda",
          capacity: "~600 000 b/j capacité terminal (pétrole brut offshore)",
          operator: "Chevron (CABGOC) + Sonangol",
          draft: "SPM (Single Point Mooring — terminal offshore)",
          note: "Terminal export pétrole brut Block 0 (Cabinda). Enclave politique.",
        },
      ],
      airports: [
        {
          name: "Aéroport International Quatro de Fevereiro de Luanda (LAD)",
          traffic: "~3 M passagers/an (2024)",
          freight: "~50 000 t fret/an",
        },
        {
          name: "NAIL — Novo Aeroporto Internacional de Luanda (en construction)",
          traffic: "Capacité prévue : 15 M passagers/an — livraison partielle 2025–2026",
          freight: "~150 000 t fret/an (prévision)",
        },
        {
          name: "Aéroport International du Lubango",
          traffic: "~100 000 passagers/an",
          freight: "~1 000 t fret/an",
        },
      ],
      railway: "Benguela Railway (CFB) : 1 344 km (Lobito–Luau frontière RDC) — réhabilité par China Rail (2015). Corridor de Lobito = extension vers Kolwezi RDC + Kitwe Zambie (en cours, financé USA+UE). CFL (Caminho de Ferro de Luanda) : 440 km (Luanda–Malanje). Réhabilitation partielle en cours.",
      roads: "~76 000 km dont ~25 000 km bitumés. Amélioration post-guerre civile (fin 2002). Routes nationales principales en bon état (Luanda–Lobito–Namibe). Intérieur encore difficile.",
      corridors: "Corridor de Lobito (Lobito Angola–Kolwezi RDC–Dar es Salaam Tanzanie, G7/UE/USA financement $5 Mds). Corridor Luanda–Malanje (CFL, développement). Liaison Cabinda (enclave — maritime).",
      containerCost: "~2 200 USD/conteneur 20' import CIF Luanda (2024)",
      customsDelay: "10–15 jours (Luanda — amélioration Alfândegas Angola)",
      logisticZones: [
        "ZEE Luanda-Bengo (zone industrielle)",
        "Port de Lobito — Lobito Corridor Hub",
        "Soyo Industrial Zone (LNG + pétrochimie)",
      ],
      maritimeConnectivity: "Accès direct Atlantique Sud — 1 600 km côtes. Hub pétrolier offshore (blocs 0, 15, 17, 18). Liaisons régulières vers Europe (Rotterdam, Anvers), Chine (Qingdao), USA (Houston). MSC, CMA-CGM, Maersk desservent Luanda et Lobito.",
    } ,

    trade: {
      topExports: [
        { product: "Pétrole brut", value: "~30 Mds USD", destination: "Chine (60%), Inde, USA, Europe" },
        { product: "Diamants (gem quality)", value: "~2.1 Mds USD (2025)", destination: "Belgique (Anvers), Dubaï, USA" },
        { product: "Produits pétroliers raffinés (Soyo LNG)", value: "~2 Mds USD", destination: "Asie, Europe, Amériques" },
        { product: "Terres rares NdPr (Longonjo démarrage)", value: "~100 M USD (2025)", destination: "UK (Humber Refinery), UE, Asie" },
        { product: "Poissons et produits de la mer", value: "~300 M USD", destination: "UE, Chine, régional" },
      ],
      topImports: [
        { product: "Machines et équipements industriels", value: "~3 Mds USD", origin: "Chine, UE (Portugal, France), USA" },
        { product: "Produits alimentaires et boissons", value: "~2.5 Mds USD", origin: "Portugal, Brésil, Afrique du Sud" },
        { product: "Produits pétroliers raffinés", value: "~2 Mds USD", origin: "Nigeria, importation internationale" },
        { product: "Véhicules et transport", value: "~1.5 Mds USD", origin: "Portugal, Chine, Japon, USA" },
        { product: "Médicaments et équipements médicaux", value: "~500 M USD", origin: "Portugal, Brésil, UE" },
      ],
      tradeBalance: "+18 Mds USD (surplus pétrolier massif, 2024)",
      fdiInward: {
        stock: "~30 Mds USD (2024)",
        flow: "~6 Mds USD/an (dont ~5 Mds secteur pétrolier)",
        topInvestors: ["USA (Chevron, ExxonMobil)", "France (TotalEnergies)", "UK (BP)", "Chine (CNOOC, China Three Gorges)", "Italie (Eni)", "Portugal (BFA, BCP)"],
      },
      fdiOutward: "~$200 M USD/an (Sonangol participations Afrique, investissements Lourenço en cours)",
      tradeAgreements: [
        "ZLECAF (signataire, implémentation en cours)",
        "SADC (Protocole commercial — membre actif)",
        "CEEAC (Communauté Économique des États de l'Afrique Centrale)",
        "OPEP (membre actif)",
        "ACP-UE (Accord de Cotonou — APE SADC en discussion)",
      ],
      taxRegime: {
        is: "IS 25% (standard). IS 15% pour ZEE. Petroleum Income Tax 65.75% (pétrolier, inclus royalties et participations Sonangol). Impôt industriel 35% (secteur minier non pétrolier).",
        tva: "TVA 14% (IVA — Imposto sobre o Valor Acrescentado)",
        conventions: "Conventions de double imposition : Portugal, Italie, Chine, France, Russie, Brésil, Allemagne, Afrique du Sud, Namibie, Botswana.",
      },
      freeZones: "ZEE Luanda-Bengo (zone franche industrielle). ZEE Viana. Lobito Free Trade Zone (en développement). Régimes contractuels pétroliers (Production Sharing Agreements — PSA — standard industrie).",
      profitRepatriation: "Autorisée via Banco Nacional de Angola (BNA). Kwanza (AOA) inconvertible — transactions pétrolières en USD. Difficultés pratiques de rapatriement kwanza-USD hors secteur pétrolier. BNA contrôle change.",
      bit: "Traités bilatéraux d'investissement avec : Portugal, UK, Allemagne, Italie, Espagne, France, Russie, Chine, Cuba, Brésil (ICSID disponible). Lei do Investimento Privado 2018 (Lourenço) = cadre libéralisé.",
    } ,

    billionaires: [
      {
        name: "Isabel dos Santos",
        fortune: "~1.5–3 Mds USD (estimations variables, actifs en grande partie gelés)",
        source: "Télécoms (Unitel), banque (BIC/Efacec), diamants, pétrole — ancienne DG Sonangol",
        companies: "Unitel (ex-fondatrice), BIC Angola, Efacec Portugal (ex), Zahara (retail), participations diverses Angola/Portugal/UK",
        age: "51 ans (née 1973)",
        education: "King's College London (Ingénierie électrique)",
        bio: "Fille aînée de José Eduardo dos Santos (président 1979–2017). Longtemps présentée comme la femme la plus riche d'Afrique. DG de Sonangol brièvement (2016–2017). Mandat d'arrêt angolais pour détournement de fonds (Luanda Leaks, ICIJ 2020). Actifs gelés Angola et Portugal. Résidant actuellement à Dubaï.",
      },
      {
        name: "Leopoldino 'Dino' do Nascimento",
        fortune: "~3 Mds USD (estimation — fortune opaque)",
        source: "Réseaux militaires/pétroliers, télécoms, immobilier — général et homme d'affaires",
        companies: "Jovitelecomunicações (télécoms), Videotex (services), participations Unitel (indirect), immobilier Luanda",
        age: "Non disponible",
        education: "Militaire — Académie Militaire Angola",
        bio: "Général de l'armée angolaise (retraité), ministre des Communications sous dos Santos. Considéré comme l'un des hommes les plus riches d'Angola via des réseaux opaques liant militaire, pétrole et télécoms. Dans le viseur des réformes anti-corruption de Lourenço.",
      },
      {
        name: "Manuel Vicente",
        fortune: "Non disponible (réseaux politiques pétroliers)",
        source: "Pétrole — ex-PDG Sonangol (2000–2012), ex-Vice-Président Angola (2012–2017)",
        companies: "Sonangol (ex-PDG), participations pétrolières diverses Angola et international",
        age: "69 ans (né 1957)",
        education: "Ingénierie pétrolière, formation Portugal",
        bio: "Architecte de la Sonangol moderne. PDG Sonangol 2000–2012, Vice-Président Angola 2012–2017. Mis en cause dans affaire de corruption au Portugal (liée à Operação Fizz — 2017). Illustre les liens entre pouvoir politique angolais et compagnie pétrolière nationale.",
      },
      {
        name: "Carlos São Vicente",
        fortune: "~1 Mds USD (actifs partiellement gelés)",
        source: "Assurance (ENSA — Empresa Nacional de Seguros), investissements divers",
        companies: "ENSA — Empresa Nacional de Seguros de Angola, participations Unitel, immobilier",
        age: "Non disponible",
        education: "Non disponible",
        bio: "Homme d'affaires angolais lié au régime dos Santos via le secteur des assurances. ENSA = principale compagnie d'assurance Angola. Actifs partiellement gelés dans le cadre des réformes anti-corruption Lourenço depuis 2017.",
      },
    ],


    timezone: "UTC+1",
    languages: "Portugais (officiel), Umbundu, Kimbundu, Kikongo",
    religions: "Christianisme (90%), Islam (1.5%), Animisme (8.5%)",
    memberships: ["UA", "SADC", "CEEAC", "OPEP"],

    minerals: [
      {
        name: "Pétrole",
        type: "Hydrocarbures",
        annualProduction: "~1.2 M b/j (2024) — 2e Afrique subsaharienne",
        worldRank: "2e Afrique subsaharienne",
        reserves: "~8.5 milliards de barils",
        deposits: [
          {name: "Block 0 (Cabinda Enclave)", location: "Offshore Cabinda", stage: "Production", operator: "Chevron (39.2%), Sonangol (41%)", nationality: "USA/Angola", ownership: "Chevron opérateur"},
          {name: "Block 17 (Girassol, Dalia, Pazflor)", location: "Offshore Luanda", stage: "Production", operator: "TotalEnergies 40%, Sonangol 20%", nationality: "France/Angola", ownership: "TotalEnergies opérateur"},
          {name: "Block 18 (Plutão, Saturno, Vénus)", location: "Offshore", stage: "Production", operator: "BP 50%, Sonangol 20%", nationality: "UK/Angola", ownership: "BP opérateur"}
        ],
        exportRevenue: "~30 Mds USD",
        regulation: "Lei das Actividades Petrolíferas 2004. Sonangol participation obligatoire.",
        crmaRelevance: "Faible"
      },
      {
        name: "Diamants",
        type: "Précieux",
        annualProduction: "~8 M carats/an (2024) — 6e mondial",
        worldRank: "6e mondial",
        reserves: "Lunda Norte, Lunda Sul, Malanje",
        deposits: [
          {name: "Catoca (Lunda Sul)", location: "9.44°S, 20.30°E", stage: "Production", operator: "ENDIAMA 41%, Alrosa 41%", nationality: "Angola/Russie", ownership: "ENDIAMA + Alrosa"},
          {name: "Luele (Lunda Norte)", location: "8.41°S, 19.99°E", stage: "Développement — Lucapa Diamond", nationality: "Australie", ownership: "Lucapa Diamond Co."}
        ],
        exportRevenue: "~1.5 Mds USD",
        regulation: "Code minier 2011. ENDIAMA — Empresa Nacional de Diamantes.",
        crmaRelevance: "Faible"
      },
      {
        name: "Minerai de fer (Cassinga)",
        type: "Industriel",
        annualProduction: "~500 000 t/an (partiel)",
        worldRank: "Non classé",
        reserves: "~3 milliards de tonnes (Cassinga — Huíla)",
        deposits: [
          {name: "Cassinga", location: "16.05°S, 16.03°E", stage: "Production limitée", operator: "Ferrangol EP (Angola) + partenaires", nationality: "Angola", ownership: "État AO"}
        ],
        exportRevenue: "~50 M USD",
        regulation: "Code minier 2011",
        crmaRelevance: "Modérée"
      }
    ],

    enterprises: [
      {name: "Sonangol (Sociedade Nacional de Combustíveis)", sector: "Pétrole & Gaz", revenue: "~25 Mds USD", employees: "~15 000", ceo: "Sebastião Pai Mankenda", shareholding: "État AO 100%", listed: "Non coté", hq: "Luanda"},
      {name: "TotalEnergies Angola", sector: "Pétrole offshore", revenue: "~5 Mds USD (AO)", employees: "~2 000", ceo: "Direction TotalEnergies", shareholding: "TotalEnergies SE (opérateur B17)", listed: "Euronext (TTE)", hq: "Luanda / Paris"},
      {name: "Chevron Angola (CABGOC)", sector: "Pétrole offshore", revenue: "~6 Mds USD (AO)", employees: "~3 000", ceo: "Direction Chevron", shareholding: "Chevron Corp 39.2% (B0)", listed: "NYSE (CVX)", hq: "Luanda / San Ramon"},
      {name: "BP Angola", sector: "Pétrole offshore", revenue: "~3 Mds USD (AO)", employees: "~1 500", ceo: "Direction BP", shareholding: "BP plc 50% (B18)", listed: "LSE (BP)", hq: "Luanda / Londres"},
      {name: "ENDIAMA (Empresa Nacional de Diamantes)", sector: "Mines — Diamants", revenue: "~800 M USD", employees: "~3 000", ceo: "DG gouvernemental", shareholding: "État AO 100%", listed: "Non coté", hq: "Luanda"},
      {name: "Banco BIC Angola", sector: "Banque", revenue: "~300 M USD", employees: "~3 500", ceo: "Fernando Teles", shareholding: "Isabel dos Santos (ex) + divers privés", listed: "Non coté", hq: "Luanda"},
      {name: "Unitel (Télécoms)", sector: "Télécoms mobile", revenue: "~600 M USD", employees: "~1 500", ceo: "Direction", shareholding: "Sonangol 25%, Portugal Telecom 25%, CTH 25%, Geni 25%", listed: "Non coté", hq: "Luanda"}
    ],

    leaders: {
      headOfState: {name: "João Lourenço", since: "2017 (réélu 2022)", party: "MPLA — Movimento Popular de Libertação de Angola", nextElection: "2027"},
      headOfGov: {name: "João Lourenço (Président exécutif)", since: "2017", party: "MPLA"},
      keyMinisters: [
        {portfolio: "Affaires Étrangères", name: "Téte António"},
        {portfolio: "Finances", name: "Vera Daves de Sousa"},
        {portfolio: "Mines & Pétrole", name: "Diamantino Azevedo"},
        {portfolio: "Planification & Développement", name: "Sérgio Mankenda"},
        {portfolio: "Défense", name: "João de Matos"}
      ],
      centralBankGov: {name: "Manuel Tiago Dias", institution: "Banco Nacional de Angola (BNA)"}
    },

    contacts: {
      chambers: ["Câmara de Comércio e Indústria de Angola (CCIA)"],
      afd: "AFD Angola — Bureau Luanda",
      lawFirms: ["Miranda & Associados Angola", "Gómez-Acebo & Pombo Angola", "Garrigues Angola"],
      patronat: "Confederação das Associações Económicas de Angola (CAEA)"
    },

    universities: [
      {name: "Universidade Agostinho Neto (UAN)", city: "Luanda", students: "~80 000", specialties: "Droit, Médecine, Sciences"},
      {name: "Universidade Católica de Angola (UCAN)", city: "Luanda", students: "~15 000", specialties: "Économie, Droit, Ingénierie"}
    ],
    literacyRate: "71%",

    demographics: {
      totalPopulation: "36 millions (2025)",
      growthRate: "3.2%/an — très forte",
      urbanPopulation: "68%",
      unemployment: "30% (réel)",
      hdi: "0.586 — Rang 148/191",
      lifeExpectancy: "62 ans"
    },

    risks: {
      political: {score: 4, comment: "Lourenço — réformes anti-corruption (prosecution Isabel dos Santos). MPLA stable 50 ans."},
      security: {score: 3, comment: "Pays post-guerre civile (fin 2002). Sécurité maintenue. Enclave Cabinda — risque limité."},
      economic: {score: 6, comment: "Forte dépendance pétrolière (95% exports). Kwanza volatil. Inflation 23%."},
      regulatory: {score: 5, comment: "Réformes d'attraction des IDE sous Lourenço. Lei do Investimento Privado 2018."},
      logistic: {score: 5, comment: "Port de Luanda modernisé. Lobito Atlantic Railway (corridor vers Zambie/RDC)."},
      miningOpportunity: {score: 7, comment: "Pétrole #2 Afrique, diamants (#6 mondial), fer. Corridor Lobito — hub transport."},
      overallRisk: 5,
      overallOpportunity: 7,
      recommendation: "Hub pétrolier majeur — diversification à suivre sous Lourenço"
    }
  },

  // ============================================================
  // 14. MALI 🇲🇱
  // ============================================================
  {
    id: "ML",
    name: "Mali",
    officialName: "République du Mali",
    flag: "🇲🇱",
    region: "africa",
    capital: "Bamako",
    area: "1 241 238 km²",
    population: "~23 millions (2025)",
    density: "18.5 hab/km²",
    gdpNominal: "~19 Mds USD (2025)",
    gdpPPP: "~52 Mds USD (2025)",
    gdpPerCapita: "~826 USD",
    gdpGrowth: [
      {year: "2021", value: 3.1},
      {year: "2022", value: 3.7},
      {year: "2023", value: 3.5},
      {year: "2024", value: 4.0},
      {year: "2025", value: 4.5}
    ],
    inflation: "4.5% (2025)",
    debtToGDP: "55.0%",
    tradeBalance: "-1.5 Mds USD",
    currency: "Franc CFA BCEAO (XOF)",
    exchangeRateEUR: "1 EUR = 655.96 XOF (fixe)",
    exchangeRateUSD: "1 USD = ~604 XOF",
    corruptionIndex: "Score 27/100 — Rang 137/180 (TI 2024)",
    easeBusiness: "Rang 148/190 (World Bank 2020)",
    politicalStability: "-2.80 (World Bank 2023) — l'un des plus bas",
    riskScore: 9,
    riskLabel: "Très élevé — Transition militaire + conflit jihadiste",
    recommendation: "Secteur or isolable — risque pays extrêmement élevé",
    timezone: "UTC+0",
    languages: "Français (officiel), Bambara (lingua franca), Fulfulde, Soninké",
    religions: "Islam (93.9%), Christianisme (2.8%), Animisme (2.0%)",
    memberships: ["UA", "CEDEAO (suspendue)", "OCI", "AES — Alliance des États du Sahel"],

    minerals: [
      {
        name: "Or",
        type: "Précieux",
        annualProduction: "~65 t/an (2024) — 3e Afrique",
        worldRank: "3e Afrique, ~10e mondial",
        reserves: "Réserves estimées >500 Moz (toutes catégories)",
        deposits: [
          {name: "Loulo-Gounkoto (Barrick)", location: "13.68°N, 10.38°W", stage: "Production", operator: "Barrick Gold 80%", nationality: "Canada", ownership: "Barrick 80%, État ML 20%"},
          {name: "Morila (Firefinch/Endeavour)", location: "11.20°N, 7.79°W", stage: "Production", operator: "Firefinch Ltd / Mali Lithium", nationality: "Australie", ownership: "Firefinch 80%, État ML 20%"},
          {name: "Fekola (B2Gold)", location: "14.97°N, 10.19°W", stage: "Production", operator: "B2Gold Corp 80%", nationality: "Canada", ownership: "B2Gold 80%, État ML 20%"},
          {name: "Syama (Resolute Mining)", location: "10.38°N, 8.41°W", stage: "Production", operator: "Resolute Mining 80%", nationality: "Australie", ownership: "Resolute 80%"}
        ],
        exportRevenue: "~3 Mds USD (70% exports)",
        regulation: "Code minier 2023 révisé. Nationalisation partielle accélérée (junte augmente part État). Arrestation cadres Barrick 2024.",
        crmaRelevance: "Faible"
      },
      {
        name: "Lithium (Bougouni, Morila)",
        type: "Critique — Batteries",
        annualProduction: "0 — en développement",
        worldRank: "Non classé",
        reserves: "~30 Mt Li₂O (Bougouni — Kodal Minerals)",
        deposits: [
          {name: "Bougouni", location: "11.42°N, 7.48°W", stage: "Développement avancé", operator: "Kodal Minerals (UK/Chine joint venture)", nationality: "UK/Chine", ownership: "Kodal Minerals 51%, Hainan Mining 49%"}
        ],
        exportRevenue: "0 (non exploité)",
        regulation: "Code minier 2023",
        crmaRelevance: "Très élevée — Lithium sur liste CRM UE"
      },
      {
        name: "Coton",
        type: "Agricole industriel",
        annualProduction: "~700 000 t coton-graine/an",
        worldRank: "2e Afrique (après Bénin)",
        reserves: "Agriculture",
        deposits: [{name: "Zone Office du Niger + Sud Mali", location: "Centre et Sud Mali", stage: "Production", operator: "CMDT (Compagnie Malienne de Développement des Textiles)", nationality: "Mali", ownership: "État + partenaires"}],
        exportRevenue: "~400 M USD",
        regulation: "CMDT",
        crmaRelevance: "Faible"
      }
    ],

    enterprises: [
      {name: "Barrick Gold Loulo-Gounkoto", sector: "Mines — Or", revenue: "~1.2 Mds USD (ML)", employees: "~3 500", ceo: "Mark Bristow (Barrick)", shareholding: "Barrick 80%, État ML 20%", listed: "NYSE/TSX (GOLD)", hq: "Kayes / Toronto"},
      {name: "B2Gold Fekola", sector: "Mines — Or", revenue: "~600 M USD (ML)", employees: "~2 500", ceo: "Clive Johnson (B2Gold)", shareholding: "B2Gold 80%, État ML 20%", listed: "TSX/NYSE (BTO)", hq: "Kéniéba / Vancouver"},
      {name: "CMDT (Compagnie Malienne de Développement des Textiles)", sector: "Agriculture — Coton", revenue: "~400 M USD", employees: "~2 000", ceo: "DG gouvernemental", shareholding: "État ML 60%, partenaires 40%", listed: "Non coté", hq: "Bamako"},
      {name: "Banque Nationale de Développement Agricole (BNDA)", sector: "Banque", revenue: "~80 M USD", employees: "~700", ceo: "DG gouvernemental", shareholding: "État ML + AFD", listed: "Non coté", hq: "Bamako"},
      {name: "Orange Mali", sector: "Télécoms", revenue: "~200 M USD", employees: "~400", ceo: "Direction Orange", shareholding: "Orange SA 70%", listed: "Euronext (ORA)", hq: "Bamako"}
    ],

    leaders: {
      headOfState: {name: "Assimi Goïta", since: "2021 (coup mai 2021 — second coup)", party: "CNSP / CNT — Conseil National de Transition", nextElection: "Transition — pas d'échéance claire. CEDEAO suspendu."},
      headOfGov: {name: "Choguel Kokalla Maïga", since: "2021", party: "Alliance politique de la transition"},
      keyMinisters: [
        {portfolio: "Affaires Étrangères", name: "Abdoulaye Diop"},
        {portfolio: "Mines", name: "Amadou Keïta"},
        {portfolio: "Économie & Finances", name: "Alousséni Sanou"},
        {portfolio: "Défense", name: "Sadio Camara"}
      ],
      centralBankGov: {name: "Siège BCEAO Dakar", institution: "BCEAO — Directeur national Mali"}
    },

    contacts: {
      chambers: ["Chambre de Commerce et d'Industrie du Mali (CCIM)"],
      afd: "AFD Mali — Bureau Bamako",
      lawFirms: ["Cabinet Ballo & Associés (Bamako)"],
      patronat: "CNPM — Conseil National du Patronat du Mali"
    },

    universities: [
      {name: "Université des Sciences Sociales et de Gestion de Bamako (USSGB)", city: "Bamako", students: "~30 000", specialties: "Droit, Sciences économiques"},
      {name: "Université des Sciences et Techniques de Bamako (USTB)", city: "Bamako", students: "~15 000", specialties: "Sciences, Ingénierie"}
    ],
    literacyRate: "35%",

    demographics: {
      totalPopulation: "23 millions (2025)",
      growthRate: "3.0%/an",
      urbanPopulation: "45%",
      unemployment: "6.7% (officiel — sous-emploi massif)",
      hdi: "0.400 — Rang 188/191",
      lifeExpectancy: "59 ans"
    },

    risks: {
      political: {score: 10, comment: "Junte militaire (Goïta). Alliance avec Wagner/Russie/AES. Rupture CEDEAO/France."},
      security: {score: 10, comment: "Conflit jihadiste majeur (JNIM, EIGS) — >60% territoire sous influence groupes armés. Massacres civils."},
      economic: {score: 7, comment: "Embargo CEDEAO levé 2023. Économie en crise. Or = seule vraie ressource d'export."},
      regulatory: {score: 9, comment: "Junte nationalise ressources (Barrick arrêtés 2024). Renégociation forcée des mines. Risque expropriation."},
      logistic: {score: 8, comment: "Pays enclavé. Infrastructure routière dégradée. Accès limité par conflits."},
      miningOpportunity: {score: 7, comment: "Or #3 Afrique (Barrick, B2Gold). Lithium Bougouni potentiel. Accès difficile côté sécuritaire."},
      overallRisk: 9,
      overallOpportunity: 5,
      recommendation: "Secteur or isolable — risque pays extrêmement élevé"
    }
  },

  // ============================================================
  // 15. BURKINA FASO 🇧🇫
  // ============================================================
  {
    id: "BF",
    name: "Burkina Faso",
    officialName: "Burkina Faso",
    flag: "🇧🇫",
    region: "africa",
    capital: "Ouagadougou",
    area: "274 222 km²",
    population: "~23 millions (2025)",
    density: "83.8 hab/km²",
    gdpNominal: "~18.5 Mds USD (2025)",
    gdpPPP: "~50 Mds USD (2025)",
    gdpPerCapita: "~805 USD",
    gdpGrowth: [
      {year: "2021", value: 6.9},
      {year: "2022", value: 1.8},
      {year: "2023", value: 3.5},
      {year: "2024", value: 3.8},
      {year: "2025", value: 4.0}
    ],
    inflation: "4.8% (2025)",
    debtToGDP: "59.5%",
    tradeBalance: "-800 M USD",
    currency: "Franc CFA BCEAO (XOF)",
    exchangeRateEUR: "1 EUR = 655.96 XOF (fixe)",
    exchangeRateUSD: "1 USD = ~604 XOF",
    corruptionIndex: "Score 42/100 — Rang 78/180 (TI 2024)",
    easeBusiness: "Rang 151/190 (World Bank 2020)",
    politicalStability: "-2.50 (World Bank 2023)",
    riskScore: 9,
    riskLabel: "Très élevé — Conflit jihadiste actif",
    recommendation: "Éviter nouvelles opérations — risque sécuritaire extrême",
    timezone: "UTC+0",
    languages: "Français (officiel), Mooré, Dioula, Fulfulde",
    religions: "Islam (60.5%), Christianisme (23.2%), Animisme (15.3%)",
    memberships: ["UA", "CEDEAO (suspendue)", "UEMOA", "AES"],

    minerals: [
      {
        name: "Or",
        type: "Précieux",
        annualProduction: "~55 t/an (2024) — mais mines attaquées",
        worldRank: "4e Afrique",
        reserves: ">1 000 Moz ressources totales identifiées",
        deposits: [
          {name: "Boungou (Houndé Belt)", location: "10.43°N, 1.27°W", stage: "Production perturbée", operator: "Endeavour Mining 90%", nationality: "Canada/UK", ownership: "Endeavour Mining"},
          {name: "Mana (Sanbrado)", location: "12.08°N, 2.50°W", stage: "Production", operator: "West African Resources 100%", nationality: "Australie", ownership: "WAF 100%"},
          {name: "Essakane", location: "14.63°N, 0.50°W", stage: "Production", operator: "IAMGOLD 90%", nationality: "Canada", ownership: "IAMGOLD 90%, État BF 10%"}
        ],
        exportRevenue: "~3 Mds USD (mines industrielles + artisanales)",
        regulation: "Code minier 2015. Junte Traoré augmente pression sur opérateurs (retrait Barrick, pression Endeavour).",
        crmaRelevance: "Faible"
      },
      {
        name: "Manganèse (Tambao)",
        type: "Industriel",
        annualProduction: "0 — transport impossible (sécurité)",
        worldRank: "Non classé",
        reserves: "~14 Mt (Tambao — haute teneur 49% Mn)",
        deposits: [
          {name: "Tambao", location: "14.83°N, 0.10°E", stage: "Suspendu — zone de conflit", operator: "Pan African Minerals (projet bloqué)", nationality: "UK", ownership: "Non opérationnel"}
        ],
        exportRevenue: "0",
        regulation: "Convention suspendue",
        crmaRelevance: "Élevée si exploité"
      },
      {
        name: "Coton",
        type: "Agricole industriel",
        annualProduction: "~300 000 t (réduit — conflits)",
        worldRank: "3e Afrique",
        reserves: "Agriculture",
        deposits: [{name: "Sud et Ouest Burkina", location: "Zones Sud/Ouest", stage: "Production réduite", operator: "SOFITEX / Faso Coton", nationality: "Burkina + CIC (France)", ownership: "État + privé"}],
        exportRevenue: "~300 M USD",
        regulation: "SOFITEX",
        crmaRelevance: "Faible"
      }
    ],

    enterprises: [
      {name: "Endeavour Mining (Boungou/Houndé)", sector: "Mines — Or", revenue: "~500 M USD (BF)", employees: "~2 500", ceo: "Ian Cockerill", shareholding: "Endeavour Mining plc 90%", listed: "TSX/LSE (EDV)", hq: "Ouagadougou / Londres"},
      {name: "IAMGOLD Essakane", sector: "Mines — Or", revenue: "~400 M USD (BF)", employees: "~2 000", ceo: "Renaud Adams (IAMGOLD)", shareholding: "IAMGOLD 90%, État BF 10%", listed: "TSX/NYSE (IMG)", hq: "Essakane / Toronto"},
      {name: "West African Resources Sanbrado", sector: "Mines — Or", revenue: "~300 M USD (BF)", employees: "~1 500", ceo: "Richard Hyde", shareholding: "WAF 100%", listed: "ASX (WAF)", hq: "Ouagadougou / Perth"},
      {name: "SOFITEX (Société Burkinabè de Fibre Textile)", sector: "Coton", revenue: "~300 M USD", employees: "~800", ceo: "DG gouvernemental", shareholding: "État BF 35%, CIC-B 30%, DAGRIS 35%", listed: "Non coté", hq: "Bobo-Dioulasso"},
      {name: "Coris Bank International Burkina", sector: "Banque", revenue: "~100 M USD", employees: "~1 000", ceo: "PDG Idrissa Nassa", shareholding: "Nassa Family (BF) + institutionnels", listed: "BRVM (CBIBF)", hq: "Ouagadougou"}
    ],

    leaders: {
      headOfState: {name: "Ibrahim Traoré", since: "Octobre 2022 (2e coup — renversement Sandaogo Damiba)", party: "MPSR-2 / Alliance des États du Sahel (AES)", nextElection: "Transition — calendrier indéfini"},
      headOfGov: {name: "Apollinaire Joachimson Kyélem de Tambèla", since: "2022", party: "Indépendant (technocrate)"},
      keyMinisters: [
        {portfolio: "Affaires Étrangères", name: "Jean-Marie Ouédraogo"},
        {portfolio: "Mines & Carrières", name: "Simon-Pierre Boussim"},
        {portfolio: "Finances", name: "Aboubakar Nacanabo"},
        {portfolio: "Défense", name: "Kassoum Coulibaly"}
      ],
      centralBankGov: {name: "Siège BCEAO Dakar", institution: "BCEAO — Directeur national Burkina"}
    },

    contacts: {
      chambers: ["Chambre de Commerce et d'Industrie du Burkina Faso (CCI-BF)"],
      afd: "AFD Burkina — Bureau Ouagadougou (activités réduites)",
      patronat: "CCIA-BF — Confédération du Commerce, de l'Industrie et de l'Artisanat du Burkina Faso"
    },

    universities: [
      {name: "Université Joseph Ki-Zerbo", city: "Ouagadougou", students: "~50 000", specialties: "Sciences, Droit, Lettres"},
      {name: "Université Nazi Boni", city: "Bobo-Dioulasso", students: "~20 000", specialties: "Sciences agronomiques, Santé"}
    ],
    literacyRate: "46%",

    demographics: {
      totalPopulation: "23 millions (2025)",
      growthRate: "2.9%/an",
      urbanPopulation: "31%",
      unemployment: "5.7% (officiel — sous-emploi massif)",
      hdi: "0.449 — Rang 185/191",
      lifeExpectancy: "62 ans"
    },

    risks: {
      political: {score: 10, comment: "Junte Traoré (22 ans) — alliance Russie/Wagner, rupture France. AES avec Mali/Niger."},
      security: {score: 10, comment: "Plus de 40% territoire hors contrôle État. >2.3 M déplacés. Attaques mines actives (Boungou)."},
      economic: {score: 7, comment: "Or = 80% exports. UEMOA préserve CFA mais crise humanitaire massive."},
      regulatory: {score: 9, comment: "Junte renégocie mines. Pression sur Barrick (départ). Expropriations possibles."},
      logistic: {score: 9, comment: "Routes coupées dans le Nord et l'Est. Supply mines sécurisée par convois armés."},
      miningOpportunity: {score: 6, comment: "Or abondant (4e Afrique). Manganèse (Tambao) bloqué. Risque sécuritaire = désinvestissement majeur."},
      overallRisk: 9,
      overallOpportunity: 4,
      recommendation: "Éviter nouvelles opérations — risque sécuritaire extrême"
    }
  },

  // ============================================================
  // 16. NIGER 🇳🇪
  // ============================================================
  {
    id: "NE",
    name: "Niger",
    officialName: "République du Niger",
    flag: "🇳🇪",
    region: "africa",
    capital: "Niamey",
    area: "1 267 000 km²",
    population: "~27 millions (2025) — croissance démographique la plus rapide du monde",
    density: "21.3 hab/km²",
    gdpNominal: "~17.5 Mds USD (2025)",
    gdpPPP: "~43 Mds USD (2025)",
    gdpPerCapita: "~648 USD",
    gdpGrowth: [
      {year: "2021", value: 1.4},
      {year: "2022", value: 11.8},
      {year: "2023", value: 3.5},
      {year: "2024", value: 4.2},
      {year: "2025", value: 7.5}
    ],
    inflation: "5.8% (2025)",
    debtToGDP: "56.0%",
    tradeBalance: "-800 M USD (uranium + pétrole vs importations)",
    currency: "Franc CFA BCEAO (XOF)",
    exchangeRateEUR: "1 EUR = 655.96 XOF (fixe)",
    exchangeRateUSD: "1 USD = ~604 XOF",
    corruptionIndex: "Score 33/100 — Rang 116/180 (TI 2024)",
    easeBusiness: "Rang 132/190 (World Bank 2020)",
    politicalStability: "-1.50 (World Bank 2023)",
    riskScore: 9,
    riskLabel: "Très élevé — Transition militaire + jihadisme",
    recommendation: "Uranium et pétrole stratégiques — engagement état-à-état uniquement",
    timezone: "UTC+1",
    languages: "Français (officiel), Haoussa, Zarma, Fulfulde, Touareg",
    religions: "Islam (99%)",
    memberships: ["UA", "CEDEAO (suspendue)", "OCI", "AES"],

    minerals: [
      {
        name: "Uranium",
        type: "Énergie nucléaire — Critique",
        annualProduction: "~2 000 t/an (2024, réduit depuis 2020)",
        worldRank: "5-7e mondial",
        reserves: "~280 000 t U₃O₈ (Arlit, Imouraren)",
        deposits: [
          {name: "Arlit (SOMAÏR)", location: "18.74°N, 7.39°E", stage: "Production", operator: "Orano (ex-Areva) 63.6%, SOPAMIN 36.4%", nationality: "France/Niger", ownership: "Orano opérateur"},
          {name: "Akouta (COMINAK)", location: "19.08°N, 7.30°E", stage: "Fermé 2021 (épuisement)", operator: "Orano 34%, SOPAMIN 31%", nationality: "France/Niger/Japon", ownership: "Orano"},
          {name: "Imouraren", location: "17.30°N, 8.00°E", stage: "Développement bloqué — plus grand gisement Afrique (>180 000 t U)", operator: "Orano 66.65%", nationality: "France", ownership: "Orano"}
        ],
        exportRevenue: "~500 M USD",
        regulation: "Contrats Orano renégociés par junte 2023. CNSP demande révision — 'ressource souveraine'.",
        crmaRelevance: "Maximale — Uranium critique pour énergie nucléaire EU (sécurité energétique)"
      },
      {
        name: "Pétrole (Agadem)",
        type: "Hydrocarbures",
        annualProduction: "~100 000 b/j (2024, oléoduc Niger-Bénin ouvert)",
        worldRank: "Non classé",
        reserves: "~1 milliard de barils (Agadem)",
        deposits: [
          {name: "Agadem (CNPC)", location: "15.55°N, 13.20°E", stage: "Production + export via oléoduc", operator: "CNPC (Chine) 80%, SONIDEP 20%", nationality: "Chine/Niger", ownership: "CNPC opérateur"}
        ],
        exportRevenue: "~500 M USD (montée en puissance oléoduc)",
        regulation: "Code pétrolier. SONIDEP (Société Nigérienne de Pétrole).",
        crmaRelevance: "Faible"
      },
      {
        name: "Or (Samira, Tabakorét)",
        type: "Précieux",
        annualProduction: "~10 t/an",
        worldRank: "Non classé",
        reserves: "Potentiel Liptako-Gourma (zone AES)",
        deposits: [
          {name: "Samira Hill", location: "14.15°N, 0.87°E", stage: "Production", operator: "Endeavour Mining (ancienne SEMAFO)", nationality: "Canada/UK", ownership: "Endeavour 80%, État NE 20%"}
        ],
        exportRevenue: "~200 M USD",
        regulation: "Code minier",
        crmaRelevance: "Faible"
      }
    ],

    enterprises: [
      {name: "Orano Niger (SOMAÏR/Imouraren)", sector: "Mines — Uranium", revenue: "~300 M USD (NE)", employees: "~3 000", ceo: "Direction Orano (Paris)", shareholding: "Orano SA 63.6%, SOPAMIN 36.4%", listed: "Non coté (Orano nationalisé France)", hq: "Arlit / Paris"},
      {name: "CNPC Niger (Agadem)", sector: "Pétrole", revenue: "~400 M USD (NE)", employees: "~2 000", ceo: "Direction CNPC", shareholding: "CNPC 80%, SONIDEP 20%", listed: "HKEX (857.HK)", hq: "Niamey / Beijing"},
      {name: "SONIDEP (Société Nigérienne de Pétrole)", sector: "Pétrole — État", revenue: "~100 M USD", employees: "~500", ceo: "DG gouvernemental", shareholding: "État NE 100%", listed: "Non coté", hq: "Niamey"},
      {name: "SOPAMIN (Société du Patrimoine des Mines du Niger)", sector: "Mines — État", revenue: "Participations minières", employees: "~200", ceo: "DG gouvernemental", shareholding: "État NE 100%", listed: "Non coté", hq: "Niamey"},
      {name: "Ecobank Niger", sector: "Banque", revenue: "~30 M USD", employees: "~200", ceo: "DG local", shareholding: "ETI (Ecobank)", listed: "NSE (ETI)", hq: "Niamey"}
    ],

    leaders: {
      headOfState: {name: "Abdourahamane Tchiani", since: "Juillet 2023 (coup d'État — renversement Bazoum)", party: "CNSP — Conseil National pour la Sauvegarde de la Patrie", nextElection: "Transition — 3 ans annoncés"},
      headOfGov: {name: "Ali Mahaman Lamine Zeine", since: "2023", party: "Technocrate — CNSP"},
      keyMinisters: [
        {portfolio: "Affaires Étrangères", name: "Bakary Yaou Sangaré"},
        {portfolio: "Mines", name: "Oumarou Guiro"},
        {portfolio: "Finances", name: "Moumouni Saidou"},
        {portfolio: "Pétrole", name: "Mahaman Moustapha Barké"}
      ],
      centralBankGov: {name: "Siège BCEAO Dakar", institution: "BCEAO — Directeur national Niger"}
    },

    contacts: {
      chambers: ["Chambre de Commerce, d'Agriculture, d'Industrie et d'Artisanat du Niger (CCIAN)"],
      afd: "AFD Niger — Bureau Niamey (activités réduites post-coup)",
      patronat: "CNPA-Niger — Conseil National du Patronat"
    },

    universities: [
      {name: "Université Abdou Moumouni (UAM)", city: "Niamey", students: "~25 000", specialties: "Sciences, Droit, Lettres"}
    ],
    literacyRate: "37%",

    demographics: {
      totalPopulation: "27 millions (2025)",
      growthRate: "3.8%/an — la plus élevée au monde",
      urbanPopulation: "17%",
      unemployment: "Non disponible",
      hdi: "0.394 — Rang 189/191 (avant-dernier mondial)",
      lifeExpectancy: "62 ans"
    },

    risks: {
      political: {score: 9, comment: "Junte CNSP (Tchiani). Bazoum détenu. Alliance AES (Mali, Burkina). ECOWAS sanctions."},
      security: {score: 9, comment: "Jihadistes (JNIM, EIGS) actifs aux frontières Mali, Burkina, Nigeria. Agadem zone risque."},
      economic: {score: 8, comment: "Uranium = ressource stratégique UE. Pétrole montée (oléoduc Bénin). Embargo CEDEAO levé partiellement."},
      regulatory: {score: 9, comment: "Nationalisation ressources annoncée. Orano sous pression. Expulsion base militaire française."},
      logistic: {score: 8, comment: "Enclavé. Oléoduc Niger-Bénin (2024) = rupture stratégique. Routes interdites au Nord."},
      miningOpportunity: {score: 7, comment: "Uranium = clé nucléaire UE (30% approvisionnement historique). Pétrole Agadem. Or limité."},
      overallRisk: 9,
      overallOpportunity: 6,
      recommendation: "Uranium et pétrole stratégiques — engagement état-à-état uniquement"
    }
  },

  // ============================================================
  // 17. RWANDA 🇷🇼
  // ============================================================
  {
    id: "RW",
    name: "Rwanda",
    officialName: "République du Rwanda",
    flag: "🇷🇼",
    region: "africa",
    capital: "Kigali",
    area: "26 338 km²",
    population: "~14 millions (2025)",
    density: "531 hab/km²",
    gdpNominal: "~14 Mds USD (2025)",
    gdpPPP: "~38 Mds USD (2025)",
    gdpPerCapita: "~1 010 USD",
    gdpGrowth: [
      {year: "2021", value: 10.9},
      {year: "2022", value: 8.2},
      {year: "2023", value: 8.3},
      {year: "2024", value: 7.5},
      {year: "2025", value: 7.2}
    ],
    inflation: "~5.0% (2025)",
    debtToGDP: "71%",
    tradeBalance: "-2.5 Mds USD",
    currency: "Franc rwandais (RWF)",
    exchangeRateEUR: "1 EUR = 1 290 RWF",
    exchangeRateUSD: "1 USD = 1 185 RWF",
    corruptionIndex: "Score 54/100 — Rang 50/180 (TI 2024) — meilleur d'Afrique subsaharienne",
    easeBusiness: "Rang 38/190 (World Bank 2020)",
    politicalStability: "0.05 (World Bank 2023)",
    riskScore: 4,
    riskLabel: "Modéré-Faible",
    recommendation: "Investir — hub tech et minéraux critiques",

    industries: {
      gdpBySector: {
        agriculture: 20,
        industry: 22,
        services: 52,
        mining: 4,
      },
      keyIndustries: [
        {
          name: "ICT & Services numériques — hub tech africain",
          description: "Secteur ICT = 19% de croissance annuelle, 2e contributeur au PIB. Kigali = hub tech reconnu mondialement. Partenariats avec Google DeepMind, IBM, NVIDIA, Carnegie Mellon Africa (CMU-Africa). Rwanda Coding Academy. Kigali Innovation City (smart hub). Ambition AI hub continental. Startups tech en forte croissance.",
          share: "~10% PIB (ICT+services numériques)",
        },
        {
          name: "Mines — 3TG (Étain, Tantale, Tungstène, Or)",
          description: "Rwanda = hub régional de traçabilité des minéraux 3T (tin/tantalum/tungsten). Production propre + transit RDC controversé. Étain (cassitérite) ~5 000 t Sn/an. Tantale (coltan) ~3 000 t/an. Tungstène (wolframite) ~1 500 t WO₃/an. Or ~10 t officielles (+ transit RDC). Rwanda Mining Board = régulateur reconnu pour traçabilité (ITSCI, OECD Due Diligence).",
          share: "~4% PIB minier direct",
        },
        {
          name: "Tourisme — haut de gamme gorilles & MICE",
          description: "Tourisme = pilier économique. Gorilles de montagne (Parc des Volcans) = principale attraction mondiale haut de gamme. Kigali = destination MICE (Meetings, Incentives, Conferences, Exhibitions) continental — Kigali Convention Centre. Revenus touristiques ~$500 M en 2024. Rwanda = destination 'Africa's Singapore' image.",
          share: "~8% PIB",
        },
        {
          name: "Agriculture — café et thé d'excellence",
          description: "Café Rwanda = standard international de qualité (specialty coffee). Exportations café +32% en 2025. Thé rwandais exportations +100% en 2025. OCIR-Café et OCIR-Thé = régulateurs. Base ~80% de la population rurale (pays très rural malgré urbanisation rapide).",
          share: "20% PIB",
        },
        {
          name: "Construction & BTP",
          description: "Boom immobilier Kigali (Green City Kigali, zones résidentielles). Infrastructure publique (routes, Bugesera Airport). Forte croissance portée par investissements publics et IDE.",
          share: "~8% PIB (industrie BTP)",
        },
      ],
      sez: [
        {
          name: "Kigali Special Economic Zone (KSEZ)",
          location: "Masoro, Kigali",
          advantages: "Zone économique spéciale opérationnelle depuis 2011. Exonérations IS jusqu'à 7 ans, TVA 0% sur imports d'équipement, guichet unique. Parcs industriels, entrepôts, bureaux. Hub logistique et manufacturing pour East Africa. 120+ entreprises installées.",
        },
        {
          name: "Kigali Innovation City (KIC)",
          location: "Kigali (Kicukiro District)",
          advantages: "Smart tech hub dédié à l'innovation numérique et à la R&D. CMU-Africa sur site. Partenariats NVIDIA, IBM. Incubateurs startups. Visas rapides pour tech entrepreneurs. Zone franche fiscale pour entreprises tech.",
        },
        {
          name: "Bugesera Industrial Park",
          location: "District de Bugesera (30 km de Kigali)",
          advantages: "Parc industriel dédié agro-industrie et industries légères. Proximité nouvel aéroport international Bugesera (en construction). Terrains industriels à tarifs préférentiels.",
        },
      ],
      majorProjects: [
        "Bugesera International Airport (7 M pax capacité, financement Qatar Airways/GovRW, livraison partielle 2026)",
        "Kigali Innovation City — Phase 2 (CMU-Africa expansion, NVIDIA AI Lab, smart campus 2027)",
        "Green City Kigali (développement urbain durable 30 000 logements — Groupe CDG Maroc + GovRW)",
        "Standard Gauge Railway (SGR Dar es Salaam–Isaka–Kigali, 1 400 km — faisabilité EAC en cours)",
        "Ruzizi III Hydroelectric Project (147 MW — partagé RDC/Rwanda/Burundi, financement NELSAP-CU/BAfD)",
        "Lake Kivu Methane Extraction (KivuWatt Phase 2 — ContourGlobal, +25 MW)",
        "Hakan Peat Power Plant (80 MW — Hakan Mining, Bugesera peat-to-power)",
      ],
      banking: {
        mainBanks: [
          "BK Group / Bank of Kigali (#1 banque Rwanda, cotée RSE, CEO Diane Karusisi)",
          "I&M Bank Rwanda (I&M Holdings Kenya)",
          "Equity Bank Rwanda (Equity Group Kenya)",
          "COGEBANQUE — Compagnie Générale de Banque",
          "Access Bank Rwanda (Access Bank Nigeria)",
        ],
        totalAssets: "~5 Mds USD (système bancaire consolidé 2024)",
        bancarisation: "93% inclusion financière (mobile money MoMo MTN + Airtel Money comptés — accès services financiers formels ou mobiles)",
      },
      telecom: {
        operators: [
          "MTN Rwanda (MTN Group 80%) — leader marché",
          "Airtel Rwanda (Airtel Africa)",
          "Telcom Rwanda / kT Rwanda Networks (Korea Telecom 51%)",
        ],
        mobilePenetration: "85% (2024)",
        internetPenetration: "62% (2024 — l'un des plus élevés d'Afrique subsaharienne)",
      },
      energy: {
        mix: "Hydroélectrique 45%, Méthane (Lake Kivu) 15%, Solaire 7%, Diesel/Thermique 33%",
        installedCapacity: "~280 MW (2024 — en expansion rapide)",
        renewableProjects: "Ruzizi III (147 MW partagé, financement NELSAP), Hakan Peat (80 MW), KivuWatt Phase 2 (25 MW méthane), solaire Akagera (30 MW), solaire résidentiel expansion",
      },
    } ,



    billionaires: [
      {
        name: "Tribert Rujugiro Ayabatwa",
        fortune: "~500 M USD (estimation)",
        source: "Tabac (Pan African Tobacco Group), mines, immobilier",
        companies: "Pan African Tobacco Group (PAT — 15 pays africains), Trans-Century Ltd, participations diverses",
        age: "~75 ans",
        education: "Économie/Commerce, formation internationale",
        bio: "L'un des plus riches hommes d'affaires rwandais en diaspora. Fondateur du Pan African Tobacco Group, leader du tabac en Afrique de l'Est et centrale. Basé à Kampala (Ouganda). Relations complexes avec le régime Kagame — exil forcé puis réconciliation partielle. Actif également dans l'immobilier et l'industrie minière.",
      },
      {
        name: "Hatari Sekoko",
        fortune: "Non disponible",
        source: "Investissements liés Crystal Ventures Ltd (bras économique FPR)",
        companies: "Crystal Ventures Ltd (holding FPR — agro-industrie, construction, tech), Inyange Industries",
        age: "Non disponible",
        education: "Non disponible",
        bio: "Crystal Ventures Ltd = holding d'investissement lié au Front Patriotique Rwandais (parti au pouvoir). Gère un portefeuille diversifié : Inyange Industries (agroalimentaire), Ruliba Clays (matériaux), constructions. Revenus estimés >$500 M USD. Opère sous supervision du parti/État.",
      },
      {
        name: "Paul Kagame",
        fortune: "Personnelle non disponible (pouvoir politique, non fortune personnelle déclarée)",
        source: "Président de la République Rwanda — pouvoir politique et économique",
        companies: "Aucune participation directe déclarée — contrôle indirect Crystal Ventures/FPR",
        age: "67 ans (né 1957)",
        education: "Command and Staff College Uganda, Fort Leavenworth (USA)",
        bio: "Président du Rwanda depuis 2000 (vice-président de facto dès 1994). Artisan de la reconstruction post-génocide. Politique économique libérale (Doing Business #38). Rwanda = modèle de gouvernance africaine reconnu (WEF, FMI). Relations tendues avec RDC sur la question M23.",
      },
    ],


    timezone: "UTC+2",
    languages: "Kinyarwanda, Anglais, Français (officiels), Swahili",
    religions: "Christianisme (93.4%), Islam (4.6%), Autres (2%)",
    memberships: ["UA", "EAC", "SADC", "Commonwealth"],

    minerals: [
      {
        name: "Coltan (Tantale/Niobium)",
        type: "Critique — Électronique/Défense",
        annualProduction: "~3 000 t/an coltan (dont transit RDC)",
        worldRank: "2e exportateur mondial (dont re-exports RDC)",
        reserves: "Réserves propres + transit régional",
        deposits: [
          {name: "Zones minières Ouest Rwanda (Nyamasheke, Karongi)", location: "2.35°S, 29.12°E", stage: "Production artisanale", operator: "Artisanaux + négociants", nationality: "Rwanda", ownership: "Artisanal + Coopératives"}
        ],
        exportRevenue: "~250 M USD",
        regulation: "ITSCI traçabilité. Rwanda Mining Board. Standards OCDE diligence raisonnable.",
        crmaRelevance: "Très élevée — Tantale sur liste CRM UE"
      },
      {
        name: "Cassitérite (Étain)",
        type: "Industriel — Critique",
        annualProduction: "~5 000 t Sn contenu/an",
        worldRank: "Top 5 Afrique",
        reserves: "Zones Western Province, Northern Province",
        deposits: [
          {name: "Zones minières Rwanda", location: "Province de l'Ouest et du Nord", stage: "Production", operator: "Alphamin Resources (Bisie — limite Congo) + artisanaux", nationality: "Canada/Rwanda", ownership: "Mixte"}
        ],
        exportRevenue: "~200 M USD",
        regulation: "Rwanda Mining Board. Standards OECD Due Diligence.",
        crmaRelevance: "Élevée — Étain sur liste CRM UE"
      },
      {
        name: "Wolframite (Tungstène)",
        type: "Industriel — Critique",
        annualProduction: "~1 500 t WO₃ contenu/an",
        worldRank: "2e Afrique",
        reserves: "Zones Bugesera, Nyamasheke",
        deposits: [
          {name: "Zones tungstène Rwanda", location: "Multiple zones", stage: "Production artisanale", operator: "Artisanaux + Wolf Minerals (UK)", nationality: "Rwanda/UK", ownership: "Mixte"}
        ],
        exportRevenue: "~80 M USD",
        regulation: "Rwanda Mining Board. OECD Due Diligence.",
        crmaRelevance: "Très élevée — Tungstène sur liste CRM UE"
      },
      {
        name: "Or",
        type: "Précieux",
        annualProduction: "~10 t/an (officiel + re-exports RDC)",
        worldRank: "Non classé parmi top producteurs propres",
        reserves: "Zones Eastern Province",
        deposits: [
          {name: "Zones aurifères Eastern Province", location: "Kabarore, Gatsibo", stage: "Production artisanale + formelle", operator: "Artisanaux + RMB Resources", nationality: "Rwanda", ownership: "Mixte"}
        ],
        exportRevenue: "~400 M USD (incluant transit RDC)",
        regulation: "Rwanda Mining Board. OECD Due Diligence. Accusations de transit illicite or RDC.",
        crmaRelevance: "Modérée"
      }
    ],

    enterprises: [
      {name: "Rwanda Mining Board (RMB)", sector: "Mines — Régulation & promotion", revenue: "Agence gouvernementale", employees: "200+", ceo: "Francis Gatare (CEO)", shareholding: "État 100%", listed: "Non coté", founded: "2010", hq: "Kigali", website: "rmb.gov.rw"},
      {name: "Inyange Industries", sector: "Agroalimentaire", revenue: "~150 M USD", employees: "800", ceo: "Non disponible", shareholding: "Crystal Ventures Ltd (bras économique FPR)", listed: "Non coté", founded: "1998", hq: "Kigali", website: "inyange.rw"},
      {name: "Bank of Kigali (BK)", sector: "Banque", revenue: "~250 M USD", employees: "3 500", ceo: "Diane Karusisi", shareholding: "Rwanda Social Security Board + actionnaires institutionnels", listed: "RSE (BK)", founded: "1966", hq: "Kigali", website: "bk.rw"},
      {name: "MTN Rwanda", sector: "Télécommunications", revenue: "~200 M USD", employees: "400", ceo: "Mitwa Ng'ambi", shareholding: "MTN Group 80%, Gouvernement Rwanda", listed: "RSE", founded: "1998", hq: "Kigali", website: "mtn.co.rw"},
      {name: "RwandAir", sector: "Transport aérien", revenue: "~200 M USD", employees: "1 000", ceo: "Yvonne Manzi Makolo", shareholding: "État 100%", listed: "Non coté", founded: "2002", hq: "Kigali", website: "rwandair.com"},
      {name: "Africa50 (co-investisseur)", sector: "Infrastructure / Finance", revenue: "Fonds d'infrastructure", employees: "N/A", ceo: "Alain Ebobissé", shareholding: "UA + Banques centrales africaines", listed: "Non coté", founded: "2015", hq: "Casablanca (Pan-African)", website: "africa50.com"},
      {name: "Kigali International Financial Centre", sector: "Finance / Tech Hub", revenue: "Agence de promotion", employees: "50", ceo: "Nick Barigye", shareholding: "État Rwanda", listed: "Non coté", founded: "2020", hq: "Kigali", website: "kifc.rw"}
    ],

    leaders: {
      headOfState: {name: "Paul Kagame", since: "2000 (Président de la République)", party: "FPR (Front Patriotique Rwandais)", nextElection: "2029"},
      headOfGov: {name: "Edouard Ngirente", since: "2017", party: "FPR"},
      keyMinisters: [
        {portfolio: "Affaires Étrangères", name: "Olivier Nduhungirehe"},
        {portfolio: "Finances et Planification Économique", name: "Yusuf Murangwa"},
        {portfolio: "Mines et Ressources naturelles", name: "Claudine Uwera"},
        {portfolio: "Infrastructure", name: "Ernest Nsabimana"},
        {portfolio: "Agriculture", name: "Celestin Mutuyimana"},
        {portfolio: "ICT et Innovation", name: "Paula Ingabire"},
        {portfolio: "Commerce et Industrie", name: "Prudence Sebahizi"}
      ],
      centralBankGov: {name: "John Rwangombwa", institution: "Banque Nationale du Rwanda (BNR)"},
      investmentAgency: {name: "Emmanuel Hategeka", institution: "Rwanda Development Board (RDB)"},
      miningAuthority: {name: "Francis Gatare", institution: "Rwanda Mining Board (RMB)"},
      ambassadorFrance: {name: "Non disponible", institution: "Ambassade du Rwanda à Paris"},
      ambassadorFromFrance: {name: "Non disponible", institution: "Ambassade de France à Kigali"}
    },

    contacts: {
      chambers: ["Rwanda Chamber of Commerce (RCCM)", "European Business Council Rwanda"],
      businessFrance: "Bureau Business France — Nairobi (couverture Rwanda)",
      bpifrance: "Bpifrance — couverture Afrique de l'Est",
      afd: "AFD Rwanda — Bureau Kigali",
      lawFirms: ["MKM Advocates Rwanda", "K Solutions Rwanda"],
      big4: ["Deloitte Rwanda", "PwC Rwanda", "EY Rwanda", "KPMG Rwanda"],
      patronat: "Private Sector Federation Rwanda (PSF)"
    },

    universities: [
      {name: "Université du Rwanda (UR)", city: "Kigali", students: "25 000", specialties: "Sciences, Médecine, Ingénierie, Agriculture", ranking: "1ère au Rwanda"},
      {name: "African Leadership University (ALU)", city: "Kigali", students: "2 000", specialties: "Business, Leadership, Tech", ranking: "Top école innovation Afrique"},
      {name: "Carnegie Mellon University Africa (CMU-Africa)", city: "Kigali", students: "400", specialties: "Computer Science, AI, Engineering", ranking: "Campus Amérique en Afrique"}
    ],
    sciPublications: "~2 500/an",
    patents: "~50/an",
    literacyRate: "73.2%",
    higherEducationRate: "8%",

    logistics: {
      ports: [{name: "N/A (pays enclavé)", capacity: "N/A", operator: "Accès via Mombasa (Kenya) ou Dar es Salaam (Tanzanie)", draft: "N/A", note: "Fret maritime via Tanzanie ou Kenya"}],
      airports: [{name: "Kigali International (KIA)", traffic: "1.8 M pax/an (2024)", freight: "30 000 t"}],
      railway: "En développement — SGR prévu (Standard Gauge Railway EAC)",
      roads: "14 000 km dont 4 700 km bitumés. Réseau en amélioration constante.",
      corridors: "Corridor Northern Corridor (Kigali-Mombasa), Corridor Central (Kigali-Dar es Salaam)",
      containerCost: "~3 500 USD/conteneur (enclavement)",
      customsDelay: "5 jours (moyen via Kenya)",
      logisticZones: ["Kigali Special Economic Zone (KSEZ)"],
      maritimeConnectivity: "Via Mombasa et Dar es Salaam"
    },

    trade: {
      topExports: [
        {product: "Minéraux (3T: Étain, Tantale, Tungstène)", value: "~500 M USD", destination: "UE, Asie"},
        {product: "Or", value: "~400 M USD", destination: "Dubaï, Suisse"},
        {product: "Café & Thé", value: "~150 M USD", destination: "UE, USA"},
        {product: "Services TIC", value: "~100 M USD", destination: "Régional"}
      ],
      topImports: [
        {product: "Produits pétroliers", value: "~600 M USD", origin: "Régional"},
        {product: "Machines & équipements", value: "~400 M USD", origin: "Chine, UE"},
        {product: "Produits alimentaires", value: "~300 M USD", origin: "Régional"}
      ],
      tradeBalance: "-2.5 Mds USD (2024)",
      fdiInward: {stock: "~6 Mds USD", flow: "~400 M USD/an", topInvestors: ["USA", "Kenya", "UK", "Inde", "Chine"]},
      tradeAgreements: ["ZLECAF", "EAC (East African Community)", "COMESA"],
      taxRegime: {is: "IS 30%", tva: "TVA 18%", conventions: "24 conventions fiscales"},
      freeZones: "Kigali SEZ — exonérations fiscales progressives",
      profitRepatriation: "Libre transfert dividendes",
      bit: "8 traités bilatéraux d'investissement"
    },

    demographics: {
      totalPopulation: "~14 millions (2025)",
      growthRate: "2.5%/an",
      ageStructure: "40% de 0-14 ans, 57% de 15-64 ans, 3% de 65+ ans. Âge médian: 20 ans.",
      urbanPopulation: "18%",
      unemployment: "14.5% (2024)",
      youthUnemployment: "25%",
      hdi: "0.534 — Rang 160/191",
      lifeExpectancy: "69 ans",
      middleClass: "20% de la population",
      millionaires: "~800",
      diaspora: "Diaspora en Europe et USA",
      languages: "Kinyarwanda, Anglais, Français, Swahili",
      literacy: "73.2%"
    },

    risks: {
      political: {score: 3, comment: "Stabilité politique forte mais régime autoritaire. Paul Kagame au pouvoir depuis 2000."},
      security: {score: 3, comment: "Pays sûr en interne. Tensions à la frontière RDC (soutien présumé M23)."},
      economic: {score: 4, comment: "Pays enclavé. Forte dépendance transit. Économie en croissance rapide mais base étroite."},
      regulatory: {score: 3, comment: "Très bon environnement des affaires. Rwanda est le meilleur d'Afrique subsaharienne (TI Corruption 54/100)."},
      logistic: {score: 6, comment: "Enclavement majeur. Coûts logistiques élevés. Infrastructure routière en amélioration."},
      miningOpportunity: {score: 8, comment: "3T (Étain, Tantale, Tungstène) — minéraux critiques CRM UE. Hub de traçabilité régional."},
      industrialOpportunity: {score: 7, comment: "Hub tech africain. Kigali SEZ. Carnegie Mellon Africa. Très bon environnement des affaires."},
      digitalOpportunity: {score: 8, comment: "Hub tech. 4G+. Vision Rwanda 2050. African Leadership University. Startups tech."},
      overallRisk: 3.8,
      overallOpportunity: 7.7,
      recommendation: "Investir — minéraux critiques CRM et hub tech Afrique de l'Est"
    }
  }

]; // END DATA_REMAINING_AFRICA

// ============================================================
// PART 2: EU COUNTRIES DATA
// DATA_EU_COUNTRIES — 27 member states
// Focus: Critical minerals demand, key industries consuming
// minerals, key enterprises for Africa corridor, CRMA contacts
// Sources: Eurostat 2024, IMF WEO 2025, European Commission
// Critical Raw Materials Act (CRMA) 2024, World Bank 2024
// ============================================================

export const DATA_EU_COUNTRIES: Country[] = [

  // ============================================================
  // 1. FRANCE 🇫🇷
  // ============================================================
  {
    id: "FR",
    name: "France",
    officialName: "République Française",
    flag: "🇫🇷",
    region: "eu",
    capital: "Paris",
    population: "68.4 millions (2025)",
    gdpNominal: "3 130 Mds USD (2025)",
    gdpPerCapita: "45 763 USD",
    currency: "Euro (EUR)",
    riskScore: 1,
    gdpPPP: "3 870 Mds USD (2025)",
    inflation: "2.0% (2025)",
    debtToGDP: "112%",
    area: "643 801 km²",
    density: "106 hab/km²",
    tradeBalance: "-100 Mds EUR (2024)",
    corruptionIndex: "Score 71/100 — Rang 26/180 (TI 2024)",
    easeBusiness: "Rang 32/190 (World Bank 2020)",
    politicalStability: "0.24 (World Bank 2023)",
    timezone: "UTC+1 (CET) / UTC+2 (CEST été)",
    languages: "Français",
    religions: "Catholicisme (47%), Sans religion (40%), Islam (8%)",
    memberships: ["UE", "OTAN", "G7", "G20", "OCDE", "ONU (P5)", "Zone Euro"],
    exchangeRateEUR: "Monnaie nationale",
    exchangeRateUSD: "1 EUR = ~1.08 USD",

    // --- EU Enrichment Bloomberg ---
    gigafactories: [
      {
        name: "ACC — Automotive Cells Company",
        location: "Billy-Berclau / Douvrin, Pas-de-Calais",
        capacity: "40 GWh (Phase 1) — extensible 120 GWh",
        status: "Production série depuis 2024. Ligne pilote opérationnelle 2023.",
        operator: "ACC (joint-venture Stellantis 33% / TotalEnergies 33% / Mercedes-Benz 33%)"
      },
      {
        name: "Verkor",
        location: "Dunkerque, Nord",
        capacity: "16 GWh (Phase 1), extensible à 50 GWh d'ici 2030",
        status: "Construction Phase 1 achevée. Production série prévue 2025. Client ancré : Renault Group.",
        operator: "Verkor SAS (Schneider Electric, EIT InnoEnergy, Renault, BPI France)"
      },
      {
        name: "AESC Envision",
        location: "Douai, Nord",
        capacity: "9 GWh Phase 1 — 24 GWh Phase 2",
        status: "Phase 1 opérationnelle 2025 pour Renault ElectriCity (Douai). Cellules NMC.",
        operator: "AESC Group (Envision — China) pour Renault"
      },
      {
        name: "Saft / TotalEnergies — Usine cellules LFP",
        location: "Nersac, Charente (étude avancée)",
        capacity: "Étude pour 8-12 GWh LFP",
        status: "Étude de faisabilité 2024-2025 — décision investissement attendue 2026.",
        operator: "Saft (filiale TotalEnergies)"
      }
    ],

    crmaInstitutions: [
      {
        name: "BRGM — Bureau de Recherches Géologiques et Minières",
        role: "Établissement public référent pour la géologie, les ressources minérales et les risques géologiques. Point focal national CRMA pour l'inventaire des ressources minérales stratégiques françaises. Pilote le projet Emili (lithium Beauvoir) en partenariat Imerys.",
        contact: "3 avenue Claude-Guillemin, 45060 Orléans Cedex 2 | www.brgm.fr | contact@brgm.fr | Tél : +33 2 38 64 34 34"
      },
      {
        name: "DGE — Direction Générale des Entreprises",
        role: "Sous l'autorité du Ministère de l'Économie et des Finances. Pilote la politique industrielle française et la mise en œuvre nationale du CRMA. Coordonne les accords de partenariat stratégique avec pays producteurs (Maroc phosphates, Namibie lithium, Guinée bauxite). Gère le programme France 2030 — volet minéraux critiques (200 M€).",
        contact: "12 rue Villiot, 75012 Paris | www.entreprises.gouv.fr | Responsable CRMA : Bureau Ressources Stratégiques"
      },
      {
        name: "France Minéraux",
        role: "Groupement d'intérêt public (GIP) créé 2023, dédié à la sécurisation des approvisionnements en minéraux critiques pour l'industrie française. Anime la Task Force Minéraux Critiques du Plan France 2030. Coordonne avec BRGM, Eramet, Imerys, ACC, Renault, Safran les feuilles de route d'approvisionnement.",
        contact: "www.france-mineraux.fr | Secrétariat : c/o Ministère de l'Économie, 139 rue de Bercy, 75012 Paris"
      },
      {
        name: "Bpifrance International",
        role: "Banque publique d'investissement. Finance les projets d'exploration et d'acquisition minérale français à l'étranger. Cofinance avec AFD les projets corridor Afrique-France. Gérant de fonds : Fonds Avenir Minier (FAM) 150 M€ pour exploration.",
        contact: "www.bpifrance.fr | Direction International : 27-31 avenue du Général Leclerc, 94710 Maisons-Alfort"
      },
      {
        name: "AFD — Agence Française de Développement",
        role: "Banque de développement publique. Financement projets infrastructure minière durable en Afrique (4 Mds€/an Afrique). Instrument clé du corridor France-Afrique CRMA. Finance projets routiers, ferroviaires et portuaires associés à l'extraction minérale responsable.",
        contact: "5 rue Roland Barthes, 75598 Paris Cedex 12 | www.afd.fr | Tél : +33 1 53 44 31 31"
      }
    ],
    riskLabel: "Très faible",
    criticalMineralsDemand: [
      "Lithium (batteries VE — Renault, Stellantis)",
      "Cobalt (batteries, aéronautique — Safran, Airbus)",
      "Nickel (acier inox, batteries)",
      "Terres rares (aimants permanents — éolien, VE)",
      "Phosphates (agriculture — 1er consommateur UE)",
      "Manganèse (acier spécial — ArcelorMittal France)",
      "Tantale (électronique défense)",
      "Bauxite/Alumine (industrie aluminium)",
      "Uranium (55% du mix électrique nucléaire — 56 réacteurs)",
      "Graphite (batteries)"
    ],
    keyConsumingIndustries: [
      "Automobile (Renault, Stellantis) — transition VE 2035",
      "Aéronautique & Défense (Airbus, Safran, Dassault, Thales)",
      "Nucléaire (EDF — 56 réacteurs, nouveau programme EPR2)",
      "Chimie & Pharmaceutique (Total, Sanofi)",
      "Agroalimentaire (1er agriculteur UE — phosphates, potasse)",
      "Énergies renouvelables (éolien off-shore, solaire)",
      "Électronique & Télécom (STMicroelectronics)"
    ],
    keyEnterprisesForCorridor: [
      {name: "Eramet", role: "Mines — Manganèse Gabon (COMILOG), Nickel Calédonie, Lithium Argentine", relevance: "Très élevée"},
      {name: "TotalEnergies", role: "Pétrole & Gaz Afrique (Angola, Congo, Nigeria, Gabon), Énergie renouvelable", relevance: "Très élevée"},
      {name: "Orano (ex-Areva)", role: "Uranium Niger (historique), Namibie. Traitement combustible nucléaire", relevance: "Très élevée"},
      {name: "Société Générale", role: "Banque Afrique subsaharienne (25 pays). Financement projets miniers", relevance: "Très élevée"},
      {name: "BNP Paribas", role: "Banque financement projets Afrique, trade finance minéraux", relevance: "Élevée"},
      {name: "Bolloré Logistics (Meridiam)", role: "Ports Afrique, logistique terminaux. Présence 20+ pays", relevance: "Élevée"},
      {name: "Bouygues (Colas)", role: "Construction infrastructure Afrique — routes, mines, bâtiments", relevance: "Modérée"}
    ],
    crmaContact: "Ministère de l'Économie — Direction Générale des Entreprises (DGE) + France 2030 — Plan minéraux critiques. Ambassades en Afrique. Bpifrance International.",
    tradeAfricaHighlights: "La France est le 3e partenaire commercial de l'Afrique. Présence diplomatique dans 53 pays africains. AFD : 4 Mds€/an en Afrique. Zone franc CFA (14 pays).",
    euCrmaRole: "France co-rédactrice du CRMA. Objectif national : réduire dépendance Chine. Initiative « Mine en France » pour lithium (Emili, Imerys Emili Allier)."
  },

  // ============================================================
  // 2. ALLEMAGNE 🇩🇪
  // ============================================================
  {
    id: "DE",
    name: "Allemagne",
    officialName: "Bundesrepublik Deutschland",
    flag: "🇩🇪",
    region: "eu",
    capital: "Berlin",
    population: "84.5 millions (2025)",
    gdpNominal: "4 525 Mds USD (2025)",
    gdpPerCapita: "53 549 USD",
    currency: "Euro (EUR)",
    riskScore: 1,
    gdpPPP: "5 370 Mds USD (2025)",
    inflation: "2.2% (2025)",
    debtToGDP: "64%",
    area: "357 592 km²",
    density: "236 hab/km²",
    tradeBalance: "+210 Mds EUR (2024, excédent commercial)",
    corruptionIndex: "Score 78/100 — Rang 9/180 (TI 2024)",
    easeBusiness: "Rang 22/190 (World Bank 2020)",
    politicalStability: "0.52 (World Bank 2023)",
    timezone: "UTC+1 (CET) / UTC+2 (CEST été)",
    languages: "Allemand",
    religions: "Catholicisme (27%), Protestantisme (25%), Sans religion (38%), Islam (5%)",
    memberships: ["UE", "OTAN", "G7", "G20", "OCDE", "Zone Euro"],
    exchangeRateEUR: "Monnaie nationale",
    exchangeRateUSD: "1 EUR = ~1.08 USD",

    // --- EU Enrichment Bloomberg ---
    gigafactories: [
      {
        name: "CATL — Erfurt Gigafactory",
        location: "Arnstadt (Thuringe)",
        capacity: "14 GWh Phase 1 — extensible à 100 GWh",
        status: "Opérationnelle depuis 2022. 1ère gigafactory CATL hors Chine. Clients : BMW, Stellantis, Volkswagen.",
        operator: "CATL (Contemporary Amperex Technology Co., Limited)"
      },
      {
        name: "PowerCo / Volkswagen — Salzgitter",
        location: "Salzgitter, Basse-Saxe",
        capacity: "40 GWh Phase 1 — 240 GWh total prévu sur 6 sites EU",
        status: "Construction Phase 1 2022-2025. Production prévue 2025. Cellule prismatique unifiée VW. Investissement : 2 Mds€ Phase 1.",
        operator: "PowerCo SE (filiale Volkswagen AG)"
      },
      {
        name: "Tesla Gigafactory Berlin-Brandenburg",
        location: "Grünheide, Brandebourg",
        capacity: "50 GWh (objectif 2025) — 100 GWh long terme",
        status: "Opérationnelle depuis mars 2022. Production ~500 000 véhicules/an en montée. Cellule 4680 en cours de déploiement sur site.",
        operator: "Tesla Inc."
      },
      {
        name: "Northvolt — Heide (Northvolt Drei)",
        location: "Heide, Schleswig-Holstein",
        capacity: "60 GWh planifié",
        status: "Projet retardé (difficultés financières Northvolt 2024, dépôt de bilan Ch.11 USA nov. 2024). Permis obtenus, terrain acquis. Futur incertain — reprise par acquéreur potentiel en cours (Volkswagen, Scania intéressés).",
        operator: "Northvolt AB (en restructuration)"
      },
      {
        name: "SVOLT — Überherrn",
        location: "Überherrn, Sarre",
        capacity: "24 GWh Phase finale",
        status: "Phase 1 (7 GWh) opérationnelle 2023. Phase 2 en cours. Cellule LFP et NMC. Client : Stellantis (Opel Rüsselsheim).",
        operator: "SVOLT Energy Technology (filiale Great Wall Motor)"
      },
      {
        name: "ACC — Kaiserslautern",
        location: "Kaiserslautern, Rhénanie-Palatinat",
        capacity: "40 GWh planifié",
        status: "Planification avancée. Terrain sélectionné. Décision finale investissement (FID) attendue 2025 — dépend santé financière JV ACC post-difficultés 2024.",
        operator: "ACC (Stellantis / TotalEnergies / Mercedes-Benz)"
      }
    ],

    crmaInstitutions: [
      {
        name: "BGR — Bundesanstalt für Geowissenschaften und Rohstoffe",
        role: "Autorité fédérale géosciences. Inventaire ressources minérales Allemagne et mondiales. Cartographie géologique et évaluation gisements. Expert technique gouvernement fédéral pour politiques minières. Coordonne avec DERA la surveillance des approvisionnements critiques.",
        contact: "Stilleweg 2, 30655 Hannover | www.bgr.bund.de | Tél : +49 511 643-0 | bgr@bgr.de"
      },
      {
        name: "DERA — Deutsche Rohstoffagentur",
        role: "Agence des matières premières brutes, rattachée à BGR. Publie l'Indicateur de Risque d'Approvisionnement (DERA-Rohstoffliste) pour 31 matières critiques. Fournit analyses marché et alertes précoces à l'industrie allemande. Soutient les démarches de sourcing diversifié des PME.",
        contact: "Wilhelmstraße 25-30, 13593 Berlin | www.bgr.bund.de/DERA | dera@bgr.de | Tél : +49 30 36993-0"
      },
      {
        name: "BMWK — Bundesministerium für Wirtschaft und Klimaschutz",
        role: "Ministère fédéral de l'Économie et de la Protection du Climat. Pilote la Rohstoffstrategie Deutschland (2024). Coordonne les accords bilatéraux de partenariat matières premières (Namibie, DRC, Chili, Canada). Anime le Rohstoffbeirat (conseil consultatif matières premières industrie).",
        contact: "Scharnhorststraße 34-37, 10115 Berlin | www.bmwk.de | poststelle@bmwk.bund.de | Tél : +49 30 18615-0"
      },
      {
        name: "KfW DEG — Deutsche Investitions- und Entwicklungsgesellschaft",
        role: "Filiale KfW dédiée au financement secteur privé pays émergents. Instrument de mise en œuvre des accords bilatéraux minéraux critiques DE-Afrique. Finance projets miniers responsables, infrastructure logistique, énergies renouvelables. Initiative Global Gateway EU partenaire.",
        contact: "Kämmergasse 22, 50676 Köln | www.deginvest.de | info@deginvest.de | Tél : +49 221 4986-0"
      },
      {
        name: "BDI / AG Rohstoffe — Fédération industrie allemande",
        role: "Bundesverband der Deutschen Industrie. Groupe de travail AG Rohstoffe représente les intérêts des industriels allemands dans les négociations CRMA. Publie annuellement l'indice de sécurité d'approvisionnement. Interlocuteur Commission Européenne pour la mise en œuvre des Strategic Projects CRMA.",
        contact: "Breite Straße 29, 10178 Berlin | www.bdi.eu | info@bdi.eu | Tél : +49 30 2028-0"
      }
    ],
    riskLabel: "Très faible",
    criticalMineralsDemand: [
      "Lithium (batteries VE — Volkswagen, BMW, Mercedes, BASF Cathode)",
      "Cobalt (batteries, outillage spécial)",
      "Nickel (acier inox, batteries — Thyssen-Krupp)",
      "Terres rares (aimants VE, éolien — Siemens Gamesa)",
      "Cuivre (électronique, machines, câblage — 1er consommateur EU)",
      "Manganèse (acier — industrie automobile)",
      "Graphite (batteries — Gigafactory Volkswagen Salzgitter)",
      "Platine (catalyseurs automobiles — BASF)",
      "Silicium (semi-conducteurs — Infineon)",
      "Indium & Germanium (électronique — Siemens, Infineon)"
    ],
    keyConsumingIndustries: [
      "Automobile (VW Group, BMW, Mercedes-Benz, Stellantis) — 1ère industrie UE",
      "Chimie (BASF — 1er chimiste mondial, Bayer, Evonik)",
      "Machines & Équipements (Siemens, Bosch, Thyssenkrupp)",
      "Électronique (Infineon, SAP, Zeiss)",
      "Énergies renouvelables (Siemens Gamesa, RWE, Ørsted DE)",
      "Acier & Métallurgie (Thyssenkrupp, Salzgitter)",
      "Semi-conducteurs (Intel Magdeburg, TSMC Dresden)"
    ],
    keyEnterprisesForCorridor: [
      {name: "BASF", role: "Cathode matériaux batteries, cobalt DRC, nickel, lithium processing", relevance: "Très élevée"},
      {name: "Thyssenkrupp", role: "Acier spécial, manganèse, nickel, projets miniers services", relevance: "Élevée"},
      {name: "Deutsche Bank", role: "Financement projets miniers Afrique, trade finance, ESG bonds", relevance: "Élevée"},
      {name: "Aurubis", role: "1er affineur cuivre EU. Approvisionnement Zambie, RDC, Afrique", relevance: "Très élevée"},
      {name: "Volkswagen (PowerCo)", role: "Gigafactory batteries — achat direct lithium, cobalt Afrique", relevance: "Très élevée"},
      {name: "Siemens Energy", role: "Partenariats énergie Afrique — Namibie (H2V), Sénégal, Afrique du Sud", relevance: "Élevée"}
    ],
    crmaContact: "Bundesministerium für Wirtschaft (BMWK) — Rohstoffstrategie Deutschland. Deutsche Rohstoffagentur (DERA). KfW DEG pour financement Afrique.",
    tradeAfricaHighlights: "Allemagne : 2e partenaire commercial EU-Afrique. Forte présence industrie automobile en Afrique du Sud. Initiative KfW DEG : 2 Mds€/an Afrique.",
    euCrmaRole: "Allemagne moteur CRMA. Accords bilatéraux : DRC cobalt, Namibie lithium/H2V. Deutsche Rohstoffagentur (DERA) — monitoring approvisionnements."
  },

  // ============================================================
  // 3. ITALIE 🇮🇹
  // ============================================================
  {
    id: "IT",
    name: "Italie",
    officialName: "Repubblica Italiana",
    flag: "🇮🇹",
    region: "eu",
    capital: "Rome",
    population: "59.2 millions (2025)",
    gdpNominal: "2 378 Mds USD (2025)",
    gdpPerCapita: "40 168 USD",
    currency: "Euro (EUR)",
    riskScore: 1,
    gdpPPP: "3 120 Mds USD (2025)",
    inflation: "1.8% (2025)",
    debtToGDP: "140%",
    area: "301 340 km²",
    density: "196 hab/km²",
    tradeBalance: "+50 Mds EUR (2024)",
    corruptionIndex: "Score 56/100 — Rang 41/180 (TI 2024)",
    easeBusiness: "Rang 58/190 (World Bank 2020)",
    politicalStability: "0.40 (World Bank 2023)",
    timezone: "UTC+1 (CET) / UTC+2 (CEST été)",
    languages: "Italien",
    religions: "Catholicisme (74%), Sans religion (20%), Islam (3%)",
    memberships: ["UE", "OTAN", "G7", "G20", "OCDE", "Zone Euro"],
    exchangeRateEUR: "Monnaie nationale",
    exchangeRateUSD: "1 EUR = ~1.08 USD",

    // --- EU Enrichment Bloomberg ---
    gigafactories: [
      {
        name: "ACC — Termoli Gigafactory",
        location: "Termoli, Molise (site ex-Fiat moteurs thermiques)",
        capacity: "40 GWh planifié (Phase 1)",
        status: "Faisabilité confirmée 2023. Construction prévue 2024-2026. Financements UE : 169 M€ IPCEI Hydrogène + fonds PNRR italiens. Retards possibles liés à restructuration ACC 2024.",
        operator: "ACC — Automotive Cells Company (Stellantis 33% / TotalEnergies 33% / Mercedes-Benz 33%)"
      },
      {
        name: "Stellantis — Mirafiori Battery Hub",
        location: "Turin, Piémont",
        capacity: "~5 GWh (batteries hybrides et BEV compactes)",
        status: "Opérationnel depuis 2023 pour Fiat 500e et hybrides Jeep. Reconversion partielle usine historique Mirafiori. Expansion 2025 prévue.",
        operator: "Stellantis N.V."
      },
      {
        name: "FAAM / Saft — Batterie stockage",
        location: "Montecchio Maggiore, Vicenza",
        capacity: "2-4 GWh (batteries industrielles, stockage réseau)",
        status: "Opérationnel. Expansion 2025-2026 avec investissements Saft (TotalEnergies). Cellules LFP pour storage réseau et mobilité lourde.",
        operator: "FAAM SpA (filiale Saft/TotalEnergies depuis 2023)"
      }
    ],

    crmaInstitutions: [
      {
        name: "MIMIT — Ministero delle Imprese e del Made in Italy",
        role: "Ministère de l'Économie productive. Pilote l'Unità Materie Prime Critiche (UMPC) pour la mise en œuvre nationale du CRMA EU. Coordonne les Strategic Partnerships matières premières avec pays tiers (Afrique, Amérique du Sud). Anime la Cabina di Regia pour la Transizione 5.0.",
        contact: "Via Molise 2, 00187 Roma | www.mimit.gov.it | Tél : +39 06 4705-1 | urp@mise.gov.it"
      },
      {
        name: "ISPRA — Istituto Superiore per la Protezione e la Ricerca Ambientale",
        role: "Institut supérieur protection et recherche environnementale. Département géologie et suivi ressources minérales italiennes. Inventaire des occurrences minérales nationales (Li, Co, REE, Ni) dans le cadre du CRMA. Expertise pour autorisations minières et études d'impact.",
        contact: "Via Vitaliano Brancati 48, 00144 Roma | www.isprambiente.gov.it | ispra@pec.isprambiente.it | Tél : +39 06 50071"
      },
      {
        name: "ICE Agenzia — Agenzia per la promozione all'estero",
        role: "Agence italienne pour la promotion des échanges et des investissements à l'étranger. Réseau dans 70 pays (dont 35 en Afrique). Facilite les partenariats miniers et industriels Italia-Afrique dans le cadre CRMA. Identifie opportunités sourcing pour industriels italiens.",
        contact: "Via Liszt 21, 00144 Roma EUR | www.ice.it | Tél : +39 06 59921 | info@ice.it"
      },
      {
        name: "SACE — Servizi Assicurativi del Commercio Estero",
        role: "Assurance-crédit export italienne (CDP Group). Couvre et garantit les investissements italiens en Afrique, notamment projets miniers, infrastructure, énergie. Plan Mattei : SACE mandatée pour garanties 4 Mds€ sur 4 ans pour projets Afrique. Instrument direct du corridor Italie-Afrique CRMA.",
        contact: "Piazza Poli 37-42, 00187 Roma | www.sace.it | info@sace.it | Tél : +39 06 6736-1"
      },
      {
        name: "Confindustria — Commissione Materie Prime",
        role: "Fédération patronale italienne. Commission Matières Premières critique représente 150 000 entreprises membres. Interlocuteur gouvernement pour CRMA et Strategic Partnerships. Anime le groupe de travail CRMA avec MIMIT. Publications annuelles : indices criticité approvisionnement pour industrie IT.",
        contact: "Viale dell'Astronomia 30, 00144 Roma | www.confindustria.it | Tél : +39 06 59031"
      }
    ],
    riskLabel: "Très faible",
    criticalMineralsDemand: [
      "Lithium (batteries VE — Stellantis, FIAT, Enel X)",
      "Cobalt (batteries, chimie — ENI)",
      "Cuivre (industrie mécanique — Prysmian, câbles)",
      "Nickel (acier inox — Marcegaglia)",
      "Terres rares (moteurs électriques, éolien)",
      "Phosphates (agriculture — 3e agriculteur EU)",
      "Manganèse (acier, fonderies)",
      "Bauxite/Aluminium (packaging, construction)"
    ],
    keyConsumingIndustries: [
      "Automobile (Stellantis — Fiat, Alfa Romeo, Maserati)",
      "Énergie (ENI, Enel — transition verte)",
      "Mécanique & Machines (Leonardo, Fincantieri)",
      "Chimie & Pharmacie (ENI Versalis, Mapei)",
      "Câbles & Énergie (Prysmian — 1er câblier mondial)",
      "Agroalimentaire & Packaging",
      "Mode & Luxe (matières premières)"
    ],
    keyEnterprisesForCorridor: [
      {name: "ENI", role: "Pétrole & Gaz Afrique (Congo, Nigeria, Angola, Mozambique, Libye, Ghana). Leader EU en Afrique", relevance: "Très élevée"},
      {name: "Prysmian", role: "1er câblier mondial — cuivre Afrique, câbles sous-marins, interconnexions", relevance: "Très élevée"},
      {name: "Intesa Sanpaolo", role: "Banque financement projets Afrique, Méditerranée", relevance: "Élevée"},
      {name: "Leonardo", role: "Défense, drones surveillance, contrats Afrique", relevance: "Modérée"},
      {name: "Fincantieri", role: "Construction navale — patrouilleurs Afrique (Nigeria, Sénégal), ferrys", relevance: "Modérée"}
    ],
    crmaContact: "Ministero delle Imprese e del Made in Italy (MIMIT) — Unità Materie Prime Critiche. SIMEST (financement export Afrique). ICE Agenzia.",
    tradeAfricaHighlights: "Italie : forte présence en Libye, Tunisie, Éthiopie. Plan Mattei pour l'Afrique (2024) : 5.5 Mds€ investissements sur 4 ans. ENI principal vecteur.",
    euCrmaRole: "Plan Mattei co-aligné avec CRMA. Accords stratégiques : Libye, Congo, Mozambique. SACE garanties export Afrique."
  },

  // ============================================================
  // 4. ESPAGNE 🇪🇸
  // ============================================================
  {
    id: "ES",
    name: "Espagne",
    officialName: "Reino de España",
    flag: "🇪🇸",
    region: "eu",
    capital: "Madrid",
    population: "47.9 millions (2025)",
    gdpNominal: "1 729 Mds USD (2025)",
    gdpPerCapita: "36 100 USD",
    currency: "Euro (EUR)",
    riskScore: 1,
    gdpPPP: "2 400 Mds USD (2025)",
    inflation: "2.9% (2025)",
    debtToGDP: "107%",
    area: "505 990 km²",
    density: "94 hab/km²",
    tradeBalance: "-40 Mds EUR (2024)",
    corruptionIndex: "Score 60/100 — Rang 36/180 (TI 2024)",
    easeBusiness: "Rang 30/190 (World Bank 2020)",
    politicalStability: "0.30 (World Bank 2023)",
    timezone: "UTC+1 (CET) / UTC+2 (CEST été)",
    languages: "Espagnol (castillan), Catalan, Basque, Galicien",
    religions: "Catholicisme (56%), Sans religion (37%)",
    memberships: ["UE", "OTAN", "OCDE", "Zone Euro"],
    exchangeRateEUR: "Monnaie nationale",
    exchangeRateUSD: "1 EUR = ~1.08 USD",

    // --- EU Enrichment Bloomberg ---
    gigafactories: [
      {
        name: "Envision AESC — Navalmoral de la Mata",
        location: "Navalmoral de la Mata, Estrémadure",
        capacity: "30 GWh Phase 1 — extensible à 50 GWh",
        status: "Construction en cours 2023-2025. Production prévue fin 2025-début 2026. Cellules NMC pour Renault. Investissement : 900 M€. Financement PERTE + fonds EU.",
        operator: "AESC Group (Envision) pour Renault Espagne"
      },
      {
        name: "PowerCo / Volkswagen — Sagunto",
        location: "Sagunto, Communauté Valencienne",
        capacity: "40 GWh Phase 1 — extensible à 80 GWh",
        status: "Construction 2023-2026. Production cible : 2026. Investissement : 3 Mds€ (PowerCo + aides État espagnol 350 M€ + EU IPCEI). Alimentera usines Seat, Skoda, VW Espagne.",
        operator: "PowerCo SE (filiale Volkswagen AG)"
      },
      {
        name: "Basquevolt",
        location: "Pays Basque (site en sélection — Vitoria-Gasteiz ou Bilbao)",
        capacity: "10 GWh pilote — extension 30 GWh",
        status: "Démonstrateur batteries solides 2024-2025. Technologie SSB (solid-state battery) avec électrolyte céramique. Partenariat Ikerbasque, CIC energiGUNE, IK4 Research Alliance. Financement : Gouvernement Pays Basque + H2020 EU.",
        operator: "Basquevolt SL (spin-out CIC energiGUNE / Basque Research & Technology Alliance)"
      },
      {
        name: "Stellantis — Figueruelas (Saragosse)",
        location: "Figueruelas, Saragosse, Aragon",
        capacity: "~10 GWh (batteries hybrides Opel/Peugeot)",
        status: "Reconversion partielle usine Figueruelas pour assemblage batteries hybrides. Opérationnel 2024. Extension BEV en étude (dépend FID ACC Kaiserslautern ou accord CATL ES).",
        operator: "Stellantis N.V. — Opel/Citroën Espagne"
      }
    ],

    crmaInstitutions: [
      {
        name: "IGME-CSIC — Instituto Geológico y Minero de España",
        role: "Institut géologique national, rattaché au CSIC (Conseil Supérieur de la Recherche Scientifique). Inventaire des ressources minérales stratégiques espagnoles. Évalue les gisements lithium (Extremadura, Estrémadure/Galice), REE (Galice, Castille-León), cobalt (Huelva), potasse (Catalogne). Point focal CRMA pour les Strategic Projects nationaux.",
        contact: "Ríos Rosas 23, 28003 Madrid | www.igme.es | igme@igme.es | Tél : +34 91 349 57 00"
      },
      {
        name: "MITECO — Ministerio para la Transición Ecológica",
        role: "Ministère pour la Transition Écologique et le Défi Démographique. Pilote le Plan Nacional de Materias Primas Críticas (PNMPC, 2024). Coordonne les accords de partenariat stratégiques CRMA : Maroc (phosphates, cobalt), Namibie (lithium), Chili (cuivre). Autorité nationale CRMA vis-à-vis de la Commission Européenne.",
        contact: "Plaza de San Juan de la Cruz s/n, 28071 Madrid | www.miteco.gob.es | Tél : +34 91 597 60 00"
      },
      {
        name: "ICEX España Exportación e Inversiones",
        role: "Agence nationale pour l'export et les investissements étrangers. Réseau 30 pays africains. Facilite les partenariats mines et minéraux entre entreprises espagnoles et africaines. Publie études marché mines/minerais. Cofinancement par Fond Europeo de Desarrollo Regional (FEDER).",
        contact: "Paseo de la Castellana 278, 28046 Madrid | www.icex.es | info@icex.es | Tél : +34 91 349 61 00"
      },
      {
        name: "ICO — Instituto de Crédito Oficial",
        role: "Banque publique de développement espagnole. Finance les investissements espagnols à l'étranger dans les secteurs critiques. Fonds ICO Internacional : lignes de crédit pour projets mines/minerais en Afrique et Amérique Latine. Partenaire EU Global Gateway pour financement corridor Espagne-Afrique.",
        contact: "Paseo del Prado 4, 28014 Madrid | www.ico.es | info@ico.es | Tél : +34 91 592 16 00"
      },
      {
        name: "Cluster de Automoción de la Comunitat Valenciana (AVIA)",
        role: "Cluster automobile valencien regroupant fournisseurs de Sagunto (PowerCo) et usines Stellantis/Ford (Vale). Coordonne la chaîne d'approvisionnement minéraux critiques locaux (Li Extremadura → Sagunto). Interface entre IGME, MITECO et industriels pour les projets CRMA régionaux. Modèle de gouvernance multi-acteurs CRMA.",
        contact: "Carrer de Colom 15, 46004 Valencia | www.avia.es | info@avia.es | Tél : +34 96 353 05 05"
      }
    ],
    riskLabel: "Très faible",
    criticalMineralsDemand: [
      "Lithium (batteries — SEAT/VW, Stellantis usines espagnoles)",
      "Cobalt (batteries, chimie)",
      "Cuivre (industrie — présence mines Huelva historique)",
      "Terres rares (éolien — Iberdrola, Vestas ES)",
      "Phosphates (agriculture Andalousie — 1 Mds€/an imports)",
      "Potasse (agriculture — MOP)",
      "Manganèse & Nickel (sidérurgie — ArcelorMittal Asturias)"
    ],
    keyConsumingIndustries: [
      "Automobile (SEAT/VW, Stellantis — Saragosse, Vigo)",
      "Énergies renouvelables (Iberdrola — 1er EU éolien, Acciona, Repsol)",
      "Chimie (Repsol, Cepsa)",
      "Agroalimentaire (1er producteur EU fruits & légumes)",
      "Tourisme & Construction",
      "Télécom (Telefónica — présence Afrique)"
    ],
    keyEnterprisesForCorridor: [
      {name: "Iberdrola", role: "Énergies renouvelables Afrique (Maroc partenariats, Afrique du Sud), mines éolien", relevance: "Élevée"},
      {name: "Repsol", role: "Pétrole & Gaz Afrique (Nigeria, Angola, Libye, Algérie)", relevance: "Élevée"},
      {name: "Banco Santander", role: "Financement trade Afrique, Brésil (pont minéraux Amérique-Afrique)", relevance: "Élevée"},
      {name: "BBVA", role: "Financement projets Afrique du Nord, Méditerranée", relevance: "Modérée"},
      {name: "Técnicas Reunidas", role: "Ingénierie pétrole & gaz, projets industriels Afrique", relevance: "Modérée"}
    ],
    crmaContact: "Ministerio para la Transición Ecológica (MITECO) — Plan Nacional Materias Primas Críticas. ICEX España Exportación e Inversiones. ICO (financement).",
    tradeAfricaHighlights: "Espagne : 1ère porte d'entrée EU vers Afrique. Corridor Algésiras-Tanger. Maroc 1er partenaire africain (30 Mds€/an). Accès géographique unique.",
    euCrmaRole: "Espagne possède lithium propre (Extremadura — Infinity Lithium, Extremadura New Energies). Rôle clé corridor Afrique Nord-Ouest."
  },

  // ============================================================
  // 5. PAYS-BAS 🇳🇱
  // ============================================================
  {
    id: "NL",
    name: "Pays-Bas",
    officialName: "Koninkrijk der Nederlanden",
    flag: "🇳🇱",
    region: "eu",
    capital: "Amsterdam / La Haye",
    population: "17.9 millions (2025)",
    gdpNominal: "1 116 Mds USD (2025)",
    gdpPerCapita: "62 346 USD",
    currency: "Euro (EUR)",
    riskScore: 1,
    gdpPPP: "1 230 Mds USD (2025)",
    inflation: "2.5% (2025)",
    debtToGDP: "48%",
    area: "41 543 km²",
    density: "425 hab/km²",
    tradeBalance: "+85 Mds EUR (2024, hub commercial)",
    corruptionIndex: "Score 79/100 — Rang 8/180 (TI 2024)",
    easeBusiness: "Rang 42/190 (World Bank 2020)",
    politicalStability: "0.75 (World Bank 2023)",
    timezone: "UTC+1 (CET) / UTC+2 (CEST été)",
    languages: "Néerlandais, Frison (Frise)",
    religions: "Sans religion (55%), Catholicisme (20%), Protestantisme (15%), Islam (5%)",
    memberships: ["UE", "OTAN", "OCDE", "Zone Euro", "Benelux"],
    exchangeRateEUR: "Monnaie nationale",
    exchangeRateUSD: "1 EUR = ~1.08 USD",

    // --- EU Enrichment Bloomberg ---
    gigafactories: [
      {
        name: "Envision AESC — Rotterdam (étude)",
        location: "Port de Rotterdam / Moerdijk Industrial Area",
        capacity: "20-40 GWh (en étude de faisabilité)",
        status: "Études préliminaires 2024. Pas encore de FID (Final Investment Decision). Rotterdam positionné comme hub batteries grâce à infrastructure logistique minerais. Décision attendue 2025-2026.",
        operator: "Envision AESC Group (en partenariat potentiel avec Port of Rotterdam Authority)"
      },
      {
        name: "Umicore — Breda Battery Materials",
        location: "Breda, Brabant-Septentrional",
        capacity: "Usine de précurseurs cathodes (pCAM) — 150 000 t/an capacité EU cumulée (Breda + Nysa PL)",
        status: "Opérationnel 2024. Produit pCAM NMC 9-1/2-1 pour CATL, ACC, Northvolt. Consomme ~6 000 t Co/an + nickel sulfate + lithium. Umicore Breda = nœud critique chaîne batteries EU.",
        operator: "Umicore NV (coté Euronext Bruxelles)"
      },
      {
        name: "Nouryon — Lithium Battery Chemicals",
        location: "Deventer, Overijssel",
        capacity: "Production électrolytes et sels lithium pour batteries — ~5 000 t/an LiPF6",
        status: "Opérationnel et expansion 2024. Fournisseur électrolyte à Northvolt, ACC, Morrow (Norvège). Nouryon = 1er producteur EU LiPF6 (sel électrolyte batteries Li-ion).",
        operator: "Nouryon (ex-AkzoNobel Specialty Chemicals, propriété Carlyle Group)"
      }
    ],

    crmaInstitutions: [
      {
        name: "TNO — Netherlands Organisation for Applied Scientific Research",
        role: "Organisation de recherche appliquée nationale. Unité Critical Raw Materials : analyse chaînes d'approvisionnement, économie circulaire, substitution matériaux critiques. Fournit expertise technique gouvernement néerlandais pour implémentation CRMA. Projets : recyclage REE moteurs électriques, récupération In/Ge des déchets électroniques.",
        contact: "Anna van Buerenplein 1, 2595 DA La Haye | www.tno.nl | info@tno.nl | Tél : +31 88 866 00 00"
      },
      {
        name: "RVO — Rijksdienst voor Ondernemend Nederland",
        role: "Agence gouvernementale pour l'entreprise (Ministère Affaires Économiques EZK). Financement et soutien projets CRMA pour PME néerlandaises. Gère les instruments de financement export Pays-Bas vers Afrique (ATI, DGGF). Coordonne les candidatures Strategic Projects CRMA EU pour les projets néerlandais.",
        contact: "Prinses Beatrixlaan 2, 2595 AL La Haye | www.rvo.nl | info@rvo.nl | Tél : +31 88 042 42 42"
      },
      {
        name: "EZK — Ministerie van Economische Zaken en Klimaat",
        role: "Ministère de l'Économie et du Climat. Pilote la Stratégie Nationale Matières Premières Critiques (Grondstoffenstrategie 2024). Coordonne les accords de partenariat CRMA bilatéraux (Namibie, DRC, Zambie, Chili). Ministre : Dirk Beljaarts (depuis 2024). Supervise TNO, RVO, Port Authority Rotterdam dans le cadre CRMA.",
        contact: "Bezuidenhoutseweg 73, 2594 AC La Haye | www.government.nl/ministries/ministry-of-economic-affairs | Tél : +31 70 379 89 11"
      },
      {
        name: "Port of Rotterdam Authority",
        role: "Autorité portuaire de Rotterdam (N.V. Havenbedrijf Rotterdam). Co-propriété Ville de Rotterdam (70%) et État néerlandais (30%). Développe le Rotterdam Mineral Hub : infrastructure de stockage et traçabilité pour minéraux critiques CRMA. Interlocuteur direct Commission Européenne pour Strategic Stockpiles EU. Investissement : 200 M€ hub minéraux 2025-2028.",
        contact: "Wilhelminakade 909, 3072 AP Rotterdam | www.portofrotterdam.com | info@portofrotterdam.com | Tél : +31 10 252 10 10"
      },
      {
        name: "Holland Minerals (initiative sectorielle)",
        role: "Initiative industrie néerlandaise regroupant Trafigura, Shell, ING, ABN AMRO, ASML, Umicore NL pour coordonner la sécurisation des approvisionnements en minéraux critiques. Publie annuellement le Dutch Critical Minerals Monitor. Interface avec Commission Européenne pour Strategic Partnerships CRMA. Lien avec Port of Rotterdam Mineral Hub.",
        contact: "c/o FME (secteur industrie technologique NL) | Boerhaavelaan 40, 2713 HX Zoetermeer | www.fme.nl | Tél : +31 79 353 11 00"
      }
    ],
    riskLabel: "Très faible",
    criticalMineralsDemand: [
      "Cuivre (port Rotterdam — hub trading mondial)",
      "Lithium (batteries — ASML chaîne semi-conducteurs)",
      "Cobalt (trading international — Glencore Rotterdam)",
      "Terres rares (ASML machines photolithographie)",
      "Semi-conducteurs — matériaux (silicium, germanium, gallium)",
      "Phosphates (trading — 1er négoce mondial via Rotterdam)"
    ],
    keyConsumingIndustries: [
      "Semi-conducteurs (ASML — monopole mondial lithographie EUV)",
      "Chimie (Shell, LyondellBasell, Nouryon)",
      "Port & Logistique (Port de Rotterdam — 1er EU)",
      "Agroalimentaire (Unilever, Nutricia/Danone)",
      "Énergie (Shell, SBM Offshore)",
      "Finance & Trading (ING, ABN AMRO, Trafigura, Vitol)"
    ],
    keyEnterprisesForCorridor: [
      {name: "Trafigura", role: "1er trader métaux Afrique (cuivre Zambie, cobalt RDC, zinc). Hub Rotterdam", relevance: "Très élevée"},
      {name: "Shell", role: "Pétrole & Gaz Afrique (Nigeria — SPDC, Tanzania LNG, Afrique du Sud)", relevance: "Très élevée"},
      {name: "ING Bank", role: "Financement projets mines Afrique, trade finance minéraux", relevance: "Très élevée"},
      {name: "Vitol", role: "Trading pétrole Afrique (Angola, Nigeria, Gabon). Hub Rotterdam", relevance: "Très élevée"},
      {name: "ASML", role: "Semi-conducteurs — dépendance matériaux critiques (Ga, Ge, terres rares)", relevance: "Élevée"}
    ],
    crmaContact: "Ministerie van Economische Zaken (EZK) — Stratégie Matières Premières Critiques. RVO (Rijksdienst voor Ondernemend Nederland) — financement export.",
    tradeAfricaHighlights: "Rotterdam : 1er port EU — hub transit minéraux africains vers EU. Pays-Bas 4e investisseur en Afrique subsaharienne. Trading companies : Trafigura, Vitol, Glencore (Swiss-Dutch).",
    euCrmaRole: "Pays-Bas acteur clé trading et logistique CRMA. Port Rotterdam = porte d'entrée minéraux africains vers EU. ASML dépendant minéraux critiques."
  },

  // ============================================================
  // 6. BELGIQUE 🇧🇪
  // ============================================================
  {
    id: "BE",
    name: "Belgique",
    officialName: "Royaume de Belgique",
    flag: "🇧🇪",
    region: "eu",
    capital: "Bruxelles",
    population: "11.7 millions (2025)",
    gdpNominal: "633 Mds USD (2025)",
    gdpPerCapita: "54 103 USD",
    currency: "Euro (EUR)",
    riskScore: 1,
    gdpPPP: "770 Mds USD (2025)",
    inflation: "2.3% (2025)",
    debtToGDP: "106%",
    area: "30 528 km²",
    density: "383 hab/km²",
    tradeBalance: "-10 Mds EUR",
    timezone: "UTC+1 (CET)",
    languages: "Néerlandais, Français, Allemand",
    memberships: ["UE", "OTAN", "OCDE", "Zone Euro", "Benelux"],
    riskLabel: "Très faible",
    criticalMineralsDemand: [
      "Cobalt (Umicore — 1er recycleur cobalt mondial, batteries UE)",
      "Lithium (batteries — Umicore cathodes)",
      "Cuivre (Aurubis Belgium, câblage)",
      "Platine & Palladium (Umicore — catalyseurs, recyclage PGM)",
      "Terres rares (recyclage — Umicore Urban Mining)",
      "Germanium (Umicore, semi-conducteurs)"
    ],
    keyConsumingIndustries: [
      "Chimie & Matériaux (Umicore, Solvay, INEOS)",
      "Pharmaceutique (UCB, Janssen/J&J Belgique)",
      "Aéronautique (Safran Belgique, FN Herstal — défense)",
      "Port & Logistique (Port d'Anvers — 2e EU)",
      "Acier (ArcelorMittal — siège mondial à Luxembourg/Liège)"
    ],
    keyEnterprisesForCorridor: [
      {name: "Umicore", role: "1er recycleur cobalt, platine, terres rares. Cathodes batteries. Approvisionnement RDC, Afrique du Sud", relevance: "Très élevée"},
      {name: "Solvay", role: "Chimie spéciale — terres rares, fluorures, matériaux batteries", relevance: "Très élevée"},
      {name: "Antwerp Port Authority", role: "2e port EU — hub cobalt RDC, cuivre Zambie, diamants (Anvers = capitale mondiale)", relevance: "Très élevée"},
      {name: "KBC Group", role: "Banque financement Afrique centrale (historique RDC/Congo belge)", relevance: "Élevée"},
      {name: "Exmar", role: "Transport maritime LNG Afrique (Tanzanie, Mozambique, Nigeria)", relevance: "Modérée"}
    ],
    crmaContact: "SPF Économie — Département Matières Premières Critiques. Port d'Anvers — Antwerp@C hub. European Metals & Mining Week (Bruxelles). Commission Européenne (siège).",
    tradeAfricaHighlights: "Belgique : lien historique RDC. Anvers = 80% du commerce mondial de diamants bruts. Umicore = hub cobalt RDC-EU. Siège Commission Européenne à Bruxelles.",
    euCrmaRole: "Bruxelles = siège CRMA. Umicore = champion EU batteries. Port Anvers = infrastructure critique minéraux. Lien RDC cobalt stratégique."
  },

  // ============================================================
  // 7. AUTRICHE 🇦🇹
  // ============================================================
  {
    id: "AT",
    name: "Autriche",
    officialName: "Republik Österreich",
    flag: "🇦🇹",
    region: "eu",
    capital: "Vienne",
    population: "9.1 millions (2025)",
    gdpNominal: "521 Mds USD (2025)",
    gdpPerCapita: "57 253 USD",
    currency: "Euro (EUR)",
    riskScore: 1,
    gdpPPP: "620 Mds USD (2025)",
    inflation: "3.0% (2025)",
    debtToGDP: "77%",
    area: "83 871 km²",
    density: "109 hab/km²",
    tradeBalance: "+5 Mds EUR",
    timezone: "UTC+1 (CET)",
    languages: "Allemand",
    memberships: ["UE", "OCDE", "Zone Euro"],
    riskLabel: "Très faible",
    criticalMineralsDemand: [
      "Tungstène (Plansee Group — 1er EU producteur tungstène)",
      "Magnésie (RHI Magnesita — 1er mondial réfractaires)",
      "Lithium (batteries — Rosenbauer, AVL)",
      "Cuivre (câblage, industrie)",
      "Terres rares (Siemens Austria, Voestalpine)"
    ],
    keyConsumingIndustries: [
      "Acier spécial & Réfractaires (Voestalpine, RHI Magnesita)",
      "Matériaux avancés (Plansee Group — tungstène, molybdène)",
      "Automobile (composants — ZF, Magna Austria)",
      "Énergie renouvelable (Verbund — hydraulique, solaire)",
      "Tourisme & Immobilier"
    ],
    keyEnterprisesForCorridor: [
      {name: "RHI Magnesita", role: "1er mondial réfractaires — magnésie, consomme minéraux Afrique du Sud, Zimbabwe", relevance: "Élevée"},
      {name: "Voestalpine", role: "Acier spécial — manganèse, chrome, nickel — liens Afrique du Sud", relevance: "Élevée"},
      {name: "Raiffeisen Bank International", role: "Financement Europe centrale/orientale, projets Afrique (indirect)", relevance: "Modérée"},
      {name: "Andritz Group", role: "Machines pâte à papier, mines — projets Afrique du Sud, Mozambique", relevance: "Modérée"},
      {name: "Kapsch", role: "Systèmes ITS, péage — Afrique du Sud, Kenya", relevance: "Faible"}
    ],
    crmaContact: "Bundesministerium für Klimaschutz und Wirtschaft — Rohstoffstrategie Österreich. Austrian Business Agency (ABA).",
    tradeAfricaHighlights: "Autriche : présence Afrique du Sud (industrie lourde). RHI Magnesita présence Zimbabwe. Voestalpine liens Afrique du Sud acier.",
    euCrmaRole: "Autriche contribue tungstène et magnésie. Plansee — fournisseur critique EU en tungstène. RHI Magnesita — sécurité réfractaires industrie lourde EU."
  },

  // ============================================================
  // 8. POLOGNE 🇵🇱
  // ============================================================
  {
    id: "PL",
    name: "Pologne",
    officialName: "Rzeczpospolita Polska",
    flag: "🇵🇱",
    region: "eu",
    capital: "Varsovie",
    population: "37.6 millions (2025)",
    gdpNominal: "810 Mds USD (2025)",
    gdpPerCapita: "21 542 USD",
    currency: "Złoty (PLN)",
    riskScore: 1,
    gdpPPP: "1 660 Mds USD (2025)",
    inflation: "4.5% (2025)",
    debtToGDP: "49%",
    area: "312 696 km²",
    density: "120 hab/km²",
    tradeBalance: "-15 Mds EUR",
    timezone: "UTC+1 (CET)",
    languages: "Polonais",
    memberships: ["UE", "OTAN", "OCDE"],
    riskLabel: "Très faible",
    criticalMineralsDemand: [
      "Cuivre (KGHM — producteur propre, 3e EU)",
      "Argent (KGHM — 5e mondial producteur)",
      "Lithium (batteries — LG Energy Solution Pologne, Samsung SDI)",
      "Cobalt (batteries — hub batterie EU Pologne)",
      "Terres rares (modernisation industrie)",
      "Charbon cokéfiant (transition — Jastrzębska Spółka Węglowa)"
    ],
    keyConsumingIndustries: [
      "Batteries & VE (LG Energy Solution, Samsung SDI, SK Innovation — 3 Gigafactories)",
      "Cuivre (KGHM — production propre + consommation industrie)",
      "Automobile (Volkswagen Poznań, Stellantis Tychy, Toyota Jelcz-Laskowice)",
      "Acier (ArcelorMittal Poland, Stalprodukt)",
      "Chimie (PKN Orlen, Ciech)"
    ],
    keyEnterprisesForCorridor: [
      {name: "KGHM Polska Miedź", role: "3e EU producteur cuivre. Investissements mines Afrique (Sierra Gorda Chili, études Afrique)", relevance: "Très élevée"},
      {name: "LG Energy Solution (Wrocław)", role: "Gigafactory — acheteur cobalt RDC, lithium, nickel pour batteries EU", relevance: "Très élevée"},
      {name: "PKN Orlen", role: "Énergie — intérêts pétrole & gaz, transition renouvelable", relevance: "Modérée"},
      {name: "Bank Pekao / PKO BP", role: "Financement projets industriels, trade finance", relevance: "Faible"},
      {name: "Samsung SDI (Göd-Pologne)", role: "Batteries — cobalt, lithium, nickel — approvisionnement Afrique indirect", relevance: "Élevée"}
    ],
    crmaContact: "Ministerstwo Rozwoju i Technologii — Strategia Surowcowa Polski. Polska Agencja Inwestycji i Handlu (PAIH).",
    tradeAfricaHighlights: "Pologne hub batteries EU : 3 Gigafactories. KGHM 2e producteur EU cuivre. Transition énergétique progressive (charbon → renouvelable).",
    euCrmaRole: "Pologne = hub batteries UE (Gigafactories LG, Samsung, SK). KGHM producteur cuivre & argent propre EU. Fort demandeur cobalt/lithium Afrique."
  },

  // ============================================================
  // 9. SUÈDE 🇸🇪
  // ============================================================
  {
    id: "SE",
    name: "Suède",
    officialName: "Konungariket Sverige",
    flag: "🇸🇪",
    region: "eu",
    capital: "Stockholm",
    population: "10.5 millions (2025)",
    gdpNominal: "597 Mds USD (2025)",
    gdpPerCapita: "56 857 USD",
    currency: "Couronne suédoise (SEK)",
    riskScore: 1,
    gdpPPP: "700 Mds USD (2025)",
    inflation: "1.5% (2025)",
    debtToGDP: "33%",
    area: "450 295 km²",
    density: "23 hab/km²",
    tradeBalance: "+15 Mds EUR",
    timezone: "UTC+1 (CET)",
    languages: "Suédois",
    memberships: ["UE", "OTAN", "OCDE"],
    riskLabel: "Très faible",
    criticalMineralsDemand: [
      "Lithium (Northvolt — batteries VE, giga Skellefteå)",
      "Cobalt (Northvolt — batteries)",
      "Nickel (batteries — Northvolt)",
      "Terres rares (LKAB — découverte Per Geijer 1 Mt+)",
      "Fer (LKAB — 1er producteur EU fer, Kiruna)",
      "Cuivre (Boliden — producteur propre)"
    ],
    keyConsumingIndustries: [
      "Batteries (Northvolt — Gigafactory Skellefteå, restructuration 2024-2025)",
      "Automobile (Volvo Cars, Scania, Volvo Trucks — transition VE)",
      "Mines (LKAB, Boliden — leaders EU)",
      "Acier sans CO2 (SSAB — HYBRIT, hydrogène)",
      "Télécommunications (Ericsson, Telefonaktiebolaget)",
      "Défense (Saab Group)"
    ],
    keyEnterprisesForCorridor: [
      {name: "Boliden", role: "Mines — zinc, cuivre, nickel, or EU. Études expansion Afrique", relevance: "Élevée"},
      {name: "LKAB", role: "1er EU producteur fer. Terres rares Per Geijer (EU domestic supply)", relevance: "Très élevée"},
      {name: "Northvolt", role: "Batteries EU — acheteur cobalt, lithium, nickel (approvisionnement Afrique via traders)", relevance: "Très élevée"},
      {name: "Atlas Copco", role: "Équipements mines (foreuses, compresseurs) — vendu à mines africaines", relevance: "Très élevée"},
      {name: "Sandvik", role: "Équipements & outils mines Afrique — Zambie, Afrique du Sud, Ghana", relevance: "Très élevée"}
    ],
    crmaContact: "Tillväxtverket (Agence Suédoise pour la Croissance) + Geological Survey of Sweden (SGU) — inventaire terres rares. Business Sweden.",
    tradeAfricaHighlights: "Suède : équipements mines (Atlas Copco, Sandvik) essentiels en Afrique. LKAB terres rares Per Geijer — réserves EU records. Boliden minéraux critiques EU.",
    euCrmaRole: "Suède = leader EU mines propres (LKAB, Boliden). Terres rares Per Geijer = espoir EU autonomie. Northvolt = champion batteries. Sandvik/Atlas Copco — équipements mines africains."
  },

  // ============================================================
  // 10. FINLANDE 🇫🇮
  // ============================================================
  {
    id: "FI",
    name: "Finlande",
    officialName: "Suomi / Republiken Finland",
    flag: "🇫🇮",
    region: "eu",
    capital: "Helsinki",
    population: "5.6 millions (2025)",
    gdpNominal: "300 Mds USD (2025)",
    gdpPerCapita: "53 571 USD",
    currency: "Euro (EUR)",
    riskScore: 1,
    gdpPPP: "325 Mds USD (2025)",
    inflation: "1.8% (2025)",
    debtToGDP: "73%",
    area: "338 455 km²",
    density: "17 hab/km²",
    tradeBalance: "-5 Mds EUR",
    timezone: "UTC+2 (EET)",
    languages: "Finnois, Suédois",
    memberships: ["UE", "OTAN", "OCDE", "Zone Euro"],
    riskLabel: "Très faible",
    criticalMineralsDemand: [
      "Lithium (Keliber — production propre Finlande 2025)",
      "Cobalt (Freeport Cobalt — affineur Kokkola, 1er EU)",
      "Nickel (Terrafame — producteur propre, Sotkamo)",
      "Chrome (Kemi Mine — 1er EU producteur chrome, Outokumpu)",
      "Vanadium (Mustavaara — projet)",
      "Graphite (Grafintec — projet Värtsilä)"
    ],
    keyConsumingIndustries: [
      "Batteries (FREYR, Verkor client, BASF Finland)",
      "Mines (Boliden Finlande, Terrafame, Keliber)",
      "Acier inox (Outokumpu — 1er EU acier inox, chrome propre)",
      "Forêt & Papier (Stora Enso, UPM, Metsä Group)",
      "Technologies (Nokia, Kone, Wärtsilä)"
    ],
    keyEnterprisesForCorridor: [
      {name: "Freeport Cobalt (Kokkola)", role: "1er affineur cobalt EU — 100% dépendant cobalt RDC. Hub traitement Europe", relevance: "Très élevée"},
      {name: "Terrafame", role: "Producteur nickel-cobalt EU (Sotkamo). Réduction dépendance Afrique", relevance: "Très élevée"},
      {name: "Outokumpu", role: "1er acier inox EU — chrome Kemi (propre). Nickel, manganèse Afrique", relevance: "Élevée"},
      {name: "Wärtsilä", role: "Moteurs marins & groupes électrogènes Afrique. Énergie stockage", relevance: "Élevée"},
      {name: "Keliber", role: "Futur producteur lithium EU (Kaustinen) — réduction dépendance Afrique", relevance: "Très élevée"}
    ],
    crmaContact: "Ministère de l'Économie (TEM) — Stratégie Matières Premières Critiques. GTK (Geological Survey of Finland). Business Finland.",
    tradeAfricaHighlights: "Finlande hub traitement cobalt EU (Freeport Cobalt Kokkola = 100% cobalt RDC). Terrafame producteur nickel. Keliber lithium — 1er production EU 2025.",
    euCrmaRole: "Finlande = hub transformation minéraux EU (cobalt, nickel, chrome propre). Outokumpu chrome Kemi. Freeport Cobalt — dépendance RDC stratégique."
  },

  // ============================================================
  // 11. PORTUGAL 🇵🇹
  // ============================================================
  {
    id: "PT",
    name: "Portugal",
    officialName: "República Portuguesa",
    flag: "🇵🇹",
    region: "eu",
    capital: "Lisbonne",
    population: "10.3 millions (2025)",
    gdpNominal: "288 Mds USD (2025)",
    gdpPerCapita: "27 961 USD",
    currency: "Euro (EUR)",
    riskScore: 1,
    gdpPPP: "440 Mds USD (2025)",
    inflation: "2.6% (2025)",
    debtToGDP: "100%",
    area: "92 212 km²",
    density: "112 hab/km²",
    tradeBalance: "-20 Mds EUR",
    timezone: "UTC+0 (WET)",
    languages: "Portugais",
    memberships: ["UE", "OTAN", "OCDE", "Zone Euro", "CPLP"],
    riskLabel: "Très faible",
    criticalMineralsDemand: [
      "Lithium (2e réserves EU après Tchéquie — mines Barroso, Mina do Barroso Savannah Resources)",
      "Tungstène (mines Panasqueira — producteur propre)",
      "Cuivre (mine Neves-Corvo — 1er producteur EU cuivre propre)",
      "Étain (Neves-Corvo)",
      "Terres rares (études)",
      "Phosphates (Maroc — imports majeurs)"
    ],
    keyConsumingIndustries: [
      "Mines (Lundin Mining Neves-Corvo, Savannah Resources Barroso)",
      "Automobile (Volkswagen AutoEuropa, Stellantis Mangualde — transition VE)",
      "Énergie renouvelable (EDP — 1ère EU part renouvelable)",
      "Tourisme (1er secteur économique)",
      "Liège & Agroalimentaire (1er producteur liège mondial)"
    ],
    keyEnterprisesForCorridor: [
      {name: "EDP (Energias de Portugal)", role: "Énergies renouvelables Afrique — Mozambique (Cahora Bassa indirect), Brésil, Angola", relevance: "Élevée"},
      {name: "Galp Energia", role: "Pétrole & Gaz Afrique — Mozambique LNG, Angola, Namibie (Orange Basin découverte)", relevance: "Très élevée"},
      {name: "Lundin Mining (Neves-Corvo)", role: "1er producteur cuivre EU propre — modèle extraction EU", relevance: "Très élevée"},
      {name: "Savannah Resources", role: "Développement lithium Barroso — production attendue 2026", relevance: "Très élevée"},
      {name: "Mota-Engil", role: "Construction infrastructure Afrique (Angola, Mozambique, Malawi, Kenya)", relevance: "Très élevée"}
    ],
    crmaContact: "DGEG (Direção-Geral de Energia e Geologia) — Estratégia Nacional para as Matérias-Primas. AICEP Portugal Global.",
    tradeAfricaHighlights: "Portugal : lien lusophone Afrique (Angola, Mozambique, Cap-Vert, São Tomé, Guinée-Bissau). Mota-Engil — 1er constructeur EU présence Afrique. Galp — Mozambique LNG, Namibie.",
    euCrmaRole: "Portugal = producteur EU lithium (Barroso), cuivre (Neves-Corvo), tungstène (Panasqueira). Galp Namibie découverte Orange Basin stratégique EU."
  },

  // ============================================================
  // 12. IRLANDE 🇮🇪
  // ============================================================
  {
    id: "IE",
    name: "Irlande",
    officialName: "Éire / Ireland",
    flag: "🇮🇪",
    region: "eu",
    capital: "Dublin",
    population: "5.2 millions (2025)",
    gdpNominal: "593 Mds USD (2025)",
    gdpPerCapita: "114 038 USD",
    currency: "Euro (EUR)",
    riskScore: 1,
    gdpPPP: "680 Mds USD (2025)",
    inflation: "2.0% (2025)",
    debtToGDP: "44%",
    area: "70 273 km²",
    density: "74 hab/km²",
    tradeBalance: "+100 Mds EUR (multinationales)",
    timezone: "UTC+0 (GMT)",
    languages: "Anglais, Irlandais (gaélique)",
    memberships: ["UE", "OCDE", "Zone Euro"],
    riskLabel: "Très faible",
    criticalMineralsDemand: [
      "Zinc (mine Tara — 1ère EU zinc historique, Boliden)",
      "Plomb (Galmoy, Lisheen — épuisés)",
      "Lithium (batteries — Intel Irlande, data centers)",
      "Cuivre & Terres rares (chaîne Big Tech — Apple, Google, Microsoft Dublin)"
    ],
    keyConsumingIndustries: [
      "Pharmaceutique & Biotech (Pfizer, Johnson & Johnson, MSD, Roche — 1er exportateur pharma EU)",
      "Technologies (Apple, Google, Meta, Microsoft — QG EU Dublin)",
      "Finance (IFSC Dublin — hub financier EU)",
      "Agroalimentaire (Kerry Group, Glanbia)",
      "Data Centers (20% EU capacité data center)"
    ],
    keyEnterprisesForCorridor: [
      {name: "CRH plc", role: "1er producteur matériaux construction EU/monde — agrégats, ciment Afrique", relevance: "Élevée"},
      {name: "Boliden (Tara Mine)", role: "Mine zinc EU — producteur propre (Meath). Modèle mine EU", relevance: "Élevée"},
      {name: "AIB / Bank of Ireland", role: "Financement trade EU-Afrique, financement projets infrastructure", relevance: "Modérée"},
      {name: "Smurfit Kappa", role: "Emballage papier — bois (Afrique forêt, Congo, Afrique du Sud)", relevance: "Faible"},
      {name: "Kerry Group", role: "Ingrédients alimentaires — Afrique subsaharienne (produits locaux)", relevance: "Modérée"}
    ],
    crmaContact: "Department of Enterprise, Trade and Employment — Critical Raw Materials Strategy. Enterprise Ireland.",
    tradeAfricaHighlights: "Irlande hub Big Tech EU (Apple, Google, Meta). Très faible présence directe Afrique. CRH global dans construction. Lien diaspora irlandaise USA-Afrique indirect.",
    euCrmaRole: "Irlande consommateur indirect (Big Tech, pharma). Mine Tara zinc — historique EU. CRH acteur global matériaux de construction."
  },

  // ============================================================
  // 13. GRÈCE 🇬🇷
  // ============================================================
  {
    id: "GR",
    name: "Grèce",
    officialName: "Ελληνική Δημοκρατία",
    flag: "🇬🇷",
    region: "eu",
    capital: "Athènes",
    population: "10.4 millions (2025)",
    gdpNominal: "245 Mds USD (2025)",
    gdpPerCapita: "23 558 USD",
    currency: "Euro (EUR)",
    riskScore: 1,
    gdpPPP: "395 Mds USD (2025)",
    inflation: "2.8% (2025)",
    debtToGDP: "160%",
    area: "131 957 km²",
    density: "79 hab/km²",
    tradeBalance: "-30 Mds EUR",
    timezone: "UTC+2 (EET)",
    languages: "Grec",
    memberships: ["UE", "OTAN", "OCDE", "Zone Euro"],
    riskLabel: "Très faible",
    criticalMineralsDemand: [
      "Nickel (Larco GMMSA — 1er producteur EU nickel latéritique)",
      "Bauxite (1er producteur EU bauxite — Aluminium de Grèce)",
      "Alumine & Aluminium (Aluminium de Grèce — Mytilineos)",
      "Lignite (en transition, fermeture progressive)",
      "Magnésite (Grecian Magnesite — producteur majeur EU)"
    ],
    keyConsumingIndustries: [
      "Mines & Métallurgie (Mytilineos, Larco, Grecian Magnesite, Imerys Grèce)",
      "Transport maritime (1ère flotte mondiale — armateurs grecs)",
      "Tourisme (20% PIB)",
      "Énergie renouvelable (PPC, Mytilineos — solaire, éolien)"
    ],
    keyEnterprisesForCorridor: [
      {name: "Mytilineos Holdings", role: "Aluminium EU (bauxite propre), énergie renouvelable, projets Afrique (Ghana, Nigeria)", relevance: "Très élevée"},
      {name: "Costamare / Navios", role: "Transport maritime — vrac minéraux Afrique-EU (cabo, panamax)", relevance: "Très élevée"},
      {name: "Piraeus Bank", role: "Financement projets Méditerranée, trade Afrique Nord", relevance: "Modérée"},
      {name: "Imerys (Grèce)", role: "Minéraux industriels (bentonite, kaolin) — mines Milos", relevance: "Modérée"},
      {name: "Hellenic Petroleum (HELLENiQ Energy)", role: "Raffinerie — pétrole africain (Libye, Algérie)", relevance: "Modérée"}
    ],
    crmaContact: "Ministère de l'Environnement et de l'Énergie — Plan Matières Premières Critiques Grèce. Enterprise Greece.",
    tradeAfricaHighlights: "Grèce : 1ère flotte maritime mondiale (armateurs) — transport minéraux vrac Afrique. Mytilineos présence Afrique subsaharienne (Ghana énergie).",
    euCrmaRole: "Grèce = producteur EU bauxite/aluminium (Mytilineos), nickel (Larco), magnésite (Grecian). Flotte maritime grecque — vecteur logistique minéraux africains vers EU."
  },

  // ============================================================
  // 14. TCHÉQUIE 🇨🇿
  // ============================================================
  {
    id: "CZ",
    name: "Tchéquie",
    officialName: "Česká republika",
    flag: "🇨🇿",
    region: "eu",
    capital: "Prague",
    population: "10.9 millions (2025)",
    gdpNominal: "329 Mds USD (2025)",
    gdpPerCapita: "30 184 USD",
    currency: "Couronne tchèque (CZK)",
    riskScore: 1,
    gdpPPP: "520 Mds USD (2025)",
    inflation: "2.5% (2025)",
    debtToGDP: "44%",
    area: "78 871 km²",
    density: "138 hab/km²",
    tradeBalance: "+10 Mds EUR",
    timezone: "UTC+1 (CET)",
    languages: "Tchèque",
    memberships: ["UE", "OTAN", "OCDE"],
    riskLabel: "Très faible",
    criticalMineralsDemand: [
      "Lithium (1ères réserves EU — Cínovec/Zinnwald, European Lithium, Geomet)",
      "Étain (Cínovec — réserves importantes)",
      "Uranium (mines Dolní Rožínka — production propre, CEZ nucléaire)",
      "Terres rares (études Cínovec — sous-produit lithium)"
    ],
    keyConsumingIndustries: [
      "Automobile (Škoda/VW — 1er employeur industriel, 1M+ véhicules/an)",
      "Nucléaire (CEZ — Dukovany, Temelín, nouveau réacteur en appel d'offres)",
      "Machines & Outillage (Škoda Industries, Siemens CZ)",
      "Électronique (ON Semiconductor, STMicroelectronics CZ)",
      "Verre & Réfractaires (AGC, Imerys CZ)"
    ],
    keyEnterprisesForCorridor: [
      {name: "CEZ Group", role: "Énergie nucléaire — uranium propre (Dolní Rožínka). Discussions uranium Namibie, Niger", relevance: "Très élevée"},
      {name: "Geomet / European Lithium", role: "Cínovec — 1ères réserves lithium EU. Production attendue 2027+", relevance: "Très élevée"},
      {name: "Škoda Auto (VW Group)", role: "Automobile — transition VE. Fort demandeur lithium, cobalt batteries", relevance: "Très élevée"},
      {name: "Česká exportní banka", role: "Financement export projets Afrique (indirect)", relevance: "Modérée"},
      {name: "Komerční banka (SG)", role: "Filiale Société Générale — financement trade", relevance: "Modérée"}
    ],
    crmaContact: "Ministerstvo průmyslu a obchodu (MPO) — Strategie kritických surovin. CzechInvest. CzechTrade.",
    tradeAfricaHighlights: "Tchéquie : réserves lithium Cínovec majeures EU. CEZ nucléaire — intérêts uranium Afrique. Škoda Auto — fort demandeur batteries/minéraux.",
    euCrmaRole: "Tchéquie = futures réserves lithium EU (Cínovec, Ger→CZ). CEZ nucléaire — uranium domestique + Afrique. Hub automobile Škoda demandeur batteries."
  },

  // ============================================================
  // 15. ROUMANIE 🇷🇴
  // ============================================================
  {
    id: "RO",
    name: "Roumanie",
    officialName: "România",
    flag: "🇷🇴",
    region: "eu",
    capital: "Bucarest",
    population: "19.6 millions (2025)",
    gdpNominal: "350 Mds USD (2025)",
    gdpPerCapita: "17 857 USD",
    currency: "Leu roumain (RON)",
    riskScore: 1,
    gdpPPP: "730 Mds USD (2025)",
    inflation: "5.5% (2025)",
    debtToGDP: "49%",
    area: "238 397 km²",
    density: "82 hab/km²",
    tradeBalance: "-25 Mds EUR",
    timezone: "UTC+2 (EET)",
    languages: "Roumain",
    memberships: ["UE", "OTAN"],
    riskLabel: "Très faible",
    criticalMineralsDemand: [
      "Or & Argent (Roşia Montană — gisement majeur, controversé)",
      "Cuivre (mines Roumanie — producteur historique)",
      "Lithium (études)",
      "Cobalt (batteries — usines en développement)"
    ],
    keyConsumingIndustries: [
      "Automobile (Dacia/Renault — Pitești. Transition VE Dacia Spring, Bigster VE)",
      "Pétrole & Gaz (OMV Petrom — offshore Mer Noire, Neptun Deep)",
      "IT & Outsourcing (hub développeurs EU — Bucharest, Cluj)",
      "Agroalimentaire (1er producteur blé EU)"
    ],
    keyEnterprisesForCorridor: [
      {name: "OMV Petrom", role: "Pétrole & Gaz — Mer Noire (Neptun Deep). Pétrole Afrique indirect", relevance: "Modérée"},
      {name: "Dacia/Renault România", role: "Automobile VE — Dacia Spring (batterie lithium). Fort demandeur minéraux", relevance: "Élevée"},
      {name: "Gabriel Resources / Roşia Montană", role: "Or & argent Roumanie — potentiel minier domestique EU", relevance: "Élevée"},
      {name: "Banca Transilvania", role: "1ère banque Roumanie — financement projets locaux + export", relevance: "Faible"},
      {name: "Rompetrol (KazMunayGas)", role: "Raffinage pétrole — transit pétrole africain possible", relevance: "Faible"}
    ],
    crmaContact: "Ministerul Energiei — Strategie Materii Prime Critice. Invest Romania (AIPIS).",
    tradeAfricaHighlights: "Roumanie : hub automobile Dacia (VE). IT outsourcing dynamique. Peu de liens directs Afrique. OMV Petrom Mer Noire stratégique UE gaz.",
    euCrmaRole: "Roumanie : Neptun Deep gaz (OMV Petrom) — sécurité énergétique UE. Dacia VE — demandeur batteries. Potentiel minier Roşia Montană (or, argent)."
  },

  // ============================================================
  // 16. HONGRIE 🇭🇺
  // ============================================================
  {
    id: "HU",
    name: "Hongrie",
    officialName: "Magyarország",
    flag: "🇭🇺",
    region: "eu",
    capital: "Budapest",
    population: "9.7 millions (2025)",
    gdpNominal: "213 Mds USD (2025)",
    gdpPerCapita: "21 959 USD",
    currency: "Forint (HUF)",
    riskScore: 1,
    gdpPPP: "410 Mds USD (2025)",
    inflation: "4.0% (2025)",
    debtToGDP: "73%",
    area: "93 028 km²",
    density: "105 hab/km²",
    tradeBalance: "+5 Mds EUR",
    timezone: "UTC+1 (CET)",
    languages: "Hongrois",
    memberships: ["UE", "OTAN", "OCDE"],
    riskLabel: "Très faible",
    criticalMineralsDemand: [
      "Lithium (Samsung SDI, SK Innovation, CATL Gigafactories — hub batteries EU Est)",
      "Cobalt (batteries — SK Innovation Komárom, Samsung SDI Göd)",
      "Nickel (batteries)",
      "Terres rares (NdFeB aimants — OEM autos)"
    ],
    keyConsumingIndustries: [
      "Batteries (Samsung SDI Göd, SK Innovation Komárom, CATL Debrecen — 3 Gigafactories)",
      "Automobile (Audi Győr, Mercedes Kecskemét, BMW Debrecen — en construction)",
      "Énergie nucléaire (Paks — 4 réacteurs, extension Paks II Rosatom)",
      "Chimie (MOL Group — pétrole, gaz, pétrochimie)"
    ],
    keyEnterprisesForCorridor: [
      {name: "Samsung SDI (Göd)", role: "Gigafactory batteries — acheteur cobalt, lithium, nickel Africa", relevance: "Très élevée"},
      {name: "SK Innovation (Komárom)", role: "Gigafactory batteries — cobalt RDC, lithium Afrique du Sud", relevance: "Très élevée"},
      {name: "CATL (Debrecen)", role: "1er fabricant batteries mondial — chaîne approvisionnement Afrique", relevance: "Très élevée"},
      {name: "MOL Group", role: "Pétrole & gaz, pétrochimie — Afrique (indirect via trading)", relevance: "Modérée"},
      {name: "OTP Bank", role: "Banque — financement projets EU-Afrique (indirect)", relevance: "Faible"}
    ],
    crmaContact: "Ministry of Energy — Kritikus Nyersanyagok Stratégiája. HIPA (Hungarian Investment Promotion Agency).",
    tradeAfricaHighlights: "Hongrie = hub batteries EU (3 Gigafactories). Fort demandeur cobalt RDC, lithium Afrique. Paks II — sécurité uraniumrosse (Rosatom, discussions diversification).",
    euCrmaRole: "Hongrie = hub batteries critique EU (Samsung, SK, CATL). Demandeur cobalt RDC très élevé. Paks nucléaire — uranium stratégique."
  },

  // ============================================================
  // 17. DANEMARK 🇩🇰
  // ============================================================
  {
    id: "DK",
    name: "Danemark",
    officialName: "Kongeriget Danmark",
    flag: "🇩🇰",
    region: "eu",
    capital: "Copenhague",
    population: "5.9 millions (2025)",
    gdpNominal: "404 Mds USD (2025)",
    gdpPerCapita: "68 475 USD",
    currency: "Couronne danoise (DKK)",
    riskScore: 1,
    gdpPPP: "420 Mds USD (2025)",
    inflation: "1.5% (2025)",
    debtToGDP: "29%",
    area: "43 094 km²",
    density: "137 hab/km²",
    tradeBalance: "+20 Mds EUR",
    timezone: "UTC+1 (CET)",
    languages: "Danois",
    memberships: ["UE", "OTAN", "OCDE"],
    riskLabel: "Très faible",
    criticalMineralsDemand: [
      "Terres rares (Groenland — ressources propres considérables, non exploitées)",
      "Nickel & Cobalt (batteries éolien offshore — Ørsted)",
      "Cuivre (câbles offshore — NKT Cables)",
      "Titane & Zinc (construction, industrie)"
    ],
    keyConsumingIndustries: [
      "Éolien offshore (Ørsted — 1er mondial, Vestas — 1er fabricant turbines)",
      "Pharma (Novo Nordisk — 1ère capitalisation EU 2024)",
      "Shipping (Maersk — 1er armateur mondial, décarbonation méthanol/ammoniac)",
      "Agroalimentaire (Arla, Danish Crown)"
    ],
    keyEnterprisesForCorridor: [
      {name: "Maersk (A.P. Møller)", role: "1er armateur mondial — transport minéraux Afrique-EU. Ports Afrique (Tanger Med client)", relevance: "Très élevée"},
      {name: "Ørsted", role: "Éolien offshore — fort demandeur terres rares, cuivre, acier spécial", relevance: "Très élevée"},
      {name: "Vestas Wind Systems", role: "Turbines éolien — terres rares aimants, cuivre, acier. Projets Afrique (Égypte, Kenya)", relevance: "Très élevée"},
      {name: "FLSmidth", role: "Équipements mines et ciment — cimenteries Afrique, équipements cuivre Zambie", relevance: "Très élevée"},
      {name: "Novo Nordisk", role: "Pharma — intérêts indirects Africa (santé, indirect minéraux)", relevance: "Faible"}
    ],
    crmaContact: "Danish Business Authority — Strategi for Kritiske Råstoffer. Invest in Denmark. Grønlands Råstofdirektorat (Greenland Minerals).",
    tradeAfricaHighlights: "Danemark : Maersk = transport maritime clé minéraux Afrique. Vestas éolien Afrique (Kenya, Égypte). Groenland — ressources terres rares mondiales, non exploitées.",
    euCrmaRole: "Danemark : Groenland terres rares = potentiel EU immense (non exploité). Maersk — logistique maritime CRMA. Ørsted/Vestas — demandeurs terres rares critiques."
  },

  // ============================================================
  // 18. SLOVAQUIE 🇸🇰
  // ============================================================
  {
    id: "SK",
    name: "Slovaquie",
    officialName: "Slovenská republika",
    flag: "🇸🇰",
    region: "eu",
    capital: "Bratislava",
    population: "5.5 millions (2025)",
    gdpNominal: "127 Mds USD (2025)",
    gdpPerCapita: "23 091 USD",
    currency: "Euro (EUR)",
    riskScore: 1,
    gdpPPP: "220 Mds USD (2025)",
    inflation: "3.5% (2025)",
    debtToGDP: "58%",
    area: "49 035 km²",
    density: "111 hab/km²",
    tradeBalance: "+2 Mds EUR",
    timezone: "UTC+1 (CET)",
    languages: "Slovaque",
    memberships: ["UE", "OTAN", "OCDE", "Zone Euro"],
    riskLabel: "Très faible",
    criticalMineralsDemand: [
      "Lithium (batteries — Volkswagen, Stellantis usines Slovaquie)",
      "Cobalt (batteries — Inobat Auto, Jaguar Land Rover batteries)",
      "Magnésite (mines Lubeník — 2e EU producteur magnésite)",
      "Talc (mines Gemerská Poloma)"
    ],
    keyConsumingIndustries: [
      "Automobile (Volkswagen Bratislava, Stellantis Trnava, Kia Žilina — 1er EU voitures per capita)",
      "Batteries (InoBat — R&D, Jaguar batteries Šurany)",
      "Énergie nucléaire (JAVYS — Mochovce, Bohunice)",
      "Acier (U.S. Steel Košice)"
    ],
    keyEnterprisesForCorridor: [
      {name: "Volkswagen Bratislava", role: "Automobile VE — demandeur lithium, cobalt, terres rares", relevance: "Très élevée"},
      {name: "Kia Slovakia (Žilina)", role: "Automobile — transition VE. Batteries LG Energy fournie", relevance: "Élevée"},
      {name: "U.S. Steel Košice", role: "Acier — manganèse, chrome Afrique du Sud (indirect)", relevance: "Modérée"},
      {name: "InoBat Auto", role: "Batteries R&D — approvisionnement cobalt, lithium", relevance: "Élevée"},
      {name: "SARIO", role: "Agence investissement — promotion partenariats industriels", relevance: "Faible"}
    ],
    crmaContact: "Ministerstvo hospodárstva SR — Stratégia kritických surovín. SARIO (Slovak Investment and Trade Development Agency).",
    tradeAfricaHighlights: "Slovaquie : hub automobile EU (1er per capita production voitures). Forte demande batteries transition VE. Magnésite propre EU (Lubeník).",
    euCrmaRole: "Slovaquie = centre automobile EU demandeur minéraux batteries. Magnésite propre EU. InoBat — futur hub batteries Slovaquie."
  },

  // ============================================================
  // 19. BULGARIE 🇧🇬
  // ============================================================
  {
    id: "BG",
    name: "Bulgarie",
    officialName: "Република България",
    flag: "🇧🇬",
    region: "eu",
    capital: "Sofia",
    population: "6.5 millions (2025)",
    gdpNominal: "103 Mds USD (2025)",
    gdpPerCapita: "15 846 USD",
    currency: "Lev bulgare (BGN, pegged EUR)",
    riskScore: 1,
    gdpPPP: "210 Mds USD (2025)",
    inflation: "3.0% (2025)",
    debtToGDP: "23%",
    area: "110 879 km²",
    density: "62 hab/km²",
    tradeBalance: "-5 Mds EUR",
    timezone: "UTC+2 (EET)",
    languages: "Bulgare",
    memberships: ["UE", "OTAN"],
    riskLabel: "Très faible",
    criticalMineralsDemand: [
      "Cuivre (mines Asarel-Medet, Chelopech — 1er producteur cuivre EU après Portugal)",
      "Or (mine Chelopech — Dundee Precious Metals)",
      "Zinc & Plomb (fonderie KCM Plovdiv — Umicore)",
      "Charbon (transition lignite)",
      "Lithium (études)"
    ],
    keyConsumingIndustries: [
      "Mines & Métallurgie (Asarel-Medet, KCM Plovdiv/Umicore, Chelopech)",
      "Chimie & Raffinerie (LUKOIL Neftohim Burgas)",
      "IT & Outsourcing (hub dev EU — Sofia)",
      "Automobile composants",
      "Agriculture"
    ],
    keyEnterprisesForCorridor: [
      {name: "Dundee Precious Metals (Chelopech)", role: "Mine or-cuivre EU — modèle extraction EU propre", relevance: "Élevée"},
      {name: "Asarel-Medet", role: "1er producteur cuivre Bulgarie — cuivre EU propre", relevance: "Très élevée"},
      {name: "KCM / Umicore (Plovdiv)", role: "Fonderie plomb-zinc — transit minéraux Afrique possible", relevance: "Élevée"},
      {name: "Kaolin (Batak, Momin Prohod)", role: "Kaolin EU — minéraux industriels", relevance: "Modérée"},
      {name: "First Investment Bank", role: "Banque financement projets locaux", relevance: "Faible"}
    ],
    crmaContact: "Ministry of Energy — Стратегия за критичните суровини. InvestBulgaria Agency.",
    tradeAfricaHighlights: "Bulgarie : mines cuivre et or EU propres. Fonderie KCM Plovdiv (Umicore). Hub IT Sofia. Faible présence directe Afrique.",
    euCrmaRole: "Bulgarie = producteur EU cuivre (Asarel-Medet), or (Chelopech), zinc-plomb (KCM). Contribution mines propres EU CRMA."
  },

  // ============================================================
  // 20. CROATIE 🇭🇷
  // ============================================================
  {
    id: "HR",
    name: "Croatie",
    officialName: "Republika Hrvatska",
    flag: "🇭🇷",
    region: "eu",
    capital: "Zagreb",
    population: "3.9 millions (2025)",
    gdpNominal: "84 Mds USD (2025)",
    gdpPerCapita: "21 538 USD",
    currency: "Euro (EUR, depuis 2023)",
    riskScore: 1,
    gdpPPP: "150 Mds USD (2025)",
    inflation: "3.2% (2025)",
    debtToGDP: "62%",
    area: "56 594 km²",
    density: "68 hab/km²",
    tradeBalance: "-10 Mds EUR",
    timezone: "UTC+1 (CET)",
    languages: "Croate",
    memberships: ["UE", "OTAN", "Zone Euro (depuis 2023)"],
    riskLabel: "Très faible",
    criticalMineralsDemand: [
      "Lithium (batteries — Rimac Technologies — Bugatti électrique)",
      "Terres rares (Rimac, électronique)",
      "Bauxite (historique, peu actif)",
      "Magnésite (Bruvno — production historique)"
    ],
    keyConsumingIndustries: [
      "Automobile électrique (Rimac Technologies — Bugatti, Porsche Croatie)",
      "Tourisme (20% PIB)",
      "Pharmacie (Pliva/Teva Croatie)",
      "Agroalimentaire",
      "IT & Innovation (Zagreb tech hub)"
    ],
    keyEnterprisesForCorridor: [
      {name: "Rimac Technologies", role: "Véhicules électriques haute performance (Nevera). Batteries — demandeur lithium, cobalt", relevance: "Élevée"},
      {name: "INA (MOL Group)", role: "Pétrole & gaz Croatie — hydrocarbures Méditerranée", relevance: "Modérée"},
      {name: "Podravka", role: "Agroalimentaire — export Afrique (indirect)", relevance: "Faible"},
      {name: "Hrvatska banka za obnovu i razvitak (HBOR)", role: "Banque développement — financement export", relevance: "Faible"},
      {name: "Atlantic Grupa", role: "Agroalimentaire — distribution Balkans, export", relevance: "Faible"}
    ],
    crmaContact: "Ministarstvo gospodarstva i održivog razvoja — Strategija kritičnih sirovina. HAMAG-BICRO. Croatian Chamber of Economy.",
    tradeAfricaHighlights: "Croatie : faible présence Afrique. Rimac — champion tech VE croate. Tourisme méditerranéen dominant.",
    euCrmaRole: "Croatie : Rimac — vitrine EU VE haut de gamme (demandeur batteries critiques). Contribution EU CRMA modeste."
  },

  // ============================================================
  // 21. LITUANIE 🇱🇹
  // ============================================================
  {
    id: "LT",
    name: "Lituanie",
    officialName: "Lietuvos Respublika",
    flag: "🇱🇹",
    region: "eu",
    capital: "Vilnius",
    population: "2.9 millions (2025)",
    gdpNominal: "75 Mds USD (2025)",
    gdpPerCapita: "25 862 USD",
    currency: "Euro (EUR)",
    riskScore: 1,
    gdpPPP: "130 Mds USD (2025)",
    inflation: "2.8% (2025)",
    debtToGDP: "38%",
    area: "65 300 km²",
    density: "43 hab/km²",
    tradeBalance: "-5 Mds EUR",
    timezone: "UTC+2 (EET)",
    languages: "Lituanien",
    memberships: ["UE", "OTAN", "OCDE", "Zone Euro"],
    riskLabel: "Très faible",
    criticalMineralsDemand: [
      "Ambre (Lituanie = 1er producteur EU ambre — minéral particulier)",
      "Lithium (batteries — Energizer Baltic, industrie)",
      "Terres rares (laser tech — EKSPLA, Light Conversion)",
      "Potasse (transit Biélorussie — Klaipėda port, impacté sanctions)"
    ],
    keyConsumingIndustries: [
      "Lasers & Photonique (Ekspla, Light Conversion, Amplitude — leader mondial EU lasers scientifiques)",
      "IT & Fintech (Vinted, Kevin, Revolut Vilnius office)",
      "Transit & Logistique (Port Klaipėda — transit Biélorussie, Belarus, Ukraine)",
      "Agroalimentaire",
      "Pharmaceutique (Sanitas/Teva)"
    ],
    keyEnterprisesForCorridor: [
      {name: "EKSPLA / Light Conversion", role: "Lasers de précision — terres rares, cristaux spéciaux. Export mondial", relevance: "Modérée"},
      {name: "Klaipėda Port", role: "2e port Baltique — transit potasse, engrais, vrac (Biélorussie sancionné)", relevance: "Élevée"},
      {name: "Ignitis Group", role: "Énergie renouvelable — éolien, batteries stockage, transition", relevance: "Modérée"},
      {name: "Investicijų ir verslo garantijos (INVEGA)", role: "Financement PME, export", relevance: "Faible"},
      {name: "SEB Bankas / Luminor", role: "Financement projets baltes, trade finance", relevance: "Faible"}
    ],
    crmaContact: "Lithuanian Ministry of Economy and Innovation — CRM Strategy. Invest Lithuania.",
    tradeAfricaHighlights: "Lituanie : très faible présence Afrique. Hub IT Vilnius. Port Klaipėda — transit stratégique Baltique. Lasers scientifiques exportés monde entier.",
    euCrmaRole: "Lituanie contribution CRMA modeste. Klaipėda — transit engrais potasse (affecté par sanctions Biélorussie). Lasers — tech critique EU."
  },

  // ============================================================
  // 22. SLOVÉNIE 🇸🇮
  // ============================================================
  {
    id: "SI",
    name: "Slovénie",
    officialName: "Republika Slovenija",
    flag: "🇸🇮",
    region: "eu",
    capital: "Ljubljana",
    population: "2.1 millions (2025)",
    gdpNominal: "66 Mds USD (2025)",
    gdpPerCapita: "31 429 USD",
    currency: "Euro (EUR)",
    riskScore: 1,
    gdpPPP: "105 Mds USD (2025)",
    inflation: "2.5% (2025)",
    debtToGDP: "69%",
    area: "20 273 km²",
    density: "104 hab/km²",
    tradeBalance: "+2 Mds EUR",
    timezone: "UTC+1 (CET)",
    languages: "Slovène",
    memberships: ["UE", "OTAN", "OCDE", "Zone Euro"],
    riskLabel: "Très faible",
    criticalMineralsDemand: [
      "Lithium (batteries — Domel, Kolektor — composants VE)",
      "Cobalt (électronique, batteries)",
      "Zinc (Mežica — mine historique)",
      "Plomb (production historique)"
    ],
    keyConsumingIndustries: [
      "Automobile composants (Domel, Kolektor, Revoz/Renault)",
      "Pharma & Médical (Lek/Novartis, Krka — 1er pharma Slovénie, export 30+ pays Afrique)",
      "IT & Électronique (Iskratel, Gorenje/Hisense)",
      "Tourisme (Bled, Karst)"
    ],
    keyEnterprisesForCorridor: [
      {name: "Krka", role: "Pharma — présence 45 pays dont 20 Afrique (Afrique du Sud, Kenya, Nigéria — génériques)", relevance: "Très élevée"},
      {name: "Kolektor Group", role: "Composants électriques VE, industrie — demandeur cuivre, terres rares", relevance: "Élevée"},
      {name: "Revoz (Renault Slovenija)", role: "Automobile — transition VE (Renault Twingo VE) — demandeur batteries", relevance: "Élevée"},
      {name: "HETA Asset Resolution / NLB", role: "Banque NLB — financement projets Balkans et export", relevance: "Faible"},
      {name: "SIJ Group", role: "Acier inox spécial — consommateur nickel, chrome, manganèse", relevance: "Modérée"}
    ],
    crmaContact: "Ministry of the Economy — Strategija kritičnih surovin. Spirit Slovenia (agence promotion).",
    tradeAfricaHighlights: "Slovénie : Krka pharma = présence réelle Afrique (génériques). Kolektor VE composants. Très petite économie mais dynamique export.",
    euCrmaRole: "Slovénie contribution modeste CRMA. Krka — export pharma Afrique (indirect mineral link). Kolektor — composants VE EU."
  },

  // ============================================================
  // 23. LETTONIE 🇱🇻
  // ============================================================
  {
    id: "LV",
    name: "Lettonie",
    officialName: "Latvijas Republika",
    flag: "🇱🇻",
    region: "eu",
    capital: "Riga",
    population: "1.9 millions (2025)",
    gdpNominal: "44 Mds USD (2025)",
    gdpPerCapita: "23 158 USD",
    currency: "Euro (EUR)",
    riskScore: 1,
    gdpPPP: "75 Mds USD (2025)",
    inflation: "3.0% (2025)",
    debtToGDP: "44%",
    area: "64 589 km²",
    density: "29 hab/km²",
    tradeBalance: "-4 Mds EUR",
    timezone: "UTC+2 (EET)",
    languages: "Letton",
    memberships: ["UE", "OTAN", "OCDE", "Zone Euro"],
    riskLabel: "Très faible",
    criticalMineralsDemand: [
      "Bois & Biomasse (forêts lettones — export pellets, papier)",
      "Potasse transit (Riga port — historique)",
      "Lithium (batteries — Latvenergo — transition)",
      "Terres rares (IT, fintech)"
    ],
    keyConsumingIndustries: [
      "Forêt & Bois (1er export letton — papier, pellets, mobilier)",
      "IT & Fintech (Riga tech hub — Printify, Lokalise, Accenture Latvia)",
      "Transit & Logistique (Port de Riga — transit, gaz Baltique)",
      "Pharmaceutique (Grindeks, Olainfarm)"
    ],
    keyEnterprisesForCorridor: [
      {name: "Latvenergo", role: "Énergie hydraulique + éolien — transition stockage batteries", relevance: "Modérée"},
      {name: "Grindeks", role: "Pharma — Meldonium, génériques — export Afrique (indirect)", relevance: "Faible"},
      {name: "AirBaltic", role: "Transport aérien Baltique — connexions EU-Afrique (indirect)", relevance: "Faible"},
      {name: "Port de Riga / Freeport", role: "Port transit — vrac, engrais, produits forestiers", relevance: "Modérée"},
      {name: "ALTUM", role: "Institution financement développement — soutien PME export", relevance: "Faible"}
    ],
    crmaContact: "Ministry of Economics — Kritiskie izejmateriāli Latvija. Investment and Development Agency of Latvia (LIAA).",
    tradeAfricaHighlights: "Lettonie : très faible présence Afrique. Hub IT Riga en développement. Port Riga — transit régional Baltique.",
    euCrmaRole: "Lettonie contribution CRMA très faible. Forêt biomasse — énergie renouvelable EU. Transition énergétique — demandeur batteries stockage."
  },

  // ============================================================
  // 24. ESTONIE 🇪🇪
  // ============================================================
  {
    id: "EE",
    name: "Estonie",
    officialName: "Eesti Vabariik",
    flag: "🇪🇪",
    region: "eu",
    capital: "Tallinn",
    population: "1.4 millions (2025)",
    gdpNominal: "37 Mds USD (2025)",
    gdpPerCapita: "26 429 USD",
    currency: "Euro (EUR)",
    riskScore: 1,
    gdpPPP: "65 Mds USD (2025)",
    inflation: "3.5% (2025)",
    debtToGDP: "19%",
    area: "45 339 km²",
    density: "30 hab/km²",
    tradeBalance: "-3 Mds EUR",
    timezone: "UTC+2 (EET)",
    languages: "Estonien",
    memberships: ["UE", "OTAN", "OCDE", "Zone Euro"],
    riskLabel: "Très faible",
    criticalMineralsDemand: [
      "Schistes bitumineux (énergie propre — Eesti Energia — 70% électricité, en transition)",
      "Phosphorite (mines Maardu — arrêtées, réserves connues)",
      "Lithium (batteries — transition industrielle)",
      "Terres rares (digital tech — Bolt, Wise, Pipedrive)"
    ],
    keyConsumingIndustries: [
      "E-Government & Digital (leader mondial e-État — Tallinn e-governance)",
      "IT & Startups (Bolt, Wise, Skype — fondé Tallinn, Pipedrive)",
      "Énergie (Eesti Energia — schistes bitumineux → renouvelable)",
      "Bois & Papier (Graanul Invest — pellets, Europe)",
      "Maritime & Logistique (Tallink, Nordeste)"
    ],
    keyEnterprisesForCorridor: [
      {name: "Eesti Energia (Enefit)", role: "Énergie — schistes bitumineux + renouvelable. Phosphorite EU (études)", relevance: "Modérée"},
      {name: "Bolt (transport)", role: "Plateforme VTC & delivery — présence Afrique (Ghana, Nigeria, Kenya, Tanzanie)", relevance: "Très élevée"},
      {name: "Wise (fintech)", role: "Transferts d'argent — diaspora africaine en EU. Transactions minéraux trade", relevance: "Élevée"},
      {name: "Cleveron (robotique)", role: "Automatisation logistique — export potentiel Afrique", relevance: "Faible"},
      {name: "LHV Bank", role: "Fintech banking — partenaire startups export", relevance: "Faible"}
    ],
    crmaContact: "Ministry of Economic Affairs — Critical Raw Materials Estonia. Enterprise Estonia (EAS).",
    tradeAfricaHighlights: "Estonie : Bolt présence réelle Afrique subsaharienne (Ghana, Nigeria, Kenya). Leader EU e-gouvernement. Faible présence industrielle Afrique.",
    euCrmaRole: "Estonie contribution CRMA modeste. Bolt — infrastructure numérique Afrique. Phosphorite Maardu — potentiel UE non exploité. Digital e-government exportable Afrique."
  },

  // ============================================================
  // 25. CHYPRE 🇨🇾
  // ============================================================
  {
    id: "CY",
    name: "Chypre",
    officialName: "Κυπριακή Δημοκρατία",
    flag: "🇨🇾",
    region: "eu",
    capital: "Nicosie",
    population: "1.3 millions (2025)",
    gdpNominal: "30 Mds USD (2025)",
    gdpPerCapita: "23 077 USD",
    currency: "Euro (EUR)",
    riskScore: 2,
    gdpPPP: "45 Mds USD (2025)",
    inflation: "2.2% (2025)",
    debtToGDP: "77%",
    area: "9 251 km²",
    density: "141 hab/km²",
    tradeBalance: "-8 Mds EUR",
    timezone: "UTC+2 (EET)",
    languages: "Grec, Turc",
    memberships: ["UE", "Zone Euro"],
    riskLabel: "Faible-Modéré",
    criticalMineralsDemand: [
      "Cuivre (mines Skouriotissa — 1ère mine cuivre EU historique, actuelle)",
      "Chromite (mines Troodos — production historique)",
      "Or & Argent (sous-produit cuivre)",
      "Gaz naturel (Bloc 12 — Aphrodite, ENI-TotalEnergies — Méditerranée orientale)"
    ],
    keyConsumingIndustries: [
      "Finance & Services (hub offshore — 1er PIB services financiers EU)",
      "Tourisme (20%+ PIB)",
      "Mines (Hellenic Copper Mines Skouriotissa)",
      "Shipping Registry (3e registre maritime mondial)",
      "Immobilier & Construction"
    ],
    keyEnterprisesForCorridor: [
      {name: "Hellenic Copper Mines (Skouriotissa)", role: "Cuivre EU propre — production actuelle, vente concentré", relevance: "Élevée"},
      {name: "Bank of Cyprus", role: "Banque — financement trade, registre entreprises africaines (hub fiscal)", relevance: "Modérée"},
      {name: "Cyprus Shipping Council", role: "Registre maritime — pavillons, transport minéraux Afrique-EU", relevance: "Très élevée"},
      {name: "ENI/TotalEnergies (Chypre)", role: "Bloc gazier Aphrodite — gaz Méditerranée Est", relevance: "Élevée"},
      {name: "Limassol Port", role: "Port — transit Méditerranée orientale", relevance: "Modérée"}
    ],
    crmaContact: "Ministry of Energy, Commerce and Industry — CRM Strategy Cyprus. Invest Cyprus.",
    tradeAfricaHighlights: "Chypre : hub financier EU. Registre maritime 3e mondial (pavillons). Skouriotissa — mine cuivre EU. Gaz Aphrodite — Méditerranée Est stratégique.",
    euCrmaRole: "Chypre : cuivre EU propre (Skouriotissa). Hub maritime — logistics minéraux. Registre pavillons — transport mineral shipping."
  },

  // ============================================================
  // 26. LUXEMBOURG 🇱🇺
  // ============================================================
  {
    id: "LU",
    name: "Luxembourg",
    officialName: "Grand-Duché de Luxembourg",
    flag: "🇱🇺",
    region: "eu",
    capital: "Luxembourg",
    population: "0.67 millions (2025)",
    gdpNominal: "85 Mds USD (2025)",
    gdpPerCapita: "126 866 USD",
    currency: "Euro (EUR)",
    riskScore: 1,
    gdpPPP: "90 Mds USD (2025)",
    inflation: "2.0% (2025)",
    debtToGDP: "25%",
    area: "2 586 km²",
    density: "260 hab/km²",
    tradeBalance: "-5 Mds EUR",
    timezone: "UTC+1 (CET)",
    languages: "Luxembourgeois, Français, Allemand",
    memberships: ["UE", "OTAN", "OCDE", "Zone Euro", "Benelux"],
    riskLabel: "Très faible",
    criticalMineralsDemand: [
      "Acier spécial (ArcelorMittal — siège mondial Luxembourg)",
      "Minerais fer & manganèse (ArcelorMittal production globale)",
      "Terres rares (finance fonds miniers — LFF)",
      "Ressources spatiales (Space Resources Luxembourg — 1ère loi EU exploitation astéroïdes 2017)"
    ],
    keyConsumingIndustries: [
      "Finance (Places financière EU — fonds d'investissement, 4 000+ fonds miniers, Africa PE)",
      "Acier (ArcelorMittal — siège mondial, Belval usine EU)",
      "Spatial (SES, Luxspace, Luxembourg Space Agency — Space Resources Act)",
      "ICT (Télécoms, data centers, Docler)"
    ],
    keyEnterprisesForCorridor: [
      {name: "ArcelorMittal", role: "1er sidérurgiste mondial (siège Lux). Mines fer Afrique (Liberia, Sénégal, Sierra Leone)", relevance: "Très élevée"},
      {name: "Société Générale Luxembourg", role: "Financement fonds Afrique — trade finance minéraux, ESG bonds", relevance: "Très élevée"},
      {name: "Luxembourg Investment Office", role: "Hub fonds Africa PE/VC, financement projets miniers Afrique", relevance: "Très élevée"},
      {name: "SES (Satellites)", role: "Satellites communications — couverture Afrique. Connectivité mines.", relevance: "Élevée"},
      {name: "Cargolux", role: "Cargo aérien — transport minerais, équipements mines Afrique", relevance: "Élevée"}
    ],
    crmaContact: "Ministère de l'Économie — Plan National Matières Premières Critiques. Luxembourg for Finance (LFF). Luxembourg Space Agency.",
    tradeAfricaHighlights: "Luxembourg : ArcelorMittal — mines fer Afrique (Liberia LAMCO historical). Hub finance EU pour fonds mines africains. Place financière 4 000+ fonds.",
    euCrmaRole: "Luxembourg = hub finance miniers EU-Afrique. ArcelorMittal — acier mondial mines Afrique. Space Resources Act — futur mines extraterrestres. Finance ESG bonds mines."
  },

  // ============================================================
  // 27. MALTE 🇲🇹
  // ============================================================
  {
    id: "MT",
    name: "Malte",
    officialName: "Repubblika ta' Malta",
    flag: "🇲🇹",
    region: "eu",
    capital: "La Valette",
    population: "0.54 millions (2025)",
    gdpNominal: "22 Mds USD (2025)",
    gdpPerCapita: "40 741 USD",
    currency: "Euro (EUR)",
    riskScore: 1,
    gdpPPP: "30 Mds USD (2025)",
    inflation: "2.8% (2025)",
    debtToGDP: "55%",
    area: "316 km²",
    density: "1 680 hab/km²",
    tradeBalance: "-3 Mds EUR",
    timezone: "UTC+1 (CET)",
    languages: "Maltais, Anglais",
    memberships: ["UE", "Zone Euro", "Commonwealth"],
    riskLabel: "Très faible",
    criticalMineralsDemand: [
      "Pierre calcaire (Coralline — construction propre)",
      "Sel (salines historiques)",
      "Lithium (batteries — transition VE, maritime)",
      "Terres rares (électronique, fintech)"
    ],
    keyConsumingIndustries: [
      "Finance & iGaming (Hub fintech EU — Betsson, Kindred Malte)",
      "Tourisme (25% PIB)",
      "Shipping & Maritime (Registre maritime 7e mondial, pavillons)",
      "Pharmaceutique (Baxter, STMicroelectronics Malte)",
      "Aviation MRO (Lufthansa Technik Malta)"
    ],
    keyEnterprisesForCorridor: [
      {name: "Malta Maritime Authority", role: "7e registre maritime mondial — pavillons transport minéraux Afrique-EU", relevance: "Très élevée"},
      {name: "Air Malta / KM Malta Airlines", role: "Transport aérien Méditerranée — connexions Afrique Nord", relevance: "Modérée"},
      {name: "Bank of Valletta (BOV)", role: "Banque Malte — financement trade Méditerranée", relevance: "Faible"},
      {name: "STMicroelectronics Malta", role: "Semi-conducteurs — terres rares, silicium critique", relevance: "Modérée"},
      {name: "APS Bank", role: "Financement projets locaux", relevance: "Faible"}
    ],
    crmaContact: "Ministry for the Environment, Energy and Enterprise (MEEE) — Malta CRM Strategy. Malta Enterprise.",
    tradeAfricaHighlights: "Malte : hub maritime (pavillons 7e mondial) — transport minéraux Afrique. Fintech iGaming hub EU. Carrefour Méditerranée-Afrique Nord.",
    euCrmaRole: "Malte contribution CRMA modeste. Registre maritime — logistique transport minéraux EU-Afrique. Carrefour géographique Méditerranée."
  }

]; // END DATA_EU_COUNTRIES

// ============================================================
// EXPORT / MODULE CHECK
// Usage: include this file in RAQIB platform after
// data_morocco.js and data_others.js
// ============================================================


// --- MASTER COUNTRIES ARRAY ---
export const ALL_COUNTRIES: Country[] = [
  DATA_MOROCCO,
  DATA_NIGERIA,
  DATA_SENEGAL,
  DATA_COTEDIVOIRE,
  DATA_GHANA,
  ...DATA_REMAINING_AFRICA,
  ...DATA_EU_COUNTRIES
];

export const AFRICA_COUNTRIES: Country[] = [
  DATA_MOROCCO,
  DATA_NIGERIA,
  DATA_SENEGAL,
  DATA_COTEDIVOIRE,
  DATA_GHANA,
  ...DATA_REMAINING_AFRICA
];

export const EU_COUNTRIES_LIST: Country[] = [...DATA_EU_COUNTRIES];

// Build search index
export const SEARCH_INDEX: SearchItem[] = (() => {
  const items: SearchItem[] = [];
  ALL_COUNTRIES.forEach(c => {
    items.push({ id: c.id, name: c.name, type: 'country' });
    if (c.enterprises) {
      c.enterprises.forEach(e => {
        items.push({ id: c.id, name: e.name, type: 'enterprise', country: c.name });
      });
    }
    if (c.minerals) {
      c.minerals.forEach(m => {
        items.push({ id: c.id, name: m.name, type: 'mineral', country: c.name });
      });
    }
    if (c.keyEnterprisesForCorridor) {
      c.keyEnterprisesForCorridor.forEach(e => {
        const name = typeof e === 'string' ? e : e.name;
        items.push({ id: c.id, name, type: 'enterprise', country: c.name });
      });
    }
  });
  return items;
})();
