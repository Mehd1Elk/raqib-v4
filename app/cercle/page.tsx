'use client';

export default function CerclePage() {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 100 }}>
      {/* Back button */}
      <a
        href="/"
        style={{
          position: 'fixed',
          top: 16,
          left: 16,
          zIndex: 200,
          padding: '8px 18px',
          background: 'rgba(24,34,24,0.92)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(176,140,72,0.25)',
          color: '#D4B878',
          fontFamily: '"Cormorant SC", serif',
          fontSize: 11,
          letterSpacing: '0.2em',
          textDecoration: 'none',
          textTransform: 'uppercase' as const,
          transition: 'all 0.3s',
        }}
      >
        ← Raqib
      </a>

      <iframe
        src="/cg-vitrine/index.html"
        style={{
          width: '100vw',
          height: '100vh',
          border: 'none',
          display: 'block',
        }}
        title="Cercle du Gazoduc — Cercle Atlantique"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
      />
    </div>
  );
}
