'use client';

import { useState, useEffect, useMemo } from 'react';
import type { AcquisitionCompany, PlaybookPersona, Persona } from './types';
import { PERSONAS, PERSONA_LABELS, PERSONA_COLORS, BRIQUES, BRIQUE_COLORS } from './types';

// Map briques to personas they activate
const BRIQUE_PERSONA_MAP: Record<string, Persona[]> = {
  NOOS: ['DRH', 'DPO', 'CEO'],
  'ÆLYA': ['DRH', 'DPO', 'DSI'],
  'MYNε': ['DSI', 'COO'],
  BURHAN: ['DSI', 'COO', 'CEO'],
  YrKnown: ['DPO', 'CFO'],
  MIZAN: ['COO', 'CEO', 'CFO'],
  RAQIB: ['CEO', 'CFO', 'DSI'],
};

function getPersonasFromBriques(briques: string[]): Set<Persona> {
  const personas = new Set<Persona>();
  for (const b of briques) {
    const mapped = BRIQUE_PERSONA_MAP[b];
    if (mapped) mapped.forEach((p) => personas.add(p));
  }
  return personas;
}

export default function CascadeTab() {
  const [companies, setCompanies] = useState<AcquisitionCompany[]>([]);
  const [playbook, setPlaybook] = useState<PlaybookPersona[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCompanyId, setSelectedCompanyId] = useState('');

  useEffect(() => {
    Promise.all([
      fetch('/api/acquisition/companies').then((r) => r.json()),
      fetch('/api/acquisition/playbook').then((r) => r.json()),
    ])
      .then(([compData, pbData]) => {
        setCompanies(compData.companies ?? []);
        setPlaybook(pbData.playbook ?? []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const selectedCompany = useMemo(
    () => companies.find((c) => c.id === selectedCompanyId),
    [companies, selectedCompanyId],
  );

  const activePersonas = useMemo(
    () => (selectedCompany ? getPersonasFromBriques(selectedCompany.briques ?? []) : new Set<Persona>()),
    [selectedCompany],
  );

  const activeCount = activePersonas.size;

  if (loading) {
    return (
      <div className="p-6 flex items-center gap-2">
        <div className="w-1.5 h-1.5 rounded-none-none bg-gold animate-pulse" />
        <span className="text-[11px] text-t3 font-[family-name:var(--font-jetbrains)]">
          Chargement cascade&hellip;
        </span>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-5">
      {/* Header */}
      <div>
        <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-bold  text-noir">
          Cascade
        </h2>
        <p className="text-[10px] text-t3 font-[family-name:var(--font-jetbrains)] mt-1 tracking-[1px]">
          PARCOURS 6 PERSONAS PAR ENTREPRISE
        </p>
      </div>

      {/* Company selector */}
      <div className="flex items-center gap-4">
        <select
          value={selectedCompanyId}
          onChange={(e) => setSelectedCompanyId(e.target.value)}
          className="px-3 py-2 rounded-none border border-div bg-ivory text-[11px] text-t1 font-[family-name:var(--font-sn)] outline-none focus:border-gold"
          style={{ width: 360 }}
        >
          <option value="">S\u00e9lectionner une entreprise...</option>
          {companies.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name} — {c.sector} ({c.country})
            </option>
          ))}
        </select>
        {selectedCompany && (
          <div className="flex items-center gap-2">
            <span className="text-[9px] text-t3 font-[family-name:var(--font-jetbrains)] tracking-[1px]">
              SCORE
            </span>
            <span
              className="px-2 py-0.5 rounded-none text-[11px] font-[family-name:var(--font-jetbrains)] font-bold"
              style={{
                background: selectedCompany.score >= 80 ? '#3D7C5E15' : '#B8963E15',
                color: selectedCompany.score >= 80 ? '#3D7C5E' : '#B8963E',
              }}
            >
              {selectedCompany.score}
            </span>
            <span className="text-[9px] text-t3 font-[family-name:var(--font-jetbrains)]">
              {selectedCompany.priority}
            </span>
          </div>
        )}
      </div>

      {!selectedCompany && (
        <div className="flex items-center justify-center h-60 border border-div rounded-none bg-ivory">
          <p className="text-[11px] text-t3 font-[family-name:var(--font-sn)]">
            S\u00e9lectionnez une entreprise pour afficher le parcours cascade.
          </p>
        </div>
      )}

      {selectedCompany && (
        <>
          {/* Active briques */}
          <div className="flex gap-2 flex-wrap">
            {BRIQUES.map((b) => {
              const active = (selectedCompany.briques ?? []).includes(b);
              return (
                <div
                  key={b}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-none border"
                  style={{
                    borderColor: active ? BRIQUE_COLORS[b] + '40' : '#D4CCBA30',
                    background: active ? BRIQUE_COLORS[b] + '10' : 'transparent',
                    opacity: active ? 1 : 0.4,
                  }}
                >
                  <div
                    className="w-2 h-2 rounded-none-none"
                    style={{ background: active ? BRIQUE_COLORS[b] : '#D4CCBA' }}
                  />
                  <span
                    className="text-[9px] font-[family-name:var(--font-jetbrains)] tracking-[0.5px]"
                    style={{ color: active ? BRIQUE_COLORS[b] : '#918977' }}
                  >
                    {b}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Progress bar */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[9px] text-t3 font-[family-name:var(--font-jetbrains)] tracking-[1px]">
                COUVERTURE PERSONAS
              </span>
              <span className="text-[9px] text-gold font-[family-name:var(--font-jetbrains)] font-bold">
                {activeCount}/6
              </span>
            </div>
            <div className="h-1.5 rounded-none-none bg-linen overflow-hidden">
              <div
                className="h-full rounded-none-none"
                style={{
                  width: `${(activeCount / 6) * 100}%`,
                  background: 'linear-gradient(90deg, #B8963E, #D4B662)',
                  transition: 'width 0.3s ease',
                }}
              />
            </div>
          </div>

          {/* Persona cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {PERSONAS.map((persona) => {
              const isActive = activePersonas.has(persona);
              const pb = playbook.find((p) => p.persona === persona);

              return (
                <div
                  key={persona}
                  className="rounded-none border overflow-hidden"
                  style={{
                    borderColor: isActive ? PERSONA_COLORS[persona] + '30' : '#D4CCBA30',
                    opacity: isActive ? 1 : 0.35,
                    transition: 'opacity 0.2s',
                  }}
                >
                  {/* Persona header */}
                  <div
                    className="px-4 py-3 flex items-center justify-between"
                    style={{
                      background: isActive ? PERSONA_COLORS[persona] + '08' : '#F7F3EA',
                      borderBottom: `1px solid ${isActive ? PERSONA_COLORS[persona] + '20' : '#D4CCBA20'}`,
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="w-2.5 h-2.5 rounded-none-none"
                        style={{ background: isActive ? PERSONA_COLORS[persona] : '#D4CCBA' }}
                      />
                      <span
                        className="text-[12px] font-[family-name:var(--font-playfair)] font-bold "
                        style={{ color: isActive ? PERSONA_COLORS[persona] : '#918977' }}
                      >
                        {persona}
                      </span>
                    </div>
                    <span
                      className="text-[8px] font-[family-name:var(--font-jetbrains)] tracking-[0.5px] px-1.5 py-0.5 rounded-none"
                      style={{
                        background: isActive ? PERSONA_COLORS[persona] + '15' : '#D4CCBA20',
                        color: isActive ? PERSONA_COLORS[persona] : '#918977',
                      }}
                    >
                      {isActive ? 'ACTIF' : 'INACTIF'}
                    </span>
                  </div>

                  {/* Persona body */}
                  <div className="px-4 py-3 bg-ivory space-y-2">
                    <div className="text-[10px] text-t2 font-[family-name:var(--font-sn)]">
                      {PERSONA_LABELS[persona]}
                    </div>

                    {isActive && pb && (
                      <>
                        {/* Hook */}
                        <div className="p-2 rounded-none bg-cream border border-div-l">
                          <div className="text-[8px] text-t3 font-[family-name:var(--font-jetbrains)] tracking-[1px] mb-1">HOOK</div>
                          <div className="text-[10px] text-t1 font-[family-name:var(--font-sn)] leading-relaxed">
                            {pb.hook}
                          </div>
                        </div>

                        {/* Products */}
                        <div className="flex gap-1.5 flex-wrap">
                          {pb.produits.map((prod) => (
                            <span
                              key={prod}
                              className="text-[8px] font-[family-name:var(--font-jetbrains)] px-1.5 py-0.5 rounded-none border border-div-l text-t2"
                            >
                              {prod}
                            </span>
                          ))}
                        </div>

                        {/* Metrics */}
                        <div className="grid grid-cols-3 gap-2">
                          {[
                            { label: 'PRIX', value: pb.prix },
                            { label: 'CAC', value: pb.cac },
                            { label: 'LTV', value: pb.ltv },
                          ].map((m) => (
                            <div key={m.label} className="text-center p-1.5 rounded-none bg-cream border border-div-l">
                              <div className="text-[7px] text-t3 font-[family-name:var(--font-jetbrains)] tracking-[1px]">
                                {m.label}
                              </div>
                              <div className="text-[10px] text-gold font-[family-name:var(--font-jetbrains)] font-bold mt-0.5">
                                {m.value}
                              </div>
                            </div>
                          ))}
                        </div>
                      </>
                    )}

                    {!isActive && (
                      <div className="text-[10px] text-t3 font-[family-name:var(--font-sn)] ">
                        Aucune brique active ne d\u00e9clenche ce persona.
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
