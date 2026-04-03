'use client';

import { useState } from 'react';
import { M, HD, BD, MN } from '../shared/constants';
import MYNECard from '../shared/MYNECard';
import { VERTICAL_USE_CASES, MARKETPLACE_DATASETS_SAMPLE, MARKETPLACE_STATS, RECENT_TRANSACTIONS, EXCHANGES, CHINA_COMPARISON, CHINA_LESSONS, PRICING_ENGINES } from '../shared/data';

function Badge({ label, color }: { label: string; color: string }) {
  return <span style={{ display:'inline-block', padding:'3px 10px', borderRadius:4, background:`${color}15`, color, fontFamily:MN, fontSize:10, fontWeight:600, letterSpacing:1, textTransform:'uppercase' }}>{label}</span>;
}

const TABS = ['Marketplace','Pricing Engines','Verticales','Chine','SDK'];

function SubMarketplace() {
  return (
    <div>
      <h2 style={{ fontFamily:HD, fontSize:28, fontWeight:400, marginBottom:12, color:M.t1 }}>Marketplace — Live</h2>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(100px, 1fr))', gap:12, marginBottom:24 }}>
        {Object.entries(MARKETPLACE_STATS).map(([k, v]) => <div key={k} style={{ textAlign:'center', padding:12 }}><div style={{ fontFamily:MN, fontSize:20, color:M.gold, fontWeight:700 }}>{v}</div><div style={{ fontSize:10, color:M.t3, marginTop:2 }}>{k}</div></div>)}
      </div>
      <h3 style={{ fontFamily:HD, marginBottom:12, color:M.t1 }}>Datasets disponibles</h3>
      <div style={{ overflowX:'auto', marginBottom:24 }}>
        <table style={{ width:'100%', borderCollapse:'collapse', fontSize:12 }}>
          <thead><tr>{['ID','Catégorie','T-Level','Profils','Prix/p','Certs','Status'].map(h => <th key={h} style={{ padding:'8px 10px', textAlign:'left', borderBottom:`1px solid ${M.border}`, color:M.t3, fontFamily:MN, fontSize:10, letterSpacing:1 }}>{h}</th>)}</tr></thead>
          <tbody>{MARKETPLACE_DATASETS_SAMPLE.map(d => <tr key={d.id}><td style={{ padding:'8px 10px', borderBottom:`1px solid ${M.border}`, fontFamily:MN, color:M.gold }}>{d.id}</td><td style={{ padding:'8px 10px', borderBottom:`1px solid ${M.border}`, color:M.t2 }}>{d.category}</td><td style={{ padding:'8px 10px', borderBottom:`1px solid ${M.border}` }}><Badge label={d.tLevel} color={M.purple} /></td><td style={{ padding:'8px 10px', borderBottom:`1px solid ${M.border}`, fontFamily:MN, color:M.t2 }}>{d.profiles.toLocaleString()}</td><td style={{ padding:'8px 10px', borderBottom:`1px solid ${M.border}`, fontFamily:MN, color:M.green }}>{d.price} €</td><td style={{ padding:'8px 10px', borderBottom:`1px solid ${M.border}` }}>{d.burhanCert && <Badge label="BURHAN" color={M.gold} />}</td><td style={{ padding:'8px 10px', borderBottom:`1px solid ${M.border}` }}><Badge label={d.available ? 'DISPO' : 'ÉPUISÉ'} color={d.available ? M.green : M.red} /></td></tr>)}</tbody>
        </table>
      </div>
      <h3 style={{ fontFamily:HD, marginBottom:12, color:M.t1 }}>Transactions récentes</h3>
      {RECENT_TRANSACTIONS.map((t, i) => (
        <div key={i} style={{ display:'flex', alignItems:'center', gap:12, padding:'10px 0', borderBottom:`1px solid ${M.border}` }}>
          <span style={{ fontFamily:MN, fontSize:11, color:M.t3, minWidth:80 }}>{t.ts}</span>
          <span style={{ fontSize:13, color:M.t1 }}>{t.buyer}</span>
          <span style={{ fontFamily:MN, fontSize:11, color:M.gold }}>{t.dataset}</span>
          <span style={{ marginLeft:'auto', fontFamily:MN, fontWeight:700, color:M.green }}>{t.amount} €</span>
          <Badge label={t.tLevel} color={M.purple} />
        </div>
      ))}
    </div>
  );
}

