// =============================================================================
// MOCK DATA — Pharmacologically realistic simulated observance intelligence
// Données cliniques basées sur la littérature (Leucht 2013, Velligan 2017,
// Lacro 2002, Cramer 1998, Kane 2013, WHO 2003 Adherence Report).
// Les variations dashboard changent à chaque refresh (±5% aléatoire).
// =============================================================================

// ---------------------------------------------------------------------------
// Helper: variation aléatoire ±pct à chaque refresh
// ---------------------------------------------------------------------------
const jitter = (base: number, pct = 5) => {
  const delta = base * (pct / 100);
  return Math.round(base + (Math.random() * 2 - 1) * delta);
};

// ---------------------------------------------------------------------------
// 1. VITALS_DATA — 6 indicateurs du bandeau principal
// ---------------------------------------------------------------------------
export const VITALS_DATA = {
  get activePatients() { return jitter(14250); },
  get averageObservance() { return +(jitter(685, 3) / 10).toFixed(1); }, // ~68.5% — WHO psychiatry baseline
  get ruptureAlerts24h() { return jitter(312); },
  get hmmState4Count() { return jitter(845); },
  get myneDataValue24h() { return `€${(jitter(42500) / 1000).toFixed(1)}K`; },
  get avgMhfs() { return jitter(645); }, // /1000
};

// ---------------------------------------------------------------------------
// 2. PATIENTS_AGGREGATE — 20 pays × 5 pathologies (abrégé: ~100 entrées)
//    Taux d'observance basés sur Lacro 2002, Cramer 1998, Velligan 2017
//    Bipolaire: 40-60%, Schizo: 40-50%, Dépression: 50-70%, TDAH: 50-65%, SSPT: 55-70%
// ---------------------------------------------------------------------------
const COUNTRIES = [
  'France','Allemagne','Espagne','Belgique','Pays-Bas','Italie','Portugal','Suisse',
  'Maroc','Sénégal','Côte d\'Ivoire','Nigeria','Ghana','Kenya','Rwanda','Afrique du Sud',
  'RDC','Cameroun','Gabon','Tunisie',
];

const PATHOLOGIES: { key: string; label: string; baseAdherence: number; basePop: number }[] = [
  { key: 'bipolar',        label: 'Bipolaire',      baseAdherence: 52, basePop: 800 },
  { key: 'schizophrenia',  label: 'Schizophrénie',  baseAdherence: 45, basePop: 500 },
  { key: 'depression',     label: 'Dépression',     baseAdherence: 62, basePop: 1200 },
  { key: 'adhd',           label: 'TDAH',           baseAdherence: 58, basePop: 350 },
  { key: 'ptsd',           label: 'SSPT',           baseAdherence: 60, basePop: 280 },
];

export const PATIENTS_AGGREGATE = COUNTRIES.flatMap(country =>
  PATHOLOGIES.map(p => {
    const isAfrica = ['Maroc','Sénégal','Côte d\'Ivoire','Nigeria','Ghana','Kenya','Rwanda','Afrique du Sud','RDC','Cameroun','Gabon','Tunisie'].includes(country);
    const popFactor = isAfrica ? 0.4 + Math.random() * 0.6 : 0.8 + Math.random() * 0.5;
    const adherenceDelta = isAfrica ? -8 : 0; // lower access → lower adherence
    const count = Math.round(p.basePop * popFactor);
    const adherence = +(p.baseAdherence + adherenceDelta + (Math.random() * 10 - 5)).toFixed(1);
    // HMM state distribution — state1 dominant when adherence high
    const s4 = Math.max(2, Math.round(25 - adherence * 0.3 + Math.random() * 5));
    const s3 = Math.max(5, Math.round(30 - adherence * 0.25 + Math.random() * 5));
    const s2 = Math.max(10, Math.round(35 - adherence * 0.1 + Math.random() * 5));
    const s1 = 100 - s2 - s3 - s4;
    return {
      country,
      pathology: p.key,
      pathologyLabel: p.label,
      patient_count: count,
      mean_adherence_score: adherence,
      hmm_state_distribution: { state1: s1, state2: s2, state3: s3, state4: s4 },
      mean_mhfs: Math.round(adherence * 10 + Math.random() * 50),
    };
  })
);

// ---------------------------------------------------------------------------
// 3. MOLECULE_SIGNAL_MATRIX — 12 molécules × 6 signaux = 72 cellules
//    Données pharmacologiquement correctes (effets secondaires réels, profils
//    de détection basés sur Leucht 2013, Taylor 2018, Stahl 2021)
// ---------------------------------------------------------------------------
type Applicable = 'yes' | 'partial' | 'no';
type Strength = 'high' | 'medium' | 'low';

interface MatrixCell {
  molecule: string;
  moleculeClass: string;
  signalType: string;
  signalLabel: string;
  applicable: Applicable;
  strength: Strength;
  sensitivity: number;
  specificity: number;
  latency: string;
  effects: string;
}

const mol = (name: string, cls: string) => ({ name, cls });
const MOLECULES = [
  mol('Lithium', 'Thymorégulateur'),
  mol('Valproate', 'Thymorégulateur'),
  mol('Lamotrigine', 'Thymorégulateur'),
  mol('Clozapine', 'Antipsychotique'),
  mol('Rispéridone', 'Antipsychotique'),
  mol('Aripiprazole', 'Antipsychotique'),
  mol('Quétiapine', 'Antipsychotique'),
  mol('Olanzapine', 'Antipsychotique'),
  mol('Sertraline', 'Antidépresseur'),
  mol('Fluoxétine', 'Antidépresseur'),
  mol('Méthylphénidate', 'Psychostimulant'),
  mol('Atomoxétine', 'Non-stimulant TDAH'),
];

const SIGNAL_TYPES = [
  { id: 'ema', label: 'EMA Longitudinal' },
  { id: 'refill', label: 'Refill Prescription' },
  { id: 'circadian', label: 'Circadien' },
  { id: 'entropy', label: 'Entropie EMA' },
  { id: 'linguistic', label: 'Linguistic Proof' },
  { id: 'environment', label: 'Environnement' },
];

