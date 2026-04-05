'use client'

import { useState, Suspense } from 'react'
import dynamic from 'next/dynamic'
import { T } from '@/lib/tahrik-tokens'

const MissionActive = dynamic(() => import('@/components/operations/MissionActive'), { ssr: false })
const VoyagesConquete = dynamic(() => import('@/components/operations/VoyagesConquete'), { ssr: false })
const ReseauxLocaux = dynamic(() => import('@/components/operations/ReseauxLocaux'), { ssr: false })
const ContactsTerrain = dynamic(() => import('@/components/operations/ContactsTerrain'), { ssr: false })
const RoadmapJalons = dynamic(() => import('@/components/operations/RoadmapJalons'), { ssr: false })

const tabs = [
  { key: 'mission', label: 'Mission', Component: MissionActive },
  { key: 'voyages', label: 'Voyages', Component: VoyagesConquete },
  { key: 'bni', label: 'BNI', Component: ReseauxLocaux },
  { key: 'contacts', label: 'Contacts', Component: ContactsTerrain },
  { key: 'roadmap', label: 'Roadmap', Component: RoadmapJalons },
] as const

function Skeleton() {
  return <div style={{ background: T.card, height: '12rem', borderRadius: '0.5rem' }} />
}

export default function OperationsPage() {
  const [activeTab, setActiveTab] = useState<string>('mission')
  const active = tabs.find((t) => t.key === activeTab)!

  return (
    <div style={{ background: T.bg, minHeight: '100vh' }}>
      {/* Header */}
      <header
        style={{
          background: T.header,
          padding: '1rem 1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
        }}
      >
        <span
          style={{
            fontFamily: T.fT,
            fontSize: '20px',
            color: T.txt,
            fontWeight: 600,
          }}
        >
          TAHRIK
        </span>
        <span style={{ fontFamily: T.fT, fontSize: '20px', color: T.txt, opacity: 0.4 }}>
          تحريك
        </span>
        <span
          style={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: T.acc,
            animation: 'pulse 2s ease-in-out infinite',
          }}
        />
        <span
          style={{
            fontFamily: T.fM,
            fontSize: '9px',
            color: T.acc,
            letterSpacing: '0.15em',
            textTransform: 'uppercase' as const,
          }}
        >
          Opérationnel
        </span>
      </header>

      {/* Tab bar */}
      <nav
        style={{
          background: T.bg2,
          display: 'flex',
          gap: 0,
          borderBottom: `1px solid ${T.bdr}`,
        }}
      >
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setActiveTab(t.key)}
            style={{
              flex: 1,
              padding: '0.75rem 0',
              background: 'transparent',
              border: 'none',
              borderBottom: activeTab === t.key ? `2px solid ${T.acc}` : '2px solid transparent',
              color: activeTab === t.key ? T.acc : T.txt,
              opacity: activeTab === t.key ? 1 : 0.45,
              fontFamily: T.fB,
              fontSize: '13px',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            {t.label}
          </button>
        ))}
      </nav>

      {/* Content */}
      <main style={{ padding: '1rem' }}>
        <Suspense fallback={<Skeleton />}>
          <active.Component />
        </Suspense>
      </main>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </div>
  )
}
