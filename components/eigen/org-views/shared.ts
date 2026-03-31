import type { Agent, AgentLayer } from '@/lib/agents-data';

export const LAYER_COLORS: Record<string, string> = {
  L4: '#7B5EA7',
  L3: '#3D7C5E',
  L2: '#3D5E8C',
  'L1.5': '#9C3D3D',
  L1: '#B8963E',
  OPS: '#918977',
};

export const LAYERS: AgentLayer[] = ['L1', 'L1.5', 'L2', 'L3', 'L4', 'OPS'];

export interface OrgViewProps {
  agents: Agent[];
  width: number;
  height: number;
  onSelectAgent?: (id: string) => void;
  searchHighlight?: string;
  layerFilters?: Set<string>;
}

export function setupZoom(
  svg: d3.Selection<SVGSVGElement, unknown, null, undefined>,
  g: d3.Selection<SVGGElement, unknown, null, undefined>,
  width: number,
  height: number,
  initialScale = 0.7,
) {
  const d3 = require('d3');
  const zoomBehavior = d3.zoom()
    .scaleExtent([0.2, 4])
    .on('zoom', (event: any) => {
      g.attr('transform', event.transform);
    });

  svg.call(zoomBehavior);
  const initialTransform = d3.zoomIdentity.translate(width / 2, height / 2).scale(initialScale);
  svg.call(zoomBehavior.transform, initialTransform);

  return zoomBehavior;
}
