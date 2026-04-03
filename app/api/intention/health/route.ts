import { NextResponse } from 'next/server';
import { createAcqClient } from '@/lib/acquisition/supabase';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const buyer = searchParams.get('buyer');

  const supabase = await createAcqClient();
  let query = supabase.from('int_health_data_pricing').select('*');

  if (category) query = query.eq('category', category);
  if (buyer) query = query.eq('buyer', buyer);

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data });
}
