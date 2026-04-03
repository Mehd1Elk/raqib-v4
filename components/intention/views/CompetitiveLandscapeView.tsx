import React from 'react';
import { BLOOMBERG_PRUNE_COLORS, COMMON_STYLES } from '../shared/constants';

interface Competitor {
  id: string;
  name: string;
  model: { value: string; isAdvantage: boolean };
  privacy: { value: string; isAdvantage: boolean };
  blockchain: { value: string; isAdvantage: boolean };
  agent: { value: string; isAdvantage: boolean };
  africa: { value: string; isAdvantage: boolean };
  funding: string;
  isMyne?: boolean;
}

const COMPETITORS: Competitor[] = [
  { id: '1', name: 'Ocean Protocol', model: { value: 'B2B Data Exchange', isAdvantage: false }, privacy: { value: 'Data Minimization', isAdvantage: false }, blockchain: { value: 'Ethereum / Public', isAdvantage: false }, agent: { value: 'None', isAdvantage: false }, africa: { value: 'Low Focus', isAdvantage: false }, funding: '$28M' },
  { id: '2', name: 'Dawex', model: { value: 'Corporate Data Hub', isAdvantage: false }, privacy: { value: 'Traditional NDA', isAdvantage: false }, blockchain: { value: 'None (Centralized)', isAdvantage: false }, agent: { value: 'None', isAdvantage: false }, africa: { value: 'Low Focus', isAdvantage: false }, funding: '€5M' },
  { id: '3', name: 'Brave (BAT)', model: { value: 'Ad-Tech Disruption', isAdvantage: false }, privacy: { value: 'Zero-Knowledge Ads', isAdvantage: true }, blockchain: { value: 'Ethereum / Public', isAdvantage: false }, agent: { value: 'Basic Ad-blocker', isAdvantage: false }, africa: { value: 'Low Focus', isAdvantage: false }, funding: '$35M' },
  { id: '4', name: 'Solid (Inrupt)', model: { value: 'Personal Data Pods', isAdvantage: false }, privacy: { value: 'Self-hosted Data', isAdvantage: true }, blockchain: { value: 'None', isAdvantage: false }, agent: { value: 'None', isAdvantage: false }, africa: { value: 'Low Focus', isAdvantage: false }, funding: '$30M' },
  { id: '5', name: 'Streamr', model: { value: 'Real-time Data Union', isAdvantage: false }, privacy: { value: 'Basic Encryption', isAdvantage: false }, blockchain: { value: 'Polygon / Public', isAdvantage: false }, agent: { value: 'None', isAdvantage: false }, africa: { value: 'Low Focus', isAdvantage: false }, funding: '$30M' },
  { 
    id: 'myne', 
    name: 'MYNε / ÆLYA', 
    model: { value: 'Intention Economy', isAdvantage: true }, 
    privacy: { value: 'Differential Privacy (NOOS)', isAdvantage: true }, 
    blockchain: { value: 'BURHAN (Hybrid Audit)', isAdvantage: true }, 
    agent: { value: 'Advanced Fiduciary (ÆLYA)', isAdvantage: true }, 
    africa: { value: 'Strategic Priority (MA, CH, SN...)', isAdvantage: true }, 
    funding: 'Bootstrap + Strategic',
    isMyne: true
  },
];

// Polygon points calculation for Radar Chart
const numAxes = 7;
const axes = ['Privacy', 'Agent', 'Blockchain', 'Africa', 'UX', 'Compliance', 'Revenue Share'];
const radius = 100;
const centerX = 150;
const centerY = 150;

const getPoint = (value: number, index: number, total: number, max: number = 100) => {
  const angle = (Math.PI * 2 * index) / total - Math.PI / 2;
  const distance = (value / max) * radius;
  return {
    x: centerX + distance * Math.cos(angle),
    y: centerY + distance * Math.sin(angle),
  };
};

