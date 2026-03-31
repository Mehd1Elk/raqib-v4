export default function StatusDot({ status, size = 8 }: { status: 'active' | 'standby' | 'error' | 'inactive'; size?: number }) {
  const colors = { active: '#3D7C5E', standby: '#B87D3E', error: '#9C3D3D', inactive: '#918977' };
  return (
    <span className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <span className="rounded-full" style={{ width: size, height: size, backgroundColor: colors[status] }} />
      {status === 'active' && (
        <span className="absolute rounded-full animate-ping opacity-30" style={{ width: size, height: size, backgroundColor: colors[status] }} />
      )}
    </span>
  );
}
