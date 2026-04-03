const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// ─── Load .env.local ───────────────────────────────────────────────────────────
const envPath = path.join(__dirname, '..', '.env.local');
let envData;
try { envData = fs.readFileSync(envPath, 'utf8'); } catch {
  console.error('Missing .env.local — run from raqib-v4 root');
  process.exit(1);
}
const env = {};
envData.split('\n').forEach(l => {
  if (l && !l.startsWith('#') && l.includes('=')) {
    const [k, ...v] = l.split('=');
    env[k.trim()] = v.join('=').trim();
  }
});
const URL = env.NEXT_PUBLIC_SUPABASE_URL;
const KEY = env.SUPABASE_SERVICE_ROLE_KEY || env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
if (!URL || !KEY) { console.error('Missing Supabase keys in .env.local'); process.exit(1); }
const supabase = createClient(URL, KEY);

// ─── Helper: load JSON or skip ─────────────────────────────────────────────────
function loadJson(file) {
  const p = path.join(__dirname, '..', 'src', 'data', 'observance', file);
  if (!fs.existsSync(p)) { console.log(`  SKIP: fichier non trouvé → ${file}`); return null; }
  return JSON.parse(fs.readFileSync(p, 'utf8'));
}

// ─── Upsert helper ─────────────────────────────────────────────────────────────
async function upsert(table, rows, matchColumn) {
  if (!rows || rows.length === 0) { console.log(`  → ${table}: aucune ligne`); return 0; }
  const { error } = await supabase
    .from(table)
    .upsert(rows, { onConflict: matchColumn, ignoreDuplicates: false });
  if (error) {
    console.error(`  ✗ ${table}: ${error.message}`);
    return 0;
  }
  console.log(`  ✓ ${table}: ${rows.length} lignes upsertées`);
  return rows.length;
}

// ─── 1. obs_patients_aggregate ← epidemiology-seed.json ───────────────────────
// Country-level epidemiology: 1 row per country×pathology
async function seedEpidemiology() {
  const data = loadJson('epidemiology-seed.json');
  if (!data) return;
  const countries = Array.isArray(data) ? data : (data.countries || []);
  const pathologies = ['bipolar', 'schizophrenia', 'depression', 'adhd', 'ptsd'];
  const rows = [];
  countries.forEach(c => {
    pathologies.forEach(p => {
      const patKey   = `${p}_patients`;          // e.g. bipolar_patients
      const adhrKey  = `adherence_rate_${p}`;    // e.g. adherence_rate_bipolar
      const count    = c[patKey] ?? c[`${p}_patient_count`] ?? null;
      const adherence = c[adhrKey] ?? null;
      rows.push({
        country:                 c.country,
        pathology:               p,
        patient_count:           typeof count === 'string' ? parseInt(count.replace(/[^0-9]/g, '')) || null : count,
        adherence_rate:          adherence,
        psychiatrists_per_100k:  c.psychiatrists_per_100k ?? null,
        smartphone_penetration:  c.smartphone_penetration ?? null,
        tam_observance_eur:      c.tam_observance_eur ?? null,
        sources:                 c.sources ? (typeof c.sources === 'object' ? JSON.stringify(c.sources) : c.sources) : null,
      });
    });
  });
  await upsert('obs_patients_aggregate', rows, 'country,pathology');
}

