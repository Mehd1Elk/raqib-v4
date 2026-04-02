import { MapPin, Building2, Award } from 'lucide-react';

export default function ContactCard({ data }: { data: Record<string, any> }) {
  return (
    <div data-card className="bg-[#FAF8FC] border border-[rgba(30,10,32,0.08)] rounded-none-none p-4 flex gap-4">
      {/* Avatar initiales */}
      <div className="w-12 h-12 rounded-none-full bg-[#1E0A2015] border border-[#1E0A2030] flex items-center justify-center flex-shrink-0">
        <span className="font-[family-name:var(--font-cormorant)] text-[16px] font-bold italic text-[#1E0A20]">
          {(data.nom || data.name || '?')[0]}{(data.prénom || '')[0] || ''}
        </span>
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-[family-name:var(--font-cormorant)] text-[14px] font-bold italic text-[#1E0A20] truncate">
          {data.prénom || ''} {data.nom || data.name || 'Inconnu'}
        </div>
        {(data.spécialité || data.fonction || data.titre) && (
          <div className="font-[family-name:var(--font-noto)] text-[10px] text-[#1E0A20] mt-0.5">
            {data.spécialité || data.fonction || data.titre}
          </div>
        )}
        <div className="flex items-center gap-3 mt-2 flex-wrap">
          {(data.ville || data.city) && (
            <span className="flex items-center gap-1 font-[family-name:var(--font-jetbrains)] text-[8px] text-[rgba(30,10,32,0.60)]">
              <MapPin size={10} strokeWidth={1.5} /> {data.ville || data.city}
            </span>
          )}
          {(data.département || data.pays || data.country) && (
            <span className="flex items-center gap-1 font-[family-name:var(--font-jetbrains)] text-[8px] text-[rgba(30,10,32,0.60)]">
              <Building2 size={10} strokeWidth={1.5} /> {data.département || data.pays || data.country}
            </span>
          )}
          {data.h_index && (
            <span className="flex items-center gap-1 font-[family-name:var(--font-jetbrains)] text-[8px] text-[#3D7C5E]">
              <Award size={10} strokeWidth={1.5} /> h-index: {data.h_index}
            </span>
          )}
        </div>
        {data.email && (
          <a href={`mailto:${data.email}`} className="font-[family-name:var(--font-jetbrains)] text-[8px] text-[#3D5E8C] hover:underline mt-1 inline-block">
            {data.email}
          </a>
        )}
      </div>
    </div>
  );
}
