import { NextResponse } from 'next/server';
import { createAcqClient } from '@/lib/acquisition/supabase';
import type { AcquisitionCompany, AcquisitionStage } from '@/components/acquisition/types';
import { STAGE_ORDER } from '@/components/acquisition/types';

export async function GET() {
  const supabase = await createAcqClient();

  const { data: rows, error } = await supabase
    .from('acquisition_companies')
    .select('*')
    .order('score', { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const companies = (rows ?? []) as AcquisitionCompany[];

  const grouped: Record<AcquisitionStage, AcquisitionCompany[]> = {} as any;
  for (const s of STAGE_ORDER) grouped[s] = [];
  for (const c of companies) {
    if (grouped[c.stage]) grouped[c.stage].push(c);
  }

  return NextResponse.json({ companies, grouped });
}

export async function PATCH(request: Request) {
  const supabase = await createAcqClient();
  const body = await request.json();
  const { id, stage } = body as { id: string; stage: AcquisitionStage };

  if (!id || !stage || !STAGE_ORDER.includes(stage)) {
    return NextResponse.json({ error: 'Invalid id or stage' }, { status: 400 });
  }

  const { error } = await supabase
    .from('acquisition_companies')
    .update({ stage, updated_at: new Date().toISOString() })
    .eq('id', id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
