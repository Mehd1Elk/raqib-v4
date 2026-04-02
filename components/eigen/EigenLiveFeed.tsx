'use client';

import { useLiveFeed, type FeedEvent } from '@/lib/supabase/realtime-feed';
import StatusDot from '../ui/StatusDot';
import { CircleDot, CheckCircle2, Rocket, AlertTriangle } from 'lucide-react';

const STATIC_EVENTS: FeedEvent[] = [
  { id: 's1', timestamp: new Date(Date.now() - 60000), type: 'insert', agent: 'noos-collector', layer: 'n01', entity: 'noos', message: 'noos-collector \u2192 n01 \u00B7 +5 entries (psychiatres FR)', count: 5 },
  { id: 's2', timestamp: new Date(Date.now() - 120000), type: 'check', agent: 'anti-dup', message: 'Anti-duplication \u00B7 0 conflit inter-entit\u00E9s \u00B7 16384 entries scann\u00E9es' },
  { id: 's3', timestamp: new Date(Date.now() - 180000), type: 'deploy', agent: 'cc2-deploy', message: 'Vercel production \u00B7 commit 7f0cc8e \u00B7 1123 pages \u00B7 0 erreurs' },
  { id: 's4', timestamp: new Date(Date.now() - 240000), type: 'error', agent: 'alguesov-collector', layer: 's71', message: 'alguesov-collector \u2192 s71 "Donn\u00E9es terrain Dakhla" \u00B7 timeout 30s \u00B7 retry dans 5min' },
  { id: 's5', timestamp: new Date(Date.now() - 300000), type: 'insert', agent: 'diwane-collector', layer: 'art7', message: 'diwane-collector \u2192 art7 \u00B7 +2 entries (galeries UK)', count: 2 },
  { id: 's6', timestamp: new Date(Date.now() - 360000), type: 'update', agent: 'graph-sync', message: 'graph-sync \u2192 neo4j \u00B7 +12 relations' },
  { id: 's7', timestamp: new Date(Date.now() - 420000), type: 'check', agent: 'raqib-nlp', message: 'NLP-enrichment \u00B7 100% confidence' },
  { id: 's8', timestamp: new Date(Date.now() - 480000), type: 'insert', agent: 'amana-collector', layer: 'ph9', message: 'amana-collector \u2192 ph9 \u00B7 +1 entry (fondations)', count: 1 },
  { id: 's9', timestamp: new Date(Date.now() - 600000), type: 'deploy', agent: 'cc2-deploy', message: 'eigen-dashboard \u2192 Vercel \u00B7 0 erreurs' },
  { id: 's10', timestamp: new Date(Date.now() - 900000), type: 'error', agent: 'linkedin-scraper', message: 'api-rate-limit \u2192 linkedin \u00B7 paused for 1h' },
  { id: 's11', timestamp: new Date(Date.now() - 1200000), type: 'insert', agent: 'news-monitor', message: 'news-monitor \u00B7 +8 articles (MENA tech)', count: 8 },
  { id: 's12', timestamp: new Date(Date.now() - 1500000), type: 'insert', agent: 'geo-enricher', message: 'geo-enricher \u00B7 +15 coords enriched', count: 15 },
  { id: 's13', timestamp: new Date(Date.now() - 1800000), type: 'check', agent: 'compliance-chk', message: 'compliance-check \u00B7 0 anomalie d\u00E9tect\u00E9e' },
  { id: 's14', timestamp: new Date(Date.now() - 2100000), type: 'insert', agent: 'translate-ar', message: 'translate-ar \u00B7 +12 entries traduites (AR\u2192FR)', count: 12 },
  { id: 's15', timestamp: new Date(Date.now() - 2400000), type: 'update', agent: 'data-merge', message: 'data-merge \u00B7 3 doublons fusionn\u00E9s' },
  { id: 's16', timestamp: new Date(Date.now() - 2700000), type: 'insert', agent: 'website-crawl', message: 'web-crawl \u00B7 +22 pages index\u00E9es', count: 22 },
  { id: 's17', timestamp: new Date(Date.now() - 3000000), type: 'insert', agent: 'sector-tag', message: 'sector-tag \u00B7 88 entries class\u00E9es', count: 88 },
  { id: 's18', timestamp: new Date(Date.now() - 3300000), type: 'check', agent: 'quality-check', message: 'quality-check \u00B7 score global 88/100' },
  { id: 's19', timestamp: new Date(Date.now() - 3600000), type: 'deploy', agent: 'api-gateway', message: 'api-gateway \u00B7 health OK \u00B7 latency 42ms' },
  { id: 's20', timestamp: new Date(Date.now() - 3900000), type: 'insert', agent: 'pdf-extractor', message: 'pdf-extractor \u00B7 +3 documents pars\u00E9s', count: 3 },
];

