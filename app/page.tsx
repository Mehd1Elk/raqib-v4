'use client';

import { useState, useMemo, useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { Activity } from 'lucide-react';
import { ENTITIES, PLATFORMS } from '@/lib/constants';

const EigenStream = dynamic(() => import('@/components/stream/EigenStream'), { ssr: false });

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
    <div className="w-full min-h-screen flex flex-col overflow-x-hidden">
      <SearchOverlay onSelect={handleSearch} />

      {/* ═══ ZONE 1 — HERO HEADER ═══ */}
      <div className="shrink-0 bg-ivory border-b border-div px-8 py-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="min-w-0">
            <div className="flex items-center gap-3 mb-1.5">
              <div className="w-3 h-3 rounded-none-full bg-gold flex-shrink-0" />
              <h1 className="font-[family-name:var(--font-cormorant)] text-[32px] font-bold italic text-noir">
                Raqib <span className="font-normal text-[22px] text-gold">رقيب</span>
              </h1>
            </div>
            <p className="font-[family-name:var(--font-jetbrains)] text-[10px] text-t3 tracking-[2px]">
              V4 · 1100 COUCHES · 11 ENTITÉS · 16 384 ENTRIES · 255 AGENTS
            </p>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <a href="/eigen" className="px-4 py-2 bg-gold text-white font-[family-name:var(--font-jetbrains)] text-[10px] tracking-wider rounded-none hover:bg-gold-d transition">
              COCKPIT EIGEN →
            </a>
            <a href="/upload" className="px-4 py-2 border border-stone text-stone font-[family-name:var(--font-jetbrains)] text-[10px] tracking-wider rounded-none hover:border-gold hover:text-gold transition">
              IMPORTER
            </a>
            <a href="/vault" className="px-3 py-2 text-[10px] font-[family-name:var(--font-jetbrains)] tracking-wider text-[#7B5EA7] border border-[#7B5EA7] rounded-none hover:bg-[#7B5EA7] hover:text-white transition">
              VAULT
            </a>
            <GlobalNav />
            <ExportButton entityIndex={entityIndex} />
            <kbd className="text-[8px] font-[family-name:var(--font-jetbrains)] text-tm bg-cream px-1.5 py-0.5 rounded-none border border-div cursor-pointer">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

          {/* Card COCKPIT EIGEN */}
          <a href="/eigen" className="col-span-1 row-span-1 lg:row-span-2 bg-noir text-white rounded-none-none p-6 hover:ring-2 hover:ring-gold transition group no-underline">
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

          {/* Card NEXUS */}
          <a href="/nexus" className="bg-noir text-gold-l rounded-none-none p-5 hover:ring-1 hover:ring-gold transition no-underline group">
            <div className="font-[family-name:var(--font-jetbrains)] text-[9px] tracking-[2px] mb-2 text-[#1E0A20]">NEXUS</div>
            <div className="font-[family-name:var(--font-cormorant)] text-[16px] font-bold italic text-white mb-1">Carte ecosysteme</div>
            <div className="font-[family-name:var(--font-noto)] text-[10px] text-stone mb-3">11 entites &middot; 19 flux &middot; Force-directed</div>
            <div className="flex gap-1.5">
              <span className="w-2 h-2 rounded-none-full bg-[#1E0A20]" />
              <span className="w-2 h-2 rounded-none-full bg-[#7B5EA7]" />
              <span className="w-2 h-2 rounded-none-full bg-[#3D7C5E]" />
              <span className="w-2 h-2 rounded-none-full bg-[#B87D3E]" />
              <span className="w-2 h-2 rounded-none-full bg-[#1E0A20]" />
            </div>
            <div className="mt-3 font-[family-name:var(--font-jetbrains)] text-[8px] text-gold opacity-0 group-hover:opacity-100 transition">
              OUVRIR LE NEXUS &rarr;
            </div>
          </a>

          {/* Card DASHBOARDS */}
          <a href="/dashboards/investor" className="bg-ivory border border-div rounded-none-none p-5 hover:border-gold transition no-underline">
            <div className="font-[family-name:var(--font-jetbrains)] text-[9px] text-gold tracking-[2px] mb-2">DASHBOARDS</div>
            <div className="font-[family-name:var(--font-cormorant)] text-[16px] font-bold italic text-noir mb-1">Tableaux de bord</div>
            <div className="font-[family-name:var(--font-noto)] text-[10px] text-t3 mb-3">Investor · Supervisor · GITEX · London</div>
            <div className="flex gap-2">
              <span className="font-[family-name:var(--font-jetbrains)] text-[7px] px-2 py-0.5 bg-[rgba(30,10,32,0.06)] text-gold rounded-none">INVESTOR</span>
              <span className="font-[family-name:var(--font-jetbrains)] text-[7px] px-2 py-0.5 bg-[rgba(145,137,119,0.1)] text-t3 rounded-none">SUPERVISOR</span>
              <span className="font-[family-name:var(--font-jetbrains)] text-[7px] px-2 py-0.5 bg-[rgba(145,137,119,0.1)] text-t3 rounded-none">GITEX</span>
            </div>
          </a>

          {/* Card DATA VIEWER */}
          <a href="/data" className="bg-ivory border border-div rounded-none-none p-5 hover:border-gold transition no-underline">
            <div className="font-[family-name:var(--font-jetbrains)] text-[9px] text-[#B87D3E] tracking-[2px] mb-2">DATA</div>
            <div className="font-[family-name:var(--font-cormorant)] text-[16px] font-bold italic text-noir mb-1">Data Viewer</div>
            <div className="font-[family-name:var(--font-noto)] text-[10px] text-t3 mb-3">11 entites &middot; 1100 couches &middot; Plein ecran</div>
            <div className="flex gap-2">
              <span className="font-[family-name:var(--font-jetbrains)] text-[7px] px-2 py-0.5 bg-[rgba(184,125,62,0.1)] text-[#B87D3E] rounded-none">FULL SCREEN</span>
              <span className="font-[family-name:var(--font-jetbrains)] text-[7px] px-2 py-0.5 bg-[rgba(145,137,119,0.1)] text-t3 rounded-none">SEARCH</span>
            </div>
          </a>

          {/* Card STATS */}
          <a href="/stats" className="bg-ivory border border-div rounded-none-none p-5 hover:border-gold transition no-underline">
            <div className="font-[family-name:var(--font-jetbrains)] text-[9px] text-emerald tracking-[2px] mb-2">PROGRESSION</div>
            <div className="font-[family-name:var(--font-cormorant)] text-[16px] font-bold italic text-noir mb-1">Stats & Qualité</div>
            <div className="font-[family-name:var(--font-noto)] text-[10px] text-t3 mb-3">100% completion &middot; 16 384 entries &middot; conf 0.85</div>
            <div className="w-full h-2 bg-parchment rounded-none-full overflow-hidden">
              <div className="h-full bg-emerald rounded-none-full" style={{width:'100%'}} />
            </div>
          </a>

          {/* Card BOARD MEETING */}
          <a href="/eigen?tab=board" className="bg-ivory border border-div rounded-none-none p-5 hover:border-gold transition no-underline">
            <div className="font-[family-name:var(--font-jetbrains)] text-[9px] text-violet tracking-[2px] mb-2">COMITÉ</div>
            <div className="font-[family-name:var(--font-cormorant)] text-[16px] font-bold italic text-noir mb-1">Board Meeting</div>
            <div className="font-[family-name:var(--font-noto)] text-[10px] text-t3 mb-3">5 directeurs IA · Débat stratégique</div>
            <div className="font-[family-name:var(--font-jetbrains)] text-[9px] text-stone">Stratégie · Finance · Juridique · Tech · Commercial</div>
          </a>

          {/* Card TERMINAL */}
          <a href="/eigen?tab=terminal" className="bg-noir text-gold-l rounded-none-none p-5 hover:ring-1 hover:ring-gold transition no-underline">
            <div className="font-[family-name:var(--font-jetbrains)] text-[9px] tracking-[2px] mb-2 text-stone">TERMINAL</div>
            <div className="font-[family-name:var(--font-jetbrains)] text-[14px] mb-1">&gt; status</div>
            <div className="font-[family-name:var(--font-jetbrains)] text-[9px] text-stone">8 commandes · Live feed · 255 agents</div>
          </a>

          {/* Card CORRIDOR INTELLIGENCE */}
          <a href="/corridor" className="rounded-none-none p-5 hover:ring-1 hover:ring-[rgba(201,169,110,0.5)] transition no-underline" style={{ background: 'linear-gradient(135deg, #0A0A08 0%, #1A1918 100%)', border: '1px solid rgba(201,169,110,0.25)', color: '#E8E5DE' }}>
            <div style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: '1.4rem', color: '#1E0A20' }}>
              Corridor Intelligence
            </div>
            <div style={{ fontSize: '0.75rem', color: '#9A9790', marginTop: '0.5rem' }}>
              49 pays · 250+ entreprises · Minéraux critiques · Scoring RAQIB
            </div>
            <div style={{ fontSize: '0.65rem', color: '#8B7355', marginTop: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
              Module MADEN
            </div>
          </a>

          {/* Card DIWANE — Art Market Intelligence */}
          <a href="/diwane" className="rounded-none-none p-5 hover:ring-1 hover:ring-[rgba(232,96,10,0.5)] transition no-underline" style={{ background: '#1A1410', border: '1px solid rgba(232,96,10,0.25)', color: '#EEEBF4' }}>
            <div style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: '1.4rem', color: '#E8600A' }}>
              <span style={{ fontSize: '1.1rem', marginRight: '0.4rem', color: '#C4956A' }}>ديوان</span> DIWANE
            </div>
            <div style={{ fontSize: '0.75rem', color: '#A09888', marginTop: '0.5rem' }}>
              Art Market Intelligence — 49 pays · Artistes · Galeries · Enchères
            </div>
            <div style={{ fontSize: '0.65rem', color: '#8B6B4A', marginTop: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
              Hermès Intelligence
            </div>
          </a>

          {/* Card ACQUISITION — Intelligence d'Acquisition */}
          <a href="/acquisition" className="rounded-none-none p-5 hover:ring-1 hover:ring-[rgba(184,150,62,0.5)] transition no-underline" style={{ background: 'linear-gradient(135deg, #0A0A08 0%, #1A1814 100%)', border: '1px solid rgba(184,150,62,0.25)', color: '#E8E5DE' }}>
            <div style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: '1.4rem', color: '#1E0A20' }}>
              Intelligence d&apos;Acquisition
            </div>
            <div style={{ fontSize: '0.75rem', color: '#9A9790', marginTop: '0.5rem' }}>
              396 entreprises · 6 personas · 12 onglets · Supply Chain · Chevaux de Troie
            </div>
            <div style={{ fontSize: '0.65rem', color: '#8B7355', marginTop: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
              Module Acquisition
            </div>
          </a>

          {/* Card SCIENCE — Intelligence Scientifique */}
          <a href="/science" className="rounded-none-none p-5 hover:ring-1 hover:ring-[rgba(99,102,241,0.5)] transition no-underline" style={{ background: 'linear-gradient(135deg, #0A0A10 0%, #141420 100%)', border: '1px solid rgba(99,102,241,0.25)', color: '#E0E0F0' }}>
            <div style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: '1.4rem', color: '#6366F1' }}>
              Intelligence Scientifique
            </div>
            <div style={{ fontSize: '0.75rem', color: '#9090A0', marginTop: '0.5rem' }}>
              7 domaines · 50+ papers · 30 labs · Quantum Watch
            </div>
            <div style={{ fontSize: '0.65rem', color: '#6B6B8A', marginTop: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
              Module Science
            </div>
          </a>
        </div>
      </div>

      {/* ═══ ZONE 2.5 — ACTIVITÉ RÉCENTE ═══ */}
      <div className="shrink-0 px-8 py-5 bg-ivory border-b border-div">
        <div className="flex items-center gap-3 mb-4">
          <Activity size={16} className="text-gold" />
          <h2 className="font-[family-name:var(--font-cormorant)] text-[20px] font-bold italic text-noir">Activité Récente</h2>
          <div className="flex-1 h-px bg-div" />
          <a href="/eigen?tab=stream" className="font-[family-name:var(--font-jetbrains)] text-[8px] text-t3 uppercase tracking-wider hover:text-gold transition">
            Ouvrir le Stream Complet →
          </a>
        </div>
        <div className="max-h-[200px] border border-div rounded-none-none overflow-hidden bg-cream shadow-inner">
          <EigenStream maxHeight="200px" limit={5} />
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

      <div className="flex-1 flex min-h-0 overflow-hidden">
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
