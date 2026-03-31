import { createClient } from '@/lib/supabase/server';

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: cohortId } = await params;
  const { topic, agentIds } = await request.json();
  const supabase = await createClient();

  if (!topic) {
    return Response.json({ error: 'topic is required' }, { status: 400 });
  }

  // Create discussion
  const { data: discussion, error: discError } = await supabase
    .from('cohort_discussions')
    .insert({ cohort_id: cohortId, topic })
    .select()
    .single();

  if (discError || !discussion) {
    return Response.json(
      { error: discError?.message || 'Failed to create discussion' },
      { status: 500 }
    );
  }

  // System message
  await supabase.from('cohort_messages').insert({
    discussion_id: discussion.id,
    agent_id: 'system',
    agent_name: 'Comite',
    content: `Discussion ouverte : "${topic}"`,
    message_type: 'system',
  });

  // Fetch cohort agents
  const { data: agents } = await supabase
    .from('agent_registry')
    .select('*')
    .in('id', agentIds || [])
    .eq('status', 'active')
    .limit(5);

  const apiKey = process.env.ANTHROPIC_API_KEY;
  const responses = [];

  for (const agent of agents || []) {
    let content = 'Analyse en cours — livrable dans l\'heure.';

    if (apiKey) {
      try {
        const res = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': apiKey,
            'anthropic-version': '2023-06-01',
          },
          body: JSON.stringify({
            model: 'claude-sonnet-4-20250514',
            max_tokens: 200,
            system: `Tu es ${agent.name} (${agent.id}), agent ${agent.layer} chez Eigen. Pole : ${agent.pole}. Instructions : ${agent.instructions}. Ton : ${agent.tone}. Reponds en 2-3 phrases operationnelles. Pas de formules de politesse.`,
            messages: [{ role: 'user', content: topic }],
          }),
        });
        const data = await res.json();
        content = data.content?.[0]?.text || content;
      } catch {
        // Use fallback content
      }
    }

    const { data: msg } = await supabase
      .from('cohort_messages')
      .insert({
        discussion_id: discussion.id,
        agent_id: agent.id,
        agent_name: agent.name,
        content,
        message_type: 'response',
      })
      .select()
      .single();

    responses.push(msg);
  }

  return Response.json({ discussion, responses });
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: cohortId } = await params;
  const supabase = await createClient();

  const { data: discussions, error } = await supabase
    .from('cohort_discussions')
    .select('*, cohort_messages(*)')
    .eq('cohort_id', cohortId)
    .order('created_at', { ascending: false })
    .limit(20);

  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json(discussions || []);
}
