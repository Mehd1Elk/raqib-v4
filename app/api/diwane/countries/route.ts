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
    region: c.region,
    marketSize: c.marketSize || null,
    artistCount: c.artists?.length || 0,
    galleryCount: c.galleries?.length || 0,
    museumCount: c.museums?.length || 0,
    topArtist: c.artists?.[0]?.name || null,
  }));

  return NextResponse.json({ data, total: data.length });
}
