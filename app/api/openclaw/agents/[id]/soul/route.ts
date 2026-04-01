import { NextRequest, NextResponse } from 'next/server';
import { fetchFromBridge } from '@/lib/openclaw/config';
import { createClient } from '@supabase/supabase-js';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: agentId } = await params;
  const soul = await fetchFromBridge<{ source: string; soul: string }>(`/agents/${agentId}/soul`);
  if (soul?.soul) return NextResponse.json({ source: 'openclaw', soul: soul.soul });

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  const { data: agent } = await supabase
    .from('agent_registry').select('*').eq('id', agentId).single();
  if (!agent) return NextResponse.json({ error: 'Agent not found' }, { status: 404 });

  const generatedSoul = `# ${agent.name}\n\n## Identité\n${agent.instructions || 'Agent Eigen'}\n\n## Modèle\n${agent.model || 'claude-sonnet'}\n\n## Plateforme\n${agent.platform || 'Claude'}\n\n## Ton\n${agent.tone || 'Technique'}\n\n## Périmètre\n${agent.perimeter || 'Eigen'}`;
  return NextResponse.json({ source: 'generated', soul: generatedSoul, agent });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: agentId } = await params;
  const { soul } = await request.json();

  const result = await fetchFromBridge(`/agents/${agentId}/soul`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ soul }),
  });
  if (result) return NextResponse.json({ source: 'openclaw', result });

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  await supabase.from('agent_registry').update({ instructions: soul }).eq('id', agentId);
  return NextResponse.json({ source: 'supabase', saved: true });
}
