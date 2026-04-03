const fs   = require('fs');
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
const KEY = env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL || !KEY) { console.error('Missing Supabase keys in .env.local'); process.exit(1); }
const supabase = createClient(URL, KEY);

// ─── Helper: load JSON or skip ─────────────────────────────────────────────────
function loadJson(file) {
  const p = path.join(__dirname, '..', 'src', 'data', 'confiance', file);
  if (!fs.existsSync(p)) { console.log(`SKIP: fichier non trouvé → ${file}`); return null; }
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

// ─── 1. conf_trust_deficit ← deficit-seed.json ────────────────────────────────
async function seedDeficit() {
  const data = loadJson('deficit-seed.json');
  if (!data) return;
  const countries = data.countries || [];
  const rows = countries.map(c => ({
    code:                       c.code,
    country:                    c.country,
    detected_fraud_eur:         c.detected_fraud_eur,
    detection_rate:             c.detection_rate,
    estimated_total_fraud_eur:  c.estimated_total_fraud_eur,
    annual_audit_spend_eur:     c.annual_audit_spend_eur,
    certifiable_entities:       c.certifiable_entities ? JSON.stringify(c.certifiable_entities) : null,
    trust_score_composite:      c.trust_score_composite,
    trust_arbitrage_gap:        c.trust_arbitrage_gap,
    burhan_tam_eur:             c.burhan_tam_eur,
    fraud_breakdown:            c.fraud_breakdown ? JSON.stringify(c.fraud_breakdown) : null,
    sources:                    c.sources ?? null,
    notes:                      c.notes ?? null,
  }));
  await upsert('conf_trust_deficit', rows, 'code');
}

// ─── 2. conf_sector_trust ← sectors-seed.json ─────────────────────────────────
async function seedSectors() {
  const data = loadJson('sectors-seed.json');
  if (!data) return;
  const sectors = Array.isArray(data) ? data : (data.sectors || []);
  const rows = sectors.map(s => ({
    sector:                   s.sector,
    vertical:                 s.vertical ?? null,
    current_mechanism:        s.current_mechanism ?? null,
    certifier:                s.certifier ?? null,
    frequency:                s.frequency ?? null,
    cost_per_entity_year:     s.cost_per_entity_year ?? null,
    fraud_rate_despite_cert:  s.fraud_rate_despite_cert ?? null,
    detection_lag_months:     s.detection_lag_months ?? null,
    trust_halflife_months:    s.trust_halflife_months ?? null,
    coverage_rate:            s.coverage_rate ?? null,
    total_non_trust_cost_eur: s.total_non_trust_cost_eur ?? null,
    burhan_mechanism:         s.burhan_mechanism ?? null,
    burhan_advantage:         s.burhan_advantage ?? null,
    trust_decay_lambda:       s.trust_decay_lambda ?? null,
    source:                   s.source ?? null,
  }));
  await upsert('conf_sector_trust', rows, 'sector');
}

// ─── 3. conf_competitors ← competitors-seed.json ──────────────────────────────
async function seedCompetitors() {
  const data = loadJson('competitors-seed.json');
  if (!data) return;
  const list = data.concurrents || data.competitors || [];
  const rows = list.map(c => ({
    name:              c.nom       ?? c.name,
    country:           c.pays      ?? c.country ?? null,
    founded:           parseInt(c.annee_creation ?? c.founded) || null,
    funding:           c.funding_total ?? c.funding ?? null,
    valuation:         c.valorisation ?? c.valuation ?? null,
    status:            c.statut    ?? c.status ?? null,
    acquirer:          c['acquéreur'] ?? c.acquirer ?? null,
    target_pathology:  c.pathologie_cible ?? c.target_pathology ?? null,
    technology:        c.technologie ?? c.technology ?? null,
    business_model:    c.modele_business ?? c.business_model ?? null,
    clinical_evidence: c.evidence_clinique ?? c.clinical_evidence ?? null,
    africa_corridor:   c.corridor_afrique  ?? c.africa_corridor ?? null,
    data_monetization: c.monetisation_donnees_rwe ?? c.data_monetization ?? null,
    fiduciary_agent:   c.agent_fiduciaire_patient ?? c.fiduciary_agent ?? null,
    revenue_model:     c.revenue_model ?? null,
    strengths:         typeof c.forces === 'object' ? JSON.stringify(c.forces) : (c.forces ?? c.strengths ?? null),
    weaknesses:        typeof c.faiblesses === 'object' ? JSON.stringify(c.faiblesses) : (c.faiblesses ?? c.weaknesses ?? null),
    failure_factor:    c.facteur_echec_si_mort ?? c.failure_factor ?? null,
    segment:           c.segment ?? null,
    noos_advantage:    c.pourquoi_noos_burhan_superieur ?? c.noos_advantage ?? null,
    sources:           c.sources ?? null,
  }));
  await upsert('conf_competitors', rows, 'name');
}

// ─── 4. conf_regulations ← regulations-seed.json ──────────────────────────────
async function seedRegulations() {
  const data = loadJson('regulations-seed.json');
  if (!data) return;
  const list = data.reglementations || data.regulations || [];
  const rows = list.map(r => {
    const articles = r.articles_specifiques ?? r.key_articles;
    const articlesVal = typeof articles === 'object' && articles !== null
      ? JSON.stringify(articles) : (articles ?? null);
    const penalty = r.sanctions_maximales ?? r.max_penalty;
    const penaltyVal = typeof penalty === 'object' && penalty !== null
      ? JSON.stringify(penalty) : (penalty ?? null);
    return {
      name:                    r.acronyme ?? r.name ?? r.full_name,
      full_name:               r.full_name ?? null,
      category:                r.categorie ?? r.category ?? null,
      jurisdiction:            r.juridiction ?? r.jurisdiction ?? null,
      effective_date:          r.date_entree_en_vigueur ?? r.effective_date ?? null,
      implementation_status:   r.statut_implementation ?? r.implementation_status ?? null,
      impact_noos:             r.impact_noos ?? null,
      impact_burhan:           r.impact_burhan_observance ?? r.impact_burhan ?? null,
      impact_myne:             r.impact_myne_vente_donnees ?? r.impact_myne ?? null,
      key_articles:            articlesVal,
      max_penalty:             penaltyVal,
      eigen_opportunity:       r.opportunite_eigen ?? null,
      readiness_score:         r.noos_readiness_score ?? null,
      readiness_justification: r.noos_readiness_justification ?? null,
      sources:                 typeof r.sources === 'object' ? JSON.stringify(r.sources) : (r.sources ?? null),
    };
  });
  await upsert('conf_regulations', rows, 'name');
}

// ─── 5. conf_trust_decay ← decay-seed.json ────────────────────────────────────
async function seedDecay() {
  const data = loadJson('decay-seed.json');
  if (!data) return;
  const list = Array.isArray(data) ? data : (data.certifications || []);
  const rows = list.map(d => ({
    certification:            d.certification,
    certifier:                d.certifier ?? null,
    sector:                   d.sector ?? null,
    renewal_frequency:        d.renewal_frequency ?? null,
    renewal_cost_eur:         d.renewal_cost_eur ?? null,
    post_cert_fraud_cases:    d.post_cert_fraud_cases ? JSON.stringify(d.post_cert_fraud_cases) : null,
    avg_detection_lag_months: d.avg_detection_lag_months ?? null,
    lambda:                   d.lambda ?? null,
    halflife_months:          d.halflife_months ?? null,
    continuous_argument:      d.continuous_argument ?? null,
    sources:                  typeof d.sources === 'object' ? JSON.stringify(d.sources) : (d.sources ?? null),
  }));
  await upsert('conf_trust_decay', rows, 'certification');
}

// ─── 6. conf_ai_models ← ai-models-seed.json ──────────────────────────────────
async function seedAiModels() {
  const data = loadJson('ai-models-seed.json');
  if (!data) return;
  const list = Array.isArray(data) ? data : (data.models || []);
  const rows = list
    .filter(m => m.model_name)
    .map(m => ({
      model_name:      m.model_name,
      sector:          m.sector ?? null,
      estimated_count: m.estimated_count ?? null,
      note:            m.note ?? null,
      source:          m.source ?? null,
    }));
  await upsert('conf_ai_models', rows, 'model_name');
}

// ─── 7. conf_ai_incidents ← ai-incidents-seed.json ────────────────────────────
async function seedAiIncidents() {
  const data = loadJson('ai-incidents-seed.json');
  if (!data) return;
  const list = Array.isArray(data) ? data : (data.incidents || []);
  const rows = list.map(i => ({
    incident:          i.incident,
    model:             i.model ?? null,
    sector:            i.sector ?? null,
    year:              parseInt(i.year) || null,
    impact:            i.impact ?? null,
    cost_eur:          i.cost_eur ?? null,
    root_cause:        i.root_cause ?? null,
    burhan_prevention: i.burhan_prevention ?? null,
    source:            i.source ?? null,
  }));
  await upsert('conf_ai_incidents', rows, 'incident');
}

// ─── 8. conf_entropy_signals ← entropy-seed.json ──────────────────────────────
async function seedEntropy() {
  const data = loadJson('entropy-seed.json');
  if (!data) return;
  const list = data.signals || (Array.isArray(data) ? data : []);
  const rows = list.map(s => ({
    sector:               s.sector,
    signal_name:          s.signal,
    natural_entropy:      s.natural_entropy ?? null,
    fraud_entropy:        s.fraud_entropy ?? null,
    detection_method:     s.detection_method ?? null,
    detection_rate:       s.detection_rate ?? null,
    gaming_cost_eur:      s.gaming_cost_eur ?? null,
    documented_case:      s.documented_case ?? null,
    pathognomonic_signal: s.pathognomonic_signal ?? null,
    sources:              s.sources ?? null,
  }));
  await upsert('conf_entropy_signals', rows, 'sector,signal_name');
}

// ─── 9. conf_proof_of_being ← pob-seed.json ───────────────────────────────────
async function seedPob() {
  const data = loadJson('pob-seed.json');
  if (!data) return;
  const list = Array.isArray(data) ? data : (data.countries || []);
  const rows = list.map(c => ({
    entity_name:                      c.country ?? c.entity_name,
    code:                             c.code ?? null,
    population:                       c.population ?? null,
    bipolar_patients:                 c.bipolar_patients ?? null,
    schizophrenia_patients:           c.schizophrenia_patients ?? null,
    major_depression_patients:        c.major_depression_patients ?? null,
    adhd_patients:                    c.adhd_patients ?? null,
    ptsd_patients:                    c.ptsd_patients ?? null,
    total_psychiatric_patients:       c.total_psychiatric_patients ?? null,
    adherence_rate_bipolar:           c.adherence_rate_bipolar ?? null,
    adherence_rate_schizophrenia:     c.adherence_rate_schizophrenia ?? null,
    adherence_rate_depression:        c.adherence_rate_depression ?? null,
    adherence_rate_adhd:              c.adherence_rate_adhd ?? null,
    adherence_rate_ptsd:              c.adherence_rate_ptsd ?? null,
    rehospitalization_cost_eur:       c.rehospitalization_cost_eur ?? null,
    avoidable_rehospitalizations_year: c.avoidable_rehospitalizations_year ?? null,
    total_waste_eur:                  c.total_waste_eur ?? null,
    psychiatrists_per_100k:           c.psychiatrists_per_100k ?? null,
    pharmacies_count:                 c.pharmacies_count ?? null,
    insurance_coverage:               c.insurance_coverage ?? null,
    smartphone_penetration:           c.smartphone_penetration ?? null,
    network_3g_plus:                  c.network_3g_plus ?? null,
    mental_health_apps_existing:      c.mental_health_apps_existing ?? null,
    tam_observance_eur:               c.tam_observance_eur ?? null,
    tam_calculation:                  c.tam_calculation ?? null,
    sources:                          c.sources ?? null,
  }));
  await upsert('conf_proof_of_being', rows, 'entity_name');
}

// ─── 10. conf_supply_chain ← supply-chain-seed.json ───────────────────────────
async function seedSupplyChain() {
  const data = loadJson('supply-chain-seed.json');
  if (!data) return;
  const list = data.nodes || (Array.isArray(data) ? data : []);
  const rows = list.map(n => ({
    anchor_name:         n.anchor_name,
    anchor_sector:       n.anchor_sector ?? null,
    total_nodes:         n.total_nodes ?? null,
    total_eigen_revenue: n.total_eigen_revenue ?? null,
    prescriptor_effect:  n.prescriptor_effect ?? null,
    killer_insight:      n.killer_insight ?? null,
    tier:                n.tier ?? null,
    node_name:           n.node_name,
    tier_type:           n.tier_type ?? null,
    count:               n.count ?? null,
    examples:            n.examples ?? null,
    legal_force:         n.legal_force ?? null,
    detail:              n.detail ?? null,
  }));
  await upsert('conf_supply_chain', rows, 'anchor_name,tier,node_name');
}

// ─── Main ──────────────────────────────────────────────────────────────────────
async function main() {
  console.log('\n🌱  Seeding Intelligence Confiance tables...\n');

  await seedDeficit();
  await seedSectors();
  await seedCompetitors();
  await seedRegulations();
  await seedDecay();
  await seedAiModels();
  await seedAiIncidents();
  await seedEntropy();
  await seedPob();
  await seedSupplyChain();

  // ─── Count per table ─────────────────────────────────────────────────────────
  console.log('\n📊  Counts per table:');
  const tables = [
    'conf_trust_deficit',
    'conf_sector_trust',
    'conf_competitors',
    'conf_regulations',
    'conf_trust_decay',
    'conf_ai_models',
    'conf_ai_incidents',
    'conf_entropy_signals',
    'conf_proof_of_being',
    'conf_supply_chain',
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
