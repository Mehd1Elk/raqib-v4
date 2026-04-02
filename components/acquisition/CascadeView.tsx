'use client';

import { useState, useEffect } from 'react';
import { C, GR, MN, SN, wrap, PERSONAS as P_LIST, BRICKS } from './shared/constants';
import { SectionTitle } from './shared/SectionTitle';
import { Pill } from './shared/Pill';
import { fetchCompanies, fetchPlaybook } from '@/lib/acquisition/api';
import { computePersonas } from '@/lib/acquisition/engine';
import type { AcqCompany, AcqPlaybook, PersonaType } from '@/lib/acquisition/types';

export default function CascadeView() {
  const [companies, setCompanies] = useState<AcqCompany[]>([]);
  const [playbooks, setPlaybooks] = useState<AcqPlaybook[]>([]);
  const [selected, setSelected] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([fetchCompanies({ limit: '50' }), fetchPlaybook()])
      .then(([c, p]) => { setCompanies(c); setPlaybooks(p); if (c.length > 0) setSelected(c[0].id); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div style={{ ...wrap, fontFamily: MN, fontSize: 10, color: C.t3 }}>Chargement cascade...</div>;

  const company = companies.find(c => c.id === selected);
  const applicable = company ? computePersonas(company.eigen_briques || '') : [];
  const applicableCount = applicable.length;

  return (
    <div style={wrap}>
      <SectionTitle title="Cascade Personas" />

      {/* Selector */}
      <div style={{ marginBottom: 20 }}>
        <select
          value={selected}
          onChange={e => setSelected(e.target.value)}
          style={{
            padding: '8px 12px', border: `0.5px solid ${C.div}`, borderRadius: 0,
            fontFamily: GR, fontSize: 14, fontStyle: 'italic', fontWeight: 700, color: C.t1,
            background: C.nacre, minWidth: 300,
          }}
        >
          {companies.map(c => <option key={c.id} value={c.id}>{c.name} — {c.hq}</option>)}
        </select>
      </div>

      {company && (
        <>
          {/* Progress bar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
            <div style={{ flex: 1, height: 6, background: C.divL, borderRadius: 0 }}>
              <div style={{ width: `${(applicableCount / 6) * 100}%`, height: '100%', background: C.accent, borderRadius: 0, transition: 'width 0.3s' }} />
            </div>
            <span style={{ fontFamily: MN, fontSize: 10, color: C.accent, fontWeight: 700 }}>{applicableCount}/6 personas</span>
          </div>

          {/* 6 persona blocks */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {P_LIST.map(p => {
              const isApplicable = applicable.includes(p.id as PersonaType);
              const playbook = playbooks.find(pb => pb.persona === p.id);

              return (
                <div key={p.id} style={{
                  padding: '16px 20px', borderRadius: 0, border: `0.5px solid ${isApplicable ? p.c + '40' : C.div}`,
                  background: isApplicable ? `${p.c}08` : C.nacreDark, opacity: isApplicable ? 1 : 0.5,
                  transition: 'opacity 0.2s',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                    <Pill label={p.n} color={isApplicable ? p.c : C.t4} />
                    <span style={{ fontFamily: SN, fontSize: 11, color: isApplicable ? C.t1 : C.t3 }}>{p.full}</span>
                    {isApplicable && (
                      <div style={{ marginLeft: 'auto', display: 'flex', gap: 4 }}>
                        {p.buys.map(b => {
                          const brick = BRICKS.find(br => br.id === b);
                          return brick ? <Pill key={b} label={brick.n} color={brick.c} /> : null;
                        })}
                      </div>
                    )}
                  </div>
                  {isApplicable && playbook && (
                    <div style={{ marginTop: 8 }}>
                      <div style={{ fontFamily: GR, fontSize: 13, fontStyle: 'italic', color: C.t1, marginBottom: 4 }}>
                        &ldquo;{playbook.hook}&rdquo;
                      </div>
                      <div style={{ display: 'flex', gap: 16, fontFamily: MN, fontSize: 9, color: C.t3 }}>
                        <span>CAC: {playbook.cac}</span>
                        <span>LTV: {playbook.ltv}</span>
                      </div>
                    </div>
                  )}
                  {isApplicable && !playbook && (
                    <div style={{ fontFamily: SN, fontSize: 10, color: C.t3, fontStyle: 'italic', marginTop: 4 }}>
                      Playbook non seedé pour ce persona.
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
