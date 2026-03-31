import { createClient } from './server';
import type { Database } from './types';

type EntityStatResult = Database['public']['Functions']['entity_stats']['Returns'][number];
type EntryRow = Database['public']['Tables']['entries']['Row'];
type LayerRow = Database['public']['Tables']['layers']['Row'];

// ─── ENTITY DASHBOARD ───────────────────────────────────────

export async function fetchEntityDashboard(entityId: string) {
  const supabase = await createClient();

  const [statsRes, topLayersRes, platformRes, recentEntriesRes, entityRes] = await Promise.all([
    supabase.rpc('entity_stats', { p_entity_id: entityId }),
    supabase
      .from('layers')
      .select('id, name, actual_rows, target_rows, platform_code, status')
      .eq('entity_id', entityId)
      .gt('actual_rows', 0)
      .order('actual_rows', { ascending: false })
      .limit(5),
    supabase
      .from('layers')
      .select('platform_code')
      .eq('entity_id', entityId),
    supabase
      .from('entries')
      .select('id, data, confidence, source, created_at, layer_id, layers!inner(entity_id, name)')
      .eq('layers.entity_id', entityId)
      .order('created_at', { ascending: false })
      .limit(10),
    supabase
      .from('entities')
      .select('*')
      .eq('id', entityId)
      .single(),
  ]);

  // Platform distribution from entries
  const platformCounts = new Map<string, number>();
  for (const l of platformRes.data ?? []) {
    platformCounts.set(l.platform_code, (platformCounts.get(l.platform_code) ?? 0) + 1);
  }
  const platformDistribution = Array.from(platformCounts.entries()).map(([platform_code, count]) => ({
    platform_code,
    count,
  }));

  return {
    stats: (statsRes.data ?? [])[0] as EntityStatResult | undefined,
    topLayers: (topLayersRes.data ?? []) as (Pick<LayerRow, 'id' | 'name' | 'actual_rows' | 'target_rows' | 'platform_code' | 'status'>)[],
    platformDistribution,
    recentEntries: (recentEntriesRes.data ?? []) as (EntryRow & { layers: { entity_id: string; name: string } })[],
    entity: entityRes.data,
  };
}

// ─── SUPERVISOR DASHBOARD ───────────────────────────────────

export async function fetchSupervisorDashboard() {
  const supabase = await createClient();

  const [statsRes, agentRunsRes, alertsRes] = await Promise.all([
    supabase.rpc('entity_stats', {}),
    supabase
      .from('agent_runs')
      .select('*')
      .order('started_at', { ascending: false })
      .limit(20),
    supabase
      .from('layers')
      .select('id, name, entity_id, actual_rows, target_rows, status, quality_score, freshness_score, entities!inner(name)')
      .or('quality_score.lt.30,freshness_score.lt.30')
      .gt('actual_rows', 0)
      .order('quality_score', { ascending: true })
      .limit(10),
  ]);

  return {
    entityStats: (statsRes.data ?? []) as EntityStatResult[],
    agentRuns: agentRunsRes.data ?? [],
    alerts: (alertsRes.data ?? []) as (LayerRow & { entities: { name: string } })[],
  };
}

// ─── INVESTOR DASHBOARD ─────────────────────────────────────

export async function fetchInvestorDashboard() {
  const supabase = await createClient();

  const [noosStatsRes, cgDealFlowRes, corridorRes, innerCircleRes, fundraisingRes] = await Promise.all([
    supabase.rpc('entity_stats', { p_entity_id: 'noos' }),
    // CG SA deal flow (cg01-cg10)
    supabase
      .from('entries')
      .select('id, data, confidence, created_at, layer_id, layers!inner(id, name, entity_id)')
      .eq('layers.entity_id', 'cg')
      .like('layers.id', 'cg0%')
      .order('created_at', { ascending: false })
      .limit(50),
    // Corridor data (cg81-cg90)
    supabase
      .from('entries')
      .select('id, data, confidence, layer_id, layers!inner(id, name, entity_id)')
      .eq('layers.entity_id', 'cg')
      .like('layers.id', 'cg8%')
      .limit(30),
    // Inner circle (cg51-cg60)
    supabase
      .from('entries')
      .select('id, data, confidence, layer_id, layers!inner(id, name, entity_id)')
      .eq('layers.entity_id', 'cg')
      .like('layers.id', 'cg5%')
      .limit(30),
    // Fundraising events (cg61-cg70)
    supabase
      .from('entries')
      .select('id, data, confidence, created_at, layer_id, layers!inner(id, name, entity_id)')
      .eq('layers.entity_id', 'cg')
      .like('layers.id', 'cg6%')
      .order('created_at', { ascending: false })
      .limit(20),
  ]);

  return {
    noosStats: (noosStatsRes.data ?? [])[0] as EntityStatResult | undefined,
    dealFlow: cgDealFlowRes.data ?? [],
    corridors: corridorRes.data ?? [],
    innerCircle: innerCircleRes.data ?? [],
    fundraising: fundraisingRes.data ?? [],
  };
}

