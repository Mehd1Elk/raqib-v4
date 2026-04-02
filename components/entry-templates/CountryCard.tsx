import { TrendingUp, Users, Wifi } from 'lucide-react';

export default function CountryCard({ data }: { data: Record<string, any> }) {
  const pib = data.PIB_MEUR || data.valeur || data.pib;
  const formatted = pib
    ? pib > 1000000
      ? `${(pib / 1000000).toFixed(1)}T €`
      : pib > 1000
        ? `${(pib / 1000).toFixed(1)}B €`
        : `${pib}M €`
    : '—';

  return (
    <div data-card className="bg-[#FAF8FC] border border-[rgba(30,10,32,0.08)] rounded-none-none p-4">
      <div className="flex items-center justify-between mb-3">
        <div>
          <div className="font-[family-name:var(--font-cormorant)] text-[16px] font-bold italic text-[#1E0A20]">
            {data.pays || data.country || ''}
          </div>
          <div className="font-[family-name:var(--font-jetbrains)] text-[8px] text-[rgba(30,10,32,0.60)]">
            {data.code_pays || data.code || ''} · {data.année || data.year || ''}
          </div>
        </div>
        <div className="font-[family-name:var(--font-cormorant)] text-[22px] font-bold text-[#1E0A20]">
          {formatted}
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {data.croissance && (
          <div className="text-center p-2 bg-[#F5F2F8] rounded-none">
            <TrendingUp size={12} className="mx-auto text-[#3D7C5E] mb-1" />
            <div className="font-[family-name:var(--font-jetbrains)] text-[10px] font-bold text-[#1E0A20]">{data.croissance}%</div>
            <div className="font-[family-name:var(--font-jetbrains)] text-[7px] text-[rgba(30,10,32,0.60)]">Croissance</div>
          </div>
        )}
        {data.population && (
          <div className="text-center p-2 bg-[#F5F2F8] rounded-none">
            <Users size={12} className="mx-auto text-[#3D5E8C] mb-1" />
            <div className="font-[family-name:var(--font-jetbrains)] text-[10px] font-bold text-[#1E0A20]">{(data.population / 1e6).toFixed(1)}M</div>
            <div className="font-[family-name:var(--font-jetbrains)] text-[7px] text-[rgba(30,10,32,0.60)]">Population</div>
          </div>
        )}
        {data.internet && (
          <div className="text-center p-2 bg-[#F5F2F8] rounded-none">
            <Wifi size={12} className="mx-auto text-[#7B5EA7] mb-1" />
            <div className="font-[family-name:var(--font-jetbrains)] text-[10px] font-bold text-[#1E0A20]">{data.internet}%</div>
            <div className="font-[family-name:var(--font-jetbrains)] text-[7px] text-[rgba(30,10,32,0.60)]">Internet</div>
          </div>
        )}
      </div>
    </div>
  );
}
