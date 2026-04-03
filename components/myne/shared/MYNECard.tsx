'use client';

import { useState, ReactNode, CSSProperties } from 'react';
import { M } from './constants';

interface MYNECardProps {
  children: ReactNode;
  style?: CSSProperties;
  hover?: boolean;
}

export default function MYNECard({ children, style = {}, hover = false }: MYNECardProps) {
  const [h, setH] = useState(false);
  return (
    <div
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        background: M.bgCard,
        border: `1px solid ${h && hover ? M.gold + '60' : M.border}`,
        borderRadius: 14,
        padding: 24,
        transition: 'border-color 0.3s, transform 0.3s',
        transform: h && hover ? 'translateY(-2px)' : 'none',
        ...style,
      }}
    >
      {children}
    </div>
  );
}
