'use client';

import { useState, useEffect, lazy, Suspense } from 'react';
import { C, FONTS } from './shared/constants';

const TABS = [
  { key: 'dashboard', label: 'Dashboard', icon: '◈' },
  { key: 'companies', label: 'Entreprises', icon: '◆' },
  { key: 'contacts', label: 'Contacts', icon: '◇' },
  { key: 'pipeline', label: 'Pipeline', icon: '▸' },
  { key: 'briques', label: 'Briques × Cibles', icon: '⬡' },
  { key: 'cascade', label: 'Cascade', icon: '↯' },
  { key: 'forcage', label: 'Forçage Légal', icon: '§' },
  { key: 'events', label: 'Événements', icon: '◎' },
  { key: 'projection', label: 'Projection', icon: '↗' },
  { key: 'playbook', label: 'Playbook', icon: '▤' },
] as const;

type TabKey = (typeof TABS)[number]['key'];

// Lazy-loaded views (placeholders for now)
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

function TabContent({ tab }: { tab: TabKey }) {
  switch (tab) {
    case 'dashboard': return <DashboardView />;
    case 'companies': return <CompaniesView />;
    case 'contacts': return <ContactsView />;
    case 'pipeline': return <PipelineView />;
    case 'briques': return <BriquesMatrixView />;
    case 'cascade': return <CascadeView />;
    case 'forcage': return <ForcageLegalView />;
    case 'events': return <EventsView />;
    case 'projection': return <ProjectionView />;
    case 'playbook': return <PlaybookView />;
  }
}

function Clock() {
  const [time, setTime] = useState('');
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <span style={{ fontFamily: FONTS.mono, fontSize: 9, color: C.t3, letterSpacing: 1 }}>
      {time}
    </span>
  );
}

export default function AcquisitionShell() {
  const [active, setActive] = useState<TabKey>('dashboard');
  const [collapsed, setCollapsed] = useState(false);
  const sideW = collapsed ? 48 : 220;

  return (
    <div style={{ display: 'flex', height: '100vh', background: C.ivory, fontFamily: FONTS.body, overflow: 'hidden' }}>
      {/* Sidebar */}
      <aside
        style={{
          width: sideW,
          minWidth: sideW,
          background: C.ivory,
          borderRight: `1px solid ${C.div}`,
          display: 'flex',
          flexDirection: 'column',
          transition: 'width 0.2s ease, min-width 0.2s ease',
          overflow: 'hidden',
        }}
      >
        {/* Logo */}
        <div
          style={{
            padding: collapsed ? '16px 8px' : '16px 16px',
            borderBottom: `1px solid ${C.div}`,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            cursor: 'pointer',
            minHeight: 56,
          }}
          onClick={() => setCollapsed(!collapsed)}
        >
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: C.gold, flexShrink: 0 }} />
          {!collapsed && (
            <>
              <span style={{ fontFamily: FONTS.title, fontSize: 20, fontStyle: 'italic', fontWeight: 700, color: C.t1 }}>
                Raqib
              </span>
              <span style={{ fontFamily: FONTS.title, fontSize: 13, color: C.sand }}>
                رقيب
              </span>
            </>
          )}
        </div>

        {/* Tabs */}
        <nav style={{ flex: 1, overflowY: 'auto', padding: '8px 0' }}>
          {TABS.map(tab => {
            const isActive = active === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActive(tab.key)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  width: '100%',
                  padding: collapsed ? '10px 0' : '10px 16px',
                  justifyContent: collapsed ? 'center' : 'flex-start',
                  border: 'none',
                  background: isActive ? 'rgba(184,150,62,0.15)' : 'transparent',
                  borderLeft: isActive ? `3px solid ${C.gold}` : '3px solid transparent',
                  cursor: 'pointer',
                  transition: 'background 0.15s ease',
                  fontFamily: isActive ? FONTS.title : FONTS.body,
                  fontStyle: isActive ? 'italic' : 'normal',
                  fontWeight: isActive ? 700 : 400,
                  fontSize: collapsed ? 14 : 12,
                  color: isActive ? C.t1 : C.t2,
                  letterSpacing: 0.3,
                  textAlign: 'left',
                }}
                title={tab.label}
              >
                <span style={{ fontSize: collapsed ? 16 : 12, flexShrink: 0, opacity: isActive ? 1 : 0.6 }}>
                  {tab.icon}
                </span>
                {!collapsed && <span>{tab.label}</span>}
              </button>
            );
          })}
        </nav>

        {/* Back link */}
        {!collapsed && (
          <a
            href="/"
            style={{
              display: 'block',
              padding: '12px 16px',
              borderTop: `1px solid ${C.div}`,
              fontFamily: FONTS.mono,
              fontSize: 8,
              color: C.t3,
              textDecoration: 'none',
              letterSpacing: 1.5,
              textTransform: 'uppercase',
            }}
          >
            ← RAQIB V4
          </a>
        )}
      </aside>

      {/* Main content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Header bar */}
        <header
          style={{
            height: 40,
            padding: '0 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: `1px solid ${C.div}`,
            background: C.cream,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            {TABS.map(tab => {
              const isActive = active === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActive(tab.key)}
                  style={{
                    border: 'none',
                    background: 'none',
                    cursor: 'pointer',
                    padding: '8px 0',
                    fontFamily: FONTS.title,
                    fontStyle: 'italic',
                    fontSize: 12,
                    fontWeight: isActive ? 700 : 400,
                    color: isActive ? C.t1 : C.t3,
                    borderBottom: isActive ? `2px solid ${C.gold}` : '2px solid transparent',
                    transition: 'all 0.15s ease',
                  }}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
          <Clock />
        </header>

        {/* Content area */}
        <main style={{ flex: 1, overflow: 'auto', padding: 20, background: C.parchment }}>
          <Suspense
            fallback={
              <div style={{ fontFamily: FONTS.mono, fontSize: 10, color: C.t3, padding: 40 }}>
                Chargement...
              </div>
            }
          >
            <TabContent tab={active} />
          </Suspense>
        </main>

        {/* Footer */}
        <footer
          style={{
            height: 24,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: C.ivory,
            borderTop: `1px solid ${C.div}`,
            fontFamily: FONTS.mono,
            fontSize: 7,
            color: C.t3,
            letterSpacing: 2,
            textTransform: 'uppercase',
          }}
        >
          RAQIB V4 · INTELLIGENCE D&apos;ACQUISITION
        </footer>
      </div>
    </div>
  );
}
