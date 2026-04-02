'use client';
import { useState } from 'react';
import { ArtifactViewer } from '@/components/ArtifactViewer';

interface GalleryCardProps {
  title: string;
  artifactName?: string;
  type: 'jsx' | 'html' | 'docx' | 'antigravity';
  category?: string;
  date?: string;
  size?: string;
  entityColor?: string;
  onClick?: () => void;
}

const TYPE_CONFIG = {
  jsx: { icon: '\u269B\uFE0F', label: 'JSX', gradient: 'linear-gradient(135deg, #1E0A2022, #D4A84422)' },
  html: { icon: '\uD83C\uDF10', label: 'HTML', gradient: 'linear-gradient(135deg, #5B8C6E22, #7BAF8E22)' },
  docx: { icon: '\uD83D\uDCC4', label: 'DOCX', gradient: 'linear-gradient(135deg, #6B7B9E22, #8B9BB822)' },
  antigravity: { icon: '\uD83C\uDFA8', label: 'ANTI', gradient: 'linear-gradient(135deg, #9B6B8E22, #BB8BAE22)' },
};

export function GalleryCard({
  title,
  artifactName,
  type,
  category,
  date,
  size,
  entityColor = '#1E0A20',
  onClick,
}: GalleryCardProps) {
  const [showModal, setShowModal] = useState(false);
  const config = TYPE_CONFIG[type];

  const handleClick = () => {
    if (type === 'jsx' || type === 'html') {
      if (artifactName) setShowModal(true);
    } else {
      onClick?.();
    }
  };

  return (
    <>
      <button
        onClick={handleClick}
        style={{
          display: 'flex',
          flexDirection: 'column',
          background: '#FAF8FC',
          border: '1px solid rgba(30,10,32,0.35)',
          borderRadius: 8,
          overflow: 'hidden',
          cursor: 'pointer',
          textAlign: 'left',
          width: '100%',
          transition: 'border-color 0.2s, box-shadow 0.2s',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.borderColor = entityColor;
          e.currentTarget.style.boxShadow = `0 2px 8px ${entityColor}22`;
        }}
        onMouseLeave={e => {
          e.currentTarget.style.borderColor = 'rgba(30,10,32,0.35)';
          e.currentTarget.style.boxShadow = 'none';
        }}
      >
        {/* Thumbnail */}
        <div style={{
          height: 80,
          background: config.gradient,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 28,
        }}>
          {config.icon}
        </div>

        {/* Content */}
        <div style={{ padding: '10px 12px', flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
          <div style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 12,
            fontWeight: 700,
            fontStyle: 'italic',
            color: '#2C2925',
            lineHeight: 1.3,
          }}>
            {title}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: 8,
              color: '#FAF8FC',
              background: entityColor,
              borderRadius: 2,
              padding: '1px 5px',
              letterSpacing: '0.5px',
            }}>
              {config.label}
            </span>
            {category && (
              <span style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: 7,
                color: 'rgba(30,10,32,0.60)',
                letterSpacing: '0.5px',
              }}>
                {category}
              </span>
            )}
          </div>

          <div style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: 7,
            color: '#B5AD9E',
            display: 'flex',
            gap: 8,
          }}>
            {date && <span>{date}</span>}
            {size && <span>{size}</span>}
          </div>
        </div>
      </button>

      {/* Fullscreen Modal */}
      {showModal && artifactName && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 10000,
            background: 'rgba(44,41,37,0.85)',
            display: 'flex',
            flexDirection: 'column',
          }}
          onClick={e => { if (e.target === e.currentTarget) setShowModal(false); }}
        >
          <div style={{
            display: 'flex',
            justifyContent: 'flex-end',
            padding: '12px 16px',
          }}>
            <button
              onClick={() => setShowModal(false)}
              style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: 10,
                color: '#FAF8FC',
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: 4,
                padding: '4px 12px',
                cursor: 'pointer',
              }}
            >
              FERMER
            </button>
          </div>
          <div style={{ flex: 1, padding: '0 16px 16px' }}>
            <ArtifactViewer artifactName={artifactName} height={window.innerHeight - 80} />
          </div>
        </div>
      )}
    </>
  );
}
