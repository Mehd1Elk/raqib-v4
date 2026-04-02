import React, { useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface Entry {
  id: string;
  data: any;
  [key: string]: any;
}

interface Props {
  data: Entry[];
}

export function PublicationTimeline({ data }: Props) {
  const chartData = useMemo(() => {
    if (!data || !data.length) return [];
    
    // Grouper par annee
    const byYear = data.reduce((acc, entry) => {
      const year = entry.data?.annee || 'Inconnue';
      if (!acc[year]) {
        acc[year] = { year, count: 0, publications: [] };
      }
      acc[year].count += 1;
      acc[year].publications.push(entry.data?.titre_publication || 'Doc');
      return acc;
    }, {} as Record<string, any>);

    return Object.values(byYear).sort((a: any, b: any) => {
      if (a.year === 'Inconnue') return -1;
      if (b.year === 'Inconnue') return 1;
      return parseInt(a.year) - parseInt(b.year);
    });
  }, [data]);

  if (!chartData.length) {
    return <div className="p-4 text-stone-500 text-xs font-[family-name:var(--font-jetbrains)] border border-stone-800 bg-[#111]">Aucune donnée de publication (n71).</div>;
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const rawData = payload[0].payload;
      return (
        <div className="bg-[#1A1A1A] border border-stone-700 p-3 rounded-none shadow-xl font-[family-name:var(--font-jetbrains)] text-xs text-stone-300 z-50">
          <p className="text-[#1E0A20] font-bold mb-2">Année {label}</p>
          <p className="mb-2">Total : {payload[0].value} publications</p>
          <ul className="space-y-1 list-disc list-inside opacity-80 line-clamp-3">
            {rawData.publications.slice(0, 3).map((pub: string, i: number) => (
              <li key={i} className="truncate max-w-[200px]" title={pub}>{pub}</li>
            ))}
            {rawData.publications.length > 3 && (
              <li className="text-stone-500 list-none">+ {rawData.publications.length - 3} autres</li>
            )}
          </ul>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full bg-[#111111] p-6 border border-stone-800">
      <div className="text-[10px] font-bold text-[#1E0A20] mb-6 tracking-widest uppercase font-[family-name:var(--font-jetbrains)]">
        Évolution des publications (SCID / Diag Numérique)
      </div>
      <div className="h-64 cursor-crosshair">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" vertical={false} />
            <XAxis 
              dataKey="year" 
              stroke="#5c5c5c" 
              tick={{ fill: '#888', fontSize: 10, fontFamily: 'var(--font-jetbrains)' }}
              tickLine={false}
              axisLine={{ stroke: '#2a2a2a' }}
            />
            <YAxis 
              stroke="#5c5c5c" 
              tick={{ fill: '#888', fontSize: 10, fontFamily: 'var(--font-jetbrains)' }}
              tickLine={false}
              axisLine={false}
              allowDecimals={false}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: '#2a2a2a', opacity: 0.4 }} />
            <Bar 
              dataKey="count" 
              fill="#1E0A20" 
              radius={[4, 4, 0, 0]}
              animationDuration={1500}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
