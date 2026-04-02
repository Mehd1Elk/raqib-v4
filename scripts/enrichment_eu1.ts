// ============================================================
// RAQIB Corridor Intelligence Platform — Enrichment EU1
// Countries: FR (France), DE (Allemagne), IT (Italie), ES (Espagne), NL (Pays-Bas)
// Data categories: criticalMineralsDemand, keyEnterprisesForCorridor,
//                  keyConsumingIndustries, gigafactories, crmaInstitutions
// Sources: CRMA 2024, BRGM, BGR/DERA, IGME, TNO/RVO, IEA 2025, BloombergNEF 2025,
//          Reuters, company annual reports, European Commission Joint Research Centre 2024
// Created: 2026-04-02
// ============================================================

// ---------------------------------------------------------------------------
// New interface types for enriched EU fields
// (Extend existing Country with these fields via merging)
// ---------------------------------------------------------------------------

export interface MineralDemandItem {
  name: string;
  detail: string;
}

export interface CorridorEnterprise {
  name: string;
  role: string;
  africaRelevance: string;
}

export interface ConsumingIndustry {
  name: string;
  detail: string;
}

export interface Gigafactory {
  name: string;
  location: string;
  capacity: string;
  status: string;
  operator: string;
}

export interface CRMAInstitution {
  name: string;
  role: string;
  contact: string;
}

export interface EUEnrichment {
  criticalMineralsDemand: MineralDemandItem[];
  keyEnterprisesForCorridor: CorridorEnterprise[];
  keyConsumingIndustries: ConsumingIndustry[];
  gigafactories: Gigafactory[];
  crmaInstitutions: CRMAInstitution[];
}

// ============================================================
// 1. FRANCE 🇫🇷
// ============================================================

export const ENRICHMENT_FR: EUEnrichment = {

  criticalMineralsDemand: [
    {
      name: "Lithium",
      detail: "Demande croissante de Renault (Ampere, objectif 1 Mt LFP/an d'ici 2030) et Stellantis pour batteries VE. Imerys développe le projet Emili (Allier/Beauvoir) estimé à 34 000 t LCE/an — le plus grand gisement de lithium en roche dure d'Europe occidentale, autorisation d'exploitation attendue 2025-2026. ACC et Verkor constituent les débouchés industriels directs."
    },
    {
      name: "Cobalt",
      detail: "Safran (turbines CFM56/LEAP — supralliages à base cobalt) et Airbus (structures moteurs A320/A350) consomment environ 1 200 t Co/an au niveau groupe. Stockage batteries : ACC Billy-Berclau utilise chimie NMC nécessitant Co. Source principale : RDC (Glencore/CMOC) via négociants Rotterdam ou directement."
    },
    {
      name: "Nickel",
      detail: "Eramet exploite Weda Bay (Indonésie, NPI) et Sandouville (Normandie, raffinage nickel sulfate pour batteries). Besoin estimé : 40 000 t Ni/an pour les gigafactories françaises en 2030. Acier inox : Arcelor Mittal Dunkerque et Ascométal Fos-sur-Mer."
    },
    {
      name: "Terres rares (REE)",
      detail: "Valeo (moteurs traction VE, 12 M d'aimants NdFeB/an), Schneider Electric (transformateurs à haute efficacité), Safran (actionneurs électriques Airbus). France sans production propre — dépendance Chine ~98%. Initiative Solvay (Bruxelles) pour séparation REE à La Rochelle (usine préexistante). Terres rares légères (Nd, Pr) : priorité absolue CRMA."
    },
    {
      name: "Phosphates",
      detail: "France = 1er consommateur UE d'engrais phosphatés. OCP (Maroc) livre via Jorf Lasfar ~4 Mt/an vers les ports de Rouen et Nantes-Saint-Nazaire. Yara France (Montoir, Pardies), Terrial/InVivo, Timac Agro (Saint-Malo) sont les transformateurs principaux. Valeur imports : ~800 M€/an."
    },
    {
      name: "Manganèse",
      detail: "ArcelorMittal Fos-sur-Mer consomme ~120 000 t Mn/an pour aciers à haute résistance (automobile, construction). Eramet-COMILOG (Gabon) couvre ~30% des besoins européens via la mine de Moanda (4 Mt/an de minerai). Electrolytic manganese : Nouvelle-Calédonie (SLN/Eramet) en projet."
    },
    {
      name: "Tantale",
      detail: "Thales (composants électroniques défense, condensateurs au tantale) et Safran (électronique embarquée) consomment ~80 t Ta/an. Sourcing : Rwanda (Wolfram/Tantalum), RDC (artisanal). Traçabilité RMI-RMAP exigée par standards UE CSRD 2026."
    },
    {
      name: "Uranium",
      detail: "Orano (ex-Areva) gère l'ensemble de la chaîne : extraction (Niger historique, Namibie — Mine de Husab 4 500 t/an), conversion (Malvési, Narbonne), enrichissement (Tricastin). EDF : 56 réacteurs nucléaires actifs, programme EPR2 (14 nouveaux réacteurs) lancé 2022 — besoin ~7 000 t U naturel/an. Orano Namibie représente ~20% approvisionnement actuel."
    },
    {
      name: "Graphite",
      detail: "Composant anode batteries li-ion. ACC, Verkor et AESC Envision nécessiteront ~80 000 t graphite sphérique/an d'ici 2030 selon JRC. Fournisseurs actuels : Chine (90%), Mozambique (Syrah Resources). Initiative SAFT/TotalEnergies pour graphite synthétique à Nersac (Charente) en étude."
    },
    {
      name: "Tungstène",
      detail: "Sandvik Coromant France, Kennametal et Seco Tools (usines en France) consomment ~400 t W/an pour outils de coupe et forets. Airbus et Safran utilisent les alliages W-Ni pour les cibles de radiographie et blindages. Sourcing : Espagne (Salamine), Portugal (Almonty), Chine (60% mondial). Criticité CRMA élevée."
    }
  ],

  keyEnterprisesForCorridor: [
    {
      name: "TotalEnergies",
      role: "Supermajor pétrole & gaz, énergies renouvelables. PDG : Patrick Pouyanné. CA 2024 : ~219 Mds USD. Opère dans 15 pays africains (Angola, Congo-Brazzaville, Gabon, Nigeria, Mozambique LNG, Sénégal GSSP/GTA, Ouganda EACOP).",
      africaRelevance: "Plus grande entreprise française en Afrique. Production africaine ~1 Mbep/j. Investit dans solaire/éolien Afrique du Sud, Maroc, Égypte. TotalEnergies Renewables Africa cible 5 GW renouvelable Afrique 2025-2030. Partenariat stratégique OCP Maroc pour hydrogène vert."
    },
    {
      name: "Eramet",
      role: "Groupe minier et métallurgique. PDG : Christel Bories. CA 2024 : ~3.8 Mds€. Spécialiste manganèse, nickel, lithium. Coté Euronext Paris (ERA). Effectifs : ~13 000.",
      africaRelevance: "COMILOG (Gabon) : mine de Moanda = 1er producteur africain de manganèse, 4 Mt/an. Setrag (chemin de fer transgabonais) : 649 km, transport minerais vers Owendo. Sénégal : études exploration. Namibie : intérêts lithium en cours d'évaluation."
    },
    {
      name: "Orano",
      role: "Acteur mondial cycle combustible nucléaire. PDG : Nicolas Maes. CA 2024 : ~4.6 Mds€. Extraction, conversion, enrichissement uranium, démantèlement. Détenu à 90% par l'État français.",
      africaRelevance: "Niger : historique Arlit/Akouta (suspendu post-coup 2023, actifs SOMAIR et COMINAK en hibernation). Namibie — Husab mine : participation ~15% avec CNUC/CGN. Afrique du Sud : partenariats transformation. Plan B uranium : Kazakhstan, Canada post-Niger."
    },
    {
      name: "Bolloré Logistics / CMA CGM",
      role: "Logistique portuaire et transport. CMA CGM (Rodolphe Saadé, CA 2024 : ~47 Mds€) a acquis les terminaux africains Bolloré Logistics en 2022 pour ~5.7 Mds€.",
      africaRelevance: "Exploitation de 22 terminaux portuaires africains (Abidjan, Douala, Dakar, Lomé, Pointe-Noire, Conakry, etc.). Corridor critique pour transit minerais vers l'Europe. CMA CGM Africa Express : lignes directes Afrique-Europe en 14 jours."
    },
    {
      name: "BNP Paribas",
      role: "1ère banque française, 1ère banque UE par actifs. PDG : Jean-Laurent Bonnafé. Bilan : ~3 100 Mds€. Trade Finance, project finance, marchés de capitaux.",
      africaRelevance: "Présent dans 19 pays africains via filiales (BICI, BNP Paribas Maroc, etc.). Financement projets miniers (DRC, Zambie, Guinée). Mandaté sur plusieurs eurobonds souverains africains. Sustainability-linked loans pour projets CRMA."
    },
    {
      name: "Société Générale",
      role: "Banque universelle. PDG : Slawomir Krupa (depuis 2023). PNB 2024 : ~28 Mds€. Présente en Afrique subsaharienne depuis 1962.",
      africaRelevance: "15 pays africains (~4 millions de clients). Financement infrastructure et mines. Sell-down partiel des filiales subsahariennes (Côte d'Ivoire, Cameroun) à Vista Bank 2023-2025 dans le cadre de réorientation stratégique. Maintien Maroc, Tunisie, Égypte."
    },
    {
      name: "Orange",
      role: "Opérateur télécom. PDG : Christel Heydemann. CA 2024 : ~41 Mds€. Leader télécom France et Afrique.",
      africaRelevance: "18 pays africains et Moyen-Orient (MEA). ~160 millions de clients Afrique. Orange Money (Mobile Money) : 27 millions d'utilisateurs actifs Afrique. Infrastructure fibre sous-marine PEACE, 2Africa. Partenaire digital des corridors miniers (connectivité sites mines)."
    },
    {
      name: "Bouygues / Colas",
      role: "Groupe BTP et télécoms. PDG Bouygues : Olivier Roussat. CA 2024 : ~56 Mds€. Colas (filiale TP) : routes, rails, aéroports dans 50 pays.",
      africaRelevance: "Colas Afrique : routes minières au Gabon (liaison Moanda-Franceville), infrastructure au Sénégal, Côte d'Ivoire, Cameroun. Bouygues Construction : bâtiments industriels pour sites miniers. Maintenance routes d'accès sites TotalEnergies en Afrique de l'Ouest."
    }
  ],

  keyConsumingIndustries: [
    {
      name: "Automobile & Mobilité électrique",
      detail: "Renault (Ampere spin-off VE) et Stellantis (Citroën, Peugeot, DS) sont soumis à la directive VE 2035 : zéro émission. Renault négocie directement lithium Chili/Argentine (SQM, Livent). Stellantis a signé un accord avec Terrafame (Finlande, nickel), Vulcan Energy (Li, Allemagne) et Controlled Thermal Resources (Li, Californie). Besoin total France : ~180 000 t LCE/an en 2030 (Rho Motion)."
    },
    {
      name: "Aéronautique & Défense",
      detail: "Airbus (Toulouse), Safran (Paris), Dassault Aviation (Mérignac), Thales (Neuilly) constituent la 2e industrie française (CA cumulé >80 Mds€). Besoins critiques : alliages cobalt-nickel (réacteurs), terres rares (actionneurs, missiles), tantale (électronique). LPM 2024-2030 : budget défense porté à 413 Mds€ — hausse demande minéraux stratégiques."
    },
    {
      name: "Énergie nucléaire",
      detail: "EDF exploite 56 réacteurs (63 GW). Programme EPR2 lancé : 6 réacteurs initiaux (+8 en option) pour 2035-2045. Besoin uranium : ~7 000 t/an maintenant, +20% post-EPR2. Orano gère cycle complet. Dépendance historique Niger (28% pré-coup) remplacée par Canada, Kazakhstan, Namibie. Plan France Nucléaire 2030 inclus dans Loi Industrie Verte."
    },
    {
      name: "Chimie & Matériaux avancés",
      detail: "Solvay (REE Séparation, La Rochelle), Arkema (fluorine, lithium — batteries solides LFP), Imerys (lithium Beauvoir, kaolin, graphite). Chimie verte : BioAmber, Novamont France. Total Énergies Polymères. Besoins en lithium, fluorspar, graphite, terres rares pour matériaux haute performance."
    },
    {
      name: "Agriculture & Engrais",
      detail: "France = 1er agriculteur UE (CA ~80 Mds€/an). Phosphates (superphosphate, DAP, MAP) : 1.8 Mt/an d'imports. Potasse : 400 000 t/an (Russie, Biélorussie, Canada). Partenariat structurant OCP Maroc–InVivo–Yara France pour sécuriser approvisionnements post-guerre Ukraine. Timac Agro (Saint-Malo) : 2e producteur d'engrais spéciaux EU."
    },
    {
      name: "Énergies renouvelables",
      detail: "Objectif France : 40% renouvelable mix 2030. Éolien offshore : 18 GW planifiés (6 parcs en construction 2024). Solaire : 30 GW installés d'ici 2030. REE critiques pour aimants turbines éolien. EDF Renouvelables, Engie, TotalEnergies Renewables. Câbles inter-connexion : Nexans et Prysmian — cuivre africain."
    },
    {
      name: "Électronique & Semi-conducteurs",
      detail: "STMicroelectronics (site Crolles, Agrate) : accord Intel/TSMC pour extension. Besoin silicium, germanium, gallium, indium. Schneider Electric (Grenoble) : électronique de puissance, REE pour transformateurs. Thales et Safran Electronics : composants défense, besoins tantale, indium."
    }
  ],

  gigafactories: [
    {
      name: "ACC — Automotive Cells Company",
      location: "Billy-Berclau / Douvrin, Pas-de-Calais",
      capacity: "40 GWh (Phase 1) — extensible 120 GWh",
      status: "Production série depuis 2024. Ligne pilote opérationnelle 2023.",
      operator: "ACC (joint-venture Stellantis 33% / TotalEnergies 33% / Mercedes-Benz 33%)"
    },
    {
      name: "Verkor",
      location: "Dunkerque, Nord",
      capacity: "16 GWh (Phase 1), extensible à 50 GWh d'ici 2030",
      status: "Construction Phase 1 achevée. Production série prévue 2025. Client ancré : Renault Group.",
      operator: "Verkor SAS (Schneider Electric, EIT InnoEnergy, Renault, BPI France)"
    },
    {
      name: "AESC Envision",
      location: "Douai, Nord",
      capacity: "9 GWh Phase 1 — 24 GWh Phase 2",
      status: "Phase 1 opérationnelle 2025 pour Renault ElectriCity (Douai). Cellules NMC.",
      operator: "AESC Group (Envision — China) pour Renault"
    },
    {
      name: "Saft / TotalEnergies — Usine cellules LFP",
      location: "Nersac, Charente (étude avancée)",
      capacity: "Étude pour 8-12 GWh LFP",
      status: "Étude de faisabilité 2024-2025 — décision investissement attendue 2026.",
      operator: "Saft (filiale TotalEnergies)"
    }
  ],

  crmaInstitutions: [
    {
      name: "BRGM — Bureau de Recherches Géologiques et Minières",
      role: "Établissement public référent pour la géologie, les ressources minérales et les risques géologiques. Point focal national CRMA pour l'inventaire des ressources minérales stratégiques françaises. Pilote le projet Emili (lithium Beauvoir) en partenariat Imerys.",
      contact: "3 avenue Claude-Guillemin, 45060 Orléans Cedex 2 | www.brgm.fr | contact@brgm.fr | Tél : +33 2 38 64 34 34"
    },
    {
      name: "DGE — Direction Générale des Entreprises",
      role: "Sous l'autorité du Ministère de l'Économie et des Finances. Pilote la politique industrielle française et la mise en œuvre nationale du CRMA. Coordonne les accords de partenariat stratégique avec pays producteurs (Maroc phosphates, Namibie lithium, Guinée bauxite). Gère le programme France 2030 — volet minéraux critiques (200 M€).",
      contact: "12 rue Villiot, 75012 Paris | www.entreprises.gouv.fr | Responsable CRMA : Bureau Ressources Stratégiques"
    },
    {
      name: "France Minéraux",
      role: "Groupement d'intérêt public (GIP) créé 2023, dédié à la sécurisation des approvisionnements en minéraux critiques pour l'industrie française. Anime la Task Force Minéraux Critiques du Plan France 2030. Coordonne avec BRGM, Eramet, Imerys, ACC, Renault, Safran les feuilles de route d'approvisionnement.",
      contact: "www.france-mineraux.fr | Secrétariat : c/o Ministère de l'Économie, 139 rue de Bercy, 75012 Paris"
    },
    {
      name: "Bpifrance International",
      role: "Banque publique d'investissement. Finance les projets d'exploration et d'acquisition minérale français à l'étranger. Cofinance avec AFD les projets corridor Afrique-France. Gérant de fonds : Fonds Avenir Minier (FAM) 150 M€ pour exploration.",
      contact: "www.bpifrance.fr | Direction International : 27-31 avenue du Général Leclerc, 94710 Maisons-Alfort"
    },
    {
      name: "AFD — Agence Française de Développement",
      role: "Banque de développement publique. Financement projets infrastructure minière durable en Afrique (4 Mds€/an Afrique). Instrument clé du corridor France-Afrique CRMA. Finance projets routiers, ferroviaires et portuaires associés à l'extraction minérale responsable.",
      contact: "5 rue Roland Barthes, 75598 Paris Cedex 12 | www.afd.fr | Tél : +33 1 53 44 31 31"
    }
  ]
};

