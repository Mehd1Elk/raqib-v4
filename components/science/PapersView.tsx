'use client';

import { useState, useEffect } from 'react';
import { C, GR, SN, MN, DOMAINS, thS, tdS, wrap, BRIQUE_COLOR, STATUS_LABELS } from './shared/constants';
import SectionTitle from './shared/SectionTitle';
import Pill from './shared/Pill';
import EmptyState from './shared/EmptyState';
import type { SciPaper } from '@/lib/science/types';

export default function PapersView() {
  const [papers, setPapers] = useState<SciPaper[]>([]);
  const [loading, setLoading] = useState(true);
  const [domainFilter, setDomainFilter] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<SciPaper | null>(null);

  useEffect(() => {
    const params = new URLSearchParams();
    if (domainFilter) params.set('domain', domainFilter);
    if (statusFilter) params.set('status', statusFilter);
    if (search) params.set('q', search);
    fetch(`/api/science/papers?${params}`)
      .then(r => r.json())
      .then(d => { setPapers(Array.isArray(d) ? d : []); setLoading(false); })
      .catch(() => setLoading(false));
  }, [domainFilter, statusFilter, search]);

  if (loading) return <div style={{ ...wrap, fontFamily: GR, fontStyle: 'italic', color: C.t3 }}>Chargement…</div>;

  return (
    <div style={wrap}>
      <SectionTitle title="Publications Scientifiques" subtitle={`${papers.length} papers · 7 domaines`} />

      {/* Domain filter buttons */}
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 12 }}>
        <button onClick={() => setDomainFilter('')} style={{
          ...filterBtnStyle, background: !domainFilter ? `${C.gold}20` : 'transparent',
          borderColor: !domainFilter ? C.gold : C.div, color: !domainFilter ? C.gold : C.t3,
        }}>Tous</button>
        {DOMAINS.map(d => (
          <button key={d.id} onClick={() => setDomainFilter(domainFilter === d.id ? '' : d.id)} style={{
            ...filterBtnStyle, background: domainFilter === d.id ? `${d.color}20` : 'transparent',
            borderColor: domainFilter === d.id ? d.color : C.div, color: domainFilter === d.id ? d.color : C.t3,
          }}>{d.icon} {d.short}</button>
        ))}
      </div>

      {/* Status filter + search */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, alignItems: 'center' }}>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} style={selectStyle}>
          <option value="">Tous statuts</option>
          {Object.entries(STATUS_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
        </select>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Rechercher…"
          style={{ ...selectStyle, flex: 1, maxWidth: 300 }} />
      </div>

      {papers.length === 0 ? (
        <EmptyState icon="◇" title="Aucun paper" subtitle="Aucune publication ne correspond à vos filtres." />
      ) : (
        <div style={{ background: C.cream, borderRadius: 8, border: `1px solid ${C.div}`, overflow: 'auto', maxHeight: 'calc(100vh - 280px)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 800 }}>
            <thead>
              <tr>
                <th style={thS}>Titre</th>
                <th style={thS}>Année</th>
                <th style={thS}>Journal</th>
                <th style={thS}>Domaine</th>
                <th style={thS}>Score</th>
                <th style={thS}>Statut</th>
              </tr>
            </thead>
            <tbody>
              {papers.map(p => {
                const dom = DOMAINS.find(d => d.id === p.domain);
                return (
                  <tr key={p.id} onClick={() => setSelected(p)} style={{ cursor: 'pointer', transition: 'background 0.1s' }}
                    onMouseEnter={e => (e.currentTarget.style.background = `${C.gold}08`)}
                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                    <td style={{ ...tdS, maxWidth: 350, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontWeight: 500 }}>{p.title}</td>
                    <td style={{ ...tdS, fontFamily: MN, fontSize: 10 }}>{p.year}</td>
                    <td style={{ ...tdS, fontSize: 10, color: C.t2 }}>{p.journal}</td>
                    <td style={tdS}><Pill label={dom?.short || ''} color={dom?.color || C.t3} /></td>
                    <td style={{ ...tdS, fontFamily: MN, fontWeight: 700, color: p.relevance_score >= 9 ? C.emerald : p.relevance_score >= 7 ? C.gold : C.t2 }}>{p.relevance_score}</td>
                    <td style={tdS}><Pill label={STATUS_LABELS[p.status] || p.status} color={p.status === 'applied' ? C.emerald : p.status === 'read' ? C.noos : C.t3} /></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Detail Panel */}
      {selected && <PaperDetail paper={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}

function PaperDetail({ paper, onClose }: { paper: SciPaper; onClose: () => void }) {
  const dom = DOMAINS.find(d => d.id === paper.domain);
  return (
    <div style={{
      position: 'fixed', top: 0, right: 0, width: 480, height: '100vh',
      background: C.ivory, borderLeft: `1px solid ${C.div}`,
      boxShadow: '-4px 0 24px rgba(0,0,0,0.08)', zIndex: 100,
      overflow: 'auto', padding: 24, display: 'flex', flexDirection: 'column',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <Pill label={dom?.short || ''} color={dom?.color || C.t3} />
        <button onClick={onClose} style={{ border: 'none', background: 'none', cursor: 'pointer', fontFamily: MN, fontSize: 14, color: C.t3 }}>✕</button>
      </div>
      <h2 style={{ fontFamily: GR, fontSize: 18, fontWeight: 700, fontStyle: 'italic', color: C.t1, marginBottom: 8, lineHeight: 1.3 }}>{paper.title}</h2>
      <p style={{ fontFamily: SN, fontSize: 11, color: C.t2, marginBottom: 4 }}>{Array.isArray(paper.authors) ? paper.authors.join(', ') : paper.authors} — {paper.year}</p>
      <p style={{ fontFamily: MN, fontSize: 10, color: C.t3, marginBottom: 16 }}>{paper.journal} · DOI: {paper.doi}</p>

      {paper.abstract && (
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontFamily: MN, fontSize: 8, color: C.t3, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 4 }}>ABSTRACT</div>
          <p style={{ fontFamily: SN, fontSize: 11, color: C.t1, lineHeight: 1.6 }}>{paper.abstract}</p>
        </div>
      )}

      <div style={{ marginBottom: 16, padding: 12, background: `${BRIQUE_COLOR[paper.brique]}10`, borderRadius: 6, border: `1px solid ${BRIQUE_COLOR[paper.brique]}30` }}>
        <div style={{ fontFamily: MN, fontSize: 8, color: BRIQUE_COLOR[paper.brique], letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 4 }}>APPLICATION EIGEN</div>
        <p style={{ fontFamily: SN, fontSize: 11, color: C.t1, lineHeight: 1.5 }}>{paper.eigen_application}</p>
      </div>

      {paper.tags && paper.tags.length > 0 && (
        <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginBottom: 16 }}>
          {paper.tags.filter(Boolean).map(tag => <Pill key={tag} label={tag} color={C.t3} />)}
        </div>
      )}

      <div style={{ display: 'flex', gap: 8, marginTop: 'auto' }}>
        {paper.url && (
          <a href={paper.url} target="_blank" rel="noopener noreferrer" style={{
            fontFamily: MN, fontSize: 9, color: C.noos, textDecoration: 'none',
            padding: '6px 12px', border: `1px solid ${C.noos}40`, borderRadius: 4,
          }}>OUVRIR ↗</a>
        )}
        <Pill label={STATUS_LABELS[paper.status] || paper.status} color={paper.status === 'applied' ? C.emerald : C.gold} />
      </div>
    </div>
  );
}

const filterBtnStyle: React.CSSProperties = {
  fontFamily: MN, fontSize: 9, letterSpacing: 0.5, padding: '4px 10px',
  border: '1px solid', borderRadius: 4, cursor: 'pointer', background: 'transparent',
  transition: 'all 0.15s',
};

const selectStyle: React.CSSProperties = {
  fontFamily: SN, fontSize: 11, padding: '6px 10px', border: `1px solid ${C.div}`,
  borderRadius: 4, background: C.cream, color: C.t1, outline: 'none',
};
