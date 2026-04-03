import { createClient } from '@/lib/supabase/server';

export async function GET() {
  try {
    const supabase = await createClient();
    const { data, error } = await (supabase as any)
      .from('obs_mhfs_scoring')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching obs_mhfs_scoring:', error);
      return Response.json({ error: error.message }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    console.error('Exception fetching obs_mhfs_scoring:', error);
    return Response.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
