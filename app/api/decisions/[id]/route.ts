import { createClient } from '@/lib/supabase/server';

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { chosen_option } = body;

    if (!chosen_option) {
      return Response.json({ error: 'chosen_option is required' }, { status: 400 });
    }

    const supabase = await createClient();
    const { data, error } = await supabase
      .from('decisions')
      .update({ chosen_option, decided_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    return Response.json(data);
  } catch (e) {
    return Response.json({ error: 'Failed to update decision' }, { status: 500 });
  }
}
