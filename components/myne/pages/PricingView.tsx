'use client';

import { useState } from 'react';
import { M, HD, BD, MN } from '../shared/constants';
import MYNECard from '../shared/MYNECard';
import { BUYER_PRICING_TABLE, PRODUCER_EARNINGS_EXAMPLES, SDK_TIERS, EQUITY_DROPS, FUNDORA_BENCHMARK, SPV_ARCHITECTURE, CASHOUT_PARTNERS, CASHOUT_PIPELINE, INCLUSION_FACTS, REVENUE_FLOW_EXAMPLE, ROADMAP_HORIZONS, DISTRIBUTION_RINGS, VISUAL_PRICING, BUYER_TYPES } from '../shared/data';

function Badge({ label, color }: { label: string; color: string }) {
  return <span style={{ display:'inline-block', padding:'3px 10px', borderRadius:4, background:`${color}15`, color, fontFamily:MN, fontSize:10, fontWeight:400, letterSpacing:1, textTransform:'uppercase' }}>{label}</span>;
}

const TABS = ['Acheteurs', 'Producteurs', 'SDK Tiers', 'Équity', 'Cash-out', 'Roadmap', 'Simulateur', 'Revenue Flows', 'SPV'];

function SubBuyers() {
  return (
    <div>
      <h2 style={{ fontFamily:HD, fontSize:28, fontWeight:400, marginBottom:12, color:M.t1 }}>Pricing Acheteurs</h2>
      <p style={{ fontSize:15, color:M.t2, maxWidth:720, lineHeight:1.8, marginBottom:24 }}>Prix par profil selon le niveau de transformation. Plus le T-Level est élevé, plus la privacy est forte, plus le prix augmente.</p>
      <table style={{ width:'100%', borderCollapse:'collapse', fontSize:13, marginBottom:24 }}>
        <thead><tr>{['T-Level','Description','€/profil','Vol. min','Certif','Cas typique'].map(h => <th key={h} style={{ padding:'10px 12px', textAlign:'left', borderBottom:`1px solid ${M.border}`, color:M.t1, fontWeight:600, fontSize:11 }}>{h}</th>)}</tr></thead>
        <tbody>{BUYER_PRICING_TABLE.map(r => <tr key={r.tLevel}><td style={{ padding:'10px 12px', borderBottom:`1px solid ${M.border}` }}><Badge label={r.tLevel} color={M.purple} /></td><td style={{ padding:'10px 12px', borderBottom:`1px solid ${M.border}`, color:M.t2 }}>{r.desc}</td><td style={{ padding:'10px 12px', borderBottom:`1px solid ${M.border}`, fontFamily:MN, color:M.gold, fontWeight:300 }}>{r.pricePerProfile} €</td><td style={{ padding:'10px 12px', borderBottom:`1px solid ${M.border}`, fontFamily:MN, color:M.t2 }}>{r.minVolume}</td><td style={{ padding:'10px 12px', borderBottom:`1px solid ${M.border}` }}><div style={{ display:'flex', gap:4, flexWrap:'wrap' }}>{r.certif.map(c => <Badge key={c} label={c} color={M.green} />)}</div></td><td style={{ padding:'10px 12px', borderBottom:`1px solid ${M.border}`, fontSize:12, color:M.t3 }}>{r.typical}</td></tr>)}</tbody>
      </table>
    </div>
  );
}

