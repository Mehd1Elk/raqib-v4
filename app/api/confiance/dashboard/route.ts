import { NextResponse } from 'next/server';
import { createConfianceClient } from '@/lib/confiance/supabase';

export async function GET() {
  const supabase = await createConfianceClient();
  
  const [
    deficitRes,
    competitorsRes,
    regulationsRes,
    proofRes,
  ] = await Promise.all([
    supabase.from('conf_trust_deficit').select('estimated_total_fraud, burhan_tam'),
    supabase.from('conf_competitors').select('id', { count: 'exact' }),
    supabase.from('conf_regulations').select('id', { count: 'exact' }),
    supabase.from('conf_proof_of_being').select('global_score, id'),
  ]);

  if (deficitRes.error || competitorsRes.error || regulationsRes.error || proofRes.error) {
    return NextResponse.json({ error: 'Failed to fetch dashboard data' }, { status: 500 });
  }

  const deficits = deficitRes.data || [];
  const proofs = proofRes.data || [];

  const totalDeficit = deficits.reduce((sum, d) => sum + (Number(d.estimated_total_fraud) || 0), 0);
  const totalTam = deficits.reduce((sum, d) => sum + (Number(d.burhan_tam) || 0), 0);
  
  const avgTrustScore = proofs.length > 0 
    ? proofs.reduce((sum, p) => sum + (Number(p.global_score) || 0), 0) / proofs.length
    : 0;

  return NextResponse.json({
    data: {
      totalDeficit,
      burhanTam: totalTam,
      competitorCount: competitorsRes.count || 0,
      regulationCount: regulationsRes.count || 0,
      avgTrustScore: Math.round(avgTrustScore),
      entityCount: proofs.length,
    }
  });
}
