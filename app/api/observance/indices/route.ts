import { createClient } from '@/lib/supabase/server';

export async function GET() {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('obs_adherence_indices')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching obs_adherence_indices:', error);
      return Response.json({ error: error.message }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    console.error('Exception fetching obs_adherence_indices:', error);
    return Response.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
