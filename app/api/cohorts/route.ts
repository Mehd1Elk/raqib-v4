import { createClient } from '@/lib/supabase/server';

export async function GET() {
  const supabase = await createClient();

  const { data: discussions, error } = await supabase
    .from('cohort_discussions')
    .select('cohort_id, id, topic, message_count, status, created_at')
    .order('created_at', { ascending: false });

  if (error) return Response.json({ error: error.message }, { status: 500 });

  const cohortStats: Record<
    string,
    { discussions: number; messages: number; lastActivity: string }
  > = {};

  for (const d of discussions || []) {
    if (!cohortStats[d.cohort_id]) {
      cohortStats[d.cohort_id] = {
        discussions: 0,
        messages: 0,
        lastActivity: d.created_at ?? '',
      };
    }
    cohortStats[d.cohort_id].discussions++;
    cohortStats[d.cohort_id].messages += d.message_count ?? 0;
  }

  return Response.json(cohortStats);
}
