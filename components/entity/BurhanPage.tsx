'use client';

import { useState } from 'react';
import { GaugeKPI } from '@/components/ui/GaugeKPI';
import { PipelineArchitecture } from '@/components/ui/PipelineArchitecture';
import { DataCard } from '@/components/ui/DataCard';
import { BridgeLinks } from '@/components/ui/BridgeLinks';
import { Link2 } from 'lucide-react';

// ── Constants ──────────────────────────────────────────

const BURHAN_COLOR = '#B87D3E';

const gauges = [
  { value: 8247, target: 10000, label: 'Transactions hashees' },
  { value: 0.003, target: 0.01, label: 'Gas moyen', unit: '$', color: '#3D7C5E' },
  { value: 6, target: 6, label: 'Types Tx', color: '#3D7C5E' },
  { value: 3, target: 3, label: 'Smart contracts', color: '#3D7C5E' },
  { value: 1487, target: 2000, label: 'Entries' },
];

// ── Hex Architecture Data ─────────────────────────────

interface HexBranch {
  code: string;
  name: string;
  target: string;
  color: string;
  hash: string;
  active: boolean;
}

const hexBranches: HexBranch[] = [
  { code: '501', name: 'DiagnosticSessionCompleted', target: 'NOOS', color: '#B8963E', hash: '0xa3f…7c21', active: true },
  { code: '502', name: 'ConsentGranted', target: 'AELYA', color: '#7B5EA7', hash: '0xb7e…4d9a', active: true },
  { code: '503', name: 'ConsentRevoked', target: 'AELYA', color: '#7B5EA7', hash: '0xc91…8f3b', active: false },
  { code: '504', name: 'DataAnonymizationStep', target: 'MYNe', color: '#3D7C5E', hash: '0xd4a…2e67', active: true },
  { code: '505', name: 'DatasetSold', target: 'MYNe', color: '#3D7C5E', hash: '0xe58…1b4c', active: false },
  { code: '506', name: 'RegulatoryAuditCompleted', target: 'Tous', color: '#78716C', hash: '0xf6c…9a05', active: true },
];

// ── Tech Stack ────────────────────────────────────────

const techStack = [
  { name: 'Polygon zkEVM', description: 'L2 rollup EVM-compatible avec preuves zero-knowledge' },
  { name: 'ERC-1155', description: 'Multi-token standard pour certificats et preuves' },
  { name: 'BullMQ', description: 'File d\'attente Redis pour hashing asynchrone' },
  { name: 'Solidity + Hardhat', description: 'Smart contracts et framework de test' },
  { name: 'ethers.js', description: 'Interface JavaScript pour interactions blockchain' },
];

// ── Bridges ───────────────────────────────────────────

const bridges = [
  {
    entity: 'NOOS',
    color: '#B8963E',
    direction: 'in' as const,
    label: 'Diagnostics',
    description: 'Chaque session diagnostique completee genere une transaction Tx501 hashee dans BURHAN.',
    txCodes: ['Tx501'],
  },
  {
    entity: 'AELYA',
    color: '#7B5EA7',
    direction: 'in' as const,
    label: 'Consentement',
    description: 'Les actes de consentement (grant/revoke) sont prouves par Tx502/Tx503.',
    txCodes: ['Tx502', 'Tx503'],
  },
  {
    entity: 'MYNe',
    color: '#3D7C5E',
    direction: 'in' as const,
    label: 'Anonymisation & Vente',
    description: 'Chaque etape d\'anonymisation et chaque vente de dataset est certifiee.',
    txCodes: ['Tx504', 'Tx505'],
  },
  {
    entity: 'DIWANE',
    color: '#C17A3A',
    direction: 'in' as const,
    label: 'Audit reglementaire',
    description: 'Les audits reglementaires DIWANE sont ancres dans la chaine.',
    txCodes: ['Tx506'],
  },
  {
    entity: 'AlgueSov',
    color: '#2E6B8A',
    direction: 'in' as const,
    label: 'Audit souverainete',
    description: 'Les certifications de souverainete passent par l\'audit Tx506.',
    txCodes: ['Tx506'],
  },
  {
    entity: 'AMANA',
    color: '#6B8E6B',
    direction: 'in' as const,
    label: 'Audit charitable',
    description: 'Les audits de conformite charitable sont prouves on-chain.',
    txCodes: ['Tx506'],
  },
];

