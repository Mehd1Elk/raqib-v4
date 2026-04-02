const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// Load .env.local
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

// ─── CHAINS DATA ───
const CHAINS = [
  {
    parent: 'TotalEnergies',
    tiers: [
      { tier: 0, tier_name: 'TotalEnergies', tier_type: 'Donneur d\'ordre', count_entities: '1', examples: 'TotalEnergies SE — 100K+ employés', eigen_briques: 'NABZR', contract: '€150K/an abo + tx', legal_force: 'CS3D Art.6-8', eigen_revenue: '€1.3M/an', detail: 'Signature enterprise = entrée dans toute la chaîne énergétique' },
      { tier: 1, tier_name: 'Fournisseurs directs', tier_type: 'Tier 1 — Grands fournisseurs', count_entities: '5000', examples: 'Schlumberger, Halliburton, Technip, Baker Hughes, Saipem, Vallourec, Bureau Veritas', eigen_briques: 'BAZ', contract: null, legal_force: 'Clause contractuelle TotalEnergies', eigen_revenue: '€192K/an', detail: '5K × €0.008/tx × 400 tx/mois' },
      { tier: 2, tier_name: 'Sous-traitants PME', tier_type: 'Tier 2 — PME industrielles', count_entities: '50000', examples: 'Soudeurs, fabricants vannes, logisticiens, labo analyse', eigen_briques: 'BA', contract: null, legal_force: 'CS3D Art.7 cascade', eigen_revenue: '€120K/an', detail: 'Obligation de due diligence cascadée via CS3D' },
      { tier: 3, tier_name: 'Distributeurs', tier_type: 'Tier 3 — Réseau distribution', count_entities: '16000', examples: '16 000 stations TotalEnergies EU+Afrique, distributeurs GPL', eigen_briques: 'ABZ', contract: null, legal_force: 'Réglementation traçabilité hydrocarbures', eigen_revenue: '€400K/an', detail: 'Traçabilité obligatoire sur toute la chaîne de distribution' },
      { tier: 4, tier_name: 'Clients finaux', tier_type: 'Tier 4 — Utilisateurs', count_entities: '30M+', examples: 'Automobilistes, entreprises acheteuses énergie', eigen_briques: 'AM', contract: null, legal_force: 'RGPD + Data Act', eigen_revenue: '€180K/an + MYNε', detail: 'Consentement données + micro-transactions MYNε' },
    ],
  },
  {
    parent: 'BNP Paribas',
    tiers: [
      { tier: 0, tier_name: 'BNP Paribas', tier_type: 'Donneur d\'ordre', count_entities: '1', examples: 'BNP Paribas SA — 190K+ employés', eigen_briques: 'NAMZBR', contract: '€200K/an', legal_force: 'PSD3/DORA/MiCA', eigen_revenue: '€4.52M/an', detail: 'Contrat enterprise couvrant toutes les briques' },
      { tier: 1, tier_name: 'Prestataires IT', tier_type: 'Tier 1 — ESN & IT', count_entities: '8000', examples: 'Accenture, Capgemini, Sopra Steria, Atos, CGI, IBM, Infosys + 7000 PME IT', eigen_briques: 'AB', contract: null, legal_force: 'DORA Art.28 gestion risque tiers ICT', eigen_revenue: '€480K/an', detail: 'EFFET PRESCRIPTEUR : les ESN intègrent ÆLYA/BURHAN pour BNP puis le proposent à leurs 50+ autres clients bancaires' },
      { tier: 2, tier_name: 'Courtiers et agents', tier_type: 'Tier 2 — Distribution', count_entities: '12000', examples: 'Courtiers crédit, agents assurance, CGP, comparateurs', eigen_briques: 'ABN', contract: null, legal_force: 'DDA devoir de conseil', eigen_revenue: '€230K/an', detail: 'Obligation de consentement éclairé via DDA' },
      { tier: 3, tier_name: 'Entreprises clientes', tier_type: 'Tier 3 — Corporate banking', count_entities: '500000', examples: '500K entreprises clientes BNP corporate banking', eigen_briques: 'ZBR', contract: null, legal_force: 'AML6 + KYC/KYB', eigen_revenue: '€12.5M/an', detail: 'Potentiel Phase 3 — MIZAN settlement corridor' },
      { tier: 4, tier_name: 'Clients retail', tier_type: 'Tier 4 — Particuliers', count_entities: '30M+', examples: '30M particuliers BNP Europe', eigen_briques: 'ANM', contract: null, legal_force: 'PSD3 + EHDS', eigen_revenue: '€4.2M/an', detail: 'Consentement bancaire + santé' },
    ],
  },
  {
    parent: 'Sanofi',
    tiers: [
      { tier: 0, tier_name: 'Sanofi', tier_type: 'Donneur d\'ordre', count_entities: '1', examples: 'Sanofi SA — 91K employés', eigen_briques: 'NAMBY', contract: '€130K/an', legal_force: 'EU FMD + EHDS + ICH-GCP', eigen_revenue: '€1.56M/an', detail: 'Contrat pharma enterprise couvrant essais cliniques + traçabilité' },
      { tier: 1, tier_name: 'CRO & CMO', tier_type: 'Tier 1 — Sous-traitants pharma', count_entities: '500', examples: 'IQVIA, Parexel, Covance, PPD, Catalent, Lonza, Recipharm', eigen_briques: 'ABM', contract: null, legal_force: 'ICH-GCP E6(R2) + EU CTR', eigen_revenue: '€1.2M/an', detail: 'Consent patients essais cliniques — IQVIA utilise ÆLYA pour Sanofi puis pour 500 autres pharmas' },
      { tier: 2, tier_name: 'Pharmacies & distributeurs', tier_type: 'Tier 2 — Distribution', count_entities: '30000', examples: '30K pharmacies FR + distributeurs EU', eigen_briques: 'AB', contract: null, legal_force: 'EU FMD sérialisation obligatoire', eigen_revenue: '€600K/an', detail: '50M boîtes/mois traçables via EU FMD' },
      { tier: 3, tier_name: 'Mutuelles & assureurs', tier_type: 'Tier 3 — Payeurs', count_entities: '5000', examples: 'Mutuelles prescrivant les génériques Sanofi', eigen_briques: 'NAM', contract: null, legal_force: 'EHDS + DDA', eigen_revenue: '€500K/an', detail: 'Données santé + obligation de conseil' },
      { tier: 4, tier_name: 'Patients', tier_type: 'Tier 4 — Utilisateurs', count_entities: '50M+', examples: '50M+ patients traités par Sanofi EU', eigen_briques: 'ANM', contract: null, legal_force: 'RGPD + EHDS', eigen_revenue: '€2M/an', detail: 'Consentement données santé + espace patient' },
    ],
  },
  {
    parent: 'Siemens',
    tiers: [
      { tier: 0, tier_name: 'Siemens', tier_type: 'Donneur d\'ordre', count_entities: '1', examples: 'Siemens AG — 320K employés', eigen_briques: 'NABYR', contract: '€150K/an', legal_force: 'LkSG (déjà en vigueur Allemagne)', eigen_revenue: '€1.8M/an', detail: 'LkSG impose due diligence sur toute la supply chain' },
      { tier: 1, tier_name: '90K fournisseurs Siemens', tier_type: 'Tier 1 — Fournisseurs directs', count_entities: '90000', examples: 'Composantiers, sous-traitants industriels EU+Asie', eigen_briques: 'BA', contract: null, legal_force: 'LkSG + CS3D', eigen_revenue: '€2.16M/an', detail: 'Double obligation LkSG (DE) + CS3D (EU)' },
      { tier: 2, tier_name: 'Fournisseurs Tier 2', tier_type: 'Tier 2 — PME industrielles', count_entities: '500000', examples: 'PME industrielles sous-traitantes', eigen_briques: 'B', contract: null, legal_force: 'Cascade LkSG', eigen_revenue: '€1.2M/an', detail: 'Obligation cascadée via LkSG' },
      { tier: 3, tier_name: 'Clients industriels', tier_type: 'Tier 3 — Acheteurs', count_entities: '200000', examples: 'Usines, centrales, hôpitaux utilisant équipement Siemens', eigen_briques: 'ABR', contract: null, legal_force: 'NIS2 (infra critique)', eigen_revenue: '€2.4M/an', detail: 'NIS2 impose cybersécurité sur infrastructures critiques' },
      { tier: 4, tier_name: 'Utilisateurs finaux', tier_type: 'Tier 4 — Utilisateurs', count_entities: '100M+', examples: 'Utilisateurs finaux des systèmes Siemens', eigen_briques: 'A', contract: null, legal_force: 'RGPD', eigen_revenue: '€600K/an', detail: 'Consentement données utilisateurs' },
    ],
  },
  {
    parent: 'AXA',
    tiers: [
      { tier: 0, tier_name: 'AXA', tier_type: 'Donneur d\'ordre', count_entities: '1', examples: 'AXA SA — 145K employés', eigen_briques: 'NAMZBR', contract: '€120K/an', legal_force: 'DDA + CSRD + EHDS', eigen_revenue: '€1.8M/an', detail: 'Contrat enterprise assurance couvrant toutes les briques' },
      { tier: 1, tier_name: '30K courtiers et agents', tier_type: 'Tier 1 — Réseau distribution', count_entities: '30000', examples: 'Réseau distribution assurance AXA', eigen_briques: 'ABN', contract: null, legal_force: 'DDA consentement obligatoire', eigen_revenue: '€720K/an', detail: 'EFFET PRESCRIPTEUR : courtiers = agents doubles, propagent ÆLYA à Generali, Allianz, Zurich' },
      { tier: 2, tier_name: 'Experts et réparateurs', tier_type: 'Tier 2 — Prestataires', count_entities: '50000', examples: 'Experts auto, experts bâtiment, centres soins, garages agréés', eigen_briques: 'BA', contract: null, legal_force: 'Réglementation expertise IRSA', eigen_revenue: '€600K/an', detail: 'Obligation de conformité expertise et réparation' },
      { tier: 3, tier_name: 'Entreprises clientes santé', tier_type: 'Tier 3 — Mutuelle collective', count_entities: '200000', examples: '200K entreprises avec mutuelle AXA + RC pro', eigen_briques: 'NAM', contract: null, legal_force: 'Art. L.4121-1 RPS + CSRD', eigen_revenue: '€5M/an', detail: 'NOOS RPS intégré au contrat — obligation employeur' },
      { tier: 4, tier_name: 'Assurés particuliers', tier_type: 'Tier 4 — Utilisateurs', count_entities: '50M+', examples: '50M assurés AXA Europe', eigen_briques: 'NAM', contract: null, legal_force: 'RGPD + EHDS + DDA', eigen_revenue: '€5.5M/an', detail: 'NOOS check-up mental annuel — consentement santé' },
    ],
  },
];

