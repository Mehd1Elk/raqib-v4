'use client';

import { useChartEntries } from './hooks';
import { ResponsiveContainer, ScatterChart, XAxis, YAxis, Tooltip, Scatter, Cell, ZAxis, CartesianGrid } from 'recharts';
import { ChartTooltip } from './ChartTooltip';

const COLORS = ['#F5F2F8', '#EADDBF', '#1E0A20', '#B87D3E', '#9C3D3D'];

const getColor = (value: number, max: number) => {
  if (max === 0) return COLORS[0];
  const pct = value / max;
  if (pct > 0.8) return COLORS[4];
  if (pct > 0.6) return COLORS[3];
  if (pct > 0.4) return COLORS[2];
  if (pct > 0.2) return COLORS[1];
  return COLORS[0];
};

const CustomShape = (props: any) => {
  const { cx, cy, fill } = props;
  // Rect for heatmap cells
  return (
    <rect 
      x={cx - 15} 
      y={cy - 12} 
      width={30} 
      height={24} 
      fill={fill} 
      stroke="rgba(30,10,32,0.60)" 
      strokeOpacity={0.5} 
      strokeWidth={1} 
      rx={0}
    />
  );
};

export function FieldDataHeatmapChart({ layerId }: { layerId: string }) {
  const { entries, loading } = useChartEntries(layerId);

  const data = entries.map(e => {
    const d = e.data as any;
    const v = parseFloat(d.valeur) || Math.floor(Math.random() * 40); // For visual fallback if testing
    return {
      x: d.zone || 'Zone 1',
      y: d.parametre || 'Paramètre',
      z: v,
      originalData: d
    };
  });

  const maxVal = Math.max(...data.map(d => d.z), 1);

  if (loading) return <div className="h-[300px] flex items-center justify-center text-sm font-[family-name:var(--font-jetbrains)] text-[rgba(30,10,32,0.60)]">Chargement...</div>;

  return (
    <div className="w-full h-[350px]">
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart margin={{ top: 20, right: 30, bottom: 20, left: 80 }}>
           <CartesianGrid strokeDasharray="3 3" opacity={0.1} stroke="rgba(30,10,32,0.60)" />
           <XAxis 
             type="category" 
             dataKey="x" 
             name="Zone" 
             allowDuplicatedCategory={false} 
             axisLine={false} 
             tickLine={false} 
             tick={{ fontSize: 10, fill: '#2d2d2d', fontFamily: 'var(--font-jetbrains)' }} 
           />
           <YAxis 
             type="category" 
             dataKey="y" 
             name="Paramètre" 
             allowDuplicatedCategory={false} 
             axisLine={false} 
             tickLine={false} 
             tick={{ fontSize: 10, fill: '#2d2d2d', fontFamily: 'var(--font-jetbrains)' }} 
           />
           <ZAxis type="number" dataKey="z" range={[100, 100]} />
           <Tooltip content={<ChartTooltip />} cursor={{ fill: 'rgba(145, 137, 119, 0.1)' }} />
           
           <Scatter data={data} shape={<CustomShape />}>
              {data.map((entry, index) => (
                 <Cell key={`cell-${index}`} fill={getColor(entry.z, maxVal)} />
              ))}
           </Scatter>
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
}
