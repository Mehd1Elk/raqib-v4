'use client';

import { createContext, useContext, useState, useCallback, useEffect } from 'react';

export interface FocusMode {
  id: string;
  label: string;
  description: string;
  color: string;
  entities: string[];
  layers: string[];
  deadline?: string;
}

export const FOCUS_MODES: FocusMode[] = [
  { id: 'gitex', label: 'GITEX Africa', description: 'J-7 — 38 cibles \u00e0 profiler', color: '#162B20', entities: ['noos','cg','eigen'], layers: ['cg01','cg04','cg61','n41','b31'], deadline: '7 avril 2026' },
  { id: 'london', label: 'ATS London', description: 'Pipeline investisseurs EU', color: '#3D5E8C', entities: ['cg','eigen','noos'], layers: ['cg51','cg41','n41','ei41','ei42'], deadline: 'mai 2026' },
  { id: 'recrutement', label: 'Recrutement P0', description: '4 postes critiques', color: '#7B5EA7', entities: ['eigen'], layers: ['ei76','ei77'] },
  { id: 'noos-mvp', label: 'NOOS MVP', description: 'Kappa \u2265 0.75, 37 items', color: '#1E0A20', entities: ['noos','aelya','burhan'], layers: ['n01','n11','n21','n31','n41','n51','n61','n71'] },
  { id: 'holmarcom', label: 'Pipeline Holmarcom', description: 'AMANA \u2192 4 verticales', color: '#5E6E3D', entities: ['amana','burhan','eigen'], layers: ['am21','am31'] },
  { id: 'fundraising', label: 'Fundraising', description: 'Seed \u20ac15-45M', color: '#1E0A20', entities: ['eigen','cg'], layers: ['ei41','ei42','ei48','ei61','ei64'] },
];

interface FocusContextValue {
  mode: FocusMode | null;
  activate: (mode: FocusMode) => void;
  deactivate: () => void;
  isInFocus: (entity: string, layerId?: string) => boolean;
}

const FocusCtx = createContext<FocusContextValue>({
  mode: null,
  activate: () => {},
  deactivate: () => {},
  isInFocus: () => true,
});

export const useFocus = () => useContext(FocusCtx);

const STORAGE_KEY = 'raqib_focus_mode';

export function FocusProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<FocusMode | null>(null);

  // Restore from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        const found = FOCUS_MODES.find(m => m.id === parsed.id);
        if (found) setMode(found);
      }
    } catch {}
  }, []);

  const activate = useCallback((m: FocusMode) => {
    setMode(m);
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ id: m.id }));
  }, []);

  const deactivate = useCallback(() => {
    setMode(null);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const isInFocus = useCallback((entity: string, layerId?: string) => {
    if (!mode) return true;
    const entityMatch = mode.entities.includes(entity.toLowerCase());
    if (!layerId) return entityMatch;
    return entityMatch && mode.layers.includes(layerId);
  }, [mode]);

  return (
    <FocusCtx.Provider value={{ mode, activate, deactivate, isInFocus }}>
      {children}
    </FocusCtx.Provider>
  );
}
