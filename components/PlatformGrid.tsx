import { PLATFORMS } from '@/lib/constants';
import { fmtNum } from '@/lib/helpers';
import type { Entity, EntityStats } from '@/lib/types';

interface PlatformGridProps {
  entity: Entity;
  stats: EntityStats;
}

export function PlatformGrid({ entity, stats }: PlatformGridProps) {
  return (
    <div className="bg-ivory border border-div rounded-none p-4">
      <div
        className="text-[10px] font-[family-name:var(--font-jetbrains)] tracking-[1px] mb-3 font-bold"
        style={{ color: '#B8963E' }}
      >
        DISTRIBUTION PLATEFORMES — {entity.name}
      </div>
      <div className="grid grid-cols-3 gap-2">
        {Object.entries(stats.platformDistribution).map(([k, v]) => {
          const p = PLATFORMS[k as keyof typeof PLATFORMS];
          if (!p) return null;
          return (
            <div
              key={k}
              className="p-4 rounded-none"
              style={{
                background: `${p.color}06`,
                border: `0.5px solid rgba(0,0,0,0.08)`,
              }}
            >
              <div
                className="text-[12px] font-[family-name:var(--font-jetbrains)] font-semibold"
                style={{ color: p.color }}
              >
                {p.name}
              </div>
              <div className="text-[11px] font-[family-name:var(--font-geist)] text-t3 mt-0.5">
                {v.count} couches · {fmtNum(v.rows)} entrées
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
