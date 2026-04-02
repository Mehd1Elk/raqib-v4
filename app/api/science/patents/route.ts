import { NextResponse, NextRequest } from 'next/server';
import { createSciClient } from '@/lib/science/supabase';

export async function GET(req: NextRequest) {
  const supabase = await createSciClient();
  const url = req.nextUrl.searchParams;

  let query = supabase.from('sci_patents').select('*');

  const domain = url.get('domain');
  if (domain) query = query.eq('domain', domain);

  const threat = url.get('threat_level');
  if (threat) query = query.eq('threat_level', threat);

  query = query.order('filing_date', { ascending: false });

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data || []);
}

export async function POST(req: NextRequest) {
  const supabase = await createSciClient();
  const body = await req.json();
  const { data, error } = await supabase.from('sci_patents').insert(body).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
