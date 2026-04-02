-- TRACK A ADD-ON: RAQIB CRITICAL MINERALS
-- Exécuter ce script dans Supabase SQL Editor

-- Sites minéraux géolocalisés (pour la carte MapLibre)
CREATE TABLE IF NOT EXISTS corridor_mineral_sites (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  lat NUMERIC NOT NULL,
  lng NUMERIC NOT NULL,
  category TEXT CHECK (category IN ('mine','refinery','magnet','deposit','export','hub')),
  country TEXT,
  region TEXT,
  owner TEXT,
  status TEXT,
  production TEXT,
  ree_type TEXT,
  minerals TEXT,
  reserves TEXT,
  capacity TEXT,
  notes TEXT,
  geopolitics TEXT,
  source TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Industries EU consommatrices
CREATE TABLE IF NOT EXISTS corridor_eu_industries (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  minerals TEXT[],
  demand_2030 TEXT,
  eu_companies TEXT[],
  growth TEXT,
  crma_impact TEXT,
  supply_risk INTEGER,
  corridor_suppliers TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Supply chain stages
CREATE TABLE IF NOT EXISTS corridor_supply_chain (
  stage_number INTEGER PRIMARY KEY,
  stage_name TEXT NOT NULL,
  description TEXT,
  actors TEXT,
  eigen_role TEXT,
  bottleneck TEXT,
  value_capture TEXT,
  value_range TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_mineral_sites_category ON corridor_mineral_sites(category);
CREATE INDEX IF NOT EXISTS idx_mineral_sites_country ON corridor_mineral_sites(country);

ALTER TABLE corridor_mineral_sites ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public read on corridor_mineral_sites" ON corridor_mineral_sites;
CREATE POLICY "Public read on corridor_mineral_sites" ON corridor_mineral_sites FOR SELECT USING (true);

ALTER TABLE corridor_eu_industries ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public read on corridor_eu_industries" ON corridor_eu_industries;
CREATE POLICY "Public read on corridor_eu_industries" ON corridor_eu_industries FOR SELECT USING (true);

ALTER TABLE corridor_supply_chain ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public read on corridor_supply_chain" ON corridor_supply_chain;
CREATE POLICY "Public read on corridor_supply_chain" ON corridor_supply_chain FOR SELECT USING (true);
