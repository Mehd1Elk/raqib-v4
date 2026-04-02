'use client';

import { useState, useEffect } from 'react';
import { C, GR, MN, SN, thS, tdS, wrap } from './shared/constants';
import { SectionTitle } from './shared/SectionTitle';
import { Pill } from './shared/Pill';
import { fetchEvents } from '@/lib/acquisition/api';
import type { AcqEvent } from '@/lib/acquisition/types';

const EVENT_COLORS = [C.accent, C.emerald, C.yrknown];

export default function EventsView({ subIdx = 0 }: { subIdx?: number }) {
  const [events, setEvents] = useState<AcqEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents().then(setEvents).catch(() => setEvents([])).finally(() => setLoading(false));
  }, []);

  if (loading) return <div style={{ ...wrap, fontFamily: MN, fontSize: 10, color: C.t3 }}>Chargement événements...</div>;

  if (events.length === 0) {
    return (
      <div style={{ ...wrap, textAlign: 'center' }}>
        <div style={{ fontFamily: GR, fontSize: 16, fontStyle: 'italic', color: C.t2, marginBottom: 8 }}>Aucun événement en base</div>
        <div style={{ fontFamily: SN, fontSize: 11, color: C.t3 }}>GITEX Africa (7-9 avril), ATS London (29 mai), VivaTech Paris (17-20 juin) seront seedés.</div>
      </div>
    );
  }

  const event = events[Math.min(subIdx, events.length - 1)];
  const color = EVENT_COLORS[Math.min(subIdx, EVENT_COLORS.length - 1)];
  const targets = Array.isArray(event.targets) ? event.targets : [];

  return (
    <div style={wrap}>
      {/* Event header */}
      <div style={{
        padding: '20px 24px', background: `${color}10`, border: `0.5px solid ${color}30`,
        borderRadius: 0, marginBottom: 24, borderLeft: `4px solid ${color}`,
      }}>
        <div style={{ fontFamily: GR, fontSize: 22, fontWeight: 400, color }}>{event.name}</div>
        <div style={{ display: 'flex', gap: 20, marginTop: 8, fontFamily: MN, fontSize: 9, color: C.t2 }}>
          <span>{event.city}</span>
          <span>{event.dates}</span>
          <span>{event.days} jour{event.days > 1 ? 's' : ''}</span>
          <span>{targets.length} cibles</span>
        </div>
      </div>

      {/* Targets */}
      <SectionTitle title="Cibles" count={targets.length} />
      {targets.length > 0 ? (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thS}>Entreprise</th>
              <th style={thS}>Contact</th>
              <th style={thS}>Approche</th>
              <th style={thS}>Priority</th>
              <th style={thS}>Zone</th>
              <th style={thS}>Jour</th>
            </tr>
          </thead>
          <tbody>
            {targets.map((t, i) => (
              <tr key={i}
                onMouseEnter={e => (e.currentTarget.style.background = C.nacre3)}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                <td style={{ ...tdS, fontFamily: GR, fontWeight: 400, fontSize: 12 }}>{t.company_name}</td>
                <td style={tdS}>{t.contact_name}</td>
                <td style={{ ...tdS, fontSize: 10 }}>{t.approach}</td>
                <td style={tdS}><Pill label={t.priority} color={t.priority === 'P0' ? C.ruby : t.priority === 'P1' ? C.accent : C.t3} /></td>
                <td style={{ ...tdS, fontFamily: MN, fontSize: 9 }}>{t.zone}</td>
                <td style={{ ...tdS, fontFamily: MN, fontSize: 9 }}>{t.day}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div style={{ fontFamily: SN, fontSize: 11, color: C.t3, padding: 20 }}>Aucune cible définie pour cet événement.</div>
      )}
    </div>
  );
}
