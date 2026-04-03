import { createClient } from '@/lib/supabase/server';

export async function GET() {
  try {
    const supabase = await createClient();

    const [
      { data: patientsData, error: patientsError },
      { data: competitorsData, error: competitorsError },
      { data: incentiveData, error: incentiveError }
    ] = await Promise.all([
      supabase.from('obs_patients_aggregate').select('patient_count, mean_adherence_score, alerts_24h, mean_mhfs'),
      supabase.from('obs_competitors').select('id', { count: 'exact' }),
      supabase.from('obs_myne_incentive_sim').select('patient_revenue_month')
    ]);

    if (patientsError || competitorsError || incentiveError) {
      return Response.json({ error: 'Failed to aggregate dashboard data' }, { status: 500 });
    }

    const totalPatients = patientsData?.reduce((sum, row) => sum + (row.patient_count || 0), 0) || 0;
    const totalAlerts24h = patientsData?.reduce((sum, row) => sum + (row.alerts_24h || 0), 0) || 0;
    
    // Calculate means via simple average of rows for the aggregation
    const meanAdherenceScore = patientsData && patientsData.length > 0
      ? patientsData.reduce((sum, row) => sum + (Number(row.mean_adherence_score) || 0), 0) / patientsData.length
      : 0;
      
    const meanMhfs = patientsData && patientsData.length > 0
      ? patientsData.reduce((sum, row) => sum + (Number(row.mean_mhfs) || 0), 0) / patientsData.length
      : 0;

    const myneRevenue24h = incentiveData?.reduce((sum, row) => sum + ((Number(row.patient_revenue_month) || 0) / 30), 0) || 0;
    const competitorCount = competitorsData?.length || 0;

    return Response.json({
      total_patients: totalPatients,
      mean_adherence_score: meanAdherenceScore,
      alert_count_24h: totalAlerts24h,
      myne_revenue_24h: myneRevenue24h,
      mean_mhfs: meanMhfs,
      competitor_count: competitorCount
    });
  } catch (error) {
    console.error('Exception fetching dashboard aggregation:', error);
    return Response.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
