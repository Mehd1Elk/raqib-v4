import { PLATFORMS } from '@/lib/constants';
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

function ProgressBar({ actual, target }: { actual: number; target: number }) {
  const pct = target > 0 ? Math.min((actual / target) * 100, 100) : 0;
  const color = pct >= 75 ? '#3D7C5E' : pct >= 25 ? '#B87D3E' : '#9C3D3D';
  const label = pct >= 75 ? 'complete' : pct > 0 ? 'partial' : 'empty';

  return (
    <div className="bg-ivory border border-div rounded p-4 mb-5">
      <div className="text-[10px] font-[family-name:var(--font-jetbrains)] tracking-[1px] mb-3 font-bold text-gold">
        PROGRESSION PEUPLEMENT
      </div>
      <div className="flex items-center gap-4 mb-2">
        <div className="flex-1 h-2 bg-parchment rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${pct}%`, background: color }}
          />
        </div>
        <span
          className="text-[11px] font-[family-name:var(--font-jetbrains)] font-bold"
          style={{ color }}
        >
          {pct.toFixed(1)}%
        </span>
      </div>
      <div className="flex gap-6 text-[10px] font-[family-name:var(--font-noto)] text-t3">
        <span>
          <span className="font-semibold text-t2">{actual.toLocaleString()}</span> /{' '}
          {target.toLocaleString()} entrées
        </span>
        <span
          className="px-2 py-0.5 rounded text-[9px] font-[family-name:var(--font-jetbrains)] font-semibold"
          style={{ color, background: `${color}0D`, border: `1px solid ${color}22` }}
        >
          {label.toUpperCase()}
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
    <div className="bg-cream p-5 px-7">
      {/* Breadcrumb */}
      <div className="text-[9px] font-[family-name:var(--font-jetbrains)] text-tm mb-1">
        {entity.name} / {category.label} /{' '}
        <span style={{ color: entity.color }}>{layer.name}</span>
      </div>

      {/* Title */}
      <div className="text-xl font-[family-name:var(--font-cormorant)] font-bold italic text-noir mb-1">
        {layer.name}
      </div>

      {/* Separator */}
      <div className="w-9 h-0.5 mb-4 opacity-50" style={{ background: entity.color }} />

      {/* Platform badge row */}
      <div className="flex gap-3 mb-5 items-center flex-wrap">
        <PlatformBadge platform={layer.platform} />
        <span className="text-[10px] font-[family-name:var(--font-noto)] text-t3">
          Plateforme assignée
        </span>
        <div className="w-px h-3.5 bg-div" />
        <span className="text-[10px] font-[family-name:var(--font-jetbrains)] text-t2">
          {layer.rows.toLocaleString()} entrées prévues
        </span>
        {lastPopulatedAt && (
          <>
            <div className="w-px h-3.5 bg-div" />
            <span className="text-[9px] font-[family-name:var(--font-jetbrains)] text-tm">
              MAJ {new Date(lastPopulatedAt).toLocaleDateString('fr-FR')}
            </span>
          </>
        )}
      </div>

      {/* Progression */}
      <ProgressBar actual={actualRows} target={layer.rows} />

      {/* Specification panel */}
      <div className="bg-ivory border border-div rounded p-4 mb-5">
        <div
          className="text-[10px] font-[family-name:var(--font-jetbrains)] tracking-[1px] mb-2 font-bold"
          style={{ color: entity.color }}
        >
          SPÉCIFICATION DE COUCHE
        </div>
        <div className="grid grid-cols-3 gap-3 text-[11px] font-[family-name:var(--font-noto)] text-t2 leading-relaxed">
          <div>
            <span className="font-semibold text-t1">Entité :</span> {entity.name} ({entity.type})
          </div>
          <div>
            <span className="font-semibold text-t1">Macro :</span> {category.label}
          </div>
          <div>
            <span className="font-semibold text-t1">Couche :</span> {layer.name}
          </div>
          <div>
            <span className="font-semibold text-t1">Plateforme :</span> {platform?.name}
          </div>
          <div>
            <span className="font-semibold text-t1">Volume cible :</span>{' '}
            {layer.rows.toLocaleString()} entrées
          </div>
          <div>
            <span className="font-semibold text-t1">ID :</span>{' '}
            <span className="font-[family-name:var(--font-jetbrains)] text-[10px]">{layer.id}</span>
          </div>
        </div>

        {/* Routing */}
        {platform && (
          <div
            className="mt-3 p-2 px-3 rounded text-[10px] font-[family-name:var(--font-noto)] text-t2"
            style={{ background: `${platform.color}08` }}
          >
            <span className="font-semibold" style={{ color: platform.color }}>
              Routing :
            </span>{' '}
            {platform.description}
          </div>
        )}
      </div>

      {/* Platform distribution grid */}
      <PlatformGrid entity={entity} stats={stats} />
    </div>
  );
}
