'use client';

import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { C } from '@/lib/constants';
import { FIREWALL_NODES, FIREWALL_LINKS } from './network-data';

const NODE_STYLES: Record<string, { fill: string; r: number; shape: 'circle' | 'rect' }> = {
  firewall: { fill: C.ruby, r: 20, shape: 'rect' },
  entite: { fill: C.cgGreen, r: 18, shape: 'circle' },
  flux: { fill: C.sapphire, r: 14, shape: 'circle' },
};

export function FirewallDiagram() {
  const svgRef = useRef<SVGSVGElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const width = 750;
    const height = 480;
    svg.attr('viewBox', `0 0 ${width} ${height}`);

    // Arrow marker
    svg
      .append('defs')
      .append('marker')
      .attr('id', 'arrow-fw')
      .attr('viewBox', '0 0 10 10')
      .attr('refX', 28)
      .attr('refY', 5)
      .attr('markerWidth', 6)
      .attr('markerHeight', 6)
      .attr('orient', 'auto')
      .append('path')
      .attr('d', 'M0,0 L10,5 L0,10 Z')
      .attr('fill', C.gold);

    const nodes = FIREWALL_NODES.map((n) => ({ ...n }));
    const links = FIREWALL_LINKS.map((l) => ({ ...l }));

    const simulation = d3
      .forceSimulation(nodes as any)
      .force(
        'link',
        d3
          .forceLink(links as any)
          .id((d: any) => d.id)
          .distance(110),
      )
      .force('charge', d3.forceManyBody().strength(-350))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(40));

    const g = svg.append('g');

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
      .attr('stroke-opacity', 0.5)
      .attr('stroke-width', 1.5)
      .attr('marker-end', 'url(#arrow-fw)');

    // Link labels
    const linkLabel = g
      .selectAll('.link-label')
      .data(links)
      .join('text')
      .attr('fill', C.t3)
      .attr('text-anchor', 'middle')
      .style('font-family', 'var(--font-jetbrains)')
      .style('font-size', '7px')
      .text((d) => d.label);

    // Nodes
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

    node.each(function (d: any) {
      const el = d3.select(this);
      const style = NODE_STYLES[d.type] ?? NODE_STYLES.flux!;

      if (style.shape === 'rect') {
        el.append('rect')
          .attr('x', -24)
          .attr('y', -14)
          .attr('width', 48)
          .attr('height', 28)
          .attr('rx', 4)
          .attr('fill', style.fill)
          .attr('stroke', C.gold)
          .attr('stroke-width', 1.5)
          .attr('fill-opacity', 0.9);
      } else {
        el.append('circle')
          .attr('r', style.r)
          .attr('fill', style.fill)
          .attr('stroke', C.gold)
          .attr('stroke-width', 1.5)
          .attr('fill-opacity', 0.85);
      }
    });

    // Labels
    node
      .append('text')
      .attr('dy', (d: any) => {
        const style = NODE_STYLES[d.type] ?? NODE_STYLES.flux!;
        return style.shape === 'rect' ? -20 : -(style.r + 8);
      })
      .attr('text-anchor', 'middle')
      .attr('fill', C.t1)
      .style('font-family', 'var(--font-jetbrains)')
      .style('font-size', '8px')
      .style('font-weight', '700')
      .text((d: any) => d.label);

    // Hover
    node
      .on('mouseover', (event, d: any) => {
        if (!d.mecanisme) return;
        const tooltip = tooltipRef.current;
        if (!tooltip) return;
        tooltip.style.display = 'block';
        tooltip.style.left = `${event.offsetX + 12}px`;
        tooltip.style.top = `${event.offsetY - 10}px`;
        tooltip.innerHTML = `
          <div style="font-weight:700">${d.label}</div>
          <div>${d.mecanisme}</div>
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
        FIREWALLS GOUVERNANCE
      </div>
      <svg ref={svgRef} className="w-full" style={{ maxHeight: 480 }} />
      <div
        ref={tooltipRef}
        className="absolute pointer-events-none bg-noir text-ivory px-3 py-2 rounded text-[9px] font-[family-name:var(--font-jetbrains)] leading-relaxed"
        style={{ display: 'none', zIndex: 10 }}
      />
      <div className="mt-3 flex gap-4 text-[8px] font-[family-name:var(--font-jetbrains)] text-t3">
        <span className="flex items-center gap-1">
          <span className="inline-block w-3 h-2 rounded-sm" style={{ background: C.ruby }} /> Firewall
        </span>
        <span className="flex items-center gap-1">
          <span className="inline-block w-2.5 h-2.5 rounded-full" style={{ background: C.cgGreen }} /> Entite
        </span>
        <span className="flex items-center gap-1">
          <span className="inline-block w-2 h-2 rounded-full" style={{ background: C.sapphire }} /> Flux
        </span>
      </div>
    </div>
  );
}
