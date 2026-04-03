"use client";

import React, { useState } from 'react';
import { BLOOMBERG_PRUNE_COLORS, COMMON_STYLES } from '../shared/constants';

const C = BLOOMBERG_PRUNE_COLORS;
const MONO = '"JetBrains Mono", monospace';
const SERIF = '"Playfair Display", serif';

// Brique colors
const BRICK_COLORS: Record<string, string> = {
  ÆLYA: '#22C55E',      // vert
  MYNε: '#A855F7',      // violet
  BURHAN: '#EAB308',    // or
  NOOS: '#3B82F6',      // bleu
  MIZAN: '#EC4899',     // rose
};

interface Reglementation {
  id: string;
  annee: number;
  label: string;
  full: string;
  briques: string[];
  articles?: string;
  zone: string;
  note: string;
}

const REGLEMENTATIONS: Reglementation[] = [
  {
    id: 'RGPD', annee: 2018, label: 'RGPD', full: 'Règlement Général sur la Protection des Données',
    briques: ['ÆLYA', 'MYNε'],
    articles: 'Art.20 portabilité → MYNε · Art.7 consentement → ÆLYA',
    zone: 'UE', note: 'Fondation. Active portabilité & consentement.'
  },
  {
    id: 'NDPA', annee: 2023, label: 'Nigeria NDPA', full: 'Nigeria Data Protection Act 2023',
    briques: ['ÆLYA'],
    articles: 'Consentement explicite → ÆLYA',
    zone: 'Nigeria', note: 'Cadre nigérian inspiré du RGPD.'
  },
  {
    id: 'DMA', annee: 2024, label: 'DMA', full: 'Digital Markets Act',
    briques: ['ÆLYA', 'MYNε'],
    articles: 'Interopérabilité obligatoire gatekeepers',
    zone: 'UE', note: 'Force les plateformes à ouvrir leurs données.'
  },
  {
    id: 'DGA', annee: 2024, label: 'DGA', full: 'Data Governance Act',
    briques: ['MYNε'],
    articles: 'Art.10 data intermediary → MYNε',
    zone: 'UE', note: 'MYNε devient intermédiaire de données reconnu.'
  },
  {
    id: 'eIDAS', annee: 2024, label: 'eIDAS 2.0', full: 'European Digital Identity Framework',
    briques: ['ÆLYA', 'BURHAN'],
    articles: 'Identité numérique → ÆLYA · Vérification → BURHAN',
    zone: 'UE', note: 'Portefeuille identité numérique européen.'
  },
  {
    id: 'AI_ACT', annee: 2025, label: 'AI Act', full: 'EU Artificial Intelligence Act',
    briques: ['ÆLYA', 'BURHAN'],
    articles: 'Art.10 données entraînement → ÆLYA · Art.13/14 décisions → BURHAN',
    zone: 'UE', note: 'Transparence IA obligatoire.'
  },
  {
    id: 'DATA_ACT', annee: 2025, label: 'Data Act', full: 'EU Data Act',
    briques: ['MYNε', 'ÆLYA'],
    articles: 'Portabilité machine → MYNε · Accès données connectées',
    zone: 'UE', note: 'Étend la portabilité aux objets connectés.'
  },
  {
    id: 'EHDS', annee: 2025, label: 'EHDS', full: 'European Health Data Space',
    briques: ['NOOS', 'BURHAN', 'MYNε'],
    articles: 'Espace santé numérique → NOOS + BURHAN + MYNε',
    zone: 'UE', note: 'Accès citoyen aux données de santé.'
  },
  {
    id: 'MALABO', annee: 2025, label: 'Conv. Malabo', full: 'Convention de Malabo — UA',
    briques: ['ÆLYA', 'MYNε'],
    articles: 'Corridor Afrique → portabilité cross-frontalière',
    zone: 'Afrique', note: 'Cadre africain de protection des données.'
  },
  {
    id: 'MAROC', annee: 2025, label: 'Maroc Loi 09-08', full: 'CNDP Renforcement Maroc',
    briques: ['ÆLYA'],
    articles: 'Consentement renforcé → ÆLYA',
    zone: 'Maroc', note: 'Alignement CNDP sur standards RGPD.'
  },
  {
    id: 'CS3D', annee: 2026, label: 'CS3D / CSDDD', full: 'Corporate Sustainability Due Diligence Directive',
    briques: ['BURHAN'],
    articles: 'Audit chaîne de valeur → BURHAN Decision Receipts',
    zone: 'UE', note: 'Due diligence obligation pour supply chains.'
  },
  {
    id: 'PSD3', annee: 2026, label: 'PSD3', full: 'Payment Services Directive 3',
    briques: ['MIZAN', 'ÆLYA'],
    articles: 'Paiements ouverts → MIZAN · Consentement financier → ÆLYA',
    zone: 'UE', note: 'Extension open banking: open finance.'
  },
];