// Pharmacological truth table — every cell is hand-curated
const MATRIX_RAW: Record<string, Record<string, { a: Applicable; s: Strength; se: number; sp: number; lat: string; eff: string }>> = {
  // ── LITHIUM ──────────────────────────────────────────────────────────
  Lithium: {
    ema:         { a:'yes',     s:'high',   se:88, sp:82, lat:'7j',  eff:'YMRS seuil MCSD=6.6 pts, PHQ-9 ≥10 (Se=88%, Sp=88%). Rechute >50% à 10 sem. si arrêt.' },
    refill:      { a:'yes',     s:'high',   se:92, sp:88, lat:'72h', eff:'Fenêtre thérapeutique étroite (0.6-1.2 mEq/L). Retard >3j = risque de rebond maniaque.' },
    circadian:   { a:'yes',     s:'medium', se:75, sp:70, lat:'48h', eff:'Polyurie nocturne (diabète insipide néphrogénique 20-40%). Fragmentation du sommeil détectable.' },
    entropy:     { a:'yes',     s:'high',   se:85, sp:80, lat:'14j', eff:'Entropie comportementale augmente 2-3 semaines avant rechute maniaque (Faurholt-Jepsen 2016).' },
    linguistic:  { a:'yes',     s:'high',   se:82, sp:78, lat:'7j',  eff:'Tremblements fins, polyurie, soif — effets nommés spontanément par 70% des patients.' },
    environment: { a:'yes',     s:'high',   se:90, sp:85, lat:'48h', eff:'Chaleur/déshydratation : DIN 40%, toxicité >1.5 mEq/L. AINS : réabsorption tubulaire +40%.' },
  },
  // ── VALPROATE ────────────────────────────────────────────────────────
  Valproate: {
    ema:         { a:'yes',     s:'high',   se:85, sp:80, lat:'7j',  eff:'YMRS + CGI-BP. Rechute maniaque x3 si arrêt (Bowden 2000).' },
    refill:      { a:'yes',     s:'high',   se:90, sp:85, lat:'72h', eff:'Zone thérapeutique 50-125 µg/mL. Retard >4j = perte de protection antimaniaque.' },
    circadian:   { a:'partial', s:'medium', se:65, sp:60, lat:'7j',  eff:'Somnolence diurne possible (10-15%). Signal circadien moins spécifique qu\'avec lithium.' },
    entropy:     { a:'yes',     s:'medium', se:78, sp:72, lat:'14j', eff:'Augmentation entropie EMA corrèle avec perte de régularité des prises (r=0.72).' },
    linguistic:  { a:'partial', s:'medium', se:60, sp:65, lat:'14j', eff:'Prise de poids (8-20%), alopécie (12%) — effets moins spontanément rapportés.' },
    environment: { a:'yes',     s:'medium', se:72, sp:68, lat:'72h', eff:'Tératogène majeur — interaction critique grossesse. Hépatotoxicité si fièvre prolongée.' },
  },
  // ── LAMOTRIGINE ──────────────────────────────────────────────────────
  Lamotrigine: {
    ema:         { a:'yes',     s:'medium', se:78, sp:75, lat:'14j', eff:'Prévention épisode dépressif bipolaire. PHQ-9 sensible mais lent à réagir.' },
    refill:      { a:'yes',     s:'high',   se:88, sp:82, lat:'5j',  eff:'Titration lente obligatoire (risque SJS si reprise rapide après arrêt >5j).' },
    circadian:   { a:'no',      s:'low',    se:40, sp:45, lat:'-',   eff:'Pas de signal circadien exploitable — effet neutre sur le sommeil.' },
    entropy:     { a:'partial', s:'low',    se:55, sp:50, lat:'21j', eff:'Effet antidépressif lent (3-6 sem). Entropie non discriminante à court terme.' },
    linguistic:  { a:'partial', s:'low',    se:50, sp:55, lat:'21j', eff:'Rash cutané (5-10%) si mentionné ; sinon effets subjectifs discrets.' },
    environment: { a:'partial', s:'low',    se:48, sp:50, lat:'7j',  eff:'Peu de sensibilité environnementale. Interaction OCP (↓50% concentration).' },
  },
  // ── CLOZAPINE ────────────────────────────────────────────────────────
  Clozapine: {
    ema:         { a:'yes',     s:'high',   se:90, sp:88, lat:'7j',  eff:'PANSS, CGI-S. Gold standard schizophrénie résistante. Rechute rapide si arrêt.' },
    refill:      { a:'yes',     s:'high',   se:95, sp:92, lat:'48h', eff:'NFS obligatoire (agranulocytose 0.8%). Retard refill = alerte automatique registre.' },
    circadian:   { a:'yes',     s:'high',   se:85, sp:82, lat:'24h', eff:'Sédation massive (37%). Inversion du rythme circadien détectable en 24h.' },
    entropy:     { a:'yes',     s:'high',   se:88, sp:85, lat:'7j',  eff:'Entropie EMA s\'effondre à l\'arrêt — perte de structuration comportementale.' },
    linguistic:  { a:'yes',     s:'high',   se:85, sp:88, lat:'48h', eff:'Hypersalivation (pathognomonique, 31-54%), sédation, prise de poids — très nommés.' },
    environment: { a:'partial', s:'medium', se:65, sp:60, lat:'72h', eff:'Tabac induit CYP1A2 → ↓50% concentration. Arrêt tabac = surdosage possible.' },
  },
  // ── RISPÉRIDONE ──────────────────────────────────────────────────────
  'Rispéridone': {
    ema:         { a:'yes',     s:'high',   se:82, sp:78, lat:'7j',  eff:'PANSS amélioration ≥20% à 6 sem. Détection rechute via BPRS rapide.' },
    refill:      { a:'yes',     s:'high',   se:88, sp:85, lat:'72h', eff:'Forme orale et LAI (Risperdal Consta q2w). LAI : détection retard par pharmacie.' },
    circadian:   { a:'yes',     s:'medium', se:70, sp:65, lat:'48h', eff:'Somnolence dose-dépendante (12-22%). Prolactine ↑ → galactorrhée, aménorrhée.' },
    entropy:     { a:'yes',     s:'medium', se:75, sp:70, lat:'14j', eff:'Entropie EMA modérément discriminante. Akathisie = agitation non spécifique.' },
    linguistic:  { a:'partial', s:'medium', se:62, sp:65, lat:'14j', eff:'Rigidité, tremblements extrapyramidaux (15-25%). Mentionnés si sévères.' },
    environment: { a:'partial', s:'low',    se:50, sp:48, lat:'7j',  eff:'Sensibilité thermique modérée. Pas de facteur environnemental dominant.' },
  },
  // ── ARIPIPRAZOLE ─────────────────────────────────────────────────────
  Aripiprazole: {
    ema:         { a:'yes',     s:'medium', se:78, sp:75, lat:'7j',  eff:'PANSS, CGI. Profil d\'agoniste partiel D2 — moins de sédation, plus d\'akathisie.' },
    refill:      { a:'yes',     s:'high',   se:90, sp:88, lat:'72h', eff:'Forme orale + LAI mensuel (Abilify Maintena). Détection retard robuste.' },
    circadian:   { a:'partial', s:'low',    se:55, sp:50, lat:'7j',  eff:'Signal circadien faible — profil activateur, pas de sédation significative.' },
    entropy:     { a:'yes',     s:'medium', se:72, sp:68, lat:'14j', eff:'Akathisie (10-25%) génère agitation détectable mais non spécifique à l\'arrêt.' },
    linguistic:  { a:'partial', s:'medium', se:58, sp:62, lat:'14j', eff:'Akathisie, insomnie, nausées — peu spécifiques, souvent confondus avec anxiété.' },
    environment: { a:'no',      s:'low',    se:35, sp:40, lat:'-',   eff:'Aucune sensibilité environnementale connue significative.' },
  },
  // ── QUÉTIAPINE ───────────────────────────────────────────────────────
  'Quétiapine': {
    ema:         { a:'yes',     s:'medium', se:80, sp:75, lat:'7j',  eff:'MADRS (bipolar depression), PANSS (schizo). Dual mood stabilizer + antipsychotic.' },
    refill:      { a:'yes',     s:'high',   se:85, sp:82, lat:'72h', eff:'XR = prise unique/soir. IR = BID. Retard détectable via ordonnance.' },
    circadian:   { a:'yes',     s:'high',   se:88, sp:85, lat:'24h', eff:'Sédation marquée (H1 antagonism). Inversion rythme veille/sommeil très détectable.' },
    entropy:     { a:'yes',     s:'medium', se:75, sp:70, lat:'14j', eff:'Entropie corrèle avec sédation résiduelle diurne — signal modéré.' },
    linguistic:  { a:'yes',     s:'medium', se:70, sp:68, lat:'7j',  eff:'Somnolence (18-52%), sécheresse buccale, prise de poids — souvent rapportés.' },
    environment: { a:'partial', s:'low',    se:45, sp:42, lat:'7j',  eff:'Sensibilité métabolique (diabète T2) mais pas de trigger environnemental direct.' },
  },
  // ── OLANZAPINE ───────────────────────────────────────────────────────
  Olanzapine: {
    ema:         { a:'yes',     s:'high',   se:85, sp:82, lat:'7j',  eff:'PANSS, BPRS. Efficacité robuste schizophrénie et manie aiguë.' },
    refill:      { a:'yes',     s:'high',   se:88, sp:85, lat:'72h', eff:'Orale + LAI (Zyprexa Relprevv q2-4w). Syndrome post-injection (1.4%) requiert suivi.' },
    circadian:   { a:'yes',     s:'medium', se:72, sp:68, lat:'48h', eff:'Sédation (26-35%), hyperphagie nocturne détectable par pattern d\'activité.' },
    entropy:     { a:'yes',     s:'medium', se:78, sp:72, lat:'14j', eff:'Gain pondéral majeur (+4.2 kg/10 sem) modifie l\'entropie comportementale.' },
    linguistic:  { a:'yes',     s:'medium', se:72, sp:70, lat:'7j',  eff:'Prise de poids (40-80%), sédation, syndrome métabolique — fréquemment mentionnés.' },
    environment: { a:'partial', s:'low',    se:48, sp:45, lat:'7j',  eff:'Syndrome métabolique aggravé par sédentarité. Pas de trigger externe direct.' },
  },
  // ── SERTRALINE ───────────────────────────────────────────────────────
  Sertraline: {
    ema:         { a:'yes',     s:'medium', se:75, sp:72, lat:'14j', eff:'PHQ-9, GAD-7. Effet antidépresseur lent (2-4 sem). MCSD PHQ-9 = 5 pts.' },
    refill:      { a:'yes',     s:'medium', se:78, sp:75, lat:'5j',  eff:'Demi-vie 26h. Syndrome de sevrage après 5-7j d\'arrêt (vertiges, paresthésies).' },
    circadian:   { a:'partial', s:'low',    se:50, sp:48, lat:'14j', eff:'Insomnie ou somnolence (15%) — direction variable, signal peu discriminant.' },
    entropy:     { a:'partial', s:'medium', se:65, sp:62, lat:'21j', eff:'Aplatissement émotionnel détectable mais non spécifique à l\'ISRS.' },
    linguistic:  { a:'partial', s:'medium', se:58, sp:60, lat:'14j', eff:'Nausées initiales (25%), dysfonction sexuelle (30-40%) — peu nommée spontanément.' },
    environment: { a:'no',      s:'low',    se:35, sp:38, lat:'-',   eff:'Aucune sensibilité environnementale significative documentée.' },
  },
  // ── FLUOXÉTINE ───────────────────────────────────────────────────────
  'Fluoxétine': {
    ema:         { a:'yes',     s:'medium', se:75, sp:70, lat:'14j', eff:'PHQ-9, BDI-II. Demi-vie longue (norfluoxétine 4-16j) = pardon pharmacologique.' },
    refill:      { a:'partial', s:'low',    se:55, sp:52, lat:'14j', eff:'Demi-vie très longue — retard refill moins critique. Pas de sevrage brutal.' },
    circadian:   { a:'partial', s:'low',    se:48, sp:45, lat:'14j', eff:'Effet activateur léger. Insomnie possible (10-15%) mais signal faible.' },
    entropy:     { a:'partial', s:'medium', se:62, sp:58, lat:'21j', eff:'Effet anti-anhedonia lent. Entropie peu discriminante à court terme.' },
    linguistic:  { a:'partial', s:'low',    se:52, sp:55, lat:'21j', eff:'Anxiété initiale, perte d\'appétit, dysfonction sexuelle — rarement mentionnés spontanément.' },
    environment: { a:'no',      s:'low',    se:30, sp:35, lat:'-',   eff:'Pharmacologie robuste (longue demi-vie). Pas de vulnérabilité environnementale.' },
  },
  // ── MÉTHYLPHÉNIDATE ──────────────────────────────────────────────────
  'Méthylphénidate': {
    ema:         { a:'yes',     s:'medium', se:78, sp:72, lat:'24h', eff:'ASRS, Conners. Effet immédiat (30-60 min). Détection très rapide de l\'arrêt.' },
    refill:      { a:'yes',     s:'high',   se:88, sp:85, lat:'24h', eff:'Durée d\'action 4-12h selon formulation. Refill quotidien à hebdomadaire.' },
    circadian:   { a:'partial', s:'low',    se:55, sp:52, lat:'24h', eff:'Retard d\'endormissement (15-20%) — non spécifique, pourrait être le TDAH lui-même.' },
    entropy:     { a:'yes',     s:'medium', se:72, sp:68, lat:'48h', eff:'Variabilité comportementale ↑ dès J1 d\'arrêt. Entropie discriminante (Swanson 2017).' },
    linguistic:  { a:'partial', s:'low',    se:45, sp:48, lat:'7j',  eff:'Perte d\'appétit (20-30%), céphalées — peu spécifiques, rarement nommés.' },
    environment: { a:'no',      s:'low',    se:32, sp:35, lat:'-',   eff:'Pas de vulnérabilité environnementale documentée pour les stimulants.' },
  },
  // ── ATOMOXÉTINE ──────────────────────────────────────────────────────
  'Atomoxétine': {
    ema:         { a:'yes',     s:'medium', se:72, sp:68, lat:'14j', eff:'ASRS. Effet progressif (4-6 sem). Détection d\'arrêt lente.' },
    refill:      { a:'yes',     s:'medium', se:78, sp:75, lat:'5j',  eff:'Demi-vie 5h (métaboliseurs extensifs) à 21h (lents). Retard >5j critique pour CYP2D6 PM.' },
    circadian:   { a:'partial', s:'low',    se:45, sp:42, lat:'7j',  eff:'Somnolence (8-11%) possible. Signal circadien faible et non spécifique.' },
    entropy:     { a:'partial', s:'medium', se:62, sp:58, lat:'14j', eff:'Effet noradrénergique lent. Entropie peu discriminante à court terme.' },
    linguistic:  { a:'partial', s:'low',    se:48, sp:50, lat:'14j', eff:'Nausées (26%), sécheresse buccale (17%) — parfois mentionnés mais non spécifiques.' },
    environment: { a:'no',      s:'low',    se:30, sp:32, lat:'-',   eff:'Pas de vulnérabilité environnementale connue.' },
  },
};

