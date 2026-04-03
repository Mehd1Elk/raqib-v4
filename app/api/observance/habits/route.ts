import { createClient } from '@/lib/supabase/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lever_id = searchParams.get('lever_id');

  try {
    const supabase = await createClient();
    let query = supabase.from('obs_habit_levers').select('*');

    if (lever_id) query = query.eq('lever_id', lever_id);

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching obs_habit_levers:', error);
      return Response.json({ error: error.message }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    console.error('Exception fetching obs_habit_levers:', error);
    return Response.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
