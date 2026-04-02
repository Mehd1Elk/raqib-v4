import { NextResponse } from 'next/server';
import { ALL_COUNTRIES } from '../../../../lib/diwane/data';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const country = searchParams.get('country');

  let galleries = ALL_COUNTRIES.flatMap(c =>
    (c.galleries || []).map(g => ({ ...g, countryId: c.id, countryName: c.name }))
  );

  if (country) {
    galleries = galleries.filter(g => g.countryId === country.toUpperCase());
  }

  return NextResponse.json({ data: galleries, total: galleries.length });
}
