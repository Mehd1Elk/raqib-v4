'use client';

import { ENTITIES } from '@/lib/constants';

interface EntityTabsProps {
  activeIndex: number;
  onChange: (index: number) => void;
}

export function EntityTabs({ activeIndex, onChange }: EntityTabsProps) {
  return (
    <div className="h-[42px] shrink-0 flex items-stretch border-b border-div bg-ivory overflow-x-auto">
      {ENTITIES.map((e, i) => {
        const active = activeIndex === i;
        return (
          <button
            key={e.id}
            onClick={() => onChange(i)}
            data-testid={`entity-tab-${e.id}`}
            data-active={active}
            aria-pressed={active}
            className="border-none px-4 cursor-pointer whitespace-nowrap tracking-[1px] font-[family-name:var(--font-jetbrains)]"
            style={{
              background: active ? '#F7F3EA' : 'transparent',
              borderBottom: active ? `2px solid ${e.color}` : '2px solid transparent',
              color: active ? e.color : 'rgba(0,0,0,0.50)',
              fontSize: 10,
              fontWeight: 500,
            }}
          >
            {e.name}
            <span className="text-[7px] font-[family-name:var(--font-jetbrains)] not-italic ml-1.5 opacity-50">
              {e.type}
            </span>
          </button>
        );
      })}
    </div>
  );
}