export const MOLECULE_SIGNAL_MATRIX: MatrixCell[] = MOLECULES.flatMap(m =>
  SIGNAL_TYPES.map(s => {
    const raw = MATRIX_RAW[m.name]?.[s.id] ?? { a: 'no' as Applicable, s: 'low' as Strength, se: 30, sp: 30, lat: '-', eff: 'Non documenté' };
    return {
      molecule: m.name,
      moleculeClass: m.cls,
      signalType: s.id,
      signalLabel: s.label,
      applicable: raw.a,
      strength: raw.s,
      sensitivity: raw.se,
      specificity: raw.sp,
      latency: raw.lat,
      effects: raw.eff,
    };
  })
);

// ---------------------------------------------------------------------------
// 4. ENVIRONMENTAL_CORRECTIONS — 30 entrées réalistes
// ---------------------------------------------------------------------------
export const ENVIRONMENTAL_CORRECTIONS = [
  // Lithium — chaleur
  { molecule: 'Lithium', factorType: 'temperature', country: 'Maroc',          riskMultiplier: 3.0, threshold: -0.25, season: 'Juin-Septembre', evidence: 'Marrakech juillet : déshydratation → ↓DFG → néphrotoxicité accrue. Réduction DFG 40% documentée (Rej 2012).' },
  { molecule: 'Lithium', factorType: 'temperature', country: 'Sénégal',        riskMultiplier: 2.8, threshold: -0.20, season: 'Mai-Octobre',    evidence: 'Dakar : humidité 85% + 35°C → sudation massive → concentration Li ↑30-50%.' },
  { molecule: 'Lithium', factorType: 'temperature', country: 'Nigeria',         riskMultiplier: 2.5, threshold: -0.20, season: 'Mars-Mai',       evidence: 'Lagos : canicule pré-mousson. Nephrotoxicité + AINS en vente libre = combo critique.' },
  { molecule: 'Lithium', factorType: 'ramadan',     country: 'Maroc',          riskMultiplier: 2.2, threshold: -0.15, season: 'Variable',        evidence: 'Jeûne hydrique 16h : lithiémie ↑40%. Protocole : dose unique post-Iftar.' },
  { molecule: 'Lithium', factorType: 'ramadan',     country: 'Sénégal',        riskMultiplier: 2.0, threshold: -0.15, season: 'Variable',        evidence: 'Jeûne + chaleur tropicale = risque cumulatif. Protocole Ramadan-lithium recommandé.' },
  // Valproate — chaleur + Ramadan + grossesse
  { molecule: 'Valproate', factorType: 'temperature', country: 'Côte d\'Ivoire', riskMultiplier: 1.4, threshold: -0.10, season: 'Février-Avril', evidence: 'Abidjan : hépatotoxicité accrue si fièvre >39°C (paludisme comorbide).' },
  { molecule: 'Valproate', factorType: 'ramadan',     country: 'Tunisie',        riskMultiplier: 1.8, threshold: -0.20, season: 'Variable',      evidence: 'Modification des horaires de prise + gastroparésie jeûne → pic de concentration imprévisible.' },
  { molecule: 'Valproate', factorType: 'epidemic',     country: 'RDC',           riskMultiplier: 1.6, threshold: -0.10, season: 'Toute l\'année', evidence: 'Paludisme + hépatite = contre-indication relative VPA. Thrombopénie aggravée.' },
  // Bipolaire — photopériode
  { molecule: 'Lithium',    factorType: 'photoperiod', country: 'Allemagne',   riskMultiplier: 1.8, threshold: -0.12, season: 'Novembre-Février', evidence: 'Hiver : épisodes dépressifs bipolaires ↑60%. Photopériode <8h critique (Geoffroy 2015).' },
  { molecule: 'Lamotrigine', factorType: 'photoperiod', country: 'Pays-Bas',   riskMultiplier: 1.6, threshold: -0.10, season: 'Novembre-Février', evidence: 'Dépression hivernale bipolaire : ↑ dose lamotrigine nécessaire (50-100mg).' },
  { molecule: 'Lithium',    factorType: 'photoperiod', country: 'Belgique',    riskMultiplier: 1.7, threshold: -0.12, season: 'Novembre-Février', evidence: 'Latitude 50°N : réduction ensoleillement corrèle avec switch dépressif (r=0.65).' },
  // Clozapine — tabac
  { molecule: 'Clozapine', factorType: 'pollution',   country: 'France',       riskMultiplier: 1.3, threshold: -0.08, season: 'Hiver',           evidence: 'Tabagisme actif : CYP1A2 induction → ↓50% clozapine. Arrêt tabac = surdosage.' },
  { molecule: 'Clozapine', factorType: 'pollution',   country: 'Maroc',        riskMultiplier: 1.4, threshold: -0.08, season: 'Toute l\'année',  evidence: 'Cannabis + tabac + café = triple interaction CYP1A2. Monitoring plasmatique requis.' },
  // Ramadan — tous médicaments psychiatriques
  { molecule: 'Rispéridone',    factorType: 'ramadan', country: 'Sénégal',       riskMultiplier: 1.5, threshold: -0.12, season: 'Variable', evidence: 'Modification horaires de prise : passage 2x/j → 1x post-Iftar. Akathisie transitoire.' },
  { molecule: 'Quétiapine',     factorType: 'ramadan', country: 'Maroc',         riskMultiplier: 1.4, threshold: -0.10, season: 'Variable', evidence: 'Sédation post-Iftar majorée. XR à prendre au Suhoor si possible.' },
  { molecule: 'Aripiprazole',   factorType: 'ramadan', country: 'Tunisie',       riskMultiplier: 1.2, threshold: -0.05, season: 'Variable', evidence: 'Profil pharmacologique favorable au jeûne. Demi-vie longue (75h) = protection.' },
  { molecule: 'Olanzapine',     factorType: 'ramadan', country: 'Gabon',         riskMultiplier: 1.5, threshold: -0.12, season: 'Variable', evidence: 'Hyperphagie post-Iftar + olanzapine = prise de poids accélérée (+2kg/mois).' },
  { molecule: 'Sertraline',     factorType: 'ramadan', country: 'Cameroun',      riskMultiplier: 1.3, threshold: -0.08, season: 'Variable', evidence: 'Nausées matinales amplifiées par jeûne. Tolérance GI diminuée.' },
  // Altitude
  { molecule: 'Lithium',        factorType: 'altitude', country: 'Rwanda',       riskMultiplier: 1.3, threshold: -0.08, season: 'Toute l\'année', evidence: 'Kigali 1567m : déshydratation chronique légère → DFG réduit → accumulation Li.' },
  { molecule: 'Lithium',        factorType: 'altitude', country: 'Kenya',        riskMultiplier: 1.4, threshold: -0.10, season: 'Toute l\'année', evidence: 'Nairobi 1795m : altitude + UV intenses → néphrotoxicité cumulée.' },
  // Humidity
  { molecule: 'Lithium',        factorType: 'humidity', country: 'Ghana',         riskMultiplier: 1.6, threshold: -0.12, season: 'Mai-Septembre',  evidence: 'Accra : humidité >90% + 32°C = sudation profuse → lithiémie ↑35%.' },
  { molecule: 'Lithium',        factorType: 'humidity', country: 'Côte d\'Ivoire', riskMultiplier: 1.5, threshold: -0.10, season: 'Avril-Juillet',  evidence: 'Zone équatoriale : transpiration insensible augmentée → monitoring Li rapproché.' },
  // Pollution urbaine
  { molecule: 'Méthylphénidate', factorType: 'pollution', country: 'France',      riskMultiplier: 1.1, threshold: -0.03, season: 'Hiver',          evidence: 'Pics PM2.5 urbains : exacerbation symptômes TDAH (Sunyer 2015). Effet indirect.' },
  { molecule: 'Sertraline',      factorType: 'pollution', country: 'Italie',      riskMultiplier: 1.1, threshold: -0.03, season: 'Hiver',          evidence: 'Vallée du Po : pollution hivernale corrèle avec épisodes dépressifs (OR=1.3).' },
  // Epidemics / health crises
  { molecule: 'Clozapine',      factorType: 'epidemic', country: 'Afrique du Sud', riskMultiplier: 1.8, threshold: -0.15, season: 'Variable',     evidence: 'VIH sous ARV : interaction efavirenz → CYP3A4 → monitoring clozapine requis.' },
  { molecule: 'Rispéridone',    factorType: 'epidemic', country: 'RDC',           riskMultiplier: 1.3, threshold: -0.08, season: 'Variable',       evidence: 'Paludisme : fièvre + chloroquine → allongement QTc additif avec rispéridone.' },
  // Temperature — non-lithium
  { molecule: 'Olanzapine',     factorType: 'temperature', country: 'Nigeria',    riskMultiplier: 1.3, threshold: -0.08, season: 'Mars-Mai',       evidence: 'Thermorégulation altérée (anticholinergique). Coup de chaleur si exercice + canicule.' },
  { molecule: 'Clozapine',      factorType: 'temperature', country: 'Sénégal',    riskMultiplier: 1.5, threshold: -0.10, season: 'Mai-Octobre',    evidence: 'Effet anticholinergique majeur : anhidrose → hyperthermie maligne possible.' },
  { molecule: 'Quétiapine',     factorType: 'temperature', country: 'Kenya',      riskMultiplier: 1.2, threshold: -0.05, season: 'Janvier-Mars',   evidence: 'Effet anticholinergique modéré. Hydratation recommandée systématiquement.' },
  { molecule: 'Fluoxétine',     factorType: 'photoperiod', country: 'Allemagne',  riskMultiplier: 1.4, threshold: -0.10, season: 'Novembre-Février', evidence: 'SAD comorbide fréquent. Augmentation ISRS + luminothérapie en hiver (Lam 2016).' },
];

