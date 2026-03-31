'use client';

import { useState, useMemo, useEffect, useCallback } from 'react';
import { ENTITIES } from '@/lib/constants';
import { getEntityLayers } from '@/lib/mock-data';
import { computeEntityStats } from '@/lib/helpers';
import { EntityTabs } from '@/components/EntityTabs';
import { StatsBar } from '@/components/StatsBar';
import { CategoryNav } from '@/components/CategoryNav';
import { LayerDetail } from '@/components/LayerDetail';
import { SearchOverlay } from '@/components/SearchOverlay';
import { ExportButton } from '@/components/ExportButton';
import { EntriesTable } from '@/components/EntriesTable';
import { subscribeToLayerUpdates, fetchCategoriesWithLayers } from '@/lib/supabase/client-queries';
import { PLATFORMS } from '@/lib/constants';
import type { Category } from '@/lib/types';

interface LayerLiveData {
  actual_rows: number;
  status: string | null;
  last_populated_at: string | null;
}

export default function Dashboard() {
  const [entityIndex, setEntityIndex] = useState(0);
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [layerIndex, setLayerIndex] = useState(0);
  const [time, setTime] = useState<string>('');
  const [liveData, setLiveData] = useState<Record<string, LayerLiveData>>({});
  const [sbCategories, setSbCategories] = useState<Category[] | null>(null);

  useEffect(() => {
    const update = () => setTime(new Date().toLocaleTimeString('fr-FR'));
    update();
    const t = setInterval(update, 1000);
    return () => clearInterval(t);
  }, []);

  const entity = ENTITIES[entityIndex];
  const mockCategories = useMemo(() => getEntityLayers(entity.id), [entity.id]);
  // Use Supabase categories if loaded, otherwise mock
  const categories = sbCategories ?? mockCategories;
  const stats = useMemo(() => computeEntityStats(categories), [categories]);
  const category = categories[categoryIndex];
  const layer = category?.layers?.[layerIndex];

  // Fetch categories + layers from Supabase for current entity
  const loadFromSupabase = useCallback(async (entityId: string) => {
    try {
      const cats = await fetchCategoriesWithLayers(entityId);
      if (cats.length > 0) {
        // Map to Category[] type and extract live data
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
      // Supabase not available — use mock data
      setSbCategories(null);
    }
  }, []);

  useEffect(() => {
    setSbCategories(null); // Reset while loading
    loadFromSupabase(entity.id);
  }, [entity.id, loadFromSupabase]);

  // Realtime subscription for layer updates
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

      {/* TOP BAR */}
      <div className="h-[52px] shrink-0 flex items-center justify-between px-6 border-b border-div bg-ivory">
        <div className="flex items-center gap-3.5">
          <div className="w-1.5 h-1.5 rounded-full bg-gold" />
          <span className="font-[family-name:var(--font-cormorant)] text-[22px] font-bold italic text-noir tracking-[3px]">
            Raqib
          </span>
          <span className="font-[family-name:var(--font-cormorant)] text-[15px] text-sand">
            رقيب
          </span>
          <div className="w-px h-5 bg-div" />
          <span className="text-[9px] text-t3 font-[family-name:var(--font-jetbrains)] tracking-[2px]">
            V4 · 1000 COUCHES · 9 PLATEFORMES · {ENTITIES.length} ENTITÉS
          </span>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="/stats"
            className="text-[8px] font-[family-name:var(--font-jetbrains)] text-tm hover:text-gold no-underline border border-div rounded px-2 py-0.5 transition-colors"
          >
            STATS
          </a>
          <a
            href="/upload"
            className="text-[8px] font-[family-name:var(--font-jetbrains)] text-tm hover:text-gold no-underline border border-div rounded px-2 py-0.5 transition-colors"
          >
            IMPORTER
          </a>
          <ExportButton entityIndex={entityIndex} />
          <kbd className="text-[8px] font-[family-name:var(--font-jetbrains)] text-tm bg-cream px-1.5 py-0.5 rounded border border-div cursor-pointer">
            ⌘K
          </kbd>
          <span className="text-[9px] text-t3 font-[family-name:var(--font-jetbrains)]">
            {time}
          </span>
        </div>
      </div>

      <EntityTabs activeIndex={entityIndex} onChange={handleEntityChange} />
      <StatsBar entity={entity} stats={stats} />

      {/* MAIN CONTENT */}
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
          RAQIB V4 · 1000 COUCHES UNIQUES · 9 PLATEFORMES · CLAUDE CODE + COWORK + OPENCLAW + CODEX + PERPLEXITY + ANTIGRAVITY + MISTRAL + DEEPSEEK/QWEN + CLAUDE.AI
        </span>
        <span className="text-[7px] text-gold font-[family-name:var(--font-jetbrains)]">
          MARS 2026 · EIGEN HOLDING SAS · SOUVERAINETÉ INTÉGRALE
        </span>
      </div>
    </div>
  );
}
