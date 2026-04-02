CREATE TABLE IF NOT EXISTS acq_trojan_horses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  company_id UUID REFERENCES acq_companies(id) ON DELETE CASCADE,
  group_name TEXT NOT NULL,
  market TEXT NOT NULL,
  sector TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  contact_relation TEXT NOT NULL,
  trojan_name TEXT NOT NULL,
  trojan_emoji TEXT,
  trojan_color TEXT NOT NULL,
  trojan_one_liner TEXT NOT NULL,
  emotional_core TEXT NOT NULL,
  trojan_mechanism TEXT NOT NULL,
  free_deliverable TEXT NOT NULL,
  cascade JSONB NOT NULL DEFAULT '[]',
  total_value TEXT NOT NULL,
  why_irresistible TEXT NOT NULL,
  entry_brique TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_trojan_company ON acq_trojan_horses(company_id);
ALTER TABLE acq_trojan_horses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anon_read_trojan" ON acq_trojan_horses FOR SELECT TO anon USING (true);
CREATE POLICY "auth_write_trojan" ON acq_trojan_horses FOR ALL TO authenticated USING (true) WITH CHECK (true);