// ─── 2. obs_molecule_signal_matrix ← molecule-signal-seed.json ────────────────
// matrice_khadija: {metadata, lithium: {signal_1_ema_longitudinal: {...}, ...}, ...}
async function seedMoleculeSignal() {
  const data = loadJson('molecule-signal-seed.json');
  if (!data) return;

  const metadata = data.metadata || {};
  const moleculeNames = (metadata.molecules || []).filter(m => data[m]);

  const signalTypeMap = {
    signal_1_ema_longitudinal:       'ema',
    signal_2_prescription_renewal:   'refill',
    signal_3_circadian_activity:     'circadian',
    signal_4_ema_entropy:            'entropy',
    signal_5_linguistic_proof_ingestion: 'linguistic_proof',
    signal_6_environmental_raqib:    'environmental',
  };

  const moleculeClassMap = {
    lithium: 'mood_stabilizer', valproate: 'mood_stabilizer', lamotrigine: 'mood_stabilizer',
    clozapine: 'antipsychotic', risperidone: 'antipsychotic', aripiprazole: 'antipsychotic',
    quetiapine: 'antipsychotic', olanzapine: 'antipsychotic',
    sertraline: 'antidepressant', fluoxetine: 'antidepressant',
    methylphenidate: 'stimulant', atomoxetine: 'nonstimulant_adhd',
  };

  const rows = [];
  moleculeNames.forEach(mol => {
    const molData = data[mol];
    if (!molData) return;
    Object.entries(signalTypeMap).forEach(([signalKey, signalType]) => {
      const sig = molData[signalKey];
      if (!sig) return;
      // applicable: 'oui'→'yes', 'partiel'→'partial', 'non'→'no'
      const appMap = { oui: 'yes', yes: 'yes', partiel: 'partial', partial: 'partial', non: 'no', no: 'no' };
      const strMap = { haute: 'high', high: 'high', moyenne: 'medium', medium: 'medium', faible: 'low', low: 'low' };
      rows.push({
        molecule:            mol,
        molecule_class:      moleculeClassMap[mol] || null,
        signal_type:         signalType,
        applicable:          appMap[(sig.applicable || '').toLowerCase()] || null,
        discriminant_strength: strMap[(sig.discriminant_strength || '').toLowerCase()] || null,
        detection_latency:   sig.detection_latency ?? null,
        reference:           sig.reference ?? null,
        details:             sig.details ? { text: sig.details } : null,
      });
    });
  });
  await upsert('obs_molecule_signal_matrix', rows, 'molecule,signal_type');
}

// ─── 3. obs_environmental_corrections ← molecule-signal-seed.json (signal_6) ──
// Extract environmental factors from signal_6 of each molecule
async function seedEnvironmental() {
  const data = loadJson('molecule-signal-seed.json');
  if (!data) return;

  const metadata = data.metadata || {};
  const moleculeNames = (metadata.molecules || []).filter(m => data[m]);

  // Common environmental factor keywords to extract
  const factorPatterns = [
    { type: 'temperature', keywords: ['chaleur', 'heat', 'temperature', 'déshydrat', 'dehydrat'] },
    { type: 'ramadan',     keywords: ['ramadan', 'jeûne', 'fasting'] },
    { type: 'photoperiod', keywords: ['photoperiod', 'lumière', 'light', 'saison', 'season', 'été', 'hiver'] },
    { type: 'humidity',    keywords: ['humidité', 'humidity', 'tropical'] },
    { type: 'altitude',    keywords: ['altitude', 'pression', 'pressure'] },
    { type: 'pollution',   keywords: ['pollution', 'air quality'] },
  ];

  const rows = [];
  const seen = new Set();

  moleculeNames.forEach(mol => {
    const sig6 = data[mol]?.signal_6_environmental_raqib;
    if (!sig6 || sig6.applicable === 'non') return;

    const details = (sig6.details || '').toUpperCase();

    factorPatterns.forEach(({ type, keywords }) => {
      const matches = keywords.some(kw => details.toUpperCase().includes(kw.toUpperCase()));
      if (!matches) return;

      const key = `${mol}|${type}|global`;
      if (seen.has(key)) return;
      seen.add(key);

      rows.push({
        molecule:     mol,
        factor_type:  type,
        country:      'global',
        evidence:     sig6.details ? sig6.details.substring(0, 500) : null,
        source:       sig6.reference ?? null,
      });
    });
  });

  await upsert('obs_environmental_corrections', rows, 'molecule,factor_type,country');
}

