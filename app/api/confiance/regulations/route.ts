import { NextResponse } from 'next/server';
import { createConfianceClient } from '@/lib/confiance/supabase';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const jurisdiction = searchParams.get('jurisdiction');
  const forcing_score = searchParams.get('forcing_score');

  const supabase = await createConfianceClient();
  let query = supabase.from('conf_regulations').select('*').order('created_at', { ascending: false });
  
  if (jurisdiction) query = query.eq('jurisdiction', jurisdiction);
  if (forcing_score) query = query.eq('forcing_score', forcing_score);
  
  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data: data || [] });
}
