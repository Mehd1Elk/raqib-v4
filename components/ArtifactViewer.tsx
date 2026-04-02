'use client';
import { useState, useEffect } from 'react';

interface ArtifactViewerProps {
  artifactName: string;
  height?: number;
}

export function ArtifactViewer({ artifactName, height = 700 }: ArtifactViewerProps) {
  const [content, setContent] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [fullscreen, setFullscreen] = useState(false);

  useEffect(() => {
    fetch(`/artifacts/${artifactName}`)
      .then(res => {
        if (!res.ok) throw new Error('Not found');
        return res.text();
      })
      .then(text => { setContent(text); setLoading(false); })
      .catch(() => setLoading(false));
  }, [artifactName]);

  if (loading) return (
    <div style={{ height, background: '#F5F2F8', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <span style={{ color: '#1E0A20', fontFamily: 'JetBrains Mono, monospace', fontSize: 12 }}>Chargement de l&apos;interface...</span>
    </div>
  );

  if (!content) return (
    <div style={{ height: 200, background: '#F5F2F8', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(30,10,32,0.35)' }}>
      <span style={{ color: 'rgba(30,10,32,0.60)', fontFamily: 'JetBrains Mono, monospace', fontSize: 12 }}>Interface non trouvée : {artifactName}</span>
    </div>
  );

  const isHTML = artifactName.endsWith('.html');
  const srcDoc = isHTML ? content : `<!DOCTYPE html>
<html><head>
  <meta charset="utf-8">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/react/18.2.0/umd/react.production.min.js"><\/script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.2.0/umd/react-dom.production.min.js"><\/script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/7.23.9/babel.min.js"><\/script>
  <script src="https://cdn.tailwindcss.com"><\/script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/recharts/2.15.0/Recharts.min.js"><\/script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,700;1,400;1,700&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">
  <style>body{margin:0;font-family:system-ui,-apple-system,sans-serif;background:#F5F2F8}*{box-sizing:border-box}</style>
</head><body>
  <div id="root"></div>
  <script type="text/babel">${content}<\/script>
</body></html>`;

  return (
    <div style={{
      position: fullscreen ? 'fixed' : 'relative',
      inset: fullscreen ? 0 : 'auto',
      zIndex: fullscreen ? 9999 : 'auto',
      background: '#F5F2F8',
      borderRadius: fullscreen ? 0 : 8,
      overflow: 'hidden',
      border: fullscreen ? 'none' : '1px solid rgba(30,10,32,0.35)',
    }}>
      {/* Toolbar */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '8px 16px',
        background: '#FAF8FC',
        borderBottom: '1px solid rgba(30,10,32,0.35)',
      }}>
        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: 'rgba(30,10,32,0.60)', letterSpacing: '0.5px' }}>
          {artifactName}
        </span>
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            aria-label={fullscreen ? 'Réduire artifact' : 'Plein écran artifact'}
            onClick={() => setFullscreen(!fullscreen)}
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: 9,
              color: '#1E0A20',
              background: 'none',
              border: '1px solid #1E0A20',
              borderRadius: 3,
              padding: '2px 8px',
              cursor: 'pointer',
              letterSpacing: '0.5px',
            }}
          >
            {fullscreen ? 'REDUIRE' : 'PLEIN ECRAN'}
          </button>
          <button
            aria-label="Ouvrir artifact séparément"
            onClick={() => window.open(`/artifacts/${artifactName}`, '_blank')}
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: 9,
              color: 'rgba(30,10,32,0.60)',
              background: 'none',
              border: '1px solid rgba(30,10,32,0.60)',
              borderRadius: 3,
              padding: '2px 8px',
              cursor: 'pointer',
              letterSpacing: '0.5px',
            }}
          >
            OUVRIR SEPAREMENT
          </button>
        </div>
      </div>

      {/* Iframe */}
      <iframe
        data-testid="artifact-iframe"
        srcDoc={srcDoc}
        sandbox="allow-scripts allow-same-origin"
        style={{
          width: '100%',
          height: fullscreen ? 'calc(100vh - 40px)' : height,
          border: 'none',
          display: 'block',
        }}
        title={artifactName}
      />
    </div>
  );
}
