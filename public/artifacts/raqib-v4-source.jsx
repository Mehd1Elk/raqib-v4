import { useState, useEffect, useMemo } from "react";

// ═══════ IVORY LUXURY DESIGN ═══════
const C = {
  ivory:"#FDFAF3",cream:"#F7F3EA",parchment:"#F0EBDE",linen:"#E8E2D2",
  sand:"#D4CCBA",taupe:"#B8AE9C",stone:"#918977",walnut:"#6B5E4C",
  espresso:"#3D3428",noir:"#1C1814",
  gold:"#B8963E",goldL:"#D4B662",goldD:"#8C6E2A",
  ruby:"#9C3D3D",emerald:"#3D7C5E",sapphire:"#3D5E8C",amber:"#B87D3E",
  bordeaux:"#6E2A3D",olive:"#5E6E3D",violet:"#7B5EA7",teal:"#3D7C8C",
  cgGreen:"#162B20",cgGold:"#C9A96E",
  div:"rgba(60,52,40,0.10)",divL:"rgba(60,52,40,0.05)",
  t1:"#2A2318",t2:"#6B5E4C",t3:"#918977",tm:"#B8AE9C",
};
const GR=`"Playfair Display",Georgia,serif`;
const MN=`"JetBrains Mono",monospace`;
const SN=`"Noto Sans",system-ui,sans-serif`;

// ═══════ 9 AI PLATFORMS ═══════
const PLATFORMS = {
  CC:{n:"Claude Code",c:"#D97706",s:"Code complexe, Rust, scraping, APIs, datasets"},
  CW:{n:"Cowork",c:"#7C3AED",s:"Documents, analyses, fiches, rapports"},
  OC:{n:"OpenClaw",c:"#059669",s:"Orchestration, cron, scheduling, notifications"},
  CX:{n:"Codex (OpenAI)",c:"#2563EB",s:"Code parallèle, multi-fichier, CI/CD"},
  PP:{n:"Perplexity",c:"#0891B2",s:"Recherche vérifiée, sources premium"},
  AG:{n:"Antigravity (Google)",c:"#DC2626",s:"Frontend, UX, build-test loop"},
  ML:{n:"Mistral (Le Chat)",c:"#F97316",s:"Vérification FR/EU, NLP français"},
  DS:{n:"DeepSeek / Qwen",c:"#6366F1",s:"Vérification adversariale, open source, local"},
  CA:{n:"Claude.ai Projects",c:"#8B5CF6",s:"Mémoire persistante, contexte agent, cognitif"},
};

// ═══════ 8 ENTITIES ═══════
const ENTITIES = [
  {id:"noos",n:"NOOS",c:C.sapphire,desc:"Algorithmic Psychiatric Assessment Engine",type:"BRIQUE"},
  {id:"aelya",n:"ÆLYA",c:C.emerald,desc:"Consent & Anonymization Agent",type:"BRIQUE"},
  {id:"myne",n:"MYNε",c:C.violet,desc:"Sovereign Data Marketplace",type:"BRIQUE"},
  {id:"burhan",n:"BURHAN",c:C.gold,desc:"Blockchain Audit Trail",type:"BRIQUE"},
  {id:"yrknown",n:"YrKnown",c:C.amber,desc:"Tacit Knowledge Digitization",type:"BRIQUE"},
  {id:"diwane",n:"DIWANE",c:C.bordeaux,desc:"Art Sovereignty & Crédit Lombard",type:"VENTURE"},
  {id:"alguesov",n:"AlgueSov",c:C.teal,desc:"Seaweed Traceability Web 4.0",type:"VENTURE"},
  {id:"amana",n:"AMANA",c:C.olive,desc:"Charitable Trust Infrastructure",type:"VENTURE"},
  {id:"cg",n:"CG SA",c:C.cgGreen,desc:"Investment Club Pan-Africain · Corridor Atlantique · 22 Nations · CFC",type:"HOLDING"},
  {id:"cercle",n:"Cercle du Gazoduc",c:C.cgGold,desc:"Écosystème Souverain · Eigen Holding · 6 Subsidiaires · Conquête 2026",type:"ECOSYSTEM"},
];

