'use client';

import { useChartEntries } from './hooks';
import { ResponsiveContainer, Treemap, Tooltip } from 'recharts';
import { ChartTooltip } from './ChartTooltip';

const CustomizedContent = (props: any) => {
  const { root, depth, x, y, width, height, index, payload, name, AUM } = props;
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        style={{
          fill: depth < 2 ? '#b87d3e' : '#f7f3ea',
          stroke: '#918977',
          strokeWidth: 2,
          fillOpacity: 0.8 + (index % 10) * 0.02,
        }}
      />
      {width > 60 && height > 30 && (
        <text
          x={x + width / 2}
          y={y + height / 2 + 3}
          textAnchor="middle"
          fill={depth < 2 ? '#ffffff' : '#2d2d2d'}
          fontSize={10}
          fontFamily="let(--font-jetbrains, monospace)" // fallback
        >
          {name || 'Fonds'}
        </text>
      )}
    </g>
  );
}

export function InvestorsTreemapChart({ layerId }: { layerId: string }) {
  const { entries, loading } = useChartEntries(layerId);

  const dataMap = entries.map(e => {
    const d = e.data as any;
    let aumNum = parseFloat(String(d.AUM_USD || Math.random() * 50).replace(/[^\d.]/g, '')) || 10;
    
    return {
      name: d.nom_fonds || d.contact_partner || 'Investisseur',
      size: aumNum, // used by Treemap
      AUM: `${aumNum}M`,
      originalData: d
    };
  });

  const chartData = [{
    name: 'Investisseurs',
    children: dataMap
  }];

  if (loading) return <div className="h-[300px] flex items-center justify-center text-sm font-[family-name:var(--font-jetbrains)] text-[#918977]">Chargement...</div>;

  return (
    <div className="w-full h-[350px]">
      <ResponsiveContainer width="100%" height="100%">
        <Treemap
          data={chartData}
          dataKey="size"
          aspectRatio={4 / 3}
          stroke="#918977"
          fill="#B87D3E"
          content={<CustomizedContent />}
        >
          <Tooltip content={<ChartTooltip />} />
        </Treemap>
      </ResponsiveContainer>
    </div>
  );
}
