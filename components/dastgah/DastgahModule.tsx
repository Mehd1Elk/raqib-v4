'use client';

import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import DastgahPresentation from './DastgahPresentation';
import DastgahUniverse from './DastgahUniverse';

const GR = '"Cormorant Garamond", "Playfair Display", Georgia, serif';
const MN = '"JetBrains Mono", monospace';
const SN = '"DM Sans", "Geist", sans-serif';

const TABS = [
  { key: 'presentation', label: 'PRESENTATION' },
  { key: 'univers', label: 'UNIVERS' },
] as const;

type TabKey = (typeof TABS)[number]['key'];

export default function DastgahModule() {
  const [activeTab, setActiveTab] = useState<TabKey>('presentation');

  return (
    <div style={{
      minHeight: '100vh',
      background: '#D60000',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Header */}
      <header style={{
        padding: '24px 32px 0',
        background: '#D60000',
        flexShrink: 0,
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 20,
        }}>
          <div>
            <a
              href="/"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                fontFamily: MN,
                fontSize: 9,
                color: '#FFA5A5',
                letterSpacing: 3,
                textTransform: 'uppercase' as const,
                textDecoration: 'none',
                marginBottom: 12,
              }}
            >
              <ArrowLeft size={12} />
              RAQIB
            </a>
            <h1 style={{
              fontFamily: GR,
              fontSize: 36,
              fontWeight: 400,
              fontStyle: 'italic',
              color: '#FFFFFF',
              margin: 0,
              letterSpacing: 2,
            }}>
              DASTGA<span style={{ color: '#FFA5A5' }}>H</span>
            </h1>
            <p style={{
              fontFamily: MN,
              fontSize: 9,
              color: '#FFA5A5',
              letterSpacing: 4,
              textTransform: 'uppercase' as const,
              margin: '6px 0 0',
            }}>
              GRAPHE CULTUREL PERSONNEL
            </p>
          </div>
          <div style={{
            fontFamily: MN,
            fontSize: 8,
            color: '#FFA5A5',
            letterSpacing: 3,
            textTransform: 'uppercase' as const,
          }}>
            DASTGAH · دستگاه
          </div>
        </div>

        {/* Tabs */}
        <div style={{
          display: 'flex',
          gap: 0,
          borderBottom: '1px solid rgba(255,165,165,0.2)',
        }}>
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              style={{
                fontFamily: MN,
                fontSize: 9,
                letterSpacing: 3,
                textTransform: 'uppercase' as const,
                color: activeTab === tab.key ? '#FFFFFF' : '#FFA5A5',
                background: 'transparent',
                border: 'none',
                borderBottom: activeTab === tab.key ? '2px solid #FFFFFF' : '2px solid transparent',
                padding: '10px 20px',
                cursor: 'pointer',
                transition: 'color 0.2s',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </header>

      {/* Content */}
      <main style={{
        flex: 1,
        padding: '24px 32px',
        overflowY: 'auto' as const,
      }}>
        {activeTab === 'presentation' ? <DastgahPresentation /> : <DastgahUniverse />}
      </main>

      {/* Footer */}
      <footer style={{
        height: 32,
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 32px',
        borderTop: '1px solid rgba(255,165,165,0.15)',
        background: '#AA0000',
      }}>
        <span style={{
          fontFamily: MN,
          fontSize: 7,
          color: '#FFA5A5',
          letterSpacing: 2,
        }}>
          DASTGAH · RAQIB V4 · EIGEN HOLDING SAS
        </span>
        <span style={{
          fontFamily: MN,
          fontSize: 7,
          color: '#FFA5A5',
          letterSpacing: 2,
        }}>
          AVRIL 2026
        </span>
      </footer>
    </div>
  );
}
