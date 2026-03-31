'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export function useKeyboardShortcuts() {
  const router = useRouter();

  useEffect(() => {
    function handler(e: KeyboardEvent) {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      const cmd = e.metaKey || e.ctrlKey;

      if (cmd && e.key === 'k') { e.preventDefault(); document.querySelector<HTMLElement>('[data-search-trigger]')?.click(); }
      if (cmd && e.key === '1') { e.preventDefault(); router.push('/eigen?tab=overview'); }
      if (cmd && e.key === '2') { e.preventDefault(); router.push('/eigen?tab=agents'); }
      if (cmd && e.key === '3') { e.preventDefault(); router.push('/eigen?tab=gallery'); }
      if (cmd && e.key === '4') { e.preventDefault(); router.push('/eigen?tab=board'); }
      if (cmd && e.key === '5') { e.preventDefault(); router.push('/eigen?tab=conquest'); }
      if (cmd && e.key === '6') { e.preventDefault(); router.push('/eigen?tab=terminal'); }
      if (cmd && e.key === 'd') { e.preventDefault(); router.push('/dashboards/investor'); }
      if (cmd && e.key === 't') { e.preventDefault(); router.push('/eigen?tab=terminal'); }
      if (cmd && e.key === 'b') { e.preventDefault(); router.push('/eigen?tab=board'); }
      if (e.key === 'Escape') { document.querySelector<HTMLElement>('[data-close]')?.click(); }
    }
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [router]);
}
