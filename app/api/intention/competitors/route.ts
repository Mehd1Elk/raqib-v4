import { NextResponse } from 'next/server';
import { createAcqClient } from '@/lib/acquisition/supabase';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const model = searchParams.get('model');
  const privacy_level = searchParams.get('privacy_level');

  const supabase = await createAcqClient();
  let query = supabase.from('int_competitors').select('*');

  if (model) query = query.eq('model', model);
  if (privacy_level) query = query.eq('privacy_level', privacy_level);

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data });
}
