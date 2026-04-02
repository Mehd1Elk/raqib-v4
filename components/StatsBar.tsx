import { PLATFORMS } from '@/lib/constants';
import { fmtNum } from '@/lib/helpers';
import type { Entity, EntityStats } from '@/lib/types';

interface StatsBarProps {
  entity: Entity;
  stats: EntityStats;
}

const P   = '#1E0A20';
const DIV = 'rgba(30,10,32,0.08)';
const T2  = 'rgba(30,10,32,0.60)';
const T3  = 'rgba(30,10,32,0.35)';
const GR  = '"Playfair Display", "Didot", Georgia, serif';
const SN  = '"Geist", "Helvetica Neue", Helvetica, sans-serif';
const MN  = '"JetBrains Mono", monospace';

export function StatsBar({ entity, stats }: StatsBarProps) {
  return (
    <div style={{
      flexShrink: 0,
      padding: '10px 24px',
      borderBottom: `0.5px solid ${DIV}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      background: `${entity.color}06`,
    }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
        <span style={{ fontFamily: GR, fontSize: 26, fontWeight: 400, color: P, letterSpacing: 2, textTransform: 'uppercase' }}>
          {entity.name}
        </span>
        <span style={{ fontFamily: SN, fontSize: 13, color: T2, fontWeight: 400 }}>
          {entity.description}
        </span>
      </div>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', fontFamily: MN, fontSize: 10, color: T3 }}>
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
