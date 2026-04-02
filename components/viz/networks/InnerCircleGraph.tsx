'use client';
import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface GraphNode extends d3.SimulationNodeDatum {
  id: string;
  type: 'person' | 'org';
}

interface GraphLink extends d3.SimulationLinkDatum<GraphNode> {
  source: string | GraphNode;
  target: string | GraphNode;
}

const NODES: GraphNode[] = [
  ...['Kenza', 'Brahim', 'Thomas', 'Karim', 'Christian'].map(id => ({ id, type: 'person' as const })),
  ...['Holmarcom', 'BOA', 'Lazard', 'CGEM'].map(id => ({ id, type: 'org' as const }))
];

const LINKS: GraphLink[] = [
  { source: 'Kenza', target: 'Holmarcom' },
  { source: 'Brahim', target: 'BOA' },
  { source: 'Thomas', target: 'Lazard' },
  { source: 'Karim', target: 'CGEM' },
  { source: 'Christian', target: 'Lazard' },
  { source: 'Kenza', target: 'CGEM' },
  { source: 'Brahim', target: 'Holmarcom' },
  { source: 'Thomas', target: 'Kenza' }, // Network cohesion
  { source: 'Karim', target: 'Brahim' }
];

export function InnerCircleGraph() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;
    const width = 600;
    const height = 400;
    
    d3.select(svgRef.current).selectAll('*').remove();

    const svg = d3.select(svgRef.current)
      .attr('viewBox', `0 0 ${width} ${height}`)
      .attr('style', 'max-width: 100%; height: 100%; background-color: #F7F3EA;');

    const nodes = NODES.map(d => ({...d}));
    const links = LINKS.map(d => ({...d}));

    const simulation = d3.forceSimulation<GraphNode>(nodes)
      .force('link', d3.forceLink<GraphNode, GraphLink>(links).id(d => d.id).distance(100))
      .force('charge', d3.forceManyBody().strength(-800))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collide', d3.forceCollide().radius(40));

    const link = svg.append('g')
      .attr('stroke', '#EADDBF')
      .attr('stroke-opacity', 0.8)
      .selectAll('line')
      .data(links)
      .join('line')
      .attr('stroke-width', 2);

    const dragstarted = (event: any, d: GraphNode) => {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    };
    
    const dragged = (event: any, d: GraphNode) => {
      d.fx = event.x;
      d.fy = event.y;
    };
    
    const dragended = (event: any, d: GraphNode) => {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    };

    const node = svg.append('g')
      .selectAll('g')
      .data(nodes)
      .join('g')
      .call(d3.drag<any, GraphNode>()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended)
      );

    // Differentiate Orgs (Rects) from Persons (Circles)
    node.each(function(d) {
      const el = d3.select(this);
      if (d.type === 'org') {
        el.append('rect')
          .attr('width', 60)
          .attr('height', 40)
          .attr('x', -30)
          .attr('y', -20)
          .attr('rx', 4)
          .attr('fill', '#918977')
          .attr('stroke', '#F7F3EA')
          .attr('stroke-width', 2);
      } else {
        el.append('circle')
          .attr('r', 24)
          .attr('fill', '#B87D3E')
          .attr('stroke', '#F7F3EA')
          .attr('stroke-width', 2);
      }
    });

    node.append('text')
      .text(d => d.id)
      .attr('x', 0)
      .attr('y', d => d.type === 'org' ? 5 : 4) // Center alignment difference for shapes
      .attr('text-anchor', 'middle')
      .attr('fill', '#F7F3EA')
      .attr('font-size', '10px')
      .attr('font-family', 'var(--font-jetbrains)')
      .attr('font-weight', 'bold');

    simulation.on('tick', () => {
      link
        .attr('x1', d => (d.source as GraphNode).x!)
        .attr('y1', d => (d.source as GraphNode).y!)
        .attr('x2', d => (d.target as GraphNode).x!)
        .attr('y2', d => (d.target as GraphNode).y!);

      node.attr('transform', d => `translate(${d.x},${d.y})`);
    });

    return () => {
      simulation.stop();
    };
  }, []);

  return (
    <div className="w-full h-[400px] border border-div rounded-none overflow-hidden">
      <svg ref={svgRef} className="w-full h-full"></svg>
    </div>
  );
}
