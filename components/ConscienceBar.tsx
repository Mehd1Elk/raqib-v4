'use client';

import { useState, useCallback } from 'react';
import { Zap } from 'lucide-react';

export default function ConscienceBar() {
  const [value, setValue] = useState('');
  const [captured, setCaptured] = useState(false);

  const captureThought = useCallback((text: string) => {
    if (!text.trim()) return;
    // TODO: route to proper agent/layer via keyword detection
    console.log('[Conscience]', text);
    setCaptured(true);
    setValue('');
    setTimeout(() => setCaptured(false), 1500);
  }, []);

  return (
    <div className="fixed bottom-[22px] left-1/2 -translate-x-1/2 z-40 w-[600px] max-w-[calc(100vw-2rem)]">
      <div className="bg-[#252019]/95 backdrop-blur-md border border-[rgba(212,182,98,0.15)] rounded-full px-4 py-2 flex items-center gap-3 shadow-lg">
        <Zap
          size={14}
          className={`shrink-0 transition-colors ${captured ? 'text-[#3D7C5E]' : 'text-[#B8963E]'}`}
        />
        <input
          value={value}
          onChange={e => setValue(e.target.value)}
          placeholder="Une pensee, une idee, une decision..."
          className="flex-1 bg-transparent text-[#D4B662] font-[family-name:var(--font-noto)] text-[11px] outline-none placeholder:text-[#918977]"
          onKeyDown={e => {
            if (e.key === 'Enter') captureThought(value);
          }}
        />
        <span className="font-[family-name:var(--font-jetbrains)] text-[7px] text-[#918977] shrink-0">
          {captured ? 'capture' : '\u23CE'}
        </span>
      </div>
    </div>
  );
}