// ---------------------------------------------------------------------------
// 5. HABIT_LEVERS — 5 leviers × 5 profils = 25 stratégies croisées
//    Basé sur Gollwitzer 1999, Wood 2016, Eyal 2014, Deci & Ryan 2000
// ---------------------------------------------------------------------------
const LEVER_IDS = [
  { id: 'implementation_intention', name: 'Implementation Intentions', ref: 'Gollwitzer 1999, meta-analyse d=0.65 (Adriaanse 2011, k=94)' },
  { id: 'habit_stacking',          name: 'Habit Stacking',           ref: 'Clear 2018 (Atomic Habits), Gardner 2012 (habit formation review)' },
  { id: 'variable_reward',         name: 'Variable Reward',          ref: 'Eyal 2014 (Hooked Model), Operant conditioning (Skinner 1953)' },
  { id: 'identity_narrative',      name: 'Identity Narrative',       ref: 'Deci & Ryan SDT 2000, Oettingen WOOP 2015' },
  { id: 'social_pressure',         name: 'Social Pressure / Norms',  ref: 'Cialdini 2006 (Injunctive norms), Christakis 2009 (network effects)' },
];

const PROFILES = ['Anxieux', 'Négligent', 'Contestataire', 'Anosognosique', 'Contextuel'];

export const HABIT_LEVERS = LEVER_IDS.flatMap(lever =>
  PROFILES.map(profile => {
    const effectMap: Record<string, Record<string, { d: number; strategy: string }>> = {
      implementation_intention: {
        Anxieux:        { d: 0.82, strategy: 'If-Then plan ancré sur routine matinale (café → pilule). Réassurance via confirmation vocale NOOS.' },
        Négligent:      { d: 0.55, strategy: 'If-Then plan couplé à alarme smartphone. Rappel à H+2 si non confirmé.' },
        Contestataire:  { d: 0.35, strategy: 'If-Then plan co-construit avec patient (autonomie). Reformulation en objectif personnel.' },
        Anosognosique:  { d: 0.25, strategy: 'If-Then plan imposé par aidant. Efficacité limitée par déni de la maladie.' },
        Contextuel:     { d: 0.72, strategy: 'If-Then plan adapté au contexte (Ramadan, voyage, horaires décalés).' },
      },
      habit_stacking: {
        Anxieux:        { d: 0.78, strategy: 'Empilement : brossage dents → médicament → respiration 4-7-8. Rituel apaisant.' },
        Négligent:      { d: 0.68, strategy: 'Empilement : réveil → médicament sur table de nuit → petit-déjeuner. Proximité physique.' },
        Contestataire:  { d: 0.42, strategy: 'Empilement proposé comme expérimentation : « essayez 7 jours, évaluez vous-même ».' },
        Anosognosique:  { d: 0.30, strategy: 'Empilement délégué à l\'aidant. Le patient n\'initie pas la séquence.' },
        Contextuel:     { d: 0.75, strategy: 'Empilement adaptatif : 2-3 séquences prédéfinies selon jour (travail / repos / voyage).' },
      },
      variable_reward: {
        Anxieux:        { d: 0.60, strategy: 'Récompense = streak visible + badge de régularité. Éviter surprises anxiogènes.' },
        Négligent:      { d: 0.72, strategy: 'Gamification forte : points, niveaux, streak. Micro-récompenses MYNε (tokens).' },
        Contestataire:  { d: 0.55, strategy: 'Récompense = données personnelles débloquées. « Vous voyez votre progrès, pas nous. »' },
        Anosognosique:  { d: 0.38, strategy: 'Récompense extrinsèque (aidant content, réduction consultations). Effet modeste.' },
        Contextuel:     { d: 0.65, strategy: 'Récompense contextuelle : bonus si prise maintenue en contexte difficile (voyage, jeûne).' },
      },
      identity_narrative: {
        Anxieux:        { d: 0.70, strategy: 'Narrative : « Je suis quelqu\'un qui prend soin de ma stabilité ». Journal NOOS quotidien.' },
        Négligent:      { d: 0.40, strategy: 'Narrative faible — le négligent ne s\'identifie pas au rôle de « patient discipliné ».' },
        Contestataire:  { d: 0.68, strategy: 'Narrative d\'autonomie : « Je choisis mon traitement en connaissance de cause ». Empowerment.' },
        Anosognosique:  { d: 0.20, strategy: 'Narrative impossible si déni total. Approche indirecte via bien-être (sommeil, énergie).' },
        Contextuel:     { d: 0.58, strategy: 'Narrative adaptative : « Je m\'adapte à chaque situation tout en restant stable ».' },
      },
      social_pressure: {
        Anxieux:        { d: 0.65, strategy: 'Norme descriptive douce : « 78% des patients comme vous prennent leur traitement à l\'heure ».' },
        Négligent:      { d: 0.58, strategy: 'Pression sociale via aidant + notification NOOS. « Votre mère a vérifié votre streak. »' },
        Contestataire:  { d: 0.28, strategy: 'Contre-productif si trop directif. Norme descriptive uniquement, jamais injonctive.' },
        Anosognosique:  { d: 0.45, strategy: 'Pression aidant = levier principal. L\'entourage compense le déni du patient.' },
        Contextuel:     { d: 0.62, strategy: 'Réseau de pairs voyageurs / travailleurs postés. Groupe WhatsApp NOOS contextualisé.' },
      },
    };
    const data = effectMap[lever.id]?.[profile] ?? { d: 0.40, strategy: 'Stratégie générique à personnaliser.' };
    return {
      leverId: lever.id,
      leverName: lever.name,
      leverReference: lever.ref,
      profile,
      effectSize: data.d,
      strategy: data.strategy,
    };
  })
);

// ---------------------------------------------------------------------------
// 6. CONTAGION_NETWORK — 30 nœuds + 45 liens
// ---------------------------------------------------------------------------
const CONTAGION_MOLECULES = ['Lithium','Clozapine','Valproate','Aripiprazole','Rispéridone','Olanzapine','Sertraline','Quétiapine'];
const CONTAGION_COUNTRIES = ['Maroc','Sénégal','France','Allemagne','Nigeria','Kenya','Rwanda','Côte d\'Ivoire'];

