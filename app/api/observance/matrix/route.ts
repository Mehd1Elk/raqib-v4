import { createClient } from '@/lib/supabase/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const molecule = searchParams.get('molecule');
  const signal_type = searchParams.get('signal_type');

  try {
    const supabase = await createClient();
    let query =     (supabase as any).from('obs_molecule_signal_matrix').select('*');

    if (molecule) query = query.eq('molecule', molecule);
    if (signal_type) query = query.eq('signal_type', signal_type);

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching obs_molecule_signal_matrix:', error);
      return Response.json({ error: error.message }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    console.error('Exception fetching obs_molecule_signal_matrix:', error);
    return Response.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
