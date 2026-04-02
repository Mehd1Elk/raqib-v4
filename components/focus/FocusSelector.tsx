'use client';

import { useEffect, useRef } from 'react';
import { FOCUS_MODES, type FocusMode } from './FocusContext';

export function FocusSelector({ onSelect, onClose }: { onSelect: (mode: FocusMode) => void; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  useEffect(() => {
    ref.current?.focus();
  }, []);

  return (
    <div className="fixed inset-0 z-[70] bg-black/40 flex items-center justify-center" onClick={onClose}>
      <div
        ref={ref}
        tabIndex={-1}
        onClick={e => e.stopPropagation()}
        className="bg-[#FDFAF3] rounded-none-none w-[400px] p-6 shadow-xl"
      >
        <h2 className="font-[family-name:var(--font-playfair)] text-[18px] font-bold  mb-4 text-[#1C1814]">Mode Focus</h2>
        <div className="space-y-2">
          {FOCUS_MODES.map(mode => (
            <button
              key={mode.id}
              onClick={() => onSelect(mode)}
              className="w-full text-left p-3 rounded-none-none border border-[rgba(60,52,40,0.10)] hover:border-[#B8963E] transition flex items-center gap-3"
            >
              <div className="w-3 h-3 rounded-none-none shrink-0" style={{ backgroundColor: mode.color }} />
              <div className="flex-1 min-w-0">
                <div className="font-[family-name:var(--font-playfair)] text-[13px] font-bold  text-[#1C1814]">{mode.label}</div>
                <div className="font-[family-name:var(--font-jetbrains)] text-[8px] text-[#918977]">{mode.description}</div>
              </div>
              {mode.deadline && (
                <span className="font-[family-name:var(--font-jetbrains)] text-[8px] text-[#9C3D3D] shrink-0">{mode.deadline}</span>
              )}
            </button>
          ))}
        </div>
        <button onClick={onClose} className="mt-4 w-full py-2 text-center font-[family-name:var(--font-jetbrains)] text-[9px] text-[#918977] hover:text-[#1C1814] transition" data-close>
          Annuler
        </button>
      </div>
    </div>
  );
}