export const CONTAGION_NETWORK = {
  nodes: Array.from({ length: 30 }, (_, i) => {
    const hmmState = i < 15 ? 1 : i < 22 ? 2 : i < 27 ? 3 : 4;
    return {
      id: `P-${String(1000 + i).slice(1)}${String.fromCharCode(65 + (i % 26))}`,
      x: 8 + ((i * 17 + 13) % 84),
      y: 8 + ((i * 23 + 7) % 84),
      hmmState,
      molecule: CONTAGION_MOLECULES[i % CONTAGION_MOLECULES.length],
      country: CONTAGION_COUNTRIES[i % CONTAGION_COUNTRIES.length],
      adherenceScore: hmmState === 1 ? 85 + Math.random()*10 : hmmState === 2 ? 65 + Math.random()*15 : hmmState === 3 ? 40 + Math.random()*15 : 15 + Math.random()*20,
    };
  }),
  links: Array.from({ length: 45 }, (_, i) => ({
    source: i % 30,
    target: (i * 7 + 3) % 30,
    weight: +(0.3 + Math.random() * 0.7).toFixed(2),
    type: i % 3 === 0 ? 'same_pharmacy' : i % 3 === 1 ? 'same_prescriber' : 'geographic_proximity',
  })).filter(l => l.source !== l.target),
};

// ---------------------------------------------------------------------------
// 7. CAREGIVER_DYADS — 5 dyades patient-aidant
// ---------------------------------------------------------------------------
export const CAREGIVER_DYADS = [
  { id: 1, patientId: 'P-001A', caregiverId: 'C-001', patientHMM: 3, caregiverState: 'Épuisé',  caregiverBurnout: 72, caregiverEMA: 3.2, delayToIntervention: '14j', correlation: 0.85, molecule: 'Lithium',     pathology: 'Bipolaire',     notes: 'Aidant mère 67 ans, seule, déclin cognitif léger. Patient rechute maniaque x2/an.' },
  { id: 2, patientId: 'P-002B', caregiverId: 'C-002', patientHMM: 1, caregiverState: 'Engagé',   caregiverBurnout: 15, caregiverEMA: 8.5, delayToIntervention: '-',   correlation: 0.92, molecule: 'Clozapine',   pathology: 'Schizophrénie', notes: 'Conjoint formé, accompagnement NFS bimensuel. Observance optimale.' },
  { id: 3, patientId: 'P-003C', caregiverId: 'C-003', patientHMM: 4, caregiverState: 'Épuisé',   caregiverBurnout: 88, caregiverEMA: 2.1, delayToIntervention: '21j', correlation: 0.78, molecule: 'Rispéridone', pathology: 'Schizophrénie', notes: 'Père 72 ans, diabétique. Patient hospitalisé 3x en 18 mois. Aidant en détresse.' },
  { id: 4, patientId: 'P-004D', caregiverId: 'C-004', patientHMM: 2, caregiverState: 'Fragile',  caregiverBurnout: 55, caregiverEMA: 5.0, delayToIntervention: '7j',  correlation: 0.65, molecule: 'Valproate',   pathology: 'Bipolaire',     notes: 'Sœur aidante, travail de nuit. Disponibilité variable → fragilisation lente.' },
  { id: 5, patientId: 'P-005E', caregiverId: 'C-005', patientHMM: 1, caregiverState: 'Engagé',   caregiverBurnout: 22, caregiverEMA: 7.8, delayToIntervention: '-',   correlation: 0.88, molecule: 'Aripiprazole', pathology: 'Bipolaire',    notes: 'Conjoint psychologue. Bonne alliance thérapeutique. LAI mensuel.' },
];

// ---------------------------------------------------------------------------
// 8. FORECAST_MOLECULES — Probabilité d'observance à 6 mois par galénique
//    Basé sur Kane 2013 (LAI), Kishimoto 2014 (meta-analyse LAI vs oral)
// ---------------------------------------------------------------------------
export const FORECAST_MOLECULES: Record<string, { molecule: string; form: string; adherence6m: number; relapseRisk6m: number; costMonth: number }[]> = {
  bipolar: [
    { molecule: 'Lithium oral',           form: 'oral_bid',      adherence6m: 52, relapseRisk6m: 38, costMonth: 8 },
    { molecule: 'Valproate oral',         form: 'oral_bid',      adherence6m: 55, relapseRisk6m: 35, costMonth: 12 },
    { molecule: 'Lamotrigine oral',       form: 'oral_qd',       adherence6m: 62, relapseRisk6m: 28, costMonth: 15 },
    { molecule: 'Aripiprazole oral',      form: 'oral_qd',       adherence6m: 58, relapseRisk6m: 32, costMonth: 180 },
    { molecule: 'Aripiprazole LAI',       form: 'lai_monthly',   adherence6m: 82, relapseRisk6m: 12, costMonth: 450 },
    { molecule: 'Quétiapine XR',          form: 'oral_qd',       adherence6m: 60, relapseRisk6m: 30, costMonth: 95 },
  ],
  schizophrenia: [
    { molecule: 'Rispéridone orale',      form: 'oral_bid',      adherence6m: 42, relapseRisk6m: 48, costMonth: 25 },
    { molecule: 'Rispéridone LAI',        form: 'lai_biweekly',  adherence6m: 78, relapseRisk6m: 18, costMonth: 380 },
    { molecule: 'Aripiprazole oral',      form: 'oral_qd',       adherence6m: 50, relapseRisk6m: 40, costMonth: 180 },
    { molecule: 'Aripiprazole LAI',       form: 'lai_monthly',   adherence6m: 85, relapseRisk6m: 10, costMonth: 450 },
    { molecule: 'Palipéridone LAI 3M',   form: 'lai_quarterly', adherence6m: 92, relapseRisk6m: 5,  costMonth: 520 },
    { molecule: 'Clozapine orale',        form: 'oral_bid',      adherence6m: 68, relapseRisk6m: 22, costMonth: 35 },
    { molecule: 'Olanzapine orale',       form: 'oral_qd',       adherence6m: 48, relapseRisk6m: 42, costMonth: 120 },
    { molecule: 'Olanzapine LAI',         form: 'lai_biweekly',  adherence6m: 80, relapseRisk6m: 15, costMonth: 410 },
  ],
  depression: [
    { molecule: 'Sertraline oral',        form: 'oral_qd',       adherence6m: 58, relapseRisk6m: 35, costMonth: 8 },
    { molecule: 'Fluoxétine oral',        form: 'oral_qd',       adherence6m: 55, relapseRisk6m: 38, costMonth: 6 },
    { molecule: 'Venlafaxine XR',         form: 'oral_qd',       adherence6m: 52, relapseRisk6m: 40, costMonth: 22 },
    { molecule: 'Escitalopram oral',      form: 'oral_qd',       adherence6m: 60, relapseRisk6m: 32, costMonth: 12 },
  ],
  adhd: [
    { molecule: 'Méthylphénidate IR',    form: 'oral_tid',      adherence6m: 35, relapseRisk6m: 55, costMonth: 15 },
    { molecule: 'Méthylphénidate LP',    form: 'oral_qd',       adherence6m: 58, relapseRisk6m: 35, costMonth: 45 },
    { molecule: 'Atomoxétine oral',       form: 'oral_qd',       adherence6m: 52, relapseRisk6m: 40, costMonth: 85 },
    { molecule: 'Lisdexamfétamine',       form: 'oral_qd',       adherence6m: 62, relapseRisk6m: 30, costMonth: 120 },
  ],
  ptsd: [
    { molecule: 'Sertraline oral',        form: 'oral_qd',       adherence6m: 55, relapseRisk6m: 40, costMonth: 8 },
    { molecule: 'Paroxétine oral',        form: 'oral_qd',       adherence6m: 50, relapseRisk6m: 45, costMonth: 10 },
    { molecule: 'Venlafaxine XR',         form: 'oral_qd',       adherence6m: 48, relapseRisk6m: 48, costMonth: 22 },
    { molecule: 'Prazosine (cauchemars)', form: 'oral_hs',       adherence6m: 65, relapseRisk6m: 28, costMonth: 5 },
  ],
};

// ---------------------------------------------------------------------------
// 9. DIGITAL_TWIN_SCENARIOS — 3 scénarios × 365 jours
// ---------------------------------------------------------------------------
function generateTrajectory(type: 'stop' | 'switch' | 'reduction') {
  const points: { day: number; adherence: number; relapseProbability: number; mhfs: number }[] = [];
  let adh = 72; let rel = 15; let mhfs = 680;
  for (let d = 0; d <= 365; d += 7) {
    if (type === 'stop') {
      adh = Math.max(0, adh - (d < 30 ? 3.5 : d < 90 ? 1.5 : 0.3));
      rel = Math.min(95, rel + (d < 21 ? 4 : d < 90 ? 2 : 0.5));
      mhfs = Math.max(80, mhfs - (d < 30 ? 25 : d < 90 ? 12 : 3));
    } else if (type === 'switch') {
      // Dip then recovery
      adh = d < 42 ? Math.max(35, adh - 1.8) : Math.min(78, adh + 0.8);
      rel = d < 42 ? Math.min(60, rel + 2) : Math.max(12, rel - 0.8);
      mhfs = d < 42 ? Math.max(350, mhfs - 15) : Math.min(720, mhfs + 6);
    } else {
      // Slow degradation then plateau
      adh = Math.max(50, adh - (d < 60 ? 0.5 : 0.1));
      rel = Math.min(40, rel + (d < 60 ? 0.8 : 0.15));
      mhfs = Math.max(450, mhfs - (d < 60 ? 5 : 1));
    }
    points.push({ day: d, adherence: +adh.toFixed(1), relapseProbability: +rel.toFixed(1), mhfs: Math.round(mhfs) });
  }
  return points;
}

