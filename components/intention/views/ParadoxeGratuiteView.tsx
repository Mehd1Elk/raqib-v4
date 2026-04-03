"use client";

import React, { useState } from 'react';
import { BLOOMBERG_PRUNE_COLORS, COMMON_STYLES } from '../shared/constants';

const C = BLOOMBERG_PRUNE_COLORS;
const MONO = '"JetBrains Mono", monospace';
const SERIF = '"Playfair Display", serif';

interface Service {
  name: string;
  gratuitPrix: string;
  arpu: number;       // € ARPU réel données vendues/an
  heures: number;     // heures/jour captées
  coutOpportunite: number; // €/an (heures * valorisation)
  coutTotal: number;  // ARPU + coût d'opportunité
  alternative: string;
  prixAlternative: number;
  donneesAlternative: string;
  isMyne?: boolean;
}

const SERVICES: Service[] = [
  { name: 'Gmail / Google', gratuitPrix: '€0', arpu: 287, heures: 1.4, coutOpportunite: 210, coutTotal: 497, alternative: 'ProtonMail', prixAlternative: 48, donneesAlternative: 'Zéro' },
  { name: 'Facebook / Meta', gratuitPrix: '€0', arpu: 314, heures: 1.8, coutOpportunite: 270, coutTotal: 584, alternative: 'Signal Groups', prixAlternative: 0, donneesAlternative: 'Zéro' },
  { name: 'Instagram / Meta', gratuitPrix: '€0', arpu: 198, heures: 2.0, coutOpportunite: 300, coutTotal: 498, alternative: 'Pixelfed', prixAlternative: 12, donneesAlternative: 'Minimal' },
  { name: 'YouTube / Google', gratuitPrix: '€0', arpu: 92, heures: 1.5, coutOpportunite: 225, coutTotal: 317, alternative: 'YouTube Premium', prixAlternative: 144, donneesAlternative: 'Réduite' },
  { name: 'Google Search', gratuitPrix: '€0', arpu: 134, heures: 0.6, coutOpportunite: 90, coutTotal: 224, alternative: 'Kagi Search', prixAlternative: 60, donneesAlternative: 'Zéro' },
  { name: 'Google Maps', gratuitPrix: '€0', arpu: 56, heures: 0.3, coutOpportunite: 45, coutTotal: 101, alternative: 'Maps.me', prixAlternative: 0, donneesAlternative: 'Minimal' },
  { name: 'WhatsApp / Meta', gratuitPrix: '€0', arpu: 41, heures: 1.2, coutOpportunite: 180, coutTotal: 221, alternative: 'Signal', prixAlternative: 0, donneesAlternative: 'Zéro' },
  { name: 'TikTok / ByteDance', gratuitPrix: '€0', arpu: 167, heures: 2.1, coutOpportunite: 315, coutTotal: 482, alternative: 'Aucune (pause)', prixAlternative: 0, donneesAlternative: 'N/A' },
  { name: 'Spotify (Freemium)', gratuitPrix: '€0', arpu: 89, heures: 1.3, coutOpportunite: 0, coutTotal: 89, alternative: 'Spotify Premium', prixAlternative: 120, donneesAlternative: 'Réduite' },
  { name: 'LinkedIn / Microsoft', gratuitPrix: '€0', arpu: 176, heures: 0.5, coutOpportunite: 75, coutTotal: 251, alternative: 'LinkedIn Premium', prixAlternative: 396, donneesAlternative: 'Réduite' },
  { name: 'Amazon (Données)', gratuitPrix: '€0', arpu: 231, heures: 0.4, coutOpportunite: 60, coutTotal: 291, alternative: 'Magasin local', prixAlternative: 0, donneesAlternative: 'Zéro' },
  { name: 'Netflix (données)', gratuitPrix: '€0', arpu: 42, heures: 1.8, coutOpportunite: 0, coutTotal: 42, alternative: 'Aucune migration', prixAlternative: 0, donneesAlternative: 'Modérée' },
  { name: 'Apple (gratuit)', gratuitPrix: '€0', arpu: 65, heures: 0.3, coutOpportunite: 45, coutTotal: 110, alternative: 'iCloud+ (payant)', prixAlternative: 36, donneesAlternative: 'Réduite' },
  { name: 'Microsoft (Copilot)', gratuitPrix: '€0', arpu: 88, heures: 0.7, coutOpportunite: 105, coutTotal: 193, alternative: 'M365 Personnel', prixAlternative: 69, donneesAlternative: 'Réduite' },
  { name: 'Snapchat / Snap', gratuitPrix: '€0', arpu: 43, heures: 0.9, coutOpportunite: 135, coutTotal: 178, alternative: 'Snap+ / pause', prixAlternative: 36, donneesAlternative: 'Réduite' },
];

const MYNE_ROW: Service & { revenueRecu: number; delta: number } = {
  name: 'MYNε',
  gratuitPrix: '€0',
  arpu: 0,
  heures: 0,
  coutOpportunite: 0,
  coutTotal: 0,
  alternative: 'MYNε souverain',
  prixAlternative: 0,
  donneesAlternative: 'Propriété utilisateur',
  isMyne: true,
  revenueRecu: 103,
  delta: -103,
};

