'use client';

import { useEffect, useRef, useState } from 'react';

interface GaugeKPIProps {
  value: number;
  target: number;
  label: string;
  color?: string;
  unit?: string;
}

export function GaugeKPI({ value, target, label, color, unit = '' }: GaugeKPIProps) {
  const [animatedValue, setAnimatedValue] = useState(0);
  const ref = useRef<SVGSVGElement>(null);

  const pct = target > 0 ? Math.min((value / target) * 100, 100) : 0;
  const statusColor =
    color ?? (pct >= 90 ? '#3D7C5E' : pct >= 60 ? '#B8963E' : '#A0522D');

  const size = 96;
  const stroke = 6;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    let raf: number;
    const start = performance.now();
    const duration = 900;
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - t, 3);
      setAnimatedValue(ease * pct);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [pct]);

  const offset = circumference - (animatedValue / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-1">
      <svg ref={ref} width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Background arc */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#2A2520"
          strokeWidth={stroke}
          strokeLinecap="round"
        />
        {/* Progress arc */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={statusColor}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          style={{ transition: 'stroke 0.3s' }}
        />
        {/* Value text */}
        <text
          x={size / 2}
          y={size / 2 + 1}
          textAnchor="middle"
          dominantBaseline="central"
          className="font-[family-name:var(--font-playfair)]"
          style={{ fontSize: '18px', fill: statusColor, fontWeight: 600 }}
        >
          {typeof value === 'number' && value >= 1000
            ? `${(value / 1000).toFixed(1)}k`
            : value}
          {unit}
        </text>
      </svg>
      <span
        className="font-[family-name:var(--font-jetbrains)] uppercase tracking-[1px] text-t3 text-center"
        style={{ fontSize: '7px' }}
      >
        {label}
      </span>
    </div>
  );
}
