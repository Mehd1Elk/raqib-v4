// MYNε Data Constants — extracted from HTML source

export const KELTA_INVERSIONS = [
  {num:'01',from:'DETTE',to:'ACTIF',color:'var(--gold)',hl:'Vos données sont une dette dans leur système. Un actif dans le nôtre.',body:"Chaque interaction numérique génère de la valeur. Celle-ci est capturée intégralement par les plateformes. Le profil moyen d'un utilisateur occidental vaut 194 € par an sur le marché publicitaire. Sur 30 ans de vie numérique : 19 600 €. Zéro reversé. MYNε convertit cette dette en actif liquide, traçable, monétisable dès aujourd'hui.",sv:'19 600 €',sl:'valeur non reversée sur 30 ans'},
  {num:'02',from:'MANIPULATION',to:'IMMUNITÉ',color:'var(--purple)',hl:'ÆLYA ne vous vend pas. Elle vous protège.',body:"Les systèmes de recommandation actuels optimisent l'engagement — c'est-à-dire votre addiction. ÆLYA inverse le modèle : Policy Engine REJECT par défaut, scanner CGU en temps réel, veto sur chaque accès à vos données.",sv:'<5ms',sl:'temps de décision Policy Engine'},
  {num:'03',from:'PRÉDATION',to:'ÉCHANGE',color:'var(--green)',hl:'Un marché où le producteur fixe ses conditions.',body:"Sur MYNε, ce sont les acheteurs qui soumissionnent. L'individu déclare ses intentions, définit son niveau d'anonymisation (T0→T5), et choisit à qui vendre. Revenue share 53 % inscrit dans le smart contract Base L2 — immuable, automatique, en temps réel.",sv:'53 %',sl:'revenue share smart contract Base L2'},
  {num:'04',from:'FÉODALISME',to:'PROPRIÉTÉ',color:'var(--cyan)',hl:'Vos données ne disparaissent pas quand vous quittez la plateforme.',body:"Aujourd'hui, vos données appartiennent à la plateforme que vous utilisez. Sur MYNε, chaque dataset est tokenisé (NFT fractionné) sur Base L2. Vous pouvez le transférer, le vendre, le transmettre.",sv:'NFT',sl:'fractionné Base L2 — propriété transférable'},
];

export const VOL_LEGAL_ROWS = [
  ['Qui produit ?',"L'utilisateur — par ses comportements, recherches, achats, déplacements, données biométriques"],
  ['Qui capture ?','La plateforme — automatiquement, sans demande explicite, via pixels, SDK tiers, fingerprinting'],
  ['Qui agrège ?','Les data brokers — Acxiom, Experian, Oracle Data Cloud — qui croisent et enrichissent les profils'],
  ['Qui paie ?',"Les annonceurs, assureurs, banques, gouvernements, fonds d'investissement, laboratoires pharma"],
  ['Qui révoque ?','Personne — les données vendues ne peuvent pas être rappelées'],
  ['Qui trace ?',"Personne — aucune transparence sur qui a accédé à quoi, quand, à quel prix"],
];

export const VOL_LEGAL_STATS = [{v:'9,49 $',l:'revenus Facebook/utilisateur/mois'},{v:'237 $',l:'revenus annuels Google/utilisateur'},{v:'0 €',l:"reversé à l'utilisateur"},{v:'4 000 Mds $',l:'marché mondial data 2025'}];

export const CONTRADICTIONS = [
  {t:'Blockchain publique vs données privées',r:"Seul le hash de l'accès est on-chain — jamais la donnée. Zero-knowledge proof pour les audits.",s:'TRANCHÉE',sc:'var(--green)'},
  {t:'Autonomie utilisateur vs agent qui décide',r:"ÆLYA exécute les préférences déclarées par l'utilisateur — elle n'a pas d'agenda propre.",s:'TRANCHÉE',sc:'var(--green)'},
  {t:'Démocratisation vs connexion internet requise',r:'USSD fallback pour feature phones. Intégration mobile money pour non-bancarisés.',s:'EN COURS',sc:'var(--gold)'},
  {t:'53% immuable vs bug smart contract',r:'Audit Certik Q3 2026. Multisig 3/5. Bug bounty public dès le lancement.',s:'PLANIFIÉE',sc:'var(--purple)'},
  {t:'16 juridictions contradictoires',r:'RGPD comme plancher minimal. Couche BURHAN adapte les preuves par juridiction.',s:'VALIDÉE',sc:'var(--green)'},
  {t:'Souveraineté vs 47% de commission',r:"11% plateforme (infra réelle), 36% pool écosystème redistribué. Aucun actionnaire ne capte ce 47%.",s:'TRANCHÉE',sc:'var(--green)'},
  {t:'SPADE pattern discovery vs vie privée',r:"SPADE sert à optimiser le matching côté agrégats — jamais appliqué à des données individuelles.",s:'VALIDÉE',sc:'var(--green)'},
  {t:'Inclusion Afrique vs equity retail 0€',r:"Le produit sert l'inclusion, l'equity structure sert les investisseurs institutionnels et retail.",s:'TRANCHÉE',sc:'var(--green)'},
];

export const SPOTIFY_COMPARISON = [
  {d:'Producteur',s:"L'artiste enregistre et dépose sa musique sur Spotify.",m:"L'individu produit des données comportementales et les dépose sur MYNε.",i:'Le créateur reprend le contrôle sur la distribution.'},
  {d:'Consommateur',s:"L'auditeur accède à des millions de titres via abonnement.",m:"L'acheteur accède à des datasets qualifiés via API.",i:'Friction réduite des deux côtés.'},
  {d:'Plateforme',s:'Spotify agrège, route les streams, reverse les royalties.',m:'MYNε agrège, route les accès, reverse 53% via smart contract.',i:'La plateforme est un tuyau intelligent.'},
  {d:'Traçabilité',s:'Chaque stream est compté, transparent, auditable.',m:'Chaque accès données est hashé on-chain via BURHAN.',i:'La traçabilité crée la confiance.'},
  {d:'Effet marché',s:"Plus d'artistes → plus de consommateurs → plus de valeur.",m:'Plus de producteurs → datasets plus riches → prix plus élevés.',i:'Flywheel à double face.'},
];