// ─── 4. obs_habit_levers ← habits-seed.json ───────────────────────────────────
async function seedHabits() {
  const data = loadJson('habits-seed.json');
  if (!data) return;
  const leviers = data.leviers || [];

  const leverIdMap = {
    1: 'implementation_intention',
    2: 'habit_stacking',
    3: 'variable_reward',
    4: 'identity_narrative',
    5: 'social_pressure',
    'implementation_intention': 'implementation_intention',
    'habit_stacking': 'habit_stacking',
    'variable_reward': 'variable_reward',
    'identity_narrative': 'identity_narrative',
    'social_pressure': 'social_pressure',
  };

  const rows = leviers.map(l => {
    const fondement = l.A_fondement_scientifique || {};
    const metaRef   = fondement.meta_analyses?.[0]?.reference || fondement.reference || null;
    const effectSize = fondement.meta_analyses?.[0]?.effect_size || fondement.effect_size || null;
    const n = fondement.meta_analyses?.[0]?.n || fondement.sample_size || null;

    const appNoos = l.C_application_NOOS ? JSON.stringify(l.C_application_NOOS) : null;

    const profiles = l.D_profils_cognitifs || {};
    const getProfile = (key) => {
      const keys = Object.keys(profiles).find(k => k.toLowerCase().includes(key));
      if (!keys) return null;
      const p = profiles[keys];
      return typeof p === 'object' ? JSON.stringify(p) : p;
    };

    const leverId = leverIdMap[l.id] || leverIdMap[l.lever_id] || null;

    return {
      lever_name:             l.nom || l.name || l.lever_name,
      lever_id:               leverId,
      meta_analysis_reference: metaRef,
      effect_size:            effectSize,
      sample_size:            typeof n === 'string' ? parseInt(n.replace(/[^0-9]/g,'')) || null : n,
      application_noos:       appNoos,
      profile_anxious:        getProfile('anxieux') || getProfile('anxiety'),
      profile_negligent:      getProfile('négligent') || getProfile('negligent'),
      profile_contestataire:  getProfile('contestat'),
      profile_anosognosic:    getProfile('anosogno'),
      profile_contextual:     getProfile('contextu'),
    };
  }).filter(r => r.lever_id);

  await upsert('obs_habit_levers', rows, 'lever_id');
}

// ─── 5. obs_competitors ← competitors-seed.json ───────────────────────────────
async function seedCompetitors() {
  const data = loadJson('competitors-seed.json');
  if (!data) return;
  const comps = data.concurrents || data.competitors || [];

  const statusMap = {
    'actif': 'active', 'active': 'active',
    'mort': 'dead', 'dead': 'dead', 'fermé': 'dead',
    'acquis': 'acquired', 'acquired': 'acquired',
    'pivoté': 'pivoted', 'pivoted': 'pivoted',
  };

  const rows = comps.map(c => {
    const evidence = c.evidence_clinique;
    const evidenceStr = typeof evidence === 'object' && evidence !== null
      ? Object.values(evidence).filter(Boolean).join(' | ')
      : (evidence ?? null);

    const rawStatus = (c.statut || c.status || '').toLowerCase();
    const status = statusMap[rawStatus] || (rawStatus ? 'active' : null);

    return {
      name:             c.nom || c.name,
      country:          c.pays || c.country,
      founded:          parseInt(c.annee_creation ?? c.founded) || null,
      funding:          c.funding_total ?? c.funding,
      pathology_target: c.pathologie_cible ?? c.pathology_target,
      technology:       c.technologie ?? c.technology,
      model:            c.modele_business ?? c.model,
      clinical_evidence: evidenceStr,
      africa_corridor:  c.corridor_afrique ?? c.africa_corridor,
      data_monetization: c.monetisation_donnees_rwe ?? c.data_monetization,
      fiduciary_agent:  c.agent_fiduciaire_patient ?? c.fiduciary_agent,
      revenue_model:    c.revenue_model,
      status:           status,
      failure_reason:   c.facteur_echec_si_mort ?? c.failure_reason,
      noos_advantage:   c.pourquoi_noos_burhan_superieur ?? c.noos_advantage,
      segment:          c.segment,
    };
  });

  await upsert('obs_competitors', rows, 'name');
}

