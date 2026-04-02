'use client';

import { ResponsiveContainer, PieChart, Pie, Tooltip, Cell, Legend } from 'recharts';
import { ChartTooltip } from './ChartTooltip';

const data = [
  { name: 'Perplexity', value: 518, code: 'PP', color: '#B87D3E', originalData: { Plateforme: 'Perplexity', Couches: 518 } },
  { name: 'Claude Opus', value: 269, code: 'CW', color: '#1E0A20', originalData: { Plateforme: 'Claude Opus', Couches: 269 } },
  { name: 'Cursor / Qwen', value: 206, code: 'CC', color: 'rgba(30,10,32,0.60)', originalData: { Plateforme: 'Cursor', Couches: 206 } },
  { name: 'AutoGPT', value: 7, code: 'AG', color: '#2d2d2d', originalData: { Plateforme: 'AutoGPT', Couches: 7 } },
];

export function PlatformsPieChart() {
  return (
    <div className="w-full h-[350px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={2}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} stroke="#F5F2F8" strokeWidth={2} />
            ))}
          </Pie>
          <Tooltip content={<ChartTooltip />} />
          <Legend 
            verticalAlign="bottom" 
            height={36} 
            iconType="circle"
            wrapperStyle={{ fontSize: 10, fontFamily: 'var(--font-jetbrains)', color: '#2d2d2d' }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
