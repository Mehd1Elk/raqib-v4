'use client';

import { useEffect, useState, useCallback, type ReactNode } from 'react';
import { Maximize2, Minimize2, ChevronLeft, ChevronRight } from 'lucide-react';

interface Props {
  sections: { id: string; label: string }[];
  children: ReactNode;
}

export function PresentationMode({ sections, children }: Props) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeSection, setActiveSection] = useState(0);

  const goNext = useCallback(() => {
    setActiveSection((p) => Math.min(p + 1, sections.length - 1));
  }, [sections.length]);

  const goPrev = useCallback(() => {
    setActiveSection((p) => Math.max(p - 1, 0));
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        goNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        goPrev();
      } else if (e.key === 'F11') {
        e.preventDefault();
        toggleFullscreen();
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [goNext, goPrev]);

  useEffect(() => {
    function onChange() {
      setIsFullscreen(!!document.fullscreenElement);
    }
    document.addEventListener('fullscreenchange', onChange);
    return () => document.removeEventListener('fullscreenchange', onChange);
  }, []);

  useEffect(() => {
    const el = document.getElementById(sections[activeSection]?.id);
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [activeSection, sections]);

  function toggleFullscreen() {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
    }
  }

  return (
    <>
      {children}

      {/* Floating controls */}
      <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2">
        <div className="flex items-center bg-noir/90 text-ivory rounded-none-none shadow-lg px-1 py-1 gap-1">
          <button
            onClick={goPrev}
            disabled={activeSection === 0}
            className="p-1.5 hover:bg-walnut/50 rounded-none-none disabled:opacity-30 transition-colors"
            aria-label="Section précédente"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          <span className="text-[8px] font-[family-name:var(--font-jetbrains)] px-2 text-gold min-w-[80px] text-center">
            {activeSection + 1} / {sections.length}
          </span>
          <button
            onClick={goNext}
            disabled={activeSection === sections.length - 1}
            className="p-1.5 hover:bg-walnut/50 rounded-none-none disabled:opacity-30 transition-colors"
            aria-label="Section suivante"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
        <button
          onClick={toggleFullscreen}
          className="p-2 bg-noir/90 text-ivory rounded-none-none shadow-lg hover:bg-walnut transition-colors"
          aria-label={isFullscreen ? 'Quitter plein écran' : 'Plein écran'}
        >
          {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
        </button>
      </div>
    </>
  );
}
