'use client';

import { MN } from './constants';

export default function Pill({ label, color }: { label: string; color: string }) {
  return (
    <span style={{
      display: 'inline-block', borderRadius: 2, fontSize: 9, fontFamily: MN,
      padding: '2px 6px', border: `1px solid ${color}40`,
      color, background: `${color}15`, letterSpacing: 0.5,
      fontWeight: 600, textTransform: 'uppercase', whiteSpace: 'nowrap',
    }}>
      {label}
    </span>
  );
}
