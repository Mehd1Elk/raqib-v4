"use client";

import React, { useState } from 'react';
import { BLOOMBERG_PRUNE_COLORS, COMMON_STYLES } from '../shared/constants';

const INTERFACES = [
  { name: 'Smartphone', signal: 'Navigation/Frappe', latence: 'Secondes/Minutes', valInfo: 20, invasivite: 10, cout: '$500+', maturite: 'Commodité' },
  { name: 'Voix (Smart speaker)', signal: 'Audio/Verbal', latence: 'Secondes', valInfo: 30, invasivite: 15, cout: '$50+', maturite: 'Haute' },
  { name: 'Geste (Caméra)', signal: 'Mouvement', latence: '< 1s', valInfo: 40, invasivite: 20, cout: '$100+', maturite: 'Moyenne' },
  { name: 'Wearable (Montre)', signal: 'Vitals/Mouvement', latence: '< 1s', valInfo: 50, invasivite: 30, cout: '$200+', maturite: 'Haute' },
  { name: 'Bague ḤIRZ', signal: 'EMG/Thermal/Micro', latence: 'Millisecondes', valInfo: 85, invasivite: 5, cout: '< $150', maturite: 'Développement' },
  { name: 'BCI Non-Invasif (Casque)', signal: 'EEG', latence: 'Millisecondes', valInfo: 70, invasivite: 60, cout: '$1000+', maturite: 'Basse' },
  { name: 'BCI Invasif (Implant)', signal: 'Spikes corticaux', latence: 'Microsecondes', valInfo: 100, invasivite: 100, cout: '$10,000+', maturite: 'Recherche' }
];

const COMPETITORS = [
  { name: 'CTRL-Labs', founder: 'Thomas Reardon', techno: 'EMG Poignet', device: 'Bracelet', signal: 'Intention musculaire', funding: 'Acquis', status: 'Meta ($500M-1B)', link: 'Meta' },
  { name: 'NextMind', founder: 'Sid Kouider', techno: 'EEG Visuel', device: 'Module occipital', signal: 'Attention visuelle', funding: 'Acquis', status: 'Snapchat', link: 'Snap' },
  { name: 'Q.ai', founder: '-', techno: 'Predictive NLP', device: 'Software', signal: 'Intention textuelle', funding: 'Acquis', status: 'Apple', link: 'Apple' },
  { name: 'Neuralink', founder: 'Elon Musk', techno: 'Implant', device: 'N1 Chip', signal: 'Cortical', funding: '$600M+', status: 'Actif', link: 'Indépendant' },
  { name: 'Synchron', founder: 'Thomas Oxley', techno: 'Stentrode', device: 'Endovasculaire', signal: 'Moteur', funding: '$130M', status: 'Actif', link: 'Bezos/Gates' },
  { name: 'Kernel', founder: 'Bryan Johnson', techno: 'TDNIRS / EEG', device: 'Casque', signal: 'Hémodynamique', funding: '$100M+', status: 'Pivot', link: 'Indépendant' },
  { name: 'Emotiv', founder: 'Tan Le', techno: 'EEG', device: 'Casque', signal: 'États cognitifs', funding: 'Non-divulgué', status: 'Actif', link: 'Indépendant' },
  { name: 'Muse', founder: 'Ariel Garten', techno: 'EEG', device: 'Bandeau', signal: 'Méditation/Focus', funding: '$30M+', status: 'Actif', link: 'Indépendant' },
  { name: 'Aura', founder: '-', techno: 'Vitals', device: 'Bague / Watch', signal: 'Santé', funding: 'Acquis', status: 'Acquis', link: 'Apple' },
  { name: 'Oura', founder: 'Petteri Lahtela', techno: 'PPG / Temp', device: 'Bague', signal: 'Biométrie', funding: '$148M', status: 'Actif', link: 'Indépendant' }
];

