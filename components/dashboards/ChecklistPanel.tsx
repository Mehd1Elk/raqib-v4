import { Check, Circle } from 'lucide-react';

interface Item {
  label: string;
  done: boolean;
  detail?: string;
}

interface Props {
  items: Item[];
}

export function ChecklistPanel({ items }: Props) {
  const done = items.filter((i) => i.done).length;

  return (
    <div className="space-y-2">
      <div className="text-[9px] font-[family-name:var(--font-jetbrains)] text-tm mb-3">
        {done} / {items.length} COMPLETS
      </div>
      {items.map((item, i) => (
        <div key={i} className="flex items-start gap-2.5 py-1">
          {item.done ? (
            <Check className="w-3.5 h-3.5 text-emerald mt-0.5 shrink-0" />
          ) : (
            <Circle className="w-3.5 h-3.5 text-sand mt-0.5 shrink-0" />
          )}
          <div>
            <div
              className={`text-[11px] font-[family-name:var(--font-noto)] ${
                item.done ? 'text-t3 line-through' : 'text-t1'
              }`}
            >
              {item.label}
            </div>
            {item.detail && (
              <div className="text-[9px] font-[family-name:var(--font-jetbrains)] text-tm mt-0.5">
                {item.detail}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
