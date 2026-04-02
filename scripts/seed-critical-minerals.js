const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');
const vm = require('vm');

// --- 1. Lancement et configuration Supabase ---
const envPath = path.join(process.cwd(), '.env.local');
let envData;
try { envData = fs.readFileSync(envPath, 'utf8'); } catch (e) {
  console.error("❌  Executez le script depuis raqib-v4"); process.exit(1);
}
const envVars = {};
envData.split('\n').forEach(line => {
  if (line && !line.startsWith('#') && line.includes('=')) {
    const v = line.split('=');
    envVars[v[0].trim()] = v.slice(1).join('=').trim();
  }
});
const supabase = createClient(envVars.NEXT_PUBLIC_SUPABASE_URL, envVars.SUPABASE_SERVICE_ROLE_KEY);

// --- 2. Lecture data.js ---
const dataFilePath = path.join(process.env.HOME, 'Desktop/RAQIB — Critical Minerals Intelligence (2)/data.js');
let rawData;
try { rawData = fs.readFileSync(dataFilePath, 'utf8'); } catch (e) {
  console.error(`❌  Erreur lecture: ${e.message}`); process.exit(1);
}

// Convert const/let to var so they leak into VM sandbox global scope
const patchedData = rawData.replace(/\bconst\s+/g, 'var ').replace(/\blet\s+/g, 'var ');
const sandbox = {};
try { vm.runInNewContext(patchedData, sandbox); } catch (e) {
  console.error(`❌  Erreur parsing: ${e.message}`);
}

const { CORRIDOR_COUNTRIES, EU_INDUSTRIES, SUPPLY_CHAIN, VENTURE_MODEL } = sandbox;
console.log(`📊 Données chargées: ${(CORRIDOR_COUNTRIES||[]).length} pays, ${(EU_INDUSTRIES||[]).length} industries, ${(SUPPLY_CHAIN||[]).length} étapes`);

async function runSeed() {
  console.log('🚀 Démarrage Seed Critical Minerals...');

  // --- SITES MINÉRAUX ---
  await supabase.from('corridor_mineral_sites').delete().neq('id', 'clear');
  const sites = [];
  if (CORRIDOR_COUNTRIES) {
    CORRIDOR_COUNTRIES.forEach(c => {
      sites.push({
        id: `M_${c.id}`,
        name: `Gisements / Mines - ${c.name}`,
        lat: c.lat,
        lng: c.lng,
        category: 'mine',
        country: c.id,
        owner: c.keyPlayer,
        production: c.production,
        minerals: c.minerals ? c.minerals.join(', ') : '',
        reserves: c.reserves,
        notes: c.crmaRelevance,
        geopolitics: `Opportunity: ${c.opportunity} | CN Inv: ${c.chineseInv} | West Inv: ${c.westernInv}`
      });
    });
  }
  
  if (VENTURE_MODEL && VENTURE_MODEL.hubs) {
    VENTURE_MODEL.hubs.forEach((h, i) => {
      const cInfo = (CORRIDOR_COUNTRIES || []).find(c => c.flag === h.flag) || {};
      sites.push({
        id: `HUB_${h.flag}_${i}`,
        name: `${h.city} - ${h.focus}`,
        lat: cInfo.lat ? cInfo.lat + 0.5 : 0,
        lng: cInfo.lng ? cInfo.lng + 0.5 : 0,
        category: h.type && h.type.includes('Raffinage') ? 'refinery' : 'hub',
        country: h.flag,
        notes: h.rationale,
        capacity: h.capex
      });
    });
  }

  if (sites.length > 0) {
    const { error } = await supabase.from('corridor_mineral_sites').insert(sites);
    if (error) console.error("❌ Erreur mineral_sites:", error.message);
    else console.log(`✅  ${sites.length} sites insérés.`);
  }

  // --- EU INDUSTRIES ---
  await supabase.from('corridor_eu_industries').delete().neq('id', 'clear');
  if (EU_INDUSTRIES) {
    const inds = EU_INDUSTRIES.map(e => ({
      id: e.id,
      name: e.name,
      minerals: e.minerals,
      demand_2030: e.demand2030,
      eu_companies: e.euCompanies,
      growth: e.growth,
      crma_impact: e.crmaImpact,
      supply_risk: e.supplyRisk,
      corridor_suppliers: e.corridorSuppliers
    }));
    const { error } = await supabase.from('corridor_eu_industries').insert(inds);
    if (error) console.error("❌ Erreur eu_industries:", error.message);
    else console.log(`✅  ${inds.length} industries EU insérées.`);
  }

  // --- SUPPLY CHAIN ---
  await supabase.from('corridor_supply_chain').delete().neq('stage_number', -1);
  if (SUPPLY_CHAIN) {
    const stages = SUPPLY_CHAIN.map(s => {
      const match = s.stage.match(/^(\d+)\.\s*(.*)/);
      return {
        stage_number: match ? parseInt(match[1]) : 0,
        stage_name: match ? match[2] : s.stage,
        description: s.description,
        actors: s.actors,
        eigen_role: s.eigenRole,
        bottleneck: s.bottleneck,
        value_capture: s.valueCapture,
        value_range: s.value
      };
    });
    const { error } = await supabase.from('corridor_supply_chain').insert(stages);
    if (error) console.error("❌ Erreur supply_chain:", error.message);
    else console.log(`✅  ${stages.length} étapes Supply Chain insérées.`);
  }
  
  console.log('🏁 Terminé !');
}

runSeed().catch(console.error);
