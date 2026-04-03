import React, { useState } from 'react';
import { BLOOMBERG_PRUNE_COLORS, COMMON_STYLES } from '../shared/constants';

const AXES = [
  "Souveraineté",
  "Masse Critique",
  "Modèle Revenu",
  "Focus Corridor",
  "Agent Fiduciaire",
  "Timing"
];

const MYNE_DATA = [95, 80, 85, 90, 100, 70];

const INITIATIVES = Array.from({ length: 32 }, (_, i) => ({
  id: `init-${i}`,
  name: i === 0 ? "Worldcoin" : i === 1 ? "Pi Network" : i === 2 ? "CBDC Nigeria" : `Initiative ${i + 1}`,
  data: [
    Math.floor(Math.random() * 80) + 10,
    Math.floor(Math.random() * 80) + 10,
    Math.floor(Math.random() * 80) + 10,
    Math.floor(Math.random() * 80) + 10,
    Math.floor(Math.random() * 80) + 10,
    Math.floor(Math.random() * 80) + 10,
  ]
}));

export default function ScorecardView() {
  const [selectedInit, setSelectedInit] = useState(INITIATIVES[0]);

  const centerX = 150;
  const centerY = 150;
  const radius = 100;

  const getCoordinates = (value: number, index: number) => {
    const angle = (Math.PI * 2 * index) / AXES.length - Math.PI / 2;
    // value is 0 to 100, scale to radius
    const scaledV = (value / 100) * radius;
    return {
      x: centerX + scaledV * Math.cos(angle),
      y: centerY + scaledV * Math.sin(angle)
    };
  };

  const getPolygonPoints = (data: number[]) => {
    return data.map((val, i) => {
      const { x, y } = getCoordinates(val, i);
      return `${x},${y}`;
    }).join(' ');
  };

  return (
    <div className="h-full flex flex-col space-y-6">
      <div className="flex items-center justify-between">
        <h2 style={COMMON_STYLES.sectionTitle}>Scorecard: MYNε vs Comparables</h2>
        <div className="flex items-center space-x-4">
          <label style={{ ...COMMON_STYLES.categoryLabel, color: BLOOMBERG_PRUNE_COLORS.textSecondary }}>VS</label>
          <select 
            value={selectedInit.id}
            onChange={(e) => setSelectedInit(INITIATIVES.find(i => i.id === e.target.value)!)}
            className="bg-transparent text-white border outline-none px-3 py-1"
            style={{ 
              borderColor: BLOOMBERG_PRUNE_COLORS.border, 
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: '12px'
            }}
          >
            {INITIATIVES.map(init => (
              <option key={init.id} value={init.id} style={{ backgroundColor: '#1E0A20' }}>
                {init.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6 flex-1">
        {/* Radar Chart */}
        <div style={COMMON_STYLES.card} className="col-span-2 p-6 flex flex-col items-center justify-center relative">
          <svg width="400" height="350" viewBox="0 0 300 300">
            {/* Grid */}
            {[20, 40, 60, 80, 100].map(val => (
              <polygon
                key={val}
                points={getPolygonPoints(Array(6).fill(val))}
                fill="none"
                stroke={BLOOMBERG_PRUNE_COLORS.border}
                strokeWidth="1"
              />
            ))}
            
            {/* Axis Lines */}
            {AXES.map((_, i) => {
              const { x, y } = getCoordinates(100, i);
              return (
                <line 
                  key={i} 
                  x1={centerX} y1={centerY} 
                  x2={x} y2={y} 
                  stroke={BLOOMBERG_PRUNE_COLORS.border} 
                  strokeWidth="1" 
                />
              );
            })}

            {/* Labels */}
            {AXES.map((label, i) => {
              const { x, y } = getCoordinates(115, i);
              return (
                <text 
                  key={i} 
                  x={x} y={y} 
                  textAnchor="middle" 
                  alignmentBaseline="middle"
                  fill={BLOOMBERG_PRUNE_COLORS.textSecondary}
                  fontFamily='"JetBrains Mono", monospace'
                  fontSize="8"
                >
                  {label}
                </text>
              );
            })}

            {/* Selected Initiative Polygon */}
            <polygon
              points={getPolygonPoints(selectedInit.data)}
              fill="rgba(255,255,255,0.1)"
              stroke="#FFFFFF"
              strokeWidth="2"
            />
            {/* Selected Initiative Points */}
            {selectedInit.data.map((val, i) => {
              const { x, y } = getCoordinates(val, i);
              return <circle key={`init-${i}`} cx={x} cy={y} r="3" fill="#FFFFFF" />;
            })}

            {/* MYNE Polygon */}
            <polygon
              points={getPolygonPoints(MYNE_DATA)}
              fill="rgba(34, 197, 94, 0.2)"
              stroke={BLOOMBERG_PRUNE_COLORS.accentPositive}
              strokeWidth="2"
            />
            {/* MYNE Points */}
            {MYNE_DATA.map((val, i) => {
              const { x, y } = getCoordinates(val, i);
              return <circle key={`myne-${i}`} cx={x} cy={y} r="3" fill={BLOOMBERG_PRUNE_COLORS.accentPositive} />;
            })}

          </svg>

          <div className="absolute top-4 right-4 flex flex-col space-y-2">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3" style={{ backgroundColor: BLOOMBERG_PRUNE_COLORS.accentPositive }}></div>
              <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '10px', color: BLOOMBERG_PRUNE_COLORS.textMain }}>MYNε Focus</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-white"></div>
              <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '10px', color: BLOOMBERG_PRUNE_COLORS.textMain }}>{selectedInit.name}</span>
            </div>
          </div>
        </div>

        {/* Delta Analysis */}
        <div style={COMMON_STYLES.card} className="col-span-1 border overflow-y-auto">
          <div className="p-4" style={COMMON_STYLES.separator}>
            <div style={COMMON_STYLES.categoryLabel}>Analyse des Deltas</div>
            <div style={{ ...COMMON_STYLES.sectionTitle, marginTop: '8px', fontSize: '14px' }}>
              Avantage Compétitif
            </div>
          </div>
          <div className="p-4 flex flex-col space-y-4">
            {AXES.map((axis, i) => {
              const myneVal = MYNE_DATA[i];
              const initVal = selectedInit.data[i];
              const diff = myneVal - initVal;
              const isPositive = diff >= 0;
              return (
                <div key={i} className="flex flex-col space-y-1">
                  <div className="flex justify-between items-center">
                    <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '10px', color: BLOOMBERG_PRUNE_COLORS.textSecondary }}>
                      {axis}
                    </span>
                    <span style={{ 
                      fontFamily: '"JetBrains Mono", monospace', 
                      fontSize: '12px', 
                      fontWeight: 600,
                      color: isPositive ? BLOOMBERG_PRUNE_COLORS.accentPositive : BLOOMBERG_PRUNE_COLORS.accentNegative 
                    }}>
                      {isPositive ? '+' : ''}{diff} pts
                    </span>
                  </div>
                  <div className="h-1 w-full bg-gray-800 flex">
                    <div 
                      className="bg-white h-full" 
                      style={{ width: `${initVal}%`, opacity: 0.5 }} 
                    />
                  </div>
                  <div className="h-1 w-full bg-gray-800 flex -mt-1 relative top-[-4px]">
                    <div 
                      style={{ width: `${myneVal}%`, backgroundColor: BLOOMBERG_PRUNE_COLORS.accentPositive }} 
                      className="h-full z-10" 
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
