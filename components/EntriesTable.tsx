'use client';

import { useCallback, useEffect, useState } from 'react';
import { LayerEntriesTable } from '@/components/viz/tables';
import { fetchEntries, subscribeToEntries } from '@/lib/supabase/client-queries';
import type { Database } from '@/lib/supabase/types';

type EntryRow = Database['public']['Tables']['entries']['Row'];

interface EntriesTableProps {
  layerId: string;
  layerName: string;
  platformName: string;
}

const CLIENT_LAYER_LIMIT = 100;

export function EntriesTable({ layerId, layerName, platformName }: EntriesTableProps) {
  const [entries, setEntries] = useState<EntryRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(CLIENT_LAYER_LIMIT);
  const [totalRows, setTotalRows] = useState(0);

  const loadEntries = useCallback(async () => {
    setIsLoading(true);

    try {
      const result = await fetchEntries(layerId, pageIndex, pageSize);

      if (result.total <= CLIENT_LAYER_LIMIT && (pageIndex !== 0 || pageSize < result.total)) {
        const allRows = await fetchEntries(layerId, 0, CLIENT_LAYER_LIMIT);
        setEntries(allRows.entries);
        setPageIndex(0);
        setPageSize(CLIENT_LAYER_LIMIT);
        setTotalRows(allRows.total);
      } else {
        setEntries(result.entries);
        setTotalRows(result.total);
      }
    } catch {
      setEntries([]);
      setTotalRows(0);
    } finally {
      setIsLoading(false);
    }
  }, [layerId, pageIndex, pageSize]);

  useEffect(() => {
    setPageIndex(0);
    setPageSize(CLIENT_LAYER_LIMIT);
  }, [layerId]);

  useEffect(() => {
    void loadEntries();
  }, [loadEntries]);

  useEffect(() => {
    const unsubscribe = subscribeToEntries((payload) => {
      if (payload.new.layer_id === layerId) {
        void loadEntries();
      }
    });

    return unsubscribe;
  }, [layerId, loadEntries]);

  return (
    <LayerEntriesTable
      entries={entries}
      isLoading={isLoading}
      layerId={layerId}
      layerName={layerName}
      onPageIndexChange={setPageIndex}
      onPageSizeChange={(nextPageSize) => {
        setPageSize(nextPageSize);
        setPageIndex(0);
      }}
      pageIndex={pageIndex}
      pageSize={pageSize}
      paginationMode={totalRows > CLIENT_LAYER_LIMIT ? 'server' : 'client'}
      platformName={platformName}
      totalRows={totalRows}
    />
  );
}
