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
const URL  = env.NEXT_PUBLIC_SUPABASE_URL;
const KEY  = env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL || !KEY) { console.error('Missing Supabase keys in .env.local'); process.exit(1); }
const supabase = createClient(URL, KEY);

// ─── Helper: load JSON or skip ─────────────────────────────────────────────────
function loadJson(file) {
  const p = path.join(__dirname, '..', 'src', 'data', 'intention', file);
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

// ─── 1. int_attention_observatory ← observatory-seed.json ─────────────────────
async function seedObservatory() {
  const data = loadJson('observatory-seed.json');
  if (!data) return;
  const countries = data.countries || [];
  const rows = countries.map(c => ({
    country:               c.country,
    code:                  c.code,
    connected_population:  c.connected_population,
    smartphone_penetration: c.smartphone_penetration,
    arpu_google:           c.arpu_google_eur ?? c.arpu_google,
    arpu_meta:             c.arpu_meta_eur   ?? c.arpu_meta,
    arpu_tiktok:           c.arpu_tiktok_eur ?? c.arpu_tiktok,
    arpu_telecom:          c.arpu_telecom_data_eur ?? c.arpu_telecom,
    arpu_banking:          c.arpu_banking_data_eur ?? c.arpu_banking,
    arpu_total:            c.arpu_total_eur  ?? c.arpu_total,
    total_value_captured:  c.total_value_captured_eur ?? c.total_value_captured,
    intention_gap:         c.intention_gap_53pct_eur  ?? c.intention_gap,
    top_captors:           c.top_captors ? JSON.stringify(c.top_captors) : null,
    source:                c.sources ?? c.source ?? null,
  }));
  await upsert('int_attention_observatory', rows, 'code');
}

// ─── 2. int_intention_prices ← prices-seed.json ───────────────────────────────
async function seedPrices() {
  const data = loadJson('prices-seed.json');
  if (!data) return;
  const categories = data.categories || [];
  const rows = categories.map(c => ({
    category:              c.category,
    vertical:              c.vertical,
    current_cac_attention: c.current_cac_attention_eur ?? c.current_cac_attention,
    qualified_lead_value:  c.qualified_lead_value_eur  ?? c.qualified_lead_value,
    intention_price:       c.estimated_intention_price_eur ?? c.intention_price,
    frequency_per_year:    c.frequency_per_person_per_year ?? c.frequency_per_year,
    corridor_volume_annual: c.corridor_volume_annual,
    total_market_value:    c.total_market_value_eur ?? c.total_market_value,
    explanation:           c.explanation,
    source:                c.sources ?? c.source ?? null,
  }));
  await upsert('int_intention_prices', rows, 'category');
}

// ─── 3. int_competitors ← competitors-seed.json ───────────────────────────────
async function seedCompetitors() {
  const data = loadJson('competitors-seed.json');
  if (!data) return;
  const competitors = data.concurrents || data.competitors || [];
  const rows = competitors.map(c => ({
    name:            c.nom  ?? c.name,
    country:         c.pays ?? c.country,
    founded:         parseInt(c.annee_creation ?? c.founded) || null,
    funding:         c.funding_total ?? c.funding,
    model:           c.modele ?? c.model,
    data_type:       c.type_donnees ?? c.data_type,
    privacy_level:   c.privacy ?? c.privacy_level,
    blockchain:      c.blockchain,
    fiduciary_agent: c.agent_fiduciaire ?? c.fiduciary_agent,
    africa_corridor: c.corridor_afrique ?? c.africa_corridor,
    revenue_model:   c.revenue_model,
    pricing:         c.pricing,
    strengths:       c.forces ?? c.strengths,
    weaknesses:      c.faiblesses ?? c.weaknesses,
    myne_advantage:  c.myne_superiorite ?? c.myne_advantage,
  }));
  await upsert('int_competitors', rows, 'name');
}

// ─── 4. int_regulations ← regulations-seed.json ───────────────────────────────
async function seedRegulations() {
  const data = loadJson('regulations-seed.json');
  if (!data) return;
  const regs = data.reglementations || data.regulations || [];
  const rows = regs.map(r => {
    // Flatten articles to string
    const articles = r.articles_pertinents ?? r.key_articles;
    const articlesStr = typeof articles === 'object' && articles !== null
      ? Object.entries(articles).map(([k, v]) =>
          `${k}: ${typeof v === 'object' ? JSON.stringify(v) : v}`
        ).join(' | ')
      : (articles ?? null);

    const penalty = r.sanctions_maximales ?? r.max_penalty;
    const penaltyStr = typeof penalty === 'object' && penalty !== null
      ? JSON.stringify(penalty)
      : (penalty ?? null);

    return {
      name:            r.acronyme ?? r.nom_complet ?? r.name,
      jurisdiction:    r.juridiction ?? r.jurisdiction,
      effective_date:  r.date_entree_vigueur ?? r.effective_date,
      impact_myne:     r.impact_myne,
      key_articles:    articlesStr,
      max_penalty:     penaltyStr,
      myne_opportunity: r.opportunite_forcage_legal ?? r.myne_opportunity,
      status:          r.statut_implementation ?? r.status,
      alignment_score: r.myne_alignment_score ?? r.alignment_score,
    };
  });
  await upsert('int_regulations', rows, 'name');
}

// ─── 5. int_health_data_pricing ← health-seed.json ───────────────────────────
async function seedHealth() {
  const data = loadJson('health-seed.json');
  if (!data) return;
  const categories = data.categories || [];
  const rows = categories.map(c => {
    // Flatten producers
    const prod = c.producteur ?? c.producer;
    const prodStr = typeof prod === 'object' && prod !== null
      ? [prod.primaire, prod.secondaire, prod.plateforme].filter(Boolean).join(' / ')
      : (prod ?? null);

    // First buyer
    const buyers = c.acheteurs ?? c.buyers ?? [];
    const firstBuyer = buyers[0] ?? {};
    const buyerStr = buyers.map(b => b.secteur ?? b.buyer).filter(Boolean).join(', ');
    const personaStr = buyers.map(b => b.buyer_persona).filter(Boolean).join(', ');

    // Price
    const pricing = c.valorisation_marchee ?? c.market_price ?? c.pricing;
    const priceStr = typeof pricing === 'object' && pricing !== null
      ? JSON.stringify(pricing)
      : (pricing ?? null);

    // Volume
    const volume = c.volume_marche ?? c.volume_corridor;
    const volumeStr = typeof volume === 'object' && volume !== null
      ? JSON.stringify(volume)
      : (volume ?? null);

    // T-level
    const tlevel = c.niveau_t_minimum ?? c.t_level_minimum;
    const tlevelStr = typeof tlevel === 'object' && tlevel !== null
      ? JSON.stringify(tlevel)
      : (tlevel ?? null);

    // Regulation
    const reg = c.reglementations_applicables ?? c.regulation;
    const regStr = typeof reg === 'object' && reg !== null
      ? JSON.stringify(reg)
      : (reg ?? null);

    // Myne value
    const myneVal = c.valeur_myne_estimee ?? c.estimation_valeur_myne ?? c.myne_value_estimate;
    const myneStr = typeof myneVal === 'object' && myneVal !== null
      ? JSON.stringify(myneVal)
      : (myneVal ?? null);

    return {
      category:          c.nom ?? c.category,
      producer:          prodStr,
      buyer:             buyerStr || null,
      buyer_persona:     personaStr || null,
      market_price:      priceStr,
      volume_corridor:   volumeStr,
      t_level_minimum:   tlevelStr,
      regulation:        regStr,
      myne_value_estimate: myneStr,
    };
  });
  await upsert('int_health_data_pricing', rows, 'category');
}

// ─── 6. int_intention_cases ← cases-seed.json ─────────────────────────────────
async function seedCases() {
  const data = loadJson('cases-seed.json');
  if (!data) return;
  const initiatives = data.initiatives || data.cases || [];
  const rows = initiatives.map(i => ({
    name:           i.nom    ?? i.name,
    country:        i.pays   ?? i.country,
    year:           parseInt(i.annee_fondation ?? i.year) || null,
    founder:        i.fondateurs ?? i.founder,
    concept:        i.concept,
    status:         i.statut_detail ?? i.statut ?? i.status,
    failure_reason: i.raison_echec ?? i.failure_reason,
    lesson_myne:    i.lecon_pour_myne ?? i.lesson_myne,
    funding:        i.funding,
    traction:       i.traction,
  }));
  await upsert('int_intention_cases', rows, 'name');
}

// ─── 7. int_sovereignty_indices ← indices-seed.json ──────────────────────────
async function seedIndices() {
  const data = loadJson('indices-seed.json');
  if (!data) return;
  const indices = data.indices || [];
  const rows = indices.map(i => {
    const scores = i.scores_corridor ?? i.scores_pays ?? i.scores;
    const methodo = i.methodologie ?? i.methodology;
    const methodoStr = typeof methodo === 'object' && methodo !== null
      ? JSON.stringify(methodo)
      : (methodo ?? null);
    const strengths = i.forces_pour_myne ?? i.strengths;
    const strengthsStr = typeof strengths === 'object' && strengths !== null
      ? JSON.stringify(strengths)
      : (strengths ?? null);
    const limits = i.limites ?? i.limitations;
    const limitsStr = typeof limits === 'object' && limits !== null
      ? JSON.stringify(limits)
      : (limits ?? null);

    return {
      index_name:      i.nom_complet  ?? i.index_name,
      organization:    i.organisme_emetteur ?? i.organization,
      frequency:       i.frequence    ?? i.frequency,
      methodology:     methodoStr,
      scores:          scores ? JSON.stringify(scores) : null,
      strengths:       strengthsStr,
      limitations:     limitsStr,
      myne_complement: i.complement_myne ?? i.myne_complement,
    };
  });
  await upsert('int_sovereignty_indices', rows, 'index_name');
}

// ─── Main ──────────────────────────────────────────────────────────────────────
async function main() {
  console.log('\n🌱  Seeding Intelligence Intention tables...\n');

  const results = {};

  await seedObservatory();
  await seedPrices();
  await seedCompetitors();
  await seedRegulations();
  await seedHealth();
  await seedCases();
  await seedIndices();

  // ─── Count per table ─────────────────────────────────────────────────────
  console.log('\n📊  Counts per table:');
  const tables = [
    'int_attention_observatory',
    'int_intention_prices',
    'int_competitors',
    'int_regulations',
    'int_health_data_pricing',
    'int_intention_cases',
    'int_sovereignty_indices',
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
