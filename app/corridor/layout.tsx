'use client';

import '../globals.css';
import '../../components/corridor/corridor-theme.css';

export default function CorridorLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="corridor-dark-theme">
      {children}
    </div>
  );
}
