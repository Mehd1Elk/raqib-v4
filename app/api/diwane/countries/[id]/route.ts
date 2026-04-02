import { NextResponse } from 'next/server';
import { ALL_COUNTRIES } from '../../../../../lib/diwane/data';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const country = ALL_COUNTRIES.find(c => c.id === id.toUpperCase());

  if (!country) {
    return NextResponse.json({ error: 'Country not found' }, { status: 404 });
  }

  return NextResponse.json({ data: country });
}