export const GAFAM_MODELS = [
  {id:'gafam',label:'Modèle GAFAM',color:'var(--red)',resume:'Extraction gratuite. Monétisation opaque. Utilisateur = produit.',props:['Données collectées sans consentement granulaire','Revente à des tiers sans visibilité','Aucune rémunération du producteur','RGPD contourné via Dark Patterns','Monopole du pricing'],verdict:'INCOMPATIBLE avec la souveraineté'},
  {id:'chine',label:'Modèle Chinois (SDE/SZDE)',color:'var(--amber)',resume:'Marchés structurés. Traçabilité. Propriété collective, pas individuelle.',props:['Shanghai/Shenzhen Data Exchange opérationnels','Pricing basé sur valeur réelle','Trois droits : possession, utilisation, exploitation',"Données appartiennent à l'État",'Aucune rémunération directe individuelle'],verdict:'INSPIRANT structure, INACCEPTABLE gouvernance'},
  {id:'myne',label:'Modèle MYNε',color:'var(--green)',resume:'Propriété individuelle. Rémunération directe. Conformité native.',props:['Consentement granulaire par catégorie/acheteur','Revenue share 53% smart contract Base L2','Differential Privacy ε∈[1,3] — Cynthia Dwork','ÆLYA REJECT par défaut','BURHAN audit RGPD/AI Act/EHDS natif'],verdict:'SEUL modèle où le producteur est propriétaire'},
];

export const ECO_INTENTION_PRICING = [
  {type:"Intention d'achat immobilier",f:'200–500 €',a:'banques, promoteurs, assureurs'},
  {type:'Changement de véhicule',f:'150–350 €',a:'constructeurs, leasing, assureurs'},
  {type:'Soin médical planifié',f:'80–250 €',a:'cliniques, labos pharma, mutuelles'},
  {type:'Voyage international',f:'50–150 €',a:'compagnies aériennes, OTA, assureurs'},
  {type:'Investissement',f:'100–300 €',a:'banques privées, fintechs, brokers'},
  {type:'Formation/reconversion',f:'20–80 €',a:'EdTech, OPCO, universités'},
];

export const TAM_DATA = [
  {m:'Publicité numérique ciblée',p:'1%',t:'$1,2 Mds',l:'Remplacement cookies tiers',color:'var(--gold)'},
  {m:'Données santé anonymisées',p:'5%',t:'$3,5 Mds',l:'EHDS + marchés pharma',color:'var(--purple)'},
  {m:'Données financières',p:'2%',t:'$2,1 Mds',l:'Open Banking + crédit alternatif',color:'var(--green)'},
  {m:"IoT et données d'usage",p:'2%',t:'$1,4 Mds',l:'Voiture connectée, wearables',color:'var(--cyan)'},
  {m:'Recherche académique',p:'3%',t:'$2,6 Mds',l:'Panels consentis',color:'var(--rose)'},
];

export const T_LEVELS = [
  {id:'T0',label:'T0 — Brut PII',protection:0,risk:100,val:0.002,desc:"Donnée brute avec identifiants personnels complets. Nom, prénom, adresse. Usage interne — JAMAIS vendu.",meta:'Stockage chiffré AES-256',color:'var(--red)'},
  {id:'T1',label:'T1 — Pseudonymisation',protection:20,risk:80,val:0.005,desc:"Identifiants remplacés par des tokens non-réversibles. Nom → UUID. Adresse → département.",meta:'Conforme RGPD Art. 4(5)',color:'var(--amber)'},
  {id:'T2',label:'T2 — Généralisation',protection:45,risk:55,val:0.012,desc:"Valeurs généralisées en intervalles. Âge → tranche [25-34]. Revenu → quartile. GPS → ville.",meta:'Re-identification risk <30%',color:'#eab308'},
  {id:'T3',label:'T3 — Agrégation',protection:70,risk:30,val:0.025,desc:"Données agrégées en statistiques de groupe. Médiane, moyenne, percentiles. Aucune ligne individuelle.",meta:'k-anonymity k≥5',color:'var(--green)'},
  {id:'T4',label:'T4 — Differential Privacy',protection:90,risk:10,val:0.045,desc:"Bruit Laplace calibré (ε=1.5). Garantie formelle : aucun algorithme ne distingue deux datasets.",meta:'Garantie Cynthia Dwork — ε=1.5',color:'var(--cyan)'},
  {id:'T5',label:'T5 — Chiffrement HE',protection:100,risk:0,val:0.100,desc:"Homomorphic Encryption — calculs sur données chiffrées sans déchiffrer. Ré-identification impossible.",meta:'ε=1.0 — Maximum privacy — prix ×50',color:'var(--purple)'},
];

export const TL_TRANSFORMS: Record<string, Record<string, string>> = {
  T0:{nom:'Fatima-Zahra Amrani',age:'28',ville:'Casablanca',revenu:'18 500 MAD'},
  T1:{nom:'usr_a3f9d1c2',age:'28',ville:'Casablanca',revenu:'18 500 MAD'},
  T2:{nom:'usr_a3f9d1c2',age:'25-34',ville:'Grand Casablanca',revenu:'Q3 (15K-22K)'},
  T3:{nom:'[agrégé groupe 847]',age:'médiane 31',ville:'Maroc',revenu:'médiane 17 200'},
  T4:{nom:'[DP bruit Laplace]',age:'31±4.2',ville:'Maroc',revenu:'17 200±2 100'},
  T5:{nom:'0x8f3a…c91d',age:'0x2b…',ville:'0x7e…',revenu:'0x4a…'},
};

export const A2A_STEPS = [
  {s:1,actor:'Agent Acheteur B2B',action:'REQUEST',msg:'Demande : 5 000 profils, santé, T3 minimum, budget 12 500 €',color:'var(--cyan)'},
  {s:2,actor:'ÆLYA (Policy Engine)',action:'EVALUATE',msg:'Vérification règles : santé autorisée, T3 OK, budget OK. 12 500 € × 53% = 6 625 € producteurs.',color:'var(--purple)'},
  {s:3,actor:'ÆLYA',action:'COUNTER',msg:"Counter-offer : T4 disponible à 18 000 € — signal qualité supérieur, conformité AI Act.",color:'var(--purple)'},
  {s:4,actor:'Agent Acheteur B2B',action:'ACCEPT',msg:"Acceptation du counter à 18 000 €. Transfert escrow smart contract Base L2.",color:'var(--cyan)'},
  {s:5,actor:'Smart Contract MIZAN',action:'SETTLE',msg:'Distribution : 9 540 € (53%) → producteurs, 1 980 € (11%) → plateforme, 6 480 € (36%) → pool.',color:'var(--green)'},
  {s:6,actor:'BURHAN',action:'CERTIFY',msg:'Hash inscrit on-chain. Certificat RGPD/AI Act/EHDS. Auditabilité permanente.',color:'var(--gold)'},
];

