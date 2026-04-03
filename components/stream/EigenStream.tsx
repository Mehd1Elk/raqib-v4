'use client';

import { useState, useEffect, useRef } from 'react';
import { Activity, Pause, Play, Download, ArrowRightLeft } from 'lucide-react';
import StatusDot from '@/components/ui/StatusDot';
import { subscribeToStream } from '@/lib/supabase/stream-realtime';

export interface StreamEvent {
  id: string;
  created_at: string;
  entity: string;
  entity_color: string;
  event_type: 'data' | 'agent' | 'decision' | 'alert' | 'conquest' | 'deploy';
  title: string;
  detail: string;
  urgency: 'critical' | 'normal' | 'low';
  link?: string;
  isA2A?: boolean;
}

const TYPE_COLORS: Record<string, string> = {
  data: '#7DA1C4', agent: '#7DBF9A', decision: '#B8A0D4', alert: '#D48080', conquest: '#C4A06A', deploy: '#7DBFC4'
};

const TYPE_BG_COLORS: Record<string, string> = {
  data: 'rgba(90,110,156,0.15)', agent: 'rgba(90,138,110,0.15)', decision: 'rgba(139,94,176,0.15)',
  alert: 'rgba(180,60,60,0.15)', conquest: 'rgba(168,125,62,0.15)', deploy: 'rgba(90,138,144,0.15)'
};

const ENTITIES = ['NOOS','ÆLYA','MYNε','BURHAN','YrKnown','DIWANE','AlgueSov','AMANA','CG SA','Cercle','EIGEN'];
const ENTITY_COLORS: Record<string, string> = {
  'NOOS': '#5A6E9C', 'ÆLYA': '#5A8A6E', 'MYNε': '#8B5EB0', 'BURHAN': '#A87D3E', 'YrKnown': '#A0785A',
  'DIWANE': '#9C6A5A', 'AlgueSov': '#5A8A90', 'AMANA': '#5A8A6E', 'CG SA': '#C4B0D8', 'Cercle': '#A87D3E', 'EIGEN': '#8B5EB0'
};

const EVENT_TYPES = ['data', 'agent', 'decision', 'alert', 'conquest', 'deploy'] as const;

