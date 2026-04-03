CREATE TABLE IF NOT EXISTS conf_trust_deficit (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  country TEXT NOT NULL,
  code TEXT NOT NULL,
  detected_fraud NUMERIC,
  detection_rate TEXT,
  estimated_total_fraud NUMERIC,
  annual_audit_spend NUMERIC,
  certifiable_entities JSONB,
  trust_score_composite INTEGER,
  trust_arbitrage_gap INTEGER,
  burhan_tam NUMERIC,
  fraud_breakdown JSONB,
  source TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS conf_sector_trust (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  sector TEXT NOT NULL,
  vertical TEXT NOT NULL,
  current_mechanism TEXT,
  certifier TEXT,
  frequency TEXT,
  cost_per_entity NUMERIC,
  fraud_rate TEXT,
  detection_lag_months NUMERIC,
  trust_halflife_months NUMERIC,
  coverage_rate TEXT,
  total_non_trust_cost NUMERIC,
  burhan_mechanism TEXT,
  burhan_advantage TEXT,
  trust_decay_lambda NUMERIC,
  source TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS conf_competitors (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  country TEXT,
  founded INTEGER,
  funding TEXT,
  model TEXT,
  proof_type TEXT,
  continuous_cert TEXT,
  blockchain TEXT,
  ai_certification TEXT,
  supply_chain_tiers TEXT,
  africa_corridor TEXT,
  revenue_model TEXT,
  pricing TEXT,
  strengths TEXT,
  weaknesses TEXT,
  burhan_advantage TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS conf_regulations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  jurisdiction TEXT,
  effective_dates JSONB,
  requirement TEXT,
  max_penalty TEXT,
  direct_entities INTEGER,
  indirect_entities INTEGER,
  burhan_role TEXT,
  aelya_role TEXT,
  noos_role TEXT,
  forcing_score INTEGER CHECK (forcing_score BETWEEN 1 AND 10),
  revenue_trigger_date TEXT,
  source TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS conf_trust_decay (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  certification TEXT NOT NULL,
  certifier TEXT,
  sector TEXT,
  renewal_frequency TEXT,
  renewal_cost TEXT,
  post_cert_fraud_cases JSONB,
  avg_detection_lag_months NUMERIC,
  lambda NUMERIC,
  halflife_months NUMERIC,
  continuous_argument TEXT,
  source TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS conf_ai_models (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  model_name TEXT NOT NULL,
  organization TEXT,
  model_type TEXT,
  hash_sha256 TEXT,
  layers INTEGER,
  parameters TEXT,
  certified_date TEXT,
  last_check TEXT,
  drift_score NUMERIC,
  drift_status TEXT,
  decision_receipts INTEGER,
  explainability_score NUMERIC,
  risk_class TEXT,
  alerts JSONB,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS conf_ai_incidents (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  incident TEXT NOT NULL,
  model TEXT,
  sector TEXT,
  year INTEGER,
  impact TEXT,
  cost_eur NUMERIC,
  root_cause TEXT,
  burhan_prevention TEXT,
  source TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS conf_entropy_signals (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  sector TEXT NOT NULL,
  signal_name TEXT NOT NULL,
  natural_entropy TEXT,
  fraud_entropy TEXT,
  detection_method TEXT,
  detection_rate TEXT,
  gaming_cost TEXT,
  documented_case TEXT,
  pathognomonic_signal TEXT,
  source TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS conf_proof_of_being (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  entity_name TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  scores JSONB NOT NULL,
  global_score INTEGER,
  trend TEXT,
  alerts INTEGER DEFAULT 0,
  detail TEXT,
  last_updated TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS conf_supply_chain (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  anchor_name TEXT NOT NULL,
  anchor_score INTEGER,
  tier INTEGER NOT NULL,
  node_name TEXT NOT NULL,
  node_score INTEGER,
  certified BOOLEAN DEFAULT false,
  node_count_extrapolated INTEGER,
  trust_floor_derived NUMERIC,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Active RLS + anon read + auth write sur les 10 tables.
ALTER TABLE conf_trust_deficit ENABLE ROW LEVEL SECURITY;
ALTER TABLE conf_sector_trust ENABLE ROW LEVEL SECURITY;
ALTER TABLE conf_competitors ENABLE ROW LEVEL SECURITY;
ALTER TABLE conf_regulations ENABLE ROW LEVEL SECURITY;
ALTER TABLE conf_trust_decay ENABLE ROW LEVEL SECURITY;
ALTER TABLE conf_ai_models ENABLE ROW LEVEL SECURITY;
ALTER TABLE conf_ai_incidents ENABLE ROW LEVEL SECURITY;
ALTER TABLE conf_entropy_signals ENABLE ROW LEVEL SECURITY;
ALTER TABLE conf_proof_of_being ENABLE ROW LEVEL SECURITY;
ALTER TABLE conf_supply_chain ENABLE ROW LEVEL SECURITY;

CREATE POLICY conf_trust_deficit_anon_read ON conf_trust_deficit FOR SELECT USING (true);
CREATE POLICY conf_trust_deficit_auth_write ON conf_trust_deficit FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY conf_sector_trust_anon_read ON conf_sector_trust FOR SELECT USING (true);
CREATE POLICY conf_sector_trust_auth_write ON conf_sector_trust FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY conf_competitors_anon_read ON conf_competitors FOR SELECT USING (true);
CREATE POLICY conf_competitors_auth_write ON conf_competitors FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY conf_regulations_anon_read ON conf_regulations FOR SELECT USING (true);
CREATE POLICY conf_regulations_auth_write ON conf_regulations FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY conf_trust_decay_anon_read ON conf_trust_decay FOR SELECT USING (true);
CREATE POLICY conf_trust_decay_auth_write ON conf_trust_decay FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY conf_ai_models_anon_read ON conf_ai_models FOR SELECT USING (true);
CREATE POLICY conf_ai_models_auth_write ON conf_ai_models FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY conf_ai_incidents_anon_read ON conf_ai_incidents FOR SELECT USING (true);
CREATE POLICY conf_ai_incidents_auth_write ON conf_ai_incidents FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY conf_entropy_signals_anon_read ON conf_entropy_signals FOR SELECT USING (true);
CREATE POLICY conf_entropy_signals_auth_write ON conf_entropy_signals FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY conf_proof_of_being_anon_read ON conf_proof_of_being FOR SELECT USING (true);
CREATE POLICY conf_proof_of_being_auth_write ON conf_proof_of_being FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY conf_supply_chain_anon_read ON conf_supply_chain FOR SELECT USING (true);
CREATE POLICY conf_supply_chain_auth_write ON conf_supply_chain FOR ALL USING (auth.role() = 'authenticated');

-- Indexes
CREATE INDEX IF NOT EXISTS conf_trust_deficit_country_idx ON conf_trust_deficit (country);
CREATE INDEX IF NOT EXISTS conf_sector_trust_sector_idx ON conf_sector_trust (sector);
CREATE INDEX IF NOT EXISTS conf_competitors_name_idx ON conf_competitors (name);
CREATE INDEX IF NOT EXISTS conf_competitors_country_idx ON conf_competitors (country);
CREATE INDEX IF NOT EXISTS conf_regulations_name_idx ON conf_regulations (name);
CREATE INDEX IF NOT EXISTS conf_trust_decay_sector_idx ON conf_trust_decay (sector);
CREATE INDEX IF NOT EXISTS conf_ai_models_model_name_idx ON conf_ai_models (model_name);
CREATE INDEX IF NOT EXISTS conf_ai_incidents_sector_idx ON conf_ai_incidents (sector);
CREATE INDEX IF NOT EXISTS conf_entropy_signals_sector_idx ON conf_entropy_signals (sector);
CREATE INDEX IF NOT EXISTS conf_proof_of_being_entity_name_idx ON conf_proof_of_being (entity_name);
CREATE INDEX IF NOT EXISTS conf_proof_of_being_entity_type_idx ON conf_proof_of_being (entity_type);
CREATE INDEX IF NOT EXISTS conf_supply_chain_anchor_name_idx ON conf_supply_chain (anchor_name);
