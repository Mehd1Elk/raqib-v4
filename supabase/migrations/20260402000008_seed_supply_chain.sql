-- Insert 5 parent companies if they don't exist
INSERT INTO acq_companies (name, hq, sector, revenue_b, employees_k, corridor_countries, eigen_briques, eigen_score, tier, pipeline_stage, priority, annual_value_estimate)
SELECT * FROM (VALUES
  ('TotalEnergies', 'FR', 'ENR', 200.0, 100, ARRAY['FR','SN','CI','GA','NG','AO','MZ','UG'], 'NABZR', 92, 'Tier 0', 'negotiation', 'P0', 1300000),
  ('BNP Paribas', 'FR', 'BNK', 115.0, 190, ARRAY['FR','SN','CI','MA','TN','DZ','GA','CG'], 'NAMZBR', 95, 'Tier 0', 'negotiation', 'P0', 4520000),
  ('Sanofi', 'FR', 'PHR', 43.0, 91, ARRAY['FR','MA','SN','CI','KE','ZA','NG'], 'NAMBY', 88, 'Tier 0', 'demo', 'P0', 1560000),
  ('Siemens', 'DE', 'IND', 72.0, 320, ARRAY['DE','FR','NG','ZA','KE','EG','MA'], 'NABYR', 90, 'Tier 0', 'demo', 'P0', 1800000),
  ('AXA', 'FR', 'INS', 102.0, 145, ARRAY['FR','MA','SN','CI','GA','CM','BF'], 'NAMZBR', 91, 'Tier 0', 'negotiation', 'P0', 1800000)
) AS v(name, hq, sector, revenue_b, employees_k, corridor_countries, eigen_briques, eigen_score, tier, pipeline_stage, priority, annual_value_estimate)
WHERE NOT EXISTS (SELECT 1 FROM acq_companies c WHERE c.name = v.name);

-- TotalEnergies supply chain
INSERT INTO acq_supply_chain (parent_company_id, tier, tier_name, tier_type, count_entities, examples, eigen_briques, contract, legal_force, eigen_revenue, detail)
SELECT c.id, t.tier, t.tier_name, t.tier_type, t.count_entities, t.examples, t.eigen_briques, t.contract, t.legal_force, t.eigen_revenue, t.detail
FROM acq_companies c,
(VALUES
  (0, 'TotalEnergies', 'Donneur d''ordre', '1', 'TotalEnergies SE — 100K+ employes', 'NABZR', '€150K/an abo + tx', 'CS3D Art.6-8', '€1.3M/an', 'Signature enterprise = entree dans toute la chaine energetique'),
  (1, 'Fournisseurs directs', 'Tier 1 — Grands fournisseurs', '5000', 'Schlumberger, Halliburton, Technip, Baker Hughes, Saipem, Vallourec, Bureau Veritas', 'BAZ', NULL, 'Clause contractuelle TotalEnergies', '€192K/an', '5K x €0.008/tx x 400 tx/mois'),
  (2, 'Sous-traitants PME', 'Tier 2 — PME industrielles', '50000', 'Soudeurs, fabricants vannes, logisticiens, labo analyse', 'BA', NULL, 'CS3D Art.7 cascade', '€120K/an', 'Obligation de due diligence cascadee via CS3D'),
  (3, 'Distributeurs', 'Tier 3 — Reseau distribution', '16000', '16 000 stations TotalEnergies EU+Afrique, distributeurs GPL', 'ABZ', NULL, 'Reglementation tracabilite hydrocarbures', '€400K/an', 'Tracabilite obligatoire sur toute la chaine de distribution'),
  (4, 'Clients finaux', 'Tier 4 — Utilisateurs', '30M+', 'Automobilistes, entreprises acheteuses energie', 'AM', NULL, 'RGPD + Data Act', '€180K/an + MYNe', 'Consentement donnees + micro-transactions MYNe')
) AS t(tier, tier_name, tier_type, count_entities, examples, eigen_briques, contract, legal_force, eigen_revenue, detail)
WHERE c.name = 'TotalEnergies';

