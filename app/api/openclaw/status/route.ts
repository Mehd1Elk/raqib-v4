import { NextResponse } from 'next/server';
import { fetchFromBridge, OPENCLAW_CONFIG } from '@/lib/openclaw/config';

export async function GET() {
  const bridgeStatus = await fetchFromBridge<{
    mode: string; gateway: string; uptime: number;
    lastEvent: string | null; bidirectional: boolean;
  }>('/status');

  if (bridgeStatus) {
    return NextResponse.json({
      mode: 'LIVE',
      openclaw: {
        enabled: true, connected: true,
        gateway: bridgeStatus.gateway,
        uptime: bridgeStatus.uptime,
        lastEvent: bridgeStatus.lastEvent,
        bidirectional: bridgeStatus.bidirectional || false,
      },
    });
  }

  return NextResponse.json({
    mode: 'SIMULATED',
    openclaw: {
      enabled: OPENCLAW_CONFIG.enabled, connected: false,
      gateway: 'unreachable', uptime: 0, lastEvent: null,
      bidirectional: false,
    },
  });
}
