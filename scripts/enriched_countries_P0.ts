// ============================================================
// RAQIB Corridor Intelligence Platform - ENRICHISSEMENT TRACK D
// Pays P0 Afrique: RDC (CD), Guinée (GN), Gabon (GA), Rwanda (RW), Angola (AO)
// Données étendues (12 catégories) prêtes à l'insertion dans data.ts
// ============================================================

export const DATA_RDC_ENRICHED = {
  // Remplacer ou fusionner avec l'existant :
  industries: {
    gdpBySector: { agriculture: 20, industry: 43, services: 37, mining: 38 },
    keyIndustries: [
      { name: "Mines et métallurgie", description: "Moteur de l'économie, 74% du cobalt mondial, 1er producteur africain de cuivre.", share: ">30% du PIB" },
      { name: "Construction et infrastructures", description: "Projets liés au programme Sino-Congolais de développement.", share: "~5% du PIB" },
      { name: "Agriculture de rente", description: "Café, cacao, huile de palme, caoutchouc. Potentiel immense mais sous-exploité.", share: "20% du PIB" }
    ],
    sez: [
      { name: "ZES de Maluku", location: "Kinshasa", advantages: "Exonération impôts sur 10 ans, hub industriel." },
      { name: "ZES Musienene", location: "Nord-Kivu", advantages: "Agro-industrie et matériaux de construction." }
    ],
    majorProjects: [
      "Barrage Grand Inga (Infrastructures hydroélectriques massives)",
      "Projet Lithium de Manono (AVZ Minerals / Zijin)",
      "Kamoa-Kakula (Expansion cuivre - Ivanhoe Mines)",
      "Port en eaux profondes de Banana (DP World)"
    ],
    banking: {
      mainBanks: ["Rawbank", "Equity BCDC", "Trust Merchant Bank (TMB)", "Sofibanque", "Ecobank RDC"],
      totalAssets: "~$11 Mds",
      bancarisation: "~7%"
    },
    telecom: {
      operators: ["Vodacom", "Airtel", "Orange", "Africell"],
      mobilePenetration: "45%",
      internetPenetration: "22%"
    },
    energy: {
      mix: "Hydraulique 95%, Thermique 5%",
      installedCapacity: "2.8 GW",
      renewableProjects: "Rénovation Inga I & II, Développement Inga III."
    }
  },
  billionaires: [
    { name: "Moïse Katumbi", fortune: "~$600 M", source: "Mines, Logistique, Pêche", companies: "MCK (vendue), divers investissements", age: "59", education: "Psychologie", bio: "Ex-gouverneur du Katanga, figure politique et homme d'affaires influent." },
    { name: "Famille Rawji", fortune: "~$500 M", source: "Banque, Distribution, FMCG", companies: "Rawbank, Beltexco, Prodimpex", age: "Multiples", education: "Internationale", bio: "Propriétaires de Rawbank, première banque du pays, et d'un empire commercial." },
    { name: "George Forrest", fortune: "~$400 M", source: "Mines, BTP, Ciment", companies: "Groupe Forrest International", age: "83", education: "Université Libre de Bruxelles", bio: "Dynastie industrielle historique au Katanga (cuivre, cobalt)." },
    { name: "Dan Gertler", fortune: "~$1.2 Mds", source: "Mines (cuivre/cobalt, diamants)", companies: "Fleurette Group, Ventora", age: "50", education: "Israël", bio: "Milliardaire israélien très actif (et sanctionné) en RDC." },
    { name: "Barnabe Kikaya Bin Karubi", fortune: "Non évaluée", source: "Immobilier, Télécoms, Politique", companies: "Divers intérêts", age: "70", education: "USA", bio: "Figure de l'ancien régime avec d'importants intérêts d'affaires." }
  ],
  contacts: {
    chambers: ["Chambre de Commerce Franco-Congolaise (CCIFC)", "Fédération des Entreprises du Congo (FEC)"],
    businessFrance: "Bureau Business France à Kinshasa",
    bpifrance: "Couvert depuis le bureau régional en Afrique centrale",
    afd: "Bureau AFD Kinshasa",
    lawFirms: ["Emery Mukendi Wafwana & Associates", "Cabuzel", "Kalamba & Associés"],
    big4: ["KPMG RDC", "PwC RDC", "Deloitte RDC", "EY RDC"],
    investmentBanks: ["TMB Advisory", "Rawbank Corporate"],
    patronat: "FEC (Fédération des Entreprises du Congo)",
    diaspora: "Importante diaspora en Belgique, France, UK et Afrique du Sud."
  },
  universities: [
    { name: "Université de Kinshasa (UNIKIN)", city: "Kinshasa", students: "30 000+", specialties: "Médecine, Sciences, Droit", ranking: "1ère RDC" },
    { name: "Université de Lubumbashi (UNILU)", city: "Lubumbashi", students: "25 000+", specialties: "Géologie, Polytech, Mines", ranking: "2e RDC" },
    { name: "Université Protestante au Congo (UPC)", city: "Kinshasa", students: "10 000+", specialties: "Économie, Médecine", ranking: "3e RDC" },
    { name: "Université Catholique du Congo (UCC)", city: "Kinshasa", students: "8 000+", specialties: "Droit, Sciences Po", ranking: "Top 5 RDC" }
  ],
  logistics: {
    ports: [
      { name: "Matadi", capacity: "1.5 M de tonnes", operator: "SCTP", draft: "Pêchant limité", note: "Principal port maritime, engorgement fréquent." },
      { name: "Banana (en construction)", capacity: "Phase 1: 322 000 TEU", operator: "DP World", draft: "18 m", note: "Futur hub en eaux profondes." }
    ],
    airports: [
      { name: "N'djili (Kinshasa)", traffic: "~1 M pax/an", freight: "Principal hub fret" },
      { name: "Luano (Lubumbashi)", traffic: "~500 000 pax/an", freight: "Hub minier Katanga" }
    ],
    railway: "Réseau vétuste (SNCC), corridors d'exportation vers SA, Angola, Tanzanie (Dar es Salaam).",
    roads: "58 129 km (dont moins de 5% asphalté). Très difficile.",
    corridors: "Lobito Corridor (vers l'Angola), Northern Corridor (Mombasa), Dar es Salaam Corridor.",
    containerCost: "Très élevé (>$4 000 export)",
    customsDelay: "Peut atteindre 15 jours",
    logisticZones: ["Maluku", "Kasumbalesa (frontière Zambie)"],
    maritimeConnectivity: "Faible, dépendant de Pointe-Noire et des ports d'Afrique Australe/Est."
  },
  trade: {
    topExports: [
      { product: "Cuivre", value: "$16 Mds", destination: "Chine, Suisse" },
      { product: "Cobalt", value: "$4.5 Mds", destination: "Chine, UE" },
      { product: "Diamants bruts", value: "$100 M", destination: "Belgique, EAU" }
    ],
    topImports: [
      { product: "Machines & Équipements", value: "$3.5 Mds", origin: "Chine, Afrique du Sud" },
      { product: "Produits pétroliers", value: "$1.5 Mds", origin: "Import régional" },
      { product: "Alimentation", value: "$2 Mds", origin: "UE, Afrique du Sud, Brésil" }
    ],
    tradeBalance: "+$2 Mds (excédent minier)",
    fdiInward: { stock: "$32 Mds", flow: "$1.8 Mds/an", topInvestors: ["Chine", "Canada", "Afrique du Sud", "Suisse"] },
    tradeAgreements: ["COMESA", "SADC", "CEEAC", "ZLECAF", "AGOA (rétabli)"],
    taxRegime: { is: "30%", tva: "16%" },
    freeZones: "Avantages code des investissements",
    profitRepatriation: "Autorisé via banques régulées, soumis aux réserves de change."
  },
  demographics: {
    totalPopulation: "102 millions (2025)",
    growthRate: "3.2%/an",
    ageStructure: "46% de 0-14 ans. Jeunesse extrême.",
    urbanPopulation: "46%",
    unemployment: "Chômage structurel formel élevé (secteur informel 80%+)",
    hdi: "0.479 — Rang 179",
    lifeExpectancy: "61 ans",
    middleClass: "Faible (<10%), concentrée à Kinshasa/Katanga",
    millionaires: "~500 HNWIs",
    diasporaFrance: "Importante (Belgique, France)"
  }
};

