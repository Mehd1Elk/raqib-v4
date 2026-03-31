'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { Database } from '@/lib/supabase/types';

type EntryRow = Database['public']['Tables']['entries']['Row'];

/**
 * Hook pour charger les entries d'un ou plusieurs layers depuis Supabase.
 * Retourne les entries avec leur data JSONB.
 */
export function useMapEntries(layerIds: string | string[]) {
  const [entries, setEntries] = useState<EntryRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const ids = Array.isArray(layerIds) ? layerIds : [layerIds];
    if (ids.length === 0) {
      setEntries([]);
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);
    setError(null);

    const supabase = createClient();
    supabase
      .from('entries')
      .select('*')
      .in('layer_id', ids)
      .order('created_at', { ascending: false })
      .then(({ data, error: err }) => {
        if (cancelled) return;
        if (err) {
          setError(err.message);
          setLoading(false);
          return;
        }
        setEntries(data ?? []);
        setLoading(false);
      });

    return () => { cancelled = true; };
  }, [Array.isArray(layerIds) ? layerIds.join(',') : layerIds]);

  return { entries, loading, error };
}
