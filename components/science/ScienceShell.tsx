'use client';

import { useState, useEffect, lazy, Suspense } from 'react';
import { C, GR, SN, MN } from './shared/constants';

const TABS = [
  { key: 'dashboard', label: 'Dashboard', icon: '◈', subs: ['Vue globale'] },
  { key: 'papers', label: 'Papers', icon: '◇', subs: ['Publications'] },
  { key: 'labs', label: 'Labs', icon: '◉', subs: ['Laboratoires'] },
  { key: 'patents', label: 'Brevets', icon: '◆', subs: ['Veille brevets'] },
  { key: 'conferences', label: 'Conférences', icon: '◎', subs: ['Calendrier'] },
  { key: 'breakthroughs', label: 'Breakthroughs', icon: '↯', subs: ['Percées'] },
  { key: 'bib_noos', label: 'Biblio NOOS', icon: '▸', subs: ['Psychiatrie'] },
  { key: 'bib_aelya', label: 'Biblio ÆLYA', icon: '▸', subs: ['Privacy'] },
  { key: 'bib_burhan', label: 'Biblio BURHAN', icon: '▸', subs: ['Crypto'] },
  { key: 'bib_myne_mizan', label: 'Biblio MYNε+MIZAN', icon: '▸', subs: ['Data+Finance'] },
  { key: 'bib_yrknown_raqib', label: 'Biblio YrK+RAQIB', icon: '▸', subs: ['Knowledge+Agent'] },
  { key: 'quantum', label: 'Quantum Watch', icon: '⊗', subs: ['Q-Day'] },
] as const;

type TabKey = (typeof TABS)[number]['key'];

const DashboardView = lazy(() => import('./DashboardView'));
const PapersView = lazy(() => import('./PapersView'));
const LabsView = lazy(() => import('./LabsView'));
const PatentsView = lazy(() => import('./PatentsView'));
const ConferencesView = lazy(() => import('./ConferencesView'));
const BreakthroughsView = lazy(() => import('./BreakthroughsView'));
const BibliographyView = lazy(() => import('./BibliographyView'));
const QuantumWatchView = lazy(() => import('./QuantumWatchView'));

function TabContent({ tab }: { tab: TabKey }) {
  switch (tab) {
    case 'dashboard': return <DashboardView />;
    case 'papers': return <PapersView />;
    case 'labs': return <LabsView />;
    case 'patents': return <PatentsView />;
    case 'conferences': return <ConferencesView />;
    case 'breakthroughs': return <BreakthroughsView />;
    case 'bib_noos': return <BibliographyView briques={['noos']} title="Bibliographie NOOS" subtitle="Psychiatrie Computationnelle & IA Santé" />;
    case 'bib_aelya': return <BibliographyView briques={['aelya']} title="Bibliographie ÆLYA" subtitle="Privacy Engineering & Consent Tech" />;
    case 'bib_burhan': return <BibliographyView briques={['burhan']} title="Bibliographie BURHAN" subtitle="Blockchain, Cryptographie & Audit Trail" />;
    case 'bib_myne_mizan': return <BibliographyView briques={['myne', 'mizan']} title="Bibliographie MYNε + MIZAN" subtitle="Data Economics & Finance Computationnelle" />;
    case 'bib_yrknown_raqib': return <BibliographyView briques={['yrknown', 'raqib']} title="Bibliographie YrKnown + RAQIB" subtitle="Knowledge Engineering & Multi-Agent Systems" />;
    case 'quantum': return <QuantumWatchView />;
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
  return <span style={{ fontFamily: MN, fontSize: 9, color: C.t3, letterSpacing: 1 }}>{t}</span>;
}

function Loading() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', fontFamily: GR, fontSize: 15, fontStyle: 'italic', color: C.t3 }}>
      Chargement…
    </div>
  );
}

