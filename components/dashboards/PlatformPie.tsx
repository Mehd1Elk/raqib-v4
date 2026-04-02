'use client';

import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { PLATFORMS } from '@/lib/constants';

interface Datum {
  platform_code: string;
  count: number;
}

interface Props {
  data: Datum[];
}

function CustomTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="bg-noir/95 text-ivory px-3 py-2 rounded-none shadow-lg text-[10px] font-[family-name:var(--font-jetbrains)]">
      <div className="font-bold">{d.name}</div>
      <div className="text-gold">{d.count} entries</div>
    </div>
  );
}

export function PlatformPie({ data }: Props) {
  const chartData = data.map((d) => ({
    ...d,
    name: PLATFORMS[d.platform_code as keyof typeof PLATFORMS]?.name ?? d.platform_code,
    color: PLATFORMS[d.platform_code as keyof typeof PLATFORMS]?.color ?? '#918977',
  }));

  if (!chartData.length) {
    return (
      <div className="h-[200px] flex items-center justify-center text-[10px] text-tm font-[family-name:var(--font-jetbrains)]">
        Aucune donnee de plateforme
      </div>
    );
  }

  return (
    <div className="w-full h-[240px] flex items-center">
      <div className="flex-1 h-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={chartData} dataKey="count" nameKey="name" cx="50%" cy="50%" outerRadius={80} innerRadius={40} strokeWidth={1} stroke="#F0EBDE">
              {chartData.map((entry, i) => (
                <Cell key={i} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="w-36 space-y-1.5">
        {chartData.map((d) => (
          <div key={d.platform_code} className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-none-none shrink-0" style={{ background: d.color }} />
            <span className="text-[8px] font-[family-name:var(--font-jetbrains)] text-t2 truncate">{d.name}</span>
            <span className="text-[8px] font-[family-name:var(--font-jetbrains)] text-tm ml-auto">{d.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