// ============================================================
// 2. ALLEMAGNE 🇩🇪
// ============================================================

export const ENRICHMENT_DE: EUEnrichment = {

  criticalMineralsDemand: [
    {
      name: "Lithium",
      detail: "Volkswagen Group (PowerCo — Salzgitter 40 GWh), BMW (Debrecen HU + Irlbach DE), Mercedes-Benz (ACC Kaiserslautern 40 GWh) constituent la plus grande demande lithium VE d'Europe. Besoin Allemagne 2030 : ~300 000 t LCE/an. Accords directs : VW-Vulcan Energy (Rhin supérieur, Li géothermique), BMW-Rock Tech (Canada), Mercedes-Livent (direct lithium)."
    },
    {
      name: "Cobalt",
      detail: "BASF Schwarzheide : plus grande usine de précurseurs cathodes (pCAM) hors Asie — 100 000 t/an prévus. Consomme ~3 500 t Co/an (NMC 811). Fournisseurs : Glencore (RDC), Umicore. Volkswagen : accord direct Glencore pour 60 000 t Co sur 5 ans (2021). Risque concentration RDC = ~75% production mondiale."
    },
    {
      name: "Nickel",
      detail: "BASF Schwarzheide et Umicore Hanau pour cathodes NMC. ThyssenKrupp Steel (Duisbourg) : acier inox, ~200 000 t Ni/an. Volkswagen PowerCo : accord Nornickel (Russie suspendu 2022) remplacé par Wyloo Metals (Australie) et Terrafame (Finlande). SGL Carbon Meitingen : électrodes nickel pour processus chimiques."
    },
    {
      name: "Terres rares (REE)",
      detail: "Siemens Energy (rotors aimants permanents, éoliennes 14 MW+ offshore) : ~1 200 t NdFeB/an. BMW iX : 6 kg REE par moteur. Volkswagen ID.4/ID.7 : moteurs aimants permanents. Initiative BASF pour recyclage REE moteurs usagés (Freeport TX + Schwarzheide). Total Allemagne : ~8 000 t REO/an. Dépendance Chine : 95%."
    },
    {
      name: "Cuivre",
      detail: "Aurubis AG (Hambourg) = 1er affineur de cuivre EU, ~1.2 Mt Cu raffiné/an. Clients : Bosch, Siemens, Dräger, Volkswagen câblage. Approvisionnement : Zambie (KCCM), DRC, Chili, recyclage EU. Nexans Allemagne (câbles haute tension pour éolien). Câblage VW Golf/ID.4 : ~30 kg Cu/véhicule. Demande nationale 2024 : ~1.4 Mt/an."
    },
    {
      name: "Manganèse",
      detail: "ThyssenKrupp Steel Duisbourg : ~400 000 t Mn/an pour acier AHSS (Advanced High-Strength Steel) automobiles. Salzgitter AG : aciers manganèse pour construction. Eramet-COMILOG Gabon = fournisseur principal Europe. Alternative : Afrique du Sud (United Manganese of Kalahari). Electrolytic manganese sulfate (EMS) pour batteries : nouveau besoin ~50 000 t/an 2030."
    },
    {
      name: "Graphite",
      detail: "SGL Carbon (Meitingen, Wiesbaden) : électrodes graphite pour fours arc électrique, anodes batteries. Volkswagen PowerCo Salzgitter et Tesla Berlin nécessiteront ~120 000 t graphite sphérique/an combinés. Fournisseurs : Syrah Resources (Mozambique), Nouveau Monde (Canada). BTR, Shanshan : fournisseurs asiatiques dominants. Initiative BMWi pour graphite synthétique domestique."
    },
    {
      name: "Platine & Palladium (PGM)",
      detail: "BASF Catalysts (Hanau) : 1er fabricant mondial de catalyseurs automobiles. ~60 t Pt/an + 80 t Pd/an pour pots catalytiques. Source : Afrique du Sud 75%, Russie 25%. Transition VE réduit demande PGM mais PAC (pile à combustible) Hydrogen — BMW, Bosch — maintient la demande platine à ~40 t/an horizon 2035."
    },
    {
      name: "Silicium métallurgique",
      detail: "Infineon Technologies (Munich) : 1er fabricant européen semi-conducteurs. Intel Magdeburg (20 Mds€, fab 2027), TSMC Dresden (10 Mds€, 2027) : silicium ultra-pur (EG-Si) nécessaire. Wacker Chemie (Burghausen) : 1er producteur européen polysilicium. Besoin Allemagne 2030 : ~80 000 t Si-MG + 8 000 t polysilicium premium."
    },
    {
      name: "Indium & Germanium",
      detail: "Siemens (capteurs, displays industriels) et Infineon (transistors GaN, SiGe) consomment ~12 t In/an. Germanium : Siemens Healthineers (imagerie médicale), Jenoptik (optiques), Umicore (recyclage). Chine contrôle ~80% production In et ~60% Ge — restrictions export 2023 créent choc supply. Initiative DERA pour substitution/recyclage."
    }
  ],

  keyEnterprisesForCorridor: [
    {
      name: "BASF",
      role: "1er chimiste mondial. PDG : Markus Kamieth (depuis 2024). CA 2024 : ~68 Mds€. Site Schwarzheide (Brandebourg) : production cathodes NMC pour batteries — investissement 4 Mds€. Chimie de base, matériaux, agro-solutions.",
      africaRelevance: "BASF Afrique du Sud (Johannesburg) : distribution chimique, catalyseurs miniers. Partenariats cobalt DRC via Glencore. BASF a intégré une chaîne de traçabilité cobalt RDC avec Umicore pour cellules batteries EU. Études sourcing lithium Namibie (potentiel). Financement projets eau/agriculture Afrique via BASF Social Foundation."
    },
    {
      name: "Volkswagen / PowerCo",
      role: "1er constructeur automobile européen. PDG VW AG : Oliver Blume. CA 2024 : ~323 Mds€. PowerCo SE (spin-off batteries, IPO envisagée) : gère 6 gigafactories EU dont Salzgitter 40 GWh.",
      africaRelevance: "BMW/VW sourcing cobalt RDC (accord Glencore 2021 : 60 000 t sur 5 ans). Intérêt lithium Namibie (Desert Lion Energy). Accord gouvernement Maroc pour assemblage VE (Kénitra, SOMACA). VW Afrique du Sud (Uitenhage, 1 300 000 véhicules/an) : composants miniers locaux. Étude corridor Lobito pour approvisionnement cuivre."
    },
    {
      name: "ThyssenKrupp",
      role: "Groupe industriel diversifié. PDG : Miguel López. CA 2024 : ~35 Mds€. Acier, composants automobiles, technologies marines, matériaux.",
      africaRelevance: "ThyssenKrupp Materials Afrique du Sud : négoce acier et minéraux. tkMS (sous-marins) : exportations Afrique du Sud, Égypte. Manganèse : approvisionnement South32 Afrique du Sud et Eramet Gabon. Projets hydrogène vert Namibie (HYPHEN/Thyssenkrupp nucera : électrolyseurs 2 GW pour Green Ammonia)."
    },
    {
      name: "Aurubis",
      role: "1er affineur cuivre UE. PDG : Roland Harings. CA 2024 : ~18 Mds€. Hambourg siège, sites Lünen (DE), Olen (BE), Berth (UK). Traite ~1.2 Mt Cu/an.",
      africaRelevance: "Approvisionnement primaire : Zambia Copper (KCM), DRC (Glencore, CMOC). Participations Aurubis dans projets exploration Zambie. Corridor Lobito (Angola-Zambie-DRC) critique pour livraisons. Aurubis recycling : traitement scories minières africaines (fournies par Glencore). Récupération cobalt, germanium des résidus."
    },
    {
      name: "Siemens Energy",
      role: "Énergie et technologies industrielles. PDG : Christian Bruch. CA 2024 : ~36 Mds€. Éolien offshore (Siemens Gamesa), turbines gaz, hydrogen.",
      africaRelevance: "Partenariat Namibie (HYPHEN Hydrogen Energy) : électrolyseurs Siemens Gamesa pour Green H2 exporté Europe 2028. Sénégal : éolien Taïba N'Diaye (158 MW, Lekela/Siemens). Afrique du Sud : turbines Medupi/Kusile (maintenance). Égypte New Administrative Capital : power grid. Besoin REE (aimants Nd-Fe-B) pour turbines offshore = corridor critique."
    },
    {
      name: "Wintershall Dea",
      role: "E&P pétrole & gaz, joint-venture BASF (73%) et LetterOne (27%). PDG : Mario Mehren. CA 2024 : ~6 Mds€. Présent en Russie (gel), Mer du Nord, Afrique.",
      africaRelevance: "Algérie : participation BRN (Reggane Nord, ~900 MMscf/an). Libye : partenariats NOC (champs Al Ghani, Jakhira). Égypte : offshore Med (joint venture ENI). Projet de cession partielle actifs africains dans contexte restructuration. Source de revenus cuivres et nickel via fonds propres BASF réinvestis."
    },
    {
      name: "KfW DEG",
      role: "Banque publique développement allemande. DG KfW : Stefan Wintels. Bilan : ~600 Mds€. DEG (Deutsche Investitions- und Entwicklungsgesellschaft) : filiale financement secteur privé pays émergents.",
      africaRelevance: "DEG : 2 Mds€/an de nouveaux engagements Afrique. Finance projets mines responsables (cobalt DRC ITSCI), infrastructure logistique, énergie renouvelable. Initiative EU-Africa Global Gateway : KfW mandaté pour 6 Mds€ garanties. Financement corridor Lobito (rail + ports). Partenaire DERA pour approvisionnements stratégiques."
    },
    {
      name: "BGR / DERA",
      role: "Bundesanstalt für Geowissenschaften und Rohstoffe (BGR) : autorité géosciences et ressources brutes allemande. DERA (Deutsche Rohstoffagentur) : agence ressources. Rôle : monitoring, analyse risques approvisionnement, conseil au gouvernement.",
      africaRelevance: "BGR programmes Afrique : cartographie géologique Namibie, Ghana, Tanzanie, Éthiopie. Coopération technique minière avec gouvernements africains (BMZ/GIZ). DERA : suivi prix et disponibilité 31 matières premières critiques — alertes pour industrie allemande. Accords bilatéraux DE-DRC (cobalt), DE-Namibie (lithium/H2)."
    }
  ],

  keyConsumingIndustries: [
    {
      name: "Industrie automobile",
      detail: "Volkswagen Group (VW, Audi, Porsche, Škoda, SEAT), BMW Group, Mercedes-Benz Group : 1ère industrie UE (CA cumulé ~700 Mds€, 800 000 emplois directs DE). Transition VE 2035 : 6 gigafactories DE planifiées. Besoin minéraux 2030 : 300 000 t Li, 35 000 t Co, 250 000 t Ni, 200 000 t Mn, 120 000 t graphite. Principal moteur de la demande CRMA en Allemagne."
    },
    {
      name: "Industrie chimique",
      detail: "BASF (Ludwigshafen = plus grand complexe chimique du monde), Bayer, Evonik, Lanxess, Wacker Chemie : CA cumulé ~200 Mds€. Besoins : phosphates (engrais, chimie fine), fluorite, potasse, soufre, platine (catalyseurs), silicium (polymères). BASF seul consomme ~4 TWh/an gaz naturel + 2 Mt minéraux/an pour production chimique."
    },
    {
      name: "Machines & Équipements industriels",
      detail: "Siemens AG, Bosch, ThyssenKrupp, Schaeffler, Knorr-Bremse : CA cumulé ~250 Mds€. Besoins : acier spécial (Ni, Mn, Cr), cuivre, alliages tungstène, REE (électromoteurs, capteurs). Allemagne = 2e exportateur mondial machines (après Chine). Secteur Mittelstand : 15 000 fabricants, consommation minérale diffuse mais totale élevée."
    },
    {
      name: "Électronique & Semi-conducteurs",
      detail: "Infineon Technologies (Munich, CA ~15 Mds€) : composants puissance, automotive, IoT. Intel Magdeburg (fab 200 Mds€ sur 10 ans). TSMC Dresden (ESMC, 10 Mds€, 2027). Zeiss (optiques, photolithographie). Besoins : silicium ultra-pur, germanium, gallium, indium, tantale, tungstène. Investissements publics EU Chips Act : 4 Mds€ pour Allemagne."
    },
    {
      name: "Acier & Métallurgie",
      detail: "ThyssenKrupp Steel, Salzgitter AG, ArcelorMittal Allemagne : ~40 Mt acier brut/an. Transition low-carbon : ThyssenKrupp tkH2Steel (hydrogen DRI, financement État 2 Mds€). Besoins manganèse (~700 000 t/an), nickel, chrome, molybdène, vanadium. tkH2Steel réduit charbon mais maintient besoins minéraux métalliques."
    },
    {
      name: "Énergies renouvelables",
      detail: "Objectif Allemagne : 80% renouvelable 2030, 100% en 2035. Éolien offshore : 30 GW 2030. Siemens Gamesa (turbines 14 MW+ Nd-Fe-B), RWE, EnBW, E.ON. Solaire : First Solar Bisingen, Nextracker, SunPower. Réseau HVDC : câbles cuivre 50 000 t/an. Stockage : 50 GWh batteries 2030 (lithium). Hydrogen vert : électrolyseurs Siemens, thyssenkrupp nucera."
    },
    {
      name: "Défense & Sécurité",
      detail: "Rheinmetall (CA ~9 Mds€ 2024, + 40% YoY), KNDS (Leopard, chars), Diehl, Hensoldt : revalorisation post-Ukraine. Besoin tungstène (munitions perforantes), titane (blindages), REE (radars, systèmes AESA), cobalt (supralliages moteurs). Bundeswehr Sondervermögen 100 Mds€ : 30% alloués à équipements haute technicité. Demande tungstène DE : +60% 2023-2025."
    }
  ],

  gigafactories: [
    {
      name: "CATL — Erfurt Gigafactory",
      location: "Arnstadt (Thuringe)",
      capacity: "14 GWh Phase 1 — extensible à 100 GWh",
      status: "Opérationnelle depuis 2022. 1ère gigafactory CATL hors Chine. Clients : BMW, Stellantis, Volkswagen.",
      operator: "CATL (Contemporary Amperex Technology Co., Limited)"
    },
    {
      name: "PowerCo / Volkswagen — Salzgitter",
      location: "Salzgitter, Basse-Saxe",
      capacity: "40 GWh Phase 1 — 240 GWh total prévu sur 6 sites EU",
      status: "Construction Phase 1 2022-2025. Production prévue 2025. Cellule prismatique unifiée VW. Investissement : 2 Mds€ Phase 1.",
      operator: "PowerCo SE (filiale Volkswagen AG)"
    },
    {
      name: "Tesla Gigafactory Berlin-Brandenburg",
      location: "Grünheide, Brandebourg",
      capacity: "50 GWh (objectif 2025) — 100 GWh long terme",
      status: "Opérationnelle depuis mars 2022. Production ~500 000 véhicules/an en montée. Cellule 4680 en cours de déploiement sur site.",
      operator: "Tesla Inc."
    },
    {
      name: "Northvolt — Heide (Northvolt Drei)",
      location: "Heide, Schleswig-Holstein",
      capacity: "60 GWh planifié",
      status: "Projet retardé (difficultés financières Northvolt 2024, dépôt de bilan Ch.11 USA nov. 2024). Permis obtenus, terrain acquis. Futur incertain — reprise par acquéreur potentiel en cours (Volkswagen, Scania intéressés).",
      operator: "Northvolt AB (en restructuration)"
    },
    {
      name: "SVOLT — Überherrn",
      location: "Überherrn, Sarre",
      capacity: "24 GWh Phase finale",
      status: "Phase 1 (7 GWh) opérationnelle 2023. Phase 2 en cours. Cellule LFP et NMC. Client : Stellantis (Opel Rüsselsheim).",
      operator: "SVOLT Energy Technology (filiale Great Wall Motor)"
    },
    {
      name: "ACC — Kaiserslautern",
      location: "Kaiserslautern, Rhénanie-Palatinat",
      capacity: "40 GWh planifié",
      status: "Planification avancée. Terrain sélectionné. Décision finale investissement (FID) attendue 2025 — dépend santé financière JV ACC post-difficultés 2024.",
      operator: "ACC (Stellantis / TotalEnergies / Mercedes-Benz)"
    }
  ],

  crmaInstitutions: [
    {
      name: "BGR — Bundesanstalt für Geowissenschaften und Rohstoffe",
      role: "Autorité fédérale géosciences. Inventaire ressources minérales Allemagne et mondiales. Cartographie géologique et évaluation gisements. Expert technique gouvernement fédéral pour politiques minières. Coordonne avec DERA la surveillance des approvisionnements critiques.",
      contact: "Stilleweg 2, 30655 Hannover | www.bgr.bund.de | Tél : +49 511 643-0 | bgr@bgr.de"
    },
    {
      name: "DERA — Deutsche Rohstoffagentur",
      role: "Agence des matières premières brutes, rattachée à BGR. Publie l'Indicateur de Risque d'Approvisionnement (DERA-Rohstoffliste) pour 31 matières critiques. Fournit analyses marché et alertes précoces à l'industrie allemande. Soutient les démarches de sourcing diversifié des PME.",
      contact: "Wilhelmstraße 25-30, 13593 Berlin | www.bgr.bund.de/DERA | dera@bgr.de | Tél : +49 30 36993-0"
    },
    {
      name: "BMWK — Bundesministerium für Wirtschaft und Klimaschutz",
      role: "Ministère fédéral de l'Économie et de la Protection du Climat. Pilote la Rohstoffstrategie Deutschland (2024). Coordonne les accords bilatéraux de partenariat matières premières (Namibie, DRC, Chili, Canada). Anime le Rohstoffbeirat (conseil consultatif matières premières industrie).",
      contact: "Scharnhorststraße 34-37, 10115 Berlin | www.bmwk.de | poststelle@bmwk.bund.de | Tél : +49 30 18615-0"
    },
    {
      name: "KfW DEG — Deutsche Investitions- und Entwicklungsgesellschaft",
      role: "Filiale KfW dédiée au financement secteur privé pays émergents. Instrument de mise en œuvre des accords bilatéraux minéraux critiques DE-Afrique. Finance projets miniers responsables, infrastructure logistique, énergies renouvelables. Initiative Global Gateway EU partenaire.",
      contact: "Kämmergasse 22, 50676 Köln | www.deginvest.de | info@deginvest.de | Tél : +49 221 4986-0"
    },
    {
      name: "BDI / AG Rohstoffe — Fédération industrie allemande",
      role: "Bundesverband der Deutschen Industrie. Groupe de travail AG Rohstoffe représente les intérêts des industriels allemands dans les négociations CRMA. Publie annuellement l'indice de sécurité d'approvisionnement. Interlocuteur Commission Européenne pour la mise en œuvre des Strategic Projects CRMA.",
      contact: "Breite Straße 29, 10178 Berlin | www.bdi.eu | info@bdi.eu | Tél : +49 30 2028-0"
    }
  ]
};

