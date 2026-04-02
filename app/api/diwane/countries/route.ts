// @ts-nocheck
import { NextResponse } from 'next/server';
import { ALL_COUNTRIES, AFRICA_COUNTRIES, EU_COUNTRIES_LIST } from '../../../../lib/diwane/data';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const region = searchParams.get('region');

  let countries = ALL_COUNTRIES;
  if (region === 'africa') countries = AFRICA_COUNTRIES;
  else if (region === 'eu') countries = EU_COUNTRIES_LIST;

  const data = countries.map(c => ({
    id: c.id,
    name: c.name,
    nameAr: (c as any).nameAr,
    region: c.region,
    capital: (c as any).capital,
    marketSize: (c as any).artMarket.marketSize,
    globalRank: (c as any).artMarket.globalRank,
    galleryCount: (c as any).artMarket.galleryCount,
    museumCount: (c as any).artMarket.museumCount,
    topArtist: c.artists?.[0]?.name || null,
    recommendation: c.recommendation,
  }));

  return NextResponse.json({ data, total: data.length });
}
