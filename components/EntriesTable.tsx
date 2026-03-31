'use client';

import { useState, useEffect, useCallback } from 'react';
import { fetchEntries, subscribeToEntries } from '@/lib/supabase/client-queries';
import type { Database } from '@/lib/supabase/types';

type EntryRow = Database['public']['Tables']['entries']['Row'];

interface EntriesTableProps {
  layerId: string;
  layerName: string;
  platformName: string;
}

function ConfidenceBadge({ value }: { value: number | null }) {
  if (value === null) return <span className="text-tm">—</span>;
  const color = value >= 75 ? '#3D7C5E' : value >= 50 ? '#B87D3E' : '#9C3D3D';
  return (
    <span
      className="inline-block px-2 py-0.5 rounded text-[10px] font-[family-name:var(--font-jetbrains)] font-semibold"
      style={{ color, background: `${color}0D`, border: `1px solid ${color}22` }}
    >
      {value}
    </span>
  );
}

export function EntriesTable({ layerId, layerName, platformName }: EntriesTableProps) {
  const [entries, setEntries] = useState<EntryRow[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const limit = 50;

  const loadEntries = useCallback(async () => {
    setLoading(true);
    try {
      const result = await fetchEntries(layerId, page, limit);
      setEntries(result.entries);
      setTotal(result.total);
    } catch {
      // Supabase not available
      setEntries([]);
      setTotal(0);
    }
    setLoading(false);
  }, [layerId, page]);

  useEffect(() => {
    loadEntries();
  }, [loadEntries]);

  // Realtime: reload when new entry inserted for this layer
  useEffect(() => {
    const unsub = subscribeToEntries((payload) => {
      if (payload.new.layer_id === layerId) {
        loadEntries();
      }
    });
    return unsub;
  }, [layerId, loadEntries]);

  const handleExportEntries = () => {
    if (entries.length === 0) return;
    const headers = ['id', 'data', 'source', 'confidence', 'verified', 'created_at'];
    const rows = entries.map((e) => [
      e.id,
      JSON.stringify(e.data),
      e.source ?? '',
      String(e.confidence ?? ''),
      e.verified ? 'true' : 'false',
      e.created_at ?? '',
    ]);
    const csv =
      '\uFEFF' +
      headers.join(',') +
      '\n' +
      rows.map((r) => r.map((c) => `"${c.replace(/"/g, '""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `RAQIB_entries_${layerId}.csv`;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const totalPages = Math.ceil(total / limit);

  if (loading) {
    return (
      <div className="bg-ivory border border-div rounded p-6 text-center">
        <div className="text-[10px] font-[family-name:var(--font-jetbrains)] text-tm animate-pulse">
          Chargement des entries...
        </div>
      </div>
    );
  }

  if (entries.length === 0) {
    return (
      <div className="bg-ivory border border-div rounded p-8 text-center">
        <div className="text-[14px] font-[family-name:var(--font-cormorant)] font-bold italic text-t3 mb-2">
          Couche en attente de peuplement
        </div>
        <div className="text-[10px] font-[family-name:var(--font-noto)] text-tm mb-1">
          {layerName}
        </div>
        <div className="text-[9px] font-[family-name:var(--font-jetbrains)] text-tm">
          Plateforme assignée : {platformName}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-ivory border border-div rounded overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-div">
        <span className="text-[10px] font-[family-name:var(--font-jetbrains)] text-gold tracking-[1px] font-bold">
          ENTRIES ({total.toLocaleString()})
        </span>
        <button
          onClick={handleExportEntries}
          className="text-[8px] font-[family-name:var(--font-jetbrains)] text-tm hover:text-gold cursor-pointer bg-transparent border border-div rounded px-2 py-0.5 transition-colors"
        >
          EXPORT ENTRIES CSV
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-[10px] font-[family-name:var(--font-noto)]">
          <thead>
            <tr className="border-b border-div bg-cream">
              <th className="text-left px-3 py-2 font-semibold text-t3 font-[family-name:var(--font-jetbrains)]">DATA</th>
              <th className="text-left px-3 py-2 font-semibold text-t3 font-[family-name:var(--font-jetbrains)]">SOURCE</th>
              <th className="text-center px-3 py-2 font-semibold text-t3 font-[family-name:var(--font-jetbrains)]">CONF.</th>
              <th className="text-center px-3 py-2 font-semibold text-t3 font-[family-name:var(--font-jetbrains)]">VER.</th>
              <th className="text-right px-3 py-2 font-semibold text-t3 font-[family-name:var(--font-jetbrains)]">DATE</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry) => (
              <tr key={entry.id} className="border-b border-div-l hover:bg-cream/50">
                <td className="px-3 py-2 max-w-[300px]">
                  <pre className="text-[9px] font-[family-name:var(--font-jetbrains)] text-t2 whitespace-pre-wrap overflow-hidden text-ellipsis">
                    {JSON.stringify(entry.data, null, 2).slice(0, 200)}
                  </pre>
                </td>
                <td className="px-3 py-2">
                  {entry.source ? (
                    <a
                      href={entry.source}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sapphire hover:underline truncate block max-w-[200px]"
                    >
                      {entry.source}
                    </a>
                  ) : (
                    <span className="text-tm">—</span>
                  )}
                </td>
                <td className="px-3 py-2 text-center">
                  <ConfidenceBadge value={entry.confidence} />
                </td>
                <td className="px-3 py-2 text-center">
                  {entry.verified ? (
                    <span className="text-emerald font-bold">✓</span>
                  ) : (
                    <span className="text-tm">—</span>
                  )}
                </td>
                <td className="px-3 py-2 text-right text-[9px] font-[family-name:var(--font-jetbrains)] text-t3">
                  {entry.created_at
                    ? new Date(entry.created_at).toLocaleDateString('fr-FR')
                    : '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-4 py-2 border-t border-div">
          <button
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
            className="text-[9px] font-[family-name:var(--font-jetbrains)] text-tm hover:text-gold disabled:opacity-30 cursor-pointer disabled:cursor-default bg-transparent border-none"
          >
            ← PRÉCÉDENT
          </button>
          <span className="text-[9px] font-[family-name:var(--font-jetbrains)] text-t3">
            Page {page + 1} / {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
            disabled={page >= totalPages - 1}
            className="text-[9px] font-[family-name:var(--font-jetbrains)] text-tm hover:text-gold disabled:opacity-30 cursor-pointer disabled:cursor-default bg-transparent border-none"
          >
            SUIVANT →
          </button>
        </div>
      )}
    </div>
  );
}
