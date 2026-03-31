'use client';

import { useState, useEffect } from 'react';
import { useFocus } from './FocusContext';
import { FocusSelector } from './FocusSelector';
import { FocusBanner } from './FocusBanner';

export function FocusManager() {
  const { mode, activate, deactivate } = useFocus();
  const [showSelector, setShowSelector] = useState(false);

  useEffect(() => {
    function handler(e: KeyboardEvent) {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      const cmd = e.metaKey || e.ctrlKey;
      if (cmd && e.key === 'f') {
        e.preventDefault();
        setShowSelector(prev => !prev);
      }
    }
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <>
      {mode && <FocusBanner mode={mode} onExit={deactivate} />}
      {showSelector && (
        <FocusSelector
          onSelect={(m) => { activate(m); setShowSelector(false); }}
          onClose={() => setShowSelector(false)}
        />
      )}
    </>
  );
}
