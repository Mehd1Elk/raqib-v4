import { MapPin, Building2, Award } from 'lucide-react';

export default function ContactCard({ data }: { data: Record<string, any> }) {
  return (
    <div data-card className="bg-[#FDFAF3] border border-[rgba(60,52,40,0.10)] rounded-lg p-4 flex gap-4">
      {/* Avatar initiales */}
      <div className="w-12 h-12 rounded-full bg-[#B8963E15] border border-[#B8963E30] flex items-center justify-center flex-shrink-0">
        <span className="font-[family-name:var(--font-cormorant)] text-[16px] font-bold italic text-[#B8963E]">
          {(data.nom || data.name || '?')[0]}{(data.prénom || '')[0] || ''}
        </span>
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-[family-name:var(--font-cormorant)] text-[14px] font-bold italic text-[#1C1814] truncate">
          {data.prénom || ''} {data.nom || data.name || 'Inconnu'}
        </div>
        {(data.spécialité || data.fonction || data.titre) && (
          <div className="font-[family-name:var(--font-noto)] text-[10px] text-[#B8963E] mt-0.5">
            {data.spécialité || data.fonction || data.titre}
          </div>
        )}
        <div className="flex items-center gap-3 mt-2 flex-wrap">
          {(data.ville || data.city) && (
            <span className="flex items-center gap-1 font-[family-name:var(--font-jetbrains)] text-[8px] text-[#918977]">
              <MapPin size={10} strokeWidth={1.5} /> {data.ville || data.city}
            </span>
          )}
          {(data.département || data.pays || data.country) && (
            <span className="flex items-center gap-1 font-[family-name:var(--font-jetbrains)] text-[8px] text-[#918977]">
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
