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
    <div data-card className="bg-[#FDFAF3] border border-[rgba(60,52,40,0.10)] rounded-none-none p-4">
      <div className="flex items-center justify-between mb-3">
        <div>
          <div className="font-[family-name:var(--font-playfair)] text-[16px] font-bold  text-[#1C1814]">
            {data.pays || data.country || ''}
          </div>
          <div className="font-[family-name:var(--font-jetbrains)] text-[8px] text-[#918977]">
            {data.code_pays || data.code || ''} · {data.année || data.year || ''}
          </div>
        </div>
        <div className="font-[family-name:var(--font-playfair)] text-[22px] font-bold text-[#B8963E]">
          {formatted}
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {data.croissance && (
          <div className="text-center p-2 bg-[#F7F3EA] rounded-none">
            <TrendingUp size={12} className="mx-auto text-[#3D7C5E] mb-1" />
            <div className="font-[family-name:var(--font-jetbrains)] text-[10px] font-bold text-[#1C1814]">{data.croissance}%</div>
            <div className="font-[family-name:var(--font-jetbrains)] text-[7px] text-[#918977]">Croissance</div>
          </div>
        )}
        {data.population && (
          <div className="text-center p-2 bg-[#F7F3EA] rounded-none">
            <Users size={12} className="mx-auto text-[#3D5E8C] mb-1" />
            <div className="font-[family-name:var(--font-jetbrains)] text-[10px] font-bold text-[#1C1814]">{(data.population / 1e6).toFixed(1)}M</div>
            <div className="font-[family-name:var(--font-jetbrains)] text-[7px] text-[#918977]">Population</div>
          </div>
        )}
        {data.internet && (
          <div className="text-center p-2 bg-[#F7F3EA] rounded-none">
            <Wifi size={12} className="mx-auto text-[#7B5EA7] mb-1" />
            <div className="font-[family-name:var(--font-jetbrains)] text-[10px] font-bold text-[#1C1814]">{data.internet}%</div>
            <div className="font-[family-name:var(--font-jetbrains)] text-[7px] text-[#918977]">Internet</div>
          </div>
        )}
      </div>
    </div>
  );
}
