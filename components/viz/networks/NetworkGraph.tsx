'use client';

import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { C, ENTITIES } from '@/lib/constants';
import { KOL_NODES, KOL_LINKS } from './network-data';

const entityColorMap = Object.fromEntries(ENTITIES.map((e) => [e.id, e.color]));

export function NetworkGraph() {
  const svgRef = useRef<SVGSVGElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const width = 700;
    const height = 500;
    svg.attr('viewBox', `0 0 ${width} ${height}`);

    const nodes = KOL_NODES.map((n) => ({ ...n }));
    const links = KOL_LINKS.map((l) => ({ ...l }));

    const simulation = d3
      .forceSimulation(nodes as any)
      .force(
        'link',
        d3
          .forceLink(links as any)
          .id((d: any) => d.id)
          .distance(120),
      )
      .force('charge', d3.forceManyBody().strength(-300))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(35));

    const g = svg.append('g');

    // Zoom
    svg.call(
      d3.zoom<SVGSVGElement, unknown>().scaleExtent([0.3, 3]).on('zoom', (event) => {
        g.attr('transform', event.transform);
      }) as any,
    );

    // Links
    const link = g
      .selectAll('.link')
      .data(links)
      .join('line')
      .attr('class', 'link')
      .attr('stroke', C.gold)
      .attr('stroke-opacity', 0.4)
      .attr('stroke-width', 1.5);

    // Link labels
    const linkLabel = g
      .selectAll('.link-label')
      .data(links)
      .join('text')
      .attr('class', 'link-label')
      .attr('fill', C.t3)
      .attr('text-anchor', 'middle')
      .style('font-family', 'var(--font-jetbrains)')
      .style('font-size', '7px')
      .text((d) => d.canal);

    // Node groups
    const node = g
      .selectAll('.node')
      .data(nodes)
      .join('g')
      .attr('class', 'node')
      .style('cursor', 'grab')
      .call(
        d3
          .drag<SVGGElement, any>()
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
          }) as any,
      );

    // Circles — size proportional to influence_score
    node
      .append('circle')
      .attr('r', (d) => 8 + d.influence_score * 18)
      .attr('fill', (d) => entityColorMap[d.entite] ?? C.taupe)
      .attr('stroke', C.gold)
      .attr('stroke-width', 1.5)
      .attr('fill-opacity', 0.85);

    // Labels
    node
      .append('text')
      .attr('dy', (d) => -(12 + d.influence_score * 18))
      .attr('text-anchor', 'middle')
      .attr('fill', C.t1)
      .style('font-family', 'var(--font-jetbrains)')
      .style('font-size', '9px')
      .style('font-weight', '600')
      .text((d) => d.nom);

    // Hover tooltip
    node
      .on('mouseover', (event, d) => {
        const tooltip = tooltipRef.current;
        if (!tooltip) return;
        tooltip.style.display = 'block';
        tooltip.style.left = `${event.offsetX + 12}px`;
        tooltip.style.top = `${event.offsetY - 10}px`;
        tooltip.innerHTML = `
          <div style="font-weight:700">${d.nom}</div>
          <div>${d.titre} — ${d.institution}</div>
          <div>Influence : ${(d.influence_score * 100).toFixed(0)}%</div>
          <div>Entite : ${d.entite.toUpperCase()}</div>
        `;
      })
      .on('mouseout', () => {
        const tooltip = tooltipRef.current;
        if (tooltip) tooltip.style.display = 'none';
      });

    simulation.on('tick', () => {
      link
        .attr('x1', (d: any) => d.source.x)
        .attr('y1', (d: any) => d.source.y)
        .attr('x2', (d: any) => d.target.x)
        .attr('y2', (d: any) => d.target.y);

      linkLabel
        .attr('x', (d: any) => (d.source.x + d.target.x) / 2)
        .attr('y', (d: any) => (d.source.y + d.target.y) / 2);

      node.attr('transform', (d: any) => `translate(${d.x},${d.y})`);
    });

    return () => {
      simulation.stop();
    };
  }, []);

  return (
    <div className="bg-ivory border border-div rounded p-4 relative">
      <div
        className="text-[10px] font-[family-name:var(--font-jetbrains)] tracking-[1px] mb-3 font-bold"
        style={{ color: C.gold }}
      >
        RESEAU KOL & CONTACTS
      </div>
      <svg ref={svgRef} className="w-full" style={{ maxHeight: 500 }} />
      <div
        ref={tooltipRef}
        className="absolute pointer-events-none bg-noir text-ivory px-3 py-2 rounded text-[9px] font-[family-name:var(--font-jetbrains)] leading-relaxed"
        style={{ display: 'none', zIndex: 10 }}
      />
    </div>
  );
}
