interface Props {
  label: string;
  value: string | number;
  sub?: string;
  color?: string;
}

export function StatCard({ label, value, sub, color }: Props) {
  return (
    <div className="bg-ivory border border-div rounded p-4">
      <div className="text-[8px] font-[family-name:var(--font-jetbrains)] text-tm tracking-[1px] mb-1 uppercase">
        {label}
      </div>
      <div
        className="text-lg font-[family-name:var(--font-cormorant)] font-bold italic"
        style={{ color: color ?? '#1C1814' }}
      >
        {value}
      </div>
      {sub && (
        <div className="text-[8px] font-[family-name:var(--font-jetbrains)] text-t3 mt-1">{sub}</div>
      )}
    </div>
  );
}
