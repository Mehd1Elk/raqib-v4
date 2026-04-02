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
    nameAr: c.nameAr,
    region: c.region,
    capital: c.capital,
    marketSize: c.artMarket.marketSize,
    globalRank: c.artMarket.globalRank,
    galleryCount: c.artMarket.galleryCount,
    museumCount: c.artMarket.museumCount,
    topArtist: c.topArtists?.[0]?.name || null,
    recommendation: c.recommendation,
  }));

  return NextResponse.json({ data, total: data.length });
}
