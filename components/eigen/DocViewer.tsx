'use client';

interface DocViewerProps {
  title: string;
  author?: string;
  pages?: number;
  date?: string;
  summary?: string;
  keywords?: string[];
  previewLines?: string[];
  coworkUrl?: string;
  entityColor?: string;
}

export function DocViewer({
  title,
  author,
  pages,
  date,
  summary,
  keywords,
  previewLines,
  coworkUrl,
  entityColor = '#B8963E',
}: DocViewerProps) {
  return (
    <div style={{
      background: '#FDFAF3',
      border: '1px solid #D4CCBA',
      borderRadius: 0,
      overflow: 'hidden',
    }}>
      {/* Header */}
      <div style={{
        padding: '16px 20px',
        borderBottom: '1px solid #D4CCBA',
        background: '#F7F3EA',
      }}>
        <div style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: 18,
          fontWeight: 700,
          
          color: '#2C2925',
          marginBottom: 8,
        }}>
          {title}
        </div>
        <div style={{
          display: 'flex',
          gap: 16,
          flexWrap: 'wrap',
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: 9,
          color: '#918977',
          letterSpacing: '0.5px',
        }}>
          {author && <span>AUTEUR: {author}</span>}
          {pages && <span>{pages} PAGES</span>}
          {date && <span>{date}</span>}
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        {/* Summary */}
        {summary && (
          <div>
            <div style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: 8,
              color: entityColor,
              letterSpacing: '1px',
              marginBottom: 6,
            }}>
              RESUME
            </div>
            <div style={{
              fontFamily: 'system-ui, -apple-system, sans-serif',
              fontSize: 13,
              color: '#4A4640',
              lineHeight: 1.6,
            }}>
              {summary}
            </div>
          </div>
        )}

        {/* Keywords */}
        {keywords && keywords.length > 0 && (
          <div>
            <div style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: 8,
              color: entityColor,
              letterSpacing: '1px',
              marginBottom: 6,
            }}>
              MOTS-CLES
            </div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {keywords.map(kw => (
                <span
                  key={kw}
                  style={{
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: 9,
                    color: '#918977',
                    background: '#F7F3EA',
                    border: '1px solid #D4CCBA',
                    borderRadius: 0,
                    padding: '2px 8px',
                  }}
                >
                  {kw}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Preview */}
        {previewLines && previewLines.length > 0 && (
          <div>
            <div style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: 8,
              color: entityColor,
              letterSpacing: '1px',
              marginBottom: 6,
            }}>
              APERCU
            </div>
            <div style={{
              background: '#F7F3EA',
              border: '1px solid #D4CCBA',
              borderRadius: 0,
              padding: 12,
              fontFamily: 'system-ui, -apple-system, sans-serif',
              fontSize: 12,
              color: '#6B6560',
              lineHeight: 1.7,
            }}>
              {previewLines.map((line, i) => (
                <p key={i} style={{ margin: i === 0 ? 0 : '8px 0 0' }}>{line}</p>
              ))}
            </div>
          </div>
        )}

        {/* Cowork link */}
        {coworkUrl && (
          <a
            href={coworkUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: 9,
              color: entityColor,
              border: `1px solid ${entityColor}`,
              borderRadius: 0,
              padding: '6px 12px',
              textDecoration: 'none',
              alignSelf: 'flex-start',
              letterSpacing: '0.5px',
              transition: 'background 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = `${entityColor}11`; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
          >
            OUVRIR DANS COWORK WORKSPACE
          </a>
        )}
      </div>
    </div>
  );
}
