import { NextResponse } from 'next/server';
import { createConfianceClient } from '@/lib/confiance/supabase';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const anchor_name = searchParams.get('anchor_name');
  const tier = searchParams.get('tier');

  const supabase = await createConfianceClient();
  let query = supabase.from('conf_supply_chain').select('*').order('created_at', { ascending: false });
  
  if (anchor_name) query = query.eq('anchor_name', anchor_name);
  if (tier) query = query.eq('tier', tier);
  
  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data: data || [] });
}
