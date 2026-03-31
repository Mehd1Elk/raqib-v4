'use client';

import dynamic from 'next/dynamic';
import { EigenKPIBar } from './EigenKPIBar';
import { EigenLiveFeed } from './EigenLiveFeed';
import { AgentStatusGrid } from './AgentStatusGrid';

// Mocks for components imported from viz-dynamic
const EigenOrgChart = dynamic(() => Promise.resolve(() => (
  <div className="w-full h-full flex items-center justify-center bg-[#FDFAF3] border border-[#D4CCBA] text-[#918977] font-[family-name:var(--font-jetbrains)] text-xs">
    [EigenOrgChart Viz Component]
  </div>
)), { ssr: false });

const MilestoneTimeline = dynamic(() => Promise.resolve(() => (
  <div className="w-full h-full flex items-center justify-center bg-[#FDFAF3] border border-[#D4CCBA] text-[#918977] font-[family-name:var(--font-jetbrains)] text-xs min-h-[200px]">
    [MilestoneTimeline Viz Component]
  </div>
)), { ssr: false });

export function EigenOverview() {
  return (
    <div className="flex flex-col gap-5 p-6 h-full overflow-y-auto">
      {/* ZONE 1: 5 KPI cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 shrink-0">
        <EigenKPIBar
          label="Entries totales"
          value="16 384"
          icon="📊"
          trend="up"
          trendValue="+3470 (24h)"
          color="gold"
        />
        <EigenKPIBar
          label="Agents actifs"
          value="16/237"
          icon="🤖"
          trend="up"
          trendValue="+2"
          color="emerald"
        />
        <EigenKPIBar
          label="Score qualité"
          value="88/100"
          icon="✅"
          trend="up"
          trendValue="+1.2%"
          color="emerald"
        />
        <EigenKPIBar
          label="Prochaine deadline"
          value="GITEX"
          icon="📅"
          trend="neutral"
          trendValue="7 avril"
          color="gold"
        />
        <EigenKPIBar
          label="Anomalies"
          value="0"
          icon="⚠️"
          trend="down"
          trendValue="-2"
          color="emerald"
        />
      </div>

      {/* ZONE 2: 2 Colonnes — OrgChart + Live Feed & Agent Grid */}
      <div className="flex flex-col md:flex-row gap-5 shrink-0">
        {/* Left: OrgChart */}
        <div className="w-full md:w-[60%] h-[400px]">
          <EigenOrgChart />
        </div>

        {/* Right: Live Feed + Agent Status Grid */}
        <div className="w-full md:w-[40%] max-h-[600px] overflow-y-auto flex flex-col gap-4">
          <div className="h-[280px] shrink-0">
            <EigenLiveFeed mode="compact" limit={20} />
          </div>
          <AgentStatusGrid />
        </div>
      </div>

      {/* ZONE 3: Timeline pleine largeur */}
      <div className="flex-1 min-h-[200px]">
        <MilestoneTimeline />
      </div>
    </div>
  );
}
