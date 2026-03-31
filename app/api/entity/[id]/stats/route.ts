import { createClient } from '@/lib/supabase/server';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const entityName = id.toUpperCase();

    const supabase = await createClient();

    const [entriesRes, agentsRes, scoresRes, streamRes] = await Promise.all([
      supabase
        .from('layers')
        .select('actual_rows')
        .eq('entity_id', entityName.toLowerCase()),
      supabase
        .from('agent_registry')
        .select('id, status', { count: 'exact' })
        .eq('pole', entityName),
      supabase
        .from('scores')
        .select('*')
        .eq('entity_id', entityName.toLowerCase())
        .order('date', { ascending: false })
        .limit(1),
      supabase
        .from('stream_events')
        .select('*')
        .eq('entity', entityName)
        .order('created_at', { ascending: false })
        .limit(5),
    ]);

    const agents = agentsRes.data ?? [];
    const activeAgents = agents.filter((a) => a.status === 'Actif').length;
    const totalEntries = (entriesRes.data ?? []).reduce(
      (sum, l) => sum + (l.actual_rows ?? 0),
      0
    );

    return Response.json({
      entity: entityName,
      entries_count: totalEntries,
      agents_total: agentsRes.count ?? 0,
      agents_active: activeAgents,
      latest_score: scoresRes.data?.[0] ?? null,
      recent_events: streamRes.data ?? [],
    });
  } catch (e) {
    return Response.json({ error: 'Failed to fetch entity stats' }, { status: 500 });
  }
}
