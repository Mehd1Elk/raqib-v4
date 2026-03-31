'use client';

import { useEffect, useRef, useCallback } from 'react';
import * as d3 from 'd3';
import { LAYER_COLORS } from './shared';
import type { Agent } from '@/lib/agents-data';

interface HierarchyNode {
  id: string;
  name: string;
  layer: string;
  count?: number;
  color: string;
  status?: string;
  _children?: HierarchyNode[];
  children?: HierarchyNode[];
}

interface HierarchyViewProps {
  agents: Agent[];
  width: number;
  height: number;
  onSelectAgent?: (id: string) => void;
  searchHighlight?: string;
  layerFilters?: Set<string>;
}

export default function HierarchyView({ agents, width, height, onSelectAgent, searchHighlight, layerFilters }: HierarchyViewProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  const buildHierarchy = useCallback((data: Agent[]): HierarchyNode => {
    const filtered = layerFilters && layerFilters.size > 0
      ? data.filter(a => layerFilters.has(a.layer))
      : data;

    const byLayer = (layer: string) => filtered.filter(a => a.layer === layer);

    const makeLeaves = (list: Agent[]): HierarchyNode[] =>
      list.map(a => ({
        id: a.id,
        name: a.name,
        layer: a.layer,
        color: LAYER_COLORS[a.layer] || '#918977',
        status: a.status === 'Actif' ? 'active' : a.status === 'Erreur' ? 'error' : 'idle',
      }));

    const makeGroup = (id: string, name: string, layer: string, items: Agent[]): HierarchyNode => ({
      id,
      name,
      layer,
      count: items.length,
      color: LAYER_COLORS[layer] || '#918977',
      children: undefined,
      _children: makeLeaves(items),
    });

    const l1 = byLayer('L1');
    const l15 = byLayer('L1.5');
    const l2 = byLayer('L2');
    const l3 = byLayer('L3');
    const l4 = byLayer('L4');
    const ops = byLayer('OPS');

    const poleGroups = (items: Agent[], layer: string): HierarchyNode[] => {
      const poles = new Map<string, Agent[]>();
      items.forEach(a => {
        const group = poles.get(a.pole) || [];
        group.push(a);
        poles.set(a.pole, group);
      });
      return Array.from(poles).map(([pole, ag]) => makeGroup(`${layer}-${pole}`, pole, layer, ag));
    };

    return {
      id: 'root',
      name: 'EIGEN',
      layer: 'Holding',
      color: '#B8963E',
      children: [
        ...(l4.length ? [{ id: 'l4', name: 'Fondateur + Architectes', layer: 'L4', count: l4.length, color: LAYER_COLORS.L4, children: makeLeaves(l4) }] : []),
        ...(l3.length ? [{ id: 'l3', name: 'Reporting & Strategie', layer: 'L3', count: l3.length, color: LAYER_COLORS.L3, children: makeLeaves(l3) }] : []),
        ...(l2.length ? [{ id: 'l2', name: 'Supervision', layer: 'L2', count: l2.length, color: LAYER_COLORS.L2, children: makeLeaves(l2) }] : []),
        ...(l15.length ? [{ id: 'l15', name: 'Super-Agents QA', layer: 'L1.5', count: l15.length, color: LAYER_COLORS['L1.5'], _children: poleGroups(l15, 'L1.5') }] : []),
        ...(l1.length ? [{ id: 'l1', name: 'Production', layer: 'L1', count: l1.length, color: LAYER_COLORS.L1, _children: poleGroups(l1, 'L1') }] : []),
        ...(ops.length ? [{ id: 'ops', name: 'Operationnels Raqib', layer: 'OPS', count: ops.length, color: LAYER_COLORS.OPS, _children: makeLeaves(ops) }] : []),
      ],
    };
  }, [layerFilters]);

  useEffect(() => {
    if (!svgRef.current || !width || !height) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const g = svg.append('g').attr('class', 'hierarchy-container');

    // Zoom
    const zoomBehavior = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.2, 4])
      .on('zoom', (event) => g.attr('transform', event.transform));
    svg.call(zoomBehavior);

    const initialTransform = d3.zoomIdentity.translate(width / 2, 60).scale(0.55);
    svg.call(zoomBehavior.transform, initialTransform);

    const treeData = buildHierarchy(agents);

    const treeLayout = d3.tree<HierarchyNode>()
      .nodeSize([180, 120])
      .separation((a, b) => a.parent === b.parent ? 1.2 : 1.8);

    function render() {
      // Clear previous render
      g.selectAll('*').remove();

      const root = d3.hierarchy(treeData);
      treeLayout(root);

      // Links
      g.selectAll('path.h-link')
        .data(root.links())
        .join('path')
        .attr('class', 'h-link')
        .attr('fill', 'none')
        .attr('stroke', '#D4CCBA')
        .attr('stroke-width', 1)
        .attr('stroke-opacity', 0.6)
        .attr('d', d3.linkVertical<any, any>().x((d: any) => d.x).y((d: any) => d.y));

      // Nodes
      const nodes = g.selectAll<SVGGElement, any>('g.h-node')
        .data(root.descendants())
        .join('g')
        .attr('class', 'h-node')
        .attr('transform', (d: any) => `translate(${d.x},${d.y})`)
        .style('cursor', 'pointer')
        .attr('opacity', 1);

      // Background rect
      nodes.append('rect')
        .attr('x', -80).attr('y', -28)
        .attr('width', 160).attr('height', 56)
        .attr('rx', 6)
        .attr('fill', '#FDFAF3')
        .attr('stroke', (d: any) => {
          if (searchHighlight && d.data.name.toLowerCase().includes(searchHighlight.toLowerCase())) return '#B8963E';
          return d.data.color + '40';
        })
        .attr('stroke-width', (d: any) => {
          if (searchHighlight && d.data.name.toLowerCase().includes(searchHighlight.toLowerCase())) return 2.5;
          return 1.5;
        })
        .style('filter', 'drop-shadow(0 1px 3px rgba(0,0,0,0.04))')
        .attr('class', 'h-node-bg');

      // Color bar
      nodes.append('rect')
        .attr('x', -80).attr('y', -28)
        .attr('width', 3).attr('height', 56)
        .attr('rx', 1.5)
        .attr('fill', (d: any) => d.data.color);

      // Collapse indicator
      nodes.append('text')
        .attr('x', 68).attr('y', 14)
        .attr('text-anchor', 'middle')
        .attr('font-family', 'JetBrains Mono')
        .attr('font-size', 10)
        .attr('fill', '#918977')
        .text((d: any) => d.data._children ? '+' : d.data.children?.length > 0 ? '-' : '');

      // Name text
      nodes.append('text')
        .attr('x', -68).attr('y', -6)
        .attr('font-family', 'Cormorant Garamond')
        .attr('font-size', 11).attr('font-weight', 700).attr('font-style', 'italic')
        .attr('fill', '#1C1814')
        .text((d: any) => {
          const name = d.data.name;
          return name.length > 22 ? name.slice(0, 22) + '...' : name;
        });

      // Info line
      nodes.append('text')
        .attr('x', -68).attr('y', 10)
        .attr('font-family', 'JetBrains Mono')
        .attr('font-size', 8).attr('fill', '#918977')
        .text((d: any) => {
          const count = d.data.count || (d.data.children?.length) || (d.data._children?.length) || '';
          return count ? `${d.data.layer} · ${count} agents` : d.data.layer;
        });

      // Status dot
      nodes.filter((d: any) => !!d.data.status)
        .append('circle')
        .attr('cx', 68).attr('cy', -10).attr('r', 3)
        .attr('fill', (d: any) => {
          const s = d.data.status;
          return s === 'active' ? '#3D7C5E' : s === 'error' ? '#9C3D3D' : '#918977';
        });

      // Click to toggle collapse or select
      nodes.on('click', function (event: any, d: any) {
        const nodeData = d.data as HierarchyNode;
        if (nodeData._children) {
          nodeData.children = nodeData._children;
          nodeData._children = undefined;
          render();
        } else if (nodeData.children && nodeData.children.length > 0) {
          nodeData._children = nodeData.children;
          nodeData.children = undefined;
          render();
        } else if (onSelectAgent && nodeData.id) {
          onSelectAgent(nodeData.id);
        }
      });
    }

    render();

  }, [agents, width, height, buildHierarchy, onSelectAgent, searchHighlight]);

  return <svg ref={svgRef} width={width} height={height} />;
}
