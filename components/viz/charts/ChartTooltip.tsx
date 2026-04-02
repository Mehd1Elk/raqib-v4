export function ChartTooltip({ active, payload }: any) {
  if (active && payload && payload.length) {
    const data = payload[0].payload.originalData || payload[0].payload;
    if (!data) return null;

    return (
      <div className="bg-[#F7F3EA] border border-[#918977] p-3 text-[10px] font-[family-name:var(--font-jetbrains)] text-gray-800 shadow-xl max-w-xs rounded-none break-words">
        {Object.entries(data).map(([key, value]) => {
          if (key === 'originalData' || typeof value === 'object') return null;
          return (
            <div key={key} className="mb-1 leading-tight flex justify-between gap-4 border-b border-[#918977] border-opacity-20 last:border-0 pb-1 last:pb-0">
              <span className="font-bold text-[#b87d3e] uppercase">{key}</span>
              <span className="text-right text-[#2d2d2d]">{String(value)}</span>
            </div>
          );
        })}
      </div>
    );
  }
  return null;
}
