// RAQIB Corridor Intelligence Module — Enrichment Lot 1
// Countries: CD (RDC), GN (Guinée), GA (Gabon), RW (Rwanda), AO (Angola)
// Data categories: industries, logistics, trade, billionaires, demographics
// Sources: IMF WEO 2025, World Bank 2024, Banque Centrale respective, CNUCED/UNCTAD 2024,
//          Ministères des Mines respectifs, Port Authorities, IATA 2024, Oxford Economics 2025
// Created: 2026-04-02

import type { Industries, Logistics, Trade, Billionaire, Demographics } from '@/lib/corridor/types';

// ============================================================
// 1. RDC — Congo-Kinshasa 🇨🇩
// ============================================================

export const ENRICHMENT_CD = {

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
  } as Industries,

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
  } as Logistics,

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
  } as Trade,

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
  ] as Billionaire[],

  demographics: {
    totalPopulation: "~105 millions (2025) — 3e Afrique derrière Nigeria et Éthiopie",
    growthRate: "3.2%/an — parmi les plus élevés au monde",
    ageStructure: "44% de 0–14 ans, 53% de 15–64 ans, 3% de 65+ ans. Âge médian : 17 ans.",
    urbanPopulation: "46% (2024) — urbanisation rapide, Kinshasa ~17 M habitants",
    unemployment: "~45% (sous-emploi massif — économie informelle dominante)",
    youthUnemployment: "~60% (15–24 ans)",
    hdi: "0.479 — Rang 179/191 (PNUD 2024)",
    lifeExpectancy: "61 ans",
    middleClass: "~5–7% de la population (revenus > $4/jour PPA)",
    millionaires: "~4 000 (estimation Wealth-X 2024)",
    diasporaFrance: "~100 000 congolais (RDC) en France, principalement Paris et région parisienne",
    languages: "Français (officiel), Lingala (véhiculaire Kinshasa/Nord), Swahili (véhiculaire Est), Kikongo (Bas-Congo), Tshiluba (Kasaï)",
    literacy: "77% (2024 — UNESCO)",
  } as Demographics,

};

// ============================================================
// 2. Guinée 🇬🇳
// ============================================================

export const ENRICHMENT_GN = {

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
  } as Industries,

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
  } as Logistics,

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
  } as Trade,

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
  ] as Billionaire[],

  demographics: {
    totalPopulation: "~14 millions (2025)",
    growthRate: "2.7%/an",
    ageStructure: "43% de 0–14 ans, 54% de 15–64 ans, 3% de 65+ ans. Âge médian : 18 ans.",
    urbanPopulation: "37% (2024)",
    unemployment: "~8% officiel (sous-emploi massif — économie informelle dominante)",
    youthUnemployment: "~35% (15–24 ans, estimation)",
    hdi: "0.465 — Rang 182/191 (PNUD 2024)",
    lifeExpectancy: "59 ans",
    middleClass: "~5% de la population",
    millionaires: "~1 000 (estimation)",
    diasporaFrance: "~80 000 guinéens en France (IDF, Strasbourg, Lyon)",
    languages: "Français (officiel), Pular/Peul (40%), Malinké (30%), Soussou (20%)",
    literacy: "45% (UNESCO 2023 — parmi les plus faibles d'Afrique de l'Ouest)",
  } as Demographics,

};

// ============================================================
// 3. Gabon 🇬🇦
// ============================================================

export const ENRICHMENT_GA = {

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
  } as Industries,

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
  } as Logistics,

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
  } as Trade,

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
  ] as Billionaire[],

  demographics: {
    totalPopulation: "2.4 millions (2025) — l'un des pays les moins peuplés d'Afrique",
    growthRate: "2.5%/an",
    ageStructure: "36% de 0–14 ans, 59% de 15–64 ans, 5% de 65+ ans. Âge médian : 22 ans.",
    urbanPopulation: "90% (l'un des pays les plus urbanisés d'Afrique — Libreville concentre ~800 000 habitants)",
    unemployment: "20% (officiel 2024)",
    youthUnemployment: "~35% (15–24 ans)",
    hdi: "0.706 — Rang 112/191 (PNUD 2024 — revenu intermédiaire supérieur)",
    lifeExpectancy: "67 ans",
    middleClass: "~30% de la population (grâce aux revenus pétroliers)",
    millionaires: "~3 000 (estimation Wealth-X 2024)",
    diasporaFrance: "~30 000 gabonais en France",
    languages: "Français (officiel), Fang (langue bantoue majoritaire), Myènè, Bapounou/Eschira, Nzebi",
    literacy: "84% (UNESCO 2023)",
  } as Demographics,

};

