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
  { key: 'events', label: 'Événements', icon: '◎', subs: ['GITEX', 'ATS', 'VivaTech'] },
  { key: 'projection', label: 'Projection', icon: '↗', subs: ['Revenue'] },
  { key: 'playbook', label: 'Playbook', icon: '▤', subs: ['DRH', 'DPO', 'CTO', 'RSE', 'Achats', 'CFO'] },
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

function TabContent({ tab, subIdx }: { tab: TabKey; subIdx: number }) {
  switch (tab) {
    case 'dashboard': return <DashboardView />;
    case 'companies': return <CompaniesView />;
    case 'contacts': return <ContactsView />;
    case 'pipeline': return <PipelineView />;
    case 'briques': return <BriquesMatrixView />;
    case 'cascade': return <CascadeView />;
    case 'forcage': return <ForcageLegalView />;
    case 'events': return <EventsView subIdx={subIdx} />;
    case 'projection': return <ProjectionView />;
    case 'playbook': return <PlaybookView subIdx={subIdx} />;
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

export default function AcquisitionShell() {
  const [mainTab, setMainTab] = useState<TabKey>('dashboard');
  const [subIdx, setSubIdx] = useState(0);
  const [collapsed, setCollapsed] = useState(false);
  const sideW = collapsed ? 48 : 220;

  const currentTab = TABS.find(t => t.key === mainTab)!;

  const switchTab = (key: TabKey) => {
    setMainTab(key);
    setSubIdx(0);
  };

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
            return (
              <button key={tab.key} onClick={() => switchTab(tab.key)} title={tab.label} style={{
                display: 'flex', alignItems: 'center', gap: 10, width: '100%',
                padding: collapsed ? '10px 0' : '10px 16px',
                justifyContent: collapsed ? 'center' : 'flex-start',
                border: 'none', cursor: 'pointer',
                background: active ? 'rgba(184,150,62,0.15)' : 'transparent',
                borderLeft: active ? `3px solid ${C.gold}` : '3px solid transparent',
                fontFamily: active ? GR : SN,
                fontStyle: active ? 'italic' : 'normal',
                fontWeight: active ? 700 : 400,
                fontSize: collapsed ? 14 : 12, color: active ? C.t1 : C.t2,
                letterSpacing: 0.3, textAlign: 'left',
                transition: 'background 0.15s',
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
              {currentTab.subs.length} SECTIONS
            </span>
          </div>
          <Clock />
        </header>

        {/* Sub-tabs */}
        {currentTab.subs.length > 1 && (
          <div style={{
            height: 38, padding: '0 24px', display: 'flex', alignItems: 'center', gap: 20,
            borderBottom: `1px solid ${C.div}`, background: C.ivory,
          }}>
            {currentTab.subs.map((sub, i) => (
              <button key={sub} onClick={() => setSubIdx(i)} style={{
                border: 'none', background: 'none', cursor: 'pointer', padding: '8px 0',
                fontFamily: GR, fontStyle: 'italic', fontSize: 10, fontWeight: subIdx === i ? 700 : 400,
                color: subIdx === i ? C.t1 : C.t3,
                borderBottom: subIdx === i ? `2px solid ${C.gold}` : '2px solid transparent',
                transition: 'all 0.15s',
              }}>
                {sub}
              </button>
            ))}
          </div>
        )}

        {/* Content */}
        <main style={{ flex: 1, overflow: 'auto', background: C.cream }}>
          <Suspense fallback={
            <div style={{ fontFamily: MN, fontSize: 10, color: C.t3, padding: 40 }}>Chargement...</div>
          }>
            <TabContent tab={mainTab} subIdx={subIdx} />
          </Suspense>
        </main>

        {/* Footer */}
        <footer style={{
          height: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 24px', background: C.ivory, borderTop: `1px solid ${C.div}`,
          fontFamily: MN, fontSize: 7, letterSpacing: 2, textTransform: 'uppercase',
        }}>
          <span style={{ color: C.t3 }}>RAQIB V4 · INTELLIGENCE D&apos;ACQUISITION · 7 BRIQUES × 396 CIBLES</span>
          <span style={{ color: C.gold }}>AVRIL 2026 · CORRIDOR ATLANTIQUE</span>
        </footer>
      </div>
    </div>
  );
}
