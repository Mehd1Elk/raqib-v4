import { NextResponse } from 'next/server';
import { fetchFromBridge } from '@/lib/openclaw/config';
import { createClient } from '@supabase/supabase-js';

export async function GET() {
  const real = await fetchFromBridge('/routing');
  if (real) return NextResponse.json({ source: 'openclaw', routes: real });

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  const { data: agents } = await supabase
    .from('agent_registry').select('name, layer, platform, entity');

  const grouped: Record<string, { name: string; layer: string; platform: string }[]> = {};
  for (const a of agents || []) {
    const key = a.entity || 'EIGEN';
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push({ name: a.name, layer: a.layer, platform: a.platform });
  }
  const routes = Object.entries(grouped).map(([entity, list]) => ({
    entity, agents: list, count: list.length,
  }));
  return NextResponse.json({ source: 'simulated', routes });
}
