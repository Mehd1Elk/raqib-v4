'use client';

import type { Country } from '../../../lib/corridor/types';
import { getInitials } from '../../../lib/corridor/utils';

interface Props { country: Country }

export function BillionairesTab({ country: c }: Props) {
  if (!c.billionaires || c.billionaires.length === 0) {
    return <p style={{ color: 'var(--text-muted)' }}>Données non disponibles.</p>;
  }

  return (
    <div className="info-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))' }}>
      {c.billionaires.map((b, i) => (
        <div key={i} className="person-card">
          <div className="person-avatar">{getInitials(b.name)}</div>
          <div className="person-info">
            <h4>{b.name}</h4>
            <div className="person-role" style={{ color: 'var(--gold)' }}>{b.fortune}</div>
            <div className="person-details">
              <div><strong>Source :</strong> {b.source}</div>
              <div><strong>Entreprises :</strong> {b.companies}</div>
              <div><strong>Âge :</strong> {b.age || 'N/A'} · <strong>Formation :</strong> {b.education || 'N/A'}</div>
              {b.bio && <div style={{ marginTop: '0.3rem', fontSize: '0.7rem', color: 'var(--text-faint)' }}>{b.bio}</div>}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
