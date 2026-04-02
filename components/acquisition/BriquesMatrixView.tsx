'use client';

import { useState, useEffect } from 'react';
import { C, GR, MN, SN, thS, tdS, wrap, BRICKS } from './shared/constants';
import { SectionTitle } from './shared/SectionTitle';
import { fetchCompanies } from '@/lib/acquisition/api';
import type { AcqCompany } from '@/lib/acquisition/types';

export default function BriquesMatrixView() {
  const [companies, setCompanies] = useState<AcqCompany[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCompanies({ limit: '100' }).then(setCompanies).catch(() => setCompanies([])).finally(() => setLoading(false));
  }, []);

  if (loading) return <div style={{ ...wrap, fontFamily: MN, fontSize: 10, color: C.t3 }}>Chargement matrice...</div>;

  // Summary counts
  const brickCounts: Record<string, number> = {};
  for (const b of BRICKS) brickCounts[b.key] = 0;
  for (const c of companies) {
    for (const b of BRICKS) {
      if (c.eigen_briques?.includes(b.key)) brickCounts[b.key]++;
    }
  }

  return (
    <div style={wrap}>
      <SectionTitle title="Briques × Cibles" count={companies.length} />

      {/* Summary */}
      <div style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
        {BRICKS.map(b => (
          <div key={b.key} style={{
            display: 'flex', alignItems: 'center', gap: 8, padding: '8px 14px',
            background: C.nacre, border: `0.5px solid ${C.div}`, borderRadius: 0,
          }}>
            <span style={{ color: b.c, fontSize: 14 }}>{b.icon}</span>
            <div>
              <div style={{ fontFamily: MN, fontSize: 8, color: b.c, letterSpacing: 1, textTransform: 'uppercase' }}>{b.n}</div>
              <div style={{ fontFamily: GR, fontSize: 18, fontWeight: 400, color: b.c }}>{brickCounts[b.key]}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Matrix table */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ ...thS, width: 200 }}>Entreprise</th>
              <th style={thS}>HQ</th>
              <th style={thS}>Score</th>
              {BRICKS.map(b => (
                <th key={b.key} style={{ ...thS, textAlign: 'center', minWidth: 50 }}>
                  <span style={{ color: b.c, fontSize: 12 }}>{b.icon}</span>
                  <br />
                  <span style={{ color: b.c }}>{b.n}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {companies.map(c => (
              <tr key={c.id}
                onMouseEnter={e => (e.currentTarget.style.background = C.nacre3)}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                <td style={{ ...tdS, fontFamily: GR, fontWeight: 400, fontSize: 11, whiteSpace: 'nowrap' }}>{c.name}</td>
                <td style={{ ...tdS, fontFamily: MN, fontSize: 9 }}>{c.hq}</td>
                <td style={{ ...tdS, textAlign: 'center', fontFamily: MN, fontSize: 10, fontWeight: 700, color: c.eigen_score >= 9 ? C.emerald : c.eigen_score >= 7 ? C.accent : C.t3 }}>
                  {c.eigen_score}
                </td>
                {BRICKS.map(b => (
                  <td key={b.key} style={{ ...tdS, textAlign: 'center' }}>
                    {c.eigen_briques?.includes(b.key) ? (
                      <span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', background: b.c }} />
                    ) : (
                      <span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', background: C.divL }} />
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
