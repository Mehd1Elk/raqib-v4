import Link from 'next/link';
import { notFound } from 'next/navigation';
import { LayerDetail } from '@/components/LayerDetail';
import { EntriesTable } from '@/components/EntriesTable';
import { getLayerDetail } from '@/lib/supabase/queries';
import { findLayerRecord } from '@/lib/catalog';
import { getAllStaticParams, getLayerMetadata } from '@/lib/static-params';
import { PLATFORMS, ENTITIES } from '@/lib/constants';
import { computeEntityStats } from '@/lib/helpers';
import type { Metadata } from 'next';
import type { Category, Entity, LayerDef, PlatformCode } from '@/lib/types';

interface PageProps {
  params: Promise<{ entity: string; layer: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllStaticParams();
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { entity, layer } = await params;
  const metadata = getLayerMetadata(entity, layer);
  if (!metadata) return { title: 'Not Found' };

  return {
    title: metadata.title,
    description: metadata.description,
    alternates: {
      canonical: `/${entity}/${layer}`,
    },
  };
}

export default async function LayerPage({ params }: PageProps) {
  const { entity: entitySlug, layer: layerId } = await params;

  // Try Supabase first, fall back to mock catalog
  let entity: Entity;
  let category: Category;
  let layer: LayerDef;
  let platformName: string;
  let actualRows = 0;
  let status: string | null = null;
  let lastPopulatedAt: string | null = null;

  try {
    const sbData = await getLayerDetail(layerId);
    if (!sbData || sbData.entity_id !== entitySlug) throw new Error('not found');

    const ent = sbData.entities as unknown as { name: string; type: string; color: string };
    const cat = sbData.categories as unknown as { name: string; position: number };
    const plat = sbData.platforms as unknown as { name: string; color: string };

    entity = ENTITIES.find(e => e.id === entitySlug) ?? {
      id: entitySlug,
      name: ent.name,
      color: ent.color,
      description: '',
      type: ent.type as Entity['type'],
    };
    category = { label: cat.name, layers: [] };
    layer = {
      id: sbData.id,
      name: sbData.name,
      platform: sbData.platform_code as PlatformCode,
      rows: sbData.target_rows ?? 0,
    };
    platformName = plat.name;
    actualRows = sbData.actual_rows ?? 0;
    status = sbData.status;
    lastPopulatedAt = sbData.last_populated_at;
  } catch {
    // Fallback to mock catalog
    const data = findLayerRecord(entitySlug, layerId);
    if (!data) notFound();

    entity = data.entity;
    category = data.category;
    layer = data.layer;
    platformName = PLATFORMS[layer.platform]?.name ?? layer.platform;
  }

  const stats = computeEntityStats([category]);

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <div className="h-[52px] flex items-center justify-between px-6 border-b border-div bg-ivory">
        <div className="flex items-center gap-3.5">
          <div className="w-1.5 h-1.5 rounded-full bg-gold" />
          <Link
            href="/"
            className="font-[family-name:var(--font-cormorant)] text-[22px] font-bold italic text-noir tracking-[3px] no-underline hover:text-gold transition-colors"
          >
            Raqib
          </Link>
          <span className="font-[family-name:var(--font-cormorant)] text-[15px] text-sand">
            رقيب
          </span>
          <div className="w-px h-5 bg-div" />
          <span className="text-[9px] text-t3 font-[family-name:var(--font-jetbrains)] tracking-[2px]">
            V4 · DEEP LINK
          </span>
        </div>
        <Link
          href="/"
          className="text-[9px] font-[family-name:var(--font-jetbrains)] text-tm hover:text-gold no-underline transition-colors"
        >
          ← DASHBOARD
        </Link>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto py-8 px-6">
        <LayerDetail
          entity={entity}
          category={category}
          layer={layer}
          stats={stats}
          actualRows={actualRows}
          status={status}
          lastPopulatedAt={lastPopulatedAt}
        />

        {/* Entries table */}
        <div className="mt-6">
          <EntriesTable
            layerId={layer.id}
            layerName={layer.name}
            platformName={platformName}
          />
        </div>
      </div>

      {/* Footer */}
      <div className="h-[26px] flex items-center justify-between px-6 border-t border-div bg-ivory">
        <span className="text-[7px] text-tm font-[family-name:var(--font-jetbrains)]">
          RAQIB V4 · 1000 COUCHES UNIQUES · 9 PLATEFORMES
        </span>
        <span className="text-[7px] text-gold font-[family-name:var(--font-jetbrains)]">
          EIGEN HOLDING SAS
        </span>
      </div>
    </div>
  );
}