export const DIGITAL_TWIN_SCENARIOS = {
  stop: {
    label: 'Arrêt du traitement',
    description: 'Simulation d\'un arrêt brutal — lithium 900mg/j. Rebond maniaque probable J21-J47.',
    relapseDay: 47,
    costIfRelapse: 18200,
    trajectory: generateTrajectory('stop'),
  },
  switch: {
    label: 'Switch moléculaire',
    description: 'Passage lithium → aripiprazole LAI. Creux d\'observance transitoire (6 semaines) puis stabilisation.',
    relapseDay: null,
    costIfRelapse: 0,
    trajectory: generateTrajectory('switch'),
  },
  reduction: {
    label: 'Réduction de dose',
    description: 'Réduction lithium 900→600mg/j. Dégradation lente, plateau sous-optimal à 6 mois.',
    relapseDay: null,
    costIfRelapse: 4500,
    trajectory: generateTrajectory('reduction'),
  },
};

// ---------------------------------------------------------------------------
// 10. POSOLOGY_HEATMAP — 7×24 probabilité de prise pour 3 patients-types
// ---------------------------------------------------------------------------
function generateHeatmap(profile: 'morning_dominant' | 'evening_dominant' | 'erratic') {
  const grid: number[][] = [];
  for (let day = 0; day < 7; day++) {
    const row: number[] = [];
    for (let hour = 0; hour < 24; hour++) {
      let prob = 0.02; // baseline
      if (profile === 'morning_dominant') {
        if (hour >= 7 && hour <= 9) prob = 0.85 + Math.random() * 0.10;
        else if (hour >= 12 && hour <= 14) prob = 0.15 + Math.random() * 0.15;
        else if (hour >= 20 && hour <= 22) prob = 0.75 + Math.random() * 0.10;
        // Weekend dip
        if (day >= 5 && hour >= 7 && hour <= 9) prob *= 0.7;
      } else if (profile === 'evening_dominant') {
        if (hour >= 7 && hour <= 9) prob = 0.30 + Math.random() * 0.15;
        else if (hour >= 20 && hour <= 23) prob = 0.90 + Math.random() * 0.08;
      } else { // erratic
        prob = 0.15 + Math.random() * 0.35;
        if (hour >= 2 && hour <= 5) prob = 0.02;
      }
      row.push(+prob.toFixed(2));
    }
    grid.push(row);
  }
  return grid;
}

export const POSOLOGY_HEATMAP = [
  { id: 'P-LI-01', label: 'Lithium BID — Patient discipliné matin', molecule: 'Lithium 450mg BID',         profile: 'morning_dominant' as const, grid: generateHeatmap('morning_dominant'), overallAdherence: 88, missedDoseRate: 12, recommendation: 'Maintenir schéma actuel. Observance excellente matin/soir. Trou midi non critique (monoprise possible).' },
  { id: 'P-QT-02', label: 'Quétiapine QHS — Patient sédation',      molecule: 'Quétiapine XR 300mg QHS',   profile: 'evening_dominant' as const, grid: generateHeatmap('evening_dominant'),  overallAdherence: 82, missedDoseRate: 18, recommendation: 'Prise vespérale confirmée à >90%. Matin faible — si biprise, concentrer sur le soir. Monoprise XR optimale.' },
  { id: 'P-VP-03', label: 'Valproate BID — Patient erratique',       molecule: 'Valproate 500mg BID',       profile: 'erratic' as const,          grid: generateHeatmap('erratic'),           overallAdherence: 45, missedDoseRate: 55, recommendation: 'Pattern chaotique. Recommandation : passage à VPA chrono 1000mg QHS + habit stacking soir + alarme NOOS.' },
];

