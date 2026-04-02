'use client';

import Link from 'next/link';
import type { DiwaneCountry } from '../../lib/diwane/types';
import { FlagIcon } from '../corridor/FlagIcon';
import { getMarketRankLabel, getMarketRankClass } from '../../lib/diwane/utils';

interface CountryArtCardProps {
  country: DiwaneCountry;
}

export function CountryArtCard({ country: c }: CountryArtCardProps) {
  const topArtist = c.topArtists?.[0];
  return (
    <Link href={`/diwane/${c.id}`} style={{ textDecoration: 'none' }}>
      <div className="country-card">
        <div className="country-card-header">
          <FlagIcon code={c.id} size={48} />
          <div>
            <div className="country-card-name">{c.name}</div>
            <div className="country-card-region">
              {c.region === 'africa' ? (
                <span className="africa-tag">Afrique</span>
              ) : (
                <span className="eu-tag">Union Européenne</span>
              )}
            </div>
          </div>
        </div>
        <div className="country-card-stats">
          <div className="country-card-stat">
            <div className="country-card-stat-label">Marché art</div>
            <div className="country-card-stat-value">{c.artMarket.marketSize || 'N/A'}</div>
          </div>
          <div className="country-card-stat">
            <div className="country-card-stat-label">Rang</div>
            <div className="country-card-stat-value">
              <span className={`rank-badge ${getMarketRankClass(c.artMarket.globalRank)}`}>
                {getMarketRankLabel(c.artMarket.globalRank)}
              </span>
            </div>
          </div>
          <div className="country-card-stat">
            <div className="country-card-stat-label">Top artiste</div>
            <div className="country-card-stat-value" style={{ fontSize: '0.75rem' }}>
              {topArtist ? topArtist.name : 'N/A'}
            </div>
          </div>
          <div className="country-card-stat">
            <div className="country-card-stat-label">Galeries</div>
            <div className="country-card-stat-value">{c.artMarket.galleryCount || 'N/A'}</div>
          </div>
        </div>
      </div>
    </Link>
  );
}
