import { NextResponse } from 'next/server';
import { ALL_COUNTRIES, GLOBAL_DATA } from '../../../../lib/diwane/data';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const country = searchParams.get('country');

  // Country-specific auction records
  if (country) {
    const c = ALL_COUNTRIES.find(x => x.id === country.toUpperCase());
    if (!c) return NextResponse.json({ error: 'Country not found' }, { status: 404 });
    return NextResponse.json({ data: c.auctionRecords || [], country: c.name });
  }

  // Global top auctions
  return NextResponse.json({ data: GLOBAL_DATA.topAuctions });
}
