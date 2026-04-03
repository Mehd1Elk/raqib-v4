'use client';

import { useState, useEffect, lazy, Suspense } from 'react';
import { C, GR, SN, MN } from './shared/constants';

const TABS = [
  { key: 'dashboard', label: 'Dashboard', icon: '◈', subs: ['Vue globale'] },
  { key: 'companies', label: 'Entreprises', icon: '◆', subs: ['Table', 'Fiche'] },
  { key: 'contacts', label: 'Contacts', icon: '◇', subs: ['Table'] },
  { key: 'pipeline', label: 'Pipeline', icon: '▸', subs: ['Kanban'] },
  { key: 'briques', label: 'Briques × Cibles', icon: '⬡', subs: ['Matrice'] },
  { key: 'cascade', label: 'Cascade', icon: '↯', subs: ['Parcours'] },
  { key: 'forcage', label: 'Forçage Légal', icon: '§', subs: ['Réglementations'] },
  { key: 'trojan', label: 'Cheval de Troie', icon: '🐴', subs: ['100 Fiches'] },
  { key: 'events', label: 'Événements', icon: '◎', subs: ['GITEX', 'ATS', 'VivaTech'] },
  { key: 'projection', label: 'Projection', icon: '↗', subs: ['Revenue'] },
  { key: 'playbook', label: 'Playbook', icon: '▤', subs: ['DRH', 'DPO', 'CTO', 'RSE', 'Achats', 'CFO'] },
  { key: 'supply-chain', label: 'Supply Chain', icon: '⛓', subs: ['Cascade'] },
] as const;

type TabKey = (typeof TABS)[number]['key'];

const DashboardView = lazy(() => import('./DashboardView'));
const CompaniesView = lazy(() => import('./CompaniesView'));
const ContactsView = lazy(() => import('./ContactsView'));
const PipelineView = lazy(() => import('./PipelineView'));
const BriquesMatrixView = lazy(() => import('./BriquesMatrixView'));
const CascadeView = lazy(() => import('./CascadeView'));
const ForcageLegalView = lazy(() => import('./ForcageLegalView'));
const EventsView = lazy(() => import('./EventsView'));
const ProjectionView = lazy(() => import('./ProjectionView'));
const PlaybookView = lazy(() => import('./PlaybookView'));
const SupplyChainView = lazy(() => import('./SupplyChainView'));
const TrojanHorseView = lazy(() => import('./TrojanHorseView'));