const INSIGHTS = {
  'TotalEnergies': '1 signature = Eigen dans toute l\'industrie énergétique',
  'BNP Paribas': 'Les ESN propagent Eigen de banque en banque — effet virus via Accenture/Capgemini',
  'Sanofi': 'IQVIA utilise ÆLYA pour Sanofi puis pour 500 autres pharmas',
  'Siemens': 'Le Mittelstand allemand entier via Kienbaum — 500+ clients GE',
  'AXA': '30K courtiers propagent Eigen à TOUS les assureurs qu\'ils représentent',
};

async function main() {
  console.log('🔗 Seeding acq_supply_chain...');

  // Clear existing
  await supabase.from('acq_supply_chain').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  console.log('  ✓ Cleared existing data');

  for (const chain of CHAINS) {
    // Find parent company UUID
    const { data: companies, error: cErr } = await supabase
      .from('acq_companies')
      .select('id, name')
      .ilike('name', `%${chain.parent}%`)
      .limit(1);

    if (cErr || !companies?.length) {
      console.error(`  ✗ Company not found: ${chain.parent}`, cErr?.message);
      continue;
    }

    const parentId = companies[0].id;
    console.log(`  → ${chain.parent} (${parentId})`);

    const rows = chain.tiers.map(t => ({
      parent_company_id: parentId,
      ...t,
    }));

    const { error } = await supabase.from('acq_supply_chain').insert(rows);
    if (error) {
      console.error(`  ✗ Insert failed for ${chain.parent}:`, error.message);
    } else {
      console.log(`    ✓ ${rows.length} tiers inserted`);
    }
  }

  console.log('\n✅ Supply chain seed complete');
}

main().catch(console.error);
