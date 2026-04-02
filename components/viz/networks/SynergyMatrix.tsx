'use client';
import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const ENTITIES = [
  'NOOS', 'AELYA', 'MYNε', 'BURHAN', 'YrKnown', 
  'DIWANE', 'AlgueSov', 'AMANA', 'CG SA', 'Cercle'
];

export function SynergyMatrix() {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;
    
    // Create deterministic pseudo-random synergy data
    const data: { source: string; target: string; x: number; y: number; value: number }[] = [];
    ENTITIES.forEach((source, y) => {
      ENTITIES.forEach((target, x) => {
        let value = 0.1; // base
        if (x === y) value = 1;
        else {
          const seed = (x + 1) * (y + 1);
          value = (Math.sin(seed * 1.5) + 1) / 2; // Math.sin returns -1 to 1, shifted to 0 to 1
        }
        data.push({ source, target, x, y, value });
      });
    });

    const margin = { top: 90, right: 30, bottom: 20, left: 100 };
    const width = 600;
    const height = 600;
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    d3.select(svgRef.current).selectAll('*').remove();
    d3.select(containerRef.current).select('.tooltip').remove();

    const svg = d3.select(svgRef.current)
      .attr('viewBox', `0 0 ${width} ${height}`)
      .attr('style', 'max-width: 100%; height: auto; background-color: #F5F2F8;');

    const tooltip = d3.select(containerRef.current)
      .append('div')
      .attr('class', 'tooltip bg-[#F5F2F8] border border-[rgba(30,10,32,0.60)] p-2 text-[10px] text-[#2d2d2d] font-[family-name:var(--font-jetbrains)] absolute opacity-0 pointer-events-none rounded-none shadow-md z-10');

    const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

    const customColor = d3.scaleLinear<string>().domain([0, 1]).range(['#EADDBF', '#B87D3E']);

    const xPos = d3.scaleBand().domain(ENTITIES).range([0, innerWidth]).padding(0.05);
    const yPos = d3.scaleBand().domain(ENTITIES).range([0, innerHeight]).padding(0.05);

    g.selectAll('rect')
      .data(data)
      .join('rect')
      .attr('x', d => xPos(d.target)!)
      .attr('y', d => yPos(d.source)!)
      .attr('width', xPos.bandwidth())
      .attr('height', yPos.bandwidth())
      .attr('fill', d => xPos(d.target) === yPos(d.source) ? '#2d2d2d' : customColor(d.value))
      .attr('rx', 2)
      .on('mouseover', function(event, d) {
        d3.select(this).attr('stroke', '#2d2d2d').attr('stroke-width', 2);
        tooltip.transition().duration(200).style('opacity', .9);
        tooltip.html(`
          <strong>${d.source} ↔ ${d.target}</strong><br/>
          Force: ${d.value === 1 ? 'Identité' : Math.round(d.value * 100) + '%'}
        `)
        .style('left', (event.pageX + 10) + 'px')
        .style('top', (event.pageY - 28) + 'px');
      })
      .on('mouseout', function(event, d) {
        d3.select(this).attr('stroke', 'none');
        tooltip.transition().duration(500).style('opacity', 0);
      });

    // X Axis
    g.selectAll('.x-label')
      .data(ENTITIES)
      .join('text')
      .text(d => d)
      .attr('x', d => xPos(d)! + xPos.bandwidth() / 2)
      .attr('y', -10)
      .attr('text-anchor', 'start')
      .attr('transform', d => `rotate(-45, ${xPos(d)! + xPos.bandwidth() / 2}, -10)`)
      .attr('font-size', '11px')
      .attr('font-weight', '500')
      .attr('font-family', 'var(--font-jetbrains)')
      .attr('fill', 'rgba(30,10,32,0.60)');

    // Y Axis
    g.selectAll('.y-label')
      .data(ENTITIES)
      .join('text')
      .text(d => d)
      .attr('x', -10)
      .attr('y', d => yPos(d)! + yPos.bandwidth() / 2)
      .attr('text-anchor', 'end')
      .attr('dominant-baseline', 'middle')
      .attr('font-size', '11px')
      .attr('font-weight', '500')
      .attr('font-family', 'var(--font-jetbrains)')
      .attr('fill', 'rgba(30,10,32,0.60)');

  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-[600px] border border-div rounded-none overflow-hidden">
      <svg ref={svgRef} className="w-full h-full"></svg>
    </div>
  );
}
