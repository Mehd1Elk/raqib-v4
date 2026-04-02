export default function ArtistCard({ data }: { data: Record<string, any> }) {
  return (
    <div data-card className="bg-[#FAF8FC] border border-[rgba(30,10,32,0.08)] rounded-none-none p-4">
      <div className="font-[family-name:var(--font-cormorant)] text-[16px] font-bold italic text-[#1E0A20]">{data.artiste || data.nom}</div>
      <div className="font-[family-name:var(--font-noto)] text-[10px] text-[#1E0A20] mt-0.5">{data.mouvement || ''} · {data.période || ''}</div>
      <div className="font-[family-name:var(--font-jetbrains)] text-[8px] text-[rgba(30,10,32,0.60)] mt-1">{data.médiums || ''}</div>
      {data.cote_enchères_max_USD && (
        <div className="mt-2 font-[family-name:var(--font-cormorant)] text-[18px] font-bold text-[#1E0A20]">
          ${Number(data.cote_enchères_max_USD).toLocaleString()}
        </div>
      )}
      {data.collection_Eigen && (
        <div className="mt-1 font-[family-name:var(--font-jetbrains)] text-[8px] text-[#3D7C5E]">Collection Eigen</div>
      )}
    </div>
  );
}
