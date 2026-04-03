import { NextResponse } from 'next/server';
import { createAcqClient } from '@/lib/acquisition/supabase';
import { mapCompanies } from '@/lib/acquisition/map-company';
import type { AcquisitionStage } from '@/components/acquisition/types';
import { STAGE_ORDER } from '@/components/acquisition/types';

export async function GET() {
  const supabase = await createAcqClient();

  const { data: rows, error } = await supabase
    .from('acq_companies')
    .select('*')
    .order('eigen_score', { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const companies = mapCompanies(rows ?? []);

  const grouped: Record<AcquisitionStage, typeof companies> = {} as Record<AcquisitionStage, typeof companies>;
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

  // Map back to DB column name
  const stageToDb: Record<string, string> = {
    identified: 'identified',
    contacted: 'qualified',
    meeting_done: 'approached',
    proposal_sent: 'demo',
    negotiation: 'negotiation',
    signed: 'signed',
    churned: 'churned',
  };

  const { error } = await supabase
    .from('acq_companies')
    .update({ pipeline_stage: stageToDb[stage] || stage, updated_at: new Date().toISOString() })
    .eq('id', id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
