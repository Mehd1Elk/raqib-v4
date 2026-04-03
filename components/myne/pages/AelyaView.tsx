'use client';

import { useState } from 'react';
import { M, HD, BD, MN } from '../shared/constants';
import MYNECard from '../shared/MYNECard';
import { AELYA_TOUCHPOINTS, CGU_CLAUSES, SDK_TIERS, DISTRIBUTION_RINGS, ROADMAP_HORIZONS } from '../shared/data';

const TABS = ['Agent Fiduciaire','CGU Scanner','Extension Navigateur','SDK','Distribution','Roadmap'];

function Badge({ label, color }: { label: string; color: string }) {
  return <span style={{ display:'inline-block', padding:'3px 10px', borderRadius:4, background:`${color}15`, color, fontFamily:MN, fontSize:10, fontWeight:400, letterSpacing:1, textTransform:'uppercase' }}>{label}</span>;
}

function SubAgent() {
  const specs = [
    { label:'Rôle', value:'Agent fiduciaire personnel' },
    { label:'Décision', value:'<5ms — Policy Engine temps réel' },
    { label:'Posture', value:'REJECT par défaut — opt-in explicite' },
    { label:'Périmètre', value:'Négociation A2A + Protection CGU + Gestion Wallet' },
    { label:'Autonomie', value:'Exécute vos préférences — aucun agenda propre' },
  ];
  return (
    <div>
      <h2 style={{ fontFamily:HD, fontSize:28, fontWeight:400, marginBottom:12, color:M.t1 }}>ÆLYA — Votre agent fiduciaire personnel</h2>
      <p style={{ fontSize:15, color:M.t2, maxWidth:720, lineHeight:1.8, marginBottom:24 }}>ÆLYA n&apos;est pas un chatbot. C&apos;est un agent autonome en mode fiduciaire dont l&apos;unique mandat est de protéger vos données et maximiser vos revenus.</p>
      <MYNECard style={{ marginBottom:24 }}>
        {specs.map(s => (
          <div key={s.label} style={{ display:'flex', borderBottom:`1px solid ${M.border}`, padding:'10px 0' }}>
            <span style={{ fontFamily:MN, fontSize:12, color:M.purple, minWidth:140, fontWeight:600 }}>{s.label}</span>
            <span style={{ fontSize:13, color:M.t2 }}>{s.value}</span>
          </div>
        ))}
      </MYNECard>
      <h3 style={{ fontFamily:HD, marginBottom:16, color:M.t1 }}>Points de contact avec l&apos;utilisateur</h3>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(260px, 1fr))', gap:16 }}>
        {AELYA_TOUCHPOINTS.map(t => (
          <MYNECard key={t.label} hover style={{ borderTop:`3px solid ${t.color}` }}>
            <div style={{ fontWeight:600, color:t.color, marginBottom:6 }}>{t.label}</div>
            <p style={{ fontSize:13, color:M.t2, lineHeight:1.6, marginBottom:12 }}>{t.desc}</p>
            <button style={{ padding:'8px 16px', background:t.color, color:'#000', border:'none', borderRadius:6, fontFamily:BD, fontSize:12, fontWeight:600, cursor:'pointer' }}>{t.action}</button>
          </MYNECard>
        ))}
      </div>
    </div>
  );
}

