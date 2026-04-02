'use client';

import { useState, useEffect } from 'react';
import { C, GR, MN, SN, wrap, PERSONAS as P_LIST } from './shared/constants';
import { SectionTitle } from './shared/SectionTitle';
import { StatCard } from './shared/StatCard';
import { Pill } from './shared/Pill';
import { fetchPlaybook } from '@/lib/acquisition/api';
import type { AcqPlaybook } from '@/lib/acquisition/types';

export default function PlaybookView({ subIdx = 0 }: { subIdx?: number }) {
  const [playbooks, setPlaybooks] = useState<AcqPlaybook[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPlaybook().then(setPlaybooks).catch(() => setPlaybooks([])).finally(() => setLoading(false));
  }, []);

  if (loading) return <div style={{ ...wrap, fontFamily: MN, fontSize: 10, color: C.t3 }}>Chargement playbook...</div>;

  if (playbooks.length === 0) {
    return (
      <div style={{ ...wrap, textAlign: 'center' }}>
        <div style={{ fontFamily: GR, fontSize: 16, fontStyle: 'italic', color: C.t2, marginBottom: 8 }}>Aucun playbook en base</div>
        <div style={{ fontFamily: SN, fontSize: 11, color: C.t3 }}>Les 6 playbooks persona (DRH, DPO, CTO, RSE, Achats, CFO) seront seedés prochainement.</div>
      </div>
    );
  }

  // Match by sub-tab index to persona
  const personaId = P_LIST[Math.min(subIdx, P_LIST.length - 1)]?.id;
  const pb = playbooks.find(p => p.persona === personaId) || playbooks[0];
  const persona = P_LIST.find(p => p.id === pb?.persona);
  const objections: { objection: string; reponse: string }[] = Array.isArray(pb?.objections) ? pb.objections : [];

  if (!pb) return null;

  return (
    <div style={wrap}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
        <Pill label={persona?.n || pb.persona} color={persona?.c || C.t3} />
        <span style={{ fontFamily: SN, fontSize: 12, color: C.t2 }}>{persona?.full}</span>
      </div>

      {/* Hook */}
      <div style={{
        padding: '20px 24px', background: `${persona?.c || C.gold}08`, border: `1px solid ${persona?.c || C.gold}25`,
        borderLeft: `4px solid ${persona?.c || C.gold}`, borderRadius: 3, marginBottom: 24,
      }}>
        <div style={{ fontFamily: MN, fontSize: 8, color: C.t3, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 6 }}>HOOK</div>
        <div style={{ fontFamily: GR, fontSize: 16, fontStyle: 'italic', color: C.t1, lineHeight: 1.4 }}>
          &ldquo;{pb.hook}&rdquo;
        </div>
      </div>

      {/* Script */}
      {pb.script && (
        <div style={{ marginBottom: 24 }}>
          <SectionTitle title="Script d'approche" />
          <div style={{ fontFamily: SN, fontSize: 12, color: C.t1, lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>{pb.script}</div>
        </div>
      )}

      {/* Objections */}
      {objections.length > 0 && (
        <div style={{ marginBottom: 24 }}>
          <SectionTitle title="Objections & Réponses" count={objections.length} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {objections.map((o, i) => (
              <div key={i} style={{ padding: '12px 16px', background: C.ivory, border: `1px solid ${C.div}`, borderRadius: 3 }}>
                <div style={{ fontFamily: SN, fontSize: 11, color: C.ruby, fontWeight: 600, marginBottom: 6 }}>
                  {o.objection}
                </div>
                <div style={{ fontFamily: SN, fontSize: 11, color: C.t1, lineHeight: 1.5 }}>
                  {o.reponse}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Email template */}
      {pb.email_template && (
        <div style={{ marginBottom: 24 }}>
          <SectionTitle title="Template Email" />
          <pre style={{
            fontFamily: MN, fontSize: 10, color: C.t1, background: C.ivory, border: `1px solid ${C.div}`,
            borderRadius: 3, padding: 16, whiteSpace: 'pre-wrap', lineHeight: 1.6, overflowX: 'auto',
          }}>
            {pb.email_template}
          </pre>
        </div>
      )}

      {/* CAC / LTV */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
        <StatCard label="CAC" value={pb.cac || '—'} color={persona?.c || C.gold} />
        <StatCard label="LTV" value={pb.ltv || '—'} color={C.emerald} />
      </div>
    </div>
  );
}
