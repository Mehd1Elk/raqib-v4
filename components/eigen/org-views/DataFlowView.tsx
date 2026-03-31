'use client';

import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import type { Agent } from '@/lib/agents-data';

interface FlowNode {
  id: string;
  name: string;
  value: number;
  color: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

interface FlowLink {
  source: string;
  target: string;
  value: number;
  label: string;
  color: string;
}

interface DataFlowViewProps {
  agents: Agent[];
  width: number;
  height: number;
  onSelectAgent?: (id: string) => void;
  searchHighlight?: string;
  layerFilters?: Set<string>;
}

export default function DataFlowView({ agents, width, height }: DataFlowViewProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || !width || !height) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();
    const g = svg.append('g').attr('class', 'dataflow-container');

    // Zoom
    const zoomBehavior = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.2, 4])
      .on('zoom', (event) => g.attr('transform', event.transform));
    svg.call(zoomBehavior);
    svg.call(zoomBehavior.transform, d3.zoomIdentity.translate(width * 0.08, height * 0.1).scale(0.85));

    const l1Count = agents.filter(a => a.layer === 'L1').length;
    const l15Count = agents.filter(a => a.layer === 'L1.5').length;
    const l2Count = agents.filter(a => a.layer === 'L2').length;
    const l3Count = agents.filter(a => a.layer === 'L3').length;
    const l4Count = agents.filter(a => a.layer === 'L4').length;

    const layerW = width * 0.14;
    const padX = width * 0.05;
    const usableW = width * 0.85;
    const positions = [0, 1, 2, 3, 4].map(i => padX + (usableW / 4) * i);

    const maxHeight = height * 0.7;
    const nodeH = (count: number) => Math.max(40, (count / l1Count) * maxHeight);

    const nodes: FlowNode[] = [
      { id: 'l1', name: `L1 Production (${l1Count})`, value: l1Count, color: '#B8963E', x: positions[0], y: height * 0.15, w: layerW, h: nodeH(l1Count) },
      { id: 'l15', name: `L1.5 Verification (${l15Count})`, value: l15Count, color: '#9C3D3D', x: positions[1], y: height * 0.2, w: layerW, h: nodeH(l15Count) },
      { id: 'l2', name: `L2 Supervision (${l2Count})`, value: l2Count, color: '#3D5E8C', x: positions[2], y: height * 0.35, w: layerW, h: nodeH(l2Count) },
      { id: 'l3', name: `L3 Reporting (${l3Count})`, value: l3Count, color: '#3D7C5E', x: positions[3], y: height * 0.38, w: layerW, h: nodeH(l3Count) },
      { id: 'l4', name: `L4 Decision (${l4Count})`, value: l4Count, color: '#7B5EA7', x: positions[4], y: height * 0.4, w: layerW, h: nodeH(l4Count) },
    ];

    const links: FlowLink[] = [
      { source: 'l1', target: 'l15', value: 2000, label: '~2000 livrables/jour', color: '#B8963E' },
      { source: 'l15', target: 'l1', value: 200, label: '~200 rejets/jour', color: '#9C3D3D' },
      { source: 'l15', target: 'l2', value: 200, label: '~200 escalades/jour', color: '#9C3D3D' },
      { source: 'l2', target: 'l3', value: 50, label: '~50 validations critiques', color: '#3D5E8C' },
      { source: 'l3', target: 'l4', value: 5, label: '5 rapports de pole', color: '#3D7C5E' },
      { source: 'l4', target: 'l1', value: 10, label: 'Nouvelles directives', color: '#7B5EA7' },
    ];

    const nodeMap = new Map(nodes.map(n => [n.id, n]));

    // Draw flow links
    const maxLinkValue = Math.max(...links.map(l => l.value));
    const linkGroup = g.append('g').attr('class', 'links');

    links.forEach(link => {
      const src = nodeMap.get(link.source)!;
      const tgt = nodeMap.get(link.target)!;
      const thickness = Math.max(2, (link.value / maxLinkValue) * 30);

      const srcX = src.x + src.w;
      const srcY = src.y + src.h / 2;
      let tgtX = tgt.x;
      let tgtY = tgt.y + tgt.h / 2;

      // Reverse link (l15→l1, l4→l1): go below
      const isReverse = (link.source === 'l15' && link.target === 'l1') || (link.source === 'l4' && link.target === 'l1');
      if (isReverse) {
        tgtX = tgt.x + tgt.w / 2;
        tgtY = tgt.y + tgt.h + 10;
      }

      const midX = (srcX + tgtX) / 2;

      const path = linkGroup.append('path')
        .attr('d', isReverse
          ? `M ${srcX} ${srcY} C ${srcX + 60} ${srcY + 80}, ${tgtX - 60} ${tgtY + 40}, ${tgtX} ${tgtY}`
          : `M ${srcX} ${srcY} C ${midX} ${srcY}, ${midX} ${tgtY}, ${tgtX} ${tgtY}`
        )
        .attr('fill', 'none')
        .attr('stroke', link.color + '30')
        .attr('stroke-width', thickness)
        .attr('stroke-linecap', 'round');

      // Animated flow particles
      const pathNode = path.node()!;
      const totalLength = pathNode.getTotalLength();

      function animateParticle() {
        const particle = linkGroup.append('circle')
          .attr('r', Math.max(2, thickness / 4))
          .attr('fill', link.color)
          .attr('fill-opacity', 0.7);

        particle.transition()
          .duration(2000 + Math.random() * 1000)
          .ease(d3.easeLinear)
          .attrTween('transform', () => {
            return (t: number) => {
              const p = pathNode.getPointAtLength(t * totalLength);
              return `translate(${p.x},${p.y})`;
            };
          })
          .on('end', function () {
            d3.select(this).remove();
          });
      }

      // Start particles at intervals
      const interval = setInterval(animateParticle, 400 + (2000 / Math.max(1, link.value / 100)));
      // Save for cleanup
      (path.node() as any).__interval = interval;

      // Hover tooltip on link
      path
        .on('mouseenter', function () {
          d3.select(this).attr('stroke', link.color + '60');
          tooltip.style('display', null);
          tooltipText.text(link.label);
          const bbox = (tooltipText.node() as SVGTextElement).getBBox();
          tooltipRect.attr('x', bbox.x - 6).attr('y', bbox.y - 3).attr('width', bbox.width + 12).attr('height', bbox.height + 6);
        })
        .on('mousemove', function (event) {
          const [mx, my] = d3.pointer(event, g.node());
          tooltip.attr('transform', `translate(${mx},${my - 20})`);
        })
        .on('mouseleave', function () {
          d3.select(this).attr('stroke', link.color + '30');
          tooltip.style('display', 'none');
        })
        .style('cursor', 'default');
    });

    // Draw nodes
    const nodeGroup = g.append('g').attr('class', 'nodes');
    nodes.forEach(node => {
      const ng = nodeGroup.append('g').attr('transform', `translate(${node.x},${node.y})`);

      ng.append('rect')
        .attr('width', node.w).attr('height', node.h)
        .attr('rx', 8)
        .attr('fill', node.color + '15')
        .attr('stroke', node.color + '40')
        .attr('stroke-width', 1.5);

      // Color bar top
      ng.append('rect')
        .attr('width', node.w).attr('height', 3)
        .attr('rx', 1.5)
        .attr('fill', node.color);

      // Label
      ng.append('text')
        .attr('x', node.w / 2).attr('y', node.h / 2 - 4)
        .attr('text-anchor', 'middle')
        .attr('font-family', 'Cormorant Garamond')
        .attr('font-size', 12).attr('font-weight', 700).attr('font-style', 'italic')
        .attr('fill', '#1C1814')
        .text(node.name.split('(')[0].trim());

      // Count
      ng.append('text')
        .attr('x', node.w / 2).attr('y', node.h / 2 + 12)
        .attr('text-anchor', 'middle')
        .attr('font-family', 'JetBrains Mono')
        .attr('font-size', 9).attr('fill', '#918977')
        .text(`${node.value} agents`);
    });

    // Tooltip
    const tooltip = g.append('g').attr('class', 'tooltip').style('display', 'none');
    const tooltipRect = tooltip.append('rect')
      .attr('rx', 4).attr('fill', '#1C1814').attr('fill-opacity', 0.9);
    const tooltipText = tooltip.append('text')
      .attr('fill', '#FDFAF3').attr('font-family', 'JetBrains Mono').attr('font-size', 9)
      .attr('text-anchor', 'middle');

    return () => {
      // Cleanup particle intervals
      linkGroup.selectAll('path').each(function () {
        const interval = (this as any).__interval;
        if (interval) clearInterval(interval);
      });
    };
  }, [agents, width, height]);

  return <svg ref={svgRef} width={width} height={height} />;
}
