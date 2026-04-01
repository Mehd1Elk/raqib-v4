import { NextResponse } from 'next/server';
import { fetchFromBridge } from '@/lib/openclaw/config';
import { createClient } from '@supabase/supabase-js';

export async function GET() {
  const realCrons = await fetchFromBridge('/crons');
  if (realCrons) return NextResponse.json({ source: 'openclaw', crons: realCrons });

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  const { data: agents } = await supabase
    .from('agent_registry').select('id, name, layer, status, platform').order('id');

  const simulatedCrons = (agents || []).map((agent, i) => ({
    agentId: agent.id, agentName: agent.name, layer: agent.layer,
    platform: agent.platform,
    frequency: agent.layer === 'L1' ? '1h' : agent.layer === 'L1.5' ? '2h' : agent.layer === 'L2' ? '4h' : '24h',
    nextRun: new Date(Date.now() + ((i * 4 + 10) * 60000)).toISOString(),
    lastRun: new Date(Date.now() - ((i * 12 + 30) * 60000)).toISOString(),
    status: agent.status === 'active' ? 'scheduled' : 'paused',
  }));
  return NextResponse.json({ source: 'simulated', crons: simulatedCrons });
}

export async function POST(request: Request) {
  const { agentId, action } = await request.json();
  const result = await fetchFromBridge(`/crons/${agentId}/${action}`);
  if (result) return NextResponse.json({ source: 'openclaw', result });

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  await supabase.from('stream_events').insert({
    entity: 'EIGEN', entity_color: '#D4B662', event_type: 'agent',
    title: `Cron ${action}: ${agentId}`,
    detail: `Action ${action} demandée (mode simulé)`, urgency: 'normal',
  });
  return NextResponse.json({ source: 'simulated', action, agentId });
}
