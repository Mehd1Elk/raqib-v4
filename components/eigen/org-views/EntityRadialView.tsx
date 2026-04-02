'use client';

import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { LAYER_COLORS } from './shared';
import type { Agent } from '@/lib/agents-data';

interface EntityBranch {
  id: string;
  label: string;
  color: string;
  keywords: string[];
}

interface EntityRadialViewProps {
  agents: Agent[];
  width: number;
  height: number;
  onSelectAgent?: (id: string) => void;
  searchHighlight?: string;
  layerFilters?: Set<string>;
}

const ENTITIES: EntityBranch[] = [
  { id: 'noos', label: 'NOOS', color: '#3D5E8C', keywords: ['noos', 'patient', 'clinique', 'nlp clinique', 'scid', 'computationnel', 'observance', 'neuroscien'] },
  { id: 'aelya', label: 'AELYA', color: '#7B5EA7', keywords: ['aelya', 'zkp', 'fertilite', 'lalla'] },
  { id: 'myne', label: 'MYNe', color: '#3D7C5E', keywords: ['myne', 'data engineer myne'] },
  { id: 'burhan', label: 'BURHAN', color: '#B87D3E', keywords: ['burhan', 'solidity', 'blockchain', 'mica', 'kyc'] },
  { id: 'yrknown', label: 'YrKnown', color: '#918977', keywords: ['yrknown', 'corridor'] },
  { id: 'diwane', label: 'DIWANE', color: '#6E2A3D', keywords: ['diwane', 'ohada'] },
  { id: 'alguesov', label: 'AlgueSov', color: '#3D7C8C', keywords: ['alguesov'] },
  { id: 'amana', label: 'AMANA', color: '#5E6E3D', keywords: ['amana'] },
  { id: 'cg', label: 'CG SA', color: '#162B20', keywords: ['cg'] },
  { id: 'cercle', label: 'Cercle', color: '#C9A96E', keywords: ['cercle'] },
  { id: 'eigen', label: 'EIGEN', color: '#B8963E', keywords: ['eigen', 'planific', 'reporter', 'optimis', 'raqib', 'super', 'fondateur', 'architecte'] },
];

function assignEntity(agent: Agent): string {
  const text = `${agent.name} ${agent.id} ${agent.pole}`.toLowerCase();
  for (const entity of ENTITIES) {
    for (const kw of entity.keywords) {
      if (text.includes(kw.toLowerCase())) return entity.id;
    }
  }
  return 'eigen';
}