function SubProducers() {
  return (
    <div>
      <h2 style={{ fontFamily:HD, fontSize:28, fontWeight:400, marginBottom:12, color:M.t1 }}>Revenus producteurs</h2>
      <p style={{ fontSize:15, color:M.t2, maxWidth:720, lineHeight:1.8, marginBottom:24 }}>Exemples de profils réels et revenus estimés (53% du prix acheteur).</p>
      <table style={{ width:'100%', borderCollapse:'collapse', fontSize:13 }}>
        <thead><tr>{['Profil','Catégories','T-Level','€/mois','€/an'].map(h => <th key={h} style={{ padding:'10px 12px', textAlign:'left', borderBottom:`1px solid ${M.border}`, color:M.t1, fontWeight:600 }}>{h}</th>)}</tr></thead>
        <tbody>{PRODUCER_EARNINGS_EXAMPLES.map((p, i) => <tr key={i}><td style={{ padding:'10px 12px', borderBottom:`1px solid ${M.border}`, fontWeight:500, color:M.t1 }}>{p.profile}</td><td style={{ padding:'10px 12px', borderBottom:`1px solid ${M.border}`, fontFamily:MN, color:M.t2 }}>{p.categories}</td><td style={{ padding:'10px 12px', borderBottom:`1px solid ${M.border}` }}><Badge label={p.tLevel} color={M.purple} /></td><td style={{ padding:'10px 12px', borderBottom:`1px solid ${M.border}`, fontFamily:MN, color:M.green }}>{p.monthly} €</td><td style={{ padding:'10px 12px', borderBottom:`1px solid ${M.border}`, fontFamily:MN, color:M.gold, fontWeight:300 }}>{p.yearly} €</td></tr>)}</tbody>
      </table>
    </div>
  );
}

function SubSDKTiers() {
  return (
    <div>
      <h2 style={{ fontFamily:HD, fontSize:28, fontWeight:400, marginBottom:24, color:M.t1 }}>SDK Pricing</h2>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(220px, 1fr))', gap:16 }}>
        {SDK_TIERS.map(t => (
          <MYNECard key={t.label} hover style={{ borderTop:`3px solid ${t.color}`, position:'relative' }}>
            {t.rec && <div style={{ position:'absolute', top:-10, right:16 }}><Badge label="RECOMMANDÉ" color={M.green} /></div>}
            <div style={{ fontWeight:600, fontSize:16, color:M.t1, marginBottom:4 }}>{t.label}</div>
            <div style={{ fontFamily:MN, fontSize:28, color:t.color, fontWeight:300, marginBottom:4 }}>{t.price}{typeof t.price === 'number' ? '€/mois' : ''}</div>
            <div style={{ fontSize:11, color:M.t3, marginBottom:12 }}>{t.uam}</div>
            <ul style={{ padding:0, listStyle:'none', margin:'0 0 16px' }}>{t.features.map((f, i) => <li key={i} style={{ fontSize:12, color:M.t2, padding:'4px 0', borderBottom:`1px solid ${M.border}` }}>✦ {f}</li>)}</ul>
            <button style={{ width:'100%', padding:'10px', background:t.color, color:'#000', border:'none', borderRadius:6, fontFamily:BD, fontSize:13, fontWeight:600, cursor:'pointer' }}>{t.cta}</button>
          </MYNECard>
        ))}
      </div>
    </div>
  );
}