export const DATA_GUINEE_ENRICHED = {
  industries: {
    gdpBySector: { agriculture: 25, industry: 35, services: 40, mining: 25 },
    keyIndustries: [
      { name: "Mines", description: "Bauxite (1er exportateur mondial, 2e producteur), Or, Diamants.", share: "85% des exports" },
      { name: "Agriculture", description: "Café, cacao, huile de palme, fruits (ananas).", share: "25% PIB" }
    ],
    sez: [
      { name: "Zone Économique Spéciale de Boké", location: "Boké", advantages: "Hub minier et transformation alumine" }
    ],
    majorProjects: [
      "Simandou (Minerais de fer) : Projet du siècle, $20 Mds (mines, rail 600km, port).",
      "Raffineries d'alumine (Chinalco, SMB)",
      "Barrage Souapiti (450 MW)"
    ],
    banking: { mainBanks: ["Ecobank", "Société Générale", "Vista Bank", "UBA", "BICI-Gui"], totalAssets: "~$3 Mds", bancarisation: "15%" },
    telecom: { operators: ["Orange", "MTN", "Cellcom"], mobilePenetration: "105%", internetPenetration: "28%" },
    energy: { mix: "Hydraulique dominant (Kaléta, Souapiti)", installedCapacity: "1.2 GW", renewableProjects: "Mise en réseau interconnecté" }
  },
  billionaires: [
    { name: "Kerfalla Person Camara (KPC)", fortune: "~$300 M", source: "BTP, Immobilier", companies: "Groupe Guicopres", age: "53", bio: "Gère la plus grande entreprise de BTP locale." },
    { name: "Mamadou Sylla", fortune: "~$200 M", source: "Commerce, Aviation", companies: "Futurelec Holding", age: "63", bio: "Patron historique des années Conté." },
    { name: "Fadi Wazni", fortune: "~$400 M", source: "Logistique, Mines", companies: "UMS (United Mining Supply), SMB (partenaire)", age: "55", bio: "Franco-libano-guinéen, cofondateur du consortium SMB (leader bauxite)." },
    { name: "Ali Saadi", fortune: "~$150 M", source: "Commerce, FMCG", companies: "Sonoco", age: "60+", bio: "Agro-industrie et minoterie." },
    { name: "Diallo Sadakadji", fortune: "~$150 M", source: "Import-Export", companies: "Divers", age: "68", bio: "Grand commerçant guinéen." }
  ],
  contacts: {
    chambers: ["CCIFG (France-Guinée)"], businessFrance: "Correspondant local via Ambassade", lawFirms: ["Sylla & Partners", "Nimba Conseil"], big4: ["PwC Conakry", "EY Guinee"], patronat: "CPEG"
  },
  universities: [
    { name: "Université Gamal Abdel Nasser", city: "Conakry", students: "15 000+", specialties: "Sciences, Médecine", ranking: "1ère GN" },
    { name: "Institut Supérieur des Mines de Boké", city: "Boké", students: "2 000+", specialties: "Mines, Géologie", ranking: "Hub minier GN" }
  ],
  logistics: {
    ports: [
      { name: "Port Autonome de Conakry", capacity: "300 000 TEU", operator: "Albayrak", draft: "13 m"},
      { name: "Port minéralier de Kamsar", capacity: "50 Mtpa", operator: "CBG" },
      { name: "Port Morebaya (Simandou)", capacity: "En construction", operator: "WCS / Rio Tinto" }
    ],
    airports: [{ name: "Aéroport de Conakry (AST)", traffic: "~600 000 pax/an" }],
    railway: "Chemin de fer minier (Boké-Kamsar). Transguinéen (600 km) en construction pour Simandou.",
    roads: "44 000 km, état variable."
  },
  trade: {
    topExports: [{ product: "Bauxite", value: "$4.8 Mds", destination: "Chine, EAU" }, { product: "Or", value: "$3 Mds", destination: "Inde, EAU" }],
    tradeAgreements: ["CEDEAO", "ZLECAF", "MRU"], taxRegime: { is: "35%", tva: "18%" }, fdiInward: { stock: "$8 Mds", flow: "$1 Md/an" }
  },
  demographics: {
    totalPopulation: "14 millions", growthRate: "2.7%", urbanPopulation: "38%", hdi: "0.465", lifeExpectancy: "61 ans"
  }
};

