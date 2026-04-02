'use client';

import { useState, useEffect } from 'react';
import { C, GR, SN, MN, DOMAINS, wrap, BRIQUE_COLOR, COLLAB_LABELS } from './shared/constants';
import SectionTitle from './shared/SectionTitle';
import Pill from './shared/Pill';
import EmptyState from './shared/EmptyState';
import type { SciLab } from '@/lib/science/types';

export default function LabsView() {
  const [labs, setLabs] = useState<SciLab[]>([]);
  const [loading, setLoading] = useState(true);
  const [domainFilter, setDomainFilter] = useState('');
  const [collabFilter, setCollabFilter] = useState('');

  useEffect(() => {
    const params = new URLSearchParams();
    if (domainFilter) params.set('domain', domainFilter);
    if (collabFilter) params.set('collaboration_potential', collabFilter);
    fetch(`/api/science/labs?${params}`)
      .then(r => r.json())
      .then(d => { setLabs(Array.isArray(d) ? d : []); setLoading(false); })
      .catch(() => setLoading(false));
  }, [domainFilter, collabFilter]);

  if (loading) return <div style={{ ...wrap, fontFamily: GR, fontStyle: 'italic', color: C.t3 }}>Chargement…</div>;

  return (
    <div style={wrap}>
      <SectionTitle title="Laboratoires de Recherche" subtitle={`${labs.length} labs · cartographie mondiale`} />

      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 12 }}>
        <button onClick={() => setDomainFilter('')} style={{
          ...filterBtnStyle, background: !domainFilter ? `${C.gold}20` : 'transparent',
          borderColor: !domainFilter ? C.gold : C.div, color: !domainFilter ? C.gold : C.t3,
        }}>Tous</button>
        {DOMAINS.map(d => (
          <button key={d.id} onClick={() => setDomainFilter(domainFilter === d.id ? '' : d.id)} style={{
            ...filterBtnStyle, background: domainFilter === d.id ? `${d.color}20` : 'transparent',
            borderColor: domainFilter === d.id ? d.color : C.div, color: domainFilter === d.id ? d.color : C.t3,
          }}>{d.icon} {d.short}</button>
        ))}
      </div>

      <div style={{ marginBottom: 16 }}>
        <select value={collabFilter} onChange={e => setCollabFilter(e.target.value)} style={selectStyle}>
          <option value="">Tous potentiels</option>
          {Object.entries(COLLAB_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
        </select>
      </div>

      {labs.length === 0 ? (
        <EmptyState icon="◉" title="Aucun laboratoire" subtitle="Aucun lab ne correspond à vos filtres." />
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340, 1fr))', gap: 12 }}>
          {labs.map(lab => <LabCard key={lab.id} lab={lab} />)}
        </div>
      )}
    </div>
  );
}

function LabCard({ lab }: { lab: SciLab }) {
  const dom = DOMAINS.find(d => d.id === lab.domain);
  const collabColor: Record<string, string> = { none: C.t3, low: C.stone, medium: C.yrknown, high: C.emerald, active: C.noos };

  return (
    <div style={{
      background: C.cream, borderRadius: 6, padding: 16,
      border: `1px solid ${C.div}`, transition: 'border-color 0.15s',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
        <Pill label={dom?.short || ''} color={dom?.color || C.t3} />
        <Pill label={COLLAB_LABELS[lab.collaboration_potential] || lab.collaboration_potential} color={collabColor[lab.collaboration_potential] || C.t3} />
        <span style={{ fontFamily: MN, fontSize: 9, color: C.t3, marginLeft: 'auto' }}>h-index: {lab.h_index}</span>
      </div>
      <div style={{ fontFamily: GR, fontSize: 15, fontWeight: 700, fontStyle: 'italic', color: C.t1, marginBottom: 4, lineHeight: 1.3 }}>
        {lab.name}
      </div>
      <div style={{ fontFamily: SN, fontSize: 11, color: C.t2, marginBottom: 4 }}>{lab.university} — {lab.country}</div>
      <div style={{ fontFamily: SN, fontSize: 10, color: C.t3, marginBottom: 8, lineHeight: 1.5 }}>{lab.description}</div>
      <div style={{ fontFamily: MN, fontSize: 9, color: C.t3 }}>
        <span style={{ color: BRIQUE_COLOR[lab.brique] || C.gold }}>▸</span> {lab.lead_researcher}
      </div>
      {lab.notes && (
        <div style={{ fontFamily: SN, fontSize: 10, color: BRIQUE_COLOR[lab.brique] || C.gold, marginTop: 8, fontWeight: 500 }}>
          → {lab.notes}
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

const selectStyle: React.CSSProperties = {
  fontFamily: SN, fontSize: 11, padding: '6px 10px', border: `1px solid ${C.div}`,
  borderRadius: 4, background: C.cream, color: C.t1, outline: 'none',
};
