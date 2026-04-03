import { NextResponse } from 'next/server';
import { createAcqClient } from '@/lib/acquisition/supabase';

export async function GET() {
  const supabase = await createAcqClient();
  const { data, error } = await supabase.from('int_sovereignty_indices').select('*');

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data });
}