function generateSimulatedEvent(): StreamEvent {
  const entity = ENTITIES[Math.floor(Math.random() * ENTITIES.length)];
  const type = EVENT_TYPES[Math.floor(Math.random() * EVENT_TYPES.length)];
  const isCritical = Math.random() > 0.9;

  const titles: Record<string, string[]> = {
    data: ['Nouvelle synchronisation Supabase', 'Upload dataset massif', 'Indexation terminée'],
    agent: ['Création agent spécialisé', 'Modification de prompt', 'Agent mis en sommeil'],
    decision: ['Vote conseil validé', 'Stratégie approuvée', 'Objection retenue'],
    alert: ['⚠️ Chute de confiance sur entité', 'Conflit de modèles', 'Saturation API détectée'],
    conquest: ['Nouveau marché sécurisé', 'Mouvement géopolitique majeur', 'Acquisition cible validée'],
    deploy: ['Déploiement production V4', 'Mise à jour infrastructure', 'Rollback demandé']
  };

  return {
    id: `ev_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
    created_at: new Date().toISOString(),
    entity,
    entity_color: ENTITY_COLORS[entity],
    event_type: type,
    title: titles[type][Math.floor(Math.random() * titles[type].length)],
    detail: `Activité enregistrée par le système sur le flux ${entity} [auto-généré]`,
    urgency: type === 'alert' || isCritical ? 'critical' : 'normal',
    link: type === 'agent' ? `/eigen/agent/${Math.floor(Math.random() * 200)}` : undefined
  };
}

export default function EigenStream({ maxHeight = '100%', limit }: { maxHeight?: string, limit?: number }) {
  const [events, setEvents] = useState<StreamEvent[]>([]);
  const [filters, setFilters] = useState({ entities: new Set<string>(), types: new Set<string>() });
  const [paused, setPaused] = useState(false);
  const [connectionMode, setConnectionMode] = useState<'checking' | 'live' | 'simulated'>('checking');
  const scrollRef = useRef<HTMLDivElement>(null);

  // Detect connection mode on mount
  useEffect(() => {
    fetch('/api/openclaw/status')
      .then(r => r.json())
      .then(data => setConnectionMode(data.mode === 'LIVE' ? 'live' : 'simulated'))
      .catch(() => setConnectionMode('simulated'));
  }, []);

  // Simulation: initial seed (only when simulated)
  useEffect(() => {
    if (connectionMode !== 'simulated') return;
    const initial = Array.from({ length: limit || 50 }, () => {
      const e = generateSimulatedEvent();
      e.created_at = new Date(Date.now() - Math.random() * 86400000).toISOString();
      return e;
    }).sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    setEvents(initial);
  }, [limit, connectionMode]);

  // Simulation: periodic generation (only when simulated)
  useEffect(() => {
    if (paused || connectionMode !== 'simulated') return;
    const interval = setInterval(() => {
      setEvents(prev => {
        const result = [generateSimulatedEvent(), ...prev].slice(0, limit ? Math.max(limit, 200) : 200);
        return result;
      });
    }, 30000);
    return () => clearInterval(interval);
  }, [paused, limit, connectionMode]);

  // Realtime subscription (only when live)
  useEffect(() => {
    if (connectionMode !== 'live') return;
    const unsubscribe = subscribeToStream((row: any) => {
      const isA2A = row.event_type === 'agent' && row.detail && /→|->/.test(row.detail);
      const event: StreamEvent = {
        id: row.id,
        created_at: row.created_at,
        entity: row.entity,
        entity_color: row.entity_color,
        event_type: row.event_type,
        title: row.title,
        detail: row.detail || '',
        urgency: row.urgency || 'normal',
        link: row.link,
        isA2A,
      };
      setEvents(prev => [event, ...prev].slice(0, 50));
    });
    return unsubscribe;
  }, [connectionMode]);

  useEffect(() => {
    if (!paused && scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [events, paused]);

  const toggleEntityFilter = (entity: string) => {
    setFilters(prev => {
      const next = new Set(prev.entities);
      if (next.has(entity)) next.delete(entity);
      else next.add(entity);
      return { ...prev, entities: next };
    });
  };

  const toggleTypeFilter = (type: string) => {
    setFilters(prev => {
      const next = new Set(prev.types);
      if (next.has(type)) next.delete(type);
      else next.add(type);
      return { ...prev, types: next };
    });
  };

  const downloadDayExport = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(events, null, 2));
    const dlAnchorElem = document.createElement('a');
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", `stream_export_journee_${new Date().toISOString().slice(0,10)}.json`);
    dlAnchorElem.click();
  };

  const filtered = events.filter(e => {
    if (filters.entities.size > 0 && !filters.entities.has(e.entity)) return false;
    if (filters.types.size > 0 && !filters.types.has(e.event_type)) return false;
    return true;
  });

  const displayed = limit ? filtered.slice(0, limit) : filtered;

  return (
    <div className="flex flex-col h-full bg-[#1E0A20]">
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[rgba(228,212,234,0.12)] bg-[rgba(228,212,234,0.04)] flex-wrap gap-2">
        <div className="flex items-center gap-3">
          <Activity size={14} className="text-[rgba(228,212,234,0.70)]" />
          <span className="font-[family-name:var(--font-jetbrains)] text-[9px] text-[rgba(228,212,234,0.70)] uppercase tracking-wider">STREAM</span>
          <span className={`inline-flex items-center gap-1.5 ml-2 px-2 py-0.5 font-[family-name:var(--font-jetbrains)] text-[7px] tracking-wider uppercase ${
            connectionMode === 'live'
              ? 'bg-[rgba(90,138,110,0.25)] text-[#7DBF9A]'
              : 'bg-[rgba(228,212,234,0.10)] border border-[rgba(228,212,234,0.20)] text-[rgba(228,212,234,0.55)]'
          }`}>
            {connectionMode === 'live' ? 'LIVE \u2014 OpenClaw' : connectionMode === 'simulated' ? 'SIMUL\u00c9' : '...'}
          </span>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          {/* Entity filter dots */}
          <div className="flex gap-1">
            {ENTITIES.map(e => (
              <button key={e} onClick={() => toggleEntityFilter(e)} className="relative group" title={e}>
                <div className="w-2.5 h-2.5 transition" style={{
                  backgroundColor: ENTITY_COLORS[e],
                  opacity: filters.entities.size === 0 || filters.entities.has(e) ? 1 : 0.2
                }} />
              </button>
            ))}
          </div>

          {/* Type filter tags */}
          <div className="flex gap-1">
            {Object.entries(TYPE_COLORS).map(([type, color]) => (
              <button key={type} onClick={() => toggleTypeFilter(type)} className="font-[family-name:var(--font-jetbrains)] text-[7px] px-1.5 py-0.5 transition uppercase border" style={{
                backgroundColor: (filters.types.size === 0 || filters.types.has(type)) ? TYPE_BG_COLORS[type] : 'transparent',
                color: (filters.types.size === 0 || filters.types.has(type)) ? color : 'rgba(228,212,234,0.35)',
                borderColor: (filters.types.size === 0 || filters.types.has(type)) ? color + '40' : 'transparent'
              }}>
                {type}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-[family-name:var(--font-jetbrains)] text-[7px] text-[rgba(228,212,234,0.35)]">{filtered.length} events</span>
          <button onClick={() => setPaused(!paused)} className="p-1 hover:bg-[#2A1230] transition" title={paused ? "Reprendre" : "Pause"}>
            {paused ? <Play size={12} className="text-[#7DBF9A]" /> : <Pause size={12} className="text-[rgba(228,212,234,0.70)]" />}
          </button>
          <button onClick={downloadDayExport} className="p-1 hover:bg-[#2A1230] transition" title="Export de la journée">
            <Download size={12} className="text-[rgba(228,212,234,0.70)]" />
          </button>
        </div>
      </div>

      {/* Event list */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto" style={{ maxHeight }}>
        {displayed.map(event => (
          <div
            key={event.id}
            className={`flex items-start gap-3 px-4 py-2 border-b border-[rgba(228,212,234,0.08)] hover:bg-[#2A1230] transition ${event.link ? 'cursor-pointer' : ''} ${event.urgency === 'critical' ? 'bg-[rgba(180,60,60,0.05)]' : ''} ${event.isA2A ? 'bg-[rgba(139,94,176,0.08)] border-l-2 border-l-[#8B5EB0] pl-2' : ''}`}
            onClick={() => event.link ? (window.location.href = event.link) : undefined}
          >
            {event.isA2A && <ArrowRightLeft size={10} className="text-[#8B5EB0] flex-shrink-0 mt-1.5" />}
            <div className="w-1.5 h-1.5 mt-2 flex-shrink-0" style={{ backgroundColor: event.entity_color || 'rgba(228,212,234,0.45)' }} />

            <div className="font-[family-name:var(--font-jetbrains)] text-[8px] text-[rgba(228,212,234,0.35)] w-10 flex-shrink-0 mt-1">
              {new Date(event.created_at).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span
                  className="font-[family-name:var(--font-jetbrains)] text-[7px] px-1.5 py-0.5 uppercase font-[600]"
                  style={{
                    backgroundColor: (event.entity_color || 'rgba(228,212,234,0.45)') + '26',
                    color: event.entity_color
                  }}
                >
                  {event.entity}
                </span>
                <span
                  className="font-[family-name:var(--font-jetbrains)] text-[7px] px-1 py-0.5 uppercase"
                  style={{
                    color: TYPE_COLORS[event.event_type],
                    backgroundColor: TYPE_BG_COLORS[event.event_type]
                  }}
                >
                  {event.event_type}
                </span>
                <span className="font-[family-name:var(--font-noto)] text-[10px] text-[#E4D4EA] truncate font-medium">{event.title}</span>
              </div>
              {event.detail && (
                <div className="font-[family-name:var(--font-noto)] text-[9px] text-[rgba(228,212,234,0.45)] truncate">{event.detail}</div>
              )}
            </div>

            {event.urgency === 'critical' && <StatusDot status="error" size={6} />}
          </div>
        ))}
        {displayed.length === 0 && (
          <div className="flex items-center justify-center p-8 text-[rgba(228,212,234,0.35)] font-[family-name:var(--font-jetbrains)] text-[10px]">
            Aucun événement correspondant.
          </div>
        )}
      </div>
    </div>
  );
}
