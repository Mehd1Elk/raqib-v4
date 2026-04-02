import { NextResponse, NextRequest } from 'next/server';
import { createSciClient } from '@/lib/science/supabase';

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ brique: string }> }
) {
  const supabase = await createSciClient();
  const { brique } = await params;

  // Get papers for this brique, ordered by relevance
  const { data, error } = await supabase
    .from('sci_papers')
    .select('*')
    .eq('brique', brique)
    .order('relevance_score', { ascending: false })
    .order('year', { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data || []);
}
