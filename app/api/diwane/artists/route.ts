import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const country = searchParams.get('country');
  const movement = searchParams.get('movement');
  const supabase = await createClient();

  let query = supabase.from('diwane_artists').select('*, diwane_countries(name, region)');

  if (country) {
    query = query.eq('country_id', country);
  }
  
  if (movement) {
    // Basic ilike match for movement (assuming text field)
    query = query.ilike('movement', `%${movement}%`);
  }

  const { data, error } = await query.order('name');

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data });
}
