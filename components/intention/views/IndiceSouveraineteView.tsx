"use client";

import React, { useState } from 'react';
import { BLOOMBERG_PRUNE_COLORS, COMMON_STYLES } from '../shared/constants';

const C = BLOOMBERG_PRUNE_COLORS;
const MONO = '"JetBrains Mono", monospace';
const SERIF = '"Playfair Display", serif';

interface Pays {
  pays: string;
  flag: string;
  region: string;
  base: number; // score /100
  agents: number;    // 20% — pénétration agents fiduciaires
  gap: number;       // 20% — ratio valeur captée/restituée
  cadre: number;     // 20% — cadre réglementaire data
  infra: number;     // 15% — infrastructure souveraine
  education: number; // 15% — éducation numérique
  initiatives: number; // 10% — initiatives intention economy
  myneBoost: number; // points additionnels à 15% adoption
}

const PAYS_DATA: Pays[] = [
  { pays: 'France', flag: '🇫🇷', region: 'EU', base: 18, agents: 2, gap: 3, cadre: 8, infra: 7, education: 5, initiatives: 2, myneBoost: 17 },
  { pays: 'Allemagne', flag: '🇩🇪', region: 'EU', base: 16, agents: 2, gap: 3, cadre: 7, infra: 7, education: 4, initiatives: 2, myneBoost: 16 },
  { pays: 'Pays-Bas', flag: '🇳🇱', region: 'EU', base: 15, agents: 2, gap: 3, cadre: 7, infra: 6, education: 4, initiatives: 2, myneBoost: 14 },
  { pays: 'Belgique', flag: '🇧🇪', region: 'EU', base: 14, agents: 1, gap: 3, cadre: 7, infra: 5, education: 4, initiatives: 1, myneBoost: 13 },
  { pays: 'Espagne', flag: '🇪🇸', region: 'EU', base: 12, agents: 1, gap: 2, cadre: 6, infra: 5, education: 3, initiatives: 1, myneBoost: 12 },
  { pays: 'Italie', flag: '🇮🇹', region: 'EU', base: 11, agents: 1, gap: 2, cadre: 6, infra: 4, education: 3, initiatives: 1, myneBoost: 11 },
  { pays: 'Portugal', flag: '🇵🇹', region: 'EU', base: 10, agents: 1, gap: 2, cadre: 5, infra: 4, education: 3, initiatives: 1, myneBoost: 11 },
  { pays: 'UK', flag: '🇬🇧', region: 'EU', base: 14, agents: 2, gap: 2, cadre: 6, infra: 6, education: 4, initiatives: 2, myneBoost: 13 },
  { pays: 'Suède', flag: '🇸🇪', region: 'EU', base: 16, agents: 2, gap: 3, cadre: 7, infra: 6, education: 5, initiatives: 2, myneBoost: 14 },
  { pays: 'Estonie', flag: '🇪🇪', region: 'EU', base: 19, agents: 3, gap: 3, cadre: 7, infra: 7, education: 6, initiatives: 3, myneBoost: 15 },
  { pays: 'Afrique du Sud', flag: '🇿🇦', region: 'Afrique', base: 8, agents: 1, gap: 1, cadre: 4, infra: 3, education: 2, initiatives: 2, myneBoost: 14 },
  { pays: 'Kenya', flag: '🇰🇪', region: 'Afrique', base: 6, agents: 0, gap: 1, cadre: 3, infra: 2, education: 2, initiatives: 2, myneBoost: 16 },
  { pays: 'Maroc', flag: '🇲🇦', region: 'Afrique', base: 7, agents: 1, gap: 1, cadre: 3, infra: 2, education: 2, initiatives: 1, myneBoost: 15 },
  { pays: 'Nigeria', flag: '🇳🇬', region: 'Afrique', base: 5, agents: 0, gap: 1, cadre: 2, infra: 2, education: 1, initiatives: 2, myneBoost: 15 },
  { pays: 'Ghana', flag: '🇬🇭', region: 'Afrique', base: 5, agents: 0, gap: 1, cadre: 2, infra: 2, education: 1, initiatives: 1, myneBoost: 13 },
  { pays: 'Sénégal', flag: '🇸🇳', region: 'Afrique', base: 4, agents: 0, gap: 1, cadre: 2, infra: 1, education: 1, initiatives: 1, myneBoost: 14 },
  { pays: "Côte d'Ivoire", flag: '🇨🇮', region: 'Afrique', base: 3, agents: 0, gap: 0, cadre: 1, infra: 1, education: 0, initiatives: 1, myneBoost: 13 },
  { pays: 'Canada', flag: '🇨🇦', region: 'Amériques', base: 15, agents: 2, gap: 2, cadre: 6, infra: 6, education: 4, initiatives: 2, myneBoost: 13 },
  { pays: 'Brésil', flag: '🇧🇷', region: 'Amériques', base: 9, agents: 1, gap: 1, cadre: 4, infra: 3, education: 2, initiatives: 2, myneBoost: 14 },
  { pays: 'Tunisie', flag: '🇹🇳', region: 'Afrique', base: 5, agents: 0, gap: 1, cadre: 2, infra: 2, education: 1, initiatives: 1, myneBoost: 13 },
];

