'use client';

import { useState, useEffect } from 'react';
import { C, GR, MN, SN, wrap, BRICKS } from './shared/constants';
import { SectionTitle } from './shared/SectionTitle';
import { Pill } from './shared/Pill';
import { fetchRegulations } from '@/lib/acquisition/api';
import type { AcqRegulation } from '@/lib/acquisition/types';

export default function ForcageLegalView() {
  const [regs, setRegs] = useState<AcqRegulation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRegulations().then(setRegs).catch(() => setRegs([])).finally(() => setLoading(false));
  }, []);

  if (loading) return <div style={{ ...wrap, fontFamily: MN, fontSize: 10, color: C.t3 }}>Chargement réglementations...</div>;

  if (regs.length === 0) {
    return (
      <div style={{ ...wrap, textAlign: 'center' }}>
        <div style={{ fontFamily: GR, fontSize: 16, fontStyle: 'italic', color: C.t2, marginBottom: 8 }}>Aucune réglementation en base</div>
        <div style={{ fontFamily: SN, fontSize: 11, color: C.t3 }}>Les 15 réglementations (AI Act, EHDS, CS3D, DORA, etc.) seront seedées prochainement.</div>
      </div>
    );
  }

  return (
    <div style={wrap}>
      <SectionTitle title="Forçage Légal" count={regs.length} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {regs.map(r => (
          <div key={r.id} style={{ padding: '16px 20px', background: C.ivory, border: `1px solid ${C.div}`, borderRadius: 3 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
              <span style={{ fontFamily: GR, fontSize: 15, fontWeight: 700, fontStyle: 'italic', color: C.t1 }}>{r.name}</span>
              <Pill label={r.status} color={r.status === 'En vigueur' ? C.emerald : r.status === 'Adopté' ? C.gold : C.yrknown} />
            </div>
            <div style={{ fontFamily: SN, fontSize: 11, color: C.t2, marginBottom: 8, lineHeight: 1.5 }}>{r.description}</div>
            <div style={{ display: 'flex', gap: 6, marginBottom: 8 }}>
              {(r.eigen_briques || '').split('').map(ch => {
                const brick = BRICKS.find(b => b.key === ch);
                return brick ? <Pill key={ch} label={brick.n} color={brick.c} /> : null;
              })}
            </div>
            <div style={{ display: 'flex', gap: 20, fontFamily: MN, fontSize: 9, color: C.t3 }}>
              <span>Deadline: {r.deadline || '—'}</span>
              <span>Sanction: {r.penalty || '—'}</span>
              <span>Secteurs: {r.applies_to_sectors?.join(', ') || 'Tous'}</span>
              <span>Min. employés: {r.applies_to_min_employees?.toLocaleString() || '0'}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
