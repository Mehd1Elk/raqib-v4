'use client';

import { useState, useRef, useCallback, useEffect } from 'react';

const COMMANDS = ['status', 'agents', 'entries', 'search', 'deploy', 'run', 'help', 'clear'];

interface CommandInputProps {
  onCommand: (cmd: string) => void;
}

export function CommandInput({ onCommand }: CommandInputProps) {
  const [value, setValue] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [suggestion, setSuggestion] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const updateSuggestion = useCallback((val: string) => {
    if (!val.trim()) {
      setSuggestion('');
      return;
    }
    const match = COMMANDS.find(c => c.startsWith(val.trim().toLowerCase()) && c !== val.trim().toLowerCase());
    setSuggestion(match ?? '');
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && value.trim()) {
      onCommand(value.trim());
      setHistory(prev => [value.trim(), ...prev]);
      setHistoryIndex(-1);
      setValue('');
      setSuggestion('');
    } else if (e.key === 'Tab' && suggestion) {
      e.preventDefault();
      setValue(suggestion);
      setSuggestion('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const newIndex = Math.min(historyIndex + 1, history.length - 1);
      if (newIndex >= 0 && history[newIndex]) {
        setHistoryIndex(newIndex);
        setValue(history[newIndex]);
        setSuggestion('');
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const newIndex = historyIndex - 1;
      if (newIndex < 0) {
        setHistoryIndex(-1);
        setValue('');
        setSuggestion('');
      } else {
        setHistoryIndex(newIndex);
        setValue(history[newIndex]);
        setSuggestion('');
      }
    }
  };

  return (
    <div className="flex gap-2 items-center shrink-0">
      <span className="text-[#D4B662] font-bold select-none">{'>'}</span>
      <div className="flex-1 relative">
        {suggestion && value.trim() && (
          <span className="absolute inset-0 text-[#918977] opacity-40 pointer-events-none select-none">
            {suggestion}
          </span>
        )}
        <input
          ref={inputRef}
          type="text"
          aria-label="Commande terminal"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            updateSuggestion(e.target.value);
          }}
          onKeyDown={handleKeyDown}
          className="w-full bg-transparent outline-none text-white border-none focus:ring-0 placeholder-[#918977] placeholder-opacity-50"
          placeholder="Tapez une commande..."
          autoFocus
          spellCheck={false}
          autoComplete="off"
        />
      </div>
      <span className="w-2 h-4 bg-[#D4B662] animate-pulse shrink-0" />
    </div>
  );
}
