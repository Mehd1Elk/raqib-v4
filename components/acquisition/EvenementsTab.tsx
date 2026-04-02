'use client';

import { useState, useEffect } from 'react';
import type { AcquisitionEvent, EventName } from './types';
import { PRIORITY_COLORS } from './types';

const EVENT_TABS: { id: EventName; label: string; color: string }[] = [
  { id: 'GITEX', label: 'GITEX Global', color: '#B87D3E' },
  { id: 'ATS', label: 'Africa Tech Summit', color: '#3D7C5E' },
  { id: 'VivaTech', label: 'VivaTech', color: '#3D5E8C' },
];

export default function EvenementsTab() {
  const [events, setEvents] = useState<AcquisitionEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeEvent, setActiveEvent] = useState<EventName>('GITEX');

  useEffect(() => {
    fetch('/api/acquisition/events')
      .then((r) => r.json())
      .then((d) => {
        setEvents(d.events ?? []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const currentEvent = events.find((e) => e.name === activeEvent);
  const currentTab = EVENT_TABS.find((t) => t.id === activeEvent)!;

  if (loading) {
    return (
      <div className="p-6 flex items-center gap-2">
        <div className="w-1.5 h-1.5 rounded-none-none bg-gold animate-pulse" />
        <span className="text-[11px] text-t3 font-[family-name:var(--font-jetbrains)]">
          Chargement \u00e9v\u00e9nements&hellip;
        </span>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-5">
      {/* Header */}
      <div>
        <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-bold  text-noir">
          \u00c9v\u00e9nements
        </h2>
        <p className="text-[10px] text-t3 font-[family-name:var(--font-jetbrains)] mt-1 tracking-[1px]">
          {events.reduce((s, e) => s + e.targets.length, 0)} CIBLES &middot; 3 \u00c9V\u00c9NEMENTS STRAT\u00c9GIQUES
        </p>
      </div>

      {/* Event tabs */}
      <div className="flex gap-2">
        {EVENT_TABS.map((tab) => {
          const ev = events.find((e) => e.name === tab.id);
          const isActive = activeEvent === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveEvent(tab.id)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-none border cursor-pointer"
              style={{
                borderColor: isActive ? tab.color + '40' : '#D4CCBA30',
                background: isActive ? tab.color + '08' : 'transparent',
                transition: 'all 0.15s ease',
              }}
            >
              <div
                className="w-2 h-2 rounded-none-none"
                style={{ background: isActive ? tab.color : '#D4CCBA' }}
              />
              <div className="text-left">
                <div
                  className="text-[11px] font-[family-name:var(--font-playfair)] font-bold "
                  style={{ color: isActive ? tab.color : '#918977' }}
                >
                  {tab.label}
                </div>
                <div className="text-[8px] text-t3 font-[family-name:var(--font-jetbrains)]">
                  {ev?.targets.length ?? 0} cibles &middot; {ev?.date ?? ''}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Event detail */}
      {currentEvent && (
        <div className="space-y-4">
          {/* Event info */}
          <div
            className="p-4 rounded-none border"
            style={{ borderColor: currentTab.color + '20', background: currentTab.color + '05' }}
          >
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div>
                <div className="text-[10px] text-t2 font-[family-name:var(--font-sn)]">
                  {currentEvent.description}
                </div>
              </div>
              <div className="flex gap-4 text-[9px] font-[family-name:var(--font-jetbrains)]">
                <div>
                  <span className="text-t3 tracking-[1px]">DATE </span>
                  <span className="text-t1 font-bold">{currentEvent.date}</span>
                </div>
                <div>
                  <span className="text-t3 tracking-[1px]">LIEU </span>
                  <span className="text-t1 font-bold">{currentEvent.location}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Targets */}
          <div className="border border-div rounded-none bg-ivory overflow-hidden">
            <div className="px-4 py-2 border-b border-div bg-cream flex items-center justify-between">
              <span className="text-[9px] text-t3 font-[family-name:var(--font-jetbrains)] tracking-[1px]">
                CIBLES ({currentEvent.targets.length})
              </span>
              <div className="flex gap-3">
                {(['P0', 'P1', 'P2'] as const).map((p) => {
                  const count = currentEvent.targets.filter((t) => t.priority === p).length;
                  return (
                    <span key={p} className="flex items-center gap-1 text-[8px] font-[family-name:var(--font-jetbrains)]">
                      <span className="w-1.5 h-1.5 rounded-none-none" style={{ background: PRIORITY_COLORS[p] }} />
                      <span style={{ color: PRIORITY_COLORS[p] }}>{p}</span>
                      <span className="text-t3">{count}</span>
                    </span>
                  );
                })}
              </div>
            </div>

            <div className="divide-y divide-div-l">
              {currentEvent.targets
                .sort((a, b) => a.priority.localeCompare(b.priority))
                .map((target, i) => (
                  <div key={i} className="px-4 py-3 flex items-start gap-4 hover:bg-cream/50" style={{ transition: 'background 0.1s' }}>
                    {/* Priority badge */}
                    <span
                      className="flex-shrink-0 mt-0.5 text-[8px] font-[family-name:var(--font-jetbrains)] font-bold px-1.5 py-0.5 rounded-none"
                      style={{
                        background: PRIORITY_COLORS[target.priority] + '15',
                        color: PRIORITY_COLORS[target.priority],
                      }}
                    >
                      {target.priority}
                    </span>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[12px] font-[family-name:var(--font-playfair)] font-bold  text-noir">
                          {target.company_name}
                        </span>
                      </div>
                      <div className="text-[10px] text-t2 font-[family-name:var(--font-sn)] mt-0.5">
                        {target.contact}
                      </div>
                      <div className="text-[10px] text-t3 font-[family-name:var(--font-sn)] mt-1 leading-relaxed">
                        {target.approche}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
