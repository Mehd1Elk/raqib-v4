import { NextResponse } from 'next/server';
import { createConfianceClient } from '@/lib/confiance/supabase';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const entity_type = searchParams.get('entity_type');
  const alerts = searchParams.get('alerts');

  const supabase = await createConfianceClient();
  let query = supabase.from('conf_proof_of_being').select('*').order('created_at', { ascending: false });
  
  if (entity_type) query = query.eq('entity_type', entity_type);
  if (alerts) query = query.gte('alerts', alerts);
  
  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data: data || [] });
}
