CREATE TABLE IF NOT EXISTS diwane_countries (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  region TEXT CHECK (region IN ('africa','eu')),
  art_market_size TEXT,
  art_market_growth TEXT,
  world_ranking TEXT,
  key_movements TEXT[],
  major_events TEXT[],
  auctions JSONB,
  art_finance JSONB,
  regulation JSONB,
  authentication JSONB,
  eigen_integration JSONB,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS diwane_artists (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  country_id TEXT REFERENCES diwane_countries(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  born TEXT,
  medium TEXT,
  movement TEXT,
  auction_record TEXT,
  galleries TEXT[],
  collections TEXT[],
  significance TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS diwane_galleries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  country_id TEXT REFERENCES diwane_countries(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  city TEXT,
  founded TEXT,
  director TEXT,
  specialty TEXT,
  represented_artists TEXT[],
  website TEXT,
  fairs TEXT[],
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS diwane_museums (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  country_id TEXT REFERENCES diwane_countries(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  city TEXT,
  type TEXT,
  collection_desc TEXT,
  director TEXT,
  visitors TEXT,
  website TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS diwane_collectors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  country_id TEXT REFERENCES diwane_countries(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  type TEXT,
  focus TEXT,
  collection_size TEXT,
  public_access BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS diwane_auction_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  artist_name TEXT NOT NULL,
  title TEXT,
  price TEXT,
  auction_house TEXT,
  date TEXT,
  country_origin TEXT,
  medium TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Index
CREATE INDEX idx_diwane_artists_country ON diwane_artists(country_id);
CREATE INDEX idx_diwane_galleries_country ON diwane_galleries(country_id);
CREATE INDEX idx_diwane_museums_country ON diwane_museums(country_id);
CREATE INDEX idx_diwane_collectors_country ON diwane_collectors(country_id);
CREATE INDEX idx_diwane_auction_records_country ON diwane_auction_records(country_origin);

-- RLS
ALTER TABLE diwane_countries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read" ON diwane_countries FOR SELECT USING (true);
ALTER TABLE diwane_artists ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read" ON diwane_artists FOR SELECT USING (true);
ALTER TABLE diwane_galleries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read" ON diwane_galleries FOR SELECT USING (true);
ALTER TABLE diwane_museums ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read" ON diwane_museums FOR SELECT USING (true);
ALTER TABLE diwane_collectors ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read" ON diwane_collectors FOR SELECT USING (true);
ALTER TABLE diwane_auction_records ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read" ON diwane_auction_records FOR SELECT USING (true);
