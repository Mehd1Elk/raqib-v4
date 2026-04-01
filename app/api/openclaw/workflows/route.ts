import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

// GET — lister tous les workflows
export async function GET() {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from('workflows')
    .select('*')
    .order('updated_at', { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ workflows: data || [] });
}

// POST — créer ou mettre à jour un workflow
export async function POST(request: Request) {
  const body = await request.json();
  const { id, name, entity, steps, status } = body;

  const supabase = getSupabase();

  if (id) {
    // UPDATE existant
    const { data, error } = await supabase
      .from('workflows')
      .update({ name, entity, steps, status, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(data);
  }

  // INSERT nouveau
  const { data, error } = await supabase
    .from('workflows')
    .insert({ name: name || 'Nouvelle chaîne', entity, steps: steps || [], status: 'draft' })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
}

// DELETE — supprimer un workflow
export async function DELETE(request: Request) {
  const { id } = await request.json();

  const supabase = getSupabase();
  const { error } = await supabase.from('workflows').delete().eq('id', id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ deleted: true });
}
