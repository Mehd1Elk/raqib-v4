import { NextResponse, NextRequest } from 'next/server';
import { createAdminClient } from '@/lib/acquisition/supabase-admin';
import { computeTier, computeScore, computePriority, computeRevenue } from '@/lib/acquisition/engine';
import regulationsRaw from '@/src/data/acquisition/regulations-seed.json';
import contactsRaw from '@/src/data/acquisition/contacts-seed.json';
import enrichmentRaw from '@/src/data/acquisition/enrichment-seed.json';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Any = any;

// Sector inference from company name/description
const SECTOR_HINTS: Record<string, string[]> = {
  TEL: ['telecom', 'orange', 'mtn', 'vodafone', 'airtel', 'maroc telecom', 'sonatel', 'moov', 'togocom', 'cellcom', 'inwi'],
  BNK: ['bank', 'banque', 'bnp', 'société générale', 'crédit agricole', 'hsbc', 'ecobank', 'attijariwafa', 'bmce', 'sgb', 'uba', 'zenith', 'access bank', 'stanbic', 'standard bank', 'gtbank', 'guaranty', 'first bank', 'citi', 'santander', 'bbva', 'caixabank', 'millennium bcp'],
  INS: ['allianz', 'axa', 'zurich', 'sanlam', 'saham', 'insurance', 'assurance', 'mapfre'],
  ENR: ['totalenergies', 'shell', 'engie', 'edf', 'repsol', 'galp', 'vivo energy', 'bp ', 'eni ', 'sonabel', 'énergie'],
  PHR: ['sanofi', 'novartis', 'roche', 'bayer', 'gsk', 'pharma', 'santé', 'health'],
  BTP: ['lafarge', 'holcim', 'vinci', 'bouygues', 'ciment', 'addoha', 'infrastructure'],
  TEC: ['capgemini', 'atos', 'sopra', 'africa fintech', 'jumia', 'flutterwave', 'paystack', 'wave', 'interswitch', 'microsoft', 'oracle', 'sap', 'ibm', 'accenture', 'dxc'],
  LOG: ['maersk', 'bolloré', 'cma cgm', 'msc', 'dhl', 'ups', 'fedex', 'marsa maroc', 'transport', 'logistique'],
  CNS: ['deloitte', 'pwc', 'kpmg', 'ey ', 'mckinsey', 'bcg', 'bain', 'conseil', 'audit', 'roland berger'],
  LUX: ['lvmh', 'hermès', 'kering', 'inditex', 'h&m', 'carrefour', 'casino', 'label vie', 'marjane', 'retail'],
  MIN: ['ocp', 'glencore', 'anglo american', 'barrick', 'managem', 'mine', 'phosphate', 'cobalt'],
  AGR: ['olam', 'sifca', 'cosumar', 'agriculture', 'agri'],
  DFI: ['afd', 'bpi france', 'bei', 'bad', 'world bank', 'ifc', 'proparco', 'cdc', 'institution', 'development finance'],
  AUT: ['renault', 'stellantis', 'volkswagen', 'toyota', 'automobile'],
  DEF: ['thales', 'safran', 'airbus defence', 'défense'],
  MED: ['vivendi', 'canal+', 'lagardère', 'média'],
  FMC: ['danone', 'nestlé', 'unilever', 'procter', 'coca-cola', 'heineken', 'castel', 'agroalimentaire', 'fmcg'],
  AVA: ['airbus', 'royal air maroc', 'air france', 'aviation'],
  IND: ['schneider', 'siemens', 'ge ', 'honeywell', 'industrie'],
};

function inferSector(name: string, desc?: string): string {
  const text = `${name} ${desc || ''}`.toLowerCase();
  for (const [sector, hints] of Object.entries(SECTOR_HINTS)) {
    for (const hint of hints) {
      if (text.includes(hint.toLowerCase())) return sector;
    }
  }
  return 'TEC';
}

