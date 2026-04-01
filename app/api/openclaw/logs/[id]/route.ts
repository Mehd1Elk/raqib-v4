import { NextRequest, NextResponse } from 'next/server';
import { fetchFromBridge } from '@/lib/openclaw/config';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: agentId } = await params;
  const realLogs = await fetchFromBridge(`/agents/${agentId}/logs`);
  if (realLogs) return NextResponse.json({ source: 'openclaw', logs: realLogs });

  const logs = Array.from({ length: 10 }, (_, i) => ({
    id: `log-${agentId}-${i}`,
    timestamp: new Date(Date.now() - i * 3600000).toISOString(),
    duration: Math.floor(20 + Math.random() * 40) + 's',
    tokens: Math.floor(1500 + Math.random() * 3000),
    status: Math.random() > 0.1 ? 'success' : 'error',
    input: `Tâche #${100 - i}: production livrable couche assignée`,
    output: Math.random() > 0.1
      ? `+${Math.floor(5 + Math.random() * 20)} entries produites`
      : 'Timeout — retry programmé',
  }));
  return NextResponse.json({ source: 'simulated', logs });
}
