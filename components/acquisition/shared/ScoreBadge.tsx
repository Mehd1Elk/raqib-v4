'use client';
import { C, MN } from './constants';

export function ScoreBadge({ score }: { score: number }) {
  const color = score >= 9 ? C.emerald : score >= 7 ? C.gold : score >= 5 ? C.yrknown : C.ruby;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      width: 28, height: 18, borderRadius: 2, fontSize: 10, fontFamily: MN,
      fontWeight: 700, color, background: `${color}15`, border: `1px solid ${color}30`,
    }}>
      {score}
    </span>
  );
}
