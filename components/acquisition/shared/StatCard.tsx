'use client';
import { C, GR, MN, SN } from './constants';

export function StatCard({ label, value, sub, color = C.accent }: {
  label: string; value: string | number; sub?: string; color?: string;
}) {
  return (
    <div style={{
      background: C.nacre, border: `0.5px solid ${C.div}`, borderRadius: 0,
      padding: '18px 20px', minWidth: 140,
    }}>
      <div style={{ fontFamily: MN, fontSize: 9, letterSpacing: 3, color: C.t3, textTransform: 'uppercase', marginBottom: 8, fontWeight: 600 }}>
        {label}
      </div>
      <div style={{ fontFamily: GR, fontSize: 32, fontWeight: 400, color }}>
        {value}
      </div>
      {sub && (
        <div style={{ fontFamily: SN, fontSize: 11, color: C.t3, marginTop: 4 }}>{sub}</div>
      )}
    </div>
  );
}
