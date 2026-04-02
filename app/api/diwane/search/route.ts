// @ts-nocheck
import { NextResponse } from 'next/server';
import { SEARCH_INDEX } from '../../../../lib/diwane/data';
import { filterDiwaneSearch } from '../../../../lib/diwane/utils';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q') || '';

  if (q.length < 2) {
    return NextResponse.json({ data: [], query: q });
  }

  const results = filterDiwaneSearch(SEARCH_INDEX, q);
  return NextResponse.json({ data: results, query: q, total: results.length });
}
