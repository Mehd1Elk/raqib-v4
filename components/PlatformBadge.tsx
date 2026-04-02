import { PLATFORMS } from '@/lib/constants';
import type { PlatformCode } from '@/lib/types';

export function PlatformBadge({ platform }: { platform: PlatformCode }) {
  const p = PLATFORMS[platform];
  if (!p) return null;

  return (
    <div
      className="inline-flex items-center px-2.5 py-1 rounded-none"
      style={{
        background: p.color,
      }}
    >
      <span
        className="text-[9px] font-[family-name:var(--font-jetbrains)] text-white uppercase tracking-[1px]"
      >
        {p.name}
      </span>
    </div>
  );
}