export default function EntityRadialView({ agents, width, height, onSelectAgent, searchHighlight, layerFilters }: EntityRadialViewProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || !width || !height) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();
    const g = svg.append('g').attr('class', 'entity-container');

    // Zoom
    const zoomBehavior = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.2, 4])
      .on('zoom', (event) => g.attr('transform', event.transform));
    svg.call(zoomBehavior);
    svg.call(zoomBehavior.transform, d3.zoomIdentity.translate(width / 2, height / 2).scale(0.75));

    const filtered = layerFilters && layerFilters.size > 0
      ? agents.filter(a => layerFilters.has(a.layer))
      : agents;

    // Assign agents to entities
    const entityAgents = new Map<string, Agent[]>();
    ENTITIES.forEach(e => entityAgents.set(e.id, []));
    filtered.forEach(a => {
      const eid = assignEntity(a);
      const list = entityAgents.get(eid) || [];
      list.push(a);
      entityAgents.set(eid, list);
    });

    const outerRadius = Math.min(width, height) * 0.38;
    const innerRadius = 50;

    // Central node
    g.append('circle')
      .attr('cx', 0).attr('cy', 0).attr('r', innerRadius)
      .attr('fill', '#B8963E10')
      .attr('stroke', '#B8963E')
      .attr('stroke-width', 2);

    g.append('text')
      .attr('x', 0).attr('y', -8)
      .attr('text-anchor', 'middle')
      .attr('font-family', 'Playfair Display')
      .attr('font-size', 18).attr('font-weight', 700)
      .attr('fill', '#B8963E')
      .text('EIGEN');

    g.append('text')
      .attr('x', 0).attr('y', 12)
      .attr('text-anchor', 'middle')
      .attr('font-family', 'JetBrains Mono')
      .attr('font-size', 9)
      .attr('fill', '#918977')
      .text(`${filtered.length} agents`);

    // Draw entity branches
    ENTITIES.forEach((entity, i) => {
      const angle = (2 * Math.PI * i) / ENTITIES.length - Math.PI / 2;
      const entityList = entityAgents.get(entity.id) || [];
      const count = entityList.length;
      if (count === 0) return;

      const ex = Math.cos(angle) * outerRadius;
      const ey = Math.sin(angle) * outerRadius;

      // Branch line
      g.append('line')
        .attr('x1', Math.cos(angle) * innerRadius)
        .attr('y1', Math.sin(angle) * innerRadius)
        .attr('x2', ex).attr('y2', ey)
        .attr('stroke', entity.color + '30')
        .attr('stroke-width', Math.max(2, count / 3));

      // Entity arc background
      const arcRadius = Math.sqrt(count) * 8 + 20;
      const entityGroup = g.append('g')
        .attr('transform', `translate(${ex},${ey})`)
        .style('cursor', 'pointer');

      entityGroup.append('circle')
        .attr('r', arcRadius)
        .attr('fill', entity.color + '10')
        .attr('stroke', entity.color + '30')
        .attr('stroke-width', 1);

      // Entity label
      entityGroup.append('text')
        .attr('y', -arcRadius - 10)
        .attr('text-anchor', 'middle')
        .attr('font-family', 'Playfair Display')
        .attr('font-size', 13).attr('font-weight', 700)
        .attr('fill', entity.color)
        .text(entity.label);

      entityGroup.append('text')
        .attr('y', -arcRadius + 2)
        .attr('text-anchor', 'middle')
        .attr('font-family', 'JetBrains Mono')
        .attr('font-size', 8)
        .attr('fill', '#918977')
        .text(`${count} agents`);

      // Agent dots
      entityList.forEach((agent, j) => {
        const dotAngle = (2 * Math.PI * j) / Math.max(entityList.length, 1);
        const dotR = Math.min(arcRadius - 8, 6 + j * 2);
        const dx = Math.cos(dotAngle) * dotR * 0.6;
        const dy = Math.sin(dotAngle) * dotR * 0.6;

        const dot = entityGroup.append('circle')
          .attr('cx', dx).attr('cy', dy)
          .attr('r', agent.status === 'Actif' ? 4 : 3)
          .attr('fill', LAYER_COLORS[agent.layer] || '#918977')
          .attr('fill-opacity', agent.status === 'Actif' ? 0.9 : 0.4)
          .style('cursor', 'pointer');

        if (searchHighlight && agent.name.toLowerCase().includes(searchHighlight.toLowerCase())) {
          dot.attr('stroke', '#B8963E').attr('stroke-width', 2).attr('r', 6);
        }

        dot.on('mouseenter', function () {
          d3.select(this).attr('r', 7);
          tooltip.style('display', null);
          tooltipText.text(`${agent.name} (${agent.layer})`);
          const bbox = (tooltipText.node() as SVGTextElement).getBBox();
          tooltipRect.attr('x', bbox.x - 6).attr('y', bbox.y - 3).attr('width', bbox.width + 12).attr('height', bbox.height + 6);
          tooltip.attr('transform', `translate(${ex + dx},${ey + dy - 16})`);
        });
        dot.on('mouseleave', function () {
          d3.select(this).attr('r', agent.status === 'Actif' ? 4 : 3);
          tooltip.style('display', 'none');
        });
        dot.on('click', () => { if (onSelectAgent) onSelectAgent(agent.id); });
      });

      // Click on entity → zoom in
      entityGroup.on('click', function (event) {
        if (event.target !== entityGroup.node()) return;
        const transform = d3.zoomIdentity
          .translate(width / 2, height / 2)
          .scale(2)
          .translate(-ex, -ey);
        svg.call(zoomBehavior.transform, transform);
      });
    });

    // Tooltip
    const tooltip = g.append('g').attr('class', 'tooltip').style('display', 'none');
    const tooltipRect = tooltip.append('rect')
      .attr('rx', 4).attr('fill', '#1C1814').attr('fill-opacity', 0.9);
    const tooltipText = tooltip.append('text')
      .attr('fill', '#FDFAF3').attr('font-family', 'JetBrains Mono').attr('font-size', 9)
      .attr('text-anchor', 'middle');

  }, [agents, width, height, onSelectAgent, searchHighlight, layerFilters]);

  return <svg ref={svgRef} width={width} height={height} />;
}