export default function NeuroIntentionView() {
  const [activeTab, setActiveTab] = useState<'interfaces' | 'concurrents'>('interfaces');

  return (
    <div className="flex flex-col space-y-6 h-full">
      <div className="flex justify-between items-end">
        <h2 style={COMMON_STYLES.sectionTitle}>Neuro-Intention & ḤIRZ Interface</h2>
        <div className="flex space-x-4">
          <button 
            onClick={() => setActiveTab('interfaces')}
            className={`px-4 py-2 ${activeTab === 'interfaces' ? 'border-b-2 border-green-500 text-white' : 'text-gray-500'}`}
            style={COMMON_STYLES.categoryLabel}
          >
            INTERFACES D'INTENTION
          </button>
          <button 
            onClick={() => setActiveTab('concurrents')}
            className={`px-4 py-2 ${activeTab === 'concurrents' ? 'border-b-2 border-green-500 text-white' : 'text-gray-500'}`}
            style={COMMON_STYLES.categoryLabel}
          >
            CONCURRENTS NEURO
          </button>
        </div>
      </div>

      {activeTab === 'interfaces' && (
        <>
          <div className="flex-1 overflow-auto" style={COMMON_STYLES.card}>
            <table className="w-full text-left" style={{ borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  {['Interface', 'Signal capté', 'Latence', 'Valeur informationnelle', 'Invasivité', 'Coût', 'Maturité'].map((h, i) => (
                    <th key={i} className="p-4" style={{ ...COMMON_STYLES.categoryLabel, ...COMMON_STYLES.separator }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {INTERFACES.map((row) => {
                  const isHirz = row.name === 'Bague ḤIRZ';
                  return (
                    <tr key={row.name} style={{ ...COMMON_STYLES.separator, backgroundColor: isHirz ? 'rgba(34,197,94,0.04)' : 'transparent' }}>
                      <td className="p-4" style={{ ...COMMON_STYLES.tableData, fontWeight: isHirz ? 700 : 400, color: isHirz ? BLOOMBERG_PRUNE_COLORS.accentPositive : BLOOMBERG_PRUNE_COLORS.textMain }}>{row.name}</td>
                      <td className="p-4" style={{ ...COMMON_STYLES.tableData, color: BLOOMBERG_PRUNE_COLORS.textSecondary }}>{row.signal}</td>
                      <td className="p-4" style={{ ...COMMON_STYLES.tableData, color: BLOOMBERG_PRUNE_COLORS.textSecondary }}>{row.latence}</td>
                      <td className="p-4 w-32">
                        <div className="w-full bg-gray-800 h-2">
                          <div className="bg-green-500 h-full" style={{ width: `${row.valInfo}%` }}></div>
                        </div>
                      </td>
                      <td className="p-4 w-32">
                        <div className="w-full bg-gray-800 h-2">
                          <div className="bg-red-500 h-full" style={{ width: `${row.invasivite}%` }}></div>
                        </div>
                      </td>
                      <td className="p-4" style={COMMON_STYLES.tableData}>{row.cout}</td>
                      <td className="p-4" style={{ ...COMMON_STYLES.tableData, color: BLOOMBERG_PRUNE_COLORS.textTertiary }}>{row.maturite}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="h-64 p-6 relative" style={COMMON_STYLES.card}>
            <div style={{ ...COMMON_STYLES.categoryLabel, marginBottom: '16px' }}>MATRICE INVASIVITÉ / VALEUR INFO</div>
            {/* Diagram */}
            <div className="absolute inset-x-6 top-16 bottom-6 border-l border-b border-gray-700">
              <span className="absolute -bottom-5 left-0 text-xs text-gray-500">Zéro Invasivité</span>
              <span className="absolute -bottom-5 right-0 text-xs text-gray-500">Chirurgie</span>
              <span className="absolute -left-5 bottom-0 -rotate-90 origin-left text-xs text-gray-500">Faible Valeur</span>
              <span className="absolute -left-5 top-0 -rotate-90 origin-left text-xs text-gray-500">Max Valeur</span>

              {/* Data plots */}
              {INTERFACES.map((item) => (
                <div 
                  key={item.name}
                  className={`absolute w-3 h-3 rounded-full ${item.name === 'Bague ḤIRZ' ? 'bg-green-500 shadow-[0_0_10px_#22C55E]' : 'bg-gray-500'}`}
                  style={{ 
                    left: `${item.invasivite}%`, 
                    bottom: `${item.valInfo}%`,
                    transform: 'translate(-50%, 50%)'
                  }}
                  title={item.name}
                >
                  <span className="absolute left-4 top-0 whitespace-nowrap text-xs" style={{ 
                    fontFamily: '"JetBrains Mono", monospace',
                    color: item.name === 'Bague ḤIRZ' ? '#22C55E' : '#888'
                  }}>{item.name}</span>
                </div>
              ))}

              {/* Optimal Zone Highlight */}
              <div className="absolute left-0 top-0 w-1/4 h-1/4 bg-green-500/10 border border-green-500/20" />
            </div>
          </div>
        </>
      )}

      {activeTab === 'concurrents' && (
        <>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {COMPETITORS.map((comp) => (
              <div key={comp.name} className="p-4" style={COMMON_STYLES.card}>
                <div className="flex justify-between items-start mb-2">
                  <div style={{ fontFamily: '"Playfair Display", serif', fontSize: '16px', color: BLOOMBERG_PRUNE_COLORS.textMain }}>{comp.name}</div>
                  {comp.funding === 'Acquis' && (
                    <div className="px-1.5 py-0.5 bg-blue-500/20 text-blue-400 border border-blue-500/30" style={{ fontSize: '9px', fontFamily: '"JetBrains Mono", monospace' }}>ACQUIS</div>
                  )}
                </div>
                <div style={{ ...COMMON_STYLES.categoryLabel, color: BLOOMBERG_PRUNE_COLORS.textMain, marginBottom: '8px' }}>{comp.device}</div>
                <div className="space-y-1" style={{ fontSize: '11px', fontFamily: '"JetBrains Mono", monospace', color: BLOOMBERG_PRUNE_COLORS.textSecondary }}>
                  <div className="flex justify-between"><span>Techno:</span> <span>{comp.techno}</span></div>
                  <div className="flex justify-between"><span>Signal:</span> <span>{comp.signal}</span></div>
                  <div className="flex justify-between"><span>Statut:</span> <span className="text-white">{comp.status}</span></div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="p-4" style={{ ...COMMON_STYLES.card, borderLeft: '4px solid #3B82F6' }}>
            <div style={COMMON_STYLES.categoryLabel}>M&A ACTIVITY</div>
            <p style={{ ...COMMON_STYLES.tableData, marginTop: '8px', color: BLOOMBERG_PRUNE_COLORS.textSecondary }}>
              CTRL-Labs acquis par Meta $500M-1B.<br/>
              NextMind acquis par Snap.<br/>
              Q.ai acquis par Apple $2B.<br/>
              <span className="text-white font-semibold">Le marché de la lecture d'intention pré-verbale valorisé à $3.5B+ en acquisitions seules.</span>
            </p>
          </div>
        </>
      )}

      {/* Vision text */}
      <div className="text-center mt-4">
        <p style={{ fontFamily: '"Playfair Display", serif', fontStyle: 'italic', fontSize: '18px', color: BLOOMBERG_PRUNE_COLORS.textSecondary }}>
          "ḤIRZ (حرز) — la bague comme interface souveraine d'intention.
          De l'intention brute pré-consciente jusqu'au contrat cryptographique,
          zéro friction, max souveraineté."
        </p>
      </div>
    </div>
  );
}
