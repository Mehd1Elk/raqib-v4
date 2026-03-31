import { createClient } from '@/lib/supabase/server';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('agent_registry')
    .select('*')
    .eq('id', id)
    .single();

  if (error)
    return Response.json({ error: 'Agent not found' }, { status: 404 });
  return Response.json(data);
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();
  const supabase = await createClient();

  const allowedFields = [
    'status',
    'last_run_at',
    'entries_produced',
    'error_count',
    'livrables_jour',
    'instructions',
    'model',
    'platform',
  ];
  const updates: Record<string, unknown> = {};
  for (const key of allowedFields) {
    if (key in body) updates[key] = body[key];
  }

  if (Object.keys(updates).length === 0) {
    return Response.json({ error: 'No valid fields to update' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('agent_registry')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error)
    return Response.json({ error: error.message }, { status: 500 });
  return Response.json(data);
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = await createClient();

  // Mark agent as running
  const { data: agent, error } = await supabase
    .from('agent_registry')
    .update({ status: 'active', last_run_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error)
    return Response.json({ error: 'Agent not found' }, { status: 404 });

  return Response.json({
    message: `Agent ${agent.name} triggered`,
    agent,
    triggered_at: new Date().toISOString(),
  });
}
