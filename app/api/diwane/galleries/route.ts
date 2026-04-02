import { NextResponse } from 'next/server';
import { createUntypedClient } from '@/lib/untyped-client';

export async function GET(request: Request) {
  const supabase = await createUntypedClient();

  const { data, error } = await supabase
    .from('diwane_galleries')
    .select('*, diwane_countries(name, region)')
    .order('name');

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data });
}
