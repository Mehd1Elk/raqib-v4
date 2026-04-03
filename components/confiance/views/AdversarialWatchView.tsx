"use client";

import React, { useState } from 'react';
import { CONFIANCE_COLORS, CONFIANCE_TYPOGRAPHY, CONFIANCE_STYLES } from '../shared/constants';

interface Threat {
  id: string;
  name: string;
  severity: 'CRITIQUE' | 'ÉLEVÉ';
  trend: '+140% YoY' | '+85% YoY' | '+210% YoY' | '+300% YoY' | '+45% YoY';
  keyData: string;
  impact: string;
  defense: string;
  gap: string;
  research: string;
}

const THREATS: Threat[] = [
  { id: '1', name: 'Deepfakes & Synthetic Media', severity: 'CRITIQUE', trend: '+300% YoY', keyData: '85% des fausses preuves d\'identité bancaire (2025).', impact: 'Subversion des KYC traditionnels via injection vidéo.', defense: 'Cryptographic Liveness & provenance attestations (Burhan C2).', gap: 'Détection vs Génération: la génération gagne. Seule l\'attestation à la source survit.', research: 'Quantum-resistant origin proofs.' },
  { id: '2', name: 'Model Poisoning', severity: 'CRITIQUE', trend: '+210% YoY', keyData: '40% des LLMs fine-tuned exposés.', impact: 'Biais indétectables, backdoors logicielle.', defense: 'EigenProof sur le dataset d\'entraînement et le RLHF.', gap: 'Manque de traçabilité des données d\'entraînement open-source.', research: 'Zero-Knowledge Machine Learning (ZKML).' },
  { id: '3', name: 'Supply Chain Attacks', severity: 'ÉLEVÉ', trend: '+85% YoY', keyData: 'Attaques Tiers (Rank N-3) en hausse.', impact: 'Injection logicielle ou contrefaçon matérielle bypassing les audits Tier 1.', defense: 'Graphe cryptographique NOOS + signature continue BURHAN.', gap: 'Invisibilité au-delà du fournisseur direct.', research: 'Recursive zk-SNARKs pour supply chains.' },
  { id: '4', name: 'Certificats Frauduleux (ESG/Bio)', severity: 'ÉLEVÉ', trend: '+140% YoY', keyData: '30% des labels environnementaux non-vérifiables.', impact: 'Prime commerciale touchée sans conformité thermodynamique réelle.', defense: 'Oracle IoT inviolable -> Smart Contract.' , gap: 'Papier vs Réalité physique.', research: 'Hardware Roots of Trust pour capteurs IoT ESG.' },
  { id: '5', name: 'Identity Theft (AI Agents)', severity: 'CRITIQUE', trend: '+300% YoY', keyData: 'Usurpation de wallets autonomes.', impact: 'Agents AI malicieux agissant sous l\'identité d\'entités légales.', defense: 'DIDs (Decentralized Identifiers) pour AI.', gap: 'Cadre légal absent pour la responsabilité des agents.', research: 'Jurisprudence algorithmique ÆLYA.' }
];

