import { PLATFORMS } from '@/lib/constants';
import { fmtNum } from '@/lib/helpers';
import type { Entity, EntityStats } from '@/lib/types';

interface StatsBarProps {
  entity: Entity;
  stats: EntityStats;
}

export function StatsBar({ entity, stats }: StatsBarProps) {
  return (
    <div
      className="shrink-0 px-6 py-2.5 border-b border-div flex items-center justify-between"
      style={{ background: `${entity.color}04` }}
    >
      <div>
        <span className="text-[28px] tracking-[2px] uppercase font-[family-name:var(--font-playfair)] font-normal text-noir">
          {entity.name}
        </span>
        <span className="text-[13px] font-[family-name:var(--font-geist)] font-normal ml-3"
              style={{ color: 'rgba(0,0,0,0.55)' }}>
          {entity.description}
        </span>
      </div>
      <div className="flex gap-3 items-center text-[10px] font-medium font-[family-name:var(--font-jetbrains)] text-t3">
        <span>{stats.totalLayers} couches</span>
        <span>·</span>
        <span>{fmtNum(stats.totalRows)} entrées prévues</span>
        <span>·</span>
        <span>
          {Object.entries(stats.platformDistribution)
            .map(([k, v]) => `${PLATFORMS[k as keyof typeof PLATFORMS]?.name?.split(' ')[0] || k}:${v.count}`)
            .join(' · ')}
        </span>
      </div>
    </div>
  );
}
