import { NextResponse } from 'next/server';
import { createAcqClient } from '@/lib/acquisition/supabase';

export async function GET() {
  const supabase = await createAcqClient();
  
  // Dashboard requests
  const [
    { data: observatory, error: errObs },
    { data: prices, error: errPri },
    { count: competitorCount, error: errComp },
    { count: regulationCount, error: errReg }
  ] = await Promise.all([
    supabase.from('int_attention_observatory').select('intention_gap'),
    supabase.from('int_intention_prices').select('total_market_value'),
    supabase.from('int_competitors').select('*', { count: 'exact', head: true }),
    supabase.from('int_regulations').select('*', { count: 'exact', head: true })
  ]);

  if (errObs || errPri || errComp || errReg) {
    return NextResponse.json({ error: 'Failed to fetch dashboard metrics' }, { status: 500 });
  }

  const total_gap = observatory?.reduce((sum, item) => sum + (Number(item.intention_gap) || 0), 0) || 0;
  const total_market_value = prices?.reduce((sum, item) => sum + (Number(item.total_market_value) || 0), 0) || 0;

  return NextResponse.json({
    kpis: {
      total_gap,
      total_market_value,
      competitor_count: competitorCount || 0,
      regulation_count: regulationCount || 0
    }
  });
}
