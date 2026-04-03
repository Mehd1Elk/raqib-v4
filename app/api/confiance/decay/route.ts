import { NextResponse } from 'next/server';
import { createConfianceClient } from '@/lib/confiance/supabase';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const sector = searchParams.get('sector');
  const certifier = searchParams.get('certifier');

  const supabase = await createConfianceClient();
  let query = supabase.from('conf_trust_decay').select('*').order('created_at', { ascending: false });
  
  if (sector) query = query.eq('sector', sector);
  if (certifier) query = query.eq('certifier', certifier);
  
  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data: data || [] });
}
