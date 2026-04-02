'use client';

import { useEffect, useState, useCallback } from 'react';
import type { AcquisitionCompany, AcquisitionStage } from './types';
import {
  STAGE_ORDER,
  STAGE_LABELS,
  STAGE_COLORS,
  PRIORITY_COLORS,
} from './types';

interface CompaniesResponse {
  companies: AcquisitionCompany[];
  grouped: Record<AcquisitionStage, AcquisitionCompany[]>;
}

export function PipelineView() {
  const [grouped, setGrouped] = useState<Record<AcquisitionStage, AcquisitionCompany[]> | null>(null);
  const [selected, setSelected] = useState<AcquisitionCompany | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(() => {
    fetch('/api/acquisition/companies')
      .then((r) => r.json())
      .then((d: CompaniesResponse) => { if (d.grouped) setGrouped(d.grouped); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const moveStage = async (company: AcquisitionCompany, direction: 'forward' | 'backward') => {
    const idx = STAGE_ORDER.indexOf(company.stage);
    const nextIdx = direction === 'forward' ? idx + 1 : idx - 1;
    if (nextIdx < 0 || nextIdx >= STAGE_ORDER.length) return;

    const newStage = STAGE_ORDER[nextIdx];
    await fetch('/api/acquisition/companies', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: company.id, stage: newStage }),
    });
    fetchData();
    if (selected?.id === company.id) {
      setSelected({ ...company, stage: newStage });
    }
  };

  if (loading) {
    return (
      <div className="flex gap-3 overflow-x-auto pb-4">
        {STAGE_ORDER.map((s) => (
          <div key={s} className="w-52 shrink-0 bg-ivory border border-div rounded-none p-3 h-64 animate-pulse" />
        ))}
      </div>
    );
  }

  if (!grouped) {
    return (
      <div className="bg-ivory border border-div rounded-none p-8 text-center">
        <p className="font-[family-name:var(--font-jetbrains)] text-[10px] text-t3">
          Erreur de chargement du pipeline
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* ── Kanban columns ── */}
      <div className="flex gap-3 overflow-x-auto pb-4">
        {STAGE_ORDER.map((stage) => {
          const companies = grouped[stage] ?? [];
          return (
            <div key={stage} className="w-52 shrink-0 flex flex-col">
              {/* Column header */}
              <div className="flex items-center gap-2 mb-3 px-1">
                <div className="w-2 h-2 rounded-none-none" style={{ background: STAGE_COLORS[stage] }} />
                <span className="text-[8px] font-[family-name:var(--font-jetbrains)] text-t2 tracking-[1px] uppercase">
                  {STAGE_LABELS[stage]}
                </span>
                <span
                  className="ml-auto text-[8px] font-[family-name:var(--font-jetbrains)] font-bold px-1.5 py-0.5 rounded-none"
                  style={{
                    color: STAGE_COLORS[stage],
                    background: `${STAGE_COLORS[stage]}15`,
                  }}
                >
                  {companies.length}
                </span>
              </div>

              {/* Cards */}
              <div className="space-y-2 flex-1 min-h-[200px] bg-cream/50 rounded-none p-2">
                {companies.map((c) => (
                  <PipelineCard
                    key={c.id}
                    company={c}
                    onClick={() => setSelected(c)}
                    isSelected={selected?.id === c.id}
                  />
                ))}
                {companies.length === 0 && (
                  <div className="flex items-center justify-center h-full">
                    <span className="text-[8px] font-[family-name:var(--font-jetbrains)] text-tm">
                      Vide
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Detail panel ── */}
      {selected && (
        <CompanyDetail
          company={selected}
          onClose={() => setSelected(null)}
          onMoveForward={() => moveStage(selected, 'forward')}
          onMoveBackward={() => moveStage(selected, 'backward')}
        />
      )}
    </div>
  );
}

// ── Pipeline Card ──────────────────────────────────────

function PipelineCard({
  company,
  onClick,
  isSelected,
}: {
  company: AcquisitionCompany;
  onClick: () => void;
  isSelected: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left bg-ivory border rounded-none p-3 transition-all hover:shadow-sm cursor-pointer ${
        isSelected ? 'border-gold shadow-sm' : 'border-div'
      }`}
    >
      <div className="flex items-start justify-between gap-1 mb-1">
        <span className="text-[10px] font-[family-name:var(--font-playfair)] font-semibold text-t1 leading-tight truncate">
          {company.name}
        </span>
        <span
          className="text-[7px] font-[family-name:var(--font-jetbrains)] px-1 py-0.5 rounded-none shrink-0"
          style={{
            color: PRIORITY_COLORS[company.priority],
            background: `${PRIORITY_COLORS[company.priority]}15`,
          }}
        >
          {company.priority}
        </span>
      </div>
      <div className="text-[8px] font-[family-name:var(--font-jetbrains)] text-t3 truncate">
        {company.sector}
      </div>
      <div className="flex items-center justify-between mt-2">
        <span className="text-[9px] font-[family-name:var(--font-jetbrains)] font-bold text-gold">
          {company.score}
        </span>
        <span className="text-[7px] font-[family-name:var(--font-jetbrains)] text-tm">
          T{company.tier}
        </span>
      </div>
    </button>
  );
}

// ── Company Detail Panel ───────────────────────────────

function CompanyDetail({
  company,
  onClose,
  onMoveForward,
  onMoveBackward,
}: {
  company: AcquisitionCompany;
  onClose: () => void;
  onMoveForward: () => void;
  onMoveBackward: () => void;
}) {
  const stageIdx = STAGE_ORDER.indexOf(company.stage);
  const canForward = stageIdx < STAGE_ORDER.length - 1;
  const canBackward = stageIdx > 0;

  return (
    <div className="bg-ivory border border-gold rounded-none-none p-5">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-[family-name:var(--font-playfair)] text-lg font-bold  text-t1">
            {company.name}
          </h3>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-[8px] font-[family-name:var(--font-jetbrains)] text-t3 tracking-[1px] uppercase">
              {company.sector} · {company.country}
            </span>
            <span
              className="text-[7px] font-[family-name:var(--font-jetbrains)] px-1.5 py-0.5 rounded-none"
              style={{
                color: PRIORITY_COLORS[company.priority],
                background: `${PRIORITY_COLORS[company.priority]}15`,
              }}
            >
              {company.priority}
            </span>
            <span className="text-[7px] font-[family-name:var(--font-jetbrains)] text-tm">
              Tier {company.tier}
            </span>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-[10px] font-[family-name:var(--font-jetbrains)] text-tm hover:text-t1 transition-colors cursor-pointer"
        >
          ✕
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <div>
          <div className="text-[7px] font-[family-name:var(--font-jetbrains)] text-tm tracking-[1px] uppercase mb-0.5">
            Score
          </div>
          <div className="text-sm font-[family-name:var(--font-playfair)] font-bold  text-gold">
            {company.score}
          </div>
        </div>
        <div>
          <div className="text-[7px] font-[family-name:var(--font-jetbrains)] text-tm tracking-[1px] uppercase mb-0.5">
            Stage
          </div>
          <div
            className="text-[10px] font-[family-name:var(--font-jetbrains)] font-medium"
            style={{ color: STAGE_COLORS[company.stage] }}
          >
            {STAGE_LABELS[company.stage]}
          </div>
        </div>
        <div>
          <div className="text-[7px] font-[family-name:var(--font-jetbrains)] text-tm tracking-[1px] uppercase mb-0.5">
            Région
          </div>
          <div className="text-[10px] font-[family-name:var(--font-jetbrains)] text-t1">
            {company.region}
          </div>
        </div>
        <div>
          <div className="text-[7px] font-[family-name:var(--font-jetbrains)] text-tm tracking-[1px] uppercase mb-0.5">
            Revenue est.
          </div>
          <div className="text-[10px] font-[family-name:var(--font-jetbrains)] text-t1">
            €{company.revenue_estimate?.toLocaleString() ?? '—'}
          </div>
        </div>
      </div>

      {/* Briques & Personas */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        {company.briques?.length > 0 && (
          <div>
            <div className="text-[7px] font-[family-name:var(--font-jetbrains)] text-tm tracking-[1px] uppercase mb-1">
              Briques
            </div>
            <div className="flex flex-wrap gap-1">
              {company.briques.map((b) => (
                <span
                  key={b}
                  className="text-[7px] font-[family-name:var(--font-jetbrains)] bg-gold/10 text-gold px-1.5 py-0.5 rounded-none"
                >
                  {b}
                </span>
              ))}
            </div>
          </div>
        )}
        {company.personas?.length > 0 && (
          <div>
            <div className="text-[7px] font-[family-name:var(--font-jetbrains)] text-tm tracking-[1px] uppercase mb-1">
              Personas
            </div>
            <div className="flex flex-wrap gap-1">
              {company.personas.map((p) => (
                <span
                  key={p}
                  className="text-[7px] font-[family-name:var(--font-jetbrains)] bg-sapphire/10 text-sapphire px-1.5 py-0.5 rounded-none"
                >
                  {p}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Contact */}
      {company.contact_name && (
        <div className="mb-4">
          <div className="text-[7px] font-[family-name:var(--font-jetbrains)] text-tm tracking-[1px] uppercase mb-0.5">
            Contact
          </div>
          <div className="text-[10px] font-[family-name:var(--font-noto)] text-t1">
            {company.contact_name}
            {company.contact_email && (
              <span className="text-t3 ml-2">{company.contact_email}</span>
            )}
          </div>
        </div>
      )}

      {/* Notes */}
      {company.notes && (
        <div className="mb-4">
          <div className="text-[7px] font-[family-name:var(--font-jetbrains)] text-tm tracking-[1px] uppercase mb-0.5">
            Notes
          </div>
          <p className="text-[10px] font-[family-name:var(--font-noto)] text-t2 leading-relaxed">
            {company.notes}
          </p>
        </div>
      )}

      {/* Stage controls */}
      <div className="flex items-center gap-2 pt-3 border-t border-div">
        <button
          onClick={onMoveBackward}
          disabled={!canBackward}
          className={`text-[8px] font-[family-name:var(--font-jetbrains)] tracking-[1px] uppercase border rounded-none px-3 py-1.5 transition-colors cursor-pointer ${
            canBackward
              ? 'border-div text-t2 hover:border-gold hover:text-gold'
              : 'border-div text-tm opacity-50 cursor-not-allowed'
          }`}
        >
          ← Reculer
        </button>
        <button
          onClick={onMoveForward}
          disabled={!canForward}
          className={`text-[8px] font-[family-name:var(--font-jetbrains)] tracking-[1px] uppercase border rounded-none px-3 py-1.5 transition-colors cursor-pointer ${
            canForward
              ? 'border-gold text-gold hover:bg-gold hover:text-ivory'
              : 'border-div text-tm opacity-50 cursor-not-allowed'
          }`}
        >
          Avancer →
        </button>
      </div>
    </div>
  );
}

export default PipelineView;
