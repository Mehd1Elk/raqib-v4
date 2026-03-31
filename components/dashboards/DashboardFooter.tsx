export function DashboardFooter({ label }: { label: string }) {
  return (
    <div className="h-[26px] flex items-center justify-between px-6 border-t border-div bg-ivory">
      <span className="text-[7px] text-tm font-[family-name:var(--font-jetbrains)]">
        RAQIB V4 &middot; {label}
      </span>
      <span className="text-[7px] text-gold font-[family-name:var(--font-jetbrains)]">
        EIGEN HOLDING SAS
      </span>
    </div>
  );
}
