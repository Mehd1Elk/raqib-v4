import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const resolvedParams = await params;
  const id = resolvedParams.id;
  const supabase = await createClient();

  const [
    countryRes,
    artistsRes,
    galleriesRes,
    museumsRes,
    collectorsRes,
    auctionsRes
  ] = await Promise.all([
    supabase.from('diwane_countries').select('*').eq('id', id).single(),
    supabase.from('diwane_artists').select('*').eq('country_id', id),
    supabase.from('diwane_galleries').select('*').eq('country_id', id),
    supabase.from('diwane_museums').select('*').eq('country_id', id),
    supabase.from('diwane_collectors').select('*').eq('country_id', id),
    supabase.from('diwane_auction_records').select('*').eq('country_origin', id)
  ]);

  if (countryRes.error) {
    return NextResponse.json({ error: countryRes.error.message }, { status: 500 });
  }

  const data = {
    ...countryRes.data,
    artists: artistsRes.data || [],
    galleries: galleriesRes.data || [],
    museums: museumsRes.data || [],
    collectors: collectorsRes.data || [],
    auction_records: auctionsRes.data || []
  };

  return NextResponse.json({ data });
}
