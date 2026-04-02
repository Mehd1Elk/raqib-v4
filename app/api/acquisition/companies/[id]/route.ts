import { NextResponse, NextRequest } from 'next/server';
import { createAcqClient } from '@/lib/acquisition/supabase';

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createAcqClient();
  const { data, error } = await supabase
    .from('acq_companies')
    .select('*, acq_contacts(*)')
    .eq('id', id)
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createAcqClient();
  const body = await req.json();
  const { data, error } = await supabase
    .from('acq_companies')
    .update(body)
    .eq('id', id)
    .select()
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
