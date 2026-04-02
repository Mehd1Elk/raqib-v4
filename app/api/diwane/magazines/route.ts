// @ts-nocheck
import { NextResponse } from 'next/server';
import { createClient } from '../../../../lib/supabase/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const country = searchParams.get('country');

  const supabase = await createClient();
  let query = supabase.from('diwane_art_magazines').select('*');

  if (country) {
    query = query.eq('country_id', country.toUpperCase());
  }

  const { data, error } = await query.order('name');

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data, total: data?.length || 0 });
}