function SubEquity() {
  return (
    <div>
      <h2 style={{ fontFamily:HD, fontSize:28, fontWeight:400, marginBottom:12, color:M.t1 }}>Equity Drops — 6 portes d&apos;entrée</h2>
      <p style={{ fontSize:15, color:M.t2, maxWidth:720, lineHeight:1.8, marginBottom:24 }}>Inspiré du modèle Fundora — drops segmentés par profil investisseur, structurés en SPV. Token gouvernance MYNε sur Base L2.</p>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(300px, 1fr))', gap:16, marginBottom:24 }}>
        {EQUITY_DROPS.map(d => (
          <MYNECard key={d.id} hover style={{ borderTop:`3px solid ${d.color}` }}>
            <div style={{ display:'flex', justifyContent:'space-between', marginBottom:8 }}>
              <div style={{ fontWeight:600, color:d.color }}>{d.name}</div>
              <Badge label={d.status} color={d.color} />
            </div>
            <div style={{ fontSize:12, color:M.t3, marginBottom:8 }}>{d.target}</div>
            <div style={{ fontSize:13, color:M.t2, lineHeight:1.6, marginBottom:12 }}>{d.thesis}</div>
            <div style={{ display:'flex', gap:16 }}>
              <div><span style={{ fontFamily:MN, fontSize:11, color:M.t3 }}>Ticket</span><div style={{ fontFamily:MN, color:M.gold }}>{d.ticket}</div></div>
              <div><span style={{ fontFamily:MN, fontSize:11, color:M.t3 }}>Multiple</span><div style={{ fontFamily:MN, color:M.green }}>{d.multiple}</div></div>
            </div>
          </MYNECard>
        ))}
      </div>
      <h3 style={{ fontFamily:HD, marginBottom:12, color:M.t1 }}>Benchmark Fundora</h3>
      <table style={{ width:'100%', borderCollapse:'collapse', fontSize:12 }}>
        <thead><tr>{['Dimension','Fundora','MYNε'].map(h => <th key={h} style={{ padding:'8px 10px', textAlign:'left', borderBottom:`1px solid ${M.border}`, color: h === 'MYNε' ? M.gold : M.t1, fontWeight:600 }}>{h}</th>)}</tr></thead>
        <tbody>{FUNDORA_BENCHMARK.map((r, i) => <tr key={i}><td style={{ padding:'8px 10px', borderBottom:`1px solid ${M.border}`, fontWeight:500, color:M.t1 }}>{r.dim}</td><td style={{ padding:'8px 10px', borderBottom:`1px solid ${M.border}`, color:M.t2 }}>{r.fundora}</td><td style={{ padding:'8px 10px', borderBottom:`1px solid ${M.border}`, color:M.gold }}>{r.myne}</td></tr>)}</tbody>
      </table>
    </div>
  );
}

function SubCashout() {
  return (
    <div>
      <h2 style={{ fontFamily:HD, fontSize:28, fontWeight:400, marginBottom:12, color:M.t1 }}>Cash-out — De la donnée au cash</h2>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(100px, 1fr))', gap:12, marginBottom:24 }}>
        {INCLUSION_FACTS.map((f, i) => <div key={i} style={{ textAlign:'center', padding:12 }}><div style={{ fontFamily:MN, fontSize:20, color:M.gold, fontWeight:300 }}>{f.v}</div><div style={{ fontSize:10, color:M.t3, marginTop:2 }}>{f.l}</div></div>)}
      </div>
      <h3 style={{ fontFamily:HD, marginBottom:12, color:M.t1 }}>Pipeline</h3>
      <div style={{ display:'flex', gap:4, flexWrap:'wrap', marginBottom:24 }}>
        {CASHOUT_PIPELINE.map(p => (
          <MYNECard key={p.step} style={{ flex:'1 1 140px', textAlign:'center', padding:16 }}>
            <div style={{ fontFamily:MN, fontSize:18, color:M.gold, marginBottom:4 }}>{p.step}</div>
            <div style={{ fontSize:12, fontWeight:600, marginBottom:4, color:M.t1 }}>{p.label}</div>
            <div style={{ fontSize:11, color:M.t3 }}>{p.desc}</div>
          </MYNECard>
        ))}
      </div>
      <h3 style={{ fontFamily:HD, marginBottom:12, color:M.t1 }}>Partenaires Mobile Money</h3>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(280px, 1fr))', gap:12 }}>
        {CASHOUT_PARTNERS.map(p => (
          <MYNECard key={p.id} style={{ borderLeft:`3px solid ${p.color}` }}>
            <div style={{ fontWeight:600, color:p.color, marginBottom:4 }}>{p.name}</div>
            <div style={{ fontSize:11, color:M.t3, marginBottom:6 }}>{p.region} · {p.network}</div>
            <div style={{ fontSize:12, color:M.t2, marginBottom:6 }}>{p.persona}</div>
            <div style={{ display:'flex', gap:8 }}><Badge label={`Fee ${p.fee}`} color={p.color} /><Badge label={p.delay} color={M.green} /></div>
          </MYNECard>
        ))}
      </div>
    </div>
  );
}

