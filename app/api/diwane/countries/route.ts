import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const region = searchParams.get('region');
  const supabase = await createClient();

  let query = supabase.from('diwane_countries').select('*');
  
  if (region) {
    query = query.eq('region', region);
  }

  const { data, error } = await query.order('name');

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data });
}
