'use client';

import { useState, useEffect } from 'react';
import { C, GR, MN, SN, wrap, BRICKS } from './shared/constants';
import { Pill } from './shared/Pill';
import { fetchTrojanHorses } from '@/lib/acquisition/api';
import type { TrojanHorse, CascadeStep } from '@/lib/acquisition/types';

export default function TrojanHorseView() {
  const [horses, setHorses] = useState<TrojanHorse[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTrojanHorses()
      .then(d => { setHorses(d); setSelected(0); })
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div style={{ ...wrap, fontFamily: MN, fontSize: 10, color: C.t3 }}>Chargement chevaux de troie...</div>;

  if (error || horses.length === 0) {
    return (
      <div style={{ ...wrap, textAlign: 'center' }}>
        <div style={{ fontFamily: GR, fontSize: 18, fontStyle: 'italic', color: C.t2, marginBottom: 8 }}>
          Cheval de Troie
        </div>
        <div style={{ fontFamily: SN, fontSize: 11, color: C.t3 }}>
          {error ? `Erreur: ${error}` : 'Aucun cheval de troie en base. Les 11 fiches seront seedées prochainement.'}
        </div>
      </div>
    );
  }

  const h = horses[selected];
  const cascade: CascadeStep[] = Array.isArray(h.cascade) ? h.cascade : [];

  return (
    <div style={wrap}>
      {/* Selector buttons */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 24 }}>
        {horses.map((t, i) => (
          <button
            key={t.id}
            onClick={() => setSelected(i)}
            style={{
              padding: '6px 14px', borderRadius: 3, cursor: 'pointer', border: 'none',
              fontFamily: SN, fontSize: 11, fontWeight: selected === i ? 700 : 400,
              background: selected === i ? t.trojan_color : `${t.trojan_color}12`,
              color: selected === i ? '#fff' : t.trojan_color,
              transition: 'all 0.15s',
            }}
          >
            {t.trojan_emoji && <span style={{ marginRight: 4 }}>{t.trojan_emoji}</span>}
            {t.group_name}
          </button>
        ))}
      </div>

      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 6 }}>
          <span style={{ fontFamily: GR, fontSize: 22, fontWeight: 700, fontStyle: 'italic', color: C.t1 }}>
            {h.group_name}
          </span>
          <span style={{ fontFamily: MN, fontSize: 9, color: C.t3 }}>{h.market} · {h.sector}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <span style={{ fontFamily: SN, fontSize: 11, color: C.t2 }}>
            {h.contact_name}
          </span>
          <span style={{ fontFamily: MN, fontSize: 9, color: C.t3 }}>— {h.contact_relation}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontFamily: GR, fontSize: 16, fontStyle: 'italic', fontWeight: 700, color: h.trojan_color }}>
            {h.trojan_name}
          </span>
          {h.trojan_emoji && <span style={{ fontSize: 18 }}>{h.trojan_emoji}</span>}
          <span style={{ fontFamily: MN, fontSize: 12, fontWeight: 700, color: C.emerald }}>{h.total_value}</span>
        </div>
      </div>

      {/* One-liner */}
      <div style={{
        padding: '16px 20px', borderRadius: 3, marginBottom: 24,
        background: `${h.trojan_color}0A`, border: `1px solid ${h.trojan_color}33`,
        borderLeft: `4px solid ${h.trojan_color}`,
      }}>
        <div style={{ fontFamily: GR, fontSize: 14, fontStyle: 'italic', color: C.t1, lineHeight: 1.5 }}>
          &ldquo;{h.trojan_one_liner}&rdquo;
        </div>
      </div>

      {/* Two columns */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 24 }}>
        {/* Left column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Emotional core */}
          <div>
            <div style={{ fontFamily: MN, fontSize: 8, color: C.t3, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 8 }}>
              NOYAU ÉMOTIONNEL
            </div>
            <div style={{ fontFamily: SN, fontSize: 11, color: C.t1, lineHeight: 1.7 }}>
              {h.emotional_core}
            </div>
          </div>

          {/* Mechanism */}
          <div>
            <div style={{ fontFamily: MN, fontSize: 8, color: C.t3, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 8 }}>
              MÉCANISME
            </div>
            <div style={{ fontFamily: SN, fontSize: 11, color: C.t1, lineHeight: 1.7 }}>
              {h.trojan_mechanism}
            </div>
          </div>

          {/* Free deliverable */}
          <div style={{
            padding: '14px 16px', borderRadius: 3,
            background: `${C.emerald}0A`, border: `1px solid ${C.emerald}25`,
          }}>
            <div style={{ fontFamily: MN, fontSize: 8, color: C.emerald, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 8 }}>
              LIVRABLE GRATUIT
            </div>
            <div style={{ fontFamily: SN, fontSize: 11, color: C.t1, lineHeight: 1.7 }}>
              {h.free_deliverable}
            </div>
          </div>
        </div>

        {/* Right column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Cascade */}
          <div>
            <div style={{ fontFamily: MN, fontSize: 8, color: C.t3, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 12 }}>
              CASCADE — {cascade.length} ÉTAPES
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {cascade.map((step, i) => (
                <div key={i} style={{ display: 'flex', gap: 12, position: 'relative' }}>
                  {/* Vertical line + number */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 24, flexShrink: 0 }}>
                    <div style={{
                      width: 20, height: 20, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: h.trojan_color, color: '#fff', fontFamily: MN, fontSize: 9, fontWeight: 700,
                    }}>
                      {i + 1}
                    </div>
                    {i < cascade.length - 1 && (
                      <div style={{ width: 2, flex: 1, minHeight: 24, background: `${h.trojan_color}30` }} />
                    )}
                  </div>
                  {/* Content */}
                  <div style={{ paddingBottom: 16, flex: 1 }}>
                    <div style={{ fontFamily: SN, fontSize: 11, color: C.t1, lineHeight: 1.5, marginBottom: 4 }}>
                      {step.step}
                    </div>
                    <div style={{ display: 'flex', gap: 4, marginBottom: 4, flexWrap: 'wrap' }}>
                      {step.brick.split('+').map((b, j) => {
                        const brickName = b.trim();
                        const brick = BRICKS.find(br => brickName.toUpperCase().includes(br.n.toUpperCase()));
                        return <Pill key={j} label={brickName.trim()} color={brick?.c || h.trojan_color} />;
                      })}
                    </div>
                    <div style={{ fontFamily: MN, fontSize: 9, color: C.t3, fontStyle: 'italic' }}>
                      → {step.next}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Why irresistible */}
          <div style={{
            padding: '14px 16px', borderRadius: 3,
            background: `${C.gold}0A`, border: `1px solid ${C.gold}25`,
          }}>
            <div style={{ fontFamily: MN, fontSize: 8, color: C.gold, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 8 }}>
              POURQUOI C'EST IRRÉSISTIBLE
            </div>
            <div style={{ fontFamily: GR, fontSize: 12, fontStyle: 'italic', color: C.t1, lineHeight: 1.6 }}>
              {h.why_irresistible}
            </div>
          </div>
        </div>
      </div>

      {/* Entry brique */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px',
        background: C.ivory, border: `1px solid ${C.div}`, borderRadius: 3,
      }}>
        <span style={{ fontFamily: MN, fontSize: 8, color: C.t3, letterSpacing: 1.5, textTransform: 'uppercase' }}>
          BRIQUE D'ENTRÉE
        </span>
        <div style={{ display: 'flex', gap: 4 }}>
          {h.entry_brique.split('+').map((b, i) => {
            const brickName = b.trim();
            const brick = BRICKS.find(br => brickName.toUpperCase().includes(br.n.toUpperCase()));
            return <Pill key={i} label={brickName} color={brick?.c || h.trojan_color} />;
          })}
        </div>
      </div>
    </div>
  );
}
