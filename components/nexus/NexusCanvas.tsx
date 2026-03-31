'use client';

import { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { useNexusStore } from './nexus-store';
import type { NexusEntity, NexusFlow } from './nexus-store';

/* ═══ DATA ═══ */
const ENTITIES = [
  { id: 'noos', name: 'NOOS', tagline: 'Psychiatrie de precision', color: '#B8963E', size: 80 },
  { id: 'aelya', name: 'AELYA', tagline: 'Consentement fiduciaire', color: '#7B5EA7', size: 60 },
  { id: 'myne', name: 'MYNe', tagline: 'Marketplace donnees', color: '#3D7C5E', size: 60 },
  { id: 'burhan', name: 'BURHAN', tagline: 'Audit trail blockchain', color: '#B87D3E', size: 60 },
  { id: 'yrknown', name: 'YrKnown', tagline: 'Savoir tacite', color: '#918977', size: 50 },
  { id: 'diwane', name: 'DIWANE', tagline: 'Art souverain', color: '#6E2A3D', size: 50 },
  { id: 'alguesov', name: 'AlgueSov', tagline: 'Tracabilite algues', color: '#3D7C8C', size: 45 },
  { id: 'amana', name: 'AMANA', tagline: 'Charitable trust', color: '#5E6E3D', size: 45 },
  { id: 'cg', name: 'CG SA', tagline: 'Investment club', color: '#162B20', size: 55 },
  { id: 'cercle', name: 'Cercle', tagline: 'Ecosysteme', color: '#C9A96E', size: 50 },
  { id: 'eigen', name: 'EIGEN', tagline: 'Holding strategique', color: '#D4B662', size: 90 },
];

export const FLOWS = [
  { source: 'noos', target: 'aelya', label: 'Consentement patient', volume: 85, type: 'consent' },
  { source: 'noos', target: 'burhan', label: 'Audit diagnostic', volume: 70, type: 'audit' },
  { source: 'noos', target: 'myne', label: 'Donnees anonymisees', volume: 50, type: 'data' },
  { source: 'noos', target: 'yrknown', label: 'Savoir praticien', volume: 30, type: 'knowledge' },
  { source: 'aelya', target: 'burhan', label: 'Preuve consentement', volume: 80, type: 'proof' },
  { source: 'aelya', target: 'myne', label: 'Verification consent', volume: 60, type: 'verify' },
  { source: 'myne', target: 'burhan', label: 'Preuve anonymisation', volume: 55, type: 'proof' },
  { source: 'diwane', target: 'burhan', label: 'Certificat authenticite', volume: 40, type: 'cert' },
  { source: 'alguesov', target: 'aelya', label: 'Consent pecheur', volume: 25, type: 'consent' },
  { source: 'alguesov', target: 'burhan', label: 'Audit lot', volume: 30, type: 'audit' },
  { source: 'alguesov', target: 'myne', label: 'Donnees algues', volume: 20, type: 'data' },
  { source: 'amana', target: 'burhan', label: 'Tracabilite don', volume: 35, type: 'audit' },
  { source: 'cg', target: 'eigen', label: 'Investissement', volume: 90, type: 'invest' },
  { source: 'cercle', target: 'eigen', label: 'Ecosysteme', volume: 75, type: 'eco' },
  { source: 'eigen', target: 'noos', label: 'Pilotage', volume: 95, type: 'command' },
  { source: 'eigen', target: 'aelya', label: 'Pilotage', volume: 80, type: 'command' },
  { source: 'eigen', target: 'myne', label: 'Pilotage', volume: 70, type: 'command' },
  { source: 'eigen', target: 'burhan', label: 'Pilotage', volume: 75, type: 'command' },
  { source: 'eigen', target: 'yrknown', label: 'Pilotage', volume: 60, type: 'command' },
];

export { ENTITIES };

/* ═══ TYPES ═══ */
interface SimNode extends d3.SimulationNodeDatum {
  id: string;
  name: string;
  tagline: string;
  color: string;
  size: number;
}

interface SimLink extends d3.SimulationLinkDatum<SimNode> {
  label: string;
  volume: number;
  type: string;
}

/* ═══ COMPONENT ═══ */
export default function NexusCanvas() {
  const svgRef = useRef<SVGSVGElement>(null);
  const { activeFlowTypes, selectEntity, selectFlow } = useNexusStore();
  const activeTypesRef = useRef(activeFlowTypes);
  activeTypesRef.current = activeFlowTypes;

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    if (!svgRef.current) return;

    const container = svgRef.current.parentElement!;
    const W = container.clientWidth;
    const H = container.clientHeight;

    svg.attr('width', W).attr('height', H);
    svg.selectAll('*').remove();

    /* ── defs ── */
    const defs = svg.append('defs');

    // Gradients for each flow
    FLOWS.forEach((f, i) => {
      const srcE = ENTITIES.find(e => e.id === f.source)!;
      const tgtE = ENTITIES.find(e => e.id === f.target)!;
      const grad = defs.append('linearGradient').attr('id', `flow-grad-${i}`).attr('gradientUnits', 'userSpaceOnUse');
      grad.append('stop').attr('offset', '0%').attr('stop-color', srcE.color);
      grad.append('stop').attr('offset', '100%').attr('stop-color', tgtE.color);
    });

    // Glow filter
    const glow = defs.append('filter').attr('id', 'nexus-glow').attr('x', '-50%').attr('y', '-50%').attr('width', '200%').attr('height', '200%');
    glow.append('feGaussianBlur').attr('in', 'SourceGraphic').attr('stdDeviation', '6').attr('result', 'blur');
    const merge = glow.append('feMerge');
    merge.append('feMergeNode').attr('in', 'blur');
    merge.append('feMergeNode').attr('in', 'SourceGraphic');

    /* ── starfield background ── */
    const starGroup = svg.append('g').attr('class', 'starfield');
    for (let i = 0; i < 120; i++) {
      starGroup.append('circle')
        .attr('cx', Math.random() * W)
        .attr('cy', Math.random() * H)
        .attr('r', Math.random() * 1.2 + 0.3)
        .attr('fill', '#918977')
        .attr('opacity', Math.random() * 0.12 + 0.03)
        .attr('class', 'nexus-star');
    }

    /* ── zoom ── */
    const world = svg.append('g').attr('class', 'nexus-world');
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.3, 5])
      .on('zoom', (e) => { world.attr('transform', e.transform.toString()); });
    svg.call(zoom);
    svg.call(zoom.transform, d3.zoomIdentity.translate(W / 2, H / 2).scale(0.85));

    /* ── simulation ── */
    const nodes: SimNode[] = ENTITIES.map(e => ({ ...e, x: (Math.random() - 0.5) * 300, y: (Math.random() - 0.5) * 300 }));
    const links: SimLink[] = FLOWS.map(f => ({
      source: f.source,
      target: f.target,
      label: f.label,
      volume: f.volume,
      type: f.type,
    }));

    const simulation = d3.forceSimulation<SimNode>(nodes)
      .force('link', d3.forceLink<SimNode, SimLink>(links).id(d => d.id).distance(180).strength(0.4))
      .force('charge', d3.forceManyBody().strength(-600))
      .force('center', d3.forceCenter(0, 0).strength(0.05))
      .force('collision', d3.forceCollide<SimNode>().radius(d => d.size + 20))
      .alphaDecay(0.015)
      .velocityDecay(0.3);

    /* ── links rendering ── */
    const linkGroup = world.append('g').attr('class', 'nexus-links');
    const linkPaths = linkGroup.selectAll<SVGPathElement, SimLink>('path')
      .data(links)
      .join('path')
      .attr('fill', 'none')
      .attr('stroke-width', d => 1 + (d.volume / 30))
      .attr('stroke-linecap', 'round')
      .attr('opacity', 0.35)
      .attr('class', 'nexus-flow-path')
      .each(function(d, i) {
        d3.select(this).attr('stroke', `url(#flow-grad-${i})`);
      });

    // Particle groups for each link
    const particleGroup = world.append('g').attr('class', 'nexus-particles');
    const particlesPerLink = links.map((link) => {
      const count = Math.max(1, Math.floor(link.volume / 30));
      const particles: d3.Selection<SVGCircleElement, number, SVGGElement, unknown>[] = [];
      const g = particleGroup.append('g');
      for (let i = 0; i < count; i++) {
        const p = g.append('circle')
          .attr('r', 1.5)
          .attr('fill', '#D4B662')
          .attr('opacity', 0.6)
          .attr('class', 'nexus-particle');
        particles.push(p as unknown as d3.Selection<SVGCircleElement, number, SVGGElement, unknown>);
      }
      return { g, particles, count };
    });

    /* ── node rendering ── */
    const nodeGroup = world.append('g').attr('class', 'nexus-nodes');
    const nodeGs = nodeGroup.selectAll<SVGGElement, SimNode>('g')
      .data(nodes)
      .join('g')
      .attr('class', 'nexus-node')
      .attr('cursor', 'pointer');

    // Halo
    nodeGs.append('circle')
      .attr('class', 'node-halo')
      .attr('r', d => d.size + 20)
      .attr('fill', d => d.color)
      .attr('opacity', 0.08)
      .attr('filter', 'url(#nexus-glow)');

    // Pulse ring
    nodeGs.append('circle')
      .attr('class', 'nexus-pulse-ring')
      .attr('r', d => d.size + 4)
      .attr('fill', 'none')
      .attr('stroke', d => d.color)
      .attr('stroke-width', 1.5)
      .attr('opacity', 0.15);

    // Main circle
    nodeGs.append('circle')
      .attr('class', 'node-core')
      .attr('r', d => d.size / 2)
      .attr('fill', '#1C1814')
      .attr('stroke', d => d.color)
      .attr('stroke-width', 2);

    // Inner fill
    nodeGs.append('circle')
      .attr('r', d => d.size / 2 - 3)
      .attr('fill', d => d.color)
      .attr('opacity', 0.12);

    // Name text
    nodeGs.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', -2)
      .attr('fill', '#FFFFFF')
      .attr('font-family', 'Cormorant Garamond, serif')
      .attr('font-weight', '700')
      .attr('font-style', 'italic')
      .attr('font-size', d => Math.max(10, d.size / 5))
      .text(d => d.name);

    // Tagline text
    nodeGs.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', 10)
      .attr('fill', d => d.color)
      .attr('opacity', 0.6)
      .attr('font-family', 'JetBrains Mono, monospace')
      .attr('font-size', 8)
      .text(d => d.tagline);

    /* ── tooltip (for flows) ── */
    const tooltip = svg.append('g').attr('class', 'nexus-tooltip').attr('opacity', 0);
    const tooltipBg = tooltip.append('rect').attr('rx', 4).attr('fill', '#252019').attr('stroke', 'rgba(212,182,98,0.2)').attr('stroke-width', 1);
    const tooltipText = tooltip.append('text').attr('fill', '#D4B662').attr('font-family', 'JetBrains Mono, monospace').attr('font-size', 9).attr('dy', 14).attr('dx', 8);

    /* ── interactions ── */
    nodeGs
      .on('mouseenter', function(_, d) {
        d3.select(this).select('.node-halo').attr('opacity', 0.25);
        d3.select(this).select('.node-core').attr('stroke-width', 3);
        // Dim unconnected
        const connected = new Set<string>();
        links.forEach(l => {
          const sId = typeof l.source === 'object' ? (l.source as SimNode).id : l.source;
          const tId = typeof l.target === 'object' ? (l.target as SimNode).id : l.target;
          if (sId === d.id || tId === d.id) { connected.add(sId); connected.add(tId); }
        });
        nodeGs.attr('opacity', n => connected.has(n.id) ? 1 : 0.2);
        linkPaths.attr('opacity', l => {
          const sId = typeof l.source === 'object' ? (l.source as SimNode).id : l.source;
          const tId = typeof l.target === 'object' ? (l.target as SimNode).id : l.target;
          return (sId === d.id || tId === d.id) ? 0.7 : 0.05;
        });
        selectEntity(d as unknown as NexusEntity);
      })
      .on('mouseleave', function() {
        d3.select(this).select('.node-halo').attr('opacity', 0.08);
        d3.select(this).select('.node-core').attr('stroke-width', 2);
        nodeGs.attr('opacity', 1);
        linkPaths.attr('opacity', 0.35);
      })
      .on('click', (_, d) => {
        selectEntity(d as unknown as NexusEntity);
      })
      .on('dblclick', (_, d) => {
        window.location.href = `/${d.id === 'eigen' ? 'eigen' : d.id}`;
      });

    // Flow hover
    linkPaths
      .on('mouseenter', function(event, d) {
        d3.select(this).attr('opacity', 0.8).attr('stroke-width', (d.volume / 20) + 2);
        tooltipText.text(`${d.label} (${d.volume}%)`);
        const bbox = (tooltipText.node() as SVGTextElement).getBBox();
        tooltipBg.attr('width', bbox.width + 16).attr('height', bbox.height + 10);
        tooltip.attr('transform', `translate(${event.offsetX + 10},${event.offsetY - 20})`).attr('opacity', 1);
        selectFlow(d as unknown as NexusFlow);
      })
      .on('mouseleave', function(_, d) {
        d3.select(this).attr('opacity', 0.35).attr('stroke-width', 1 + (d.volume / 30));
        tooltip.attr('opacity', 0);
      });

    // Drag
    const drag = d3.drag<SVGGElement, SimNode>()
      .on('start', (e, d) => { if (!e.active) simulation.alphaTarget(0.1).restart(); d.fx = d.x; d.fy = d.y; })
      .on('drag', (e, d) => { d.fx = e.x; d.fy = e.y; })
      .on('end', (e, d) => { if (!e.active) simulation.alphaTarget(0); d.fx = null; d.fy = null; });
    nodeGs.call(drag);

    /* ── animation frame for particles ── */
    let animFrame: number;
    let t = 0;

    function tick() {
      // Update link paths
      linkPaths.attr('d', d => {
        const s = d.source as SimNode;
        const tgt = d.target as SimNode;
        const dx = (tgt.x ?? 0) - (s.x ?? 0);
        const dy = (tgt.y ?? 0) - (s.y ?? 0);
        const cx = ((s.x ?? 0) + (tgt.x ?? 0)) / 2 + dy * 0.15;
        const cy = ((s.y ?? 0) + (tgt.y ?? 0)) / 2 - dx * 0.15;
        return `M${s.x},${s.y} Q${cx},${cy} ${tgt.x},${tgt.y}`;
      });

      // Update node positions
      nodeGs.attr('transform', d => `translate(${d.x},${d.y})`);

      // Animate particles along paths
      t += 0.004;
      links.forEach((link, idx) => {
        const s = link.source as SimNode;
        const tgt = link.target as SimNode;
        const { particles, count } = particlesPerLink[idx];
        const dx = (tgt.x ?? 0) - (s.x ?? 0);
        const dy = (tgt.y ?? 0) - (s.y ?? 0);
        const cx = ((s.x ?? 0) + (tgt.x ?? 0)) / 2 + dy * 0.15;
        const cy = ((s.y ?? 0) + (tgt.y ?? 0)) / 2 - dx * 0.15;

        const isActive = activeTypesRef.current.has(link.type);

        for (let i = 0; i < count; i++) {
          const progress = ((t * (0.5 + link.volume / 100) + i / count) % 1);
          const it = 1 - progress;
          const px = it * it * (s.x ?? 0) + 2 * it * progress * cx + progress * progress * (tgt.x ?? 0);
          const py = it * it * (s.y ?? 0) + 2 * it * progress * cy + progress * progress * (tgt.y ?? 0);
          particles[i].attr('cx', px).attr('cy', py).attr('opacity', isActive ? 0.6 : 0.05);
        }
      });

      // Hide inactive flows
      linkPaths.attr('display', d => activeTypes.has(d.type) ? null : 'none');

      // Pulse ring animation
      const pulse = Math.sin(t * 8) * 4;
      nodeGs.selectAll('.nexus-pulse-ring')
        .attr('r', (d: unknown) => (d as SimNode).size / 2 + 6 + pulse)
        .attr('opacity', 0.1 + Math.sin(t * 8) * 0.05);
    }

    function animate() {
      simulation.tick();
      tick();
      animFrame = requestAnimationFrame(animate);
    }
    animate();

    /* ── cleanup ── */
    return () => {
      cancelAnimationFrame(animFrame);
      simulation.stop();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTypes]);

  return (
    <div className="absolute inset-0">
      <svg ref={svgRef} className="w-full h-full" />
    </div>
  );
}
