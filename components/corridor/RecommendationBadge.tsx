'use client';

import { getRecommendationClass, getRecommendationLabel } from '../../lib/corridor/utils';

interface RecommendationBadgeProps {
  recommendation: string;
}

export function RecommendationBadge({ recommendation }: RecommendationBadgeProps) {
  const cls = getRecommendationClass(recommendation);
  const label = getRecommendationLabel(recommendation);
  return (
    <span className={`reco-badge ${cls}`} title={recommendation}>
      {label}
    </span>
  );
}
