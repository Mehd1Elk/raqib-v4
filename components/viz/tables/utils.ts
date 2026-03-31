import type { Column, RowData } from '@tanstack/react-table';
import type { Json } from '@/lib/supabase/types';
import type { EntryDataRecord, EntryRow, TableVariant } from './types';

const EMPTY_VALUE = '—';

const NUMERIC_HINTS = [
  'amount',
  'aum',
  'budget',
  'confidence',
  'cost',
  'count',
  'cagr',
  'gas',
  'h_index',
  'index',
  'latence',
  'levee',
  'lits',
  'moat',
  'notation',
  'params',
  'pct',
  'prix',
  'production',
  'rang',
  'ratio',
  'revenue',
  'risk',
  'score',
  'seuil',
  'sla',
  'soft_power',
  'tam',
  'temperature',
  'tonnes',
  'tps',
  'usd',
  'utilisateurs',
  'valorisation',
  'valeur',
  'volume',
];

export function getEntryData(entry: EntryRow): EntryDataRecord {
  if (!entry.data || Array.isArray(entry.data) || typeof entry.data !== 'object') {
    return {};
  }

  return entry.data as EntryDataRecord;
}

export function isMeaningfulValue(value: Json | undefined): boolean {
  if (value === null || value === undefined) return false;
  if (typeof value === 'string') return value.trim().length > 0;
  if (Array.isArray(value)) return value.length > 0;
  if (typeof value === 'object') return Object.keys(value).length > 0;
  return true;
}

export function toDisplayString(value: Json | undefined): string {
  if (!isMeaningfulValue(value)) return EMPTY_VALUE;

  if (Array.isArray(value)) {
    const items = value
      .map((item) => toDisplayString(item))
      .filter((item) => item !== EMPTY_VALUE);
    return items.length > 0 ? items.join(' · ') : EMPTY_VALUE;
  }

  if (typeof value === 'object' && value !== null) {
    return Object.entries(value)
      .filter(([, item]) => isMeaningfulValue(item))
      .map(([key, item]) => `${formatHeaderLabel(key)}: ${toDisplayString(item)}`)
      .join(' | ');
  }

  if (typeof value === 'boolean') {
    return value ? 'Oui' : 'Non';
  }

  return String(value);
}

export function toPlainText(value: unknown): string {
  if (value === null || value === undefined) return '';

  if (Array.isArray(value)) {
    return value.map((item) => toPlainText(item)).join(' ');
  }

  if (typeof value === 'object') {
    return Object.values(value as Record<string, unknown>)
      .map((item) => toPlainText(item))
      .join(' ');
  }

  return String(value).toLowerCase();
}

export function formatHeaderLabel(key: string): string {
  return key
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export function collectDataKeys(entries: EntryRow[]): string[] {
  const seen = new Set<string>();
  const keys: string[] = [];

  for (const entry of entries) {
    for (const key of Object.keys(getEntryData(entry))) {
      if (!seen.has(key)) {
        seen.add(key);
        keys.push(key);
      }
    }
  }

  return keys;
}

export function parseNumber(value: unknown): number | null {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return value;
  }

  if (typeof value !== 'string') {
    return null;
  }

  const cleaned = value.replace(/[^\d.-]/g, '');
  if (!cleaned) return null;

  const parsed = Number.parseFloat(cleaned);
  return Number.isFinite(parsed) ? parsed : null;
}

export function formatNumber(value: unknown): string {
  const parsed = parseNumber(value);
  if (parsed === null) return EMPTY_VALUE;

  return new Intl.NumberFormat('fr-FR', {
    maximumFractionDigits: parsed < 10 && !Number.isInteger(parsed) ? 2 : 0,
  }).format(parsed);
}

export function formatCurrencyUsd(value: unknown): string {
  const parsed = parseNumber(value);
  if (parsed === null) return EMPTY_VALUE;

  return new Intl.NumberFormat('fr-FR', {
    currency: 'USD',
    maximumFractionDigits: 0,
    style: 'currency',
  }).format(parsed);
}

export function formatDate(value: unknown): string {
  if (typeof value !== 'string' || !value.trim()) {
    return EMPTY_VALUE;
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return value;
  }

  return parsed.toLocaleDateString('fr-FR');
}

