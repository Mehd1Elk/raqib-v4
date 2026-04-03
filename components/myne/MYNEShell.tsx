'use client';

import { useState, useEffect, lazy, Suspense } from 'react';
import { M, S, HD, BD, MN } from './shared/constants';

const AccueilView = lazy(() => import('./pages/AccueilView'));
const ManifesteView = lazy(() => import('./pages/ManifesteView'));
const FonctionnementView = lazy(() => import('./pages/FonctionnementView'));
const AelyaView = lazy(() => import('./pages/AelyaView'));
const PsychiatrieView = lazy(() => import('./pages/PsychiatrieView'));
const EntreprisesView = lazy(() => import('./pages/EntreprisesView'));
const PricingView = lazy(() => import('./pages/PricingView'));
const ServicesView = lazy(() => import('./pages/ServicesView'));
const ConnexionView = lazy(() => import('./pages/ConnexionView'));

const TABS = [
  { key: 'accueil', label: 'Accueil', icon: '◎' },
  { key: 'manifeste', label: 'Manifeste', icon: '◈' },
  { key: 'fonctionnement', label: 'Fonctionnement', icon: '◆' },
  { key: 'aelya', label: 'ÆLYA', icon: '◇' },
  { key: 'psychiatrie', label: 'Psychiatrie', icon: '◉' },
  { key: 'entreprises', label: 'Entreprises', icon: '⬡' },
  { key: 'pricing', label: 'Pricing', icon: '◊' },
  { key: 'services', label: 'Services', icon: '⊕' },
  { key: 'connexion', label: 'Connexion', icon: '▸' },
] as const;

type TabKey = (typeof TABS)[number]['key'];

function TabContent({ tab }: { tab: TabKey }) {
  switch (tab) {
    case 'accueil': return <AccueilView />;
    case 'manifeste': return <ManifesteView />;
    case 'fonctionnement': return <FonctionnementView />;
    case 'aelya': return <AelyaView />;
    case 'psychiatrie': return <PsychiatrieView />;
    case 'entreprises': return <EntreprisesView />;
    case 'pricing': return <PricingView />;
    case 'services': return <ServicesView />;
    case 'connexion': return <ConnexionView />;
  }
}

function Clock() {
  const [t, setT] = useState('');
  useEffect(() => {
    const tick = () => setT(new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return <span style={{ fontFamily: MN, fontSize: 9, color: M.t3, letterSpacing: 1 }}>{t}</span>;
}

export default function MYNEShell() {
  const [mainTab, setMainTab] = useState<TabKey>('accueil');
  const [collapsed, setCollapsed] = useState(false);
  const sideW = collapsed ? 48 : 220;

  const currentTab = TABS.find(t => t.key === mainTab)!;

  return (
    <div style={{ display: 'flex', height: '100vh', background: '#FDFAF3', fontFamily: BD, overflow: 'hidden' }}>
      {/* Sidebar */}
      <aside style={{
        width: sideW, minWidth: sideW, background: S.bg,
        borderRight: `1px solid ${S.border}`, display: 'flex', flexDirection: 'column',
        transition: 'width 0.2s, min-width 0.2s', overflow: 'hidden',
      }}>
        {/* Logo */}
        <div
          onClick={() => setCollapsed(!collapsed)}
          style={{
            padding: collapsed ? '16px 12px' : '16px', borderBottom: `1px solid ${S.border}`,
            display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', minHeight: 56,
            justifyContent: collapsed ? 'center' : 'flex-start',
          }}
        >
          {collapsed ? (
            <span style={{ fontFamily: MN, fontSize: 14, fontWeight: 700, color: S.accent }}>M</span>
          ) : (
            <>
              <span style={{ fontFamily: MN, fontSize: 18, fontWeight: 700, color: S.accent, letterSpacing: 6 }}>
                MYN&#949;
              </span>
              <sup style={{ fontSize: 8, color: S.muted, marginLeft: 2, verticalAlign: 'super' }}>v3</sup>
            </>
          )}
        </div>

        {/* Tab buttons */}
        <nav style={{ flex: 1, overflowY: 'auto', padding: '8px 0' }}>
          {TABS.map(tab => {
            const active = mainTab === tab.key;
            return (
              <button key={tab.key} onClick={() => setMainTab(tab.key)} title={tab.label} style={{
                display: 'flex', alignItems: 'center', gap: 10, width: '100%',
                padding: collapsed ? '10px 0' : '10px 16px',
                justifyContent: collapsed ? 'center' : 'flex-start',
                border: 'none', cursor: 'pointer',
                background: active ? `${S.accent}15` : 'transparent',
                borderLeft: active ? `2px solid ${S.accent}` : '2px solid transparent',
                fontFamily: BD,
                fontWeight: active ? 600 : 400,
                fontSize: collapsed ? 14 : 12, color: active ? S.accent : S.muted,
                letterSpacing: 0.3, textAlign: 'left',
                transition: 'background 0.15s, color 0.15s',
              }}>
                <span style={{ fontSize: collapsed ? 16 : 12, flexShrink: 0, opacity: active ? 1 : 0.6 }}>{tab.icon}</span>
                {!collapsed && <span>{tab.label}</span>}
              </button>
            );
          })}
        </nav>

        {/* Back link */}
        {!collapsed && (
          <a href="/" style={{
            display: 'block', padding: '12px 16px', borderTop: `1px solid ${S.border}`,
            fontFamily: MN, fontSize: 8, color: S.muted, textDecoration: 'none',
            letterSpacing: 1.5, textTransform: 'uppercase',
          }}>
            &#8592; RAQIB V4
          </a>
        )}
      </aside>

      {/* Main */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Header */}
        <header style={{
          height: 48, padding: '0 24px', display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', borderBottom: `1px solid ${M.border}`, background: M.bgPanel,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontFamily: HD, fontSize: 15, fontWeight: 700, color: M.t1 }}>
              {currentTab.label}
            </span>
            <span style={{ width: 1, height: 16, background: M.border }} />
            <span style={{ fontFamily: MN, fontSize: 8, color: M.t3, letterSpacing: 1.5, textTransform: 'uppercase' }}>
              MYN&#949;
            </span>
          </div>
          <Clock />
        </header>

        {/* Content */}
        <main style={{ flex: 1, overflow: 'auto', background: M.bg }}>
          <Suspense fallback={
            <div style={{ fontFamily: MN, fontSize: 10, color: M.t3, padding: 40 }}>Chargement...</div>
          }>
            <TabContent tab={mainTab} />
          </Suspense>
        </main>

        {/* Footer */}
        <footer style={{
          height: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 24px', background: S.bg, borderTop: `1px solid ${S.border}`,
          fontFamily: MN, fontSize: 7, letterSpacing: 2, textTransform: 'uppercase',
        }}>
          <span style={{ color: S.muted }}>RAQIB V4 &middot; MYN&#949; &middot; SOVEREIGN DATA MARKETPLACE</span>
          <span style={{ color: S.accent }}>CORRIDOR ATLANTIQUE</span>
        </footer>
      </div>
    </div>
  );
}
