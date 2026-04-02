'use client';

import { useState, useEffect, useMemo } from 'react';
import type { AcquisitionCompany } from './types';
import { BRIQUES, BRIQUE_COLORS } from './types';
import type { Brique } from './types';

export default function BriquesCiblesTab() {
  const [companies, setCompanies] = useState<AcquisitionCompany[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortField, setSortField] = useState<'score' | 'name' | 'sector'>('score');
  const [sortAsc, setSortAsc] = useState(false);
  const [filterSector, setFilterSector] = useState('');
  const [filterCountry, setFilterCountry] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('/api/acquisition/companies')
      .then((r) => r.json())
      .then((d) => {
        setCompanies(d.companies ?? []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const sectors = useMemo(
    () => [...new Set(companies.map((c) => c.sector))].sort(),
    [companies],
  );
  const countries = useMemo(
    () => [...new Set(companies.map((c) => c.country))].sort(),
    [companies],
  );

  const filtered = useMemo(() => {
    let list = companies;
    if (filterSector) list = list.filter((c) => c.sector === filterSector);
    if (filterCountry) list = list.filter((c) => c.country === filterCountry);
    if (search) {
      const q = search.toLowerCase();
      list = list.filter((c) => c.name.toLowerCase().includes(q));
    }
    list = [...list].sort((a, b) => {
      if (sortField === 'score') return sortAsc ? a.score - b.score : b.score - a.score;
      if (sortField === 'name') return sortAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
      return sortAsc ? a.sector.localeCompare(b.sector) : b.sector.localeCompare(a.sector);
    });
    return list;
  }, [companies, filterSector, filterCountry, search, sortField, sortAsc]);

  const toggleSort = (field: typeof sortField) => {
    if (sortField === field) setSortAsc(!sortAsc);
    else { setSortField(field); setSortAsc(false); }
  };

  const sortArrow = (field: typeof sortField) =>
    sortField === field ? (sortAsc ? ' \u25B2' : ' \u25BC') : '';

  // Brique coverage stats
  const briqueCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const b of BRIQUES) counts[b] = 0;
    for (const c of filtered) {
      for (const b of c.briques ?? []) {
        if (counts[b] !== undefined) counts[b]++;
      }
    }
    return counts;
  }, [filtered]);

  if (loading) {
    return (
      <div className="p-6 flex items-center gap-2">
        <div className="w-1.5 h-1.5 rounded-none-none bg-gold animate-pulse" />
        <span className="text-[11px] text-t3 font-[family-name:var(--font-jetbrains)]">
          Chargement matrice briques&hellip;
        </span>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-bold  text-noir">
            Briques &times; Cibles
          </h2>
          <p className="text-[10px] text-t3 font-[family-name:var(--font-jetbrains)] mt-1 tracking-[1px]">
            {filtered.length} ENTREPRISES &middot; 7 BRIQUES EIGEN
          </p>
        </div>
      </div>

      {/* Brique summary bar */}
      <div className="flex gap-2 flex-wrap">
        {BRIQUES.map((b) => (
          <div
            key={b}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-none border"
            style={{ borderColor: BRIQUE_COLORS[b] + '30', background: BRIQUE_COLORS[b] + '08' }}
          >
            <div className="w-2 h-2 rounded-none-none" style={{ background: BRIQUE_COLORS[b] }} />
            <span className="text-[9px] font-[family-name:var(--font-jetbrains)] tracking-[0.5px]" style={{ color: BRIQUE_COLORS[b] }}>
              {b}
            </span>
            <span className="text-[9px] text-t3 font-[family-name:var(--font-jetbrains)]">
              {briqueCounts[b]}
            </span>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex gap-3 items-center flex-wrap">
        <input
          type="text"
          placeholder="Rechercher entreprise..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-3 py-1.5 rounded-none border border-div bg-ivory text-[11px] text-t1 font-[family-name:var(--font-sn)] outline-none focus:border-gold"
          style={{ width: 220 }}
        />
        <select
          value={filterSector}
          onChange={(e) => setFilterSector(e.target.value)}
          className="px-3 py-1.5 rounded-none border border-div bg-ivory text-[11px] text-t2 font-[family-name:var(--font-sn)] outline-none focus:border-gold"
        >
          <option value="">Tous secteurs</option>
          {sectors.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        <select
          value={filterCountry}
          onChange={(e) => setFilterCountry(e.target.value)}
          className="px-3 py-1.5 rounded-none border border-div bg-ivory text-[11px] text-t2 font-[family-name:var(--font-sn)] outline-none focus:border-gold"
        >
          <option value="">Tous pays</option>
          {countries.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        {(filterSector || filterCountry || search) && (
          <button
            onClick={() => { setFilterSector(''); setFilterCountry(''); setSearch(''); }}
            className="text-[9px] text-ruby font-[family-name:var(--font-jetbrains)] cursor-pointer bg-transparent border-none"
          >
            RESET
          </button>
        )}
      </div>

      {/* Matrix table */}
      <div className="border border-div rounded-none bg-ivory overflow-auto" style={{ maxHeight: 'calc(100vh - 320px)' }}>
        <table className="w-full border-collapse" style={{ minWidth: 700 }}>
          <thead>
            <tr className="border-b border-div bg-cream sticky top-0 z-10">
              <th
                className="text-left px-3 py-2 text-[9px] text-t3 font-[family-name:var(--font-jetbrains)] tracking-[1px] cursor-pointer select-none"
                onClick={() => toggleSort('name')}
                style={{ width: 200 }}
              >
                ENTREPRISE{sortArrow('name')}
              </th>
              <th
                className="text-left px-3 py-2 text-[9px] text-t3 font-[family-name:var(--font-jetbrains)] tracking-[1px] cursor-pointer select-none"
                onClick={() => toggleSort('sector')}
                style={{ width: 120 }}
              >
                SECTEUR{sortArrow('sector')}
              </th>
              <th
                className="text-center px-3 py-2 text-[9px] text-t3 font-[family-name:var(--font-jetbrains)] tracking-[1px] cursor-pointer select-none"
                onClick={() => toggleSort('score')}
                style={{ width: 60 }}
              >
                SCORE{sortArrow('score')}
              </th>
              {BRIQUES.map((b) => (
                <th
                  key={b}
                  className="text-center px-2 py-2 text-[8px] font-[family-name:var(--font-jetbrains)] tracking-[0.5px]"
                  style={{ color: BRIQUE_COLORS[b], width: 65 }}
                >
                  {b}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((company, i) => (
              <tr
                key={company.id}
                className="border-b border-div-l hover:bg-cream/50"
                style={{ transition: 'background 0.1s' }}
              >
                <td className="px-3 py-1.5">
                  <div className="text-[11px] text-t1 font-[family-name:var(--font-sn)] font-medium">
                    {company.name}
                  </div>
                  <div className="text-[8px] text-t3 font-[family-name:var(--font-jetbrains)]">
                    {company.country} &middot; {company.priority}
                  </div>
                </td>
                <td className="px-3 py-1.5 text-[10px] text-t2 font-[family-name:var(--font-sn)]">
                  {company.sector}
                </td>
                <td className="text-center px-3 py-1.5">
                  <span
                    className="inline-block px-1.5 py-0.5 rounded-none text-[9px] font-[family-name:var(--font-jetbrains)] font-bold"
                    style={{
                      background: company.score >= 80 ? '#3D7C5E15' : company.score >= 60 ? '#B8963E15' : '#91897710',
                      color: company.score >= 80 ? '#3D7C5E' : company.score >= 60 ? '#B8963E' : '#918977',
                    }}
                  >
                    {company.score}
                  </span>
                </td>
                {BRIQUES.map((b) => {
                  const active = (company.briques ?? []).includes(b);
                  return (
                    <td key={b} className="text-center px-2 py-1.5">
                      {active ? (
                        <div
                          className="w-3 h-3 rounded-none-none mx-auto"
                          style={{ background: BRIQUE_COLORS[b], boxShadow: `0 0 6px ${BRIQUE_COLORS[b]}40` }}
                          title={`${b} actif pour ${company.name}`}
                        />
                      ) : (
                        <div
                          className="w-2 h-2 rounded-none-none mx-auto"
                          style={{ background: '#D4CCBA40' }}
                        />
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="p-8 text-center text-[11px] text-t3 font-[family-name:var(--font-sn)]">
            Aucune entreprise ne correspond aux filtres.
          </div>
        )}
      </div>
    </div>
  );
}
