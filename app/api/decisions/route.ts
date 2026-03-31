import { createClient } from '@/lib/supabase/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const entity = searchParams.get('entity');
  const pending = searchParams.get('pending') !== 'false'; // default: pending only

  try {
    const supabase = await createClient();
    let query = supabase.from('decisions').select('*');

    if (pending) {
      query = query.is('chosen_option', null);
    }
    if (entity) {
      query = query.eq('entity', entity);
    }

    const { data, error } = await query.order('urgency', { ascending: true });

    if (error) throw error;

    const urgencyOrder: Record<string, number> = { critical: 0, high: 1, medium: 2, low: 3 };
    const sorted = [...(data ?? [])].sort(
      (a: { urgency: string | null }, b: { urgency: string | null }) =>
        (urgencyOrder[a.urgency ?? 'low'] ?? 4) - (urgencyOrder[b.urgency ?? 'low'] ?? 4)
    );

    return Response.json(sorted);
  } catch (e) {
    return Response.json({ error: 'Failed to fetch decisions' }, { status: 500 });
  }
}