function eventIcon(type: FeedEvent['type']) {
  switch (type) {
    case 'insert': return <StatusDot status="active" />;
    case 'update': return <CircleDot size={12} className="text-[#3D5E8C]" />;
    case 'check': return <CheckCircle2 size={12} className="text-[#3D7C5E]" />;
    case 'deploy': return <Rocket size={12} className="text-[#3D5E8C]" />;
    case 'delete': return <StatusDot status="inactive" />;
    case 'error': return <StatusDot status="error" />;
    default: return <StatusDot status="inactive" />;
  }
}

function eventLabel(type: FeedEvent['type']): string {
  switch (type) {
    case 'insert': return 'INSERT';
    case 'update': return 'UPDATE';
    case 'check': return 'CHECK';
    case 'deploy': return 'DEPLOY';
    case 'delete': return 'DELETE';
    case 'error': return 'ERROR';
    default: return '???';
  }
}

function formatTime(d: Date): string {
  return d.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
}

function formatTimeFull(d: Date): string {
  return d.toLocaleString('fr-FR', {
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit',
  });
}

interface EigenLiveFeedProps {
  mode?: 'compact' | 'full';
  limit?: number;
}

export function EigenLiveFeed({ mode = 'compact', limit }: EigenLiveFeedProps) {
  const { events: realtimeEvents } = useLiveFeed();

  const allEvents = realtimeEvents.length > 0
    ? realtimeEvents
    : STATIC_EVENTS;

  const maxItems = limit ?? (mode === 'compact' ? 20 : 100);
  const events = allEvents.slice(0, maxItems);

  if (mode === 'full') {
    return (
      <div className="flex flex-col gap-0.5 font-[family-name:var(--font-jetbrains)] text-[11px] leading-[1.6]">
        {events.map(evt => (
          <div key={evt.id} className="flex gap-2 items-center text-[#1E0A20]">
            <span className="text-[rgba(30,10,32,0.60)] shrink-0">[{formatTimeFull(evt.timestamp)}]</span>
            <span className="shrink-0 flex items-center w-3 h-3">{eventIcon(evt.type)}</span>
            <span className="text-white font-bold shrink-0 w-[52px]">{eventLabel(evt.type)}</span>
            <span className="truncate">{evt.message}</span>
          </div>
        ))}
      </div>
    );
  }

  // Compact mode for sidebar
  return (
    <div className="flex flex-col h-full bg-[#FAF8FC] border border-[rgba(30,10,32,0.35)]">
      <div className="px-4 py-2 border-b border-[rgba(30,10,32,0.35)] bg-[#F2EFE8]">
        <h3 className="font-[family-name:var(--font-jetbrains)] text-[10px] uppercase text-[rgba(30,10,32,0.60)] font-bold tracking-wider">
          Live Feed
        </h3>
      </div>
      <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-1.5">
        {events.map(evt => (
          <div key={evt.id} className="flex items-center gap-2 font-[family-name:var(--font-jetbrains)] text-[10px] leading-tight">
            <span className="shrink-0 flex items-center justify-center w-3 h-3 text-[11px]">{eventIcon(evt.type)}</span>
            <span className="text-[#1E0A20] truncate flex-1">
              {evt.message}
            </span>
            <span className="text-[rgba(30,10,32,0.60)] shrink-0 tabular-nums text-[9px]">
              {formatTime(evt.timestamp)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
