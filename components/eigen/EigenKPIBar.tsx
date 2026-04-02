import React from 'react';

export function EigenKPIBar({
  label,
  value,
  icon,
  trend,
  trendValue,
  color,
  onClick,
}: {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  color: 'gold' | 'emerald' | 'red';
  onClick?: () => void;
}) {
  const colorMap = {
    gold: '#1E0A20',
    emerald: '#3D7C5E',
    red: '#C64F4F',
  };

  const trendColorMap = {
    up: '#3D7C5E',
    down: '#C64F4F',
    neutral: 'rgba(30,10,32,0.60)',
  };

  const trendIconMap = {
    up: '↑',
    down: '↓',
    neutral: '→',
  };

  const borderColor = colorMap[color] || colorMap.gold;

  return (
    <div
      onClick={onClick}
      className={`h-[80px] flex-1 bg-[#FAF8FC] border border-[rgba(30,10,32,0.35)] flex flex-col justify-center px-4 relative overflow-hidden transition-all duration-200 ${
        onClick ? 'cursor-pointer hover:bg-[#F2EFE8] hover:shadow-sm hover:-translate-y-[1px]' : ''
      }`}
      style={{ borderLeft: `3px solid ${borderColor}` }}
    >
      <div className="flex items-center gap-2 mb-1">
        <span className="text-[16px] flex items-center">{icon}</span>
        <span className="font-[family-name:var(--font-cormorant)] text-[28px] font-bold text-black leading-none">
          {value}
        </span>
      </div>
      
      <div className="flex items-center justify-between">
        <span className="font-[family-name:var(--font-jetbrains)] text-[9px] text-[rgba(30,10,32,0.60)] uppercase tracking-wider">
          {label}
        </span>
        
        {trend && trendValue && (
          <span
            className="font-[family-name:var(--font-jetbrains)] text-[8px] flex items-center gap-0.5"
            style={{ color: trendColorMap[trend] }}
          >
            {trendIconMap[trend]} {trendValue}
          </span>
        )}
      </div>
    </div>
  );
}
