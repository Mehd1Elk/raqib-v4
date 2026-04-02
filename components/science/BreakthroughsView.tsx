'use client';

import { useState, useEffect } from 'react';
import { C, GR, SN, MN, DOMAINS, wrap, BRIQUE_COLOR, IMPACT_COLORS } from './shared/constants';
import SectionTitle from './shared/SectionTitle';
import Pill from './shared/Pill';
import EmptyState from './shared/EmptyState';
import type { SciBreakthrough } from '@/lib/science/types';

const IMPACT_LABELS: Record<string, string> = { low: 'Faible', medium: 'Moyen', high: 'Élevé', paradigm_shift: 'Paradigm Shift' };

export default function BreakthroughsView() {
  const [bts, setBts] = useState<SciBreakthrough[]>([]);
  const [loading, setLoading] = useState(true);
  const [domainFilter, setDomainFilter] = useState('');
  const [impactFilter, setImpactFilter] = useState('');

  useEffect(() => {
    const params = new URLSearchParams();
    if (domainFilter) params.set('domain', domainFilter);
    if (impactFilter) params.set('impact', impactFilter);
    fetch(`/api/science/breakthroughs?${params}`)
      .then(r => r.json())
      .then(d => { setBts(Array.isArray(d) ? d : []); setLoading(false); })
      .catch(() => setLoading(false));
  }, [domainFilter, impactFilter]);

  if (loading) return <div style={{ ...wrap, fontFamily: GR, fontStyle: 'italic', color: C.t3 }}>Chargement…</div>;

  // Sort: paradigm_shift first
  const sorted = [...bts].sort((a, b) => {
    if (a.impact === 'paradigm_shift' && b.impact !== 'paradigm_shift') return -1;
    if (b.impact === 'paradigm_shift' && a.impact !== 'paradigm_shift') return 1;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return (
    <div style={wrap}>
      <SectionTitle title="Percées Scientifiques" subtitle={`${bts.length} breakthroughs · fil d'actualité`} />

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
        {Object.entries(IMPACT_LABELS).map(([k, v]) => (
          <button key={k} onClick={() => setImpactFilter(impactFilter === k ? '' : k)} style={{
            ...filterBtnStyle, background: impactFilter === k ? `${IMPACT_COLORS[k]}20` : 'transparent',
            borderColor: impactFilter === k ? IMPACT_COLORS[k] : C.div, color: impactFilter === k ? IMPACT_COLORS[k] : C.t3,
          }}>{v}</button>
        ))}
      </div>

      {sorted.length === 0 ? (
        <EmptyState icon="↯" title="Aucune percée" subtitle="Les percées scientifiques apparaîtront ici." />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {sorted.map(bt => {
            const isParadigm = bt.impact === 'paradigm_shift';
            const dom = DOMAINS.find(d => d.id === bt.domain);
            return (
              <div key={bt.id} style={{
                background: isParadigm ? `linear-gradient(135deg, ${C.gold}18, ${C.cream})` : C.cream,
                border: `1px solid ${isParadigm ? C.gold : C.div}`,
                borderRadius: 6, padding: 16,
                borderLeft: isParadigm ? `4px solid ${C.gold}` : undefined,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                  <Pill label={dom?.short || bt.domain} color={dom?.color || C.t3} />
                  <Pill label={IMPACT_LABELS[bt.impact] || bt.impact} color={IMPACT_COLORS[bt.impact] || C.t3} />
                  <span style={{ fontFamily: MN, fontSize: 9, color: C.t3, marginLeft: 'auto' }}>{bt.date}</span>
                </div>
                <div style={{ fontFamily: GR, fontSize: 16, fontWeight: 700, fontStyle: 'italic', color: C.t1, marginBottom: 6, lineHeight: 1.3 }}>
                  {bt.title}
                </div>
                <div style={{ fontFamily: SN, fontSize: 11, color: C.t2, marginBottom: 8, lineHeight: 1.5 }}>{bt.summary}</div>
                <div style={{
                  padding: 10, borderRadius: 4,
                  background: `${BRIQUE_COLOR[bt.brique] || C.gold}10`,
                  border: `1px solid ${BRIQUE_COLOR[bt.brique] || C.gold}25`,
                }}>
                  <div style={{ fontFamily: MN, fontSize: 8, color: BRIQUE_COLOR[bt.brique] || C.gold, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 3 }}>
                    IMPLICATION EIGEN
                  </div>
                  <div style={{ fontFamily: SN, fontSize: 11, color: C.t1, lineHeight: 1.4 }}>{bt.eigen_implication}</div>
                </div>
                {bt.source && (
                  <div style={{ fontFamily: MN, fontSize: 9, color: C.t3, marginTop: 8 }}>
                    Source: {bt.url ? <a href={bt.url} target="_blank" rel="noopener noreferrer" style={{ color: C.noos }}>{bt.source}</a> : bt.source}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

const filterBtnStyle: React.CSSProperties = {
  fontFamily: MN, fontSize: 9, letterSpacing: 0.5, padding: '4px 10px',
  border: '1px solid', borderRadius: 4, cursor: 'pointer', background: 'transparent',
};
