'use client';
import { useEffect, useRef, useState, useCallback } from 'react';
import * as d3 from 'd3';
import { agentsData as AGENTS_DATA } from '@/lib/agents-data';
import { OrgViewSelector, type OrgViewId } from './org-views/OrgViewSelector';
import { LAYERS } from './org-views/shared';
import HierarchyView from './org-views/HierarchyView';
import PlatformClusterView from './org-views/PlatformClusterView';
import DataFlowView from './org-views/DataFlowView';
import EntityRadialView from './org-views/EntityRadialView';
import NetworkView from './org-views/NetworkView';
import { Search, Maximize2 } from 'lucide-react';

export default function AgentOrgTree({ onSelectAgent }: { onSelectAgent?: (id: string) => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [activeView, setActiveView] = useState<OrgViewId>('hierarchy');
  const [searchQuery, setSearchQuery] = useState('');
  const [layerFilters, setLayerFilters] = useState<Set<string>>(new Set());
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight,
        });
      }
    };
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const handleViewChange = useCallback((view: OrgViewId) => {
    setTransitioning(true);
    setTimeout(() => {
      setActiveView(view);
      setTransitioning(false);
    }, 200);
  }, []);

  const toggleLayer = useCallback((layer: string) => {
    setLayerFilters(prev => {
      const next = new Set(prev);
      if (next.has(layer)) {
        next.delete(layer);
      } else {
        next.add(layer);
      }
      return next;
    });
  }, []);

  const resetFilters = useCallback(() => {
    setLayerFilters(new Set());
    setSearchQuery('');
  }, []);

  const viewProps = {
    agents: AGENTS_DATA,
    width: dimensions.width,
    height: dimensions.height - 90,
    onSelectAgent,
    searchHighlight: searchQuery || undefined,
    layerFilters: layerFilters.size > 0 ? layerFilters : undefined,
  };

  return (
    <div ref={containerRef} className="relative w-full h-full min-h-[500px]">
      {/* Top controls bar */}
      <div className="absolute top-3 left-3 right-3 z-10 flex flex-wrap items-center gap-2">
        {/* View selector */}
        <OrgViewSelector activeView={activeView} onViewChange={handleViewChange} />

        {/* Layer filters */}
        <div className="flex items-center gap-0.5 bg-[#F7F3EA] border border-[#E5E0D8] rounded-lg p-1">
          {LAYERS.map(layer => {
            const isActive = layerFilters.size === 0 || layerFilters.has(layer);
            return (
              <button
                key={layer}
                onClick={() => toggleLayer(layer)}
                className={`
                  px-2 py-1 text-[9px] font-mono font-bold uppercase rounded-md transition-all duration-150
                  ${isActive
                    ? 'bg-white text-[#1C1814] shadow-sm'
                    : 'text-[#918977]/40 hover:text-[#918977]'
                  }
                `}
              >
                {layer}
              </button>
            );
          })}
          {layerFilters.size > 0 && (
            <button
              onClick={resetFilters}
              className="px-2 py-1 text-[9px] font-mono text-[#9C3D3D] hover:text-[#9C3D3D]/70 transition-colors"
            >
              Reset
            </button>
          )}
        </div>

        {/* Search */}
        <div className="relative ml-auto">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-[#918977]" size={12} />
          <input
            type="text"
            placeholder="Chercher un agent..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="pl-7 pr-3 py-1.5 bg-[#F7F3EA] border border-[#E5E0D8] rounded-lg text-[10px] font-mono text-[#1C1814] placeholder:text-[#918977]/50 focus:outline-none focus:ring-1 focus:ring-[#B8963E] focus:border-[#B8963E] w-[160px] transition-all"
          />
        </div>
      </div>

      {/* View container with fade transition */}
      <div
        className="absolute inset-0 pt-[50px] transition-opacity duration-200"
        style={{ opacity: transitioning ? 0 : 1 }}
      >
        {dimensions.width > 0 && (
          <>
            {activeView === 'hierarchy' && <HierarchyView {...viewProps} />}
            {activeView === 'platform' && <PlatformClusterView {...viewProps} />}
            {activeView === 'dataflow' && <DataFlowView {...viewProps} />}
            {activeView === 'entity' && <EntityRadialView {...viewProps} />}
            {activeView === 'network' && <NetworkView {...viewProps} />}
          </>
        )}
      </div>

      {/* Zoom controls */}
      <div className="absolute bottom-4 right-4 z-10 flex flex-col gap-1">
        <button
          onClick={() => {
            const svgEl = containerRef.current?.querySelector('svg');
            if (svgEl) {
              const svg = d3.select(svgEl);
              svg.transition().duration(300).call(d3.zoom().scaleBy as any, 1.3);
            }
          }}
          className="w-8 h-8 bg-[#FDFAF3] border border-[rgba(60,52,40,0.10)] rounded flex items-center justify-center hover:border-[#B8963E] text-[#918977] hover:text-[#B8963E] transition-colors"
        >
          +
        </button>
        <button
          onClick={() => {
            const svgEl = containerRef.current?.querySelector('svg');
            if (svgEl) {
              const svg = d3.select(svgEl);
              svg.transition().duration(300).call(d3.zoom().scaleBy as any, 0.7);
            }
          }}
          className="w-8 h-8 bg-[#FDFAF3] border border-[rgba(60,52,40,0.10)] rounded flex items-center justify-center hover:border-[#B8963E] text-[#918977] hover:text-[#B8963E] transition-colors"
        >
          -
        </button>
        <button
          onClick={() => {
            const svgEl = containerRef.current?.querySelector('svg');
            if (svgEl) {
              const svg = d3.select(svgEl);
              const w = dimensions.width;
              const h = dimensions.height - 90;
              svg.transition().duration(500).call(
                d3.zoom().transform as any,
                d3.zoomIdentity.translate(w / 2, h / 2).scale(0.65)
              );
            }
          }}
          className="w-8 h-8 bg-[#FDFAF3] border border-[rgba(60,52,40,0.10)] rounded flex items-center justify-center hover:border-[#B8963E] text-[#918977] hover:text-[#B8963E] transition-colors"
        >
          <Maximize2 size={12} />
        </button>
      </div>
    </div>
  );
}
