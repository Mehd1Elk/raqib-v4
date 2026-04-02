'use client';

import { STAT_CARDS, EXCHANGE_DATA, TOP5_COUNTRIES, CORRIDOR_COUNTRIES, EU_FORCING_FUNCTIONS } from '@/lib/corridor/minerals-data';

const DOMINANCE_BARS = [
  { label: 'Extraction mineraux critiques', china: 70, color: '#A13544' },
  { label: 'Raffinage REE', china: 90, color: '#E07850' },
  { label: 'Aimants NdFeB', china: 92, color: '#A13544' },
  { label: 'Raffinage cobalt', china: 70, color: '#E07850' },
  { label: 'Raffinage lithium', china: 65, color: '#C9A96E' },
  { label: 'Graphite anode', china: 95, color: '#A13544' },
];

const TIMELINE = [
  { year: '2010', event: 'Chine impose quotas export REE — premier choc' },
  { year: '2015', event: 'OMC force levee quotas — Chine restructure production interieure' },
  { year: '2019', event: 'Guerre commerciale US-CN — menace embargo REE' },
  { year: '2022', event: 'EU adopte REPowerEU — diversification energetique' },
  { year: '2024', event: 'CRMA adopte — objectifs 2030 (10%/40%/25%)' },
  { year: '2025', event: 'Embargo CN sur 12 REE + Ga/Ge/W/Sb' },
  { year: '2026', event: 'CBAM transitoire + hausse REE +100% YTD' },
  { year: '2027', event: 'Battery Passport Regulation — tracabilite obligatoire' },
];

const KEY_PRICES = EXCHANGE_DATA.filter(e => ['Cobalt', 'Lithium (Li2CO3)', 'NdPr (Terres Rares)', 'Cuivre', 'Dysprosium (REE)'].includes(e.mineral));

