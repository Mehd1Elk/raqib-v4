import { NextResponse } from 'next/server';
import type { PlaybookPersona, Persona } from '@/components/acquisition/types';

const PLAYBOOK: PlaybookPersona[] = [
  {
    persona: 'DRH',
    hook: 'Vos obligations CSRD/AI Act exigent un audit complet de vos pratiques RH algorithmiques d\'ici 2026.',
    script_approche: `Bonjour [NOM],

Je me permets de vous contacter car [ENTREPRISE] figure parmi les entreprises soumises à la CSRD et à l'AI Act, qui imposent de nouvelles obligations sur les processus RH automatisés.

Concrètement, d'ici août 2026, tout outil de tri de CV, scoring candidat ou gestion prédictive des talents devra être audité et documenté. Les sanctions vont jusqu'à 35M€.

Eigen a développé une suite intégrée qui permet en 4 semaines de :
- Cartographier vos outils RH à risque (ÆLYA)
- Documenter la conformité (NOOS)
- Monitorer en continu (RAQIB)

Seriez-vous disponible pour un call de 20 minutes la semaine prochaine ?`,
    objections: [
      { objection: 'On a déjà un DPO qui gère ça', reponse: 'Le DPO gère le RGPD, mais l\'AI Act crée des obligations spécifiques sur les systèmes RH automatisés qui nécessitent une expertise technique dédiée. Nous complétons le DPO, nous ne le remplaçons pas.' },
      { objection: 'Ce n\'est pas urgent, on a jusqu\'à 2026', reponse: 'L\'AI Act entre en application par phases. Les interdictions sont déjà en vigueur depuis février 2025. Les obligations de transparence RH arrivent en août 2025. Attendre 2026 = être en retard.' },
      { objection: 'On n\'utilise pas d\'IA dans nos RH', reponse: 'La plupart de nos clients pensaient la même chose. Mais LinkedIn Recruiter, les ATS avec scoring, même les filtres Excel automatisés entrent dans le scope. Notre audit ÆLYA identifie ces systèmes cachés.' },
      { objection: 'Le budget n\'est pas prévu', reponse: 'Le coût de non-conformité est de 35M€ ou 7% du CA. Notre audit initial coûte moins qu\'une journée de consultant Big4 et donne un plan d\'action concret.' },
    ],
    template_email: `Objet : [ENTREPRISE] — Conformité AI Act & CSRD pour vos processus RH

Bonjour [NOM],

L'entrée en vigueur progressive de l'AI Act et de la CSRD impose de nouvelles obligations sur les outils RH automatisés (tri CV, scoring, talent management).

Eigen accompagne les DRH dans :
✓ L'audit des systèmes RH à risque
✓ La documentation de conformité
✓ Le monitoring continu

Disponible pour un échange de 20 min cette semaine ?

Cordialement`,
    produits: ['ÆLYA Audit RH', 'NOOS Documentation', 'RAQIB Monitoring'],
    prix: '15K-50K€ / audit initial + 2K-5K€/mois monitoring',
    cac: '3 200€',
    ltv: '45 000€',
  },
  {
    persona: 'DSI',
    hook: 'NIS2 et DORA imposent des tests de résilience et un reporting cyber en temps réel dès 2025.',
    script_approche: `Bonjour [NOM],

[ENTREPRISE] est soumise à NIS2 et/ou DORA, qui exigent des capacités de détection, reporting et résilience opérationnelle que la plupart des SI ne couvrent pas encore.

Les inspections commencent et les premières sanctions tombent. Les DSI qui n'ont pas mis en place le reporting en 72h et les tests de résilience s'exposent à des pénalités personnelles.

Notre stack BURHAN + MYNε + RAQIB offre :
- Détection et classification des incidents (BURHAN)
- Tests de résilience automatisés (MYNε)
- Reporting réglementaire temps réel (RAQIB)

Un call de 25 minutes pour voir votre couverture actuelle ?`,
    objections: [
      { objection: 'On a déjà un SOC/SIEM', reponse: 'BURHAN ne remplace pas votre SOC, il ajoute la couche compliance que votre SIEM ne couvre pas : classification réglementaire des incidents, reporting NIS2 en 72h, et preuve de conformité pour les audits.' },
      { objection: 'Notre infra est on-premise, pas cloud', reponse: 'MYNε et BURHAN fonctionnent en mode hybride. Nous déployons un agent léger on-premise qui remonte les données vers votre instance RAQIB, sans exfiltration de données sensibles.' },
      { objection: 'On attend les décrets d\'application nationaux', reponse: 'NIS2 est transposée dans 80% des États membres. La France a publié son projet de loi. Attendre la version finale = 6-12 mois de retard sur la mise en conformité technique.' },
      { objection: 'C\'est trop cher pour notre taille', reponse: 'NIS2 élargit le scope aux "entités importantes" (>50 employés, >10M€ CA). Notre offre Tier 2 à 5K€/mois couvre l\'essentiel. Le coût journalier de non-conformité DORA est de 1% du CA.' },
    ],
    template_email: `Objet : [ENTREPRISE] — Conformité NIS2/DORA : couverture technique

Bonjour [NOM],

Les obligations NIS2 et DORA exigent un reporting d'incident en 72h et des tests de résilience documentés. La plupart des SIEM ne couvrent pas ces exigences réglementaires.

BURHAN + MYNε + RAQIB complètent votre stack existant :
✓ Classification réglementaire des incidents
✓ Tests de résilience automatisés
✓ Reporting temps réel pour les autorités

20 minutes pour évaluer votre couverture actuelle ?

Cordialement`,
    produits: ['BURHAN Cyber Compliance', 'MYNε Resilience Testing', 'RAQIB Reporting'],
    prix: '20K-80K€ setup + 5K-15K€/mois',
    cac: '4 500€',
    ltv: '120 000€',
  },
  {
    persona: 'DPO',
    hook: 'L\'AI Act transforme le rôle du DPO : vous êtes désormais responsable de systèmes que vous ne contrôlez pas encore.',
    script_approche: `Bonjour [NOM],

En tant que DPO de [ENTREPRISE], vous savez que l'AI Act élargit considérablement votre périmètre de responsabilité. Les systèmes d'IA à haut risque — RH, crédit scoring, surveillance — doivent être documentés et audités.

Le problème : la plupart des DPO n'ont pas de visibilité sur tous les systèmes IA déployés dans leur organisation.

NOOS + ÆLYA cartographient automatiquement vos systèmes IA, évaluent leur niveau de risque, et génèrent la documentation AI Act requise. YrKnown gère le consentement et la transparence.

Un call pour voir comment automatiser votre mise en conformité AI Act ?`,
    objections: [
      { objection: 'Je gère déjà le RGPD, l\'AI Act c\'est pareil', reponse: 'L\'AI Act est complémentaire au RGPD mais avec des obligations spécifiques : évaluation de conformité, documentation technique, monitoring post-déploiement. C\'est un nouveau registre, pas une extension du RGPD.' },
      { objection: 'On n\'a pas de systèmes IA à haut risque', reponse: 'Notre audit ÆLYA chez des entreprises similaires révèle en moyenne 12 systèmes qui entrent dans le scope AI Act, souvent des outils SaaS tiers. Mieux vaut vérifier maintenant.' },
      { objection: 'Les guidelines EDPB ne sont pas finalisées', reponse: 'Les obligations de base (transparence, documentation, évaluation de risque) sont dans le texte final. Les guidelines EDPB affineront les détails mais le cadre est fixé. Démarrer maintenant permet d\'itérer.' },
      { objection: 'Notre cabinet d\'avocats s\'en occupe', reponse: 'Les avocats gèrent le juridique, mais l\'AI Act exige une documentation technique que seul un outil peut générer efficacement. Nous produisons le livrable technique, votre cabinet valide le juridique.' },
      { objection: 'Le budget compliance est épuisé cette année', reponse: 'Notre module NOOS Documentation démarre à 2K€/mois. C\'est moins que 2h de conseil juridique par semaine. Et ça génère automatiquement les documents que vos avocats facturent habituellement.' },
    ],
    template_email: `Objet : [ENTREPRISE] — Outillage DPO pour l'AI Act

Bonjour [NOM],

L'AI Act élargit le périmètre du DPO aux systèmes d'IA. La documentation technique, l'évaluation de risque et le monitoring sont désormais obligatoires.

NOOS + ÆLYA + YrKnown vous donnent :
✓ Cartographie automatique des systèmes IA
✓ Documentation AI Act générée
✓ Gestion du consentement et transparence

Un échange de 20 minutes pour évaluer votre périmètre AI Act ?

Cordialement`,
    produits: ['NOOS Data Governance', 'ÆLYA AI Audit', 'YrKnown Consent'],
    prix: '10K-30K€ audit + 2K-8K€/mois',
    cac: '2 800€',
    ltv: '65 000€',
  },
  {
    persona: 'COO',
    hook: 'CS3D impose un devoir de vigilance sur toute votre supply chain — le COO est en première ligne.',
    script_approche: `Bonjour [NOM],

La directive CS3D (Corporate Sustainability Due Diligence) impose à [ENTREPRISE] de cartographier, évaluer et remédier les risques ESG sur l'ensemble de votre chaîne de valeur.

En tant que COO, vous êtes le point focal opérationnel. Les pénalités vont jusqu'à 5% du CA net mondial.

MIZAN cartographie votre supply chain, identifie les risques, et génère les plans de remédiation. RAQIB assure le reporting continu aux autorités.

Disponible pour un diagnostic rapide de votre exposition CS3D ?`,
    objections: [
      { objection: 'Notre supply chain est déjà auditée', reponse: 'CS3D va au-delà de l\'audit ponctuel : monitoring continu, plan de remédiation documenté, reporting aux autorités. MIZAN automatise ce suivi permanent que les audits ponctuels ne couvrent pas.' },
      { objection: 'On est une entreprise de services, pas d\'industrie', reponse: 'CS3D couvre aussi les services : vos prestataires IT, vos data centers, vos fournisseurs de cloud. Toute entreprise >500 employés est concernée, industrie ou services.' },
      { objection: 'Le sujet est géré par notre direction RSE', reponse: 'La RSE définit la politique, le COO l\'exécute. CS3D exige des actions opérationnelles concrètes sur la supply chain : c\'est votre responsabilité. Nous fournissons l\'outil qui vous permet de piloter.' },
      { objection: 'On n\'a pas les données de nos sous-traitants', reponse: 'C\'est exactement le problème que MIZAN résout. Notre plateforme collecte les données via questionnaires automatisés, scoring public, et intégration avec vos systèmes achats existants.' },
    ],
    template_email: `Objet : [ENTREPRISE] — Devoir de vigilance CS3D : préparer vos opérations

Bonjour [NOM],

La directive CS3D impose un devoir de vigilance continu sur votre supply chain. En tant que COO, vous portez la responsabilité opérationnelle.

MIZAN + RAQIB vous permettent de :
✓ Cartographier les risques ESG fournisseurs
✓ Automatiser la collecte de données supply chain
✓ Reporter en continu aux autorités

Un diagnostic rapide de votre exposition CS3D en 25 minutes ?

Cordialement`,
    produits: ['MIZAN Supply Chain', 'RAQIB Reporting', 'YrKnown Transparency'],
    prix: '25K-100K€ setup + 5K-20K€/mois',
    cac: '5 200€',
    ltv: '180 000€',
  },
  {
    persona: 'CEO',
    hook: 'La conformité réglementaire est devenue un risque board-level : CSRD, AI Act, CS3D convergent en 2026.',
    script_approche: `Bonjour [NOM],

En 2026, [ENTREPRISE] fait face à une convergence réglementaire sans précédent : CSRD, AI Act, NIS2, et bientôt CS3D. Chacune avec ses propres sanctions, deadlines et obligations de reporting.

Le risque pour le CEO : responsabilité personnelle sur le reporting CSRD, sanctions AI Act jusqu'à 7% du CA mondial, et devoir de vigilance CS3D.

Eigen est la plateforme unifiée qui consolide toutes ces obligations en un seul dashboard. Nos 7 briques couvrent l'intégralité du spectre réglementaire.

Je propose un briefing de 30 minutes pour vous montrer votre exposition consolidée et comment Eigen la simplifie.`,
    objections: [
      { objection: 'J\'ai des priorités plus urgentes que la compliance', reponse: 'La non-conformité est devenue la priorité : 7% du CA pour l\'AI Act, 5% pour CS3D, exclusion des marchés publics pour CSRD. Le coût de l\'inaction dépasse largement l\'investissement compliance.' },
      { objection: 'On gère ça en interne', reponse: 'La convergence CSRD + AI Act + NIS2 + CS3D nécessite des compétences transverses que peu d\'équipes internes possèdent. Eigen permet à votre équipe de piloter sans recruter 4 experts supplémentaires.' },
      { objection: 'Mon directeur juridique gère la compliance', reponse: 'Le juridique interprète les textes, mais l\'exécution est opérationnelle et technique. Eigen est l\'outil qui transforme les obligations juridiques en actions concrètes pour vos équipes.' },
      { objection: 'Combien ça coûte exactement ?', reponse: 'Notre modèle est progressif : de 5K€/mois (Tier 2, PME) à 150K€/mois (Tier 0, large cap). Le ROI se mesure en risque évité : une seule sanction RGPD coûte en moyenne 1.2M€. Nous sommes 10× moins cher.' },
    ],
    template_email: `Objet : [ENTREPRISE] — Convergence réglementaire 2026 : briefing CEO

Bonjour [NOM],

2026 marque la convergence de CSRD, AI Act, NIS2 et CS3D. L'exposition cumulée pour [ENTREPRISE] représente un risque significatif.

Eigen consolide toutes les obligations en une plateforme unifiée :
✓ Dashboard risque réglementaire consolidé
✓ Monitoring continu et alertes
✓ Reporting automatisé multi-régulations

Un briefing de 30 minutes pour visualiser votre exposition ?

Cordialement`,
    produits: ['Suite Eigen complète', 'RAQIB Dashboard Consolidé', 'MIZAN + NOOS + BURHAN'],
    prix: '50K-200K€/an tout compris',
    cac: '8 500€',
    ltv: '350 000€',
  },
  {
    persona: 'CFO',
    hook: 'Les nouvelles réglementations créent des passifs cachés : CSRD impacte vos provisions, AI Act votre valorisation.',
    script_approche: `Bonjour [NOM],

En tant que CFO de [ENTREPRISE], vous savez que CSRD, DORA et l'EU Taxonomy modifient directement vos obligations de reporting financier et vos provisions pour risques.

Le problème : les risques compliance ne sont pas encore intégrés dans vos modèles financiers, mais les auditeurs et investisseurs commencent à les exiger.

RAQIB quantifie votre exposition réglementaire en euros, MIZAN valorise votre conformité ESG pour les investisseurs, et NOOS automatise le reporting intégré financier + extra-financier.

Un call pour quantifier l'impact financier de votre exposition réglementaire ?`,
    objections: [
      { objection: 'Notre CAC gère déjà le reporting CSRD', reponse: 'Le CAC vérifie, il ne produit pas. RAQIB génère les données que votre CAC valide. Résultat : -60% sur vos honoraires d\'audit extra-financier et des données plus fiables.' },
      { objection: 'La compliance est un centre de coût, pas un investissement', reponse: 'Les entreprises avec un score ESG élevé ont un coût du capital 0.5-1% inférieur. Sur votre dette, ça représente [X]M€ d\'économie. MIZAN documente votre conformité pour les agences de notation.' },
      { objection: 'On n\'a pas le budget cette année', reponse: 'Le coût de non-conformité moyen est de 4.2M€ par incident. Notre Tier 2 à 5K€/mois se paie en 1 mois si vous évitez une seule sanction. C\'est une assurance, pas une dépense.' },
      { objection: 'Je veux voir le ROI avant de signer', reponse: 'Notre diagnostic gratuit quantifie votre exposition. En moyenne, nos clients identifient 2.3M€ de risque non provisionné. Le ROI est mesurable avant même la signature.' },
    ],
    template_email: `Objet : [ENTREPRISE] — Impact financier des nouvelles obligations réglementaires

Bonjour [NOM],

CSRD, DORA et l'EU Taxonomy créent de nouvelles obligations de reporting qui impactent directement vos provisions et votre valorisation.

RAQIB + MIZAN + NOOS quantifient et gèrent cette exposition :
✓ Quantification de l'exposition réglementaire en €
✓ Reporting intégré financier + extra-financier
✓ Score ESG documenté pour investisseurs

Un call pour quantifier votre exposition ?

Cordialement`,
    produits: ['RAQIB Financial Risk', 'MIZAN ESG Scoring', 'NOOS Integrated Reporting'],
    prix: '20K-80K€ setup + 5K-15K€/mois',
    cac: '4 800€',
    ltv: '150 000€',
  },
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const persona = searchParams.get('persona') as Persona | null;

  let result = PLAYBOOK;
  if (persona) {
    result = result.filter((p) => p.persona === persona);
  }

  return NextResponse.json({
    playbook: result,
    total: result.length,
  });
}
