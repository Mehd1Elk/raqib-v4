import { createClient } from '@/lib/supabase/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const country = searchParams.get('country');
  const pathology = searchParams.get('pathology');
  const molecule = searchParams.get('molecule');

  try {
    const supabase = await createClient();
    let query =     (supabase as any).from('obs_patients_aggregate').select('*');

    if (country) query = query.eq('country', country);
    if (pathology) query = query.eq('pathology', pathology);
    if (molecule) query = query.eq('molecule', molecule);

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching obs_patients_aggregate:', error);
      return Response.json({ error: error.message }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    console.error('Exception fetching obs_patients_aggregate:', error);
    return Response.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
