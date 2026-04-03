'use client';

import { useState } from 'react';
import { M, HD, BD, MN } from '../shared/constants';
import MYNECard from '../shared/MYNECard';
import { AELYA_TOUCHPOINTS, CGU_CLAUSES } from '../shared/data';

const TABS = ['Agent Fiduciaire','CGU Scanner','Extension Navigateur'];

function Badge({ label, color }: { label: string; color: string }) {
  return <span style={{ display:'inline-block', padding:'3px 10px', borderRadius:4, background:`${color}15`, color, fontFamily:MN, fontSize:10, fontWeight:600, letterSpacing:1, textTransform:'uppercase' }}>{label}</span>;
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
              <div style={{ fontFamily:MN, fontSize:40, fontWeight:700, color:M.red }}>{score}/10</div>
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

export default function AelyaView() {
  const [tab, setTab] = useState(0);
  const subs = [SubAgent, SubCGU, SubExtension];
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
