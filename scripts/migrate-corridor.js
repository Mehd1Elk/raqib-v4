const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');
const vm = require('vm');

// --- 1. Load Environment Variables ---
const envPath = path.join(process.cwd(), '.env.local');
let envData;
try {
  envData = fs.readFileSync(envPath, 'utf8');
} catch (e) {
  console.error("❌  Erreur: Veuillez exécuter ce script depuis la racine de ~/eigen-repos/raqib-v4/");
  process.exit(1);
}
const envVars = {};
envData.split('\n').forEach(line => {
  if (line && !line.startsWith('#') && line.includes('=')) {
    const v = line.split('=');
    envVars[v[0].trim()] = v.slice(1).join('=').trim();
  }
});

const SUPABASE_URL = envVars.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = envVars.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error("❌  Clés Supabase manquantes dans .env.local");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

// --- 2. Load and Parse Data from data.js ---
const dataFilePath = path.join(process.env.HOME, 'Desktop/RAQIB — Corridor Intelligence/data.js');
let rawData;
try {
  rawData = fs.readFileSync(dataFilePath, 'utf8');
} catch (e) {
  console.error(`❌  Erreur lecture data.js: ${e.message}`);
  process.exit(1);
}

// Sandbox environment pour extraire les constantes
// const/let declarations don't leak into sandbox — replace with var
const sandbox = {};
try {
  const patchedData = rawData.replace(/\bconst\s+/g, 'var ').replace(/\blet\s+/g, 'var ');
  vm.runInNewContext(patchedData, sandbox);
} catch (e) {
  console.error(`❌  Erreur parsing data.js: ${e.message}`);
}

const {
  GLOBAL_DATA,
  DATA_MOROCCO,
  DATA_NIGERIA,
  DATA_SENEGAL,
  DATA_COTEDIVOIRE,
  DATA_GHANA,
  DATA_REMAINING_AFRICA,
  DATA_EU_COUNTRIES
} = sandbox;

const P0_COUNTRIES = [DATA_MOROCCO, DATA_NIGERIA, DATA_SENEGAL, DATA_COTEDIVOIRE, DATA_GHANA].filter(Boolean);
const AFRICA = DATA_REMAINING_AFRICA || [];
const EU = DATA_EU_COUNTRIES || [];

const allCountries = [...P0_COUNTRIES, ...AFRICA, ...EU];

