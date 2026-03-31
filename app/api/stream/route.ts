import { createClient } from '@/lib/supabase/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const entity = searchParams.get('entity');
  const type = searchParams.get('type');
  const limit = Math.min(Number(searchParams.get('limit') ?? 50), 200);
  const offset = Number(searchParams.get('offset') ?? 0);

  try {
    const supabase = await createClient();
    let query = supabase
      .from('stream_events')
      .select('*', { count: 'exact' });

    if (entity) query = query.eq('entity', entity);
    if (type) query = query.eq('event_type', type);

    const { data, error, count } = await query
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) throw error;

    return Response.json({ data, total: count });
  } catch (e) {
    return Response.json({ error: 'Failed to fetch stream events' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { entity, entity_color, event_type, title, detail, urgency, link } = body;

    if (!entity || !event_type || !title) {
      return Response.json(
        { error: 'entity, event_type, and title are required' },
        { status: 400 }
      );
    }

    const supabase = await createClient();
    const { data, error } = await supabase
      .from('stream_events')
      .insert({ entity, entity_color, event_type, title, detail, urgency, link })
      .select()
      .single();

    if (error) throw error;

    return Response.json(data, { status: 201 });
  } catch (e) {
    return Response.json({ error: 'Failed to create stream event' }, { status: 500 });
  }
}
