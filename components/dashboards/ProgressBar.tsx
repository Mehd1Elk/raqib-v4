interface Props {
  pct: number;
  label?: string;
  color?: string;
  height?: string;
  showPct?: boolean;
}

export function ProgressBar({ pct, label, color, height = 'h-2', showPct = true }: Props) {
  const barColor =
    color ?? (pct >= 75 ? '#3D7C5E' : pct >= 25 ? '#B87D3E' : pct > 0 ? '#9C3D3D' : 'rgba(30,10,32,0.35)');

  return (
    <div className="flex items-center gap-3 w-full">
      {label && (
        <span className="text-[10px] font-[family-name:var(--font-jetbrains)] text-t2 w-28 truncate shrink-0">
          {label}
        </span>
      )}
      <div className={`flex-1 ${height} bg-parchment rounded-none-full overflow-hidden`}>
        <div
          className="h-full rounded-none-full transition-all duration-700"
          style={{ width: `${Math.min(pct, 100)}%`, background: barColor }}
        />
      </div>
      {showPct && (
        <span
          className="text-[9px] font-[family-name:var(--font-jetbrains)] font-bold w-10 text-right shrink-0"
          style={{ color: barColor }}
        >
          {pct.toFixed(0)}%
        </span>
      )}
    </div>
  );
}
