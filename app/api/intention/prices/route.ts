import { NextResponse } from 'next/server';
import { createAcqClient } from '@/lib/acquisition/supabase';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const vertical = searchParams.get('vertical');
  const category = searchParams.get('category');

  const supabase = await createAcqClient();
  let query = supabase.from('int_intention_prices').select('*');

  if (vertical) query = query.eq('vertical', vertical);
  if (category) query = query.eq('category', category);

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data });
}
