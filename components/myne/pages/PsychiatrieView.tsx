'use client';

import { useState } from 'react';
import { M, HD, BD, MN } from '../shared/constants';
import MYNECard from '../shared/MYNECard';
import { PSY_CATEGORIES, PSY_OFFERS, PSY_TRANSFORMS, PSY_PRICES, PSY_PROTECTIONS } from '../shared/data';

function Badge({ label, color }: { label: string; color: string }) {
  return <span style={{ display:'inline-block', padding:'3px 10px', borderRadius:4, background:`${color}15`, color, fontFamily:MN, fontSize:10, fontWeight:400, letterSpacing:1, textTransform:'uppercase' }}>{label}</span>;
}

const TABS = ['Catégories','Marketplace','T-Level Santé'];

function SubCategories() {
  const totalEarn = PSY_CATEGORIES.filter(c => c.on).reduce((s, c) => s + c.earn, 0);
  return (
    <div>
      <h2 style={{ fontFamily:HD, fontSize:28, fontWeight:400, marginBottom:12, color:M.t1 }}>Données psychiatriques — Granularité totale</h2>
      <p style={{ fontSize:15, color:M.t2, maxWidth:720, lineHeight:1.8, marginBottom:24 }}>Marie-Claire, 42 ans. Dépression traitée depuis 3 ans. 6 catégories de données. Elle contrôle chaque accès.</p>
      <MYNECard style={{ marginBottom:16 }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <span style={{ fontWeight:600, color:M.t1 }}>Revenus mensuels estimés</span>
          <span style={{ fontFamily:MN, fontSize:24, color:M.green, fontWeight:300 }}>{totalEarn.toFixed(2)} €/mois</span>
        </div>
      </MYNECard>
      {PSY_CATEGORIES.map(c => (
        <MYNECard key={c.name} style={{ marginBottom:12, borderLeft:`3px solid ${c.color}`, opacity: c.on ? 1 : 0.5 }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'start', flexWrap:'wrap', gap:8 }}>
            <div>
              <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:4 }}>
                <span style={{ fontWeight:600, color:M.t1 }}>{c.name}</span>
                <Badge label={c.tl} color={c.color} />
                {!c.on && <Badge label="DÉSACTIVÉ" color={M.red} />}
              </div>
              <p style={{ fontSize:13, color:M.t2, marginBottom:4 }}>{c.desc}</p>
              {c.buyers.length > 0 && <div style={{ fontSize:11, color:M.t3 }}>Acheteurs : {c.buyers.join(' · ')}</div>}
            </div>
            <div style={{ textAlign:'right' }}>
              <span style={{ fontFamily:MN, fontSize:20, color: c.on ? M.green : M.t3 }}>{c.earn > 0 ? `${c.earn} €` : '—'}</span>
              <div style={{ fontSize:10, color:M.t3 }}>/mois</div>
            </div>
          </div>
        </MYNECard>
      ))}
    </div>
  );
}

function SubMarketplace() {
  return (
    <div>
      <h2 style={{ fontFamily:HD, fontSize:28, fontWeight:400, marginBottom:12, color:M.t1 }}>Offres en attente — ÆLYA filtre</h2>
      <p style={{ fontSize:15, color:M.t2, maxWidth:720, lineHeight:1.8, marginBottom:24 }}>ÆLYA priorise les offres selon vos préférences et vous présente un verdict. Vous décidez.</p>
      {PSY_OFFERS.map(o => (
        <MYNECard key={o.buyer} style={{ marginBottom:16, borderLeft:`3px solid ${o.vc}` }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'start', flexWrap:'wrap', gap:8, marginBottom:12 }}>
            <div>
              <div style={{ fontWeight:600, color:M.t1, marginBottom:4 }}>{o.buyer}</div>
              <p style={{ fontSize:13, color:M.t2 }}>{o.purpose}</p>
            </div>
            <Badge label={o.verdict} color={o.vc} />
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(120px, 1fr))', gap:12, marginBottom:12 }}>
            <div><span style={{ fontFamily:MN, fontSize:11, color:M.t3 }}>Prix/profil</span><div style={{ fontFamily:MN, color:M.gold }}>{o.spp} €</div></div>
            <div><span style={{ fontFamily:MN, fontSize:11, color:M.t3 }}>Profils</span><div style={{ fontFamily:MN, color:M.t1 }}>{o.target.toLocaleString()}</div></div>
            <div><span style={{ fontFamily:MN, fontSize:11, color:M.t3 }}>T-Level</span><div><Badge label={o.tl} color={M.purple} /></div></div>
            <div><span style={{ fontFamily:MN, fontSize:11, color:M.t3 }}>Durée</span><div style={{ fontFamily:MN, color:M.t2 }}>{o.dur}</div></div>
            <div><span style={{ fontFamily:MN, fontSize:11, color:M.t3 }}>Pool</span><div style={{ fontFamily:MN, color:M.green }}>{o.pool.toLocaleString()} €</div></div>
          </div>
          <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
            {o.certs.map(c => <Badge key={c} label={c} color={M.green} />)}
          </div>
          <div style={{ display:'flex', gap:8, marginTop:12 }}>
            <button style={{ padding:'8px 16px', background:M.green, color:'#000', border:'none', borderRadius:6, fontFamily:BD, fontSize:12, fontWeight:600, cursor:'pointer' }}>Accepter</button>
            <button style={{ padding:'8px 16px', background:'transparent', color:M.t2, border:`1px solid ${M.border}`, borderRadius:6, fontFamily:BD, fontSize:12, cursor:'pointer' }}>Refuser</button>
          </div>
        </MYNECard>
      ))}
    </div>
  );
}

