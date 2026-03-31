-- 004: Agent runs + daily scores

CREATE TABLE agent_runs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  agent_id TEXT NOT NULL,
  layer_id TEXT REFERENCES layers(id) ON DELETE SET NULL,
  model TEXT,
  status TEXT NOT NULL DEFAULT 'running' CHECK (status IN ('running', 'success', 'failed', 'timeout')),
  entries_created INT DEFAULT 0,
  entries_updated INT DEFAULT 0,
  entries_rejected INT DEFAULT 0,
  duration_ms INT,
  error_message TEXT,
  started_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ
);

CREATE INDEX idx_agent_runs_layer ON agent_runs(layer_id);
CREATE INDEX idx_agent_runs_status ON agent_runs(status);

CREATE TABLE scores (
  id SERIAL PRIMARY KEY,
  entity_id TEXT NOT NULL REFERENCES entities(id) ON DELETE CASCADE,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  total_layers INT DEFAULT 0,
  populated_layers INT DEFAULT 0,
  total_entries INT DEFAULT 0,
  avg_freshness REAL DEFAULT 0,
  avg_quality REAL DEFAULT 0,
  completion_pct REAL GENERATED ALWAYS AS (
    CASE WHEN total_layers > 0 THEN ROUND((populated_layers::REAL / total_layers * 100)::NUMERIC, 2) ELSE 0 END
  ) STORED,
  UNIQUE(entity_id, date)
);
