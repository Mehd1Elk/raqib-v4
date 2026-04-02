import { NextResponse } from 'next/server';
import { createAcqClient } from '@/lib/acquisition/supabase';

export async function GET() {
  const supabase = await createAcqClient();
  const { data, error } = await supabase.from('acq_playbook').select('*').order('persona');
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data || []);
}