// ─── 6. obs_rwe_pricing ← rwe-seed.json ───────────────────────────────────────
async function seedRwe() {
  const data = loadJson('rwe-seed.json');
  if (!data) return;
  const categories = data.categories || [];

  const rows = categories.map(c => {
    const producer = c.producteur;
    const producerStr = typeof producer === 'object' && producer !== null
      ? Object.values(producer).filter(Boolean).join(' / ')
      : (producer ?? null);

    const buyers = c.acheteur_primaire || {};
    const buyerStr = typeof buyers === 'object'
      ? Object.values(buyers).filter(Boolean).join(', ')
      : (buyers ?? null);

    const priceActuel = c.prix_marche_actuel;
    const priceMyne   = c.prix_enrichi_myne;

    const parsePrice = (p) => {
      if (!p) return null;
      if (typeof p === 'number') return p;
      // e.g. "€8-15/profil/mois" → take first number
      const m = String(p).match(/[\d.]+/);
      return m ? parseFloat(m[0]) : null;
    };

    const revenus = c.revenus_myne_estimes || {};
    const rev3y   = revenus.revenu_3ans_eur ?? null;
    const rev1y   = revenus.revenu_annuel_eur ?? null;

    const parseNum = (v) => {
      if (v == null) return null;
      if (typeof v === 'number') return v;
      return parseFloat(String(v).replace(/[^0-9.]/g, '')) || null;
    };

    const vol = c.volume_estime_3ans;
    const volNum = typeof vol === 'object' ? null : parseNum(vol);

    return {
      data_category:          c.nom || c.name,
      description:            c.description ?? null,
      producer:               producerStr,
      buyer:                  buyerStr,
      buyer_persona:          c.buyer_persona ?? null,
      price_per_profile_month: parsePrice(priceActuel),
      price_premium_enriched: parsePrice(priceMyne),
      volume_corridor_3y:     volNum,
      regulation:             c.reglementation ?? c.regulation ?? null,
      t_level_minimum:        c.t_level_aelya_minimum ?? c.t_level_minimum ?? null,
      myne_revenue_estimate:  parseNum(rev1y),
      myne_revenue_3y:        parseNum(rev3y),
    };
  });

  await upsert('obs_rwe_pricing', rows, 'data_category');
}

// ─── 7. obs_regulations ← regulations-seed.json ───────────────────────────────
async function seedRegulations() {
  const data = loadJson('regulations-seed.json');
  if (!data) return;
  const regs = data.regulations || data.reglementations || [];

  const rows = regs.map(r => {
    const maxSanction = r.max_sanction ?? r.max_penalty ?? r.sanctions_maximales;
    const sanctionStr = typeof maxSanction === 'object' && maxSanction !== null
      ? JSON.stringify(maxSanction) : (maxSanction ?? null);

    const articles = r.proof_certification_transparency_requirements ?? r.key_articles ?? r.articles_pertinents;
    const articlesStr = typeof articles === 'object' && articles !== null
      ? JSON.stringify(articles) : (articles ?? null);

    return {
      name:                r.full_name ?? r.nom_complet ?? r.name,
      jurisdiction:        r.jurisdiction ?? r.juridiction ?? null,
      effective_date:      r.entry_into_force ?? r.effective_date ?? r.date_entree_vigueur ?? null,
      impact_noos:         r.noos_role_health ?? r.impact_noos ?? null,
      impact_burhan:       r.burhan_role_eigen_product ?? r.impact_burhan ?? null,
      impact_myne:         r.aelya_role_consent_mechanism ?? r.impact_myne ?? null,
      key_articles:        articlesStr,
      max_penalty:         sanctionStr,
      eigen_opportunity:   r.burhan_revenue_trigger ?? r.eigen_opportunity ?? null,
      status:              r.statut_implementation ?? r.status ?? null,
      forcing_function_score: r.forcing_function_score ?? null,
    };
  });

  await upsert('obs_regulations', rows, 'name');
}

// ─── 8. obs_adherence_indices ← indices-seed.json ─────────────────────────────
async function seedIndices() {
  const data = loadJson('indices-seed.json');
  if (!data) return;

  // Merge all 4 categories into one list
  const allIndices = [
    ...(data.categorie_1_observance || []),
    ...(data.categorie_2_qualite_soins_psychiatriques || []),
    ...(data.categorie_3_systemes_sante_mentale || []),
    ...(data.categorie_4_digital_health || []),
    ...(data.indices || []),
  ];

  const rows = allIndices.map(i => {
    const methodo = i.methodologie ?? i.methodology;
    const methodoStr = typeof methodo === 'object' && methodo !== null
      ? JSON.stringify(methodo) : (methodo ?? null);

    const forces = i.forces ?? i.strengths;
    const forcesStr = typeof forces === 'object' && forces !== null
      ? (Array.isArray(forces) ? forces.join(' | ') : JSON.stringify(forces))
      : (forces ?? null);

    const limites = i.limites ?? i.limitations;
    const limitesStr = typeof limites === 'object' && limites !== null
      ? (Array.isArray(limites) ? limites.join(' | ') : JSON.stringify(limites))
      : (limites ?? null);

    const appPsy = i.application_psychiatrie ?? i.application_psychiatry;
    const noosCpl = i.amelioration_noos ?? i.automatisation_noos ?? i.noos_complement;
    const noosCplStr = typeof noosCpl === 'object' && noosCpl !== null
      ? JSON.stringify(noosCpl) : (noosCpl ?? null);

    return {
      index_name:          i.nom_complet ?? i.index_name ?? i.nom,
      organization:        i.organisme_emetteur ?? i.organization ?? null,
      frequency:           i.frequence_publication ?? i.frequence ?? i.frequency ?? null,
      methodology:         methodoStr,
      psychiatry_specific: true,
      noos_automates:      !!(i.automatisation_noos),
      strengths:           forcesStr,
      limitations:         limitesStr,
      noos_complement:     noosCplStr,
      application_psychiatry: appPsy ? (typeof appPsy === 'object' ? appPsy : { text: appPsy }) : null,
    };
  }).filter(r => r.index_name);

  // Deduplicate by index_name
  const seen = new Set();
  const unique = rows.filter(r => {
    if (seen.has(r.index_name)) return false;
    seen.add(r.index_name);
    return true;
  });

  await upsert('obs_adherence_indices', unique, 'index_name');
}

