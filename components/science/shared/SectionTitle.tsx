'use client';

import { C, GR, MN } from './constants';

export default function SectionTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <h2 style={{ fontFamily: GR, fontSize: 18, fontWeight: 700, fontStyle: 'italic', color: C.t1, margin: 0 }}>
        {title}
      </h2>
      {subtitle && (
        <p style={{ fontFamily: MN, fontSize: 8, color: C.t3, letterSpacing: 1.5, textTransform: 'uppercase', margin: '4px 0 0' }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
