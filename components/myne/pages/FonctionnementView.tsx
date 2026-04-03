'use client';

import { useState } from 'react';
import { M, HD, BD, MN } from '../shared/constants';
import MYNECard from '../shared/MYNECard';
import { T_LEVELS, TL_TRANSFORMS, A2A_STEPS, BURHAN_FEATURES, BURHAN_JURISDICTIONS, WEB_ERAS, WEB3_VS_WEB4, MIZAN_DISTRIBUTION, MIZAN_CURRENCIES, MIZAN_PIPELINE, API_ENDPOINTS } from '../shared/data';

const TABS = ['T-Levels','Differential Privacy','A2A','BURHAN','MIZAN','Architecture','Web 4.0'];

function Badge({ label, color }: { label: string; color: string }) {
  return <span style={{ display:'inline-block', padding:'3px 10px', borderRadius:4, background:`${color}15`, color, fontFamily:MN, fontSize:10, fontWeight:600, letterSpacing:1, textTransform:'uppercase' }}>{label}</span>;
}

function SubTLevels() {
  const [level, setLevel] = useState(0);
  const t = T_LEVELS[level];
  const raw = TL_TRANSFORMS.T0;
  const transformed = TL_TRANSFORMS[t.id];
  return (
    <div>
      <h2 style={{ fontFamily:HD, fontSize:28, fontWeight:400, marginBottom:12, color:M.t1 }}>T-Levels — Du brut à l&apos;inviolable</h2>
      <p style={{ fontSize:15, color:M.t2, maxWidth:720, lineHeight:1.8, marginBottom:32 }}>T0 est votre donnée brute avec votre nom, votre adresse, votre numéro de sécu. T5 est un signal statistique indéchiffrable. Entre les deux : six niveaux de transformation progressive.</p>
      <div style={{ marginBottom:16 }}>
        <label style={{ fontFamily:MN, fontSize:12, color:M.t3 }}>Niveau : {t.id}</label>
        <input type="range" min={0} max={5} value={level} onChange={e => setLevel(+e.target.value)} style={{ width:'100%', accentColor:t.color, height:6, cursor:'pointer', margin:'12px 0' }} />
      </div>
      <MYNECard style={{ marginBottom:24 }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'start', flexWrap:'wrap', gap:12 }}>
          <div><div style={{ fontFamily:MN, fontSize:18, fontWeight:700, color:t.color }}>{t.label}</div><div style={{ fontSize:12, color:M.t3, marginTop:2 }}>{t.meta}</div></div>
          <Badge label={`Protection ${t.protection}%`} color={t.color} />
        </div>
        <p style={{ fontSize:13, color:M.t2, margin:'12px 0', lineHeight:1.6 }}>{t.desc}</p>
        <div style={{ display:'flex', gap:24 }}>
          <div><span style={{ fontFamily:MN, fontSize:11, color:M.t3 }}>Valeur/profil</span><div style={{ fontFamily:MN, fontSize:20, color:M.gold }}>{t.val} €</div></div>
          <div style={{ flex:1 }}><div style={{ fontFamily:MN, fontSize:11, color:M.t3, marginBottom:4 }}>Protection</div><div style={{ height:6, background:M.border, borderRadius:3, overflow:'hidden' }}><div style={{ width:`${t.protection}%`, height:'100%', background:t.color, borderRadius:3, transition:'width .4s' }} /></div></div>
        </div>
      </MYNECard>
      <h3 style={{ fontFamily:HD, marginBottom:12, color:M.t1 }}>Transformation — Fatima-Zahra Amrani, Casablanca</h3>
      <div style={{ display:'flex', gap:24, flexWrap:'wrap' }}>
        <MYNECard style={{ flex:'1 1 300px', borderTop:`3px solid ${M.red}` }}>
          <div style={{ fontFamily:MN, fontSize:11, color:M.t3, marginBottom:8 }}>T0 — DONNÉES BRUTES</div>
          {Object.entries(raw).map(([k, v]) => <div key={k} style={{ fontSize:13, color:M.t2, lineHeight:2 }}><b style={{ color:M.t3 }}>{k}:</b> {v}</div>)}
        </MYNECard>
        <MYNECard style={{ flex:'1 1 300px', borderTop:`3px solid ${t.color}` }}>
          <div style={{ fontFamily:MN, fontSize:11, color:M.t3, marginBottom:8 }}>CE QUE VOIT L&apos;ACHETEUR</div>
          {transformed && Object.entries(transformed).map(([k, v]) => <div key={k} style={{ fontSize:13, color: v !== raw[k] ? t.color : M.t2, lineHeight:2 }}><b style={{ color:M.t3 }}>{k}:</b> {v}</div>)}
        </MYNECard>
      </div>
    </div>
  );
}