// ============================================================
// 3. ITALIE 🇮🇹
// ============================================================

export const ENRICHMENT_IT: EUEnrichment = {

  criticalMineralsDemand: [
    {
      name: "Lithium",
      detail: "Stellantis (Fiat, Alfa Romeo, Lancia, Maserati) a signé des accords avec Vulcan Energy (Li géothermique Rhin), Lithium Amérique du Sud (POSCO-Hombre Muerto) et Controlled Thermal Resources pour batteries VE. Gigafactory ACC Termoli (40 GWh, 2026) constituera le principal débouché. Enel X Way et BeCharge : recharge VE. Besoin Italie 2030 : ~80 000 t LCE/an."
    },
    {
      name: "Cobalt",
      detail: "ENI Versalis (chimie, Brindisi) pour catalyseurs industriels. Stellantis ACC Termoli : cellules NMC nécessitant 5-8 kg Co/véhicule. FAAM (Montecchio Maggiore) : batteries industrielles. SAES Getters (Milano) : matériaux fonctionnels cobalt pour semi-conducteurs. Cobalt sourcing via DRC — ENI co-finance projets traçabilité avec ITSCI."
    },
    {
      name: "Cuivre",
      detail: "Prysmian Group (1er câblier mondial, Milan) consomme ~400 000 t Cu/an pour câbles HV, MV, sous-marins. Nexans Italie (Turin) : câbles industriels. Industrie mécanique Nord (Lombardie) : Borletti, Olitalia. ABB Italie (Bergame) : moteurs. Atlantic Copper Italie : semi-produits. Besoin national ~700 000 t/an. Sourcing : Chili, Zambie, DRC, recyclage national."
    },
    {
      name: "Nickel",
      detail: "Marcegaglia Steel (Gazoldo degli Ippoliti) = 1er transformateur acier inox Italie, ~2 Mt/an consommant ~100 000 t Ni/an. Outokumpu Italie. Fincantieri (construction navale, Trieste) : aciers spéciaux alliés nickel. Stellantis : batteries NMC — nickel sulfate haute pureté (HPNSO4). Sourcing : Indonésie (HPAL), Philippines, Nouvelle-Calédonie."
    },
    {
      name: "Terres rares (REE)",
      detail: "Brembo (Curno, Bergame) : disques frein moteurs électriques, capteurs REE. Magneti Marelli (Corbetta, récupéré par KKR-Marelli) : actionneurs électriques Nd-Fe-B. Leonardo SpA (Rome, défense) : aimants REE pour servocommandes, missiles. CAME Group : automatismes industriels. Italie sans production REE domestique — dépendance Chine ~97%."
    },
    {
      name: "Phosphates",
      detail: "Italie = 3e agriculteur EU. Yara Italia (Ferrara) et ICL Iberia (distribution Italie) importent ~800 000 t/an DAP/MAP. OCP Maroc-Italie : partenariat via port de Ravenne pour déchargement superphosphates. Fertitalia (Ravenne) et Hydro Agri (Ferrara) : transformation locale. Regioni Emilia-Romagna, Veneto, Puglia : principaux consommateurs."
    },
    {
      name: "Manganèse",
      detail: "Tenaris (Dalmine, groupe Techint) : tubes sans soudure pour puits pétrole, ~80 000 t Mn/an. Acciaierie d'Italia (ex-ILVA Tarente, relance 2024) : ~70 000 t Mn/an pour production acier. Arvedi (Cremona) : acier plat bas-carbone. Sourcing : Gabon (Eramet COMILOG), Afrique du Sud (South32), Australie."
    },
    {
      name: "Bauxite / Aluminium",
      detail: "Hydro Aluminium Italie (Bolzano) : 1er producteur aluminium Italie. Constellium (Singen DE + distribution IT) : aluminiums aéronautique (Alenia Aermacchi/Leonardo). SAPA Extrusion Italie. Packaging alimentaire (pasta, conserves, huile) : Impress, Novelis Italie. Import bauxite : Guinée (principale source), Ghana, Australie."
    }
  ],

  keyEnterprisesForCorridor: [
    {
      name: "ENI",
      role: "Supermajor pétrole & gaz, ENI+. PDG : Claudio Descalzi (depuis 2014). CA 2024 : ~94 Mds€. Présent dans 68 pays. Pôle Plenitude (renouvelables + retail énergie) : 3 GW installés 2024.",
      africaRelevance: "Leader européen en Afrique sub-saharienne. Nigeria (OML 118/60/61 — bloc Napoléon, LNG Bonny), Angola (Bloc 15/06 — ENI opérateur), Congo-Brazzaville (Marine XII, Nenuphar), Côte d'Ivoire (CI-101), Ghana (Sankofa), Mozambique (Area 4 — Coral South FLNG opérationnel 2022, 3.4 Mt LNG/an), Libye (Western Libyan Gas, Mellitah). Production Afrique : ~500 kbep/j. ENI plan énergétique Afrique : accord Algérie (Sonatrach, 4 Mds m3/an supplémentaires), Tanzanie LNG, Sénégal (Sangomar 100 000 b/j)."
    },
    {
      name: "Prysmian Group",
      role: "1er câblier mondial. PDG : Massimo Battaini (depuis 2024). CA 2024 : ~16 Mds€. Sites de production dans 50 pays. Câbles HV terrestres et sous-marins, fibres optiques.",
      africaRelevance: "Câbles sous-marins Afrique : projet 2Africa (Meta) — 45 000 km, 36 pays africains, Prysmian fournisseur principal. BlueRaman (Afrique du Sud–Inde). Câbles HV Égypte (connexion réseau national), Nigeria (Lagos-Kano HV backbone). Cuivre sourcing : Zambia Consolidated (ZCCM-IH), Glencore DRC. Câbles infrastructure minière Afrique (sites TotalEnergies, ENI)."
    },
    {
      name: "Enel / Enel Green Power",
      role: "Groupe énergie intégré. PDG : Flavio Cattaneo. CA 2024 : ~93 Mds€. Présence 30 pays. EGP (filiale renouvelables) : 65 GW installés mondialement.",
      africaRelevance: "Afrique du Sud : Nxuba Wind Farm (140 MW), Garob Wind (140 MW), Red Cap Sere (100 MW). Enel Green Power Maroc : Taza Wind (300 MW, partiel). Zambie : Kafue Gorge Lower Hydro (750 MW, construction). Sénégal : études éolien Taïba. Minerais REE pour turbines : sourcing Afrique via partenariats locaux. Enel X : bornes VE Afrique du Nord."
    },
    {
      name: "Leonardo SpA",
      role: "Groupe défense, aérospatiale, sécurité. PDG : Roberto Cingolani. CA 2024 : ~16 Mds€. Hélicoptères (AW), électronique défense, cybersécurité.",
      africaRelevance: "Hélicoptères AW139/AW189 livrés à garde-côtes Libye, Nigeria, Kenya, Égypte. Radars aéroports Afrique (Ghana, Éthiopie). Surveillance maritime Afrique (projet EU CRIMARIO). Systèmes C4I forces armées Afrique anglophone. Besoins REE (aimants Nd-Fe-B actionneurs), tantale (électronique), tungstène (blindages)."
    },
    {
      name: "Tenaris",
      role: "Leader mondial tubes sans soudure pour industrie pétrolière. PDG : Paolo Rocca (Groupe Techint). CA 2024 : ~14 Mds€. Sites : Dalmine (IT), Argentine, Mexique, USA.",
      africaRelevance: "Tubes OCTG pour puits pétrole : Nigeria (ENI, Shell, Chevron), Angola (Total, ENI, BP), Mozambique (ENI Area 4). Fournitures Algérie (Sonatrach). Tenaris Afrique du Sud : distribution et stockage. Partenariat logistique avec ICTSI Lagos (terminaux) pour livraison sites offshore. Manganèse et nickel spéciaux (aciers 13Cr, S-135) sourcés Afrique du Sud."
    },
    {
      name: "Intesa Sanpaolo",
      role: "1ère banque italienne. PDG : Carlo Messina. Actifs totaux 2024 : ~915 Mds€. Trade Finance, projet finance, banque d'investissement.",
      africaRelevance: "Présent Égypte, Maroc, Tunisie, Algérie via réseaux correspondants. Prêts projets ENI, Prysmian en Afrique. Plan Mattei : Intesa co-financement 3 Mds€ projets infrastructure africains via SACE/SIMEST. Financement corridors logistiques minerais : Afrique Est-Ouest. Mandaté sur eurobonds Sénégal, Côte d'Ivoire."
    },
    {
      name: "SACE / SIMEST — CDP Group",
      role: "SACE (assurance-crédit export) et SIMEST (financement participatif export) : outils publics italiens de soutien aux exportateurs. PDG CDP : Dario Scannapieco. Garanties jusqu'à 25 Mds€/an.",
      africaRelevance: "Plan Mattei Afrique (2024) : SACE garantit 4 Mds€ de projets italiens en Afrique sur 4 ans. SIMEST co-finance PME italiennes s'installant en Afrique. Priorités : énergie (Afrique Est, Afrique de l'Ouest), infrastructure portuaire, agro-industrie. Instrument corridor ENI-minéraux critiques africains."
    }
  ],

  keyConsumingIndustries: [
    {
      name: "Automobile & Mobilité électrique",
      detail: "Stellantis (Turin, Saragosse, Vigo, Melfi, Cassino) : 14 marques dont Fiat, Alfa Romeo, Lancia, Maserati, Jeep Italie. Engagement VE 2035 : modèles électriques Fiat 500e, Alfa Romeo Junior EV, Maserati GranTurismo Folgore. ACC Termoli (40 GWh, 2026) = épine dorsale batteries Stellantis EU. Besoin Li, Co, Ni, Mn, graphite. Marché VE IT : lent démarrage (incitations PNRR 2024 relancent demande)."
    },
    {
      name: "Énergie — ENI & Transition",
      detail: "ENI (Rome) : CA ~94 Mds€, 32 000 employés. Transition vers ENI+  : modèle intégré pétrole-gaz-renouvelables-retail. Plenitude (filiale EGP+retail) : 3 GW renouvelables 2024, 10 GW 2030. Besoins cuivre (câbles offshore), REE (turbines), lithium (batteries storage). Enel Green Power : 65 GW mondiaux. Plan Transizione 5.0 gouvernement Meloni : 6.3 Mds€ incentives décarbonation industrie."
    },
    {
      name: "Câbles & Infrastructure électrique",
      detail: "Prysmian (Milan, CA ~16 Mds€) = 1er câblier mondial. Produits : câbles HV terrestres (Trino Vercellese, Arco), sous-marins (La Spezia, Pikkala FI). Cuivre ~400 000 t/an. Projets EU : Terra! (Allemagne HVDC), Medlink (IT-TN), Elmed (IT-Tunisie HVDC 600 MW, 220 km). Besoins cuivre africain (Zambie, DRC) vitaux pour expansion."
    },
    {
      name: "Mécanique & Machines",
      detail: "Italie = 2e producteur machines UE après Allemagne. Leonardo (hélicoptères, défense), Fincantieri (navires), Danieli (équipements métallurgiques), Comau (robotique — Stellantis), Prima Industrie (lasers). Besoins acier spécial (Cr, Ni, Mo), tungstène (outils), REE (servomoteurs, capteurs). CA secteur : ~70 Mds€/an. Export vers Afrique : équipements industriels, turbines."
    },
    {
      name: "Agroalimentaire & Emballage",
      detail: "Italie = 1er exportateur agroalimentaire EU valeur (hors vins). Ferrero, Barilla, Lavazza, Parmigiano-Reggiano DOP. Emballages aluminium (SIPA, Bormioli), tinplate (phosphates, acier). Besoins phosphates, potasse pour agriculture. Tetra Pak Italie (Modène) : emballages alimentaires. Engrais : Yara Italia, ICL. Dépendance OCP Maroc et Russie (potasse) sécurisée via partenariats CRMA."
    },
    {
      name: "Mode & Luxe — Matières premières",
      detail: "Luxe IT (Gucci/Kering, Prada, Armani, Versace/Capri) utilise matières précieuses d'Afrique : cuir tannage végétal (Toscane, sources bovins Kenya/Éthiopie), or recyclé (DRC, Ghana), diamants (DRC Artisanal). Fédération Mipel (maroquinerie) : 600 entreprises IT. Besoins or : ~200 t/an pour bijoux haute joaillerie. Enjeux traçabilité RJC (Responsible Jewellery Council)."
    }
  ],

  gigafactories: [
    {
      name: "ACC — Termoli Gigafactory",
      location: "Termoli, Molise (site ex-Fiat moteurs thermiques)",
      capacity: "40 GWh planifié (Phase 1)",
      status: "Faisabilité confirmée 2023. Construction prévue 2024-2026. Financements UE : 169 M€ IPCEI Hydrogène + fonds PNRR italiens. Retards possibles liés à restructuration ACC 2024.",
      operator: "ACC — Automotive Cells Company (Stellantis 33% / TotalEnergies 33% / Mercedes-Benz 33%)"
    },
    {
      name: "Stellantis — Mirafiori Battery Hub",
      location: "Turin, Piémont",
      capacity: "~5 GWh (batteries hybrides et BEV compactes)",
      status: "Opérationnel depuis 2023 pour Fiat 500e et hybrides Jeep. Reconversion partielle usine historique Mirafiori. Expansion 2025 prévue.",
      operator: "Stellantis N.V."
    },
    {
      name: "FAAM / Saft — Batterie stockage",
      location: "Montecchio Maggiore, Vicenza",
      capacity: "2-4 GWh (batteries industrielles, stockage réseau)",
      status: "Opérationnel. Expansion 2025-2026 avec investissements Saft (TotalEnergies). Cellules LFP pour storage réseau et mobilité lourde.",
      operator: "FAAM SpA (filiale Saft/TotalEnergies depuis 2023)"
    }
  ],

  crmaInstitutions: [
    {
      name: "MIMIT — Ministero delle Imprese e del Made in Italy",
      role: "Ministère de l'Économie productive. Pilote l'Unità Materie Prime Critiche (UMPC) pour la mise en œuvre nationale du CRMA EU. Coordonne les Strategic Partnerships matières premières avec pays tiers (Afrique, Amérique du Sud). Anime la Cabina di Regia pour la Transizione 5.0.",
      contact: "Via Molise 2, 00187 Roma | www.mimit.gov.it | Tél : +39 06 4705-1 | urp@mise.gov.it"
    },
    {
      name: "ISPRA — Istituto Superiore per la Protezione e la Ricerca Ambientale",
      role: "Institut supérieur protection et recherche environnementale. Département géologie et suivi ressources minérales italiennes. Inventaire des occurrences minérales nationales (Li, Co, REE, Ni) dans le cadre du CRMA. Expertise pour autorisations minières et études d'impact.",
      contact: "Via Vitaliano Brancati 48, 00144 Roma | www.isprambiente.gov.it | ispra@pec.isprambiente.it | Tél : +39 06 50071"
    },
    {
      name: "ICE Agenzia — Agenzia per la promozione all'estero",
      role: "Agence italienne pour la promotion des échanges et des investissements à l'étranger. Réseau dans 70 pays (dont 35 en Afrique). Facilite les partenariats miniers et industriels Italia-Afrique dans le cadre CRMA. Identifie opportunités sourcing pour industriels italiens.",
      contact: "Via Liszt 21, 00144 Roma EUR | www.ice.it | Tél : +39 06 59921 | info@ice.it"
    },
    {
      name: "SACE — Servizi Assicurativi del Commercio Estero",
      role: "Assurance-crédit export italienne (CDP Group). Couvre et garantit les investissements italiens en Afrique, notamment projets miniers, infrastructure, énergie. Plan Mattei : SACE mandatée pour garanties 4 Mds€ sur 4 ans pour projets Afrique. Instrument direct du corridor Italie-Afrique CRMA.",
      contact: "Piazza Poli 37-42, 00187 Roma | www.sace.it | info@sace.it | Tél : +39 06 6736-1"
    },
    {
      name: "Confindustria — Commissione Materie Prime",
      role: "Fédération patronale italienne. Commission Matières Premières critique représente 150 000 entreprises membres. Interlocuteur gouvernement pour CRMA et Strategic Partnerships. Anime le groupe de travail CRMA avec MIMIT. Publications annuelles : indices criticité approvisionnement pour industrie IT.",
      contact: "Viale dell'Astronomia 30, 00144 Roma | www.confindustria.it | Tél : +39 06 59031"
    }
  ]
};

