import { NextResponse } from 'next/server';
import { ALL_COUNTRIES, COMPARISON_INDICATORS } from '../../../../lib/diwane/data';
import type { DiwaneCountry } from '../../../../lib/diwane/types';

function getIndicatorValue(country: DiwaneCountry, key: string): string {
  switch (key) {
    case 'marketSize': return country.artMarket.marketSize || 'N/A';
    case 'globalRank': return country.artMarket.globalRank ? `#${country.artMarket.globalRank}` : 'N/A';
    case 'galleryCount': return country.artMarket.galleryCount?.toString() || 'N/A';
    case 'museumCount': return country.artMarket.museumCount?.toString() || 'N/A';
    case 'artFairsCount': return country.artMarket.artFairsCount?.toString() || 'N/A';
    case 'auctionVolume': return country.artMarket.auctionVolume || 'N/A';
    case 'publicFunding': return country.artMarket.publicFunding || 'N/A';
    case 'taxIncentives': return country.artMarket.taxIncentives || 'N/A';
    case 'unescoSites': return country.culturalHeritage?.unescoSites?.toString() || 'N/A';
    case 'topArtist': return country.topArtists?.[0]?.name || 'N/A';
    default: return 'N/A';
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const ids = (searchParams.get('ids') || 'MA,NG,FR').split(',').map(s => s.trim().toUpperCase());

  const countries = ids
    .map(id => ALL_COUNTRIES.find(c => c.id === id))
    .filter(Boolean) as DiwaneCountry[];

  const comparison = COMPARISON_INDICATORS.map(ind => {
    const row: Record<string, string> = { indicator: ind.label };
    countries.forEach(c => {
      row[c.id] = getIndicatorValue(c, ind.key);
    });
    return row;
  });

  return NextResponse.json({
    countries: countries.map(c => ({ id: c.id, name: c.name, region: c.region })),
    comparison,
  });
}
