'use client';

import { useState, useMemo, useEffect, useCallback } from 'react';
import { ENTITIES, PLATFORMS } from '@/lib/constants';
import { getEntityLayers } from '@/lib/mock-data';
import { computeEntityStats } from '@/lib/helpers';
import { EntityTabs } from '@/components/EntityTabs';
import { StatsBar } from '@/components/StatsBar';
import { CategoryNav } from '@/components/CategoryNav';
import { LayerDetail } from '@/components/LayerDetail';
import { SearchOverlay } from '@/components/SearchOverlay';
import { ExportButton } from '@/components/ExportButton';
import { EntriesTable } from '@/components/EntriesTable';
import { GlobalNav } from '@/components/GlobalNav';
import { subscribeToLayerUpdates, fetchCategoriesWithLayers } from '@/lib/supabase/client-queries';
import type { Category } from '@/lib/types';

interface LayerLiveData {
  actual_rows: number;
  status: string | null;
  last_populated_at: string | null;
}

export default function DataViewerPage() {
  const [entityIndex, setEntityIndex] = useState(0);
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [layerIndex, setLayerIndex] = useState(0);
  const [liveData, setLiveData] = useState<Record<string, LayerLiveData>>({});
  const [sbCategories, setSbCategories] = useState<Category[] | null>(null);

  const entity = ENTITIES[entityIndex];
  const mockCategories = useMemo(() => getEntityLayers(entity.id), [entity.id]);
  const categories = sbCategories ?? mockCategories;
  const stats = useMemo(() => computeEntityStats(categories), [categories]);
  const category = categories[categoryIndex];
  const layer = category?.layers?.[layerIndex];

  const loadFromSupabase = useCallback(async (entityId: string) => {
    try {
      const cats = await fetchCategoriesWithLayers(entityId);
      if (cats.length > 0) {
        const mapped: Category[] = cats.map(c => ({
          label: c.label,
          layers: c.layers.map(l => ({
            id: l.id,
            name: l.name,
            platform: l.platform as Category['layers'][number]['platform'],
            rows: l.rows,
          })),
        }));
        setSbCategories(mapped);

        const live: Record<string, LayerLiveData> = {};
        for (const c of cats) {
          for (const l of c.layers) {
            live[l.id] = {
              actual_rows: (l as Record<string, unknown>).actual_rows as number ?? 0,
              status: (l as Record<string, unknown>).status as string | null,
              last_populated_at: (l as Record<string, unknown>).last_populated_at as string | null,
            };
          }
        }
        setLiveData(live);
      }
    } catch {
      setSbCategories(null);
    }
  }, []);

  useEffect(() => {
    setSbCategories(null);
    loadFromSupabase(entity.id);
  }, [entity.id, loadFromSupabase]);

  useEffect(() => {
    const unsub = subscribeToLayerUpdates((payload) => {
      const l = payload.new;
      setLiveData((prev) => ({
        ...prev,
        [l.id]: {
          actual_rows: l.actual_rows ?? 0,
          status: l.status,
          last_populated_at: l.last_populated_at,
        },
      }));
    });
    return unsub;
  }, []);

  const handleEntityChange = (i: number) => {
    setEntityIndex(i);
    setCategoryIndex(0);
    setLayerIndex(0);
  };

  const handleSearch = (ei: number, ci: number, li: number) => {
    setEntityIndex(ei);
    setCategoryIndex(ci);
    setLayerIndex(li);
  };

  const currentLive = layer ? liveData[layer.id] : undefined;

  return (
    <div className="w-screen h-screen flex flex-col overflow-hidden">
      <SearchOverlay onSelect={handleSearch} />

      {/* HEADER */}
      <div className="shrink-0 bg-ivory border-b border-div px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <a href="/" className="flex items-center gap-2 no-underline">
              <div className="w-2.5 h-2.5 rounded-full bg-gold" />
              <span className="font-[family-name:var(--font-cormorant)] text-[26px] font-bold italic text-noir">
                Raqib <span className="font-normal text-[18px] text-gold">رقيب</span>
              </span>
            </a>
            <div className="w-px h-5 bg-div mx-2" />
            <span className="font-[family-name:var(--font-jetbrains)] text-[9px] text-gold tracking-[3px]">
              DATA VIEWER
            </span>
          </div>
          <div className="flex items-center gap-3">
            <a href="/" className="px-3 py-1.5 text-[10px] font-[family-name:var(--font-jetbrains)] text-tm hover:text-gold transition">
              &larr; ACCUEIL
            </a>
            <GlobalNav />
            <ExportButton entityIndex={entityIndex} />
            <kbd className="text-[8px] font-[family-name:var(--font-jetbrains)] text-tm bg-cream px-1.5 py-0.5 rounded border border-div cursor-pointer">
              ⌘K
            </kbd>
          </div>
        </div>
      </div>

      {/* TITLE BAR */}
      <div className="shrink-0 px-8 pt-4 pb-2 bg-cream">
        <div className="flex items-center gap-3">
          <div className="font-[family-name:var(--font-cormorant)] text-[18px] font-bold italic text-noir">
            11 Entites &middot; 1100 Couches
          </div>
          <div className="flex-1 h-px bg-div" />
          <div className="font-[family-name:var(--font-jetbrains)] text-[8px] text-t3">
            NAVIGUER LES DONNEES
          </div>
        </div>
      </div>

      <EntityTabs activeIndex={entityIndex} onChange={handleEntityChange} />
      <StatsBar entity={entity} stats={stats} />

      <div className="flex-1 flex overflow-hidden">
        <CategoryNav
          entity={entity}
          categories={categories}
          activeCategoryIndex={categoryIndex}
          activeLayerIndex={layerIndex}
          onCategoryChange={(i) => {
            setCategoryIndex(i);
            setLayerIndex(0);
          }}
          onLayerChange={setLayerIndex}
        />

        {layer && category && (
          <div className="flex-1 overflow-auto">
            <LayerDetail
              entity={entity}
              category={category}
              layer={layer}
              stats={stats}
              actualRows={currentLive?.actual_rows}
              status={currentLive?.status}
              lastPopulatedAt={currentLive?.last_populated_at}
            />
            <div className="px-7 pb-5 bg-cream">
              <EntriesTable
                layerId={layer.id}
                layerName={layer.name}
                platformName={PLATFORMS[layer.platform]?.name ?? layer.platform}
              />
            </div>
          </div>
        )}
      </div>

      {/* BOTTOM BAR */}
      <div className="h-[26px] shrink-0 flex items-center justify-between px-6 border-t border-div bg-ivory">
        <span className="text-[7px] text-tm font-[family-name:var(--font-jetbrains)]">
          RAQIB V4 &middot; 1100 COUCHES &middot; 11 ENTITES &middot; 255 AGENTS &middot; EIGEN HOLDING SAS
        </span>
        <span className="text-[7px] text-gold font-[family-name:var(--font-jetbrains)]">
          AVRIL 2026 &middot; SOUVERAINETE INTEGRALE
        </span>
      </div>
    </div>
  );
}