// ============================================================
// 4. ESPAGNE 🇪🇸
// ============================================================

export const ENRICHMENT_ES: EUEnrichment = {

  criticalMineralsDemand: [
    {
      name: "Lithium",
      detail: "Mine d'Extremadura : Infinity Lithium (San José, 15 000 t LiOH/an autorisé), Extremadura New Energies (Cañaveral, ~7 500 t LiOH/an). SEAT/VW Sagunto (PowerCo 40 GWh, 2026) constituera le principal consommateur. Stellantis Saragosse et Vigo nécessitent ~25 000 t LCE/an. Espagne a une opportunité unique d'intégration verticale : gisement → gigafactory → véhicule."
    },
    {
      name: "Cobalt",
      detail: "SEAT/VW (Martorell, Pamplona, Saragosse) : batteries NMC 8-12 kg Co/véhicule. Stellantis (Vigo Peugeot/Citroën, Saragosse Opel) : accord ACC pour cellules HV NMC. Sourcing cobalt : DRC via Umicore (Belgium) ou Glencore (Rotterdam). Atlantic Copper (Huelva, Grupo México) : fonderie cuivre avec récupération cobalt résiduel (~50 t Co/an)."
    },
    {
      name: "Cuivre",
      detail: "Atlantic Copper (Huelva) = principal affineur cuivre Espagne, ~300 000 t/an. Alimenté par concentrés chiliens (Grupo México — SPCC) et africains (Zambie, DRC). Clients : Phelps Dodge España, Nexans España (câbles), Schneider Electric Iberia. Besoin Espagne : ~500 000 t/an cuivre (industrie + construction + câbles éolien). Mines Riotinto : reprise en cours (Atalaya Mining)."
    },
    {
      name: "Terres rares (REE)",
      detail: "Iberdrola (éolien, 1er EU) : turbines Siemens Gamesa et Vestas — ~2 000 t NdFeB/an pour parc éolien espagnol (30 GW). Acciona Energía (éolien, solaire) : équipements Nd-Fe-B. SEAT VW : moteurs traction électrique. Absence de production REE en Espagne — études IGME sur gisements Galice et Extremadura. Dépendance Chine ~98%."
    },
    {
      name: "Phosphates",
      detail: "Espagne = 2e agriculteur EU. Phosphates imports : ~1 Mt/an DAP/MAP via Huelva, Carthagène, Valence. OCP Maroc principal fournisseur (corridor Agadir/Safi → Algésiras). Fertiberia (Madrid, CA ~2.5 Mds€) : 1er producteur engrais Espagne, sites Palos de la Frontera et Sagonte. Yara España (Bilbao). Andalousie, Castille-La Manche, Aragon : consommateurs principaux."
    },
    {
      name: "Zinc",
      detail: "Asturiana de Zinc (San Juan de Nieva, Asturies) = 1ère fonderie zinc EU, ~300 000 t Zn/an (Glencore). Minerai : Suède (Boliden Tara), Australie, Amérique. Zinc galvanisation acier : ArcelorMittal Asturias (~120 000 t/an). Composants automobile : Ficosa (pare-chocs, Polinyà), Gestamp (emboutissage acier galvanisé). Besoin national : ~250 000 t/an."
    },
    {
      name: "Nickel",
      detail: "SEAT/VW (batteries NMC) et Stellantis ES : nickel sulfate haute pureté. ArcelorMittal Asturias : acier inox nickel (~50 000 t/an). Fournisseurs : Norilsk Nickel (remplacé post-Ukraine par Terrafame FI, BHP Nickel West AU). Proyecto Aguablanca (Monesterio, Extremadura) : gisement Ni-Cu-PGM en cours d'évaluation (Palatino Mining). Potentiel local pour réduire dépendance."
    },
    {
      name: "Potasse",
      detail: "ICL Iberia (anciennement Iberpotash) — Súria et Sallent, Catalogne : 1er producteur potasse EU, ~900 000 t KCl/an. Clientèle nationale : Fertiberia, Agroseguro. Export : Inde, Brésil. Réserves estimées : 200 ans à rythme actuel. Potasse espagnole = alternative stratégique au MOP russe/biélorusse post-guerre Ukraine. Critique pour agriculture africaine (OCP programmes)."
    }
  ],

  keyEnterprisesForCorridor: [
    {
      name: "Repsol",
      role: "Compagnie pétrolière intégrée. PDG : Josu Jon Imaz. CA 2024 : ~56 Mds€. Pétrole, gaz, raffinerie, chimie, renouvelables. Transition vers multiénergie.",
      africaRelevance: "Production africaine : Libye (Murzuq Basin, Repsol 11.25%), Nigeria (OML 130, partenaire Shell), Angola (Block 31, BA), Algérie (In Amenas — racheté accord 2023 Total/Repsol). Repsol Renovables Afrique : études Maroc solaire (Noor Midelt), Namibie éolien (Lüderitz). Repsol Química : fournisseur polymères pour tuyauteries mines africaines."
    },
    {
      name: "Acciona Energía",
      role: "1er producteur mondial énergie renouvelable pure player coté. PDG : Rafael Mateo. CA EGP 2024 : ~4.8 Mds€. Éolien, solaire, hydro, hydrogène vert.",
      africaRelevance: "Afrique du Sud : Gouda Wind (138 MW), Loeriesfontein 2 (140 MW), Nxuba Wind (140 MW). Chili, Australie, Mexique. Maroc : études éolien Tarfaya (extension). Kenya : Lake Turkana Wind (310 MW — 1ère éolienne sub-saharienne). Besoins REE (turbines Nd-Fe-B), cuivre (câbles), lithium (batteries storage). Corridor Afrique → minéraux renouvelables."
    },
    {
      name: "Iberdrola",
      role: "1er groupe éolien EU et 2e mondial. PDG : Ignacio Galán. CA 2024 : ~57 Mds€. Éolien offshore, solaire, réseaux intelligents, hydrogène.",
      africaRelevance: "Maroc : partenariat ONEE pour interconnexion renouvelables (projet Elmed HV). Afrique du Sud : études capacité offshore éolien (côte KwaZulu-Natal). Fournisseur principal Siemens Gamesa (turbines REE). Réseaux électriques Afrique : candidat projets AEEP (EU-Africa Energy Partnership). Besoins cuivre câbles : Atlantic Copper Huelva approvisionnement domestique."
    },
    {
      name: "Telefónica",
      role: "Opérateur télécom mondial. PDG : José María Álvarez-Pallete. CA 2024 : ~40 Mds€. Présence 12 pays Espagne/Amérique Latine. Marques Movistar, O2, Vivo.",
      africaRelevance: "Présence historique Maroc (Méditel vendu à Orange 2016) et Afrique du Nord. Câbles sous-marins transatlantiques (MAREA, BRUSA) connectant Afrique à US. Data centers Madrid (hub Afrique-UE). Telefónica Tech : cybersécurité pour entreprises minières africaines. Accord partenariat OCP Digital pour solutions agriculture connectée Maroc."
    },
    {
      name: "Banco Santander",
      role: "1ère banque d'Espagne et Amérique Latine. PDG : Ana Botín. Actifs totaux 2024 : ~1 950 Mds€. Trade finance, project finance, banque retail.",
      africaRelevance: "Maroc (Attijariwafa Bank : Santander partenaire historique). Afrique du Sud : filiale directe (Corporate Banking). Financement trade minerais Afrique-EU via Rotterdam et Huelva. Ponte commercial Amérique Latine (minerais Chili/Pérou) → Espagne → EU : câble cuivre Cordero-Huelva. Sustainability-linked loans projets CRMA africains."
    },
    {
      name: "Atlantic Copper (Grupo México)",
      role: "1ère fonderie cuivre Espagne. DG : Pedro Navarro. CA ~3.5 Mds€. Site unique : Huelva (Andalousie). Fonderie + raffinerie + usine acide sulfurique.",
      africaRelevance: "Traite concentrés cuivre africains : Zambie (KCM), DRC (Katanga Mining, CMOC). Port Huelva : terminal spécialisé minerais. Livraisons par vraquiers depuis Beira/Walvis Bay/Pointe-Noire. Récupération métaux précieux (Au, Ag, Se) et cobalt lors du raffinage. Partenariat logistique CMA CGM pour frets Afrique-Huelva."
    },
    {
      name: "Sacyr",
      role: "Groupe BTP et concessions. PDG : Manuel Manrique. CA 2024 : ~5.5 Mds€. Construction, services urbains, concessions autoroutes/ports.",
      africaRelevance: "Maroc (autoroutes Taza-El Hoceima), Afrique du Sud (autoroute N1 gestion trafic), Angola (rénovation réseau routier Luanda), Mozambique (études port Nacala). BTP infrastructure minière : routes d'accès sites miniers Mauritanie (SNIM), Ghana. Sacyr Agua : gestion eau Afrique du Nord. Partenaire potentiel corridor logistique minéraux EU-Afrique."
    },
    {
      name: "IGME — Instituto Geológico y Minero de España",
      role: "Institut géologique national espagnol. Inventaire des ressources minérales stratégiques. Cartographie lithium Extremadura, REE Galice, cobalt Huelva. Pilote les projets Strategic Projects CRMA en Espagne. Coordination avec Commission Européenne pour projets Infinity Lithium et Extremadura New Energies.",
      africaRelevance: "Coopération géologique avec Maroc (ONHYM), Mauritanie (OMRG), Sénégal (DGMG). Cartographie sous-marine entre Espagne et Afrique du Nord (ressources minérales fond marin). Publications IGME accessibles aux industriels espagnols pour sourcing africain."
    }
  ],

  keyConsumingIndustries: [
    {
      name: "Automobile & Gigafactories",
      detail: "Espagne = 2e producteur automobile EU (après Allemagne). SEAT/VW (Martorell, Saragosse, Pampelune), Stellantis (Vigo — Peugeot/Citroën, Saragosse — Opel), Renault (Valladolid, Palencia). PowerCo/VW Sagunto (40 GWh, 2026) = locomotive transition VE. PERTE (Plan de Recuperación para el sector turístico y económico) : 4.3 Mds€ pour électromobilité. Objectif : 400 000 VE/an produits en Espagne 2030."
    },
    {
      name: "Énergies renouvelables",
      detail: "Espagne = 2e capacité éolienne EU (30 GW installés 2024). Iberdrola (Bilbao), Acciona (Madrid), EDP Renewables (Madrid), Repsol Renovables : CA cumulé >50 Mds€. Siemens Gamesa (turbines de 14-15 MW, siège Zamudio) = champion européen éolien offshore. Besoins : REE (~3 000 t NdFeB/an), cuivre (~100 000 t/an câblage fermes), acier. Objectif Espagne 2030 : 80% renouvelable."
    },
    {
      name: "Chimie & Engrais",
      detail: "Fertiberia (Madrid, CA ~2.5 Mds€) : 1er producteur engrais ibérique. Sites Palos de la Frontera (H2V green ammonia project), Sagonte (NPK), Avilés. Repsol Química (Tarragone, Puertollano) : polymères, aromatics. Cepsa Química (Puertollano, San Roque). Yara España (Bilbao) : ammonitrates, urée. Besoins phosphates Maroc (1 Mt/an), potasse ICL Iberia (900 000 t/an). Partenariat stratégique OCP-Fertiberia pour H2V-ammoniaque vert."
    },
    {
      name: "Agroalimentaire",
      detail: "Espagne = 1er producteur EU fruits & légumes. Inditex (Zara — indirect via coton africain), Calvo (thon), García Carrión (vins, jus), Campofrío (viandes). Agriculture intensive Andalousie, Murcie, Almería (~200 000 ha serres) : phosphates, potasse, nitrates. Imports engrais via Huelva, Barcelone, Valence. Partenariat avec Maroc (légumes primeur) et Sénégal (pêche) : flux retour potentiel minerais."
    },
    {
      name: "Construction & Infrastructure",
      detail: "Secteur construction relancé post-COVID. ACS (Florentino Pérez, CA ~40 Mds€), Ferrovial (Juan Béjar, CA ~8 Mds€), FCC, Acciona Infraestructuras : grands groupes BTP export. Besoins : acier (manganèse, nickel), cuivre (câblage bâtiments intelligents), aluminium (façades). Projets phares : MedChloé (H2 pipeline Barcelone-Marseille), corridors HSR Espagne-France, extension port Algésiras (4e port EU)."
    }
  ],

  gigafactories: [
    {
      name: "Envision AESC — Navalmoral de la Mata",
      location: "Navalmoral de la Mata, Estrémadure",
      capacity: "30 GWh Phase 1 — extensible à 50 GWh",
      status: "Construction en cours 2023-2025. Production prévue fin 2025-début 2026. Cellules NMC pour Renault. Investissement : 900 M€. Financement PERTE + fonds EU.",
      operator: "AESC Group (Envision) pour Renault Espagne"
    },
    {
      name: "PowerCo / Volkswagen — Sagunto",
      location: "Sagunto, Communauté Valencienne",
      capacity: "40 GWh Phase 1 — extensible à 80 GWh",
      status: "Construction 2023-2026. Production cible : 2026. Investissement : 3 Mds€ (PowerCo + aides État espagnol 350 M€ + EU IPCEI). Alimentera usines Seat, Skoda, VW Espagne.",
      operator: "PowerCo SE (filiale Volkswagen AG)"
    },
    {
      name: "Basquevolt",
      location: "Pays Basque (site en sélection — Vitoria-Gasteiz ou Bilbao)",
      capacity: "10 GWh pilote — extension 30 GWh",
      status: "Démonstrateur batteries solides 2024-2025. Technologie SSB (solid-state battery) avec électrolyte céramique. Partenariat Ikerbasque, CIC energiGUNE, IK4 Research Alliance. Financement : Gouvernement Pays Basque + H2020 EU.",
      operator: "Basquevolt SL (spin-out CIC energiGUNE / Basque Research & Technology Alliance)"
    },
    {
      name: "Stellantis — Figueruelas (Saragosse)",
      location: "Figueruelas, Saragosse, Aragon",
      capacity: "~10 GWh (batteries hybrides Opel/Peugeot)",
      status: "Reconversion partielle usine Figueruelas pour assemblage batteries hybrides. Opérationnel 2024. Extension BEV en étude (dépend FID ACC Kaiserslautern ou accord CATL ES).",
      operator: "Stellantis N.V. — Opel/Citroën Espagne"
    }
  ],

  crmaInstitutions: [
    {
      name: "IGME-CSIC — Instituto Geológico y Minero de España",
      role: "Institut géologique national, rattaché au CSIC (Conseil Supérieur de la Recherche Scientifique). Inventaire des ressources minérales stratégiques espagnoles. Évalue les gisements lithium (Extremadura, Estrémadure/Galice), REE (Galice, Castille-León), cobalt (Huelva), potasse (Catalogne). Point focal CRMA pour les Strategic Projects nationaux.",
      contact: "Ríos Rosas 23, 28003 Madrid | www.igme.es | igme@igme.es | Tél : +34 91 349 57 00"
    },
    {
      name: "MITECO — Ministerio para la Transición Ecológica",
      role: "Ministère pour la Transition Écologique et le Défi Démographique. Pilote le Plan Nacional de Materias Primas Críticas (PNMPC, 2024). Coordonne les accords de partenariat stratégiques CRMA : Maroc (phosphates, cobalt), Namibie (lithium), Chili (cuivre). Autorité nationale CRMA vis-à-vis de la Commission Européenne.",
      contact: "Plaza de San Juan de la Cruz s/n, 28071 Madrid | www.miteco.gob.es | Tél : +34 91 597 60 00"
    },
    {
      name: "ICEX España Exportación e Inversiones",
      role: "Agence nationale pour l'export et les investissements étrangers. Réseau 30 pays africains. Facilite les partenariats mines et minéraux entre entreprises espagnoles et africaines. Publie études marché mines/minerais. Cofinancement par Fond Europeo de Desarrollo Regional (FEDER).",
      contact: "Paseo de la Castellana 278, 28046 Madrid | www.icex.es | info@icex.es | Tél : +34 91 349 61 00"
    },
    {
      name: "ICO — Instituto de Crédito Oficial",
      role: "Banque publique de développement espagnole. Finance les investissements espagnols à l'étranger dans les secteurs critiques. Fonds ICO Internacional : lignes de crédit pour projets mines/minerais en Afrique et Amérique Latine. Partenaire EU Global Gateway pour financement corridor Espagne-Afrique.",
      contact: "Paseo del Prado 4, 28014 Madrid | www.ico.es | info@ico.es | Tél : +34 91 592 16 00"
    },
    {
      name: "Cluster de Automoción de la Comunitat Valenciana (AVIA)",
      role: "Cluster automobile valencien regroupant fournisseurs de Sagunto (PowerCo) et usines Stellantis/Ford (Vale). Coordonne la chaîne d'approvisionnement minéraux critiques locaux (Li Extremadura → Sagunto). Interface entre IGME, MITECO et industriels pour les projets CRMA régionaux. Modèle de gouvernance multi-acteurs CRMA.",
      contact: "Carrer de Colom 15, 46004 Valencia | www.avia.es | info@avia.es | Tél : +34 96 353 05 05"
    }
  ]
};

