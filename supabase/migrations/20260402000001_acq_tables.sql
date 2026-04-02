-- Intelligence d'Acquisition — 5 tables préfixées acq_

-- 1. acq_companies
CREATE TABLE IF NOT EXISTS acq_companies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  hq text NOT NULL,
  sector text NOT NULL,
  revenue_b numeric NOT NULL DEFAULT 0,
  employees_k numeric NOT NULL DEFAULT 0,
  corridor_countries text[] NOT NULL DEFAULT '{}',
  eigen_briques text NOT NULL DEFAULT '',
  eigen_score integer NOT NULL DEFAULT 1,
  tier text NOT NULL DEFAULT 'Tier 3',
  pipeline_stage text NOT NULL DEFAULT 'identified',
  priority text NOT NULL DEFAULT 'P2',
  website text,
  notes text,
  trojan_horse text,
  annual_value_estimate numeric,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_acq_companies_name ON acq_companies (name);
CREATE INDEX idx_acq_companies_sector ON acq_companies (sector);
CREATE INDEX idx_acq_companies_hq ON acq_companies (hq);
CREATE INDEX idx_acq_companies_priority ON acq_companies (priority);
CREATE INDEX idx_acq_companies_pipeline_stage ON acq_companies (pipeline_stage);

-- 2. acq_contacts
CREATE TABLE IF NOT EXISTS acq_contacts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid NOT NULL REFERENCES acq_companies(id) ON DELETE CASCADE,
  name text NOT NULL,
  role text NOT NULL DEFAULT '',
  persona text NOT NULL DEFAULT 'cto',
  email text,
  linkedin text,
  phone text,
  notes text,
  last_contact_date timestamptz,
  next_action text,
  priority text NOT NULL DEFAULT 'P2',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_acq_contacts_persona ON acq_contacts (persona);
CREATE INDEX idx_acq_contacts_company_id ON acq_contacts (company_id);

-- 3. acq_regulations
CREATE TABLE IF NOT EXISTS acq_regulations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  status text NOT NULL DEFAULT '',
  applies_to_sectors text[] NOT NULL DEFAULT '{}',
  applies_to_min_employees integer NOT NULL DEFAULT 0,
  eigen_briques text NOT NULL DEFAULT '',
  description text NOT NULL DEFAULT '',
  deadline text NOT NULL DEFAULT '',
  penalty text NOT NULL DEFAULT ''
);

-- 4. acq_events
CREATE TABLE IF NOT EXISTS acq_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  city text NOT NULL DEFAULT '',
  dates text NOT NULL DEFAULT '',
  days integer NOT NULL DEFAULT 1,
  targets jsonb NOT NULL DEFAULT '[]'
);

-- 5. acq_playbook
CREATE TABLE IF NOT EXISTS acq_playbook (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  persona text NOT NULL,
  hook text NOT NULL DEFAULT '',
  script text NOT NULL DEFAULT '',
  objections jsonb NOT NULL DEFAULT '[]',
  email_template text NOT NULL DEFAULT '',
  cac text NOT NULL DEFAULT '',
  ltv text NOT NULL DEFAULT ''
);

-- RLS
ALTER TABLE acq_companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE acq_contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE acq_regulations ENABLE ROW LEVEL SECURITY;
ALTER TABLE acq_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE acq_playbook ENABLE ROW LEVEL SECURITY;

-- SELECT for anon (lecture publique MVP)
CREATE POLICY "acq_companies_select_anon" ON acq_companies FOR SELECT TO anon USING (true);
CREATE POLICY "acq_contacts_select_anon" ON acq_contacts FOR SELECT TO anon USING (true);
CREATE POLICY "acq_regulations_select_anon" ON acq_regulations FOR SELECT TO anon USING (true);
CREATE POLICY "acq_events_select_anon" ON acq_events FOR SELECT TO anon USING (true);
CREATE POLICY "acq_playbook_select_anon" ON acq_playbook FOR SELECT TO anon USING (true);

-- INSERT/UPDATE/DELETE for authenticated
CREATE POLICY "acq_companies_all_auth" ON acq_companies FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "acq_contacts_all_auth" ON acq_contacts FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "acq_regulations_all_auth" ON acq_regulations FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "acq_events_all_auth" ON acq_events FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "acq_playbook_all_auth" ON acq_playbook FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- updated_at trigger
CREATE OR REPLACE FUNCTION acq_set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER acq_companies_updated_at
  BEFORE UPDATE ON acq_companies
  FOR EACH ROW EXECUTE FUNCTION acq_set_updated_at();

CREATE TRIGGER acq_contacts_updated_at
  BEFORE UPDATE ON acq_contacts
  FOR EACH ROW EXECUTE FUNCTION acq_set_updated_at();
