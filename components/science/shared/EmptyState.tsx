'use client';

import { C, GR, SN } from './constants';

export default function EmptyState({ icon, title, subtitle }: { icon: string; title: string; subtitle: string }) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      padding: '80px 40px', textAlign: 'center',
    }}>
      <span style={{ fontSize: 48, marginBottom: 16, opacity: 0.3 }}>{icon}</span>
      <div style={{ fontFamily: GR, fontSize: 18, fontWeight: 700, fontStyle: 'italic', color: C.t2, marginBottom: 8 }}>
        {title}
      </div>
      <div style={{ fontFamily: SN, fontSize: 12, color: C.t3, maxWidth: 400 }}>
        {subtitle}
      </div>
    </div>
  );
}
