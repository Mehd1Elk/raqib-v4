'use client';

import { useState, useEffect, useMemo } from 'react';
import { C, GR, MN, SN, wrap, BRICKS } from './shared/constants';
import { Pill } from './shared/Pill';
import { ScoreBadge } from './shared/ScoreBadge';
import { fetchTrojanHorses } from '@/lib/acquisition/api';
import type { TrojanHorse, CascadeStep } from '@/lib/acquisition/types';

export default function TrojanHorseView() {
  const [horses, setHorses] = useState<TrojanHorse[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(0);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [filterSector, setFilterSector] = useState('');

  useEffect(() => {
    fetchTrojanHorses()
      .then(d => { setHorses(d); setSelected(0); })
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  // Unique sectors
  const sectors = useMemo(() => {
    const s = new Set(horses.map(h => h.sector).filter(Boolean));
    return Array.from(s).sort();
  }, [horses]);

  // Filtered list
  const filtered = useMemo(() => {
    return horses.filter(h => {
      if (filterSector && h.sector !== filterSector) return false;
      if (search) {
        const q = search.toLowerCase();
        return h.group_name.toLowerCase().includes(q) ||
          h.trojan_name.toLowerCase().includes(q) ||
          h.entry_brique.toLowerCase().includes(q) ||
          h.market.toLowerCase().includes(q);
      }
      return true;
    });
  }, [horses, search, filterSector]);

  if (loading) return <div style={{ ...wrap, fontFamily: MN, fontSize: 10, color: C.t3 }}>Chargement chevaux de troie...</div>;

  if (error || horses.length === 0) {
    return (
      <div style={{ ...wrap, textAlign: 'center' }}>
        <div style={{ fontFamily: GR, fontSize: 18, fontStyle: 'italic', color: C.t2, marginBottom: 8 }}>Cheval de Troie</div>
        <div style={{ fontFamily: SN, fontSize: 11, color: C.t3 }}>{error ? `Erreur: ${error}` : 'Aucun cheval de troie en base.'}</div>
      </div>
    );
  }

  const safeIdx = Math.min(selected, filtered.length - 1);
  const h = filtered[safeIdx >= 0 ? safeIdx : 0];
  if (!h) return null;
  const cascade: CascadeStep[] = Array.isArray(h.cascade) ? h.cascade : [];

  return (
    <div style={{ display: 'flex', height: '100%', overflow: 'hidden' }}>
      {/* Left panel — list */}
      <div style={{
        width: 280, minWidth: 280, borderRight: `1px solid ${C.div}`,
        display: 'flex', flexDirection: 'column', background: C.ivory,
      }}>
        {/* Search + count */}
        <div style={{ padding: '12px 12px 8px' }}>
          <div style={{ fontFamily: MN, fontSize: 8, color: C.t3, letterSpacing: 1.5, marginBottom: 8 }}>
            {filtered.length} / {horses.length} CHEVAUX DE TROIE
          </div>
          <input
            placeholder="Rechercher..."
            value={search}
            onChange={e => { setSearch(e.target.value); setSelected(0); }}
            style={{
              width: '100%', padding: '6px 10px', border: `1px solid ${C.div}`, borderRadius: 2,
              fontFamily: SN, fontSize: 10, color: C.t1, background: C.cream, outline: 'none',
              boxSizing: 'border-box',
            }}
          />
        </div>

        {/* Sector filter */}
        <div style={{ padding: '0 12px 8px', display: 'flex', flexWrap: 'wrap', gap: 4 }}>
          <button onClick={() => { setFilterSector(''); setSelected(0); }} style={{
            padding: '2px 8px', borderRadius: 2, border: `1px solid ${!filterSector ? C.gold : C.div}`,
            background: !filterSector ? `${C.gold}20` : 'transparent',
            fontFamily: MN, fontSize: 7, color: !filterSector ? C.gold : C.t3, cursor: 'pointer',
          }}>Tous</button>
          {sectors.map(s => (
            <button key={s} onClick={() => { setFilterSector(filterSector === s ? '' : s); setSelected(0); }} style={{
              padding: '2px 8px', borderRadius: 2, border: `1px solid ${filterSector === s ? C.gold : C.div}`,
              background: filterSector === s ? `${C.gold}20` : 'transparent',
              fontFamily: MN, fontSize: 7, color: filterSector === s ? C.gold : C.t3, cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}>{s}</button>
          ))}
        </div>

        {/* Scrollable list */}
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {filtered.map((t, i) => {
            const isActive = i === safeIdx;
            return (
              <button
                key={t.id}
                onClick={() => setSelected(i)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 8, width: '100%',
                  padding: '8px 12px', border: 'none', cursor: 'pointer', textAlign: 'left',
                  background: isActive ? `${t.trojan_color}15` : 'transparent',
                  borderLeft: isActive ? `3px solid ${t.trojan_color}` : '3px solid transparent',
                  transition: 'background 0.1s',
                }}
              >
                <span style={{ fontSize: 12, flexShrink: 0 }}>{t.trojan_emoji || '🎯'}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    fontFamily: isActive ? GR : SN, fontStyle: isActive ? 'italic' : 'normal',
                    fontWeight: isActive ? 700 : 400, fontSize: 11, color: isActive ? C.t1 : C.t2,
                    whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                  }}>
                    {t.group_name}
                  </div>
                  <div style={{ fontFamily: MN, fontSize: 8, color: C.t3, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {t.market} · {t.entry_brique}
                  </div>
                </div>
                <span style={{
                  fontFamily: MN, fontSize: 8, fontWeight: 700, color: C.emerald,
                  whiteSpace: 'nowrap', flexShrink: 0,
                }}>
                  {t.total_value}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Right panel — detail */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '24px 32px' }}>
        {/* Header */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 6 }}>
            <span style={{ fontFamily: GR, fontSize: 22, fontWeight: 700, fontStyle: 'italic', color: C.t1 }}>
              {h.group_name}
            </span>
            <span style={{ fontFamily: MN, fontSize: 9, color: C.t3 }}>{h.market} · {h.sector}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
            <span style={{ fontFamily: SN, fontSize: 11, color: C.t2 }}>{h.contact_name}</span>
            {h.contact_relation && <span style={{ fontFamily: MN, fontSize: 9, color: C.t3 }}>— {h.contact_relation}</span>}
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
          {/* Left */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div>
              <div style={{ fontFamily: MN, fontSize: 8, color: C.t3, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 8 }}>NOYAU ÉMOTIONNEL</div>
              <div style={{ fontFamily: SN, fontSize: 11, color: C.t1, lineHeight: 1.7 }}>{h.emotional_core}</div>
            </div>
            <div>
              <div style={{ fontFamily: MN, fontSize: 8, color: C.t3, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 8 }}>MÉCANISME</div>
              <div style={{ fontFamily: SN, fontSize: 11, color: C.t1, lineHeight: 1.7, whiteSpace: 'pre-line' }}>{h.trojan_mechanism}</div>
            </div>
            <div style={{ padding: '14px 16px', borderRadius: 3, background: `${C.emerald}0A`, border: `1px solid ${C.emerald}25` }}>
              <div style={{ fontFamily: MN, fontSize: 8, color: C.emerald, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 8 }}>LIVRABLE GRATUIT</div>
              <div style={{ fontFamily: SN, fontSize: 11, color: C.t1, lineHeight: 1.7 }}>{h.free_deliverable}</div>
            </div>
          </div>

          {/* Right */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* Cascade */}
            {cascade.length > 0 && (
              <div>
                <div style={{ fontFamily: MN, fontSize: 8, color: C.t3, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 12 }}>
                  CASCADE — {cascade.length} ÉTAPES
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  {cascade.map((step, i) => (
                    <div key={i} style={{ display: 'flex', gap: 12 }}>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 24, flexShrink: 0 }}>
                        <div style={{
                          width: 20, height: 20, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                          background: h.trojan_color, color: '#fff', fontFamily: MN, fontSize: 9, fontWeight: 700,
                        }}>{i + 1}</div>
                        {i < cascade.length - 1 && <div style={{ width: 2, flex: 1, minHeight: 24, background: `${h.trojan_color}30` }} />}
                      </div>
                      <div style={{ paddingBottom: 16, flex: 1 }}>
                        <div style={{ fontFamily: SN, fontSize: 11, color: C.t1, lineHeight: 1.5, marginBottom: 4 }}>{step.step}</div>
                        <div style={{ display: 'flex', gap: 4, marginBottom: 4, flexWrap: 'wrap' }}>
                          {step.brick.split('+').map((b, j) => {
                            const bn = b.trim();
                            const brick = BRICKS.find(br => bn.toUpperCase().includes(br.n.toUpperCase()));
                            return <Pill key={j} label={bn} color={brick?.c || h.trojan_color} />;
                          })}
                        </div>
                        <div style={{ fontFamily: MN, fontSize: 9, color: C.t3, fontStyle: 'italic' }}>→ {step.next}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Why irresistible */}
            <div style={{ padding: '14px 16px', borderRadius: 3, background: `${C.gold}0A`, border: `1px solid ${C.gold}25` }}>
              <div style={{ fontFamily: MN, fontSize: 8, color: C.gold, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 8 }}>POURQUOI C'EST IRRÉSISTIBLE</div>
              <div style={{ fontFamily: GR, fontSize: 12, fontStyle: 'italic', color: C.t1, lineHeight: 1.6 }}>{h.why_irresistible}</div>
            </div>
          </div>
        </div>

        {/* Entry brique */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px',
          background: C.ivory, border: `1px solid ${C.div}`, borderRadius: 3,
        }}>
          <span style={{ fontFamily: MN, fontSize: 8, color: C.t3, letterSpacing: 1.5, textTransform: 'uppercase' }}>BRIQUE D'ENTRÉE</span>
          <div style={{ display: 'flex', gap: 4 }}>
            {h.entry_brique.split('+').map((b, i) => {
              const bn = b.trim();
              const brick = BRICKS.find(br => bn.toUpperCase().includes(br.n.toUpperCase()));
              return <Pill key={i} label={bn} color={brick?.c || h.trojan_color} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
