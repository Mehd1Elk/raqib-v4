// @ts-nocheck
import { NextResponse } from 'next/server';
import { ALL_COUNTRIES } from '../../../../lib/diwane/data';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const country = searchParams.get('country');

  let artists = ALL_COUNTRIES.flatMap(c =>
    (c.artists || []).map(a => ({ ...a, countryId: c.id, countryName: c.name }))
  );

  if (country) {
    artists = artists.filter(a => a.countryId === country.toUpperCase());
  }

  return NextResponse.json({ data: artists, total: artists.length });
}
