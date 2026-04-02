import { NextResponse, NextRequest } from 'next/server';
import { createSciClient } from '@/lib/science/supabase';

export async function GET(req: NextRequest) {
  const supabase = await createSciClient();
  const url = req.nextUrl.searchParams;

  let query = supabase.from('sci_breakthroughs').select('*');

  const domain = url.get('domain');
  if (domain) query = query.eq('domain', domain);

  const impact = url.get('impact');
  if (impact) query = query.eq('impact', impact);

  query = query.order('date', { ascending: false });

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data || []);
}

export async function POST(req: NextRequest) {
  const supabase = await createSciClient();
  const body = await req.json();
  const { data, error } = await supabase.from('sci_breakthroughs').insert(body).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
