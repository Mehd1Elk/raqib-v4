'use client';

import { useChartEntries } from './hooks';
import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, ZAxis, Tooltip, CartesianGrid, Cell } from 'recharts';
import { ChartTooltip } from './ChartTooltip';

const PAYS_COLORS: Record<string, string> = {
  'France': '#294c77',
  'USA': '#b83b3b',
  'UK': '#4a7c59',
  'Maroc': '#b87d3e',
  'Global': '#918977',
};
const FALLBACK_COLOR = '#b87d3e';

export function MarketBubbleChart({ layerId }: { layerId: string }) {
  const { entries, loading } = useChartEntries(layerId);

  const data = entries.map((e, index) => {
    const d = e.data as any;
    // Extract numeric value for valorisation (e.g. "1.5M" -> 1500000, or just standard numbers)
    let valMatch = String(d.valorisation || d.derniere_levee_USD || '1000000').match(/[\d.]+/);
    let valAmount = valMatch ? parseFloat(valMatch[0]) : 1;
    if (String(d.valorisation || '').toLowerCase().includes('m')) valAmount *= 1000000;
    else if (String(d.valorisation || '').toLowerCase().includes('b')) valAmount *= 1000000000;
    
    // Y Axis: levee or another metric. Let's make Y = valorisation as well, X = year founded
    let year = parseInt(d.fondee) || 2020 - index;
    
    return {
      x: year,
      y: valAmount,
      z: valAmount,
      pays: d.pays || 'Global',
      name: d.entreprise || 'Entreprise',
      originalData: d
    };
  });

  if (loading) return <div className="h-[300px] flex items-center justify-center text-sm font-[family-name:var(--font-jetbrains)] text-[#918977]">Chargement...</div>;

  return (
    <div className="w-full h-[350px]">
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart margin={{ top: 20, right: 30, bottom: 20, left: 30 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#918977" opacity={0.2} />
          <XAxis 
            type="number" 
            dataKey="x" 
            name="Année" 
            domain={['dataMin - 1', 'dataMax + 1']} 
            tick={{ fontSize: 10, fill: '#918977', fontFamily: 'var(--font-jetbrains)' }}
            tickFormatter={(val) => Math.floor(val).toString()}
          />
          <YAxis 
            type="number" 
            dataKey="y" 
            name="Valorisation" 
            tick={{ fontSize: 10, fill: '#918977', fontFamily: 'var(--font-jetbrains)' }} 
            tickFormatter={(val) => val > 1000000 ? `${(val/1000000).toFixed(0)}M` : val}
          />
          <ZAxis type="number" dataKey="z" range={[50, 800]} name="Taille (Val)" />
          <Tooltip content={<ChartTooltip />} cursor={{ strokeDasharray: '3 3', stroke: '#918977' }} />
          <Scatter name="Marché" data={data}>
            {data.map((entry, index) => {
              const fill = PAYS_COLORS[entry.pays] || FALLBACK_COLOR;
              return <Cell key={`cell-${index}`} fill={fill} fillOpacity={0.7} stroke={fill} strokeWidth={2} />;
            })}
          </Scatter>
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
}
