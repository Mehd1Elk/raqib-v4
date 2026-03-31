'use client';

import { PresentationMode } from '@/components/dashboards/PresentationMode';
import { SectionPanel } from '@/components/dashboards/SectionPanel';
import { FunnelChart } from '@/components/dashboards/FunnelChart';
import { NetworkGraph } from '@/components/dashboards/NetworkGraph';

interface Props {
  dealFlowStages: { label: string; value: number; color: string }[];
  networkNodes: { id: string; label: string; group?: string; size?: number }[];
  networkEdges: { from: string; to: string }[];
}

const SECTIONS = [
  { id: 's-noos', label: 'NOOS' },
  { id: 's-dealflow', label: 'Deal flow' },
  { id: 's-network', label: 'Inner circle' },
  { id: 's-corridors', label: 'Corridors' },
  { id: 's-fundraising', label: 'Fundraising' },
];

export function InvestorClient({ dealFlowStages, networkNodes, networkEdges }: Props) {
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SectionPanel id="s-dealflow" title="DEAL FLOW FUNNEL · CG SA">
          <FunnelChart stages={dealFlowStages} />
        </SectionPanel>

        <SectionPanel id="s-network" title="INNER CIRCLE · RESEAU">
          <NetworkGraph
            nodes={networkNodes}
            edges={networkEdges}
            centerLabel="EIGEN"
          />
        </SectionPanel>
      </div>

      <PresentationMode sections={SECTIONS}>{null}</PresentationMode>
    </>
  );
}
