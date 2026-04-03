import { NextResponse } from 'next/server';
import { createAcqClient } from '@/lib/acquisition/supabase';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const jurisdiction = searchParams.get('jurisdiction');
  const status = searchParams.get('status');

  const supabase = await createAcqClient();
  let query = supabase.from('int_regulations').select('*');

  if (jurisdiction) query = query.eq('jurisdiction', jurisdiction);
  if (status) query = query.eq('status', status);

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data });
}
