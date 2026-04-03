import React, { useState } from 'react';
import { BLOOMBERG_PRUNE_COLORS, COMMON_STYLES } from '../shared/constants';

const MULTIPLIERS = [
  { label: '1 PERSONNE', value: 1 },
  { label: '37M (MAROC)', value: 37000000 },
  { label: '500M (CORRIDOR)', value: 500000000 },
];

export default function ParadigmComparatorView() {
  const [step, setStep] = useState<number>(0);

  const multiplier = MULTIPLIERS[step].value;

  const attentionData = {
    produced: 194 * multiplier,
    received: 0,
    ads: 847 * multiplier,
    time: 766 * multiplier,
    control: '0%',
    agent: 'AUCUN',
    consent: `"J'ACCEPTE TOUT" × ${312 * multiplier} fois/an`
  };

  const intentionData = {
    produced: 194 * multiplier,
    received: 103 * multiplier,
    ads: 0,
    time: 766 * multiplier, // libéré
    control: '100%',
    agent: 'ÆLYA (312 CGU SCANNÉES, 67% REJECT)',
    intentions: multiplier === 1 ? '3/MOIS → €22/INTENTION' : `${(3 * 12 * multiplier).toLocaleString('fr-FR')} INTENTIONS/AN`
  };

  const formatCurrency = (val: number) => {
    if (val >= 1e9) return `€${(val / 1e9).toFixed(2)}B`;
    if (val >= 1e6) return `€${(val / 1e6).toFixed(2)}M`;
    if (val >= 1e3) return `€${(val / 1e3).toFixed(2)}K`;
    return `€${val.toLocaleString('fr-FR')}`;
  };

  const formatNumber = (val: number) => {
    if (val >= 1e9) return `${(val / 1e9).toFixed(1)}B`;
    if (val >= 1e6) return `${(val / 1e6).toFixed(1)}M`;
    if (val >= 1e3) return `${(val / 1e3).toFixed(1)}K`;
    return val.toLocaleString('fr-FR');
  };

  return (
    <div className="flex flex-col h-full space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 style={COMMON_STYLES.sectionTitle}>Comparateur de Paradigme</h2>
          <p style={{ ...COMMON_STYLES.categoryLabel, color: BLOOMBERG_PRUNE_COLORS.textSecondary, marginTop: '4px' }}>
            PROFIL : FATIMA, 34 ANS, CASABLANCA, ENSEIGNANTE
          </p>
        </div>
      </div>

      <div className="flex-1 flex space-x-6 overflow-hidden">
        {/* LEFT: ÉCONOMIE DE L'ATTENTION */}
        <div className="w-1/2 flex flex-col h-full border" style={{ borderColor: 'rgba(239,68,68,0.2)', backgroundColor: 'rgba(239,68,68,0.04)' }}>
          <div className="p-4 border-b flex items-center justify-between" style={{ borderColor: 'rgba(239,68,68,0.2)' }}>
            <span style={{ ...COMMON_STYLES.categoryLabel, color: '#EF4444' }}>ÉCONOMIE DE L'ATTENTION (WEB2)</span>
            <span style={{ fontSize: '16px' }}>📉</span>
          </div>
          <div className="flex-1 p-8 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex flex-col">
                <span style={{ ...COMMON_STYLES.categoryLabel, color: BLOOMBERG_PRUNE_COLORS.textTertiary }}>VALEUR DES DONNÉES PRODUITES</span>
                <span className="text-2xl mt-1" style={{ fontFamily: '"JetBrains Mono", monospace', color: BLOOMBERG_PRUNE_COLORS.textMain }}>
                  {formatCurrency(attentionData.produced)} / AN
                </span>
              </div>
              <div className="flex flex-col">
                <span style={{ ...COMMON_STYLES.categoryLabel, color: BLOOMBERG_PRUNE_COLORS.textTertiary }}>VALEUR RÉCUPÉRÉE PAR L'UTILISATEUR</span>
                <span className="text-3xl mt-1 font-bold" style={{ fontFamily: '"JetBrains Mono", monospace', color: '#EF4444' }}>
                  {formatCurrency(attentionData.received)} / AN (0%)
                </span>
              </div>
              <div className="w-full h-px" style={{ backgroundColor: 'rgba(239,68,68,0.2)' }} />
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <span style={{ ...COMMON_STYLES.categoryLabel, color: BLOOMBERG_PRUNE_COLORS.textTertiary }}>PUBLICITÉS VUES</span>
                  <div className="mt-1 text-lg" style={{ fontFamily: '"JetBrains Mono", monospace', color: BLOOMBERG_PRUNE_COLORS.textMain }}>{formatNumber(attentionData.ads)} / SEM</div>
                </div>
                <div>
                  <span style={{ ...COMMON_STYLES.categoryLabel, color: BLOOMBERG_PRUNE_COLORS.textTertiary }}>TEMPS CAPTÉ (PERDU)</span>
                  <div className="mt-1 text-lg" style={{ fontFamily: '"JetBrains Mono", monospace', color: BLOOMBERG_PRUNE_COLORS.textMain }}>{formatNumber(attentionData.time)} H / AN</div>
                </div>
                <div>
                  <span style={{ ...COMMON_STYLES.categoryLabel, color: BLOOMBERG_PRUNE_COLORS.textTertiary }}>CONTRÔLE DES DONNÉES</span>
                  <div className="mt-1 text-lg" style={{ fontFamily: '"JetBrains Mono", monospace', color: '#EF4444' }}>{attentionData.control}</div>
                </div>
                <div>
                  <span style={{ ...COMMON_STYLES.categoryLabel, color: BLOOMBERG_PRUNE_COLORS.textTertiary }}>AGENT FIDUCIAIRE</span>
                  <div className="mt-1 text-lg" style={{ fontFamily: '"JetBrains Mono", monospace', color: BLOOMBERG_PRUNE_COLORS.textMain }}>{attentionData.agent}</div>
                </div>
              </div>
            </div>
            
            <div className="p-4 mt-8 border border-red-500/20 bg-red-500/5">
              <span style={{ ...COMMON_STYLES.categoryLabel, color: '#EF4444' }}>CONSENTEMENT ÉCLAIRÉ</span>
              <p className="mt-2 text-sm" style={{ fontFamily: '"JetBrains Mono", monospace', color: BLOOMBERG_PRUNE_COLORS.textSecondary }}>
                {attentionData.consent}
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT: ÉCONOMIE DE L'INTENTION */}
        <div className="w-1/2 flex flex-col h-full border" style={{ borderColor: 'rgba(34,197,94,0.2)', backgroundColor: 'rgba(34,197,94,0.04)' }}>
          <div className="p-4 border-b flex items-center justify-between" style={{ borderColor: 'rgba(34,197,94,0.2)' }}>
            <span style={{ ...COMMON_STYLES.categoryLabel, color: '#22C55E' }}>ÉCONOMIE DE L'INTENTION (MYNε/ÆLYA)</span>
            <span style={{ fontSize: '16px' }}>🚀</span>
          </div>
          <div className="flex-1 p-8 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex flex-col">
                <span style={{ ...COMMON_STYLES.categoryLabel, color: BLOOMBERG_PRUNE_COLORS.textTertiary }}>VALEUR DES DONNÉES PRODUITES</span>
                <span className="text-2xl mt-1" style={{ fontFamily: '"JetBrains Mono", monospace', color: BLOOMBERG_PRUNE_COLORS.textMain }}>
                  {formatCurrency(intentionData.produced)} / AN
                </span>
              </div>
              <div className="flex flex-col">
                <span style={{ ...COMMON_STYLES.categoryLabel, color: BLOOMBERG_PRUNE_COLORS.textTertiary }}>REVENU RÉCUPÉRÉ (MYNε WALL)</span>
                <span className="text-3xl mt-1 font-bold" style={{ fontFamily: '"JetBrains Mono", monospace', color: '#22C55E' }}>
                  {formatCurrency(intentionData.received)} / AN (53%)
                </span>
              </div>
              <div className="w-full h-px" style={{ backgroundColor: 'rgba(34,197,94,0.2)' }} />
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <span style={{ ...COMMON_STYLES.categoryLabel, color: BLOOMBERG_PRUNE_COLORS.textTertiary }}>PUBLICITÉS VUES</span>
                  <div className="mt-1 text-lg" style={{ fontFamily: '"JetBrains Mono", monospace', color: '#22C55E' }}>{intentionData.ads}</div>
                </div>
                <div>
                  <span style={{ ...COMMON_STYLES.categoryLabel, color: BLOOMBERG_PRUNE_COLORS.textTertiary }}>TEMPS LIBÉRÉ</span>
                  <div className="mt-1 text-lg" style={{ fontFamily: '"JetBrains Mono", monospace', color: '#22C55E' }}>{formatNumber(intentionData.time)} H / AN</div>
                </div>
                <div>
                  <span style={{ ...COMMON_STYLES.categoryLabel, color: BLOOMBERG_PRUNE_COLORS.textTertiary }}>CONTRÔLE DES DONNÉES</span>
                  <div className="mt-1 text-lg" style={{ fontFamily: '"JetBrains Mono", monospace', color: '#22C55E' }}>{intentionData.control}</div>
                </div>
                <div>
                  <span style={{ ...COMMON_STYLES.categoryLabel, color: BLOOMBERG_PRUNE_COLORS.textTertiary }}>MÉCANIQUE DE REVENU</span>
                  <div className="mt-1 text-sm pt-1" style={{ fontFamily: '"JetBrains Mono", monospace', color: BLOOMBERG_PRUNE_COLORS.textMain }}>{intentionData.intentions}</div>
                </div>
              </div>
            </div>

            <div className="p-4 mt-8 border border-green-500/20 bg-green-500/5">
              <span style={{ ...COMMON_STYLES.categoryLabel, color: '#22C55E' }}>AGENT FIDUCIAIRE</span>
              <p className="mt-2 text-sm" style={{ fontFamily: '"JetBrains Mono", monospace', color: BLOOMBERG_PRUNE_COLORS.textSecondary }}>
                {intentionData.agent}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER SLIDER */}
      <div className="h-24 p-6 flex flex-col justify-center" style={COMMON_STYLES.card}>
        <div className="flex justify-between items-center mb-4">
          <span style={COMMON_STYLES.categoryLabel}>SIMULATEUR DE POPULATION</span>
          <span style={{ ...COMMON_STYLES.tableData, color: BLOOMBERG_PRUNE_COLORS.accentPositive }}>
             RÉCUPÉRÉ TOTAL: {formatCurrency(intentionData.received)} / AN
          </span>
        </div>
        <div className="relative w-full flex items-center">
          <input 
            type="range" 
            min="0" 
            max="2" 
            step="1"
            value={step}
            onChange={(e) => setStep(parseInt(e.target.value))}
            className="w-full h-1 bg-gray-800 rounded-lg appearance-none cursor-pointer"
            style={{ accentColor: BLOOMBERG_PRUNE_COLORS.textMain }}
          />
          <div className="absolute w-full flex justify-between px-1 pointer-events-none" style={{ top: '16px' }}>
            {MULTIPLIERS.map((m, idx) => (
              <span key={idx} style={{ 
                ...COMMON_STYLES.categoryLabel, 
                color: step === idx ? BLOOMBERG_PRUNE_COLORS.textMain : BLOOMBERG_PRUNE_COLORS.textTertiary 
              }}>
                {m.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
