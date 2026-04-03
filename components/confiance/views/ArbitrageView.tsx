"use client";

import React, { useState, useEffect } from 'react';
import { CONFIANCE_COLORS, CONFIANCE_TYPOGRAPHY, CONFIANCE_STYLES } from '../shared/constants';

interface ArbitrageZone {
  id: string;
  name: string;
  declaredTrust: number;
  measuredTrust: number;
  opportunityValue: string;
}

const FALLBACK_ZONES: ArbitrageZone[] = [
  { id: '1', name: 'Certificats médicaux', declaredTrust: 92, measuredTrust: 34, opportunityValue: '€1.2B' },
  { id: '2', name: 'Labels Bio', declaredTrust: 88, measuredTrust: 41, opportunityValue: '€850M' },
  { id: '3', name: 'Audits ESG', declaredTrust: 95, measuredTrust: 22, opportunityValue: '€4.5B' },
  { id: '4', name: 'IA en production', declaredTrust: 75, measuredTrust: 18, opportunityValue: '€12B' },
  { id: '5', name: 'Médicaments Corridor Afrique', declaredTrust: 60, measuredTrust: 12, opportunityValue: '€3.1B' },
];

export const ArbitrageView: React.FC = () => {
  const [zones, setZones] = useState<ArbitrageZone[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSectors = async () => {
      try {
        const res = await fetch('/api/confiance/sectors');
        if (res.ok) {
          const data = await res.json();
          // Map API data back to our ArbitrageZone format if necessary, fallback if not
          setZones(data.zones || FALLBACK_ZONES);
        } else {
          setZones(FALLBACK_ZONES);
        }
      } catch (e) {
        setZones(FALLBACK_ZONES);
      } finally {
        setLoading(false);
      }
    };
    fetchSectors();
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      
      <div style={{ 
        padding: '24px', 
        backgroundColor: CONFIANCE_COLORS.background.card, 
        border: CONFIANCE_STYLES.border, 
        borderRadius: CONFIANCE_STYLES.borderRadius,
        display: 'flex',
        flexDirection: 'column',
        gap: '16px'
      }}>
        <div style={{ ...CONFIANCE_TYPOGRAPHY.sectionTitles, color: CONFIANCE_COLORS.accent.proof }}>
          Trust Arbitrage Scanner
        </div>
        <div style={{ ...CONFIANCE_TYPOGRAPHY.tableData, color: CONFIANCE_COLORS.text.tertiary, maxWidth: '800px' }}>
          Analyse différentielle entre la confiance déclarée (documents, audits, labels) et la confiance mesurée en temps réel par cryptographie et IA.
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {zones.map((zone) => {
          const gap = zone.declaredTrust - zone.measuredTrust;
          return (
            <div key={zone.id} style={{
              padding: '24px',
              backgroundColor: CONFIANCE_COLORS.background.card,
              border: CONFIANCE_STYLES.border,
              borderRadius: CONFIANCE_STYLES.borderRadius,
              display: 'flex',
              flexDirection: 'column',
              gap: '20px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ ...CONFIANCE_TYPOGRAPHY.subtitles, color: CONFIANCE_COLORS.text.primary, fontSize: '16px' }}>
                  {zone.name}
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: '12px' }}>
                  <div style={{ ...CONFIANCE_TYPOGRAPHY.labels, color: CONFIANCE_COLORS.text.tertiary }}>Opportunité commerciale</div>
                  <div style={{ ...CONFIANCE_TYPOGRAPHY.scores, color: CONFIANCE_COLORS.text.primary, fontSize: '24px' }}>
                    {zone.opportunityValue}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', position: 'relative' }}>
                {/* Confiance Declarée */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ width: '150px', ...CONFIANCE_TYPOGRAPHY.labels, color: CONFIANCE_COLORS.text.tertiary }}>Confiance Déclarée</div>
                  <div style={{ flex: 1, height: '12px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '6px', overflow: 'hidden' }}>
                    <div style={{ width: `${zone.declaredTrust}%`, height: '100%', backgroundColor: 'rgba(255,255,255,0.3)' }} />
                  </div>
                  <div style={{ width: '40px', ...CONFIANCE_TYPOGRAPHY.scores, color: 'rgba(255,255,255,0.5)', textAlign: 'right' }}>{zone.declaredTrust}%</div>
                </div>

                {/* Confiance Mesurée */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ width: '150px', ...CONFIANCE_TYPOGRAPHY.labels, color: CONFIANCE_COLORS.accent.proof }}>Confiance Mesurée</div>
                  <div style={{ flex: 1, height: '12px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '6px', overflow: 'hidden' }}>
                    <div style={{ width: `${zone.measuredTrust}%`, height: '100%', backgroundColor: CONFIANCE_COLORS.accent.proof }} />
                  </div>
                  <div style={{ width: '40px', ...CONFIANCE_TYPOGRAPHY.scores, color: CONFIANCE_COLORS.accent.proof, textAlign: 'right' }}>{zone.measuredTrust}%</div>
                </div>

                {/* GAP Marker */}
                <div style={{ 
                  position: 'absolute', 
                  left: `calc(150px + 16px + ${zone.measuredTrust}% * 0.85)`, // Approx calc for visual
                  bottom: '-12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <div style={{ width: `${gap}%`, minWidth: '100px', height: '2px', backgroundColor: CONFIANCE_COLORS.accent.alert, opacity: 0.5 }} />
                  <div style={{ ...CONFIANCE_TYPOGRAPHY.scores, color: CONFIANCE_COLORS.accent.alert, fontSize: '18px', textShadow: '0 0 10px rgba(232, 64, 64, 0.4)' }}>
                    -{gap}% GAP
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ 
        marginTop: '16px',
        padding: '24px',
        border: `1px solid ${CONFIANCE_COLORS.accent.certification}`,
        backgroundColor: 'rgba(201, 168, 76, 0.05)',
        borderRadius: CONFIANCE_STYLES.borderRadius,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 0 30px rgba(201, 168, 76, 0.05)'
      }}>
        <div style={{ 
          ...CONFIANCE_TYPOGRAPHY.sectionTitles, 
          color: CONFIANCE_COLORS.accent.certification,
          letterSpacing: '2px',
          textTransform: 'uppercase',
          fontWeight: 400
        }}>
          Doctrine commerciale : "Vendez BURHAN là où l'écart (GAP) est maximal."
        </div>
      </div>

    </div>
  );
};
