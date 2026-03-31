'use client';

import { usePathname } from 'next/navigation';

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
  if (pathname === '/') return null;

  const parts = pathname.split('/').filter(Boolean);

  return (
    <nav className="px-8 py-2 font-[family-name:var(--font-jetbrains)] text-[9px] text-t3 bg-ivory border-b border-div">
      <a href="/" className="hover:text-gold transition">Raqib V4</a>
      {parts.map((part, i) => {
        const href = '/' + parts.slice(0, i + 1).join('/');
        const isLast = i === parts.length - 1;
        const label = LABELS[part] || part.toUpperCase();
        return (
          <span key={href}>
            <span className="mx-2">›</span>
            {isLast ? (
              <span className="text-gold">{label}</span>
            ) : (
              <a href={href} className="hover:text-gold transition">{label}</a>
            )}
          </span>
        );
      })}
    </nav>
  );
}