export const BURHAN_FEATURES = [
  {label:'Hash on-chain',desc:"Chaque accès → hash SHA-256 inscrit sur Base L2. Immuable, horodaté, non-répudiable.",color:'var(--gold)'},
  {label:'Certificat RGPD',desc:'Preuve automatique de consentement, finalité, durée. Compatible Art. 30 RGPD.',color:'var(--green)'},
  {label:'Certificat AI Act',desc:"Traçabilité données d'entraînement IA. Conformité Art. 10. Auditabilité autorités.",color:'var(--purple)'},
  {label:'Certificat EHDS',desc:'European Health Data Space — consentement secondaire, traçabilité santé.',color:'var(--rose)'},
];

export const BURHAN_JURISDICTIONS = ["France (CNIL)","Belgique (APD)","Maroc (CNDP)","Sénégal (CDP)","Côte d'Ivoire (ARTCI)","Tunisie (INPDP)","Allemagne (BfDI)","Pays-Bas (AP)","Espagne (AEPD)","Italie (Garante)","Portugal (CNPD)","Suède (IMY)","Pologne (UODO)","Roumanie (ANSPDCP)","Hongrie (NAIH)","Grèce (HDPA)"];

export const WEB_ERAS = [
  {era:'Web 1.0',years:'1991–2004',paradigm:'Read',desc:"Pages statiques. Lecture passive. L'utilisateur consomme.",color:'var(--t3)',ex:'Encyclopédie Britannica'},
  {era:'Web 2.0',years:'2004–2020',paradigm:'Read + Write',desc:"Réseaux sociaux, UGC. L'utilisateur produit mais cède ses droits.",color:'var(--blue)',ex:'Facebook, YouTube — données capturées'},
  {era:'Web 3.0',years:'2020–2025',paradigm:'Read + Write + Own',desc:"Blockchain, NFT, wallets. L'utilisateur possède — mais la gestion est complexe.",color:'var(--purple)',ex:'Ethereum, DeFi — friction massive'},
  {era:'Web 4.0',years:'2025–',paradigm:'Read + Write + Own + Delegate',desc:"L'utilisateur possède ET délègue à un agent fiduciaire. Souveraineté sans friction.",color:'var(--gold)',ex:'MYNε + ÆLYA — premier produit natif Web 4.0'},
];

export const WEB3_VS_WEB4 = [
  {a:'Propriété',w3:'Wallet crypto personnel',w4:'Data Wallet + NFT fractionné + agent ÆLYA'},
  {a:'Monétisation',w3:'Vente manuelle NFT/tokens',w4:'A2A automatique, 53% en temps réel'},
  {a:'Conformité',w3:'Aucune (permissionless)',w4:'BURHAN — RGPD/AI Act/EHDS natif'},
  {a:'Friction UX',w3:'Haute — wallets, gas, clés',w4:'Zéro — ÆLYA gère tout'},
  {a:"Cas d'usage",w3:'Spéculatif, financier',w4:'Quotidien — santé, comportement, intention'},
  {a:'Gouvernance',w3:'DAO ou centralisée',w4:'Fiduciaire individuel — un agent par personne'},
];

export const AELYA_TOUCHPOINTS = [
  {label:'Extension Navigateur',color:'var(--purple)',desc:"Analyse les CGU de chaque site en temps réel. Badge rouge/orange/vert. Interception des demandes de consentement.",action:"Installer l'extension"},
  {label:'Conversation WhatsApp / Telegram',color:'var(--green)',desc:'ÆLYA vous contacte quand une offre correspond. Vous répondez OUI ou NON. Le reste est automatique.',action:'Connecter WhatsApp'},
  {label:'Dashboard Data Graph',color:'var(--gold)',desc:'Visualisation complète : quelles données, qui y a accédé, quand, à quel prix. Revenus cumulés en temps réel.',action:'Accéder au dashboard'},
];

export const CGU_CLAUSES = [
  {text:'Licence mondiale, non exclusive, libre de redevances sur vos contenus',label:'DANGEREUX',color:'var(--red)'},
  {text:'Partage de vos données avec les partenaires et filiales du groupe',label:'DANGEREUX',color:'var(--red)'},
  {text:"Collecte des identifiants d'appareil et IDFA/GAID publicitaires",label:'DANGEREUX',color:'var(--red)'},
  {text:'Cookies de tracking cross-site via pixels et SDK tiers',label:'RISQUÉ',color:'var(--amber)'},
  {text:"Utilisation de vos contenus pour entraîner des modèles d'IA",label:'DANGEREUX',color:'var(--red)'},
  {text:'Communications marketing et prospection commerciale',label:'ACCEPTABLE',color:'var(--green)'},
];

export const SDK_TIERS = [
  {label:'Starter',price:'0',uam:'1 000 UAM',features:['Consentement granulaire','T-Level T1-T3','Dashboard basique','Support communauté'],color:'var(--t3)',cta:'Commencer gratuitement'},
  {label:'Growth',price:'49',uam:'10 000 UAM',features:['T-Level T1-T4','Webhooks A2A','Analytics avancés','Support email 48h'],color:'var(--green)',cta:'Commencer Growth',rec:true},
  {label:'Business',price:'199',uam:'100 000 UAM',features:['T-Level T1-T5 (HE)','BURHAN certificats','SLA 99.9%','Support dédié 4h'],color:'var(--purple)',cta:'Commencer Business'},
  {label:'Enterprise',price:'Sur mesure',uam:'Illimité',features:['White-label complet','On-premise possible','Audit Certik inclus','Account Manager dédié'],color:'var(--gold)',cta:"Contacter l'équipe"},
];