export default function ScienceShell() {
  const [mainTab, setMainTab] = useState<TabKey>('dashboard');
  const [collapsed, setCollapsed] = useState(false);
  const sideW = collapsed ? 48 : 220;

  const currentTab = TABS.find(t => t.key === mainTab)!;

  return (
    <div style={{ display: 'flex', height: '100vh', background: C.ivory, fontFamily: SN, overflow: 'hidden' }}>
      {/* Sidebar */}
      <aside style={{
        width: sideW, minWidth: sideW, background: C.ivory,
        borderRight: `1px solid ${C.div}`, display: 'flex', flexDirection: 'column',
        transition: 'width 0.2s, min-width 0.2s', overflow: 'hidden',
      }}>
        {/* Logo */}
        <div
          onClick={() => setCollapsed(!collapsed)}
          style={{
            padding: collapsed ? '16px 12px' : '16px', borderBottom: `1px solid ${C.div}`,
            display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', minHeight: 56,
          }}
        >
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: C.gold, flexShrink: 0 }} />
          {!collapsed && (
            <>
              <span style={{ fontFamily: GR, fontSize: 20, fontStyle: 'italic', fontWeight: 700, color: C.t1 }}>Raqib</span>
              <span style={{ fontFamily: GR, fontSize: 13, color: C.sand }}>رقيب</span>
            </>
          )}
        </div>

        {/* Tab buttons */}
        <nav style={{ flex: 1, overflowY: 'auto', padding: '8px 0' }}>
          {TABS.map(tab => {
            const active = mainTab === tab.key;
            const isQuantum = tab.key === 'quantum';
            return (
              <button key={tab.key} onClick={() => setMainTab(tab.key)} title={tab.label} style={{
                display: 'flex', alignItems: 'center', gap: 10, width: '100%',
                padding: collapsed ? '10px 0' : '10px 16px',
                justifyContent: collapsed ? 'center' : 'flex-start',
                border: 'none', cursor: 'pointer',
                background: active ? (isQuantum ? 'rgba(99,102,241,0.12)' : 'rgba(184,150,62,0.15)') : 'transparent',
                borderLeft: active ? `3px solid ${isQuantum ? C.quantum : C.gold}` : '3px solid transparent',
                fontFamily: active ? GR : SN,
                fontStyle: active ? 'italic' : 'normal',
                fontWeight: active ? 700 : 400,
                fontSize: collapsed ? 14 : 12, color: active ? (isQuantum ? C.quantum : C.t1) : C.t2,
                letterSpacing: 0.3, textAlign: 'left',
                transition: 'background 0.15s',
              }}>
                <span style={{ fontSize: collapsed ? 16 : 12, flexShrink: 0, opacity: active ? 1 : 0.6 }}>{tab.icon}</span>
                {!collapsed && <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{tab.label}</span>}
              </button>
            );
          })}
        </nav>

        {/* Back link */}
        {!collapsed && (
          <a href="/" style={{
            display: 'block', padding: '12px 16px', borderTop: `1px solid ${C.div}`,
            fontFamily: MN, fontSize: 8, color: C.t3, textDecoration: 'none',
            letterSpacing: 1.5, textTransform: 'uppercase',
          }}>
            ← RAQIB V4
          </a>
        )}
      </aside>

      {/* Main */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Header */}
        <header style={{
          height: 48, padding: '0 24px', display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', borderBottom: `1px solid ${C.div}`, background: C.ivory,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontFamily: GR, fontSize: 15, fontWeight: 700, fontStyle: 'italic', color: C.t1 }}>
              {currentTab.label}
            </span>
            <span style={{ width: 1, height: 16, background: C.div }} />
            <span style={{ fontFamily: MN, fontSize: 8, color: C.t3, letterSpacing: 1.5, textTransform: 'uppercase' }}>
              INTELLIGENCE SCIENTIFIQUE
            </span>
          </div>
          <Clock />
        </header>

        {/* Content */}
        <main style={{ flex: 1, overflow: 'auto', background: C.ivory }}>
          <Suspense fallback={<Loading />}>
            <TabContent tab={mainTab} />
          </Suspense>
        </main>

        {/* Footer */}
        <footer style={{
          height: 24, padding: '0 24px', display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', borderTop: `1px solid ${C.div}`,
          fontFamily: MN, fontSize: 7, color: C.t3, letterSpacing: 1.5,
          textTransform: 'uppercase', background: C.ivory,
        }}>
          <span>RAQIB V4 · INTELLIGENCE SCIENTIFIQUE</span>
          <span>7 DOMAINES · 12 VUES</span>
        </footer>
      </div>
    </div>
  );
}
