'use client';
import { C, GR, MN } from './constants';

export function SectionTitle({ title, count }: { title: string; count?: number }) {
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 16 }}>
      <h2 style={{
        fontFamily: GR, fontSize: 22, fontWeight: 400, color: C.t1, margin: 0,
        textTransform: 'uppercase', letterSpacing: 4,
      }}>
        {title}
      </h2>
      {count !== undefined && (
        <span style={{ fontFamily: MN, fontSize: 9, color: C.t3, letterSpacing: 3, fontWeight: 600 }}>
          {count} ENTRÉES
        </span>
      )}
    </div>
  );
}
