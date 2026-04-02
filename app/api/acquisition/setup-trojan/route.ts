import { NextResponse, NextRequest } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('key');
  if (secret !== 'eigen2026') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  const supabase = createClient(url, key);

  // Try to create table via RPC or just test if it exists
  const { data, error } = await supabase.from('acq_trojan_horses').select('id').limit(1);

  if (error && error.message.includes('does not exist')) {
    return NextResponse.json({
      status: 'table_missing',
      message: 'Table acq_trojan_horses does not exist. Run the migration SQL in Supabase SQL Editor.',
      sql: `CREATE TABLE IF NOT EXISTS acq_trojan_horses (
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
CREATE INDEX idx_trojan_company ON acq_trojan_horses(company_id);
ALTER TABLE acq_trojan_horses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anon_read_trojan" ON acq_trojan_horses FOR SELECT TO anon USING (true);
CREATE POLICY "auth_write_trojan" ON acq_trojan_horses FOR ALL TO authenticated USING (true) WITH CHECK (true);`
    });
  }

  if (error) {
    return NextResponse.json({ status: 'error', message: error.message });
  }

  return NextResponse.json({ status: 'table_exists', rows: data?.length || 0 });
}
