'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { createClient } from './client';
import type { RealtimeChannel } from '@supabase/supabase-js';

export type FeedEventType = 'insert' | 'update' | 'delete' | 'check' | 'deploy' | 'error';

export type FeedEvent = {
  id: string;
  timestamp: Date;
  type: FeedEventType;
  agent: string;
  layer?: string;
  entity?: string;
  message: string;
  count?: number;
};

const MAX_EVENTS = 100;

function makeId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function formatEntryEvent(payload: Record<string, unknown>, eventType: string): FeedEvent {
  const row = (payload.new ?? payload.old ?? {}) as Record<string, unknown>;
  const type = eventType === 'INSERT' ? 'insert' : eventType === 'UPDATE' ? 'update' : 'delete';
  return {
    id: makeId(),
    timestamp: new Date(),
    type,
    agent: (row.created_by as string) ?? 'system',
    layer: row.layer_id as string | undefined,
    message: `Entry ${type} → layer ${row.layer_id ?? '?'} (confidence: ${row.confidence ?? '-'})`,
    count: 1,
  };
}

function formatLayerEvent(payload: Record<string, unknown>, eventType: string): FeedEvent {
  const row = (payload.new ?? payload.old ?? {}) as Record<string, unknown>;
  const type = eventType === 'INSERT' ? 'insert' : eventType === 'UPDATE' ? 'check' : 'delete';
  return {
    id: makeId(),
    timestamp: new Date(),
    type,
    agent: 'layer-sync',
    layer: row.id as string | undefined,
    entity: row.entity_id as string | undefined,
    message: `Layer "${row.name ?? '?'}" ${eventType.toLowerCase()} · ${row.actual_rows ?? 0} rows · quality ${row.quality_score ?? '-'}`,
  };
}

function formatAgentRunEvent(payload: Record<string, unknown>, eventType: string): FeedEvent {
  const row = (payload.new ?? payload.old ?? {}) as Record<string, unknown>;
  const status = row.status as string | undefined;
  const isError = status === 'failed' || status === 'error';
  return {
    id: makeId(),
    timestamp: new Date(),
    type: isError ? 'error' : eventType === 'INSERT' ? 'insert' : 'update',
    agent: (row.agent_id as string) ?? 'unknown',
    layer: row.layer_id as string | undefined,
    message: `Agent ${row.agent_id ?? '?'} · ${status ?? eventType.toLowerCase()} · +${row.entries_created ?? 0} entries${row.error_message ? ` · ${row.error_message}` : ''}`,
    count: (row.entries_created as number) ?? 0,
  };
}

export function useLiveFeed() {
  const [events, setEvents] = useState<FeedEvent[]>([]);
  const channelsRef = useRef<RealtimeChannel[]>([]);

  const addEvent = useCallback((event: FeedEvent) => {
    setEvents(prev => {
      const next = [event, ...prev];
      return next.length > MAX_EVENTS ? next.slice(0, MAX_EVENTS) : next;
    });
  }, []);

  useEffect(() => {
    const supabase = createClient();

    const entriesChannel = supabase
      .channel('realtime-entries')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'entries' }, (payload) => {
        addEvent(formatEntryEvent(payload as unknown as Record<string, unknown>, payload.eventType));
      })
      .subscribe();

    const layersChannel = supabase
      .channel('realtime-layers')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'layers' }, (payload) => {
        addEvent(formatLayerEvent(payload as unknown as Record<string, unknown>, payload.eventType));
      })
      .subscribe();

    const agentRunsChannel = supabase
      .channel('realtime-agent-runs')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'agent_runs' }, (payload) => {
        addEvent(formatAgentRunEvent(payload as unknown as Record<string, unknown>, payload.eventType));
      })
      .subscribe();

    channelsRef.current = [entriesChannel, layersChannel, agentRunsChannel];

    return () => {
      channelsRef.current.forEach(ch => supabase.removeChannel(ch));
      channelsRef.current = [];
    };
  }, [addEvent]);

  return { events, addEvent };
}
