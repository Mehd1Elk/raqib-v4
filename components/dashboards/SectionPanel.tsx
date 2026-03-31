import type { ReactNode } from 'react';

interface Props {
  id: string;
  title: string;
  children: ReactNode;
}

export function SectionPanel({ id, title, children }: Props) {
  return (
    <section id={id} className="bg-ivory border border-div rounded overflow-hidden">
      <div className="px-5 py-3 border-b border-div">
        <span className="text-[10px] font-[family-name:var(--font-jetbrains)] text-gold tracking-[1px] font-bold uppercase">
          {title}
        </span>
      </div>
      <div className="p-5">{children}</div>
    </section>
  );
}
