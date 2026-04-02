import { PLATFORMS } from '@/lib/constants';
import { fmtNum } from '@/lib/helpers';
import type { Entity, EntityStats } from '@/lib/types';

interface PlatformGridProps {
  entity: Entity;
  stats: EntityStats;
}

const N   = '#FAF8FC';
const DIV = 'rgba(30,10,32,0.08)';
const T3  = 'rgba(30,10,32,0.35)';
const MN  = '"JetBrains Mono", monospace';
const SN  = '"Geist", "Helvetica Neue", Helvetica, sans-serif';

export function PlatformGrid({ entity, stats }: PlatformGridProps) {
  return (
    <div style={{ background: N, border: `0.5px solid ${DIV}`, padding: 16 }}>
      <div style={{ fontFamily: MN, fontSize: 9, letterSpacing: 3, textTransform: 'uppercase', marginBottom: 12, color: entity.color }}>
        DISTRIBUTION PLATEFORMES — {entity.name}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
        {Object.entries(stats.platformDistribution).map(([k, v]) => {
          const p = PLATFORMS[k as keyof typeof PLATFORMS];
          if (!p) return null;
          return (
            <div key={k} style={{
              padding: 12,
              background: `${p.color}08`,
              border: `0.5px solid ${DIV}`,
            }}>
              <div style={{ fontFamily: MN, fontSize: 11, fontWeight: 600, color: p.color, marginBottom: 2 }}>
                {p.name}
              </div>
              <div style={{ fontFamily: SN, fontSize: 11, color: T3 }}>
                {v.count} couches · {fmtNum(v.rows)} entrées
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
