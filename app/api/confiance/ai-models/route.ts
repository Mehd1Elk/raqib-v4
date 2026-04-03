import { NextResponse } from 'next/server';
import { createConfianceClient } from '@/lib/confiance/supabase';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const drift_status = searchParams.get('drift_status');
  const risk_class = searchParams.get('risk_class');

  const supabase = await createConfianceClient();
  let query = supabase.from('conf_ai_models').select('*').order('created_at', { ascending: false });
  
  if (drift_status) query = query.eq('drift_status', drift_status);
  if (risk_class) query = query.eq('risk_class', risk_class);
  
  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data: data || [] });
}
