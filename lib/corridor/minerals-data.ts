// ═══════════════════════════════════════════════════════════════
// RAQIB — Critical Minerals Intelligence Data
// Structured data for Corridor EU × 22 African Countries
// ═══════════════════════════════════════════════════════════════

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

export interface EigenBrique {
  brique: string;
  role: string;
  price: string;
  color: string;
}

export interface MadenHub {
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
  tam: { value: string; label: string; desc: string };
  sam: { value: string; label: string; desc: string };
  som: { value: string; label: string; desc: string };
  eigenIntegration: EigenBrique[];
  hubs: MadenHub[];
  makerspaces: string;
  trojanHorse: string;
  cascadeEU: string;
}

export interface StatCard {
  value: string;
  label: string;
  sub: string;
}

export interface EUForcingFunction {
  name: string;
  fullName: string;
  date: string;
  desc: string;
  impact: string;
  status: string;
}

// ─── Data ────────────────────────────────────────────────────

export const CORRIDOR_COUNTRIES: CorridorMineralCountry[] = [
  { id:"MA", name:"Maroc", flag:"MA", minerals:["Phosphates","Cobalt","Fluorite","Barytine","Plomb","Zinc","Argent","Cuivre"], production:"1er mondial phosphates (38Mt/an)", reserves:"70% reserves mondiales phosphates", keyPlayer:"OCP Group, Managem", crmaRelevance:"Hub de transformation — raffinerie cobalt/manganese en projet a Jorf Lasfar", risk:2, lat:32, lng:-6, tradeEU:"€3.2B/an", opportunity:"Centre de raffinage critique pour l'Europe", chineseInv:"COBCO (nickel/cobalt refinery), Gotion High-Tech", westernInv:"Managem, BMW/Renault (cobalt offtake)", mineralDiversity:8 },
  { id:"MR", name:"Mauritanie", flag:"MR", minerals:["Fer","Cuivre","Or","Uranium"], production:"14.2Mt fer/an (SNIM record 2024)", reserves:"Fer: 1.5Bt", keyPlayer:"SNIM, Kinross, First Quantum", crmaRelevance:"Fer pour acier vert europeen", risk:4, lat:20, lng:-10, tradeEU:"€1.8B/an", opportunity:"Hydrogene vert + fer = acier decarbone", chineseInv:"Infrastructure/port limite", westernInv:"SNIM, Kinross (Canada)", mineralDiversity:4 },
  { id:"SN", name:"Senegal", flag:"SN", minerals:["Phosphates","Zircon","Titane","Or","Ilmenite"], production:"Phosphates: 2.8Mt, Zircon: 55Kt", reserves:"Zircon cotier significatif (Grand Cote)", keyPlayer:"ICS/Indorama, GCO/Eramet", crmaRelevance:"Zircon/titane pour ceramiques et aero", risk:2, lat:14.5, lng:-14.5, tradeEU:"€890M/an", opportunity:"Transformation locale zircon, hub logistique Dakar", chineseInv:"Interet croissant phosphates", westernInv:"Eramet (France) domine sables mineraux", mineralDiversity:5 },
  { id:"GN", name:"Guinee", flag:"GN", minerals:["Bauxite","Or","Fer","Diamants","Alumine"], production:"119.5Mt bauxite/an (1er mondial)", reserves:"7.4Bt bauxite (plus grandes au monde)", keyPlayer:"SMB-Winning, CBG, Rio Tinto, RUSAL", crmaRelevance:"Fournit 63% du minerai d'aluminium de l'UE", risk:6, lat:10, lng:-12, tradeEU:"€3.8B/an", opportunity:"Raffinerie d'alumine — opportunite #1 de creation de valeur", chineseInv:"Dominant: SMB-Winning, Chalco (>50%)", westernInv:"CBG, Rio Tinto (minoritaire)", mineralDiversity:5 },
  { id:"SL", name:"Sierra Leone", flag:"SL", minerals:["Fer","Diamants","Rutile","Ilmenite","Zircon","Bauxite","Or"], production:"Fer: 11.76Mt, Rutile: 136Kt (1er mondial rutile naturel)", reserves:"Fer: 13.7Bt Tonkolili, Rutile: Sembehun 173.7Mt", keyPlayer:"Kingho, Gerald Group, Sierra Rutile", crmaRelevance:"Rutile/titane critique pour defense, aerospatial", risk:5, lat:8.5, lng:-12, tradeEU:"€1.12B/an", opportunity:"Usine TiO2/titane metal, pelletisation fer", chineseInv:"Kingho (fer dominant)", westernInv:"Gerald Group, Sierra Rutile (Australie)", mineralDiversity:7 },
  { id:"CI", name:"Cote d'Ivoire", flag:"CI", minerals:["Or","Manganese","Nickel","Diamants","Bauxite"], production:"Or: 52t/an (record 2024), Mn: 2Mt/an", reserves:"Or: 7Gt potentiel, Mn: Bondoukou", keyPlayer:"Perseus, Endeavour, Tietto, LGL, EAMC", crmaRelevance:"Manganese pour batteries", risk:3, lat:7, lng:-5.5, tradeEU:"€1.3B/an", opportunity:"Raffinage or + manganese sulfate", chineseInv:"EAMC (manganese)", westernInv:"Perseus, Endeavour (Australie/Canada)", mineralDiversity:5 },
  { id:"GH", name:"Ghana", flag:"GH", minerals:["Or","Lithium","Bauxite","Manganese","Diamants"], production:"Or: 130t/an (1er Afrique), Li: Ewoyaa en production", reserves:"Li: 34.4Mt Ewoyaa, Or: Ashanti significatif", keyPlayer:"Newmont, Gold Fields, Atlantic Lithium, Ghana Bauxite", crmaRelevance:"Lithium Ewoyaa — 1ere mine lithium d'Afrique de l'Ouest", risk:3, lat:7.5, lng:-1.5, tradeEU:"€4.2B/an", opportunity:"Hub lithium + assemblage batteries (port Tema)", chineseInv:"Sinohydro (infra), interet bauxite", westernInv:"Newmont, Gold Fields, Atlantic Lithium", mineralDiversity:5 },
  { id:"NG", name:"Nigeria", flag:"NG", minerals:["REE","Etain","Coltan","Fer","Or","Zinc","Plomb","Bitume"], production:"Etain: 3Kt, REE: 13Kt potentiel identifie", reserves:"REE significatives, Jos Plateau etain historique", keyPlayer:"NMMA, diverses juniors", crmaRelevance:"REE et etain strategiques", risk:6, lat:9, lng:7.5, tradeEU:"€2.1B/an", opportunity:"REE processing, renaissance etain", chineseInv:"CCECC infrastructure + interet minier", westernInv:"Shell (legacy), Thornton (etain)", mineralDiversity:8 },
  { id:"CM", name:"Cameroun", flag:"CM", minerals:["Bauxite","Cobalt","Nickel","Fer","Diamants","Or","Rutile"], production:"Bauxite: Minim Martap en dev., Co/Ni: Nkamouna", reserves:"Bauxite: >1Bt, Cobalt: Nkamouna 100Mt", keyPlayer:"Canyon Resources, Geovic Mining", crmaRelevance:"Cobalt/nickel lateritique pour batteries", risk:5, lat:5.9, lng:10, tradeEU:"€450M/an", opportunity:"Cobalt lateritique — alternative a la DRC", chineseInv:"Sinosteel (exploration)", westernInv:"Canyon Resources (Australie)", mineralDiversity:7 },
  { id:"GA", name:"Gabon", flag:"GA", minerals:["Manganese","Or","Fer","Niobium","REE","Uranium"], production:"Manganese: 11Mt/an (2eme mondial) — Eramet/Comilog", reserves:"Mn: Moanda (25% mondial), Nb: Mabouniie, REE: exploration", keyPlayer:"Eramet/Comilog, Ivindo Iron, Genmin", crmaRelevance:"Manganese critique pour batteries et acier — 25% production mondiale", risk:5, lat:-0.5, lng:11.5, tradeEU:"€2.8B/an", opportunity:"Sulfate de manganese pour batteries, niobium", chineseInv:"CITIC (exploration Belinga fer)", westernInv:"Eramet (France) dominant", mineralDiversity:6 },
  { id:"CD", name:"RDC", flag:"CD", minerals:["Cobalt","Cuivre","Tantale","Etain","Tungstene","Or","Diamants","Lithium","Germanium","Coltan"], production:"Co: 170Kt (74% mondial), Cu: 2.8Mt, Li: Manono en dev.", reserves:"Co: 4Mt (51% mondial), Cu: 31Mt, Li: Manono 400Mt", keyPlayer:"Glencore, CMOC, ERG, Ivanhoe, Barrick, AVZ Minerals", crmaRelevance:"Cobalt = mineral LE PLUS critique pour batteries EU. Tantale pour condensateurs. Germanium pour semi-conducteurs.", risk:8, lat:-4, lng:25, tradeEU:"€5.2B/an", opportunity:"Raffinage local cobalt/cuivre, certification ASM, lithium Manono", chineseInv:"CMOC (Tenke Fungurume), CITIC, divers", westernInv:"Glencore (Mutanda), Ivanhoe (Kamoa-Kakula), Barrick", mineralDiversity:10 },
  { id:"AO", name:"Angola", flag:"AO", minerals:["Diamants","Fer","Phosphates","REE","Cuivre","Or","Manganese"], production:"Diamants: 9.8M carats/an (6eme mondial)", reserves:"Diamants: Lucapa/Catoca, REE: Longonjo", keyPlayer:"Endiama, De Beers, Pensana (REE)", crmaRelevance:"REE de Longonjo — projet strategique pour alternatives chinoises", risk:5, lat:-8.8, lng:13.2, tradeEU:"€1.5B/an", opportunity:"REE processing, corridor Lobito", chineseInv:"Sonangol JVs, infrastructure", westernInv:"De Beers, Pensana (UK), corridor Lobito (US)", mineralDiversity:7 },
  { id:"RW", name:"Rwanda", flag:"RW", minerals:["Tantale","Tungstene","Etain","Or","REE","Niobium"], production:"Ta: 700t (leader Afrique), W: 900t, Sn: 3Kt", reserves:"3TG: significatif (pegmatites)", keyPlayer:"ITSCI, Minexx, Piran Resources", crmaRelevance:"Tantale/tungstene pour electronique et defense — modele tracabilite ITSCI", risk:3, lat:-2, lng:29.5, tradeEU:"€420M/an", opportunity:"Hub tracabilite 3TG + tech, formation certifiee", chineseInv:"Interet croissant", westernInv:"ITSCI (UK), Minexx, gouvernance forte", mineralDiversity:6 },
  { id:"ML", name:"Mali", flag:"ML", minerals:["Or","Lithium","Phosphates","Fer","Bauxite"], production:"Or: 72t/an (3eme Afrique), Li: Goulamina en dev.", reserves:"Li: Goulamina 109Mt (Leo Lithium/Ganfeng)", keyPlayer:"B2Gold, Barrick, Hummingbird, Leo Lithium/Ganfeng", crmaRelevance:"Lithium de Goulamina pour batteries EU", risk:8, lat:12.5, lng:-8, tradeEU:"€1.1B/an", opportunity:"Lithium, mais risque politique majeur (junte)", chineseInv:"Ganfeng Lithium (JV Goulamina)", westernInv:"B2Gold, Barrick, Leo Lithium (Australie)", mineralDiversity:5 },
  { id:"ZA", name:"Afrique du Sud", flag:"ZA", minerals:["PGM","Chrome","Manganese","Vanadium","Or","Fer","Titane","Diamants","Charbon","Uranium"], production:"PGM: 130t/an (70% mondial Pt), Chrome: 18Mt, Mn: 6Mt", reserves:"PGM: Bushveld Complex (80% mondial), Mn: Kalahari (70% mondial)", keyPlayer:"Anglo American, Sibanye-Stillwater, Impala Platinum, Glencore", crmaRelevance:"PGM critiques pour H2, catalyseurs auto, electronique. Chrome pour acier inoxydable.", risk:4, lat:-26, lng:28, tradeEU:"€8.5B/an", opportunity:"Raffinage PGM avance, batteries vanadium, H2 vert", chineseInv:"Tshidimela (chrome), interet manganese", westernInv:"Anglo American, Sibanye, Glencore (dominant)", mineralDiversity:10 },
  { id:"NA", name:"Namibie", flag:"NA", minerals:["Uranium","Diamants","Zinc","Cuivre","Or","Lithium","REE","Graphite"], production:"Uranium: 7Kt (3eme mondial), Diamants: De Beers", reserves:"U: Rossing/Husab, Li: Uis mine", keyPlayer:"Rossing (CNNC), Husab (Swakop/CGN), Namdeb/De Beers", crmaRelevance:"Uranium pour nucleaire EU, lithium + REE en developpement", risk:2, lat:-22, lng:17, tradeEU:"€1.6B/an", opportunity:"Lithium + REE processing, uranium enrichissement", chineseInv:"CGN (Husab uranium), CNNC (Rossing)", westernInv:"De Beers, Rio Tinto legacy", mineralDiversity:8 },
];

