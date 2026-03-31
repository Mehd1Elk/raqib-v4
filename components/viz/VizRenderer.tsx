'use client';

import { useCallback, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { BarChart3, Map, Table2, Network, Clock } from 'lucide-react';
import { resolveVizType, VIZ_LABELS, type VizType } from '@/lib/viz-routing';
import { fetchEntries, subscribeToEntries } from '@/lib/supabase/client-queries';
import type { Database } from '@/lib/supabase/types';

type EntryRow = Database['public']['Tables']['entries']['Row'];

// ── Dynamic imports (ssr: false) ─────────────────────────────────────
const PinMap = dynamic(() => import('@/components/viz/maps/PinMap').then(m => ({ default: m.PinMap })), { ssr: false });
const ChoroplethMap = dynamic(() => import('@/components/viz/maps/ChoroplethMap').then(m => ({ default: m.ChoroplethMap })), { ssr: false });
const HeatMap = dynamic(() => import('@/components/viz/maps/HeatMap').then(m => ({ default: m.HeatMap })), { ssr: false });
const RouteMap = dynamic(() => import('@/components/viz/maps/RouteMap').then(m => ({ default: m.RouteMap })), { ssr: false });
const INSEEMap = dynamic(() => import('@/components/viz/maps/INSEEMap').then(m => ({ default: m.INSEEMap })), { ssr: false });

const MarketBubbleChart = dynamic(() => import('@/components/viz/charts/MarketBubbleChart').then(m => ({ default: m.MarketBubbleChart })), { ssr: false });
const InvestorsTreemapChart = dynamic(() => import('@/components/viz/charts/InvestorsTreemapChart').then(m => ({ default: m.InvestorsTreemapChart })), { ssr: false });
const EntitiesBarChart = dynamic(() => import('@/components/viz/charts/EntitiesBarChart').then(m => ({ default: m.EntitiesBarChart })), { ssr: false });
const GeopoliticsRadarChart = dynamic(() => import('@/components/viz/charts/GeopoliticsRadarChart').then(m => ({ default: m.GeopoliticsRadarChart })), { ssr: false });
const DealFlowFunnelChart = dynamic(() => import('@/components/viz/charts/DealFlowFunnelChart').then(m => ({ default: m.DealFlowFunnelChart })), { ssr: false });
const FieldDataHeatmapChart = dynamic(() => import('@/components/viz/charts/FieldDataHeatmapChart').then(m => ({ default: m.FieldDataHeatmapChart })), { ssr: false });

const NetworkGraph = dynamic(() => import('@/components/viz/networks/NetworkGraph').then(m => ({ default: m.NetworkGraph })), { ssr: false });
const EigenOrgChart = dynamic(() => import('@/components/viz/networks/EigenOrgChart').then(m => ({ default: m.EigenOrgChart })), { ssr: false });
const InnerCircleGraph = dynamic(() => import('@/components/viz/networks/InnerCircleGraph').then(m => ({ default: m.InnerCircleGraph })), { ssr: false });
const SynergyMatrix = dynamic(() => import('@/components/viz/networks/SynergyMatrix').then(m => ({ default: m.SynergyMatrix })), { ssr: false });
const DataFlowDiagram = dynamic(() => import('@/components/viz/networks/DataFlowDiagram').then(m => ({ default: m.DataFlowDiagram })), { ssr: false });
const FirewallDiagram = dynamic(() => import('@/components/viz/networks/FirewallDiagram').then(m => ({ default: m.FirewallDiagram })), { ssr: false });

const RegulatoryTimeline = dynamic(() => import('@/components/viz/timelines/RegulatoryTimeline').then(m => ({ default: m.RegulatoryTimeline })), { ssr: false });
const EventTimeline = dynamic(() => import('@/components/viz/timelines/EventTimeline').then(m => ({ default: m.EventTimeline })), { ssr: false });
const PublicationTimeline = dynamic(() => import('@/components/viz/timelines/PublicationTimeline').then(m => ({ default: m.PublicationTimeline })), { ssr: false });

const ComparisonTable = dynamic(() => import('@/components/viz/tables/ComparisonTable').then(m => ({ default: m.ComparisonTable })), { ssr: false });
const ScoringTable = dynamic(() => import('@/components/viz/tables/ScoringTable').then(m => ({ default: m.ScoringTable })), { ssr: false });
const DataTable = dynamic(() => import('@/components/viz/tables/DataTable').then(m => ({ default: m.DataTable })), { ssr: false });

// ── Icon for each viz category ───────────────────────────────────────
function vizIcon(vizType: VizType) {
  if (vizType.startsWith('map:')) return <Map size={12} />;
  if (vizType.startsWith('chart:')) return <BarChart3 size={12} />;
  if (vizType.startsWith('network:')) return <Network size={12} />;
  if (vizType.startsWith('timeline:')) return <Clock size={12} />;
  return <Table2 size={12} />;
}

// ── Props ────────────────────────────────────────────────────────────
interface VizRendererProps {
  layerId: string;
  layerName: string;
  platformName: string;
  categoryLabel: string;
  entityColor: string;
}

export function VizRenderer({ layerId, layerName, platformName, categoryLabel, entityColor }: VizRendererProps) {
  const vizType = resolveVizType(layerId, categoryLabel);
  const [view, setView] = useState<'viz' | 'table'>('viz');
  const [entries, setEntries] = useState<EntryRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalRows, setTotalRows] = useState(0);

  const loadEntries = useCallback(async () => {
    setIsLoading(true);
    try {
      const result = await fetchEntries(layerId, 0, 200);
      setEntries(result.entries);
      setTotalRows(result.total);
    } catch {
      setEntries([]);
      setTotalRows(0);
    } finally {
      setIsLoading(false);
    }
  }, [layerId]);

  useEffect(() => { void loadEntries(); }, [loadEntries]);

  useEffect(() => {
    const unsubscribe = subscribeToEntries((payload) => {
      if (payload.new.layer_id === layerId) void loadEntries();
    });
    return unsubscribe;
  }, [layerId, loadEntries]);

  const isEmpty = !isLoading && entries.length === 0;

  // ── Toggle bar ─────────────────────────────────────────────────────
  const toggleBar = (
    <div className="flex items-center gap-2 mb-3">
      <button
        onClick={() => setView('viz')}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-[9px] font-[family-name:var(--font-jetbrains)] tracking-[1px] transition-colors ${
          view === 'viz'
            ? 'text-ivory'
            : 'bg-ivory border border-div text-tm hover:text-t1'
        }`}
        style={view === 'viz' ? { background: entityColor } : undefined}
      >
        {vizIcon(vizType)} VISUALISATION
      </button>
      <button
        onClick={() => setView('table')}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-[9px] font-[family-name:var(--font-jetbrains)] tracking-[1px] transition-colors ${
          view === 'table'
            ? 'text-ivory'
            : 'bg-ivory border border-div text-tm hover:text-t1'
        }`}
        style={view === 'table' ? { background: entityColor } : undefined}
      >
        <Table2 size={12} /> TABLEAU
      </button>
      <span className="ml-auto text-[8px] font-[family-name:var(--font-jetbrains)] text-tm">
        {VIZ_LABELS[vizType]}
      </span>
    </div>
  );

  // ── Empty placeholder ──────────────────────────────────────────────
  if (isEmpty && view === 'viz') {
    return (
      <>
        {toggleBar}
        <div className="bg-ivory border border-div rounded flex flex-col items-center justify-center py-16 px-6">
          <div className="text-tm/20 mb-4">{vizIcon(vizType)}</div>
          <div className="text-[10px] font-[family-name:var(--font-jetbrains)] text-tm text-center max-w-md leading-relaxed">
            Couche en attente de peuplement — la visualisation apparaitra
            automatiquement quand les donnees seront collectees.
          </div>
          <div className="mt-2 text-[8px] font-[family-name:var(--font-jetbrains)] text-sand">
            {VIZ_LABELS[vizType]} prevue pour {layerName}
          </div>
        </div>
      </>
    );
  }

  // ── Table view (always DataTable for raw data) ─────────────────────
  if (view === 'table') {
    return (
      <>
        {toggleBar}
        <DataTable
          entries={entries}
          isLoading={isLoading}
          layerId={layerId}
          layerName={layerName}
          platformName={platformName}
          totalRows={totalRows}
          pageSize={25}
          paginationMode={totalRows > 100 ? 'server' : 'client'}
        />
      </>
    );
  }

  // ── Visualization view ─────────────────────────────────────────────
  return (
    <>
      {toggleBar}
      <div className="bg-ivory border border-div rounded overflow-hidden" style={{ minHeight: 380 }}>
        <VizComponent
          vizType={vizType}
          layerId={layerId}
          layerName={layerName}
          platformName={platformName}
          entries={entries}
          isLoading={isLoading}
          totalRows={totalRows}
        />
      </div>
    </>
  );
}

