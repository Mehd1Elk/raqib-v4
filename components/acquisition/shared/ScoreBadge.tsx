'use client';
import { C, MN } from './constants';

export function ScoreBadge({ score }: { score: number }) {
  const color = score >= 9 ? C.emerald : score >= 7 ? C.accent : score >= 5 ? C.yrknown : C.ruby;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      width: 30, height: 20, borderRadius: 0, fontSize: 11, fontFamily: MN,
      fontWeight: 600, color, background: `${color}0D`, border: `0.5px solid ${color}30`,
    }}>
      {score}
    </span>
  );
}
