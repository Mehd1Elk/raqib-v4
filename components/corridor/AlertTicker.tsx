'use client';

import type { Alert } from '../../lib/corridor/types';

interface AlertTickerProps {
  alerts: Alert[];
}

export function AlertTicker({ alerts }: AlertTickerProps) {
  const items = [...alerts, ...alerts];
  return (
    <div className="ticker-container">
      <div className="ticker">
        {items.map((a, i) => (
          <div key={i} className={`ticker-item alert-${a.level}`}>
            <span className="ticker-dot" />
            {a.text}
          </div>
        ))}
      </div>
    </div>
  );
}
