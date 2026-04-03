"use client";

import React from 'react';
import { CONFIANCE_COLORS, CONFIANCE_STYLES, CONFIANCE_TYPOGRAPHY } from '../shared/constants';

const SIGNALS = [
  { id: 1, signal: "Vitesse de frappe (Keystrokes)", natural: "Variance naturelle, pauses cognitives", fraud: "120 WPM constants, pas de backspace", detection: "Analyse temporelle des events JS" },
  { id: 2, signal: "Mouvements de souris", natural: "Courbes de Bézier organiques", fraud: "Lignes droites parfaites, snap instantané", detection: "Vecteur CDAO en background" },
  { id: 3, signal: "Réseau socio-professionnel", natural: "Densité progressive, clusters multiples", fraud: "Burst de connexions vides, pas de hubs", detection: "Graphes d'entropie relationnelle" },
  { id: 4, signal: "Séquence de navigation", natural: "Exploration, aller-retours, hésitations", fraud: "Direct path to submission form", detection: "Markov Chain anomalies" },
  { id: 5, signal: "Clozapine / Hypersalivation", natural: "Co-occurrence médicale rare mais avérée", fraud: "Mention scriptée issue de DB leaks", detection: "Correlation LLM textuelle" }
];

export const EntropyView: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 350px) 1fr', gap: '24px' }}>
        <h2 style={{ ...CONFIANCE_TYPOGRAPHY.sectionTitles, color: CONFIANCE_COLORS.text.primary, margin: 0, gridColumn: '1 / -1' }}>
          Matrice d'Entropie : Signaux Naturalité vs Fraude
        </h2>

        {/* SHANNON EQUATION BOX */}
        <div style={{ 
          backgroundColor: '#060610', 
          border: `1px solid ${CONFIANCE_COLORS.accent.regulatory}`, 
          borderRadius: CONFIANCE_STYLES.borderRadius,
          padding: '24px',
          display: 'flex', flexDirection: 'column', gap: '16px',
          boxShadow: `0 0 15px ${CONFIANCE_COLORS.accent.regulatory}20`
        }}>
          <h4 style={{ ...CONFIANCE_TYPOGRAPHY.labels, color: CONFIANCE_COLORS.accent.regulatory, margin: 0 }}>ENTROPIE DE SHANNON</h4>
          <div style={{ ...CONFIANCE_TYPOGRAPHY.tableData, color: CONFIANCE_COLORS.text.primary, fontSize: '18px', textAlign: 'center', margin: '16px 0' }}>
            H(X) = - Σ [ P(x) · log₂ P(x) ]
          </div>
          <div style={{ ...CONFIANCE_TYPOGRAPHY.tableData, color: CONFIANCE_COLORS.text.secondary, fontSize: '11px', lineHeight: 1.5 }}>
            La vraie naturalité contient un taux d'entropie incompressible. Les bots et LLM tendent vers une entropie trop faible (sur-optimisation) ou trop chaotique (randomisation stupide). L'intelligence est la zone habitable de l'entropie.
          </div>
        </div>

        {/* PATHOGNOMONIC INSIGHT BOX */}
        <div style={{ 
          backgroundColor: '#0E0E1C', 
          border: `1px solid ${CONFIANCE_COLORS.accent.entropy}`, 
          borderRadius: CONFIANCE_STYLES.borderRadius,
          padding: '24px',
          display: 'flex', flexDirection: 'column', gap: '16px',
          boxShadow: `0 0 15px ${CONFIANCE_COLORS.accent.entropy}15`
        }}>
          <h4 style={{ ...CONFIANCE_TYPOGRAPHY.labels, color: CONFIANCE_COLORS.accent.entropy, margin: 0 }}>INSIGHT PATHOGNOMONIQUE</h4>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
            <div style={{ fontSize: '32px' }}>💊</div>
            <div style={{ ...CONFIANCE_TYPOGRAPHY.tableData, color: CONFIANCE_COLORS.text.primary, fontSize: '13px', lineHeight: 1.6 }}>
              <strong style={{ color: CONFIANCE_COLORS.text.primary }}>Signal Clozapine/Hypersalivation</strong><br/>
              Un bot générant un dossier patient ou un post médical factice citera la Clozapine avec ses effets secondaires les plus graves (neutropénie). Seul un vrai prescripteur sur le terrain évoquera l'hypersalivation nocturne (sialorrhée), un détail insignifiant cliniquement mais omniprésent dans la vraie vie du patient. BURHAN détecte ces <em>micro-signatures pathognomoniques</em>.
            </div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: '16px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', backgroundColor: CONFIANCE_COLORS.background.card, borderRadius: CONFIANCE_STYLES.borderRadius, overflow: 'hidden' }}>
          <thead>
            <tr>
              <th style={{ ...CONFIANCE_TYPOGRAPHY.labels, color: CONFIANCE_COLORS.text.tertiary, padding: '16px', borderBottom: CONFIANCE_STYLES.separator }}>Signal / Vecteur</th>
              <th style={{ ...CONFIANCE_TYPOGRAPHY.labels, color: CONFIANCE_COLORS.scores.green, padding: '16px', borderBottom: CONFIANCE_STYLES.separator }}>Pattern Naturel (Humain)</th>
              <th style={{ ...CONFIANCE_TYPOGRAPHY.labels, color: CONFIANCE_COLORS.accent.alert, padding: '16px', borderBottom: CONFIANCE_STYLES.separator }}>Pattern Frauduleux (Bot/IA)</th>
              <th style={{ ...CONFIANCE_TYPOGRAPHY.labels, color: CONFIANCE_COLORS.accent.burhan, padding: '16px', borderBottom: CONFIANCE_STYLES.separator }}>Méthode de Détection</th>
            </tr>
          </thead>
          <tbody>
            {SIGNALS.map((sig, i) => (
              <tr key={sig.id} style={{ backgroundColor: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)' }}>
                <td style={{ ...CONFIANCE_TYPOGRAPHY.tableData, color: CONFIANCE_COLORS.text.primary, padding: '16px', borderBottom: i === SIGNALS.length - 1 ? 'none' : CONFIANCE_STYLES.separator }}>{sig.signal}</td>
                <td style={{ ...CONFIANCE_TYPOGRAPHY.tableData, color: CONFIANCE_COLORS.scores.green, padding: '16px', borderBottom: i === SIGNALS.length - 1 ? 'none' : CONFIANCE_STYLES.separator }}>{sig.natural}</td>
                <td style={{ ...CONFIANCE_TYPOGRAPHY.tableData, color: CONFIANCE_COLORS.accent.alert, padding: '16px', borderBottom: i === SIGNALS.length - 1 ? 'none' : CONFIANCE_STYLES.separator }}>{sig.fraud}</td>
                <td style={{ ...CONFIANCE_TYPOGRAPHY.tableData, color: CONFIANCE_COLORS.text.secondary, padding: '16px', borderBottom: i === SIGNALS.length - 1 ? 'none' : CONFIANCE_STYLES.separator }}>{sig.detection}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};