// ═══════ 100 LAYERS PER ENTITY — ALL 800 UNIQUE ═══════
const LAYER_DEFS = {
  noos: [
    {cat:"I · CLINIQUE & PSYCHIATRIE",layers:[
      {id:"n01",n:"Psychiatres par ville/pays (annuaire)",p:"CC",rows:17200},{id:"n02",n:"Psychologues cliniciens (annuaire)",p:"CC",rows:45000},{id:"n03",n:"Infirmiers psychiatriques",p:"CC",rows:28000},
      {id:"n04",n:"Neuropsychologues spécialisés",p:"PP",rows:3500},{id:"n05",n:"Addictologues certifiés",p:"PP",rows:4200},{id:"n06",n:"Pédopsychiatres",p:"CC",rows:6800},
      {id:"n07",n:"Géronto-psychiatres",p:"PP",rows:2100},{id:"n08",n:"Psychiatres légaux / experts judiciaires",p:"PP",rows:1800},{id:"n09",n:"Médecins du travail (RPS)",p:"CC",rows:12000},{id:"n10",n:"Pharmaciens neuro-psychopharmaco",p:"CC",rows:8500},
    ]},
    {cat:"II · ÉTABLISSEMENTS DE SOINS",layers:[
      {id:"n11",n:"Hôpitaux psychiatriques publics",p:"CC",rows:2400},{id:"n12",n:"Cliniques psychiatriques privées",p:"CC",rows:3800},{id:"n13",n:"CMP (Centres Médico-Psychologiques)",p:"CC",rows:4200},
      {id:"n14",n:"CATTP / Hôpitaux de jour",p:"CC",rows:2800},{id:"n15",n:"CSAPA (addictologie)",p:"CC",rows:1500},{id:"n16",n:"Maisons de santé pluridisciplinaires",p:"CC",rows:6500},
      {id:"n17",n:"Unités de soins longue durée SM",p:"PP",rows:1200},{id:"n18",n:"Services d'urgences psychiatriques",p:"CC",rows:800},{id:"n19",n:"Centres de réhabilitation psychosociale",p:"PP",rows:950},{id:"n20",n:"Structures HAD psychiatrique",p:"PP",rows:600},
    ]},
    {cat:"III · RÉGLEMENTAIRE & CERTIFICATION",layers:[
      {id:"n21",n:"Cadres dispositifs médicaux par pays",p:"PP",rows:45},{id:"n22",n:"Notified Bodies CE IIa (liste)",p:"PP",rows:80},{id:"n23",n:"Procédures HAS / ANSM France",p:"CW",rows:25},
      {id:"n24",n:"AI Act — articles applicables NOOS",p:"CW",rows:35},{id:"n25",n:"Lois santé mentale par juridiction",p:"PP",rows:60},{id:"n26",n:"Protocoles essais cliniques numériques",p:"CW",rows:30},
      {id:"n27",n:"Référentiels HAS qualité en santé mentale",p:"CW",rows:40},{id:"n28",n:"Normes ISO 13485 / 14971 applicables",p:"CW",rows:20},{id:"n29",n:"Classification CLADIMED / GMDN",p:"PP",rows:15},{id:"n30",n:"Jurisprudence IA en santé (CJUE/Cass.)",p:"PP",rows:50},
    ]},
    {cat:"IV · ÉPIDÉMIOLOGIE & DONNÉES SANTÉ",layers:[
      {id:"n31",n:"Prévalence troubles SM par pays",p:"CC",rows:2600},{id:"n32",n:"Incidence dépression par région",p:"CC",rows:3200},{id:"n33",n:"Taux suicide par pays/âge/genre",p:"CC",rows:1800},
      {id:"n34",n:"Consommation psychotropes par pays",p:"CC",rows:2400},{id:"n35",n:"Données DREES / HCP santé mentale",p:"CC",rows:5000},{id:"n36",n:"Données OMS Global Health Observatory SM",p:"CC",rows:8000},
      {id:"n37",n:"Cohortes longitudinales SM (répertoire)",p:"PP",rows:250},{id:"n38",n:"Registres nationaux de santé mentale",p:"PP",rows:45},{id:"n39",n:"Données EHDS (European Health Data Space)",p:"PP",rows:120},{id:"n40",n:"Corrélations socio-éco × SM (datasets)",p:"CC",rows:4500},
    ]},
    {cat:"V · MARCHÉ & CONCURRENCE",layers:[
      {id:"n41",n:"TAM/SAM/SOM par pays × segment",p:"PP",rows:120},{id:"n42",n:"Concurrents directs (digital psych.)",p:"PP",rows:85},{id:"n43",n:"Concurrents indirects (téléconsult, EAP)",p:"PP",rows:150},
      {id:"n44",n:"Pricing benchmarks global",p:"PP",rows:60},{id:"n45",n:"Rounds de levée mental health tech",p:"PP",rows:200},{id:"n46",n:"Échecs / shutdowns (post-mortem)",p:"PP",rows:45},
      {id:"n47",n:"Part de marché assureurs santé mentale",p:"PP",rows:80},{id:"n48",n:"Remboursement DM numériques par pays",p:"PP",rows:55},{id:"n49",n:"DiGA (Allemagne) — catalogue complet",p:"CC",rows:75},{id:"n50",n:"DTx (Digital Therapeutics) — pipeline global",p:"PP",rows:180},
    ]},
    {cat:"VI · INVESTISSEURS & FUNDRAISING",layers:[
      {id:"n51",n:"VC healthtech (fiches fonds)",p:"PP",rows:250},{id:"n52",n:"CVC pharma/assurance",p:"PP",rows:80},{id:"n53",n:"DFI santé Afrique",p:"PP",rows:45},
      {id:"n54",n:"Business angels santé numérique",p:"PP",rows:120},{id:"n55",n:"Subventions / grants santé IA",p:"PP",rows:90},{id:"n56",n:"Concours innovation santé (calendrier)",p:"PP",rows:60},
      {id:"n57",n:"Comparables (valorisations mental health)",p:"PP",rows:35},{id:"n58",n:"Data room — checklist par stade",p:"CW",rows:25},{id:"n59",n:"LP profiles (limited partners santé)",p:"PP",rows:70},{id:"n60",n:"Family offices santé/impact",p:"PP",rows:55},
    ]},
    {cat:"VII · RÉSEAU & INTRODUCTIONS",layers:[
      {id:"n61",n:"KOLs psychiatrie (scoring influence)",p:"PP",rows:350},{id:"n62",n:"Chaînes d'introduction — 1er cercle",p:"CW",rows:40},{id:"n63",n:"Chaînes d'introduction — 2ème cercle",p:"CW",rows:120},
      {id:"n64",n:"Congrès psychiatrie (calendrier mondial)",p:"PP",rows:200},{id:"n65",n:"Associations psychiatriques nationales",p:"PP",rows:65},{id:"n66",n:"Réseaux alumni médecine (contacts)",p:"PP",rows:300},
      {id:"n67",n:"Comités scientifiques (compositions)",p:"PP",rows:85},{id:"n68",n:"Advisory boards santé numérique",p:"CW",rows:45},{id:"n69",n:"Parlementaires commission santé",p:"PP",rows:90},{id:"n70",n:"Journalistes santé mentale (presse)",p:"PP",rows:150},
    ]},
    {cat:"VIII · SCIENTIFIQUE & R&D",layers:[
      {id:"n71",n:"Publications SCID/diagnostic digital (PubMed)",p:"CC",rows:12000},{id:"n72",n:"Brevets IA diagnostic psychiatrique",p:"CC",rows:800},{id:"n73",n:"Datasets ouverts santé mentale",p:"CC",rows:120},
      {id:"n74",n:"Modèles NLP cliniques (benchmarks)",p:"CC",rows:60},{id:"n75",n:"Instruments psychométriques validés",p:"CW",rows:250},{id:"n76",n:"Essais cliniques en cours (ClinicalTrials.gov)",p:"CC",rows:3500},
      {id:"n77",n:"Laboratoires neuro-IA (cartographie)",p:"PP",rows:180},{id:"n78",n:"Thèses en cours diagnostic IA",p:"PP",rows:90},{id:"n79",n:"Standards interopérabilité (HL7 FHIR SM)",p:"CW",rows:30},{id:"n80",n:"Base DSM-5-TR / CIM-11 structurée",p:"CW",rows:450},
    ]},
    {cat:"IX · GÉOPOLITIQUE & MACRO SANTÉ",layers:[
      {id:"n81",n:"Budget santé mentale / PIB par pays",p:"CC",rows:200},{id:"n82",n:"Plans nationaux santé mentale",p:"PP",rows:45},{id:"n83",n:"Workforce psychiatrique mondiale",p:"CC",rows:200},
      {id:"n84",n:"Migration médecins (brain drain SM)",p:"PP",rows:80},{id:"n85",n:"Politiques dé-institutionnalisation",p:"PP",rows:35},{id:"n86",n:"Stigmatisation SM (indices par pays)",p:"PP",rows:50},
      {id:"n87",n:"Couverture maladie universelle (SM)",p:"CC",rows:200},{id:"n88",n:"Accords multilatéraux santé (OMS résolutions)",p:"PP",rows:40},{id:"n89",n:"Philanthropie santé mentale (fonds/fondations)",p:"PP",rows:85},{id:"n90",n:"Impact COVID sur SM (données longitudinales)",p:"CC",rows:3000},
    ]},
    {cat:"X · OPÉRATIONNEL & TECHNIQUE",layers:[
      {id:"n91",n:"APIs santé disponibles par pays",p:"CC",rows:150},{id:"n92",n:"Dossier patient informatisé (DPI) — parts marché",p:"PP",rows:60},{id:"n93",n:"Interopérabilité SI hospitaliers",p:"CW",rows:40},
      {id:"n94",n:"Données SNDS / PMSI psychiatrie (FR)",p:"CC",rows:15000},{id:"n95",n:"Coûts hébergement HDS (France)",p:"PP",rows:30},{id:"n96",n:"Latence réseau par pays corridor",p:"CC",rows:65},
      {id:"n97",n:"Pénétration smartphone par pays/âge",p:"CC",rows:200},{id:"n98",n:"Alphabétisation numérique santé",p:"PP",rows:50},{id:"n99",n:"Calendrier réglementaire (deadlines)",p:"CW",rows:35},{id:"n100",n:"Métriques qualité à tracker (KPI cliniques)",p:"CW",rows:25},
    ]},
  ],
  aelya: [
    {cat:"I · DROIT DES DONNÉES & PRIVACY",layers:[
      {id:"a01",n:"Lois protection données par pays (193)",p:"PP",rows:193},{id:"a02",n:"Autorités de contrôle (CNIL equiv.)",p:"PP",rows:130},{id:"a03",n:"Sanctions RGPD prononcées (historique)",p:"CC",rows:4500},
      {id:"a04",n:"Décisions CJUE données personnelles",p:"PP",rows:200},{id:"a05",n:"Transferts internationaux (clauses types)",p:"CW",rows:80},{id:"a06",n:"RGPD — articles applicables ÆLYA",p:"CW",rows:45},
      {id:"a07",n:"Data Act (EU) — mapping impacts",p:"CW",rows:30},{id:"a08",n:"AI Act — obligations transparence",p:"CW",rows:40},{id:"a09",n:"EHDS — chapitres consentement",p:"CW",rows:25},{id:"a10",n:"Loi 09-08 Maroc (CNDP) — détail articles",p:"CW",rows:35},
    ]},
    {cat:"II · TECHNOLOGIES CONSENTEMENT",layers:[
      {id:"a11",n:"Concurrents CMP (Consent Management)",p:"PP",rows:120},{id:"a12",n:"Technologies PET (Privacy Enhancing)",p:"PP",rows:85},{id:"a13",n:"Protocoles Zero-Knowledge Proof",p:"CC",rows:40},
      {id:"a14",n:"Differential Privacy — implémentations",p:"CC",rows:55},{id:"a15",n:"Homomorphic encryption — benchmarks",p:"CC",rows:30},{id:"a16",n:"Federated Learning — frameworks",p:"CC",rows:45},
      {id:"a17",n:"Trusted Execution Environments (TEE)",p:"CC",rows:25},{id:"a18",n:"Anonymisation k-anonymity/l-diversity",p:"CC",rows:35},{id:"a19",n:"Pseudonymisation — techniques comparées",p:"CW",rows:20},{id:"a20",n:"Consentement granulaire — UX patterns",p:"AG",rows:50},
    ]},
    {cat:"III · DPO & COMPLIANCE OFFICERS",layers:[
      {id:"a21",n:"DPO certifiés par pays (annuaire)",p:"CC",rows:15000},{id:"a22",n:"Cabinets avocats privacy (top 50/pays)",p:"PP",rows:650},{id:"a23",n:"Consultants RGPD / privacy (annuaire)",p:"PP",rows:2000},
      {id:"a24",n:"Formations DPO (catalogue)",p:"PP",rows:120},{id:"a25",n:"Certifications privacy (CIPP, CIPM, etc.)",p:"PP",rows:40},{id:"a26",n:"Associations DPO nationales",p:"PP",rows:45},
      {id:"a27",n:"AIPD / DPIA — templates et méthodologies",p:"CW",rows:30},{id:"a28",n:"Registres de traitement — modèles",p:"CW",rows:25},{id:"a29",n:"Codes de conduite sectoriels (Art. 40)",p:"PP",rows:35},{id:"a30",n:"Mécanismes de certification (Art. 42)",p:"PP",rows:20},
    ]},
    {cat:"IV · MARCHÉ PRIVACY TECH",layers:[
      {id:"a31",n:"TAM/SAM privacy tech par région",p:"PP",rows:60},{id:"a32",n:"Levées de fonds privacy tech (historique)",p:"PP",rows:300},{id:"a33",n:"Exits / acquisitions privacy tech",p:"PP",rows:80},
      {id:"a34",n:"Pricing CMP / consent tools",p:"PP",rows:70},{id:"a35",n:"Parts de marché CMP (Didomi, OneTrust, etc.)",p:"PP",rows:40},{id:"a36",n:"Marché DPO-as-a-Service",p:"PP",rows:50},
      {id:"a37",n:"Marché anonymisation (sizing)",p:"PP",rows:30},{id:"a38",n:"Marché audit RGPD",p:"PP",rows:45},{id:"a39",n:"Adoption AI Act — projections",p:"PP",rows:25},{id:"a40",n:"Marché data clean rooms",p:"PP",rows:35},
    ]},
    {cat:"V · SANTÉ & CONSENTEMENT BIO",layers:[
      {id:"a41",n:"Protocoles consentement éclairé (ICH-GCP)",p:"CW",rows:40},{id:"a42",n:"Comités éthique par pays (liste)",p:"PP",rows:200},{id:"a43",n:"Biobanques (consentement dynamique)",p:"PP",rows:150},
      {id:"a44",n:"Consentement mineur en santé numérique",p:"CW",rows:25},{id:"a45",n:"Directives EMA digital consent",p:"CW",rows:20},{id:"a46",n:"FDA digital consent guidance",p:"PP",rows:15},
      {id:"a47",n:"Consentement données génétiques",p:"CW",rows:30},{id:"a48",n:"Secondary use health data (EHDS Ch. IV)",p:"CW",rows:25},{id:"a49",n:"Consentement recherche clinique numérique",p:"CW",rows:35},{id:"a50",n:"Withdrawal of consent — mécanismes tech",p:"CC",rows:20},
    ]},
    {cat:"VI · INVESTISSEURS & FINANCEMENT",layers:[
      {id:"a51",n:"VC privacy/regtech",p:"PP",rows:120},{id:"a52",n:"Grants EU privacy (Horizon Europe)",p:"PP",rows:60},{id:"a53",n:"DFI data protection Afrique",p:"PP",rows:30},
      {id:"a54",n:"Comparables valorisation privacy tech",p:"PP",rows:40},{id:"a55",n:"Corporate buyers (compliance budgets)",p:"PP",rows:80},{id:"a56",n:"Family offices impact / ESG",p:"PP",rows:45},
      {id:"a57",n:"Subventions CNIL / EDPS",p:"PP",rows:20},{id:"a58",n:"Budget compliance RGPD entreprises",p:"PP",rows:50},{id:"a59",n:"Sandbox réglementaires (Art. 53 AI Act)",p:"PP",rows:15},{id:"a60",n:"Pilotes gouvernementaux privacy tech",p:"PP",rows:25},
    ]},
    {cat:"VII · RÉSEAU & INTRODUCTIONS",layers:[
      {id:"a61",n:"KOLs privacy / data protection",p:"PP",rows:200},{id:"a62",n:"Conférences privacy (IAPP, CPDP, etc.)",p:"PP",rows:80},{id:"a63",n:"Académiques privacy (chercheurs)",p:"PP",rows:500},
      {id:"a64",n:"Groupes de travail EDPB",p:"PP",rows:30},{id:"a65",n:"Rapporteurs AI Act (Parlement EU)",p:"PP",rows:20},{id:"a66",n:"CNIL Lab / Bac à sable",p:"PP",rows:15},
      {id:"a67",n:"Associations numériques (AFCDP, etc.)",p:"PP",rows:40},{id:"a68",n:"Think tanks data governance",p:"PP",rows:50},{id:"a69",n:"Media tech/privacy (journalistes)",p:"PP",rows:100},{id:"a70",n:"Advisory boards data ethics",p:"CW",rows:30},
    ]},
    {cat:"VIII · TECHNIQUE & SDK",layers:[
      {id:"a71",n:"SDKs consent (open source)",p:"CC",rows:60},{id:"a72",n:"APIs réglementaires (CNIL, ICO, etc.)",p:"CC",rows:40},{id:"a73",n:"Standards W3C / ISO privacy",p:"CW",rows:30},
      {id:"a74",n:"IAB TCF (Transparency & Consent Fw)",p:"CW",rows:20},{id:"a75",n:"Google Privacy Sandbox — impacts",p:"PP",rows:25},{id:"a76",n:"Apple ATT — impacts",p:"PP",rows:20},
      {id:"a77",n:"Cookie-less tracking alternatives",p:"PP",rows:35},{id:"a78",n:"Consent receipts (Kantara)",p:"CW",rows:15},{id:"a79",n:"Architecture REJECT-by-default",p:"CC",rows:10},{id:"a80",n:"Neural consent engine (2033 roadmap)",p:"CW",rows:15},
    ]},
    {cat:"IX · GÉOPOLITIQUE DATA",layers:[
      {id:"a81",n:"Adequacy decisions (EU)",p:"PP",rows:45},{id:"a82",n:"Schrems I/II/III — impacts",p:"CW",rows:15},{id:"a83",n:"CLOUD Act / FISA 702 — risques",p:"CW",rows:20},
      {id:"a84",n:"Convention 108+ (Conseil Europe)",p:"CW",rows:15},{id:"a85",n:"African Union Convention cybersécurité",p:"PP",rows:20},{id:"a86",n:"PIPL (Chine) — comparatif",p:"PP",rows:25},
      {id:"a87",n:"Data localization laws par pays",p:"PP",rows:80},{id:"a88",n:"Digital sovereignty policies (EU/Africa)",p:"PP",rows:40},{id:"a89",n:"Surveillance laws par pays (scoring)",p:"PP",rows:60},{id:"a90",n:"Freedom House — Internet Freedom",p:"CC",rows:200},
    ]},
    {cat:"X · OPÉRATIONNEL",layers:[
      {id:"a91",n:"Templates AIPD par secteur",p:"CW",rows:25},{id:"a92",n:"Registres de traitement (modèles)",p:"CW",rows:20},{id:"a93",n:"Procédures violation données (72h)",p:"CW",rows:15},
      {id:"a94",n:"Cartographie des traitements Eigen",p:"CW",rows:40},{id:"a95",n:"SLA consentement (latence, uptime)",p:"CC",rows:15},{id:"a96",n:"Coûts infrastructure privacy",p:"PP",rows:30},
      {id:"a97",n:"Métriques ÆLYA (KPI consentement)",p:"CW",rows:20},{id:"a98",n:"Calendrier réglementaire EU 2026-2030",p:"CW",rows:40},{id:"a99",n:"Benchmark UX consent (taux opt-in)",p:"AG",rows:50},{id:"a100",n:"Formation interne privacy (modules)",p:"CW",rows:15},
    ]},
  ],
  myne: [
    {cat:"I · ÉCONOMIE DES DONNÉES",layers:[{id:"m01",n:"Data brokers mondiaux (cartographie)",p:"PP",rows:500},{id:"m02",n:"Marketplaces de données existantes",p:"PP",rows:120},{id:"m03",n:"Pricing datasets par verticale",p:"PP",rows:200},{id:"m04",n:"Modèles de rémunération producteurs",p:"CW",rows:40},{id:"m05",n:"Économie de l'intention (littérature)",p:"CW",rows:80},{id:"m06",n:"Valeur données personnelles (études)",p:"PP",rows:60},{id:"m07",n:"Data unions / coopératives (cartographie)",p:"PP",rows:45},{id:"m08",n:"Monétisation données santé (cadre)",p:"CW",rows:30},{id:"m09",n:"Open Banking data (DSP2/DSP3)",p:"PP",rows:50},{id:"m10",n:"Data trusts (modèles juridiques)",p:"CW",rows:25}]},
    {cat:"II · ACHETEURS DE DONNÉES",layers:[{id:"m11",n:"Pharma — acheteurs datasets cliniques",p:"PP",rows:300},{id:"m12",n:"Assureurs — données actuarielles",p:"PP",rows:150},{id:"m13",n:"DFI — données développement",p:"PP",rows:80},{id:"m14",n:"AdTech — données intentionnelles",p:"PP",rows:200},{id:"m15",n:"Recherche académique (budgets data)",p:"PP",rows:400},{id:"m16",n:"Gouvernements — achats datasets",p:"PP",rows:60},{id:"m17",n:"Cabinets conseil (McKinsey, BCG, etc.)",p:"PP",rows:40},{id:"m18",n:"Fonds d'investissement (alt. data)",p:"PP",rows:100},{id:"m19",n:"Télécoms — données mobilité",p:"PP",rows:50},{id:"m20",n:"Agritech — données terrain",p:"PP",rows:70}]},
    {cat:"III · RÉGLEMENTAIRE DATA MARKET",layers:[{id:"m21",n:"Data Act (EU) — articles MYNε",p:"CW",rows:30},{id:"m22",n:"Data Governance Act — obligations",p:"CW",rows:25},{id:"m23",n:"EHDS — accès secondaire données",p:"CW",rows:20},{id:"m24",n:"Open Data Directive (EU)",p:"PP",rows:15},{id:"m25",n:"Réglementation data brokers USA",p:"PP",rows:20},{id:"m26",n:"PIPL / DSL (Chine) — data market",p:"PP",rows:15},{id:"m27",n:"Cadre données Maroc (Loi 09-08)",p:"CW",rows:20},{id:"m28",n:"NDPA Nigeria — data commerce",p:"PP",rows:15},{id:"m29",n:"Régimes fiscaux données numériques",p:"PP",rows:40},{id:"m30",n:"Propriété des données (cadres jur.)",p:"CW",rows:30}]},
    {cat:"IV · TECHNIQUE MARKETPLACE",layers:[{id:"m31",n:"Architectures data marketplace",p:"CC",rows:30},{id:"m32",n:"Protocoles A2A (Agent-to-Agent)",p:"CC",rows:25},{id:"m33",n:"Data mesh / data fabric patterns",p:"CC",rows:20},{id:"m34",n:"Qualité données (frameworks)",p:"CC",rows:35},{id:"m35",n:"Métadonnées / catalogues (standards)",p:"CC",rows:25},{id:"m36",n:"APIs de livraison datasets",p:"CC",rows:20},{id:"m37",n:"Tokenisation données (blockchain)",p:"CC",rows:30},{id:"m38",n:"Pricing dynamique (mécanismes)",p:"CC",rows:15},{id:"m39",n:"Matching offre/demande datasets",p:"CC",rows:20},{id:"m40",n:"Data lineage / provenance",p:"CC",rows:25}]},
    {cat:"V · MARCHÉ & SIZING",layers:[{id:"m41",n:"TAM data economy globale",p:"PP",rows:40},{id:"m42",n:"TAM data santé par pays",p:"PP",rows:60},{id:"m43",n:"TAM data mobilité corridor",p:"PP",rows:30},{id:"m44",n:"TAM alternative data (finance)",p:"PP",rows:25},{id:"m45",n:"TAM data agriculture Afrique",p:"PP",rows:20},{id:"m46",n:"Concurrents data marketplace",p:"PP",rows:80},{id:"m47",n:"Exits / acquisitions data companies",p:"PP",rows:60},{id:"m48",n:"Marché data anonymisée santé",p:"PP",rows:35},{id:"m49",n:"Marché synthetic data",p:"PP",rows:40},{id:"m50",n:"Projections data economy 2030",p:"PP",rows:20}]},
    {cat:"VI · INVESTISSEURS",layers:[{id:"m51",n:"VC data infrastructure",p:"PP",rows:150},{id:"m52",n:"Grants EU data spaces",p:"PP",rows:40},{id:"m53",n:"DFI data Africa",p:"PP",rows:30},{id:"m54",n:"Angels data economy",p:"PP",rows:60},{id:"m55",n:"Comparables valorisation",p:"PP",rows:35},{id:"m56",n:"CVC telco/pharma (data buyers)",p:"PP",rows:50},{id:"m57",n:"Impact investors data sovereignty",p:"PP",rows:40},{id:"m58",n:"Sovereign wealth funds (data)",p:"PP",rows:25},{id:"m59",n:"Subventions BPI / Horizon data",p:"PP",rows:30},{id:"m60",n:"Family offices tech souveraine",p:"PP",rows:35}]},
    {cat:"VII · RÉSEAU",layers:[{id:"m61",n:"KOLs data economy",p:"PP",rows:150},{id:"m62",n:"Conférences data (calendrier)",p:"PP",rows:80},{id:"m63",n:"Académiques data governance",p:"PP",rows:200},{id:"m64",n:"Data spaces EU (participants)",p:"PP",rows:100},{id:"m65",n:"Organisations standardisation data",p:"PP",rows:30},{id:"m66",n:"Communautés open data Africa",p:"PP",rows:40},{id:"m67",n:"Parlementaires numériques EU",p:"PP",rows:50},{id:"m68",n:"Média tech/data (journalistes)",p:"PP",rows:80},{id:"m69",n:"Lobbying data (organisations)",p:"PP",rows:30},{id:"m70",n:"Think tanks numériques Africa",p:"PP",rows:25}]},
    {cat:"VIII · PRODUCTEURS DONNÉES",layers:[{id:"m71",n:"Hôpitaux (producteurs data santé)",p:"CC",rows:8000},{id:"m72",n:"Universités (producteurs data recherche)",p:"CC",rows:3000},{id:"m73",n:"Opérateurs télécom (producteurs mobilité)",p:"PP",rows:60},{id:"m74",n:"Coopératives agricoles (producteurs terrain)",p:"PP",rows:500},{id:"m75",n:"Banques (producteurs data financière)",p:"PP",rows:200},{id:"m76",n:"Assureurs (producteurs data sinistres)",p:"PP",rows:100},{id:"m77",n:"Collectivités (producteurs data publique)",p:"CC",rows:2000},{id:"m78",n:"Stations météo (producteurs environnemental)",p:"CC",rows:1500},{id:"m79",n:"IoT industriel (producteurs capteurs)",p:"PP",rows:300},{id:"m80",n:"Individus (producteurs intentionnels)",p:"CW",rows:50}]},
    {cat:"IX · GÉOPOLITIQUE DATA",layers:[{id:"m81",n:"Souveraineté numérique par pays",p:"PP",rows:60},{id:"m82",n:"Data localization requirements",p:"PP",rows:80},{id:"m83",n:"Flux données transfrontaliers",p:"PP",rows:40},{id:"m84",n:"GAIA-X / EU data spaces",p:"PP",rows:30},{id:"m85",n:"Smart Africa Data Alliance",p:"PP",rows:20},{id:"m86",n:"Digital silk road (Chine-Afrique)",p:"PP",rows:25},{id:"m87",n:"Accords numériques bilatéraux",p:"PP",rows:40},{id:"m88",n:"Câbles sous-marins (cartographie)",p:"CC",rows:150},{id:"m89",n:"Data centers souverains Afrique",p:"PP",rows:60},{id:"m90",n:"Cloud souverain options corridor",p:"PP",rows:30}]},
    {cat:"X · OPÉRATIONNEL",layers:[{id:"m91",n:"APIs publiques disponibles par pays",p:"CC",rows:500},{id:"m92",n:"Open data portals (catalogue)",p:"CC",rows:300},{id:"m93",n:"Standards interopérabilité data",p:"CW",rows:25},{id:"m94",n:"Coûts stockage / compute par région",p:"PP",rows:40},{id:"m95",n:"Latence réseau corridor",p:"CC",rows:65},{id:"m96",n:"Métriques MYNε (KPI marketplace)",p:"CW",rows:20},{id:"m97",n:"Pricing grids (par dataset type)",p:"CW",rows:30},{id:"m98",n:"Onboarding producteurs (workflow)",p:"CW",rows:15},{id:"m99",n:"Qualité données scoring model",p:"CC",rows:20},{id:"m100",n:"Calendrier data regulations 2026-2030",p:"CW",rows:35}]},
  ],
  burhan:[
    {cat:"I · BLOCKCHAIN & RÉGLEMENTATION",layers:[{id:"b01",n:"MiCA — articles applicables",p:"CW",rows:40},{id:"b02",n:"Lois blockchain par pays",p:"PP",rows:80},{id:"b03",n:"Smart contract enforceability",p:"PP",rows:40},{id:"b04",n:"Régulateurs crypto par pays",p:"PP",rows:60},{id:"b05",n:"Jurisprudence smart contracts",p:"PP",rows:90},{id:"b06",n:"Tokenisation assets (cadres)",p:"CW",rows:30},{id:"b07",n:"VASP licensing requirements",p:"PP",rows:50},{id:"b08",n:"Travel Rule compliance",p:"PP",rows:25},{id:"b09",n:"NFT réglementation par juridiction",p:"PP",rows:45},{id:"b10",n:"DeFi regulatory landscape",p:"PP",rows:35}]},
    {cat:"II · AUDIT & COMPLIANCE",layers:[{id:"b11",n:"Cabinets audit blockchain",p:"PP",rows:80},{id:"b12",n:"Standards audit trail (ISAE 3402)",p:"CW",rows:20},{id:"b13",n:"Certifications audit (Big 4 crypto)",p:"PP",rows:40},{id:"b14",n:"Anti-fraud blockchain analytics",p:"PP",rows:50},{id:"b15",n:"KYC/AML blockchain solutions",p:"PP",rows:60},{id:"b16",n:"Transaction monitoring tools",p:"PP",rows:45},{id:"b17",n:"Forensics blockchain (Chainalysis etc.)",p:"PP",rows:30},{id:"b18",n:"Governance on-chain models",p:"CC",rows:25},{id:"b19",n:"DAO legal frameworks",p:"PP",rows:30},{id:"b20",n:"Reporting réglementaire blockchain",p:"CW",rows:20}]},
    {cat:"III · TECHNIQUE",layers:[{id:"b21",n:"Protocoles L1/L2 (comparatif)",p:"CC",rows:50},{id:"b22",n:"Gas costs par chaîne",p:"CC",rows:30},{id:"b23",n:"Polygon zkEVM — specs",p:"CC",rows:15},{id:"b24",n:"Zero-Knowledge circuits (benchmarks)",p:"CC",rows:25},{id:"b25",n:"Merkle tree optimisations",p:"CC",rows:15},{id:"b26",n:"IPFS / Arweave storage",p:"CC",rows:20},{id:"b27",n:"Smart contract security (vulns)",p:"CC",rows:200},{id:"b28",n:"Transaction types 501-506 spec",p:"CC",rows:10},{id:"b29",n:"Cross-chain bridges",p:"CC",rows:30},{id:"b30",n:"SDK blockchain (frameworks)",p:"CC",rows:40}]},
    {cat:"IV · MARCHÉ",layers:[{id:"b31",n:"TAM blockchain enterprise",p:"PP",rows:30},{id:"b32",n:"TAM traçabilité supply chain",p:"PP",rows:25},{id:"b33",n:"TAM audit blockchain",p:"PP",rows:20},{id:"b34",n:"Concurrents traçabilité",p:"PP",rows:60},{id:"b35",n:"Concurrents audit blockchain",p:"PP",rows:40},{id:"b36",n:"Pricing blockchain-as-a-service",p:"PP",rows:30},{id:"b37",n:"Adoption enterprise blockchain",p:"PP",rows:50},{id:"b38",n:"Use cases par industrie",p:"PP",rows:80},{id:"b39",n:"ROI blockchain (études)",p:"PP",rows:25},{id:"b40",n:"Projections marché 2030",p:"PP",rows:15}]},
    {cat:"V · VERTICALES",layers:[{id:"b41",n:"Traçabilité pharma (sérialisation)",p:"PP",rows:60},{id:"b42",n:"Traçabilité alimentaire",p:"PP",rows:80},{id:"b43",n:"Traçabilité art (provenance)",p:"PP",rows:40},{id:"b44",n:"Traçabilité carbone (crédits)",p:"PP",rows:50},{id:"b45",n:"Certification diplômes blockchain",p:"PP",rows:30},{id:"b46",n:"Land registry blockchain Afrique",p:"PP",rows:25},{id:"b47",n:"Health records blockchain",p:"PP",rows:35},{id:"b48",n:"Insurance blockchain (parametric)",p:"PP",rows:30},{id:"b49",n:"Trade finance blockchain",p:"PP",rows:40},{id:"b50",n:"Voting blockchain pilots",p:"PP",rows:20}]},
    {cat:"VI · INVESTISSEURS",layers:[{id:"b51",n:"VC crypto/blockchain",p:"PP",rows:200},{id:"b52",n:"Grants Ethereum Foundation",p:"PP",rows:40},{id:"b53",n:"Grants Polygon",p:"PP",rows:30},{id:"b54",n:"DFI blockchain Afrique",p:"PP",rows:25},{id:"b55",n:"Comparables valorisation",p:"PP",rows:40},{id:"b56",n:"CVC supply chain (data)",p:"PP",rows:30},{id:"b57",n:"Token economics models",p:"CC",rows:20},{id:"b58",n:"Treasury management crypto",p:"CC",rows:15},{id:"b59",n:"Regulatory sandbox blockchain",p:"PP",rows:20},{id:"b60",n:"Incubateurs blockchain Afrique",p:"PP",rows:25}]},
    {cat:"VII · RÉSEAU",layers:[{id:"b61",n:"KOLs blockchain enterprise",p:"PP",rows:150},{id:"b62",n:"Conférences blockchain (calendrier)",p:"PP",rows:100},{id:"b63",n:"Développeurs Solidity (communauté)",p:"CC",rows:500},{id:"b64",n:"Auditors smart contract (annuaire)",p:"PP",rows:80},{id:"b65",n:"Foundations blockchain (contacts)",p:"PP",rows:30},{id:"b66",n:"Consortiums enterprise blockchain",p:"PP",rows:25},{id:"b67",n:"Régulateurs crypto (contacts clés)",p:"PP",rows:40},{id:"b68",n:"Média crypto/blockchain",p:"PP",rows:60},{id:"b69",n:"Hackathons blockchain (calendrier)",p:"PP",rows:80},{id:"b70",n:"Academic blockchain research",p:"PP",rows:200}]},
    {cat:"VIII · INFRASTRUCTURE",layers:[{id:"b71",n:"Nodes RPC providers",p:"CC",rows:30},{id:"b72",n:"Indexeurs (TheGraph, etc.)",p:"CC",rows:20},{id:"b73",n:"Oracles (Chainlink, etc.)",p:"CC",rows:15},{id:"b74",n:"Data availability layers",p:"CC",rows:15},{id:"b75",n:"Wallets enterprise (comparatif)",p:"CC",rows:40},{id:"b76",n:"Multi-sig solutions",p:"CC",rows:20},{id:"b77",n:"Gas optimization techniques",p:"CC",rows:25},{id:"b78",n:"Testnet configurations",p:"CC",rows:15},{id:"b79",n:"Monitoring on-chain (Tenderly etc.)",p:"CC",rows:20},{id:"b80",n:"DevOps blockchain (CI/CD)",p:"CC",rows:15}]},
    {cat:"IX · GÉOPOLITIQUE",layers:[{id:"b81",n:"CBDC par pays (statut)",p:"PP",rows:130},{id:"b82",n:"Crypto bans par pays",p:"PP",rows:60},{id:"b83",n:"Mining regulations",p:"PP",rows:40},{id:"b84",n:"Stablecoin regulations",p:"PP",rows:35},{id:"b85",n:"Cross-border payments blockchain",p:"PP",rows:30},{id:"b86",n:"Sanctions screening crypto",p:"PP",rows:25},{id:"b87",n:"Interoperability standards (ISO)",p:"CW",rows:15},{id:"b88",n:"G20 crypto framework",p:"PP",rows:10},{id:"b89",n:"African crypto adoption",p:"PP",rows:40},{id:"b90",n:"BRICS digital currency",p:"PP",rows:15}]},
    {cat:"X · OPÉRATIONNEL",layers:[{id:"b91",n:"Gas cost monitoring dashboard",p:"CC",rows:20},{id:"b92",n:"Transaction latency benchmarks",p:"CC",rows:25},{id:"b93",n:"Storage costs (on-chain vs off)",p:"CC",rows:15},{id:"b94",n:"Security incident database",p:"CC",rows:500},{id:"b95",n:"Bug bounty programs (répertoire)",p:"PP",rows:80},{id:"b96",n:"Formal verification tools",p:"CC",rows:15},{id:"b97",n:"Métriques BURHAN (KPI audit)",p:"CW",rows:20},{id:"b98",n:"Calendrier MiCA deadlines",p:"CW",rows:25},{id:"b99",n:"Interop testing corridor",p:"CC",rows:10},{id:"b100",n:"Documentation SDK BURHAN",p:"CC",rows:15}]},
  ],
  yrknown:[
    {cat:"I · EXPERTS & SAVOIR TACITE",layers:[{id:"y01",n:"Experts sectoriels identifiés",p:"PP",rows:5000},{id:"y02",n:"Retraités / seniors expertise",p:"PP",rows:2000},{id:"y03",n:"Artisans / métiers rares",p:"PP",rows:3000},{id:"y04",n:"Médecins spécialistes (savoir clinique)",p:"PP",rows:8000},{id:"y05",n:"Ingénieurs expérimentés (>20 ans)",p:"PP",rows:4000},{id:"y06",n:"Agriculteurs savoirs traditionnels",p:"PP",rows:1500},{id:"y07",n:"Juristes spécialisés (niche)",p:"PP",rows:2000},{id:"y08",n:"Enseignants / pédagogues",p:"PP",rows:6000},{id:"y09",n:"Chefs cuisiniers (patrimoine culinaire)",p:"PP",rows:1000},{id:"y10",n:"Maîtres artisans (UNESCO list)",p:"PP",rows:500}]},
    {cat:"II · KNOWLEDGE MANAGEMENT",layers:[{id:"y11",n:"Plateformes KM existantes",p:"PP",rows:80},{id:"y12",n:"Outils capture savoir tacite",p:"PP",rows:50},{id:"y13",n:"LoRA fine-tuning frameworks",p:"CC",rows:30},{id:"y14",n:"RAG architectures (comparatif)",p:"CC",rows:25},{id:"y15",n:"Voice-to-knowledge pipelines",p:"CC",rows:20},{id:"y16",n:"Whisper transcription benchmarks",p:"CC",rows:15},{id:"y17",n:"Embedding models (comparatif)",p:"CC",rows:30},{id:"y18",n:"Vector databases (benchmarks)",p:"CC",rows:20},{id:"y19",n:"Knowledge graph tools",p:"CC",rows:25},{id:"y20",n:"Ontology editors / standards",p:"CC",rows:15}]},
    {cat:"III · PATRIMOINE IMMATÉRIEL",layers:[{id:"y21",n:"UNESCO patrimoine immatériel (liste)",p:"CC",rows:700},{id:"y22",n:"Savoirs traditionnels menacés",p:"PP",rows:300},{id:"y23",n:"Langues en danger (Ethnologue)",p:"CC",rows:3000},{id:"y24",n:"Pharmacopée traditionnelle africaine",p:"PP",rows:500},{id:"y25",n:"Techniques artisanales (catalogue)",p:"PP",rows:400},{id:"y26",n:"Tradition orale (archives)",p:"PP",rows:200},{id:"y27",n:"Musique traditionnelle (archives)",p:"PP",rows:300},{id:"y28",n:"Architecture vernaculaire",p:"PP",rows:150},{id:"y29",n:"Savoirs agricoles traditionnels",p:"PP",rows:250},{id:"y30",n:"Médecine traditionnelle (OMS TRM)",p:"PP",rows:180}]},
    {cat:"IV · MARCHÉ",layers:[{id:"y31",n:"TAM knowledge management",p:"PP",rows:30},{id:"y32",n:"TAM corporate training",p:"PP",rows:25},{id:"y33",n:"TAM expert networks",p:"PP",rows:20},{id:"y34",n:"Concurrents KM (Notion, Guru, etc.)",p:"PP",rows:60},{id:"y35",n:"Concurrents expert networks (GLG, etc.)",p:"PP",rows:30},{id:"y36",n:"Pricing expert consultation",p:"PP",rows:40},{id:"y37",n:"Marché eLearning corporate",p:"PP",rows:35},{id:"y38",n:"Knowledge-as-a-Service models",p:"PP",rows:20},{id:"y39",n:"Succession planning market",p:"PP",rows:15},{id:"y40",n:"Intergenerational transfer consulting",p:"PP",rows:25}]},
    {cat:"V · UNIVERSITÉS & RECHERCHE",layers:[{id:"y41",n:"Universités partenaires (corridor+EU)",p:"PP",rows:200},{id:"y42",n:"Laboratoires IA/NLP (cartographie)",p:"PP",rows:150},{id:"y43",n:"Programmes PhD pertinents",p:"PP",rows:100},{id:"y44",n:"Chaires knowledge management",p:"PP",rows:40},{id:"y45",n:"Centres recherche patrimoine",p:"PP",rows:60},{id:"y46",n:"Bourses recherche disponibles",p:"PP",rows:80},{id:"y47",n:"Publications knowledge capture (corpus)",p:"CC",rows:5000},{id:"y48",n:"Datasets NLP multilingue Afrique",p:"CC",rows:40},{id:"y49",n:"Modèles LLM multilingues (benchmarks)",p:"CC",rows:30},{id:"y50",n:"ASR (speech recognition) langues africaines",p:"CC",rows:25}]},
    {cat:"VI · INVESTISSEURS",layers:[{id:"y51",n:"VC edtech / knowledge",p:"PP",rows:100},{id:"y52",n:"Grants UNESCO / culture",p:"PP",rows:50},{id:"y53",n:"DFI patrimoine Afrique",p:"PP",rows:25},{id:"y54",n:"Fondations patrimoine immatériel",p:"PP",rows:40},{id:"y55",n:"Mécénat culturel (entreprises)",p:"PP",rows:60},{id:"y56",n:"Comparables valorisation",p:"PP",rows:20},{id:"y57",n:"Corporate buyers (training budgets)",p:"PP",rows:80},{id:"y58",n:"Budgets formation par pays",p:"PP",rows:30},{id:"y59",n:"Subventions numérisation patrimoine",p:"PP",rows:35},{id:"y60",n:"Impact investors culture/éducation",p:"PP",rows:30}]},
    {cat:"VII · RÉSEAU",layers:[{id:"y61",n:"KOLs knowledge management",p:"PP",rows:100},{id:"y62",n:"Conférences KM/patrimoine (calendrier)",p:"PP",rows:60},{id:"y63",n:"UNESCO contacts programme ICH",p:"PP",rows:30},{id:"y64",n:"Anthropologues / ethnologues (réseau)",p:"PP",rows:200},{id:"y65",n:"Linguistes langues africaines",p:"PP",rows:100},{id:"y66",n:"Griots / dépositaires tradition orale",p:"CW",rows:50},{id:"y67",n:"Artisans maîtres (par métier/pays)",p:"PP",rows:300},{id:"y68",n:"Média patrimoine/culture",p:"PP",rows:60},{id:"y69",n:"Institutions mémoire (archives nationales)",p:"PP",rows:80},{id:"y70",n:"Associations patrimoine par pays",p:"PP",rows:100}]},
    {cat:"VIII · TECHNIQUE",layers:[{id:"y71",n:"MLX models (Mac Mini M4)",p:"CC",rows:20},{id:"y72",n:"LoRA adapters trained (catalogue)",p:"CC",rows:15},{id:"y73",n:"Whisper fine-tuning darija/wolof",p:"CC",rows:10},{id:"y74",n:"RAG pipeline configs",p:"CC",rows:15},{id:"y75",n:"Vector DB benchmarks (Qdrant etc.)",p:"CC",rows:20},{id:"y76",n:"Knowledge graph schemas",p:"CC",rows:15},{id:"y77",n:"API interview capture",p:"CC",rows:10},{id:"y78",n:"Data annotation tools",p:"CC",rows:25},{id:"y79",n:"Quality scoring model",p:"CC",rows:10},{id:"y80",n:"Evaluation metrics (BLEU, ROUGE etc.)",p:"CC",rows:15}]},
    {cat:"IX · GÉOPOLITIQUE",layers:[{id:"y81",n:"Politiques patrimoine par pays",p:"PP",rows:50},{id:"y82",n:"Brain drain par pays (flux experts)",p:"PP",rows:60},{id:"y83",n:"Retraite massive (données démographiques)",p:"CC",rows:200},{id:"y84",n:"Perte savoirs traditionnels (indices)",p:"PP",rows:40},{id:"y85",n:"Digitalisation patrimoine (programmes gouv.)",p:"PP",rows:30},{id:"y86",n:"Droits propriété intellectuelle traditionnelle",p:"CW",rows:20},{id:"y87",n:"Convention Nagoya (accès savoirs trad.)",p:"CW",rows:15},{id:"y88",n:"Politiques linguistiques (multilingue)",p:"PP",rows:40},{id:"y89",n:"Diaspora expertise (mapping)",p:"PP",rows:80},{id:"y90",n:"Coopération Sud-Sud savoir",p:"PP",rows:25}]},
    {cat:"X · OPÉRATIONNEL",layers:[{id:"y91",n:"Protocole Knowledge Interview",p:"CW",rows:15},{id:"y92",n:"Templates capture savoir",p:"CW",rows:20},{id:"y93",n:"Métriques YrKnown (KPI)",p:"CW",rows:15},{id:"y94",n:"Coûts transcription/annotation",p:"PP",rows:20},{id:"y95",n:"Calendrier interviews (Pr. Bayle etc.)",p:"CW",rows:30},{id:"y96",n:"Infrastructure GPU/MLX costs",p:"CC",rows:15},{id:"y97",n:"Benchmark modèles par langue",p:"CC",rows:25},{id:"y98",n:"Formation contributeurs (modules)",p:"CW",rows:10},{id:"y99",n:"Qualité LoRA scoring",p:"CC",rows:15},{id:"y100",n:"Roadmap technique 2026-2030",p:"CW",rows:10}]},
  ],
  diwane:[
    {cat:"I · ARTISTES & CATALOGUE",layers:[{id:"d01",n:"Artistes marocains modernes (catalogue)",p:"PP",rows:500},{id:"d02",n:"Artistes marocains contemporains",p:"PP",rows:800},{id:"d03",n:"Artistes africains cotés (continent)",p:"PP",rows:3000},{id:"d04",n:"Héritiers / fondations d'artistes",p:"CW",rows:200},{id:"d05",n:"Catalogues raisonnés existants",p:"PP",rows:120},{id:"d06",n:"Œuvres volées / perdues (INTERPOL)",p:"CC",rows:50000},{id:"d07",n:"Faux identifiés (base de données)",p:"CW",rows:500},{id:"d08",n:"Cotes aux enchères (historique 20 ans)",p:"CC",rows:100000},{id:"d09",n:"Collections privées identifiées",p:"CW",rows:300},{id:"d10",n:"Œuvres en circulation non documentées",p:"CW",rows:1000}]},
    {cat:"II · GALERIES & MUSÉES",layers:[{id:"d11",n:"Galeries art contemporain Afrique",p:"PP",rows:400},{id:"d12",n:"Musées art africain (monde)",p:"PP",rows:250},{id:"d13",n:"Foires art (calendrier mondial)",p:"PP",rows:150},{id:"d14",n:"Biennales / triennales Afrique",p:"PP",rows:60},{id:"d15",n:"Maisons de vente (Sotheby's etc.)",p:"PP",rows:40},{id:"d16",n:"Résidences d'artistes Afrique",p:"PP",rows:100},{id:"d17",n:"Centres d'art / Kunsthalle",p:"PP",rows:80},{id:"d18",n:"Collections corporate",p:"PP",rows:60},{id:"d19",n:"Art advisors internationaux",p:"PP",rows:120},{id:"d20",n:"Online galleries / plateformes",p:"PP",rows:80}]},
    {cat:"III · EXPERTISE & AUTHENTIFICATION",layers:[{id:"d21",n:"Experts agréés par pays",p:"PP",rows:300},{id:"d22",n:"Laboratoires analyse (pigments etc.)",p:"PP",rows:80},{id:"d23",n:"Technologies authentification art",p:"PP",rows:40},{id:"d24",n:"Datasets images haute résolution",p:"CC",rows:20000},{id:"d25",n:"Modèles CNN/ViT entraînés par artiste",p:"CC",rows:30},{id:"d26",n:"LoRA adapters art (catalogue)",p:"CC",rows:25},{id:"d27",n:"Spectroscopie / datation (techniques)",p:"PP",rows:20},{id:"d28",n:"Provenance research méthodologies",p:"CW",rows:15},{id:"d29",n:"Blockchain art provenance (projets)",p:"PP",rows:30},{id:"d30",n:"NFT art africain (marché)",p:"PP",rows:50}]},
    {cat:"IV · CRÉDIT LOMBARD ART",layers:[{id:"d31",n:"Banques offrant Crédit Lombard art",p:"PP",rows:60},{id:"d32",n:"LTV ratios par type d'œuvre",p:"PP",rows:30},{id:"d33",n:"Procédures évaluation bancaire art",p:"CW",rows:20},{id:"d34",n:"Assurance œuvres d'art (marché)",p:"PP",rows:40},{id:"d35",n:"Art-backed lending (cas d'étude)",p:"PP",rows:25},{id:"d36",n:"Stockage sécurisé / freeports",p:"PP",rows:50},{id:"d37",n:"Fiscalité art par pays",p:"PP",rows:45},{id:"d38",n:"Droit de suite par juridiction",p:"PP",rows:40},{id:"d39",n:"TVA art par pays",p:"PP",rows:40},{id:"d40",n:"Succession / donation art (régimes)",p:"PP",rows:30}]},
    {cat:"V · MARCHÉ ART AFRICAIN",layers:[{id:"d41",n:"TAM art africain par segment",p:"PP",rows:30},{id:"d42",n:"Volumes enchères art africain",p:"CC",rows:5000},{id:"d43",n:"Records d'enchères art africain",p:"CC",rows:500},{id:"d44",n:"Indices prix art africain (Artnet)",p:"CC",rows:2000},{id:"d45",n:"Collectionneurs Gulf (profils)",p:"PP",rows:100},{id:"d46",n:"Fonds souverains art (investments)",p:"PP",rows:25},{id:"d47",n:"Art tokenisation (projets existants)",p:"PP",rows:30},{id:"d48",n:"Marché art en ligne (projections)",p:"PP",rows:20},{id:"d49",n:"Fractional art ownership (plateformes)",p:"PP",rows:25},{id:"d50",n:"Art comme asset class (études)",p:"PP",rows:30}]},
    {cat:"VI · FINANCEMENT",layers:[{id:"d51",n:"Fonds mécénat culture Afrique",p:"PP",rows:60},{id:"d52",n:"Fondations art (monde)",p:"PP",rows:100},{id:"d53",n:"Subventions culture par pays",p:"PP",rows:80},{id:"d54",n:"Corporate sponsoring art",p:"PP",rows:50},{id:"d55",n:"Banques pilot Crédit Lombard",p:"CW",rows:10},{id:"d56",n:"Comparables art-tech startups",p:"PP",rows:25},{id:"d57",n:"Revenue model DIWANE",p:"CW",rows:10},{id:"d58",n:"Auction house partnerships",p:"PP",rows:20},{id:"d59",n:"Insurance partnerships art",p:"PP",rows:15},{id:"d60",n:"Forum Dakhla revenue art",p:"CW",rows:10}]},
    {cat:"VII · RÉSEAU",layers:[{id:"d61",n:"KOLs art africain (scoring)",p:"PP",rows:200},{id:"d62",n:"Commissaires d'exposition (annuaire)",p:"PP",rows:300},{id:"d63",n:"Critiques d'art (presse)",p:"PP",rows:150},{id:"d64",n:"Collectionneurs majeurs (profils)",p:"PP",rows:200},{id:"d65",n:"Chaînes d'intro — Atelier 21 réseau",p:"CW",rows:40},{id:"d66",n:"Chaînes d'intro — Monjou Stanford",p:"CW",rows:30},{id:"d67",n:"Alumni écoles d'art (contacts)",p:"PP",rows:500},{id:"d68",n:"Média art contemporain",p:"PP",rows:100},{id:"d69",n:"Associations artistes par pays",p:"PP",rows:80},{id:"d70",n:"Diplomatiques culturels (ambassades)",p:"PP",rows:60}]},
    {cat:"VIII · PATRIMOINE CULTUREL",layers:[{id:"d71",n:"Lois patrimoine culturel par pays",p:"PP",rows:60},{id:"d72",n:"Export art restrictions par pays",p:"PP",rows:50},{id:"d73",n:"Douanes art (procédures)",p:"PP",rows:40},{id:"d74",n:"Restitution art colonial (dossiers)",p:"PP",rows:80},{id:"d75",n:"Musées nationaux (collections inventoriées)",p:"PP",rows:100},{id:"d76",n:"Sites patrimoine UNESCO (liste)",p:"CC",rows:1200},{id:"d77",n:"Archives photographiques art",p:"CC",rows:5000},{id:"d78",n:"Restauration art (ateliers)",p:"PP",rows:60},{id:"d79",n:"Conservation préventive (normes)",p:"CW",rows:20},{id:"d80",n:"Transport art (logisticiens)",p:"PP",rows:40}]},
    {cat:"IX · GÉOPOLITIQUE ART",layers:[{id:"d81",n:"Soft power culturel par pays",p:"PP",rows:40},{id:"d82",n:"Diplomatie culturelle (programmes)",p:"PP",rows:50},{id:"d83",n:"Art washing (risques réputationnels)",p:"PP",rows:25},{id:"d84",n:"Sanctions art (OFAC etc.)",p:"PP",rows:20},{id:"d85",n:"Marché noir art Afrique (estimation)",p:"PP",rows:15},{id:"d86",n:"Flux art illicite (INTERPOL routes)",p:"PP",rows:30},{id:"d87",n:"Politiques culturelles nationales",p:"PP",rows:50},{id:"d88",n:"Budget culture / PIB par pays",p:"CC",rows:200},{id:"d89",n:"Festivals culturels corridor (calendrier)",p:"PP",rows:100},{id:"d90",n:"Coopération culturelle Sud-Sud",p:"PP",rows:30}]},
    {cat:"X · OPÉRATIONNEL",layers:[{id:"d91",n:"Pipeline expertise IA (workflow)",p:"CC",rows:15},{id:"d92",n:"Coûts LoRA par artiste",p:"CC",rows:25},{id:"d93",n:"Métriques DIWANE (KPI)",p:"CW",rows:15},{id:"d94",n:"Calendrier foires / enchères",p:"PP",rows:80},{id:"d95",n:"Protocole Crédit Lombard (workflow)",p:"CW",rows:10},{id:"d96",n:"Assurance transport art (tarifs)",p:"PP",rows:30},{id:"d97",n:"Photographie HQ (protocole studio)",p:"CW",rows:10},{id:"d98",n:"Base pigments / matériaux référence",p:"CC",rows:200},{id:"d99",n:"Formation experts IA (modules)",p:"CW",rows:10},{id:"d100",n:"Documentation DIWANE SDK",p:"CC",rows:15}]},
  ],
  alguesov:[
    {cat:"I · HALIEUTIQUE & ALGUES",layers:[{id:"s01",n:"Espèces algues exploitées (monde)",p:"CC",rows:800},{id:"s02",n:"Zones de récolte Maroc (cartographie)",p:"CC",rows:150},{id:"s03",n:"Coopératives pêcheurs (annuaire)",p:"PP",rows:500},{id:"s04",n:"Production algues par pays",p:"CC",rows:200},{id:"s05",n:"Cours matières premières algues",p:"CC",rows:300},{id:"s06",n:"Saisonnalité récolte par zone",p:"CC",rows:60},{id:"s07",n:"Qualité eau / pollution (données)",p:"CC",rows:2000},{id:"s08",n:"Météo maritime Dakhla/Laâyoune",p:"CC",rows:5000},{id:"s09",n:"Réglementation pêche par pays",p:"PP",rows:50},{id:"s10",n:"Licences exploitation (catalogue)",p:"PP",rows:80}]},
    {cat:"II · TRAÇABILITÉ",layers:[{id:"s11",n:"Standards traçabilité alimentaire",p:"PP",rows:40},{id:"s12",n:"Certifications bio/durable (liste)",p:"PP",rows:60},{id:"s13",n:"Codex Alimentarius (chapitres algues)",p:"CW",rows:20},{id:"s14",n:"EU Novel Food Regulation",p:"PP",rows:25},{id:"s15",n:"HACCP / ISO 22000 (exigences)",p:"CW",rows:15},{id:"s16",n:"Blockchain traçabilité alimentaire",p:"PP",rows:30},{id:"s17",n:"QR code / NFC tagging (solutions)",p:"PP",rows:25},{id:"s18",n:"IoT capteurs maritimes",p:"CC",rows:50},{id:"s19",n:"GS1 standards (GTIN, GLN)",p:"CW",rows:15},{id:"s20",n:"Laboratoires analyse alimentaire (annuaire)",p:"PP",rows:200}]},
    {cat:"III · MARCHÉ ALGUES",layers:[{id:"s21",n:"TAM algues alimentaires mondial",p:"PP",rows:20},{id:"s22",n:"TAM algues cosmétiques",p:"PP",rows:15},{id:"s23",n:"TAM algues pharma/nutraceutique",p:"PP",rows:15},{id:"s24",n:"TAM carraghénane / agar",p:"PP",rows:10},{id:"s25",n:"Acheteurs industriels (annuaire)",p:"PP",rows:300},{id:"s26",n:"Importateurs EU (annuaire)",p:"PP",rows:200},{id:"s27",n:"Distributeurs B2B alimentaire",p:"PP",rows:150},{id:"s28",n:"Concurrents traçabilité aqua",p:"PP",rows:30},{id:"s29",n:"Pricing algues par espèce/qualité",p:"CC",rows:100},{id:"s30",n:"Tendances superfood / algues",p:"PP",rows:25}]},
    {cat:"IV · RÉGLEMENTAIRE",layers:[{id:"s31",n:"Réglementation export alimentaire MA→EU",p:"PP",rows:30},{id:"s32",n:"Accords pêche MA-EU",p:"PP",rows:15},{id:"s33",n:"ONSSA (Maroc) — réglementation",p:"CW",rows:20},{id:"s34",n:"FDA import requirements (USA)",p:"PP",rows:15},{id:"s35",n:"Normes sanitaires par pays importateur",p:"PP",rows:40},{id:"s36",n:"Certificats phytosanitaires (procédures)",p:"CW",rows:20},{id:"s37",n:"Droits de douane algues par pays",p:"CC",rows:80},{id:"s38",n:"Quotas pêche (réglementations)",p:"PP",rows:30},{id:"s39",n:"Propriété intellectuelle (variétés)",p:"CW",rows:10},{id:"s40",n:"Zonage maritime (cartes)",p:"CC",rows:50}]},
    {cat:"V · WEB 4.0 INTEGRATION",layers:[{id:"s41",n:"ÆLYA consent pêcheurs (protocole)",p:"CW",rows:10},{id:"s42",n:"MYNε données halieutiques (marché)",p:"CW",rows:15},{id:"s43",n:"BURHAN types 501-506 (algues)",p:"CC",rows:10},{id:"s44",n:"NOOS scoring qualité (ML)",p:"CC",rows:15},{id:"s45",n:"A2A data exchange (pêcheurs→acheteurs)",p:"CC",rows:10},{id:"s46",n:"Data Wallet pêcheur (specs)",p:"CC",rows:10},{id:"s47",n:"Smart contract achat-vente algues",p:"CC",rows:10},{id:"s48",n:"Rémunération données pêcheurs (modèle)",p:"CW",rows:10},{id:"s49",n:"Dashboard acheteur (specs)",p:"AG",rows:10},{id:"s50",n:"Mobile app pêcheur (specs)",p:"AG",rows:10}]},
    {cat:"VI · FINANCEMENT",layers:[{id:"s51",n:"Fonds blue economy",p:"PP",rows:40},{id:"s52",n:"DFI pêche/aquaculture Afrique",p:"PP",rows:25},{id:"s53",n:"Grants FAO / IFAD",p:"PP",rows:30},{id:"s54",n:"Subventions ANDA Maroc",p:"PP",rows:15},{id:"s55",n:"Impact investors ocean/marine",p:"PP",rows:30},{id:"s56",n:"Holmarcom agri-food (prospect)",p:"CW",rows:10},{id:"s57",n:"Comparables agri-traçabilité",p:"PP",rows:20},{id:"s58",n:"Budget lancement AlgueSov V2",p:"CW",rows:10},{id:"s59",n:"Revenue projections",p:"CW",rows:10},{id:"s60",n:"Break-even analysis",p:"CW",rows:10}]},
    {cat:"VII · RÉSEAU",layers:[{id:"s61",n:"Chefs d'entreprise pêche MA",p:"PP",rows:100},{id:"s62",n:"ANDA contacts",p:"PP",rows:20},{id:"s63",n:"Min. Pêche maritime (organigramme)",p:"PP",rows:30},{id:"s64",n:"FAO bureau Rabat (contacts)",p:"PP",rows:15},{id:"s65",n:"Coopératives Dakhla/Laâyoune",p:"PP",rows:50},{id:"s66",n:"Importateurs EU (contacts clés)",p:"PP",rows:80},{id:"s67",n:"Holmarcom réseau (via Kenza)",p:"CW",rows:15},{id:"s68",n:"Salons seafood (calendrier)",p:"PP",rows:40},{id:"s69",n:"Chercheurs aquaculture MA",p:"PP",rows:60},{id:"s70",n:"INRH contacts (recherche halieutique)",p:"PP",rows:25}]},
    {cat:"VIII · DONNÉES TERRAIN",layers:[{id:"s71",n:"Températures eau par zone/mois",p:"CC",rows:5000},{id:"s72",n:"Salinité par zone",p:"CC",rows:2000},{id:"s73",n:"Courants maritimes (données)",p:"CC",rows:3000},{id:"s74",n:"Biodiversité marine par zone",p:"CC",rows:500},{id:"s75",n:"Pollution marine (indices)",p:"CC",rows:300},{id:"s76",n:"Satellite imagerie côtière",p:"CC",rows:1000},{id:"s77",n:"Marées / houle (données)",p:"CC",rows:4000},{id:"s78",n:"Upwelling zones (productivité)",p:"CC",rows:200},{id:"s79",n:"Changement climatique impact pêche",p:"PP",rows:50},{id:"s80",n:"Stock assessment par espèce",p:"PP",rows:100}]},
    {cat:"IX · LOGISTIQUE",layers:[{id:"s81",n:"Chaîne du froid (solutions)",p:"PP",rows:40},{id:"s82",n:"Transitaires export MA (annuaire)",p:"PP",rows:100},{id:"s83",n:"Ports Dakhla/Laâyoune (infra)",p:"PP",rows:10},{id:"s84",n:"Coûts transport maritime MA→EU",p:"PP",rows:30},{id:"s85",n:"Assurance cargo maritime",p:"PP",rows:20},{id:"s86",n:"Emballage alimentaire (solutions)",p:"PP",rows:30},{id:"s87",n:"Stockage frigorifique (capacités)",p:"PP",rows:25},{id:"s88",n:"Temps transit par route",p:"CC",rows:50},{id:"s89",n:"Documents export (checklist)",p:"CW",rows:15},{id:"s90",n:"Incoterms applicables",p:"CW",rows:10}]},
    {cat:"X · OPÉRATIONNEL",layers:[{id:"s91",n:"Dashboard AlgueSov V2 (specs)",p:"AG",rows:10},{id:"s92",n:"Onboarding pêcheur (workflow)",p:"CW",rows:10},{id:"s93",n:"Métriques AlgueSov (KPI)",p:"CW",rows:15},{id:"s94",n:"Coûts opérationnels mensuels",p:"CW",rows:10},{id:"s95",n:"Oncle CEO — reporting template",p:"CW",rows:10},{id:"s96",n:"Infrastructure tech costs",p:"CC",rows:15},{id:"s97",n:"Calendrier certification (deadlines)",p:"CW",rows:20},{id:"s98",n:"Qualité scoring algues (ML model)",p:"CC",rows:15},{id:"s99",n:"Formation coopératives (modules)",p:"CW",rows:10},{id:"s100",n:"Roadmap AlgueSov 2026-2028",p:"CW",rows:10}]},
  ],
  amana:[
    {cat:"I · CHARITABLE & HUMANITAIRE",layers:[{id:"am01",n:"ONG par pays corridor (annuaire)",p:"CC",rows:15000},{id:"am02",n:"Associations caritatives Maroc",p:"CC",rows:5000},{id:"am03",n:"Fondations philanthropiques (monde)",p:"PP",rows:2000},{id:"am04",n:"Crowdfunding platforms (comparatif)",p:"PP",rows:80},{id:"am05",n:"Zakat digital (plateformes)",p:"PP",rows:30},{id:"am06",n:"Waqf / habous (cadre juridique)",p:"CW",rows:25},{id:"am07",n:"Association Yza (données pilote)",p:"CW",rows:15},{id:"am08",n:"Besoins humanitaires par région",p:"CC",rows:3000},{id:"am09",n:"Bailleurs humanitaires (cartographie)",p:"PP",rows:200},{id:"am10",n:"Transparence don (indices par pays)",p:"PP",rows:50}]},
    {cat:"II · RÉGLEMENTAIRE CHARITÉ",layers:[{id:"am11",n:"Lois associations par pays",p:"PP",rows:60},{id:"am12",n:"Fiscalité don (déductions par pays)",p:"PP",rows:50},{id:"am13",n:"Réglementation crowdfunding (par pays)",p:"PP",rows:45},{id:"am14",n:"Anti-blanchiment charité (GAFI)",p:"PP",rows:20},{id:"am15",n:"Reporting obligations (par statut)",p:"CW",rows:25},{id:"am16",n:"Contrôle des flux (régulateurs)",p:"PP",rows:30},{id:"am17",n:"Statut OING (droit international)",p:"CW",rows:15},{id:"am18",n:"Convention de Genève (pertinent)",p:"CW",rows:10},{id:"am19",n:"Due diligence charitable",p:"CW",rows:15},{id:"am20",n:"Certification transparence (labels)",p:"PP",rows:30}]},
    {cat:"III · HOLMARCOM & ASSURANCE",layers:[{id:"am21",n:"Holmarcom Group (organigramme)",p:"PP",rows:30},{id:"am22",n:"Atlanta Assurances (produits)",p:"PP",rows:20},{id:"am23",n:"Holmarcom agri-food (filiales)",p:"PP",rows:25},{id:"am24",n:"Holmarcom real estate (portfolio)",p:"PP",rows:15},{id:"am25",n:"Kenza Bensallah (réseau Holmarcom)",p:"CW",rows:10},{id:"am26",n:"Assurance micro (Afrique — marché)",p:"PP",rows:40},{id:"am27",n:"Assurance paramétrique (innovations)",p:"PP",rows:25},{id:"am28",n:"Takaful (assurance islamique)",p:"PP",rows:30},{id:"am29",n:"ESG reporting assurance",p:"PP",rows:20},{id:"am30",n:"CSR budgets Holmarcom",p:"PP",rows:10}]},
    {cat:"IV · MARCHÉ PHILANTHROPIE",layers:[{id:"am31",n:"TAM philanthropie Afrique",p:"PP",rows:20},{id:"am32",n:"TAM crowdfunding global",p:"PP",rows:15},{id:"am33",n:"TAM zakat digital",p:"PP",rows:10},{id:"am34",n:"Flux philanthropiques Africa (données)",p:"CC",rows:1000},{id:"am35",n:"Giving trends (études)",p:"PP",rows:30},{id:"am36",n:"Impact investing Africa",p:"PP",rows:50},{id:"am37",n:"SDG financing gap",p:"PP",rows:15},{id:"am38",n:"Concurrents trust digital",p:"PP",rows:30},{id:"am39",n:"Blockchain charity (projets)",p:"PP",rows:25},{id:"am40",n:"Remittances Africa (données)",p:"CC",rows:500}]},
    {cat:"V · TERRAIN & IMPACT",layers:[{id:"am41",n:"Besoins Oriental (région Yza)",p:"CW",rows:20},{id:"am42",n:"Indicateurs pauvreté par région MA",p:"CC",rows:300},{id:"am43",n:"Indicateurs éducation par région",p:"CC",rows:400},{id:"am44",n:"Indicateurs santé par région",p:"CC",rows:400},{id:"am45",n:"Cartographie associations Oriental",p:"PP",rows:100},{id:"am46",n:"Projets pilotes AMANA (suivi)",p:"CW",rows:15},{id:"am47",n:"Bénéficiaires (base anonymisée)",p:"CC",rows:500},{id:"am48",n:"Impact metrics (cadre M&E)",p:"CW",rows:20},{id:"am49",n:"Photos / témoignages terrain",p:"CW",rows:50},{id:"am50",n:"Rapports impact (templates)",p:"CW",rows:10}]},
    {cat:"VI · FINANCEMENT AMANA",layers:[{id:"am51",n:"Fondations bailleurs Afrique",p:"PP",rows:100},{id:"am52",n:"DFI financement social",p:"PP",rows:40},{id:"am53",n:"Zakat funds (Gulf + Maroc)",p:"PP",rows:25},{id:"am54",n:"Subventions gouvernementales MA",p:"PP",rows:30},{id:"am55",n:"EU grants développement",p:"PP",rows:50},{id:"am56",n:"UN agencies funding",p:"PP",rows:40},{id:"am57",n:"Corporate donors (mapping)",p:"PP",rows:80},{id:"am58",n:"High-net-worth donors (profils)",p:"PP",rows:60},{id:"am59",n:"Diaspora giving (données)",p:"PP",rows:30},{id:"am60",n:"Forum Dakhla fundraising (revenue)",p:"CW",rows:10}]},
    {cat:"VII · RÉSEAU",layers:[{id:"am61",n:"KOLs philanthropie Africa",p:"PP",rows:100},{id:"am62",n:"Conférences humanitaire (calendrier)",p:"PP",rows:60},{id:"am63",n:"Leaders religieux (influence don)",p:"PP",rows:80},{id:"am64",n:"Ambassadeurs AMANA potentiels",p:"CW",rows:30},{id:"am65",n:"Mère (réseau Yza / Oriental)",p:"CW",rows:15},{id:"am66",n:"Kenza Bensallah (réseau complet)",p:"CW",rows:20},{id:"am67",n:"Média humanitaire/développement",p:"PP",rows:60},{id:"am68",n:"Influenceurs philanthropie",p:"PP",rows:50},{id:"am69",n:"Universités développement (partenaires)",p:"PP",rows:40},{id:"am70",n:"Clubs Rotary/Lions Maroc",p:"PP",rows:30}]},
    {cat:"VIII · WEB 4.0 INTEGRATION",layers:[{id:"am71",n:"ÆLYA consent donateur",p:"CW",rows:10},{id:"am72",n:"BURHAN traçabilité don",p:"CC",rows:10},{id:"am73",n:"MYNε données impact (anonymisées)",p:"CW",rows:10},{id:"am74",n:"NOOS scoring vulnérabilité",p:"CW",rows:10},{id:"am75",n:"Smart contract charitable trust",p:"CC",rows:10},{id:"am76",n:"Wallet donateur (specs)",p:"CC",rows:10},{id:"am77",n:"Dashboard transparence (specs)",p:"AG",rows:10},{id:"am78",n:"Reporting automatisé (pipeline)",p:"CC",rows:10},{id:"am79",n:"Matching donateur-projet (algo)",p:"CC",rows:10},{id:"am80",n:"Audit trail complet (BURHAN)",p:"CC",rows:10}]},
    {cat:"IX · GÉOPOLITIQUE",layers:[{id:"am81",n:"Politiques sociales par pays corridor",p:"PP",rows:40},{id:"am82",n:"Aide publique développement (flux)",p:"CC",rows:500},{id:"am83",n:"ODD (SDGs) progrès par pays",p:"CC",rows:200},{id:"am84",n:"Conflits humanitaires actifs",p:"PP",rows:30},{id:"am85",n:"Migrations / déplacements (données)",p:"CC",rows:300},{id:"am86",n:"Climat — vulnérabilité par pays",p:"CC",rows:200},{id:"am87",n:"Sécurité alimentaire (indices)",p:"CC",rows:200},{id:"am88",n:"Accès eau potable (données)",p:"CC",rows:300},{id:"am89",n:"Coopération Sud-Sud humanitaire",p:"PP",rows:20},{id:"am90",n:"Sanctions / restrictions aide",p:"PP",rows:20}]},
    {cat:"X · OPÉRATIONNEL",layers:[{id:"am91",n:"Protocole AMANA (workflow complet)",p:"CW",rows:15},{id:"am92",n:"Templates reporting donateurs",p:"CW",rows:10},{id:"am93",n:"Métriques AMANA (KPI)",p:"CW",rows:15},{id:"am94",n:"Coûts opérationnels",p:"CW",rows:10},{id:"am95",n:"Juridique trust (structuration)",p:"CW",rows:15},{id:"am96",n:"Partenariat Yza (MOU)",p:"CW",rows:10},{id:"am97",n:"Calendrier collectes",p:"CW",rows:20},{id:"am98",n:"Communication donateurs",p:"CW",rows:10},{id:"am99",n:"Formation bénévoles (modules)",p:"CW",rows:10},{id:"am100",n:"Roadmap AMANA 2026-2028",p:"CW",rows:10}]},
  ],

  // ══════════════════════════════════════════════════════════
  // CG SA — INVESTMENT CLUB PAN-AFRICAIN · CORRIDOR ATLANTIQUE
  // 10 axes × 10 couches = 100 couches spécifiques
  // ══════════════════════════════════════════════════════════
  cg:[
    {cat:"I · DEAL FLOW & PIPELINE",layers:[
      {id:"cg01",n:"Startups pipeline Maroc (actives, axes CG)",p:"CC",rows:850},
      {id:"cg02",n:"Startups pipeline Sénégal (actives)",p:"CC",rows:320},
      {id:"cg03",n:"Startups pipeline Côte d'Ivoire",p:"CC",rows:480},
      {id:"cg04",n:"Startups pipeline Nigeria (gap critique)",p:"CC",rows:1200},
      {id:"cg05",n:"Startups pipeline Ghana / Afrique West",p:"CC",rows:290},
      {id:"cg06",n:"Startups pipeline Afrique Centrale",p:"CC",rows:180},
      {id:"cg07",n:"Startups pipeline Angola / Luanda",p:"CC",rows:120},
      {id:"cg08",n:"Startups pipeline France / diaspora",p:"PP",rows:650},
      {id:"cg09",n:"Grille scoring anti-feature-risk (22 pays)",p:"CW",rows:22},
      {id:"cg10",n:"Dossiers CFC en cours (pipeline actif)",p:"CW",rows:45},
    ]},
    {cat:"II · MEMBRES & LP MANAGEMENT",layers:[
      {id:"cg11",n:"Membres fondateurs (fiches complètes)",p:"CW",rows:12},
      {id:"cg12",n:"Cohorte Bâtisseurs C1 (actifs confirmés)",p:"CW",rows:30},
      {id:"cg13",n:"Cohorte Bâtisseurs C2 (cibles qualifiées)",p:"CW",rows:80},
      {id:"cg14",n:"Directeurs Pays confirmés (11/16)",p:"CW",rows:11},
      {id:"cg15",n:"Directeurs Pays en recrutement (5 gaps)",p:"CW",rows:5},
      {id:"cg16",n:"Profils LP potentiels Maroc",p:"PP",rows:45},
      {id:"cg17",n:"Profils LP potentiels France / Europe",p:"PP",rows:80},
      {id:"cg18",n:"Profils LP potentiels corridor Atlantique",p:"PP",rows:60},
      {id:"cg19",n:"Système cooptation (quotas, métriques, SOP)",p:"CW",rows:15},
      {id:"cg20",n:"KYC membres (templates CFC-conformes)",p:"CW",rows:20},
    ]},
    {cat:"III · RÉGLEMENTAIRE & CFC",layers:[
      {id:"cg21",n:"Statuts CG SA (articles CFC, version courante)",p:"CW",rows:35},
      {id:"cg22",n:"Procédures incorporation CFC SA (timeline 8-12s)",p:"CW",rows:25},
      {id:"cg23",n:"Règlement intérieur CG SA",p:"CW",rows:20},
      {id:"cg24",n:"5 firewalls gouvernance (documentation complète)",p:"CW",rows:30},
      {id:"cg25",n:"Contrats intra-groupe arm's length (Eigen→CG)",p:"CW",rows:15},
      {id:"cg26",n:"AMMC — cadre clubs d'investissement MA",p:"PP",rows:40},
      {id:"cg27",n:"CFC domiciliation — contraintes & obligations",p:"PP",rows:20},
      {id:"cg28",n:"Fiscalité holding CFC (optimisation)",p:"PP",rows:30},
      {id:"cg29",n:"Convention comité indépendant (majorité minoritaire)",p:"CW",rows:10},
      {id:"cg30",n:"Rapport commissaire aux comptes (spécial)",p:"CW",rows:8},
    ]},
    {cat:"IV · PORTEFEUILLE & INVESTISSEMENTS",layers:[
      {id:"cg31",n:"Eigen subsidiaires × 6 (fiches détaillées)",p:"CW",rows:6},
      {id:"cg32",n:"Prefacorridor — dossier equity CG SA (vesting)",p:"CW",rows:20},
      {id:"cg33",n:"Valorisations pre-money par entité Eigen",p:"CW",rows:8},
      {id:"cg34",n:"Jalons vesting (8%+4%+3% Prefacorridor)",p:"CW",rows:12},
      {id:"cg35",n:"Structures SPV par deal (templates)",p:"CW",rows:10},
      {id:"cg36",n:"Comparables sectoriels (benchmarks valorisation)",p:"PP",rows:80},
      {id:"cg37",n:"Templates due diligence (filtres 4 axes CG)",p:"CW",rows:25},
      {id:"cg38",n:"Dashboard suivi portefeuille (métriques)",p:"CW",rows:15},
      {id:"cg39",n:"Mécanismes exit (Maroc/FR — cadres jur.)",p:"PP",rows:20},
      {id:"cg40",n:"Put option anti-dilution économique (clauses)",p:"CW",rows:8},
    ]},
    {cat:"V · MARCHÉS & MACRO CORRIDOR",layers:[
      {id:"cg41",n:"PIB & croissance par pays corridor (2024-2026)",p:"CC",rows:22},
      {id:"cg42",n:"Flux IDE entrants par pays (CNUCED)",p:"CC",rows:22},
      {id:"cg43",n:"Écosystème startup par pays (rankings Briter)",p:"PP",rows:40},
      {id:"cg44",n:"Pénétration internet / mobile par pays",p:"CC",rows:22},
      {id:"cg45",n:"Fonds souverains actifs corridor (AUM)",p:"PP",rows:15},
      {id:"cg46",n:"DFIs par pays (BAD/IFC/IsDB — enveloppes)",p:"PP",rows:80},
      {id:"cg47",n:"Marchés boursiers corridor (capitalisation)",p:"PP",rows:22},
      {id:"cg48",n:"Corridors remittances (flux $ par route)",p:"CC",rows:50},
      {id:"cg49",n:"Indices gouvernance (WGI, Mo Ibrahim)",p:"CC",rows:22},
      {id:"cg50",n:"Projections démographiques 2030-2050",p:"CC",rows:22},
    ]},
    {cat:"VI · DIRECTEURS PAYS & RÉSEAU INNER CIRCLE",layers:[
      {id:"cg51",n:"Fiches Directeurs Pays confirmés (11)",p:"CW",rows:11},
      {id:"cg52",n:"Plan recrutement Nigeria (gap existentiel)",p:"CW",rows:8},
      {id:"cg53",n:"Inner Circle CG (Joumana/Kenza/Brahim/Karim/Thomas/Christian)",p:"CW",rows:6},
      {id:"cg54",n:"Kenza Bensalah — Holmarcom (LOI BURHAN P0)",p:"CW",rows:8},
      {id:"cg55",n:"Brahim Benjelloun — BOA (canal O Capital)",p:"CW",rows:6},
      {id:"cg56",n:"Thomas Lambert — Lazard (intro Elaia P0)",p:"CW",rows:5},
      {id:"cg57",n:"Karim Ammor — CGEM (dîner DGs GITEX)",p:"CW",rows:4},
      {id:"cg58",n:"Réseau CFC membres actifs (sourcing)",p:"PP",rows:200},
      {id:"cg59",n:"Réseau diaspora entrepreneuriale (LinkedIn)",p:"PP",rows:300},
      {id:"cg60",n:"Chaînes introduction 1er & 2ème cercle",p:"CW",rows:40},
    ]},
    {cat:"VII · ÉVÉNEMENTS & ACTIVATION 2026",layers:[
      {id:"cg61",n:"GITEX Africa Marrakech (7-9 avril) — terrain",p:"CW",rows:200},
      {id:"cg62",n:"Dîner CGEM semaine GITEX (DGs cibles)",p:"CW",rows:30},
      {id:"cg63",n:"ATS London (mai 2026) — cibles investisseurs",p:"PP",rows:80},
      {id:"cg64",n:"Africa Day des Entrepreneurs Abidjan",p:"PP",rows:60},
      {id:"cg65",n:"Oil & Gas West Africa Dakar",p:"PP",rows:40},
      {id:"cg66",n:"VivaTech Paris (juin 2026)",p:"PP",rows:150},
      {id:"cg67",n:"Marathon 26 jours (ATS→Abidjan→Dakar→VivaTech)",p:"CW",rows:15},
      {id:"cg68",n:"Arc Conquête 2026 complet (7 trips / 9 villes)",p:"CW",rows:22},
      {id:"cg69",n:"Visa Nigeria multi-entrées (procédure urgente)",p:"CW",rows:3},
      {id:"cg70",n:"Vaccin fièvre jaune — deadline 20 mai",p:"CW",rows:2},
    ]},
    {cat:"VIII · THÈSE D'INVESTISSEMENT",layers:[
      {id:"cg71",n:"Axe Énergétique — critères qualifiants/disqual.",p:"CW",rows:40},
      {id:"cg72",n:"Axe Numérique — critères qualifiants/disqual.",p:"CW",rows:40},
      {id:"cg73",n:"Axe Cognitif — critères qualifiants/disqual.",p:"CW",rows:40},
      {id:"cg74",n:"Axe Industriel — critères qualifiants/disqual.",p:"CW",rows:40},
      {id:"cg75",n:"Anti-feature-risk filter (exemples par axe)",p:"CW",rows:25},
      {id:"cg76",n:"Taxonomie moats structurels (4 types)",p:"CW",rows:30},
      {id:"cg77",n:"Données propriétaires locales (exemples corpus)",p:"CC",rows:50},
      {id:"cg78",n:"Licences réglementaires ancrantes (mapping)",p:"PP",rows:45},
      {id:"cg79",n:"Infrastructure physique géo-ancrée (cas)",p:"PP",rows:35},
      {id:"cg80",n:"Network effects géographiques (modèles)",p:"CW",rows:20},
    ]},
    {cat:"IX · GÉOPOLITIQUE CORRIDOR ATLANTIQUE",layers:[
      {id:"cg81",n:"Corridor Atlantique Tanger→Luanda (22 pays)",p:"CC",rows:22},
      {id:"cg82",n:"CFC / TFZ / CFCIM — zones franches Casablanca",p:"PP",rows:30},
      {id:"cg83",n:"ZLECAF — impacts sectoriels par axe CG",p:"PP",rows:40},
      {id:"cg84",n:"Accords bilatéraux Maroc prioritaires (scoring)",p:"PP",rows:50},
      {id:"cg85",n:"Risques souverains par pays (scoring pondéré)",p:"PP",rows:22},
      {id:"cg86",n:"Instabilité politique (indices + scénarios)",p:"PP",rows:22},
      {id:"cg87",n:"Présence chinoise BRI par pays (risque compétitif)",p:"CC",rows:22},
      {id:"cg88",n:"Acteurs Gulf (UAE/Qatar) en Afrique (opportunités)",p:"PP",rows:30},
      {id:"cg89",n:"Relations France-Afrique post-CFA (tendances)",p:"PP",rows:25},
      {id:"cg90",n:"Politique industrielle nationale par pays",p:"PP",rows:22},
    ]},
    {cat:"X · OPÉRATIONNEL CG SA",layers:[
      {id:"cg91",n:"Roadmap CG SA 9 mois (jalons critiques)",p:"CW",rows:45},
      {id:"cg92",n:"Budget opérationnel Eigen 2026",p:"CW",rows:15},
      {id:"cg93",n:"LOI Holmarcom BURHAN pilot (P0 urgent)",p:"CW",rows:3},
      {id:"cg94",n:"Intro Elaia Partners via Thomas Lambert (P0)",p:"CW",rows:2},
      {id:"cg95",n:"Checklist incorporation CFC SA (8-12 semaines)",p:"CW",rows:20},
      {id:"cg96",n:"KPIs membres (tableau de bord trimestriel)",p:"CW",rows:25},
      {id:"cg97",n:"SOP cooptation (founder-independent scaling)",p:"CW",rows:10},
      {id:"cg98",n:"Templates reporting trimestriel investisseurs",p:"CW",rows:8},
      {id:"cg99",n:"Communication interne CG (protocoles)",p:"CW",rows:15},
      {id:"cg100",n:"Feuille de route recrutement Bâtisseurs",p:"CW",rows:30},
    ]},
  ],

  // ══════════════════════════════════════════════════════════
  // CERCLE DU GAZODUC — ÉCOSYSTÈME SOUVERAIN · EIGEN HOLDING
  // 10 axes × 10 couches = 100 couches spécifiques
  // ══════════════════════════════════════════════════════════
  cercle:[
    {cat:"I · ARCHITECTURE EIGEN",layers:[
      {id:"cd01",n:"Eigen Holding SAS France (structure juridique)",p:"CW",rows:8},
      {id:"cd02",n:"CG SA — fiche stratégique complète",p:"CW",rows:15},
      {id:"cd03",n:"NOOS — fiche brique (assessment psychiatrique)",p:"CW",rows:15},
      {id:"cd04",n:"ÆLYA — fiche brique (consent & souveraineté)",p:"CW",rows:15},
      {id:"cd05",n:"MYNε — fiche brique (économie de l'intention)",p:"CW",rows:15},
      {id:"cd06",n:"BURHAN — fiche brique (blockchain trust)",p:"CW",rows:15},
      {id:"cd07",n:"YrKnown — fiche brique (savoir tacite)",p:"CW",rows:15},
      {id:"cd08",n:"Prefacorridor — fiche venture (constructech)",p:"CW",rows:20},
      {id:"cd09",n:"Matrice synergies intra-groupe (flux + contrats)",p:"CW",rows:30},
      {id:"cd10",n:"Roadmap d'ensemble Eigen 2026-2028",p:"CW",rows:25},
    ]},
    {cat:"II · MEMBRES & COOPTATION",layers:[
      {id:"cd11",n:"Cohorte Bâtisseurs cibles Tier 1 (scoring)",p:"CW",rows:50},
      {id:"cd12",n:"Cohorte Talents Émergents cibles (pipeline)",p:"CW",rows:80},
      {id:"cd13",n:"Système cooptation — règles & quotas par membre",p:"CW",rows:15},
      {id:"cd14",n:"Grille scoring membres (5 critères pondérés)",p:"CW",rows:20},
      {id:"cd15",n:"Parcours onboarding membres (workflow 4 étapes)",p:"CW",rows:12},
      {id:"cd16",n:"Catalogue avantages membres (accès, events, data)",p:"CW",rows:10},
      {id:"cd17",n:"Charte membres (obligations & engagements)",p:"CW",rows:8},
      {id:"cd18",n:"Réseau alumni CG (étendu, post-cohorte)",p:"PP",rows:200},
      {id:"cd19",n:"Ambassadeurs Eigen (mapping × 6 entités)",p:"CW",rows:6},
      {id:"cd20",n:"Métriques rétention & engagement membres",p:"CW",rows:15},
    ]},
    {cat:"III · COMMUNICATION & MARQUE",layers:[
      {id:"cd21",n:"Charte identité CG (hunter green / gold / Georgia)",p:"CW",rows:20},
      {id:"cd22",n:"Charte identité Eigen (orange Hermès / Cormorant)",p:"CW",rows:20},
      {id:"cd23",n:"Memorandum CG SA (version publique LP — Feb 2026)",p:"CW",rows:8},
      {id:"cd24",n:"Pitch deck CG SA V1 (version investisseurs)",p:"CW",rows:12},
      {id:"cd25",n:"Content strategy LinkedIn / médias africains",p:"CW",rows:25},
      {id:"cd26",n:"Newsletter mensuelle CG (template + calendrier)",p:"CW",rows:10},
      {id:"cd27",n:"Communiqués de presse (templates par événement)",p:"CW",rows:8},
      {id:"cd28",n:"Architecture site web CG (contenu + UX specs)",p:"AG",rows:30},
      {id:"cd29",n:"Storytelling corridor (narratives × 4 axes)",p:"CW",rows:15},
      {id:"cd30",n:"Médias économiques africains (cartographie)",p:"PP",rows:80},
    ]},
    {cat:"IV · PARTENARIATS STRATÉGIQUES",layers:[
      {id:"cd31",n:"Holmarcom LOI BURHAN pilot (P0 — Kenza)",p:"CW",rows:5},
      {id:"cd32",n:"Bank of Africa pilot BURHAN (Brahim Benjelloun)",p:"CW",rows:5},
      {id:"cd33",n:"OCP Group — partenariat données / agri-data",p:"CW",rows:8},
      {id:"cd34",n:"Attijariwafa — partenariat bancaire corridor",p:"CW",rows:8},
      {id:"cd35",n:"Proparco / AFD — protocoles DFI",p:"PP",rows:15},
      {id:"cd36",n:"BAD / IFC / IsDB — accès enveloppes",p:"PP",rows:20},
      {id:"cd37",n:"Lazard (Thomas Lambert) — mandat conseil",p:"CW",rows:5},
      {id:"cd38",n:"Elaia Partners — dossier intro ciblée (P0)",p:"CW",rows:3},
      {id:"cd39",n:"EHTP / EMI — partenariats académiques (Prefacorridor)",p:"CW",rows:8},
      {id:"cd40",n:"CFC — partenariat institutionnel (domiciliation)",p:"CW",rows:10},
    ]},
    {cat:"V · INSTITUTIONS & ACADÉMIQUE",layers:[
      {id:"cd41",n:"CGEM — accès DGs (Karim Ammor, dîner GITEX)",p:"CW",rows:10},
      {id:"cd42",n:"AMMC — veille cadre clubs investissement",p:"PP",rows:30},
      {id:"cd43",n:"CFC — règles opératoires & compliance annuelle",p:"PP",rows:25},
      {id:"cd44",n:"Chambres de commerce corridor (22 pays)",p:"PP",rows:22},
      {id:"cd45",n:"EHTP — labo test + calibration Prefacorridor",p:"CW",rows:8},
      {id:"cd46",n:"EMI — benchmark BIM plugin (Prefacorridor)",p:"CW",rows:8},
      {id:"cd47",n:"TFEs 2026 (sujets / encadrants / jalons)",p:"CW",rows:10},
      {id:"cd48",n:"Rapports EHTP/EMI 2027 (conviction kit seed)",p:"CW",rows:5},
      {id:"cd49",n:"Réseau universités Africa (partenaires académiques)",p:"PP",rows:50},
      {id:"cd50",n:"Associations professionnelles sectorielles (corridor)",p:"PP",rows:40},
    ]},
    {cat:"VI · GOUVERNANCE & FIREWALLS",layers:[
      {id:"cd51",n:"Firewall 1 — Comité conventions indépendant",p:"CW",rows:10},
      {id:"cd52",n:"Firewall 2 — Transfer pricing externe (benchmark)",p:"CW",rows:8},
      {id:"cd53",n:"Firewall 3 — Rapport commissaire spécial",p:"CW",rows:6},
      {id:"cd54",n:"Firewall 4 — Droits information trimestriels",p:"CW",rows:8},
      {id:"cd55",n:"Firewall 5 — Put option anti-dilution économique",p:"CW",rows:6},
      {id:"cd56",n:"Statuts Eigen Holding SAS France (complets)",p:"CW",rows:15},
      {id:"cd57",n:"Pacte actionnaires templates (Maroc / France)",p:"CW",rows:12},
      {id:"cd58",n:"Conventions comités (modèles contractuels)",p:"CW",rows:10},
      {id:"cd59",n:"Compliance CFC (obligations annuelles checklist)",p:"CW",rows:12},
      {id:"cd60",n:"Protocole décision investissement (processus)",p:"CW",rows:10},
    ]},
    {cat:"VII · INTELLIGENCE STRATÉGIQUE",layers:[
      {id:"cd61",n:"GITEX 2026 — profiling exhibants + speakers",p:"CC",rows:400},
      {id:"cd62",n:"Terrain matrix GITEX (fiches contacts qualifiés)",p:"CW",rows:80},
      {id:"cd63",n:"38 cibles investisseurs (fiches détaillées)",p:"CW",rows:38},
      {id:"cd64",n:"Mapping VC franco-africains (fonds + thèses)",p:"PP",rows:60},
      {id:"cd65",n:"Mapping fonds impact Afrique (DFI + family offices)",p:"PP",rows:80},
      {id:"cd66",n:"Veille concurrentielle écosystème (deals actifs)",p:"PP",rows:50},
      {id:"cd67",n:"Rapports sectoriels corridor (Briter, GSMA, etc.)",p:"PP",rows:40},
      {id:"cd68",n:"Signaux faibles marché (corpus veille hebdo)",p:"PP",rows:25},
      {id:"cd69",n:"Actualité réglementaire AMMC / CFC (flux)",p:"PP",rows:30},
      {id:"cd70",n:"Benchmark deals comparables Afrique 2025-2026",p:"PP",rows:50},
    ]},
    {cat:"VIII · EXPANSION PAN-AFRICAINE",layers:[
      {id:"cd71",n:"22 pays corridor (fiches opérationnelles)",p:"CW",rows:22},
      {id:"cd72",n:"Priorisation pays (scoring 5 axes + risque)",p:"CW",rows:22},
      {id:"cd73",n:"Risques réglementaires par pays (tableau)",p:"PP",rows:22},
      {id:"cd74",n:"Opportunités fiscales / incentives par pays",p:"PP",rows:22},
      {id:"cd75",n:"Réseaux influenceurs économiques locaux",p:"PP",rows:300},
      {id:"cd76",n:"Médias économiques par pays (cartographie)",p:"PP",rows:100},
      {id:"cd77",n:"Conférences économiques corridor (calendrier)",p:"PP",rows:60},
      {id:"cd78",n:"Associations diaspora entrepreneuriale (mapping)",p:"PP",rows:80},
      {id:"cd79",n:"Institutions financières locales (partenaires)",p:"PP",rows:100},
      {id:"cd80",n:"Partenaires distribution locaux (identification)",p:"PP",rows:150},
    ]},
    {cat:"IX · CAPITAUX & FUNDRAISING",layers:[
      {id:"cd81",n:"Data room CG SA V1 (structure + checklist)",p:"CW",rows:25},
      {id:"cd82",n:"Elaia Partners — dossier complet",p:"CW",rows:5},
      {id:"cd83",n:"Amethis / Adenia — dossiers fonds Afrique",p:"CW",rows:4},
      {id:"cd84",n:"Proparco equity — dossier",p:"PP",rows:5},
      {id:"cd85",n:"Family offices marocains (profils 30 cibles)",p:"PP",rows:30},
      {id:"cd86",n:"Fonds souverains corridor (enveloppes tech)",p:"PP",rows:15},
      {id:"cd87",n:"Modèles valorisation pre-money (méthodes)",p:"CW",rows:10},
      {id:"cd88",n:"Term sheets templates (Maroc / France)",p:"CW",rows:8},
      {id:"cd89",n:"Comparables valorisation clubs Africa (exit data)",p:"PP",rows:20},
      {id:"cd90",n:"Séquençage fundraising (anchor→BA→institutional LP)",p:"CW",rows:12},
    ]},
    {cat:"X · OPÉRATIONNEL ÉCOSYSTÈME",layers:[
      {id:"cd91",n:"Agenda GITEX (7-9 avril 2026 — planning heure/heure)",p:"CW",rows:15},
      {id:"cd92",n:"Arc Conquête 26 jours (itinéraire détaillé)",p:"CW",rows:10},
      {id:"cd93",n:"Logistique visas multi-pays (procédures)",p:"CW",rows:8},
      {id:"cd94",n:"Budget voyages 2026 (optimisé base CAS)",p:"CW",rows:15},
      {id:"cd95",n:"Feuille de route recrutement (doc complet)",p:"CW",rows:30},
      {id:"cd96",n:"KPIs Eigen global (tableau de bord CEO)",p:"CW",rows:20},
      {id:"cd97",n:"Reporting trimestriel (templates par entité)",p:"CW",rows:10},
      {id:"cd98",n:"Protocole comité des conventions (réunions)",p:"CW",rows:8},
      {id:"cd99",n:"Communication crise (protocole Eigen)",p:"CW",rows:6},
      {id:"cd100",n:"Roadmap CG 2026-2028 (jalons consolidés)",p:"CW",rows:25},
    ]},
  ],
};