export const DATA_GABON_ENRICHED = {
  industries: {
    gdpBySector: { agriculture: 5, industry: 50, services: 45, mining: 45 },
    keyIndustries: [
      { name: "Pétrole", description: "Historique du pays (Perenco, Total, Assala).", share: "35% PIB" },
      { name: "Mines (Manganèse)", description: "Comilog (Eramet). 25% part de marché mondiale.", share: "10% PIB" },
      { name: "Filière Bois", description: "Interdiction export grumes brutes = hub transformation bois (Nkok).", share: "5% PIB" }
    ],
    sez: [
      { name: "GSEZ (Zone de Nkok)", location: "Nkok (Libreville)", advantages: "Hub bois, IS 0% pdt 10 ans. Modèle Arise." }
    ],
    majorProjects: [
      "Transgabonais (Rail) : Rénovation par SETRAG",
      "Extension GSEZ Nkok"
    ],
    banking: { mainBanks: ["BGFIBank (Champion régional)", "UGB (Attijariwafa)", "BICIG (AFG)"], totalAssets: "~$5 Mds", bancarisation: "30%" }
  },
  billionaires: [
    { name: "Henri-Claude Oyima", fortune: "~$200 M", source: "Banque", companies: "BGFIBank", age: "67", bio: "PDG de BGFIBank, la plus grande banque d'Afrique Centrale." },
    { name: "Famille Bongo", fortune: "Non évaluée publiquement", source: "Divers", companies: "-", bio: "Ancienne famille présidentielle." },
    { name: "Christian Kerangall", fortune: "~$150 M", source: "Distribution, BTP", companies: "Compagnie du Komo", age: "70+", bio: "Magnat historique gabonais." }
  ],
  contacts: { chambers: ["CCI France-Gabon"], lawFirms: ["Project Lawyers"], big4: ["PwC Libreville", "Deloitte"], patronat: "FEG (Fédération des Entreprises Gabonaises, présidée par HC Oyima)" },
  universities: [{ name: "UOB (Omar Bongo)", city: "Libreville", students: "35 000+", specialties: "Droit, Lettres", ranking: "1ère GA" }, { name: "USTM", city: "Franceville", specialties: "Sciences, Mines" }],
  logistics: {
    ports: [{ name: "Port d'Owendo", operator: "Arise/GSEZ", draft: "13m", note: "Port minéralier et commerce" }, { name: "Port-Gentil", note: "Port pétrolier" }],
    railway: "Transgabonais (648 km) clé pour le manganèse et le bois.", airports: [{ name: "Léon Mba (Libreville)" }]
  },
  trade: {
    topExports: [{ product: "Pétrole", value: "$4.5 Mds" }, { product: "Manganèse", value: "$2.5 Mds", destination: "Chine, France" }, { product: "Bois transformé", value: "$800 M" }],
    tradeAgreements: ["CEMAC", "ZLECAF"], fdiInward: { stock: "$12 Mds", flow: "$1.5 Mds" }
  },
  demographics: { totalPopulation: "2.3 millions", growthRate: "2.3%", urbanPopulation: "90% (très élevé)", hdi: "0.706", lifeExpectancy: "66 ans" }
};

