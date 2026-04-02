'use client';

import { SUPPLY_CHAIN } from './minerals-data';

export function MineralsSupplyChain() {
  return (
    <div style={{ padding: '1.5rem 0' }}>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--gold-light)', marginBottom: '0.5rem' }}>Chaîne d&apos;Approvisionnement</div>
      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
        Pipeline de valeur mine→OEM : 6 étapes, goulots d&apos;étranglement, rôles EIGEN.
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {SUPPLY_CHAIN.map((s, i) => (
          <div key={i} className="info-card" style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <div style={{ width: 36, height: 36, borderRadius: 0, background: 'var(--bg-elevated)', border: '1px solid var(--border-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: 'var(--gold)', flexShrink: 0 }}>{i + 1}</div>
            <div style={{ flex: 1 }}>
              <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', color: 'var(--text)', marginBottom: '0.3rem' }}>{s.stage}</h4>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>{s.description}</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--gold)', marginBottom: '0.4rem' }}>Capture de valeur : {s.valueCapture} — {s.value}</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-faint)', marginBottom: '0.5rem' }}>Acteurs : {s.actors}</div>
              <div style={{ padding: '0.5rem 0.75rem', background: 'rgba(161,53,68,0.08)', borderLeft: '2px solid var(--red)', borderRadius: 0, fontSize: '0.75rem', marginBottom: '0.4rem' }}>
                <strong style={{ color: 'var(--red)' }}>Goulot :</strong> <span style={{ color: 'var(--text-muted)' }}>{s.bottleneck}</span>
              </div>
              <div style={{ padding: '0.5rem 0.75rem', background: 'rgba(201,169,110,0.08)', borderLeft: '2px solid var(--gold)', borderRadius: 0, fontSize: '0.75rem' }}>
                <strong style={{ color: 'var(--gold)' }}>EIGEN :</strong> <span style={{ color: 'var(--text-muted)' }}>{s.eigenRole}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