// HQ inference from enrichment
const HQ_HINTS: Record<string, string> = {
  'fr': 'FR', 'france': 'FR', 'paris': 'FR',
  'maroc': 'MA', 'morocco': 'MA', 'casablanca': 'MA', 'rabat': 'MA',
  'uk': 'GB', 'london': 'GB', 'britain': 'GB',
  'nigeria': 'NG', 'lagos': 'NG',
  'senegal': 'SN', 'dakar': 'SN',
  'south africa': 'ZA', 'johannesburg': 'ZA',
  'kenya': 'KE', 'nairobi': 'KE',
  'germany': 'DE', 'münchen': 'DE', 'munich': 'DE',
  'spain': 'ES', 'madrid': 'ES',
  'portugal': 'PT', 'lisbon': 'PT', 'lisboa': 'PT',
  'switzerland': 'CH', 'zürich': 'CH', 'zurich': 'CH', 'basel': 'CH',
  'netherlands': 'NL', 'amsterdam': 'NL',
  'côte d\'ivoire': 'CI', 'abidjan': 'CI',
  'ghana': 'GH', 'accra': 'GH',
  'togo': 'TG', 'lomé': 'TG',
  'benin': 'BJ', 'cotonou': 'BJ',
  'guinea': 'GN', 'conakry': 'GN',
  'mauritania': 'MR', 'nouakchott': 'MR',
  'gambia': 'GM', 'banjul': 'GM',
};

function inferHQ(name: string, desc?: string): string {
  const text = `${name} ${desc || ''}`.toLowerCase();
  // Known companies
  const known: Record<string, string> = {
    'orange': 'FR', 'bnp paribas': 'FR', 'totalenergies': 'FR', 'sanofi': 'FR', 'axa': 'FR',
    'société générale': 'FR', 'crédit agricole': 'FR', 'engie': 'FR', 'edf': 'FR', 'capgemini': 'FR',
    'lvmh': 'FR', 'vinci': 'FR', 'bouygues': 'FR', 'danone': 'FR', 'schneider': 'FR',
    'attijariwafa bank': 'MA', 'ocp group': 'MA', 'holmarcom': 'MA', 'maroc telecom': 'MA', 'bank of africa': 'MA',
    'mtn group': 'ZA', 'standard bank': 'ZA', 'sanlam': 'ZA', 'discovery': 'ZA',
    'ecobank': 'TG', 'vodafone': 'GB', 'hsbc': 'GB', 'shell': 'GB', 'bp': 'GB',
    'siemens': 'DE', 'allianz': 'DE', 'bayer': 'DE', 'dhl': 'DE',
    'airtel africa': 'IN', 'jumia': 'DE', 'deloitte': 'GB',
    'glencore': 'CH', 'novartis': 'CH', 'roche': 'CH', 'zurich': 'CH',
    'cma cgm': 'FR', 'bolloré': 'FR', 'safran': 'FR', 'thales': 'FR', 'airbus': 'FR',
    'repsol': 'ES', 'inditex': 'ES', 'santander': 'ES', 'bbva': 'ES', 'mapfre': 'ES',
    'galp': 'PT', 'edp': 'PT', 'millennium bcp': 'PT',
  };
  for (const [k, v] of Object.entries(known)) {
    if (text.includes(k)) return v;
  }
  for (const [hint, code] of Object.entries(HQ_HINTS)) {
    if (text.includes(hint)) return code;
  }
  return 'FR';
}

// Briques inference from sector
const SECTOR_BRIQUES: Record<string, string> = {
  TEL: 'NAMYBR', BNK: 'NAMZBR', INS: 'NABZR', ENR: 'NBYR', PHR: 'NAMR',
  BTP: 'NBR', TEC: 'NAMBYR', LOG: 'NBR', CNS: 'NAMR', LUX: 'NABR',
  MIN: 'NBZR', AGR: 'NYR', DFI: 'NAMBZR', AUT: 'NABR', DEF: 'NMR',
  MED: 'NAY', FMC: 'NABR', AVA: 'NBR', IND: 'NABR', CHM: 'NBR',
  EDU: 'NAYR', IMM: 'NBR',
};