// ---------------------------------------------------------------------------
// 11. FORENSICS_CASES — 10 cas de rechute avec timeline J-45 → J0
// ---------------------------------------------------------------------------
export const FORENSICS_CASES = [
  {
    id: 'P-892A', molecule: 'Lithium', pathology: 'Bipolaire', country: 'Maroc',
    dateRelapse: '2025-11-12', stableDuration: '14 mois', costHospitalization: 18200,
    cause: 'Épuisement aidant → retard intervention → rupture',
    timeline: [
      { day: -45, event: 'Aidant signale fatigue (EMA aidant : score 3/10)', severity: 'amber' },
      { day: -38, event: 'Entropie EMA patient 0.3 → 0.7 (seuil alerte = 0.6)', severity: 'amber' },
      { day: -30, event: 'Refill en retard de 3 jours — lithiémie non contrôlée', severity: 'amber' },
      { day: -25, event: 'Linguistic proof absent — patient ne nomme plus tremblements', severity: 'amber' },
      { day: -21, event: 'HMM transition 2→3 — ALERTE FRAGILISATION déclenchée', severity: 'red' },
      { day: -14, event: 'Intervention psychiatre — appel (délai 7j vs cible 48-72h)', severity: 'red' },
      { day: -7,  event: 'HMM transition 3→4 — RUPTURE CONFIRMÉE — arrêt lithium', severity: 'red' },
      { day: 0,   event: 'Réhospitalisation urgence — manie aiguë — Coût : €18,200', severity: 'critical' },
    ],
  },
  {
    id: 'P-441B', molecule: 'Aripiprazole', pathology: 'Schizophrénie', country: 'Sénégal',
    dateRelapse: '2025-10-04', stableDuration: '8 mois', costHospitalization: 12500,
    cause: 'Trou d\'observance estival — voyage familial sans médicament',
    timeline: [
      { day: -42, event: 'EMA régularité ↓ progressive (vacation pattern)', severity: 'amber' },
      { day: -35, event: 'Refill non renouvelé — pharmacie fermée (zone rurale)', severity: 'amber' },
      { day: -28, event: 'Patient voyage Casamance — hors réseau 12 jours', severity: 'amber' },
      { day: -21, event: 'Aucun signal NOOS pendant 14 jours — silence complet', severity: 'red' },
      { day: -14, event: 'Retour Dakar — EMA erratique, entropie 0.85', severity: 'red' },
      { day: -7,  event: 'HMM direct 1→3 (skip state 2) — décompensation rapide', severity: 'red' },
      { day: 0,   event: 'Hospitalisation Fann — épisode psychotique aigu — €12,500', severity: 'critical' },
    ],
  },
  {
    id: 'P-112C', molecule: 'Olanzapine', pathology: 'Schizophrénie', country: 'France',
    dateRelapse: '2025-09-21', stableDuration: '22 mois', costHospitalization: 21000,
    cause: 'Intolérance métabolique — prise de poids +18kg → arrêt patient',
    timeline: [
      { day: -45, event: 'Patient rapporte frustration poids +18kg (linguistic proof)', severity: 'amber' },
      { day: -38, event: 'EMA qualité vie ↓ 7/10 → 4/10 en 2 semaines', severity: 'amber' },
      { day: -30, event: 'Linguistic : "je ne supporte plus ce médicament"', severity: 'amber' },
      { day: -25, event: 'Refill en retard 5 jours — patient hésite à renouveler', severity: 'red' },
      { day: -18, event: 'Arrêt unilatéral olanzapine — HMM 1→2', severity: 'red' },
      { day: -10, event: 'Insomnie sévère (rebond) — HMM 2→3', severity: 'red' },
      { day: -4,  event: 'HMM 3→4 — symptômes positifs réémergents', severity: 'red' },
      { day: 0,   event: 'Hospitalisation Sainte-Anne Paris — €21,000', severity: 'critical' },
    ],
  },
  {
    id: 'P-992D', molecule: 'Quétiapine', pathology: 'Bipolaire', country: 'Allemagne',
    dateRelapse: '2025-09-05', stableDuration: '5 mois', costHospitalization: 9800,
    cause: 'Arrêt brutal lié à sédation diurne invalidante',
    timeline: [
      { day: -40, event: 'Patient rapporte sédation matinale persistante (EMA)', severity: 'amber' },
      { day: -30, event: 'Linguistic : "je m\'endors au travail, c\'est impossible"', severity: 'amber' },
      { day: -22, event: 'Réduction dose auto-administrée 300→150mg', severity: 'amber' },
      { day: -15, event: 'Arrêt total — rebond insomnie sévère', severity: 'red' },
      { day: -10, event: 'HMM 1→3 rapide — agitation, irritabilité croissante', severity: 'red' },
      { day: -5,  event: 'Épisode mixte débutant — urgences consultées', severity: 'red' },
      { day: 0,   event: 'Hospitalisation Berlin Charité — €9,800', severity: 'critical' },
    ],
  },
  {
    id: 'P-505E', molecule: 'Rispéridone', pathology: 'Schizophrénie', country: 'Kenya',
    dateRelapse: '2025-08-14', stableDuration: '11 mois', costHospitalization: 15300,
    cause: 'Facteur environnemental — Ramadan + chaleur → déshydratation',
    timeline: [
      { day: -42, event: 'Début Ramadan — modification horaires de prise', severity: 'amber' },
      { day: -35, event: 'Chaleur Mombasa 38°C + jeûne hydrique 14h', severity: 'amber' },
      { day: -28, event: 'EMA : fatigue extrême, concentration ↓', severity: 'amber' },
      { day: -21, event: 'Refill retardé 4 jours (pharmacie fermée Eid)', severity: 'red' },
      { day: -14, event: 'HMM 1→2→3 en 7 jours (transition accélérée)', severity: 'red' },
      { day: -7,  event: 'Symptômes positifs réémergents — hallucinations', severity: 'red' },
      { day: 0,   event: 'Hospitalisation Mombasa — €15,300 (équivalent KES)', severity: 'critical' },
    ],
  },
  {
    id: 'P-334F', molecule: 'Lamotrigine', pathology: 'Bipolaire', country: 'Belgique',
    dateRelapse: '2025-07-02', stableDuration: '18 mois', costHospitalization: 19100,
    cause: 'Interaction médicamenteuse — contraception orale initiée',
    timeline: [
      { day: -40, event: 'Patiente débute OCP (œstrogènes) — non signalé au psychiatre', severity: 'amber' },
      { day: -30, event: 'Concentration lamotrigine ↓50% (induction UGT1A4)', severity: 'amber' },
      { day: -21, event: 'Humeur instable, irritabilité (EMA score ↓)', severity: 'amber' },
      { day: -14, event: 'Episode dépressif mixte — PHQ-9 passe de 4 à 18', severity: 'red' },
      { day: -7,  event: 'HMM 2→4 direct — switch dépressif sévère', severity: 'red' },
      { day: -3,  event: 'Idéation suicidaire rapportée par aidant', severity: 'red' },
      { day: 0,   event: 'Hospitalisation Bruxelles — €19,100', severity: 'critical' },
    ],
  },
  {
    id: 'P-772G', molecule: 'Lithium', pathology: 'Bipolaire', country: 'Nigeria',
    dateRelapse: '2025-06-19', stableDuration: '9 mois', costHospitalization: 11200,
    cause: 'Toxicité rénale — AINS auto-médication + chaleur',
    timeline: [
      { day: -42, event: 'Saison sèche Lagos — T°>38°C pendant 3 semaines', severity: 'amber' },
      { day: -35, event: 'Patient prend ibuprofène (douleurs articulaires) — non signalé', severity: 'amber' },
      { day: -28, event: 'Lithiémie monte >1.5 mEq/L — tremblements majorés', severity: 'red' },
      { day: -21, event: 'Linguistic : "mes mains tremblent trop, j\'arrête le médicament"', severity: 'red' },
      { day: -14, event: 'Arrêt lithium — rebond maniaque en 10 jours', severity: 'red' },
      { day: -5,  event: 'HMM 1→4 en 9 jours — décompensation maniaque', severity: 'red' },
      { day: 0,   event: 'Hospitalisation Lagos University Hospital — €11,200 (NGN equiv.)', severity: 'critical' },
    ],
  },
  {
    id: 'P-221H', molecule: 'Aripiprazole', pathology: 'Bipolaire', country: 'Rwanda',
    dateRelapse: '2025-05-08', stableDuration: '31 mois', costHospitalization: 24500,
    cause: 'Stress aigu — deuil familial → arrêt médicament',
    timeline: [
      { day: -45, event: 'Décès parent proche — choc émotionnel majeur', severity: 'amber' },
      { day: -38, event: 'EMA : détresse émotionnelle 9/10, insomnie 5 nuits', severity: 'amber' },
      { day: -30, event: 'Patient cesse EMA quotidien — silence NOOS', severity: 'amber' },
      { day: -22, event: 'Refill non renouvelé — patient en deuil, pas de pharmacie', severity: 'red' },
      { day: -14, event: 'HMM 1→2 — fragilisation post-traumatique', severity: 'red' },
      { day: -7,  event: 'Épisode maniaque déclenché par privation de sommeil', severity: 'red' },
      { day: 0,   event: 'Hospitalisation Kigali — €24,500 (équivalent RWF)', severity: 'critical' },
    ],
  },
  {
    id: 'P-663I', molecule: 'Olanzapine', pathology: 'Schizophrénie', country: 'Côte d\'Ivoire',
    dateRelapse: '2025-04-22', stableDuration: '4 mois', costHospitalization: 8900,
    cause: 'Sédation diurne + stigmatisation → arrêt',
    timeline: [
      { day: -38, event: 'EMA : somnolence 8/10, patient dort >14h/jour', severity: 'amber' },
      { day: -30, event: 'Linguistic : "les voisins disent que je suis drogué"', severity: 'amber' },
      { day: -22, event: 'Patient réduit dose olanzapine de moitié (auto-ajustement)', severity: 'amber' },
      { day: -15, event: 'Arrêt total — insomnie rebond + agitation', severity: 'red' },
      { day: -10, event: 'HMM 2→3 — symptômes négatifs persistants + positifs émergents', severity: 'red' },
      { day: -4,  event: 'Errance nocturne — police contactée par famille', severity: 'red' },
      { day: 0,   event: 'Hospitalisation CHU Cocody Abidjan — €8,900 (XOF equiv.)', severity: 'critical' },
    ],
  },
  {
    id: 'P-884J', molecule: 'Quétiapine', pathology: 'Dépression', country: 'Espagne',
    dateRelapse: '2025-03-11', stableDuration: '16 mois', costHospitalization: 16000,
    cause: 'Oubli répété — pas de stratégie d\'ancrage → rechute dépressive',
    timeline: [
      { day: -45, event: 'Streak NOOS rompu après 210 jours — 1er oubli', severity: 'amber' },
      { day: -38, event: 'Oublis 3x/semaine — entropie EMA ↑ progressive', severity: 'amber' },
      { day: -30, event: 'Circadien : décalage heure de coucher +2h en 2 semaines', severity: 'amber' },
      { day: -21, event: 'PHQ-9 passe de 5 à 12 — seuil clinique dépassé', severity: 'red' },
      { day: -14, event: 'HMM 1→2→3 — patient ne répond plus aux EMA', severity: 'red' },
      { day: -7,  event: 'Anhédonie complète, retrait social, absentéisme', severity: 'red' },
      { day: 0,   event: 'Hospitalisation Barcelona — épisode dépressif sévère — €16,000', severity: 'critical' },
    ],
  },
];

// ---------------------------------------------------------------------------
// 12. MYNE_INCENTIVE — 5 scénarios de simulation économique
// ---------------------------------------------------------------------------
export const MYNE_INCENTIVE = [
  {
    scenarioName: 'Pilot Maroc (Lithium)',
    patients: 100, molecule: 'Lithium', signals: 3, pricePerProfile: 12,
    pgxEnriched: false, twinEnriched: false,
    revenueGross: 3600, patientShare53: 1908, systemShare: 1692,
    aelyaFee: 677, burhanFee: 508, eigenNet: 507,
    savingsPerPatient: 2400, totalSavings: 240000, roi: '66:1',
  },
  {
    scenarioName: 'Scale Sénégal (Multi-molécule)',
    patients: 5000, molecule: 'Multi', signals: 4, pricePerProfile: 15,
    pgxEnriched: false, twinEnriched: true,
    revenueGross: 300000, patientShare53: 159000, systemShare: 141000,
    aelyaFee: 56400, burhanFee: 42300, eigenNet: 42300,
    savingsPerPatient: 1800, totalSavings: 9000000, roi: '30:1',
  },
  {
    scenarioName: 'Corridor EU-Afrique (Schizophrénie LAI)',
    patients: 50000, molecule: 'Rispéridone LAI', signals: 5, pricePerProfile: 25,
    pgxEnriched: true, twinEnriched: true,
    revenueGross: 6250000, patientShare53: 3312500, systemShare: 2937500,
    aelyaFee: 1175000, burhanFee: 881250, eigenNet: 881250,
    savingsPerPatient: 3200, totalSavings: 160000000, roi: '25:1',
  },
  {
    scenarioName: 'Full Corridor (All pathologies)',
    patients: 200000, molecule: 'All', signals: 6, pricePerProfile: 18,
    pgxEnriched: true, twinEnriched: true,
    revenueGross: 21600000, patientShare53: 11448000, systemShare: 10152000,
    aelyaFee: 4060800, burhanFee: 3045600, eigenNet: 3045600,
    savingsPerPatient: 2800, totalSavings: 560000000, roi: '26:1',
  },
  {
    scenarioName: 'Vision 2030 (500K patients)',
    patients: 500000, molecule: 'All + PGx', signals: 6, pricePerProfile: 22,
    pgxEnriched: true, twinEnriched: true,
    revenueGross: 66000000, patientShare53: 34980000, systemShare: 31020000,
    aelyaFee: 12408000, burhanFee: 9306000, eigenNet: 9306000,
    savingsPerPatient: 3500, totalSavings: 1750000000, roi: '27:1',
  },
];

