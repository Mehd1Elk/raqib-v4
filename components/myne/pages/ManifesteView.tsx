'use client';

import { useState } from 'react';
import { M, HD, BD, MN } from '../shared/constants';
import MYNECard from '../shared/MYNECard';
import { KELTA_INVERSIONS, VOL_LEGAL_ROWS, VOL_LEGAL_STATS, CONTRADICTIONS, SPOTIFY_COMPARISON, GAFAM_MODELS, ECO_INTENTION_PRICING, TAM_DATA } from '../shared/data';

const TABS = ['KELTA','Vol légal','Contradictions','Analogie Spotify','Modèles GAFAM','Économie intention','TAM','Équipe'];

function Badge({ label, color }: { label: string; color: string }) {
  return <span style={{ display:'inline-block', padding:'3px 10px', borderRadius:4, background:`${color}15`, color, fontFamily:MN, fontSize:10, fontWeight:600, letterSpacing:1, textTransform:'uppercase' }}>{label}</span>;
}

function AccordionItem({ item, idx, open, toggle }: { item: typeof CONTRADICTIONS[0]; idx: number; open: boolean; toggle: () => void }) {
  return (
    <div style={{ border:`1px solid ${M.border}`, borderRadius:8, marginBottom:8, background:M.bgCard, overflow:'hidden' }}>
      <button onClick={toggle} style={{ width:'100%', display:'flex', alignItems:'center', gap:12, padding:'14px 18px', background:'none', border:'none', cursor:'pointer', color:M.t1, fontFamily:BD, fontSize:14, textAlign:'left' }}>
        <span style={{ fontFamily:MN, fontSize:11, minWidth:28, color:item.sc }}>{String(idx+1).padStart(2,'0')}</span>
        <span style={{ flex:1 }}>{item.t}</span>
        <Badge label={item.s} color={item.sc} />
        <span style={{ transition:'transform .2s', transform: open ? 'rotate(90deg)' : 'none', fontSize:18, color:M.t3 }}>›</span>
      </button>
      <div style={{ maxHeight: open ? 200 : 0, overflow:'hidden', transition:'max-height .4s' }}>
        <div style={{ padding:'0 18px 16px 58px', fontSize:13, color:M.t2, lineHeight:1.7, borderLeft:`2px solid ${item.sc}` }}>{item.r}</div>
      </div>
    </div>
  );
}

function SubKelta() {
  return (
    <div>
      <h2 style={{ fontFamily:HD, fontSize:28, fontWeight:400, marginBottom:12, color:M.t1 }}>KELTA — Le manifeste fondateur</h2>
      <p style={{ fontSize:15, color:M.t2, maxWidth:720, lineHeight:1.8, marginBottom:32, fontFamily:BD }}>KELTA n&apos;est pas un slogan marketing. C&apos;est la matrice analytique qui a précédé MYNε. Quatre diagnostics. Quatre corrections. Un seul produit.</p>
      {KELTA_INVERSIONS.map((p, i) => (
        <MYNECard key={i} style={{ marginBottom:16, borderLeft:`3px solid ${p.color}` }}>
          <div style={{ display:'flex', gap:12, alignItems:'center', marginBottom:8 }}>
            <span style={{ fontFamily:MN, fontSize:12, color:M.t3 }}>{p.num}</span>
            <Badge label={`${p.from} → ${p.to}`} color={p.color} />
          </div>
          <h3 style={{ fontFamily:HD, fontSize:20, marginBottom:8, color:M.t1 }}>{p.hl}</h3>
          <p style={{ fontSize:14, color:M.t2, lineHeight:1.7, maxWidth:720, marginBottom:12 }}>{p.body}</p>
          <div style={{ display:'flex', alignItems:'baseline', gap:8 }}>
            <span style={{ fontFamily:MN, fontSize:28, color:p.color }}>{p.sv}</span>
            <span style={{ fontSize:12, color:M.t3 }}>{p.sl}</span>
          </div>
        </MYNECard>
      ))}
    </div>
  );
}

