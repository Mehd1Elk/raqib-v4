'use client';

import { useEffect, useState, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';

interface AgentStatus {
  id: string;
  name: string;
  model: string;
  status: 'active' | 'idle' | 'error';
  lastActivity: string;
  entriesProduced: number;
}

const STATIC_AGENTS: AgentStatus[] = [
  { id: 'noos-collector', name: 'noos-coll.', model: 'Haiku', status: 'active', lastActivity: '2h ago', entriesProduced: 342 },
  { id: 'diwane-collector', name: 'diwane-coll.', model: 'Haiku', status: 'active', lastActivity: '1h ago', entriesProduced: 218 },
  { id: 'alguesov-collector', name: 'alguesov-c.', model: 'Haiku', status: 'error', lastActivity: '30m ago', entriesProduced: 156 },
  { id: 'amana-collector', name: 'amana-coll.', model: 'Haiku', status: 'active', lastActivity: '45m ago', entriesProduced: 89 },
  { id: 'raqib-nlp', name: 'raqib-nlp', model: 'Sonnet', status: 'active', lastActivity: '15m ago', entriesProduced: 1204 },
  { id: 'graph-sync', name: 'graph-sync', model: 'Haiku', status: 'active', lastActivity: '5m ago', entriesProduced: 567 },
  { id: 'anti-dup', name: 'anti-dup', model: 'Haiku', status: 'active', lastActivity: '10m ago', entriesProduced: 0 },
  { id: 'quality-check', name: 'quality-chk', model: 'Sonnet', status: 'idle', lastActivity: '3h ago', entriesProduced: 0 },
  { id: 'cc2-deploy', name: 'cc2-deploy', model: 'System', status: 'active', lastActivity: '20m ago', entriesProduced: 0 },
  { id: 'source-verify', name: 'src-verify', model: 'Haiku', status: 'active', lastActivity: '1h ago', entriesProduced: 45 },
  { id: 'linkedin-scraper', name: 'linkedin-sc.', model: 'Haiku', status: 'error', lastActivity: '4h ago', entriesProduced: 23 },
  { id: 'pdf-extractor', name: 'pdf-extract', model: 'Sonnet', status: 'idle', lastActivity: '6h ago', entriesProduced: 78 },
  { id: 'geo-enricher', name: 'geo-enrich', model: 'Haiku', status: 'active', lastActivity: '2h ago', entriesProduced: 412 },
  { id: 'translate-ar', name: 'translate-ar', model: 'Haiku', status: 'active', lastActivity: '30m ago', entriesProduced: 190 },
  { id: 'translate-fr', name: 'translate-fr', model: 'Haiku', status: 'active', lastActivity: '25m ago', entriesProduced: 230 },
  { id: 'sector-tag', name: 'sector-tag', model: 'Haiku', status: 'active', lastActivity: '1h ago', entriesProduced: 88 },
  { id: 'contact-finder', name: 'contact-fnd', model: 'Sonnet', status: 'idle', lastActivity: '5h ago', entriesProduced: 34 },
  { id: 'website-crawl', name: 'web-crawl', model: 'Haiku', status: 'active', lastActivity: '40m ago', entriesProduced: 567 },
  { id: 'data-merge', name: 'data-merge', model: 'Haiku', status: 'active', lastActivity: '50m ago', entriesProduced: 123 },
  { id: 'compliance-chk', name: 'compliance', model: 'Sonnet', status: 'active', lastActivity: '2h ago', entriesProduced: 0 },
  { id: 'email-parser', name: 'email-parse', model: 'Haiku', status: 'idle', lastActivity: '8h ago', entriesProduced: 45 },
  { id: 'news-monitor', name: 'news-mon.', model: 'Haiku', status: 'active', lastActivity: '15m ago', entriesProduced: 312 },
  { id: 'financial-ext', name: 'finance-ext', model: 'Sonnet', status: 'active', lastActivity: '3h ago', entriesProduced: 67 },
  { id: 'social-listen', name: 'social-list', model: 'Haiku', status: 'error', lastActivity: '1h ago', entriesProduced: 89 },
  { id: 'image-ocr', name: 'image-ocr', model: 'Sonnet', status: 'idle', lastActivity: '12h ago', entriesProduced: 23 },
  { id: 'api-gateway', name: 'api-gateway', model: 'System', status: 'active', lastActivity: '1m ago', entriesProduced: 0 },
  { id: 'cache-manager', name: 'cache-mgr', model: 'System', status: 'active', lastActivity: '2m ago', entriesProduced: 0 },
  { id: 'report-gen', name: 'report-gen', model: 'Opus', status: 'idle', lastActivity: '24h ago', entriesProduced: 5 },
];

function statusIcon(status: string): string {
  switch (status) {
    case 'active': return '\u{1F7E2}';
    case 'idle': return '\u{26AA}';
    case 'error': return '\u{1F534}';
    default: return '\u{26AA}';
  }
}

function timeAgo(lastRunAt: string | null): string {
  if (!lastRunAt) return 'never';
  const diff = Date.now() - new Date(lastRunAt).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

export function AgentStatusGrid() {
  const [agents, setAgents] = useState<AgentStatus[]>(STATIC_AGENTS);

  const fetchAgents = useCallback(async () => {
    try {
      const supabase = createClient();
      const { data } = await supabase
        .from('agent_registry')
        .select('id, name, model, status, last_run_at, entries_produced')
        .not('status', 'is', null)
        .order('last_run_at', { ascending: false, nullsFirst: false })
        .limit(28);

      if (data && data.length > 0) {
        setAgents(data.map(a => ({
          id: a.id,
          name: a.name.length > 12 ? a.name.slice(0, 11) + '.' : a.name,
          model: a.model ?? 'Haiku',
          status: (a.status === 'active' ? 'active' : a.status === 'error' ? 'error' : 'idle') as AgentStatus['status'],
          lastActivity: timeAgo(a.last_run_at),
          entriesProduced: a.entries_produced ?? 0,
        })));
      }
    } catch {
      // Keep static data on failure
    }
  }, []);

  useEffect(() => {
    fetchAgents();
    const interval = setInterval(fetchAgents, 60000);
    return () => clearInterval(interval);
  }, [fetchAgents]);

  return (
    <div className="bg-[#FDFAF3] border border-[#D4CCBA]">
      <div className="px-4 py-2 border-b border-[#D4CCBA] bg-[#F2EFE8]">
        <h3 className="font-[family-name:var(--font-jetbrains)] text-[10px] uppercase text-[#918977] font-bold tracking-wider">
          Agents Ops ({agents.length})
        </h3>
      </div>
      <div className="p-3 grid grid-cols-4 sm:grid-cols-5 md:grid-cols-7 gap-2">
        {agents.map(agent => (
          <div
            key={agent.id}
            className="border border-[#D4CCBA] bg-[#FDFAF3] hover:bg-[#F2EFE8] transition-colors p-2 flex flex-col gap-0.5 min-w-0"
            title={agent.id}
          >
            <div className="font-[family-name:var(--font-jetbrains)] text-[9px] text-[#1C1814] font-bold truncate">
              {agent.name}
            </div>
            <div className="font-[family-name:var(--font-jetbrains)] text-[8px] text-[#918977]">
              {'\u25CF'} {agent.model}
            </div>
            <div className="font-[family-name:var(--font-jetbrains)] text-[8px] text-[#918977]">
              {statusIcon(agent.status)} {agent.lastActivity}
            </div>
            <div className="font-[family-name:var(--font-jetbrains)] text-[8px] text-[#B8963E]">
              {agent.entriesProduced > 0 ? `${agent.entriesProduced} entries` : '-'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