function SubRoadmap() {
  return (
    <div>
      <h2 style={{ fontFamily:HD, fontSize:28, fontWeight:400, marginBottom:24, color:M.t1 }}>Roadmap — 4 horizons</h2>
      {ROADMAP_HORIZONS.map(h => (
        <MYNECard key={h.period} style={{ marginBottom:16, borderLeft:`3px solid ${h.color}` }}>
          <div style={{ display:'flex', gap:12, alignItems:'center', marginBottom:8 }}>
            <Badge label={h.period} color={h.color} />
            <span style={{ fontWeight:600, color:M.t1 }}>{h.label}</span>
          </div>
          <ul style={{ padding:0, listStyle:'none', margin:'0 0 8px' }}>{h.actions.map((a, i) => <li key={i} style={{ fontSize:13, color:M.t2, padding:'3px 0' }}>→ {a}</li>)}</ul>
          <div style={{ fontFamily:MN, fontSize:12, color:h.color }}>Milestone: {h.milestone}</div>
        </MYNECard>
      ))}
      <h3 style={{ fontFamily:HD, marginBottom:12, color:M.t1 }}>Distribution — 4 anneaux</h3>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(220px, 1fr))', gap:12 }}>
        {DISTRIBUTION_RINGS.map(r => (
          <MYNECard key={r.ring} style={{ borderTop:`3px solid ${r.color}` }}>
            <div style={{ fontFamily:MN, fontSize:18, color:r.color, fontWeight:300 }}>Ring {r.ring}</div>
            <div style={{ fontWeight:600, marginBottom:4, color:M.t1 }}>{r.label}</div>
            <div style={{ fontSize:12, color:M.t2, marginBottom:8 }}>{r.ch}</div>
            <div style={{ display:'flex', gap:12 }}>
              <div><span style={{ fontFamily:MN, fontSize:11, color:M.t3 }}>Nodes</span><div style={{ fontFamily:MN, color:M.gold }}>{r.nodes}</div></div>
              <div><span style={{ fontFamily:MN, fontSize:11, color:M.t3 }}>CAC</span><div style={{ fontFamily:MN, color:M.green }}>{r.cac}</div></div>
            </div>
          </MYNECard>
        ))}
      </div>
    </div>
  );
}

