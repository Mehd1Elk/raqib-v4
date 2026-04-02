'use client';

import { useState, useRef, useEffect } from 'react';
import { SEARCH_INDEX, ALL_COUNTRIES } from '../../lib/corridor/data';
import { filterSearchIndex } from '../../lib/corridor/utils';
import { FlagIcon } from './FlagIcon';
import type { SearchItem } from '../../lib/corridor/types';

interface CorridorSearchProps {
  onSelectCountry: (id: string) => void;
}

export function CorridorSearch({ onSelectCountry }: CorridorSearchProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      setIsOpen(false);
      return;
    }
    const matches = filterSearchIndex(SEARCH_INDEX, query);
    setResults(matches);
    setIsOpen(matches.length > 0);
  }, [query]);

  function handleSelect(item: SearchItem) {
    setQuery('');
    setResults([]);
    setIsOpen(false);
    onSelectCountry(item.id);
  }

  return (
    <div className="search-container">
      <div className="search-icon">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
      </div>
      <input
        className="search-input"
        type="text"
        placeholder="Rechercher un pays, minerai, entreprise..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onBlur={() => {
          if (timeoutRef.current) clearTimeout(timeoutRef.current);
          timeoutRef.current = setTimeout(() => setIsOpen(false), 200);
        }}
        onFocus={() => {
          if (query.length >= 2 && results.length > 0) setIsOpen(true);
        }}
      />
      {isOpen && (
        <div className="search-results active">
          {results.map((m, i) => (
            <div key={i} className="search-result-item" onClick={() => handleSelect(m)}>
              <span className="sr-flag"><FlagIcon code={m.id} size={24} /></span>
              <span className="sr-name">{m.name}</span>
              <span className="sr-type">{m.type}{m.country ? ` · ${m.country}` : ''}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
