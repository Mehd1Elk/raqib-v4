-- Table des patients (données agrégées, JAMAIS identifiantes)
CREATE TABLE IF NOT EXISTS obs_patients_aggregate (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  country TEXT NOT NULL,
  pathology TEXT NOT NULL CHECK (pathology IN ('bipolar','schizophrenia','depression','adhd','ptsd')),
  molecule TEXT NOT NULL,
  patient_count INTEGER,
  mean_adherence_score NUMERIC,
  hmm_state_distribution JSONB,
  mean_mhfs NUMERIC,
  alerts_24h INTEGER,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Table matrice molécule × signal
CREATE TABLE IF NOT EXISTS obs_molecule_signal_matrix (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  molecule TEXT NOT NULL,
  molecule_class TEXT NOT NULL,
  signal_type TEXT NOT NULL CHECK (signal_type IN ('ema','refill','circadian','entropy','linguistic_proof','environmental')),
  applicable TEXT CHECK (applicable IN ('yes','partial','no')),
  discriminant_strength TEXT CHECK (discriminant_strength IN ('high','medium','low')),
  sensitivity NUMERIC,
  specificity NUMERIC,
  detection_latency TEXT,
  pathognomonic_effects TEXT,
  reference TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Table correction environnementale
CREATE TABLE IF NOT EXISTS obs_environmental_corrections (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  molecule TEXT NOT NULL,
  factor_type TEXT NOT NULL CHECK (factor_type IN ('temperature','humidity','photoperiod','ramadan','altitude','pollution','epidemic')),
  country TEXT,
  threshold_adjustment NUMERIC,
  risk_multiplier NUMERIC,
  evidence TEXT,
  season TEXT,
  source TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Table sciences comportementales
CREATE TABLE IF NOT EXISTS obs_habit_levers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  lever_name TEXT NOT NULL,
  lever_id TEXT NOT NULL CHECK (lever_id IN ('implementation_intention','habit_stacking','variable_reward','identity_narrative','social_pressure')),
  meta_analysis_reference TEXT,
  effect_size TEXT,
  sample_size INTEGER,
  duration TEXT,
  application_noos TEXT,
  profile_anxious TEXT,
  profile_negligent TEXT,
  profile_contestataire TEXT,
  profile_anosognosic TEXT,
  profile_contextual TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Table concurrents observance
CREATE TABLE IF NOT EXISTS obs_competitors (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  country TEXT,
  founded INTEGER,
  funding TEXT,
  pathology_target TEXT,
  technology TEXT,
  model TEXT,
  clinical_evidence TEXT,
  africa_corridor TEXT,
  data_monetization TEXT,
  fiduciary_agent TEXT,
  revenue_model TEXT,
  status TEXT CHECK (status IN ('active','dead','acquired','pivoted')),
  failure_reason TEXT,
  noos_advantage TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Table données RWE & pharmacovigilance
CREATE TABLE IF NOT EXISTS obs_rwe_pricing (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  data_category TEXT NOT NULL,
  producer TEXT,
  buyer TEXT,
  buyer_persona TEXT,
  price_per_profile_month NUMERIC,
  price_premium_enriched NUMERIC,
  volume_corridor_3y INTEGER,
  regulation TEXT,
  t_level_minimum TEXT,
  myne_revenue_estimate NUMERIC,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Table réglementations
CREATE TABLE IF NOT EXISTS obs_regulations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  jurisdiction TEXT,
  effective_date TEXT,
  impact_noos TEXT,
  impact_burhan TEXT,
  impact_myne TEXT,
  key_articles TEXT,
  max_penalty TEXT,
  eigen_opportunity TEXT,
  status TEXT,
  noos_readiness_score INTEGER CHECK (noos_readiness_score BETWEEN 1 AND 10),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Table indices & benchmarks observance
CREATE TABLE IF NOT EXISTS obs_adherence_indices (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  index_name TEXT NOT NULL,
  organization TEXT,
  frequency TEXT,
  methodology TEXT,
  psychiatry_specific BOOLEAN DEFAULT false,
  noos_automates BOOLEAN DEFAULT false,
  strengths TEXT,
  limitations TEXT,
  noos_complement TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Table MHFS scoring
CREATE TABLE IF NOT EXISTS obs_mhfs_scoring (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  component TEXT NOT NULL CHECK (component IN ('financial_flux','adherence_pattern','hmm_stability','ema_quality','outcome_correlation','caregiver_state')),
  weight NUMERIC NOT NULL,
  description TEXT,
  data_source TEXT,
  calculation_method TEXT,
  min_data_months INTEGER,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Table simulation incentive MYNε
CREATE TABLE IF NOT EXISTS obs_myne_incentive_sim (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  scenario_name TEXT NOT NULL,
  molecule TEXT,
  patient_count INTEGER,
  signals_shared INTEGER,
  price_per_profile_month NUMERIC,
  patient_share_pct NUMERIC DEFAULT 53,
  patient_revenue_month NUMERIC,
  buyer_types JSONB,
  corridor_total_annual NUMERIC,
  system_savings_annual NUMERIC,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS and create policies
DO $$
DECLARE
    ttext TEXT;
BEGIN
    FOR ttext IN 
        SELECT table_name FROM information_schema.tables WHERE table_name LIKE 'obs_%' AND table_schema = 'public'
    LOOP
        EXECUTE format('ALTER TABLE %I ENABLE ROW LEVEL SECURITY;', ttext);
        
        -- Drop policies if they exist to allow re-running
        EXECUTE format('DROP POLICY IF EXISTS "Allow anon read %s" ON %I;', ttext, ttext);
        EXECUTE format('DROP POLICY IF EXISTS "Allow auth insert %s" ON %I;', ttext, ttext);
        EXECUTE format('DROP POLICY IF EXISTS "Allow auth update %s" ON %I;', ttext, ttext);
        EXECUTE format('DROP POLICY IF EXISTS "Allow auth delete %s" ON %I;', ttext, ttext);

        -- Anon read
        EXECUTE format('CREATE POLICY "Allow anon read %s" ON %I FOR SELECT USING (true);', ttext, ttext);
        -- Auth write
        EXECUTE format('CREATE POLICY "Allow auth insert %s" ON %I FOR INSERT TO authenticated WITH CHECK (true);', ttext, ttext);
        EXECUTE format('CREATE POLICY "Allow auth update %s" ON %I FOR UPDATE TO authenticated USING (true);', ttext, ttext);
        EXECUTE format('CREATE POLICY "Allow auth delete %s" ON %I FOR DELETE TO authenticated USING (true);', ttext, ttext);
    END LOOP;
END
$$;

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_obs_patients_country ON obs_patients_aggregate(country);
CREATE INDEX IF NOT EXISTS idx_obs_patients_pathology ON obs_patients_aggregate(pathology);
CREATE INDEX IF NOT EXISTS idx_obs_patients_molecule ON obs_patients_aggregate(molecule);

CREATE INDEX IF NOT EXISTS idx_obs_matrix_molecule ON obs_molecule_signal_matrix(molecule);

CREATE INDEX IF NOT EXISTS idx_obs_env_country ON obs_environmental_corrections(country);
CREATE INDEX IF NOT EXISTS idx_obs_env_molecule ON obs_environmental_corrections(molecule);

CREATE INDEX IF NOT EXISTS idx_obs_habits_lever_id ON obs_habit_levers(lever_id);

CREATE INDEX IF NOT EXISTS idx_obs_comp_name ON obs_competitors(name);
CREATE INDEX IF NOT EXISTS idx_obs_comp_country ON obs_competitors(country);

CREATE INDEX IF NOT EXISTS idx_obs_reg_name ON obs_regulations(name);
