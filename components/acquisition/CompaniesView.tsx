'use client';

import { useEffect, useState, useMemo } from 'react';
import { Search, X, ExternalLink, Users, Globe, ChevronDown } from 'lucide-react';
import type {
  AcquisitionCompany,
  AcquisitionContact,
  AcquisitionStage,
  Priority,
  Brique,
  Persona,
} from './types';
import {
  STAGE_LABELS,
  STAGE_COLORS,
  STAGE_ORDER,
  PRIORITY_COLORS,
  BRIQUES,
  BRIQUE_COLORS,
  PERSONA_COLORS,
  PERSONA_LABELS,
  SECTORS,
  TIER_REVENUE,
} from './types';

// ── Helpers ──────────────────────────

function fmt(n: number): string {
  if (n >= 1_000_000) return `€${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `€${(n / 1_000).toFixed(0)}K`;
  return `€${n}`;
}

function scoreColor(score: number): string {
  if (score >= 80) return '#3D7C5E';
  if (score >= 60) return '#B8963E';
  if (score >= 40) return '#B87D3E';
  return '#9C3D3D';
}

// ── Shared micro-components ──────────────────────────

function Pill({ label, color }: { label: string; color: string }) {
  return (
    <span
      className="inline-block text-[7px] font-[family-name:var(--font-jetbrains)] px-1.5 py-0.5 rounded-none tracking-[0.5px]"
      style={{ color, background: `${color}15` }}
    >
      {label}
    </span>
  );
}

function ScoreBadge({ score }: { score: number }) {
  const c = scoreColor(score);
  return (
    <span
      className="inline-flex items-center justify-center text-[10px] font-[family-name:var(--font-jetbrains)] font-bold rounded-none px-2 py-0.5 min-w-[32px]"
      style={{ color: c, background: `${c}15`, border: `1px solid ${c}30` }}
    >
      {score}
    </span>
  );
}

function BriqueDot({ brique, active }: { brique: string; active: boolean }) {
  const color = BRIQUE_COLORS[brique as Brique] ?? '#918977';
  return (
    <span
      className="inline-block rounded-none-none"
      style={{
        width: 8,
        height: 8,
        background: active ? color : 'transparent',
        border: `1.5px solid ${active ? color : '#D4CCBA'}`,
        opacity: active ? 1 : 0.35,
      }}
      title={brique}
    />
  );
}

function FilterDropdown({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (v: string) => void;
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none bg-ivory border border-div rounded-none px-2.5 py-1.5 pr-7 text-[9px] font-[family-name:var(--font-jetbrains)] text-t2 cursor-pointer focus:outline-none focus:border-gold"
      >
        <option value="">{label}</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-t3 pointer-events-none" />
    </div>
  );
}

// Table header/cell base styles
const thS =
  'text-[8px] font-[family-name:var(--font-jetbrains)] tracking-[1px] uppercase text-tm px-3 py-2.5 text-left whitespace-nowrap bg-noir text-ivory sticky top-0 z-10';
const tdS =
  'text-[10px] font-[family-name:var(--font-noto)] text-t2 px-3 py-2 border-b border-div-l whitespace-nowrap';

// ── Main View ──────────────────────────

export function CompaniesView() {
  const [companies, setCompanies] = useState<AcquisitionCompany[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<AcquisitionCompany | null>(null);
  const [contacts, setContacts] = useState<AcquisitionContact[]>([]);

  // Filters
  const [search, setSearch] = useState('');
  const [sectorFilter, setSectorFilter] = useState('');
  const [countryFilter, setCountryFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [stageFilter, setStageFilter] = useState('');

  useEffect(() => {
    fetch('/api/acquisition/companies')
      .then((r) => r.json())
      .then((d) => setCompanies(d.companies ?? []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  // Fetch contacts when detail panel opens
  useEffect(() => {
    if (!selected) return;
    fetch('/api/acquisition/contacts')
      .then((r) => r.json())
      .then((d) => setContacts(d.contacts ?? []))
      .catch(() => {});
  }, [selected]);

  // Derived filter options
  const countries = useMemo(
    () => [...new Set(companies.map((c) => c.country))].sort(),
    [companies]
  );

  const filtered = useMemo(() => {
    return companies.filter((c) => {
      if (search && !c.name.toLowerCase().includes(search.toLowerCase()) && !c.sector.toLowerCase().includes(search.toLowerCase()))
        return false;
      if (sectorFilter && c.sector !== sectorFilter) return false;
      if (countryFilter && c.country !== countryFilter) return false;
      if (priorityFilter && c.priority !== priorityFilter) return false;
      if (stageFilter && c.stage !== stageFilter) return false;
      return true;
    });
  }, [companies, search, sectorFilter, countryFilter, priorityFilter, stageFilter]);

  const activeFilters = [sectorFilter, countryFilter, priorityFilter, stageFilter, search].filter(Boolean).length;

  if (loading) {
    return (
      <div className="p-6 space-y-3 animate-pulse">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="bg-ivory border border-div rounded-none h-10" />
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* ── Toolbar ── */}
      <div className="flex-shrink-0 px-6 py-3 bg-ivory border-b border-div flex items-center gap-3 flex-wrap">
        {/* Search */}
        <div className="relative flex-1 min-w-[180px] max-w-[300px]">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-t3" />
          <input
            type="text"
            placeholder="Rechercher..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-cream border border-div rounded-none pl-8 pr-3 py-1.5 text-[10px] font-[family-name:var(--font-noto)] text-t1 placeholder:text-tm focus:outline-none focus:border-gold"
          />
        </div>

        <FilterDropdown
          label="Secteur"
          value={sectorFilter}
          options={SECTORS.map((s) => ({ value: s, label: s }))}
          onChange={setSectorFilter}
        />
        <FilterDropdown
          label="Pays HQ"
          value={countryFilter}
          options={countries.map((c) => ({ value: c, label: c }))}
          onChange={setCountryFilter}
        />
        <FilterDropdown
          label="Priorité"
          value={priorityFilter}
          options={(['P0', 'P1', 'P2', 'P3'] as Priority[]).map((p) => ({ value: p, label: p }))}
          onChange={setPriorityFilter}
        />
        <FilterDropdown
          label="Stage"
          value={stageFilter}
          options={STAGE_ORDER.map((s) => ({ value: s, label: STAGE_LABELS[s] }))}
          onChange={setStageFilter}
        />

        {activeFilters > 0 && (
          <button
            onClick={() => {
              setSearch('');
              setSectorFilter('');
              setCountryFilter('');
              setPriorityFilter('');
              setStageFilter('');
            }}
            className="text-[8px] font-[family-name:var(--font-jetbrains)] text-ruby hover:underline cursor-pointer"
          >
            Réinitialiser ({activeFilters})
          </button>
        )}

        <span className="text-[8px] font-[family-name:var(--font-jetbrains)] text-tm ml-auto">
          {filtered.length} / {companies.length}
        </span>
      </div>

      {/* ── Table ── */}
      <div className="flex-1 overflow-auto">
        <table className="w-full border-collapse min-w-[1100px]">
          <thead>
            <tr>
              <th className={thS}>Entreprise</th>
              <th className={thS}>HQ</th>
              <th className={thS}>Secteur</th>
              <th className={thS}>Revenue</th>
              <th className={thS}>Empl.</th>
              {BRIQUES.map((b) => (
                <th key={b} className={`${thS} text-center`} title={b}>
                  <span className="text-[7px]">{b.slice(0, 3)}</span>
                </th>
              ))}
              <th className={`${thS} text-center`}>Corridor</th>
              <th className={`${thS} text-center`}>Score</th>
              <th className={thS}>Priority</th>
              <th className={thS}>Stage</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((c, i) => (
              <tr
                key={c.id}
                onClick={() => setSelected(c)}
                className={`cursor-pointer transition-colors hover:bg-parchment ${
                  i % 2 === 0 ? 'bg-ivory' : 'bg-cream'
                } ${selected?.id === c.id ? 'bg-parchment' : ''}`}
              >
                <td className={tdS}>
                  <span className="font-[family-name:var(--font-playfair)] text-[12px] font-bold  text-t1">
                    {c.name}
                  </span>
                </td>
                <td className={tdS}>{c.country}</td>
                <td className={tdS}>{c.sector}</td>
                <td className={`${tdS} font-[family-name:var(--font-jetbrains)] text-gold`}>
                  {fmt(c.revenue_estimate)}
                </td>
                <td className={`${tdS} text-center`}>—</td>
                {BRIQUES.map((b) => (
                  <td key={b} className={`${tdS} text-center`}>
                    <BriqueDot brique={b} active={c.briques?.includes(b)} />
                  </td>
                ))}
                <td className={`${tdS} text-center`}>
                  <span className="text-[9px] font-[family-name:var(--font-jetbrains)] text-sapphire">
                    {c.region === 'Corridor' ? '1' : '—'}
                  </span>
                </td>
                <td className={`${tdS} text-center`}>
                  <ScoreBadge score={c.score} />
                </td>
                <td className={tdS}>
                  <Pill label={c.priority} color={PRIORITY_COLORS[c.priority]} />
                </td>
                <td className={tdS}>
                  <Pill label={STAGE_LABELS[c.stage]} color={STAGE_COLORS[c.stage]} />
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={14} className="text-center py-12">
                  <p className="text-[10px] font-[family-name:var(--font-noto)] text-t3">
                    Aucune entreprise ne correspond aux filtres
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ── Detail Slide-In ── */}
      {selected && (
        <CompanyDetailPanel
          company={selected}
          contacts={contacts.filter((ct) => ct.company_id === selected.id)}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}

// ── Detail Panel ──────────────────────────

function CompanyDetailPanel({
  company,
  contacts,
  onClose,
}: {
  company: AcquisitionCompany;
  contacts: AcquisitionContact[];
  onClose: () => void;
}) {
  const tierInfo = TIER_REVENUE[company.tier];

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-noir/30 z-40"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="fixed right-0 top-0 h-full w-[460px] max-w-[90vw] z-50 bg-ivory border-l border-div shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex-shrink-0 flex items-center justify-between px-5 py-4 border-b border-div">
          <div>
            <h3 className="font-[family-name:var(--font-playfair)] text-lg font-bold  text-noir">
              {company.name}
            </h3>
            <p className="text-[9px] font-[family-name:var(--font-jetbrains)] text-t3 mt-0.5">
              {company.sector} · {company.country} · {company.region}
            </p>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-cream rounded-none cursor-pointer">
            <X className="w-4 h-4 text-t3" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5">
          {/* Status row */}
          <div className="flex items-center gap-2 flex-wrap">
            <Pill label={company.priority} color={PRIORITY_COLORS[company.priority]} />
            <Pill label={STAGE_LABELS[company.stage]} color={STAGE_COLORS[company.stage]} />
            <ScoreBadge score={company.score} />
            <span className="text-[8px] font-[family-name:var(--font-jetbrains)] text-tm ml-auto">
              Tier {company.tier}
            </span>
          </div>

          {/* Properties grid */}
          <DetailSection title="Informations">
            <PropRow label="Revenue estimé" value={fmt(company.revenue_estimate)} />
            <PropRow label="Région" value={company.region} />
            <PropRow label="Tier" value={`T${company.tier} — ${tierInfo.label}`} />
            <PropRow label="Créé le" value={new Date(company.created_at).toLocaleDateString('fr-FR')} />
            <PropRow label="Mis à jour" value={new Date(company.updated_at).toLocaleDateString('fr-FR')} />
          </DetailSection>

          {/* Briques */}
          <DetailSection title="Briques activées">
            <div className="flex items-center gap-2 flex-wrap">
              {BRIQUES.map((b) => {
                const active = company.briques?.includes(b);
                return (
                  <span
                    key={b}
                    className="inline-flex items-center gap-1 text-[8px] font-[family-name:var(--font-jetbrains)]"
                    style={{ color: active ? BRIQUE_COLORS[b] : '#B8AE9C' }}
                  >
                    <BriqueDot brique={b} active={active} />
                    {b}
                  </span>
                );
              })}
            </div>
          </DetailSection>

          {/* Personas */}
          {company.personas?.length > 0 && (
            <DetailSection title="Personas ciblés">
              <div className="flex items-center gap-2 flex-wrap">
                {company.personas.map((p) => (
                  <Pill
                    key={p}
                    label={PERSONA_LABELS[p as Persona] ?? p}
                    color={PERSONA_COLORS[p as Persona] ?? '#918977'}
                  />
                ))}
              </div>
            </DetailSection>
          )}

          {/* Contacts associés */}
          <DetailSection title={`Contacts (${contacts.length})`}>
            {contacts.length === 0 ? (
              <p className="text-[9px] font-[family-name:var(--font-noto)] text-t3">Aucun contact associé</p>
            ) : (
              <div className="space-y-2">
                {contacts.map((ct) => (
                  <div key={ct.id} className="flex items-center gap-2 p-2 bg-cream rounded-none">
                    <Users className="w-3 h-3 text-t3 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="text-[10px] font-[family-name:var(--font-noto)] text-t1 truncate">
                        {ct.name}
                      </div>
                      <div className="text-[8px] font-[family-name:var(--font-jetbrains)] text-t3">
                        {ct.role}
                      </div>
                    </div>
                    <Pill label={ct.persona} color={PERSONA_COLORS[ct.persona] ?? '#918977'} />
                    {ct.linkedin && (
                      <a
                        href={ct.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sapphire hover:text-gold"
                      >
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            )}
          </DetailSection>

          {/* Projection revenue */}
          <DetailSection title="Projection Revenue">
            <div className="bg-cream rounded-none p-3 space-y-1.5">
              <PropRow label="Abo annuel" value={fmt(tierInfo.abo)} />
              <PropRow label="B2B2C" value={fmt(tierInfo.b2b2c)} />
              <PropRow
                label="Total estimé"
                value={fmt(tierInfo.total)}
                bold
              />
            </div>
          </DetailSection>

          {/* Notes */}
          {company.notes && (
            <DetailSection title="Notes">
              <p className="text-[10px] font-[family-name:var(--font-noto)] text-t2 leading-relaxed">
                {company.notes}
              </p>
            </DetailSection>
          )}
        </div>
      </div>
    </>
  );
}

// ── Detail sub-components ──────────────────────────

function DetailSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="text-[8px] font-[family-name:var(--font-jetbrains)] text-tm tracking-[1.5px] uppercase mb-2">
        {title}
      </h4>
      {children}
    </div>
  );
}

function PropRow({ label, value, bold }: { label: string; value: string | number; bold?: boolean }) {
  return (
    <div className="flex items-center justify-between py-1 border-b border-div-l last:border-0">
      <span className="text-[9px] font-[family-name:var(--font-jetbrains)] text-t3">{label}</span>
      <span
        className={`text-[10px] font-[family-name:var(--font-jetbrains)] ${
          bold ? 'text-gold font-bold' : 'text-t1'
        }`}
      >
        {value}
      </span>
    </div>
  );
}

export default CompaniesView;