const totalCoutGratuit = SERVICES.reduce((s, sv) => s + sv.coutTotal, 0);
const totalPrixAlt = SERVICES.reduce((s, sv) => s + sv.prixAlternative, 0);

const thStyle: React.CSSProperties = {
  ...COMMON_STYLES.categoryLabel,
  color: C.textTertiary,
  padding: '6px 10px',
  textAlign: 'left' as const,
  borderBottom: `1px solid ${C.border}`,
  whiteSpace: 'nowrap',
};

const tdStyle: React.CSSProperties = {
  fontFamily: MONO,
  fontSize: '11px',
  padding: '7px 10px',
  color: C.textMain,
  borderBottom: `0.5px solid ${C.border}`,
  whiteSpace: 'nowrap',
};

export default function ParadoxeGratuiteView() {
  const maxBar = Math.max(...SERVICES.map(s => s.coutTotal), totalPrixAlt);

  return (
    <div style={{ color: C.textMain, fontFamily: MONO }}>
      {/* CHIFFRE CHOC */}
      <div style={{
        border: `1px solid ${C.border}`,
        backgroundColor: C.cardBg,
        padding: '28px 32px',
        marginBottom: '1px',
      }}>
        <div style={{
          fontFamily: SERIF,
          fontSize: '36px',
          fontWeight: 700,
          color: C.accentNegative,
          lineHeight: 1.1,
        }}>
          &ldquo;Le gratuit coûte €{totalCoutGratuit.toLocaleString('fr-FR')}/an&rdquo;
        </div>
        <div style={{
          fontFamily: MONO,
          fontSize: '11px',
          color: C.textSecondary,
          marginTop: '6px',
          letterSpacing: '1px',
        }}>
          SOMME DES ARPU + COÛT D&apos;OPPORTUNITÉ TEMPS — 15 SERVICES DITS &ldquo;GRATUITS&rdquo;
        </div>
        <div style={{
          fontFamily: SERIF,
          fontSize: '22px',
          fontWeight: 600,
          color: C.accentPositive,
          marginTop: '16px',
        }}>
          Le payant souverain coûte €{totalPrixAlt}/an — soit{' '}
          <span style={{ fontWeight: 700 }}>
            {Math.round((1 - totalPrixAlt / totalCoutGratuit) * 100)}% MOINS CHER
          </span>
        </div>
      </div>

      {/* BLOOMBERG TABLE */}
      <div style={{ ...COMMON_STYLES.card, overflowX: 'auto', marginBottom: '1px' }}>
        <div style={{ ...COMMON_STYLES.categoryLabel, padding: '10px 12px', borderBottom: `1px solid ${C.border}`, color: C.textTertiary }}>
          AXE 13 · PARADOXE DE LA GRATUITÉ · ANALYSE COÛT RÉEL vs ALTERNATIF SOUVERAIN
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '1100px' }}>
          <thead>
            <tr>
              {['Service Gratuit', 'Prix Apparent', 'ARPU Réel €/an', 'Heures/jour', "Coût Opp. Temps/an", 'COÛT RÉEL TOTAL', 'Alternative Payante', 'Prix Alt. €/an', 'Données Alt.', 'DELTA €'].map((h, i) => (
                <th key={i} style={thStyle}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {SERVICES.map((s, i) => {
              const delta = s.coutTotal - s.prixAlternative;
              return (
                <tr key={i} style={{ backgroundColor: i % 2 === 0 ? 'transparent' : 'rgba(228,212,234,0.015)' }}>
                  <td style={{ ...tdStyle, fontWeight: 600 }}>{s.name}</td>
                  <td style={tdStyle}>{s.gratuitPrix}</td>
                  <td style={{ ...tdStyle, color: C.accentNegative }}>€{s.arpu}</td>
                  <td style={tdStyle}>{s.heures}h</td>
                  <td style={{ ...tdStyle, color: C.textSecondary }}>€{s.coutOpportunite}</td>
                  <td style={{ ...tdStyle, color: C.accentNegative, fontWeight: 700 }}>€{s.coutTotal}</td>
                  <td style={{ ...tdStyle, color: C.textSecondary }}>{s.alternative}</td>
                  <td style={{ ...tdStyle, color: C.accentPositive }}>€{s.prixAlternative}</td>
                  <td style={{ ...tdStyle, color: C.textTertiary, fontSize: '10px' }}>{s.donneesAlternative}</td>
                  <td style={{ ...tdStyle, color: C.accentNegative, fontWeight: 700 }}>+€{delta}</td>
                </tr>
              );
            })}

            {/* MYNE ROW */}
            <tr style={{ backgroundColor: 'rgba(34,197,94,0.06)' }}>
              <td style={{ ...tdStyle, fontWeight: 700, color: C.accentPositive }}>MYNε ★</td>
              <td style={tdStyle}>€0</td>
              <td style={{ ...tdStyle, color: C.accentPositive }}>€0 — utilisateur propriétaire</td>
              <td style={{ ...tdStyle, color: C.accentPositive }}>—</td>
              <td style={{ ...tdStyle, color: C.accentPositive }}>€0</td>
              <td style={{ ...tdStyle, color: C.accentPositive, fontWeight: 700 }}>€0</td>
              <td style={{ ...tdStyle, color: C.accentPositive }}>MYNε souverain</td>
              <td style={{ ...tdStyle, color: C.accentPositive }}>€0</td>
              <td style={{ ...tdStyle, color: C.accentPositive, fontSize: '10px' }}>Propriété utilisateur</td>
              <td style={{ ...tdStyle, color: C.accentPositive, fontWeight: 700 }}>-€{MYNE_ROW.revenueRecu} (GAIN)</td>
            </tr>

            {/* TOTALS */}
            <tr style={{ backgroundColor: 'rgba(228,212,234,0.04)', borderTop: `1px solid ${C.border}` }}>
              <td style={{ ...tdStyle, fontWeight: 700, color: C.textMain }}>TOTAL</td>
              <td style={tdStyle}>—</td>
              <td style={{ ...tdStyle, color: C.accentNegative, fontWeight: 700 }}>€{SERVICES.reduce((r, s) => r + s.arpu, 0)}</td>
              <td style={tdStyle}>—</td>
              <td style={{ ...tdStyle, color: C.accentNegative }}>€{SERVICES.reduce((r, s) => r + s.coutOpportunite, 0)}</td>
              <td style={{ ...tdStyle, color: C.accentNegative, fontWeight: 700 }}>€{totalCoutGratuit}</td>
              <td style={tdStyle}>—</td>
              <td style={{ ...tdStyle, color: C.accentPositive, fontWeight: 700 }}>€{totalPrixAlt}</td>
              <td style={tdStyle}>—</td>
              <td style={{ ...tdStyle, color: C.accentNegative, fontWeight: 700 }}>+€{totalCoutGratuit - totalPrixAlt}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* HORIZONTAL BAR CHART */}
      <div style={{ ...COMMON_STYLES.card, padding: '24px' }}>
        <div style={{ ...COMMON_STYLES.categoryLabel, color: C.textTertiary, marginBottom: '20px' }}>
          COMPARAISON COÛT RÉEL GRATUIT (ROUGE) vs COÛT PAYANT SOUVERAIN (VERT) — MYNε = REVENU POSITIF
        </div>

        {SERVICES.map((s, i) => {
          const redPct = (s.coutTotal / maxBar) * 100;
          const greenPct = (s.prixAlternative / maxBar) * 100;
          return (
            <div key={i} style={{ marginBottom: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ fontFamily: MONO, fontSize: '10px', color: C.textSecondary }}>{s.name}</span>
                <span style={{ fontFamily: MONO, fontSize: '10px', color: C.textTertiary }}>
                  €{s.coutTotal} vs €{s.prixAlternative}
                </span>
              </div>
              <div style={{ position: 'relative', height: '16px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                {/* Red bar — coût réel */}
                <div style={{ width: `${redPct}%`, height: '7px', backgroundColor: 'rgba(239,68,68,0.7)' }} />
                {/* Green bar — coût payant */}
                <div style={{ width: `${greenPct}%`, height: '7px', backgroundColor: 'rgba(34,197,94,0.5)' }} />
              </div>
            </div>
          );
        })}

        {/* MYNE special bar — goes RIGHT (revenue positive) */}
        <div style={{ marginTop: '8px', paddingTop: '12px', borderTop: `1px solid ${C.border}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
            <span style={{ fontFamily: MONO, fontSize: '10px', color: C.accentPositive, fontWeight: 700 }}>MYNε ★</span>
            <span style={{ fontFamily: MONO, fontSize: '10px', color: C.accentPositive }}>
              +€{MYNE_ROW.revenueRecu} (REVENU REÇU)
            </span>
          </div>
          <div style={{ position: 'relative', height: '18px', display: 'flex', alignItems: 'center' }}>
            {/* Zero line */}
            <div style={{
              position: 'absolute', left: 0, top: 0, bottom: 0, width: '1px',
              backgroundColor: C.textTertiary,
            }} />
            {/* Positive bar extending right */}
            <div style={{
              marginLeft: '1px',
              width: `${(MYNE_ROW.revenueRecu / maxBar) * 100}%`,
              height: '14px',
              backgroundColor: 'rgba(34,197,94,0.9)',
              boxShadow: '0 0 8px rgba(34,197,94,0.4)',
            }} />
          </div>
          <div style={{ fontFamily: MONO, fontSize: '9px', color: C.accentPositive, marginTop: '4px', letterSpacing: '1px' }}>
            SEUL SERVICE À DELTA NÉGATIF — L&apos;UTILISATEUR GAGNE
          </div>
        </div>
      </div>
    </div>
  );
}
