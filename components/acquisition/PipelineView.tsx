'use client';

import { useState, useEffect } from 'react';
import { C, GR, MN, SN, wrap, STAGES, STAGE_LABELS, SECTORS } from './shared/constants';
import { SectionTitle } from './shared/SectionTitle';
import { ScoreBadge } from './shared/ScoreBadge';
import { Pill } from './shared/Pill';
import { fetchCompanies } from '@/lib/acquisition/api';
import type { AcqCompany } from '@/lib/acquisition/types';

export default function PipelineView() {
  const [companies, setCompanies] = useState<AcqCompany[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCompanies().then(setCompanies).catch(() => setCompanies([])).finally(() => setLoading(false));
  }, []);

  if (loading) return <div style={{ ...wrap, fontFamily: MN, fontSize: 10, color: C.t3 }}>Chargement pipeline...</div>;

  const grouped: Record<string, AcqCompany[]> = {};
  for (const s of STAGES) grouped[s] = [];
  for (const c of companies) {
    if (grouped[c.pipeline_stage]) grouped[c.pipeline_stage].push(c);
    else if (grouped['identified']) grouped['identified'].push(c);
  }

  const stageColors: Record<string, string> = {
    identified: C.t3, qualified: C.sapphire, approached: C.yrknown,
    demo: C.accent, negotiation: C.myne, signed: C.emerald, churned: C.ruby,
  };

  return (
    <div style={wrap}>
      <SectionTitle title="Pipeline" count={companies.length} />
      <div style={{ display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 16 }}>
        {STAGES.map(stage => {
          const items = grouped[stage] || [];
          const color = stageColors[stage] || C.t3;
          return (
            <div key={stage} style={{ minWidth: 180, flex: 1 }}>
              {/* Column header */}
              <div style={{
                padding: '8px 12px', background: `${color}15`, borderTop: `3px solid ${color}`,
                borderRadius: '3px 3px 0 0', marginBottom: 8,
              }}>
                <div style={{ fontFamily: MN, fontSize: 8, letterSpacing: 1.5, textTransform: 'uppercase', color }}>{STAGE_LABELS[stage]}</div>
                <div style={{ fontFamily: GR, fontSize: 20, fontWeight: 400, color }}>{items.length}</div>
              </div>
              {/* Cards */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {items.slice(0, 20).map(c => (
                  <div key={c.id} style={{
                    padding: '8px 10px', background: C.nacre, border: `0.5px solid ${C.div}`, borderRadius: 0,
                  }}>
                    <div style={{ fontFamily: GR, fontSize: 11, fontWeight: 400, color: C.t1, marginBottom: 4, lineHeight: 1.2 }}>
                      {c.name}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <Pill label={SECTORS[c.sector] || c.sector} />
                      <ScoreBadge score={c.eigen_score} />
                      <Pill label={c.priority} color={c.priority === 'P0' ? C.ruby : c.priority === 'P1' ? C.accent : C.t3} />
                    </div>
                  </div>
                ))}
                {items.length > 20 && (
                  <div style={{ fontFamily: MN, fontSize: 8, color: C.t3, textAlign: 'center', padding: 8 }}>
                    +{items.length - 20} autres
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