function SubDP() {
  const [eps, setEps] = useState(20);
  const epsilon = eps / 10;
  const levels = [{e:1.0,l:'Maximum privacy',t:'Utilité réduite',u:'Données médicales sensibles'},{e:1.5,l:'Haute privacy',t:'Bon équilibre',u:'Études santé, finances'},{e:2.0,l:'Privacy standard',t:'Utilité correcte',u:'Marketing'},{e:2.5,l:'Privacy modérée',t:'Haute utilité',u:'Analyse comportementale'},{e:3.0,l:'Minimum privacy',t:'Utilité maximale',u:'Données démographiques'}];
  return (
    <div>
      <h2 style={{ fontFamily:HD, fontSize:28, fontWeight:400, marginBottom:12, color:M.t1 }}>Differential Privacy — Une garantie mathématique</h2>
      <p style={{ fontSize:15, color:M.t2, maxWidth:720, lineHeight:1.8, marginBottom:32 }}>Cynthia Dwork (Microsoft Research, 2006) a prouvé qu&apos;il existe un mécanisme permettant de répondre à des questions statistiques sans révéler quoi que ce soit sur les individus.</p>
      <MYNECard style={{ borderLeft:`3px solid ${M.gold}`, marginBottom:24 }}>
        <div style={{ fontFamily:MN, fontSize:12, color:M.gold, marginBottom:8 }}>DÉFINITION FORMELLE</div>
        <p style={{ fontFamily:MN, fontSize:13, color:M.t2, lineHeight:1.8 }}>Pr[M(D) ∈ S] ≤ e^ε × Pr[M(D&apos;) ∈ S]</p>
        <p style={{ fontSize:13, color:M.t2, marginTop:8, lineHeight:1.6 }}>Quel que soit le résultat observé, vous ne pouvez pas conclure avec certitude si un individu était dans le dataset.</p>
      </MYNECard>
      <div style={{ marginBottom:16 }}>
        <label style={{ fontFamily:MN, fontSize:12, color:M.t3 }}>Epsilon (ε) : {epsilon.toFixed(1)}</label>
        <input type="range" min={10} max={30} step={5} value={eps} onChange={e => setEps(+e.target.value)} style={{ width:'100%', accentColor:M.gold, margin:'12px 0' }} />
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(160px, 1fr))', gap:12 }}>
        {levels.map(l => (
          <MYNECard key={l.e} style={{ border: l.e === epsilon ? `1px solid ${M.gold}` : `1px solid ${M.border}`, boxShadow: l.e === epsilon ? `0 0 15px ${M.gold}20` : 'none' }}>
            <div style={{ fontFamily:MN, fontSize:16, color: l.e === epsilon ? M.gold : M.t3, marginBottom:4 }}>ε = {l.e}</div>
            <div style={{ fontSize:13, fontWeight:600, marginBottom:4, color:M.t1 }}>{l.l}</div>
            <div style={{ fontSize:11, color:M.t2 }}>{l.t}</div>
            <div style={{ fontSize:10, color:M.t3, marginTop:4 }}>{l.u}</div>
          </MYNECard>
        ))}
      </div>
    </div>
  );
}