export const EU_INDUSTRIES: EUIndustry[] = [
  { id:"ev", name:"Vehicules Electriques & Batteries", minerals:["Lithium","Cobalt","Nickel","Manganese","Graphite","Cuivre","REE (Nd,Dy)","Phosphates"], demand2030:"Li: 185Kt LCE, Co: 60Kt, Ni: 250Kt", euCompanies:["Stellantis","Volkswagen","BMW","Renault","Mercedes","Northvolt","ACC","CATL Europe"], growth:"+340%", crmaImpact:"Tracabilite batterie obligatoire — Battery Passport Regulation 2027", supplyRisk:9, corridorSuppliers:"DRC (Co), Ghana (Li), Mali (Li), Gabon (Mn), Maroc (raffinage)", color:"#D4AF37" },
  { id:"wind", name:"Eolien Offshore", minerals:["REE (Nd,Pr,Dy,Tb)","Cuivre","Acier","Zinc"], demand2030:"REE: 12Kt/an (aimants), Cu: 300Kt", euCompanies:["Vestas","Siemens Gamesa","GE Vernova","Nordex"], growth:"+180%", crmaImpact:"EU Wind Power Package — contenu local encourage", supplyRisk:8, corridorSuppliers:"Nigeria/Angola (REE), DRC (Cu), Mauritanie (fer/acier)", color:"#4A7B9D" },
  { id:"def", name:"Defense & Aerospatial", minerals:["Tungstene","Tantale","REE (Sm,Nd,Dy)","Titane","Cobalt","Beryllium"], demand2030:"W: 8Kt, Ta: 2Kt, Sm: 500t", euCompanies:["Airbus","Thales","MBDA","Leonardo","Dassault","Rheinmetall"], growth:"+60%", crmaImpact:"EDIRPA + ASAP — securisation chaines critiques", supplyRisk:9, corridorSuppliers:"Rwanda (Ta,W), Sierra Leone/Senegal (Ti), DRC (Co,Ta)", color:"#A13544" },
  { id:"semi", name:"Semiconducteurs", minerals:["Gallium","Germanium","Tantale","REE","Silicium"], demand2030:"Ga: 300t, Ge: 150t, Ta: 1.5Kt", euCompanies:["ASML","Infineon","STMicroelectronics","NXP","GlobalFoundries"], growth:"+200%", crmaImpact:"EU Chips Act: 20% production mondiale visee — restrictions CN Ga/Ge", supplyRisk:10, corridorSuppliers:"DRC (Ge byproduct), Rwanda (Ta)", color:"#E07850" },
  { id:"h2", name:"Hydrogene Vert", minerals:["PGM (Pt,Ir)","Nickel","REE","Zirconium"], demand2030:"Pt: 15t (electrolyseurs), Ir: 8t", euCompanies:["Siemens Energy","Nel","ITM Power","McPhy","Plug Power EU"], growth:"+2500%", crmaImpact:"REPowerEU: 10Mt H2 vert importe d'ici 2030", supplyRisk:7, corridorSuppliers:"Maroc (hub H2), Mauritanie (H2 vert), Afrique du Sud (PGM)", color:"#5A8A3A" },
  { id:"solar", name:"Solaire & Stockage", minerals:["Silicium","Argent","Cuivre","Tellure","Gallium","Indium"], demand2030:"Si: 800Kt, Ag: 6Kt, Cu: 1Mt", euCompanies:["Meyer Burger","Enel Green Power","REC Solar","Wacker Chemie"], growth:"+200%", crmaImpact:"EU Solar Manufacturing target 30GW/an", supplyRisk:6, corridorSuppliers:"Maroc (Ag,Cu), DRC (Cu), Guinee (bauxite->Si)", color:"#C9A96E" },
  { id:"cat", name:"Catalyseurs & Chimie", minerals:["PGM (Pd,Rh,Pt)","REE (Ce,La)","Antimoine","Cobalt"], demand2030:"PGM catalyseurs: 60t/an EU auto", euCompanies:["BASF","Umicore","Johnson Matthey","Heraeus"], growth:"+25%", crmaImpact:"Euro 7 standards — PGM demand sustained", supplyRisk:7, corridorSuppliers:"Afrique du Sud (PGM 70% mondial), DRC (Co)", color:"#8B7355" },
];

