'use client';
import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface GraphNode extends d3.SimulationNodeDatum {
  id: string;
  group: number;
  radius: number;
}

interface GraphLink extends d3.SimulationLinkDatum<GraphNode> {
  source: string | GraphNode;
  target: string | GraphNode;
}

const NODES: GraphNode[] = [
  { id: 'Eigen Holding', group: 1, radius: 40 },
  { id: 'NOOS', group: 2, radius: 25 },
  { id: 'AELYA', group: 2, radius: 25 },
  { id: 'MYNε', group: 2, radius: 25 },
  { id: 'BURHAN', group: 2, radius: 25 },
  { id: 'YrKnown', group: 2, radius: 25 },
  { id: 'DIWANE', group: 2, radius: 25 },
  { id: 'CG SA', group: 3, radius: 35 },
  { id: 'Cercle du Gaz', group: 4, radius: 45 },
];

const LINKS: GraphLink[] = [
  ...['NOOS', 'AELYA', 'MYNε', 'BURHAN', 'YrKnown', 'DIWANE'].map(sub => ({ source: 'Eigen Holding', target: sub })),
  ...['NOOS', 'AELYA', 'MYNε', 'BURHAN', 'YrKnown', 'DIWANE'].map(sub => ({ source: sub, target: 'CG SA' })),
  { source: 'CG SA', target: 'Cercle du Gaz' },
];

export function EigenOrgChart() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;
    const width = 800;
    const height = 600;
    
    d3.select(svgRef.current).selectAll('*').remove();

    const svg = d3.select(svgRef.current)
      .attr('viewBox', `0 0 ${width} ${height}`)
      .attr('style', 'max-width: 100%; height: 100%; background-color: #F7F3EA;');
      
    // Defs for arrow markers
    svg.append("defs").append("marker")
        .attr("id", "arrowhead")
        .attr("viewBox", "-0 -5 10 10")
        .attr("refX", 32)
        .attr("refY", 0)
        .attr("orient", "auto")
        .attr("markerWidth", 6)
        .attr("markerHeight", 6)
        .attr("xoverflow", "visible")
        .append("svg:path")
        .attr("d", "M 0,-5 L 10 ,0 L 0,5")
        .attr("fill", "#918977");

    // Copy data to avoid mutating static arrays
    const nodes = NODES.map(d => ({...d}));
    const links = LINKS.map(d => ({...d}));

    const simulation = d3.forceSimulation<GraphNode>(nodes)
      .force('link', d3.forceLink<GraphNode, GraphLink>(links).id(d => d.id).distance(120))
      .force('charge', d3.forceManyBody().strength(-1500))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collide', d3.forceCollide<GraphNode>().radius(d => d.radius + 15));

    const link = svg.append('g')
      .attr('stroke', '#918977')
      .attr('stroke-opacity', 0.6)
      .selectAll('line')
      .data(links)
      .join('line')
      .attr('stroke-width', 2)
      .attr('marker-end', 'url(#arrowhead)');

    const dragstarted = (event: d3.D3DragEvent<any, any, any>, d: GraphNode) => {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    };
    
    const dragged = (event: d3.D3DragEvent<any, any, any>, d: GraphNode) => {
      d.fx = event.x;
      d.fy = event.y;
    };
    
    const dragended = (event: d3.D3DragEvent<any, any, any>, d: GraphNode) => {
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

    node.append('circle')
      .attr('r', d => d.radius)
      .attr('fill', d => {
         if (d.group === 1) return '#2d2d2d'; // Holding
         if (d.group === 4) return '#294c77'; // Cercle
         if (d.group === 3) return '#b83b3b'; // CG SA
         return '#B87D3E'; // Subsidiaries
      })
      .attr('stroke', '#F7F3EA')
      .attr('stroke-width', 3);

    node.append('text')
      .text(d => d.id)
      .attr('x', 0)
      .attr('y', d => d.radius + 18)
      .attr('text-anchor', 'middle')
      .attr('fill', '#2d2d2d')
      .attr('font-size', '12px')
      .attr('font-family', 'var(--font-jetbrains)')
      .attr('font-weight', 'bold');

    simulation.on('tick', () => {
      link
        .attr('x1', d => (d.source as GraphNode).x!)
        .attr('y1', d => (d.source as GraphNode).y!)
        .attr('x2', d => (d.target as GraphNode).x!)
        .attr('y2', d => (d.target as GraphNode).y!);

      // Update refs to border length
      link.each(function(d: any) {
        const sourceNode = d.source as GraphNode;
        const targetNode = d.target as GraphNode;
        const dx = targetNode.x! - sourceNode.x!;
        const dy = targetNode.y! - sourceNode.y!;
        const r = targetNode.radius;
        const len = Math.sqrt(dx * dx + dy * dy);
        
        // Push arrow outside of target bounds dynamically based on target node radius
        if (len > 0) {
            d3.select(this)
               .attr('x2', targetNode.x! - dx * (r + 8) / len)
               .attr('y2', targetNode.y! - dy * (r + 8) / len);
        }
      });

      node.attr('transform', d => `translate(${d.x},${d.y})`);
    });

    return () => {
      simulation.stop();
    };
  }, []);

  return (
    <div className="w-full h-[500px] border border-div rounded overflow-hidden">
      <svg ref={svgRef} className="w-full h-full"></svg>
    </div>
  );
}
