ALTER TABLE obs_patients_aggregate ADD COLUMN IF NOT EXISTS adherence_rate TEXT;
ALTER TABLE obs_patients_aggregate ADD COLUMN IF NOT EXISTS psychiatrists_per_100k NUMERIC;
ALTER TABLE obs_patients_aggregate ADD COLUMN IF NOT EXISTS smartphone_penetration TEXT;
ALTER TABLE obs_patients_aggregate ADD COLUMN IF NOT EXISTS tam_observance_eur TEXT;
ALTER TABLE obs_patients_aggregate ADD COLUMN IF NOT EXISTS sources TEXT;
ALTER TABLE obs_molecule_signal_matrix ADD COLUMN IF NOT EXISTS details JSONB;
ALTER TABLE obs_competitors ADD COLUMN IF NOT EXISTS segment TEXT;
ALTER TABLE obs_rwe_pricing ADD COLUMN IF NOT EXISTS description TEXT;
ALTER TABLE obs_rwe_pricing ADD COLUMN IF NOT EXISTS myne_revenue_3y NUMERIC;
ALTER TABLE obs_regulations ADD COLUMN IF NOT EXISTS forcing_function_score NUMERIC;
ALTER TABLE obs_adherence_indices ADD COLUMN IF NOT EXISTS application_psychiatry JSONB;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'uq_obs_patients_country_pathology') THEN
    ALTER TABLE obs_patients_aggregate ADD CONSTRAINT uq_obs_patients_country_pathology UNIQUE (country, pathology);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'uq_obs_matrix_molecule_signal') THEN
    ALTER TABLE obs_molecule_signal_matrix ADD CONSTRAINT uq_obs_matrix_molecule_signal UNIQUE (molecule, signal_type);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'uq_obs_env_molecule_factor_country') THEN
    ALTER TABLE obs_environmental_corrections ADD CONSTRAINT uq_obs_env_molecule_factor_country UNIQUE (molecule, factor_type, country);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'uq_obs_habits_lever_id') THEN
    ALTER TABLE obs_habit_levers ADD CONSTRAINT uq_obs_habits_lever_id UNIQUE (lever_id);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'uq_obs_competitors_name') THEN
    ALTER TABLE obs_competitors ADD CONSTRAINT uq_obs_competitors_name UNIQUE (name);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'uq_obs_rwe_data_category') THEN
    ALTER TABLE obs_rwe_pricing ADD CONSTRAINT uq_obs_rwe_data_category UNIQUE (data_category);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'uq_obs_regulations_name') THEN
    ALTER TABLE obs_regulations ADD CONSTRAINT uq_obs_regulations_name UNIQUE (name);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'uq_obs_indices_index_name') THEN
    ALTER TABLE obs_adherence_indices ADD CONSTRAINT uq_obs_indices_index_name UNIQUE (index_name);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'uq_obs_mhfs_component') THEN
    ALTER TABLE obs_mhfs_scoring ADD CONSTRAINT uq_obs_mhfs_component UNIQUE (component);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'uq_obs_incentive_scenario') THEN
    ALTER TABLE obs_myne_incentive_sim ADD CONSTRAINT uq_obs_incentive_scenario UNIQUE (scenario_name);
  END IF;
END $$;

NOTIFY pgrst, 'reload schema';
