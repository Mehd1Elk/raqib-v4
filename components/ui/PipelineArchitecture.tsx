'use client';

interface PipelineNode {
  name: string;
  tech?: string;
  color: string;
  dashed?: boolean;
}

interface PipelineLink {
  from: number;
  to: number;
}

interface PipelineArchitectureProps {
  nodes: PipelineNode[];
  links: PipelineLink[];
  title?: string;
}

export function PipelineArchitecture({ nodes, links, title }: PipelineArchitectureProps) {
  const nodeW = 120;
  const nodeH = 52;
  const gapX = 40;
  const totalW = nodes.length * nodeW + (nodes.length - 1) * gapX;
  const svgH = nodeH + 20;

  return (
    <div className="w-full overflow-x-auto">
      {title && (
        <h3 className="font-[family-name:var(--font-jetbrains)] text-[8px] uppercase tracking-[1.5px] text-t3 mb-3">
          {title}
        </h3>
      )}
      <svg
        width={totalW}
        height={svgH}
        viewBox={`0 0 ${totalW} ${svgH}`}
        className="min-w-fit"
      >
        <defs>
          <marker
            id="pipe-arrow"
            viewBox="0 0 10 7"
            refX="10"
            refY="3.5"
            markerWidth="8"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M0 0 L10 3.5 L0 7 z" fill="#6B5E4C" />
          </marker>
          <style>{`
            @keyframes dashFlow {
              to { stroke-dashoffset: -20; }
            }
          `}</style>
        </defs>

        {/* Links */}
        {links.map((link, i) => {
          const x1 = link.from * (nodeW + gapX) + nodeW;
          const x2 = link.to * (nodeW + gapX);
          const y = svgH / 2;
          return (
            <line
              key={`link-${i}`}
              x1={x1 + 2}
              y1={y}
              x2={x2 - 2}
              y2={y}
              stroke="#6B5E4C"
              strokeWidth={1.5}
              markerEnd="url(#pipe-arrow)"
              strokeDasharray="6 4"
              style={{ animation: 'dashFlow 1.2s linear infinite' }}
            />
          );
        })}

        {/* Nodes */}
        {nodes.map((node, i) => {
          const x = i * (nodeW + gapX);
          const y = (svgH - nodeH) / 2;
          return (
            <g key={`node-${i}`}>
              <rect
                x={x}
                y={y}
                width={nodeW}
                height={nodeH}
                rx={0}
                fill={node.dashed ? 'transparent' : `${node.color}18`}
                stroke={node.color}
                strokeWidth={node.dashed ? 1 : 1.5}
                strokeDasharray={node.dashed ? '5 3' : 'none'}
              />
              <text
                x={x + nodeW / 2}
                y={y + (node.tech ? 19 : nodeH / 2)}
                textAnchor="middle"
                dominantBaseline="central"
                className="font-[family-name:var(--font-jetbrains)]"
                style={{
                  fontSize: '8px',
                  fill: node.color,
                  fontWeight: 600,
                  letterSpacing: '0.5px',
                }}
              >
                {node.name}
              </text>
              {node.tech && (
                <text
                  x={x + nodeW / 2}
                  y={y + 35}
                  textAnchor="middle"
                  dominantBaseline="central"
                  className="font-[family-name:var(--font-jetbrains)]"
                  style={{ fontSize: '6px', fill: '#918977' }}
                >
                  {node.tech}
                </text>
              )}
              {node.dashed && (
                <text
                  x={x + nodeW / 2}
                  y={y + nodeH + 10}
                  textAnchor="middle"
                  className="font-[family-name:var(--font-jetbrains)]"
                  style={{ fontSize: '5px', fill: '#918977',  }}
                >
                  Phase future
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