-- BNP Paribas supply chain
INSERT INTO acq_supply_chain (parent_company_id, tier, tier_name, tier_type, count_entities, examples, eigen_briques, contract, legal_force, eigen_revenue, detail)
SELECT c.id, t.tier, t.tier_name, t.tier_type, t.count_entities, t.examples, t.eigen_briques, t.contract, t.legal_force, t.eigen_revenue, t.detail
FROM acq_companies c,
(VALUES
  (0, 'BNP Paribas', 'Donneur d''ordre', '1', 'BNP Paribas SA — 190K+ employes', 'NAMZBR', '€200K/an', 'PSD3/DORA/MiCA', '€4.52M/an', 'Contrat enterprise couvrant toutes les briques'),
  (1, 'Prestataires IT', 'Tier 1 — ESN & IT', '8000', 'Accenture, Capgemini, Sopra Steria, Atos, CGI, IBM, Infosys + 7000 PME IT', 'AB', NULL, 'DORA Art.28 gestion risque tiers ICT', '€480K/an', 'EFFET PRESCRIPTEUR : les ESN integrent AELYA/BURHAN pour BNP puis le proposent a leurs 50+ autres clients bancaires'),
  (2, 'Courtiers et agents', 'Tier 2 — Distribution', '12000', 'Courtiers credit, agents assurance, CGP, comparateurs', 'ABN', NULL, 'DDA devoir de conseil', '€230K/an', 'Obligation de consentement eclaire via DDA'),
  (3, 'Entreprises clientes', 'Tier 3 — Corporate banking', '500000', '500K entreprises clientes BNP corporate banking', 'ZBR', NULL, 'AML6 + KYC/KYB', '€12.5M/an', 'Potentiel Phase 3 — MIZAN settlement corridor'),
  (4, 'Clients retail', 'Tier 4 — Particuliers', '30M+', '30M particuliers BNP Europe', 'ANM', NULL, 'PSD3 + EHDS', '€4.2M/an', 'Consentement bancaire + sante')
) AS t(tier, tier_name, tier_type, count_entities, examples, eigen_briques, contract, legal_force, eigen_revenue, detail)
WHERE c.name = 'BNP Paribas';

-- Sanofi supply chain
INSERT INTO acq_supply_chain (parent_company_id, tier, tier_name, tier_type, count_entities, examples, eigen_briques, contract, legal_force, eigen_revenue, detail)
SELECT c.id, t.tier, t.tier_name, t.tier_type, t.count_entities, t.examples, t.eigen_briques, t.contract, t.legal_force, t.eigen_revenue, t.detail
FROM acq_companies c,
(VALUES
  (0, 'Sanofi', 'Donneur d''ordre', '1', 'Sanofi SA — 91K employes', 'NAMBY', '€130K/an', 'EU FMD + EHDS + ICH-GCP', '€1.56M/an', 'Contrat pharma enterprise couvrant essais cliniques + tracabilite'),
  (1, 'CRO & CMO', 'Tier 1 — Sous-traitants pharma', '500', 'IQVIA, Parexel, Covance, PPD, Catalent, Lonza, Recipharm', 'ABM', NULL, 'ICH-GCP E6(R2) + EU CTR', '€1.2M/an', 'Consent patients essais cliniques'),
  (2, 'Pharmacies & distributeurs', 'Tier 2 — Distribution', '30000', '30K pharmacies FR + distributeurs EU', 'AB', NULL, 'EU FMD serialisation obligatoire', '€600K/an', '50M boites/mois tracables via EU FMD'),
  (3, 'Mutuelles & assureurs', 'Tier 3 — Payeurs', '5000', 'Mutuelles prescrivant les generiques Sanofi', 'NAM', NULL, 'EHDS + DDA', '€500K/an', 'Donnees sante + obligation de conseil'),
  (4, 'Patients', 'Tier 4 — Utilisateurs', '50M+', '50M+ patients traites par Sanofi EU', 'ANM', NULL, 'RGPD + EHDS', '€2M/an', 'Consentement donnees sante + espace patient')
) AS t(tier, tier_name, tier_type, count_entities, examples, eigen_briques, contract, legal_force, eigen_revenue, detail)
WHERE c.name = 'Sanofi';

