'use client';

import { GaugeKPI } from '@/components/ui/GaugeKPI';
import { PipelineArchitecture } from '@/components/ui/PipelineArchitecture';
import { DataCard } from '@/components/ui/DataCard';
import { BridgeLinks } from '@/components/ui/BridgeLinks';
import { BookOpen } from 'lucide-react';

// ── Constants ──────────────────────────────────────────

const YRKNOWN_COLOR = '#918977';

const gauges = [
  { value: 73, target: 100, label: 'Savoirs captes' },
  { value: 12, target: 20, label: 'Agents LoRA' },
  { value: 18, target: 30, label: 'UNESCO', color: '#B8963E' },
  { value: 342, target: 500, label: 'Heures captation', unit: 'h' },
  { value: 1256, target: 2000, label: 'Entries' },
];

// ── Pipeline ──────────────────────────────────────────

const pipelineNodes = [
  { name: 'Captation', tech: 'Audio / Video', color: YRKNOWN_COLOR },
  { name: 'Transcription', tech: 'Whisper', color: YRKNOWN_COLOR },
  { name: 'Structuration', tech: 'LLM', color: YRKNOWN_COLOR },
  { name: 'Fine-tuning', tech: 'LoRA', color: '#B8963E' },
  { name: 'Agent IA', tech: 'Deploye', color: '#3D7C5E' },
  { name: 'Consultation', tech: 'Interface', color: YRKNOWN_COLOR },
];

const pipelineLinks = [
  { from: 0, to: 1 },
  { from: 1, to: 2 },
  { from: 2, to: 3 },
  { from: 3, to: 4 },
  { from: 4, to: 5 },
];

// ── Verticales de Savoir ──────────────────────────────

interface SavoirVerticale {
  title: string;
  target: string;
  description: string;
  color: string;
  agents: number;
  hours: number;
}

const verticales: SavoirVerticale[] = [
  {
    title: 'Psychiatrie',
    target: 'NOOS',
    description: 'Savoir clinique psychiatrique : semiologie, approches therapeutiques, cas rares et retours d\'experience de praticiens seniors.',
    color: '#B8963E',
    agents: 4,
    hours: 120,
  },
  {
    title: 'Artisanat',
    target: 'DIWANE',
    description: 'Techniques artisanales traditionnelles : zellige, dinanderie, tannerie, tissage — savoirs transmis oralement depuis des generations.',
    color: '#C17A3A',
    agents: 3,
    hours: 85,
  },
  {
    title: 'Pharmacopee',
    target: '—',
    description: 'Pharmacopee traditionnelle : plantes medicinales, preparations galeniques ancestrales, interactions connues empiriquement.',
    color: YRKNOWN_COLOR,
    agents: 2,
    hours: 52,
  },
  {
    title: 'Agriculture',
    target: 'AlgueSov',
    description: 'Techniques agricoles locales et de recolte : rotation des cultures, irrigation traditionnelle, spiruline artisanale.',
    color: '#2E6B8A',
    agents: 2,
    hours: 48,
  },
  {
    title: 'Musique',
    target: '—',
    description: 'Patrimoine musical : maqams, rythmes andalous, traditions soufies, modes oraux non transcrits en notation occidentale.',
    color: '#7B5EA7',
    agents: 1,
    hours: 37,
  },
];

// ── Bridges ───────────────────────────────────────────

const bridges = [
  {
    entity: 'NOOS',
    color: '#B8963E',
    direction: 'out' as const,
    label: 'Savoir clinique',
    description: 'Les agents LoRA psychiatriques alimentent le moteur de diagnostic NOOS avec du savoir clinique structure.',
  },
  {
    entity: 'DIWANE',
    color: '#C17A3A',
    direction: 'out' as const,
    label: 'Savoir artisanal',
    description: 'Les techniques artisanales capturees deviennent des fiches patrimoine dans le registre DIWANE.',
  },
  {
    entity: 'AlgueSov',
    color: '#2E6B8A',
    direction: 'out' as const,
    label: 'Techniques recolte',
    description: 'Les savoirs agricoles et de recolte sont transmis a AlgueSov pour optimiser la production de spiruline.',
  },
  {
    entity: 'AMANA',
    color: '#6B8E6B',
    direction: 'out' as const,
    label: 'Patrimoine charitable',
    description: 'Les savoirs patrimoniaux catalogues par YrKnown enrichissent les actifs immateriels geres par AMANA.',
  },
];

// ── Component ──────────────────────────────────────────

