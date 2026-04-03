import React, { useState } from 'react';
import { BLOOMBERG_PRUNE_COLORS, COMMON_STYLES } from '../shared/constants';

interface LedgerEntry {
  id: string;
  timestamp: string;
  buyer: string;
  category: string;
  tLevel: string;
  volume: string;
  price: number;
  hash: string;
  status: 'CERTIFIED' | 'PENDING' | 'DISPUTED';
}

const SIMULATED_LEDGER: LedgerEntry[] = [
  { id: '1', timestamp: '2026-04-03 04:21:12', buyer: 'B-0x3F9A', category: 'FINANCE', tLevel: 'T4', volume: '12 MB', price: 42.50, hash: '0x7a2f...e4b1', status: 'CERTIFIED' },
  { id: '2', timestamp: '2026-04-03 04:20:05', buyer: 'B-0x8B1C', category: 'SANTÉ', tLevel: 'T5', volume: '8 MB', price: 115.00, hash: '0x3b1a...f9c2', status: 'PENDING' },
  { id: '3', timestamp: '2026-04-03 04:18:44', buyer: 'B-0x2A4E', category: 'MOBILITÉ', tLevel: 'T3', volume: '45 MB', price: 18.20, hash: '0x9d4e...a1b8', status: 'CERTIFIED' },
  { id: '4', timestamp: '2026-04-03 04:15:30', buyer: 'B-0x9F2D', category: 'E-COMMERCE', tLevel: 'T2', volume: '5 MB', price: 8.40, hash: '0x1c8f...d3e7', status: 'DISPUTED' },
  { id: '5', timestamp: '2026-04-03 04:12:15', buyer: 'B-0x5E7A', category: 'FINANCE', tLevel: 'T4', volume: '22 MB', price: 65.00, hash: '0x8e2a...c5f1', status: 'CERTIFIED' },
  { id: '6', timestamp: '2026-04-03 04:10:02', buyer: 'B-0x1D8C', category: 'SANTÉ', tLevel: 'T5', volume: '15 MB', price: 180.00, hash: '0x4f1b...e8a3', status: 'CERTIFIED' },
  { id: '7', timestamp: '2026-04-03 04:05:44', buyer: 'B-0x7C3B', category: 'MOBILITÉ', tLevel: 'T3', volume: '30 MB', price: 12.50, hash: '0x2a9d...b6c4', status: 'PENDING' },
  { id: '8', timestamp: '2026-04-03 04:01:20', buyer: 'B-0x4A9F', category: 'E-COMMERCE', tLevel: 'T2', volume: '8 MB', price: 15.00, hash: '0x5d7c...a2e9', status: 'CERTIFIED' },
];

