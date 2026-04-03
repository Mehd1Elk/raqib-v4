-- ═══════════════════════════════════════════════════════════════════
-- Intelligence Confiance — 10 tables
-- ═══════════════════════════════════════════════════════════════════

-- 1. Déficit de confiance par pays
CREATE TABLE IF NOT EXISTS conf_trust_deficit (
  id               UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  code             TEXT NOT NULL UNIQUE,
  country          TEXT NOT NULL,
  detected_fraud_eur          NUMERIC,
  detection_rate              TEXT,
  estimated_total_fraud_eur   NUMERIC,
  annual_audit_spend_eur      NUMERIC,
  certifiable_entities        TEXT,
  trust_score_composite       TEXT,
  trust_arbitrage_gap         TEXT,
  burhan_tam_eur              NUMERIC,
  fraud_breakdown             JSONB,
  sources                     TEXT,
  notes                       TEXT,
  created_at       TIMESTAMPTZ DEFAULT now()
);

-- 2. Confiance sectorielle
CREATE TABLE IF NOT EXISTS conf_sector_trust (
  id                        UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  sector                    TEXT NOT NULL UNIQUE,
  vertical                  TEXT,
  current_mechanism         TEXT,
  certifier                 TEXT,
  frequency                 TEXT,
  cost_per_entity_year      NUMERIC,
  fraud_rate_despite_cert   TEXT,
  detection_lag_months      NUMERIC,
  trust_halflife_months     NUMERIC,
  coverage_rate             TEXT,
  total_non_trust_cost_eur  NUMERIC,
  burhan_mechanism          TEXT,
  burhan_advantage          TEXT,
  trust_decay_lambda        NUMERIC,
  source                    TEXT,
  created_at                TIMESTAMPTZ DEFAULT now()
);

-- 3. Concurrents Intelligence Confiance
CREATE TABLE IF NOT EXISTS conf_competitors (
  id               UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name             TEXT NOT NULL UNIQUE,
  country          TEXT,
  founded          INTEGER,
  funding          TEXT,
  valuation        TEXT,
  status           TEXT,
  acquirer         TEXT,
  target_pathology TEXT,
  technology       TEXT,
  business_model   TEXT,
  clinical_evidence TEXT,
  africa_corridor  TEXT,
  data_monetization TEXT,
  fiduciary_agent  TEXT,
  revenue_model    TEXT,
  strengths        TEXT,
  weaknesses       TEXT,
  failure_factor   TEXT,
  segment          TEXT,
  noos_advantage   TEXT,
  sources          TEXT,
  created_at       TIMESTAMPTZ DEFAULT now()
);

-- 4. Réglementations Intelligence Confiance
CREATE TABLE IF NOT EXISTS conf_regulations (
  id                    UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name                  TEXT NOT NULL UNIQUE,
  full_name             TEXT,
  category              TEXT,
  jurisdiction          TEXT,
  effective_date        TEXT,
  implementation_status TEXT,
  impact_noos           TEXT,
  impact_burhan         TEXT,
  impact_myne           TEXT,
  key_articles          JSONB,
  max_penalty           JSONB,
  eigen_opportunity     TEXT,
  readiness_score       NUMERIC,
  readiness_justification TEXT,
  sources               TEXT,
  created_at            TIMESTAMPTZ DEFAULT now()
);

-- 5. Constantes de déclin de confiance (trust decay)
CREATE TABLE IF NOT EXISTS conf_trust_decay (
  id                        UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  certification             TEXT NOT NULL UNIQUE,
  certifier                 TEXT,
  sector                    TEXT,
  renewal_frequency         TEXT,
  renewal_cost_eur          TEXT,
  post_cert_fraud_cases     JSONB,
  avg_detection_lag_months  NUMERIC,
  lambda                    NUMERIC,
  halflife_months           NUMERIC,
  continuous_argument       TEXT,
  sources                   TEXT,
  created_at                TIMESTAMPTZ DEFAULT now()
);

-- 6. Modèles IA (marché authentification)
CREATE TABLE IF NOT EXISTS conf_ai_models (
  id             UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  model_name     TEXT NOT NULL UNIQUE,
  sector         TEXT,
  estimated_count INTEGER,
  note           TEXT,
  source         TEXT,
  created_at     TIMESTAMPTZ DEFAULT now()
);

