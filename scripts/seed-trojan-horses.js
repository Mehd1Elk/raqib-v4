// Usage: SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... node scripts/seed-trojan-horses.js
const { createClient } = require('@supabase/supabase-js');

const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) { console.error('Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY'); process.exit(1); }

const supabase = createClient(url, key);

const HORSES = [
  {
    group_name: "Holmarcom", market: "MA", sector: "Assurance/Finance",
    contact_name: "Kenza Bensalah", contact_relation: "Amie de la mère du fondateur — fondatrice CG",
    trojan_name: "AMANA × Association Yza", trojan_emoji: "أمانة", trojan_color: "#3D7C5E",
    trojan_one_liner: "Tracer chaque dirham donné à l'Association Yza — de la cagnotte au bénéficiaire — via BURHAN",
    emotional_core: "L'Association Yza a été fondée par Kenza Bensalah en mémoire de sa fille décédée. La mère du fondateur Eigen est bénévole OB-GYN et figure aimée de l'association. On ne refuse pas un projet qui honore la mémoire d'un enfant. La technologie est le véhicule, l'émotion est le moteur.",
    trojan_mechanism: "BURHAN trace chaque don. ÆLYA gère le consentement donateur. Le donateur voit son dirham arriver au bénéficiaire. Transparence absolue.",
    free_deliverable: "App AMANA pilote pour l'Association Yza — traçabilité don de bout en bout. Coût Eigen: ~€200. Temps: 4 semaines.",
    cascade: [{"step":"AMANA Yza fonctionne → Kenza voit la puissance","brick":"BURHAN + ÆLYA","next":"Kenza pense: Et si on appliquait ça à Atlanta Assurances?"},{"step":"Atlanta Assurances intègre NOOS check-up assuré","brick":"NOOS","next":"5000 courtiers découvrent ÆLYA dans le parcours souscription"},{"step":"Courtiers propagent ÆLYA à tous les assureurs","brick":"ÆLYA","next":"Crédit du Maroc voit ÆLYA → tire vers la banque"},{"step":"Crédit du Maroc intègre ÆLYA + BURHAN + Crédit Lombard DIWANE","brick":"ÆLYA + BURHAN + DIWANE","next":"MYNε données actuarielles vendues aux réassureurs"},{"step":"MYNε + RAQIB + MIZAN déployés sur 4 verticales Holmarcom","brick":"MYNε + RAQIB + MIZAN","next":"7/7 briques sur Holmarcom"}],
    total_value: "€2-3M/an", why_irresistible: "On ne refuse pas un projet qui honore la mémoire d'un enfant décédé. Aucun pitch deck ne rivalise avec une mère qui raconte les familles aidées par Yza.",
    entry_brique: "BURHAN + ÆLYA"
  },
  {
    group_name: "Attijariwafa Bank", market: "MA", sector: "Banque panafricaine (15 pays)",
    contact_name: "DG via CFC (Oncle)", contact_relation: "Réseau institutionnel CFC",
    trojan_name: "DIWANE × Collection Attijari", trojan_emoji: "ديوان", trojan_color: "#9C3D3D",
    trojan_one_liner: "Authentifier la plus grande collection d'art corporate du Maroc et créer le premier Crédit Lombard Art d'Afrique",
    emotional_core: "Attijariwafa possède une des plus grandes collections d'art corporate marocain (Melehi, Belkahya, Gharbaoui, Chaibia). Aucune œuvre n'est authentifiée par IA, aucune n'a de provenance blockchain. L'art est la fierté culturelle d'Attijari. DIWANE transforme cette fierté en actif financier.",
    trojan_mechanism: "NOOS-Art (CNN/ViT) analyse chaque œuvre. BURHAN certifie la provenance blockchain. Attijari lance le Crédit Lombard Art — clients Private Banking empruntent contre leurs œuvres.",
    free_deliverable: "Rapport expertise DIWANE IA gratuit sur 20 œuvres phares. Fiches provenance BURHAN. Étude faisabilité Crédit Lombard. Coût: ~€500. Temps: 6 semaines.",
    cascade: [{"step":"Collection expertisée → la banque voit DIWANE","brick":"NOOS-Art + BURHAN","next":"DG Private Banking lance Crédit Lombard"},{"step":"Crédit Lombard Art pour clients HNW","brick":"BURHAN + MIZAN","next":"Collectionneurs marocains découvrent DIWANE"},{"step":"ÆLYA intégré pour consentement Private Banking","brick":"ÆLYA","next":"DSI étend ÆLYA à la conformité PSD3"},{"step":"MIZAN settlement inter-filiales 15 pays","brick":"MIZAN","next":"RAQIB intelligence pays alimente risk management"},{"step":"MYNε données transactionnelles pour DFI/chercheurs","brick":"MYNε + RAQIB + NOOS","next":"6/7 briques sur 15 pays"}],
    total_value: "€13M/an", why_irresistible: "L'art est l'identité culturelle d'Attijari. Proposer d'expertiser leur collection gratuitement c'est un cadeau, pas un pitch. Le Crédit Lombard Art est un produit NOUVEAU que personne d'autre ne peut livrer.",
    entry_brique: "NOOS-Art + BURHAN"
  },
  {
    group_name: "Bank of Africa/BMCE", market: "MA", sector: "Banque panafricaine (17 pays)",
    contact_name: "Brahim Benjelloun", contact_relation: "Cousin grand-mère — Membre fondateur CG",
    trojan_name: "DIWANE × Fondation BMCE Éducation", trojan_emoji: "ديوان", trojan_color: "#3D7C5E",
    trojan_one_liner: "Les enfants des écoles Fondation BMCE créent de l'art, certifié blockchain, vendu aux enchères pour financer de nouvelles écoles",
    emotional_core: "La Fondation BMCE pour l'Éducation (Leila Mezian Benjelloun) = 68 écoles rurales. L'art des enfants finance l'éducation des enfants. Le canal affectif familial via Brahim est infiniment plus puissant que le canal commercial.",
    trojan_mechanism: "BURHAN certifie chaque œuvre d'enfant. DIWANE plateforme enchères au Forum de Dakhla. Chaque dirham tracé de l'acheteur à l'école (playbook AMANA).",
    free_deliverable: "Programme pilote 3 écoles. 50 œuvres certifiées. Vente aux enchères pilote. Coût: ~€200. Temps: 8 semaines.",
    cascade: [{"step":"Fondation adopte DIWANE → Brahim voit l'impact","brick":"BURHAN + DIWANE","next":"Brahim pense: Et la traçabilité certificats médicaux 13K employés?"},{"step":"BURHAN portail entreprise 17 pays","brick":"BURHAN","next":"DSI BOA tire ÆLYA vers conformité données bancaires"},{"step":"ÆLYA Open Banking + consent 17 juridictions","brick":"ÆLYA","next":"MIZAN settlement inter-filiales corridor"},{"step":"MIZAN + clients corporate","brick":"MIZAN","next":"MYNε datasets + RAQIB intelligence"},{"step":"Stack complet 17 pays","brick":"MYNε + RAQIB + NOOS","next":"6/7 briques sur le réseau bancaire le plus étendu d'Afrique"}],
    total_value: "€5.3M/an", why_irresistible: "On ne refuse pas un projet qui fait créer de l'art aux enfants pour financer l'éducation des enfants. Brahim ne présente pas un outil tech — il présente un projet pour la Fondation de sa tante Leila.",
    entry_brique: "BURHAN + DIWANE"
  },
  {
    group_name: "OCP Group", market: "MA", sector: "Phosphate/Mines",
    contact_name: "DG Innovation via UM6P", contact_relation: "Institutionnel UM6P/GITEX",
    trojan_name: "YrKnown × Les Derniers Maîtres de Khouribga", trojan_emoji: "معرفة", trojan_color: "#B87D3E",
    trojan_one_liner: "Capturer le savoir tacite des derniers ingénieurs mines de Khouribga avant leur retraite — 35 ans d'expertise qui disparaissent en 5 ans",
    emotional_core: "OCP Khouribga = berceau phosphatier marocain depuis 1921. La génération d'ingénieurs 1960-70 part en retraite massivement. D'ici 2030, 40% du savoir tacite aura disparu. YrKnown transforme chaque ingénieur en LoRA immortel.",
    trojan_mechanism: "10 ingénieurs × 60h de Knowledge Interviews. Whisper transcrit. LoRA fine-tuné. Le jeune ingénieur pose une question au LoRA de Si Mohammed et reçoit 35 ans d'expérience.",
    free_deliverable: "5 Knowledge Interviews pilotes. 5 LoRA fine-tunés. Démo live. Coût: ~€1K. Temps: 6 semaines.",
    cascade: [{"step":"LoRA fonctionnent → DG Innovation sidéré","brick":"YrKnown","next":"Et si on traçait chaque lot de phosphate?"},{"step":"BURHAN traçabilité phosphate Jorf Lasfar → OCP Africa","brick":"BURHAN","next":"ÆLYA consent coopératives agricoles OCP Africa"},{"step":"ÆLYA + BURHAN sur 15+ pays distribution engrais","brick":"ÆLYA + BURHAN","next":"RAQIB intelligence matières premières"},{"step":"MYNε données agricoles vendues aux DFI","brick":"MYNε + RAQIB","next":"5/7 briques de la mine au champ"}],
    total_value: "€5-8M/an", why_irresistible: "Un DG qui voit un ingénieur de 62 ans répondre via un LoRA ne peut pas dire non. C'est viscéral. Et le playbook se réplique chez Siemens, Sanofi, TotalEnergies.",
    entry_brique: "YrKnown"
  },
  {
    group_name: "Orange", market: "EU/Corridor", sector: "Télécom + Mobile Money",
    contact_name: "Forum Dakhla / VivaTech", contact_relation: "Événementiel + CVC",
    trojan_name: "AMANA × Orange Money Zakat", trojan_emoji: "زكاة", trojan_color: "#5E8C3D",
    trojan_one_liner: "Premier service de zakat digitale traçable sur Orange Money — chaque dirham du donateur au bénéficiaire via BURHAN",
    emotional_core: "150M+ musulmans utilisent Orange Money dans 18 pays. Le marché zakat Afrique de l'Ouest = €3-5B/an dont 90% informel sans traçabilité. L'obligation religieuse rencontre la technologie.",
    trojan_mechanism: "Donateur sur Orange Money SN envoie zakat → BURHAN trace → bénéficiaire Mali reçoit sur Orange Money ML → donateur voit la preuve. Ramadan = pic utilisation.",
    free_deliverable: "Module AMANA Zakat dans l'app Orange Money. Pilote Sénégal. Coût: ~€500. Temps: 6 semaines.",
    cascade: [{"step":"Zakat traçable fonctionne → Orange voit l'impact Ramadan","brick":"BURHAN + MIZAN","next":"Orange pense: Et si on traçait TOUTES les transactions?"},{"step":"BURHAN + ÆLYA déployés sur Orange Money 18 pays","brick":"BURHAN + ÆLYA","next":"MYNε données mobile anonymisées"},{"step":"MYNε datasets Orange Money vendus aux DFI/chercheurs","brick":"MYNε","next":"NOOS bien-être financier intégré à l'app"},{"step":"RAQIB intelligence télécom corridor","brick":"RAQIB + NOOS","next":"6/7 briques sur 18 pays Orange"}],
    total_value: "€25-40M/an", why_irresistible: "150M musulmans × Ramadan = pic utilisation sans précédent. Orange ne peut pas ignorer €3-5B de flux zakat informels. Et le produit est socialement irréprochable.",
    entry_brique: "BURHAN + MIZAN"
  },
  {
    group_name: "TotalEnergies", market: "EU", sector: "Énergie",
    contact_name: "Monjou + Lambert (Lazard)", contact_relation: "Advisors Eigen",
    trojan_name: "BURHAN × Crédits Carbone Certifiés", trojan_emoji: "🌿", trojan_color: "#2D5016",
    trojan_one_liner: "Certifier chaque crédit carbone TotalEnergies sur blockchain — éliminer le risque greenwashing à €5B",
    emotional_core: "TotalEnergies dépense €1B+/an en crédits carbone. 30% des crédits carbone mondiaux sont frauduleux. 1 scandale greenwashing = €5B de perte de capitalisation. BURHAN est une assurance.",
    trojan_mechanism: "BURHAN certifie chaque crédit carbone de l'achat au retirement. Audit trail immutable. Le rapport ESG cite BURHAN comme preuve.",
    free_deliverable: "Audit gratuit de 100 crédits carbone TotalEnergies. Rapport provenance blockchain. Coût: ~€500. Temps: 4 semaines.",
    cascade: [{"step":"Audit crédits carbone → le Dir. RSE voit la valeur","brick":"BURHAN","next":"Le Dir. Achats tire BURHAN vers la supply chain 5000 fournisseurs"},{"step":"BURHAN supply chain CS3D 5000 Tier 1","brick":"BURHAN","next":"ÆLYA consent données employés + stations"},{"step":"ÆLYA 16K stations + MIZAN settlement corridor","brick":"ÆLYA + MIZAN","next":"MYNε données énergie anonymisées"},{"step":"MYNε + RAQIB + NOOS RPS 100K employés","brick":"MYNε + RAQIB + NOOS","next":"6/7 briques sur l'industrie énergétique"}],
    total_value: "€2.3M/an", why_irresistible: "Greenwashing = risque €5B capitalisation. BURHAN = assurance à €30K/an. Le Dir. RSE ne peut pas justifier de ne PAS souscrire.",
    entry_brique: "BURHAN"
  },
  {
    group_name: "BNP Paribas", market: "EU", sector: "Banque",
    contact_name: "Lambert (Lazard)", contact_relation: "Advisory",
    trojan_name: "DIWANE × Art Advisory Wealth Management", trojan_emoji: "ديوان", trojan_color: "#7B5EA7",
    trojan_one_liner: "Créer le premier Crédit Lombard art africain pour la clientèle Private Banking BNP",
    emotional_core: "BNP Wealth Management gère €400B+ AUM. L'art africain contemporain est le segment le plus performant (+300% en 10 ans). Aucune banque ne propose de Crédit Lombard sur art africain faute d'expertise d'évaluation. DIWANE comble ce vide.",
    trojan_mechanism: "NOOS-Art évalue les œuvres. BURHAN certifie provenance. BNP lance Crédit Lombard art africain. Les collectionneurs empruntent contre leurs Melehi et Chaibia.",
    free_deliverable: "Étude DIWANE sur 30 œuvres art africain de clients BNP Private. Coût: ~€300. Temps: 6 semaines.",
    cascade: [{"step":"Crédit Lombard art africain lancé → succès Private Banking","brick":"DIWANE + BURHAN","next":"ÆLYA intégré pour consentement PSD3 30M clients"},{"step":"ÆLYA sur 30M clients + 8000 ESN prestataires","brick":"ÆLYA","next":"MIZAN settlement corridor + BURHAN compliance"},{"step":"MIZAN + BURHAN DORA sur 190K employés","brick":"MIZAN + BURHAN","next":"MYNε datasets bancaires pour chercheurs"},{"step":"Stack complet BNP","brick":"MYNε + RAQIB + NOOS","next":"6/7 briques premier bancaire EU"}],
    total_value: "€4.5M/an", why_irresistible: "Lambert est chez Lazard. L'intro est directe. Et le Crédit Lombard art africain est un produit NOUVEAU qui génère des commissions jour 1.",
    entry_brique: "DIWANE + BURHAN"
  },
  {
    group_name: "Sanofi", market: "EU", sector: "Pharma",
    contact_name: "Pr. Bayle + Salvaudon", contact_relation: "Advisory",
    trojan_name: "ÆLYA × Consentement Clinique Afrique", trojan_emoji: "عليا", trojan_color: "#3D7C5E",
    trojan_one_liner: "Garantir le consentement éclairé digital pour les essais cliniques Sanofi en Afrique — éliminer le risque éthique à €100M",
    emotional_core: "1 scandale de consentement invalide en Afrique = arrêt essai + procès + €100M+ de pertes. ÆLYA = assurance éthique à €50K/an.",
    trojan_mechanism: "ÆLYA consent digital multilingue (français, wolof, haoussa, yoruba). BURHAN audit trail immutable. ICH-GCP conforme.",
    free_deliverable: "Pilote ÆLYA consent pour 1 essai clinique Sanofi Sénégal. Coût: ~€500. Temps: 6 semaines.",
    cascade: [{"step":"Consent digital fonctionne → Dir. Medical Affairs convaincu","brick":"ÆLYA + BURHAN","next":"IQVIA (CRO) intègre ÆLYA pour ses 500 autres clients pharma"},{"step":"EU FMD sérialisation via BURHAN","brick":"BURHAN","next":"MYNε données pharmacovigilance anonymisées"},{"step":"YrKnown Knowledge Interviews chercheurs R&D","brick":"YrKnown","next":"MYNε + RAQIB intelligence pharma"},{"step":"5/7 briques sur 100 pays Sanofi","brick":"MYNε + RAQIB","next":"IQVIA propage à toute la pharma"}],
    total_value: "€4.5M/an", why_irresistible: "IQVIA utilise ÆLYA pour Sanofi puis pour 500 autres pharmas. 1 cheval de troie Sanofi ouvre toute l'industrie pharmaceutique mondiale.",
    entry_brique: "ÆLYA + BURHAN"
  },
  {
    group_name: "Siemens", market: "EU", sector: "Industrie",
    contact_name: "Pecori / Kienbaum", contact_relation: "Advisory Eigen",
    trojan_name: "YrKnown × Les Derniers Maîtres de Siemens", trojan_emoji: "Wissen", trojan_color: "#B87D3E",
    trojan_one_liner: "Capturer le savoir tacite des ingénieurs Siemens avant la vague baby-boomer — même playbook que OCP Khouribga",
    emotional_core: "40% des ingénieurs seniors Siemens partent d'ici 2030. Kienbaum connaît ce problème — c'est le sujet #1 des DRH. Le technicien de maintenance à 3h du matin à Dakhla pose une question sur la turbine → le LoRA de Herr Schmidt répond.",
    trojan_mechanism: "YrKnown Knowledge Interviews 10 ingénieurs seniors. LoRA fine-tuné. Kienbaum présente au CHRO comme knowledge retention program.",
    free_deliverable: "5 KI pilotes. 5 LoRA. Démo live au CHRO via Kienbaum. Rapport Knowledge Retention ROI en allemand. Coût: ~€1K. Temps: 6 semaines.",
    cascade: [{"step":"LoRA fonctionnent → CHRO présente au board","brick":"YrKnown","next":"CSO pense: 90K fournisseurs à tracer pour la LkSG → BURHAN?"},{"step":"BURHAN LkSG supply chain 90K fournisseurs","brick":"BURHAN","next":"ÆLYA + NOOS RPS 320K employés"},{"step":"ÆLYA conformité RGPD/AI Act 190 pays","brick":"ÆLYA + NOOS","next":"MIZAN + RAQIB projets infra corridor"},{"step":"7/7 briques sur 190 pays","brick":"MYNε + MIZAN + RAQIB","next":"Kienbaum propage à BMW, BASF, Bosch, Continental"}],
    total_value: "€10M/an", why_irresistible: "Kienbaum a 500+ clients GE. Si le pilote YrKnown fonctionne chez Siemens, Kienbaum le propose à tout le Mittelstand. Le cheval de troie Siemens est un cheval de troie pour toute l'industrie allemande.",
    entry_brique: "YrKnown"
  },
  {
    group_name: "AXA", market: "EU", sector: "Assurance",
    contact_name: "Monjou + Bayle", contact_relation: "Advisors",
    trojan_name: "NOOS × Check-Up Santé Mentale Assuré AXA", trojan_emoji: "◎", trojan_color: "#3D5E8C",
    trojan_one_liner: "Check-up santé mentale annuel gratuit pour chaque assuré AXA — transformer la prévention en économie de sinistres",
    emotional_core: "CEO AXA Buberl a déclaré la santé mentale priorité #1 en 2024. AXA dépense €2B+/an en sinistres santé mentale. NOOS détecte AVANT que le sinistre arrive. 1 hospitalisation psy évitée = €15-25K économisés.",
    trojan_mechanism: "NOOS check-up 12 minutes dans l'app AXA. Score vert/orange/rouge. AXA adapte la couverture. Données anonymisées pour tarification actuarielle.",
    free_deliverable: "Module NOOS check-up intégré app AXA. Pilote 50K assurés France. Dashboard actuariel corrélation score × sinistralité. Coût: ~€2K. Temps: 8 semaines.",
    cascade: [{"step":"50K check-ups → corrélation prouvée score NOOS = sinistralité","brick":"NOOS","next":"Dir. Actuariat veut les données anonymisées → MYNε"},{"step":"MYNε datasets actuariels vendus à Munich Re, Swiss Re","brick":"MYNε","next":"ÆLYA consent données santé 50M assurés"},{"step":"ÆLYA 50M assurés + 30K courtiers","brick":"ÆLYA + BURHAN","next":"MIZAN + RAQIB + YrKnown"},{"step":"6/7 briques sur 50 pays AXA","brick":"MIZAN + RAQIB + YrKnown","next":"30K courtiers propagent Eigen à Generali, Allianz, Zurich"}],
    total_value: "€13.5M/an", why_irresistible: "Le CEO a déclaré la santé mentale priorité #1. NOOS est la réponse. Et le ROI est 1000x : 0.1% de dépistages réussis sur 50M assurés = €750M-1.25B d'économies.",
    entry_brique: "NOOS"
  },
  {
    group_name: "Maroc Telecom", market: "MA", sector: "Télécom",
    contact_name: "GITEX / CFC Oncle", contact_relation: "Réseau CFC",
    trojan_name: "AlgueSov × Moov Agri Dakhla", trojan_emoji: "🌊", trojan_color: "#3D7C8C",
    trojan_one_liner: "MIZAN fait de Moov Money le wallet ouvert du corridor — la stratégie Android contre iPhone d'Orange Money",
    emotional_core: "Moov Money est en retard face à Orange Money et Wave. MIZAN donne l'interopérabilité : si Moov intègre MIZAN, Moov devient compatible avec Orange Money et Wave. L'ouverture bat la fermeture.",
    trojan_mechanism: "POC MIZAN interopérabilité Moov→Orange sur CI. Les pêcheurs Dakhla (AlgueSov) utilisent Moov Money + BURHAN traçabilité captures.",
    free_deliverable: "POC MIZAN interop 3 mois CI. KPI: taux completion inter-wallet. Coût: ~€1K. Temps: 8 semaines.",
    cascade: [{"step":"Interop fonctionne → +15% transactions","brick":"MIZAN","next":"BURHAN + ÆLYA intégrés Moov Money standard"},{"step":"9 pays Moov Africa déployés","brick":"BURHAN + ÆLYA","next":"MYNε données mobile anonymisées"},{"step":"RAQIB intelligence télécom","brick":"RAQIB + MYNε","next":"NOOS via partenariat santé mobile"},{"step":"5/7 briques sur 9 pays Moov","brick":"NOOS + YrKnown","next":"Moov devient le hub ouvert du corridor"}],
    total_value: "€8-12M/an", why_irresistible: "L'argument est existentiel pour Moov: sans interop, Moov meurt face à Orange Money. Avec MIZAN, Moov devient le hub ouvert. C'est survie, pas innovation.",
    entry_brique: "MIZAN"
  }
];

async function seed() {
  // Find company IDs
  const { data: companies } = await supabase.from('acq_companies').select('id, name');
  const map = new Map();
  for (const c of (companies || [])) map.set(c.name.toLowerCase(), c.id);

  // Delete existing
  await supabase.from('acq_trojan_horses').delete().neq('group_name', '___');

  const rows = HORSES.map(h => {
    // Try to match company
    const companyId = map.get(h.group_name.toLowerCase()) || null;
    return { ...h, company_id: companyId };
  });

  const { data, error } = await supabase.from('acq_trojan_horses').insert(rows);
  if (error) console.error('Error:', error.message);
  else console.log(`Inserted ${rows.length} trojan horses`);

  // Verify
  const { count } = await supabase.from('acq_trojan_horses').select('id', { count: 'exact', head: true });
  console.log('Total trojan horses in DB:', count);
}

seed();
