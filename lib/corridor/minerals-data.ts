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
