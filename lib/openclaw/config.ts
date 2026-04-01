export const OPENCLAW_CONFIG = {
  bridgeUrl: process.env.OPENCLAW_BRIDGE_URL || 'http://127.0.0.1:3456',
  enabled: process.env.OPENCLAW_ENABLED === 'true',
};

export async function fetchFromBridge<T = unknown>(
  path: string, init?: RequestInit
): Promise<T | null> {
  if (!OPENCLAW_CONFIG.enabled) return null;
  try {
    const res = await fetch(`${OPENCLAW_CONFIG.bridgeUrl}${path}`, {
      ...init,
      signal: AbortSignal.timeout(3000),
      cache: 'no-store',
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}
