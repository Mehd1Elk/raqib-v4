-- 006: Row Level Security

ALTER TABLE platforms ENABLE ROW LEVEL SECURITY;
ALTER TABLE entities ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE layers ENABLE ROW LEVEL SECURITY;
ALTER TABLE entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE agent_runs ENABLE ROW LEVEL SECURITY;
ALTER TABLE scores ENABLE ROW LEVEL SECURITY;

-- Public read on reference + data tables
CREATE POLICY "Public read platforms" ON platforms FOR SELECT USING (true);
CREATE POLICY "Public read entities" ON entities FOR SELECT USING (true);
CREATE POLICY "Public read categories" ON categories FOR SELECT USING (true);
CREATE POLICY "Public read layers" ON layers FOR SELECT USING (true);
CREATE POLICY "Public read entries" ON entries FOR SELECT USING (true);
CREATE POLICY "Public read scores" ON scores FOR SELECT USING (true);
CREATE POLICY "Public read agent_runs" ON agent_runs FOR SELECT USING (true);

-- Service role write on entries
CREATE POLICY "Service write entries" ON entries
  FOR INSERT WITH CHECK (auth.role() = 'service_role');
CREATE POLICY "Service update entries" ON entries
  FOR UPDATE USING (auth.role() = 'service_role');
CREATE POLICY "Service delete entries" ON entries
  FOR DELETE USING (auth.role() = 'service_role');

-- Service role write on agent_runs
CREATE POLICY "Service write agent_runs" ON agent_runs
  FOR INSERT WITH CHECK (auth.role() = 'service_role');
CREATE POLICY "Service update agent_runs" ON agent_runs
  FOR UPDATE USING (auth.role() = 'service_role');

-- Service role write on layers (update only)
CREATE POLICY "Service update layers" ON layers
  FOR UPDATE USING (auth.role() = 'service_role');

-- Service role write on scores
CREATE POLICY "Service write scores" ON scores
  FOR INSERT WITH CHECK (auth.role() = 'service_role');
CREATE POLICY "Service update scores" ON scores
  FOR UPDATE USING (auth.role() = 'service_role');