function SubVolLegal() {
  return (
    <div>
      <h2 style={{ fontFamily:HD, fontSize:28, fontWeight:400, marginBottom:12, color:M.t1 }}>Vol légal — La mécanique exacte</h2>
      <p style={{ fontSize:15, color:M.t2, maxWidth:720, lineHeight:1.8, marginBottom:32 }}>Ce n&apos;est pas illégal. Les CGU l&apos;autorisent. C&apos;est pour ça que c&apos;est pire.</p>
      <table style={{ width:'100%', borderCollapse:'collapse', fontSize:13, marginBottom:24 }}>
        <thead><tr><th style={{ textAlign:'left', padding:'10px 12px', borderBottom:`1px solid ${M.border}`, color:M.gold, fontWeight:600, width:160 }}>Dimension</th><th style={{ textAlign:'left', padding:'10px 12px', borderBottom:`1px solid ${M.border}`, color:M.t1, fontWeight:600 }}>Réponse</th></tr></thead>
        <tbody>{VOL_LEGAL_ROWS.map((r, i) => <tr key={i}><td style={{ padding:'10px 12px', borderBottom:`1px solid ${M.border}`, fontWeight:600, color:M.gold }}>{r[0]}</td><td style={{ padding:'10px 12px', borderBottom:`1px solid ${M.border}`, color:M.t2 }}>{r[1]}</td></tr>)}</tbody>
      </table>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(140px, 1fr))', gap:16 }}>
        {VOL_LEGAL_STATS.map((s, i) => <div key={i} style={{ textAlign:'center', padding:16 }}><div style={{ fontFamily:MN, fontSize:24, color:M.gold }}>{s.v}</div><div style={{ fontSize:11, color:M.t3, marginTop:4 }}>{s.l}</div></div>)}
      </div>
    </div>
  );
}

function SubContradictions() {
  const [openIdx, setOpenIdx] = useState(-1);
  return (
    <div>
      <h2 style={{ fontFamily:HD, fontSize:28, fontWeight:400, marginBottom:12, color:M.t1 }}>8 contradictions que nous assumons</h2>
      <p style={{ fontSize:15, color:M.t2, maxWidth:720, lineHeight:1.8, marginBottom:32 }}>Un projet honnête liste ses tensions plutôt que de les dissimuler.</p>
      {CONTRADICTIONS.map((c, i) => <AccordionItem key={i} item={c} idx={i} open={openIdx === i} toggle={() => setOpenIdx(openIdx === i ? -1 : i)} />)}
    </div>
  );
}

function SubSpotify() {
  return (
    <div>
      <h2 style={{ fontFamily:HD, fontSize:28, fontWeight:400, marginBottom:24, color:M.t1 }}>MYNε est au marché de la donnée ce que Spotify est à la musique.</h2>
      <div style={{ overflowX:'auto' }}>
        <table style={{ width:'100%', borderCollapse:'collapse', fontSize:13 }}>
          <thead><tr>{['Dimension','Spotify','MYNε','Insight'].map(h => <th key={h} style={{ padding:'10px 12px', textAlign:'left', borderBottom:`1px solid ${M.border}`, color: h === 'MYNε' ? M.gold : M.t1, fontWeight:600 }}>{h}</th>)}</tr></thead>
          <tbody>{SPOTIFY_COMPARISON.map((p, i) => <tr key={i}><td style={{ padding:'10px 12px', borderBottom:`1px solid ${M.border}`, fontWeight:600, color:M.t1 }}>{p.d}</td><td style={{ padding:'10px 12px', borderBottom:`1px solid ${M.border}`, color:M.t2 }}>{p.s}</td><td style={{ padding:'10px 12px', borderBottom:`1px solid ${M.border}`, color:M.gold }}>{p.m}</td><td style={{ padding:'10px 12px', borderBottom:`1px solid ${M.border}`, color:M.t3, fontSize:12 }}>{p.i}</td></tr>)}</tbody>
        </table>
      </div>
    </div>
  );
}

function SubGafam() {
  return (
    <div>
      <h2 style={{ fontFamily:HD, fontSize:28, fontWeight:400, marginBottom:24, color:M.t1 }}>Trois modèles. Un seul gagnant.</h2>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(260px, 1fr))', gap:16 }}>
        {GAFAM_MODELS.map(m => (
          <MYNECard key={m.id} style={{ borderTop:`3px solid ${m.color}` }}>
            <div style={{ fontWeight:600, fontSize:16, color:m.color, marginBottom:6 }}>{m.label}</div>
            <p style={{ fontSize:13, color:M.t2, marginBottom:12 }}>{m.resume}</p>
            <ul style={{ listStyle:'none', padding:0, marginBottom:16 }}>{m.props.map((p, i) => <li key={i} style={{ fontSize:12, color:M.t2, padding:'4px 0', borderBottom:`1px solid ${M.border}` }}>• {p}</li>)}</ul>
            <Badge label={m.verdict} color={m.color} />
          </MYNECard>
        ))}
      </div>
    </div>
  );
}

