'use client';

interface Node {
  id: string;
  label: string;
  group?: string;
  size?: number;
}

interface Edge {
  from: string;
  to: string;
  label?: string;
}

interface Props {
  nodes: Node[];
  edges: Edge[];
  centerLabel?: string;
}

const GROUP_COLORS: Record<string, string> = {
  eigen: '#B8963E',
  investor: '#3D5E8C',
  partner: '#3D7C5E',
  advisor: '#7B5EA7',
  institution: '#B87D3E',
  default: '#918977',
};

export function NetworkGraph({ nodes, edges, centerLabel }: Props) {
  const cx = 300;
  const cy = 200;
  const radius = 150;

  const nodePositions = new Map<string, { x: number; y: number }>();

  // Center node
  if (centerLabel) {
    nodePositions.set('__center__', { x: cx, y: cy });
  }

  // Arrange nodes in a circle
  nodes.forEach((node, i) => {
    const angle = (2 * Math.PI * i) / nodes.length - Math.PI / 2;
    const r = radius + (node.size ?? 1) * 5;
    nodePositions.set(node.id, {
      x: cx + r * Math.cos(angle),
      y: cy + r * Math.sin(angle),
    });
  });

  return (
    <div className="w-full overflow-x-auto">
      <svg viewBox="0 0 600 400" className="w-full max-w-[600px] mx-auto" style={{ minHeight: 300 }}>
        {/* Edges */}
        {edges.map((edge, i) => {
          const fromPos = nodePositions.get(edge.from) ?? nodePositions.get('__center__');
          const toPos = nodePositions.get(edge.to);
          if (!fromPos || !toPos) return null;
          return (
            <line
              key={i}
              x1={fromPos.x}
              y1={fromPos.y}
              x2={toPos.x}
              y2={toPos.y}
              stroke="#D4CCBA"
              strokeWidth={0.8}
              opacity={0.6}
            />
          );
        })}

        {/* Center node */}
        {centerLabel && (
          <>
            <circle cx={cx} cy={cy} r={24} fill="#B8963E" opacity={0.9} />
            <text x={cx} y={cy + 1} textAnchor="middle" dominantBaseline="central" fill="#FDFAF3" fontSize={7} fontFamily="var(--font-jetbrains)" fontWeight={700}>
              {centerLabel}
            </text>
          </>
        )}

        {/* Nodes */}
        {nodes.map((node) => {
          const pos = nodePositions.get(node.id);
          if (!pos) return null;
          const color = GROUP_COLORS[node.group ?? 'default'] ?? GROUP_COLORS.default;
          const r = 6 + (node.size ?? 1) * 2;
          return (
            <g key={node.id}>
              <circle cx={pos.x} cy={pos.y} r={r} fill={color} opacity={0.85} />
              <text
                x={pos.x}
                y={pos.y + r + 10}
                textAnchor="middle"
                fill="#6B5E4C"
                fontSize={7}
                fontFamily="var(--font-jetbrains)"
              >
                {node.label.length > 18 ? node.label.slice(0, 16) + '\u2026' : node.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
