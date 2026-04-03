"use client";

import React, { useState, useEffect } from 'react';
import { BLOOMBERG_PRUNE_COLORS, COMMON_STYLES } from '../shared/constants';

interface CountryData {
  id: string;
  pays: string;
  population: string;
  arpu: number;
  valeurCaptee: number; // in billions
  gapIntention: number; // in billions
  topCapteur: string;
}

export default function ObservatoryView() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<CountryData[]>([]);

  useEffect(() => {
    // Simulate fetch from /api/intention/observatory
    const fetchData = async () => {
      // Mock data
      const mockResult: CountryData[] = [
        { id: 'MA', pays: 'Maroc', population: '28M', arpu: 14.5, valeurCaptee: 4.8, gapIntention: 1.2, topCapteur: 'Meta' },
        { id: 'SN', pays: 'Sénégal', population: '12M', arpu: 8.2, valeurCaptee: 1.1, gapIntention: 0.4, topCapteur: 'TikTok' },
        { id: 'FR', pays: 'France', population: '54M', arpu: 42.0, valeurCaptee: 27.2, gapIntention: 3.5, topCapteur: 'Google' },
        { id: 'CI', pays: 'Côte d\'Ivoire', population: '15M', arpu: 9.1, valeurCaptee: 1.6, gapIntention: 0.6, topCapteur: 'Meta' },
        { id: 'NG', pays: 'Nigeria', population: '105M', arpu: 6.8, valeurCaptee: 8.5, gapIntention: 2.1, topCapteur: 'Google' },
      ];
      
      const sorted = mockResult.sort((a, b) => b.gapIntention - a.gapIntention);
      setData(sorted);
      setLoading(false);
    };

    const timer = setTimeout(fetchData, 800);
    return () => clearTimeout(timer);
  }, []);

  const totalValeurCaptee = data.reduce((acc, curr) => acc + curr.valeurCaptee, 0).toFixed(1);
  const totalGapIntention = data.reduce((acc, curr) => acc + curr.gapIntention, 0).toFixed(1);
  const paysCount = data.length;
  const avgArpu = paysCount > 0 ? (data.reduce((acc, curr) => acc + curr.arpu, 0) / paysCount).toFixed(1) : '0';

  return (
    <div className="flex flex-col space-y-6 h-full">
      <h2 style={COMMON_STYLES.sectionTitle}>Observatoire de la Valeur</h2>
      
      {/* 4 StatCards Bloomberg style */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'VALEUR CAPTÉE CORRIDOR', value: \`€\${totalValeurCaptee}B\`, color: BLOOMBERG_PRUNE_COLORS.accentPositive },
          { label: "GAP D'INTENTION", value: \`€\${totalGapIntention}B\`, color: BLOOMBERG_PRUNE_COLORS.accentNegative },
          { label: 'PAYS ANALYSÉS', value: paysCount.toString(), color: BLOOMBERG_PRUNE_COLORS.textMain },
          { label: 'ARPU MOYEN', value: \`€\${avgArpu}\`, color: BLOOMBERG_PRUNE_COLORS.textMain },
        ].map((stat, i) => (
          <div key={i} className="p-4 flex flex-col justify-between h-24" style={COMMON_STYLES.card}>
            <div style={COMMON_STYLES.categoryLabel}>{stat.label}</div>
            <div style={{ 
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: '24px',
              fontWeight: 600,
              color: stat.color 
            }}>
              {loading ? '--' : stat.value}
            </div>
          </div>
        ))}
      </div>

      {/* Main Table */}
      <div className="flex-1 overflow-auto" style={COMMON_STYLES.card}>
        <table className="w-full text-left" style={{ borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              {['Pays', 'Population connectée', 'ARPU Total', 'Valeur Captée', 'Gap Intention', 'Top Capteur'].map((h, i) => (
                <th key={i} className="p-4" style={{ ...COMMON_STYLES.categoryLabel, ...COMMON_STYLES.separator }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className="p-8 text-center" style={{ color: BLOOMBERG_PRUNE_COLORS.textSecondary }}>
                  Loading ...
                </td>
              </tr>
            ) : data.map((row) => (
              <tr key={row.id} className="hover:bg-white/5 cursor-pointer transition-colors" style={COMMON_STYLES.separator}>
                <td className="p-4" style={{ ...COMMON_STYLES.tableData, fontWeight: 500 }}>{row.pays}</td>
                <td className="p-4" style={{ ...COMMON_STYLES.tableData, color: BLOOMBERG_PRUNE_COLORS.textSecondary }}>{row.population}</td>
                <td className="p-4" style={COMMON_STYLES.pricePositive}>€{row.arpu.toFixed(2)}</td>
                <td className="p-4" style={COMMON_STYLES.pricePositive}>€{row.valeurCaptee.toFixed(1)}B</td>
                <td className="p-4" style={COMMON_STYLES.priceNegative}>€{row.gapIntention.toFixed(1)}B</td>
                <td className="p-4" style={{ ...COMMON_STYLES.tableData, color: BLOOMBERG_PRUNE_COLORS.textTertiary }}>{row.topCapteur}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