// ── Hexagonal Architecture SVG ────────────────────────

function HexArchitecture() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const cx = 300;
  const cy = 200;
  const radius = 140;

  return (
    <section>
      <h2 className="font-[family-name:var(--font-jetbrains)] text-[8px] uppercase tracking-[1.5px] text-t3 mb-6">
        Architecture Hexagonale des Transactions
      </h2>
      <div className="overflow-x-auto">
        <svg viewBox="0 0 600 400" className="w-full max-w-[700px] mx-auto" style={{ minWidth: 500 }}>
          <defs>
            <filter id="glow-burhan">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <style>{`
              @keyframes pulse-burhan {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.6; }
              }
            `}</style>
          </defs>

          {/* Central hexagon */}
          <polygon
            points={hexPoints(cx, cy, 45)}
            fill="none"
            stroke={BURHAN_COLOR}
            strokeWidth={2}
            filter="url(#glow-burhan)"
          />
          <text x={cx} y={cy + 4} textAnchor="middle" fill={BURHAN_COLOR} fontSize={13} fontWeight="bold" fontFamily="var(--font-jetbrains)">
            BURHAN
          </text>

          {/* Branches */}
          {hexBranches.map((b, i) => {
            const angle = (Math.PI * 2 * i) / 6 - Math.PI / 2;
            const nx = cx + Math.cos(angle) * radius;
            const ny = cy + Math.sin(angle) * radius;
            const isHovered = hoveredIdx === i;

            return (
              <g
                key={b.code}
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
                style={{ cursor: 'pointer' }}
              >
                {/* Connection line */}
                <line
                  x1={cx + Math.cos(angle) * 48}
                  y1={cy + Math.sin(angle) * 48}
                  x2={nx}
                  y2={ny}
                  stroke={b.color}
                  strokeWidth={1.5}
                  strokeOpacity={0.5}
                  strokeDasharray={b.active ? 'none' : '4 3'}
                />

                {/* Node circle */}
                <circle
                  cx={nx}
                  cy={ny}
                  r={28}
                  fill="#1C1814"
                  stroke={b.color}
                  strokeWidth={isHovered ? 2.5 : 1.5}
                  style={b.active ? { animation: 'pulse-burhan 2.5s ease-in-out infinite' } : undefined}
                />

                {/* Code */}
                <text x={nx} y={ny - 6} textAnchor="middle" fill={b.color} fontSize={11} fontWeight="bold" fontFamily="var(--font-jetbrains)">
                  {b.code}
                </text>

                {/* Target */}
                <text x={nx} y={ny + 8} textAnchor="middle" fill="#A8A29E" fontSize={8} fontFamily="var(--font-noto)">
                  → {b.target}
                </text>

                {/* Hover tooltip */}
                {isHovered && (
                  <g>
                    <rect
                      x={nx - 80}
                      y={ny + 34}
                      width={160}
                      height={38}
                      rx={4}
                      fill="#1C1814"
                      stroke={b.color}
                      strokeWidth={1}
                      strokeOpacity={0.4}
                    />
                    <text x={nx} y={ny + 50} textAnchor="middle" fill="#D6D3D1" fontSize={8} fontFamily="var(--font-noto)">
                      {b.name}
                    </text>
                    <text x={nx} y={ny + 62} textAnchor="middle" fill="#78716C" fontSize={7} fontFamily="var(--font-jetbrains)">
                      {b.hash}
                    </text>
                  </g>
                )}
              </g>
            );
          })}
        </svg>
      </div>
    </section>
  );
}

function hexPoints(cx: number, cy: number, r: number): string {
  return Array.from({ length: 6 }, (_, i) => {
    const angle = (Math.PI * 2 * i) / 6 - Math.PI / 6;
    return `${cx + Math.cos(angle) * r},${cy + Math.sin(angle) * r}`;
  }).join(' ');
}

// ── Blockchain Comparison Data ────────────────────────

