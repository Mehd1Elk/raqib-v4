import { PLATFORMS } from '@/lib/constants';
import { fmtNum } from '@/lib/helpers';
import { PlatformBadge } from './PlatformBadge';
import { PlatformGrid } from './PlatformGrid';
import type { Category, Entity, EntityStats, LayerDef } from '@/lib/types';

interface LayerDetailProps {
  entity: Entity;
  category: Category;
  layer: LayerDef;
  stats: EntityStats;
  actualRows?: number;
  status?: string | null;
  lastPopulatedAt?: string | null;
}

const N   = '#FAF8FC';
const N2  = '#F5F2F8';
const N3  = '#EEEBF4';
const P   = '#1E0A20';
const DIV = 'rgba(30,10,32,0.08)';
const T1  = '#1E0A20';
const T2  = 'rgba(30,10,32,0.60)';
const T3  = 'rgba(30,10,32,0.35)';
const GR  = '"Playfair Display", "Didot", Georgia, serif';
const SN  = '"Geist", "Helvetica Neue", Helvetica, sans-serif';
const MN  = '"JetBrains Mono", monospace';

function ProgressBar({ actual, target, entityColor }: { actual: number; target: number; entityColor: string }) {
  const pct = target > 0 ? Math.min((actual / target) * 100, 100) : 0;
  const color = pct >= 75 ? '#5A8A6E' : pct > 0 ? '#A87D3E' : '#8C3040';
  const label = pct >= 75 ? 'COMPLET' : pct > 0 ? 'PARTIAL' : 'VIDE';

  return (
    <div style={{ background: N, border: `0.5px solid ${DIV}`, padding: 16, marginBottom: 16 }}>
      <div style={{ fontFamily: MN, fontSize: 9, letterSpacing: 3, textTransform: 'uppercase', marginBottom: 12, color: T3 }}>
        PROGRESSION PEUPLEMENT
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 8 }}>
        <div style={{ flex: 1, height: 3, background: N3 }}>
          <div style={{ width: `${pct}%`, height: 3, background: color, transition: 'width 500ms ease' }} />
        </div>
        <span style={{ fontFamily: MN, fontSize: 11, fontWeight: 700, color }}>{pct.toFixed(1)}%</span>
      </div>
      <div style={{ display: 'flex', gap: 16, fontFamily: SN, fontSize: 10, color: T3 }}>
        <span>
          <span style={{ fontWeight: 600, color: T2 }}>{fmtNum(actual)}</span> / {fmtNum(target)} entrées
        </span>
        <span style={{
          padding: '1px 8px',
          fontFamily: MN,
          fontSize: 8,
          letterSpacing: 1,
          color,
          background: `${color}12`,
          border: `0.5px solid ${color}40`,
        }}>
          {label}
        </span>
      </div>
    </div>
  );
}

export function LayerDetail({
  entity,
  category,
  layer,
  stats,
  actualRows = 0,
  status,
  lastPopulatedAt,
}: LayerDetailProps) {
  const platform = PLATFORMS[layer.platform];

  return (
    <div data-testid="layer-detail" style={{ background: N2, padding: '20px 28px' }}>
      {/* Breadcrumb */}
      <div style={{ fontFamily: MN, fontSize: 9, letterSpacing: 1, marginBottom: 4, color: T3 }}>
        {entity.name} / {category.label} /{' '}
        <span style={{ color: entity.color }}>{layer.name}</span>
      </div>

      {/* Title */}
      <div style={{ fontFamily: GR, fontSize: 22, fontWeight: 400, color: P, marginBottom: 4 }}>
        {layer.name}
      </div>

      {/* Accent line */}
      <div style={{ width: 32, height: 2, background: entity.color, marginBottom: 16, opacity: 0.7 }} />

      {/* Platform badge row */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 16, alignItems: 'center', flexWrap: 'wrap' }}>
        <PlatformBadge platform={layer.platform} />
        <span style={{ fontFamily: SN, fontSize: 11, color: T2 }}>Plateforme assignée</span>
        <div style={{ width: 1, height: 14, background: DIV }} />
        <span style={{ fontFamily: SN, fontSize: 11, color: T2 }}>{fmtNum(layer.rows)} entrées prévues</span>
        {lastPopulatedAt && (
          <>
            <div style={{ width: 1, height: 14, background: DIV }} />
            <span style={{ fontFamily: MN, fontSize: 9, color: T3 }}>
              MAJ {new Date(lastPopulatedAt).toLocaleDateString('fr-FR')}
            </span>
          </>
        )}
      </div>

      {/* Progression */}
      <ProgressBar actual={actualRows} target={layer.rows} entityColor={entity.color} />

      {/* Specification panel */}
      <div style={{ background: N, border: `0.5px solid ${DIV}`, padding: 16, marginBottom: 16 }}>
        <div style={{ fontFamily: MN, fontSize: 9, letterSpacing: 3, textTransform: 'uppercase', marginBottom: 10, color: entity.color }}>
          SPÉCIFICATION DE COUCHE
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, fontFamily: SN, fontSize: 11, color: T2, lineHeight: 1.6 }}>
          <div><span style={{ fontWeight: 600, color: T1 }}>Entité :</span> {entity.name} ({entity.type})</div>
          <div><span style={{ fontWeight: 600, color: T1 }}>Macro :</span> {category.label}</div>
          <div><span style={{ fontWeight: 600, color: T1 }}>Couche :</span> {layer.name}</div>
          <div><span style={{ fontWeight: 600, color: T1 }}>Plateforme :</span> {platform?.name}</div>
          <div><span style={{ fontWeight: 600, color: T1 }}>Volume cible :</span> {fmtNum(layer.rows)} entrées</div>
          <div>
            <span style={{ fontWeight: 600, color: T1 }}>ID :</span>{' '}
            <span style={{ fontFamily: MN, fontSize: 10 }}>{layer.id}</span>
          </div>
        </div>
        {platform && (
          <div style={{
            marginTop: 12, padding: '8px 12px',
            background: `${platform.color}08`,
            borderLeft: `2px solid ${platform.color}`,
            fontFamily: SN, fontSize: 10, color: T2,
          }}>
            <span style={{ fontWeight: 600, color: platform.color }}>Routing :</span> {platform.description}
          </div>
        )}
      </div>

      {/* Platform distribution grid */}
      <PlatformGrid entity={entity} stats={stats} />
    </div>
  );
}
