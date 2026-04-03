import { createClient } from '@/lib/supabase/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const molecule = searchParams.get('molecule');
  const factor_type = searchParams.get('factor_type');
  const country = searchParams.get('country');

  try {
    const supabase = await createClient();
    let query = supabase.from('obs_environmental_corrections').select('*');

    if (molecule) query = query.eq('molecule', molecule);
    if (factor_type) query = query.eq('factor_type', factor_type);
    if (country) query = query.eq('country', country);

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching obs_environmental_corrections:', error);
      return Response.json({ error: error.message }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    console.error('Exception fetching obs_environmental_corrections:', error);
    return Response.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
