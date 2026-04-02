'use client';

import type { Country } from '../../../lib/corridor/types';

interface Props { country: Country }

export function ContactsTab({ country: c }: Props) {
  if (c.region === 'eu' && c.crmaContact) {
    return (
      <>
        <div className="subsection">
          <h3>Contact CRMA</h3>
          <div className="info-card"><div className="info-card-label">Institution CRMA</div><div className="info-card-value">{c.crmaContact}</div></div>
        </div>
        {c.tradeAfricaHighlights && (
          <div className="subsection">
            <h3>Relations Afrique</h3>
            <div className="info-card"><div className="info-card-value" style={{ fontSize: '0.85rem' }}>{c.tradeAfricaHighlights}</div></div>
          </div>
        )}
      </>
    );
  }

  if (!c.contacts) return <p style={{ color: 'var(--text-muted)' }}>Données contacts non disponibles.</p>;
  const ct = c.contacts;

  const sections = [
    { key: 'chambers' as const, label: 'Chambres de commerce bilatérales' },
    { key: 'lawFirms' as const, label: "Cabinets d'avocats d'affaires" },
    { key: 'big4' as const, label: 'Big 4 — Bureaux locaux' },
    { key: 'investmentBanks' as const, label: "Banques d'investissement / PE" },
  ];

  return (
    <>
      {sections.map((s, i) => {
        const data = ct[s.key];
        if (!data) return null;
        const items = Array.isArray(data) ? data : [data];
        return (
          <div key={i} className="subsection">
            <h3>{s.label}</h3>
            <ul className="styled-list">
              {items.map((item, j) => <li key={j}>{item}</li>)}
            </ul>
          </div>
        );
      })}
      {ct.businessFrance && <div className="info-card" style={{ margin: '1rem 0' }}><div className="info-card-label">Business France</div><div className="info-card-value">{ct.businessFrance}</div></div>}
      {ct.afd && <div className="info-card" style={{ margin: '1rem 0' }}><div className="info-card-label">AFD</div><div className="info-card-value">{ct.afd}</div></div>}
      {ct.patronat && <div className="info-card" style={{ margin: '1rem 0' }}><div className="info-card-label">Patronat</div><div className="info-card-value">{ct.patronat}</div></div>}
      {ct.diaspora && <div className="info-card" style={{ margin: '1rem 0' }}><div className="info-card-label">Diaspora</div><div className="info-card-value">{ct.diaspora}</div></div>}
    </>
  );
}
