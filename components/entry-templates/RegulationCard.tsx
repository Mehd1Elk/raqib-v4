import { Scale } from 'lucide-react';

export default function RegulationCard({ data }: { data: Record<string, any> }) {
  return (
    <div data-card className="bg-[#FAF8FC] border border-[rgba(30,10,32,0.08)] rounded-none-none p-4 border-l-[3px]" style={{ borderLeftColor: '#3D5E8C' }}>
      <div className="flex items-start gap-3">
        <Scale size={16} className="text-[#3D5E8C] mt-0.5 flex-shrink-0" />
        <div>
          <div className="font-[family-name:var(--font-cormorant)] text-[13px] font-bold italic text-[#1E0A20]">{data.loi || data.article || data.titre}</div>
          <div className="font-[family-name:var(--font-jetbrains)] text-[9px] text-[rgba(30,10,32,0.60)] mt-0.5">{data.pays || ''} · {data.date_adoption || data.date || ''}</div>
          {data.sanctions_max && (
            <div className="font-[family-name:var(--font-jetbrains)] text-[9px] text-[#9C3D3D] mt-1">Sanctions max : {data.sanctions_max}</div>
          )}
          {data.pertinence_AELYA && (
            <div className="font-[family-name:var(--font-noto)] text-[9px] text-[rgba(30,10,32,0.60)] mt-2 italic">{data.pertinence_AELYA}</div>
          )}
        </div>
      </div>
    </div>
  );
}
