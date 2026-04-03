import { NextResponse } from 'next/server';
import { createConfianceClient } from '@/lib/confiance/supabase';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const sector = searchParams.get('sector');
  const year = searchParams.get('year');

  const supabase = await createConfianceClient();
  let query = supabase.from('conf_ai_incidents').select('*').order('created_at', { ascending: false });
  
  if (sector) query = query.eq('sector', sector);
  if (year) query = query.eq('year', year);
  
  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data: data || [] });
}
