'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function CollapsibleSection({
  title,
  children,
  defaultOpen = true,
  count,
  badge,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  count?: number;
  badge?: string;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border border-[rgba(30,10,32,0.08)] rounded-none-none overflow-hidden mb-4">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 bg-[#FAF8FC] hover:bg-[rgba(184,150,62,0.04)] transition"
      >
        <div className="flex items-center gap-2">
          <ChevronDown
            size={14}
            strokeWidth={1.5}
            className={`text-[rgba(30,10,32,0.60)] transition-transform duration-200 ${open ? '' : '-rotate-90'}`}
          />
          <span className="font-[family-name:var(--font-cormorant)] text-[13px] font-bold italic text-[#1E0A20]">{title}</span>
          {count !== undefined && (
            <span className="font-[family-name:var(--font-jetbrains)] text-[8px] text-[rgba(30,10,32,0.60)]">({count})</span>
          )}
          {badge && (
            <span className="font-[family-name:var(--font-jetbrains)] text-[7px] px-1.5 py-0.5 bg-[#1E0A2015] text-[#1E0A20] rounded-none">{badge}</span>
          )}
        </div>
      </button>
      <div
        className={`transition-all duration-200 overflow-hidden ${open ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className="p-4 border-t border-[rgba(30,10,32,0.08)]">
          {children}
        </div>
      </div>
    </div>
  );
}
