import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
);

interface PopulateRequest {
  layer_id: string;
  entries: Array<{
    data: Record<string, unknown>;
    source?: string;
    source_date?: string;
    confidence?: number;
  }>;
  agent_id: string;
  model?: string;
}

Deno.serve(async (req: Request) => {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "POST only" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  const startedAt = new Date().toISOString();
  let body: PopulateRequest;

  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { layer_id, entries, agent_id, model } = body;

  if (!layer_id || !entries?.length || !agent_id) {
    return new Response(
      JSON.stringify({ error: "layer_id, entries[], agent_id required" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  // Verify layer exists
  const { data: layer, error: layerErr } = await supabase
    .from("layers")
    .select("id, entity_id")
    .eq("id", layer_id)
    .single();

  if (layerErr || !layer) {
    return new Response(
      JSON.stringify({ error: `Layer ${layer_id} not found` }),
      { status: 404, headers: { "Content-Type": "application/json" } }
    );
  }

  // Create agent run
  const { data: run, error: runErr } = await supabase
    .from("agent_runs")
    .insert({
      agent_id,
      layer_id,
      model: model || "unknown",
      status: "running",
      started_at: startedAt,
    })
    .select("id")
    .single();

  if (runErr) {
    return new Response(JSON.stringify({ error: runErr.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Batch insert entries
  const rows = entries.map((e) => ({
    layer_id,
    data: e.data,
    source: e.source || null,
    source_date: e.source_date || null,
    confidence: e.confidence ?? 1.0,
    created_by: agent_id,
  }));

  const { data: inserted, error: insertErr } = await supabase
    .from("entries")
    .insert(rows)
    .select("id");

  const completedAt = new Date().toISOString();
  const durationMs =
    new Date(completedAt).getTime() - new Date(startedAt).getTime();

  if (insertErr) {
    await supabase
      .from("agent_runs")
      .update({
        status: "failed",
        error_message: insertErr.message,
        completed_at: completedAt,
        duration_ms: durationMs,
      })
      .eq("id", run.id);

    return new Response(JSON.stringify({ error: insertErr.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Update agent run as success
  await supabase
    .from("agent_runs")
    .update({
      status: "success",
      entries_created: inserted?.length || 0,
      completed_at: completedAt,
      duration_ms: durationMs,
    })
    .eq("id", run.id);

  // Update layer freshness
  await supabase
    .from("layers")
    .update({
      last_populated_at: completedAt,
      freshness_score: 100,
      updated_at: completedAt,
    })
    .eq("id", layer_id);

  return new Response(
    JSON.stringify({
      success: true,
      run_id: run.id,
      entries_created: inserted?.length || 0,
      duration_ms: durationMs,
    }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
});
