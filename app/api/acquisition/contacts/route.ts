import { NextResponse } from 'next/server';
import { createAcqClient } from '@/lib/acquisition/supabase';
import type { AcquisitionContact } from '@/components/acquisition/types';

export async function GET() {
  const supabase = await createAcqClient();

  const { data: rows, error } = await supabase
    .from('acquisition_contacts')
    .select('*')
    .order('priority', { ascending: true })
    .order('updated_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ contacts: (rows ?? []) as unknown as AcquisitionContact[] });
}
