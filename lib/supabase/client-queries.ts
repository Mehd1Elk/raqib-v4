import { createClient } from './client';
import type { Database } from './types';

type LayerRow = Database['public']['Tables']['layers']['Row'];
type EntryRow = Database['public']['Tables']['entries']['Row'];
type SearchResult = Database['public']['Functions']['search_layers']['Returns'][number];
type EntityStatResult = Database['public']['Functions']['entity_stats']['Returns'][number];

export async function fetchLayersForEntity(entityId: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('layers')
    .select('*, categories!inner(name, position), platforms!inner(name, color, description)')
    .eq('entity_id', entityId)
    .order('category_id')
    .order('id');

  if (error) throw error;
  return data;
}

export async function fetchLayerDetail(layerId: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('layers')
    .select('*, categories!inner(name, position), entities!inner(name, type, color, description), platforms!inner(name, color, description)')
    .eq('id', layerId)
    .single();

  if (error) throw error;
  return data;
}

export async function fetchEntries(layerId: string, page = 0, limit = 50) {
  const supabase = createClient();
  const from = page * limit;
  const to = from + limit - 1;

  const { data, error, count } = await supabase
    .from('entries')
    .select('*', { count: 'exact' })
    .eq('layer_id', layerId)
    .order('created_at', { ascending: false })
    .range(from, to);

  if (error) throw error;
  return { entries: data as EntryRow[], total: count ?? 0 };
}

export async function searchLayersClient(query: string, limit = 20): Promise<SearchResult[]> {
  const supabase = createClient();
  const { data, error } = await supabase.rpc('search_layers', {
    p_query: query,
    p_limit: limit,
  });
  if (error) throw error;
  return data ?? [];
}

export async function fetchEntityStats(entityId?: string): Promise<EntityStatResult[]> {
  const supabase = createClient();
  const { data, error } = await supabase.rpc('entity_stats', {
    p_entity_id: entityId ?? undefined,
  });
  if (error) throw error;
  return data ?? [];
}

export async function fetchAgentRuns(limit = 10) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('agent_runs')
    .select('*')
    .order('started_at', { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data;
}

/**
 * Fetch categories + layers for an entity, grouped as Category[] to replace mock-data.
 * Returns the same shape as getEntityLayers() from mock-data.
 */
export async function fetchCategoriesWithLayers(entityId: string): Promise<
  { label: string; layers: { id: string; name: string; platform: string; rows: number }[] }[]
> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('layers')
    .select('id, name, platform_code, target_rows, actual_rows, status, last_populated_at, category_id, categories!inner(name, position)')
    .eq('entity_id', entityId)
    .order('category_id')
    .order('id');

  if (error) throw error;
  if (!data) return [];

  // Group by category
  const catMap = new Map<number, { label: string; position: number; layers: { id: string; name: string; platform: string; rows: number; actual_rows: number; status: string | null; last_populated_at: string | null }[] }>();

  for (const row of data) {
    const cat = row.categories as unknown as { name: string; position: number };
    const catId = row.category_id;
    if (!catMap.has(catId)) {
      catMap.set(catId, { label: cat.name, position: cat.position, layers: [] });
    }
    catMap.get(catId)!.layers.push({
      id: row.id,
      name: row.name,
      platform: row.platform_code,
      rows: row.target_rows ?? 0,
      actual_rows: row.actual_rows ?? 0,
      status: row.status,
      last_populated_at: row.last_populated_at,
    });
  }

  return Array.from(catMap.values())
    .sort((a, b) => a.position - b.position)
    .map(({ label, layers }) => ({ label, layers }));
}

export function subscribeToEntries(callback: (payload: { new: EntryRow }) => void) {
  const supabase = createClient();
  const channel = supabase
    .channel('entries-realtime')
    .on(
      'postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'entries' },
      (payload) => callback(payload as unknown as { new: EntryRow })
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}

export async function fetchPlatformBreakdown(entityId: string): Promise<{ platform_code: string; count: number }[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('entries')
    .select('layer_id, layers!inner(platform_code, entity_id)')
    .eq('layers.entity_id', entityId);

  if (error) throw error;
  if (!data) return [];

  const counts = new Map<string, number>();
  for (const row of data) {
    const pc = (row.layers as unknown as { platform_code: string }).platform_code;
    counts.set(pc, (counts.get(pc) ?? 0) + 1);
  }
  return Array.from(counts.entries()).map(([platform_code, count]) => ({ platform_code, count }));
}

export async function fetchConfidenceStats(): Promise<{ entity_id: string; high_confidence: number; total: number }[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('entries')
    .select('confidence, layer_id, layers!inner(entity_id)');

  if (error) throw error;
  if (!data) return [];

  const map = new Map<string, { high: number; total: number }>();
  for (const row of data) {
    const eid = (row.layers as unknown as { entity_id: string }).entity_id;
    const entry = map.get(eid) ?? { high: 0, total: 0 };
    entry.total++;
    if ((row.confidence ?? 0) >= 0.85) entry.high++;
    map.set(eid, entry);
  }
  return Array.from(map.entries()).map(([entity_id, { high, total }]) => ({
    entity_id,
    high_confidence: high,
    total,
  }));
}

export function subscribeToLayerUpdates(callback: (payload: { new: LayerRow }) => void) {
  const supabase = createClient();
  const channel = supabase
    .channel('layers-realtime')
    .on(
      'postgres_changes',
      { event: 'UPDATE', schema: 'public', table: 'layers' },
      (payload) => callback(payload as unknown as { new: LayerRow })
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}
