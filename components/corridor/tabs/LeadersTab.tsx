'use client';

import type { Country } from '../../../lib/corridor/types';
import { getInitials } from '../../../lib/corridor/utils';

interface Props { country: Country }

export function LeadersTab({ country: c }: Props) {
  if (!c.leaders) return <p style={{ color: 'var(--text-muted)' }}>Données non disponibles.</p>;
  const l = c.leaders;

  const positions = [
    { key: 'centralBankGov' as const, label: 'Gouverneur Banque Centrale' },
    { key: 'investmentAgency' as const, label: 'Agence de promotion des investissements' },
    { key: 'miningAuthority' as const, label: 'Autorité minière' },
    { key: 'customs' as const, label: 'Direction des douanes' },
    { key: 'ambassadorFrance' as const, label: 'Ambassadeur en France' },
    { key: 'ambassadorFromFrance' as const, label: 'Ambassadeur de France dans le pays' },
    { key: 'unRepresentative' as const, label: "Représentant permanent à l'ONU" },
  ];

  const validPositions = positions.filter(p => l[p.key]);

  return (
    <>
      {l.headOfState && (
        <div className="subsection">
          <h3>Chef d&apos;État</h3>
          <div className="person-card">
            <div className="person-avatar" style={{ width: 56, height: 56, fontSize: '1.4rem' }}>{getInitials(l.headOfState.name)}</div>
            <div className="person-info">
              <h4>{l.headOfState.name}</h4>
              <div className="person-role">Chef d&apos;État · Depuis {l.headOfState.since || 'N/A'}</div>
              <div className="person-details">Parti : {l.headOfState.party || 'N/A'}{l.headOfState.nextElection ? ` · Prochaine élection : ${l.headOfState.nextElection}` : ''}</div>
            </div>
          </div>
        </div>
      )}

      {l.headOfGov && (
        <div className="subsection">
          <h3>Chef du Gouvernement</h3>
          <div className="person-card">
            <div className="person-avatar">{getInitials(l.headOfGov.name)}</div>
            <div className="person-info">
              <h4>{l.headOfGov.name}</h4>
              <div className="person-role">Premier Ministre / Chef du Gouvernement · Depuis {l.headOfGov.since || 'N/A'}</div>
              <div className="person-details">Parti : {l.headOfGov.party || 'N/A'}</div>
            </div>
          </div>
        </div>
      )}

      {l.keyMinisters && l.keyMinisters.length > 0 && (
        <div className="subsection">
          <h3>Ministres clés</h3>
          <table className="data-table">
            <thead><tr><th>Portefeuille</th><th>Nom</th></tr></thead>
            <tbody>
              {l.keyMinisters.map((m, i) => (
                <tr key={i}><td>{m.portfolio}</td><td className="col-name">{m.name}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {validPositions.length > 0 && (
        <div className="subsection">
          <h3>Postes institutionnels clés</h3>
          <table className="data-table">
            <thead><tr><th>Position</th><th>Nom</th><th>Institution</th></tr></thead>
            <tbody>
              {validPositions.map((p, i) => (
                <tr key={i}>
                  <td>{p.label}</td>
                  <td className="col-name">{l[p.key]?.name || 'N/A'}</td>
                  <td>{l[p.key]?.institution || ''}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
