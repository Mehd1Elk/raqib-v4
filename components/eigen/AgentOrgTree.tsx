'use client';

import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { Agent } from '../../lib/agents-data';

interface TreeNode {
  name: string;
  agent?: Agent;
  children?: TreeNode[];
  val?: number;
  platform?: string;
}

interface AgentOrgTreeProps {
  data: Agent[];
}

export const AgentOrgTree: React.FC<AgentOrgTreeProps> = ({ data }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!data || data.length === 0 || !containerRef.current) return;

    // Clear previous
    d3.select(containerRef.current).selectAll('*').remove();

    // Helper: filter layer
    const getLayer = (layer: string) => data.filter(d => d.layer === layer);

    // Build hierarchy
    const rootData: TreeNode = {
      name: 'EIGEN — 237 agents',
      val: 237,
      children: [
        {
          name: 'L4 Fondateur',
          children: getLayer('L4').map(a => ({ name: a.name, agent: a, platform: a.platform, val: 1, children: [
            // Just attach L3 to the first L4 (Mehdi) to keep tree connected, or attach L3 to 'L3 Reporting' artificial node
          ]})),
        },
        {
          name: 'OPS Raqib',
          children: getLayer('OPS').map(a => ({ name: a.name, agent: a, platform: a.platform, val: 1 }))
        }
      ]
    };

    // To make a proper hierarchy as requested:
    // Root -> L4 -> L3 -> L2 -> L1.5 -> L1
    // Root -> OPS
    // We can structure the nodes artificially to group layers, then attach agents as leaves.
    const l1Nodes = getLayer('L1').map(a => ({ name: a.name, agent: a, platform: a.platform, val: 1 }));
    const l15Nodes = getLayer('L1.5').map(a => ({ name: a.name, agent: a, platform: a.platform, val: 1, children: [] }));
    const l2Nodes = getLayer('L2').map(a => ({ name: a.name, agent: a, platform: a.platform, val: 1, children: [] }));
    const l3Nodes = getLayer('L3').map(a => ({ name: a.name, agent: a, platform: a.platform, val: 1, children: [] }));
    const l4Nodes = getLayer('L4').map(a => ({ name: a.name, agent: a, platform: a.platform, val: 1, children: [] }));

    // Distribute children evenly
    const distribute = (parents: TreeNode[], children: TreeNode[]) => {
      if (parents.length === 0) return;
      children.forEach((c, i) => {
        parents[i % parents.length].children!.push(c);
      });
    };

    distribute(l15Nodes, l1Nodes);
    distribute(l2Nodes, l15Nodes);
    distribute(l3Nodes, l2Nodes);
    // Attach L3 to the real founder L4
    const mehdi = l4Nodes.find(n => n.name.includes('Mehdi')) || l4Nodes[0];
    if (mehdi) distribute([mehdi], l3Nodes);

    rootData.children![0].children = l4Nodes; // Overwrite L4 node children with the actual L4 agents that now contain the rest of the tree

    const width = 1200;
    const height = 800;
    const margin = { top: 40, right: 120, bottom: 40, left: 120 };

    const svg = d3.select(containerRef.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', [0, 0, width, height])
      .style('max-width', '100%')
      .style('height', 'auto')
      .style('background', '#F7F3EA');

    const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

    const root = d3.hierarchy(rootData);
    const treeLayout = d3.tree<TreeNode>().size([height - margin.top - margin.bottom, width - margin.left - margin.right]);
    
    // We want a vertical layout according to prompt, so size: [width, height]
    const verticalTreeLayout = d3.tree<TreeNode>().size([width - margin.left - margin.right, height - margin.top - margin.bottom]);
    verticalTreeLayout(root);

    // Links
    g.selectAll('.link')
      .data(root.links())
      .join('path')
      .attr('class', 'link')
      .attr('fill', 'none')
      .attr('stroke', '#E5E0D8')
      .attr('stroke-width', 1.5)
      .attr('d', d3.linkVertical<any, any>()
        .x(d => d.x)
        .y(d => d.y)
      );

    const platformColor = (platform?: string) => {
      switch (platform) {
        case 'Claude': return '#7C3AED'; // violet
        case 'GPT': return '#22C55E'; // green
        case 'Gemini': return '#3B82F6'; // blue
        case 'Mistral': return '#F97316'; // orange
        case 'Qwen': return '#EF4444'; // red
        case 'DeepSeek': return '#4F46E5'; // indigo
        default: return '#D4AF37'; // gold
      }
    };

    // Tooltip
    const tooltip = d3.select('body').append('div')
      .attr('class', 'absolute bg-white text-stone-900 border border-stone-200 px-3 py-2 rounded text-xs shadow-lg pointer-events-none opacity-0 z-50 font-mono transition-opacity');

    // Nodes
    const node = g.selectAll('.node')
      .data(root.descendants())
      .join('g')
      .attr('class', 'node cursor-pointer')
      .attr('transform', d => `translate(${d.x},${d.y})`)
      // @ts-ignore
      .on('mouseover', (event, d) => {
        d3.select(event.currentTarget).select('circle').attr('r', 8);
        const agent = d.data.agent;
        tooltip.transition().duration(200).style('opacity', .9);
        tooltip.html(`
          <div class="font-bold text-[#D4AF37] mb-1 font-['Cormorant_Garamond'] text-sm">${d.data.name}</div>
          ${agent ? `
            <div>Layer: ${agent.layer}</div>
            <div>Pôle: ${agent.pole}</div>
            <div>Modèle: ${agent.model}</div>
            <div>Statut: ${agent.status}</div>
          ` : `<div>Groupe/Branche</div>`}
        `)
          .style('left', (event.pageX + 15) + 'px')
          .style('top', (event.pageY - 28) + 'px');
      })
      // @ts-ignore
      .on('mouseout', (event) => {
        d3.select(event.currentTarget).select('circle').attr('r', 5);
        tooltip.transition().duration(500).style('opacity', 0);
      });

    node.append('circle')
      .attr('r', 5)
      .attr('fill', d => platformColor(d.data.platform))
      .attr('stroke', '#fff')
      .attr('stroke-width', 1.5)
      .style('filter', 'drop-shadow(0px 1px 2px rgba(0,0,0,0.1))');

    // Only add labels for top layers to prevent clutter
    node.append('text')
      .attr('dy', '0.31em')
      .attr('x', d => d.children ? -8 : 8)
      .attr('text-anchor', d => d.children ? 'end' : 'start')
      .text(d => (d.depth < 3 || d.data.name === 'OPS Raqib') ? d.data.name : '')
      .clone(true).lower()
      .attr('stroke', '#F7F3EA')
      .attr('stroke-width', 3)
      .attr('class', 'font-sans text-[9px] text-stone-600 tracking-wider font-semibold');

    return () => {
      d3.select('body').selectAll('.absolute.bg-white').remove(); // cleanup tooltips
    };
  }, [data]);

  return (
    <div className="w-full bg-[#F7F3EA] rounded-md shadow-inner border border-stone-200 overflow-hidden relative">
      <div className="absolute top-4 left-6 z-10 font-['Cormorant_Garamond'] font-bold text-stone-800 text-lg">
        ORGANIGRAMME: 237 AGENTS
      </div>
      <div className="absolute top-4 right-6 z-10 flex space-x-3 text-[9px] font-mono border bg-white/80 backdrop-blur p-2 rounded">
        <div className="flex items-center space-x-1"><span className="w-2 h-2 rounded-full bg-[#7C3AED]"></span><span>Claude</span></div>
        <div className="flex items-center space-x-1"><span className="w-2 h-2 rounded-full bg-[#22C55E]"></span><span>GPT</span></div>
        <div className="flex items-center space-x-1"><span className="w-2 h-2 rounded-full bg-[#3B82F6]"></span><span>Gemini</span></div>
        <div className="flex items-center space-x-1"><span className="w-2 h-2 rounded-full bg-[#F97316]"></span><span>Mistral</span></div>
        <div className="flex items-center space-x-1"><span className="w-2 h-2 rounded-full bg-[#EF4444]"></span><span>Qwen</span></div>
        <div className="flex items-center space-x-1"><span className="w-2 h-2 rounded-full bg-[#4F46E5]"></span><span>DeepSeek</span></div>
      </div>
      <div ref={containerRef} className="w-full h-full overflow-auto cursor-grab active:cursor-grabbing" />
    </div>
  );
};
