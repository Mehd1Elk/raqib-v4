import React from 'react';
import { BLOOMBERG_PRUNE_COLORS, COMMON_STYLES } from '../shared/constants';

interface Node {
  id: string;
  x: number;
  y: number;
  label: string;
}

interface Edge {
  source: string;
  target: string;
  volume: number;
  color: string;
  category: string;
}

interface Flow {
  id: string;
  route: string;
  category: string;
  volumeLabel: string;
  valeur: number;
  tLevel: string;
  reglementation: string;
}

const NODES: Node[] = [
  { id: 'FR', x: 200, y: 100, label: 'FRANCE' },
  { id: 'DE', x: 300, y: 80, label: 'GERMANY' },
  { id: 'ES', x: 100, y: 150, label: 'SPAIN' },
  { id: 'MA', x: 150, y: 250, label: 'MOROCCO' },
  { id: 'SN', x: 100, y: 350, label: 'SENEGAL' },
  { id: 'CI', x: 200, y: 380, label: 'COTE D\'IVOIRE' },
  { id: 'GH', x: 280, y: 360, label: 'GHANA' },
  { id: 'NG', x: 350, y: 320, label: 'NIGERIA' },
  { id: 'KE', x: 500, y: 300, label: 'KENYA' },
  { id: 'ZA', x: 300, y: 500, label: 'SOUTH AFRICA' },
];

const COLORS = {
  SANTÉ: '#3B82F6',   // noos bleu
  FINANCE: '#EAB308', // burhan or
  MOBILE: '#06B6D4',  // cyan
};

const EDGES: Edge[] = [
  { source: 'FR', target: 'MA', volume: 8, color: COLORS.FINANCE, category: 'FINANCE' },
  { source: 'ES', target: 'MA', volume: 4, color: COLORS.MOBILE, category: 'MOBILE' },
  { source: 'FR', target: 'SN', volume: 5, color: COLORS.SANTÉ, category: 'SANTÉ' },
  { source: 'MA', target: 'CI', volume: 3, color: COLORS.FINANCE, category: 'FINANCE' },
  { source: 'DE', target: 'NG', volume: 6, color: COLORS.MOBILE, category: 'MOBILE' },
  { source: 'FR', target: 'CI', volume: 4, color: COLORS.FINANCE, category: 'FINANCE' },
  { source: 'NG', target: 'KE', volume: 5, color: COLORS.FINANCE, category: 'FINANCE' },
  { source: 'ZA', target: 'NG', volume: 7, color: COLORS.SANTÉ, category: 'SANTÉ' },
];

const FLOWS: Flow[] = [
  { id: '1', route: 'FR → MA', category: 'FINANCE', volumeLabel: '4.2 PB/mo', valeur: 1250000, tLevel: 'T4', reglementation: 'RGPD / CNDP' },
  { id: '2', route: 'DE → NG', category: 'MOBILE', volumeLabel: '3.8 PB/mo', valeur: 980000, tLevel: 'T3', reglementation: 'NDPR / RGPD' },
  { id: '3', route: 'ZA → NG', category: 'SANTÉ', volumeLabel: '3.1 PB/mo', valeur: 850000, tLevel: 'T5', reglementation: 'POPIA / NDPR' },
  { id: '4', route: 'FR → SN', category: 'SANTÉ', volumeLabel: '2.5 PB/mo', valeur: 720000, tLevel: 'T5', reglementation: 'RGPD / CDP' },
  { id: '5', route: 'ES → MA', category: 'MOBILE', volumeLabel: '2.1 PB/mo', valeur: 610000, tLevel: 'T2', reglementation: 'RGPD / CNDP' },
  { id: '6', route: 'NG → KE', category: 'FINANCE', volumeLabel: '1.9 PB/mo', valeur: 580000, tLevel: 'T4', reglementation: 'NDPR / DPA' },
  { id: '7', route: 'FR → CI', category: 'FINANCE', volumeLabel: '1.5 PB/mo', valeur: 450000, tLevel: 'T4', reglementation: 'RGPD / ARTCI' },
  { id: '8', route: 'MA → CI', category: 'FINANCE', volumeLabel: '1.2 PB/mo', valeur: 320000, tLevel: 'T4', reglementation: 'CNDP / ARTCI' },
];