const COMPOSANTES = [
  { key: 'agents', label: 'Agents Fiduciaires', poids: '20%', color: '#22C55E' },
  { key: 'gap', label: 'Gap GAFAM/Citoyens', poids: '20%', color: '#EF4444' },
  { key: 'cadre', label: 'Cadre Réglementaire', poids: '20%', color: '#A855F7' },
  { key: 'infra', label: 'Infrastructure', poids: '15%', color: '#3B82F6' },
  { key: 'education', label: 'Éducation Numérique', poids: '15%', color: '#EAB308' },
  { key: 'initiatives', label: 'Initiatives Intention', poids: '10%', color: '#EC4899' },
];

function MiniBar({ value, maxVal, color }: { value: number; maxVal: number; color: string }) {
  const pct = (value / maxVal) * 100;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
      <div style={{ width: '40px', height: '6px', backgroundColor: 'rgba(228,212,234,0.08)' }}>
        <div style={{ width: `${pct}%`, height: '100%', backgroundColor: color, opacity: 0.8 }} />
      </div>
      <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '9px', color: 'rgba(228,212,234,0.55)', minWidth: '12px' }}>{value}</span>
    </div>
  );
}

function ScoreBadge({ score, max = 100 }: { score: number; max?: number }) {
  const pct = score / max;
  const color = pct >= 0.14 ? '#22C55E' : pct >= 0.07 ? '#EAB308' : '#EF4444';
  return (
    <span style={{
      fontFamily: '"JetBrains Mono", monospace',
      fontSize: '14px',
      fontWeight: 700,
      color,
    }}>{score}</span>
  );
}

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
  verticalAlign: 'middle' as const,
};

