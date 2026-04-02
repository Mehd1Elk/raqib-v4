'use client';

import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { LAYER_COLORS } from './shared';
import type { Agent } from '@/lib/agents-data';

interface ClusterDef {
  id: string;
  label: string;
  color: string;
  cx: number;
  cy: number;
}

interface AgentNode extends d3.SimulationNodeDatum {
  id: string;
  name: string;
  platform: string;
  layer: string;
  status: string;
  radius: number;
}

interface PlatformClusterViewProps {
  agents: Agent[];
  width: number;
  height: number;
  onSelectAgent?: (id: string) => void;
  searchHighlight?: string;
  layerFilters?: Set<string>;
}

const PLATFORM_COLORS: Record<string, string> = {
  Claude: '#7B5EA7',
  GPT: '#3D7C5E',
  Gemini: '#3D5E8C',
  Mistral: '#B87D3E',
  Qwen: '#9C3D3D',
  DeepSeek: '#6E2A3D',
};

export default function PlatformClusterView({ agents, width, height, onSelectAgent, searchHighlight, layerFilters }: PlatformClusterViewProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || !width || !height) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();
    const g = svg.append('g').attr('class', 'platform-container');

    // Zoom
    const zoomBehavior = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.2, 4])
      .on('zoom', (event) => g.attr('transform', event.transform));
    svg.call(zoomBehavior);
    svg.call(zoomBehavior.transform, d3.zoomIdentity.translate(width / 2, height / 2).scale(0.8));

    // Filter agents
    const filtered = layerFilters && layerFilters.size > 0
      ? agents.filter(a => layerFilters.has(a.layer))
      : agents;

    // Build cluster positions in a circle
    const platforms = Array.from(new Set(filtered.map(a => a.platform)));
    const clusterRadius = Math.min(width, height) * 0.3;
    const clusters: ClusterDef[] = platforms.map((p, i) => {
      const angle = (2 * Math.PI * i) / platforms.length - Math.PI / 2;
      return {
        id: p,
        label: p,
        color: PLATFORM_COLORS[p] || '#918977',
        cx: Math.cos(angle) * clusterRadius,
        cy: Math.sin(angle) * clusterRadius,
      };
    });

    // Build agent nodes
    const agentNodes: AgentNode[] = filtered.map(a => {
      const cluster = clusters.find(c => c.id === a.platform);
      return {
        id: a.id,
        name: a.name,
        platform: a.platform,
        layer: a.layer,
        status: a.status,
        radius: a.status === 'Actif' ? 6 : 4,
        x: (cluster?.cx || 0) + (Math.random() - 0.5) * 80,
        y: (cluster?.cy || 0) + (Math.random() - 0.5) * 80,
      };
    });

    // Custom cluster force
    function forceCluster(strength: number) {
      return (alpha: number) => {
        agentNodes.forEach(d => {
          const cluster = clusters.find(c => c.id === d.platform);
          if (cluster) {
            d.vx! += (cluster.cx - d.x!) * strength * alpha;
            d.vy! += (cluster.cy - d.y!) * strength * alpha;
          }
        });
      };
    }

    // Simulation
    const simulation = d3.forceSimulation(agentNodes)
      .force('charge', d3.forceManyBody().strength(-2))
      .force('cluster', forceCluster(0.3))
      .force('collision', d3.forceCollide<AgentNode>().radius(d => d.radius + 2))
      .force('center', d3.forceCenter(0, 0).strength(0.02));

    // Cluster labels (background)
    clusters.forEach(cluster => {
      const count = agentNodes.filter(n => n.platform === cluster.id).length;

      // Cluster background circle
      g.append('circle')
        .attr('cx', cluster.cx)
        .attr('cy', cluster.cy)
        .attr('r', Math.sqrt(count) * 14 + 30)
        .attr('fill', cluster.color + '08')
        .attr('stroke', cluster.color + '20')
        .attr('stroke-width', 1)
        .attr('stroke-dasharray', '4,4');

      // Label
      g.append('text')
        .attr('x', cluster.cx)
        .attr('y', cluster.cy - Math.sqrt(count) * 14 - 38)
        .attr('text-anchor', 'middle')
        .attr('font-family', 'Playfair Display')
        .attr('font-size', 14)
        .attr('font-weight', 700)
        
        .attr('fill', cluster.color)
        .text(cluster.label);

      // Count
      g.append('text')
        .attr('x', cluster.cx)
        .attr('y', cluster.cy - Math.sqrt(count) * 14 - 24)
        .attr('text-anchor', 'middle')
        .attr('font-family', 'JetBrains Mono')
        .attr('font-size', 9)
        .attr('fill', '#918977')
        .text(`${count} agents`);
    });

    // Agent circles
    const circles = g.selectAll<SVGCircleElement, AgentNode>('circle.agent')
      .data(agentNodes)
      .join('circle')
      .attr('class', 'agent')
      .attr('r', d => d.radius)
      .attr('fill', d => PLATFORM_COLORS[d.platform] || '#918977')
      .attr('fill-opacity', d => d.status === 'Actif' ? 0.9 : 0.4)
      .attr('stroke', d => {
        if (searchHighlight && d.name.toLowerCase().includes(searchHighlight.toLowerCase())) return '#B8963E';
        return 'none';
      })
      .attr('stroke-width', 2)
      .style('cursor', 'pointer');

    // Tooltip
    const tooltip = g.append('g').attr('class', 'tooltip').style('display', 'none');
    const tooltipRect = tooltip.append('rect')
      .attr('rx', 4).attr('fill', '#1C1814').attr('fill-opacity', 0.9);
    const tooltipText = tooltip.append('text')
      .attr('fill', '#FDFAF3').attr('font-family', 'JetBrains Mono').attr('font-size', 9)
      .attr('text-anchor', 'middle');

    circles
      .on('mouseenter', function (event, d) {
        d3.select(this).attr('r', d.radius * 1.8);
        tooltip.style('display', null);
        tooltipText.text(`${d.name} (${d.layer})`);
        const bbox = (tooltipText.node() as SVGTextElement).getBBox();
        tooltipRect.attr('x', bbox.x - 6).attr('y', bbox.y - 3).attr('width', bbox.width + 12).attr('height', bbox.height + 6);
      })
      .on('mousemove', function (event, d) {
        tooltip.attr('transform', `translate(${d.x},${d.y! - 20})`);
      })
      .on('mouseleave', function (event, d) {
        d3.select(this).attr('r', d.radius);
        tooltip.style('display', 'none');
      })
      .on('click', function (event, d) {
        if (onSelectAgent) onSelectAgent(d.id);
      });

    // Active agent highlight
    circles.filter(d => d.status === 'Actif').attr('stroke', d => PLATFORM_COLORS[d.platform] || '#918977').attr('stroke-width', 1);

    // Tick
    simulation.on('tick', () => {
      circles.attr('cx', d => d.x!).attr('cy', d => d.y!);
    });

    return () => { simulation.stop(); };
  }, [agents, width, height, onSelectAgent, searchHighlight, layerFilters]);

  return <svg ref={svgRef} width={width} height={height} />;
}
