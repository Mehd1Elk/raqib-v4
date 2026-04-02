import Link from 'next/link';

interface Props {
  title: string;
  subtitle?: string;
  entityColor?: string;
  children?: React.ReactNode;
}

export function DashboardHeader({ title, subtitle, entityColor, children }: Props) {
  return (
    <div className="h-[52px] flex items-center justify-between px-6 border-b border-div bg-ivory sticky top-0 z-40">
      <div className="flex items-center gap-3.5">
        {entityColor && <div className="w-1.5 h-1.5 rounded-none-none" style={{ background: entityColor }} />}
        {!entityColor && <div className="w-1.5 h-1.5 rounded-none-none bg-gold" />}
        <Link
          href="/"
          className="font-[family-name:var(--font-playfair)] text-[22px] font-bold  text-noir tracking-[3px] no-underline hover:text-gold transition-colors"
        >
          Raqib
        </Link>
        <span className="font-[family-name:var(--font-playfair)] text-[15px] text-sand">رقيب</span>
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
      <div className="flex items-center gap-3">
        {children}
        <Link
          href="/acquisition"
          className="text-[8px] font-[family-name:var(--font-jetbrains)] text-gold hover:bg-gold hover:text-white no-underline border border-gold rounded-none px-2 py-0.5 transition-colors"
        >
          ACQUISITION
        </Link>
        <Link
          href="/dashboards/investor"
          className="text-[8px] font-[family-name:var(--font-jetbrains)] text-gold hover:bg-gold hover:text-white no-underline border border-gold rounded-none px-2 py-0.5 transition-colors"
        >
          INVESTOR
        </Link>
        <Link
          href="/dashboards/supervisor"
          className="text-[8px] font-[family-name:var(--font-jetbrains)] text-tm hover:text-gold no-underline border border-div rounded-none px-2 py-0.5 transition-colors"
        >
          SUPERVISOR
        </Link>
        <Link
          href="/dashboards/gitex"
          className="text-[8px] font-[family-name:var(--font-jetbrains)] text-tm hover:text-gold no-underline border border-div rounded-none px-2 py-0.5 transition-colors"
        >
          GITEX
        </Link>
        <Link
          href="/dashboards/london"
          className="text-[8px] font-[family-name:var(--font-jetbrains)] text-tm hover:text-gold no-underline border border-div rounded-none px-2 py-0.5 transition-colors"
        >
          LONDON
        </Link>
        <Link
          href="/"
          className="text-[8px] font-[family-name:var(--font-jetbrains)] text-tm hover:text-gold no-underline border border-div rounded-none px-2 py-0.5 transition-colors"
        >
          PRINCIPAL
        </Link>
      </div>
    </div>
  );
}
