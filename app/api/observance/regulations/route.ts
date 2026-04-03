import { createClient } from '@/lib/supabase/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const jurisdiction = searchParams.get('jurisdiction');
  const status = searchParams.get('status');

  try {
    const supabase = await createClient();
    let query = supabase.from('obs_regulations').select('*');

    if (jurisdiction) query = query.eq('jurisdiction', jurisdiction);
    if (status) query = query.eq('status', status);

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching obs_regulations:', error);
      return Response.json({ error: error.message }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    console.error('Exception fetching obs_regulations:', error);
    return Response.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
