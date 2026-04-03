"use client";

import React, { useState, useEffect } from 'react';
import { BLOOMBERG_PRUNE_COLORS, COMMON_STYLES } from '../shared/constants';
import { OBSERVATORY_SAMPLE } from '../shared/mock-data';

interface CountryData {
  id: string;
  pays: string;
  population: string;
  arpu: number;
  valeurCaptee: number;
  gapIntention: number;
  topCapteur: string;
}

export default function ObservatoryView() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<CountryData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/intention/observatory');
        const apiData = await res.json();
        const result = apiData.length > 0 ? apiData : OBSERVATORY_SAMPLE;
        setData(result.sort((a: CountryData, b: CountryData) => b.gapIntention - a.gapIntention));
      } catch {
        setData(OBSERVATORY_SAMPLE);
      }
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
          { label: 'VALEUR CAPTÉE CORRIDOR', value: `€${totalValeurCaptee}B`, color: BLOOMBERG_PRUNE_COLORS.accentPositive },
          { label: "GAP D'INTENTION", value: `€${totalGapIntention}B`, color: BLOOMBERG_PRUNE_COLORS.accentNegative },
          { label: 'PAYS ANALYSÉS', value: paysCount.toString(), color: BLOOMBERG_PRUNE_COLORS.textMain },
          { label: 'ARPU MOYEN', value: `€${avgArpu}`, color: BLOOMBERG_PRUNE_COLORS.textMain },
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
