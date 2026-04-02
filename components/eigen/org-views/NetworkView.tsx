'use client';

import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { LAYER_COLORS } from './shared';
import type { Agent } from '@/lib/agents-data';

interface NetNode extends d3.SimulationNodeDatum {
  id: string;
  name: string;
  layer: string;
  status: string;
  entries: number;
  radius: number;
}

interface NetLink extends d3.SimulationLinkDatum<NetNode> {
  strength: number;
}

interface NetworkViewProps {
  agents: Agent[];
  width: number;
  height: number;
  onSelectAgent?: (id: string) => void;
  searchHighlight?: string;
  layerFilters?: Set<string>;
}

export default function NetworkView({ agents, width, height, onSelectAgent, searchHighlight, layerFilters }: NetworkViewProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || !width || !height) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();
    const g = svg.append('g').attr('class', 'network-container');

    // Zoom
    const zoomBehavior = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.2, 4])
      .on('zoom', (event) => g.attr('transform', event.transform));
    svg.call(zoomBehavior);
    svg.call(zoomBehavior.transform, d3.zoomIdentity.translate(width / 2, height / 2).scale(0.65));

    const filtered = layerFilters && layerFilters.size > 0
      ? agents.filter(a => layerFilters.has(a.layer))
      : agents;

    // For large numbers, sample to keep performance
    const maxNodes = 150;
    const sampled = filtered.length > maxNodes
      ? [
        ...filtered.filter(a => ['L4', 'L3', 'L2'].includes(a.layer)),
        ...filtered.filter(a => a.layer === 'L1.5').slice(0, 30),
        ...filtered.filter(a => a.layer === 'L1' && a.status === 'Actif'),
        ...filtered.filter(a => a.layer === 'L1' && a.status !== 'Actif').slice(0, 40),
        ...filtered.filter(a => a.layer === 'OPS').slice(0, 20),
      ]
      : filtered;

    // Build nodes
    const nodeMap = new Map<string, NetNode>();
    const nodes: NetNode[] = sampled.map(a => {
      const n: NetNode = {
        id: a.id,
        name: a.name,
        layer: a.layer,
        status: a.status,
        entries: a.entriesProduced,
        radius: Math.max(3, Math.min(12, Math.sqrt(a.entriesProduced / 50))),
      };
      nodeMap.set(a.id, n);
      return n;
    });

    // Build dependencies
    const links: NetLink[] = [];
    const l1Nodes = nodes.filter(n => n.layer === 'L1');
    const l15Nodes = nodes.filter(n => n.layer === 'L1.5');
    const l2Nodes = nodes.filter(n => n.layer === 'L2');
    const l3Nodes = nodes.filter(n => n.layer === 'L3');
    const l4Nodes = nodes.filter(n => n.layer === 'L4');

    // L1 -> L1.5 (each L1 is verified by a L1.5)
    l1Nodes.forEach((l1, i) => {
      if (l15Nodes.length > 0) {
        const verifier = l15Nodes[i % l15Nodes.length];
        links.push({ source: l1.id, target: verifier.id, strength: 0.3 });
      }
    });

    // L1.5 -> L2 (escalations)
    l15Nodes.forEach((l15, i) => {
      if (l2Nodes.length > 0) {
        const supervisor = l2Nodes[i % l2Nodes.length];
        links.push({ source: l15.id, target: supervisor.id, strength: 0.5 });
      }
    });

    // L2 -> L3 (reports)
    l2Nodes.forEach(l2 => {
      if (l3Nodes.length > 0) {
        links.push({ source: l2.id, target: l3Nodes[0].id, strength: 0.7 });
      }
    });

    // L3 -> L4 (decisions)
    l3Nodes.forEach(l3 => {
      if (l4Nodes.length > 0) {
        links.push({ source: l3.id, target: l4Nodes[0].id, strength: 1.0 });
      }
    });

    // Resolve links to actual node objects
    const resolvedLinks = links.filter(l => {
      const src = nodeMap.get(l.source as string);
      const tgt = nodeMap.get(l.target as string);
      if (src && tgt) {
        l.source = src;
        l.target = tgt;
        return true;
      }
      return false;
    });

    // Force simulation
    const simulation = d3.forceSimulation(nodes)
      .force('charge', d3.forceManyBody().strength(-15))
      .force('center', d3.forceCenter(0, 0).strength(0.05))
      .force('link', d3.forceLink<NetNode, NetLink>(resolvedLinks).id(d => d.id).distance(60).strength(d => d.strength * 0.3))
      .force('collision', d3.forceCollide<NetNode>().radius(d => d.radius + 3))
      .force('layerY', (alpha: number) => {
        const layerY: Record<string, number> = { L4: -200, L3: -120, L2: -40, 'L1.5': 60, L1: 160, OPS: 200 };
        nodes.forEach(d => {
          const targetY = layerY[d.layer] || 0;
          d.vy! += (targetY - d.y!) * 0.03 * alpha;
        });
      });

    // Draw links
    const linkElements = g.append('g').attr('class', 'links')
      .selectAll('line')
      .data(resolvedLinks)
      .join('line')
      .attr('stroke', 'rgba(30,10,32,0.35)')
      .attr('stroke-opacity', 0.15)
      .attr('stroke-width', d => Math.max(0.5, d.strength * 1.5));

    // Draw nodes
    const nodeElements = g.append('g').attr('class', 'nodes')
      .selectAll<SVGCircleElement, NetNode>('circle')
      .data(nodes)
      .join('circle')
      .attr('r', d => d.radius)
      .attr('fill', d => LAYER_COLORS[d.layer] || 'rgba(30,10,32,0.60)')
      .attr('fill-opacity', d => d.status === 'Actif' ? 0.9 : 0.35)
      .attr('stroke', d => {
        if (searchHighlight && d.name.toLowerCase().includes(searchHighlight.toLowerCase())) return '#1E0A20';
        return LAYER_COLORS[d.layer] + '40';
      })
      .attr('stroke-width', d => searchHighlight && d.name.toLowerCase().includes(searchHighlight.toLowerCase()) ? 2.5 : 0.5)
      .style('cursor', 'pointer');

    // Drag behavior
    const drag = d3.drag<SVGCircleElement, NetNode>()
      .on('start', (event, d) => {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      })
      .on('drag', (event, d) => {
        d.fx = event.x;
        d.fy = event.y;
      })
      .on('end', (event, d) => {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      });

    nodeElements.call(drag);

    // Tooltip
    const tooltip = g.append('g').attr('class', 'tooltip').style('display', 'none');
    const tooltipRect = tooltip.append('rect')
      .attr('rx', 4).attr('fill', '#1E0A20').attr('fill-opacity', 0.9);
    const tooltipText = tooltip.append('text')
      .attr('fill', '#FAF8FC').attr('font-family', 'JetBrains Mono').attr('font-size', 9)
      .attr('text-anchor', 'middle');

    // Hover: highlight connected
    nodeElements
      .on('mouseenter', function (event, d) {
        const connected = new Set<string>();
        connected.add(d.id);
        resolvedLinks.forEach(l => {
          const src = (l.source as NetNode).id;
          const tgt = (l.target as NetNode).id;
          if (src === d.id) connected.add(tgt);
          if (tgt === d.id) connected.add(src);
        });

        nodeElements.attr('fill-opacity', n => connected.has(n.id) ? 0.95 : 0.08);
        linkElements.attr('stroke-opacity', l =>
          connected.has((l.source as NetNode).id) && connected.has((l.target as NetNode).id) ? 0.5 : 0.03
        );

        d3.select(this).attr('r', d.radius * 1.6);

        tooltip.style('display', null);
        tooltipText.text(`${d.name} (${d.layer}) · ${d.entries} entries`);
        const bbox = (tooltipText.node() as SVGTextElement).getBBox();
        tooltipRect.attr('x', bbox.x - 6).attr('y', bbox.y - 3).attr('width', bbox.width + 12).attr('height', bbox.height + 6);
        tooltip.attr('transform', `translate(${d.x},${d.y! - d.radius - 14})`);
      })
      .on('mouseleave', function (event, d) {
        nodeElements.attr('fill-opacity', n => n.status === 'Actif' ? 0.9 : 0.35);
        linkElements.attr('stroke-opacity', 0.15);
        d3.select(this).attr('r', d.radius);
        tooltip.style('display', 'none');
      })
      .on('click', function (event, d) {
        if (onSelectAgent) onSelectAgent(d.id);
      });

    // Active agent highlight
    nodeElements.filter(d => d.status === 'Actif')
      .attr('stroke', d => LAYER_COLORS[d.layer] || 'rgba(30,10,32,0.60)')
      .attr('stroke-width', 1.5);

    // Layer legend
    const legend = g.append('g').attr('transform', `translate(${-width / 2 + 20}, ${-height / 2 + 20})`);
    Object.entries(LAYER_COLORS).forEach(([layer, color], i) => {
      const lg = legend.append('g').attr('transform', `translate(0, ${i * 18})`);
      lg.append('circle').attr('r', 5).attr('fill', color);
      lg.append('text').attr('x', 12).attr('y', 4)
        .attr('font-family', 'JetBrains Mono').attr('font-size', 9).attr('fill', 'rgba(30,10,32,0.60)')
        .text(`${layer} (${nodes.filter(n => n.layer === layer).length})`);
    });

    // Tick
    simulation.on('tick', () => {
      linkElements
        .attr('x1', d => (d.source as NetNode).x!)
        .attr('y1', d => (d.source as NetNode).y!)
        .attr('x2', d => (d.target as NetNode).x!)
        .attr('y2', d => (d.target as NetNode).y!);

      nodeElements.attr('cx', d => d.x!).attr('cy', d => d.y!);
    });

    return () => { simulation.stop(); };
  }, [agents, width, height, onSelectAgent, searchHighlight, layerFilters]);

  return <svg ref={svgRef} width={width} height={height} />;
}
