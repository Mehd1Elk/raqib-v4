import type { Database, Json } from './supabase/types';

type EntryInsert = Database['public']['Tables']['entries']['Insert'];

export function datasetToEntries(
  rows: Record<string, unknown>[],
  layerId: string,
  fileName: string,
): EntryInsert[] {
  return rows.map((row) => ({
    layer_id: layerId,
    data: row as unknown as Json,
    source: `upload:${fileName}`,
    confidence: 0.9,
    verified: false,
  }));
}
