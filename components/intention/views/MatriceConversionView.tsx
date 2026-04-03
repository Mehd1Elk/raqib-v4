"use client";

import React from 'react';
import { BLOOMBERG_PRUNE_COLORS, COMMON_STYLES } from '../shared/constants';

const MATRICE = [
  { entite: 'NOOS', input: 'Patterns smartphone, sommeil, réponses questionnaires', transform: 'Batterie 46 items + digital phenotyping', output: 'Intention de soin qualifiée', conv: '60-70%', val: 65 },
  { entite: 'BURHAN', input: 'Actes d\'observance thérapeutique', transform: 'Hash SHA-256 Polygon zkEVM', output: 'Preuve d\'intention de guérir', conv: '80-90%', val: 85 },
  { entite: 'MYNε', input: 'Navigation, achats, localisation passive', transform: 'ÆLYA analyse + consentement granulaire', output: 'Intention commerciale déclarée', conv: '2-5%', val: 3.5 },
  { entite: 'ÆLYA', input: 'CGU, requêtes data, demandes d\'accès', transform: 'Policy Engine REJECT + counter-offer', output: 'Intention négociée et protégée', conv: '33% (67% rejetés)', val: 33 },
  { entite: 'YrKnown', input: 'Attention pédagogique (cours, formation)', transform: 'LoRA fine-tuning + KI', output: 'Intention de transmission du savoir', conv: '40-50%', val: 45 },
  { entite: 'RAQIB', input: 'Signaux marché, OSINT, données concurrentielles', transform: '1100 couches de traitement', output: 'Intention d\'investissement qualifiée', conv: '10-15%', val: 12.5 },
  { entite: 'CG', input: 'Attention des élites (Majlis, networking)', transform: 'Qualification pipeline', output: 'Intention de co-investissement', conv: '20-30%', val: 25 },
  { entite: 'EIGEN', input: 'Signaux pré-verbaux (ḤIRZ)', transform: 'Décodage neuro EMG/EEG', output: 'Intention pré-consciente', conv: 'Horizon 2028', val: 0 }
];

const getColorForVal = (val: number) => {
  if (val === 0) return '#4B5563'; // Horizon 2028
  if (val > 50) return '#166534'; // Vert foncé
  if (val >= 20) return '#22C55E'; // Vert clair
  if (val >= 5) return '#EAB308'; // Jaune
  return '#F97316'; // Orange
};

export default function MatriceConversionView() {
  return (
    <div className="flex flex-col space-y-6 h-full">
      <h2 style={COMMON_STYLES.sectionTitle}>Matrice Attention → Intention</h2>

      <div className="flex-1 overflow-auto" style={COMMON_STYLES.card}>
        <table className="w-full text-left" style={{ borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              {['Entité', 'Input (Attention captée)', 'Transformation', 'Output (Intention produite)', 'Taux conversion'].map((h, i) => (
                <th key={i} className="p-4" style={{ ...COMMON_STYLES.categoryLabel, ...COMMON_STYLES.separator }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {MATRICE.map((row) => (
              <tr key={row.entite} className="hover:bg-white/5 cursor-pointer transition-colors" style={COMMON_STYLES.separator}>
                <td className="p-4" style={{ ...COMMON_STYLES.tableData, fontWeight: 700, color: BLOOMBERG_PRUNE_COLORS.textMain }}>{row.entite}</td>
                <td className="p-4" style={{ ...COMMON_STYLES.tableData, color: BLOOMBERG_PRUNE_COLORS.textSecondary }}>{row.input}</td>
                <td className="p-4" style={{ ...COMMON_STYLES.tableData, color: BLOOMBERG_PRUNE_COLORS.textTertiary }}>{row.transform}</td>
                <td className="p-4" style={{ ...COMMON_STYLES.tableData, color: BLOOMBERG_PRUNE_COLORS.textMain }}>{row.output}</td>
                <td className="p-4">
                  <div className="flex flex-col space-y-1">
                    <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '11px', color: row.val === 0 ? BLOOMBERG_PRUNE_COLORS.textTertiary : BLOOMBERG_PRUNE_COLORS.textMain }}>{row.conv}</span>
                    {row.val > 0 && (
                      <div className="w-full bg-gray-800 h-1.5">
                        <div className="h-full" style={{ width: `${row.val}%`, backgroundColor: getColorForVal(row.val) }}></div>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-6" style={{ background: 'rgba(34,197,94,0.04)', border: `1px solid rgba(34,197,94,0.2)`, borderRadius: 0 }}>
        <p style={{ fontFamily: '"Playfair Display", serif', fontSize: '18px', color: BLOOMBERG_PRUNE_COLORS.textMain, margin: 0, lineHeight: 1.5 }}>
          "Le séquençage de déploiement optimal suit le taux de conversion : <span className="text-green-500 font-semibold">BURHAN (90%)</span> d'abord, puis <span className="text-green-500 font-semibold">NOOS (70%)</span>, puis <span className="text-green-400 font-semibold">CG (25%)</span>, puis <span className="text-orange-500 font-semibold">MYNε (5%)</span>. On ne lance pas le marketplace avant que les briques à haut taux de conversion aient créé la base captive."
        </p>
      </div>
    </div>
  );
}