export default function TransactionLedgerView() {
  const [filterCategory, setFilterCategory] = useState<string>('ALL');
  const [filterStatus, setFilterStatus] = useState<string>('ALL');

  const filteredLedger = SIMULATED_LEDGER.filter(entry => {
    if (filterCategory !== 'ALL' && entry.category !== filterCategory) return false;
    if (filterStatus !== 'ALL' && entry.status !== filterStatus) return false;
    return true;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'CERTIFIED': return BLOOMBERG_PRUNE_COLORS.accentPositive;
      case 'PENDING': return '#EAB308'; // yellow-500
      case 'DISPUTED': return BLOOMBERG_PRUNE_COLORS.accentNegative;
      default: return BLOOMBERG_PRUNE_COLORS.textSecondary;
    }
  };

  return (
    <div className="flex flex-col h-full space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 style={COMMON_STYLES.sectionTitle}>BURHAN Transaction Ledger</h2>
          <p style={{ ...COMMON_STYLES.categoryLabel, color: BLOOMBERG_PRUNE_COLORS.textSecondary, marginTop: '4px' }}>
            IMMUTABLE BLOCKCHAIN RECORD
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'TX 24H', value: '14,285' },
          { label: 'VOLUME 24H', value: '€842,500' },
          { label: 'HASH RATE', value: '142 TH/s' },
          { label: 'AVG CERT TIME', value: '1.2s' },
        ].map((kpi, idx) => (
          <div key={idx} className="p-4" style={COMMON_STYLES.card}>
            <div style={COMMON_STYLES.categoryLabel}>{kpi.label}</div>
            <div className="mt-2 text-xl" style={{ fontFamily: '"JetBrains Mono", monospace' }}>
              {kpi.value}
            </div>
          </div>
        ))}
      </div>

      {/* Filters & Table */}
      <div className="flex-1 flex flex-col" style={COMMON_STYLES.card}>
        <div className="p-4 border-b flex space-x-4 items-center" style={{ borderColor: BLOOMBERG_PRUNE_COLORS.border }}>
          <div style={COMMON_STYLES.categoryLabel}>FILTERS:</div>
          <select 
            value={filterCategory} 
            onChange={(e) => setFilterCategory(e.target.value)}
            className="bg-transparent outline-none cursor-pointer"
            style={{ ...COMMON_STYLES.tableData, color: BLOOMBERG_PRUNE_COLORS.textSecondary }}
          >
            <option value="ALL">ALL CATEGORIES</option>
            <option value="FINANCE">FINANCE</option>
            <option value="SANTÉ">SANTÉ</option>
            <option value="MOBILITÉ">MOBILITÉ</option>
            <option value="E-COMMERCE">E-COMMERCE</option>
          </select>
          <select 
            value={filterStatus} 
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-transparent outline-none cursor-pointer"
            style={{ ...COMMON_STYLES.tableData, color: BLOOMBERG_PRUNE_COLORS.textSecondary }}
          >
            <option value="ALL">ALL STATUSES</option>
            <option value="CERTIFIED">CERTIFIED</option>
            <option value="PENDING">PENDING</option>
            <option value="DISPUTED">DISPUTED</option>
          </select>
        </div>
        
        <div className="flex-1 overflow-auto">
          <table className="w-full text-left" style={{ borderCollapse: 'collapse' }}>
            <thead className="sticky top-0" style={{ backgroundColor: BLOOMBERG_PRUNE_COLORS.cardBg }}>
              <tr style={{ ...COMMON_STYLES.categoryLabel, borderBottom: `1px solid ${BLOOMBERG_PRUNE_COLORS.border}` }}>
                <th className="p-4">TIMESTAMP</th>
                <th className="p-4">BUYER</th>
                <th className="p-4">CATEGORY</th>
                <th className="p-4">T-LEVEL</th>
                <th className="p-4">VOLUME</th>
                <th className="p-4">PRICE</th>
                <th className="p-4">BURHAN HASH</th>
                <th className="p-4">STATUS</th>
              </tr>
            </thead>
            <tbody style={{ ...COMMON_STYLES.tableData }}>
              {filteredLedger.map((entry) => (
                <tr key={entry.id} className="hover:bg-white/5 transition-colors" style={{ borderBottom: `1px solid ${BLOOMBERG_PRUNE_COLORS.border}` }}>
                  <td className="p-4">{entry.timestamp}</td>
                  <td className="p-4">{entry.buyer}</td>
                  <td className="p-4">{entry.category}</td>
                  <td className="p-4">{entry.tLevel}</td>
                  <td className="p-4" style={{ color: BLOOMBERG_PRUNE_COLORS.textSecondary }}>{entry.volume}</td>
                  <td className="p-4 flex items-center">
                    <span style={COMMON_STYLES.pricePositive}>€{entry.price.toFixed(2)}</span>
                  </td>
                  <td className="p-4" style={{ color: BLOOMBERG_PRUNE_COLORS.textTertiary }}>{entry.hash}</td>
                  <td className="p-4" style={{ color: getStatusColor(entry.status), fontWeight: 600 }}>{entry.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredLedger.length === 0 && (
            <div className="p-8 text-center" style={{ ...COMMON_STYLES.tableData, color: BLOOMBERG_PRUNE_COLORS.textSecondary }}>
              NO TRANSACTIONS MATCHING CRITERIA
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
