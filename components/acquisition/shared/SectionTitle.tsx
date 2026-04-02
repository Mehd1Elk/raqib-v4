'use client';
import { C, GR, MN } from './constants';

export function SectionTitle({ title, count }: { title: string; count?: number }) {
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 16 }}>
      <h2 style={{ fontFamily: GR, fontSize: 18, fontStyle: 'italic', fontWeight: 700, color: C.t1, margin: 0 }}>
        {title}
      </h2>
      {count !== undefined && (
        <span style={{ fontFamily: MN, fontSize: 9, color: C.t3, letterSpacing: 1 }}>
          {count} ENTRÉES
        </span>
      )}
    </div>
  );
}
