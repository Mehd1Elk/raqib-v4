'use client';

import { useState, useEffect } from 'react';
import { C, GR, SN, MN, wrap } from './shared/constants';
import SectionTitle from './shared/SectionTitle';
import Pill from './shared/Pill';
import StatCard from './shared/StatCard';
import EmptyState from './shared/EmptyState';
import type { SciPaper, SciBreakthrough } from '@/lib/science/types';

const Q = '#6366F1'; // Quantum indigo

const QUANTUM_AXES = [
  { label: 'Post-Quantum Crypto', brique: 'burhan', impact: 'ML-KEM, ML-DSA migration urgente pour BURHAN' },
  { label: 'Quantum ML', brique: 'noos', impact: 'QML pourrait accélérer les modèles NOOS de 100×' },
  { label: 'Quantum Key Distribution', brique: 'aelya', impact: 'QKD pour canal consent inviolable ÆLYA' },
  { label: 'Quantum-Resistant Blockchain', brique: 'burhan', impact: 'Tous les smart contracts BURHAN doivent être PQ-safe' },
  { label: 'Quantum Finance', brique: 'mizan', impact: 'Avantage algorithmique pour FX et settlement MIZAN' },
  { label: 'Quantum Sensing', brique: 'raqib', impact: 'Capteurs quantiques pour intelligence territoriale RAQIB' },
];

const QDAY_TIMELINE = [
  { year: 2024, event: 'NIST publie FIPS 203/204/205 (ML-KEM, ML-DSA, SLH-DSA)', status: 'done' },
  { year: 2025, event: 'Google Willow: 105 qubits, sous seuil correction erreur', status: 'done' },
  { year: 2026, event: 'IBM Starling: 1121 qubits, Shor sur RSA 50-bit', status: 'current' },
  { year: 2027, event: 'Estimation: 4000+ qubits logiques — début migration enterprise', status: 'future' },
  { year: 2029, event: 'Estimation: RSA-2048 menacé — deadline migration BURHAN', status: 'future' },
  { year: 2031, event: 'Q-Day estimé: RSA/ECDSA cassés — tous systèmes doivent être PQ', status: 'future' },
];