export default function YrKnownPage() {
  return (
    <div className="min-h-screen bg-[#0F0D0B]">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#1C1814] to-[#252520] py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen size={20} style={{ color: YRKNOWN_COLOR }} />
            <span className="font-[family-name:var(--font-jetbrains)] text-[8px] uppercase tracking-[2px] text-t3">
              Entite 09 / Captation du Savoir
            </span>
          </div>
          <h1
            className="font-[family-name:var(--font-cormorant)] text-4xl md:text-5xl font-bold italic mb-2"
            style={{ color: YRKNOWN_COLOR }}
          >
            YrKnown
          </h1>
          <p className="font-[family-name:var(--font-noto)] text-sm text-t2 max-w-xl leading-relaxed">
            Capture et preservation des savoirs immateriels.
            De la parole d&apos;expert a l&apos;agent IA consultable.
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

        {/* Pipeline */}
        <section>
          <PipelineArchitecture
            title="Pipeline de Captation"
            nodes={pipelineNodes}
            links={pipelineLinks}
          />
        </section>

        {/* Verticales de Savoir */}
        <section>
          <h2 className="font-[family-name:var(--font-jetbrains)] text-[8px] uppercase tracking-[1.5px] text-t3 mb-6">
            Verticales de Savoir
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {verticales.map((v) => (
              <div
                key={v.title}
                className="rounded-lg p-4"
                style={{
                  background: '#1C1814',
                  border: `1px solid ${v.color}30`,
                }}
              >
                <div className="flex items-center justify-between mb-3">
                  <h3
                    className="font-[family-name:var(--font-cormorant)] text-base font-semibold italic"
                    style={{ color: v.color }}
                  >
                    {v.title}
                  </h3>
                  {v.target !== '—' && (
                    <span className="font-[family-name:var(--font-jetbrains)] text-[7px] uppercase tracking-[1px] text-t3">
                      → {v.target}
                    </span>
                  )}
                </div>
                <p className="font-[family-name:var(--font-noto)] text-[10px] text-t2 leading-relaxed mb-3">
                  {v.description}
                </p>
                <div className="flex gap-4">
                  <span className="font-[family-name:var(--font-jetbrains)] text-[9px] text-t3">
                    <span style={{ color: v.color }}>{v.agents}</span> agents
                  </span>
                  <span className="font-[family-name:var(--font-jetbrains)] text-[9px] text-t3">
                    <span style={{ color: v.color }}>{v.hours}</span>h captees
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Data Cards */}
        <section>
          <h2 className="font-[family-name:var(--font-jetbrains)] text-[8px] uppercase tracking-[1.5px] text-t3 mb-6">
            Donnees & Ecosysteme
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* y01 — Experts */}
            <DataCard
              variant="contact"
              data={{
                name: 'Pr. Fatima Zahra Bennis',
                initials: 'FB',
                city: 'Casablanca',
                specialty: 'Psychiatrie traditionnelle',
                role: 'Expert savoirs cliniques',
              }}
            />
            <DataCard
              variant="contact"
              data={{
                name: 'Maallem Hassan Ouazzani',
                initials: 'HO',
                city: 'Fes',
                specialty: 'Zellige & Dinanderie',
                role: 'Maitre artisan referent',
              }}
            />

            {/* y11 — Startups KM */}
            <DataCard
              variant="startup"
              data={{
                name: 'Elicit',
                valuation: '$150M',
                fundraise: '$25M',
                country: 'USA',
                description: 'Recherche automatisee par IA pour synthese de connaissances scientifiques.',
                stage: 'Series A',
              }}
            />
            <DataCard
              variant="startup"
              data={{
                name: 'Mem.ai',
                valuation: '$40M',
                fundraise: '$10M',
                country: 'USA',
                description: 'Assistant de gestion de connaissances personnelles par IA.',
                stage: 'Series A',
              }}
            />
            <DataCard
              variant="startup"
              data={{
                name: 'Saga',
                valuation: '$15M',
                fundraise: '$4M',
                country: 'France',
                description: 'Espace de travail collaboratif avec IA integree pour la connaissance d\'equipe.',
                stage: 'Seed',
              }}
            />

            {/* y21 — UNESCO */}
            <DataCard
              variant="regulation"
              data={{
                title: 'Patrimoine Immateriel UNESCO',
                subtitle: 'Couche y21',
                count: 18,
                description:
                  '18 traditions orales et savoir-faire inscrits au patrimoine immateriel de l\'humanite, cibles pour la captation YrKnown.',
              }}
            />

            {/* y41 — Universites */}
            <DataCard
              variant="regulation"
              data={{
                title: 'Partenariats Universitaires',
                subtitle: 'Couche y41',
                count: 5,
                description:
                  'Universites partenaires pour la validation scientifique des savoirs captes : UM6P, Al Akhawayn, Cadi Ayyad, Paris-Saclay, MIT Media Lab.',
              }}
            />

            {/* y31 — TAM */}
            <DataCard
              variant="tech"
              data={{
                title: 'TAM Knowledge Management',
                subtitle: 'Couche y31',
                count: 3,
                description:
                  'Marche adressable : $1.2T (savoir implicite), $400B (formation), $50B (KM SaaS). YrKnown cible la niche savoir oral non-structure.',
              }}
            />
          </div>
        </section>

        {/* Bridges */}
        <BridgeLinks bridges={bridges} />
      </div>
    </div>
  );
}
