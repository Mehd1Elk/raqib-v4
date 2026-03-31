import { createClient } from "./server";
import type { Database } from "./types";

type Layer = Database["public"]["Tables"]["layers"]["Row"];
type Entry = Database["public"]["Tables"]["entries"]["Row"];

export async function getLayers(entityId?: string) {
  const supabase = await createClient();
  let query = supabase
    .from("layers")
    .select(
      "*, categories!inner(name, position), entities!inner(name, type, color)"
    )
    .order("entity_id")
    .order("category_id");

  if (entityId) {
    query = query.eq("entity_id", entityId);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data;
}

export async function getLayerDetail(layerId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("layers")
    .select(
      "*, categories!inner(name, position), entities!inner(name, type, color), platforms!inner(name, color)"
    )
    .eq("id", layerId)
    .single();

  if (error) throw error;
  return data;
}

export async function getEntries(
  layerId: string,
  opts?: { limit?: number; offset?: number; verified?: boolean }
) {
  const supabase = await createClient();
  let query = supabase
    .from("entries")
    .select("*", { count: "exact" })
    .eq("layer_id", layerId)
    .order("created_at", { ascending: false });

  if (opts?.verified !== undefined) {
    query = query.eq("verified", opts.verified);
  }
  if (opts?.limit) query = query.limit(opts.limit);
  if (opts?.offset) query = query.range(opts.offset, opts.offset + (opts.limit || 50) - 1);

  const { data, error, count } = await query;
  if (error) throw error;
  return { entries: data, total: count };
}

export async function searchLayers(q: string, limit = 20) {
  const supabase = await createClient();
  const { data, error } = await supabase.rpc("search_layers", {
    p_query: q,
    p_limit: limit,
  });
  if (error) throw error;
  return data;
}

export async function getEntityStats(entityId?: string) {
  const supabase = await createClient();
  const { data, error } = await supabase.rpc("entity_stats", {
    p_entity_id: entityId || undefined,
  });
  if (error) throw error;
  return data;
}

export async function getEntities() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("entities")
    .select("*")
    .order("id");
  if (error) throw error;
  return data;
}

export async function getPlatforms() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("platforms")
    .select("*")
    .order("code");
  if (error) throw error;
  return data;
}

export async function getCategories(entityId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("entity_id", entityId)
    .order("position");
  if (error) throw error;
  return data;
}
