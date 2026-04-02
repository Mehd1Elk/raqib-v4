'use client';

import { EXCHANGE_DATA } from '@/lib/corridor/minerals-data';

function getTrendIcon(trend: string): string {
  if (trend === 'up') return '\u25B2';
  if (trend === 'down') return '\u25BC';
  return '\u2014';
}

function getTrendColor(trend: string): string {
  if (trend === 'up') return '#5A8A3A';
  if (trend === 'down') return '#A13544';
  return 'var(--text-faint)';
}

function getCategoryBg(cat: string): string {
  const map: Record<string, string> = {
    'Batterie': '#D4AF37', 'Infrastructure': '#4A7B9D', 'Aimants': '#A13544',
    'Electronique': '#E07850', 'Defense': '#A13544', 'Fertilisant': '#5A8A3A',
    'Aluminium': '#8B7355', 'Catalyseur': '#C9A96E',
  };
  return map[cat] || '#9A9790';
}

export default function MineralsExchange() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: 'var(--gold-light)' }}>Cotations mineraux critiques — Q1 2026</h3>

      {/* Exchange Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 12 }}>
        {EXCHANGE_DATA.map(m => {
          const catColor = getCategoryBg(m.category);
          return (
            <div key={m.mineral} style={{
              background: 'var(--bg-elevated)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius)',
              padding: 16,
              transition: 'border-color 0.2s',
            }}>
              {/* Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text)' }}>{m.mineral}</div>
                  <span style={{
                    fontSize: '0.54rem', padding: '1px 6px', borderRadius: 0, marginTop: 4, display: 'inline-block',
                    background: catColor + '15', color: catColor, border: `1px solid ${catColor}30`,
                  }}>{m.category}</span>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '1.1rem', fontFamily: 'var(--font-display)', color: 'var(--gold)', fontWeight: 600 }}>{m.price}</div>
                  <div style={{ fontSize: '0.72rem', color: getTrendColor(m.trend), fontWeight: 600, marginTop: 2 }}>
                    {getTrendIcon(m.trend)} {m.change}
                  </div>
                </div>
              </div>

              {/* Supply dynamics */}
              <div style={{ marginTop: 10, fontSize: '0.66rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                {m.supply}
              </div>

              {/* Corridor Source */}
              <div style={{
                marginTop: 10, padding: '6px 10px',
                background: 'rgba(201,169,110,0.06)',
                border: '1px solid var(--border-gold)',
                borderRadius: 'var(--radius)',
              }}>
                <span style={{
                  fontSize: '0.54rem', padding: '1px 6px', borderRadius: 0,
                  background: 'rgba(201,169,110,0.15)', color: 'var(--gold)', fontWeight: 600,
                  marginRight: 6,
                }}>SOURCE CORRIDOR</span>
                <span style={{ fontSize: '0.64rem', color: 'var(--gold-dim)' }}>{m.corridorSource}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* MYNe Marketplace Card */}
      <div style={{
        background: 'var(--bg-elevated)',
        border: '2px solid #E0785040',
        borderRadius: 'var(--radius)',
        padding: 20,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
          <div style={{ width: 32, height: 32, borderRadius: 0, background: '#E0785018', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#E07850', fontWeight: 700, fontSize: '0.8rem' }}>M</div>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', color: '#E07850' }}>MYNe — Marketplace Data</div>
            <div style={{ fontSize: '0.62rem', color: 'var(--text-faint)' }}>Architecture B2B2C donnees minerales</div>
          </div>
        </div>
        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
          MYNe est la marketplace B2B2C des donnees minerales : cotations temps reel, donnees geologiques, certificats ESG, rapports due diligence. Les producteurs africains vendent leurs donnees aux acheteurs EU. Commission 2-5% sur chaque transaction + abonnements premium pour acces aux donnees de profondeur (geologie, analyses chimiques, audits terrain).
        </div>
        <div style={{ display: 'flex', gap: 8, marginTop: 12, flexWrap: 'wrap' }}>
          {['Cotations temps reel', 'Donnees geologiques', 'Certificats ESG', 'Due diligence', 'Passeport batterie'].map(f => (
            <span key={f} style={{ fontSize: '0.6rem', padding: '3px 10px', border: '1px solid #E0785030', borderRadius: 0, color: '#E07850' }}>{f}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
