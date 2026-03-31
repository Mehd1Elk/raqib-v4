'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { PLATFORMS } from '@/lib/constants';
import { fmtNum } from '@/lib/helpers';
import { searchLayerRecords, type LayerCatalogEntry } from '@/lib/catalog';
import { searchLayersClient } from '@/lib/supabase/client-queries';

interface SearchOverlayProps {
  onSelect: (entityIndex: number, categoryIndex: number, layerIndex: number) => void;
}

interface DisplayResult {
  key: string;
  entityName: string;
  categoryLabel: string;
  layerName: string;
  layerId: string;
  platformColor: string;
  platformName: string;
  rows: number;
  entityIndex: number;
  categoryIndex: number;
  layerIndex: number;
}

function catalogToDisplay(entries: LayerCatalogEntry[]): DisplayResult[] {
  return entries.slice(0, 20).map((r) => ({
    key: `${r.entityId}-${r.layer.id}`,
    entityName: r.entity.name,
    categoryLabel: r.category.label,
    layerName: r.layer.name,
    layerId: r.layer.id,
    platformColor: r.platform.color,
    platformName: r.platform.name,
    rows: r.layer.rows,
    entityIndex: r.entityIndex,
    categoryIndex: r.categoryIndex,
    layerIndex: r.layerIndex,
  }));
}

export function SearchOverlay({ onSelect }: SearchOverlayProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<DisplayResult[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      setOpen((prev) => !prev);
    }
    if (e.key === 'Escape') setOpen(false);
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (open) {
      setQuery('');
      setResults([]);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  // Debounced search: try Supabase first, fall back to local catalog
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const timeout = setTimeout(async () => {
      try {
        const sbResults = await searchLayersClient(query, 20);
        if (sbResults.length > 0) {
          // Map Supabase results back to catalog to get indexes
          const localResults = searchLayerRecords(query);
          setResults(catalogToDisplay(localResults));
          return;
        }
      } catch {
        // Supabase not available, fall back
      }
      const localResults = searchLayerRecords(query);
      setResults(catalogToDisplay(localResults));
    }, 200);

    return () => clearTimeout(timeout);
  }, [query]);

  if (!open) return null;

  return (
    <div
      data-testid="search-overlay"
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh]"
      style={{ background: 'rgba(28,24,20,0.5)' }}
      onClick={() => setOpen(false)}
    >
      <div
        className="w-full max-w-lg bg-ivory rounded-lg shadow-2xl border border-div overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 px-4 py-3 border-b border-div">
          <span className="text-[9px] font-[family-name:var(--font-jetbrains)] text-tm tracking-widest">
            RECHERCHE
          </span>
          <input
            ref={inputRef}
            data-testid="search-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher parmi 1000 couches..."
            className="flex-1 bg-transparent border-none outline-none text-sm font-[family-name:var(--font-noto)] text-t1 placeholder:text-tm"
          />
          <kbd className="text-[8px] font-[family-name:var(--font-jetbrains)] text-tm bg-cream px-1.5 py-0.5 rounded border border-div">
            ESC
          </kbd>
        </div>

        {results.length > 0 && (
          <div className="max-h-[400px] overflow-auto">
            {results.map((r) => (
              <button
                key={r.key}
                data-testid={`search-result-${r.key}`}
                className="w-full text-left px-4 py-2.5 border-b border-div-l hover:bg-cream cursor-pointer flex items-center gap-3"
                onClick={() => {
                  onSelect(r.entityIndex, r.categoryIndex, r.layerIndex);
                  setOpen(false);
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ background: r.platformColor }}
                />
                <div className="flex-1 min-w-0">
                  <div className="text-[11px] font-[family-name:var(--font-noto)] text-t1 font-medium truncate">
                    {r.layerName}
                  </div>
                  <div className="text-[9px] font-[family-name:var(--font-jetbrains)] text-t3">
                    {r.entityName} · {r.categoryLabel} · {r.platformName} · {fmtNum(r.rows)} rows
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}

        {query.trim() && results.length === 0 && (
          <div className="px-4 py-8 text-center text-[11px] font-[family-name:var(--font-noto)] text-tm">
            Aucun résultat pour &ldquo;{query}&rdquo;
          </div>
        )}

        {!query.trim() && (
          <div className="px-4 py-6 text-center text-[10px] font-[family-name:var(--font-jetbrains)] text-tm">
            Tapez pour rechercher parmi les 1000 couches
          </div>
        )}
      </div>
    </div>
  );
}