-- 7. Incidents IA documentés
CREATE TABLE IF NOT EXISTS conf_ai_incidents (
  id                UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  incident          TEXT NOT NULL UNIQUE,
  model             TEXT,
  sector            TEXT,
  year              INTEGER,
  impact            TEXT,
  cost_eur          TEXT,
  root_cause        TEXT,
  burhan_prevention TEXT,
  source            TEXT,
  created_at        TIMESTAMPTZ DEFAULT now()
);

-- 8. Signaux d'entropie (par secteur + signal)
CREATE TABLE IF NOT EXISTS conf_entropy_signals (
  id                   UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  sector               TEXT NOT NULL,
  signal_name          TEXT NOT NULL,
  natural_entropy      TEXT,
  fraud_entropy        TEXT,
  detection_method     TEXT,
  detection_rate       TEXT,
  gaming_cost_eur      TEXT,
  documented_case      TEXT,
  pathognomonic_signal TEXT,
  sources              TEXT,
  created_at           TIMESTAMPTZ DEFAULT now(),
  UNIQUE (sector, signal_name)
);

-- 9. Proof of Being (corridor psychiatrique)
CREATE TABLE IF NOT EXISTS conf_proof_of_being (
  id                              UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  entity_name                     TEXT NOT NULL UNIQUE,
  code                            TEXT,
  population                      BIGINT,
  bipolar_patients                INTEGER,
  schizophrenia_patients          INTEGER,
  major_depression_patients       INTEGER,
  adhd_patients                   INTEGER,
  ptsd_patients                   INTEGER,
  total_psychiatric_patients      INTEGER,
  adherence_rate_bipolar          TEXT,
  adherence_rate_schizophrenia    TEXT,
  adherence_rate_depression       TEXT,
  adherence_rate_adhd             TEXT,
  adherence_rate_ptsd             TEXT,
  rehospitalization_cost_eur      BIGINT,
  avoidable_rehospitalizations_year INTEGER,
  total_waste_eur                 BIGINT,
  psychiatrists_per_100k          NUMERIC,
  pharmacies_count                INTEGER,
  insurance_coverage              TEXT,
  smartphone_penetration          TEXT,
  network_3g_plus                 TEXT,
  mental_health_apps_existing     TEXT,
  tam_observance_eur              BIGINT,
  tam_calculation                 TEXT,
  sources                         TEXT,
  created_at                      TIMESTAMPTZ DEFAULT now()
);

-- 10. Supply chain (ancre + tier + noeud)
CREATE TABLE IF NOT EXISTS conf_supply_chain (
  id                   UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  anchor_name          TEXT NOT NULL,
  anchor_sector        TEXT,
  total_nodes          TEXT,
  total_eigen_revenue  TEXT,
  prescriptor_effect   TEXT,
  killer_insight       TEXT,
  tier                 INTEGER,
  node_name            TEXT NOT NULL,
  tier_type            TEXT,
  count                TEXT,
  examples             TEXT,
  legal_force          TEXT,
  detail               TEXT,
  created_at           TIMESTAMPTZ DEFAULT now(),
  UNIQUE (anchor_name, tier, node_name)
);

-- Indexes utiles
CREATE INDEX IF NOT EXISTS idx_conf_trust_deficit_code   ON conf_trust_deficit (code);
CREATE INDEX IF NOT EXISTS idx_conf_sector_trust_sector  ON conf_sector_trust (sector);
CREATE INDEX IF NOT EXISTS idx_conf_competitors_name     ON conf_competitors (name);
CREATE INDEX IF NOT EXISTS idx_conf_regulations_name     ON conf_regulations (name);
CREATE INDEX IF NOT EXISTS idx_conf_trust_decay_cert     ON conf_trust_decay (certification);
CREATE INDEX IF NOT EXISTS idx_conf_ai_models_name       ON conf_ai_models (model_name);
CREATE INDEX IF NOT EXISTS idx_conf_ai_incidents_name    ON conf_ai_incidents (incident);
CREATE INDEX IF NOT EXISTS idx_conf_entropy_sector       ON conf_entropy_signals (sector);
CREATE INDEX IF NOT EXISTS idx_conf_pob_entity           ON conf_proof_of_being (entity_name);
CREATE INDEX IF NOT EXISTS idx_conf_sc_anchor            ON conf_supply_chain (anchor_name);