export const DISTRIBUTION_RINGS = [
  {ring:1,label:'Écosystème propre',nodes:'25 000',cac:'0 €',ch:'Communauté MYNε directe — early adopters, waitlist',color:'var(--gold)'},
  {ring:2,label:'YrKnown',nodes:'10 000',cac:'0 €',ch:'Réseau personnel et professionnel étendu',color:'var(--purple)'},
  {ring:3,label:'SDK Ouvert',nodes:'75 000',cac:'0,10–0,30 €',ch:'Développeurs intégrant le SDK ÆLYA',color:'var(--green)'},
  {ring:4,label:'CGU Scanner',nodes:'200 000',cac:'0 €',ch:'Viralité organique — partage score CGU',color:'var(--cyan)'},
];

export const ROADMAP_HORIZONS = [
  {period:'2026',label:'Horizon 1 — CGU Scanner',color:'var(--gold)',actions:['Extension Chrome/Firefox','SDK ÆLYA v1','WhatsApp/Telegram bot','Corridor Maroc-France-Sénégal'],milestone:'100K utilisateurs, 25 entreprises SDK'},
  {period:'2027–2028',label:'Horizon 2 — Banking & Health',color:'var(--purple)',actions:['Open Banking PSD2+','Données santé EHDS','A2A multi-turn','6 nouveaux pays corridor'],milestone:'1M utilisateurs, $10M ARR'},
  {period:'2029–2032',label:'Horizon 3 — Lunettes ƊAYN',color:'var(--green)',actions:['Dispositif AR ƊAYN souverain','Données visuelles temps réel','Marketplace intention physique','Standard B2B panafricain'],milestone:'10M utilisateurs, $100M ARR'},
  {period:'2033–2040',label:'Horizon 4 — Neural Firewall BCI',color:'var(--cyan)',actions:['Interface cerveau-machine (BCI)','Neural Firewall : protection cognitive','Souveraineté des pensées','Standard mondial neuronale'],milestone:'Référence mondiale Web 4.0'},
];

export const PSY_CATEGORIES = [
  {name:'Biomarqueurs qEEG',tl:'T5',color:'var(--purple)',earn:342.80,on:true,desc:'Asymétrie frontale, ratio thêta/bêta, cohérence inter-hémisphérique.',buyers:['Institut Pasteur','Servier R&D','DeepMind Health']},
  {name:"Suivi d'humeur journalier",tl:'T4',color:'var(--blue)',earn:185.50,on:true,desc:'Scores PHQ-9, GAD-7, données EMA — granularité quotidienne.',buyers:['Lundbeck','Janssen','CHU Casablanca']},
  {name:'Données médicamenteuses',tl:'T5',color:'var(--red)',earn:0,on:false,desc:'Protocoles, posologies, réponses aux molécules. Consentement non accordé.',buyers:[]},
  {name:'Sessions thérapeutiques',tl:'T4',color:'var(--gold)',earn:127.30,on:true,desc:'Fréquence, durée, type (TCC, EMDR, pleine conscience). Agrégé T4.',buyers:['Psya','Eutelmed','Livi']},
  {name:'Données de sommeil',tl:'T3',color:'var(--green)',earn:89.20,on:true,desc:'Durée, latence, qualité PSQI, HRV nocturne. Agrégé hebdomadaire.',buyers:['Philips Sleep','ResMed','Withings']},
  {name:'Tests cognitifs',tl:'T4',color:'var(--cyan)',earn:0,on:false,desc:'MoCA, Trail Making, Stroop. Analyse non-discrimination en cours.',buyers:[]},
];

export const PSY_OFFERS = [
  {buyer:'Institut Pasteur — Neurosciences',logo:'IP',spp:18.50,target:500,tl:'T4',purpose:'Étude longitudinale dépression résistante — cohorte 3 ans',dur:'36 mois',certs:['RGPD','EHDS','CPP'],verdict:'RECOMMANDÉ',vc:'var(--green)',pool:9250},
  {buyer:'Servier — R&D Psychiatrie',logo:'SV',spp:42.00,target:300,tl:'T5',purpose:'Validation biomarqueur qEEG pour nouvelle molécule antidépressive',dur:'18 mois',certs:['RGPD','EHDS','ICH-E6'],verdict:'HAUTE VALEUR',vc:'var(--gold)',pool:12600},
  {buyer:'DeepMind Health — EU Division',logo:'DM',spp:8.50,target:5000,tl:'T3',purpose:"Entraînement modèle diagnostic précoce dépression",dur:'12 mois',certs:['RGPD','AI Act Art.10'],verdict:'VÉRIFIER FINALITÉ',vc:'var(--amber)',pool:42500},
  {buyer:'CHU Casablanca — Psychiatrie',logo:'CHU',spp:22.00,target:200,tl:'T4',purpose:'Étude prévalence troubles anxieux — population urbaine marocaine',dur:'24 mois',certs:['CNDP Maroc','RGPD'],verdict:'RECOMMANDÉ',vc:'var(--green)',pool:4400},
];

export const MARKETPLACE_DATASETS_SAMPLE = [
  { id:"DS-7741", category:"Comportement santé", tLevel:"T4", profiles:12500, price:0.045, sellerAgent:true, burhanCert:true, available:true, tags:["pharma","depression","qeeg","longitudinal"] },
  { id:"DS-3392", category:"Intention achat immobilier", tLevel:"T3", profiles:3800, price:0.280, sellerAgent:true, burhanCert:true, available:true, tags:["banque","immobilier","intention","maroc","france"] },
  { id:"DS-9115", category:"Données financières comportementales", tLevel:"T4", profiles:8200, price:0.095, sellerAgent:false, burhanCert:true, available:true, tags:["fintech","credit-scoring","non-bancaire","corridor"] },
  { id:"DS-4457", category:"Usage IoT maison connectée", tLevel:"T2", profiles:22000, price:0.018, sellerAgent:true, burhanCert:true, available:false, tags:["energie","confort","habitat","conso-electrique"] },
  { id:"DS-6628", category:"Recherche psychiatrique biomarqueurs", tLevel:"T5", profiles:450, price:0.100, sellerAgent:true, burhanCert:true, available:true, tags:["neuro","qeeg","hopital","ehds","phase3"] },
];

export const MARKETPLACE_STATS = { datasets:847, profiles:"142 000+", agents:12847, humans:342, recentTx:89, avgTxVolume:"3 200 €" };

