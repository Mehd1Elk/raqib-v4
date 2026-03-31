'use client';

import { useEffect, useState } from 'react';
import { fetchAgentRuns } from '@/lib/supabase/client-queries';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { ChartTooltip } from './ChartTooltip';

export function TimelineLineChart() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const runs = await fetchAgentRuns(100);
        
        // Group by day 
        const grouped = runs.reduce((acc: any, run) => {
          if (!run.started_at) return acc;
          const d = new Date(run.started_at).toISOString().split('T')[0];
          if (!acc[d]) acc[d] = 0;
          acc[d] += (run.entries_created || 0);
          return acc;
        }, {});
        
        let chartData = Object.keys(grouped).sort().map(k => ({
          date: k,
          entries: grouped[k],
          originalData: { Date: k, 'Nouvelles entries': grouped[k] }
        }));
        
        // Add current day if empty to avoid broken visual
        if (chartData.length === 0) {
           const today = new Date().toISOString().split('T')[0];
           chartData = [{ date: today, entries: 0, originalData: { Date: today, 'Nouvelles entries': 0 } }];
        }

        setData(chartData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) return <div className="h-[300px] flex items-center justify-center text-sm font-[family-name:var(--font-jetbrains)] text-[#918977]">Chargement...</div>;

  return (
    <div className="w-full h-[350px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 20, right: 30, left: 10, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#918977" opacity={0.2} vertical={false} />
          <XAxis 
             dataKey="date" 
             stroke="#918977" 
             tick={{ fontSize: 10, fontFamily: 'var(--font-jetbrains)' }} 
             tickMargin={10}
             axisLine={{ strokeWidth: 1 }}
          />
          <YAxis 
             stroke="#918977" 
             tick={{ fontSize: 10, fontFamily: 'var(--font-jetbrains)' }} 
             axisLine={false}
             tickLine={false}
          />
          <Tooltip content={<ChartTooltip />} cursor={{ stroke: '#918977', strokeWidth: 1, strokeDasharray: '3 3' }} />
          <Line 
             type="monotone" 
             dataKey="entries" 
             stroke="#B87D3E" 
             strokeWidth={3} 
             dot={{ fill: '#F7F3EA', stroke: '#B87D3E', strokeWidth: 2, r: 4 }} 
             activeDot={{ r: 6, fill: '#D4AF37' }} 
             animationDuration={1500}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
