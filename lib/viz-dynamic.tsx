/**
 * Centralized dynamic imports for ALL viz components.
 * Every dashboard should import from this file instead of doing its own dynamic().
 * All components use ssr: false + loading placeholder.
 */
'use client';

import dynamic from 'next/dynamic';

function Placeholder({ height = 400, label = 'Chargement...' }: { height?: number; label?: string }) {
  return (
    <div
      style={{
        height,
        background: '#F7F3EA',
        borderRadius: 8,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '1px solid #D4CCBA',
      }}
    >
      <span style={{ color: '#918977', fontFamily: 'JetBrains Mono, monospace', fontSize: 12 }}>{label}</span>
    </div>
  );
}

// ── Charts ──────────────────────────────────────────────────────────
export const EntitiesBarChart = dynamic(
  () => import('@/components/viz/charts/EntitiesBarChart').then(m => ({ default: m.EntitiesBarChart })),
  { ssr: false, loading: () => <Placeholder label="Chargement barres..." /> }
);

export const MarketBubbleChart = dynamic(
  () => import('@/components/viz/charts/MarketBubbleChart').then(m => ({ default: m.MarketBubbleChart })),
  { ssr: false, loading: () => <Placeholder label="Chargement bulles..." /> }
);

export const InvestorsTreemapChart = dynamic(
  () => import('@/components/viz/charts/InvestorsTreemapChart').then(m => ({ default: m.InvestorsTreemapChart })),
  { ssr: false, loading: () => <Placeholder label="Chargement treemap..." /> }
);

export const GeopoliticsRadarChart = dynamic(
  () => import('@/components/viz/charts/GeopoliticsRadarChart').then(m => ({ default: m.GeopoliticsRadarChart })),
  { ssr: false, loading: () => <Placeholder label="Chargement radar..." /> }
);

export const DealFlowFunnelChart = dynamic(
  () => import('@/components/viz/charts/DealFlowFunnelChart').then(m => ({ default: m.DealFlowFunnelChart })),
  { ssr: false, loading: () => <Placeholder label="Chargement entonnoir..." /> }
);

export const PlatformsPieChart = dynamic(
  () => import('@/components/viz/charts/PlatformsPieChart').then(m => ({ default: m.PlatformsPieChart })),
  { ssr: false, loading: () => <Placeholder label="Chargement distribution..." /> }
);

export const TimelineLineChart = dynamic(
  () => import('@/components/viz/charts/TimelineLineChart').then(m => ({ default: m.TimelineLineChart })),
  { ssr: false, loading: () => <Placeholder height={200} label="Chargement timeline..." /> }
);

export const FieldDataHeatmapChart = dynamic(
  () => import('@/components/viz/charts/FieldDataHeatmapChart').then(m => ({ default: m.FieldDataHeatmapChart })),
  { ssr: false, loading: () => <Placeholder label="Chargement heatmap..." /> }
);

// ── Maps ────────────────────────────────────────────────────────────
export const ChoroplethMap = dynamic(
  () => import('@/components/viz/maps/ChoroplethMap').then(m => ({ default: m.ChoroplethMap })),
  { ssr: false, loading: () => <Placeholder label="Chargement carte..." /> }
);

export const PinMap = dynamic(
  () => import('@/components/viz/maps/PinMap').then(m => ({ default: m.PinMap })),
  { ssr: false, loading: () => <Placeholder label="Chargement pins..." /> }
);

export const HeatMap = dynamic(
  () => import('@/components/viz/maps/HeatMap').then(m => ({ default: m.HeatMap })),
  { ssr: false, loading: () => <Placeholder label="Chargement heatmap..." /> }
);

export const RouteMap = dynamic(
  () => import('@/components/viz/maps/RouteMap').then(m => ({ default: m.RouteMap })),
  { ssr: false, loading: () => <Placeholder label="Chargement itinéraire..." /> }
);

