import { Scale } from 'lucide-react';

export default function RegulationCard({ data }: { data: Record<string, any> }) {
  return (
    <div data-card className="bg-[#FDFAF3] border border-[rgba(60,52,40,0.10)] rounded-none-none p-4 border-l-[3px]" style={{ borderLeftColor: '#3D5E8C' }}>
      <div className="flex items-start gap-3">
        <Scale size={16} className="text-[#3D5E8C] mt-0.5 flex-shrink-0" />
        <div>
          <div className="font-[family-name:var(--font-playfair)] text-[13px] font-bold  text-[#1C1814]">{data.loi || data.article || data.titre}</div>
          <div className="font-[family-name:var(--font-jetbrains)] text-[9px] text-[#918977] mt-0.5">{data.pays || ''} · {data.date_adoption || data.date || ''}</div>
          {data.sanctions_max && (
            <div className="font-[family-name:var(--font-jetbrains)] text-[9px] text-[#9C3D3D] mt-1">Sanctions max : {data.sanctions_max}</div>
          )}
          {data.pertinence_AELYA && (
            <div className="font-[family-name:var(--font-noto)] text-[9px] text-[#6B5E4C] mt-2 ">{data.pertinence_AELYA}</div>
          )}
        </div>
      </div>
    </div>
  );
}
