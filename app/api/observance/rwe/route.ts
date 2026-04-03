import { createClient } from '@/lib/supabase/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const data_category = searchParams.get('data_category');
  const buyer = searchParams.get('buyer');

  try {
    const supabase = await createClient();
    let query = (supabase as any).from('obs_rwe_pricing').select('*');

    if (data_category) query = query.eq('data_category', data_category);
    if (buyer) query = query.eq('buyer', buyer);

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching obs_rwe_pricing:', error);
      return Response.json({ error: error.message }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    console.error('Exception fetching obs_rwe_pricing:', error);
    return Response.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