function SubSimulateur() {
  const tLevels = ['T2','T3','T4','T5'];
  const [tIdx, setTIdx] = useState(1);
  const [eps, setEps] = useState(20);
  const [vol, setVol] = useState(1000);
  const [buyerIdx, setBuyerIdx] = useState(0);
  const epsilon = eps / 10;
  const tLevel = tLevels[tIdx];
  const buyerMult = BUYER_TYPES[buyerIdx].mult;
  const base = VISUAL_PRICING.basePriceByTLevel[tLevel] || 0.035;
  const epsMult = Math.pow(epsilon / 2, 1.5);
  const volDisc = vol > 10000 ? 0.85 : vol > 1000 ? 0.92 : 1.0;
  const ppu = base * epsMult * volDisc * buyerMult;
  const total = ppu * vol;
  return (
    <div>
      <h2 style={{ fontFamily:HD, fontSize:28, fontWeight:400, marginBottom:12, color:M.t1 }}>Calculez votre deal en temps réel</h2>
      <p style={{ fontSize:15, color:M.t2, maxWidth:720, lineHeight:1.8, marginBottom:24 }}>Ajustez les paramètres pour simuler le coût et la distribution.</p>
      <div style={{ display:'flex', gap:24, flexWrap:'wrap' }}>
        <MYNECard style={{ flex:'1 1 400px' }}>
          <div style={{ marginBottom:16 }}>
            <label style={{ fontFamily:MN, fontSize:12, color:M.t3 }}>T-Level : {tLevel}</label>
            <input type="range" min={0} max={3} value={tIdx} onChange={e => setTIdx(+e.target.value)} style={{ width:'100%', accentColor:M.purple, margin:'8px 0' }} />
          </div>
          <div style={{ marginBottom:16 }}>
            <label style={{ fontFamily:MN, fontSize:12, color:M.t3 }}>Epsilon (&#949;) : {epsilon.toFixed(1)}</label>
            <input type="range" min={10} max={30} step={1} value={eps} onChange={e => setEps(+e.target.value)} style={{ width:'100%', accentColor:M.gold, margin:'8px 0' }} />
          </div>
          <div style={{ marginBottom:16 }}>
            <label style={{ fontFamily:MN, fontSize:12, color:M.t3 }}>Volume : {vol.toLocaleString('fr')} profils</label>
            <input type="range" min={50} max={50000} step={50} value={vol} onChange={e => setVol(+e.target.value)} style={{ width:'100%', accentColor:M.green, margin:'8px 0' }} />
          </div>
          <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
            {BUYER_TYPES.map((b, i) => (
              <button key={b.id} onClick={() => setBuyerIdx(i)} style={{ padding:'6px 14px', background: buyerIdx === i ? M.purple : 'transparent', color: buyerIdx === i ? '#000' : M.t3, border:`1px solid ${buyerIdx === i ? M.purple : M.border}`, borderRadius:6, fontFamily:BD, fontSize:12, cursor:'pointer' }}>{b.label}{b.mult < 1 ? ` ×${b.mult}` : ''}</button>
            ))}
          </div>
        </MYNECard>
        <MYNECard style={{ flex:'1 1 300px', borderTop:`3px solid ${M.gold}` }}>
          <div style={{ fontFamily:MN, fontSize:11, color:M.t3, marginBottom:8 }}>PRIX UNITAIRE</div>
          <div style={{ fontFamily:MN, fontSize:36, color:M.gold, fontWeight:300, marginBottom:16 }}>{ppu.toFixed(4)} €</div>
          {[{l:'Producteurs 53 %',v:(total*0.53),c:M.green},{l:'Plateforme 11 %',v:(total*0.11),c:M.gold},{l:'Écosystème 36 %',v:(total*0.36),c:M.purple}].map(r => (
            <div key={r.l} style={{ marginBottom:8 }}>
              <div style={{ display:'flex', justifyContent:'space-between', fontSize:12, color:M.t2, marginBottom:4 }}><span>{r.l}</span><span style={{ fontFamily:MN, color:r.c }}>{r.v.toFixed(2)} €</span></div>
              <div style={{ height:6, background:M.border, borderRadius:3 }}><div style={{ width:`${r.l.includes('53') ? 53 : r.l.includes('11') ? 11 : 36}%`, height:'100%', background:r.c, borderRadius:3 }} /></div>
            </div>
          ))}
          <div style={{ fontFamily:MN, fontSize:14, color:M.t1, marginTop:16, borderTop:`1px solid ${M.border}`, paddingTop:12 }}>Budget total : <b style={{ color:M.gold }}>{total.toFixed(2)} €</b></div>
        </MYNECard>
      </div>
    </div>
  );
}

function SubRevenueFlows() {
  const R = REVENUE_FLOW_EXAMPLE;
  const bd = R.breakdown;
  return (
    <div>
      <h2 style={{ fontFamily:HD, fontSize:28, fontWeight:400, marginBottom:12, color:M.t1 }}>De l&apos;accord à la poche — en moins de 60 secondes</h2>
      <p style={{ fontSize:15, color:M.t2, maxWidth:720, lineHeight:1.8, marginBottom:24 }}>Exemple réel d&apos;une transaction de 18 000 €. Du ACCEPT à la réception mobile money.</p>
      <MYNECard style={{ marginBottom:24 }}>
        <div style={{ fontFamily:MN, fontSize:11, color:M.t3, marginBottom:8 }}>TRANSACTION EXEMPLE</div>
        <div style={{ fontFamily:MN, fontSize:32, color:M.gold, fontWeight:300, marginBottom:16 }}>{R.dealAmount.toLocaleString('fr')} €</div>
        <div style={{ display:'flex', gap:16, flexWrap:'wrap', marginBottom:16 }}>
          {Object.values(bd).map(d => (
            <div key={d.label} style={{ flex:'1 1 180px' }}>
              <div style={{ fontFamily:MN, fontSize:24, color:d.color, fontWeight:300 }}>{d.amount.toLocaleString('fr')} €</div>
              <div style={{ fontSize:11, color:M.t3 }}>{d.pct} %</div>
              <div style={{ fontSize:12, color:M.t2 }}>{d.label}</div>
            </div>
          ))}
        </div>
        <div style={{ display:'flex', gap:2, height:24, borderRadius:6, overflow:'hidden' }}>
          {Object.values(bd).map(d => <div key={d.label} style={{ flex:d.pct, background:d.color, display:'flex', alignItems:'center', justifyContent:'center', fontFamily:MN, fontSize:10, fontWeight:300, color:'#000' }}>{d.pct}%</div>)}
        </div>
      </MYNECard>
      <h3 style={{ fontFamily:HD, marginBottom:12, color:M.t1 }}>Timeline 0 → 60s</h3>
      <div style={{ position:'relative', paddingLeft:28 }}>
        <div style={{ position:'absolute', left:8, top:0, bottom:0, width:2, background:M.border }} />
        {R.timeline_seconds.map((ev, i) => (
          <div key={i} style={{ position:'relative', marginBottom:20 }}>
            <div style={{ position:'absolute', left:-24, top:4, width:12, height:12, borderRadius:'50%', background: i === 0 ? M.green : i === R.timeline_seconds.length-1 ? M.gold : M.purple, border:`2px solid ${M.bg}` }} />
            <div style={{ display:'flex', gap:8, alignItems:'center' }}>
              <span style={{ fontFamily:MN, fontSize:14, color:M.gold, minWidth:32 }}>{ev.t}s</span>
              <span style={{ fontSize:13, color:M.t2 }}>{ev.event}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SubSPV() {
  return (
    <div>
      <h2 style={{ fontFamily:HD, fontSize:28, fontWeight:400, marginBottom:12, color:M.t1 }}>Architecture SPV — 6 couches</h2>
      <p style={{ fontSize:15, color:M.t2, maxWidth:720, lineHeight:1.8, marginBottom:24 }}>Structure juridique et tokenomique de MYN&#949;. Du holding SAS au token gouvernance.</p>
      <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
        {SPV_ARCHITECTURE.map(s => (
          <MYNECard key={s.layer} style={{ display:'flex', alignItems:'center', gap:16 }}>
            <div style={{ width:40, height:40, borderRadius:'50%', background:M.purple, display:'flex', alignItems:'center', justifyContent:'center', fontFamily:MN, fontSize:16, fontWeight:300, color:'#000', flexShrink:0 }}>{s.layer}</div>
            <div>
              <div style={{ fontWeight:600, color:M.t1, marginBottom:2 }}>{s.label}</div>
              <div style={{ fontSize:13, color:M.t2 }}>{s.desc}</div>
            </div>
          </MYNECard>
        ))}
      </div>
    </div>
  );
}

export default function PricingView() {
  const [tab, setTab] = useState(0);
  const subs = [SubBuyers, SubProducers, SubSDKTiers, SubEquity, SubCashout, SubRoadmap, SubSimulateur, SubRevenueFlows, SubSPV];
  const Sub = subs[tab];
  return (
    <div style={{ padding:'32px 32px 60px', maxWidth:1100, margin:'0 auto' }}>
      <h1 style={{ fontFamily:HD, fontSize:'clamp(28px,5vw,44px)', fontWeight:400, marginBottom:12, color:M.gold }}>Pricing</h1>
      <div style={{ display:'flex', gap:0, borderBottom:`1px solid ${M.border}`, marginBottom:32, overflowX:'auto', position:'sticky', top:0, background:M.bg, zIndex:50, paddingTop:4 }}>
        {TABS.map((t, i) => <button key={t} onClick={() => setTab(i)} style={{ background:'none', border:'none', borderBottom: tab === i ? `2px solid ${M.gold}` : '2px solid transparent', color: tab === i ? M.gold : M.t3, fontFamily:BD, fontSize:13, fontWeight:500, padding:'10px 16px', cursor:'pointer', whiteSpace:'nowrap', transition:'all .3s' }}>{t}</button>)}
      </div>
      <Sub />
    </div>
  );
}