async function runMigration() {
  console.log(`🚀 Début de la migration Corridor Intelligence...`);
  console.log(`📊 Pays détectés: ${allCountries.length} (P0: ${P0_COUNTRIES.length}, Afrique Reste: ${AFRICA.length}, UE: ${EU.length})`);

  // --- 3. MIGRATION MINERAUX & ALERTES GLOBAUX ---
  if (GLOBAL_DATA) {
    console.log(`\n🌀 Migration des données globales...`);
    
    // Clear existants
    await supabase.from('corridor_mineral_prices').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabase.from('corridor_alerts').delete().neq('id', '00000000-0000-0000-0000-000000000000');

    if (GLOBAL_DATA.topMinerals) {
      const topMineralsInsert = GLOBAL_DATA.topMinerals.map(m => ({
        mineral: m.name,
        price: m.price,
        trend: m.trend.includes('up') || m.trend.includes('↑') ? 'up' : m.trend.includes('down') || m.trend.includes('↓') ? 'down' : 'stable',
        supply: m.topProducers ? m.topProducers.join(', ') : '',
        corridor_source: 'Global Stats',
        category: m.crmaStatus
      }));
      const { error: errMins } = await supabase.from('corridor_mineral_prices').insert(topMineralsInsert);
      if (errMins) console.error("❌  Erreur prix minéraux:", errMins.message);
      else console.log(`✅  ${topMineralsInsert.length} prix de minéraux insérés.`);
    }

    if (GLOBAL_DATA.alerts) {
      const alertsInsert = GLOBAL_DATA.alerts.map(a => ({
        text: a.text,
        level: ['red', 'orange', 'green'].includes(a.level) ? a.level : 'orange'
      }));
      const { error: errAlerts } = await supabase.from('corridor_alerts').insert(alertsInsert);
      if (errAlerts) console.error("❌  Erreur alertes:", errAlerts.message);
      else console.log(`✅  ${alertsInsert.length} alertes globales insérées.`);
    }
  }

  // --- 4. MIGRATION DES PAYS ---
  console.log(`\n🌍 Migration détaillée des pays...`);

  for (const country of allCountries) {
    if (!country || !country.id) continue;

    const cId = country.id;
    console.log(`\nTraitement du pays: ${country.name} (${cId})...`);

    // D'abord, supprimer les anciennes données de ce pays pour garantir l'idempotence. (Se fait en cascade si foreign keys le permettent, sinon on le fait manuellement).
    await supabase.from('corridor_minerals').delete().eq('country_id', cId);
    await supabase.from('corridor_enterprises').delete().eq('country_id', cId);
    await supabase.from('corridor_leaders').delete().eq('country_id', cId);
    await supabase.from('corridor_universities').delete().eq('country_id', cId);
    await supabase.from('corridor_billionaires').delete().eq('country_id', cId);
    await supabase.from('corridor_countries').delete().eq('id', cId);

    // Extraction et mise en forme pays
    const countryData = {
      id: cId,
      name: country.name,
      official_name: country.officialName || country.official_name,
      flag: country.flag,
      region: country.region === 'africa' || country.region === 'eu' ? country.region : (EU.find(e => e.id === cId) ? 'eu' : 'africa'),
      capital: country.capital,
      area: country.area,
      population: country.population,
      density: country.density,
      gdp_nominal: country.gdpNominal || country.gdp_nominal,
      gdp_ppp: country.gdpPPP || country.gdp_ppp,
      gdp_per_capita: country.gdpPerCapita || country.gdp_per_capita,
      gdp_growth: country.gdpGrowth || country.gdp_growth,
      inflation: country.inflation,
      debt_to_gdp: country.debtToGDP || country.debt_to_gdp,
      trade_balance: country.tradeBalance || country.trade_balance,
      currency: country.currency,
      exchange_rate_eur: country.exchangeRateEUR || country.exchange_rate_eur,
      exchange_rate_usd: country.exchangeRateUSD || country.exchange_rate_usd,
      corruption_index: country.corruptionIndex || country.corruption_index,
      ease_business: country.easeBusiness || country.ease_business,
      political_stability: country.politicalStability ? String(country.politicalStability) : null,
      risk_score: country.riskScore || country.risk_score || null,
      risk_label: country.riskLabel || country.risk_label,
      recommendation: country.recommendation,
      timezone: country.timezone,
      languages: country.languages,
      religions: country.religions,
      memberships: country.memberships || [],
      industries: country.industries,
      contacts: country.contacts,
      logistics: country.logistics,
      trade: country.trade,
      demographics: country.demographics,
      risks: country.risks || country.opportunities
    };

    const { error: errCountry } = await supabase.from('corridor_countries').insert(countryData);
    if (errCountry) {
      console.error(`❌  Erreur pays ${cId}:`, errCountry.message);
      continue;
    }

    let minCounts = 0, entCounts = 0, leaCounts = 0, uniCounts = 0, bilCounts = 0;

    // Minerals
    if (country.minerals && Array.isArray(country.minerals)) {
      const dbMinerals = country.minerals.map(m => ({
        country_id: cId,
        name: m.name,
        type: m.type,
        annual_production: m.annualProduction || m.annual_production,
        world_rank: m.worldRank || m.world_rank,
        reserves: m.reserves,
        deposits: m.deposits,
        export_revenue: m.exportRevenue || m.export_revenue,
        regulation: m.regulation,
        crma_relevance: m.crmaRelevance || m.crma_relevance
      }));
      const { error } = await supabase.from('corridor_minerals').insert(dbMinerals);
      if (!error) minCounts = dbMinerals.length;
    }

    // Enterprises
    if (country.enterprises && Array.isArray(country.enterprises)) {
      const dbEnterprises = country.enterprises.map(e => ({
        country_id: cId,
        name: e.name,
        sector: e.sector,
        revenue: e.revenue,
        employees: e.employees ? String(e.employees) : undefined,
        ceo: e.ceo,
        shareholding: e.shareholding,
        listed: e.listed,
        founded: e.founded ? String(e.founded) : undefined,
        hq: e.hq,
        website: e.website
      }));
      const { error } = await supabase.from('corridor_enterprises').insert(dbEnterprises);
      if (!error) entCounts = dbEnterprises.length;
    }

    // Leaders
    if (country.leaders) {
      const dbLeaders = [];
      const { headOfState, headOfGov, keyMinisters, centralBankGov, investmentAgency } = country.leaders;
      if (headOfState) dbLeaders.push({ country_id: cId, role: 'head_of_state', name: headOfState.name, since: headOfState.since, party: headOfState.party, next_election: headOfState.nextElection });
      if (headOfGov) dbLeaders.push({ country_id: cId, role: 'head_of_gov', name: headOfGov.name, since: headOfGov.since, party: headOfGov.party });
      if (centralBankGov) dbLeaders.push({ country_id: cId, role: 'central_bank', name: centralBankGov.name, institution: centralBankGov.institution });
      if (investmentAgency) dbLeaders.push({ country_id: cId, role: 'investment_agency', name: investmentAgency.name, institution: investmentAgency.institution });
      
      if (keyMinisters && Array.isArray(keyMinisters)) {
        keyMinisters.forEach(km => {
          dbLeaders.push({ country_id: cId, role: 'minister', portfolio: km.portfolio, name: km.name });
        });
      }
      
      if (dbLeaders.length > 0) {
        const { error } = await supabase.from('corridor_leaders').insert(dbLeaders);
        if (!error) leaCounts = dbLeaders.length;
      }
    }

    // Universities
    if (country.universities && Array.isArray(country.universities)) {
      const dbUniversities = country.universities.map(u => ({
        country_id: cId,
        name: u.name,
        city: u.city,
        students: u.students,
        specialties: u.specialties,
        ranking: u.ranking
      }));
      const { error } = await supabase.from('corridor_universities').insert(dbUniversities);
      if (!error) uniCounts = dbUniversities.length;
    }

    // Billionaires
    if (country.billionaires && Array.isArray(country.billionaires)) {
      const dbBillionaires = country.billionaires.map(b => ({
        country_id: cId,
        name: b.name,
        fortune: b.fortune,
        source: b.source,
        companies: b.companies,
        age: b.age,
        education: b.education,
        bio: b.bio
      }));
      const { error } = await supabase.from('corridor_billionaires').insert(dbBillionaires);
      if (!error) bilCounts = dbBillionaires.length;
    }

    console.log(`✅ ${country.name}: ${minCounts} minéraux, ${entCounts} entreprises, ${leaCounts} dirigeants, ${uniCounts} universités, ${bilCounts} fortunes.`);
  }

  console.log(`\n🏁 Migration terminée avec succès.`);
}

runMigration().catch(console.error);
