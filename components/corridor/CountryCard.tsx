'use client';

import Link from 'next/link';
import type { Country } from '../../lib/corridor/types';
import { FlagIcon } from './FlagIcon';
import { RiskBadge } from './RiskBadge';

interface CountryCardProps {
  country: Country;
}

export function CountryCard({ country: c }: CountryCardProps) {
  return (
    <Link href={`/corridor/${c.id}`} style={{ textDecoration: 'none' }}>
      <div className="country-card">
        <div className="country-card-header">
          <FlagIcon code={c.id} size={48} />
          <div>
            <div className="country-card-name">{c.name}</div>
            <div className="country-card-region">
              {c.region === 'africa' ? (
                <span className="africa-tag">Corridor Afrique</span>
              ) : (
                <span className="eu-tag">Union Européenne</span>
              )}
            </div>
          </div>
        </div>
        <div className="country-card-stats">
          <div className="country-card-stat">
            <div className="country-card-stat-label">Population</div>
            <div className="country-card-stat-value">{c.population || 'N/A'}</div>
          </div>
          <div className="country-card-stat">
            <div className="country-card-stat-label">PIB</div>
            <div className="country-card-stat-value">{c.gdpNominal || c.gdpPPP || 'N/A'}</div>
          </div>
          <div className="country-card-stat">
            <div className="country-card-stat-label">Risque RAQIB</div>
            <div className="country-card-stat-value">
              <RiskBadge score={c.riskScore} />
            </div>
          </div>
          <div className="country-card-stat">
            <div className="country-card-stat-label">Monnaie</div>
            <div className="country-card-stat-value">{c.currency ? c.currency.split('(')[0].trim() : 'N/A'}</div>
          </div>
        </div>
      </div>
    </Link>
  );
}