export const RECENT_TRANSACTIONS = [
  { buyer:"Servier R&D", dataset:"DS-7741", amount:562.50, tLevel:"T4", ts:"il y a 3 min" },
  { buyer:"BNP Paribas CDO", dataset:"DS-3392", amount:1064.00, tLevel:"T3", ts:"il y a 11 min" },
  { buyer:"Withings Research", dataset:"DS-4457", amount:396.00, tLevel:"T2", ts:"il y a 28 min" },
  { buyer:"DeepMind Health EU", dataset:"DS-6628", amount:45.00, tLevel:"T5", ts:"il y a 45 min" },
];

export const BUYER_PRICING_TABLE = [
  { tLevel:"T2", desc:"Données généralisées", pricePerProfile:0.012, minVolume:1000, certif:["RGPD"], typical:"Marketing audience" },
  { tLevel:"T3", desc:"Données agrégées", pricePerProfile:0.025, minVolume:500, certif:["RGPD"], typical:"Études comportementales" },
  { tLevel:"T4", desc:"Differential Privacy ε=1.5", pricePerProfile:0.045, minVolume:100, certif:["RGPD","AI Act"], typical:"R&D, scoring crédit" },
  { tLevel:"T5", desc:"Homomorphic Encryption", pricePerProfile:0.100, minVolume:50, certif:["RGPD","AI Act","EHDS"], typical:"Pharma, recherche critique" },
];

export const PRODUCER_EARNINGS_EXAMPLES = [
  { profile:"Urbain connecté France", categories:4, tLevel:"T3", monthly:14.20, yearly:170.40 },
  { profile:"Profil santé psychiatrique", categories:3, tLevel:"T4", monthly:62.10, yearly:745.20 },
  { profile:"Non-bancarisé Maroc", categories:2, tLevel:"T2", monthly:4.80, yearly:57.60 },
  { profile:"Cadre Paris — intention+", categories:6, tLevel:"T3", monthly:31.50, yearly:378.00 },
  { profile:"Chercheur qEEG volontaire", categories:1, tLevel:"T5", monthly:285.00, yearly:3420.00 },
];

export const VISUAL_PRICING = {
  basePriceByTLevel: { T2:0.018, T3:0.035, T4:0.045, T5:0.100 } as Record<string,number>,
  getEpsilonMultiplier: (eps: number) => Math.pow(eps / 2, 1.5),
  getVolumeDiscount: (vol: number) => vol > 10000 ? 0.85 : vol > 1000 ? 0.92 : 1.0,
  calculatePrice: (tLevel: string, eps: number, vol: number) => {
    const base = (VISUAL_PRICING.basePriceByTLevel as Record<string,number>)[tLevel] || 0.005;
    return base * VISUAL_PRICING.getEpsilonMultiplier(eps) * VISUAL_PRICING.getVolumeDiscount(vol);
  },
};

export const EQUITY_DROPS = [
  { id:"drop-1", name:"CG Ventures — Corridor", target:"Family offices corridor Afrique-MENA-EU", ticket:"25K–500K €", multiple:"×3–5", thesis:"Accès privilégié au marché corridor 600M habitants — avantage premier entrant", color:'#E8E4DE', status:"OUVERT" },
  { id:"drop-2", name:"Global Tech", target:"Fonds VC Tech international (EU, US, Asie)", ticket:"100K–2M €", multiple:"×2.5–4", thesis:"Infrastructure Web 4.0 — standard data marketplace nouvelle génération", color:'#a78bfa', status:"BIENTÔT" },
  { id:"drop-3", name:"YC Secondaries", target:"Alumni YC et fonds secondaires", ticket:"50K–500K €", multiple:"×2–3", thesis:"Secondaire structuré — liquidité partielle pour early investors", color:'#22c55e', status:"Q3 2026" },
  { id:"drop-4", name:"Africa Growth PE", target:"Fonds PE pan-africains", ticket:"500K–5M €", multiple:"×2.5–4", thesis:"Inclusion financière + marché data — double impact ESG mesurable", color:'#06b6d4', status:"Q4 2026" },
  { id:"drop-5", name:"Luxe & Art Data", target:"HNWI, family offices luxe, collectionneurs", ticket:"10K–250K €", multiple:"×2–3.5", thesis:"Données de consommation luxe — segment premium haute valeur", color:'#f43f5e', status:"2027" },
  { id:"drop-6", name:"Épargne Sécurisée", target:"Épargnants retail — grand public", ticket:"0–5K €", multiple:"×5–8 % annuel (rendement)", thesis:"Produit épargne réglementé — rendement indexé sur revenus marketplace", color:'#64748b', status:"2027" },
];

export const FUNDORA_BENCHMARK = [
  { dim:"Ticket minimum", fundora:"100 €", myne:"0 € (liste attente gratuite)" },
  { dim:"Liquidité", fundora:"Secondaire limité", myne:"USDC + secondaire on-chain" },
  { dim:"Traçabilité", fundora:"PDF manuel", myne:"BURHAN on-chain — temps réel" },
  { dim:"Corridor", fundora:"Europe", myne:"EU + Afrique + MENA" },
  { dim:"Gouvernance", fundora:"SPV classique", myne:"SPV + token gouvernance" },
  { dim:"Alignement", fundora:"Performance fee", myne:"Revenue share 53 % = producteurs = investisseurs" },
  { dim:"Compliance", fundora:"MiFID II", myne:"MiFID II + RGPD + AI Act + EHDS" },
  { dim:"Exit", fundora:"M&A / IPO", myne:"M&A / IPO / Buyback token" },
];

export const SPV_ARCHITECTURE = [
  { layer:1, label:"Holding MYNε SAS", desc:"Entité faîtière — détient IP, marques, contrats" },
  { layer:2, label:"SPV Round A (Luxembourg)", desc:"Véhicule réglementé — investisseurs institutionnels" },
  { layer:3, label:"SPV Drops 1-6", desc:"6 véhicules dédiés par segment investisseur" },
  { layer:4, label:"Token Gouvernance MYNε", desc:"ERC-20 Base L2 — droits de vote + participation revenus" },
  { layer:5, label:"Pool Écosystème (36 %)", desc:"Smart contract — redistribution automatique stakers" },
  { layer:6, label:"Johan Delhomme Montorfano", desc:"10–15 % equity — vesting 4 ans, cliff 1 an" },
];

export const INCLUSION_FACTS = [
  { v:"66 %", l:"adultes marocains sans compte bancaire traditionnel" },
  { v:"4 000", l:"agences Wafacash au Maroc — réseau cash dominant" },
  { v:"350 M+", l:"comptes mobile money actifs en Afrique subsaharienne" },
  { v:"80 %", l:"transactions quotidiennes en cash dans le corridor" },
];

