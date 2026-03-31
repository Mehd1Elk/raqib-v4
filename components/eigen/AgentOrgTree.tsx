'use client';
import { useEffect, useRef, useState, useCallback } from 'react';
import * as d3 from 'd3';
import { agentsData as AGENTS_DATA } from '@/lib/agents-data';

interface OrgNode {
  id: string;
  name: string;
  layer: string;
  count?: number;
  platform?: string;
  status?: string;
  color: string;
  children?: OrgNode[];
}

export default function AgentOrgTree({ onSelectAgent }: { onSelectAgent?: (id: string) => void }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      if (svgRef.current?.parentElement) {
        setDimensions({
          width: svgRef.current.parentElement.clientWidth,
          height: svgRef.current.parentElement.clientHeight,
        });
      }
    };
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    if (!svgRef.current || !dimensions.width) return;
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const { width, height } = dimensions;
    const g = svg.append('g').attr('class', 'tree-container');

    // ZOOM + PAN
    const zoomBehavior = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.2, 4])
      .on('zoom', (event) => {
        g.attr('transform', event.transform);
      });
    svg.call(zoomBehavior);

    // Initial transform centré
    const initialTransform = d3.zoomIdentity.translate(width / 2, 60).scale(0.7);
    svg.call(zoomBehavior.transform, initialTransform);

    // DONNÉES HIÉRARCHIQUES
    const treeData = buildHierarchy(AGENTS_DATA);
    const root = d3.hierarchy(treeData);
    
    const treeLayout = d3.tree<OrgNode>()
      .nodeSize([180, 100])
      .separation((a, b) => a.parent === b.parent ? 1.2 : 1.8);
    
    treeLayout(root);

    // LIENS courbes
    g.selectAll('path.link')
      .data(root.links())
      .join('path')
      .attr('class', 'link')
      .attr('d', d3.linkVertical<any, any>()
        .x(d => d.x)
        .y(d => d.y)
      )
      .attr('fill', 'none')
      .attr('stroke', '#D4CCBA')
      .attr('stroke-width', 1)
      .attr('stroke-opacity', 0.6);

    // NŒUDS
    const nodes = g.selectAll('g.node')
      .data(root.descendants())
      .join('g')
      .attr('class', 'node')
      .attr('transform', d => `translate(${d.x},${d.y})`)
      .style('cursor', 'pointer');

    // Rectangle fond
    nodes.append('rect')
      .attr('x', -80)
      .attr('y', -28)
      .attr('width', 160)
      .attr('height', 56)
      .attr('rx', 6)
      .attr('fill', '#FDFAF3')
      .attr('stroke', d => d.data.color + '40')
      .attr('stroke-width', 1.5)
      .style('filter', 'drop-shadow(0 1px 3px rgba(0,0,0,0.04))')
      .on('mouseenter', function() {
        d3.select(this)
          .transition().duration(150)
          .attr('stroke', (d: any) => d.data.color)
          .attr('stroke-width', 2)
          .style('filter', 'drop-shadow(0 2px 6px rgba(0,0,0,0.08))');
      })
      .on('mouseleave', function() {
        d3.select(this)
          .transition().duration(150)
          .attr('stroke', (d: any) => d.data.color + '40')
          .attr('stroke-width', 1.5)
          .style('filter', 'drop-shadow(0 1px 3px rgba(0,0,0,0.04))');
      });

    // Barre couleur gauche
    nodes.append('rect')
      .attr('x', -80)
      .attr('y', -28)
      .attr('width', 3)
      .attr('height', 56)
      .attr('rx', 1.5)
      .attr('fill', d => d.data.color);

    // Nom
    nodes.append('text')
      .attr('x', -68)
      .attr('y', -6)
      .attr('font-family', 'Cormorant Garamond')
      .attr('font-size', 11)
      .attr('font-weight', 700)
      .attr('font-style', 'italic')
      .attr('fill', '#1C1814')
      .text(d => {
        const name = d.data.name;
        return name.length > 22 ? name.slice(0, 22) + '…' : name;
      });

    // Layer + info
    nodes.append('text')
      .attr('x', -68)
      .attr('y', 10)
      .attr('font-family', 'JetBrains Mono')
      .attr('font-size', 8)
      .attr('fill', '#918977')
      .text(d => d.data.count ? `${d.data.layer} · ${d.data.count} agents` : d.data.layer);

    // Status dot
    nodes.filter(d => !!d.data.status)
      .append('circle')
      .attr('cx', 68)
      .attr('cy', -10)
      .attr('r', 3)
      .attr('fill', d => {
        const s = d.data.status;
        return s === 'active' ? '#3D7C5E' : s === 'error' ? '#9C3D3D' : '#918977';
      });

    // Click → callback
    nodes.on('click', (event, d) => {
      if (onSelectAgent && d.data.id) {
        onSelectAgent(d.data.id);
      }
      // Zoom to node
      const transform = d3.zoomIdentity
        .translate(width / 2, height / 2)
        .scale(1.5)
        .translate(-d.x!, -d.y!);
      svg.transition().duration(500).call(zoomBehavior.transform, transform);
    });

  }, [dimensions, onSelectAgent]);

  return (
    <div className="relative w-full h-full min-h-[500px]">
      <svg ref={svgRef} width="100%" height="100%" />
      
      {/* Contrôles zoom */}
      <div className="absolute bottom-4 right-4 flex flex-col gap-1">
        <button onClick={() => {
          const svg = d3.select(svgRef.current);
          svg.transition().duration(300).call(d3.zoom().scaleBy as any, 1.3);
        }} className="w-8 h-8 bg-[#FDFAF3] border border-[rgba(60,52,40,0.10)] rounded flex items-center justify-center hover:border-[#B8963E] text-[#918977] hover:text-[#B8963E]">+</button>
        <button onClick={() => {
          const svg = d3.select(svgRef.current);
          svg.transition().duration(300).call(d3.zoom().scaleBy as any, 0.7);
        }} className="w-8 h-8 bg-[#FDFAF3] border border-[rgba(60,52,40,0.10)] rounded flex items-center justify-center hover:border-[#B8963E] text-[#918977] hover:text-[#B8963E]">−</button>
        <button onClick={() => {
          const svg = d3.select(svgRef.current);
          const { width, height } = dimensions;
          svg.transition().duration(500).call(d3.zoom().transform as any, d3.zoomIdentity.translate(width/2, 60).scale(0.7));
        }} className="w-8 h-8 bg-[#FDFAF3] border border-[rgba(60,52,40,0.10)] rounded flex items-center justify-center hover:border-[#B8963E] text-[#918977] hover:text-[#B8963E] font-['JetBrains_Mono'] text-[8px]">FIT</button>
      </div>
      
      {/* Minimap */}
      <div className="absolute bottom-4 left-4 w-[140px] h-[90px] bg-[#FDFAF3] border border-[rgba(60,52,40,0.10)] rounded opacity-50 hover:opacity-100 transition overflow-hidden">
        <svg viewBox="-500 -100 1000 800" className="w-full h-full">
          {/* Simplified version of the tree */}
        </svg>
      </div>
    </div>
  );
}