// Staircase data
const STAIRCASE = [
  { annee: 2016, count: 0 },
  { annee: 2018, count: 1 },
  { annee: 2019, count: 1 },
  { annee: 2020, count: 1 },
  { annee: 2021, count: 1 },
  { annee: 2022, count: 1 },
  { annee: 2023, count: 2 },
  { annee: 2024, count: 5 },
  { annee: 2025, count: 10 },
  { annee: 2026, count: 12 },
  { annee: 2027, count: 12 },
  { annee: 2028, count: 12 },
];

const BRIQUE_COUNT: Record<string, number> = {
  ÆLYA: 8, BURHAN: 6, MYNε: 5, NOOS: 3, MIZAN: 2,
};

const thStyle: React.CSSProperties = {
  ...COMMON_STYLES.categoryLabel,
  color: C.textTertiary,
  padding: '6px 12px',
  textAlign: 'left' as const,
  borderBottom: `1px solid ${C.border}`,
  whiteSpace: 'nowrap',
};

const tdStyle: React.CSSProperties = {
  fontFamily: MONO,
  fontSize: '11px',
  padding: '8px 12px',
  color: C.textMain,
  borderBottom: `0.5px solid ${C.border}`,
};

export default function CascadeReglementaireView() {
  const [selectedReg, setSelectedReg] = useState<string | null>(null);
  const selectedData = REGLEMENTATIONS.find(r => r.id === selectedReg);

  const maxCount = 12;
  const years = [2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028];

  return (
    <div style={{ color: C.textMain, fontFamily: MONO }}>

      {/* HEADER KPI */}
      <div style={{ ...COMMON_STYLES.card, padding: '20px 24px', marginBottom: '1px', display: 'flex', gap: '40px', alignItems: 'center' }}>
        <div>
          <div style={{ fontFamily: SERIF, fontSize: '28px', fontWeight: 700, color: C.accentPositive }}>12</div>
          <div style={{ ...COMMON_STYLES.categoryLabel, color: C.textTertiary, marginTop: '4px' }}>RÉGLEMENTATIONS EN 2028</div>
        </div>
        <div>
          <div style={{ fontFamily: SERIF, fontSize: '28px', fontWeight: 700, color: '#A855F7' }}>5</div>
          <div style={{ ...COMMON_STYLES.categoryLabel, color: C.textTertiary, marginTop: '4px' }}>BRIQUES EIGEN ACTIVÉES</div>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: MONO, fontSize: '11px', color: C.textSecondary, lineHeight: 1.6 }}>
            En 2028, les 12 réglementations seront actives simultanément.{' '}
            <span style={{ color: C.accentNegative, fontWeight: 700 }}>
              Ne PAS utiliser Eigen sera plus coûteux que l&apos;utiliser.
            </span>
          </div>
        </div>
      </div>

      {/* VERTICAL TIMELINE */}
      <div style={{ ...COMMON_STYLES.card, padding: '24px', marginBottom: '1px' }}>
        <div style={{ ...COMMON_STYLES.categoryLabel, color: C.textTertiary, marginBottom: '24px' }}>
          TIMELINE RÉGLEMENTAIRE 2016 → 2030 · CLIQUER SUR UN BLOC POUR DÉTAILS
        </div>

        <div style={{ display: 'flex', gap: '0' }}>
          {/* Year column */}
          <div style={{ flexShrink: 0, width: '52px', position: 'relative' }}>
            {years.map((yr, i) => (
              <div key={yr} style={{
                height: '64px',
                display: 'flex',
                alignItems: 'flex-start',
                paddingTop: '2px',
              }}>
                <span style={{ fontFamily: MONO, fontSize: '10px', color: yr >= 2024 ? C.textSecondary : C.textTertiary, fontWeight: yr === 2028 ? 700 : 400 }}>
                  {yr}
                </span>
              </div>
            ))}
          </div>

          {/* Timeline line */}
          <div style={{ flexShrink: 0, width: '1px', backgroundColor: C.border, margin: '0 16px', position: 'relative' }}>
            {/* Active dot */}
            <div style={{
              position: 'absolute', top: '40%', left: '-3px',
              width: '7px', height: '7px', borderRadius: '50%',
              backgroundColor: C.accentPositive,
              boxShadow: '0 0 8px rgba(34,197,94,0.6)'
            }} />
          </div>

          {/* Events grid */}
          <div style={{ flex: 1 }}>
            {years.map(yr => {
              const regsThisYear = REGLEMENTATIONS.filter(r => r.annee === yr);
              return (
                <div key={yr} style={{ height: '64px', display: 'flex', alignItems: 'flex-start', paddingTop: '0px', gap: '6px', flexWrap: 'wrap' }}>
                  {regsThisYear.map(reg => (
                    <div
                      key={reg.id}
                      onClick={() => setSelectedReg(selectedReg === reg.id ? null : reg.id)}
                      style={{
                        cursor: 'pointer',
                        padding: '4px 8px',
                        height: 'fit-content',
                        borderLeft: `3px solid ${BRICK_COLORS[reg.briques[0]] || C.textSecondary}`,
                        backgroundColor: selectedReg === reg.id
                          ? `${BRICK_COLORS[reg.briques[0]]}22`
                          : 'rgba(228,212,234,0.04)',
                        transition: 'all 0.15s',
                      }}
                    >
                      <div style={{ fontFamily: MONO, fontSize: '10px', fontWeight: 700, color: C.textMain }}>{reg.label}</div>
                      <div style={{ display: 'flex', gap: '4px', marginTop: '2px' }}>
                        {reg.briques.map(b => (
                          <span key={b} style={{
                            fontFamily: MONO, fontSize: '8px', fontWeight: 700,
                            color: BRICK_COLORS[b], letterSpacing: '0.5px'
                          }}>{b}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>

        {/* DETAIL POPOVER */}
        {selectedData && (
          <div style={{
            marginTop: '16px',
            padding: '16px',
            backgroundColor: 'rgba(228,212,234,0.03)',
            borderLeft: `3px solid ${BRICK_COLORS[selectedData.briques[0]]}`,
          }}>
            <div style={{ fontFamily: SERIF, fontSize: '15px', color: C.textMain, marginBottom: '8px' }}>
              {selectedData.full} ({selectedData.annee})
            </div>
            <div style={{ fontFamily: MONO, fontSize: '11px', color: C.textSecondary, marginBottom: '6px' }}>
              {selectedData.articles}
            </div>
            <div style={{ fontFamily: MONO, fontSize: '10px', color: C.textTertiary }}>{selectedData.note}</div>
            <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
              <span style={{ fontFamily: MONO, fontSize: '9px', color: '#A855F7', letterSpacing: '1px' }}>ZONE: {selectedData.zone}</span>
              {selectedData.briques.map(b => (
                <span key={b} style={{
                  fontFamily: MONO, fontSize: '9px', fontWeight: 700,
                  color: BRICK_COLORS[b], letterSpacing: '1px'
                }}>■ {b}</span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* STAIRCASE CHART */}
      <div style={{ ...COMMON_STYLES.card, padding: '24px', marginBottom: '1px' }}>
        <div style={{ ...COMMON_STYLES.categoryLabel, color: C.textTertiary, marginBottom: '20px' }}>
          COMPTEUR CUMULÉ DE RÉGLEMENTATIONS EN VIGUEUR — GRAPHE EN ESCALIER 2016→2028
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '1px', height: '120px' }}>
          {STAIRCASE.map((s, i) => {
            const pct = (s.count / maxCount) * 100;
            const isHigh = s.count >= 10;
            return (
              <div key={s.annee} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
                <div style={{ fontFamily: MONO, fontSize: '9px', color: isHigh ? C.accentNegative : C.textTertiary, marginBottom: '4px' }}>
                  {s.count > 0 ? s.count : ''}
                </div>
                <div style={{
                  width: '100%',
                  height: `${pct}%`,
                  minHeight: s.count > 0 ? '4px' : '0px',
                  backgroundColor: isHigh ? 'rgba(239,68,68,0.6)' : 'rgba(228,212,234,0.15)',
                  transition: 'height 0.3s',
                }} />
                <div style={{ fontFamily: MONO, fontSize: '8px', color: C.textTertiary, marginTop: '6px', transform: 'rotate(-45deg)', transformOrigin: 'top left', whiteSpace: 'nowrap' }}>
                  {s.annee}
                </div>
              </div>
            );
          })}
        </div>
        <div style={{ fontFamily: MONO, fontSize: '10px', color: C.accentNegative, marginTop: '32px', letterSpacing: '1px' }}>
          ▲ EN 2028 : 12 RÉGLEMENTATIONS ACTIVES SIMULTANÉMENT
        </div>
      </div>

      {/* BRIQUE SUMMARY TABLE */}
      <div style={{ ...COMMON_STYLES.card, overflowX: 'auto' }}>
        <div style={{ ...COMMON_STYLES.categoryLabel, padding: '10px 12px', borderBottom: `1px solid ${C.border}`, color: C.textTertiary }}>
          RÉCAPITULATIF — NOMBRE DE RÉGLEMENTATIONS ACTIVANT CHAQUE BRIQUE EIGEN
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>Brique Eigen</th>
              <th style={thStyle}>Nb Réglementations</th>
              <th style={thStyle}>Poids Réglementaire</th>
              <th style={thStyle}>Réglementations Clés</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(BRIQUE_COUNT).sort((a, b) => b[1] - a[1]).map(([brique, count], i) => {
              const pct = (count / 12) * 100;
              const regsForBrique = REGLEMENTATIONS.filter(r => r.briques.includes(brique)).map(r => r.label).join(', ');
              return (
                <tr key={brique} style={{ backgroundColor: i % 2 === 0 ? 'transparent' : 'rgba(228,212,234,0.015)' }}>
                  <td style={{ ...tdStyle, color: BRICK_COLORS[brique], fontWeight: 700 }}>{brique}</td>
                  <td style={{ ...tdStyle }}>
                    <span style={{ color: BRICK_COLORS[brique], fontWeight: 700, fontSize: '18px', fontFamily: SERIF }}>{count}</span>
                    <span style={{ color: C.textTertiary, fontSize: '10px' }}> / 12</span>
                  </td>
                  <td style={{ ...tdStyle }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ flex: 1, height: '6px', backgroundColor: 'rgba(228,212,234,0.08)' }}>
                        <div style={{ width: `${pct}%`, height: '100%', backgroundColor: BRICK_COLORS[brique] }} />
                      </div>
                      <span style={{ color: C.textSecondary, fontSize: '10px' }}>{Math.round(pct)}%</span>
                    </div>
                  </td>
                  <td style={{ ...tdStyle, color: C.textTertiary, fontSize: '10px' }}>{regsForBrique}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