export const SUPPLY_CHAIN: SupplyChainStage[] = [
  { stage:"1. Extraction", description:"Mine artisanale ou industrielle — forage, dynamitage, excavation", actors:"Operateurs miniers, artisanaux (ASM)", eigenRole:"AELYA: consentement mineurs artisanaux | BURHAN: preuve d'origine (Tx 501)", bottleneck:"80% ASM cobalt DRC sans tracabilite", valueCapture:"3-5%", value:"$0.5-5/kg" },
  { stage:"2. Concentration", description:"Broyage, flottation, separation magnetique — upgrading du minerai brut", actors:"Concentrateurs locaux", eigenRole:"BURHAN: certification lot (Tx 502) | YrKnown: savoir-faire metallurgique", bottleneck:"Peu d'usines de concentration en Afrique hors RSA/Maroc", valueCapture:"5-10%", value:"$5-50/kg" },
  { stage:"3. Raffinage", description:"Hydrometallurgie, extraction par solvant (SX), electrolyse — production de metal/oxyde pur", actors:"Raffineurs (80% Chine)", eigenRole:"BURHAN: audit chaine raffinage (Tx 503) | MYNe: cotation oxydes temps reel", bottleneck:"90% raffinage REE en Chine, 70% raffinage cobalt en Chine", valueCapture:"15-30%", value:"$50-800/kg" },
  { stage:"4. Fabrication composants", description:"Cathodes batterie, aimants NdFeB, alliages speciaux, poudres", actors:"Fabricants composants", eigenRole:"BURHAN: passeport numerique batterie (Tx 504) | NOOS: due diligence fournisseur", bottleneck:"92% aimants NdFeB fabriques en Chine", valueCapture:"20-35%", value:"$100-5000/kg" },
  { stage:"5. Integration OEM", description:"Assemblage vehicules electriques, turbines eoliennes, electronique, defense", actors:"OEM europeens (Stellantis, VW, Airbus...)", eigenRole:"RAQIB: intelligence approvisionnement | MIZAN: reglement multi-devises", bottleneck:"Dependance critique a fournisseur unique — single point of failure", valueCapture:"25-40%", value:"$1000-50,000/unite" },
  { stage:"6. Recyclage", description:"Collecte, demantelement, recuperation materiaux — economie circulaire", actors:"Urban miners, recycleurs certifies", eigenRole:"BURHAN: tracabilite fin de vie (Tx 505-506) | MYNe: marche secondaire", bottleneck:"<1% REE recyclees, <15% Li recycle en EU", valueCapture:"5-15%", value:"$20-200/kg recupere" },
];