export const CASHOUT_PARTNERS = [
  { id:"wafacash", name:"Wafacash", region:"Maroc", network:"4 000 agences + 10 000 points partenaires", fee:"1.5 %", delay:"Immédiat", persona:"Fatima, 34 ans, Casablanca — retrait chez l'épicier du quartier", color:'#E8E4DE' },
  { id:"orange", name:"Orange Money", region:"Afrique de l'Ouest + MENA", network:"12 pays, 30M+ utilisateurs", fee:"1.2 %", delay:"Immédiat", persona:"Moussa, 28 ans, Dakar — reçoit sur son Orange Money après accord A2A", color:'#f97316' },
  { id:"wave", name:"Wave", region:"Sénégal, Côte d'Ivoire", network:"Frais les plus bas d'Afrique de l'Ouest", fee:"0.9 %", delay:"Immédiat", persona:"Aminata, 26 ans, Abidjan — transfère instantanément vers Wave", color:'#22c55e' },
  { id:"mtn", name:"MTN MoMo", region:"17 pays Afrique", network:"50M+ utilisateurs actifs", fee:"1.0 %", delay:"Immédiat", persona:"Kwame, 31 ans, Accra — reçoit en MoMo pour ses données IoT", color:'#f59e0b' },
  { id:"mpesa", name:"M-Pesa", region:"Kenya, Tanzanie, Mozambique, RDC", network:"Standard de facto Afrique Est", fee:"1.3 %", delay:"Immédiat", persona:"Wanjiru, 29 ans, Nairobi — son revenu data mensuel arrive en M-Pesa", color:'#06b6d4' },
];

export const CASHOUT_PIPELINE = [
  { step:1, label:"Smartphone", desc:"L'individu ouvre l'app MYNε (ou interagit via WhatsApp)" },
  { step:2, label:"ÆLYA active", desc:"L'agent évalue les offres disponibles selon ses préférences" },
  { step:3, label:"Négociation A2A", desc:"ÆLYA négocie avec l'agent acheteur — ACCEPT ou COUNTER" },
  { step:4, label:"Accord finalisé", desc:"Prix convenu, T-Level validé, smart contract déclenché" },
  { step:5, label:"Choix du canal", desc:"Virement SEPA / Mobile Money / USDC / Auto-invest" },
  { step:6, label:"Cash-out ou invest", desc:"Retrait physique Wafacash OU investissement pool MYNε" },
];

export const REVENUE_FLOW_EXAMPLE = {
  dealAmount: 18000,
  breakdown: {
    producer: { amount:9540, pct:53, color:'#22c55e', label:"Producteurs (5 000 individus × 1,908 €)" },
    platform: { amount:1980, pct:11, color:'#E8E4DE', label:"MYNε — infrastructure & R&D" },
    ecosystem: { amount:6480, pct:36, color:'#a78bfa', label:"Pool écosystème — stakers & nœuds" },
  },
  timeline_seconds: [
    { t:0, event:"A2A ACCEPT — accord finalisé" },
    { t:2, event:"Transfert USDC acheteur → escrow smart contract" },
    { t:5, event:"BURHAN hash on-chain — certificat RGPD généré" },
    { t:8, event:"MIZAN 53/11/36 — distribution automatique" },
    { t:12, event:"Paiement producteurs — USDC → mobile money conversion" },
    { t:30, event:"Cash disponible sur Wafacash / Orange Money / M-Pesa" },
    { t:60, event:"Rapport fiscal producteur généré automatiquement" },
  ],
};

export const DATA_WALLET_SECTIONS = [
  { id:"balance", label:"Solde & Revenus", color:'#E8E4DE', desc:"Solde cumulé, revenus du mois, historique complet des transactions. Comme un compte bancaire — mais pour vos données.", features:["Solde temps réel","Graphique revenus 12 mois","Export PDF/CSV pour impôts"] },
  { id:"categories", label:"Mes Catégories", color:'#a78bfa', desc:"Activez/désactivez chaque catégorie de données. Choisissez le T-Level minimum acceptable. Tout est granulaire.", features:["Toggle par catégorie","T-Level slider","Preview revenus estimés"] },
  { id:"marketplace", label:"Offres en attente", color:'#22c55e', desc:"ÆLYA vous notifie quand une offre correspond à vos préférences. Vous acceptez ou refusez en un tap.", features:["Notification push","Détail acheteur + finalité","Accepter / Refuser / Counter"] },
  { id:"graph", label:"Data Graph", color:'#06b6d4', desc:"Visualisation de votre patrimoine de données. Qui a accédé à quoi, quand, à quel prix. BURHAN-certifié.", features:["Graphe interactif","Timeline des accès","Lien BURHAN on-chain"] },
  { id:"nft", label:"Mes NFT de données", color:'#f43f5e', desc:"Chaque dataset vendu génère un NFT fractionné sur Base L2. Preuve de propriété transférable et permanente.", features:["Liste NFT émis","Valeur de marché","Transfer / Burn"] },
  { id:"cashout", label:"Retrait", color:'#f97316', desc:"Retirez vos revenus via SEPA, Wafacash, Orange Money, Wave, MTN MoMo, M-Pesa ou USDC.", features:["5 canaux de paiement","Conversion automatique","Délai immédiat (mobile money)"] },
];

export const WALLET_FREEMIUM = {
  free: { label:"Gratuit", price:"0 €/mois", features:["Catégories limitées (3)","T-Level max T3","1 offre/mois","Notifications email"] },
  premium: { label:"Premium", price:"5–10 €/mois", features:["Toutes catégories","T-Level T5 (HE)","Offres illimitées","Priorité matching","Support dédié"], note:"Rentabilisé dès 1-2 ventes/mois" },
};

