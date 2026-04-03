'use client';

import { useState, useEffect, useRef } from 'react';
import { M, HD, BD, MN } from '../shared/constants';
import MYNECard from '../shared/MYNECard';

function AnimCounter({ target, label }: { target: string; label: string }) {
  const [val, setVal] = useState('0');
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const isNum = /^\d+$/.test(target.replace(/[.,\s]/g, ''));
    if (!isNum) { setVal(target); return; }
    const end = parseInt(target.replace(/[.,\s]/g, ''));
    const dur = 1200; const t0 = Date.now();
    const tick = () => {
      const p = Math.min(1, (Date.now() - t0) / dur);
      setVal(Math.round(end * p).toLocaleString('fr'));
      if (p < 1) requestAnimationFrame(tick); else setVal(target);
    };
    tick();
  }, [target]);
  return (
    <div style={{ textAlign: 'center', padding: '0 20px', borderRight: `1px solid ${M.border}` }}>
      <div ref={ref} style={{ fontFamily: MN, fontSize: 28, fontWeight: 300, color: M.gold }}>{val}</div>
      <div style={{ fontFamily: BD, fontSize: 11, color: M.t3, marginTop: 4 }}>{label}</div>
    </div>
  );
}

export default function AccueilView() {
  const counters = [
    { target: '26', label: 'Tables Supabase' },
    { target: '23', label: 'Routes API' },
    { target: '92', label: 'Tests unitaires' },
    { target: '6', label: 'T-Levels' },
    { target: '13.5K', label: 'Lignes TypeScript' },
  ];

  const cards = [
    { icon: '◈', title: 'Vous possédez vos données', desc: 'Differential Privacy T0→T5. Chaque accès hashé on-chain. NFT fractionné de propriété.', color: M.gold },
    { icon: '◆', title: 'ÆLYA négocie à votre place', desc: 'Agent fiduciaire autonome. Policy Engine <5ms. REJECT par défaut. Vous dormez, ÆLYA travaille.', color: M.purple },
    { icon: '◇', title: '53 % pour vous, toujours', desc: 'Revenue share immuable inscrit dans le smart contract Base L2. Paiement en temps réel.', color: M.green },
    { icon: '◉', title: '600 millions d\'habitants connectés', desc: 'Corridor Afrique-MENA-Europe. Wafacash, Orange Money, Wave, MTN MoMo, M-Pesa. Zéro concurrent.', color: M.cyan },
  ];

  const marqueeItems = [
    { v: '194 €', l: "valeur annuelle moyenne d'un profil" },
    { v: '0 €', l: 'reversé par les GAFAM' },
    { v: '53 %', l: 'reversé au producteur sur MYNε' },
    { v: '600 M', l: 'habitants corridor cible' },
    { v: '$10,8Mds', l: 'TAM addressable' },
  ];

  return (
    <div style={{ padding: '48px 32px 60px', maxWidth: 1100, margin: '0 auto' }}>
      {/* Hero */}
      <div style={{ textAlign: 'center', padding: '60px 0 40px' }}>
        <div style={{ fontFamily: HD, color: M.gold, fontSize: 'clamp(26px,4.5vw,42px)', lineHeight: 1.3, marginBottom: 16, fontStyle: 'italic' }}>
          Vos données valent 194&nbsp;€ par an.<br />Vous n&apos;en voyez pas un centime.
        </div>
        <div style={{ fontSize: 16, color: M.t2, maxWidth: 640, margin: '0 auto 28px', lineHeight: 1.7, fontFamily: BD }}>
          MYNε transforme votre empreinte numérique en actif monétisable. Vous décidez. Vous encaissez. L&apos;agent ÆLYA négocie à votre place.
        </div>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 48 }}>
          <button style={{ padding: '12px 24px', borderRadius: 8, fontFamily: BD, fontSize: 14, fontWeight: 400, cursor: 'pointer', border: 'none', background: M.gold, color: '#000' }}>
            Rejoindre la liste d&apos;attente
          </button>
          <button style={{ padding: '12px 24px', borderRadius: 8, fontFamily: BD, fontSize: 14, fontWeight: 400, cursor: 'pointer', background: 'transparent', border: `1px solid ${M.gold}`, color: M.gold }}>
            Voir comment ça marche →
          </button>
        </div>
      </div>

      {/* Counters */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 0, flexWrap: 'wrap', marginBottom: 48 }}>
        {counters.map((c, i) => <AnimCounter key={i} target={c.target} label={c.label} />)}
      </div>

      {/* Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 48 }}>
        {cards.map((c, i) => (
          <MYNECard key={i} style={{ borderLeft: `3px solid ${c.color}` }}>
            <div style={{ fontSize: 24, marginBottom: 8 }}>{c.icon}</div>
            <div style={{ fontWeight: 400, fontSize: 18, marginBottom: 6, color: M.t1 }}>{c.title}</div>
            <div style={{ fontSize: 14, color: M.t2 }}>{c.desc}</div>
          </MYNECard>
        ))}
      </div>

      {/* Marquee */}
      <div style={{ overflow: 'hidden', background: M.bgCard, borderTop: `1px solid ${M.border}`, borderBottom: `1px solid ${M.border}`, padding: '12px 0', marginBottom: 32 }}>
        <div style={{ display: 'flex', gap: 32, animation: 'myneScroll 30s linear infinite', whiteSpace: 'nowrap' }}>
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: M.t2 }}>
              <span style={{ color: M.gold }}>✦</span>
              <b style={{ color: M.gold }}>{item.v}</b> {item.l}
            </span>
          ))}
        </div>
        <style>{`@keyframes myneScroll{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}`}</style>
      </div>

      {/* Central text */}
      <div style={{ textAlign: 'center', maxWidth: 760, margin: '48px auto' }}>
        <p style={{ fontFamily: HD, fontSize: 20, lineHeight: 1.7, marginBottom: 16, color: M.t1 }}>
          En ce moment, Facebook vend vos données à 9,49&nbsp;$ par profil et par mois aux annonceurs. Vous n&apos;en voyez pas un centime. Google génère 237&nbsp;$ de revenus annuels par utilisateur. Vous n&apos;en voyez pas un centime.
        </p>
        <p style={{ fontFamily: HD, fontSize: 20, lineHeight: 1.7, marginBottom: 16, color: M.t1 }}>
          Ce n&apos;est pas un bug. C&apos;est un modèle économique basé sur votre ignorance.
        </p>
        <p style={{ fontFamily: BD, fontWeight: 300, fontSize: 24, color: M.gold }}>MYNε est la correction.</p>
      </div>

      {/* Research card */}
      <MYNECard style={{ borderLeft: `3px solid ${M.purple}`, maxWidth: 700, margin: '0 auto 48px' }}>
        <span style={{ display: 'inline-block', padding: '3px 10px', borderRadius: 4, background: `${M.purple}20`, color: M.purple, fontFamily: MN, fontSize: 10, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 12 }}>RECHERCHE</span>
        <div style={{ fontWeight: 600, fontSize: 16, color: M.gold, marginBottom: 4 }}>Johan Delhomme Montorfano</div>
        <div style={{ fontSize: 12, color: M.t3, marginBottom: 8 }}>Co-fondateur &amp; CTO MYNε — EPITECH</div>
        <div style={{ fontSize: 13, color: M.t2, lineHeight: 1.6, marginBottom: 8 }}>
          &ldquo;L&apos;architecture T-Levels que nous déployons est fondée sur une publication académique peer-reviewed. Ce n&apos;est pas un pitch deck. C&apos;est de la science.&rdquo;
        </div>
        <div style={{ fontFamily: MN, fontSize: 11, color: M.t3 }}>SPADE — Sequential Pattern Discovery · Avril 2025</div>
      </MYNECard>
    </div>
  );
}
