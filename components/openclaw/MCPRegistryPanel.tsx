'use client';

import { useEffect, useState } from 'react';

interface MCPServer {
  name: string;
  status: 'connected' | 'disconnected';
  tools: string[];
  agents: number;
}

interface RegistryData {
  source: 'simulated' | 'openclaw';
  servers: MCPServer[];
}

export function MCPRegistryPanel() {
  const [data, setData] = useState<RegistryData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/openclaw/mcp-registry')
      .then(r => r.json())
      .then(setData)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div
      className="bg-transparent border-0"
      style={{ fontFamily: 'var(--font-noto)' }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <span
          style={{
            fontFamily: 'var(--font-jetbrains)',
            fontSize: 9,
            color: 'rgba(255,255,255,0.60)',
            letterSpacing: '2px',
            textTransform: 'uppercase',
          }}
        >
          MCP Registry
        </span>
        {data && (
          <span
            style={{
              fontFamily: 'var(--font-jetbrains)',
              fontSize: 8,
              color: data.source === 'openclaw' ? '#3D7C5E' : '#918977',
              border: `1px solid ${data.source === 'openclaw' ? '#3D7C5E' : '#918977'}`,
              padding: '1px 5px',
              letterSpacing: '1px',
            }}
          >
            {data.source === 'openclaw' ? 'LIVE' : 'SIMULÉ'}
          </span>
        )}
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex flex-col gap-2">
          {[0, 1, 2, 3].map(i => (
            <div key={i} className="bg-[#F2EFE8] animate-pulse h-4 rounded-none-none" />
          ))}
        </div>
      )}

      {/* Server list */}
      {!loading && data && (
        <div className="flex flex-col gap-1.5">
          {data.servers.map(server => (
            <div key={server.name} className="flex items-center gap-2 py-1">
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 0,
                  backgroundColor: server.status === 'connected' ? '#3D7C5E' : '#9C3D3D',
                  display: 'inline-block',
                  flexShrink: 0,
                }}
              />
              <span style={{ fontSize: 12, color: '#FFFFFF', flexShrink: 0 }}>
                {server.name}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-jetbrains)',
                  fontSize: 9,
                  color: 'rgba(255,255,255,0.50)',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  flexShrink: 1,
                  minWidth: 0,
                }}
              >
                {server.tools.join(' · ')}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-jetbrains)',
                  fontSize: 8,
                  fontWeight: 600,
                  color: '#FFFFFF',
                  marginLeft: 'auto',
                  flexShrink: 0,
                  whiteSpace: 'nowrap',
                }}
              >
                {server.agents} agents
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Empty */}
      {!loading && (!data || data.servers.length === 0) && (
        <div
          style={{
            fontFamily: 'var(--font-jetbrains)',
            fontSize: 9,
            color: 'rgba(255,255,255,0.45)',
            padding: '8px 0',
          }}
        >
          Aucun serveur MCP disponible.
        </div>
      )}
    </div>
  );
}
