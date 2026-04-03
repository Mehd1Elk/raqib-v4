import { NextResponse } from 'next/server';
import { createAcqClient } from '@/lib/acquisition/supabase';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status');
  const country = searchParams.get('country');

  const supabase = await createAcqClient();
  let query = supabase.from('int_intention_cases').select('*');

  if (status) query = query.eq('status', status);
  if (country) query = query.eq('country', country);

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data });
}
