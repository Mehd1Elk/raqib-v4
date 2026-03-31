'use client';

import { PLATFORMS } from '@/lib/constants';
import type { Category, Entity } from '@/lib/types';

interface CategoryNavProps {
  entity: Entity;
  categories: Category[];
  activeCategoryIndex: number;
  activeLayerIndex: number;
  onCategoryChange: (index: number) => void;
  onLayerChange: (index: number) => void;
}

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
    <div className="w-[260px] shrink-0 border-r border-div bg-ivory overflow-auto">
      <div className="px-3.5 py-2.5 text-[8px] font-[family-name:var(--font-jetbrains)] text-t3 tracking-[2px]">
        {label}
      </div>
      {categories.map((cat, mi) => (
        <div key={mi}>
          <button
            onClick={() => onCategoryChange(mi)}
            className="w-full border-none p-2 px-3.5 cursor-pointer text-left"
            style={{
              background: activeCategoryIndex === mi ? `${entity.color}08` : 'transparent',
              borderLeft: activeCategoryIndex === mi ? `3px solid ${entity.color}` : '3px solid transparent',
            }}
          >
            <div
              className="text-[11px] font-[family-name:var(--font-cormorant)] font-bold italic tracking-wide"
              style={{ color: activeCategoryIndex === mi ? entity.color : '#6B5E4C' }}
            >
              {cat.label}
            </div>
          </button>
          {activeCategoryIndex === mi &&
            cat.layers.map((l, lii) => (
              <button
                key={l.id}
                onClick={() => onLayerChange(lii)}
                className="w-full border-none py-1.5 pl-7 pr-3.5 cursor-pointer text-left flex items-center gap-1.5"
                style={{
                  background: activeLayerIndex === lii ? `${entity.color}06` : 'transparent',
                  borderLeft: activeLayerIndex === lii ? `2px solid ${entity.color}` : '2px solid transparent',
                }}
              >
                <span
                  className="w-1 h-1 rounded-full shrink-0"
                  style={{ background: PLATFORMS[l.platform]?.color || '#D4CCBA' }}
                />
                <span
                  className="text-[10px] font-[family-name:var(--font-noto)] flex-1 whitespace-nowrap overflow-hidden text-ellipsis"
                  style={{
                    color: activeLayerIndex === lii ? '#1C1814' : '#6B5E4C',
                    fontWeight: activeLayerIndex === lii ? 600 : 400,
                  }}
                >
                  {l.name}
                </span>
                <span className="text-[8px] font-[family-name:var(--font-jetbrains)] text-tm shrink-0">
                  {l.rows.toLocaleString()}
                </span>
              </button>
            ))}
        </div>
      ))}
    </div>
  );
}
