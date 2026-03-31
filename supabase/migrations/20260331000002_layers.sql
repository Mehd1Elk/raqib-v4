-- 002: Layers table
-- Each entity has 10 categories x 10 layers = 100 layers = 1000 total

CREATE TABLE layers (
  id TEXT PRIMARY KEY,
  entity_id TEXT NOT NULL REFERENCES entities(id) ON DELETE CASCADE,
  category_id INT NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  platform_code TEXT NOT NULL REFERENCES platforms(code),
  name TEXT NOT NULL,
  target_rows INT DEFAULT 0,
  actual_rows INT DEFAULT 0,
  freshness_score REAL DEFAULT 0,
  quality_score REAL DEFAULT 0,
  last_populated_at TIMESTAMPTZ,
  last_verified_at TIMESTAMPTZ,
  status TEXT DEFAULT 'empty' CHECK (status IN ('empty', 'partial', 'complete', 'stale', 'error')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_layers_entity ON layers(entity_id);
CREATE INDEX idx_layers_status ON layers(status);
CREATE INDEX idx_layers_name_trgm ON layers USING gin(name gin_trgm_ops);
