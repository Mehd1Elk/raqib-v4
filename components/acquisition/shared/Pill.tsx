'use client';
import { MN } from './constants';

export function Pill({ label, color = 'rgba(30,10,32,0.35)' }: { label: string; color?: string }) {
  return (
    <span style={{
      display: 'inline-block', padding: '3px 10px', borderRadius: 0,
      fontSize: 9, fontFamily: MN, fontWeight: 600,
      color, border: `0.5px solid ${color}40`, background: `${color}0D`,
      letterSpacing: 1, whiteSpace: 'nowrap', textTransform: 'uppercase',
    }}>
      {label}
    </span>
  );
}