function TabContent({ tab, subIdx }: { tab: TabKey; subIdx: number }) {
  switch (tab) {
    case 'dashboard': return <DashboardView />;
    case 'companies': return <CompaniesView />;
    case 'contacts': return <ContactsView />;
    case 'pipeline': return <PipelineView />;
    case 'briques': return <BriquesMatrixView />;
    case 'cascade': return <CascadeView />;
    case 'forcage': return <ForcageLegalView />;
    case 'trojan': return <TrojanHorseView />;
    case 'events': return <EventsView subIdx={subIdx} />;
    case 'projection': return <ProjectionView />;
    case 'playbook': return <PlaybookView subIdx={subIdx} />;
    case 'supply-chain': return <SupplyChainView />;
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
  return <span style={{ fontFamily: MN, fontSize: 12, color: C.t3, letterSpacing: 1 }}>{t}</span>;
}

export default function AcquisitionShell() {
  const [mainTab, setMainTab] = useState<TabKey>('dashboard');
  const [subIdx, setSubIdx] = useState(0);
  const [collapsed, setCollapsed] = useState(false);
  const sideW = collapsed ? 48 : 220;

  const currentTab = TABS.find(t => t.key === mainTab)!;

  const switchTab = (key: TabKey) => { setMainTab(key); setSubIdx(0); };

  return (
    <div style={{ display: 'flex', height: 'calc(100vh - 58px)', background: C.nacre, fontFamily: SN, overflow: 'hidden' }}>
      {/* Sidebar — PRUNE */}
      <aside style={{
        width: sideW, minWidth: sideW, background: C.prune,
        borderRight: 'none', display: 'flex', flexDirection: 'column',
        transition: 'width 0.2s, min-width 0.2s', overflow: 'hidden',
      }}>
        {/* Logo */}
        <div
          onClick={() => setCollapsed(!collapsed)}
          style={{
            padding: collapsed ? '20px 12px' : '20px 16px', borderBottom: `0.5px solid ${C.divSb}`,
            display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', minHeight: 64,
          }}
        >
          <span style={{ width: 2, height: 16, background: C.st1, flexShrink: 0 }} />
          {!collapsed && (
            <>
              <span style={{ fontFamily: GR, fontSize: 24, fontWeight: 400, color: C.st1, textTransform: 'uppercase', letterSpacing: 4 }}>
                Raqib
              </span>
              <span style={{ fontFamily: GR, fontSize: 16, color: C.st3 }}>رقيب</span>
            </>
          )}
        </div>

        {/* Tab buttons */}
        <nav style={{ flex: 1, overflowY: 'auto', padding: '8px 0' }}>
          {TABS.map(tab => {
            const active = mainTab === tab.key;
            return (
              <button key={tab.key} onClick={() => switchTab(tab.key)} title={tab.label} style={{
                display: 'flex', alignItems: 'center', gap: 10, width: '100%',
                padding: collapsed ? '10px 0' : '10px 16px',
                justifyContent: collapsed ? 'center' : 'flex-start',
                border: 'none', cursor: 'pointer',
                background: active ? 'rgba(255,255,255,0.06)' : 'transparent',
                borderLeft: active ? `2px solid ${C.st1}` : '2px solid transparent',
                fontFamily: SN,
                fontWeight: active ? 600 : 400,
                fontSize: 13, color: active ? C.st1 : C.st2,
                letterSpacing: 0.3, textAlign: 'left',
                transition: 'background 0.15s',
              }}
              onMouseEnter={e => { if (!active) e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; }}
              onMouseLeave={e => { if (!active) e.currentTarget.style.background = 'transparent'; }}
              >
                <span style={{ fontSize: collapsed ? 16 : 12, flexShrink: 0, opacity: active ? 1 : 0.5 }}>{tab.icon}</span>
                {!collapsed && <span>{tab.label}</span>}
              </button>
            );
          })}
        </nav>

        {/* Back link */}
        {!collapsed && (
          <a href="/" style={{
            display: 'block', padding: '12px 16px', borderTop: `0.5px solid ${C.divSb}`,
            fontFamily: MN, fontSize: 9, color: C.st3, textDecoration: 'none',
            letterSpacing: 2, textTransform: 'uppercase', fontWeight: 600,
          }}>
            ← RAQIB V4
          </a>
        )}
      </aside>

      {/* Main */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Header */}
        <header style={{
          height: 54, padding: '0 24px', display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', borderBottom: `0.5px solid ${C.div}`, background: C.nacre,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontFamily: GR, fontSize: 15, fontWeight: 400, color: C.t1, textTransform: 'uppercase', letterSpacing: 4 }}>
              {currentTab.label}
            </span>
            <span style={{ width: 0.5, height: 16, background: C.div }} />
            <span style={{ fontFamily: MN, fontSize: 9, color: C.t3, letterSpacing: 3, textTransform: 'uppercase', fontWeight: 600 }}>
              {currentTab.subs.length} SECTIONS
            </span>
          </div>
          <Clock />
        </header>

        {/* Sub-tabs */}
        {currentTab.subs.length > 1 && (
          <div style={{
            height: 40, padding: '0 24px', display: 'flex', alignItems: 'center', gap: 24,
            borderBottom: `0.5px solid ${C.div}`, background: C.nacre,
          }}>
            {currentTab.subs.map((sub, i) => (
              <button key={sub} onClick={() => setSubIdx(i)} style={{
                border: 'none', background: 'none', cursor: 'pointer', padding: '8px 0',
                fontFamily: SN, fontSize: 13, fontWeight: subIdx === i ? 600 : 400,
                color: subIdx === i ? C.t1 : C.t3,
                borderBottom: subIdx === i ? `2px solid ${C.prune}` : '2px solid transparent',
                transition: 'all 0.15s',
              }}>
                {sub}
              </button>
            ))}
          </div>
        )}

        {/* Content */}
        <main style={{ flex: 1, overflow: 'auto', background: C.nacre }}>
          <Suspense fallback={
            <div style={{ fontFamily: MN, fontSize: 10, color: C.t3, padding: 40, letterSpacing: 2, textTransform: 'uppercase' }}>Chargement...</div>
          }>
            <TabContent tab={mainTab} subIdx={subIdx} />
          </Suspense>
        </main>

        {/* Footer */}
        <footer style={{
          height: 30, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 24px', background: C.nacre, borderTop: `0.5px solid ${C.div}`,
          fontFamily: MN, fontSize: 9, letterSpacing: 2, textTransform: 'uppercase', fontWeight: 600,
        }}>
          <span style={{ color: C.t3 }}>RAQIB V4 · INTELLIGENCE D&apos;ACQUISITION · 7 BRIQUES × 396 CIBLES</span>
          <span style={{ color: C.t1 }}>AVRIL 2026 · CORRIDOR ATLANTIQUE</span>
        </footer>
      </div>
    </div>
  );
}
