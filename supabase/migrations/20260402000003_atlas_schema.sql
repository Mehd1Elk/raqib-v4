-- Atlas / EIGEN Conquest Schema
-- Project: ybwmmmvwhpnotxdysded (eu-west-1)

-- 1. acq_companies
CREATE TABLE IF NOT EXISTS public.acq_companies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    sector TEXT,
    hq TEXT,
    country TEXT,
    priority TEXT,
    pipeline_stage TEXT,
    revenue TEXT,
    employees TEXT,
    website TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. acq_contacts
CREATE TABLE IF NOT EXISTS public.acq_contacts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id UUID REFERENCES public.acq_companies(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    persona TEXT,
    title TEXT,
    email TEXT,
    linkedin_url TEXT,
    budget TEXT,
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. acq_regulations
CREATE TABLE IF NOT EXISTS public.acq_regulations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    country TEXT NOT NULL,
    framework TEXT NOT NULL,
    relevance TEXT,
    status TEXT,
    impact_level TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. acq_events
CREATE TABLE IF NOT EXISTS public.acq_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    dates TEXT,
    month TEXT,
    city TEXT,
    country TEXT,
    lat NUMERIC,
    lng NUMERIC,
    entities TEXT[],
    priority TEXT,
    relevance TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. acq_playbook
CREATE TABLE IF NOT EXISTS public.acq_playbook (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    brique_id TEXT NOT NULL,
    persona TEXT,
    products JSONB,
    channels JSONB,
    cascade_logic TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 6. acq_cercles (Inferred as the 6th table from context)
CREATE TABLE IF NOT EXISTS public.acq_cercles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    level TEXT,
    contacts_count TEXT,
    method TEXT,
    examples TEXT,
    multiplier TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ==========================================
-- INDEXES
-- ==========================================
CREATE INDEX IF NOT EXISTS idx_acq_companies_name ON public.acq_companies(name);
CREATE INDEX IF NOT EXISTS idx_acq_companies_sector ON public.acq_companies(sector);
CREATE INDEX IF NOT EXISTS idx_acq_companies_hq ON public.acq_companies(hq);
CREATE INDEX IF NOT EXISTS idx_acq_companies_priority ON public.acq_companies(priority);
CREATE INDEX IF NOT EXISTS idx_acq_companies_pipeline_stage ON public.acq_companies(pipeline_stage);

CREATE INDEX IF NOT EXISTS idx_acq_contacts_persona ON public.acq_contacts(persona);
CREATE INDEX IF NOT EXISTS idx_acq_contacts_company_id ON public.acq_contacts(company_id);

-- ==========================================
-- ROW LEVEL SECURITY (RLS)
-- ==========================================
ALTER TABLE public.acq_companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.acq_contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.acq_regulations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.acq_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.acq_playbook ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.acq_cercles ENABLE ROW LEVEL SECURITY;

-- SELECT: anon & authenticated
CREATE POLICY "Allow public read access on acq_companies" ON public.acq_companies FOR SELECT USING (true);
CREATE POLICY "Allow public read access on acq_contacts" ON public.acq_contacts FOR SELECT USING (true);
CREATE POLICY "Allow public read access on acq_regulations" ON public.acq_regulations FOR SELECT USING (true);
CREATE POLICY "Allow public read access on acq_events" ON public.acq_events FOR SELECT USING (true);
CREATE POLICY "Allow public read access on acq_playbook" ON public.acq_playbook FOR SELECT USING (true);
CREATE POLICY "Allow public read access on acq_cercles" ON public.acq_cercles FOR SELECT USING (true);

-- INSERT/UPDATE/DELETE: authenticated only
CREATE POLICY "Allow authenticated insert on acq_companies" ON public.acq_companies FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Allow authenticated update on acq_companies" ON public.acq_companies FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Allow authenticated delete on acq_companies" ON public.acq_companies FOR DELETE TO authenticated USING (true);

CREATE POLICY "Allow authenticated insert on acq_contacts" ON public.acq_contacts FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Allow authenticated update on acq_contacts" ON public.acq_contacts FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Allow authenticated delete on acq_contacts" ON public.acq_contacts FOR DELETE TO authenticated USING (true);

CREATE POLICY "Allow authenticated insert on acq_regulations" ON public.acq_regulations FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Allow authenticated update on acq_regulations" ON public.acq_regulations FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Allow authenticated delete on acq_regulations" ON public.acq_regulations FOR DELETE TO authenticated USING (true);

CREATE POLICY "Allow authenticated insert on acq_events" ON public.acq_events FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Allow authenticated update on acq_events" ON public.acq_events FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Allow authenticated delete on acq_events" ON public.acq_events FOR DELETE TO authenticated USING (true);

CREATE POLICY "Allow authenticated insert on acq_playbook" ON public.acq_playbook FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Allow authenticated update on acq_playbook" ON public.acq_playbook FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Allow authenticated delete on acq_playbook" ON public.acq_playbook FOR DELETE TO authenticated USING (true);

CREATE POLICY "Allow authenticated insert on acq_cercles" ON public.acq_cercles FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Allow authenticated update on acq_cercles" ON public.acq_cercles FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Allow authenticated delete on acq_cercles" ON public.acq_cercles FOR DELETE TO authenticated USING (true);
