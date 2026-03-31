import { PLATFORMS } from '@/lib/constants';
import type { PlatformCode } from '@/lib/types';

export function PlatformBadge({ platform }: { platform: PlatformCode }) {
  const p = PLATFORMS[platform];
  if (!p) return null;

  return (
    <div
      className="inline-flex items-center gap-1.5 px-3 py-1 rounded"
      style={{
        background: `${p.color}0A`,
        border: `1px solid ${p.color}25`,
      }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full shrink-0"
        style={{ background: p.color }}
      />
      <span
        className="text-[10px] font-[family-name:var(--font-jetbrains)] font-semibold"
        style={{ color: p.color }}
      >
        {p.name}
      </span>
    </div>
  );
}