export const DATA_RWANDA_ENRICHED = {
  industries: {
    gdpBySector: { agriculture: 25, industry: 20, services: 55, mining: 2 },
    keyIndustries: [
      { name: "Tech & Services", description: "Kigali Innovation City, hub numérique est-africain.", share: "Croissance forte" },
      { name: "Tourisme", description: "Gorilles, hub de conférences (KCC), Visit Rwanda.", share: "10% PIB" },
      { name: "Mines (3TG)", description: "Étain, Tungstène, Tantale (Coltan). Traçabilité iTSCi.", share: "Premier exportateur de Coltan (volume/valeur) grâce à la transformation/transit." }
    ],
    sez: [{ name: "Kigali SEZ", location: "Kigali", advantages: "Hub manufacturier, tech et pharmaceutique (usine BioNTech)." }],
    majorProjects: ["Kigali Innovation City", "Bugesera International Airport (Qatar Airways)", "Hub vaccin ARNm BioNTech"],
    banking: { mainBanks: ["Bank of Kigali", "I&M Bank", "Cogebanque (Equity)"], bancarisation: "36%" }
  },
  billionaires: [
    { name: "Tribert Rujugiro Ayabatwa (décédé 2024)", fortune: "~$250 M", source: "Tabac, Immobilier", companies: "Pan African Tobacco Group", age: "82 (au décès)", bio: "Magnat en exil, fortune panafricaine." },
    { name: "Egide Gatera", fortune: "~$100 M+", source: "Énergie, Thé", companies: "Rwanda Mountain Tea, SP (Petroleum)", age: "60+", bio: "Milliardaire local majeur (agro, énergie)." },
    { name: "Sina Gérard", fortune: "~$50 M", source: "Agroalimentaire", companies: "Urwibutso", age: "60", bio: "Agro-entrepreneur très connu au Rwanda." },
    { name: "Mutesi & Famille", fortune: "N/A", source: "Commerce", companies: "Diverses", bio: "Acteurs de l'immobilier à Kigali." }
  ],
  contacts: { chambers: ["PSF Rwanda (Private Sector Federation)"], investmentBanks: ["RDB (Rwanda Development Board) très efficace"], big4: ["PwC Kigali", "KPMG Rwa"] },
  universities: [{ name: "University of Rwanda", city: "Kigali", students: "30 000+", specialties: "Tech, Med", ranking: "1ère RW" }, { name: "Carnegie Mellon University Africa", city: "Kigali", specialties: "AI, Eng" }],
  logistics: {
    ports: [], // Pays enclavé
    airports: [{ name: "Kigali International", traffic: "1M pax" }, { name: "Bugesera (en construction)", capacity: "1.7M à 8M pax/an" }],
    railway: "Projet Dar es Salaam-Isaka-Kigali en discussion.", corridors: "Corridor Central (Dar es Salaam) et Nord (Mombasa)"
  },
  trade: {
    topExports: [{ product: "Or (raffiné)", value: "$1 Md+" }, { product: "Coltan/Étain/Tungstène", value: "$500 M" }, { product: "Café/Thé", value: "$200 M" }],
    tradeAgreements: ["EAC", "COMESA", "ZLECAF"], fdiInward: { stock: "$3 Mds", flow: "$400 M/an" }, easeBusiness: "Excellent (Top 40 mondial historique)"
  },
  demographics: { totalPopulation: "14 millions", growthRate: "2.3%", urbanPopulation: "17%", hdi: "0.534", lifeExpectancy: "69 ans" }
};

