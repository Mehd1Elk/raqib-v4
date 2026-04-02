import { NextResponse, NextRequest } from 'next/server';
import { createSciClient } from '@/lib/science/supabase';

export async function GET(req: NextRequest) {
  const supabase = await createSciClient();
  const url = req.nextUrl.searchParams;

  let query = supabase.from('sci_papers').select('*');

  const domain = url.get('domain');
  if (domain) query = query.eq('domain', domain);

  const brique = url.get('brique');
  if (brique) query = query.eq('brique', brique);

  const year = url.get('year');
  if (year) query = query.eq('year', parseInt(year));

  const status = url.get('status');
  if (status) query = query.eq('status', status);

  const search = url.get('q');
  if (search) query = query.ilike('title', `%${search}%`);

  query = query.order('relevance_score', { ascending: false }).order('year', { ascending: false });

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data || []);
}

export async function POST(req: NextRequest) {
  const supabase = await createSciClient();
  const body = await req.json();
  const { data, error } = await supabase.from('sci_papers').insert(body).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
