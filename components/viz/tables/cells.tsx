'use client';

import { formatCurrencyUsd, formatDate, formatNumber, getNotationTone } from './utils';

function Pill({
  children,
  color,
}: {
  children: React.ReactNode;
  color: string;
}) {
  return (
    <span
      className="inline-flex min-w-11 items-center justify-center rounded-full border px-2.5 py-1 text-[10px] font-semibold font-[family-name:var(--font-jetbrains)]"
      style={{ borderColor: `${color}33`, color, background: `${color}12` }}
    >
      {children}
    </span>
  );
}

export function ConfidencePill({ value }: { value: number | null }) {
  if (value === null) return <span className="text-tm">—</span>;

  return <Pill color={getNotationTone(value)}>{formatNumber(value)}</Pill>;
}

export function NotationPill({ value }: { value: number | null }) {
  if (value === null) return <span className="text-tm">—</span>;

  return <Pill color={getNotationTone(value)}>{formatNumber(value)}</Pill>;
}

export function ProgressBar({ value }: { value: number | null }) {
  if (value === null) return <span className="text-tm">—</span>;

  const tone = getNotationTone(value);

  return (
    <div className="flex items-center gap-2">
      <div className="h-2.5 w-full overflow-hidden rounded-full bg-noir/8">
        <div
          className="h-full rounded-full transition-[width]"
          style={{ width: `${value}%`, background: tone }}
        />
      </div>
      <span className="shrink-0 text-[10px] text-t3 font-[family-name:var(--font-jetbrains)]">
        {formatNumber(value)}%
      </span>
    </div>
  );
}

export function CurrencyCell({ value }: { value: unknown }) {
  return (
    <span className="font-[family-name:var(--font-jetbrains)] text-t1">
      {formatCurrencyUsd(value)}
    </span>
  );
}

export function NumberCell({ value }: { value: unknown }) {
  return (
    <span className="font-[family-name:var(--font-jetbrains)] text-t1">
      {formatNumber(value)}
    </span>
  );
}

export function DateCell({ value }: { value: unknown }) {
  return (
    <span className="font-[family-name:var(--font-jetbrains)] text-t3">
      {formatDate(value)}
    </span>
  );
}

export function BooleanCell({ value }: { value: boolean | null | undefined }) {
  if (!value) {
    return <span className="text-tm">—</span>;
  }

  return <span className="font-semibold text-emerald">Oui</span>;
}

export function SourceLink({ href }: { href: string | null }) {
  if (!href) {
    return <span className="text-tm">—</span>;
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      className="inline-block max-w-[260px] truncate text-sapphire transition-colors hover:text-gold"
    >
      {href}
    </a>
  );
}
