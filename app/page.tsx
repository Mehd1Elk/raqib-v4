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

// ── Design tokens ────────────────────────────────────────────────
const P  = '#1E0A20';          // prune
const P2 = '#2A1230';          // prune2
const N  = '#FAF8FC';          // nacre
const N2 = '#F5F2F8';          // nacre2
const N3 = '#EEEBF4';          // nacre3
const T2 = 'rgba(30,10,32,0.60)';
const T3 = 'rgba(30,10,32,0.35)';
const T4 = 'rgba(30,10,32,0.08)';
const ST2 = '#E4D4EA';         // surface text on dark bg
const ST3 = 'rgba(228,212,234,0.55)';
const DIV = 'rgba(30,10,32,0.08)';
const GR  = '"Playfair Display", "Didot", Georgia, serif';
const MN  = '"JetBrains Mono", monospace';
const SN  = '"Geist", "Helvetica Neue", Helvetica, sans-serif';
// ─────────────────────────────────────────────────────────────────

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
      <div style={{ background: N, borderBottom: `0.5px solid ${DIV}`, padding: '20px 32px', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
              <div style={{ width: 10, height: 10, background: P, flexShrink: 0 }} />
              <h1 style={{ fontFamily: GR, fontSize: 28, fontWeight: 400, color: P, margin: 0, letterSpacing: 2 }}>
                Raqib <span style={{ fontWeight: 400, fontSize: 20, color: T2 }}>رقيب</span>
              </h1>
            </div>
            <p style={{ fontFamily: MN, fontSize: 9, color: T3, letterSpacing: 3, textTransform: 'uppercase', margin: 0 }}>
              V4 · 1100 COUCHES · 11 ENTITÉS · 16 384 ENTRIES · 255 AGENTS
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            <a href="/eigen" style={{ padding: '7px 16px', background: P, color: N, fontFamily: MN, fontSize: 9, letterSpacing: 3, textTransform: 'uppercase', textDecoration: 'none', display: 'inline-block' }}>
              COCKPIT EIGEN →
            </a>
            <a href="/upload" style={{ padding: '7px 16px', border: `0.5px solid ${T3}`, color: T2, fontFamily: MN, fontSize: 9, letterSpacing: 3, textTransform: 'uppercase', textDecoration: 'none', display: 'inline-block' }}>
              IMPORTER
            </a>
            <a href="/vault" style={{ padding: '7px 14px', border: `0.5px solid #8B5EB0`, color: '#8B5EB0', fontFamily: MN, fontSize: 9, letterSpacing: 3, textTransform: 'uppercase', textDecoration: 'none', display: 'inline-block' }}>
              VAULT
            </a>
            <GlobalNav />
            <ExportButton entityIndex={entityIndex} />
            <kbd style={{ fontFamily: MN, fontSize: 8, color: T3, background: N3, padding: '2px 6px', border: `0.5px solid ${DIV}`, cursor: 'pointer' }}>
              ⌘K
            </kbd>
            <span style={{ fontFamily: MN, fontSize: 9, color: T3 }}>{time}</span>
          </div>
        </div>
      </div>

      {/* ═══ ZONE 2 — NAVIGATION CARDS ═══ */}
      <div style={{ background: N2, borderBottom: `0.5px solid ${DIV}`, padding: '20px 32px', flexShrink: 0 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>

          {/* Card COCKPIT EIGEN — prune dark, double height */}
          <a href="/eigen" style={{ gridRow: 'span 2', background: P, color: N, padding: 24, textDecoration: 'none', border: `0.5px solid ${P2}`, display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontFamily: MN, fontSize: 8, color: ST3, letterSpacing: 4, textTransform: 'uppercase', marginBottom: 10 }}>COCKPIT</div>
            <div style={{ fontFamily: GR, fontSize: 22, fontWeight: 400, color: N, marginBottom: 6, letterSpacing: 1 }}>EIGEN Stratégique</div>
            <div style={{ fontFamily: SN, fontSize: 11, color: ST3, marginBottom: 'auto' }}>
              6 sous-onglets · 255 agents · Board meeting · Galerie · Terminal
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginTop: 24 }}>
              {[['255', 'AGENTS'], ['59', 'DOCUMENTS'], ['88', 'SCORE']].map(([v, l]) => (
                <div key={l} style={{ textAlign: 'center' }}>
                  <div style={{ fontFamily: GR, fontSize: 24, fontWeight: 700, color: N }}>{v}</div>
                  <div style={{ fontFamily: MN, fontSize: 7, color: ST3, letterSpacing: 2 }}>{l}</div>
                </div>
              ))}
            </div>
            <div style={{ fontFamily: MN, fontSize: 8, color: ST2, letterSpacing: 2, marginTop: 16, opacity: 0.7 }}>
              OUVRIR LE COCKPIT →
            </div>
          </a>

          {/* Card NEXUS */}
          <a href="/nexus" style={{ background: P2, color: N, padding: 20, textDecoration: 'none', border: `0.5px solid rgba(228,212,234,0.08)` }}>
            <div style={{ fontFamily: MN, fontSize: 8, color: ST3, letterSpacing: 4, textTransform: 'uppercase', marginBottom: 8 }}>NEXUS</div>
            <div style={{ fontFamily: GR, fontSize: 16, color: N, marginBottom: 6 }}>Carte ecosysteme</div>
            <div style={{ fontFamily: SN, fontSize: 10, color: ST3, marginBottom: 12 }}>11 entités · 19 flux · Force-directed</div>
            <div style={{ display: 'flex', gap: 6 }}>
              {['#5A6E9C','#8B5EB0','#5A8A6E','#A87D3E','#5A8A90'].map((c) => (
                <span key={c} style={{ width: 8, height: 8, background: c, display: 'inline-block' }} />
              ))}
            </div>
          </a>

          {/* Card DASHBOARDS */}
          <a href="/dashboards/investor" style={{ background: N, color: P, padding: 20, textDecoration: 'none', border: `0.5px solid ${DIV}` }}>
            <div style={{ fontFamily: MN, fontSize: 8, color: P, letterSpacing: 4, textTransform: 'uppercase', marginBottom: 8 }}>DASHBOARDS</div>
            <div style={{ fontFamily: GR, fontSize: 16, color: P, marginBottom: 6 }}>Tableaux de bord</div>
            <div style={{ fontFamily: SN, fontSize: 10, color: T2, marginBottom: 12 }}>Investor · Supervisor · GITEX · London</div>
            <div style={{ display: 'flex', gap: 6 }}>
              {['INVESTOR','SUPERVISOR','GITEX'].map(l => (
                <span key={l} style={{ fontFamily: MN, fontSize: 7, padding: '2px 6px', background: T4, color: T3, letterSpacing: 1 }}>{l}</span>
              ))}
            </div>
          </a>

          {/* Card DATA VIEWER */}
          <a href="/data" style={{ background: N, color: P, padding: 20, textDecoration: 'none', border: `0.5px solid ${DIV}` }}>
            <div style={{ fontFamily: MN, fontSize: 8, color: '#A87D3E', letterSpacing: 4, textTransform: 'uppercase', marginBottom: 8 }}>DATA</div>
            <div style={{ fontFamily: GR, fontSize: 16, color: P, marginBottom: 6 }}>Data Viewer</div>
            <div style={{ fontFamily: SN, fontSize: 10, color: T2, marginBottom: 12 }}>11 entités · 1100 couches · Plein écran</div>
            <div style={{ display: 'flex', gap: 6 }}>
              {[['FULL SCREEN','#A87D3E'],['SEARCH', T3]].map(([l,c]) => (
                <span key={l} style={{ fontFamily: MN, fontSize: 7, padding: '2px 6px', border: `0.5px solid ${c}`, color: c as string, letterSpacing: 1 }}>{l}</span>
              ))}
            </div>
          </a>

          {/* Card STATS */}
          <a href="/stats" style={{ background: N, color: P, padding: 20, textDecoration: 'none', border: `0.5px solid ${DIV}` }}>
            <div style={{ fontFamily: MN, fontSize: 8, color: '#5A8A6E', letterSpacing: 4, textTransform: 'uppercase', marginBottom: 8 }}>PROGRESSION</div>
            <div style={{ fontFamily: GR, fontSize: 16, color: P, marginBottom: 6 }}>Stats &amp; Qualité</div>
            <div style={{ fontFamily: SN, fontSize: 10, color: T2, marginBottom: 12 }}>100% completion · 16 384 entries · conf 0.85</div>
            <div style={{ width: '100%', height: 3, background: N3 }}>
              <div style={{ width: '100%', height: 3, background: '#5A8A6E' }} />
            </div>
          </a>

          {/* Card BOARD MEETING */}
          <a href="/eigen?tab=board" style={{ background: N, color: P, padding: 20, textDecoration: 'none', border: `0.5px solid ${DIV}` }}>
            <div style={{ fontFamily: MN, fontSize: 8, color: '#8B5EB0', letterSpacing: 4, textTransform: 'uppercase', marginBottom: 8 }}>COMITÉ</div>
            <div style={{ fontFamily: GR, fontSize: 16, color: P, marginBottom: 6 }}>Board Meeting</div>
            <div style={{ fontFamily: SN, fontSize: 10, color: T2, marginBottom: 8 }}>5 directeurs IA · Débat stratégique</div>
            <div style={{ fontFamily: MN, fontSize: 9, color: T3 }}>Stratégie · Finance · Juridique · Tech · Commercial</div>
          </a>

          {/* Card TERMINAL */}
          <a href="/eigen?tab=terminal" style={{ background: P, color: N, padding: 20, textDecoration: 'none', border: `0.5px solid ${P2}` }}>
            <div style={{ fontFamily: MN, fontSize: 8, color: ST3, letterSpacing: 4, textTransform: 'uppercase', marginBottom: 8 }}>TERMINAL</div>
            <div style={{ fontFamily: MN, fontSize: 14, color: N, marginBottom: 6 }}>&gt; status</div>
            <div style={{ fontFamily: MN, fontSize: 9, color: ST3 }}>8 commandes · Live feed · 255 agents</div>
          </a>

          {/* Card CORRIDOR INTELLIGENCE */}
          <a href="/corridor" style={{ background: P, color: N, padding: 20, textDecoration: 'none', border: `0.5px solid rgba(90,110,156,0.3)` }}>
            <div style={{ fontFamily: MN, fontSize: 8, color: '#5A6E9C', letterSpacing: 4, textTransform: 'uppercase', marginBottom: 8 }}>CORRIDOR</div>
            <div style={{ fontFamily: GR, fontSize: 16, color: N, marginBottom: 6 }}>Corridor Intelligence</div>
            <div style={{ fontFamily: SN, fontSize: 10, color: ST3, marginBottom: 10 }}>
              49 pays · 250+ entreprises · Minéraux critiques · Scoring RAQIB
            </div>
            <div style={{ fontFamily: MN, fontSize: 8, color: ST3, letterSpacing: 3, textTransform: 'uppercase' }}>
              MODULE MADEN
            </div>
          </a>

          {/* Card DIWANE — Hermès mode, signature orange */}
          <a href="/diwane" style={{ background: '#1A1410', color: N, padding: 20, textDecoration: 'none', border: '0.5px solid rgba(232,96,10,0.25)' }}>
            <div style={{ fontFamily: MN, fontSize: 8, color: '#E8600A', letterSpacing: 4, textTransform: 'uppercase', marginBottom: 8 }}>DIWANE ديوان</div>
            <div style={{ fontFamily: GR, fontSize: 16, color: N, marginBottom: 6 }}>Art Market Intelligence</div>
            <div style={{ fontFamily: SN, fontSize: 10, color: 'rgba(240,234,224,0.55)', marginBottom: 10 }}>
              49 pays · Artistes · Galeries · Enchères
            </div>
            <div style={{ fontFamily: MN, fontSize: 8, color: '#C4956A', letterSpacing: 3, textTransform: 'uppercase' }}>
              HERMÈS INTELLIGENCE
            </div>
          </a>

          {/* Card ACQUISITION */}
          <a href="/acquisition" style={{ background: P2, color: N, padding: 20, textDecoration: 'none', border: `0.5px solid rgba(168,125,62,0.25)` }}>
            <div style={{ fontFamily: MN, fontSize: 8, color: '#A87D3E', letterSpacing: 4, textTransform: 'uppercase', marginBottom: 8 }}>ACQUISITION</div>
            <div style={{ fontFamily: GR, fontSize: 16, color: N, marginBottom: 6 }}>Intelligence d&apos;Acquisition</div>
            <div style={{ fontFamily: SN, fontSize: 10, color: ST3, marginBottom: 10 }}>
              396 entreprises · 6 personas · 12 onglets · Supply Chain · Chevaux de Troie
            </div>
            <div style={{ fontFamily: MN, fontSize: 8, color: ST3, letterSpacing: 3, textTransform: 'uppercase' }}>
              MODULE ACQUISITION
            </div>
          </a>

          {/* Card INTENTION — Paradigme green accent */}
          <a href="/intention" style={{ background: '#0A140A', color: N, padding: 20, textDecoration: 'none', border: '0.5px solid rgba(34,197,94,0.25)' }}>
            <div style={{ fontFamily: MN, fontSize: 8, color: '#22C55E', letterSpacing: 4, textTransform: 'uppercase', marginBottom: 8 }}>PARADIGME</div>
            <div style={{ fontFamily: GR, fontSize: 16, color: N, marginBottom: 6 }}>Intelligence de l&apos;Intention</div>
            <div style={{ fontFamily: SN, fontSize: 10, color: 'rgba(224,240,224,0.55)', marginBottom: 10 }}>
              Bloomberg des Données · 16 axes · Bourse des Intentions · Les Pionniers · Diaspora
            </div>
            <div style={{ fontFamily: MN, fontSize: 8, color: '#22C55E', letterSpacing: 3, textTransform: 'uppercase' }}>
              MODULE INTENTION
            </div>
          </a>

          {/* Card SCIENCE — Quantum accent */}
          <a href="/science" style={{ background: '#0A0A14', color: N, padding: 20, textDecoration: 'none', border: '0.5px solid rgba(99,102,241,0.25)' }}>
            <div style={{ fontFamily: MN, fontSize: 8, color: '#6366F1', letterSpacing: 4, textTransform: 'uppercase', marginBottom: 8 }}>SCIENCE</div>
            <div style={{ fontFamily: GR, fontSize: 16, color: N, marginBottom: 6 }}>Intelligence Scientifique</div>
            <div style={{ fontFamily: SN, fontSize: 10, color: 'rgba(224,224,240,0.55)', marginBottom: 10 }}>
              7 domaines · 50+ papers · 30 labs · Quantum Watch
            </div>
            <div style={{ fontFamily: MN, fontSize: 8, color: '#6366F1', letterSpacing: 3, textTransform: 'uppercase' }}>
              MODULE SCIENCE
            </div>
          </a>

          {/* Card MYNε — Sovereign purple accent */}
          <a href="/myne" style={{ background: '#0F0A14', color: N, padding: 20, textDecoration: 'none', border: '0.5px solid rgba(123,94,167,0.25)' }}>
            <div style={{ fontFamily: MN, fontSize: 8, color: '#7B5EA7', letterSpacing: 4, textTransform: 'uppercase', marginBottom: 8 }}>BRIQUE</div>
            <div style={{ fontFamily: GR, fontSize: 16, color: N, marginBottom: 6 }}>MYNε — Data Sovereignty</div>
            <div style={{ fontFamily: SN, fontSize: 10, color: 'rgba(224,224,240,0.55)', marginBottom: 10 }}>
              Marketplace de données souveraines — 9 modules · Manifeste · ÆLYA · Pricing
            </div>
            <div style={{ fontFamily: MN, fontSize: 8, color: '#7B5EA7', letterSpacing: 3, textTransform: 'uppercase' }}>
              SOVEREIGN DATA MARKETPLACE
            </div>
          </a>

          {/* Card CONFIANCE — Trust teal accent */}
          <a href="/confiance" style={{ background: '#0A1414', color: N, padding: 20, textDecoration: 'none', border: '0.5px solid rgba(0,212,184,0.25)' }}>
            <div style={{ fontFamily: MN, fontSize: 8, color: '#00D4B8', letterSpacing: 4, textTransform: 'uppercase', marginBottom: 8 }}>CONFIANCE</div>
            <div style={{ fontFamily: GR, fontSize: 16, color: N, marginBottom: 6 }}>Intelligence de la Confiance</div>
            <div style={{ fontFamily: SN, fontSize: 10, color: 'rgba(224,240,240,0.55)', marginBottom: 10 }}>
              CRIT de la Confiance · 12 onglets · Proof of Being · AI Authentication · Trust Thermodynamics
            </div>
            <div style={{ fontFamily: MN, fontSize: 8, color: '#00D4B8', letterSpacing: 3, textTransform: 'uppercase' }}>
              MODULE CONFIANCE
            </div>
          </a>

          {/* Card OBSERVANCE — Clinical teal accent */}
          <a href="/observance" style={{ background: '#0A1214', color: N, padding: 20, textDecoration: 'none', border: '0.5px solid rgba(90,172,172,0.25)' }}>
            <div style={{ fontFamily: MN, fontSize: 8, color: '#5AACAC', letterSpacing: 4, textTransform: 'uppercase', marginBottom: 8 }}>CLINIQUE</div>
            <div style={{ fontFamily: GR, fontSize: 16, color: N, marginBottom: 6 }}>Intelligence Observance</div>
            <div style={{ fontFamily: SN, fontSize: 10, color: 'rgba(224,240,240,0.55)', marginBottom: 10 }}>
              Clinical Intelligence · 13 onglets · Molécule × Signal · Digital Twin · MHFS
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ fontSize: 12 }}>♡</span>
              <span style={{ fontFamily: MN, fontSize: 8, color: '#5AACAC', letterSpacing: 3, textTransform: 'uppercase' }}>
                MODULE OBSERVANCE
              </span>
            </div>
          </a>

          {/* Card CERCLE ATLANTIQUE — CG Vitrine, dark green/gold */}
          <a href="/cercle" style={{ background: '#182218', color: '#EDE4D0', padding: 20, textDecoration: 'none', border: '0.5px solid rgba(176,140,72,0.25)' }}>
            <div style={{ fontFamily: MN, fontSize: 8, color: '#B08C48', letterSpacing: 4, textTransform: 'uppercase', marginBottom: 8 }}>CERCLE DU GAZODUC</div>
            <div style={{ fontFamily: GR, fontSize: 16, color: '#EDE4D0', marginBottom: 6 }}>Cercle Atlantique</div>
            <div style={{ fontFamily: SN, fontSize: 10, color: 'rgba(237,228,208,0.55)', marginBottom: 10 }}>
              22 nations · 124+ membres · Façade atlantique
            </div>
            <div style={{ fontFamily: MN, fontSize: 8, color: '#B08C48', letterSpacing: 3, textTransform: 'uppercase' }}>
              VITRINE CG →
            </div>
          </a>

          {/* Card OPERATIONS — TAHRIK deep blue/teal */}
          <a href="/operations" style={{ background: '#0C2EC8', color: '#E8FCFA', padding: 20, textDecoration: 'none', border: '0.5px solid rgba(0,212,192,0.25)' }}>
            <div style={{ fontFamily: MN, fontSize: 8, color: '#00D4C0', letterSpacing: 4, textTransform: 'uppercase', marginBottom: 8 }}>TAHRIK · تحريك</div>
            <div style={{ fontFamily: GR, fontSize: 16, color: '#E8FCFA', marginBottom: 6 }}>Opérations Terrain</div>
            <div style={{ fontFamily: SN, fontSize: 10, color: 'rgba(232,252,250,0.55)', marginBottom: 10 }}>
              Mission Dakhla · 5 contacts · 12 jalons · Roadmap 2026-2027
            </div>
            <div style={{ fontFamily: MN, fontSize: 8, color: '#00D4C0', letterSpacing: 3, textTransform: 'uppercase' }}>
              MODULE TAHRIK →
            </div>
          </a>

        </div>
      </div>

      {/* ═══ ZONE 2.5 — ACTIVITÉ RÉCENTE ═══ */}
      <div style={{ background: N, borderBottom: `0.5px solid ${DIV}`, padding: '20px 32px', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
          <Activity size={14} color={P} />
          <span style={{ fontFamily: GR, fontSize: 18, fontWeight: 400, color: P }}>Activité Récente</span>
          <div style={{ flex: 1, height: '0.5px', background: DIV }} />
          <a href="/eigen?tab=stream" style={{ fontFamily: MN, fontSize: 8, color: T3, textDecoration: 'none', letterSpacing: 2, textTransform: 'uppercase' }}>
            Ouvrir le Stream Complet →
          </a>
        </div>
        <div style={{ maxHeight: 200, border: `0.5px solid ${DIV}`, overflow: 'hidden', background: N2 }}>
          <EigenStream maxHeight="200px" limit={5} />
        </div>
      </div>

      {/* ═══ ZONE 3 — 11 ENTITÉS VIEWER ═══ */}
      <div style={{ background: N2, padding: '16px 32px 8px', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontFamily: GR, fontSize: 16, fontWeight: 400, color: P }}>
            11 Entités · 1100 Couches
          </span>
          <div style={{ flex: 1, height: '0.5px', background: DIV }} />
          <span style={{ fontFamily: MN, fontSize: 8, color: T3, letterSpacing: 2 }}>
            NAVIGUER LES DONNÉES
          </span>
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
            <div style={{ padding: '0 28px 20px', background: N2 }}>
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
      <div style={{ height: 26, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px', borderTop: `0.5px solid ${DIV}`, background: N }}>
        <span style={{ fontFamily: MN, fontSize: 7, color: T3, letterSpacing: 2 }}>
          RAQIB V4 · 1100 COUCHES · 11 ENTITÉS · 255 AGENTS · EIGEN HOLDING SAS
        </span>
        <span style={{ fontFamily: MN, fontSize: 7, color: P, letterSpacing: 2 }}>
          AVRIL 2026 · SOUVERAINETÉ INTÉGRALE
        </span>
      </div>
    </div>
  );
}