export const CorridorMap = dynamic(
  () => import('@/components/viz/maps/CorridorMap').then(m => ({ default: m.CorridorMap })),
  { ssr: false, loading: () => <Placeholder label="Chargement corridor..." /> }
);

export const FlowMap = dynamic(
  () => import('@/components/viz/maps/FlowMap').then(m => ({ default: m.FlowMap })),
  { ssr: false, loading: () => <Placeholder label="Chargement flux..." /> }
);

export const INSEEMap = dynamic(
  () => import('@/components/viz/maps/INSEEMap').then(m => ({ default: m.INSEEMap })),
  { ssr: false, loading: () => <Placeholder label="Chargement carte INSEE..." /> }
);

// ── Networks ────────────────────────────────────────────────────────
export const EigenOrgChart = dynamic(
  () => import('@/components/viz/networks/EigenOrgChart').then(m => ({ default: m.EigenOrgChart })),
  { ssr: false, loading: () => <Placeholder label="Chargement organigramme..." /> }
);

export const InnerCircleGraph = dynamic(
  () => import('@/components/viz/networks/InnerCircleGraph').then(m => ({ default: m.InnerCircleGraph })),
  { ssr: false, loading: () => <Placeholder label="Chargement réseau..." /> }
);

export const NetworkGraph = dynamic(
  () => import('@/components/viz/networks/NetworkGraph').then(m => ({ default: m.NetworkGraph })),
  { ssr: false, loading: () => <Placeholder label="Chargement graphe..." /> }
);

export const SynergyMatrix = dynamic(
  () => import('@/components/viz/networks/SynergyMatrix').then(m => ({ default: m.SynergyMatrix })),
  { ssr: false, loading: () => <Placeholder label="Chargement matrice..." /> }
);

export const DataFlowDiagram = dynamic(
  () => import('@/components/viz/networks/DataFlowDiagram').then(m => ({ default: m.DataFlowDiagram })),
  { ssr: false, loading: () => <Placeholder label="Chargement flux..." /> }
);

export const FirewallDiagram = dynamic(
  () => import('@/components/viz/networks/FirewallDiagram').then(m => ({ default: m.FirewallDiagram })),
  { ssr: false, loading: () => <Placeholder label="Chargement gouvernance..." /> }
);

// ── Timelines ───────────────────────────────────────────────────────
export const FundraisingTimeline = dynamic(
  () => import('@/components/viz/timelines/FundraisingTimeline').then(m => ({ default: m.FundraisingTimeline })),
  { ssr: false, loading: () => <Placeholder height={200} label="Chargement levées..." /> }
);

export const EventTimeline = dynamic(
  () => import('@/components/viz/timelines/EventTimeline').then(m => ({ default: m.EventTimeline })),
  { ssr: false, loading: () => <Placeholder height={200} label="Chargement événements..." /> }
);

export const MilestoneTimeline = dynamic(
  () => import('@/components/viz/timelines/MilestoneTimeline').then(m => ({ default: m.MilestoneTimeline })),
  { ssr: false, loading: () => <Placeholder height={200} label="Chargement jalons..." /> }
);

export const AgentActivityTimeline = dynamic(
  () => import('@/components/viz/timelines/AgentActivityTimeline').then(m => ({ default: m.AgentActivityTimeline })),
  { ssr: false, loading: () => <Placeholder height={200} label="Chargement activité..." /> }
);

export const RegulatoryTimeline = dynamic(
  () => import('@/components/viz/timelines/RegulatoryTimeline').then(m => ({ default: m.RegulatoryTimeline })),
  { ssr: false, loading: () => <Placeholder height={200} label="Chargement réglementaire..." /> }
);

export const PublicationTimeline = dynamic(
  () => import('@/components/viz/timelines/PublicationTimeline').then(m => ({ default: m.PublicationTimeline })),
  { ssr: false, loading: () => <Placeholder height={200} label="Chargement publications..." /> }
);
