import { DollarSign, MapPin, Calendar } from 'lucide-react';

export default function StartupCard({ data }: { data: Record<string, any> }) {
  return (
    <div data-card className="bg-[#FAF8FC] border border-[rgba(30,10,32,0.08)] rounded-none-none p-4">
      <div className="flex items-center justify-between mb-2">
        <div className="font-[family-name:var(--font-cormorant)] text-[14px] font-bold italic">{data.nom || data.name || data.entreprise}</div>
        {data.valorisation && (
          <span className="font-[family-name:var(--font-jetbrains)] text-[9px] px-2 py-0.5 bg-[#1E0A2015] text-[#1E0A20] rounded-none">
            {data.valorisation}
          </span>
        )}
      </div>
      <div className="font-[family-name:var(--font-noto)] text-[10px] text-[rgba(30,10,32,0.60)] mb-2">{data.secteur || data.description || ''}</div>
      <div className="flex items-center gap-3 flex-wrap">
        {data.levée && (
          <span className="flex items-center gap-1 font-[family-name:var(--font-jetbrains)] text-[8px] text-[#3D7C5E]">
            <DollarSign size={10} /> {data.levée}
          </span>
        )}
        {data.pays && (
          <span className="flex items-center gap-1 font-[family-name:var(--font-jetbrains)] text-[8px] text-[rgba(30,10,32,0.60)]">
            <MapPin size={10} /> {data.pays}
          </span>
        )}
        {data.fondateur && (
          <span className="flex items-center gap-1 font-[family-name:var(--font-jetbrains)] text-[8px] text-[rgba(30,10,32,0.60)]">
            <Calendar size={10} /> {data.fondateur}
          </span>
        )}
      </div>
    </div>
  );
}
