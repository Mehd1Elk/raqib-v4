import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(request: Request) {
  const { agent_id, command, payload } = await request.json();

  if (!agent_id || !command) {
    return NextResponse.json({ error: 'agent_id and command required' }, { status: 400 });
  }

  const validCommands = ['run', 'pause', 'resume', 'stop', 'deploy_workflow'];
  if (!validCommands.includes(command)) {
    return NextResponse.json({ error: `Invalid command. Valid: ${validCommands.join(', ')}` }, { status: 400 });
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data, error } = await supabase
    .from('agent_commands')
    .insert({
      agent_id,
      command,
      payload: payload || {},
      status: 'pending',
    })
    .select('id, agent_id, command, status, created_at')
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}

export async function GET() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data } = await supabase
    .from('agent_commands')
    .select('id, agent_id, command, status, result, error_message, created_at, completed_at')
    .order('created_at', { ascending: false })
    .limit(20);

  return NextResponse.json({ commands: data || [] });
}