export const GEOPOLITICAL_RISKS: GeopoliticalRisk[] = [
  { event:"Controles export CN sur 12 REE + Ga/Ge/W/Sb", date:"Avr-Oct 2025", impact:"Rupture approvisionnement aimants NdFeB pour eolien/EV europeen — prime hors-Chine 50-200%", severity:10, eigenResponse:"RAQIB alerte temps reel + BURHAN certification fournisseurs alternatifs", category:"Embargo" },
  { event:"Rare Earth hausse +100% YTD (Dy, Tb)", date:"Q1 2026", impact:"Dysprosium +105%, Terbium +100% YTD — aimants permanents impactes", severity:8, eigenResponse:"MYNe prix temps reel, RAQIB alerte approvisionnement", category:"Marche" },
  { event:"Battery Regulation — Passeport Numerique", date:"Fev 2027", impact:"Chaque batterie EV vendue en EU doit avoir un passeport tracant l'origine de chaque minerai", severity:9, eigenResponse:"BURHAN Tx 501-506 = architecture native du passeport batterie", category:"Reglementation" },
  { event:"EU Critical Raw Materials Act (CRMA)", date:"2024-2030", impact:"10% extraction EU, 40% raffinage EU, 25% recyclage — EU Court of Auditors: 'unlikely to deliver'", severity:8, eigenResponse:"BURHAN = solution compliance CRMA cle en main", category:"Reglementation" },
  { event:"Zimbabwe — interdiction export minerais bruts", date:"Fev 2026", impact:"Interdiction immediate et indefinie d'export de concentres mineraux bruts", severity:7, eigenResponse:"RAQIB scoring risque pays, MADEN MVAC pour transformation locale", category:"Nationalisme" },
  { event:"EU CBAM — Taxe Carbone Frontiere", date:"2026 transitoire", impact:"Taxe carbone sur minerais importes — avantage aux chaines decarbonees", severity:7, eigenResponse:"BURHAN certification empreinte carbone mine-to-gate", category:"Reglementation" },
  { event:"Coups d'Etat Sahel (Mali, Burkina, Niger)", date:"2021-2024", impact:"Rupture approvisionnement uranium (Niger/Orano), instabilite lithium (Mali/Goulamina)", severity:7, eigenResponse:"RAQIB scoring risque pays, diversification via corridor cotier", category:"Instabilite" },
  { event:"DRC — systeme de quotas cobalt prolonge", date:"2025-2026", impact:"Controle volumes export cobalt, pression haussiere prix", severity:6, eigenResponse:"MYNe arbitrage prix, RAQIB prediction deficits", category:"Nationalisme" },
  { event:"US Project Vault — $12B reserve strategique", date:"Fev 2026", impact:"Course aux stocks US vs EU — pression haussiere sur prix REE/Li/Co", severity:6, eigenResponse:"MYNe arbitrage EU/US, RAQIB intelligence competitive", category:"Competition" },
  { event:"Lobito Corridor (US-Angola-DRC-Zambie)", date:"2024-2028", impact:"Infrastructure ferroviaire alternative a la route chinoise pour cobalt/cuivre DRC", severity:5, eigenResponse:"BURHAN tracabilite corridor, MIZAN reglement multi-devises", category:"Infrastructure" },
];

export const EXCHANGE_DATA: ExchangeMineral[] = [
  { mineral:"Lithium (Li2CO3)", price:"$11,200/t", change:"-68%", trend:"down", supply:"Surplus 2024-2025, deficit attendu 2027+", corridorSource:"Ghana (Ewoyaa), Mali (Goulamina), DRC (Manono)", category:"Batterie" },
  { mineral:"Cobalt", price:"$24,500/t", change:"+67% YoY", trend:"up", supply:"Surplus DRC mais quotas prolonges 2026", corridorSource:"DRC (74% mondial), Cameroun (Nkamouna), Maroc (raffinage)", category:"Batterie" },
  { mineral:"Manganese (EMM)", price:"$1,380/t", change:"-22%", trend:"stable", supply:"Gabon stable, AfS variable", corridorSource:"Gabon (25% mondial, Eramet)", category:"Batterie" },
  { mineral:"Cuivre", price:"$9,850/t", change:"+18%", trend:"up", supply:"Deficit structurel 2025+ — record LME $13,952/t jan 2026", corridorSource:"DRC (2.8Mt/an), Mauritanie", category:"Infrastructure" },
  { mineral:"NdPr (Terres Rares)", price:"$184/kg FOB", change:"+63%", trend:"up", supply:"Deficit structurel HREE post-embargo CN", corridorSource:"Nigeria (13Kt), Angola (Longonjo)", category:"Aimants" },
  { mineral:"Dysprosium (REE)", price:"$380/kg", change:"+105% YTD", trend:"up", supply:"Embargo CN — prix double en 3 mois", corridorSource:"Nigeria, Angola (potentiel)", category:"Aimants" },
  { mineral:"Tantale (Ta2O5)", price:"$185/kg", change:"+12%", trend:"up", supply:"Stable, domine Rwanda/DRC", corridorSource:"Rwanda (1er Afrique), DRC", category:"Electronique" },
  { mineral:"Tungstene (APT)", price:"$335/mtu", change:"+118%", trend:"up", supply:"Prix double — restrictions CN + demande defense", corridorSource:"Rwanda", category:"Defense" },
  { mineral:"Phosphate rock", price:"$110/t", change:"-5%", trend:"stable", supply:"Maroc domine production et reserves (OCP)", corridorSource:"Maroc (38Mt/an, 70% reserves mondiales)", category:"Fertilisant" },
  { mineral:"Bauxite", price:"$55/t CIF CN", change:"+8%", trend:"up", supply:"Guinee 1er exportateur mondial, Indonesie restreint", corridorSource:"Guinee (119.5Mt/an)", category:"Aluminium" },
  { mineral:"Graphite naturel", price:"$480/t flake", change:"-15%", trend:"down", supply:"Mozambique/Tanzanie en ramp-up, CN domine", corridorSource:"Hors corridor principal (Madagascar)", category:"Batterie" },
  { mineral:"Platine (PGM)", price:"$1,020/oz", change:"+8%", trend:"stable", supply:"AfS domine (70% mondial), demande H2 croissante", corridorSource:"Afrique du Sud (Bushveld Complex)", category:"Catalyseur" },
];

