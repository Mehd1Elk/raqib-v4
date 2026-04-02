'use client';

import { useState, useEffect } from 'react';
import { C, GR, MN, SN, thS, tdS, wrap, BRICKS, SECTORS } from './shared/constants';
import { SectionTitle } from './shared/SectionTitle';
import { ScoreBadge } from './shared/ScoreBadge';
import { Pill } from './shared/Pill';
import { fetchCompanies } from '@/lib/acquisition/api';
import { computePersonas, computeRevenue } from '@/lib/acquisition/engine';
import type { AcqCompany, PersonaType } from '@/lib/acquisition/types';

const PRIORITIES = ['P0', 'P1', 'P2'] as const;

export default function CompaniesView() {
  const [companies, setCompanies] = useState<AcqCompany[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterSector, setFilterSector] = useState('');
  const [filterPriority, setFilterPriority] = useState('');
  const [selected, setSelected] = useState<AcqCompany | null>(null);

  useEffect(() => {
    const params: Record<string, string> = {};
    if (filterSector) params.sector = filterSector;
    if (filterPriority) params.priority = filterPriority;
    if (search) params.q = search;
    fetchCompanies(params).then(setCompanies).catch(() => setCompanies([])).finally(() => setLoading(false));
  }, [filterSector, filterPriority, search]);

  const sectors = Object.keys(SECTORS);

  return (
    <div style={wrap}>
      <SectionTitle title="Entreprises" count={companies.length} />

      {/* Filters */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16, alignItems: 'center' }}>
        <input
          placeholder="Rechercher..."
          value={search}
          onChange={e => { setLoading(true); setSearch(e.target.value); }}
          style={{
            padding: '6px 12px', border: `0.5px solid ${C.div}`, borderRadius: 0,
            fontFamily: SN, fontSize: 11, color: C.t1, background: C.nacre, outline: 'none', width: 180,
          }}
        />
        <select
          value={filterSector}
          onChange={e => { setLoading(true); setFilterSector(e.target.value); }}
          style={{ padding: '6px 8px', border: `0.5px solid ${C.div}`, borderRadius: 0, fontFamily: MN, fontSize: 9, color: C.t2, background: C.nacre }}
        >
          <option value="">Tous secteurs</option>
          {sectors.map(s => <option key={s} value={s}>{SECTORS[s]}</option>)}
        </select>
        {PRIORITIES.map(p => (
          <button key={p} onClick={() => { setLoading(true); setFilterPriority(filterPriority === p ? '' : p); }}
            style={{
              padding: '4px 10px', border: `0.5px solid ${filterPriority === p ? C.accent : C.div}`,
              borderRadius: 0, fontFamily: MN, fontSize: 9, cursor: 'pointer',
              background: filterPriority === p ? `${C.accent}20` : C.nacre,
              color: filterPriority === p ? C.accent : C.t3,
            }}>
            {p}
          </button>
        ))}
      </div>

      {loading ? (
        <div style={{ fontFamily: MN, fontSize: 10, color: C.t3, padding: 20 }}>Chargement...</div>
      ) : companies.length === 0 ? (
        <div style={{ fontFamily: SN, fontSize: 12, color: C.t3, padding: 20 }}>Aucune entreprise trouvée.</div>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={thS}>Nom</th>
                <th style={thS}>HQ</th>
                <th style={thS}>Secteur</th>
                <th style={thS}>Rev. ($B)</th>
                <th style={thS}>Emp. (K)</th>
                {BRICKS.map(b => <th key={b.key} style={{ ...thS, textAlign: 'center', color: b.c }} title={b.n}>{b.icon}</th>)}
                <th style={thS}>Corridor</th>
                <th style={thS}>Score</th>
                <th style={thS}>Priority</th>
                <th style={thS}>Stage</th>
              </tr>
            </thead>
            <tbody>
              {companies.map(c => (
                <tr key={c.id} onClick={() => setSelected(selected?.id === c.id ? null : c)}
                  style={{ cursor: 'pointer', background: selected?.id === c.id ? C.nacre3 : 'transparent', transition: 'background 0.1s' }}
                  onMouseEnter={e => { if (selected?.id !== c.id) e.currentTarget.style.background = `${C.nacre3}80`; }}
                  onMouseLeave={e => { if (selected?.id !== c.id) e.currentTarget.style.background = 'transparent'; }}>
                  <td style={{ ...tdS, fontFamily: GR, fontWeight: 400, fontSize: 12, whiteSpace: 'nowrap' }}>{c.name}</td>
                  <td style={tdS}>{c.hq}</td>
                  <td style={tdS}><Pill label={SECTORS[c.sector] || c.sector} /></td>
                  <td style={{ ...tdS, fontFamily: MN, fontSize: 10, textAlign: 'right' }}>{c.revenue_b}</td>
                  <td style={{ ...tdS, fontFamily: MN, fontSize: 10, textAlign: 'right' }}>{c.employees_k}</td>
                  {BRICKS.map(b => (
                    <td key={b.key} style={{ ...tdS, textAlign: 'center' }}>
                      <span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', background: c.eigen_briques?.includes(b.key) ? b.c : C.divL }} />
                    </td>
                  ))}
                  <td style={{ ...tdS, fontFamily: MN, fontSize: 10, textAlign: 'center' }}>{c.corridor_countries?.length || 0}</td>
                  <td style={{ ...tdS, textAlign: 'center' }}><ScoreBadge score={c.eigen_score} /></td>
                  <td style={tdS}><Pill label={c.priority} color={c.priority === 'P0' ? C.ruby : c.priority === 'P1' ? C.accent : C.t3} /></td>
                  <td style={tdS}><Pill label={c.pipeline_stage} color={c.pipeline_stage === 'signed' ? C.emerald : C.t2} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Detail panel */}
      {selected && <CompanyDetail company={selected} />}
    </div>
  );
}

function CompanyDetail({ company: c }: { company: AcqCompany }) {
  const personas: PersonaType[] = computePersonas(c.eigen_briques || '');
  const rev = computeRevenue(c.tier);
  const PERSONA_LABELS: Record<string, string> = { drh: 'DRH', dpo: 'DPO', cto: 'CTO', rse: 'RSE', achats: 'Achats', cfo: 'CFO' };
  const PERSONA_COLORS: Record<string, string> = { drh: C.drh, dpo: C.dpo, cto: C.cto, rse: C.rse, achats: C.achats, cfo: C.cfo };

  return (
    <div style={{ marginTop: 24, padding: 20, background: C.nacre, border: `0.5px solid ${C.div}`, borderRadius: 0 }}>
      <div style={{ fontFamily: GR, fontSize: 20, fontWeight: 400, color: C.t1, marginBottom: 12 }}>
        {c.name}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 16 }}>
        <div><span style={{ fontFamily: MN, fontSize: 8, color: C.t3, textTransform: 'uppercase', letterSpacing: 1 }}>HQ</span><br /><span style={{ fontFamily: SN, fontSize: 12, color: C.t1 }}>{c.hq}</span></div>
        <div><span style={{ fontFamily: MN, fontSize: 8, color: C.t3, textTransform: 'uppercase', letterSpacing: 1 }}>SECTEUR</span><br /><span style={{ fontFamily: SN, fontSize: 12, color: C.t1 }}>{SECTORS[c.sector] || c.sector}</span></div>
        <div><span style={{ fontFamily: MN, fontSize: 8, color: C.t3, textTransform: 'uppercase', letterSpacing: 1 }}>TIER</span><br /><span style={{ fontFamily: SN, fontSize: 12, color: C.t1 }}>{c.tier}</span></div>
        <div><span style={{ fontFamily: MN, fontSize: 8, color: C.t3, textTransform: 'uppercase', letterSpacing: 1 }}>REVENUE ESTIMÉ</span><br /><span style={{ fontFamily: GR, fontSize: 18, fontWeight: 400, color: C.accent }}>€{(rev / 1000).toFixed(0)}K</span></div>
      </div>
      <div style={{ marginBottom: 12 }}>
        <span style={{ fontFamily: MN, fontSize: 8, color: C.t3, textTransform: 'uppercase', letterSpacing: 1 }}>BRIQUES</span>
        <div style={{ display: 'flex', gap: 6, marginTop: 4 }}>
          {BRICKS.map(b => (
            <Pill key={b.key} label={b.n} color={c.eigen_briques?.includes(b.key) ? b.c : C.t4} />
          ))}
        </div>
      </div>
      <div style={{ marginBottom: 12 }}>
        <span style={{ fontFamily: MN, fontSize: 8, color: C.t3, textTransform: 'uppercase', letterSpacing: 1 }}>PERSONAS SUGGÉRÉS</span>
        <div style={{ display: 'flex', gap: 6, marginTop: 4 }}>
          {personas.map(p => <Pill key={p} label={PERSONA_LABELS[p] || p} color={PERSONA_COLORS[p] || C.t3} />)}
        </div>
      </div>
      {c.corridor_countries && c.corridor_countries.length > 0 && (
        <div>
          <span style={{ fontFamily: MN, fontSize: 8, color: C.t3, textTransform: 'uppercase', letterSpacing: 1 }}>CORRIDOR ({c.corridor_countries.length} pays)</span>
          <div style={{ fontFamily: SN, fontSize: 11, color: C.t2, marginTop: 4 }}>{c.corridor_countries.join(', ')}</div>
        </div>
      )}
    </div>
  );
}
