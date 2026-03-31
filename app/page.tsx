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

      {/* ═══ ZONE 1 — HERO HEADER ═══ */}
      <div className="shrink-0 bg-ivory border-b border-div px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-1.5">
              <div className="w-3 h-3 rounded-full bg-gold" />
              <h1 className="font-[family-name:var(--font-cormorant)] text-[32px] font-bold italic text-noir">
                Raqib <span className="font-normal text-[22px] text-gold">رقيب</span>
              </h1>
            </div>
            <p className="font-[family-name:var(--font-jetbrains)] text-[10px] text-t3 tracking-[2px]">
              V4 · 1100 COUCHES · 11 ENTITÉS · 16 384 ENTRIES · 255 AGENTS
            </p>
          </div>
          <div className="flex items-center gap-3">
            <a href="/eigen" className="px-4 py-2 bg-gold text-white font-[family-name:var(--font-jetbrains)] text-[10px] tracking-wider rounded hover:bg-gold-d transition">
              COCKPIT EIGEN →
            </a>
            <a href="/upload" className="px-4 py-2 border border-stone text-stone font-[family-name:var(--font-jetbrains)] text-[10px] tracking-wider rounded hover:border-gold hover:text-gold transition">
              IMPORTER
            </a>
            <GlobalNav />
            <ExportButton entityIndex={entityIndex} />
            <kbd className="text-[8px] font-[family-name:var(--font-jetbrains)] text-tm bg-cream px-1.5 py-0.5 rounded border border-div cursor-pointer">
              ⌘K
            </kbd>
            <span className="text-[9px] text-t3 font-[family-name:var(--font-jetbrains)]">
              {time}
            </span>
          </div>
        </div>
      </div>

      {/* ═══ ZONE 2 — NAVIGATION CARDS ═══ */}
      <div className="shrink-0 px-8 py-5 bg-cream border-b border-div">
        <div className="grid grid-cols-3 gap-4">

          {/* Card COCKPIT EIGEN */}
          <a href="/eigen" className="col-span-1 row-span-2 bg-noir text-white rounded-lg p-6 hover:ring-2 hover:ring-gold transition group no-underline">
            <div className="text-gold font-[family-name:var(--font-jetbrains)] text-[9px] tracking-[3px] mb-3">COCKPIT</div>
            <div className="font-[family-name:var(--font-cormorant)] text-[24px] font-bold italic mb-2">EIGEN Stratégique</div>
            <div className="font-[family-name:var(--font-noto)] text-[11px] text-stone mb-4">
              6 sous-onglets · 255 agents · Board meeting · Galerie · Terminal
            </div>
            <div className="grid grid-cols-3 gap-2 mt-4">
              <div className="text-center">
                <div className="font-[family-name:var(--font-cormorant)] text-[20px] font-bold text-gold">255</div>
                <div className="font-[family-name:var(--font-jetbrains)] text-[7px] text-stone">AGENTS</div>
              </div>
              <div className="text-center">
                <div className="font-[family-name:var(--font-cormorant)] text-[20px] font-bold text-gold">59</div>
                <div className="font-[family-name:var(--font-jetbrains)] text-[7px] text-stone">DOCUMENTS</div>
              </div>
              <div className="text-center">
                <div className="font-[family-name:var(--font-cormorant)] text-[20px] font-bold text-gold">88</div>
                <div className="font-[family-name:var(--font-jetbrains)] text-[7px] text-stone">SCORE</div>
              </div>
            </div>
            <div className="mt-4 font-[family-name:var(--font-jetbrains)] text-[8px] text-gold opacity-0 group-hover:opacity-100 transition">
              OUVRIR LE COCKPIT →
            </div>
          </a>

          {/* Card DASHBOARDS */}
          <a href="/dashboards/investor" className="bg-ivory border border-div rounded-lg p-5 hover:border-gold transition no-underline">
            <div className="font-[family-name:var(--font-jetbrains)] text-[9px] text-gold tracking-[2px] mb-2">DASHBOARDS</div>
            <div className="font-[family-name:var(--font-cormorant)] text-[16px] font-bold italic text-noir mb-1">Tableaux de bord</div>
            <div className="font-[family-name:var(--font-noto)] text-[10px] text-t3 mb-3">Investor · Supervisor · GITEX · London</div>
            <div className="flex gap-2">
              <span className="font-[family-name:var(--font-jetbrains)] text-[7px] px-2 py-0.5 bg-[rgba(184,150,62,0.1)] text-gold rounded">INVESTOR</span>
              <span className="font-[family-name:var(--font-jetbrains)] text-[7px] px-2 py-0.5 bg-[rgba(145,137,119,0.1)] text-t3 rounded">SUPERVISOR</span>
              <span className="font-[family-name:var(--font-jetbrains)] text-[7px] px-2 py-0.5 bg-[rgba(145,137,119,0.1)] text-t3 rounded">GITEX</span>
            </div>
          </a>

          {/* Card STATS */}
          <a href="/stats" className="bg-ivory border border-div rounded-lg p-5 hover:border-gold transition no-underline">
            <div className="font-[family-name:var(--font-jetbrains)] text-[9px] text-emerald tracking-[2px] mb-2">PROGRESSION</div>
            <div className="font-[family-name:var(--font-cormorant)] text-[16px] font-bold italic text-noir mb-1">Stats & Qualité</div>
            <div className="font-[family-name:var(--font-noto)] text-[10px] text-t3 mb-3">100% completion · 16 384 entries · conf 0.85</div>
            <div className="w-full h-2 bg-parchment rounded-full overflow-hidden">
              <div className="h-full bg-emerald rounded-full" style={{width:'100%'}} />
            </div>
          </a>

          {/* Card BOARD MEETING */}
          <a href="/eigen?tab=board" className="bg-ivory border border-div rounded-lg p-5 hover:border-gold transition no-underline">
            <div className="font-[family-name:var(--font-jetbrains)] text-[9px] text-violet tracking-[2px] mb-2">COMITÉ</div>
            <div className="font-[family-name:var(--font-cormorant)] text-[16px] font-bold italic text-noir mb-1">Board Meeting</div>
            <div className="font-[family-name:var(--font-noto)] text-[10px] text-t3 mb-3">5 directeurs IA · Débat stratégique</div>
            <div className="font-[family-name:var(--font-jetbrains)] text-[9px] text-stone">Stratégie · Finance · Juridique · Tech · Commercial</div>
          </a>

          {/* Card TERMINAL */}
          <a href="/eigen?tab=terminal" className="bg-noir text-gold-l rounded-lg p-5 hover:ring-1 hover:ring-gold transition no-underline">
            <div className="font-[family-name:var(--font-jetbrains)] text-[9px] tracking-[2px] mb-2 text-stone">TERMINAL</div>
            <div className="font-[family-name:var(--font-jetbrains)] text-[14px] mb-1">&gt; status</div>
            <div className="font-[family-name:var(--font-jetbrains)] text-[9px] text-stone">8 commandes · Live feed · 255 agents</div>
          </a>
        </div>
      </div>

      {/* ═══ ZONE 3 — 11 ENTITÉS VIEWER ═══ */}
      <div className="shrink-0 px-8 pt-4 pb-2 bg-cream">
        <div className="flex items-center gap-3">
          <div className="font-[family-name:var(--font-cormorant)] text-[18px] font-bold italic text-noir">
            11 Entités · 1100 Couches
          </div>
          <div className="flex-1 h-px bg-div" />
          <div className="font-[family-name:var(--font-jetbrains)] text-[8px] text-t3">
            NAVIGUER LES DONNÉES
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
          RAQIB V4 · 1100 COUCHES · 11 ENTITÉS · 255 AGENTS · EIGEN HOLDING SAS
        </span>
        <span className="text-[7px] text-gold font-[family-name:var(--font-jetbrains)]">
          MARS 2026 · SOUVERAINETÉ INTÉGRALE
        </span>
      </div>
    </div>
  );
}
