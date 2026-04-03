import { createClient } from '@/lib/supabase/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status');
  const technology = searchParams.get('technology');
  const pathology_target = searchParams.get('pathology_target');

  try {
    const supabase = await createClient();
    let query = supabase.from('obs_competitors').select('*');

    if (status) query = query.eq('status', status);
    if (technology) query = query.eq('technology', technology);
    if (pathology_target) query = query.eq('pathology_target', pathology_target);

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching obs_competitors:', error);
      return Response.json({ error: error.message }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    console.error('Exception fetching obs_competitors:', error);
    return Response.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