export const AdversarialWatchView: React.FC = () => {
  const [selectedThreat, setSelectedThreat] = useState<Threat>(THREATS[0]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px' }}>
        {THREATS.map(threat => (
          <button
            key={threat.id}
            onClick={() => setSelectedThreat(threat)}
            style={{
              padding: '16px',
              backgroundColor: selectedThreat.id === threat.id ? 'rgba(255,255,255,0.05)' : CONFIANCE_COLORS.background.card,
              border: selectedThreat.id === threat.id ? `1px solid ${CONFIANCE_COLORS.text.secondary}` : CONFIANCE_STYLES.border,
              borderRadius: CONFIANCE_STYLES.borderRadius,
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'all 0.2s'
            }}
          >
            <div style={{ 
              display: 'inline-block', 
              padding: '2px 6px', 
              borderRadius: '2px', 
              ...CONFIANCE_TYPOGRAPHY.labels, 
              backgroundColor: threat.severity === 'CRITIQUE' ? 'rgba(232, 64, 64, 0.15)' : 'rgba(232, 144, 64, 0.15)',
              color: threat.severity === 'CRITIQUE' ? CONFIANCE_COLORS.accent.alert : CONFIANCE_COLORS.scores.orange,
              width: 'max-content'
            }}>
              {threat.severity}
            </div>
            <div style={{ ...CONFIANCE_TYPOGRAPHY.subtitles, color: CONFIANCE_COLORS.text.primary, height: '40px' }}>
              {threat.name}
            </div>
            <div style={{ ...CONFIANCE_TYPOGRAPHY.scores, color: CONFIANCE_COLORS.text.secondary, fontSize: '14px' }}>
              {threat.trend}
            </div>
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '32px', backgroundColor: CONFIANCE_COLORS.background.card, border: CONFIANCE_STYLES.border, borderRadius: CONFIANCE_STYLES.borderRadius }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div style={{ ...CONFIANCE_TYPOGRAPHY.sectionTitles, color: CONFIANCE_COLORS.text.primary, fontSize: '32px' }}>
            {selectedThreat.name}
          </div>
          <div style={{ ...CONFIANCE_TYPOGRAPHY.scores, color: CONFIANCE_COLORS.accent.alert, fontSize: '24px' }}>
            {selectedThreat.trend}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginTop: '16px' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
             <div style={{ ...CONFIANCE_TYPOGRAPHY.labels, color: CONFIANCE_COLORS.text.tertiary }}>Données Clés</div>
             <div style={{ ...CONFIANCE_TYPOGRAPHY.tableData, color: CONFIANCE_COLORS.text.primary, fontSize: '14px' }}>{selectedThreat.keyData}</div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
             <div style={{ ...CONFIANCE_TYPOGRAPHY.labels, color: CONFIANCE_COLORS.accent.alert }}>Impact Vectoriel</div>
             <div style={{ ...CONFIANCE_TYPOGRAPHY.tableData, color: CONFIANCE_COLORS.text.primary, fontSize: '14px' }}>{selectedThreat.impact}</div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '16px', backgroundColor: 'rgba(0, 212, 184, 0.05)', borderLeft: `3px solid ${CONFIANCE_COLORS.accent.proof}` }}>
             <div style={{ ...CONFIANCE_TYPOGRAPHY.labels, color: CONFIANCE_COLORS.accent.proof }}>Défense Eigen (Burhan)</div>
             <div style={{ ...CONFIANCE_TYPOGRAPHY.tableData, color: CONFIANCE_COLORS.text.primary, fontSize: '14px' }}>{selectedThreat.defense}</div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '16px', backgroundColor: 'rgba(232, 144, 64, 0.05)', borderLeft: `3px solid ${CONFIANCE_COLORS.scores.orange}` }}>
             <div style={{ ...CONFIANCE_TYPOGRAPHY.labels, color: CONFIANCE_COLORS.scores.orange }}>Gap Ouvert</div>
             <div style={{ ...CONFIANCE_TYPOGRAPHY.tableData, color: CONFIANCE_COLORS.text.primary, fontSize: '14px' }}>{selectedThreat.gap}</div>
          </div>

          <div style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column', gap: '8px', padding: '16px', backgroundColor: 'rgba(79, 195, 247, 0.05)', borderLeft: `3px solid ${CONFIANCE_COLORS.accent.regulatory}` }}>
             <div style={{ ...CONFIANCE_TYPOGRAPHY.labels, color: CONFIANCE_COLORS.accent.regulatory }}>Recherche en Cours (Black Ops)</div>
             <div style={{ ...CONFIANCE_TYPOGRAPHY.tableData, color: CONFIANCE_COLORS.text.primary, fontSize: '14px' }}>{selectedThreat.research}</div>
          </div>

        </div>

      </div>

      <div style={{ 
        padding: '24px',
        textAlign: 'center',
        borderTop: CONFIANCE_STYLES.separator,
        borderBottom: CONFIANCE_STYLES.separator
      }}>
        <div style={{ ...CONFIANCE_TYPOGRAPHY.sectionTitles, color: CONFIANCE_COLORS.text.secondary, fontStyle: 'normal' }}>
          "Chaque vecteur exploite l'absence de preuve continue. EIGEN supprime la condition commune."
        </div>
      </div>

    </div>
  );
};