function SubPricingEngines() {
  return (
    <div>
      <h2 style={{ fontFamily:HD, fontSize:28, fontWeight:400, marginBottom:12, color:M.t1 }}>Pricing Engines — 4 moteurs. Un seul prix juste.</h2>
      <p style={{ fontSize:15, color:M.t2, maxWidth:720, lineHeight:1.8, marginBottom:24 }}>MYNε calcule le prix de chaque dataset via quatre moteurs spécialisés. Chaque moteur applique ses propres multiplicateurs selon la nature de la donnée.</p>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(280px, 1fr))', gap:16 }}>
        {PRICING_ENGINES.map(e => (
          <MYNECard key={e.id} hover style={{ borderTop:`3px solid ${e.color}` }}>
            <div style={{ fontWeight:600, fontSize:15, color:e.color, marginBottom:6 }}>{e.label}</div>
            <p style={{ fontSize:13, color:M.t2, lineHeight:1.6, marginBottom:12 }}>{e.desc}</p>
            <div style={{ marginBottom:12 }}>
              {e.params.map(p => (
                <div key={p.k} style={{ display:'flex', justifyContent:'space-between', padding:'4px 0', borderBottom:`1px solid ${M.border}` }}>
                  <span style={{ fontFamily:MN, fontSize:11, color:M.t3 }}>{p.k}</span>
                  <span style={{ fontFamily:MN, fontSize:11, color:e.color, fontWeight:700 }}>{p.v}</span>
                </div>
              ))}
            </div>
            <div style={{ marginBottom:8 }}>
              {e.multipliers.map((m, i) => <div key={i} style={{ fontSize:11, color:M.t2, padding:'2px 0' }}>× {m}</div>)}
            </div>
            <div style={{ fontFamily:MN, fontSize:10, color:M.t3, marginTop:8, padding:'6px 8px', background:`${e.color}10`, borderRadius:4 }}>
              {e.formula}
            </div>
          </MYNECard>
        ))}
      </div>
    </div>
  );
}

function SubVerticales() {
  return (
    <div>
      <h2 style={{ fontFamily:HD, fontSize:28, fontWeight:400, marginBottom:24, color:M.t1 }}>Verticales — Cas d&apos;usage sectoriels</h2>
      {VERTICAL_USE_CASES.map(v => (
        <MYNECard key={v.sector} style={{ marginBottom:16, borderLeft:`3px solid ${v.color}` }}>
          <div style={{ fontWeight:600, fontSize:16, color:v.color, marginBottom:8 }}>{v.sector}</div>
          <p style={{ fontSize:14, color:M.t2, marginBottom:12 }}>{v.value}</p>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(200px, 1fr))', gap:12, fontSize:12 }}>
            <div><b style={{ color:M.t3 }}>Acheteurs:</b> <span style={{ color:M.t2 }}>{v.buyers}</span></div>
            <div><b style={{ color:M.t3 }}>T-Level:</b> <Badge label={v.tLevel} color={v.color} /></div>
            <div><b style={{ color:M.t3 }}>Pricing:</b> <span style={{ fontFamily:MN, color:M.gold }}>{v.pricing}</span></div>
            <div><b style={{ color:M.t3 }}>Compliance:</b> <span style={{ color:M.t2 }}>{v.rgpd}</span></div>
            <div><b style={{ color:M.t3 }}>Corridor:</b> <span style={{ color:M.t2 }}>{v.corridor}</span></div>
          </div>
        </MYNECard>
      ))}
    </div>
  );
}

