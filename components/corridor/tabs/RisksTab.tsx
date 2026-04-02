'use client';

import type { Country } from '../../../lib/corridor/types';
import { RecommendationBadge } from '../RecommendationBadge';

interface Props { country: Country }

export function RisksTab({ country: c }: Props) {
  if (!c.risks) {
    return (
      <div className="subsection">
        <h3>Profil de risque</h3>
        <div className="kpi-row">
          <div className="kpi"><div className="kpi-label">Score de risque global</div><div className="kpi-value" style={{ color: 'var(--green)' }}>{c.riskScore}/10</div></div>
        </div>
        <div style={{ marginTop: '1rem' }}>
          <RecommendationBadge recommendation={c.riskScore <= 3 ? 'Investir' : 'Observer'} />
        </div>
      </div>
    );
  }

  const r = c.risks;

  const riskItems = [
    { label: 'Risque politique', score: r.political?.score, comment: r.political?.comment, type: 'risk' as const },
    { label: 'Risque sécuritaire', score: r.security?.score, comment: r.security?.comment, type: 'risk' as const },
    { label: 'Risque économique', score: r.economic?.score, comment: r.economic?.comment, type: 'risk' as const },
    { label: 'Risque réglementaire', score: r.regulatory?.score, comment: r.regulatory?.comment, type: 'risk' as const },
    { label: 'Risque logistique', score: r.logistic?.score, comment: r.logistic?.comment, type: 'risk' as const },
  ];

  const oppItems = [
    { label: 'Opportunité minière', score: r.miningOpportunity?.score, comment: r.miningOpportunity?.comment, type: 'opportunity' as const },
    { label: 'Opportunité industrielle', score: r.industrialOpportunity?.score, comment: r.industrialOpportunity?.comment, type: 'opportunity' as const },
    { label: 'Opportunité digitale', score: r.digitalOpportunity?.score, comment: r.digitalOpportunity?.comment, type: 'opportunity' as const },
  ];

  return (
    <>
      <div style={{ marginBottom: '1.5rem' }}>
        <RecommendationBadge recommendation={r.recommendation || c.recommendation || 'Observer'} />
      </div>

      <div className="radar-container">
        <div className="radar-scores" style={{ flex: 2 }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: 'var(--gold)', marginBottom: '1rem' }}>Scores de Risque</h3>
          {riskItems.map((item, i) => item.score !== undefined ? (
            <div key={i} className="radar-score-row">
              <span className="radar-score-label">{item.label}</span>
              <div className="radar-bar"><div className="radar-bar-fill risk" style={{ width: `${item.score * 10}%` }} /></div>
              <span className="radar-score-value">{item.score}</span>
            </div>
          ) : null)}

          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: 'var(--green)', margin: '1.5rem 0 1rem' }}>Scores d&apos;Opportunité</h3>
          {oppItems.map((item, i) => item.score !== undefined ? (
            <div key={i} className="radar-score-row">
              <span className="radar-score-label">{item.label}</span>
              <div className="radar-bar"><div className="radar-bar-fill opportunity" style={{ width: `${item.score * 10}%` }} /></div>
              <span className="radar-score-value">{item.score}</span>
            </div>
          ) : null)}
        </div>

        <div style={{ flex: 1, minWidth: 250 }}>
          <div className="info-card" style={{ marginBottom: '1rem' }}>
            <div className="info-card-label">Score de risque global</div>
            <div className="info-card-value" style={{ fontSize: '1.8rem', color: r.overallRisk <= 3 ? 'var(--green)' : r.overallRisk <= 6 ? 'var(--orange)' : 'var(--red)' }}>{r.overallRisk}/10</div>
          </div>
          <div className="info-card" style={{ marginBottom: '1rem' }}>
            <div className="info-card-label">Score d&apos;opportunité global</div>
            <div className="info-card-value" style={{ fontSize: '1.8rem', color: 'var(--green)' }}>{r.overallOpportunity}/10</div>
          </div>
        </div>
      </div>

      <div className="subsection">
        <h3>Analyse détaillée</h3>
        <div className="info-grid">
          {[...riskItems, ...oppItems].map((item, i) => item.comment ? (
            <div key={i} className="info-card">
              <div className="info-card-label">{item.label} ({item.score}/10)</div>
              <div className="info-card-value" style={{ fontSize: '0.82rem' }}>{item.comment}</div>
            </div>
          ) : null)}
        </div>
      </div>
    </>
  );
}
