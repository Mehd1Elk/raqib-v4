import { PLATFORMS } from '@/lib/constants';
import type { Entity, EntityStats } from '@/lib/types';

interface PlatformGridProps {
  entity: Entity;
  stats: EntityStats;
}

export function PlatformGrid({ entity, stats }: PlatformGridProps) {
  return (
    <div className="bg-ivory border border-div rounded p-4">
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
              className="p-2 px-3 rounded"
              style={{
                background: `${p.color}06`,
                border: `1px solid ${p.color}15`,
              }}
            >
              <div
                className="text-[10px] font-[family-name:var(--font-jetbrains)] font-bold"
                style={{ color: p.color }}
              >
                {p.name}
              </div>
              <div className="text-[9px] font-[family-name:var(--font-jetbrains)] text-t3 mt-0.5">
                {v.count} couches · {v.rows.toLocaleString()} entrées
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
