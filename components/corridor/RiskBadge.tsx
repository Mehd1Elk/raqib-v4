'use client';

import { getRiskClass } from '../../lib/corridor/utils';

interface RiskBadgeProps {
  score: number;
}

export function RiskBadge({ score }: RiskBadgeProps) {
  const cls = getRiskClass(score);
  return (
    <span className={`risk-score ${cls}`}>
      <span className={`risk-dot ${cls}`} />
      {score}/10
    </span>
  );
}