export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('key');
  if (secret !== 'eigen2026') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = createAdminClient();
  const results: Record<string, string> = {};

  // 1. Seed regulations (delete old + insert)
  try {
    await supabase.from('acq_regulations').delete().neq('name', '___impossible___');
    const regs = (regulationsRaw as Any[]).map(({ id: _id, ...rest }: Any) => rest);
    const { error } = await supabase.from('acq_regulations').insert(regs);
    results.regulations = error ? `Error: ${error.message}` : `Inserted ${regs.length} regulations`;
  } catch (e) {
    results.regulations = `Exception: ${e}`;
  }

  // 2. Create companies from enrichment + contacts data
  try {
    // Check if companies already exist
    const { count } = await supabase.from('acq_companies').select('id', { count: 'exact', head: true });
    if ((count || 0) > 50) {
      results.companies = `Skipped — ${count} companies already exist`;
    } else {
      // Build company set from both sources
      const companyNames = new Map<string, Any>();
      for (const e of enrichmentRaw as Any[]) {
        companyNames.set(e.company, e);
      }
      for (const c of contactsRaw as Any[]) {
        if (!companyNames.has(c.company)) {
          companyNames.set(c.company, { company: c.company, hq: c.hq });
        }
      }

      const rows = [...companyNames.entries()].map(([name, e]) => {
        const sector = inferSector(name, e.description);
        const hq = e.hq || inferHQ(name, e.description);
        const briques = SECTOR_BRIQUES[sector] || 'NR';
        const score = computeScore(briques);
        const tier = computeTier(e.annual_value_estimate ? e.annual_value_estimate / 1000000000 : 0.1);
        const priority = computePriority(score);
        const revenue = computeRevenue(tier);

        return {
          name,
          hq,
          sector,
          revenue_b: e.annual_value_estimate ? e.annual_value_estimate / 1000000000 : 0.1,
          employees_k: 10,
          corridor_countries: hq === 'FR' ? ['FR', 'MA', 'SN', 'CI'] : hq === 'MA' ? ['MA', 'SN', 'CI', 'FR'] : [hq, 'FR'],
          eigen_briques: briques,
          eigen_score: score,
          tier,
          pipeline_stage: 'identified',
          priority,
          annual_value_estimate: revenue,
          website: e.website || null,
          notes: e.description || null,
          trojan_horse: e.trojan_horse || null,
        };
      });

      // Delete existing then insert
      if ((count || 0) > 0) {
        await supabase.from('acq_contacts').delete().neq('name', '___impossible___');
        await supabase.from('acq_companies').delete().neq('name', '___impossible___');
      }

      for (let i = 0; i < rows.length; i += 50) {
        const chunk = rows.slice(i, i + 50);
        const { error } = await supabase.from('acq_companies').insert(chunk);
        if (error) { results.companies = `Error at batch ${i}: ${error.message}`; break; }
      }
      if (!results.companies) results.companies = `Inserted ${rows.length} companies`;
    }
  } catch (e) {
    results.companies = `Exception: ${e}`;
  }

  // 3. Seed contacts — match by company name
  try {
    const { data: companies } = await supabase.from('acq_companies').select('id, name');
    const companyMap = new Map<string, string>();
    for (const c of (companies || [])) companyMap.set(c.name.toLowerCase(), c.id);

    // Delete old contacts
    await supabase.from('acq_contacts').delete().neq('name', '___impossible___');

    let contactCount = 0;
    let skipped = 0;
    const contactRows: Any[] = [];

    for (const entry of contactsRaw as Any[]) {
      const companyId = companyMap.get(entry.company.toLowerCase());
      if (!companyId) { skipped++; continue; }

      for (const ct of entry.contacts) {
        if (ct.name === 'À identifier' || !ct.name) continue;
        contactRows.push({
          company_id: companyId,
          name: ct.name,
          role: ct.role || '',
          persona: ct.persona || 'cto',
          linkedin: ct.linkedin && ct.linkedin !== 'À identifier' ? (ct.linkedin.startsWith('http') ? ct.linkedin : `https://${ct.linkedin}`) : null,
          priority: 'P1',
        });
        contactCount++;
      }
    }

    for (let i = 0; i < contactRows.length; i += 100) {
      const chunk = contactRows.slice(i, i + 100);
      await supabase.from('acq_contacts').insert(chunk);
    }
    results.contacts = `Inserted ${contactCount} contacts (${skipped} companies not matched)`;
  } catch (e) {
    results.contacts = `Exception: ${e}`;
  }

  // 4. Seed events
  try {
    await supabase.from('acq_events').delete().neq('name', '___impossible___');
    const events = [
      { name: 'GITEX Africa', city: 'Marrakech', dates: '7-9 avril 2026', days: 3, targets: [] },
      { name: 'ATS London', city: 'London Stock Exchange', dates: '29 mai 2026', days: 1, targets: [] },
      { name: 'VivaTech Paris', city: 'Paris Expo', dates: '17-20 juin 2026', days: 4, targets: [] },
    ];
    const { error } = await supabase.from('acq_events').insert(events);
    results.events = error ? `Error: ${error.message}` : `Inserted ${events.length} events`;
  } catch (e) {
    results.events = `Exception: ${e}`;
  }

  // 5. Seed playbook
  try {
    await supabase.from('acq_playbook').delete().neq('persona', '___impossible___');
    const playbooks = [
      { persona: 'drh', hook: 'Vos collaborateurs en souffrance ne vous le disent pas — NOOS le détecte avant le burn-out.', script: 'Entry point. Le DRH achète NOOS (IA santé mentale) et YrKnown (knowledge). Le plus réceptif car impact humain direct. Approche empathique, ROI = réduction absentéisme + turnover.', objections: [{ objection: 'On a déjà un EAP', reponse: 'Un EAP réagit quand le collaborateur appelle. NOOS prévient avant que la crise n\'arrive — 3 semaines d\'avance en moyenne.' }, { objection: 'Le budget bien-être est limité', reponse: 'NOOS se finance sur la réduction d\'absentéisme. 1 jour d\'absence évité = €500. Sur 10 000 salariés, même 2% = €100K/an.' }, { objection: 'Nos collaborateurs ne voudront pas d\'IA', reponse: 'NOOS est invisible — pas de chatbot, pas de questionnaire. C\'est une couche d\'intelligence sur vos données RH existantes.' }], email_template: 'Objet: [Prénom], vos 10 000 collaborateurs vous parlent — mais pas tous\n\nBonjour [Prénom],\n\nJe suis [Nom], [Titre] chez Eigen Holding.\n\n[Entreprise] a [X] collaborateurs sur le corridor EU-Afrique. Parmi eux, 15-20% sont en détresse psychologique silencieuse — les données RH le montrent, mais les outils actuels ne le captent qu\'après le burn-out.\n\nNOOS détecte les signaux 3 semaines avant la crise. Pas de questionnaire, pas de chatbot — une couche IA sur vos données existantes.\n\nPuis-je vous montrer ce que NOOS voit dans un dataset anonymisé similaire au vôtre?\n\n[Signature]', cac: '€3-8K', ltv: '€50-150K' },
      { persona: 'dpo', hook: 'Le consentement que vous collectez aujourd\'hui ne survivra pas à l\'AI Act — ÆLYA le rend inattaquable.', script: 'Tiré par NOOS. Le DPO achète ÆLYA (consent management). Approche compliance-first. Le DPO vit dans la peur de l\'amende. Montrer que ÆLYA transforme le consentement en actif juridique défendable.', objections: [{ objection: 'On utilise déjà OneTrust / Cookiebot', reponse: 'OneTrust gère les cookies. ÆLYA gère le consentement IA — un champ réglementaire entièrement nouveau que l\'AI Act impose.' }, { objection: 'Le RGPD nous couvre déjà', reponse: 'L\'AI Act ajoute des obligations spécifiques sur le consentement algorithmique que le RGPD ne couvre pas — droit de contestation, explicabilité, traçabilité des décisions IA.' }], email_template: 'Objet: [Prénom], l\'AI Act change les règles du consentement — [Entreprise] est-elle prête?\n\nBonjour [Prénom],\n\nLe 2 août 2026, les obligations AI Act haut risque entrent en vigueur. Le consentement RGPD classique ne suffira plus pour les systèmes IA de [Entreprise] en recrutement, scoring, ou santé.\n\nÆLYA transforme chaque consentement en preuve juridique traçable et inattaquable.\n\nUn call de 15 min pour un audit rapide de votre exposition?\n\n[Signature]', cac: '€5-15K', ltv: '€80-200K' },
      { persona: 'cto', hook: 'Votre stack IA n\'a pas d\'audit trail — BURHAN en crée un en 48h.', script: 'Tiré par DPO. Le CTO achète BURHAN (audit trail), ÆLYA (consent), MYNε (data marketplace). Approche technique. Le CTO veut une intégration propre, pas un produit de plus. Montrer l\'API-first design.', objections: [{ objection: 'On a déjà des logs', reponse: 'Des logs techniques ≠ un audit trail réglementaire. BURHAN génère des preuves opposables, pas des lignes de texte.' }, { objection: 'On n\'a pas de bande passante pour intégrer', reponse: '48h d\'intégration. API REST + webhook. Votre équipe ne touche rien — BURHAN s\'injecte comme middleware.' }], email_template: 'Objet: [Prénom], un audit trail AI Act en 48h — sans toucher votre stack\n\nBonjour [Prénom],\n\nBURHAN s\'injecte comme middleware dans votre pipeline IA existant. Pas de refactoring, pas de migration — un audit trail réglementaire en 48h.\n\nAPI REST + webhook. Compatible avec tout ce que vous avez déjà.\n\nJe vous envoie la doc technique?\n\n[Signature]', cac: '€2-10K', ltv: '€60-180K' },
      { persona: 'rse', hook: 'Votre rapport ESG est déclaratif — BURHAN le rend vérifiable en temps réel.', script: 'Tiré par DRH. Le RSE achète NOOS (volet RPS santé mentale) et BURHAN (supply chain audit). Approche impact. Le RSE veut des métriques défendables, pas des promesses.', objections: [{ objection: 'Notre rapport CSRD est déjà audité', reponse: 'Audité annuellement. BURHAN fournit une preuve continue — chaque claim ESG traçable en temps réel, pas une fois par an.' }, { objection: 'CS3D ne nous concerne pas encore', reponse: 'Juillet 2029 — mais la transposition nationale commence en 2028. Les entreprises qui attendent seront en mode panique.' }], email_template: 'Objet: [Prénom], votre supply chain ESG est-elle vérifiable en temps réel?\n\nBonjour [Prénom],\n\nCS3D/CSDDD entre en application juillet 2029. BURHAN transforme chaque claim ESG de [Entreprise] en preuve blockchain vérifiable — pas un rapport annuel, une preuve continue.\n\nPuis-je vous montrer un cas sur une supply chain similaire à la vôtre?\n\n[Signature]', cac: '€4-12K', ltv: '€70-200K' },
      { persona: 'achats', hook: 'Vos fournisseurs corridor n\'ont pas de score ESG fiable — RAQIB le calcule en 24h.', script: 'Tiré par CTO. Le CPO achète BURHAN (supplier audit), MIZAN (settlement), RAQIB (intelligence). Approche ROI direct. Les Achats veulent réduire le risque fournisseur et les coûts de transaction corridor.', objections: [{ objection: 'On utilise déjà EcoVadis / Sedex', reponse: 'EcoVadis couvre l\'EU. RAQIB couvre le corridor Afrique — les fournisseurs que EcoVadis ne note pas.' }, { objection: 'Le corridor n\'est pas prioritaire', reponse: 'CS3D va rendre votre supply chain africaine aussi scrutée que l\'européenne. Mieux vaut scorer maintenant que subir en 2029.' }], email_template: 'Objet: [Prénom], vos 200 fournisseurs corridor ont-ils un score ESG?\n\nBonjour [Prénom],\n\nCS3D imposera une due diligence sur toute votre supply chain — y compris le corridor EU-Afrique. RAQIB score vos fournisseurs en 24h, là où EcoVadis ne va pas.\n\n15 min pour voir le scoring sur vos 10 premiers fournisseurs corridor?\n\n[Signature]', cac: '€3-8K', ltv: '€50-150K' },
      { persona: 'cfo', hook: 'MIZAN réduit vos coûts de settlement corridor de 60% — sans changer de banque.', script: 'Closing persona. Le CFO achète MIZAN (settlement) et RAQIB (intelligence). Approche financière pure. Le CFO veut des chiffres, pas des features. Montrer le ROI en 90 jours.', objections: [{ objection: 'On a déjà Swift / Western Union', reponse: 'Swift coûte 3-5% sur le corridor. MIZAN utilise la tokenisation pour réduire à 0.5-1%. Sur €10M de flux, c\'est €300K économisés par an.' }, { objection: 'Les trésoriers ne changeront pas de process', reponse: 'MIZAN s\'intègre dans votre TMS existant. Le trésorier ne change rien — il voit juste ses coûts baisser.' }], email_template: 'Objet: [Prénom], €300K/an d\'économies sur vos flux corridor — sans changer de banque\n\nBonjour [Prénom],\n\n[Entreprise] transfère environ €[X]M par an sur le corridor EU-Afrique. À 3-5% de frais Swift, c\'est €[Y]K de coûts invisibles.\n\nMIZAN réduit ces frais à 0.5-1% via tokenisation — sans changer de banque, sans changer de process.\n\nUn call de 15 min pour voir le calcul sur vos flux réels?\n\n[Signature]', cac: '€10-30K', ltv: '€200-500K' },
    ];
    const { error } = await supabase.from('acq_playbook').insert(playbooks);
    results.playbook = error ? `Error: ${error.message}` : `Inserted ${playbooks.length} playbooks`;
  } catch (e) {
    results.playbook = `Exception: ${e}`;
  }

  return NextResponse.json(results);
}