export default function MineralsOverview() {
  const top5 = CORRIDOR_COUNTRIES.filter(c => TOP5_COUNTRIES.includes(c.id));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      {/* Macro Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 12 }}>
        {STAT_CARDS.map(s => (
          <div key={s.label} style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '16px 14px', textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', color: 'var(--gold)', fontWeight: 600 }}>{s.value}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text)', marginTop: 4 }}>{s.label}</div>
            <div style={{ fontSize: '0.6rem', color: 'var(--text-faint)', marginTop: 2 }}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Production Stats */}
      <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: 20 }}>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: 'var(--gold-light)', marginBottom: 16 }}>Production Corridor 2024</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16 }}>
          {[
            { val: '390 Kt', label: 'Production totale mineraux critiques', sub: 'Corridor 22 pays' },
            { val: '74%', label: 'Cobalt mondial', sub: 'DRC seule' },
            { val: '63%', label: 'Bauxite exportee vers UE', sub: 'Guinee' },
            { val: '38 Mt/an', label: 'Phosphates', sub: 'Maroc — 1er mondial' },
          ].map(s => (
            <div key={s.label} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.4rem', fontFamily: 'var(--font-display)', color: 'var(--gold)', fontWeight: 600 }}>{s.val}</div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: 4 }}>{s.label}</div>
              <div style={{ fontSize: '0.6rem', color: 'var(--text-faint)' }}>{s.sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Chinese Dominance Bars */}
      <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: 20 }}>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: 'var(--gold-light)', marginBottom: 16 }}>Dominance chinoise — Chaine de valeur</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {DOMINANCE_BARS.map(b => (
            <div key={b.label}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{b.label}</span>
                <span style={{ fontSize: '0.72rem', color: b.color, fontWeight: 600 }}>{b.china}%</span>
              </div>
              <div style={{ height: 6, background: 'var(--bg-hover)', borderRadius: 3, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${b.china}%`, background: b.color, borderRadius: 3, transition: 'width 0.8s ease' }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Key Prices Q1 2026 */}
      <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: 20 }}>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: 'var(--gold-light)', marginBottom: 16 }}>Prix cles Q1 2026</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 10 }}>
          {KEY_PRICES.map(m => (
            <div key={m.mineral} style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: 12 }}>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{m.mineral}</div>
              <div style={{ fontSize: '1.1rem', fontFamily: 'var(--font-display)', color: 'var(--gold)', fontWeight: 600, marginTop: 4 }}>{m.price}</div>
              <div style={{ fontSize: '0.68rem', marginTop: 4, color: m.trend === 'up' ? '#5A8A3A' : m.trend === 'down' ? '#A13544' : 'var(--text-faint)' }}>
                {m.trend === 'up' ? '\u25B2' : m.trend === 'down' ? '\u25BC' : '\u2014'} {m.change}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Applications Strategiques */}
      <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: 20 }}>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: 'var(--gold-light)', marginBottom: 16 }}>Applications strategiques EU</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 10 }}>
          {EU_FORCING_FUNCTIONS.map(f => (
            <div key={f.name} style={{ background: 'var(--bg)', border: '1px solid var(--border-gold)', borderRadius: 'var(--radius)', padding: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--gold)' }}>{f.name}</span>
                <span style={{ fontSize: '0.58rem', padding: '2px 6px', background: 'rgba(201,169,110,0.1)', border: '1px solid var(--border-gold)', borderRadius: 10, color: 'var(--gold-dim)' }}>{f.status}</span>
              </div>
              <div style={{ fontSize: '0.66rem', color: 'var(--text-muted)', marginTop: 6 }}>{f.fullName}</div>
              <div style={{ fontSize: '0.64rem', color: 'var(--text-faint)', marginTop: 4 }}>{f.impact}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Top 5 Pays Critiques */}
      <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: 20 }}>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: 'var(--gold-light)', marginBottom: 16 }}>Top 5 pays critiques</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {top5.map((c, i) => (
            <div key={c.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 'var(--radius)' }}>
              <span style={{ fontSize: '1rem', fontFamily: 'var(--font-display)', color: 'var(--gold-dim)', width: 24 }}>{i + 1}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '0.78rem', fontWeight: 500, color: 'var(--text)' }}>{c.name}</div>
                <div style={{ fontSize: '0.62rem', color: 'var(--text-faint)', marginTop: 2 }}>{c.minerals.slice(0, 4).join(', ')}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.72rem', color: 'var(--gold)' }}>{c.tradeEU}</div>
                <div style={{ fontSize: '0.6rem', color: 'var(--text-faint)' }}>Diversite: {c.mineralDiversity}/10</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chronologie Geopolitique */}
      <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: 20 }}>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: 'var(--gold-light)', marginBottom: 16 }}>Chronologie geopolitique 2010-2028</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {TIMELINE.map((t, i) => (
            <div key={t.year} style={{ display: 'flex', gap: 16, position: 'relative' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 50 }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--gold)', border: '2px solid var(--bg-elevated)', zIndex: 1 }} />
                {i < TIMELINE.length - 1 && <div style={{ width: 1, flex: 1, background: 'var(--border)' }} />}
              </div>
              <div style={{ paddingBottom: 16 }}>
                <div style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--gold)' }}>{t.year}</div>
                <div style={{ fontSize: '0.66rem', color: 'var(--text-muted)', marginTop: 2 }}>{t.event}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Perspectives */}
      <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-gold)', borderRadius: 'var(--radius)', padding: 20 }}>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: 'var(--gold-light)', marginBottom: 12 }}>Perspectives marche 2026-2030</h3>
        <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
          Le deficit structurel en mineraux critiques s'accelere. L'embargo chinois sur les REE (avril 2025) a provoque une hausse de +100% des prix du dysprosium et du terbium en 3 mois. L'UE, avec le CRMA et le Battery Passport Regulation (2027), cree un cadre reglementaire qui rend la tracabilite obligatoire. Le corridor EU-Afrique (22 pays, €32B+ de trade annuel) represente la seule alternative credible a la dependance chinoise. MADEN se positionne comme la couche logicielle souveraine qui monetise cette transition.
        </div>
      </div>
    </div>
  );
}