// ============================================================
// 5. PAYS-BAS 🇳🇱
// ============================================================

export const ENRICHMENT_NL: EUEnrichment = {

  criticalMineralsDemand: [
    {
      name: "Cobalt",
      detail: "Umicore (Anvers, BE — mais hub Rotterdam) : précurseurs cathodes NMC pour batteries, ~8 000 t Co/an. Glencore Rotterdam Trading : hub négoce cobalt mondial, ~20 000 t Co/an transitent par Rotterdam. Shell Chemicals (Pernis) : catalyseurs cobalt pour hydrocraquage (~300 t/an). LyondellBasell (Rotterdam) : catalyseurs cobalt pour polyoléfines. Cobalt sourcing : DRC (75% mondial) — Glencore/CMOC/ERG."
    },
    {
      name: "Lithium",
      detail: "ASML (Veldhoven) consomme lithium fluoride (LiF) dans les couches minces pour optiques EUV — volumes modestes mais très haute pureté. Nouryon (Deventer) : produits chimiques lithium industriels. Port Rotterdam : hub transit LiOH/Li2CO3 d'Amérique du Sud et Australie vers EU. Flux 2024 : ~80 000 t LiCO3eq transitant par Rotterdam. Pays-Bas sans gigafactory locale mais infrastructure trading dominante."
    },
    {
      name: "Cuivre",
      detail: "Port de Rotterdam = plus grand hub cuivre EU : ~600 000 t concentrés cuivre/an débarqués. Trafigura, Vitol, Glencore NL : négoce cuivre mondial depuis Rotterdam. Nexans Pays-Bas (câbles) : ~40 000 t Cu/an. Shell Pernis (raffinerie) : catalyseurs cuivre. ABB Netherlands (Eindhoven) : moteurs, transformateurs. Heineken (Zoeterwoude) : cuivre pour équipements brasserie. Flux cuivre africain principal : Zambie (KCM/ZCCM), DRC."
    },
    {
      name: "Terres rares (REE)",
      detail: "ASML (Veldhoven) = application REE la plus critique EU : yttrium/lutetium pour scintillateurs détecteurs, lanthane/cérium pour optiques, néodyme pour aimants moteurs de positionnement wafer. Chaque machine EUV NXE contient ~100 kg REO total. ASML produit ~350 systèmes EUV/an : besoin ~35 t REO/an haute pureté. Fournisseur : Solvay (La Rochelle), Shin-Etsu (Japon), Neo Performance (Canada)."
    },
    {
      name: "Phosphates",
      detail: "Yara International (Pays-Bas — bureau groupe, Sluiskil production) : usine d'ammonitrate de Sluiskil (1 Mt/an), besoin acide phosphorique ~200 000 t P2O5/an. OCP Group (Maroc) a un bureau commercial à Rotterdam. Port Rotterdam : hub mondial engrais phosphatés — ~3 Mt DAP/MAP/TSP débarquées/an destinées EU et Afrique Sub-Saharienne. Rotterdam = plaque tournante mondiale fertilisants."
    },
    {
      name: "Germanium & Gallium",
      detail: "ASML : gallium arsenide (GaAs), indium phosphide (InP) pour composants optiques EUV. NXP Semiconductors (Eindhoven) : GaN (gallium nitride) pour semi-conducteurs puissance. Philips/Signify (Eindhoven) : GaN LEDs industrielles. Restrictions export chinois Ge/Ga (août 2023) : impact direct sur chaîne approvisionnement ASML et NXP. Initiative EU Critical Raw Materials Act pour stocks stratégiques NL."
    }
  ],

  keyEnterprisesForCorridor: [
    {
      name: "Trafigura",
      role: "1er négociant métaux et minerais au monde (avec Glencore). PDG : Jeremy Weir. CA 2024 : ~256 Mds USD. Siège Amsterdam / bureau principal Genève. Trading cuivre, zinc, aluminium, cobalt, nickel, lithium.",
      africaRelevance: "Trafigura = acteur dominant minerais africains. Zambie : KCCM (Konkola Copper Mines, 90%) — production cuivre 40 000 t/an. DRC : trading cobalt CMOC/ERG. Mozambique : Moma Titanium Minerals. Namibie (cuivre Tsumeb fonderie). Port Rotterdam : hub réception concentrés Afrique. Corridor Lobito (Angola-Zambie-DRC) : Trafigura investisseur infrastructure ferroviaire. Financement mines artisanales responsables via Trafigura Foundation."
    },
    {
      name: "Shell",
      role: "Supermajor pétrolier-gazier. PDG : Wael Sawan. CA 2024 : ~297 Mds USD. Siège : Londres/La Haye (duale). Pétrole, GNL, renouvelables, chimie.",
      africaRelevance: "Nigeria : SPDC (Shell Petroleum Development Corporation of Nigeria) — production 100 000 bep/j (actifs cession partielle 2024 à Renaissance Consortium). Tanzanie : Shell/Equinor LNG Tanzania (~30 Mt/an planifié). Afrique du Sud : réseaux distribution carburants (Shell SA). Gabon : partenariat Assala (acquis par Gabon Oil). Besoins cuivre/câbles africains pour opérations offshore."
    },
    {
      name: "Vitol",
      role: "1er négociant pétrolier mondial. DG : Russell Hardy. Revenus 2024 : ~300 Mds USD. Siège Rotterdam / Genève. Trading pétrole brut, produits raffinés, GNL.",
      africaRelevance: "Angola : principal acheteur Sonangol (>100 000 b/j). Nigeria : trading NNPC, NLNG. Gabon : Perenco partenaire. Côte d'Ivoire : distribution via VVI (Vitol Value Investments). Vitol Africa Infrastructure Fund : investissements terminaux pétroliers et stockage Afrique. Flux retour : métaux non-ferreux africains sur navires trajet retour vers Rotterdam (backhaul trading)."
    },
    {
      name: "Heineken",
      role: "2e brasseur mondial. PDG : Dolf van den Brink. CA 2024 : ~36 Mds€. Siège Amsterdam. Bières Heineken, Amstel, Desperados, Affligem.",
      africaRelevance: "28 brasseries dans 21 pays africains. Nigéria (NBPLC, 80 M hl/an), Éthiopie (Meta Beer, 12 M hl), Afrique du Sud, RDC, Cameroun, Congo, Rwanda, Côte d'Ivoire. Heineken Africa Foundation. Sourcing houblon, malt, aluminium (boîtes) : Afrique Sub-Saharienne. Cuivre équipements brasserie. Investissement Afrique 2024-2028 : 1.5 Mds€. Employeur direct 60 000 personnes Afrique."
    },
    {
      name: "ASML",
      role: "Monopoleur mondial machines photolithographie EUV. PDG : Christophe Fouquet (depuis 2024). CA 2024 : ~28 Mds€. Veldhoven, Pays-Bas. Machines EUV (NXE) et DUV (NXT) vendues à TSMC, Samsung, Intel.",
      africaRelevance: "Pas de production africaine directe, mais dépendance critique aux minéraux stratégiques dont certains d'Afrique. Yttrium (REE) : Afrique du Sud (Zircor). Colombite-tantalite : Rwanda et DRC. Cuivre (circuits) : DRC/Zambie. Gallium : Chine (restrictions 2023). ASML = principal moteur de la criticité EU pour REE, Ga, Ge, In. Sécurisation supply chain minerais = enjeu existentiel pour ASML et l'industrie semi-conducteurs EU."
    },
    {
      name: "ING Bank",
      role: "1ère banque néerlandaise, top 10 EU. PDG : Steven van Rijswijk. Actifs totaux : ~975 Mds€. Trade finance, project finance, banque corporate, marchés de capitaux.",
      africaRelevance: "ING = banquier de référence pour trading commodities Afrique (Trafigura, Vitol, Gunvor). Financement projets mines cobalt DRC (CMOC, Glencore), cuivre Zambie (KCM). ING Sustainable Finance : 3 Mds€ de green finance pour projets miniers responsables Afrique 2024-2026. Syndication eurobonds africains (Nigeria, Kenya, Ghana). ING Amsterdam : centre décisionnel trading minéraux UE."
    },
    {
      name: "Philips / Signify",
      role: "Philips (healthcare, Eindhoven). Signify (éclairage, ex-Philips Lighting). PDG Signify : Eric Rondolat. CA Signify 2024 : ~6.7 Mds€. LEDs, systèmes d'éclairage connectés.",
      africaRelevance: "Philips Healthcare Afrique : équipements médicaux (scanners IRM, échographies) dans 50+ pays africains — nécessite REE (Gd pour IRM), cobalt (alliages). Signify Afrique : ~25 M LED vendus/an Afrique subsaharienne. Programmes électrification rurale (Éclairage Solaire, Kenya, Tanzanie). Composants GaN (gallium) pour LED efficaces — sourcing Chine/UE. Philips Foundation : accès soins Afrique."
    }
  ],

  keyConsumingIndustries: [
    {
      name: "Semi-conducteurs (ASML)",
      detail: "ASML (Veldhoven) = unique fournisseur mondial de machines EUV lithographie — monopole absolu. CA 28 Mds€ 2024. Carnet de commandes : 36 Mds€ (2025). Chaque machine EUV : 100 000 pièces, 3 000 fournisseurs EU dont 80% Pays-Bas/DE/BE. Besoins minerais : REE (optiques, aimants), Si ultra-pur, Ge, Ga, In, W (masques), Co (couches). Impact chaîne: si ASML s'arrête → pénurie mondiale semi-conducteurs en 3 mois. Criticité absolue CRMA."
    },
    {
      name: "Chimie & Raffinage",
      detail: "Shell Pernis (Rotterdam) = 1ère raffinerie EU par capacité (400 000 b/j). LyondellBasell (Rotterdam, CA ~40 Mds€) : polyéthylène, polypropylène. Nouryon (Amsterdam, ex-AkzoNobel Specialty Chemicals) : chlore, peroxydes, chimie lithium. ExxonMobil Rotterdam. Chemelot (Sittard-Geleen) : cluster chimique. Besoins : Ni (catalyseurs hydrocraquage), Co, Pt, Re, Mo. Rotterdam = hub matières premières chimiques EU."
    },
    {
      name: "Port & Logistique minerais",
      detail: "Port de Rotterdam = 1er port EU (480 Mt de marchandises 2024). Hub mondial minéraux africains vers EU. Terminaux spécialisés : EMO (minerais vrac), EECV (cuivre/concentrés), OBA (alumine/bauxite). Flux minéraux : 30 Mt minerais métalliques/an. Port Authority Rotterdam coordonne avec Commission EU pour CRMA Strategic Stockpiles. Projets : Rotterdam Mineral Hub (2025) pour traçabilité CRMA, entrepôts sécurisés minerais critiques."
    },
    {
      name: "Finance & Trading matières premières",
      detail: "Pays-Bas = 1er hub mondial commodities trading hors Genève. Trafigura (Amsterdam), Vitol (Rotterdam), Gunvor (Rotterdam), Mercuria (Amsterdam) : CA cumulé >700 Mds USD/an. Financement : ING, ABN AMRO, Rabobank — spécialistes commodity finance. Niche: structured commodity finance (pre-export finance, repos minéraux) vers Afrique. Fonds souverain néerlandais APG (900 Mds€) : investissements ESG mines africaines."
    },
    {
      name: "Agriculture & Engrais",
      detail: "Pays-Bas = 2e exportateur mondial agroalimentaire (après USA). Floriculture (fleurs, bulbes : 50% exportations mondiales), maraîchage sous serres (LED Signify), semences (BASF Plant Science NL, Syngenta NL). Yara (Sluiskil) : 1 Mt ammonitrate/an. Phosphates via OCP Rotterdam. Nutrien et ICL bureaux négoce Amsterdam. Rabobank Food & Agri : 300 Mds€ actifs financement agri mondial — lié approvisionnements phosphates africains."
    }
  ],

  gigafactories: [
    {
      name: "Envision AESC — Rotterdam (étude)",
      location: "Port de Rotterdam / Moerdijk Industrial Area",
      capacity: "20-40 GWh (en étude de faisabilité)",
      status: "Études préliminaires 2024. Pas encore de FID (Final Investment Decision). Rotterdam positionné comme hub batteries grâce à infrastructure logistique minerais. Décision attendue 2025-2026.",
      operator: "Envision AESC Group (en partenariat potentiel avec Port of Rotterdam Authority)"
    },
    {
      name: "Umicore — Breda Battery Materials",
      location: "Breda, Brabant-Septentrional",
      capacity: "Usine de précurseurs cathodes (pCAM) — 150 000 t/an capacité EU cumulée (Breda + Nysa PL)",
      status: "Opérationnel 2024. Produit pCAM NMC 9-1/2-1 pour CATL, ACC, Northvolt. Consomme ~6 000 t Co/an + nickel sulfate + lithium. Umicore Breda = nœud critique chaîne batteries EU.",
      operator: "Umicore NV (coté Euronext Bruxelles)"
    },
    {
      name: "Nouryon — Lithium Battery Chemicals",
      location: "Deventer, Overijssel",
      capacity: "Production électrolytes et sels lithium pour batteries — ~5 000 t/an LiPF6",
      status: "Opérationnel et expansion 2024. Fournisseur électrolyte à Northvolt, ACC, Morrow (Norvège). Nouryon = 1er producteur EU LiPF6 (sel électrolyte batteries Li-ion).",
      operator: "Nouryon (ex-AkzoNobel Specialty Chemicals, propriété Carlyle Group)"
    }
  ],

  crmaInstitutions: [
    {
      name: "TNO — Netherlands Organisation for Applied Scientific Research",
      role: "Organisation de recherche appliquée nationale. Unité Critical Raw Materials : analyse chaînes d'approvisionnement, économie circulaire, substitution matériaux critiques. Fournit expertise technique gouvernement néerlandais pour implémentation CRMA. Projets : recyclage REE moteurs électriques, récupération In/Ge des déchets électroniques.",
      contact: "Anna van Buerenplein 1, 2595 DA La Haye | www.tno.nl | info@tno.nl | Tél : +31 88 866 00 00"
    },
    {
      name: "RVO — Rijksdienst voor Ondernemend Nederland",
      role: "Agence gouvernementale pour l'entreprise (Ministère Affaires Économiques EZK). Financement et soutien projets CRMA pour PME néerlandaises. Gère les instruments de financement export Pays-Bas vers Afrique (ATI, DGGF). Coordonne les candidatures Strategic Projects CRMA EU pour les projets néerlandais.",
      contact: "Prinses Beatrixlaan 2, 2595 AL La Haye | www.rvo.nl | info@rvo.nl | Tél : +31 88 042 42 42"
    },
    {
      name: "EZK — Ministerie van Economische Zaken en Klimaat",
      role: "Ministère de l'Économie et du Climat. Pilote la Stratégie Nationale Matières Premières Critiques (Grondstoffenstrategie 2024). Coordonne les accords de partenariat CRMA bilatéraux (Namibie, DRC, Zambie, Chili). Ministre : Dirk Beljaarts (depuis 2024). Supervise TNO, RVO, Port Authority Rotterdam dans le cadre CRMA.",
      contact: "Bezuidenhoutseweg 73, 2594 AC La Haye | www.government.nl/ministries/ministry-of-economic-affairs | Tél : +31 70 379 89 11"
    },
    {
      name: "Port of Rotterdam Authority",
      role: "Autorité portuaire de Rotterdam (N.V. Havenbedrijf Rotterdam). Co-propriété Ville de Rotterdam (70%) et État néerlandais (30%). Développe le Rotterdam Mineral Hub : infrastructure de stockage et traçabilité pour minéraux critiques CRMA. Interlocuteur direct Commission Européenne pour Strategic Stockpiles EU. Investissement : 200 M€ hub minéraux 2025-2028.",
      contact: "Wilhelminakade 909, 3072 AP Rotterdam | www.portofrotterdam.com | info@portofrotterdam.com | Tél : +31 10 252 10 10"
    },
    {
      name: "Holland Minerals (initiative sectorielle)",
      role: "Initiative industrie néerlandaise regroupant Trafigura, Shell, ING, ABN AMRO, ASML, Umicore NL pour coordonner la sécurisation des approvisionnements en minéraux critiques. Publie annuellement le Dutch Critical Minerals Monitor. Interface avec Commission Européenne pour Strategic Partnerships CRMA. Lien avec Port of Rotterdam Mineral Hub.",
      contact: "c/o FME (secteur industrie technologique NL) | Boerhaavelaan 40, 2713 HX Zoetermeer | www.fme.nl | Tél : +31 79 353 11 00"
    }
  ]
};
