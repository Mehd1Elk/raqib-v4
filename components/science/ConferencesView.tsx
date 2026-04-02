'use client';

import { useState, useEffect } from 'react';
import { C, GR, SN, MN, DOMAINS, wrap, BRIQUE_COLOR } from './shared/constants';
import SectionTitle from './shared/SectionTitle';
import Pill from './shared/Pill';
import EmptyState from './shared/EmptyState';
import type { SciConference } from '@/lib/science/types';

export default function ConferencesView() {
  const [conferences, setConferences] = useState<SciConference[]>([]);
  const [loading, setLoading] = useState(true);
  const [domainFilter, setDomainFilter] = useState('');
  const [view, setView] = useState<'list' | 'calendar'>('list');

  useEffect(() => {
    const params = new URLSearchParams();
    if (domainFilter) params.set('domain', domainFilter);
    fetch(`/api/science/conferences?${params}`)
      .then(r => r.json())
      .then(d => { setConferences(Array.isArray(d) ? d : []); setLoading(false); })
      .catch(() => setLoading(false));
  }, [domainFilter]);

  if (loading) return <div style={{ ...wrap, fontFamily: GR, fontStyle: 'italic', color: C.t3 }}>Chargement…</div>;

  return (
    <div style={wrap}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
        <SectionTitle title="Conférences Scientifiques" subtitle={`${conferences.length} conférences · calendrier 2026-2027`} />
        <div style={{ display: 'flex', gap: 4 }}>
          <button onClick={() => setView('list')} style={{ ...viewBtn, background: view === 'list' ? `${C.gold}20` : 'transparent', color: view === 'list' ? C.gold : C.t3 }}>Liste</button>
          <button onClick={() => setView('calendar')} style={{ ...viewBtn, background: view === 'calendar' ? `${C.gold}20` : 'transparent', color: view === 'calendar' ? C.gold : C.t3 }}>Calendrier</button>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 16 }}>
        <button onClick={() => setDomainFilter('')} style={{
          ...filterBtnStyle, background: !domainFilter ? `${C.gold}20` : 'transparent',
          borderColor: !domainFilter ? C.gold : C.div, color: !domainFilter ? C.gold : C.t3,
        }}>Tous</button>
        {DOMAINS.map(d => (
          <button key={d.id} onClick={() => setDomainFilter(domainFilter === d.id ? '' : d.id)} style={{
            ...filterBtnStyle, background: domainFilter === d.id ? `${d.color}20` : 'transparent',
            borderColor: domainFilter === d.id ? d.color : C.div, color: domainFilter === d.id ? d.color : C.t3,
          }}>{d.short}</button>
        ))}
      </div>

      {conferences.length === 0 ? (
        <EmptyState icon="◎" title="Aucune conférence" subtitle="Aucune conférence ne correspond à vos filtres." />
      ) : view === 'list' ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {conferences.map(conf => <ConferenceCard key={conf.id} conf={conf} />)}
        </div>
      ) : (
        <CalendarView conferences={conferences} />
      )}
    </div>
  );
}

function ConferenceCard({ conf }: { conf: SciConference }) {
  const dom = DOMAINS.find(d => d.id === conf.domain);
  const isP0 = conf.priority === 'P0';

  return (
    <div style={{
      background: isP0 ? `linear-gradient(135deg, ${C.gold}10, ${C.cream})` : C.cream,
      border: `1px solid ${isP0 ? C.gold : C.div}`, borderRadius: 6, padding: 16,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
        <Pill label={dom?.short || ''} color={dom?.color || C.t3} />
        <Pill label={conf.priority} color={isP0 ? C.gold : conf.priority === 'P1' ? C.yrknown : C.t3} />
        {isP0 && <span style={{ fontFamily: MN, fontSize: 8, color: C.gold, fontWeight: 700, letterSpacing: 1 }}>EIGEN DOIT Y ÊTRE</span>}
      </div>
      <div style={{ fontFamily: GR, fontSize: 16, fontWeight: 700, fontStyle: 'italic', color: C.t1, marginBottom: 4 }}>{conf.name}</div>
      <div style={{ display: 'flex', gap: 16, marginBottom: 8, flexWrap: 'wrap' }}>
        <span style={{ fontFamily: SN, fontSize: 11, color: C.t2 }}>📍 {conf.location}</span>
        <span style={{ fontFamily: MN, fontSize: 10, color: C.t1 }}>📅 {conf.dates}</span>
      </div>
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        {conf.deadline_submission && (
          <span style={{ fontFamily: MN, fontSize: 9, color: C.ruby }}>Soumission: {conf.deadline_submission}</span>
        )}
        {conf.deadline_registration && (
          <span style={{ fontFamily: MN, fontSize: 9, color: C.yrknown }}>Inscription: {conf.deadline_registration}</span>
        )}
      </div>
      {conf.key_speakers && conf.key_speakers.length > 0 && (
        <div style={{ marginTop: 8, display: 'flex', gap: 4, flexWrap: 'wrap' }}>
          {conf.key_speakers.map(s => <Pill key={s} label={s} color={BRIQUE_COLOR[conf.brique] || C.t3} />)}
        </div>
      )}
      {conf.notes && <div style={{ fontFamily: SN, fontSize: 10, color: C.t3, marginTop: 8, fontStyle: 'italic' }}>{conf.notes}</div>}
    </div>
  );
}

function CalendarView({ conferences }: { conferences: SciConference[] }) {
  // Simple month-based grouping
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
      {months.map((m, i) => {
        const monthConfs = conferences.filter(c => {
          const dateStr = c.dates || '';
          const monthNames = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
          return dateStr.toLowerCase().includes(monthNames[i]);
        });

        return (
          <div key={m} style={{ background: C.cream, borderRadius: 6, padding: 12, border: `1px solid ${C.div}`, minHeight: 80 }}>
            <div style={{ fontFamily: MN, fontSize: 9, color: C.t3, letterSpacing: 1.5, marginBottom: 8 }}>{m.toUpperCase()} 2026</div>
            {monthConfs.length === 0 ? (
              <div style={{ fontFamily: SN, fontSize: 10, color: C.tm }}>—</div>
            ) : (
              monthConfs.map(c => {
                const dom = DOMAINS.find(d => d.id === c.domain);
                return (
                  <div key={c.id} style={{
                    padding: '4px 6px', borderRadius: 3, marginBottom: 4,
                    background: `${dom?.color || C.gold}15`, borderLeft: `2px solid ${dom?.color || C.gold}`,
                  }}>
                    <div style={{ fontFamily: SN, fontSize: 9, fontWeight: 600, color: C.t1 }}>{c.name.split(' — ')[0].split(' 20')[0]}</div>
                  </div>
                );
              })
            )}
          </div>
        );
      })}
    </div>
  );
}

const filterBtnStyle: React.CSSProperties = {
  fontFamily: MN, fontSize: 9, letterSpacing: 0.5, padding: '4px 10px',
  border: '1px solid', borderRadius: 4, cursor: 'pointer', background: 'transparent',
};

const viewBtn: React.CSSProperties = {
  fontFamily: MN, fontSize: 9, letterSpacing: 0.5, padding: '4px 10px',
  border: `1px solid ${C.div}`, borderRadius: 4, cursor: 'pointer',
};
