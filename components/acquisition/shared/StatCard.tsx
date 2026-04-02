'use client';
import { C, GR, MN, SN } from './constants';

export function StatCard({ label, value, sub, color = C.gold }: {
  label: string; value: string | number; sub?: string; color?: string;
}) {
  return (
    <div style={{
      background: C.ivory, border: `1px solid ${C.div}`, borderRadius: 3,
      padding: '16px 20px', minWidth: 140,
    }}>
      <div style={{ fontFamily: MN, fontSize: 8, letterSpacing: 1.5, color: C.t3, textTransform: 'uppercase', marginBottom: 6 }}>
        {label}
      </div>
      <div style={{ fontFamily: GR, fontSize: 28, fontWeight: 700, fontStyle: 'italic', color }}>
        {value}
      </div>
      {sub && (
        <div style={{ fontFamily: SN, fontSize: 10, color: C.t3, marginTop: 4 }}>{sub}</div>
      )}
    </div>
  );
}
