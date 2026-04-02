-- TRACK A — RAQIB CORRIDOR INTELLIGENCE SCHÉMA

-- Table pays
CREATE TABLE corridor_countries (
  id TEXT PRIMARY KEY,                    -- Code ISO 2 lettres (MA, NG, SN...)
  name TEXT NOT NULL,
  official_name TEXT,
  flag TEXT,                              -- Emoji drapeau
  region TEXT NOT NULL CHECK (region IN ('africa', 'eu')),
  capital TEXT,
  area TEXT,
  population TEXT,
  density TEXT,
  gdp_nominal TEXT,
  gdp_ppp TEXT,
  gdp_per_capita TEXT,
  gdp_growth JSONB,                       -- [{year, value}, ...]
  inflation TEXT,
  debt_to_gdp TEXT,
  trade_balance TEXT,
  currency TEXT,
  exchange_rate_eur TEXT,
  exchange_rate_usd TEXT,
  corruption_index TEXT,
  ease_business TEXT,
  political_stability TEXT,
  risk_score INTEGER CHECK (risk_score BETWEEN 1 AND 10),
  risk_label TEXT,
  recommendation TEXT,
  timezone TEXT,
  languages TEXT,
  religions TEXT,
  memberships TEXT[],
  industries JSONB,                        -- Objet complet industries
  contacts JSONB,                          -- Objet complet contacts
  logistics JSONB,                         -- Objet complet logistics
  trade JSONB,                             -- Objet complet trade
  demographics JSONB,                      -- Objet complet demographics
  risks JSONB,                             -- Objet scoring risques
  updated_at TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Table minéraux par pays
CREATE TABLE corridor_minerals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  country_id TEXT REFERENCES corridor_countries(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  type TEXT,
  annual_production TEXT,
  world_rank TEXT,
  reserves TEXT,
  deposits JSONB,                          -- [{name, location, stage, operator, nationality, ownership}]
  export_revenue TEXT,
  regulation TEXT,
  crma_relevance TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Table entreprises
CREATE TABLE corridor_enterprises (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  country_id TEXT REFERENCES corridor_countries(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  sector TEXT,
  revenue TEXT,
  employees TEXT,
  ceo TEXT,
  shareholding TEXT,
  listed TEXT,
  founded TEXT,
  hq TEXT,
  website TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Table dirigeants
CREATE TABLE corridor_leaders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  country_id TEXT REFERENCES corridor_countries(id) ON DELETE CASCADE,
  role TEXT NOT NULL,                      -- head_of_state, head_of_gov, minister, central_bank, etc.
  portfolio TEXT,                          -- Portefeuille ministériel
  name TEXT NOT NULL,
  institution TEXT,
  since TEXT,
  party TEXT,
  next_election TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Table universités
CREATE TABLE corridor_universities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  country_id TEXT REFERENCES corridor_countries(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  city TEXT,
  students TEXT,
  specialties TEXT,
  ranking TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Table milliardaires/fortunes
CREATE TABLE corridor_billionaires (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  country_id TEXT REFERENCES corridor_countries(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  fortune TEXT,
  source TEXT,
  companies TEXT,
  age TEXT,
  education TEXT,
  bio TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Table cotations minéraux (bourse)
CREATE TABLE corridor_mineral_prices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  mineral TEXT NOT NULL,
  price TEXT,
  change TEXT,
  trend TEXT CHECK (trend IN ('up', 'down', 'stable')),
  supply TEXT,
  corridor_source TEXT,
  category TEXT,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Table alertes géopolitiques
CREATE TABLE corridor_alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  text TEXT NOT NULL,
  level TEXT CHECK (level IN ('red', 'orange', 'green')),
  country_id TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Index pour performance
CREATE INDEX idx_minerals_country ON corridor_minerals(country_id);
CREATE INDEX idx_enterprises_country ON corridor_enterprises(country_id);
CREATE INDEX idx_leaders_country ON corridor_leaders(country_id);
CREATE INDEX idx_universities_country ON corridor_universities(country_id);
CREATE INDEX idx_billionaires_country ON corridor_billionaires(country_id);

-- RLS (Row Level Security) — lecture publique
ALTER TABLE corridor_countries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read on corridor_countries" ON corridor_countries FOR SELECT USING (true);

ALTER TABLE corridor_minerals ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read on corridor_minerals" ON corridor_minerals FOR SELECT USING (true);

ALTER TABLE corridor_enterprises ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read on corridor_enterprises" ON corridor_enterprises FOR SELECT USING (true);

ALTER TABLE corridor_leaders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read on corridor_leaders" ON corridor_leaders FOR SELECT USING (true);

ALTER TABLE corridor_universities ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read on corridor_universities" ON corridor_universities FOR SELECT USING (true);

ALTER TABLE corridor_billionaires ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read on corridor_billionaires" ON corridor_billionaires FOR SELECT USING (true);

ALTER TABLE corridor_mineral_prices ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read on corridor_mineral_prices" ON corridor_mineral_prices FOR SELECT USING (true);

ALTER TABLE corridor_alerts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read on corridor_alerts" ON corridor_alerts FOR SELECT USING (true);
