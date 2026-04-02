'use client';
import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const NODES = [
  { id: 'NOOS', label: 'Psychiatrie', x: 100, y: 150 },
  { id: 'AELYA', label: 'Privacy', x: 300, y: 150 },
  { id: 'MYNε', label: 'Data Economy', x: 500, y: 150 },
  { id: 'BURHAN', label: 'Audit / Blox', x: 700, y: 150 }
];

const LINKS = [
  { source: 0, target: 1 },
  { source: 1, target: 2 },
  { source: 2, target: 3 }
];

export function DataFlowDiagram() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;
    const width = 800;
    const height = 300;

    d3.select(svgRef.current).selectAll('*').remove();

    const svg = d3.select(svgRef.current)
      .attr('viewBox', `0 0 ${width} ${height}`)
      .attr('style', 'max-width: 100%; height: 100%; background-color: #F7F3EA;');

    // Background static line
    svg.append('g')
      .selectAll('path')
      .data(LINKS)
      .join('path')
      .attr('d', d => {
        const s = NODES[d.source];
        const t = NODES[d.target];
        return `M ${s.x + 40} ${s.y} L ${t.x - 40} ${t.y}`;
      })
      .attr('fill', 'none')
      .attr('stroke', '#EADDBF')
      .attr('stroke-width', 4);

    // Glowing animating flow line over the background line
    const animatedLinks = svg.append('g')
      .selectAll('path')
      .data(LINKS)
      .join('path')
      .attr('d', d => {
        const s = NODES[d.source];
        const t = NODES[d.target];
        return `M ${s.x + 40} ${s.y} L ${t.x - 40} ${t.y}`;
      })
      .attr('fill', 'none')
      .attr('stroke', '#B87D3E')
      .attr('stroke-width', 4)
      .attr('stroke-dasharray', '8, 8')
      .attr('class', 'data-flow-anim');

    function animate() {
      // 24 offset travels 3 dash segments
      animatedLinks
        .attr('stroke-dashoffset', 24)
        .transition()
        .duration(800)
        .ease(d3.easeLinear)
        .attr('stroke-dashoffset', 0)
        .on('end', animate);
    }
    animate();

    // Node groups
    const nodeG = svg.append('g')
      .selectAll('g')
      .data(NODES)
      .join('g')
      .attr('transform', d => `translate(${d.x},${d.y})`);

    // Outer ring representing IO
    nodeG.append('circle')
      .attr('r', 45)
      .attr('fill', 'none')
      .attr('stroke', '#918977')
      .attr('stroke-width', 1)
      .attr('stroke-dasharray', '4, 4');

    // Main Node Body
    nodeG.append('circle')
      .attr('r', 35)
      .attr('fill', '#2d2d2d') // Inverted dark color for the tech components
      .attr('stroke', '#F7F3EA')
      .attr('stroke-width', 3);

    // Identifiers
    nodeG.append('text')
      .text(d => d.id)
      .attr('y', 0)
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'middle')
      .attr('font-size', '14px')
      .attr('font-family', 'var(--font-jetbrains)')
      .attr('font-weight', 'bold')
      .attr('fill', '#B87D3E');

    // Small labels below
    nodeG.append('text')
      .text(d => d.label)
      .attr('y', 60)
      .attr('text-anchor', 'middle')
      .attr('font-size', '11px')
      .attr('font-family', 'var(--font-jetbrains)')
      .attr('fill', '#918977');

  }, []);

  return (
    <div className="w-full h-[300px] border border-div rounded-none overflow-hidden">
      <svg ref={svgRef} className="w-full h-full"></svg>
    </div>
  );
}
