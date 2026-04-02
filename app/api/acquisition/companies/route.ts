import { NextResponse, NextRequest } from 'next/server';
import { createAcqClient } from '@/lib/acquisition/supabase';

export async function GET(req: NextRequest) {
  const supabase = await createAcqClient();
  const url = req.nextUrl.searchParams;

  let query = supabase.from('acq_companies').select('*');

  const sector = url.get('sector');
  if (sector) query = query.eq('sector', sector);

  const priority = url.get('priority');
  if (priority) query = query.eq('priority', priority);

  const stage = url.get('stage');
  if (stage) query = query.eq('pipeline_stage', stage);

  const hq = url.get('hq');
  if (hq) query = query.eq('hq', hq);

  const search = url.get('q');
  if (search) query = query.ilike('name', `%${search}%`);

  const limit = url.get('limit');
  if (limit) query = query.limit(parseInt(limit));

  query = query.order('eigen_score', { ascending: false });

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data || []);
}

export async function POST(req: NextRequest) {
  const supabase = await createAcqClient();
  const body = await req.json();
  const { data, error } = await supabase.from('acq_companies').insert(body).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
