'use client';

import '../globals.css';
import '../../components/diwane/diwane-theme.css';

export default function DiwaneLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="diwane-dark-theme">
      {children}
    </div>
  );
}
