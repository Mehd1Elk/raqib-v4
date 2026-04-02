'use client';

import { C, GR, MN } from './constants';

export default function StatCard({ label, value, accent }: { label: string; value: string | number; accent?: string }) {
  return (
    <div style={{
      background: C.cream, borderRadius: 6, padding: '16px 20px',
      border: `1px solid ${C.div}`, minWidth: 140,
    }}>
      <div style={{ fontFamily: MN, fontSize: 8, color: C.t3, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 6 }}>
        {label}
      </div>
      <div style={{ fontFamily: GR, fontSize: 28, fontWeight: 700, fontStyle: 'italic', color: accent || C.t1 }}>
        {value}
      </div>
    </div>
  );
}