export default function CorridorFlowsView() {
  return (
    <div className="flex flex-col h-full space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 style={COMMON_STYLES.sectionTitle}>Corridor Data Flows</h2>
          <p style={{ ...COMMON_STYLES.categoryLabel, color: BLOOMBERG_PRUNE_COLORS.textSecondary, marginTop: '4px' }}>
            CROSS-BORDER DATA VALUATION & TRANSIT
          </p>
        </div>
      </div>

      {/* SVG GRAPH */}
      <div className="h-64 flex-shrink-0 relative overflow-hidden" style={COMMON_STYLES.card}>
        {/* Grid Background */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `linear-gradient(${BLOOMBERG_PRUNE_COLORS.border} 1px, transparent 1px), linear-gradient(90deg, ${BLOOMBERG_PRUNE_COLORS.border} 1px, transparent 1px)`,
          backgroundSize: '20px 20px'
        }} />
        
        <svg width="100%" height="100%" viewBox="0 0 600 600" preserveAspectRatio="xMidYMid meet" className="relative z-10 w-full h-full">
          {/* Edges */}
          {EDGES.map((edge, idx) => {
            const sourceInfo = NODES.find(n => n.id === edge.source);
            const targetInfo = NODES.find(n => n.id === edge.target);
            if (!sourceInfo || !targetInfo) return null;
            
            return (
              <g key={`edge-${idx}`}>
                <path 
                  d={`M ${sourceInfo.x} ${sourceInfo.y} Q ${(sourceInfo.x + targetInfo.x)/2} ${(sourceInfo.y + targetInfo.y)/2 - 50} ${targetInfo.x} ${targetInfo.y}`}
                  fill="none"
                  stroke={edge.color}
                  strokeWidth={edge.volume}
                  strokeOpacity="0.6"
                  className="animate-pulse"
                />
              </g>
            );
          })}
          
          {/* Nodes */}
          {NODES.map(node => (
            <g key={node.id} transform={`translate(${node.x}, ${node.y})`}>
              <circle r="6" fill={BLOOMBERG_PRUNE_COLORS.textMain} />
              <circle r="12" fill="none" stroke={BLOOMBERG_PRUNE_COLORS.textSecondary} strokeWidth="1" />
              <text 
                y="-18" 
                textAnchor="middle" 
                style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '10px', fill: BLOOMBERG_PRUNE_COLORS.textSecondary }}
              >
                {node.label}
              </text>
            </g>
          ))}
        </svg>

        {/* Legend */}
        <div className="absolute bottom-4 right-4 flex space-x-6 bg-black/50 p-2 border border-white/5">
          {Object.entries(COLORS).map(([cat, color]) => (
            <div key={cat} className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
              <span style={{ ...COMMON_STYLES.categoryLabel, color: BLOOMBERG_PRUNE_COLORS.textMain }}>{cat}</span>
            </div>
          ))}
        </div>
      </div>

      {/* TABLE */}
      <div className="flex-1 flex flex-col min-h-0" style={COMMON_STYLES.card}>
        <div className="p-4 border-b" style={{ borderColor: BLOOMBERG_PRUNE_COLORS.border }}>
          <span style={COMMON_STYLES.categoryLabel}>TOP TRANSIT FLOWS (20)</span>
        </div>
        <div className="flex-1 overflow-auto">
          <table className="w-full text-left" style={{ borderCollapse: 'collapse' }}>
            <thead className="sticky top-0" style={{ backgroundColor: BLOOMBERG_PRUNE_COLORS.cardBg }}>
              <tr style={{ ...COMMON_STYLES.categoryLabel, borderBottom: `1px solid ${BLOOMBERG_PRUNE_COLORS.border}` }}>
                <th className="p-4">ROUTE</th>
                <th className="p-4">CATEGORY</th>
                <th className="p-4">VOLUME / MO</th>
                <th className="p-4">VALUE EST. (€)</th>
                <th className="p-4">T-LEVEL</th>
                <th className="p-4">REGULATION</th>
              </tr>
            </thead>
            <tbody style={{ ...COMMON_STYLES.tableData }}>
              {FLOWS.map((flow) => (
                <tr key={flow.id} className="hover:bg-white/5 transition-colors" style={{ borderBottom: `1px solid ${BLOOMBERG_PRUNE_COLORS.border}` }}>
                  <td className="p-4 font-bold">{flow.route}</td>
                  <td className="p-4">
                    <span style={{ color: COLORS[flow.category as keyof typeof COLORS] || BLOOMBERG_PRUNE_COLORS.textMain }}>
                      {flow.category}
                    </span>
                  </td>
                  <td className="p-4" style={{ color: BLOOMBERG_PRUNE_COLORS.textSecondary }}>{flow.volumeLabel}</td>
                  <td className="p-4" style={COMMON_STYLES.pricePositive}>
                    €{flow.valeur.toLocaleString('fr-FR')}
                  </td>
                  <td className="p-4" style={{ color: BLOOMBERG_PRUNE_COLORS.textTertiary }}>{flow.tLevel}</td>
                  <td className="p-4" style={{ color: BLOOMBERG_PRUNE_COLORS.textSecondary }}>{flow.reglementation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