function SubChine() {
  return (
    <div>
      <h2 style={{ fontFamily:HD, fontSize:28, fontWeight:400, marginBottom:12, color:M.t1 }}>Benchmark — Bourses de données chinoises</h2>
      <p style={{ fontSize:15, color:M.t2, maxWidth:720, lineHeight:1.8, marginBottom:24 }}>Si la Chine a créé des data exchanges, pourquoi MYNε est-il structurellement différent ?</p>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(300px, 1fr))', gap:16, marginBottom:24 }}>
        {EXCHANGES.map(e => (
          <MYNECard key={e.id} style={{ borderTop:`3px solid ${e.color}` }}>
            <div style={{ fontWeight:600, color:e.color, marginBottom:4 }}>{e.name}</div>
            <div style={{ fontSize:11, color:M.t3, marginBottom:8 }}>Fondé: {e.founded} · {e.volume}</div>
            <h4 style={{ fontSize:12, color:M.green, marginBottom:4 }}>Forces</h4>
            <ul style={{ padding:0, listStyle:'none', margin:'0 0 8px' }}>{e.strengths.map((s, i) => <li key={i} style={{ fontSize:12, color:M.t2, padding:'2px 0' }}>+ {s}</li>)}</ul>
            <h4 style={{ fontSize:12, color:M.red, marginBottom:4 }}>Limites</h4>
            <ul style={{ padding:0, listStyle:'none', margin:0 }}>{e.limits.map((l, i) => <li key={i} style={{ fontSize:12, color:M.t2, padding:'2px 0' }}>– {l}</li>)}</ul>
          </MYNECard>
        ))}
      </div>
      <h3 style={{ fontFamily:HD, marginBottom:12, color:M.t1 }}>Comparaison</h3>
      <table style={{ width:'100%', borderCollapse:'collapse', fontSize:12, marginBottom:24 }}>
        <thead><tr>{['Dimension','SDE','SZDE','MYNε'].map(h => <th key={h} style={{ padding:'8px 10px', textAlign:'left', borderBottom:`1px solid ${M.border}`, color: h === 'MYNε' ? M.gold : M.t1, fontWeight:600 }}>{h}</th>)}</tr></thead>
        <tbody>{CHINA_COMPARISON.map((r, i) => <tr key={i}><td style={{ padding:'8px 10px', borderBottom:`1px solid ${M.border}`, fontWeight:600, color:M.t1 }}>{r.dimension}</td><td style={{ padding:'8px 10px', borderBottom:`1px solid ${M.border}`, color:M.t2 }}>{r.sde}</td><td style={{ padding:'8px 10px', borderBottom:`1px solid ${M.border}`, color:M.t2 }}>{r.szde}</td><td style={{ padding:'8px 10px', borderBottom:`1px solid ${M.border}`, color:M.gold, fontWeight:500 }}>{r.myne}</td></tr>)}</tbody>
      </table>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:16 }}>
        {[{t:'Copier',items:CHINA_LESSONS.copier,c:M.green},{t:'Éviter',items:CHINA_LESSONS.eviter,c:M.red},{t:'Exploiter',items:CHINA_LESSONS.exploiter,c:M.gold}].map(g => (
          <MYNECard key={g.t} style={{ borderTop:`3px solid ${g.c}` }}>
            <div style={{ fontWeight:600, color:g.c, marginBottom:8 }}>{g.t}</div>
            <ul style={{ padding:0, listStyle:'none', margin:0 }}>{g.items.map((i, idx) => <li key={idx} style={{ fontSize:12, color:M.t2, padding:'4px 0', borderBottom:`1px solid ${M.border}` }}>{i}</li>)}</ul>
          </MYNECard>
        ))}
      </div>
    </div>
  );
}

function SubSDK() {
  return (
    <div>
      <h2 style={{ fontFamily:HD, fontSize:28, fontWeight:400, marginBottom:12, color:M.t1 }}>SDK &amp; API — Intégration en 15 minutes</h2>
      <p style={{ fontSize:15, color:M.t2, maxWidth:720, lineHeight:1.8, marginBottom:24 }}>Le SDK MYNε permet aux développeurs d&apos;intégrer le consent management, la transformation T-Level et la négociation A2A dans n&apos;importe quelle application.</p>
      <MYNECard style={{ borderLeft:`3px solid ${M.cyan}`, marginBottom:24 }}>
        <div style={{ fontFamily:MN, fontSize:12, color:M.cyan, marginBottom:8 }}>INSTALLATION</div>
        <code style={{ fontFamily:MN, fontSize:13, color:M.gold, background:M.bgPanel, padding:'12px 16px', borderRadius:8, display:'block' }}>npm install @myne/sdk @myne/react</code>
      </MYNECard>
      <MYNECard style={{ borderLeft:`3px solid ${M.green}`, marginBottom:24 }}>
        <div style={{ fontFamily:MN, fontSize:12, color:M.green, marginBottom:8 }}>USAGE</div>
        <pre style={{ fontFamily:MN, fontSize:11, color:M.t2, background:M.bgPanel, padding:'12px 16px', borderRadius:8, overflow:'auto', lineHeight:1.6 }}>{`import { MyneProvider, useConsent } from '@myne/react';

function App() {
  return (
    <MyneProvider apiKey="pk_live_...">
      <ConsentBanner />
      <YourApp />
    </MyneProvider>
  );
}`}</pre>
      </MYNECard>
    </div>
  );
}

export default function EntreprisesView() {
  const [tab, setTab] = useState(0);
  const subs = [SubMarketplace, SubPricingEngines, SubVerticales, SubChine, SubSDK];
  const Sub = subs[tab];
  return (
    <div style={{ padding:'32px 32px 60px', maxWidth:1100, margin:'0 auto' }}>
      <h1 style={{ fontFamily:HD, fontSize:'clamp(28px,5vw,44px)', fontWeight:400, marginBottom:12, color:M.blue }}>Entreprises</h1>
      <div style={{ display:'flex', gap:0, borderBottom:`1px solid ${M.border}`, marginBottom:32, overflowX:'auto', position:'sticky', top:0, background:M.bg, zIndex:50, paddingTop:4 }}>
        {TABS.map((t, i) => <button key={t} onClick={() => setTab(i)} style={{ background:'none', border:'none', borderBottom: tab === i ? `2px solid ${M.blue}` : '2px solid transparent', color: tab === i ? M.blue : M.t3, fontFamily:BD, fontSize:13, fontWeight:500, padding:'10px 16px', cursor:'pointer', whiteSpace:'nowrap', transition:'all .3s' }}>{t}</button>)}
      </div>
      <Sub />
    </div>
  );
}
