'use client';

import { useState, useEffect, useMemo } from 'react';
import type { AcquisitionCompany, Regulation } from './types';
import { BRIQUE_COLORS } from './types';
import type { Brique } from './types';

export default function ForcageLegalTab() {
  const [companies, setCompanies] = useState<AcquisitionCompany[]>([]);
  const [regulations, setRegulations] = useState<Regulation[]>([]);
  const [allSectors, setAllSectors] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCompanyId, setSelectedCompanyId] = useState('');
  const [viewMode, setViewMode] = useState<'company' | 'matrix'>('company');

  useEffect(() => {
    Promise.all([
      fetch('/api/acquisition/companies').then((r) => r.json()),
      fetch('/api/acquisition/regulations').then((r) => r.json()),
    ])
      .then(([compData, regData]) => {
        setCompanies(compData.companies ?? []);
        setRegulations(regData.regulations ?? []);
        setAllSectors(regData.sectors ?? []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const selectedCompany = useMemo(
    () => companies.find((c) => c.id === selectedCompanyId),
    [companies, selectedCompanyId],
  );

  const applicableRegulations = useMemo(() => {
    if (!selectedCompany) return [];
    return regulations.filter(
      (r) => r.sectors.includes(selectedCompany.sector) || r.countries.includes(selectedCompany.country),
    );
  }, [selectedCompany, regulations]);

  // Matrix: sectors vs regulations
  const matrixSectors = useMemo(() => {
    const sectorSet = new Set<string>();
    for (const c of companies) sectorSet.add(c.sector);
    return [...sectorSet].sort();
  }, [companies]);

  if (loading) {
    return (
      <div className="p-6 flex items-center gap-2">
        <div className="w-1.5 h-1.5 rounded-none-none bg-gold animate-pulse" />
        <span className="text-[11px] text-t3 font-[family-name:var(--font-jetbrains)]">
          Chargement for\u00e7age l\u00e9gal&hellip;
        </span>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-bold  text-noir">
            For\u00e7age L\u00e9gal
          </h2>
          <p className="text-[10px] text-t3 font-[family-name:var(--font-jetbrains)] mt-1 tracking-[1px]">
            {regulations.length} R\u00c9GLEMENTATIONS &middot; FORCING FUNCTIONS JURIDIQUES
          </p>
        </div>
        <div className="flex gap-1 rounded-none border border-div overflow-hidden">
          {(['company', 'matrix'] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              className="px-3 py-1.5 text-[9px] font-[family-name:var(--font-jetbrains)] tracking-[1px] cursor-pointer border-none"
              style={{
                background: viewMode === mode ? '#B8963E15' : 'transparent',
                color: viewMode === mode ? '#B8963E' : '#918977',
                fontWeight: viewMode === mode ? 700 : 400,
              }}
            >
              {mode === 'company' ? 'PAR ENTREPRISE' : 'MATRICE'}
            </button>
          ))}
        </div>
      </div>

      {/* ═══ VIEW: Per company ═══ */}
      {viewMode === 'company' && (
        <>
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

          {!selectedCompany && (
            <div className="flex items-center justify-center h-48 border border-div rounded-none bg-ivory">
              <p className="text-[11px] text-t3 font-[family-name:var(--font-sn)]">
                S\u00e9lectionnez une entreprise pour voir les r\u00e9glementations applicables.
              </p>
            </div>
          )}

          {selectedCompany && (
            <div className="space-y-3">
              <div className="text-[10px] text-t2 font-[family-name:var(--font-sn)]">
                <span className="font-bold text-t1">{selectedCompany.name}</span> &mdash; {selectedCompany.sector}, {selectedCompany.country} &middot;{' '}
                <span className="text-gold font-bold">{applicableRegulations.length} r\u00e9gulations applicables</span>
              </div>

              {applicableRegulations.map((reg) => (
                <div
                  key={reg.id}
                  className="border border-div rounded-none bg-ivory overflow-hidden"
                >
                  <div className="px-4 py-3 flex items-start justify-between gap-4 border-b border-div-l">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[14px] font-[family-name:var(--font-playfair)] font-bold  text-noir">
                          {reg.name}
                        </span>
                        <span className="text-[8px] font-[family-name:var(--font-jetbrains)] px-1.5 py-0.5 rounded-none bg-ruby/10 text-ruby tracking-[0.5px]">
                          DEADLINE {reg.deadline}
                        </span>
                      </div>
                      <p className="text-[10px] text-t2 font-[family-name:var(--font-sn)] mt-1">
                        {reg.description}
                      </p>
                    </div>
                  </div>

                  <div className="px-4 py-3 flex items-center gap-6 flex-wrap">
                    {/* Penalty */}
                    <div>
                      <div className="text-[7px] text-t3 font-[family-name:var(--font-jetbrains)] tracking-[1px] mb-0.5">
                        P\u00c9NALIT\u00c9
                      </div>
                      <div className="text-[10px] text-ruby font-[family-name:var(--font-sn)] font-medium">
                        {reg.penalty}
                      </div>
                    </div>

                    {/* Briques activated */}
                    <div>
                      <div className="text-[7px] text-t3 font-[family-name:var(--font-jetbrains)] tracking-[1px] mb-1">
                        BRIQUES EIGEN ACTIV\u00c9ES
                      </div>
                      <div className="flex gap-1.5">
                        {reg.briques_activated.map((b) => (
                          <span
                            key={b}
                            className="flex items-center gap-1 px-2 py-0.5 rounded-none text-[8px] font-[family-name:var(--font-jetbrains)] tracking-[0.5px]"
                            style={{
                              background: BRIQUE_COLORS[b as Brique] + '15',
                              color: BRIQUE_COLORS[b as Brique],
                            }}
                          >
                            <span className="w-1.5 h-1.5 rounded-none-none" style={{ background: BRIQUE_COLORS[b as Brique] }} />
                            {b}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Sectors */}
                    <div>
                      <div className="text-[7px] text-t3 font-[family-name:var(--font-jetbrains)] tracking-[1px] mb-0.5">
                        SECTEURS CONCERN\u00c9S
                      </div>
                      <div className="text-[9px] text-t2 font-[family-name:var(--font-sn)]">
                        {reg.sectors.slice(0, 5).join(', ')}
                        {reg.sectors.length > 5 && ` +${reg.sectors.length - 5}`}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {applicableRegulations.length === 0 && (
                <div className="p-6 text-center text-[11px] text-t3 font-[family-name:var(--font-sn)] border border-div rounded-none bg-ivory">
                  Aucune r\u00e9gulation applicable trouv\u00e9e pour ce profil.
                </div>
              )}
            </div>
          )}
        </>
      )}

      {/* ═══ VIEW: Matrix ═══ */}
      {viewMode === 'matrix' && (
        <div className="border border-div rounded-none bg-ivory overflow-auto" style={{ maxHeight: 'calc(100vh - 260px)' }}>
          <table className="w-full border-collapse" style={{ minWidth: 600 }}>
            <thead>
              <tr className="border-b border-div bg-cream sticky top-0 z-10">
                <th className="text-left px-3 py-2 text-[9px] text-t3 font-[family-name:var(--font-jetbrains)] tracking-[1px]" style={{ width: 140 }}>
                  SECTEUR
                </th>
                {regulations.map((r) => (
                  <th
                    key={r.id}
                    className="text-center px-2 py-2 text-[8px] text-t2 font-[family-name:var(--font-jetbrains)] tracking-[0.5px]"
                    style={{ width: 80 }}
                  >
                    {r.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {matrixSectors.map((sector) => (
                <tr key={sector} className="border-b border-div-l hover:bg-cream/50">
                  <td className="px-3 py-2 text-[10px] text-t1 font-[family-name:var(--font-sn)] font-medium">
                    {sector}
                  </td>
                  {regulations.map((reg) => {
                    const applies = reg.sectors.includes(sector);
                    return (
                      <td key={reg.id} className="text-center px-2 py-2">
                        {applies ? (
                          <div
                            className="w-3 h-3 rounded-none-none mx-auto bg-ruby"
                            style={{ boxShadow: '0 0 6px #9C3D3D40' }}
                            title={`${reg.name} s'applique à ${sector}`}
                          />
                        ) : (
                          <div className="w-2 h-2 rounded-none-none mx-auto" style={{ background: '#D4CCBA30' }} />
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
