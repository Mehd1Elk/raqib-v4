import { NextResponse, NextRequest } from 'next/server';
import { createAcqClient } from '@/lib/acquisition/supabase';

export async function GET(req: NextRequest) {
  const supabase = await createAcqClient();
  const url = req.nextUrl.searchParams;
  const companyId = url.get('company_id');

  let query = supabase.from('acq_trojan_horses').select('*');
  if (companyId) query = query.eq('company_id', companyId);
  query = query.order('group_name');

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data || []);
}
