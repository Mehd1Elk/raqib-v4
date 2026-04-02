import { NextResponse } from 'next/server';
import { createAcqClient } from '@/lib/acquisition/supabase';
import { computeRevenue } from '@/lib/acquisition/engine';

export async function GET() {
  const supabase = await createAcqClient();
  const { data: companies, error } = await supabase.from('acq_companies').select('*');
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const rows = companies || [];
  const total_companies = rows.length;
  const p0_count = rows.filter(c => c.priority === 'P0').length;
  const pipeline_active = rows.filter(c => c.pipeline_stage !== 'identified').length;
  const signed_count = rows.filter(c => c.pipeline_stage === 'signed').length;
  const total_revenue_estimate = rows.reduce((sum, c) => sum + computeRevenue(c.tier), 0);

  const by_stage: Record<string, number> = {};
  const by_sector: Record<string, number> = {};
  const by_priority: Record<string, number> = {};

  for (const c of rows) {
    by_stage[c.pipeline_stage] = (by_stage[c.pipeline_stage] || 0) + 1;
    by_sector[c.sector] = (by_sector[c.sector] || 0) + 1;
    by_priority[c.priority] = (by_priority[c.priority] || 0) + 1;
  }

  return NextResponse.json({
    total_companies, p0_count, pipeline_active, signed_count,
    total_revenue_estimate, by_stage, by_sector, by_priority,
  });
}
