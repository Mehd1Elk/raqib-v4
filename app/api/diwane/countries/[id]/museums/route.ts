import { NextResponse } from 'next/server';
import { createUntypedClient } from '@/lib/untyped-client';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const resolvedParams = await params;
  const id = resolvedParams.id;
  const supabase = await createUntypedClient();

  const { data, error } = await supabase
    .from('diwane_museums')
    .select('*')
    .eq('country_id', id)
    .order('name');

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data });
}
