"use client";

import React, { useState, useEffect } from 'react';
import { CONFIANCE_COLORS, CONFIANCE_STYLES, CONFIANCE_TYPOGRAPHY } from '../shared/constants';
import { TrustCircle } from '../shared/TrustCircle';

interface EntityDimension {
  id: string;
  name: string;
  score: number;
  color: string;
  descHuman: string;
  descAI: string;
}

interface TrustEntity {
  id: string;
  name: string;
  type: 'Établissement' | 'Modèle IA' | 'Praticien' | 'Supply Chain';
  globalScore: number;
  alerts: number;
  trend: '+' | '-' | '=';
  dimensions: EntityDimension[];
}

const DIMENSIONS_CONFIG = [
  { id: 'id', name: 'Identité vérifiée (ID)', color: '#00D4B8' }, // cyan
  { id: 'ct', name: 'Cohérence temporelle (CT)', color: '#C9A84C' }, // or
  { id: 'ra', name: 'Résistance adversariale (RA)', color: '#E84040' }, // rouge
  { id: 'tr', name: 'Transparence (TR)', color: '#38C060' }, // vert
  { id: 'rc', name: 'Réseau de confiance (RC)', color: '#9D4EDD' }, // violet
  { id: 'cv', name: 'Conformité vivante (CV)', color: '#00D4B8' }, // proof cyan
];

const MOCK_ENTITIES: TrustEntity[] = [
  {
    id: '1', name: 'CHU de Nantes', type: 'Établissement', globalScore: 92, alerts: 0, trend: '+',
    dimensions: DIMENSIONS_CONFIG.map(d => ({ ...d, score: Math.floor(Math.random() * 20 + 80), descHuman: 'Vérification institutionnelle certifiée', descAI: 'N/A' }))
  },
  {
    id: '2', name: 'GPT-4o Medical', type: 'Modèle IA', globalScore: 85, alerts: 2, trend: '-',
    dimensions: DIMENSIONS_CONFIG.map(d => ({ ...d, score: Math.floor(Math.random() * 30 + 70), descHuman: 'N/A', descAI: 'Empreinte de décision traçable' }))
  },
  {
    id: '3', name: 'AXA Santé', type: 'Établissement', globalScore: 88, alerts: 0, trend: '=',
    dimensions: DIMENSIONS_CONFIG.map(d => ({ ...d, score: Math.floor(Math.random() * 20 + 75), descHuman: 'Audit financier et de conformité OK', descAI: 'N/A' }))
  },
  {
    id: '4', name: 'Dr. Laurent C.', type: 'Praticien', globalScore: 95, alerts: 0, trend: '+',
    dimensions: DIMENSIONS_CONFIG.map(d => ({ ...d, score: Math.floor(Math.random() * 10 + 90), descHuman: 'Diplômes et RPPS validés', descAI: 'N/A' }))
  },
  {
    id: '5', name: 'MedSupply Tier 2', type: 'Supply Chain', globalScore: 65, alerts: 5, trend: '-',
    dimensions: DIMENSIONS_CONFIG.map(d => ({ ...d, score: Math.floor(Math.random() * 40 + 40), descHuman: 'Certifications partielles, gaps détectés', descAI: 'N/A' }))
  },
  {
    id: '6', name: 'NOOS Engine', type: 'Modèle IA', globalScore: 98, alerts: 0, trend: '+',
    dimensions: DIMENSIONS_CONFIG.map(d => ({ ...d, score: Math.floor(Math.random() * 5 + 95), descHuman: 'N/A', descAI: 'Alignement absolu Eigen' }))
  }
];