export default function QuantumWatchView() {
  const [papers, setPapers] = useState<SciPaper[]>([]);
  const [breakthroughs, setBreakthroughs] = useState<SciBreakthrough[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/api/science/papers?q=quantum').then(r => r.json()),
      fetch('/api/science/breakthroughs').then(r => r.json()),
    ])
      .then(([p, b]) => {
        setPapers(Array.isArray(p) ? p : []);
        const qb = Array.isArray(b) ? b.filter((bt: SciBreakthrough) => bt.title.toLowerCase().includes('quantum') || bt.summary.toLowerCase().includes('quantum') || bt.summary.toLowerCase().includes('post-quantum')) : [];
        setBreakthroughs(qb);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div style={{ ...wrap, fontFamily: GR, fontStyle: 'italic', color: C.t3 }}>Chargement…</div>;

  return (
    <div style={wrap}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: Q, boxShadow: `0 0 12px ${Q}60` }} />
        <SectionTitle title="Quantum Watch" subtitle="Veille quantique transversale · 7 briques · timeline Q-Day" />
      </div>

      {/* Stats */}
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 32 }}>
        <StatCard label="Papers quantiques" value={papers.length} accent={Q} />
        <StatCard label="Q-Day estimé" value="~2031" accent={C.ruby} />
        <StatCard label="Standards PQ" value="3 FIPS" accent={C.emerald} />
        <StatCard label="Briques impactées" value="7/7" accent={C.gold} />
      </div>

      {/* Q-Day Timeline */}
      <SectionTitle title="Timeline Q-Day" subtitle="Jalons critiques vers la suprématie quantique cryptographique" />
      <div style={{ background: C.cream, borderRadius: 8, border: `1px solid ${C.div}`, padding: 20, marginBottom: 32 }}>
        <div style={{ position: 'relative', paddingLeft: 20 }}>
          {QDAY_TIMELINE.map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: 16, marginBottom: i < QDAY_TIMELINE.length - 1 ? 20 : 0, position: 'relative' }}>
              {/* Vertical line */}
              {i < QDAY_TIMELINE.length - 1 && (
                <div style={{ position: 'absolute', left: -14, top: 12, width: 1, height: 'calc(100% + 8px)', background: item.status === 'done' ? Q : C.div }} />
              )}
              {/* Dot */}
              <div style={{
                position: 'absolute', left: -18, top: 4, width: 9, height: 9, borderRadius: '50%',
                background: item.status === 'current' ? Q : item.status === 'done' ? `${Q}80` : C.div,
                border: item.status === 'current' ? `2px solid ${Q}` : 'none',
                boxShadow: item.status === 'current' ? `0 0 8px ${Q}60` : 'none',
              }} />
              <div>
                <div style={{ fontFamily: MN, fontSize: 11, fontWeight: 700, color: item.status === 'current' ? Q : item.status === 'done' ? C.t1 : C.t3 }}>
                  {item.year}
                </div>
                <div style={{ fontFamily: SN, fontSize: 11, color: item.status === 'future' ? C.t3 : C.t1, lineHeight: 1.4 }}>
                  {item.event}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quantum Impact per Brique */}
      <SectionTitle title="Impact par Brique" subtitle="Comment le quantique affecte chaque composant Eigen" />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 10, marginBottom: 32 }}>
        {QUANTUM_AXES.map((axis, i) => (
          <div key={i} style={{
            background: C.cream, borderRadius: 6, padding: 14,
            border: `1px solid ${C.div}`, borderLeft: `3px solid ${Q}`,
          }}>
            <div style={{ fontFamily: GR, fontSize: 14, fontWeight: 700, fontStyle: 'italic', color: C.t1, marginBottom: 4 }}>
              {axis.label}
            </div>
            <Pill label={axis.brique.toUpperCase()} color={Q} />
            <div style={{ fontFamily: SN, fontSize: 11, color: C.t2, marginTop: 8, lineHeight: 1.4 }}>{axis.impact}</div>
          </div>
        ))}
      </div>

      {/* Quantum Papers */}
      {papers.length > 0 && (
        <>
          <SectionTitle title="Papers Quantiques" subtitle={`${papers.length} publications liées au quantique`} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 32 }}>
            {papers.map(p => (
              <div key={p.id} style={{
                background: C.cream, borderRadius: 6, padding: '10px 14px',
                border: `1px solid ${C.div}`, borderLeft: `3px solid ${Q}`,
              }}>
                <div style={{ fontFamily: GR, fontSize: 13, fontWeight: 700, fontStyle: 'italic', color: C.t1, marginBottom: 2 }}>{p.title}</div>
                <div style={{ fontFamily: SN, fontSize: 10, color: C.t2 }}>
                  {Array.isArray(p.authors) ? p.authors.join(', ') : p.authors} — {p.year} — {p.journal}
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Quantum Breakthroughs */}
      {breakthroughs.length > 0 && (
        <>
          <SectionTitle title="Percées Quantiques" subtitle="Breakthroughs liées au computing quantique" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {breakthroughs.map(bt => (
              <div key={bt.id} style={{
                background: `linear-gradient(135deg, ${Q}08, ${C.cream})`,
                border: `1px solid ${Q}30`, borderRadius: 6, padding: '12px 16px',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                  <Pill label="QUANTUM" color={Q} />
                  <span style={{ fontFamily: MN, fontSize: 9, color: C.t3, marginLeft: 'auto' }}>{bt.date}</span>
                </div>
                <div style={{ fontFamily: GR, fontSize: 14, fontWeight: 700, fontStyle: 'italic', color: C.t1, marginBottom: 4 }}>{bt.title}</div>
                <div style={{ fontFamily: SN, fontSize: 11, color: C.t2, lineHeight: 1.4 }}>{bt.summary}</div>
              </div>
            ))}
          </div>
        </>
      )}

      {papers.length === 0 && breakthroughs.length === 0 && (
        <EmptyState icon="⊗" title="Veille quantique" subtitle="Les papers et breakthroughs quantiques apparaîtront ici après le seed des données." />
      )}
    </div>
  );
}
