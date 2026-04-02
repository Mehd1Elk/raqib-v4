'use client';

import { useState } from 'react';
import { EU_INDUSTRIES } from '@/lib/corridor/minerals-data';

export default function MineralsIndustries() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: 'var(--gold-light)', marginBottom: 4 }}>7 Industries EU — Demande mineraux critiques</h3>
      <div style={{ fontSize: '0.66rem', color: 'var(--text-faint)', marginBottom: 8 }}>Cliquer pour developper les details de chaque industrie</div>

      {EU_INDUSTRIES.map(ind => {
        const isOpen = expanded === ind.id;
        return (
          <div
            key={ind.id}
            onClick={() => setExpanded(isOpen ? null : ind.id)}
            style={{
              background: 'var(--bg-elevated)',
              border: `1px solid ${isOpen ? ind.color + '40' : 'var(--border)'}`,
              borderRadius: 'var(--radius)',
              overflow: 'hidden',
              cursor: 'pointer',
              transition: 'border-color 0.3s',
            }}
          >
            {/* Header */}
            <div style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 36, height: 36, borderRadius: 0, background: ind.color + '18', display: 'flex', alignItems: 'center', justifyContent: 'center', color: ind.color, fontSize: '1rem', flexShrink: 0 }}>
                {ind.name.charAt(0)}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text)' }}>{ind.name}</div>
                <div style={{ display: 'flex', gap: 8, marginTop: 4, flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '0.6rem', color: 'var(--gold)', padding: '1px 6px', background: 'rgba(201,169,110,0.08)', borderRadius: 0, }}>{ind.growth} croissance</span>
                  <span style={{ fontSize: '0.6rem', color: 'var(--text-faint)' }}>{ind.minerals.length} mineraux requis</span>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>Risque appro.</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, justifyContent: 'flex-end', marginTop: 2 }}>
                  <div style={{ width: 60, height: 5, background: 'var(--bg-hover)', borderRadius: 0, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${ind.supplyRisk * 10}%`, background: ind.supplyRisk >= 8 ? '#A13544' : ind.supplyRisk >= 6 ? '#E07850' : '#C9A96E', borderRadius: 0, }} />
                  </div>
                  <span style={{ fontSize: '0.68rem', fontWeight: 600, color: ind.supplyRisk >= 8 ? '#A13544' : '#E07850' }}>{ind.supplyRisk}/10</span>
                </div>
              </div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-faint)', transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>{'\u25BC'}</div>
            </div>

            {/* Expanded */}
            {isOpen && (
              <div style={{ borderTop: '1px solid var(--border)', padding: 16, background: 'var(--bg)' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <div>
                    <div style={{ fontSize: '0.64rem', color: 'var(--text-faint)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Mineraux requis</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                      {ind.minerals.map(m => (
                        <span key={m} style={{ fontSize: '0.62rem', padding: '2px 8px', background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: 0, color: 'var(--text-muted)' }}>{m}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.64rem', color: 'var(--text-faint)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Demande 2030</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text)' }}>{ind.demand2030}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.64rem', color: 'var(--text-faint)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.5px' }}>OEM europeens</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                      {ind.euCompanies.map(c => (
                        <span key={c} style={{ fontSize: '0.62rem', padding: '2px 8px', background: ind.color + '10', border: `1px solid ${ind.color}30`, borderRadius: 0, color: ind.color }}>{c}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.64rem', color: 'var(--text-faint)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Impact CRMA</div>
                    <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>{ind.crmaImpact}</div>
                  </div>
                </div>
                <div style={{ marginTop: 12, padding: '8px 12px', background: 'rgba(201,169,110,0.06)', border: '1px solid var(--border-gold)', borderRadius: 'var(--radius)' }}>
                  <div style={{ fontSize: '0.6rem', color: 'var(--gold-dim)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Fournisseurs corridor</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--gold)', marginTop: 4 }}>{ind.corridorSuppliers}</div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
