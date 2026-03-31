'use client';

import { useEffect, useState } from 'react';
import { fetchEntityStats } from '@/lib/supabase/client-queries';
import { createClient } from '@/lib/supabase/client';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell, CartesianGrid } from 'recharts';
import { ChartTooltip } from './ChartTooltip';

const FALLBACK_COLOR = '#b87d3e';

export function EntitiesBarChart() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const stats = await fetchEntityStats();
        // Optionnel : récupérer les couleurs des entités
        const supabase = createClient();
        const { data: entities } = await supabase.from('entities').select('id, color');
        
        const merged = stats.map((s) => {
          const ent = entities?.find((e) => e.id === s.entity_id);
          return {
            ...s,
            name: s.entity_name,
            color: ent?.color || FALLBACK_COLOR,
            originalData: {
              Entité: s.entity_name,
              Type: s.entity_type,
              Completion: `${s.completion_pct}%`,
              'Couches remplies': `${s.populated_layers} / ${s.total_layers}`,
              'Total entries': s.total_entries,
            },
          };
        });
        
        // Trier par pourcentage de completion décroissant
        merged.sort((a, b) => b.completion_pct - a.completion_pct);
        setData(merged);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) return <div className="h-[300px] flex items-center justify-center text-sm font-[family-name:var(--font-jetbrains)] text-gray-500">Chargement...</div>;

  return (
    <div className="w-full h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ top: 20, right: 30, left: 80, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#918977" opacity={0.2} horizontal={false} />
          <XAxis type="number" stroke="#918977" domain={[0, 100]} tick={{ fontSize: 10, fill: '#918977', fontFamily: 'var(--font-jetbrains)' }} />
          <YAxis 
            type="category" 
            dataKey="name" 
            stroke="#918977" 
            tick={{ fontSize: 10, fill: '#2d2d2d', fontFamily: 'var(--font-jetbrains)' }} 
            axisLine={false} 
            tickLine={false}
          />
          <Tooltip content={<ChartTooltip />} cursor={{ fill: 'transparent' }} />
          <Bar dataKey="completion_pct" radius={[0, 4, 4, 0]} barSize={20}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
