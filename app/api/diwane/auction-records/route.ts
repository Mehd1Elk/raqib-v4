import { NextResponse } from 'next/server';
import { createUntypedClient } from '@/lib/untyped-client';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const sort = searchParams.get('sort'); // e.g. 'price_desc'
  const supabase = await createUntypedClient();

  let query = supabase.from('diwane_auction_records').select('*');

  // Because price is stored as TEXT, sorting by it directly in SQL can be tricky 
  // without casting. We'll add a generic sort on 'price' but ideally it should 
  // be cast to numeric if properly formatted, or ordered application side.
  if (sort === 'price_desc') {
    query = query.order('price', { ascending: false });
  } else if (sort === 'price_asc') {
    query = query.order('price', { ascending: true });
  } else {
    query = query.order('date', { ascending: false });
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data });
}
