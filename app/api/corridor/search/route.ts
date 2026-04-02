// @ts-nocheck — Supabase corridor tables not yet created
import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');
  
  if (!query) {
    return NextResponse.json({ error: 'Missing query parameter "q"' }, { status: 400 });
  }

  const supabase = await createClient();

  // Simple search on country name or official name
  // To do a full text search across tables, we could use a Postgres function or views
  const { data, error } = await supabase
    .from('corridor_countries')
    .select('id, name, flag, region')
    .or(`name.ilike.%${query}%,official_name.ilike.%${query}%`);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data });
}