export function isNumericKey(key: string, sample?: unknown): boolean {
  const normalized = key.toLowerCase();

  if (NUMERIC_HINTS.some((hint) => normalized.includes(hint))) {
    return true;
  }

  return parseNumber(sample) !== null;
}

export function getCandidateText(record: EntryDataRecord, candidates: string[]): string {
  for (const key of candidates) {
    const value = record[key];
    if (isMeaningfulValue(value)) {
      return toDisplayString(value);
    }
  }

  return EMPTY_VALUE;
}

export function getCandidateNumber(record: EntryDataRecord, candidates: string[]): number | null {
  for (const key of candidates) {
    const parsed = parseNumber(record[key]);
    if (parsed !== null) {
      return parsed;
    }
  }

  return null;
}

export function getFirstTextValue(record: EntryDataRecord, excludedKeys: string[] = []): string {
  const excluded = new Set(excludedKeys);

  for (const [key, value] of Object.entries(record)) {
    if (excluded.has(key) || !isMeaningfulValue(value)) continue;
    if (typeof value === 'string' || Array.isArray(value)) {
      return toDisplayString(value);
    }
  }

  return EMPTY_VALUE;
}

export function getFirstNumericField(record: EntryDataRecord): { key: string; value: number } | null {
  for (const [key, value] of Object.entries(record)) {
    const parsed = parseNumber(value);
    if (parsed !== null) {
      return { key, value: parsed };
    }
  }

  return null;
}

export function buildNotes(record: EntryDataRecord, consumedKeys: string[]): string {
  const consumed = new Set(consumedKeys);

  const notes = Object.entries(record)
    .filter(([key, value]) => !consumed.has(key) && isMeaningfulValue(value))
    .map(([key, value]) => `${formatHeaderLabel(key)}: ${toDisplayString(value)}`);

  return notes.length > 0 ? notes.join(' | ') : EMPTY_VALUE;
}

export function normalizeNotation(value: number | null): number | null {
  if (value === null || !Number.isFinite(value)) return null;

  if (value >= 0 && value <= 1) return Math.round(value * 100);
  if (value >= 0 && value <= 5) return Math.round(value * 20);
  if (value >= 0 && value <= 10) return Math.round(value * 10);

  return Math.max(0, Math.min(100, Math.round(value)));
}

export function getNotationTone(value: number | null): string {
  if (value === null) return '#918977';
  if (value >= 75) return '#3D7C5E';
  if (value >= 50) return '#B8963E';
  return '#9C3D3D';
}

function parseLayerId(layerId: string): { prefix: string; value: number } | null {
  const match = layerId.match(/^([a-z]+)(\d+)$/i);
  if (!match) return null;

  return {
    prefix: match[1].toLowerCase(),
    value: Number.parseInt(match[2], 10),
  };
}

export function isLayerInRange(
  layerId: string,
  prefix: string,
  min: number,
  max: number,
): boolean {
  const parsed = parseLayerId(layerId);

  return parsed?.prefix === prefix.toLowerCase() && parsed.value >= min && parsed.value <= max;
}

export function detectTableVariant(layerId: string): TableVariant {
  if (['cg09', 'cg84', 'cg85'].includes(layerId.toLowerCase())) {
    return 'scoring';
  }

  if (isLayerInRange(layerId, 'n', 21, 30) || isLayerInRange(layerId, 'a', 1, 10)) {
    return 'comparison';
  }

  if (isLayerInRange(layerId, 'n', 51, 60) || isLayerInRange(layerId, 'b', 51, 60)) {
    return 'investor';
  }

  if (isLayerInRange(layerId, 'cg', 1, 10)) {
    return 'deal-flow';
  }

  return 'data';
}

export function getColumnAlignment<TData extends RowData>(column: Column<TData>): string {
  switch (column.columnDef.meta?.align) {
    case 'center':
      return 'text-center';
    case 'right':
      return 'text-right';
    default:
      return 'text-left';
  }
}

export function getColumnHeaderLabel<TData extends RowData>(column: Column<TData>): string {
  const header = column.columnDef.header;

  if (typeof header === 'string') {
    return header;
  }

  return formatHeaderLabel(column.id);
}

export function createBlobDownload(filename: string, blob: Blob) {
  const anchor = document.createElement('a');
  anchor.href = URL.createObjectURL(blob);
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  window.setTimeout(() => URL.revokeObjectURL(anchor.href), 0);
}
