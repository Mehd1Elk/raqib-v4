import { useState, useEffect } from 'react';
import { fetchEntries } from '@/lib/supabase/client-queries';
import type { Database } from '@/lib/supabase/types';

type EntryRow = Database['public']['Tables']['entries']['Row'];

export function useChartEntries(layerId: string) {
  const [entries, setEntries] = useState<EntryRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!layerId) {
      setLoading(false);
      return;
    }
    setLoading(true);
    fetchEntries(layerId, 0, 1000)
      .then((res) => setEntries(res.entries))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [layerId]);

  return { entries, loading };
}