export const VENTURE_MODEL: VentureModel = {
  name: "MADEN",
  arabic: "\u0645\u0639\u062F\u0646",
  meaning: "Mine / Metal / Minerai (arabe)",
  tagline: "Critical Minerals Intelligence & Traceability",
  thesis: "L'Afrique produit 30% des mineraux critiques mondiaux mais capture <5% de la valeur. Le CRMA europeen cree une obligation legale de tracabilite. MADEN est la couche logicielle souveraine qui connecte les deux.",
  tam: { value: "$12.4B", label: "TAM — Marche total adressable", desc: "Logiciels de tracabilite miniere, intelligence prix, compliance ESG, passeport batterie numerique — marche mondial" },
  sam: { value: "$3.8B", label: "SAM — Marche serviceable", desc: "Corridor EU-Afrique : 22 pays, 34+ mineraux, ~€32B trade annuel — segment geographique cible" },
  som: { value: "$380M", label: "SOM — Marche obtainable (Y5)", desc: "5% penetration SAM via contrats OEM cascade (Stellantis -> Tier1 -> mines) + SaaS gouvernemental" },
  eigenIntegration: [
    { brique:"BURHAN", role:"Blockchain audit trail mine-to-factory. Transactions 501 (preuve d'origine), 502 (certification lot), 503 (audit raffinage), 504 (passeport batterie), 505-506 (recyclage fin de vie). AI Proof of Being pour certifier les modeles ML.", price:"Gain-share 0.3-0.8% + SaaS €2-8K/mois/site", color:"#D4AF37" },
    { brique:"AELYA", role:"Consentement et souverainete des donnees minieres. Protection donnees ASM. Anonymisation donnees geologiques sensibles. Conformite RGPD + lois donnees africaines.", price:"Integre au SaaS MADEN", color:"#4A7B9D" },
    { brique:"MYNe", role:"Marketplace B2B2C des donnees minerales : cotations temps reel, donnees geologiques, certificats ESG, rapports due diligence. Producteurs africains vendent leurs donnees aux acheteurs EU.", price:"Commission 2-5% + abonnement premium", color:"#E07850" },
    { brique:"NOOS", role:"Due Diligence Engine : scoring ESG automatise des mines, detection fraude a l'origine (conflit minerals), evaluation risque fournisseur multi-signal.", price:"€500-2000/evaluation", color:"#5A8A3A" },
    { brique:"RAQIB", role:"Dashboard intelligence strategique (cet artefact). 1000+ data layers : prix, production, geopolitique, reglementation, scoring pays, prediction deficits.", price:"SaaS €5-25K/mois selon tier", color:"#C9A96E" },
    { brique:"YrKnown", role:"Capture du savoir-faire tacite des geologues, metallurgistes, mineurs artisanaux. Digitalisation processus de concentration/separation. Formation certifiee.", price:"€200-800/certification", color:"#A13544" },
    { brique:"MIZAN", role:"Infrastructure reglement multi-devises : EUR/USD/MAD/XOF/XAF/AOA/CDF. Smart contracts pour paiements conditionnels (qualite verifiee par BURHAN).", price:"0.1-0.5% sur flux de paiement", color:"#8B7355" },
  ],
  hubs: [
    { city:"Casablanca-Jorf Lasfar", country:"Maroc", flag:"MA", focus:"Hub raffinage cobalt/manganese + phosphates LFP", rationale:"OCP infrastructure, zones franches, accords UE", capex:"$50-200M", type:"Raffinage" },
    { city:"Tema-Accra", country:"Ghana", flag:"GH", focus:"Hub lithium (Ewoyaa) + assemblage batteries", rationale:"Stabilite politique, port Tema, lithium en production", capex:"$20-80M", type:"Transformation" },
    { city:"Kigali", country:"Rwanda", flag:"RW", focus:"Hub tracabilite 3TG + formation certifiee", rationale:"Modele ITSCI, gouvernance forte, tech hub", capex:"$5-15M", type:"Logiciel + Formation" },
    { city:"Lubumbashi", country:"RDC", flag:"CD", focus:"Hub cobalt/cuivre + certification ASM", rationale:"Ceinture cuprifere, 74% cobalt mondial, besoin tracabilite", capex:"$10-30M", type:"Tracabilite" },
    { city:"Libreville-Moanda", country:"Gabon", flag:"GA", focus:"Hub manganese sulfate pour batteries", rationale:"Eramet/Comilog existant, 25% Mn mondial", capex:"$30-100M", type:"Raffinage" },
  ],
  makerspaces: "Les MVAC (Mineral Value-Addition Centers) ne sont PAS des ateliers de bricolage. Ce sont des laboratoires de test qualite connectes a BURHAN, centres de formation metallurgique certifies YrKnown, unites pilotes de concentration (gravimetrie, flottation), et ateliers d'assemblage hardware (capteurs IoT miniers, stations mesure environnementale).",
  trojanHorse: "Livrable gratuit : Rapport RAQIB trimestriel 'Corridor Minerals Intelligence' envoye aux 50 plus gros importateurs EU + ministeres des mines des 22 pays. Cree la dependance informationnelle avant discussion commerciale.",
  cascadeEU: "Un OEM automobile (ex: Stellantis) qui signe MADEN declenche l'adoption en cascade : Tier 1 (CATL, Northvolt) -> raffineurs -> concentrateurs -> mines. Le Battery Regulation 2027 est le forcing function legal.",
};

export const STAT_CARDS: StatCard[] = [
  { value:"22", label:"Pays Corridor", sub:"Atlantique + Ocean Indien" },
  { value:"34+", label:"Mineraux Traces", sub:"CRMA + strategiques" },
  { value:"€32B+", label:"Trade EU/an", sub:"Corridor mineral total" },
  { value:"~30%", label:"Part Mineraux Critiques", sub:"Mondiaux — continent africain" },
  { value:"<5%", label:"Valeur Capturee Afrique", sub:"Sur chaine mine->composant" },
  { value:"$12.4B", label:"TAM MADEN", sub:"Marche adressable total" },
];

export const EU_FORCING_FUNCTIONS: EUForcingFunction[] = [
  { name:"CRMA 2024", fullName:"Critical Raw Materials Act", date:"Avril 2024", desc:"10% extraction EU, 40% raffinage EU, 25% recyclage d'ici 2030. Obligation de diversification fournisseurs hors Chine.", impact:"Cree obligation legale de tracabilite mine->usine", status:"En vigueur" },
  { name:"Battery Reg 2027", fullName:"Battery Regulation — Passeport Numerique", date:"Fevrier 2027", desc:"Chaque batterie EV vendue en EU doit porter un passeport numerique tracant l'origine de chaque minerai constituant.", impact:"BURHAN = architecture native du passeport batterie", status:"Adoption T1 2027" },
  { name:"CBAM 2026", fullName:"Carbon Border Adjustment Mechanism", date:"2026 (transitoire)", desc:"Taxe carbone sur minerais importes — avantage competitif aux chaines decarbonees et certifiees.", impact:"Certifications carbone BURHAN deviennent un avantage prix", status:"Phase transitoire" },
  { name:"CS3D / LkSG", fullName:"Corporate Sustainability Due Diligence", date:"2024-2026", desc:"Obligation due diligence ESG sur chaine d'approvisionnement complete — inclut mines artisanales.", impact:"NOOS due diligence + AELYA consentement = compliance automatisee", status:"Transposition nationale" },
];

export const TOP5_COUNTRIES = ["CD","GN","GA","GH","MA"];

export function getCategoryColor(cat: string): string {
  const map: Record<string, string> = { 'Embargo':'#A13544', 'Reglementation':'#4A7B9D', 'Nationalisme':'#E07850', 'Instabilite':'#A13544', 'Competition':'#C9A96E', 'Infrastructure':'#5A8A3A', 'Marche':'#D4AF37' };
  return map[cat] || '#9A9790';
}

