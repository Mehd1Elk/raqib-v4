import Link from 'next/link';

interface Props {
  title: string;
  subtitle?: string;
  entityColor?: string;
}

export function DashboardHeader({ title, subtitle, entityColor }: Props) {
  return (
    <div className="h-[52px] flex items-center justify-between px-6 border-b border-div bg-ivory sticky top-0 z-40">
      <div className="flex items-center gap-3.5">
        {entityColor && <div className="w-1.5 h-1.5 rounded-full" style={{ background: entityColor }} />}
        {!entityColor && <div className="w-1.5 h-1.5 rounded-full bg-gold" />}
        <Link
          href="/"
          className="font-[family-name:var(--font-cormorant)] text-[22px] font-bold italic text-noir tracking-[3px] no-underline hover:text-gold transition-colors"
        >
          Raqib
        </Link>
        <span className="font-[family-name:var(--font-cormorant)] text-[15px] text-sand">رقيب</span>
        <div className="w-px h-5 bg-div" />
        <span className="text-[9px] text-t3 font-[family-name:var(--font-jetbrains)] tracking-[2px] uppercase">
          {title}
        </span>
        {subtitle && (
          <>
            <div className="w-px h-5 bg-div" />
            <span className="text-[9px] font-[family-name:var(--font-jetbrains)] text-tm">
              {subtitle}
            </span>
          </>
        )}
      </div>
      <div className="flex items-center gap-4">
        <Link
          href="/dashboards/supervisor"
          className="text-[8px] font-[family-name:var(--font-jetbrains)] text-tm hover:text-gold no-underline transition-colors"
        >
          SUPERVISEUR
        </Link>
        <Link
          href="/"
          className="text-[9px] font-[family-name:var(--font-jetbrains)] text-tm hover:text-gold no-underline transition-colors"
        >
          &larr; PRINCIPAL
        </Link>
      </div>
    </div>
  );
}
