// @ts-nocheck — Supabase corridor tables not yet created
import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const supabase = await createClient();
  const { id: rawId } = await params;
  const id = rawId.toUpperCase();

  const { data, error } = await supabase
    .from('corridor_countries')
    .select(`
      *,
      corridor_minerals (*),
      corridor_enterprises (*),
      corridor_leaders (*),
      corridor_universities (*),
      corridor_billionaires (*)
    `)
    .eq('id', id)
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: error.code === 'PGRST116' ? 404 : 500 });
  }

  return NextResponse.json({ data });
}