export function getSeverityColor(sev: number): string {
  if (sev >= 9) return '#A13544';
  if (sev >= 7) return '#E07850';
  if (sev >= 5) return '#C9A96E';
  return '#5A8A3A';
}

// ═══════════════════════════════════════════════════════════════
// CORRIDOR MINERAL SITES — 44 African Mining Sites
// Added via RAQIB Agent 4 enrichment — April 2026
// ═══════════════════════════════════════════════════════════════

export interface MineralSite {
  id: string;
  name: string;
  lat: number;
  lng: number;
  category: 'mine' | 'refinery' | 'deposit' | 'export' | 'hub';
  country: string;
  region: string;
  owner: string;
  status: string;
  production: string;
  reeType: string;
  minerals: string;
  reserves: string;
  notes: string;
  geopolitics: string;
}

export const CORRIDOR_MINERAL_SITES: MineralSite[] = [
  { id:"MINE_CD_kisanfu", name:"Kisanfu Mine", lat:-10.779, lng:25.976, category:"mine", country:"CD", region:"Lualaba", owner:"CMOC Group", status:"Operational", production:"~25kt Co 2023", reeType:"Batterie", minerals:"Cobalt, Copper", reserves:"Mine life to 2032", notes:"Ramping up 2025-2026", geopolitics:"RDC 70%+ cobalt mondial" },
  { id:"MINE_CD_tenke_fungurume", name:"Tenke Fungurume", lat:-10.603, lng:26.135, category:"mine", country:"CD", region:"Lualaba", owner:"CMOC 72%, Gecamines", status:"Operational", production:"~22.5kt Co 2023", reeType:"Batterie", minerals:"Cobalt, Copper", reserves:">500Mt ore, life to 2055", notes:"2nd largest Co mine globally", geopolitics:"RDC 70%+ cobalt mondial" },
  { id:"MINE_CD_metalkol", name:"Metalkol RTR", lat:-10.75, lng:25.47, category:"mine", country:"CD", region:"Lualaba Kolwezi", owner:"ERG", status:"Operational", production:"~22kt Co 2023", reeType:"Batterie", minerals:"Cobalt, Copper", reserves:"110 Mt tailings", notes:"Tailings reprocessing", geopolitics:"RDC 70%+ cobalt mondial" },
  { id:"MINE_CD_mutanda", name:"Mutanda Mine", lat:-10.786, lng:25.808, category:"mine", country:"CD", region:"Lualaba", owner:"Glencore", status:"Operational", production:">42kt Co 2025", reeType:"Batterie", minerals:"Cobalt, Copper", reserves:"To 2041", notes:"Higher grades 2026", geopolitics:"RDC 70%+ cobalt mondial" },
  { id:"MINE_CD_kamoto", name:"Kamoto KCC", lat:-10.713, lng:25.419, category:"mine", country:"CD", region:"Lualaba", owner:"Glencore 75%", status:"Operational", production:"~18kt Co 2023", reeType:"Batterie", minerals:"Cobalt, Copper", reserves:"High-grade", notes:"Key part of Kamoto complex", geopolitics:"RDC 70%+ cobalt mondial" },
  { id:"MINE_CD_kamoa_kakula", name:"Kamoa-Kakula", lat:-10.768, lng:25.251, category:"mine", country:"CD", region:"Lualaba", owner:"Ivanhoe, Zijin", status:"Operational", production:"World-class Cu+Co", reeType:"Batterie", minerals:"Copper, Cobalt", reserves:"World-class", notes:"Primarily copper", geopolitics:"RDC 70%+ cobalt mondial" },
  { id:"MINE_CD_deziwa", name:"Deziwa Mine", lat:-10.793, lng:25.782, category:"mine", country:"CD", region:"Lualaba", owner:"CNMC/Gecamines", status:"Operational", production:"~7kt Co 2023", reeType:"Batterie", minerals:"Cobalt, Copper", reserves:"To 2030", notes:"Greenfield", geopolitics:"RDC 70%+ cobalt mondial" },
  { id:"MINE_CD_etoile", name:"Etoile Mine", lat:-10.8, lng:25.5, category:"mine", country:"CD", region:"Katanga", owner:"Shalina Resources", status:"Operational", production:"~6kt Co 2023", reeType:"Batterie", minerals:"Cobalt, Copper", reserves:"10-12 years", notes:"Efficient processing", geopolitics:"RDC 70%+ cobalt mondial" },
  { id:"MINE_GN_sangaredi", name:"Sangaredi CBG", lat:-6.1, lng:11.05, category:"mine", country:"GN", region:"Boke", owner:"CBG Alcoa/Rio Tinto", status:"Operational", production:"15Mt bauxite/an", reeType:"Industriel", minerals:"Bauxite", reserves:"Significant", notes:"1er producteur historique", geopolitics:"Guinee 1er exportateur bauxite" },
  { id:"MINE_GN_smb_winning", name:"SMB-Winning Boke", lat:-6.07, lng:10.94, category:"mine", country:"GN", region:"Boke", owner:"SMB-Winning Shandong", status:"Operational", production:"100Mt+ bauxite/an", reeType:"Industriel", minerals:"Bauxite", reserves:"Massive", notes:"Consortium chinois", geopolitics:"Guinee 1er exportateur bauxite" },
  { id:"MINE_GN_gac", name:"GAC Kamsar", lat:-6.34, lng:10.65, category:"mine", country:"GN", region:"Boke", owner:"Emirates Global Aluminium", status:"Operational", production:"~12Mt bauxite/an", reeType:"Industriel", minerals:"Bauxite", reserves:"Large", notes:"EGA investment", geopolitics:"Guinee 1er exportateur bauxite" },
  { id:"MINE_GN_simandou", name:"Simandou", lat:-8.6, lng:-8.8, category:"deposit", country:"GN", region:"Nzerekore", owner:"Rio Tinto/Simfer", status:"Construction", production:"Planned 60Mt fer/an", reeType:"Industriel", minerals:"Iron ore", reserves:"2.4Bt reserves", notes:"Largest iron deposit", geopolitics:"Mega-projet infrastructure" },
  { id:"MINE_GA_moanda", name:"Moanda Comilog", lat:-1.56, lng:13.27, category:"mine", country:"GA", region:"Haut-Ogooue", owner:"Eramet/Comilog", status:"Operational", production:"7Mt Mn/an", reeType:"Industriel", minerals:"Manganese", reserves:"250Mt+ reserves", notes:"25% production mondiale", geopolitics:"Gabon 2e producteur Mn mondial" },
  { id:"MINE_GA_belinga", name:"Belinga Iron", lat:-1.1, lng:13.1, category:"deposit", country:"GA", region:"Ogooue-Ivindo", owner:"Govt/Various", status:"Development", production:"Planned 30Mt/an", reeType:"Industriel", minerals:"Iron ore", reserves:"1Bt reserves", notes:"Mega-gisement inexploite", geopolitics:"Enjeux environnementaux" },
  { id:"MINE_GH_obuasi", name:"Obuasi Gold Mine", lat:6.148, lng:-1.692, category:"mine", country:"GH", region:"Ashanti", owner:"AngloGold Ashanti", status:"Operational", production:"~300koz Au/yr", reeType:"Precieux", minerals:"Gold", reserves:"35Moz+", notes:"Underground + open-pit", geopolitics:"Ghana hub minier Afrique Ouest" },
  { id:"MINE_GH_tarkwa", name:"Tarkwa Gold Mine", lat:5.318, lng:-2.014, category:"mine", country:"GH", region:"Western", owner:"Gold Fields", status:"Operational", production:"504koz Au", reeType:"Precieux", minerals:"Gold", reserves:"Major", notes:"One of largest in Africa", geopolitics:"Ghana hub minier" },
  { id:"MINE_GH_ahafo", name:"Ahafo Gold Mine", lat:7.012, lng:-2.356, category:"mine", country:"GH", region:"Ahafo", owner:"Newmont", status:"Operational", production:"664koz Au 2025", reeType:"Precieux", minerals:"Gold", reserves:"Large", notes:"Africa #2 gold mine", geopolitics:"Ghana hub minier" },
  { id:"MINE_GH_ewoyaa", name:"Ewoyaa Lithium", lat:5.265, lng:-1.588, category:"deposit", country:"GH", region:"Central", owner:"Atlantic Lithium", status:"Development", production:"3.6Mt spod/yr planned", reeType:"Batterie", minerals:"Lithium spodumene", reserves:"30.1Mt ore", notes:"1er lithium Afrique Ouest", geopolitics:"Strategique batteries EU" },
  { id:"MINE_MA_khouribga", name:"Khouribga Complex", lat:32.883, lng:-6.917, category:"mine", country:"MA", region:"Beni Mellal-Khenifra", owner:"OCP Group", status:"Operational", production:"~19Mt phosphate/yr", reeType:"Agriculture", minerals:"Phosphates", reserves:">26Bt basin", notes:"1er site mondial", geopolitics:"Maroc 70% reserves phosphates" },
  { id:"MINE_MA_benguerir", name:"Benguerir Mine", lat:32.236, lng:-7.95, category:"mine", country:"MA", region:"Marrakech-Safi", owner:"OCP Group", status:"Operational", production:"Part of OCP 40Mt/yr", reeType:"Agriculture", minerals:"Phosphates", reserves:"Gantour basin", notes:"Expansion active", geopolitics:"Maroc 70% reserves phosphates" },
  { id:"MINE_MA_boucraa", name:"Boucraa Mine", lat:26.3, lng:-12.9, category:"mine", country:"MA", region:"Laayoune", owner:"OCP Group", status:"Operational", production:"2.6Mt phosphate/yr", reeType:"Agriculture", minerals:"Phosphates", reserves:"1.1Bt reserves", notes:"Sahara occidental", geopolitics:"Maroc 70% reserves phosphates" },
  { id:"MINE_MA_bou_azzer", name:"Bou Azzer Cobalt", lat:30.48, lng:-6.9, category:"mine", country:"MA", region:"Ouarzazate", owner:"Managem/CTT", status:"Operational", production:"2000t Co/yr", reeType:"Batterie", minerals:"Cobalt, Arsenic", reserves:"Significant", notes:"Unique mine Co Afrique hors RDC", geopolitics:"Hub raffinage Jorf Lasfar" },
  { id:"MINE_RW_nyakabingo", name:"Nyakabingo Tungsten", lat:-1.67, lng:29.08, category:"mine", country:"RW", region:"Northern", owner:"Wolfram Mining", status:"Operational", production:"~500t W conc/yr", reeType:"Electronique", minerals:"Tungsten", reserves:"N/A", notes:"3TG tracabilite ITSCI", geopolitics:"Rwanda modele tracabilite 3TG" },
  { id:"MINE_RW_rutongo", name:"Rutongo Tin", lat:-1.85, lng:30.0, category:"mine", country:"RW", region:"Kigali", owner:"Rutongo Mines", status:"Operational", production:"~1000t Sn conc/yr", reeType:"Electronique", minerals:"Tin", reserves:"N/A", notes:"3TG tracabilite ITSCI", geopolitics:"Rwanda modele tracabilite 3TG" },
  { id:"MINE_NG_jos_plateau", name:"Jos Plateau Tin", lat:9.9, lng:8.88, category:"mine", country:"NG", region:"Plateau", owner:"Various artisanal", status:"Active", production:"Artisanal tin/coltan", reeType:"Electronique", minerals:"Tin, Coltan", reserves:"31000t+ reserves", notes:"Artisanal dominant", geopolitics:"Nigeria industrialisation miniere" },
  { id:"MINE_NG_hasetins", name:"Hasetins REE Plant", lat:9.0, lng:8.0, category:"refinery", country:"NG", region:"Nasarawa", owner:"Hasetins Commodities", status:"Construction", production:"12000t REE/yr planned", reeType:"Electronique", minerals:"REE, Tin, Tantalum", reserves:"$400M invest", notes:"Plus grande usine REE Afrique", geopolitics:"Nigeria industrialisation miniere" },
  { id:"MINE_ML_goulamina", name:"Goulamina Lithium", lat:12.801, lng:-7.95, category:"mine", country:"ML", region:"Koulikoro", owner:"Ganfeng 65%, Mali", status:"Operational 2024", production:"506kt spod conc/yr", reeType:"Batterie", minerals:"Lithium spodumene", reserves:"267Mt @1.38% Li2O", notes:"World-class deposit", geopolitics:"Mali geopolitique instable" },
  { id:"MINE_AO_longonjo", name:"Longonjo REE", lat:-12.921, lng:15.225, category:"deposit", country:"AO", region:"Huambo", owner:"Pensana Plc 84%", status:"Construction 2027", production:"20kt MREC/yr planned", reeType:"Electronique", minerals:"REE NdPr", reserves:"21.5Mt @3.04% TREO", notes:"Export via Lobito Railway", geopolitics:"Angola diversifie hors petrole" },
  { id:"MINE_AO_catoca", name:"Catoca Diamond", lat:-9.55, lng:20.18, category:"mine", country:"AO", region:"Lunda Sul", owner:"Endiama/Alrosa", status:"Operational", production:"~7M carats/yr", reeType:"Precieux", minerals:"Diamonds", reserves:"Kimberlite pipe", notes:"4e mine diamants mondiale", geopolitics:"Angola 3e producteur diamants" },
  { id:"MINE_SL_sembehun", name:"Sembehun Rutile", lat:7.668, lng:-12.319, category:"deposit", country:"SL", region:"Southern", owner:"Sierra Rutile", status:"Development 2028", production:"175kt rutile/yr planned", reeType:"Industriel", minerals:"Rutile, Ilmenite", reserves:"174Mt @1.45%", notes:"Plus grand gisement rutile HG", geopolitics:"Sierra Leone 1er rutile mondial" },
  { id:"MINE_SL_tonkolili", name:"Tonkolili Iron", lat:8.93, lng:-12.12, category:"mine", country:"SL", region:"Tonkolili", owner:"SL Mining/Kingho", status:"Operational", production:"~15Mt iron/yr", reeType:"Industriel", minerals:"Iron ore", reserves:"12.8Bt reserves", notes:"Investissement chinois", geopolitics:"Sierra Leone iron+rutile" },
  { id:"MINE_SN_grande_cote", name:"Grande Cote GCO", lat:15.27, lng:-16.88, category:"mine", country:"SN", region:"Thies", owner:"Eramet/GCO", status:"Operational", production:"75kt zircon/yr", reeType:"Industriel", minerals:"Zircon, Ilmenite", reserves:"Heavy mineral sands", notes:"Monazite non recuperee", geopolitics:"Senegal sables mineraux" },
  { id:"MINE_ZA_mogalakwena", name:"Mogalakwena PGM", lat:-24.006, lng:28.918, category:"mine", country:"ZA", region:"Limpopo", owner:"Anglo American Pt", status:"Operational", production:"412koz Pt 2023", reeType:"Catalyseur", minerals:"PGMs Platreef", reserves:"World-class", notes:"Open pit mega-mine", geopolitics:"AfSud 80% PGM mondial" },
  { id:"MINE_ZA_marikana", name:"Marikana PGM", lat:-25.725, lng:27.429, category:"mine", country:"ZA", region:"North West", owner:"Sibanye Stillwater", status:"Operational", production:"468koz Pt 2023", reeType:"Catalyseur", minerals:"PGMs", reserves:"28Moz 4E reserves", notes:"Ex-Lonmin", geopolitics:"AfSud 80% PGM mondial" },
  { id:"MINE_ZA_impala", name:"Impala Rustenburg", lat:-25.541, lng:27.185, category:"mine", country:"ZA", region:"North West", owner:"Impala Platinum", status:"Operational", production:"710koz Pt 2023", reeType:"Catalyseur", minerals:"PGMs", reserves:"Major producer", notes:"Merensky/UG2 reefs", geopolitics:"AfSud 80% PGM mondial" },
  { id:"MINE_MZ_balama", name:"Balama Graphite", lat:-13.35, lng:38.55, category:"mine", country:"MZ", region:"Cabo Delgado", owner:"Syrah Resources", status:"Operational", production:"~180kt graphite/yr", reeType:"Batterie", minerals:"Graphite", reserves:"150Mt+ ore", notes:"Pour anodes batteries", geopolitics:"Mozambique graphite+gaz" },
  { id:"MINE_MZ_moma", name:"Moma Titanium", lat:-16.6, lng:39.7, category:"mine", country:"MZ", region:"Nampula", owner:"Kenmare Resources", status:"Operational", production:"~1.2Mt HMC/yr", reeType:"Industriel", minerals:"Ilmenite, Zircon", reserves:"100+ year life", notes:"Heavy mineral sands", geopolitics:"Mozambique sables lourds" },
  { id:"MINE_NA_husab", name:"Husab Uranium", lat:-22.8, lng:15.15, category:"mine", country:"NA", region:"Erongo", owner:"CNNC/Swakop", status:"Operational", production:"~5300t U3O8/yr", reeType:"Electronique", minerals:"Uranium", reserves:"Large reserves", notes:"Investissement chinois", geopolitics:"Namibie 2e producteur uranium" },
  { id:"MINE_NA_rossing", name:"Rossing Uranium", lat:-22.48, lng:15.05, category:"mine", country:"NA", region:"Erongo", owner:"CNNC", status:"Operational", production:"~2800t U3O8/yr", reeType:"Electronique", minerals:"Uranium", reserves:"Major", notes:"Plus ancienne mine U active", geopolitics:"Namibie 2e producteur uranium" },
  { id:"MINE_MG_molo", name:"Molo Graphite", lat:-24.002, lng:45.13, category:"mine", country:"MG", region:"Atsimo-Andrefana", owner:"NextSource", status:"Operational Ph1", production:"17kt graphite/yr", reeType:"Batterie", minerals:"Graphite", reserves:"120Mt ore", notes:"SuperFlake product", geopolitics:"Madagascar graphite strategique" },
  { id:"MINE_MG_ambatovy", name:"Ambatovy Nickel", lat:-18.845, lng:48.307, category:"mine", country:"MG", region:"Alaotra-Mangoro", owner:"Sumitomo", status:"Operational", production:"~37kt Ni 3.6kt Co/yr", reeType:"Batterie", minerals:"Nickel, Cobalt", reserves:"146Mt ore", notes:"Plus grande mine Madagascar", geopolitics:"Madagascar nickel+cobalt" },
  { id:"MINE_LR_arcelor", name:"ArcelorMittal Western Range", lat:6.95, lng:-10.75, category:"mine", country:"LR", region:"Nimba", owner:"ArcelorMittal", status:"Operational", production:"~5Mt iron/yr", reeType:"Industriel", minerals:"Iron ore", reserves:"1Bt+ reserves", notes:"Infrastructure Buchanan rail", geopolitics:"Liberia fer strategique" },
  { id:"MINE_GW_farim", name:"Farim Phosphate", lat:12.48, lng:-15.23, category:"deposit", country:"GW", region:"Oio", owner:"GB Minerals", status:"Development", production:"2.5Mt/yr planned", reeType:"Agriculture", minerals:"Phosphates", reserves:"135Mt ore", notes:"Projet en attente financement", geopolitics:"Guinee-Bissau faible developpement" },
  { id:"MINE_CG_kola", name:"Kola Potash", lat:-4.45, lng:12.2, category:"deposit", country:"CG", region:"Kouilou", owner:"Kore Potash", status:"Development", production:"2.2Mt MOP/yr planned", reeType:"Agriculture", minerals:"Potash", reserves:"4.7Bt ore", notes:"DFS complete", geopolitics:"Congo-B potasse strategique" },
  { id:"MINE_CM_nkamouna", name:"Nkamouna Co-Ni-Mn", lat:3.267, lng:13.845, category:"deposit", country:"CM", region:"Haut-Nyong", owner:"SONAMINES", status:"Seeking partners", production:"13.5M lbs Co/yr planned", reeType:"Batterie", minerals:"Cobalt, Nickel, Mn", reserves:"68.1Mt ore", notes:"20+ ans sans production", geopolitics:"Cameroun metals batterie" },
];