function SubEcoIntention() {
  return (
    <div>
      <h2 style={{ fontFamily:HD, fontSize:28, fontWeight:400, marginBottom:12, color:M.t1 }}>L&apos;économie de l&apos;intention</h2>
      <p style={{ fontSize:15, color:M.t2, maxWidth:720, lineHeight:1.8, marginBottom:32 }}>L&apos;économie de l&apos;attention capte votre temps malgré vous. L&apos;économie de l&apos;intention monétise vos projets avec vous.</p>
      <div style={{ display:'flex', gap:24, flexWrap:'wrap', marginBottom:32 }}>
        <MYNECard style={{ flex:'1 1 300px', borderTop:`3px solid ${M.red}` }}>
          <h3 style={{ color:M.red, fontSize:16, marginBottom:12 }}>Économie de l&apos;attention</h3>
          <div style={{ fontSize:13, color:M.t2, lineHeight:1.8 }}><b>Mécanisme:</b> Capter le regard → vendre l&apos;exposition<br/><b>Gagnant:</b> Annonceur + Plateforme<br/><b>Perdant:</b> Utilisateur</div>
        </MYNECard>
        <MYNECard style={{ flex:'1 1 300px', borderTop:`3px solid ${M.green}` }}>
          <h3 style={{ color:M.green, fontSize:16, marginBottom:12 }}>Économie de l&apos;intention</h3>
          <div style={{ fontSize:13, color:M.t2, lineHeight:1.8 }}><b>Mécanisme:</b> Déclarer un projet → acheteurs concurrencent<br/><b>Gagnant:</b> Individu (53%) + Acheteur<br/><b>Perdant:</b> Courtiers parasitaires</div>
        </MYNECard>
      </div>
      <h3 style={{ fontFamily:HD, marginBottom:12, color:M.t1 }}>Pricing des intentions</h3>
      <table style={{ width:'100%', borderCollapse:'collapse', fontSize:13 }}>
        <thead><tr><th style={{ padding:'10px 12px', textAlign:'left', borderBottom:`1px solid ${M.border}`, color:M.t1 }}>Type</th><th style={{ padding:'10px 12px', textAlign:'left', borderBottom:`1px solid ${M.border}`, color:M.gold }}>Fourchette</th><th style={{ padding:'10px 12px', textAlign:'left', borderBottom:`1px solid ${M.border}`, color:M.t1 }}>Acheteurs</th></tr></thead>
        <tbody>{ECO_INTENTION_PRICING.map((p, i) => <tr key={i}><td style={{ padding:'10px 12px', borderBottom:`1px solid ${M.border}`, fontWeight:500, color:M.t1 }}>{p.type}</td><td style={{ padding:'10px 12px', borderBottom:`1px solid ${M.border}`, fontFamily:MN, color:M.gold }}>{p.f}</td><td style={{ padding:'10px 12px', borderBottom:`1px solid ${M.border}`, fontSize:12, color:M.t2 }}>{p.a}</td></tr>)}</tbody>
      </table>
    </div>
  );
}

function SubTam() {
  return (
    <div>
      <h2 style={{ fontFamily:HD, fontSize:28, fontWeight:400, marginBottom:24, color:M.t1 }}>Un marché de $10,8 milliards</h2>
      <table style={{ width:'100%', borderCollapse:'collapse', fontSize:13, marginBottom:32 }}>
        <thead><tr>{['Marché','Part','TAM','Logique'].map(h => <th key={h} style={{ padding:'10px 12px', textAlign:'left', borderBottom:`1px solid ${M.border}`, color: h === 'TAM' ? M.gold : M.t1, fontWeight:600 }}>{h}</th>)}</tr></thead>
        <tbody>{TAM_DATA.map((t, i) => <tr key={i}><td style={{ padding:'10px 12px', borderBottom:`1px solid ${M.border}`, fontWeight:500, color:M.t1 }}>{t.m}</td><td style={{ padding:'10px 12px', borderBottom:`1px solid ${M.border}`, fontFamily:MN, color:M.t2 }}>{t.p}</td><td style={{ padding:'10px 12px', borderBottom:`1px solid ${M.border}`, fontFamily:MN, color:M.gold, fontWeight:700 }}>{t.t}</td><td style={{ padding:'10px 12px', borderBottom:`1px solid ${M.border}`, fontSize:12, color:M.t2 }}>{t.l}</td></tr>)}</tbody>
      </table>
      <MYNECard style={{ textAlign:'center', marginBottom:32 }}>
        <div style={{ fontFamily:MN, fontSize:36, color:M.gold, fontWeight:700 }}>$10,8 Mds</div>
        <div style={{ fontSize:12, color:M.t3, marginTop:4 }}>TAM conservateur — part de marché réaliste à 5 ans</div>
      </MYNECard>
      <h3 style={{ fontFamily:HD, marginBottom:16, color:M.t1 }}>Scénarios de valorisation</h3>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(260px, 1fr))', gap:16 }}>
        {[{t:'Scénario Pipeline',d:'MYNε outil technique B2B uniquement',v:'5–15 M€',c:M.red,b:'Sous-valorisé'},{t:'Scénario Data Wallet',d:'App grand public freemium',v:'50–200 M€',c:M.gold,b:'Réaliste M24'},{t:'Scénario Marketplace',d:'Standard de facto — corridor 600M',v:'1–5 Mds€',c:M.green,b:'Atteignable M60'}].map((s, i) => (
          <MYNECard key={i} style={{ borderTop:`3px solid ${s.c}` }}>
            <div style={{ fontWeight:600, marginBottom:4, color:M.t1 }}>{s.t}</div>
            <p style={{ fontSize:12, color:M.t2, marginBottom:8 }}>{s.d}</p>
            <div style={{ fontFamily:MN, fontSize:20, color:s.c, marginBottom:4 }}>{s.v}</div>
            <Badge label={s.b} color={s.c} />
          </MYNECard>
        ))}
      </div>
    </div>
  );
}

