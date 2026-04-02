// @ts-nocheck
'use client';

import type { DiwaneArtist } from '../../lib/diwane/types';

interface ArtistCardProps {
  artist: DiwaneArtist;
  countryName?: string;
}

export function ArtistCard({ artist: a, countryName }: ArtistCardProps) {
  return (
    <div className="artist-card">
      <div className="artist-name">{a.name}</div>
      <div className="artist-medium">{a.medium}</div>
      {a.movement && <div className="artist-movement">{a.movement}</div>}
      {a.auctionRecord && (
        <div className="artist-record">
          Record: {a.auctionRecord}
        </div>
      )}
      {a.significance && (
        <div style={{ fontSize: '0.6rem', color: 'var(--text-muted)', marginTop: '0.25rem', lineHeight: '1.3' }}>
          {a.significance.length > 120 ? a.significance.substring(0, 120) + '...' : a.significance}
        </div>
      )}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem' }}>
        <span style={{ fontSize: '0.6rem', color: 'var(--text-faint)' }}>
          {a.born}{a.died ? ` — ${a.died}` : ''}
        </span>
        {countryName && (
          <span style={{ fontSize: '0.6rem', color: 'var(--camel)' }}>{countryName}</span>
        )}
      </div>
    </div>
  );
}