function SubTLevel() {
  const [level, setLevel] = useState(1);
  const levels = ['T1','T2','T3','T4','T5'] as const;
  const tl = levels[level];
  const data = PSY_TRANSFORMS[tl];
  const price = PSY_PRICES[tl];
  const prot = PSY_PROTECTIONS[tl];
  return (
    <div>
      <h2 style={{ fontFamily:HD, fontSize:28, fontWeight:400, marginBottom:12, color:M.t1 }}>Transformation T-Level — Données psychiatriques</h2>
      <p style={{ fontSize:15, color:M.t2, maxWidth:720, lineHeight:1.8, marginBottom:24 }}>Ce que voit l&apos;acheteur à chaque niveau de transformation.</p>
      <div style={{ marginBottom:16 }}>
        <label style={{ fontFamily:MN, fontSize:12, color:M.t3 }}>{tl} — Protection {prot}% — {price} €/profil</label>
        <input type="range" min={0} max={4} value={level} onChange={e => setLevel(+e.target.value)} style={{ width:'100%', accentColor:M.purple, margin:'12px 0' }} />
      </div>
      {data && (
        <MYNECard style={{ borderTop:`3px solid ${M.purple}` }}>
          <div style={{ fontFamily:MN, fontSize:12, color:M.purple, marginBottom:12 }}>CE QUE VOIT L&apos;ACHETEUR — {tl}</div>
          {Object.entries(data).map(([k, v]) => (
            <div key={k} style={{ display:'flex', padding:'6px 0', borderBottom:`1px solid ${M.border}` }}>
              <span style={{ fontFamily:MN, fontSize:12, color:M.t3, minWidth:120 }}>{k}</span>
              <span style={{ fontSize:13, color:M.t1 }}>{v}</span>
            </div>
          ))}
        </MYNECard>
      )}
    </div>
  );
}

export default function PsychiatrieView() {
  const [tab, setTab] = useState(0);
  const subs = [SubCategories, SubMarketplace, SubTLevel];
  const Sub = subs[tab];
  return (
    <div style={{ padding:'32px 32px 60px', maxWidth:1100, margin:'0 auto' }}>
      <h1 style={{ fontFamily:HD, fontSize:'clamp(28px,5vw,44px)', fontWeight:400, marginBottom:12, color:M.green }}>Psychiatrie</h1>
      <div style={{ display:'flex', gap:0, borderBottom:`1px solid ${M.border}`, marginBottom:32, overflowX:'auto', position:'sticky', top:0, background:M.bg, zIndex:50, paddingTop:4 }}>
        {TABS.map((t, i) => <button key={t} onClick={() => setTab(i)} style={{ background:'none', border:'none', borderBottom: tab === i ? `2px solid ${M.green}` : '2px solid transparent', color: tab === i ? M.green : M.t3, fontFamily:BD, fontSize:13, fontWeight:500, padding:'10px 16px', cursor:'pointer', whiteSpace:'nowrap', transition:'all .3s' }}>{t}</button>)}
      </div>
      <Sub />
    </div>
  );
}
