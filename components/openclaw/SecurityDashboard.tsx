'use client';

import { useEffect, useState } from 'react';
import { Shield } from 'lucide-react';
import { GaugeKPI } from '@/components/ui/GaugeKPI';

interface StatusData {
  mode: 'LIVE' | 'SIMULATED';
  openclaw: {
    enabled: boolean;
    connected: boolean;
    gateway: string;
    uptime: number;
    lastEvent: string | null;
    bidirectional: boolean;
  };
}

const GUARDRAILS = ['PII masking', 'prompt injection', 'rate limiting', 'content filter'];

export function SecurityDashboard() {
  const [data, setData] = useState<StatusData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/openclaw/status')
      .then(r => r.json())
      .then(setData)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div
      className="bg-[#FDFAF3] border border-[#D4CCBA] p-5"
      style={{ fontFamily: 'var(--font-noto)' }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Shield size={14} style={{ color: '#B8963E' }} />
          <span
            style={{
              fontFamily: 'var(--font-jetbrains)',
              fontSize: 9,
              color: '#918977',
              letterSpacing: '2px',
              textTransform: 'uppercase',
            }}
          >
            Sécurité OpenClaw
          </span>
        </div>
        {data && (
          <span
            style={{
              fontFamily: 'var(--font-jetbrains)',
              fontSize: 8,
              color: data.mode === 'LIVE' ? '#3D7C5E' : '#918977',
              border: `1px solid ${data.mode === 'LIVE' ? '#3D7C5E' : '#918977'}`,
              padding: '1px 5px',
              letterSpacing: '1px',
            }}
          >
            {data.mode}
          </span>
        )}
      </div>

      {/* Loading */}
      {loading && (
        <div className="grid grid-cols-2 gap-4">
          {[0, 1, 2, 3].map(i => (
            <div key={i} className="border border-[#D4CCBA] p-3 bg-[#F2EFE8] animate-pulse h-24" />
          ))}
        </div>
      )}

      {/* 4 blocks */}
      {!loading && (
        <div className="grid grid-cols-2 gap-4">
          {/* Block 1: NemoClaw version */}
          <div className="border border-[#D4CCBA] p-3">
            <div
              style={{
                fontFamily: 'var(--font-jetbrains)',
                fontSize: 8,
                color: '#918977',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                marginBottom: 6,
              }}
            >
              NemoClaw
            </div>
            <div
              style={{
                fontFamily: 'var(--font-cormorant)',
                fontSize: 22,
                fontWeight: 700,
                color: '#1C1814',
                lineHeight: 1,
              }}
            >
              v2.4.1
            </div>
            <div
              style={{
                fontFamily: 'var(--font-jetbrains)',
                fontSize: 8,
                color: '#3D7C5E',
                marginTop: 4,
                letterSpacing: '1px',
              }}
            >
              ACTIVE
            </div>
            {data?.openclaw.bidirectional && (
              <div
                style={{
                  fontFamily: 'var(--font-jetbrains)',
                  fontSize: 7,
                  color: '#B8963E',
                  marginTop: 3,
                  letterSpacing: '1px',
                }}
              >
                BIDIRECTIONNEL
              </div>
            )}
          </div>

          {/* Block 2: Guardrails */}
          <div className="border border-[#D4CCBA] p-3">
            <div
              style={{
                fontFamily: 'var(--font-jetbrains)',
                fontSize: 8,
                color: '#918977',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                marginBottom: 6,
              }}
            >
              Guardrails
            </div>
            {GUARDRAILS.map(g => (
              <div
                key={g}
                style={{
                  fontSize: 10,
                  color: '#1C1814',
                  lineHeight: 1.7,
                }}
              >
                <span style={{ color: '#3D7C5E', marginRight: 5 }}>+</span>
                {g}
              </div>
            ))}
          </div>

          {/* Block 3: Blocked attempts */}
          <div className="border border-[#D4CCBA] p-3">
            <div
              style={{
                fontFamily: 'var(--font-jetbrains)',
                fontSize: 8,
                color: '#918977',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                marginBottom: 6,
              }}
            >
              Blocked
            </div>
            <div
              style={{
                fontFamily: 'var(--font-cormorant)',
                fontSize: 36,
                fontWeight: 700,
                color: '#9C3D3D',
                lineHeight: 1,
              }}
            >
              0
            </div>
            <div
              style={{
                fontFamily: 'var(--font-jetbrains)',
                fontSize: 8,
                color: '#918977',
                marginTop: 4,
              }}
            >
              tentatives (24h)
            </div>
          </div>

          {/* Block 4: Gauge */}
          <div className="border border-[#D4CCBA] p-3 flex items-center justify-center">
            <GaugeKPI value={94} target={100} label="Score sécurité" color="#B8963E" />
          </div>
        </div>
      )}
    </div>
  );
}
