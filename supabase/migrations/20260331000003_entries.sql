-- 003: Entries table + trigger to update layer stats

CREATE TABLE entries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  layer_id TEXT NOT NULL REFERENCES layers(id) ON DELETE CASCADE,
  data JSONB NOT NULL,
  source TEXT,
  source_date DATE,
  confidence REAL DEFAULT 1.0,
  verified BOOLEAN DEFAULT FALSE,
  verified_by TEXT,
  verified_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  created_by TEXT
);

CREATE INDEX idx_entries_layer ON entries(layer_id);
CREATE INDEX idx_entries_data ON entries USING gin(data);
CREATE INDEX idx_entries_verified ON entries(verified);

-- Trigger function to update layer stats on INSERT/DELETE
CREATE OR REPLACE FUNCTION update_layer_stats()
RETURNS TRIGGER AS $$
DECLARE
  v_count INT;
  v_target INT;
BEGIN
  IF TG_OP = 'DELETE' THEN
    SELECT COUNT(*) INTO v_count FROM entries WHERE layer_id = OLD.layer_id;
    SELECT target_rows INTO v_target FROM layers WHERE id = OLD.layer_id;
    UPDATE layers SET
      actual_rows = v_count,
      status = CASE
        WHEN v_count = 0 THEN 'empty'
        WHEN v_target > 0 AND v_count >= v_target THEN 'complete'
        ELSE 'partial'
      END,
      updated_at = NOW()
    WHERE id = OLD.layer_id;
    RETURN OLD;
  ELSE
    SELECT COUNT(*) INTO v_count FROM entries WHERE layer_id = NEW.layer_id;
    SELECT target_rows INTO v_target FROM layers WHERE id = NEW.layer_id;
    UPDATE layers SET
      actual_rows = v_count,
      status = CASE
        WHEN v_count = 0 THEN 'empty'
        WHEN v_target > 0 AND v_count >= v_target THEN 'complete'
        ELSE 'partial'
      END,
      updated_at = NOW()
    WHERE id = NEW.layer_id;
    RETURN NEW;
  END IF;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_update_layer_stats
AFTER INSERT OR DELETE ON entries
FOR EACH ROW EXECUTE FUNCTION update_layer_stats();
