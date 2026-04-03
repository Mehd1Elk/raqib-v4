"use client";

import React, { useState } from 'react';
import { CONFIANCE_COLORS, CONFIANCE_STYLES, CONFIANCE_TYPOGRAPHY } from '../shared/constants';

const LAWS = [
  { 
    id: 1, 
    title: 'Première Loi : Conservation', 
    statement: "La confiance totale dans un système fermé est constante, elle ne fait que changer d'état ou se transférer entre entités.",
    formula: "ΔT_system = 0  =>  T_in = T_out",
    application: "Toute perte de confiance vers une API centralisée (ex: OpenAI) se traduit par une augmentation proportionnelle vers un système self-hosted vérifiable (Noos Engine).",
    implication: "Capitonner les nœuds de fuite de confiance pour récupérer l'énergie trust-native des utilisateurs désabusés."
  },
  { 
    id: 2, 
    title: 'Deuxième Loi : Croissance de l\'Entropie', 
    statement: "Sans un apport constant d'énergie de vérification (Proof-of-Work ou cryptographie), l'entropie de la confiance (le doute, l'incertitude) ne peut qu'augmenter.",
    formula: "dS_trust ≥ 0  (Isolé)   ;   T(t) = T(0) · e^(-λt)",
    application: "Un profil certifié en 2024 sera perçu comme incertain en 2026 s'il n'y a pas de rafraîchissement synchrone. Le decay est inéluctable.",
    implication: "Imposer un Continuous Audit SDK (BURHAN) pour contrer le decay naturel, créant un revenu récurrent (Trust-as-a-Service)."
  },
  { 
    id: 3, 
    title: 'Troisième Loi : Le Zéro Absolu', 
    statement: "Il est impossible d'atteindre le Zéro Absolu de l'Incertitude (Confiance 100% infinie) car le coût marginal de vérification tend vers l'infini.",
    formula: "lim (cost → ∞) [ Uncertainty ] = ε > 0",
    application: "Inutile d'essayer de prouver l'absolu. L'algorithme d'Eigen cherche la valeur ε optimale où l'effort cryptographique équilibre le risque probabiliste.",
    implication: "On ne vend pas la perfection, on vend le gradient de sécurité optimal (SLA dynamique)."
  },
  { 
    id: 4, 
    title: 'Quatrième Loi (Onsager) : Symétrie', 
    statement: "Les flux de confiance et les forces de vérification sont couplés de manière symétrique en régime linéaire proche de l'équilibre.",
    formula: "L_ab = L_ba  ;  J_trust_A→B ∝ ∇V_proof",
    application: "Si l'on exige des preuves lourdes du fournisseur, il doit exister un gradient économique (paiement, prime) équivalent, sinon le lien se brise.",
    implication: "Le Trust Arbitrage permet de monétiser cette asymétrie. Ceux qui ne peuvent pas prouver paient une prime d'incertitude."
  }
];

export const ThermoView: React.FC = () => {
  const [activeLaw, setActiveLaw] = useState(LAWS[0]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <h2 style={{ ...CONFIANCE_TYPOGRAPHY.sectionTitles, color: CONFIANCE_COLORS.text.primary, margin: 0 }}>
        Thermodynamique de la Confiance
      </h2>

      <div style={{ display: 'flex', gap: '8px', borderBottom: CONFIANCE_STYLES.separator, paddingBottom: '16px' }}>
        {LAWS.map(law => (
          <button
            key={law.id}
            onClick={() => setActiveLaw(law)}
            style={{
              padding: '8px 16px',
              backgroundColor: activeLaw.id === law.id ? 'rgba(0, 212, 184, 0.1)' : 'transparent',
              border: `1px solid ${activeLaw.id === law.id ? CONFIANCE_COLORS.accent.proof : 'transparent'}`,
              borderRadius: CONFIANCE_STYLES.borderRadius,
              color: activeLaw.id === law.id ? CONFIANCE_COLORS.accent.proof : CONFIANCE_COLORS.text.tertiary,
              ...CONFIANCE_TYPOGRAPHY.labels,
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            Loi {law.id}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div style={{ 
          fontFamily: "'Cormorant Garamond', serif", 
          fontSize: '24px', 
          fontStyle: 'italic', 
          color: CONFIANCE_COLORS.text.primary,
          lineHeight: 1.4
        }}>
          « {activeLaw.statement} »
        </div>

        <div style={{
          backgroundColor: '#000000',
          border: `1px solid ${CONFIANCE_COLORS.accent.proof}`,
          borderRadius: CONFIANCE_STYLES.borderRadius,
          padding: '24px',
          display: 'flex', justifyContent: 'center', alignItems: 'center',
          ...CONFIANCE_TYPOGRAPHY.tableData,
          color: CONFIANCE_COLORS.accent.proof,
          fontSize: '16px',
          boxShadow: CONFIANCE_STYLES.glow
        }}>
          {activeLaw.formula}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginTop: '16px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <h4 style={{ ...CONFIANCE_TYPOGRAPHY.labels, color: CONFIANCE_COLORS.text.secondary, margin: 0 }}>APPLICATION EIGEN</h4>
            <div style={{ ...CONFIANCE_TYPOGRAPHY.subtitles, color: CONFIANCE_COLORS.text.primary, lineHeight: 1.6, fontWeight: 400 }}>
              {activeLaw.application}
            </div>
          </div>
          
          <div style={{ 
            display: 'flex', flexDirection: 'column', gap: '12px',
            borderLeft: `4px solid ${CONFIANCE_COLORS.accent.certification}`,
            backgroundColor: 'rgba(201, 168, 76, 0.05)',
            borderTopRightRadius: CONFIANCE_STYLES.borderRadius,
            borderBottomRightRadius: CONFIANCE_STYLES.borderRadius,
            padding: '16px 16px 16px 20px'
          }}>
            <h4 style={{ ...CONFIANCE_TYPOGRAPHY.labels, color: CONFIANCE_COLORS.accent.certification, margin: 0 }}>IMPLICATION STRATÉGIQUE</h4>
            <div style={{ ...CONFIANCE_TYPOGRAPHY.subtitles, color: CONFIANCE_COLORS.text.primary, lineHeight: 1.6, fontWeight: 400 }}>
              {activeLaw.implication}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