const DUMMY_RADAR_DATA = [
  { name: 'MYNε', color: '#22C55E', values: [95, 98, 90, 85, 90, 100, 100] },
  { name: 'Ocean', color: '#3B82F6', values: [60, 20, 85, 30, 40, 70, 50] },
  { name: 'Dawex', color: '#8B5CF6', values: [50, 10, 10, 20, 60, 90, 0] },
  { name: 'Brave', color: '#EF4444', values: [85, 40, 70, 20, 80, 80, 70] },
];

export default function CompetitiveLandscapeView() {
  const renderCell = (data: { value: string; isAdvantage: boolean }, isMyne: boolean) => {
    let color = BLOOMBERG_PRUNE_COLORS.textMain;
    if (isMyne) {
      color = '#22C55E'; // green
    } else {
      color = data.isAdvantage ? '#22C55E' : '#EF4444';
    }
    return (
      <span style={{ color }}>
        {data.value}
      </span>
    );
  };

  return (
    <div className="flex flex-col h-full space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 style={COMMON_STYLES.sectionTitle}>Competitive Landscape</h2>
          <p style={{ ...COMMON_STYLES.categoryLabel, color: BLOOMBERG_PRUNE_COLORS.textSecondary, marginTop: '4px' }}>
            POSITIONNEMENT STRATÉGIQUE & DIFFERENTIATION
          </p>
        </div>
      </div>

      {/* TABLE */}
      <div className="flex flex-col relative" style={{ ...COMMON_STYLES.card, maxHeight: '400px' }}>
        <div className="flex-1 overflow-auto">
          <table className="w-full text-left" style={{ borderCollapse: 'collapse' }}>
            <thead className="sticky top-0 z-10" style={{ backgroundColor: BLOOMBERG_PRUNE_COLORS.cardBg }}>
              <tr style={{ ...COMMON_STYLES.categoryLabel, borderBottom: `1px solid ${BLOOMBERG_PRUNE_COLORS.border}` }}>
                <th className="p-4">ACTEUR</th>
                <th className="p-4">MODÈLE</th>
                <th className="p-4">PRIVACY</th>
                <th className="p-4">BLOCKCHAIN</th>
                <th className="p-4">AGENT FIDUCIAIRE</th>
                <th className="p-4">CORRIDOR AFRIQUE</th>
                <th className="p-4">FUNDING</th>
              </tr>
            </thead>
            <tbody style={{ ...COMMON_STYLES.tableData }}>
              {COMPETITORS.filter(c => !c.isMyne).map((comp) => (
                <tr key={comp.id} className="hover:bg-white/5 transition-colors" style={{ borderBottom: `1px solid ${BLOOMBERG_PRUNE_COLORS.border}` }}>
                  <td className="p-4 font-bold">{comp.name}</td>
                  <td className="p-4">{renderCell(comp.model, false)}</td>
                  <td className="p-4">{renderCell(comp.privacy, false)}</td>
                  <td className="p-4">{renderCell(comp.blockchain, false)}</td>
                  <td className="p-4">{renderCell(comp.agent, false)}</td>
                  <td className="p-4">{renderCell(comp.africa, false)}</td>
                  <td className="p-4" style={{ color: BLOOMBERG_PRUNE_COLORS.textSecondary }}>{comp.funding}</td>
                </tr>
              ))}
            </tbody>
            {/* STICKY BOTTOM ROW FOR MYNε */}
            <tfoot className="sticky bottom-0 z-10" style={{ backgroundColor: '#071A11', borderTop: '2px solid #22C55E' }}>
              {COMPETITORS.filter(c => c.isMyne).map((comp) => (
                <tr key={comp.id}>
                  <td className="p-4 font-bold" style={{ color: '#22C55E', fontSize: '14px' }}>{comp.name}</td>
                  <td className="p-4 font-bold">{renderCell(comp.model, true)}</td>
                  <td className="p-4 font-bold">{renderCell(comp.privacy, true)}</td>
                  <td className="p-4 font-bold">{renderCell(comp.blockchain, true)}</td>
                  <td className="p-4 font-bold">{renderCell(comp.agent, true)}</td>
                  <td className="p-4 font-bold">{renderCell(comp.africa, true)}</td>
                  <td className="p-4 font-bold" style={{ color: '#22C55E' }}>{comp.funding}</td>
                </tr>
              ))}
            </tfoot>
          </table>
        </div>
        <div className="p-3 text-center" style={{ ...COMMON_STYLES.categoryLabel, backgroundColor: '#05120C', color: '#22C55E' }}>
          Seul acteur combinant agent fiduciaire + blockchain audit + differential privacy + corridor Afrique + revenue share 53%
        </div>
      </div>

      {/* RADAR CHART */}
      <div className="flex-1 flex justify-center items-center py-4" style={COMMON_STYLES.card}>
        <div className="flex space-x-12 items-center">
          
          <div className="w-[300px] h-[300px] relative">
            <svg width="100%" height="100%" viewBox="0 0 300 300">
              {/* Background grid */}
              {[20, 40, 60, 80, 100].map(level => {
                const points = Array.from({ length: numAxes }).map((_, i) => {
                  const p = getPoint(level, i, numAxes, 100);
                  return `${p.x},${p.y}`;
                }).join(' ');
                return (
                  <polygon 
                    key={level} 
                    points={points} 
                    fill="none" 
                    stroke={BLOOMBERG_PRUNE_COLORS.border} 
                    strokeDasharray={level === 100 ? "0" : "4 4"}
                  />
                );
              })}
              
              {/* Axis lines */}
              {Array.from({ length: numAxes }).map((_, i) => {
                const end = getPoint(100, i, numAxes, 100);
                return (
                  <line 
                    key={`line-${i}`} 
                    x1={centerX} 
                    y1={centerY} 
                    x2={end.x} 
                    y2={end.y} 
                    stroke={BLOOMBERG_PRUNE_COLORS.border} 
                  />
                );
              })}

              {/* Data Polygons */}
              {DUMMY_RADAR_DATA.map((dataset, idx) => {
                const points = dataset.values.map((v, i) => {
                  const p = getPoint(v, i, numAxes, 100);
                  return `${p.x},${p.y}`;
                }).join(' ');
                
                const isMyne = dataset.name === 'MYNε';
                return (
                  <polygon 
                    key={dataset.name} 
                    points={points} 
                    fill={dataset.color} 
                    fillOpacity={isMyne ? "0.2" : "0.05"}
                    stroke={dataset.color} 
                    strokeWidth={isMyne ? "3" : "1"}
                  />
                );
              })}

              {/* Text Labels */}
              {axes.map((axis, i) => {
                const p = getPoint(115, i, numAxes, 100);
                return (
                  <text 
                    key={`label-${i}`} 
                    x={p.x} 
                    y={p.y} 
                    textAnchor="middle" 
                    alignmentBaseline="middle"
                    style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '10px', fill: BLOOMBERG_PRUNE_COLORS.textSecondary }}
                  >
                    {axis}
                  </text>
                );
              })}
            </svg>
          </div>

          {/* Legend */}
          <div className="flex flex-col space-y-4">
            {DUMMY_RADAR_DATA.map((dataset) => (
              <div key={dataset.name} className="flex items-center space-x-3">
                <div className="w-4 h-4" style={{ backgroundColor: dataset.color, opacity: dataset.name === 'MYNε' ? 1 : 0.6 }} />
                <span style={{ 
                  fontFamily: '"JetBrains Mono", monospace', 
                  fontSize: '12px', 
                  color: dataset.name === 'MYNε' ? dataset.color : BLOOMBERG_PRUNE_COLORS.textMain,
                  fontWeight: dataset.name === 'MYNε' ? 'bold' : 'normal'
                }}>
                  {dataset.name}
                </span>
              </div>
            ))}
          </div>

        </div>
      </div>

    </div>
  );
}