// ============================================================
// 4. Rwanda 🇷🇼
// ============================================================

export const ENRICHMENT_RW = {

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
  } as Industries,

  logistics: {
    ports: [
      {
        name: "Accès maritime via Port de Mombasa (Kenya)",
        capacity: "Mombasa : ~1.5 M TEU/an capacité totale (transit Rwanda : ~15% du volume)",
        operator: "Kenya Ports Authority (KPA) — transit Rwanda via Northern Corridor",
        draft: "15m",
        note: "Pays enclavé. Mombasa = principale porte d'entrée maritime (1 700 km Mombasa–Kigali). Northern Corridor prioritaire.",
      },
      {
        name: "Accès maritime via Port de Dar es Salaam (Tanzanie)",
        capacity: "Dar es Salaam : ~900 000 TEU/an capacité (transit Rwanda via Central Corridor)",
        operator: "Tanzania Ports Authority (TPA) — transit Rwanda via Central Corridor",
        draft: "12m",
        note: "Alternative Mombasa. Central Corridor (1 900 km Dar–Kigali). Plus long mais moins congestionné.",
      },
    ],
    airports: [
      {
        name: "Aéroport International de Kigali (KIA)",
        traffic: "~2 M passagers/an (2024, en hausse, hub RwandAir)",
        freight: "~30 000 t fret/an",
      },
      {
        name: "Aéroport International de Bugesera (en construction)",
        traffic: "Capacité prévue : 7 M passagers/an — livraison partielle 2026",
        freight: "~100 000 t fret/an (prévision)",
      },
    ],
    railway: "Aucun réseau ferroviaire opérationnel. Projet Standard Gauge Railway (SGR EAC) : Dar es Salaam–Isaka–Kigali (~1 400 km), en phase de faisabilité. Délai réaliste 2030+.",
    roads: "~14 000 km dont ~4 700 km bitumés. Réseau routier en amélioration constante (RVA/RTDA). Routes principales Kigali–Rusumo (frontière Tanzanie), Kigali–Gatuna (frontière Ouganda) en bon état.",
    corridors: "Northern Corridor (Kigali–Mombasa, 1 700 km, EAC). Central Corridor (Kigali–Dar es Salaam, 1 900 km, EAC). Corridor Kigali–Bujumbura–Uvira (accès lac Tanganyika).",
    containerCost: "~3 500 USD/conteneur 20' import CIF Kigali (surcoût enclavement vs port côtier)",
    customsDelay: "5–8 jours via Mombasa/Northern Corridor (amélioration récente — one-stop border posts)",
    logisticZones: [
      "Kigali Special Economic Zone (KSEZ — Masoro)",
      "Bugesera Industrial Park",
      "Kigali Logistics Hub (Magerwa — entrepôts douane)",
    ],
    maritimeConnectivity: "Via Mombasa (Kenya — Northern Corridor prioritaire) et Dar es Salaam (Tanzanie — Central Corridor). EAC facilitation transit. Rwanda = champion facilitation commerciale (Doing Business #38/190).",
  } as Logistics,

  trade: {
    topExports: [
      { product: "Minéraux 3T (Étain, Tantale, Tungstène)", value: "~500 M USD", destination: "UE (Belgique, Allemagne), Chine, Asie" },
      { product: "Or (officiel + transit RDC controversé)", value: "~400 M USD", destination: "Dubaï, Suisse" },
      { product: "Café (specialty coffee)", value: "~120 M USD (+32% 2025)", destination: "USA, UE, Japon" },
      { product: "Thé", value: "~100 M USD (+100% 2025)", destination: "Pakistan, UK, USA" },
      { product: "Services ICT (software, BPO)", value: "~100 M USD", destination: "EAC, Europe, USA" },
    ],
    topImports: [
      { product: "Produits pétroliers raffinés", value: "~600 M USD", origin: "Kenya, Ouganda (transit)" },
      { product: "Machines et équipements", value: "~400 M USD", origin: "Chine, UE, Inde" },
      { product: "Produits alimentaires", value: "~300 M USD", origin: "Kenya, Ouganda, Tanzanie" },
      { product: "Ciment et matériaux construction", value: "~200 M USD", origin: "Kenya, Tanzanie, Ouganda" },
      { product: "Médicaments et équipements médicaux", value: "~150 M USD", origin: "Inde, UE" },
    ],
    tradeBalance: "-2.5 Mds USD (2024 — déficit structurel pays enclavé)",
    fdiInward: {
      stock: "~6 Mds USD (2024)",
      flow: "~450 M USD/an (2024, en croissance)",
      topInvestors: ["USA", "Kenya", "UK", "Inde", "Chine", "Qatar (Bugesera Airport)"],
    },
    fdiOutward: "~$50 M USD/an (investissements régionaux Crystal Ventures, BOK)",
    tradeAgreements: [
      "ZLECAF (signataire + implémentation active)",
      "EAC — East African Community (Union douanière + marché commun)",
      "COMESA",
      "Commonwealth",
      "AfCFTA Protocol on Services",
    ],
    taxRegime: {
      is: "IS 30% (standard). IS 15% pour entreprises prioritaires (tech, exportations). IS 0% en KSEZ (7 ans).",
      tva: "TVA 18%",
      conventions: "24 conventions de double imposition : Belgique, Maurice, Chine, Singapour, UE (en négociation), Kenya, Ouganda, etc.",
    },
    freeZones: "KSEZ (Masoro) — zone franche industrielle, IS exonéré 7 ans, 0% droits douane équipements. Kigali Innovation City (zone tech — avantages spécifiques).",
    profitRepatriation: "Libre transfert dividendes (garanti par loi). Délai : 5–10 jours ouvrés (RWF/USD). Banque Nationale Rwanda (BNR) supervise — régime libéral reconnu.",
    bit: "8 traités bilatéraux d'investissement actifs (USA, Belgique, Germany, Chine, Pays-Bas, Singapour, Maurice, Turquie). ICSID arbitration disponible.",
  } as Trade,

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
  ] as Billionaire[],

  demographics: {
    totalPopulation: "~14 millions (2025)",
    growthRate: "2.3%/an",
    ageStructure: "40% de 0–14 ans, 57% de 15–64 ans, 3% de 65+ ans. Âge médian : 20 ans.",
    urbanPopulation: "18% (2024 — l'un des plus ruraux d'Afrique malgré densité haute à Kigali)",
    unemployment: "16% (officiel 2024 — BNR)",
    youthUnemployment: "23% (15–24 ans)",
    hdi: "0.548 — Rang 158/191 (PNUD 2024)",
    lifeExpectancy: "69 ans (remarquable progression depuis génocide 1994)",
    middleClass: "~20% de la population (revenus >$4/jour PPA)",
    millionaires: "~800 (Wealth-X 2024)",
    diasporaFrance: "~25 000 rwandais en France (relations diplomatiques complexes France–Rwanda)",
    languages: "Kinyarwanda (officielle, nationale), Anglais (officiel), Français (officiel — usage décroissant), Swahili (officiel EAC)",
    literacy: "73.2% (UNESCO 2023)",
  } as Demographics,

};

