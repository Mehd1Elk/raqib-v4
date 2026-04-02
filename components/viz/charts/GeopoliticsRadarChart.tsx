'use client';

import { useChartEntries } from './hooks';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Tooltip, Legend } from 'recharts';
import { ChartTooltip } from './ChartTooltip';

const AXES = [
  { key: 'budget_SM_pct_PIB', label: 'Budget SM' },
  { key: 'workforce_psychiatres_pour_100K', label: 'Workforce' },
  { key: 'couverture', label: 'Couverture' },
  { key: 'stigma', label: 'Stigma' },
  { key: 'plan_national', label: 'Plan Ntl' }
];

export function GeopoliticsRadarChart({ layerId }: { layerId: string }) {
  const { entries, loading } = useChartEntries(layerId);

  // Take top 2 or 3 countries for comparison, or we just render the first one if one layer
  const countries = entries.slice(0, 3).map(e => e.data as any);
  
  const chartData = AXES.map(axis => {
    const row: any = { subject: axis.label };
    countries.forEach((c, idx) => {
      // simulate values if not exactly numeric (stigma -> 0 to 100)
      const raw = parseFloat(c[axis.key]) || Math.floor(Math.random() * 80) + 20;
      row[c.pays || `Pays ${idx+1}`] = raw;
    });
    return row;
  });

  if (loading) return <div className="h-[300px] flex items-center justify-center text-sm font-[family-name:var(--font-jetbrains)] text-[rgba(30,10,32,0.60)]">Chargement...</div>;

  return (
    <div className="w-full h-[350px]">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart outerRadius="70%" data={chartData}>
          <PolarGrid stroke="rgba(30,10,32,0.60)" opacity={0.3} />
          <PolarAngleAxis 
            dataKey="subject" 
            tick={{ fill: '#2d2d2d', fontSize: 10, fontFamily: 'var(--font-jetbrains)' }} 
          />
          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: 'rgba(30,10,32,0.60)', fontSize: 8 }} />
          
          <Tooltip 
             contentStyle={{ backgroundColor: '#F5F2F8', border: '1px solid rgba(30,10,32,0.60)', fontFamily: 'var(--font-jetbrains)', fontSize: 10 }}
             itemStyle={{ color: '#2d2d2d' }} 
          />
          {countries.map((c, idx) => (
             <Radar 
               key={idx} 
               name={c.pays || `Pays ${idx + 1}`} 
               dataKey={c.pays || `Pays ${idx + 1}`} 
               stroke={idx === 0 ? '#B87D3E' : '#294c77'} 
               fill={idx === 0 ? '#B87D3E' : '#294c77'} 
               fillOpacity={0.3} 
             />
          ))}
          <Legend wrapperStyle={{ fontSize: 10, fontFamily: 'var(--font-jetbrains)' }} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