// ── Route to the actual component ────────────────────────────────────
interface VizComponentProps {
  vizType: VizType;
  layerId: string;
  layerName: string;
  platformName: string;
  entries: EntryRow[];
  isLoading: boolean;
  totalRows: number;
}

function VizComponent({ vizType, layerId, layerName, platformName, entries, isLoading, totalRows }: VizComponentProps) {
  const entryData = entries.map(e => ({ ...e, id: e.id, data: (e.data ?? {}) as Record<string, any> }));

  switch (vizType) {
    // Maps — use layerIds, they fetch their own data
    case 'map:pin':
      return <PinMap layerIds={[layerId]} />;
    case 'map:choropleth':
      return <ChoroplethMap layerIds={[layerId]} valueField="valeur" countryField="pays" legendLabel={layerName} />;
    case 'map:heat':
      return <HeatMap layerIds={[layerId]} legendLabel={layerName} />;
    case 'map:route':
      return <RouteMap layerId={layerId} />;
    case 'map:insee':
      return <INSEEMap height={480} />;

    // Charts — use layerId, they fetch their own data
    case 'chart:bubble':
      return <MarketBubbleChart layerId={layerId} />;
    case 'chart:treemap':
      return <InvestorsTreemapChart layerId={layerId} />;
    case 'chart:bar':
      return <EntitiesBarChart />;
    case 'chart:radar':
      return <GeopoliticsRadarChart layerId={layerId} />;
    case 'chart:funnel':
      return <DealFlowFunnelChart layerId={layerId} />;
    case 'chart:heatmap':
      return <FieldDataHeatmapChart layerId={layerId} />;

    // Networks — no props, hardcoded data
    case 'network:graph':
      return <NetworkGraph />;
    case 'network:org':
      return <EigenOrgChart />;
    case 'network:inner':
      return <InnerCircleGraph />;
    case 'network:synergy':
      return <SynergyMatrix />;
    case 'network:flow':
      return <DataFlowDiagram />;
    case 'network:firewall':
      return <FirewallDiagram />;

    // Timelines — pass entries as data
    case 'timeline:regulatory':
      return <RegulatoryTimeline data={entryData} />;
    case 'timeline:event':
      return <EventTimeline data={entryData} />;
    case 'timeline:fundraising':
      return <DataTable entries={entries} isLoading={isLoading} layerId={layerId} layerName={layerName} platformName={platformName} totalRows={totalRows} pageSize={25} />;
    case 'timeline:milestone':
      return <DataTable entries={entries} isLoading={isLoading} layerId={layerId} layerName={layerName} platformName={platformName} totalRows={totalRows} pageSize={25} />;
    case 'timeline:publication':
      return <PublicationTimeline data={entryData} />;

    // Tables — pass entries
    case 'table:comparison':
      return <ComparisonTable entries={entries} isLoading={isLoading} layerId={layerId} layerName={layerName} platformName={platformName} totalRows={totalRows} pageSize={25} />;
    case 'table:scoring':
      return <ScoringTable entries={entries} isLoading={isLoading} layerId={layerId} layerName={layerName} platformName={platformName} totalRows={totalRows} pageSize={25} />;
    case 'table:data':
    default:
      return <DataTable entries={entries} isLoading={isLoading} layerId={layerId} layerName={layerName} platformName={platformName} totalRows={totalRows} pageSize={25} />;
  }
}
