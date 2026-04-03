import { NextResponse } from 'next/server';
import { createAcqClient } from '@/lib/acquisition/supabase';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const country = searchParams.get('country');
  const code = searchParams.get('code');

  const supabase = await createAcqClient();
  let query = supabase.from('int_attention_observatory').select('*');

  if (country) query = query.eq('country', country);
  if (code) query = query.eq('code', code);

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data });
}