// ─── GITEX DASHBOARD ────────────────────────────────────────

export async function fetchGitexDashboard() {
  const supabase = await createClient();

  const [cgEventsRes, cdIntelRes, cgOperationnelRes, cdOperationnelRes] = await Promise.all([
    // CG SA events (cg61-cg70)
    supabase
      .from('entries')
      .select('id, data, confidence, created_at, layer_id, layers!inner(id, name, entity_id)')
      .eq('layers.entity_id', 'cg')
      .gte('layers.id', 'cg61')
      .lte('layers.id', 'cg70')
      .limit(50),
    // Cercle intelligence (cd61-cd70)
    supabase
      .from('entries')
      .select('id, data, confidence, created_at, layer_id, layers!inner(id, name, entity_id)')
      .eq('layers.entity_id', 'cercle')
      .gte('layers.id', 'cd61')
      .lte('layers.id', 'cd70')
      .limit(50),
    // CG operational (cg91-cg100)
    supabase
      .from('entries')
      .select('id, data, confidence, layer_id, layers!inner(id, name, entity_id)')
      .eq('layers.entity_id', 'cg')
      .gte('layers.id', 'cg91')
      .lte('layers.id', 'cg99')
      .limit(30),
    // Cercle operational (cd91-cd100)
    supabase
      .from('entries')
      .select('id, data, confidence, layer_id, layers!inner(id, name, entity_id)')
      .eq('layers.entity_id', 'cercle')
      .gte('layers.id', 'cd91')
      .lte('layers.id', 'cd99')
      .limit(30),
  ]);

  return {
    events: cgEventsRes.data ?? [],
    intelligence: cdIntelRes.data ?? [],
    cgLogistics: cgOperationnelRes.data ?? [],
    cdLogistics: cdOperationnelRes.data ?? [],
  };
}

// ─── LONDON DASHBOARD ───────────────────────────────────────

export async function fetchLondonDashboard() {
  const supabase = await createClient();

  const [investorTargetsRes, architectureRes, portfolioRes, operationnelRes, noosStatsRes] = await Promise.all([
    // Investor targets (cg51-cg60 inner circle + noos n51-n60 investisseurs)
    supabase
      .from('entries')
      .select('id, data, confidence, created_at, layer_id, layers!inner(id, name, entity_id)')
      .in('layers.entity_id', ['cg', 'noos'])
      .like('layers.id', '%5%')
      .limit(50),
    // Architecture Eigen (cd01-cd10)
    supabase
      .from('entries')
      .select('id, data, confidence, layer_id, layers!inner(id, name, entity_id)')
      .eq('layers.entity_id', 'cercle')
      .gte('layers.id', 'cd01')
      .lte('layers.id', 'cd10')
      .limit(30),
    // Portfolio / valorisation (cg31-cg40)
    supabase
      .from('entries')
      .select('id, data, confidence, layer_id, layers!inner(id, name, entity_id)')
      .eq('layers.entity_id', 'cg')
      .gte('layers.id', 'cg31')
      .lte('layers.id', 'cg40')
      .limit(30),
    // CG operationnel for data room (cg91-cg100)
    supabase
      .from('entries')
      .select('id, data, confidence, layer_id, layers!inner(id, name, entity_id)')
      .eq('layers.entity_id', 'cg')
      .gte('layers.id', 'cg91')
      .lte('layers.id', 'cg99')
      .limit(20),
    supabase.rpc('entity_stats', {}),
  ]);

  return {
    investorTargets: investorTargetsRes.data ?? [],
    architecture: architectureRes.data ?? [],
    portfolio: portfolioRes.data ?? [],
    operationnel: operationnelRes.data ?? [],
    allStats: (noosStatsRes.data ?? []) as EntityStatResult[],
  };
}
