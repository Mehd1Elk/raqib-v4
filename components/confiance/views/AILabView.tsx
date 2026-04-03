"use client";

import React from 'react';
import { CONFIANCE_COLORS, CONFIANCE_STYLES, CONFIANCE_TYPOGRAPHY } from '../shared/constants';

interface AIModel {
  id: string;
  name: string;
  org: string;
  hash: string;
  driftScore: number;
  decisionReceipts: number;
  explainability: number;
  aiActClass: 'Unacceptable' | 'High' | 'Limited' | 'Minimal';
  lastCheckDays: number;
}

const MOCK_MODELS: AIModel[] = [
  { id: '1', name: 'GPT-4o Medical', org: 'OpenAI', hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', driftScore: 2.1, decisionReceipts: 14502, explainability: 82, aiActClass: 'High', lastCheckDays: 12 },
  { id: '2', name: 'MedLM', org: 'Google Health', hash: '8a2b5d4e1f7c9e0a3b6d8f2c5a1e4b7d9c0f3a6e9b2c5d8f1a4e7b0c3d6f9a2b', driftScore: 8.4, decisionReceipts: 340, explainability: 65, aiActClass: 'High', lastCheckDays: 105 },
  { id: '3', name: 'Triagiste AI', org: 'CHU Nantes', hash: 'fc1c149afbf4c8996fb92427ae41e46e3b0c4429849b934ca495991b7852b855', driftScore: 0.5, decisionReceipts: 0, explainability: 95, aiActClass: 'Limited', lastCheckDays: 4 },
  { id: '4', name: 'Llama-3-Care', org: 'Meta/Open', hash: '996fb92427ae41e4649b934ca495991be3b0c44298fc1c149afbf4c87852b855', driftScore: 4.8, decisionReceipts: 8900, explainability: 70, aiActClass: 'High', lastCheckDays: 2 },
  { id: '5', name: 'Radiology.v2', org: 'Siemens Health', hash: '49b934ca495991b7852b855e3b0c44298fc1c149afbf4c8996fb92427ae41e46', driftScore: 1.2, decisionReceipts: 56000, explainability: 88, aiActClass: 'High', lastCheckDays: 45 },
];

const MOCK_INCIDENTS = [
  { id: 1, model: 'MedLM', sector: 'Diagnostic', impact: 'Biais ethnique détecté (+15% FP)', prevention: 'Drift Warning émis par BURHAN 12h avant.' },
  { id: 2, model: 'Triagiste AI', sector: 'Urgences', impact: 'Absence d\'auditabilité (0 Decision Receipts)', prevention: 'Modèle bloqué en amont, fallback humain activé.' }
];

export const AILabView: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <h2 style={{ ...CONFIANCE_TYPOGRAPHY.sectionTitles, color: CONFIANCE_COLORS.text.primary, margin: 0 }}>
        AI Authentication Lab
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '16px' }}>
        {MOCK_MODELS.map(model => {
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
            {MOCK_INCIDENTS.map((inc, i) => (
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
