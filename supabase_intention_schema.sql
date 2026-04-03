-- Create Tables
CREATE TABLE IF NOT EXISTS int_attention_observatory (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  country TEXT NOT NULL,
  code TEXT NOT NULL,
  connected_population INTEGER,
  smartphone_penetration TEXT,
  arpu_google NUMERIC,
  arpu_meta NUMERIC,
  arpu_tiktok NUMERIC,
  arpu_telecom NUMERIC,
  arpu_banking NUMERIC,
  arpu_total NUMERIC,
  total_value_captured NUMERIC,
  intention_gap NUMERIC,
  top_captors JSONB,
  source TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS int_intention_prices (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  category TEXT NOT NULL,
  vertical TEXT NOT NULL,
  current_cac_attention NUMERIC,
  qualified_lead_value NUMERIC,
  intention_price NUMERIC,
  frequency_per_year NUMERIC,
  corridor_volume_annual INTEGER,
  total_market_value NUMERIC,
  explanation TEXT,
  source TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS int_competitors (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  country TEXT,
  founded INTEGER,
  funding TEXT,
  model TEXT,
  data_type TEXT,
  privacy_level TEXT,
  blockchain TEXT,
  fiduciary_agent TEXT,
  africa_corridor TEXT,
  revenue_model TEXT,
  pricing TEXT,
  strengths TEXT,
  weaknesses TEXT,
  myne_advantage TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS int_regulations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  jurisdiction TEXT,
  effective_date TEXT,
  impact_myne TEXT,
  key_articles TEXT,
  max_penalty TEXT,
  myne_opportunity TEXT,
  status TEXT,
  alignment_score INTEGER CHECK (alignment_score BETWEEN 1 AND 10),
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS int_health_data_pricing (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  category TEXT NOT NULL,
  producer TEXT,
  buyer TEXT,
  buyer_persona TEXT,
  market_price TEXT,
  volume_corridor TEXT,
  t_level_minimum TEXT,
  regulation TEXT,
  myne_value_estimate TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS int_intention_cases (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  country TEXT,
  year INTEGER,
  founder TEXT,
  concept TEXT,
  status TEXT,
  failure_reason TEXT,
  lesson_myne TEXT,
  funding TEXT,
  traction TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS int_sovereignty_indices (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  index_name TEXT NOT NULL,
  organization TEXT,
  frequency TEXT,
  methodology TEXT,
  scores JSONB,
  strengths TEXT,
  limitations TEXT,
  myne_complement TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE int_attention_observatory ENABLE ROW LEVEL SECURITY;
ALTER TABLE int_intention_prices ENABLE ROW LEVEL SECURITY;
ALTER TABLE int_competitors ENABLE ROW LEVEL SECURITY;
ALTER TABLE int_regulations ENABLE ROW LEVEL SECURITY;
ALTER TABLE int_health_data_pricing ENABLE ROW LEVEL SECURITY;
ALTER TABLE int_intention_cases ENABLE ROW LEVEL SECURITY;
ALTER TABLE int_sovereignty_indices ENABLE ROW LEVEL SECURITY;

-- Create Policies (anon read + auth write)
DROP POLICY IF EXISTS "Public Read int_attention_observatory" ON int_attention_observatory;
DROP POLICY IF EXISTS "Auth Write int_attention_observatory" ON int_attention_observatory;
CREATE POLICY "Public Read int_attention_observatory" ON int_attention_observatory FOR SELECT USING (true);
CREATE POLICY "Auth Write int_attention_observatory" ON int_attention_observatory FOR ALL USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Public Read int_intention_prices" ON int_intention_prices;
DROP POLICY IF EXISTS "Auth Write int_intention_prices" ON int_intention_prices;
CREATE POLICY "Public Read int_intention_prices" ON int_intention_prices FOR SELECT USING (true);
CREATE POLICY "Auth Write int_intention_prices" ON int_intention_prices FOR ALL USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Public Read int_competitors" ON int_competitors;
DROP POLICY IF EXISTS "Auth Write int_competitors" ON int_competitors;
CREATE POLICY "Public Read int_competitors" ON int_competitors FOR SELECT USING (true);
CREATE POLICY "Auth Write int_competitors" ON int_competitors FOR ALL USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Public Read int_regulations" ON int_regulations;
DROP POLICY IF EXISTS "Auth Write int_regulations" ON int_regulations;
CREATE POLICY "Public Read int_regulations" ON int_regulations FOR SELECT USING (true);
CREATE POLICY "Auth Write int_regulations" ON int_regulations FOR ALL USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Public Read int_health_data_pricing" ON int_health_data_pricing;
DROP POLICY IF EXISTS "Auth Write int_health_data_pricing" ON int_health_data_pricing;
CREATE POLICY "Public Read int_health_data_pricing" ON int_health_data_pricing FOR SELECT USING (true);
CREATE POLICY "Auth Write int_health_data_pricing" ON int_health_data_pricing FOR ALL USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Public Read int_intention_cases" ON int_intention_cases;
DROP POLICY IF EXISTS "Auth Write int_intention_cases" ON int_intention_cases;
CREATE POLICY "Public Read int_intention_cases" ON int_intention_cases FOR SELECT USING (true);
CREATE POLICY "Auth Write int_intention_cases" ON int_intention_cases FOR ALL USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Public Read int_sovereignty_indices" ON int_sovereignty_indices;
DROP POLICY IF EXISTS "Auth Write int_sovereignty_indices" ON int_sovereignty_indices;
CREATE POLICY "Public Read int_sovereignty_indices" ON int_sovereignty_indices FOR SELECT USING (true);
CREATE POLICY "Auth Write int_sovereignty_indices" ON int_sovereignty_indices FOR ALL USING (auth.role() = 'authenticated');

-- Create Indexes
CREATE INDEX IF NOT EXISTS idx_int_attention_observatory_country ON int_attention_observatory(country);

CREATE INDEX IF NOT EXISTS idx_int_intention_prices_category ON int_intention_prices(category);

CREATE INDEX IF NOT EXISTS idx_int_competitors_country ON int_competitors(country);
CREATE INDEX IF NOT EXISTS idx_int_competitors_name ON int_competitors(name);

CREATE INDEX IF NOT EXISTS idx_int_regulations_name ON int_regulations(name);

CREATE INDEX IF NOT EXISTS idx_int_health_data_pricing_category ON int_health_data_pricing(category);

CREATE INDEX IF NOT EXISTS idx_int_intention_cases_country ON int_intention_cases(country);
CREATE INDEX IF NOT EXISTS idx_int_intention_cases_name ON int_intention_cases(name);

CREATE INDEX IF NOT EXISTS idx_int_sovereignty_indices_name ON int_sovereignty_indices(index_name);
