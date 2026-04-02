'use client';
import { MN } from './constants';

export function Pill({ label, color = '#918977' }: { label: string; color?: string }) {
  return (
    <span style={{
      display: 'inline-block', padding: '2px 6px', borderRadius: 2,
      fontSize: 9, fontFamily: MN, fontWeight: 600,
      color, border: `1px solid ${color}40`, background: `${color}12`,
      letterSpacing: 0.5, whiteSpace: 'nowrap',
    }}>
      {label}
    </span>
  );
}
