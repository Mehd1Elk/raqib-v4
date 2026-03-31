export function EigenTabNav({ activeTab, onTabSelect }: { activeTab: string; onTabSelect: (tab: string) => void }) {
  const tabs = [
    { id: 'nexus', label: 'Nexus', icon: 'M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z', href: '/nexus' },
    { id: 'overview', label: 'Vue d\'ensemble', icon: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z' },
    { id: 'agents', label: 'Agents', icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', badge: 237 },
    { id: 'gallery', label: 'Galerie', icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z' },
    { id: 'board', label: 'Board', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
    { id: 'conquest', label: 'Conquête', icon: 'M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9' },
    { id: 'decisions', label: 'Décisions', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
    { id: 'stream', label: 'Stream', icon: 'M22 12h-4l-3 9L9 3l-3 9H2' },
    { id: 'terminal', label: 'Terminal', icon: 'M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
    { id: 'vault', label: 'Vault', icon: 'M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4', badge: 111 },
  ];

  return (
    <div role="tablist" aria-label="Navigation EIGEN" className="w-full flex items-center border-b border-[#D4CCBA] bg-[#FDFAF3] overflow-x-auto sm:overflow-visible">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        const cls = `flex items-center gap-2 px-5 py-[14px] shrink-0 transition-colors border-b-2 no-underline ${
          isActive
            ? 'border-[#B8963E] text-black font-bold'
            : 'border-transparent text-[#918977] hover:bg-[#F2EFE8]'
        }`;
        const inner = (
          <>
            <svg
              className={`w-3.5 h-3.5 ${isActive ? 'text-[#B8963E]' : 'text-[#918977]'}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={tab.icon} />
            </svg>
            <span className="font-[family-name:var(--font-jetbrains)] text-[10px] uppercase tracking-wider">
              {tab.label}
            </span>
            {tab.badge !== undefined && (
              <span className="ml-1 bg-[#B8963E] text-white text-[9px] font-[family-name:var(--font-jetbrains)] px-1.5 py-[2px] rounded-full">
                {tab.badge}
              </span>
            )}
          </>
        );

        if ('href' in tab && tab.href) {
          return <a key={tab.id} href={tab.href} className={cls}>{inner}</a>;
        }

        return (
          <button
            key={tab.id}
            aria-label={tab.label}
            aria-pressed={isActive}
            data-testid={`eigen-tab-${tab.id}`}
            onClick={() => onTabSelect(tab.id)}
            className={cls}
          >
            {inner}
          </button>
        );
      })}
    </div>
  );
}
