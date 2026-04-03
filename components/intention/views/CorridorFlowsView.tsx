import React from 'react';
import { BLOOMBERG_PRUNE_COLORS, COMMON_STYLES } from '../shared/constants';
import { CORRIDOR_NODES, CORRIDOR_EDGES, CORRIDOR_FLOWS, CORRIDOR_COLORS } from '../shared/mock-data';

const NODES = CORRIDOR_NODES;
const COLORS = CORRIDOR_COLORS;
const EDGES = CORRIDOR_EDGES;
const FLOWS = CORRIDOR_FLOWS;

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
