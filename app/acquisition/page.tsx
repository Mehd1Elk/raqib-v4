'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const TABS = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'entreprises', label: 'Entreprises' },
  { id: 'contacts', label: 'Contacts' },
  { id: 'pipeline', label: 'Pipeline' },
  { id: 'briques-cibles', label: 'Briques × Cibles' },
  { id: 'cascade', label: 'Cascade' },
  { id: 'forcage-legal', label: 'Forçage Légal' },
  { id: 'evenements', label: 'Événements' },
  { id: 'projection', label: 'Projection' },
  { id: 'playbook', label: 'Playbook' },
] as const;

type TabId = (typeof TABS)[number]['id'];

const TAB_COMPONENTS: Record<TabId, ReturnType<typeof dynamic>> = {
  dashboard: dynamic(() => import('@/components/acquisition/DashboardTab')),
  entreprises: dynamic(() => import('@/components/acquisition/EntreprisesTab')),
  contacts: dynamic(() => import('@/components/acquisition/ContactsTab')),
  pipeline: dynamic(() => import('@/components/acquisition/PipelineTab')),
  'briques-cibles': dynamic(() => import('@/components/acquisition/BriquesCiblesTab')),
  cascade: dynamic(() => import('@/components/acquisition/CascadeTab')),
  'forcage-legal': dynamic(() => import('@/components/acquisition/ForcageLegalTab')),
  evenements: dynamic(() => import('@/components/acquisition/EvenementsTab')),
  projection: dynamic(() => import('@/components/acquisition/ProjectionTab')),
  playbook: dynamic(() => import('@/components/acquisition/PlaybookTab')),
};

export default function AcquisitionPage() {
  const [activeTab, setActiveTab] = useState<TabId>('dashboard');
  const [collapsed, setCollapsed] = useState(false);
  const [time, setTime] = useState('');

  useEffect(() => {
    const tick = () => setTime(new Date().toLocaleTimeString('fr-FR'));
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, []);

  const ActiveComponent = TAB_COMPONENTS[activeTab];

  return (
    <div className="flex w-screen" style={{ height: 'calc(100vh - 22px)' }}>
      {/* ═══════ SIDEBAR ═══════ */}
      <div
        className="flex-shrink-0 h-full bg-ivory border-r border-div flex flex-col overflow-hidden"
        style={{
          width: collapsed ? 48 : 220,
          transition: 'width 0.2s ease',
        }}
      >
        {/* Logo header */}
        <div
          className="flex items-center gap-2.5 cursor-pointer border-b border-div"
          style={{ padding: collapsed ? '16px 12px' : '16px 20px' }}
          onClick={() => setCollapsed(!collapsed)}
        >
          <div className="w-1.5 h-1.5 rounded-none-none bg-gold flex-shrink-0" />
          {!collapsed && (
            <span className="font-[family-name:var(--font-playfair)] text-xl font-bold  text-noir tracking-[2px]">
              Raqib
            </span>
          )}
          {!collapsed && (
            <span className="font-[family-name:var(--font-playfair)] text-[13px] text-sand">
              رقيب
            </span>
          )}
        </div>

        {/* Tab list */}
        <div
          className="flex-1 overflow-y-auto"
          style={{ padding: collapsed ? '8px 4px' : '8px 10px' }}
        >
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="block w-full text-left rounded-none-none border-none cursor-pointer whitespace-nowrap overflow-hidden text-ellipsis"
              style={{
                padding: collapsed ? '10px 8px' : '10px 12px',
                marginBottom: 2,
                background: activeTab === tab.id ? 'rgba(184,150,62,0.08)' : 'transparent',
                color: activeTab === tab.id ? '#1C1814' : '#918977',
                fontSize: collapsed ? 7 : 11,
                fontFamily: 'var(--font-playfair)',
                fontWeight: activeTab === tab.id ? 700 : 400,
                
                borderLeft: activeTab === tab.id ? '3px solid #B8963E' : '3px solid transparent',
                transition: 'all 0.15s ease',
              }}
            >
              {collapsed ? tab.label.split(' ')[0].slice(0, 3) : tab.label}
            </button>
          ))}
        </div>

        {/* Sidebar footer */}
        {!collapsed && (
          <div className="px-4 py-3 border-t border-div text-[7px] text-tm font-[family-name:var(--font-jetbrains)]">
            EIGEN HOLDING · RAQIB V4
          </div>
        )}
      </div>

      {/* ═══════ MAIN CONTENT ═══════ */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header bar */}
        <div className="h-12 flex-shrink-0 flex items-center justify-between px-6 border-b border-div bg-ivory">
          <div className="flex items-center gap-3">
            <span className="font-[family-name:var(--font-playfair)] text-[15px] font-bold  text-noir">
              {TABS.find((t) => t.id === activeTab)?.label}
            </span>
            <div className="w-px h-4 bg-div" />
            <span className="text-[8px] text-t3 font-[family-name:var(--font-jetbrains)] tracking-[1.5px]">
              INTELLIGENCE D&apos;ACQUISITION
            </span>
          </div>
          <span className="text-[9px] text-t3 font-[family-name:var(--font-jetbrains)]">
            {time}
          </span>
        </div>

        {/* Content area */}
        <div className="flex-1 overflow-auto bg-cream">
          <ActiveComponent />
        </div>

        {/* Footer */}
        <div className="h-6 flex-shrink-0 flex items-center justify-between px-6 border-t border-div bg-ivory">
          <span className="text-[7px] text-tm font-[family-name:var(--font-jetbrains)]">
            RAQIB V4 · INTELLIGENCE D&apos;ACQUISITION
          </span>
          <span className="text-[7px] text-gold font-[family-name:var(--font-jetbrains)]">
            AVRIL 2026 · CORRIDOR ATLANTIQUE
          </span>
        </div>
      </div>
    </div>
  );
}
