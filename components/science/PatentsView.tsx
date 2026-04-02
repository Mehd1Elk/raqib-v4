'use client';

import { useState, useEffect } from 'react';
import { C, GR, SN, MN, DOMAINS, thS, tdS, wrap, THREAT_COLORS } from './shared/constants';
import SectionTitle from './shared/SectionTitle';
import Pill from './shared/Pill';
import EmptyState from './shared/EmptyState';
import type { SciPatent } from '@/lib/science/types';

const THREAT_LABELS: Record<string, string> = { none: 'Aucun', watch: 'Surveiller', competitor: 'Concurrent', block: 'Blocage' };

export default function PatentsView() {
  const [patents, setPatents] = useState<SciPatent[]>([]);
  const [loading, setLoading] = useState(true);
  const [domainFilter, setDomainFilter] = useState('');
  const [threatFilter, setThreatFilter] = useState('');

  useEffect(() => {
    const params = new URLSearchParams();
    if (domainFilter) params.set('domain', domainFilter);
    if (threatFilter) params.set('threat_level', threatFilter);
    fetch(`/api/science/patents?${params}`)
      .then(r => r.json())
      .then(d => { setPatents(Array.isArray(d) ? d : []); setLoading(false); })
      .catch(() => setLoading(false));
  }, [domainFilter, threatFilter]);

  if (loading) return <div style={{ ...wrap, fontFamily: GR, fontStyle: 'italic', color: C.t3 }}>Chargement…</div>;

  return (
    <div style={wrap}>
      <SectionTitle title="Veille Brevets" subtitle={`${patents.length} brevets concurrentiels`} />

      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 12 }}>
        <button onClick={() => setDomainFilter('')} style={{
          ...filterBtnStyle, background: !domainFilter ? `${C.gold}20` : 'transparent',
          borderColor: !domainFilter ? C.gold : C.div, color: !domainFilter ? C.gold : C.t3,
        }}>Tous domaines</button>
        {DOMAINS.map(d => (
          <button key={d.id} onClick={() => setDomainFilter(domainFilter === d.id ? '' : d.id)} style={{
            ...filterBtnStyle, background: domainFilter === d.id ? `${d.color}20` : 'transparent',
            borderColor: domainFilter === d.id ? d.color : C.div, color: domainFilter === d.id ? d.color : C.t3,
          }}>{d.short}</button>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 6, marginBottom: 16 }}>
        {Object.entries(THREAT_LABELS).map(([k, v]) => (
          <button key={k} onClick={() => setThreatFilter(threatFilter === k ? '' : k)} style={{
            ...filterBtnStyle, background: threatFilter === k ? `${THREAT_COLORS[k]}20` : 'transparent',
            borderColor: threatFilter === k ? THREAT_COLORS[k] : C.div, color: threatFilter === k ? THREAT_COLORS[k] : C.t3,
          }}>{v}</button>
        ))}
      </div>

      {patents.length === 0 ? (
        <EmptyState icon="◆" title="Aucun brevet" subtitle="Aucun brevet ne correspond à vos filtres." />
      ) : (
        <div style={{ background: C.cream, borderRadius: 8, border: `1px solid ${C.div}`, overflow: 'auto', maxHeight: 'calc(100vh - 300px)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 700 }}>
            <thead>
              <tr>
                <th style={thS}>Titre</th>
                <th style={thS}>Assignee</th>
                <th style={thS}>Domaine</th>
                <th style={thS}>Threat</th>
                <th style={thS}>Date</th>
              </tr>
            </thead>
            <tbody>
              {patents.map(p => {
                const dom = DOMAINS.find(d => d.id === p.domain);
                const isBlock = p.threat_level === 'block';
                return (
                  <tr key={p.id} style={{ background: isBlock ? `${C.ruby}08` : 'transparent' }}>
                    <td style={{ ...tdS, maxWidth: 300, fontWeight: isBlock ? 600 : 400 }}>
                      {p.url ? <a href={p.url} target="_blank" rel="noopener noreferrer" style={{ color: C.t1, textDecoration: 'none' }}>{p.title}</a> : p.title}
                    </td>
                    <td style={{ ...tdS, fontSize: 10, color: C.t2 }}>{p.assignee}</td>
                    <td style={tdS}><Pill label={dom?.short || ''} color={dom?.color || C.t3} /></td>
                    <td style={tdS}><Pill label={THREAT_LABELS[p.threat_level] || p.threat_level} color={THREAT_COLORS[p.threat_level] || C.t3} /></td>
                    <td style={{ ...tdS, fontFamily: MN, fontSize: 10 }}>{p.filing_date}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

const filterBtnStyle: React.CSSProperties = {
  fontFamily: MN, fontSize: 9, letterSpacing: 0.5, padding: '4px 10px',
  border: '1px solid', borderRadius: 4, cursor: 'pointer', background: 'transparent',
  transition: 'all 0.15s',
};