export const ProofOfBeingView: React.FC = () => {
  const [entities, setEntities] = useState<TrustEntity[]>([]);
  const [selectedEntity, setSelectedEntity] = useState<TrustEntity | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetch
    const fetchEntities = async () => {
      try {
        const res = await fetch('/api/confiance/proof-of-being');
        if (res.ok) {
          const data = await res.json();
          setEntities(data);
        } else {
          setEntities(MOCK_ENTITIES);
        }
      } catch (e) {
        setEntities(MOCK_ENTITIES);
      } finally {
        setLoading(false);
      }
    };
    fetchEntities();
  }, []);

  if (loading) {
    return <div style={{ color: CONFIANCE_COLORS.text.primary, ...CONFIANCE_TYPOGRAPHY.subtitles }}>Chargement Proof of Being...</div>;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <h2 style={{ ...CONFIANCE_TYPOGRAPHY.sectionTitles, color: CONFIANCE_COLORS.text.primary, margin: 0 }}>
        Proof of Being — Centre Névralgique
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
        {entities.map(entity => (
          <div 
            key={entity.id}
            onClick={() => setSelectedEntity(entity)}
            style={{ 
              backgroundColor: CONFIANCE_COLORS.background.card,
              border: selectedEntity?.id === entity.id ? `1px solid ${CONFIANCE_COLORS.accent.proof}` : CONFIANCE_STYLES.border,
              borderRadius: CONFIANCE_STYLES.borderRadius,
              padding: '16px',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              transition: 'border-color 0.2s',
              boxShadow: selectedEntity?.id === entity.id ? CONFIANCE_STYLES.glow : 'none'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ ...CONFIANCE_TYPOGRAPHY.subtitles, color: CONFIANCE_COLORS.text.primary }}>{entity.name}</div>
                <div style={{ ...CONFIANCE_TYPOGRAPHY.labels, color: CONFIANCE_COLORS.text.tertiary, marginTop: '4px' }}>{entity.type}</div>
              </div>
              <TrustCircle score={entity.globalScore} size={48} hasAlerts={entity.alerts > 0} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {entity.dimensions.map(dim => (
                <div key={dim.id} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '20px', ...CONFIANCE_TYPOGRAPHY.labels, color: CONFIANCE_COLORS.text.secondary }}>{dim.id}</div>
                  <div style={{ flex: 1, backgroundColor: 'rgba(255,255,255,0.05)', height: '4px', borderRadius: '2px' }}>
                    <div style={{ width: `${dim.score}%`, backgroundColor: dim.color, height: '100%', borderRadius: '2px' }} />
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: CONFIANCE_STYLES.separator, paddingTop: '12px' }}>
              <div style={{ ...CONFIANCE_TYPOGRAPHY.labels, color: entity.alerts > 0 ? CONFIANCE_COLORS.accent.alert : CONFIANCE_COLORS.text.secondary }}>
                {entity.alerts} ALERTES
              </div>
              <div style={{ ...CONFIANCE_TYPOGRAPHY.scores, color: entity.trend === '-' ? CONFIANCE_COLORS.accent.alert : CONFIANCE_COLORS.accent.proof }}>
                TREND {entity.trend}
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedEntity && (
        <div style={{ 
          marginTop: '24px', 
          padding: '24px', 
          backgroundColor: CONFIANCE_COLORS.background.card, 
          border: CONFIANCE_STYLES.border, 
          borderRadius: CONFIANCE_STYLES.borderRadius,
          boxShadow: CONFIANCE_STYLES.glow
        }}>
          <h3 style={{ ...CONFIANCE_TYPOGRAPHY.sectionTitles, color: CONFIANCE_COLORS.text.primary, marginBottom: '16px' }}>
            Détail des dimensions : {selectedEntity.name}
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
            {selectedEntity.dimensions.map(dim => (
              <div key={dim.id} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ ...CONFIANCE_TYPOGRAPHY.subtitles, color: CONFIANCE_COLORS.text.primary }}>{dim.name}</span>
                  <span style={{ ...CONFIANCE_TYPOGRAPHY.scores, color: dim.color }}>{dim.score}</span>
                </div>
                <div style={{ width: '100%', backgroundColor: 'rgba(255,255,255,0.05)', height: '6px', borderRadius: '3px' }}>
                  <div style={{ width: `${dim.score}%`, backgroundColor: dim.color, height: '100%', borderRadius: '3px' }} />
                </div>
                <div style={{ ...CONFIANCE_TYPOGRAPHY.tableData, color: CONFIANCE_COLORS.text.tertiary, fontSize: '11px' }}>
                  {selectedEntity.type === 'Modèle IA' ? dim.descAI : dim.descHuman}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
