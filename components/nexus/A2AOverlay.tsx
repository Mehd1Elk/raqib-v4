'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { nexusPositions } from './nexus-store';

/* ═══ Entity colors — same map as bridge & rest of Raqib ═══ */
const ENTITY_COLORS: Record<string, string> = {
  noos: '#1E0A20', aelya: '#7B5EA7', myne: '#3D7C5E', burhan: '#B87D3E',
  yrknown: 'rgba(30,10,32,0.60)', diwane: '#6E2A3D', alguesov: '#3D7C8C', amana: '#5E6E3D',
  cg: '#162B20', cercle: '#1E0A20', eigen: '#1E0A20',
};

/* ═══ Agent prefix → entity mapping ═══ */
const AGENT_PREFIX_TO_ENTITY: Record<string, string> = {
  'L1': 'noos', 'L2': 'noos', 'SA': 'eigen', 'QA': 'burhan',
  'DA': 'myne', 'CA': 'aelya', 'KA': 'yrknown',
};

function resolveEntity(token: string): string {
  // Direct entity name match (case-insensitive)
  const lower = token.toLowerCase();
  if (ENTITY_COLORS[lower]) return lower;

  // Agent prefix match: "L1-01" → "L1" → "noos"
  const prefix = token.split('-')[0].toUpperCase();
  if (AGENT_PREFIX_TO_ENTITY[prefix]) return AGENT_PREFIX_TO_ENTITY[prefix];

  return lower;
}

/* ═══ Types ═══ */
interface Particle {
  id: string;
  fromEntity: string;
  toEntity: string;
  color: string;
  startTime: number;
  duration: number;
  label: string;
}

/* ═══ Component ═══ */
export default function A2AOverlay() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const animFrameRef = useRef<number>(0);
  const svgRef = useRef<SVGSVGElement>(null);

  // Subscribe to A2A events via Supabase Realtime
  useEffect(() => {
    const supabase = createClient();

    const channel = supabase.channel('a2a-overlay')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'stream_events' },
        (payload) => {
          const row = payload.new as {
            id: string;
            entity: string;
            entity_color: string;
            event_type: string;
            detail: string;
            title: string;
          };

          // Only A2A events with arrow pattern
          if (row.event_type !== 'agent') return;

          const text = row.detail || row.title || '';
          const arrowMatch = text.match(/(\w[\w-]*)\s*→\s*(\w[\w-]*)/);
          if (!arrowMatch) return;

          const fromEntity = resolveEntity(arrowMatch[1]);
          const toEntity = resolveEntity(arrowMatch[2]);

          // Validate entities exist in nexus
          if (!ENTITY_COLORS[fromEntity] || !ENTITY_COLORS[toEntity]) return;
          if (fromEntity === toEntity) return;

          const particle: Particle = {
            id: row.id || `a2a-${Date.now()}-${Math.random()}`,
            fromEntity,
            toEntity,
            color: ENTITY_COLORS[fromEntity] || '#1E0A20',
            startTime: Date.now(),
            duration: 1500,
            label: text.split(':')[1]?.trim().slice(0, 20) || '',
          };

          setParticles(prev => [...prev, particle]);
        }
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  // Animation loop — garbage-collect expired particles
  const animate = useCallback(() => {
    const now = Date.now();
    setParticles(prev => {
      const alive = prev.filter(p => now - p.startTime < p.duration);
      return alive.length === prev.length ? prev : alive;
    });
    animFrameRef.current = requestAnimationFrame(animate);
  }, []);

  // Start/stop animation loop
  useEffect(() => {
    if (particles.length > 0) {
      animFrameRef.current = requestAnimationFrame(animate);
    }
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [particles.length > 0, animate]);

  if (particles.length === 0) return null;

  const now = Date.now();
  const { x: tx, y: ty, k } = nexusPositions.transform;

  return (
    <svg
      ref={svgRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 10 }}
    >
      <g transform={`translate(${tx},${ty}) scale(${k})`}>
        {particles.map(p => {
          const fromPos = nexusPositions.nodes.get(p.fromEntity);
          const toPos = nexusPositions.nodes.get(p.toEntity);
          if (!fromPos || !toPos) return null;

          const elapsed = now - p.startTime;
          const progress = Math.min(elapsed / p.duration, 1);

          // Ease in-out cubic
          const t = progress < 0.5
            ? 4 * progress * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 3) / 2;

          const cx = fromPos.x + (toPos.x - fromPos.x) * t;
          const cy = fromPos.y + (toPos.y - fromPos.y) * t;

          // Opacity: fade in 0-10%, full 10-80%, fade out 80-100%
          const opacity = progress < 0.1 ? progress / 0.1
            : progress > 0.8 ? (1 - progress) / 0.2
            : 1;

          return (
            <g key={p.id}>
              {/* Trail line */}
              <line
                x1={fromPos.x} y1={fromPos.y}
                x2={cx} y2={cy}
                stroke={p.color}
                strokeWidth={1}
                opacity={opacity * 0.2}
              />
              {/* Particle */}
              <circle
                cx={cx} cy={cy} r={4}
                fill={p.color}
                opacity={opacity * 0.8}
              />
              {/* Glow */}
              <circle
                cx={cx} cy={cy} r={8}
                fill={p.color}
                opacity={opacity * 0.15}
              />
            </g>
          );
        })}
      </g>
    </svg>
  );
}