// ═══════ HELPERS ═══════
function downloadCSV(name, cols, rows) {
  const h = cols.join(",");
  const r = rows.map(row => row.map(c => `"${String(c).replace(/"/g,'""')}"`).join(",")).join("\n");
  const blob = new Blob(["\uFEFF" + h + "\n" + r], { type: "text/csv;charset=utf-8;" });
  const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = `RAQIB_${name}.csv`; a.click();
}

function Score({v}){
  if(typeof v!=="number")return null;
  const color=v>=75?C.emerald:v>=50?C.amber:v>=25?C.ruby:C.tm;
  return <span style={{display:"inline-block",padding:"2px 8px",borderRadius: 0,fontSize:10,fontFamily:MN,fontWeight:600,color,background:`${color}0D`,border:`1px solid ${color}22`}}>{v}</span>;
}

// ═══════ MAIN APP ═══════
export default function RAQIB_V3(){
  const[ei,setEi]=useState(0);
  const[ci,setCi]=useState(0);
  const[li,setLi]=useState(0);
  const[time,setTime]=useState(new Date());
  useEffect(()=>{const t=setInterval(()=>setTime(new Date()),1000);return()=>clearInterval(t);},[]);

  const ent=ENTITIES[ei];
  const cats=LAYER_DEFS[ent.id]||[];
  const cat=cats[ci];
  const layer=cat?.layers?.[li];

  const totalLayers=cats.reduce((a,c)=>a+c.layers.length,0);
  const totalRows=cats.reduce((a,c)=>a+c.layers.reduce((b,l)=>b+(l.rows||0),0),0);

  const platformStats=useMemo(()=>{
    const s={};
    cats.forEach(c=>c.layers.forEach(l=>{
      if(!s[l.p])s[l.p]={count:0,rows:0};
      s[l.p].count++;s[l.p].rows+=(l.rows||0);
    }));
    return s;
  },[cats]);

  return(
    <div style={{width:"100vw",height:"100vh",background:C.cream,display:"flex",flexDirection:"column",fontFamily:SN,color:C.t1,overflow:"hidden"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,400;1,600;1,700&family=Noto+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        ::-webkit-scrollbar{width:4px;height:4px}::-webkit-scrollbar-thumb{background:${C.sand};border-radius: 0;}
      `}</style>

      {/* TOP */}
      <div style={{height:52,flexShrink:0,display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 24px",borderBottom:`1px solid ${C.div}`,background:C.ivory}}>
        <div style={{display:"flex",alignItems:"center",gap:14}}>
          <div style={{width:6,height:6,borderRadius: 0,background:C.gold}}/>
          <span style={{fontFamily:GR,fontSize:22,fontWeight:700,color:C.noir,letterSpacing:3}}>Raqib</span>
          <span style={{fontFamily:GR,fontSize:15,color:C.sand}}>رقيب</span>
          <div style={{width:1,height:20,background:C.div}}/>
          <span style={{fontSize:9,color:C.t3,fontFamily:MN,letterSpacing:2}}>V4 · 1000 COUCHES · 9 PLATEFORMES · {ENTITIES.length} ENTITÉS</span>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:12}}>
          <span style={{fontSize:9,color:C.t3,fontFamily:MN}}>{time.toLocaleTimeString("fr-FR")}</span>
        </div>
      </div>

      {/* ENTITY TABS */}
      <div style={{height:42,flexShrink:0,display:"flex",alignItems:"stretch",borderBottom:`1px solid ${C.div}`,background:C.ivory,overflowX:"auto"}}>
        {ENTITIES.map((e,i)=>(
          <button key={e.id} onClick={()=>{setEi(i);setCi(0);setLi(0);}} style={{
            background:ei===i?C.cream:"transparent",border:"none",
            borderBottom:ei===i?`2px solid ${e.c}`:"2px solid transparent",
            color:ei===i?e.c:C.t3,fontSize:12,fontFamily:GR,fontWeight:ei===i?700:400,
            padding:"0 16px",cursor:"pointer",whiteSpace:"nowrap",letterSpacing:0.5,
          }}>{e.n}<span style={{fontSize:7,fontFamily:MN,fontStyle:"normal",marginLeft:5,opacity:0.5}}>{e.type}</span></button>
        ))}
      </div>

      {/* ENTITY HEADER */}
      <div style={{flexShrink:0,padding:"10px 24px",borderBottom:`1px solid ${C.div}`,background:`${ent.c}04`,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <div>
          <span style={{fontSize:18,fontFamily:GR,fontWeight:700,color:C.noir}}>{ent.n}</span>
          <span style={{fontSize:11,fontFamily:SN,color:C.t3,marginLeft:12}}>{ent.desc}</span>
        </div>
        <div style={{display:"flex",gap:12,alignItems:"center",fontSize:9,fontFamily:MN,color:C.t3}}>
          <span>{totalLayers} couches</span><span>·</span><span>{totalRows.toLocaleString()} entrées prévues</span>
          <span>·</span>
          <span>{Object.entries(platformStats).map(([k,v])=>`${PLATFORMS[k]?.n?.split(" ")[0]||k}:${v.count}`).join(" · ")}</span>
        </div>
      </div>

      {/* MAIN */}
      <div style={{flex:1,display:"flex",overflow:"hidden"}}>

        {/* LEFT NAV */}
        <div style={{width:260,flexShrink:0,borderRight:`1px solid ${C.div}`,background:C.ivory,overflow:"auto"}}>
          <div style={{padding:"10px 14px",fontSize:8,fontFamily:MN,color:C.t3,letterSpacing:2}}>{ent.type==="HOLDING"||ent.type==="ECOSYSTEM"?"10 AXES STRATÉGIQUES × 10 COUCHES = 100 COUCHES SPÉCIFIQUES":"10 MACRO × 10 SUB = 100 COUCHES SPÉCIFIQUES"}</div>
          {cats.map((c,mi)=>(
            <div key={mi}>
              <button onClick={()=>{setCi(mi);setLi(0);}} style={{
                width:"100%",background:ci===mi?`${ent.c}08`:"transparent",border:"none",
                borderLeft:ci===mi?`3px solid ${ent.c}`:"3px solid transparent",
                padding:"8px 14px",cursor:"pointer",textAlign:"left",
              }}>
                <div style={{fontSize:11,fontFamily:GR,fontWeight:700,color:ci===mi?ent.c:C.t2,letterSpacing:0.3}}>{c.cat}</div>
              </button>
              {ci===mi && c.layers.map((l,lii)=>(
                <button key={l.id} onClick={()=>setLi(lii)} style={{
                  width:"100%",background:li===lii?`${ent.c}06`:"transparent",border:"none",
                  borderLeft:li===lii?`2px solid ${ent.c}`:"2px solid transparent",
                  padding:"5px 14px 5px 28px",cursor:"pointer",textAlign:"left",
                  display:"flex",alignItems:"center",gap:6,
                }}>
                  <span style={{width:4,height:4,borderRadius: 0,background:PLATFORMS[l.p]?.c||C.sand,flexShrink:0}}/>
                  <span style={{fontSize:10,fontFamily:SN,color:li===lii?C.noir:C.t2,fontWeight:li===lii?600:400,flex:1,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{l.n}</span>
                  <span style={{fontSize:8,fontFamily:MN,color:C.tm,flexShrink:0}}>{(l.rows||0).toLocaleString()}</span>
                </button>
              ))}
            </div>
          ))}
        </div>

        {/* RIGHT CONTENT */}
        <div style={{flex:1,overflow:"auto",background:C.cream,padding:"20px 28px"}}>
          {layer && <>
            <div style={{fontSize:9,fontFamily:MN,color:C.tm,marginBottom:4}}>
              {ent.n} / {cat.cat} / <span style={{color:ent.c}}>{layer.n}</span>
            </div>
            <div style={{fontSize:20,fontFamily:GR,fontWeight:700,color:C.noir,marginBottom:4}}>{layer.n}</div>
            <div style={{width:36,height:2,background:ent.c,marginBottom:16,opacity:0.5}}/>

            {/* Platform badge */}
            <div style={{display:"flex",gap:12,marginBottom:20,alignItems:"center"}}>
              <div style={{display:"flex",alignItems:"center",gap:6,padding:"5px 12px",background:`${PLATFORMS[layer.p]?.c||C.sand}0A`,border:`1px solid ${PLATFORMS[layer.p]?.c||C.sand}25`,borderRadius: 0,}}>
                <div style={{width:6,height:6,borderRadius: 0,background:PLATFORMS[layer.p]?.c}}/>
                <span style={{fontSize:10,fontFamily:MN,fontWeight:600,color:PLATFORMS[layer.p]?.c}}>{PLATFORMS[layer.p]?.n}</span>
              </div>
              <span style={{fontSize:10,fontFamily:SN,color:C.t3}}>Plateforme assignée</span>
              <div style={{width:1,height:14,background:C.div}}/>
              <span style={{fontSize:10,fontFamily:MN,color:C.t2}}>{(layer.rows||0).toLocaleString()} entrées prévues</span>
            </div>

            {/* Description panel */}
            <div style={{background:C.ivory,border:`1px solid ${C.div}`,borderRadius: 0,padding:16,marginBottom:20}}>
              <div style={{fontSize:10,fontFamily:MN,color:ent.c,letterSpacing:1,marginBottom:8,fontWeight:700}}>SPÉCIFICATION DE COUCHE</div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:12,fontSize:11,fontFamily:SN,color:C.t2,lineHeight:1.6}}>
                <div><span style={{fontWeight:600,color:C.t1}}>Entité :</span> {ent.n} ({ent.type})</div>
                <div><span style={{fontWeight:600,color:C.t1}}>Macro :</span> {cat.cat}</div>
                <div><span style={{fontWeight:600,color:C.t1}}>Couche :</span> {layer.n}</div>
                <div><span style={{fontWeight:600,color:C.t1}}>Plateforme :</span> {PLATFORMS[layer.p]?.n}</div>
                <div><span style={{fontWeight:600,color:C.t1}}>Volume cible :</span> {(layer.rows||0).toLocaleString()} entrées</div>
                <div><span style={{fontWeight:600,color:C.t1}}>ID :</span> <span style={{fontFamily:MN,fontSize:10}}>{layer.id}</span></div>
              </div>
              <div style={{marginTop:12,padding:"8px 12px",background:`${PLATFORMS[layer.p]?.c}08`,borderRadius: 0,fontSize:10,fontFamily:SN,color:C.t2}}>
                <span style={{fontWeight:600,color:PLATFORMS[layer.p]?.c}}>Routing :</span> {PLATFORMS[layer.p]?.s}
              </div>
            </div>

            {/* All platforms overview */}
            <div style={{background:C.ivory,border:`1px solid ${C.div}`,borderRadius: 0,padding:16}}>
              <div style={{fontSize:10,fontFamily:MN,color:C.gold,letterSpacing:1,marginBottom:12,fontWeight:700}}>DISTRIBUTION PLATEFORMES — {ent.n}</div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8}}>
                {Object.entries(platformStats).map(([k,v])=>(
                  <div key={k} style={{padding:"8px 12px",background:`${PLATFORMS[k]?.c}06`,border:`1px solid ${PLATFORMS[k]?.c}15`,borderRadius: 0,}}>
                    <div style={{fontSize:10,fontFamily:MN,fontWeight:700,color:PLATFORMS[k]?.c}}>{PLATFORMS[k]?.n}</div>
                    <div style={{fontSize:9,fontFamily:MN,color:C.t3,marginTop:2}}>{v.count} couches · {v.rows.toLocaleString()} entrées</div>
                  </div>
                ))}
              </div>
            </div>
          </>}
        </div>
      </div>

      {/* BOTTOM */}
      <div style={{height:26,flexShrink:0,display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 24px",borderTop:`1px solid ${C.div}`,background:C.ivory}}>
        <span style={{fontSize:7,color:C.tm,fontFamily:MN}}>RAQIB V4 · 1000 COUCHES UNIQUES · 9 PLATEFORMES · CLAUDE CODE + COWORK + OPENCLAW + CODEX + PERPLEXITY + ANTIGRAVITY + MISTRAL + DEEPSEEK/QWEN + CLAUDE.AI</span>
        <span style={{fontSize:7,color:C.gold,fontFamily:MN}}>MARS 2026 · EIGEN HOLDING SAS · SOUVERAINETÉ INTÉGRALE · CG SA + CERCLE DU GAZODUC</span>
      </div>
    </div>
  );
}