function SubA2A() {
  return (
    <div>
      <h2 style={{ fontFamily:HD, fontSize:28, fontWeight:400, marginBottom:12, color:M.t1 }}>A2A — Votre agent négocie pendant que vous dormez</h2>
      <p style={{ fontSize:15, color:M.t2, maxWidth:720, lineHeight:1.8, marginBottom:32 }}>A2A (Agent-to-Agent) est le protocole de négociation autonome entre ÆLYA et l&apos;agent acheteur B2B. Multi-turn, en millisecondes, sans intervention humaine.</p>
      <div style={{ position:'relative', paddingLeft:28 }}>
        <div style={{ position:'absolute', left:8, top:0, bottom:0, width:2, background:M.border }} />
        {A2A_STEPS.map(s => (
          <div key={s.s} style={{ position:'relative', marginBottom:24 }}>
            <div style={{ position:'absolute', left:-24, top:6, width:12, height:12, borderRadius:'50%', border:`2px solid ${M.bg}`, background:s.color }} />
            <div style={{ display:'flex', gap:8, alignItems:'center', marginBottom:4 }}>
              <Badge label={s.action} color={s.color} />
              <span style={{ fontSize:12, color:M.t3 }}>{s.actor}</span>
            </div>
            <p style={{ fontSize:13, color:M.t2, lineHeight:1.6 }}>{s.msg}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function SubBurhan() {
  return (
    <div>
      <h2 style={{ fontFamily:HD, fontSize:28, fontWeight:400, marginBottom:12, color:M.t1 }}>BURHAN — Chaque accès. Un hash. Pour toujours.</h2>
      <p style={{ fontSize:15, color:M.t2, maxWidth:720, lineHeight:1.8, marginBottom:32 }}>BURHAN hashe chaque accès sur Base L2, génère des certificats RGPD/AI Act/EHDS automatiques, et produit les preuves d&apos;audit.</p>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(260px, 1fr))', gap:16, marginBottom:24 }}>
        {BURHAN_FEATURES.map(f => (
          <MYNECard key={f.label} style={{ borderTop:`3px solid ${f.color}` }}>
            <div style={{ fontWeight:600, color:f.color, marginBottom:6 }}>{f.label}</div>
            <p style={{ fontSize:13, color:M.t2 }}>{f.desc}</p>
          </MYNECard>
        ))}
      </div>
      <h3 style={{ fontFamily:HD, marginBottom:12, color:M.t1 }}>16 juridictions couvertes</h3>
      <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
        {BURHAN_JURISDICTIONS.map(j => <span key={j} style={{ display:'inline-block', padding:'3px 10px', borderRadius:4, background:M.bgCard, color:M.t2, border:`1px solid ${M.border}`, fontFamily:MN, fontSize:10 }}>{j}</span>)}
      </div>
    </div>
  );
}

function SubMizan() {
  const D = MIZAN_DISTRIBUTION;
  return (
    <div>
      <h2 style={{ fontFamily:HD, fontSize:28, fontWeight:400, marginBottom:12, color:M.t1 }}>MIZAN — La distribution est automatique. Elle ne peut pas mentir.</h2>
      <p style={{ fontSize:15, color:M.t2, maxWidth:720, lineHeight:1.8, marginBottom:24 }}>Inscrit dans le smart contract Base L2, MIZAN distribue : 53% producteur, 11% plateforme, 36% pool écosystème.</p>
      <div style={{ display:'flex', gap:4, height:40, borderRadius:8, overflow:'hidden', marginBottom:24 }}>
        {Object.values(D).map(d => <div key={d.label} style={{ flex:d.pct, background:d.color, display:'flex', alignItems:'center', justifyContent:'center', fontFamily:MN, fontSize:12, fontWeight:700, color:'#000' }}>{d.pct}% {d.label}</div>)}
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(200px, 1fr))', gap:16, marginBottom:24 }}>
        {Object.values(D).map(d => (
          <MYNECard key={d.label} style={{ borderTop:`3px solid ${d.color}` }}>
            <div style={{ fontFamily:MN, fontSize:24, color:d.color, fontWeight:700 }}>{d.pct}%</div>
            <div style={{ fontWeight:600, margin:'4px 0', color:M.t1 }}>{d.label}</div>
            <div style={{ fontSize:12, color:M.t2 }}>{d.desc}</div>
          </MYNECard>
        ))}
      </div>
      <h3 style={{ fontFamily:HD, marginBottom:12, color:M.t1 }}>Pipeline de settlement</h3>
      <div style={{ display:'flex', gap:8, flexWrap:'wrap', marginBottom:24 }}>
        {MIZAN_PIPELINE.map((p, i) => (
          <MYNECard key={i} style={{ flex:'1 1 150px', textAlign:'center', padding:16 }}>
            <div style={{ fontFamily:MN, fontSize:18, color:M.gold, marginBottom:4 }}>{i+1}</div>
            <div style={{ fontSize:12, fontWeight:600, marginBottom:4, color:M.t1 }}>{p.l}</div>
            <div style={{ fontSize:11, color:M.t3 }}>{p.d}</div>
          </MYNECard>
        ))}
      </div>
      <h3 style={{ fontFamily:HD, marginBottom:12, color:M.t1 }}>Devises supportées</h3>
      <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
        {MIZAN_CURRENCIES.map(cu => <Badge key={cu.id} label={`${cu.id} · ${cu.label}`} color={cu.type === 'crypto' ? M.purple : cu.type === 'mobile' ? M.green : M.gold} />)}
      </div>
    </div>
  );
}

function SubArch() {
  const stats = [{v:'26',l:'Tables Supabase'},{v:'23',l:'Routes API'},{v:'92',l:'Tests unitaires'},{v:'6',l:'T-Levels'},{v:'13.5K',l:'Lignes TypeScript'},{v:'16',l:'Juridictions'}];
  return (
    <div>
      <h2 style={{ fontFamily:HD, fontSize:28, fontWeight:400, marginBottom:24, color:M.t1 }}>Architecture — 26 tables, 23 routes, 92 tests</h2>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(100px, 1fr))', gap:16, marginBottom:24 }}>
        {stats.map(m => <div key={m.l} style={{ textAlign:'center', padding:16 }}><div style={{ fontFamily:MN, fontSize:32, color:M.gold, fontWeight:700 }}>{m.v}</div><div style={{ fontSize:11, color:M.t3 }}>{m.l}</div></div>)}
      </div>
      <h3 style={{ fontFamily:HD, marginBottom:12, color:M.t1 }}>API Endpoints</h3>
      <table style={{ width:'100%', borderCollapse:'collapse', fontSize:13, marginBottom:24 }}>
        <thead><tr><th style={{ width:70, padding:'10px 12px', textAlign:'left', borderBottom:`1px solid ${M.border}`, color:M.t1 }}>Méthode</th><th style={{ padding:'10px 12px', textAlign:'left', borderBottom:`1px solid ${M.border}`, color:M.t1 }}>Path</th><th style={{ padding:'10px 12px', textAlign:'left', borderBottom:`1px solid ${M.border}`, color:M.t1 }}>Description</th></tr></thead>
        <tbody>{API_ENDPOINTS.map((a, i) => <tr key={i}><td style={{ padding:'10px 12px', borderBottom:`1px solid ${M.border}` }}><Badge label={a.m} color={a.m === 'POST' ? M.rose : M.green} /></td><td style={{ padding:'10px 12px', borderBottom:`1px solid ${M.border}`, fontFamily:MN, fontSize:11, color:M.cyan }}>{a.p}</td><td style={{ padding:'10px 12px', borderBottom:`1px solid ${M.border}`, fontSize:12, color:M.t2 }}>{a.d}</td></tr>)}</tbody>
      </table>
      <h3 style={{ fontFamily:HD, marginBottom:12, color:M.t1 }}>Stack technique</h3>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(260px, 1fr))', gap:12 }}>
        {[{l:'FRONTEND',c:M.cyan,d:'React 18 · TypeScript · Tailwind CSS · Framer Motion · Recharts'},{l:'BACKEND',c:M.green,d:'Supabase (PostgreSQL) · Edge Functions · Row Level Security'},{l:'BLOCKCHAIN',c:M.purple,d:'Base L2 (Ethereum) · Solidity · Hardhat · Ethers.js'},{l:'AI / PRIVACY',c:M.gold,d:'Differential Privacy (Python) · Homomorphic Encryption (SEAL) · SPADE'}].map(s => (
          <MYNECard key={s.l}><div style={{ fontFamily:MN, fontSize:11, color:s.c, marginBottom:8 }}>{s.l}</div><div style={{ fontSize:13, color:M.t2 }}>{s.d}</div></MYNECard>
        ))}
      </div>
    </div>
  );
}

function SubWeb4() {
  return (
    <div>
      <h2 style={{ fontFamily:HD, fontSize:28, fontWeight:400, marginBottom:12, color:M.t1 }}>Web 4.0 — Read + Write + Own + Delegate</h2>
      <p style={{ fontSize:15, color:M.t2, maxWidth:720, lineHeight:1.8, marginBottom:32 }}>Web 1.0 : lire. Web 2.0 : publier. Web 3.0 : posséder. Web 4.0 : déléguer. Vous possédez vos données. ÆLYA les gère à votre place.</p>
      <div style={{ display:'flex', gap:2, marginBottom:24 }}>
        {WEB_ERAS.map(e => (
          <div key={e.era} style={{ flex:1, padding:16, background:M.bgCard, borderBottom:`3px solid ${e.color}`, textAlign:'center', borderRadius:'8px 8px 0 0' }}>
            <div style={{ fontFamily:MN, fontSize:14, fontWeight:700, color:e.color }}>{e.era}</div>
            <div style={{ fontSize:10, color:M.t3, margin:'4px 0' }}>{e.years}</div>
            <div style={{ fontSize:11, fontWeight:600, marginBottom:4, color:M.t1 }}>{e.paradigm}</div>
            <div style={{ fontSize:11, color:M.t2 }}>{e.desc}</div>
          </div>
        ))}
      </div>
      <h3 style={{ fontFamily:HD, marginBottom:12, color:M.t1 }}>Web 3.0 vs Web 4.0</h3>
      <table style={{ width:'100%', borderCollapse:'collapse', fontSize:13 }}>
        <thead><tr>{['Aspect','Web 3.0','Web 4.0 (MYNε)'].map(h => <th key={h} style={{ padding:'10px 12px', textAlign:'left', borderBottom:`1px solid ${M.border}`, color: h.includes('MYNε') ? M.gold : M.t1, fontWeight:600 }}>{h}</th>)}</tr></thead>
        <tbody>{WEB3_VS_WEB4.map((r, i) => <tr key={i}><td style={{ padding:'10px 12px', borderBottom:`1px solid ${M.border}`, fontWeight:600, color:M.t1 }}>{r.a}</td><td style={{ padding:'10px 12px', borderBottom:`1px solid ${M.border}`, color:M.t2 }}>{r.w3}</td><td style={{ padding:'10px 12px', borderBottom:`1px solid ${M.border}`, color:M.gold, fontWeight:500 }}>{r.w4}</td></tr>)}</tbody>
      </table>
    </div>
  );
}

export default function FonctionnementView() {
  const [tab, setTab] = useState(0);
  const subs = [SubTLevels, SubDP, SubA2A, SubBurhan, SubMizan, SubArch, SubWeb4];
  const Sub = subs[tab];
  return (
    <div style={{ padding:'32px 32px 60px', maxWidth:1100, margin:'0 auto' }}>
      <h1 style={{ fontFamily:HD, fontSize:'clamp(28px,5vw,44px)', fontWeight:400, marginBottom:12, color:M.t1 }}>Fonctionnement</h1>
      <div style={{ display:'flex', gap:0, borderBottom:`1px solid ${M.border}`, marginBottom:32, overflowX:'auto', position:'sticky', top:0, background:M.bg, zIndex:50, paddingTop:4 }}>
        {TABS.map((t, i) => <button key={t} onClick={() => setTab(i)} style={{ background:'none', border:'none', borderBottom: tab === i ? `2px solid ${M.gold}` : '2px solid transparent', color: tab === i ? M.gold : M.t3, fontFamily:BD, fontSize:13, fontWeight:500, padding:'10px 16px', cursor:'pointer', whiteSpace:'nowrap', transition:'all .3s' }}>{t}</button>)}
      </div>
      <Sub />
    </div>
  );
}