const blockchainComparison = [
  { chain: 'Polygon zkEVM', tps: '2 000', gas: '$0.003', finality: '~30 min', selected: true },
  { chain: 'Ethereum L1', tps: '15', gas: '$2.50', finality: '~12 min', selected: false },
  { chain: 'Arbitrum', tps: '4 000', gas: '$0.01', finality: '~7 jours', selected: false },
  { chain: 'Optimism', tps: '2 000', gas: '$0.01', finality: '~7 jours', selected: false },
  { chain: 'Solana', tps: '65 000', gas: '$0.0002', finality: '~0.4s', selected: false },
  { chain: 'Avalanche C', tps: '4 500', gas: '$0.02', finality: '~2s', selected: false },
  { chain: 'BNB Chain', tps: '2 200', gas: '$0.05', finality: '~3s', selected: false },
  { chain: 'Base', tps: '2 000', gas: '$0.005', finality: '~7 jours', selected: false },
  { chain: 'zkSync Era', tps: '2 000', gas: '$0.004', finality: '~24h', selected: false },
  { chain: 'StarkNet', tps: '800', gas: '$0.008', finality: '~6h', selected: false },
];

// ── Component ──────────────────────────────────────────

export default function BurhanPage() {
  return (
    <div className="min-h-screen bg-[#0F0D0B]">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#1C1814] to-[#2A2520] py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <Link2 size={20} style={{ color: BURHAN_COLOR }} />
            <span className="font-[family-name:var(--font-jetbrains)] text-[8px] uppercase tracking-[2px] text-t3">
              Entite 04 / Blockchain & Preuve
            </span>
          </div>
          <h1
            className="font-[family-name:var(--font-cormorant)] text-4xl md:text-5xl font-bold italic mb-2"
            style={{ color: BURHAN_COLOR }}
          >
            BURHAN
          </h1>
          <p className="font-[family-name:var(--font-noto)] text-sm text-t2 max-w-xl leading-relaxed">
            Couche de preuve immutable pour l&apos;ecosysteme sante.
            Chaque acte clinique, consentement et transaction est hashe on-chain.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6 py-12 space-y-16">
        {/* KPI Gauges */}
        <section>
          <h2 className="font-[family-name:var(--font-jetbrains)] text-[8px] uppercase tracking-[1.5px] text-t3 mb-6">
            KPI Dashboard
          </h2>
          <div className="flex flex-wrap gap-8 justify-center">
            {gauges.map((g) => (
              <GaugeKPI key={g.label} {...g} />
            ))}
          </div>
        </section>

        {/* Hexagonal Architecture */}
        <HexArchitecture />

        {/* Tech Stack */}
        <section>
          <h2 className="font-[family-name:var(--font-jetbrains)] text-[8px] uppercase tracking-[1.5px] text-t3 mb-6">
            Tech Stack
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {techStack.map((t) => (
              <div
                key={t.name}
                className="rounded-lg p-3"
                style={{ background: '#1C1814', border: '1px solid rgba(184,125,62,0.2)' }}
              >
                <p className="font-[family-name:var(--font-jetbrains)] text-[10px] font-semibold mb-1" style={{ color: BURHAN_COLOR }}>
                  {t.name}
                </p>
                <p className="font-[family-name:var(--font-noto)] text-[8px] text-t3 leading-relaxed">
                  {t.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Data Cards */}
        <section>
          <h2 className="font-[family-name:var(--font-jetbrains)] text-[8px] uppercase tracking-[1.5px] text-t3 mb-6">
            Donnees & Regulations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* b01 — MiCA */}
            <DataCard
              variant="regulation"
              data={{
                title: 'MiCA & Cadre Crypto-Actifs',
                subtitle: 'Couche b01',
                count: 8,
                description:
                  'Markets in Crypto-Assets Regulation, DORA, directive transferts de fonds — 8 textes encadrant l\'usage blockchain en sante.',
              }}
            />

            {/* b31 — Startups concurrentes */}
            <DataCard
              variant="startup"
              data={{
                name: 'MedRec',
                valuation: '$12M',
                fundraise: '$3.2M',
                country: 'USA',
                description: 'Blockchain pour dossiers medicaux decentralises sur Ethereum.',
                stage: 'Series A',
              }}
            />
            <DataCard
              variant="startup"
              data={{
                name: 'Patientory',
                valuation: '$8M',
                fundraise: '$1.5M',
                country: 'USA',
                description: 'Stockage securise de donnees de sante sur blockchain.',
                stage: 'Seed',
              }}
            />
            <DataCard
              variant="startup"
              data={{
                name: 'Medicalchain',
                valuation: '$15M',
                fundraise: '$5M',
                country: 'UK',
                description: 'Plateforme de telemedicine avec dossiers on-chain.',
                stage: 'Series A',
              }}
            />
            <DataCard
              variant="startup"
              data={{
                name: 'BurstIQ',
                valuation: '$20M',
                fundraise: '$7M',
                country: 'USA',
                description: 'Big data sante securise par blockchain et smart contracts.',
                stage: 'Series B',
              }}
            />
            <DataCard
              variant="startup"
              data={{
                name: 'Akiri',
                valuation: '$6M',
                fundraise: '$2M',
                country: 'USA',
                description: 'Reseau blockchain pour echanges de donnees de sante.',
                stage: 'Seed',
              }}
            />

            {/* b61 — KOLs */}
            <DataCard
              variant="contact"
              data={{
                name: 'Vitalik Buterin',
                initials: 'VB',
                city: 'Toronto',
                specialty: 'Ethereum & zkSNARKs',
                role: 'KOL — Blockchain sante',
              }}
            />
            <DataCard
              variant="contact"
              data={{
                name: 'Dr. John Halamka',
                initials: 'JH',
                city: 'Boston',
                specialty: 'Health IT & Blockchain',
                role: 'KOL — CIO Mayo Clinic Platform',
              }}
            />

            {/* b81 — CBDC */}
            <DataCard
              variant="regulation"
              data={{
                title: 'CBDC & Euro Numerique',
                subtitle: 'Couche b81',
                description:
                  'Implications des monnaies numeriques de banque centrale pour les micro-paiements sante et les smart contracts d\'assurance.',
              }}
            />
          </div>
        </section>

        {/* Blockchain Comparison Table — b21 */}
        <section>
          <h2 className="font-[family-name:var(--font-jetbrains)] text-[8px] uppercase tracking-[1.5px] text-t3 mb-6">
            Comparatif Blockchains — Couche b21
          </h2>
          <div className="overflow-x-auto rounded-lg" style={{ border: '1px solid rgba(184,125,62,0.15)' }}>
            <table className="w-full text-left" style={{ minWidth: 500 }}>
              <thead>
                <tr style={{ background: '#1C1814' }}>
                  {['Blockchain', 'TPS', 'Gas moyen', 'Finalite'].map((h) => (
                    <th key={h} className="font-[family-name:var(--font-jetbrains)] text-[8px] uppercase tracking-[1px] text-t3 px-4 py-3">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {blockchainComparison.map((row) => (
                  <tr
                    key={row.chain}
                    style={{
                      background: row.selected ? 'rgba(184,125,62,0.08)' : 'transparent',
                      borderBottom: '1px solid rgba(120,113,108,0.1)',
                    }}
                  >
                    <td className="px-4 py-2.5">
                      <span
                        className="font-[family-name:var(--font-noto)] text-[11px] font-medium"
                        style={{ color: row.selected ? BURHAN_COLOR : '#D6D3D1' }}
                      >
                        {row.chain}
                        {row.selected && (
                          <span className="ml-2 text-[7px] font-[family-name:var(--font-jetbrains)] uppercase" style={{ color: '#3D7C5E' }}>
                            Selectionne
                          </span>
                        )}
                      </span>
                    </td>
                    <td className="font-[family-name:var(--font-jetbrains)] text-[10px] text-t2 px-4 py-2.5">{row.tps}</td>
                    <td className="font-[family-name:var(--font-jetbrains)] text-[10px] text-t2 px-4 py-2.5">{row.gas}</td>
                    <td className="font-[family-name:var(--font-jetbrains)] text-[10px] text-t2 px-4 py-2.5">{row.finality}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Bridges */}
        <BridgeLinks bridges={bridges} />
      </div>
    </div>
  );
}
