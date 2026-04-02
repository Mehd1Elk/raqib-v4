import { NextResponse } from 'next/server';
import { createUntypedClient } from '@/lib/untyped-client';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q');
  
  if (!q) {
    return NextResponse.json({ error: 'Query parameter "q" is required' }, { status: 400 });
  }

  const supabase = await createUntypedClient();

  // Search across artists, galleries, and museums
  const [artistsRes, galleriesRes, museumsRes] = await Promise.all([
    supabase.from('diwane_artists').select('*').ilike('name', `%${q}%`),
    supabase.from('diwane_galleries').select('*').ilike('name', `%${q}%`),
    supabase.from('diwane_museums').select('*').ilike('name', `%${q}%`)
  ]);

  if (artistsRes.error) {
    return NextResponse.json({ error: artistsRes.error.message }, { status: 500 });
  }

  if (galleriesRes.error) {
    return NextResponse.json({ error: galleriesRes.error.message }, { status: 500 });
  }

  if (museumsRes.error) {
    return NextResponse.json({ error: museumsRes.error.message }, { status: 500 });
  }

  const data = {
    artists: artistsRes.data || [],
    galleries: galleriesRes.data || [],
    museums: museumsRes.data || [],
  };

  return NextResponse.json({ data });
}
