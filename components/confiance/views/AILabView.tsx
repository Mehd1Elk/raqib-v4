"use client";

import React, { useState, useEffect } from 'react';
import { CONFIANCE_COLORS, CONFIANCE_STYLES, CONFIANCE_TYPOGRAPHY } from '../shared/constants';
import { AI_MODELS_MOCK, AI_INCIDENTS_MOCK, type AIModel } from '../shared/mock-data';

export const AILabView: React.FC = () => {
  const [models, setModels] = useState<AIModel[]>(AI_MODELS_MOCK);
  const [incidents, setIncidents] = useState(AI_INCIDENTS_MOCK);

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const res = await fetch('/api/confiance/ai-models');
        if (res.ok) {
          const apiData = await res.json();
          if (apiData.length > 0) setModels(apiData);
        }
      } catch (e) { /* fallback already set */ }
    };
    fetchModels();
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <h2 style={{ ...CONFIANCE_TYPOGRAPHY.sectionTitles, color: CONFIANCE_COLORS.text.primary, margin: 0 }}>
        AI Authentication Lab
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '16px' }}>
        {models.map(model => {
          const hasAlert = model.driftScore > 5 || model.decisionReceipts === 0 || model.lastCheckDays > 90;
          const statusColor = hasAlert ? CONFIANCE_COLORS.accent.alert : (model.driftScore > 3 ? CONFIANCE_COLORS.scores.orange : CONFIANCE_COLORS.scores.green);

          return (
            <div key={model.id} style={{ 
              backgroundColor: CONFIANCE_COLORS.background.card, 
              border: CONFIANCE_STYLES.border, 
              borderRadius: CONFIANCE_STYLES.borderRadius,
              padding: '20px',
              display: 'flex', flexDirection: 'column', gap: '16px',
              boxShadow: hasAlert ? `0 0 15px ${CONFIANCE_COLORS.accent.alert}20` : 'none',
              borderLeft: `4px solid ${statusColor}`
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div style={{ ...CONFIANCE_TYPOGRAPHY.subtitles, color: CONFIANCE_COLORS.text.primary, fontSize: '16px' }}>{model.name}</div>
                  <div style={{ ...CONFIANCE_TYPOGRAPHY.labels, color: CONFIANCE_COLORS.text.secondary }}>{model.org}</div>
                </div>
                <div style={{ padding: '4px 8px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '4px', ...CONFIANCE_TYPOGRAPHY.labels, color: CONFIANCE_COLORS.text.tertiary }}>
                  AI ACT: {model.aiActClass.toUpperCase()}
                </div>
              </div>

              <div style={{ ...CONFIANCE_TYPOGRAPHY.tableData, color: CONFIANCE_COLORS.accent.burhan, fontSize: '10px', wordBreak: 'break-all' }}>
                HASH: {model.hash.substring(0, 32)}...
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', ...CONFIANCE_TYPOGRAPHY.labels, color: CONFIANCE_COLORS.text.primary }}>
                  <span>Drift Score (Seuil 5%)</span>
                  <span style={{ color: model.driftScore > 5 ? CONFIANCE_COLORS.accent.alert : CONFIANCE_COLORS.scores.green }}>{model.driftScore}%</span>
                </div>
                <div style={{ width: '100%', backgroundColor: 'rgba(255,255,255,0.05)', height: '4px', borderRadius: '2px' }}>
                  <div style={{ width: `${Math.min(model.driftScore * 10, 100)}%`, backgroundColor: model.driftScore > 5 ? CONFIANCE_COLORS.accent.alert : CONFIANCE_COLORS.scores.green, height: '100%', borderRadius: '2px' }} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', paddingTop: '12px', borderTop: CONFIANCE_STYLES.separator }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ ...CONFIANCE_TYPOGRAPHY.labels, color: CONFIANCE_COLORS.text.secondary }}>Receipts</span>
                  <span style={{ ...CONFIANCE_TYPOGRAPHY.scores, color: model.decisionReceipts === 0 ? CONFIANCE_COLORS.accent.alert : CONFIANCE_COLORS.text.primary, fontSize: '14px' }}>{model.decisionReceipts}</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ ...CONFIANCE_TYPOGRAPHY.labels, color: CONFIANCE_COLORS.text.secondary }}>ExplicabilitÉ</span>
                  <span style={{ ...CONFIANCE_TYPOGRAPHY.scores, color: CONFIANCE_COLORS.text.primary, fontSize: '14px' }}>{model.explainability}/100</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ ...CONFIANCE_TYPOGRAPHY.labels, color: CONFIANCE_COLORS.text.secondary }}>Last Check</span>
                  <span style={{ ...CONFIANCE_TYPOGRAPHY.scores, color: model.lastCheckDays > 90 ? CONFIANCE_COLORS.accent.alert : CONFIANCE_COLORS.text.primary, fontSize: '14px' }}>{model.lastCheckDays}j</span>
                </div>
              </div>

            </div>
          );
        })}
      </div>

      <div style={{ marginTop: '16px' }}>
        <h3 style={{ ...CONFIANCE_TYPOGRAPHY.sectionTitles, color: CONFIANCE_COLORS.text.primary, borderBottom: CONFIANCE_STYLES.separator, paddingBottom: '12px', marginBottom: '16px' }}>
          Table des incidents IA (Détection BURHAN)
        </h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr>
              <th style={{ ...CONFIANCE_TYPOGRAPHY.labels, color: CONFIANCE_COLORS.text.secondary, padding: '12px', borderBottom: CONFIANCE_STYLES.separator }}>Modèle</th>
              <th style={{ ...CONFIANCE_TYPOGRAPHY.labels, color: CONFIANCE_COLORS.text.secondary, padding: '12px', borderBottom: CONFIANCE_STYLES.separator }}>Secteur</th>
              <th style={{ ...CONFIANCE_TYPOGRAPHY.labels, color: CONFIANCE_COLORS.text.secondary, padding: '12px', borderBottom: CONFIANCE_STYLES.separator }}>Impact</th>
              <th style={{ ...CONFIANCE_TYPOGRAPHY.labels, color: CONFIANCE_COLORS.accent.proof, padding: '12px', borderBottom: CONFIANCE_STYLES.separator }}>Prévention BURHAN</th>
            </tr>
          </thead>
          <tbody>
            {incidents.map((inc, i) => (
              <tr key={inc.id} style={{ backgroundColor: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)' }}>
                <td style={{ ...CONFIANCE_TYPOGRAPHY.tableData, color: CONFIANCE_COLORS.text.primary, padding: '12px', borderBottom: CONFIANCE_STYLES.separator }}>{inc.model}</td>
                <td style={{ ...CONFIANCE_TYPOGRAPHY.tableData, color: CONFIANCE_COLORS.text.tertiary, padding: '12px', borderBottom: CONFIANCE_STYLES.separator }}>{inc.sector}</td>
                <td style={{ ...CONFIANCE_TYPOGRAPHY.tableData, color: CONFIANCE_COLORS.accent.alert, padding: '12px', borderBottom: CONFIANCE_STYLES.separator }}>{inc.impact}</td>
                <td style={{ ...CONFIANCE_TYPOGRAPHY.tableData, color: CONFIANCE_COLORS.accent.proof, padding: '12px', borderBottom: CONFIANCE_STYLES.separator }}>{inc.prevention}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
