import { createClient } from '@/lib/supabase/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const from = searchParams.get('from');
  const to = searchParams.get('to');
  const agent = searchParams.get('agent');
  const supabase = await createClient();

  let query = supabase
    .from('agent_communications')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(50);

  if (from && to) {
    // Conversation between two specific agents (both directions)
    query = supabase
      .from('agent_communications')
      .select('*')
      .or(
        `and(from_agent.eq.${from},to_agent.eq.${to}),and(from_agent.eq.${to},to_agent.eq.${from})`
      )
      .order('created_at', { ascending: false })
      .limit(50);
  } else if (agent) {
    // All comms for a single agent
    query = supabase
      .from('agent_communications')
      .select('*')
      .or(`from_agent.eq.${agent},to_agent.eq.${agent}`)
      .order('created_at', { ascending: false })
      .limit(50);
  }

  const { data, error } = await query;

  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json(data || []);
}

export async function POST(request: Request) {
  const body = await request.json();
  const { from_agent, to_agent, content, comm_type, metadata } = body;
  const supabase = await createClient();

  if (!from_agent || !to_agent || !content) {
    return Response.json(
      { error: 'from_agent, to_agent, and content are required' },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from('agent_communications')
    .insert({
      from_agent,
      to_agent,
      content,
      comm_type: comm_type || 'message',
      metadata: metadata || {},
    })
    .select()
    .single();

  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json(data);
}
