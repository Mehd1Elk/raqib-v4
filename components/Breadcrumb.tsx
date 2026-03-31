'use client';

import { usePathname } from 'next/navigation';
import { ThemeToggle } from './ThemeToggle';

const LABELS: Record<string, string> = {
  eigen: 'EIGEN',
  dashboards: 'Dashboards',
  investor: 'Investisseur',
  supervisor: 'Superviseur',
  gitex: 'GITEX',
  london: 'London',
  stats: 'Stats',
  upload: 'Importer',
};

export function Breadcrumb() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center justify-between px-8 py-2 font-[family-name:var(--font-jetbrains)] text-[9px] text-t3 bg-ivory border-b border-div">
      <div>
        {pathname === '/' ? (
          <span className="text-gold">Raqib V4</span>
        ) : (
          <>
            <a href="/" className="hover:text-gold transition">Raqib V4</a>
            {pathname.split('/').filter(Boolean).map((part, i, arr) => {
              const href = '/' + arr.slice(0, i + 1).join('/');
              const isLast = i === arr.length - 1;
              const label = LABELS[part] || part.toUpperCase();
              return (
                <span key={href}>
                  <span className="mx-2">&rsaquo;</span>
                  {isLast ? (
                    <span className="text-gold">{label}</span>
                  ) : (
                    <a href={href} className="hover:text-gold transition">{label}</a>
                  )}
                </span>
              );
            })}
          </>
        )}
      </div>
      <ThemeToggle />
    </nav>
  );
}