function buildHierarchy(agents: any[]): OrgNode {
  const LAYER_COLORS: Record<string, string> = {
    L4: '#7B5EA7', L3: '#3D7C5E', L2: '#3D5E8C', 'L1.5': '#9C3D3D', L1: '#B8963E', OPS: '#918977', SPECIAL: '#6E2A3D'
  };
  
  return {
    id: 'root', name: 'EIGEN', layer: 'Holding', color: '#B8963E',
    children: [
      { id: 'l4', name: 'Fondateur + Architectes', layer: 'L4', count: 8, color: LAYER_COLORS.L4, children: agents.filter(a => a.layer === 'L4').map(a => ({ ...a, color: LAYER_COLORS.L4 })) },
      { id: 'l3', name: 'Reporting & Stratégie', layer: 'L3', count: 3, color: LAYER_COLORS.L3, children: agents.filter(a => a.layer === 'L3').map(a => ({ ...a, color: LAYER_COLORS.L3 })) },
      { id: 'l2', name: 'Supervision', layer: 'L2', count: 6, color: LAYER_COLORS.L2, children: agents.filter(a => a.layer === 'L2').map(a => ({ ...a, color: LAYER_COLORS.L2 })) },
      { id: 'l15', name: 'Super-Agents QA', layer: 'L1.5', count: 40, color: LAYER_COLORS['L1.5'], children: [
        { id: 'sa-termi', name: 'Terminologie', layer: 'L1.5', count: 7, color: LAYER_COLORS['L1.5'] },
        { id: 'sa-fact', name: 'Factuels', layer: 'L1.5', count: 7, color: LAYER_COLORS['L1.5'] },
        { id: 'sa-code', name: 'Code Review', layer: 'L1.5', count: 10, color: LAYER_COLORS['L1.5'] },
        { id: 'sa-qa', name: 'QA Adversariale', layer: 'L1.5', count: 16, color: LAYER_COLORS['L1.5'] },
      ]},
      { id: 'l1', name: 'Production', layer: 'L1', count: 120, color: LAYER_COLORS.L1, children: [
        { id: 'pole-neuro', name: 'Neurosciences', layer: 'L1', count: 10, color: LAYER_COLORS.L1 },
        { id: 'pole-ia', name: 'IA & Ingénierie', layer: 'L1', count: 12, color: LAYER_COLORS.L1 },
        { id: 'pole-data', name: 'Données & Conformité', layer: 'L1', count: 8, color: LAYER_COLORS.L1 },
        { id: 'pole-marche', name: 'Marché & Acquisition', layer: 'L1', count: 10, color: LAYER_COLORS.L1 },
        { id: 'pole-comm', name: 'Communication', layer: 'L1', count: 8, color: LAYER_COLORS.L1 },
        { id: 'pole-reserve', name: 'Réserve', layer: 'L1', count: 72, color: '#D4CCBA' },
      ]},
      { id: 'ops', name: 'Opérationnels Raqib', layer: 'OPS', count: 46, color: LAYER_COLORS.OPS, children: [
        { id: 'ops-collect', name: 'Collecteurs', layer: 'OPS', count: 10, color: LAYER_COLORS.OPS },
        { id: 'ops-viz', name: 'Visualisation', layer: 'OPS', count: 6, color: LAYER_COLORS.OPS },
        { id: 'ops-prod', name: 'Production', layer: 'OPS', count: 8, color: LAYER_COLORS.OPS },
        { id: 'ops-super', name: 'Supervision', layer: 'OPS', count: 2, color: LAYER_COLORS.OPS },
      ]},
    ]
  };
}
