'use client';

import { useState } from 'react';
import { M, HD, BD, MN } from '../shared/constants';
import MYNECard from '../shared/MYNECard';
import { DATA_WALLET_SECTIONS, WALLET_FREEMIUM, ARCHITECTURE_PILLARS } from '../shared/data';

function Badge({ label, color }: { label: string; color: string }) {
  return <span style={{ display:'inline-block', padding:'3px 10px', borderRadius:4, background:`${color}15`, color, fontFamily:MN, fontSize:10, fontWeight:600, letterSpacing:1, textTransform:'uppercase' }}>{label}</span>;
}

const TABS = ['Data Wallet', 'Triptyque Architecture'];

function SubDataWallet() {
  return (
    <div>
      <h2 style={{ fontFamily:HD, fontSize:28, fontWeight:400, marginBottom:12, color:M.t1 }}>Data Wallet — Votre compte bancaire de données</h2>
      <p style={{ fontSize:15, color:M.t2, maxWidth:720, lineHeight:1.8, marginBottom:24 }}>Le Data Wallet est l&apos;interface principale de l&apos;utilisateur. Il centralise le solde, les catégories, les offres, le Data Graph, les NFT et les options de retrait.</p>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(300px, 1fr))', gap:16, marginBottom:32 }}>
        {DATA_WALLET_SECTIONS.map(s => (
          <MYNECard key={s.id} hover style={{ borderTop:`3px solid ${s.color}` }}>
            <div style={{ fontWeight:600, color:s.color, marginBottom:6 }}>{s.label}</div>
            <p style={{ fontSize:13, color:M.t2, lineHeight:1.6, marginBottom:12 }}>{s.desc}</p>
            <ul style={{ padding:0, listStyle:'none', margin:0 }}>{s.features.map((f, i) => <li key={i} style={{ fontSize:12, color:M.t2, padding:'3px 0', borderBottom:`1px solid ${M.border}` }}>✦ {f}</li>)}</ul>
          </MYNECard>
        ))}
      </div>
      <h3 style={{ fontFamily:HD, marginBottom:12, color:M.t1 }}>Freemium vs Premium</h3>
      <div style={{ display:'flex', gap:16, flexWrap:'wrap' }}>
        {[WALLET_FREEMIUM.free, WALLET_FREEMIUM.premium].map((p, i) => (
          <MYNECard key={p.label} hover style={{ flex:'1 1 300px', borderTop:`3px solid ${i === 0 ? M.t3 : M.gold}` }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:8 }}>
              <span style={{ fontWeight:600, fontSize:16, color:M.t1 }}>{p.label}</span>
              <span style={{ fontFamily:MN, fontSize:20, color: i === 0 ? M.t3 : M.gold, fontWeight:700 }}>{p.price}</span>
            </div>
            <ul style={{ padding:0, listStyle:'none', margin:0 }}>{p.features.map((f, idx) => <li key={idx} style={{ fontSize:13, color:M.t2, padding:'4px 0', borderBottom:`1px solid ${M.border}` }}>✦ {f}</li>)}</ul>
            {'note' in p && <div style={{ fontSize:11, color:M.green, marginTop:8 }}>⚡ {(p as { note: string }).note}</div>}
          </MYNECard>
        ))}
      </div>
    </div>
  );
}

function SubTriptyque() {
  return (
    <div>
      <h2 style={{ fontFamily:HD, fontSize:28, fontWeight:400, marginBottom:24, color:M.t1 }}>YKNOW &middot; ÆLYA &middot; MYNε — Trois couches. Un système.</h2>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(300px, 1fr))', gap:16, marginBottom:32 }}>
        {ARCHITECTURE_PILLARS.map(p => (
          <MYNECard key={p.id} style={{ borderTop:`4px solid ${p.color}` }}>
            <div style={{ fontFamily:MN, fontWeight:700, fontSize:20, color:p.color, marginBottom:2 }}>{p.label}</div>
            <div style={{ fontSize:12, color:M.t3, marginBottom:12 }}>{p.subtitle}</div>
            <div style={{ fontFamily:MN, fontSize:12, color:M.gold, marginBottom:14, fontWeight:700 }}>{p.metric}</div>
            <p style={{ fontSize:13, color:M.t2, lineHeight:1.6, marginBottom:14 }}>{p.desc}</p>
            <div style={{ marginBottom:10 }}>
              <div style={{ fontSize:11, fontWeight:600, color:M.green, marginBottom:4 }}>Inputs</div>
              {p.inputs.map((inp, j) => <div key={j} style={{ fontSize:12, color:M.t2, padding:'2px 0' }}>→ {inp}</div>)}
            </div>
            <div>
              <div style={{ fontSize:11, fontWeight:600, color:p.color, marginBottom:4 }}>Outputs</div>
              {p.outputs.map((out, j) => <div key={j} style={{ fontSize:12, color:M.t2, padding:'2px 0' }}>← {out}</div>)}
            </div>
          </MYNECard>
        ))}
      </div>
      <MYNECard>
        <div style={{ fontWeight:700, fontSize:16, color:M.t1, marginBottom:16 }}>Flux directionnels</div>
        <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
          {[
            { from:'YKNOW', to:'ÆLYA', label:'Données brutes T0', color:'#06b6d4' },
            { from:'ÆLYA', to:'MYNε', label:'Dataset certifié + prix', color:'#a78bfa' },
            { from:'MYNε', to:'ÆLYA', label:'Offres acheteurs', color:'#d4a574' },
            { from:'ÆLYA', to:'YKNOW', label:'Feedback conformité', color:'#22c55e' },
            { from:'MYNε', to:'ÆLYA', label:'Revenue 53 % → producteur', color:'#22c55e' },
          ].map((lk, i) => (
            <div key={i} style={{ display:'flex', alignItems:'center', gap:10, padding:'8px 12px', background:lk.color + '08', borderRadius:8, borderLeft:`3px solid ${lk.color}` }}>
              <span style={{ fontFamily:MN, fontSize:12, color:lk.color, fontWeight:700, minWidth:60 }}>{lk.from}</span>
              <span style={{ color:M.t3 }}>→</span>
              <span style={{ fontFamily:MN, fontSize:12, color:lk.color, fontWeight:700, minWidth:60 }}>{lk.to}</span>
              <span style={{ fontSize:12, color:M.t2, flex:1 }}>{lk.label}</span>
            </div>
          ))}
        </div>
      </MYNECard>
    </div>
  );
}

export default function ServicesView() {
  const [tab, setTab] = useState(0);
  const subs = [SubDataWallet, SubTriptyque];
  const Sub = subs[tab];
  return (
    <div style={{ padding:'32px 32px 60px', maxWidth:1100, margin:'0 auto' }}>
      <h1 style={{ fontFamily:HD, fontSize:'clamp(28px,5vw,44px)', fontWeight:400, marginBottom:12, color:M.gold }}>Services</h1>
      <div style={{ display:'flex', gap:0, borderBottom:`1px solid ${M.border}`, marginBottom:32, overflowX:'auto', position:'sticky', top:0, background:M.bg, zIndex:50, paddingTop:4 }}>
        {TABS.map((t, i) => <button key={t} onClick={() => setTab(i)} style={{ background:'none', border:'none', borderBottom: tab === i ? `2px solid ${M.gold}` : '2px solid transparent', color: tab === i ? M.gold : M.t3, fontFamily:BD, fontSize:13, fontWeight:500, padding:'10px 16px', cursor:'pointer', whiteSpace:'nowrap', transition:'all .3s' }}>{t}</button>)}
      </div>
      <Sub />
    </div>
  );
}