// ============================================================
// 5. Angola 🇦🇴
// ============================================================

export const ENRICHMENT_AO = {

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
  } as Industries,

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
  } as Logistics,

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
  } as Trade,

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
  ] as Billionaire[],

  demographics: {
    totalPopulation: "~36 millions (2025) — croissance démographique très rapide",
    growthRate: "3.2%/an — parmi les plus élevés au monde",
    ageStructure: "47% de 0–14 ans, 50% de 15–64 ans, 3% de 65+ ans. Âge médian : 16 ans.",
    urbanPopulation: "68% (2024) — Luanda ~9 M habitants, mégapole surpeuplée",
    unemployment: "30% (officiel 2024 — sous-emploi massif hors secteur pétrolier)",
    youthUnemployment: "~55% (15–24 ans)",
    hdi: "0.586 — Rang 148/191 (PNUD 2024)",
    lifeExpectancy: "62 ans",
    middleClass: "~10% de la population (Luanda principalement)",
    millionaires: "~6 000 (Wealth-X 2024 — concentrés Luanda, USD millionnaires)",
    diasporaFrance: "~15 000 angolais en France (Paris, Île-de-France principalement)",
    languages: "Portugais (officiel et lingua franca), Umbundu (26%), Kimbundu (25%), Kikongo (8%), Chokwe (5%)",
    literacy: "71% (UNESCO 2023)",
  } as Demographics,

};
