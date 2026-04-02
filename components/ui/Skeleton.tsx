export function Skeleton({ className = '', width, height, style }: { className?: string; width?: string | number; height?: string | number; style?: React.CSSProperties }) {
  return (
    <div
      className={`animate-pulse rounded-none bg-linen ${className}`}
      style={{ width, height, ...style }}
    />
  );
}

export function SkeletonCard() {
  return (
    <div className="bg-ivory border border-div rounded-none-none p-4">
      <Skeleton height={12} width="60%" className="mb-3" />
      <Skeleton height={8} width="40%" className="mb-2" />
      <Skeleton height={8} width="80%" className="mb-2" />
      <Skeleton height={32} className="mt-3" />
    </div>
  );
}

export function SkeletonTable({ rows = 5 }: { rows?: number }) {
  return (
    <div className="space-y-2">
      <Skeleton height={32} className="rounded-none" />
      {Array.from({ length: rows }).map((_, i) => (
        <Skeleton key={i} height={24} className="rounded-none" style={{ opacity: 1 - i * 0.15 }} />
      ))}
    </div>
  );
}

export function SkeletonChart({ height = 300 }: { height?: number }) {
  return (
    <div className="bg-ivory border border-div rounded-none-none p-4">
      <Skeleton height={12} width={120} className="mb-4" />
      <Skeleton height={height} className="rounded-none" />
    </div>
  );
}
