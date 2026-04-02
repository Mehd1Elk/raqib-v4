'use client';

import { ArrowRight, ArrowLeft, ArrowLeftRight } from 'lucide-react';

interface Bridge {
  entity: string;
  color: string;
  direction: 'in' | 'out' | 'both';
  label: string;
  description: string;
  txCodes?: string[];
}

interface BridgeLinksProps {
  bridges: Bridge[];
  title?: string;
}

const directionIcon = {
  in: ArrowLeft,
  out: ArrowRight,
  both: ArrowLeftRight,
};

export function BridgeLinks({ bridges, title = 'Ponts Inter-Entites' }: BridgeLinksProps) {
  return (
    <section>
      <h3 className="font-[family-name:var(--font-jetbrains)] text-[8px] uppercase tracking-[1.5px] text-t3 mb-4">
        {title}
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {bridges.map((b, i) => {
          const Icon = directionIcon[b.direction];
          return (
            <div
              key={i}
              className="group bg-[#1C1814] border border-div rounded-none-none p-4 hover:border-opacity-40 transition-all duration-300"
              style={{ borderColor: `${b.color}30` }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Icon size={14} style={{ color: b.color }} />
                <span
                  className="font-[family-name:var(--font-playfair)] text-sm font-semibold"
                  style={{ color: b.color }}
                >
                  {b.entity}
                </span>
                <span className="font-[family-name:var(--font-jetbrains)] text-[7px] text-t3 ml-auto uppercase tracking-[1px]">
                  {b.label}
                </span>
              </div>
              <p className="font-[family-name:var(--font-noto)] text-[10px] text-t2 leading-relaxed mb-3">
                {b.description}
              </p>
              {b.txCodes && b.txCodes.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-3">
                  {b.txCodes.map((code) => (
                    <span
                      key={code}
                      className="font-[family-name:var(--font-jetbrains)] text-[6px] px-1.5 py-0.5 rounded-none bg-[#2A2520] text-t3"
                    >
                      {code}
                    </span>
                  ))}
                </div>
              )}
              <button
                className="font-[family-name:var(--font-jetbrains)] text-[7px] uppercase tracking-[1.5px] px-3 py-1.5 rounded-none border transition-all duration-300 group-hover:opacity-100 opacity-70"
                style={{
                  borderColor: `${b.color}40`,
                  color: b.color,
                  background: `${b.color}08`,
                }}
              >
                Traverser →
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}
