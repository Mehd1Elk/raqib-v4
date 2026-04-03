import { createClient } from '@/lib/supabase/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const molecule = searchParams.get('molecule');
  const scenario_name = searchParams.get('scenario_name');

  try {
    const supabase = await createClient();
    let query =     (supabase as any).from('obs_myne_incentive_sim').select('*');

    if (molecule) query = query.eq('molecule', molecule);
    if (scenario_name) query = query.eq('scenario_name', scenario_name);

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching obs_myne_incentive_sim:', error);
      return Response.json({ error: error.message }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    console.error('Exception fetching obs_myne_incentive_sim:', error);
    return Response.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
