'use client';

interface Stage {
  label: string;
  value: number;
  color: string;
}

interface Props {
  stages: Stage[];
}

export function FunnelChart({ stages }: Props) {
  const maxValue = Math.max(...stages.map((s) => s.value), 1);

  return (
    <div className="space-y-2">
      {stages.map((stage, i) => {
        const widthPct = Math.max((stage.value / maxValue) * 100, 8);
        return (
          <div key={i} className="flex items-center gap-3">
            <span className="text-[9px] font-[family-name:var(--font-jetbrains)] text-t3 w-28 text-right shrink-0 truncate">
              {stage.label}
            </span>
            <div className="flex-1 relative">
              <div
                className="h-7 rounded flex items-center px-3 transition-all duration-500"
                style={{ width: `${widthPct}%`, background: stage.color }}
              >
                <span className="text-[10px] font-[family-name:var(--font-jetbrains)] text-ivory font-bold">
                  {stage.value}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