// ---------------------------------------------------------------------------
// 13. MHFS_COMPONENTS — 6 composantes du Mental Health Financial Score
// ---------------------------------------------------------------------------
export const MHFS_COMPONENTS = [
  { component: 'financial_flux',       weight: 0.25, label: 'Flux Financiers',          description: 'Régularité des transactions liées à la santé (pharmacie, consultations, transports médicaux). Proxy de l\'engagement dans le parcours de soin.', dataSource: 'MYNε Wallet + Open Banking', calculationMethod: 'Ratio transactions santé / transactions totales × régularité (CV<0.3 = bonus)', minDataMonths: 3, defaultScore: 85 },
  { component: 'adherence_pattern',    weight: 0.25, label: 'Pattern d\'Observance',    description: 'Score composite de régularité des prises (refill timing, EMA completion, streak length). Corrèle à r=0.78 avec taux plasmatique.', dataSource: 'NOOS Signals (refill + EMA + circadian)', calculationMethod: 'Weighted mean: refill_timeliness (40%) + ema_completion (35%) + streak_days (25%)', minDataMonths: 1, defaultScore: 60 },
  { component: 'hmm_stability',        weight: 0.20, label: 'Stabilité HMM',            description: 'Durée dans l\'état HMM 1 (observance nominale). Transitions 1→2+ pénalisent le score exponentiellement.', dataSource: 'NOOS HMM Engine', calculationMethod: 'days_in_state1 / total_days × (1 - transition_penalty^transitions_count)', minDataMonths: 2, defaultScore: 70 },
  { component: 'ema_quality',          weight: 0.15, label: 'Qualité EMA',              description: 'Qualité et richesse des auto-évaluations. Réponses détaillées = meilleure calibration du modèle = meilleur score.', dataSource: 'NOOS EMA Engine', calculationMethod: 'completion_rate × response_depth_index × consistency_score', minDataMonths: 1, defaultScore: 90 },
  { component: 'outcome_correlation',  weight: 0.10, label: 'Corrélation Outcomes',     description: 'Corrélation entre les signaux NOOS et les outcomes cliniques réels (hospitalisation, rechute, ajustement posologique).', dataSource: 'EHR Integration + NOOS Signals', calculationMethod: 'Pearson r between NOOS_predicted_risk and actual_clinical_events (6-month rolling)', minDataMonths: 6, defaultScore: 40 },
  { component: 'caregiver_state',      weight: 0.05, label: 'État de l\'Aidant',        description: 'Score de bien-être de l\'aidant principal. Épuisement aidant = prédicteur fort de rechute patient (OR=3.2).', dataSource: 'NOOS Caregiver EMA', calculationMethod: 'caregiver_ema_mean × (1 - burnout_index) × availability_score', minDataMonths: 1, defaultScore: 50 },
];

// ---------------------------------------------------------------------------
// 14. ALERTS_FEED — 50 alertes simulées
// ---------------------------------------------------------------------------
const ALERT_TYPES = [
  { type: 'fragilisation', label: '⚠ FRAGILISATION', severity: 'amber' as const },
  { type: 'rupture',       label: '🔴 RUPTURE',       severity: 'red' as const },
  { type: 'refill_retard', label: '⏰ REFILL RETARD', severity: 'amber' as const },
  { type: 'aidant_fatigue', label: '💛 AIDANT FATIGUÉ', severity: 'amber' as const },
  { type: 'entropy_spike', label: '📊 ENTROPIE ↑',    severity: 'amber' as const },
  { type: 'hmm_transition', label: '🔄 HMM SHIFT',    severity: 'red' as const },
];

const ALERT_CITIES: Record<string, string[]> = {
  Maroc: ['Rabat','Casablanca','Marrakech','Fès','Tanger'],
  Sénégal: ['Dakar','Saint-Louis','Thiès','Ziguinchor'],
  France: ['Paris','Lyon','Marseille','Toulouse','Bordeaux'],
  Allemagne: ['Berlin','Munich','Hambourg','Francfort'],
  Nigeria: ['Lagos','Abuja','Kano'],
  Kenya: ['Nairobi','Mombasa'],
  'Côte d\'Ivoire': ['Abidjan','Yamoussoukro'],
  Rwanda: ['Kigali'],
};

export const ALERTS_FEED = Array.from({ length: 50 }, (_, i) => {
  const alertDef = ALERT_TYPES[i % ALERT_TYPES.length];
  const countryKeys = Object.keys(ALERT_CITIES);
  const country = countryKeys[i % countryKeys.length];
  const cities = ALERT_CITIES[country];
  const city = cities[i % cities.length];
  const mol = CONTAGION_MOLECULES[i % CONTAGION_MOLECULES.length];
  const minutesAgo = Math.round(i * 28 + Math.random() * 15); // spread over ~24h
  const hoursAgo = Math.floor(minutesAgo / 60);
  const timeLabel = hoursAgo < 1 ? `Il y a ${minutesAgo}min` : `Il y a ${hoursAgo}h`;

  return {
    id: `ALR-${String(4000 + i)}`,
    patientId: `P-${String(100 + i).slice(0)}${String.fromCharCode(65 + (i % 26))}`,
    molecule: mol,
    country,
    city,
    type: alertDef.type,
    label: alertDef.label,
    severity: alertDef.severity,
    timestamp: new Date(Date.now() - minutesAgo * 60000).toISOString(),
    timeLabel,
    detail: alertDef.type === 'rupture' ? `HMM transition 3→4 confirmée. Refill en retard ${2 + (i % 8)}j.`
          : alertDef.type === 'fragilisation' ? `HMM transition ${1 + (i % 2)}→${2 + (i % 2)}. Entropie EMA ↑${(0.3 + (i % 5) * 0.1).toFixed(1)}.`
          : alertDef.type === 'refill_retard' ? `Renouvellement en retard de ${2 + (i % 6)} jours. Pharmacie ${city}.`
          : alertDef.type === 'aidant_fatigue' ? `Score aidant EMA : ${2 + (i % 4)}/10. Burnout index ${50 + (i % 30)}%.`
          : alertDef.type === 'entropy_spike' ? `Entropie EMA passe de ${(0.2 + (i%3)*0.1).toFixed(1)} à ${(0.6 + (i%4)*0.1).toFixed(1)} en ${3 + (i%5)}j.`
          : `Transition HMM ${1 + (i%3)}→${2 + (i%3)}. Signal ${['EMA','refill','circadian'][i%3]} dominant.`,
  };
});

// ---------------------------------------------------------------------------
// LEGACY COMPAT — Re-export as MOCK_OBSERVANCE_DATA for existing components
// ---------------------------------------------------------------------------
export const MOCK_OBSERVANCE_DATA = {
  dashboard: {
    activePatients: VITALS_DATA.activePatients,
    averageObservance: VITALS_DATA.averageObservance,
    ruptureAlerts24h: VITALS_DATA.ruptureAlerts24h,
    hmmState4Count: VITALS_DATA.hmmState4Count,
    myneDataValue: VITALS_DATA.myneDataValue24h,
    avgMhfs: VITALS_DATA.avgMhfs,
  },
  recentAlerts: ALERTS_FEED.slice(0, 4).map(a => ({
    id: a.patientId.replace('P-', ''),
    patient: `Patient #${a.patientId.replace('P-', '')}`,
    molecule: a.molecule,
    shift: a.detail.substring(0, 25),
    location: a.city,
    time: a.timeLabel,
    alert: a.label,
    severity: a.severity,
  })),
  moleculeAggregates: [
    { molecule: 'Lithium',      activePatients: 4500, observance: 52, alerts24h: 85,  hmm: [45, 25, 18, 12], mhfs: 640 },
    { molecule: 'Clozapine',    activePatients: 2100, observance: 68, alerts24h: 25,  hmm: [60, 20, 12, 8],  mhfs: 720 },
    { molecule: 'Valproate',    activePatients: 3200, observance: 55, alerts24h: 72,  hmm: [42, 28, 18, 12], mhfs: 580 },
    { molecule: 'Aripiprazole', activePatients: 2800, observance: 58, alerts24h: 56,  hmm: [48, 25, 17, 10], mhfs: 620 },
    { molecule: 'Rispéridone',  activePatients: 1650, observance: 42, alerts24h: 114, hmm: [35, 28, 22, 15], mhfs: 510 },
  ],
  environmentalFactors: ENVIRONMENTAL_CORRECTIONS.slice(0, 3).map(e => ({
    molecule: e.molecule,
    factor: e.factorType === 'temperature' ? 'Chaleur Extrême' : e.factorType === 'photoperiod' ? 'Photopériode' : e.factorType === 'ramadan' ? 'Ramadan' : e.factorType,
    country: e.country,
    multiplier: `${e.riskMultiplier}x`,
    adjustment: `${Math.round(e.threshold * 100)}%`,
    season: e.season,
    source: e.evidence.split('(')[1]?.replace(')', '') || 'Littérature',
  })),
  habitProfiles: HABIT_LEVERS.filter((_, i) => i % 5 === 0).map(h => ({
    profile: h.profile,
    strategy: h.leverName,
    expectedEffect: `d=${h.effectSize.toFixed(2)}`,
  })),
  dyads: CAREGIVER_DYADS.map(d => ({
    id: d.id,
    patientHMM: d.patientHMM,
    caregiverExt: d.caregiverState,
    delay: d.delayToIntervention,
    correlation: d.correlation,
  })),
};
