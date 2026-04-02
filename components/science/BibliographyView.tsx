'use client';

import { useState, useEffect } from 'react';
import { C, GR, SN, MN, DOMAINS, wrap, BRIQUE_COLOR, STATUS_LABELS } from './shared/constants';
import SectionTitle from './shared/SectionTitle';
import Pill from './shared/Pill';
import EmptyState from './shared/EmptyState';
import type { SciPaper, BriqueId } from '@/lib/science/types';

interface Props {
  briques: BriqueId[];
  title: string;
  subtitle: string;
}

export default function BibliographyView({ briques, title, subtitle }: Props) {
  const [papers, setPapers] = useState<SciPaper[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all(briques.map(b => fetch(`/api/science/bibliography/${b}`).then(r => r.json())))
      .then(results => {
        const all = results.flat().filter(Array.isArray);
        setPapers(results.flat().filter((p: unknown) => p && typeof p === 'object' && 'id' in (p as Record<string, unknown>)) as SciPaper[]);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [briques]);

  if (loading) return <div style={{ ...wrap, fontFamily: GR, fontStyle: 'italic', color: C.t3 }}>Chargement…</div>;

  // Group by subdomain
  const bySubdomain: Record<string, SciPaper[]> = {};
  papers.forEach(p => {
    const key = p.subdomain || 'Général';
    if (!bySubdomain[key]) bySubdomain[key] = [];
    bySubdomain[key].push(p);
  });

  const primaryColor = BRIQUE_COLOR[briques[0]] || C.gold;

  return (
    <div style={wrap}>
      <SectionTitle title={title} subtitle={`${subtitle} · ${papers.length} références`} />

      {papers.length === 0 ? (
        <EmptyState icon="▸" title="Aucune référence" subtitle={`La bibliographie ${title} sera peuplée lors du seed.`} />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {Object.entries(bySubdomain).map(([subdomain, subPapers]) => (
            <div key={subdomain}>
              <div style={{
                fontFamily: MN, fontSize: 9, color: primaryColor, letterSpacing: 1.5,
                textTransform: 'uppercase', marginBottom: 10, paddingBottom: 4,
                borderBottom: `1px solid ${primaryColor}30`,
              }}>
                {subdomain} ({subPapers.length})
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {subPapers.map(paper => (
                  <BibEntry key={paper.id} paper={paper} primaryColor={primaryColor} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function BibEntry({ paper, primaryColor }: { paper: SciPaper; primaryColor: string }) {
  const dom = DOMAINS.find(d => d.id === paper.domain);
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      onClick={() => setExpanded(!expanded)}
      style={{
        background: C.cream, borderRadius: 6, padding: '12px 16px',
        border: `1px solid ${C.div}`, cursor: 'pointer',
        transition: 'border-color 0.15s',
        borderLeft: `3px solid ${primaryColor}`,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: GR, fontSize: 13, fontWeight: 700, fontStyle: 'italic', color: C.t1, lineHeight: 1.3, marginBottom: 4 }}>
            {paper.title}
          </div>
          <div style={{ fontFamily: SN, fontSize: 10, color: C.t2 }}>
            {Array.isArray(paper.authors) ? paper.authors.join(', ') : paper.authors} — {paper.year}
          </div>
          <div style={{ fontFamily: MN, fontSize: 9, color: C.t3, marginTop: 2 }}>{paper.journal}</div>
        </div>
        <div style={{ display: 'flex', gap: 4, flexShrink: 0 }}>
          {dom && <Pill label={dom.short} color={dom.color} />}
          <Pill label={STATUS_LABELS[paper.status] || paper.status} color={paper.status === 'applied' ? C.emerald : C.t3} />
        </div>
      </div>

      {expanded && (
        <div style={{ marginTop: 12, paddingTop: 12, borderTop: `1px solid ${C.divL}` }}>
          <div style={{
            padding: 10, borderRadius: 4, marginBottom: 8,
            background: `${primaryColor}10`, border: `1px solid ${primaryColor}25`,
          }}>
            <div style={{ fontFamily: MN, fontSize: 8, color: primaryColor, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 3 }}>
              APPLICATION EIGEN
            </div>
            <div style={{ fontFamily: SN, fontSize: 11, color: C.t1, lineHeight: 1.4 }}>{paper.eigen_application}</div>
          </div>
          {paper.doi && (
            <div style={{ fontFamily: MN, fontSize: 9, color: C.t3 }}>
              DOI: <a href={paper.url || `https://doi.org/${paper.doi}`} target="_blank" rel="noopener noreferrer" style={{ color: C.noos }}>{paper.doi}</a>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
