'use client';

import { Eye } from 'lucide-react';
import type { FocusMode } from './FocusContext';

export function FocusBanner({ mode, onExit }: { mode: FocusMode; onExit: () => void }) {
  return (
    <div
      className="fixed top-0 left-0 right-0 z-[60] h-[32px] flex items-center justify-between px-6"
      style={{ backgroundColor: mode.color }}
    >
      <div className="flex items-center gap-3">
        <Eye size={12} className="text-white" />
        <span className="font-[family-name:var(--font-jetbrains)] text-[9px] text-white tracking-wider">
          FOCUS : {mode.label.toUpperCase()}
        </span>
        {mode.deadline && (
          <span className="font-[family-name:var(--font-jetbrains)] text-[8px] text-white/60">{mode.deadline}</span>
        )}
      </div>
      <button onClick={onExit} className="font-[family-name:var(--font-jetbrains)] text-[8px] text-white/80 hover:text-white transition">
        QUITTER LE FOCUS
      </button>
    </div>
  );
}
