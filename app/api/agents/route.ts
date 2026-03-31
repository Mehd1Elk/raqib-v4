import { createClient } from '@/lib/supabase/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const layer = searchParams.get('layer');
  const pole = searchParams.get('pole');
  const status = searchParams.get('status');

  const supabase = await createClient();
  let query = supabase.from('agent_registry').select('*');

  if (layer) query = query.eq('layer', layer);
  if (pole) query = query.eq('pole', pole);
  if (status) query = query.eq('status', status);

  const { data, error } = await query.order('id');

  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json(data);
}
