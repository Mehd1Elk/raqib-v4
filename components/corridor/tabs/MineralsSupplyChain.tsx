'use client';

import { SUPPLY_CHAIN } from '@/lib/corridor/minerals-data';

export default function MineralsSupplyChain() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: 'var(--gold-light)' }}>Chaine de valeur — 6 etapes mine-to-recycling</h3>

      {/* Pipeline vertical */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
        {SUPPLY_CHAIN.map((s, i) => (
          <div key={s.stage} style={{ display: 'flex', gap: 20 }}>
            {/* Left: stage number + connector */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 48, flexShrink: 0 }}>
              <div style={{
                width: 36, height: 36, borderRadius: 0,
                background: 'var(--bg-elevated)', border: '2px solid var(--gold)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'var(--font-display)', fontSize: '1rem', color: 'var(--gold)', fontWeight: 600,
                zIndex: 1,
              }}>
                {i + 1}
              </div>
              {i < SUPPLY_CHAIN.length - 1 && (
                <div style={{ width: 2, flex: 1, background: 'var(--border)', minHeight: 20 }} />
              )}
            </div>

            {/* Right: content card */}
            <div style={{
              flex: 1, marginBottom: 16,
              background: 'var(--bg-elevated)', border: '1px solid var(--border)',
              borderRadius: 'var(--radius)', padding: 16,
            }}>
              <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text)' }}>{s.stage}</div>
              <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', marginTop: 4, lineHeight: 1.5 }}>{s.description}</div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 12 }}>
                <div>
                  <div style={{ fontSize: '0.58rem', color: 'var(--text-faint)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Acteurs</div>
                  <div style={{ fontSize: '0.66rem', color: 'var(--text-muted)', marginTop: 2 }}>{s.actors}</div>
                </div>
                <div style={{ display: 'flex', gap: 12 }}>
                  <div>
                    <div style={{ fontSize: '0.58rem', color: 'var(--text-faint)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Capture valeur</div>
                    <div style={{ fontSize: '0.82rem', fontFamily: 'var(--font-display)', color: 'var(--gold)', fontWeight: 600, marginTop: 2 }}>{s.valueCapture}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.58rem', color: 'var(--text-faint)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Prix/kg</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text)', marginTop: 2 }}>{s.value}</div>
                  </div>
                </div>
              </div>

              {/* Bottleneck */}
              <div style={{ marginTop: 10, padding: '8px 12px', background: 'rgba(161,53,68,0.08)', border: '1px solid rgba(161,53,68,0.2)', borderRadius: 'var(--radius)' }}>
                <div style={{ fontSize: '0.58rem', color: '#A13544', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 600 }}>Goulot d'etranglement</div>
                <div style={{ fontSize: '0.66rem', color: '#E07850', marginTop: 2 }}>{s.bottleneck}</div>
              </div>

              {/* EIGEN role */}
              <div style={{ marginTop: 8, padding: '8px 12px', background: 'rgba(201,169,110,0.06)', border: '1px solid var(--border-gold)', borderRadius: 'var(--radius)' }}>
                <div style={{ fontSize: '0.58rem', color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 600 }}>Role EIGEN</div>
                <div style={{ fontSize: '0.66rem', color: 'var(--gold-dim)', marginTop: 2 }}>{s.eigenRole}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* B2B2C Multiplier Card */}
      <div style={{
        background: 'var(--bg-elevated)',
        border: '2px solid var(--border-gold)',
        borderRadius: 'var(--radius)',
        padding: 24,
      }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: 'var(--gold)', marginBottom: 12 }}>Multiplicateur B2B2C</div>
        <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
          La cascade fonctionne ainsi : un OEM automobile (ex: Stellantis) signe un contrat MADEN pour le passeport batterie (Battery Regulation 2027). Cette obligation se propage en cascade vers les Tier 1 (CATL, Northvolt), qui l'imposent aux raffineurs (stade 3), qui l'imposent aux concentrateurs (stade 2), qui la propagent aux mines (stade 1). Un seul contrat OEM active 50-200 sites miniers.
        </div>
        <div style={{ display: 'flex', gap: 8, marginTop: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
          {['OEM', '\u2192', 'Tier 1', '\u2192', 'Raffineur', '\u2192', 'Concentrateur', '\u2192', 'Mine'].map((step, i) => (
            step === '\u2192' ? (
              <span key={i} style={{ color: 'var(--gold-dim)', fontSize: '1rem', alignSelf: 'center' }}>{step}</span>
            ) : (
              <span key={i} style={{
                padding: '6px 14px', background: 'var(--bg)', border: '1px solid var(--border-gold)',
                borderRadius: 'var(--radius)', fontSize: '0.72rem', color: 'var(--gold)',
              }}>{step}</span>
            )
          ))}
        </div>
      </div>
    </div>
  );
}