-- Siemens supply chain
INSERT INTO acq_supply_chain (parent_company_id, tier, tier_name, tier_type, count_entities, examples, eigen_briques, contract, legal_force, eigen_revenue, detail)
SELECT c.id, t.tier, t.tier_name, t.tier_type, t.count_entities, t.examples, t.eigen_briques, t.contract, t.legal_force, t.eigen_revenue, t.detail
FROM acq_companies c,
(VALUES
  (0, 'Siemens', 'Donneur d''ordre', '1', 'Siemens AG — 320K employes', 'NABYR', '€150K/an', 'LkSG (deja en vigueur Allemagne)', '€1.8M/an', 'LkSG impose due diligence sur toute la supply chain'),
  (1, '90K fournisseurs Siemens', 'Tier 1 — Fournisseurs directs', '90000', 'Composantiers, sous-traitants industriels EU+Asie', 'BA', NULL, 'LkSG + CS3D', '€2.16M/an', 'Double obligation LkSG (DE) + CS3D (EU)'),
  (2, 'Fournisseurs Tier 2', 'Tier 2 — PME industrielles', '500000', 'PME industrielles sous-traitantes', 'B', NULL, 'Cascade LkSG', '€1.2M/an', 'Obligation cascadee via LkSG'),
  (3, 'Clients industriels', 'Tier 3 — Acheteurs', '200000', 'Usines, centrales, hopitaux utilisant equipement Siemens', 'ABR', NULL, 'NIS2 (infra critique)', '€2.4M/an', 'NIS2 impose cybersecurite sur infrastructures critiques'),
  (4, 'Utilisateurs finaux', 'Tier 4 — Utilisateurs', '100M+', 'Utilisateurs finaux des systemes Siemens', 'A', NULL, 'RGPD', '€600K/an', 'Consentement donnees utilisateurs')
) AS t(tier, tier_name, tier_type, count_entities, examples, eigen_briques, contract, legal_force, eigen_revenue, detail)
WHERE c.name = 'Siemens';

-- AXA supply chain
INSERT INTO acq_supply_chain (parent_company_id, tier, tier_name, tier_type, count_entities, examples, eigen_briques, contract, legal_force, eigen_revenue, detail)
SELECT c.id, t.tier, t.tier_name, t.tier_type, t.count_entities, t.examples, t.eigen_briques, t.contract, t.legal_force, t.eigen_revenue, t.detail
FROM acq_companies c,
(VALUES
  (0, 'AXA', 'Donneur d''ordre', '1', 'AXA SA — 145K employes', 'NAMZBR', '€120K/an', 'DDA + CSRD + EHDS', '€1.8M/an', 'Contrat enterprise assurance couvrant toutes les briques'),
  (1, '30K courtiers et agents', 'Tier 1 — Reseau distribution', '30000', 'Reseau distribution assurance AXA', 'ABN', NULL, 'DDA consentement obligatoire', '€720K/an', 'EFFET PRESCRIPTEUR : courtiers = agents doubles, propagent AELYA a Generali, Allianz, Zurich'),
  (2, 'Experts et reparateurs', 'Tier 2 — Prestataires', '50000', 'Experts auto, experts batiment, centres soins, garages agrees', 'BA', NULL, 'Reglementation expertise IRSA', '€600K/an', 'Obligation de conformite expertise et reparation'),
  (3, 'Entreprises clientes sante', 'Tier 3 — Mutuelle collective', '200000', '200K entreprises avec mutuelle AXA + RC pro', 'NAM', NULL, 'Art. L.4121-1 RPS + CSRD', '€5M/an', 'NOOS RPS integre au contrat — obligation employeur'),
  (4, 'Assures particuliers', 'Tier 4 — Utilisateurs', '50M+', '50M assures AXA Europe', 'NAM', NULL, 'RGPD + EHDS + DDA', '€5.5M/an', 'NOOS check-up mental annuel — consentement sante')
) AS t(tier, tier_name, tier_type, count_entities, examples, eigen_briques, contract, legal_force, eigen_revenue, detail)
WHERE c.name = 'AXA';
