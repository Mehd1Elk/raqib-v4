'use client';

import { Scale, Cpu, User } from 'lucide-react';

// ── Types ──────────────────────────────────────────────

interface RegulationData {
  title: string;
  subtitle?: string;
  count?: number;
  description: string;
}

interface TechData {
  title: string;
  subtitle?: string;
  count?: number;
  description: string;
}

interface ContactData {
  name: string;
  initials: string;
  city: string;
  specialty: string;
  role?: string;
}

interface StartupData {
  name: string;
  valuation?: string;
  fundraise?: string;
  country: string;
  description: string;
  stage?: string;
}

type DataCardProps =
  | { variant: 'regulation'; data: RegulationData }
  | { variant: 'tech'; data: TechData }
  | { variant: 'contact'; data: ContactData }
  | { variant: 'startup'; data: StartupData };

// ── Component ──────────────────────────────────────────

export function DataCard(props: DataCardProps) {
  switch (props.variant) {
    case 'regulation':
      return <RegulationCard data={props.data} />;
    case 'tech':
      return <TechCard data={props.data} />;
    case 'contact':
      return <ContactCard data={props.data} />;
    case 'startup':
      return <StartupCard data={props.data} />;
  }
}

// ── Regulation Card ────────────────────────────────────

function RegulationCard({ data }: { data: RegulationData }) {
  return (
    <div className="relative bg-[#1C1814] border border-div rounded-none-none p-4 pl-5 overflow-hidden">
      <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#4A7FB5]" />
      <div className="flex items-start gap-2">
        <Scale size={14} className="text-[#4A7FB5] mt-0.5 shrink-0" />
        <div className="min-w-0">
          <h4 className="font-[family-name:var(--font-playfair)] text-sm font-semibold text-ivory-50">
            {data.title}
          </h4>
          {data.subtitle && (
            <span className="font-[family-name:var(--font-jetbrains)] text-[7px] text-t3 uppercase tracking-[1px]">
              {data.subtitle}
            </span>
          )}
          {data.count !== undefined && (
            <span className="ml-2 font-[family-name:var(--font-jetbrains)] text-[7px] text-[#4A7FB5]">
              {data.count} items
            </span>
          )}
          <p className="font-[family-name:var(--font-noto)] text-[10px] text-t2 mt-1 leading-relaxed">
            {data.description}
          </p>
        </div>
      </div>
    </div>
  );
}

// ── Tech Card ──────────────────────────────────────────

function TechCard({ data }: { data: TechData }) {
  return (
    <div className="relative bg-[#1C1814] border border-div rounded-none-none p-4 pl-5 overflow-hidden">
      <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#7B5EA7]" />
      <div className="flex items-start gap-2">
        <Cpu size={14} className="text-[#7B5EA7] mt-0.5 shrink-0" />
        <div className="min-w-0">
          <h4 className="font-[family-name:var(--font-playfair)] text-sm font-semibold text-ivory-50">
            {data.title}
          </h4>
          {data.subtitle && (
            <span className="font-[family-name:var(--font-jetbrains)] text-[7px] text-t3 uppercase tracking-[1px]">
              {data.subtitle}
            </span>
          )}
          {data.count !== undefined && (
            <span className="ml-2 font-[family-name:var(--font-jetbrains)] text-[7px] text-[#7B5EA7]">
              {data.count} techs
            </span>
          )}
          <p className="font-[family-name:var(--font-noto)] text-[10px] text-t2 mt-1 leading-relaxed">
            {data.description}
          </p>
        </div>
      </div>
    </div>
  );
}

// ── Contact Card ───────────────────────────────────────

function ContactCard({ data }: { data: ContactData }) {
  return (
    <div className="bg-[#1C1814] border border-div rounded-none-none p-4">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-none-none bg-[#2A2520] flex items-center justify-center shrink-0">
          <span className="font-[family-name:var(--font-playfair)] text-xs font-bold text-ivory-50">
            {data.initials}
          </span>
        </div>
        <div className="min-w-0">
          <h4 className="font-[family-name:var(--font-playfair)] text-sm font-semibold text-ivory-50">
            {data.name}
          </h4>
          <div className="flex items-center gap-2">
            <span className="font-[family-name:var(--font-jetbrains)] text-[7px] text-t3 uppercase tracking-[1px]">
              {data.city}
            </span>
            <span className="text-t3 text-[6px]">|</span>
            <span className="font-[family-name:var(--font-jetbrains)] text-[7px] text-t2">
              {data.specialty}
            </span>
          </div>
          {data.role && (
            <span className="font-[family-name:var(--font-jetbrains)] text-[6px] text-t3 mt-0.5 block">
              {data.role}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Startup Card ───────────────────────────────────────

function StartupCard({ data }: { data: StartupData }) {
  return (
    <div className="bg-[#1C1814] border border-div rounded-none-none p-4">
      <div className="flex items-start justify-between mb-2">
        <div>
          <h4 className="font-[family-name:var(--font-playfair)] text-sm font-semibold text-ivory-50">
            {data.name}
          </h4>
          <span className="font-[family-name:var(--font-jetbrains)] text-[7px] text-t3 uppercase tracking-[1px]">
            {data.country}
          </span>
        </div>
        <div className="flex flex-col items-end gap-1">
          {data.valuation && (
            <span className="font-[family-name:var(--font-jetbrains)] text-[7px] bg-[#B8963E]/15 text-[#B8963E] px-1.5 py-0.5 rounded-none">
              {data.valuation}
            </span>
          )}
          {data.stage && (
            <span className="font-[family-name:var(--font-jetbrains)] text-[6px] text-t3">
              {data.stage}
            </span>
          )}
        </div>
      </div>
      {data.fundraise && (
        <div className="font-[family-name:var(--font-jetbrains)] text-[8px] text-[#3D7C5E] mb-1">
          Levee: {data.fundraise}
        </div>
      )}
      <p className="font-[family-name:var(--font-noto)] text-[10px] text-t2 leading-relaxed">
        {data.description}
      </p>
    </div>
  );
}
