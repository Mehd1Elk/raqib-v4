import { NextResponse, NextRequest } from 'next/server';
import { createAcqClient } from '@/lib/acquisition/supabase';

export async function GET(req: NextRequest) {
  const supabase = await createAcqClient();
  const url = req.nextUrl.searchParams;
  let query = supabase.from('acq_contacts').select('*, acq_companies(name, sector, hq)');

  const persona = url.get('persona');
  if (persona) query = query.eq('persona', persona);

  const company_id = url.get('company_id');
  if (company_id) query = query.eq('company_id', company_id);

  query = query.order('priority');

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data || []);
}

export async function POST(req: NextRequest) {
  const supabase = await createAcqClient();
  const body = await req.json();
  const { data, error } = await supabase.from('acq_contacts').insert(body).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
