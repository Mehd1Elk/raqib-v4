// @ts-nocheck
import { NextResponse } from 'next/server';
import { ALL_COUNTRIES } from '../../../../lib/diwane/data';

function getIndicatorValue(country: any, key: string): string {
  switch (key) {
    case 'marketSize': return country.marketSize || 'N/A';
    case 'artists': return country.artists?.length?.toString() || '0';
    case 'galleries': return country.galleries?.length?.toString() || '0';
    case 'museums': return country.museums?.length?.toString() || '0';
    case 'fairs': return country.artFairs?.length?.toString() || '0';
    case 'auctionHouses': return country.auctionHouses?.length?.toString() || '0';
    case 'topArtist': return country.artists?.[0]?.name || 'N/A';
    case 'collectors': return country.collectors?.length?.toString() || '0';
    case 'vatRate': return country.regulation?.vatRate || 'N/A';
    default: return 'N/A';
  }
}

const INDICATORS = [
  { id: 'marketSize', label: 'Taille du marché' },
  { id: 'artists', label: 'Artistes' },
  { id: 'galleries', label: 'Galeries' },
  { id: 'museums', label: 'Musées' },
  { id: 'fairs', label: 'Foires' },
  { id: 'auctionHouses', label: 'Maisons d\'enchères' },
  { id: 'topArtist', label: 'Top artiste' },
  { id: 'collectors', label: 'Collectionneurs' },
  { id: 'vatRate', label: 'TVA art' },
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const ids = (searchParams.get('ids') || 'MA,NG,FR').split(',').map(s => s.trim().toUpperCase());

  const countries = ids
    .map(id => ALL_COUNTRIES.find(c => c.id === id))
    .filter(Boolean);

  const comparison = INDICATORS.map(ind => {
    const row: Record<string, string> = { indicator: ind.label };
    countries.forEach(c => {
      row[c.id] = getIndicatorValue(c, ind.id);
    });
    return row;
  });

  return NextResponse.json({
    countries: countries.map(c => ({ id: c.id, name: c.name, region: c.region })),
    comparison,
  });
}