// ─── 9. obs_mhfs_scoring ← mhfs-seed.json (SKIP if absent) ───────────────────
async function seedMhfs() {
  const data = loadJson('mhfs-seed.json');
  if (!data) return;
  const components = data.components || data.composants || [];
  const rows = components.map(c => ({
    component:          c.component ?? c.composant,
    weight:             c.weight ?? c.poids ?? null,
    description:        c.description ?? null,
    data_source:        c.data_source ?? c.source_donnee ?? null,
    calculation_method: c.calculation_method ?? c.methode_calcul ?? null,
    min_data_months:    c.min_data_months ?? c.mois_minimum ?? null,
  })).filter(r => r.component);
  await upsert('obs_mhfs_scoring', rows, 'component');
}

// ─── 10. obs_myne_incentive_sim ← incentive-seed.json (SKIP if absent) ────────
async function seedIncentive() {
  const data = loadJson('incentive-seed.json');
  if (!data) return;
  const scenarios = data.scenarios || data.simulations || [];
  const rows = scenarios.map(s => ({
    scenario_name:         s.scenario_name ?? s.nom_scenario,
    molecule:              s.molecule ?? null,
    patient_count:         s.patient_count ?? s.nombre_patients ?? null,
    signals_shared:        s.signals_shared ?? s.signaux_partages ?? null,
    price_per_profile_month: s.price_per_profile_month ?? s.prix_profil_mois ?? null,
    patient_share_pct:     s.patient_share_pct ?? s.part_patient_pct ?? 53,
    patient_revenue_month: s.patient_revenue_month ?? null,
    buyer_types:           s.buyer_types ?? null,
    corridor_total_annual: s.corridor_total_annual ?? null,
    system_savings_annual: s.system_savings_annual ?? null,
  })).filter(r => r.scenario_name);
  await upsert('obs_myne_incentive_sim', rows, 'scenario_name');
}

// ─── Main ──────────────────────────────────────────────────────────────────────
async function main() {
  console.log('\n🌱  Seeding Intelligence Observance tables...\n');

  await seedEpidemiology();   // obs_patients_aggregate
  await seedMoleculeSignal(); // obs_molecule_signal_matrix
  await seedEnvironmental();  // obs_environmental_corrections
  await seedHabits();         // obs_habit_levers
  await seedCompetitors();    // obs_competitors
  await seedRwe();            // obs_rwe_pricing
  await seedRegulations();    // obs_regulations
  await seedIndices();        // obs_adherence_indices
  await seedMhfs();           // obs_mhfs_scoring
  await seedIncentive();      // obs_myne_incentive_sim

  // ─── Count per table ─────────────────────────────────────────────────────────
  console.log('\n📊  Counts per table:');
  const tables = [
    'obs_patients_aggregate',
    'obs_molecule_signal_matrix',
    'obs_environmental_corrections',
    'obs_habit_levers',
    'obs_competitors',
    'obs_rwe_pricing',
    'obs_regulations',
    'obs_adherence_indices',
    'obs_mhfs_scoring',
    'obs_myne_incentive_sim',
  ];
  for (const t of tables) {
    const { count, error } = await supabase
      .from(t)
      .select('*', { count: 'exact', head: true });
    if (error) console.log(`  ${t}: ERROR - ${error.message}`);
    else console.log(`  ${t}: ${count} rows`);
  }

  console.log('\n✅  Seed complete.\n');
}

main().catch(console.error);
