'use client';

import { PLATFORMS } from '@/lib/constants';
import { fmtNum } from '@/lib/helpers';
import type { Category, Entity } from '@/lib/types';

interface CategoryNavProps {
  entity: Entity;
  categories: Category[];
  activeCategoryIndex: number;
  activeLayerIndex: number;
  onCategoryChange: (index: number) => void;
  onLayerChange: (index: number) => void;
}

const N   = '#FAF8FC';
const DIV = 'rgba(30,10,32,0.08)';
const T2  = 'rgba(30,10,32,0.60)';
const T3  = 'rgba(30,10,32,0.35)';
const P   = '#1E0A20';
const MN  = '"JetBrains Mono", monospace';
const GR  = '"Playfair Display", "Didot", Georgia, serif';
const SN  = '"Geist", "Helvetica Neue", Helvetica, sans-serif';

export function CategoryNav({
  entity,
  categories,
  activeCategoryIndex,
  activeLayerIndex,
  onCategoryChange,
  onLayerChange,
}: CategoryNavProps) {
  const isHoldingOrEcosystem = entity.type === 'HOLDING' || entity.type === 'ECOSYSTEM';
  const label = isHoldingOrEcosystem
    ? '10 AXES STRATÉGIQUES × 10 COUCHES'
    : '10 MACRO × 10 SUB = 100 COUCHES SPÉCIFIQUES';

  return (
    <div style={{ width: 260, flexShrink: 0, borderRight: `0.5px solid ${DIV}`, background: N, overflowY: 'auto' }}>
      <div style={{ padding: '10px 14px', fontFamily: MN, fontSize: 8, color: T3, letterSpacing: 2, textTransform: 'uppercase' }}>
        {label}
      </div>
      {categories.map((cat, mi) => (
        <div key={mi}>
          <button
            onClick={() => onCategoryChange(mi)}
            data-testid={`category-${mi}`}
            data-active={activeCategoryIndex === mi}
            style={{
              width: '100%',
              border: 'none',
              padding: '8px 14px',
              cursor: 'pointer',
              textAlign: 'left',
              background: activeCategoryIndex === mi ? 'rgba(30,10,32,0.04)' : 'transparent',
              borderLeft: activeCategoryIndex === mi ? `2px solid ${entity.color}` : '2px solid transparent',
            }}
          >
            <div style={{
              fontFamily: GR,
              fontSize: 11,
              fontWeight: 400,
              textTransform: 'uppercase',
              letterSpacing: 1,
              color: activeCategoryIndex === mi ? entity.color : P,
            }}>
              {cat.label}
            </div>
          </button>
          {activeCategoryIndex === mi &&
            cat.layers.map((l, lii) => (
              <button
                key={l.id}
                onClick={() => onLayerChange(lii)}
                data-testid={`layer-${l.id}`}
                data-active={activeLayerIndex === lii}
                style={{
                  width: '100%',
                  border: 'none',
                  padding: '6px 14px 6px 28px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  background: activeLayerIndex === lii ? `${entity.color}08` : 'transparent',
                  borderLeft: activeLayerIndex === lii ? `2px solid ${entity.color}` : '2px solid transparent',
                }}
              >
                <span style={{ width: 4, height: 4, background: PLATFORMS[l.platform]?.color || DIV, flexShrink: 0 }} />
                <span style={{
                  fontFamily: SN,
                  fontSize: 11,
                  flex: 1,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  color: activeLayerIndex === lii ? P : T2,
                  fontWeight: 400,
                }}>
                  {l.name}
                </span>
                <span style={{ fontFamily: MN, fontSize: 10, color: T3, flexShrink: 0 }}>
                  {fmtNum(l.rows)}
                </span>
              </button>
            ))}
        </div>
      ))}
    </div>
  );
}
