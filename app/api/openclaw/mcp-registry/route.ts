import { NextResponse } from 'next/server';
import { fetchFromBridge } from '@/lib/openclaw/config';

export async function GET() {
  const real = await fetchFromBridge('/mcp-registry');
  if (real) return NextResponse.json({ source: 'openclaw', servers: real });

  return NextResponse.json({
    source: 'simulated',
    servers: [
      { name: 'Claude Code', status: 'connected', tools: ['bash','edit','read'], agents: 120 },
      { name: 'Codex', status: 'connected', tools: ['code','review','test'], agents: 40 },
      { name: 'Supabase', status: 'connected', tools: ['query','insert','update'], agents: 255 },
      { name: 'GitHub', status: 'connected', tools: ['commit','pr','issues'], agents: 50 },
      { name: 'Vercel', status: 'connected', tools: ['deploy','logs'], agents: 10 },
      { name: 'Gmail', status: 'connected', tools: ['send','search'], agents: 8 },
      { name: 'Google Drive', status: 'connected', tools: ['read','write','search'], agents: 15 },
      { name: 'Perplexity', status: 'disconnected', tools: ['search','summarize'], agents: 0 },
      { name: 'Slack', status: 'disconnected', tools: ['send','read'], agents: 0 },
    ],
  });
}