export const ARCHITECTURE_PILLARS = [
  { id:"yknow", label:"YKNOW.AI", subtitle:"Couche de collecte souveraine", color:'#06b6d4', metric:"Collecte consentie — source de données primaire", outputs:["Données brutes T0 structurées","Métadonnées comportementales","Signal d'intention natif"], inputs:["Comportements utilisateur","Données IoT","Formulaires actifs"], desc:"YKNOW est le point d'entrée de la donnée dans l'écosystème MYNε. Il collecte, structure et préclassifie la donnée avant de la passer à ÆLYA." },
  { id:"aelya", label:"ÆLYA", subtitle:"Couche de traitement et protection", color:'#a78bfa', metric:"5 T-Levels — 100 % RGPD", outputs:["Dataset anonymisé T1→T5","Consentement granulaire","Décision A2A ACCEPT/REJECT/COUNTER"], inputs:["Données T0 de YKNOW","Règles utilisateur","Offres acheteurs B2B"], desc:"ÆLYA est le cœur intelligent du système. Policy Engine, transformation T-Level, négociation A2A, scanner CGU — tout passe par ÆLYA avant d'atteindre MYNε." },
  { id:"myne", label:"MYNε", subtitle:"Couche de marché et settlement", color:'#E8E4DE', metric:"0.35 €/donnée santé — 53 % producteur", outputs:["Transaction finalisée","BURHAN certificat on-chain","Revenue 53 % distribué via MIZAN"], inputs:["Dataset certifié ÆLYA","Demande acheteur B2B","Smart contract Base L2"], desc:"MYNε est la marketplace et le settlement layer. Il orchestre la rencontre acheteur/vendeur, exécute la distribution MIZAN et certifie via BURHAN." },
];

export const CONNEXION_CONTENT = {
  headline:"Rejoignez la liste d'attente",
  subheadline:"MYNε est en accès restreint. Inscrivez-vous pour être parmi les premiers producteurs souverains.",
  fields:[
    { id:"email", type:"email", label:"Email", placeholder:"vous@exemple.com", required:true },
    { id:"prenom", type:"text", label:"Prénom", placeholder:"Votre prénom", required:true },
    { id:"pays", type:"select", label:"Pays", options:["France","Maroc","Sénégal","Côte d'Ivoire","Belgique","Autre"], required:true },
    { id:"profil", type:"select", label:"Profil", options:["Particulier","Chercheur / Académique","Entreprise (acheteur)","Développeur (SDK)","Investisseur"], required:true },
    { id:"referral", type:"text", label:"Code parrain", placeholder:"Optionnel", required:false },
  ],
  cta:"Rejoindre la liste d'attente",
  subtext:"Aucune CB requise. Données stockées uniquement pour vous contacter. Vous pouvez vous désinscrire à tout moment.",
  social_proof:"2 847 personnes déjà inscrites",
  urgency:"Les 500 premiers producteurs reçoivent 3 mois de premium gratuit.",
};

export const VERTICAL_USE_CASES = [
  { sector:"Pharmacie & Recherche clinique", color:'#a78bfa', value:"Données de patients consentis pour essais cliniques Phase II/III", buyers:"Servier, Sanofi, Roche, Janssen, Institut Pasteur", tLevel:"T4–T5", pricing:"42 €/profil (biomarqueur T5) — 18 €/profil (comportement T4)", rgpd:"EHDS + RGPD + ICH-E6", corridor:"France, Maroc, Sénégal — accès aux cohortes non-occidentales" },
  { sector:"Services financiers", color:'#22c55e', value:"Scoring crédit alternatif pour populations non-bancarisées", buyers:"BNP Paribas, Société Générale, Orange Bank, Wafabank", tLevel:"T3–T4", pricing:"95 €/profil (intention crédit qualifiée)", rgpd:"RGPD + PSD2 + AI Act Art.5 (scoring automatisé)", corridor:"Maroc (66 % non-bancarisés), Sénégal, Côte d'Ivoire" },
  { sector:"Grande consommation & Retail", color:'#E8E4DE', value:"Intentions d'achat déclarées — signal premium vs cookie tiers", buyers:"Carrefour, L'Oréal, Decathlon, Jumia", tLevel:"T2–T3", pricing:"0.012–0.025 €/profil (comportement) — 200 €/intention qualifiée", rgpd:"RGPD ePrivacy — remplacement cookies tiers post-2024", corridor:"Europe + Maroc + Afrique de l'Ouest francophone" },
  { sector:"Assurance", color:'#06b6d4', value:"Données comportementales santé et mobilité pour actuariat", buyers:"AXA, Allianz, MAIF, Atlanta (Maroc)", tLevel:"T3–T4", pricing:"55 €/profil (mobilité + santé agrégé T4)", rgpd:"RGPD + Directive Solvency II + ACAPS (Maroc)", corridor:"France, Belgique, Maroc" },
  { sector:"Éducation & RH", color:'#f43f5e', value:"Intentions de reconversion et profils de compétences", buyers:"OpenClassrooms, Coursera, LinkedIn Learning, OPCO", tLevel:"T2–T3", pricing:"20–80 €/intention reconversion qualifiée", rgpd:"RGPD + Directive Formation Pro", corridor:"France, Belgique, Maroc, Sénégal" },
];

export const EXCHANGES = [
  { id:"SDE", name:"Shanghai Data Exchange (SDE)", founded:"Novembre 2021", volume:"10 000+ datasets référencés", strengths:["Pricing basé valeur réelle","Trois droits distincts (possession/usage/exploitation)","Certification cross-border","Secteurs verticaux dédiés"], limits:["Propriété individuelle absente","Gouvernance étatique","Pas de rémunération directe producteur","Fermé aux acteurs non-chinois"], color:'#f97316' },
  { id:"SZDE", name:"Shenzhen Data Exchange (SZDE)", founded:"Décembre 2021", volume:"Focalisé fintech/tech/AI", strengths:["Intégration fintech native","Matching automatisé","Anonymisation standardisée","Interopérabilité SDE-SZDE"], limits:["Même gouvernance étatique","Absence de couche individuelle","Export data limité par réglementations DSL"], color:'#ef4444' },
];

export const CHINA_COMPARISON = [
  { dimension:"Gouvernance", sde:"Étatique — Shanghai Municipal Gov.", szde:"Étatique — Shenzhen Municipal", myne:"Fiduciaire individuel — ÆLYA" },
  { dimension:"Pricing", sde:"Valeur réelle + secteurs", szde:"Marché + AI-pricing", myne:"4 engines + DP epsilon" },
  { dimension:"Anonymisation", sde:"Standardisée — non certifiée DP", szde:"Variable", myne:"Differential Privacy ε garantie formelle" },
  { dimension:"Traçabilité", sde:"Centralisée — opaque", szde:"Partielle", myne:"On-chain BURHAN — publiquement auditable" },
  { dimension:"Supply-Demand", sde:"Offre entreprises B2B", szde:"Offre enterprise + SMB", myne:"Individus (offreurs) + entreprises (demandeurs)" },
  { dimension:"Cross-border", sde:"Certificat géré par le State", szde:"Limité par DSL/PIPL", myne:"16 juridictions, RGPD plancher" },
];