function SubEquipe() {
  return (
    <div>
      <h2 style={{ fontFamily:HD, fontSize:28, fontWeight:400, marginBottom:24, color:M.t1 }}>Les architectes de la souveraineté</h2>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(300px, 1fr))', gap:16 }}>
        <MYNECard>
          <div style={{ display:'flex', alignItems:'center', gap:16, marginBottom:12 }}>
            <div style={{ width:48, height:48, borderRadius:'50%', background:`${M.gold}30`, display:'flex', alignItems:'center', justifyContent:'center', fontFamily:MN, fontWeight:700, color:M.gold }}>MH</div>
            <div><div style={{ fontFamily:HD, fontSize:20, color:M.t1 }}>Mehdi</div><div style={{ fontSize:14, fontWeight:600, color:M.gold }}>CEO &amp; Co-fondateur</div></div>
          </div>
          <p style={{ fontSize:14, color:M.t2 }}>Vision stratégique, corridor Afrique-MENA-EU, go-to-market, fundraising</p>
        </MYNECard>
        <MYNECard>
          <div style={{ display:'flex', alignItems:'center', gap:16, marginBottom:12 }}>
            <div style={{ width:48, height:48, borderRadius:'50%', background:`${M.purple}30`, display:'flex', alignItems:'center', justifyContent:'center', fontFamily:MN, fontWeight:700, color:M.purple }}>JM</div>
            <div><div style={{ fontFamily:HD, fontSize:20, color:M.t1 }}>Johan Delhomme Montorfano</div><div style={{ fontSize:14, fontWeight:600, color:M.purple }}>CTO &amp; Co-fondateur</div></div>
          </div>
          <p style={{ fontSize:14, color:M.t2, marginBottom:8 }}>Architecture T-Levels, Differential Privacy, smart contracts Base L2</p>
          <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
            <Badge label="EPITECH" color={M.purple} />
            <Badge label="SPADE Apr.2025" color={M.purple} />
          </div>
          <p style={{ fontSize:12, color:M.t3, marginTop:8 }}>10–15% equity — vesting 4 ans, cliff 1 an</p>
        </MYNECard>
      </div>
    </div>
  );
}

export default function ManifesteView() {
  const [tab, setTab] = useState(0);
  const subs = [SubKelta, SubVolLegal, SubContradictions, SubSpotify, SubGafam, SubEcoIntention, SubTam, SubEquipe];
  const Sub = subs[tab];
  return (
    <div style={{ padding: '32px 32px 60px', maxWidth: 1100, margin: '0 auto' }}>
      <h1 style={{ fontFamily:HD, fontSize:'clamp(28px,5vw,44px)', fontWeight:400, marginBottom:12, color:M.t1 }}>Manifeste</h1>
      <div style={{ display:'flex', gap:0, borderBottom:`1px solid ${M.border}`, marginBottom:32, overflowX:'auto', position:'sticky', top:0, background:M.bg, zIndex:50, paddingTop:4 }}>
        {TABS.map((t, i) => (
          <button key={t} onClick={() => setTab(i)} style={{ background:'none', border:'none', borderBottom: tab === i ? `2px solid ${M.gold}` : '2px solid transparent', color: tab === i ? M.gold : M.t3, fontFamily:BD, fontSize:13, fontWeight:500, padding:'10px 16px', cursor:'pointer', whiteSpace:'nowrap', transition:'all .3s' }}>{t}</button>
        ))}
      </div>
      <Sub />
    </div>
  );
}