export default function IndiceSouveraineteView() {
  const [adoption, setAdoption] = useState(0); // 0 to 30% slider

  // Compute projected score: linear interpolation between base and base+myneBoost at adoption=15%
  function projected(p: Pays) {
    if (adoption === 0) return p.base;
    const factor = adoption / 15; // at 15% => full myneBoost, at 30% => 2x boost (capped at 100)
    return Math.min(100, Math.round(p.base + p.myneBoost * Math.min(factor, 2)));
  }

  const sorted = [...PAYS_DATA].sort((a, b) => projected(b) - projected(a));
  const maxScore = Math.max(...sorted.map(p => projected(p)));

  return (
    <div style={{ color: C.textMain, fontFamily: MONO }}>

      {/* HEADER */}
      <div style={{ ...COMMON_STYLES.card, padding: '20px 24px', marginBottom: '1px' }}>
        <div style={{ fontFamily: SERIF, fontSize: '28px', fontWeight: 700, color: C.textMain }}>
          Indice de Souveraineté Intentionnelle
        </div>
        <div style={{ fontFamily: MONO, fontSize: '11px', color: C.textSecondary, marginTop: '6px' }}>
          Score composite /100 · 20 pays · 6 composantes pondérées · KPI du Forum de Dakhla
        </div>
        <div style={{ display: 'flex', gap: '24px', marginTop: '16px', flexWrap: 'wrap' }}>
          {COMPOSANTES.map(c => (
            <div key={c.key} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '8px', height: '8px', backgroundColor: c.color }} />
              <span style={{ fontFamily: MONO, fontSize: '9px', color: C.textSecondary, letterSpacing: '1px' }}>
                {c.label.toUpperCase()} ({c.poids})
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* SLIDER */}
      <div style={{ ...COMMON_STYLES.card, padding: '20px 24px', marginBottom: '1px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
          <div style={{ ...COMMON_STYLES.categoryLabel, color: C.textTertiary, flexShrink: 0 }}>
            PROJECTION 2030 AVEC MYNε — ADOPTION
          </div>
          <input
            type="range"
            min={0}
            max={30}
            step={1}
            value={adoption}
            onChange={e => setAdoption(Number(e.target.value))}
            style={{ flex: 1, accentColor: '#22C55E', minWidth: '200px' }}
          />
          <div style={{ fontFamily: SERIF, fontSize: '22px', color: '#22C55E', fontWeight: 700, flexShrink: 0 }}>
            {adoption}%
          </div>
        </div>

        {adoption >= 15 && (
          <div style={{ marginTop: '12px', display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
            <div style={{ fontFamily: MONO, fontSize: '11px', color: C.accentPositive }}>
              🇫🇷 France : {PAYS_DATA.find(p => p.pays === 'France')!.base} → {projected(PAYS_DATA.find(p => p.pays === 'France')!)}/100
            </div>
            <div style={{ fontFamily: MONO, fontSize: '11px', color: C.accentPositive }}>
              🇲🇦 Maroc : {PAYS_DATA.find(p => p.pays === 'Maroc')!.base} → {projected(PAYS_DATA.find(p => p.pays === 'Maroc')!)}/100
            </div>
            <div style={{ fontFamily: MONO, fontSize: '11px', color: '#A855F7' }}>
              À 15% d&apos;adoption MYNε, la France passe de 18→35, le Maroc de 7→22
            </div>
          </div>
        )}
      </div>

      {/* MAIN TABLE */}
      <div style={{ ...COMMON_STYLES.card, overflowX: 'auto', marginBottom: '1px' }}>
        <div style={{ ...COMMON_STYLES.categoryLabel, padding: '10px 12px', borderBottom: `1px solid ${C.border}`, color: C.textTertiary }}>
          AXE 15 · INDICE SOUVERAINETÉ INTENTIONNELLE · TRIÉ PAR SCORE{adoption > 0 ? ` PROJETÉ (${adoption}% ADOPTION MYNε)` : ' BASE 2024'}
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '900px' }}>
          <thead>
            <tr>
              <th style={{ ...thStyle, width: '32px' }}>#</th>
              <th style={thStyle}>Pays</th>
              <th style={thStyle}>Région</th>
              <th style={thStyle}>Score /100</th>
              <th style={thStyle}>Barre</th>
              {COMPOSANTES.map(c => (
                <th key={c.key} style={{ ...thStyle, fontSize: '8px' }}>
                  <span style={{ color: c.color }}>{c.label.split(' ').map(w => w[0]).join('')}</span>
                  <br />
                  <span style={{ color: C.textTertiary }}>{c.poids}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sorted.map((p, i) => {
              const score = projected(p);
              const base = p.base;
              const barPct = (score / maxScore) * 100;
              const isGaining = adoption > 0 && score > base;
              const deltaScore = score - base;
              return (
                <tr key={p.pays} style={{ backgroundColor: i % 2 === 0 ? 'transparent' : 'rgba(228,212,234,0.015)' }}>
                  <td style={{ ...tdStyle, color: C.textTertiary, fontSize: '10px' }}>{i + 1}</td>
                  <td style={{ ...tdStyle }}>
                    <span style={{ marginRight: '6px' }}>{p.flag}</span>
                    <span style={{ fontWeight: 600 }}>{p.pays}</span>
                  </td>
                  <td style={{ ...tdStyle, color: C.textTertiary, fontSize: '10px' }}>{p.region}</td>
                  <td style={{ ...tdStyle }}>
                    <ScoreBadge score={score} />
                    {isGaining && (
                      <span style={{ fontFamily: MONO, fontSize: '9px', color: C.accentPositive, marginLeft: '6px' }}>
                        +{deltaScore}↑
                      </span>
                    )}
                  </td>
                  <td style={{ ...tdStyle, minWidth: '100px' }}>
                    <div style={{ width: '100%', height: '8px', backgroundColor: 'rgba(228,212,234,0.08)' }}>
                      <div style={{
                        width: `${barPct}%`,
                        height: '100%',
                        backgroundColor: score >= 14 ? '#22C55E' : score >= 7 ? '#EAB308' : '#EF4444',
                        transition: 'width 0.4s ease',
                      }} />
                    </div>
                  </td>
                  {COMPOSANTES.map(c => (
                    <td key={c.key} style={tdStyle}>
                      <MiniBar value={p[c.key as keyof Pays] as number} maxVal={10} color={c.color} />
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* LEGEND */}
      <div style={{ ...COMMON_STYLES.card, padding: '16px 24px', display: 'flex', gap: '32px', alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '12px', height: '12px', backgroundColor: '#22C55E' }} />
          <span style={{ fontFamily: MONO, fontSize: '10px', color: C.textSecondary }}>Souveraineté haute (≥14)</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '12px', height: '12px', backgroundColor: '#EAB308' }} />
          <span style={{ fontFamily: MONO, fontSize: '10px', color: C.textSecondary }}>Émergente (7–13)</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '12px', height: '12px', backgroundColor: '#EF4444' }} />
          <span style={{ fontFamily: MONO, fontSize: '10px', color: C.textSecondary }}>Vulnérable (≤6)</span>
        </div>
        <div style={{ flex: 1 }} />
        <div style={{ fontFamily: MONO, fontSize: '10px', color: '#A855F7', letterSpacing: '1px' }}>
          ★ BOUGEZ LE CURSEUR ADOPTION MYNε POUR VOIR L&apos;IMPACT 2030
        </div>
      </div>
    </div>
  );
}