function SubCGU() {
  const [scanning, setScanning] = useState(false);
  const [done, setDone] = useState(false);
  const [score] = useState(2.1);
  const doScan = () => {
    setScanning(true);
    setTimeout(() => { setScanning(false); setDone(true); }, 2000);
  };
  return (
    <div>
      <h2 style={{ fontFamily:HD, fontSize:28, fontWeight:400, marginBottom:12, color:M.t1 }}>Scanner de CGU — Voir ce qu&apos;on vous cache</h2>
      <p style={{ fontSize:15, color:M.t2, maxWidth:720, lineHeight:1.8, marginBottom:24 }}>ÆLYA analyse les CGU en temps réel et identifie les clauses dangereuses. Score de risque instantané.</p>
      <MYNECard style={{ borderLeft:`3px solid ${M.purple}`, marginBottom:24 }}>
        <div style={{ fontFamily:MN, fontSize:14, color:M.t1, marginBottom:12 }}>Simulation : Instagram — CGU Mai 2026</div>
        {!done && !scanning && (
          <button onClick={doScan} style={{ padding:'12px 24px', background:M.purple, color:'#fff', border:'none', borderRadius:8, fontFamily:BD, fontSize:14, fontWeight:600, cursor:'pointer' }}>
            Lancer l&apos;analyse ÆLYA
          </button>
        )}
        {scanning && (
          <div style={{ fontFamily:MN, fontSize:14, color:M.purple }}>
            <span style={{ animation:'pulse 1s infinite' }}>◎</span> Analyse en cours...
            <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:.3}}`}</style>
          </div>
        )}
        {done && (
          <>
            <div style={{ display:'flex', alignItems:'center', gap:16, marginBottom:16 }}>
              <div style={{ fontFamily:MN, fontSize:40, fontWeight:300, color:M.red }}>{score}/10</div>
              <div><div style={{ fontWeight:600, color:M.red }}>RISQUE ÉLEVÉ</div><div style={{ fontSize:12, color:M.t3 }}>6 clauses analysées — 5 dangereuses ou risquées</div></div>
            </div>
            {CGU_CLAUSES.map((c, i) => (
              <div key={i} style={{ display:'flex', alignItems:'center', gap:12, padding:'10px 0', borderBottom:`1px solid ${M.border}` }}>
                <Badge label={c.label} color={c.color} />
                <span style={{ fontSize:13, color:M.t2 }}>{c.text}</span>
              </div>
            ))}
            <div style={{ fontSize:12, color:M.t3, marginTop:12 }}>ÆLYA recommande : <b style={{ color:M.red }}>RÉVOQUER le consentement</b> — trop de clauses abusives.</div>
          </>
        )}
      </MYNECard>
    </div>
  );
}

function SubExtension() {
  return (
    <div>
      <h2 style={{ fontFamily:HD, fontSize:28, fontWeight:400, marginBottom:12, color:M.t1 }}>Extension Navigateur — Protection en temps réel</h2>
      <p style={{ fontSize:15, color:M.t2, maxWidth:720, lineHeight:1.8, marginBottom:24 }}>L&apos;extension Chrome/Firefox analyse chaque page que vous visitez, intercepte les demandes de consentement, et affiche un badge de risque.</p>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(260px, 1fr))', gap:16 }}>
        {[{l:'Badge temps réel',c:M.green,d:'Vert / Orange / Rouge affiché sur chaque site que vous visitez.'},{l:'Interception CGU',c:M.purple,d:'Analyse automatique des cookies et pop-ups de consentement.'},{l:'Blocage SDK tiers',c:M.red,d:'Liste des trackers identifiés et bloqués par ÆLYA.'},{l:'Dashboard intégré',c:M.gold,d:'Statistiques hebdomadaires : sites visités, trackers bloqués, économies réalisées.'}].map(f => (
          <MYNECard key={f.l} hover style={{ borderTop:`3px solid ${f.c}` }}>
            <div style={{ fontWeight:600, color:f.c, marginBottom:6 }}>{f.l}</div>
            <p style={{ fontSize:13, color:M.t2 }}>{f.d}</p>
          </MYNECard>
        ))}
      </div>
    </div>
  );
}

function SubSDK() {
  const code = `npm install @myne/aelya-sdk

import { AelyaClient } from '@myne/aelya-sdk'
const aelya = new AelyaClient({ apiKey: 'YOUR_KEY' })
const consent = await aelya.requestConsent({
  userId: 'user_123',
  categories: ['health', 'behavior'],
  tLevel: 'T3',
})
console.log(consent.decision) // 'ACCEPT'
console.log(consent.price)    // 0.025`;
  return (
    <div>
      <h2 style={{ fontFamily:HD, fontSize:28, fontWeight:400, marginBottom:12, color:M.t1 }}>SDK ÆLYA — Intégrez la souveraineté en 3 lignes</h2>
      <p style={{ fontSize:15, color:M.t2, maxWidth:720, lineHeight:1.8, marginBottom:24 }}>4 tiers adaptés à votre usage. Du prototype gratuit au déploiement enterprise.</p>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(220px, 1fr))', gap:16, marginBottom:32 }}>
        {SDK_TIERS.map(t => (
          <MYNECard key={t.label} hover style={{ borderTop:`3px solid ${t.color}`, position:'relative' }}>
            {t.rec && <div style={{ position:'absolute', top:-10, right:16 }}><Badge label="RECOMMANDÉ" color={M.green} /></div>}
            <div style={{ fontWeight:600, fontSize:16, color:M.t1, marginBottom:4 }}>{t.label}</div>
            <div style={{ fontFamily:MN, fontSize:28, color:t.color, fontWeight:300, marginBottom:4 }}>{t.price}{typeof t.price === 'number' ? ' €/mois' : ''}</div>
            <div style={{ fontSize:11, color:M.t3, marginBottom:12 }}>{t.uam}</div>
            <ul style={{ padding:0, listStyle:'none', margin:'0 0 16px' }}>{t.features.map((f, i) => <li key={i} style={{ fontSize:12, color:M.t2, padding:'4px 0', borderBottom:`1px solid ${M.border}` }}>&#10022; {f}</li>)}</ul>
            <button style={{ width:'100%', padding:'10px', background:t.color, color:'#000', border:'none', borderRadius:6, fontFamily:BD, fontSize:13, fontWeight:600, cursor:'pointer' }}>{t.cta}</button>
          </MYNECard>
        ))}
      </div>
      <h3 style={{ fontFamily:HD, marginBottom:12, color:M.t1 }}>Exemple d&apos;intégration</h3>
      <MYNECard style={{ borderLeft:`3px solid ${M.purple}` }}>
        <pre style={{ fontFamily:MN, fontSize:12, color:M.t2, lineHeight:1.8, whiteSpace:'pre-wrap', margin:0 }}>{code}</pre>
      </MYNECard>
    </div>
  );
}

function SubDistribution() {
  return (
    <div>
      <h2 style={{ fontFamily:HD, fontSize:28, fontWeight:400, marginBottom:12, color:M.t1 }}>310 000 n&#339;uds à M24 — Zéro acquisition payante</h2>
      <p style={{ fontSize:15, color:M.t2, maxWidth:720, lineHeight:1.8, marginBottom:24 }}>Quatre anneaux de distribution concentriques. CAC moyen {'<'} 0,10 €. La viralité organique du CGU Scanner alimente 65 % du volume.</p>
      <div style={{ display:'flex', gap:16, marginBottom:24, flexWrap:'wrap' }}>
        <div style={{ textAlign:'center', padding:16 }}><div style={{ fontFamily:MN, fontSize:42, color:M.gold, fontWeight:300 }}>310 000</div><div style={{ fontSize:11, color:M.t3 }}>n&#339;uds cibles M24</div></div>
        <div style={{ textAlign:'center', padding:16 }}><div style={{ fontFamily:MN, fontSize:42, color:M.green, fontWeight:300 }}>{'<'} 0,10 €</div><div style={{ fontSize:11, color:M.t3 }}>CAC moyen</div></div>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(260px, 1fr))', gap:16 }}>
        {DISTRIBUTION_RINGS.map(r => (
          <MYNECard key={r.ring} hover style={{ borderTop:`3px solid ${r.color}` }}>
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

function SubRoadmap() {
  return (
    <div>
      <h2 style={{ fontFamily:HD, fontSize:28, fontWeight:400, marginBottom:12, color:M.t1 }}>2026–2040 — De l&apos;extension au firewall neural</h2>
      <p style={{ fontSize:15, color:M.t2, maxWidth:720, lineHeight:1.8, marginBottom:24 }}>Quatre horizons. Chaque horizon débloque une nouvelle couche de souveraineté.</p>
      {ROADMAP_HORIZONS.map(h => (
        <MYNECard key={h.period} style={{ marginBottom:16, borderLeft:`3px solid ${h.color}` }}>
          <div style={{ display:'flex', gap:12, alignItems:'center', marginBottom:8 }}>
            <Badge label={h.period} color={h.color} />
            <span style={{ fontWeight:600, color:M.t1 }}>{h.label}</span>
          </div>
          <ul style={{ padding:0, listStyle:'none', margin:'0 0 8px' }}>{h.actions.map((a, i) => <li key={i} style={{ fontSize:13, color:M.t2, padding:'3px 0' }}>&rarr; {a}</li>)}</ul>
          <div style={{ fontFamily:MN, fontSize:12, color:h.color }}>Milestone: {h.milestone}</div>
        </MYNECard>
      ))}
    </div>
  );
}

export default function AelyaView() {
  const [tab, setTab] = useState(0);
  const subs = [SubAgent, SubCGU, SubExtension, SubSDK, SubDistribution, SubRoadmap];
  const Sub = subs[tab];
  return (
    <div style={{ padding:'32px 32px 60px', maxWidth:1100, margin:'0 auto' }}>
      <h1 style={{ fontFamily:HD, fontSize:'clamp(28px,5vw,44px)', fontWeight:400, marginBottom:12, color:M.purple }}>ÆLYA</h1>
      <div style={{ display:'flex', gap:0, borderBottom:`1px solid ${M.border}`, marginBottom:32, overflowX:'auto', position:'sticky', top:0, background:M.bg, zIndex:50, paddingTop:4 }}>
        {TABS.map((t, i) => <button key={t} onClick={() => setTab(i)} style={{ background:'none', border:'none', borderBottom: tab === i ? `2px solid ${M.purple}` : '2px solid transparent', color: tab === i ? M.purple : M.t3, fontFamily:BD, fontSize:13, fontWeight:500, padding:'10px 16px', cursor:'pointer', whiteSpace:'nowrap', transition:'all .3s' }}>{t}</button>)}
      </div>
      <Sub />
    </div>
  );
}
