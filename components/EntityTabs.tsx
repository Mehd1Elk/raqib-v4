'use client';

import { ENTITIES } from '@/lib/constants';

interface EntityTabsProps {
  activeIndex: number;
  onChange: (index: number) => void;
}

const N   = '#FAF8FC';
const N2  = '#F5F2F8';
const DIV = 'rgba(30,10,32,0.08)';
const T3  = 'rgba(30,10,32,0.35)';
const MN  = '"JetBrains Mono", monospace';

export function EntityTabs({ activeIndex, onChange }: EntityTabsProps) {
  return (
    <div style={{ height: 42, flexShrink: 0, display: 'flex', alignItems: 'stretch', borderBottom: `0.5px solid ${DIV}`, background: N, overflowX: 'auto' }}>
      {ENTITIES.map((e, i) => {
        const active = activeIndex === i;
        return (
          <button
            key={e.id}
            onClick={() => onChange(i)}
            data-testid={`entity-tab-${e.id}`}
            data-active={active}
            aria-pressed={active}
            style={{
              border: 'none',
              borderBottom: active ? `2px solid ${e.color}` : '2px solid transparent',
              background: active ? N2 : 'transparent',
              color: active ? e.color : T3,
              padding: '0 16px',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              fontFamily: MN,
              fontSize: 10,
              letterSpacing: 1,
              fontWeight: active ? 600 : 400,
              transition: 'all 150ms ease',
            }}
          >
            {e.name}
            <span style={{ fontFamily: MN, fontSize: 7, marginLeft: 6, opacity: 0.5, letterSpacing: 2 }}>
              {e.type}
            </span>
          </button>
        );
      })}
    </div>
  );
}
