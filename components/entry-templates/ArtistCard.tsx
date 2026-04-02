export default function ArtistCard({ data }: { data: Record<string, any> }) {
  return (
    <div data-card className="bg-[#FDFAF3] border border-[rgba(60,52,40,0.10)] rounded-none-none p-4">
      <div className="font-[family-name:var(--font-playfair)] text-[16px] font-bold  text-[#1C1814]">{data.artiste || data.nom}</div>
      <div className="font-[family-name:var(--font-noto)] text-[10px] text-[#B8963E] mt-0.5">{data.mouvement || ''} · {data.période || ''}</div>
      <div className="font-[family-name:var(--font-jetbrains)] text-[8px] text-[#918977] mt-1">{data.médiums || ''}</div>
      {data.cote_enchères_max_USD && (
        <div className="mt-2 font-[family-name:var(--font-playfair)] text-[18px] font-bold text-[#B8963E]">
          ${Number(data.cote_enchères_max_USD).toLocaleString()}
        </div>
      )}
      {data.collection_Eigen && (
        <div className="mt-1 font-[family-name:var(--font-jetbrains)] text-[8px] text-[#3D7C5E]">Collection Eigen</div>
      )}
    </div>
  );
}