export const CHINA_LESSONS = {
  copier: ["Pricing basé sur la valeur réelle du signal","Séparation droits possession/usage/exploitation","Certification cross-border formalisée","Secteurs verticaux dédiés (santé, finance, IoT)"],
  eviter: ["Gouvernance étatique centralisée","Absence de rémunération directe du producteur","Opacité des mécanismes d'audit","Fermeture aux acteurs internationaux"],
  exploiter: ["Corridor Afrique-MENA ouvert — zéro concurrent structuré","Standard RGPD comme avantage vs PIPL/DSL","Souveraineté individuelle = différenciation radicale"],
};

export const API_ENDPOINTS = [
  {m:'POST',p:'/api/consent/grant',d:'Accorder consentement granulaire'},{m:'GET',p:'/api/datasets/:id/tlevel',d:"T-Level courant d'un dataset"},
  {m:'POST',p:'/api/aelya/negotiate',d:'Initier négociation A2A'},{m:'GET',p:'/api/burhan/cert/:txHash',d:'Certificat RGPD transaction'},
  {m:'POST',p:'/api/mizan/settle',d:'Settlement 53/11/36'},{m:'GET',p:'/api/wallet/balance',d:'Solde Data Wallet'},
  {m:'POST',p:'/api/tlevel/transform',d:'Transformation T-Level'},{m:'GET',p:'/api/marketplace/offers',d:'Offres acheteurs'},
];

export const MIZAN_DISTRIBUTION = {
  producer:{pct:53,label:'Producteur',color:'var(--green)',desc:'Versé au wallet du producteur ou mobile money'},
  platform:{pct:11,label:'Plateforme MYNε',color:'var(--gold)',desc:'Infrastructure, R&D, compliance — réinvesti'},
  ecosystem:{pct:36,label:'Pool Écosystème',color:'var(--purple)',desc:'Stakers, nœuds validateurs, contributeurs, fonds inclusion'},
};

export const MIZAN_CURRENCIES = [
  {id:'EUR',label:'Euro',type:'fiat'},{id:'MAD',label:'Dirham',type:'fiat'},{id:'XOF',label:'Franc CFA',type:'fiat'},{id:'KES',label:'Shilling',type:'fiat'},
  {id:'USDC',label:'USDC',type:'crypto'},{id:'WAFACASH',label:'Wafacash',type:'mobile'},{id:'ORANGE',label:'Orange Money',type:'mobile'},
  {id:'WAVE',label:'Wave',type:'mobile'},{id:'MTN',label:'MTN MoMo',type:'mobile'},{id:'MPESA',label:'M-Pesa',type:'mobile'},
];

export const MIZAN_PIPELINE = [
  {l:'Deal A2A finalisé',d:"L'acheteur et ÆLYA trouvent un accord"},{l:'Fonds en escrow',d:"L'acheteur transfère en USDC"},{l:'Vérification BURHAN',d:'Hash inscrit on-chain'},
  {l:'Distribution MIZAN',d:'53/11/36 automatique — immuable'},{l:'Conversion devise',d:'USDC → EUR/MAD/XOF selon préférence'},{l:'Virement mobile money',d:'Cash-out via Wafacash/Orange/Wave/MTN/M-Pesa'},
];

export const PSY_RAW_DATA: Record<string, string | number> = {
  id:'PAT-2024-07831',nom:'Marie-Claire',prenom:'Dubois',adresse:'14 rue de la Paix, Paris 75013',
  qeeg_alpha:8.7,theta_beta:4.2,asymetrie:-0.34,phq9:18,gad7:14,moca:26,humeur:3.2,sommeil:5.1,hrv:38.5,cortisol:22.4
};

export const PSY_TRANSFORMS: Record<string, Record<string, string>> = {
  T1:{id:'usr_f7c3a1b9',nom:'[PSEUDO]',prenom:'[PSEUDO]',adresse:'Paris 13ème',qeeg_alpha:'8.7',theta_beta:'4.2',asymetrie:'-0.34',phq9:'18',gad7:'14',moca:'26',humeur:'3.2',sommeil:'5.1',hrv:'38.5',cortisol:'22.4'},
  T2:{id:'usr_f7c3a1b9',nom:'[PSEUDO]',prenom:'[PSEUDO]',adresse:'Île-de-France',qeeg_alpha:'8–10 Hz',theta_beta:'4–5 (élevé)',asymetrie:'négatif',phq9:'Sévère (15-19)',gad7:'Modéré-sévère',moca:'Normal (>26)',humeur:'Q1 (1–4)',sommeil:'4–6h',hrv:'Bas (<40)',cortisol:'Élevé'},
  T3:{id:'[groupe_847]',region:'France',qeeg_alpha:'méd. 8.9',theta_beta:'méd. 4.1',phq9:'méd. 17.4',gad7:'méd. 13.8',humeur:'méd. 3.4'},
  T4:{id:'[DP ε=1.5]',region:'France',qeeg_alpha:'8.9±1.3',theta_beta:'4.1±0.8',phq9:'17.4±2.1',gad7:'13.8±1.9',garantie:'ε-DP ε=1.5 Dwork'},
  T5:{id:'0x8f3a9c2d…',data:'0xe3b0c44298fc1c14…[HE]',note:'Calculs sur données chiffrées. Déchiffrement impossible.',scheme:'Microsoft SEAL — BFV'},
};

export const PSY_PRICES: Record<string, number> = {T1:0.005,T2:0.012,T3:0.025,T4:0.045,T5:0.100};
export const PSY_PROTECTIONS: Record<string, number> = {T1:20,T2:45,T3:70,T4:90,T5:100};

export const DP_RAW_DATA = {qeeg_alpha:8.9,theta_beta:4.1,phq9:17.4,gad7:13.8,humeur:3.4,sommeil:5.3};

export const BUYER_TYPES = [
  {id:'startup',label:'Startup',mult:1.0},
  {id:'pme',label:'PME',mult:1.0},
  {id:'entreprise',label:'Entreprise',mult:1.0},
  {id:'academique',label:'Académique',mult:0.7},
];
