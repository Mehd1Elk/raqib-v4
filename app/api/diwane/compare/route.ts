import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const idsParam = searchParams.get('ids');

  if (!idsParam) {
    return NextResponse.json({ error: 'Parameter "ids" is required (e.g. MA,NG,GH)' }, { status: 400 });
  }

  const ids = idsParam.split(',').map(id => id.trim());
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('diwane_countries')
    .select('*')
    .in('id', ids);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data });
}
