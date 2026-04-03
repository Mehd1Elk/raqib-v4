import { NextResponse } from 'next/server';
import { createConfianceClient } from '@/lib/confiance/supabase';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const model = searchParams.get('model');
  const ai_certification = searchParams.get('ai_certification');

  const supabase = await createConfianceClient();
  let query = supabase.from('conf_competitors').select('*').order('created_at', { ascending: false });
  
  if (model) query = query.ilike('model', `%${model}%`);
  if (ai_certification) query = query.eq('ai_certification', ai_certification);
  
  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data: data || [] });
}