export const DATA_ANGOLA_ENRICHED = {
  industries: {
    gdpBySector: { agriculture: 10, industry: 55, services: 35, mining: 50 },
    keyIndustries: [
      { name: "Pétrole", description: "2e producteur d'Afrique (Sonangol).", share: "50% PIB, 90% exports" },
      { name: "Diamants", description: "Catoca (Endiama).", share: "5% exports" },
      { name: "Mines critiques", description: "Terres Rares (Longonjo). Transition en cours.", share: "<1% actu, fort potentiel" }
    ],
    sez: [{ name: "ZEE Luanda-Bengo", location: "Luanda", advantages: "Facilités industrielles pour diversification" }],
    majorProjects: ["Lobito Corridor (rail vers RDC/Zambie, USA/UE financent)", "Longonjo REE Project (Pensana)", "Raffinerie de Lobito"],
    banking: { mainBanks: ["BAI", "BFA", "Banco BIC", "BPC"], totalAssets: "~$25 Mds" }
  },
  billionaires: [
    { name: "Isabel dos Santos", fortune: "~$1.5 Mds (contesté/gelé)", source: "Investissements, Télécoms, Banque", companies: "Unitel (ex), divers", age: "50", bio: "Fille de l'ex-président, actifs gelés ou saisis par l'État." },
    { name: "Lopo do Nascimento", fortune: "N/A", source: "Divers", companies: "-", bio: "Ancien PM, homme d'affaires influent." },
    { name: "António Mosquito", fortune: "~$300 M+", source: "BTP, Automobile, Pétrole", companies: "MBG", bio: "Partenaire de nombreuses multinationales." },
    { name: "Valdomiro Minoru Dondo", fortune: "~$400 M", source: "Distribution, Transports", companies: "Macon, VMD", bio: "D'origine brésilienne, l'un des plus riches d'Angola." }
  ],
  contacts: { chambers: ["AIA (Associação Industrial de Angola)"], businessFrance: "Bureau Luanda", lawFirms: ["FBL Advogados", "CRA Angola"], patronat: "AIPEX (Agence des investissements)" },
  universities: [{ name: "Université Agostinho Neto", city: "Luanda", students: "40 000+", specialties: "Pétrole, Ingénierie", ranking: "1ère AO" }, { name: "Catholic University of Angola", city: "Luanda" }],
  logistics: {
    ports: [
      { name: "Port de Luanda", capacity: "1M TEU", operator: "DP World (multi-terminal)", draft: "14m" },
      { name: "Port de Lobito", capacity: "Hub minéralier", operator: "Lobito Atlantic Railway (Trafigura/Mota-Engil)", draft: "14m", note: "Clé pour le corridor cuivre/cobalt (RDC)" }
    ],
    airports: [{ name: "Luanda DIA", traffic: "Nouveau super-aéroport inauguré" }],
    railway: "Réseau de Benguela (Lobito vers RDC, 1344 km) - stratégique UE/USA."
  },
  trade: {
    topExports: [{ product: "Pétrole Brut", value: "$35 Mds", destination: "Chine, Inde" }, { product: "Diamants", value: "$1.5 Mds", destination: "EAU" }],
    tradeAgreements: ["SADC", "ZLECAF"], fdiInward: { stock: "$34 Mds" }
  },
  demographics: { totalPopulation: "36 millions", growthRate: "3.2%", urbanPopulation: "68%", hdi: "0.586", lifeExpectancy: "61 ans" }
};
