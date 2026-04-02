'use client';

import { VENTURE_MODEL } from '@/lib/corridor/minerals-data';

export default function MadenVenture() {
  const v = VENTURE_MODEL;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      {/* Header */}
      <div style={{ textAlign: 'center', padding: '32px 0 16px' }}>
        <div style={{ fontSize: '3.5rem', fontWeight: 400, color: 'var(--gold)', lineHeight: 1 }}>{v.arabic}</div>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: 'var(--gold-light)', letterSpacing: 6, marginTop: 8 }}>{v.name}</div>
        <div style={{ fontSize: '0.7rem', color: 'var(--text-faint)', marginTop: 6 }}>{v.meaning}</div>
        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: 4, fontStyle: 'italic' }}>{v.tagline}</div>
      </div>

      {/* Thesis */}
      <div style={{
        border: '1px solid var(--border-gold)',
        borderRadius: 'var(--radius)',
        padding: '20px 24px',
        background: 'rgba(201,169,110,0.04)',
      }}>
        <div style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '0.88rem', color: 'var(--gold-light)', lineHeight: 1.7 }}>
          {v.thesis}
        </div>
      </div>

      {/* TAM / SAM / SOM */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
        {[v.tam, v.sam, v.som].map(m => (
          <div key={m.label} style={{
            background: 'var(--bg-elevated)', border: '1px solid var(--border)',
            borderRadius: 'var(--radius)', padding: 16, textAlign: 'center',
          }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', color: 'var(--gold)', fontWeight: 600 }}>{m.value}</div>
            <div style={{ fontSize: '0.68rem', color: 'var(--text)', marginTop: 4, fontWeight: 500 }}>{m.label}</div>
            <div style={{ fontSize: '0.62rem', color: 'var(--text-faint)', marginTop: 6, lineHeight: 1.5 }}>{m.desc}</div>
          </div>
        ))}
      </div>

      {/* Separator */}
      <div style={{ height: 1, background: 'var(--border)', margin: '0 40px' }} />

      {/* 7 EIGEN Integration Cards */}
      <div>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: 'var(--gold-light)', marginBottom: 16 }}>Integration EIGEN — 7 briques</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {v.eigenIntegration.map(b => (
            <div key={b.brique} style={{
              background: 'var(--bg-elevated)',
              borderLeft: `3px solid ${b.color}`,
              borderTop: '1px solid var(--border)',
              borderRight: '1px solid var(--border)',
              borderBottom: '1px solid var(--border)',
              borderRadius: 'var(--radius)',
              padding: '14px 16px',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{
                    width: 28, height: 28, borderRadius: '50%',
                    background: b.color + '18', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: b.color, fontWeight: 700, fontSize: '0.7rem',
                  }}>
                    {b.brique.charAt(0)}
                  </div>
                  <span style={{ fontWeight: 600, fontSize: '0.8rem', color: b.color }}>{b.brique}</span>
                </div>
                <span style={{
                  fontSize: '0.56rem', padding: '2px 8px',
                  background: 'rgba(201,169,110,0.08)', border: '1px solid var(--border-gold)',
                  borderRadius: 10, color: 'var(--gold-dim)',
                }}>{b.price}</span>
              </div>
              <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', marginTop: 8, lineHeight: 1.6 }}>{b.role}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Separator */}
      <div style={{ height: 1, background: 'var(--border)', margin: '0 40px' }} />

      {/* MVAC Hubs */}
      <div>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: 'var(--gold-light)', marginBottom: 8 }}>MVAC — Mineral Value-Addition Centers</h3>
        <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: 16 }}>{v.makerspaces}</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 12 }}>
          {v.hubs.map(h => (
            <div key={h.city} style={{
              background: 'var(--bg-elevated)',
              borderTop: '3px solid var(--gold)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius)',
              padding: 16,
            }}>
              <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text)' }}>{h.city}</div>
              <div style={{ fontSize: '0.66rem', color: 'var(--text-faint)', marginTop: 2 }}>{h.country}</div>
              <div style={{ fontSize: '0.68rem', color: 'var(--gold)', marginTop: 8 }}>{h.focus}</div>
              <div style={{ fontSize: '0.62rem', color: 'var(--text-muted)', marginTop: 6, lineHeight: 1.5 }}>{h.rationale}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10 }}>
                <span style={{ fontSize: '0.6rem', padding: '2px 8px', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 10, color: 'var(--text-faint)' }}>{h.type}</span>
                <span style={{ fontSize: '0.68rem', color: 'var(--gold)', fontWeight: 600 }}>{h.capex}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Separator */}
      <div style={{ height: 1, background: 'var(--border)', margin: '0 40px' }} />

      {/* Trojan Horse + Cascade EU */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div style={{
          background: 'var(--bg-elevated)', border: '1px solid var(--border)',
          borderRadius: 'var(--radius)', padding: 20,
        }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', color: 'var(--gold-light)', marginBottom: 10 }}>Trojan Horse Strategy</div>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>{v.trojanHorse}</div>
        </div>
        <div style={{
          background: 'var(--bg-elevated)', border: '1px solid var(--border)',
          borderRadius: 'var(--radius)', padding: 20,
        }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', color: 'var(--gold-light)', marginBottom: 10 }}>Cascade EU</div>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>{v.cascadeEU}</div>
        </div>
      </div>
    </div>
  );
}
