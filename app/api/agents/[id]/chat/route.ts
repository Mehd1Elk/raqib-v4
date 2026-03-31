import { createClient } from '@/lib/supabase/server';

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: agentId } = await params;
  const { message } = await request.json();
  const supabase = await createClient();

  if (!message) {
    return Response.json({ error: 'message is required' }, { status: 400 });
  }

  // Fetch agent
  const { data: agent, error: agentError } = await supabase
    .from('agent_registry')
    .select('*')
    .eq('id', agentId)
    .single();

  if (agentError || !agent) {
    return Response.json({ error: 'Agent not found' }, { status: 404 });
  }

  // Save user message
  await supabase
    .from('agent_chats')
    .insert({ agent_id: agentId, role: 'user', content: message });

  // Fetch recent history (last 10 messages)
  const { data: history } = await supabase
    .from('agent_chats')
    .select('role, content')
    .eq('agent_id', agentId)
    .order('created_at', { ascending: false })
    .limit(10);

  const messages = (history || [])
    .reverse()
    .map((h) => ({ role: h.role as 'user' | 'assistant', content: h.content }));

  // Call Anthropic API
  const apiKey = process.env.ANTHROPIC_API_KEY;
  let reply = 'Pas de reponse — verifiez la configuration API.';

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
          max_tokens: 300,
          system: `Tu es ${agent.name} (${agent.id}), agent ${agent.layer} du pole ${agent.pole} chez Eigen Holding. Plateforme : ${agent.platform}. Modele : ${agent.model}. Instructions : ${agent.instructions}. Ton : ${agent.tone}. Tu connais l'ecosysteme Eigen complet (6 subsidiaires, CG SA, corridor 22 pays). Tu reponds de maniere concise et operationnelle.`,
          messages,
        }),
      });
      const data = await res.json();
      reply = data.content?.[0]?.text || reply;
    } catch {
      reply = 'Erreur temporaire — reessayez dans quelques instants.';
    }
  }

  // Save assistant response
  await supabase
    .from('agent_chats')
    .insert({ agent_id: agentId, role: 'assistant', content: reply });

  return Response.json({ reply });
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: agentId } = await params;
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('agent_chats')
    .select('*')
    .eq('agent_id', agentId)
    .order('created_at', { ascending: true })
    .limit(50);

  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json(data || []);
}
