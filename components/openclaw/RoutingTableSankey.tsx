'use client';

import { useEffect, useState } from 'react';

interface AgentEntry {
  name: string;
  layer: string | null;
  platform: string | null;
}

interface RouteGroup {
  entity: string;
  agents: AgentEntry[];
  count: number;
}

interface RoutingData {
  source: string;
  routes: RouteGroup[];
}

interface BandData {
  key: string;
  layer: string;
  platform: string;
  count: number;
  d: string;
  color: string;
}

// ── Constants ──────────────────────────────────────────────────────────────
const LAYERS = ['L1', 'L1.5', 'L2', 'L3', 'L4', 'OPS'];
const PLATFORMS = ['Claude', 'Codex', 'Antigravity', 'Perplexity', 'Ollama'];

const LAYER_COLORS: Record<string, string> = {
  'L1': '#1E0A20',
  'L1.5': '#9C3D3D',
  'L2': '#3D5E8C',
  'L3': '#3D7C5E',
  'L4': '#7B5EA7',
  'OPS': 'rgba(30,10,32,0.60)',
};

const LAYER_H = 50;
const PLAT_H = 60;
const NODE_W = 12;
const LEFT_X = 20;
const RIGHT_X = 568;
const CP1X = 200;
const CP2X = 400;

function layerY(i: number): number {
  return 40 + i * 60;
}
function platformY(j: number): number {
  return 40 + j * 70;
}

// ── Normalizers ────────────────────────────────────────────────────────────
function normalizeLayer(raw: string | null | undefined): string {
  if (!raw) return 'OPS';
  const u = raw.toUpperCase();
  if (u === 'L1.5' || u === 'L1_5' || u.startsWith('L1.5')) return 'L1.5';
  if (u.startsWith('L1')) return 'L1';
  if (u.startsWith('L2')) return 'L2';
  if (u.startsWith('L3')) return 'L3';
  if (u.startsWith('L4')) return 'L4';
  if (u === 'OPS' || u.startsWith('OPS')) return 'OPS';
  return 'OPS';
}

const PLATFORM_MAP: Record<string, string> = {
  claude: 'Claude', anthropic: 'Claude',
  codex: 'Codex', openai: 'Codex',
  antigravity: 'Antigravity',
  perplexity: 'Perplexity',
  ollama: 'Ollama',
};

function normalizePlatform(raw: string | null | undefined): string {
  if (!raw) return 'Claude';
  return PLATFORM_MAP[raw.toLowerCase()] ?? 'Claude';
}

// ── Aggregation → Band computation ─────────────────────────────────────────
function buildBands(routes: RouteGroup[]): BandData[] {
  const flows = new Map<string, number>();
  for (const route of routes) {
    for (const agent of route.agents) {
      const layer = normalizeLayer(agent.layer);
      const platform = normalizePlatform(agent.platform);
      const key = `${layer}__${platform}`;
      flows.set(key, (flows.get(key) ?? 0) + 1);
    }
  }

  if (flows.size === 0) return [];

  // Compute per-node totals
  const layerTotals = new Map<string, number>();
  const platformTotals = new Map<string, number>();
  for (const [key, count] of flows) {
    const [layer, platform] = key.split('__');
    layerTotals.set(layer, (layerTotals.get(layer) ?? 0) + count);
    platformTotals.set(platform, (platformTotals.get(platform) ?? 0) + count);
  }

  // Track accumulated offsets (px used so far from top of each node)
  const layerOffsets = new Map<string, number>();
  const platformOffsets = new Map<string, number>();

  const bands: BandData[] = [];

  // Iterate in LAYERS × PLATFORMS order for deterministic layout
  for (const layer of LAYERS) {
    const li = LAYERS.indexOf(layer);
    for (const platform of PLATFORMS) {
      const pj = PLATFORMS.indexOf(platform);
      const key = `${layer}__${platform}`;
      const count = flows.get(key);
      if (!count) continue;

      const totalL = layerTotals.get(layer) ?? 1;
      const totalP = platformTotals.get(platform) ?? 1;

      const bandWL = (count / totalL) * LAYER_H;
      const bandWP = (count / totalP) * PLAT_H;

      const lyOffset = layerOffsets.get(layer) ?? 0;
      const pyOffset = platformOffsets.get(platform) ?? 0;

      const y0t = layerY(li) + lyOffset;
      const y0b = y0t + bandWL;
      const y1t = platformY(pj) + pyOffset;
      const y1b = y1t + bandWP;

      layerOffsets.set(layer, lyOffset + bandWL);
      platformOffsets.set(platform, pyOffset + bandWP);

      const lx = LEFT_X + NODE_W;
      const rx = RIGHT_X;

      const d = [
        `M ${lx} ${y0t}`,
        `C ${CP1X} ${y0t}, ${CP2X} ${y1t}, ${rx} ${y1t}`,
        `L ${rx} ${y1b}`,
        `C ${CP2X} ${y1b}, ${CP1X} ${y0b}, ${lx} ${y0b}`,
        'Z',
      ].join(' ');

      bands.push({ key, layer, platform, count, d, color: LAYER_COLORS[layer] });
    }
  }

  return bands;
}

// ── Component ──────────────────────────────────────────────────────────────
export function RoutingTableSankey() {
  const [data, setData] = useState<RoutingData | null>(null);
  const [loading, setLoading] = useState(true);
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/openclaw/routing')
      .then(r => r.json())
      .then(setData)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const bands = data ? buildBands(data.routes) : [];
  const activeLayers = bands.length > 0 ? [...new Set(bands.map(b => b.layer))] : [];
  const activePlatforms = bands.length > 0 ? [...new Set(bands.map(b => b.platform))] : [];

  return (
    <div className="bg-[#FAF8FC] border border-[rgba(30,10,32,0.35)] p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <span
          style={{
            fontFamily: 'var(--font-jetbrains)',
            fontSize: 9,
            color: 'rgba(30,10,32,0.60)',
            letterSpacing: '2px',
            textTransform: 'uppercase',
          }}
        >
          Routing — Layer → Platform
        </span>
        {data && (
          <span
            style={{
              fontFamily: 'var(--font-jetbrains)',
              fontSize: 8,
              color: data.source === 'openclaw' ? '#3D7C5E' : 'rgba(30,10,32,0.60)',
              border: `1px solid ${data.source === 'openclaw' ? '#3D7C5E' : 'rgba(30,10,32,0.60)'}`,
              padding: '1px 5px',
              letterSpacing: '1px',
            }}
          >
            {data.source === 'openclaw' ? 'LIVE' : 'SIMULÉ'}
          </span>
        )}
      </div>

      {/* Loading */}
      {loading && (
        <div className="bg-[#F2EFE8] animate-pulse" style={{ height: 400 }} />
      )}

      {/* SVG Sankey */}
      {!loading && (
        <svg
          viewBox="0 0 600 400"
          style={{ width: '100%', maxWidth: 600, display: 'block' }}
          aria-label="Routing Sankey diagram"
        >
          {/* Bands */}
          {bands.map(b => (
            <path
              key={b.key}
              d={b.d}
              fill={b.color}
              opacity={
                hoveredKey === null ? 0.3 : hoveredKey === b.key ? 0.6 : 0.15
              }
              onMouseEnter={() => setHoveredKey(b.key)}
              onMouseLeave={() => setHoveredKey(null)}
              style={{ transition: 'opacity 0.2s', cursor: 'default' }}
            />
          ))}

          {/* Layer nodes */}
          {LAYERS.map((layer, i) => {
            const active = activeLayers.includes(layer);
            return (
              <rect
                key={layer}
                x={LEFT_X}
                y={layerY(i)}
                width={NODE_W}
                height={LAYER_H}
                fill={LAYER_COLORS[layer]}
                opacity={active ? 1 : 0.2}
              />
            );
          })}

          {/* Platform nodes */}
          {PLATFORMS.map((platform, j) => {
            const active = activePlatforms.includes(platform);
            return (
              <rect
                key={platform}
                x={RIGHT_X}
                y={platformY(j)}
                width={NODE_W}
                height={PLAT_H}
                fill="rgba(30,10,32,0.35)"
                opacity={active ? 1 : 0.2}
              />
            );
          })}

          {/* Layer labels (right-aligned at x=15) */}
          {LAYERS.map((layer, i) => (
            <text
              key={`label-l-${layer}`}
              x={LEFT_X - 4}
              y={layerY(i) + LAYER_H / 2}
              textAnchor="end"
              dominantBaseline="central"
              style={{
                fontFamily: 'var(--font-jetbrains)',
                fontSize: 9,
                fill: LAYER_COLORS[layer],
              }}
            >
              {layer}
            </text>
          ))}

          {/* Platform labels (left-aligned at x=585) */}
          {PLATFORMS.map((platform, j) => (
            <text
              key={`label-p-${platform}`}
              x={RIGHT_X + NODE_W + 4}
              y={platformY(j) + PLAT_H / 2}
              textAnchor="start"
              dominantBaseline="central"
              style={{
                fontFamily: 'var(--font-jetbrains)',
                fontSize: 9,
                fill: 'rgba(30,10,32,0.60)',
              }}
            >
              {platform}
            </text>
          ))}

          {/* Empty state */}
          {bands.length === 0 && !loading && (
            <text
              x={300}
              y={200}
              textAnchor="middle"
              dominantBaseline="central"
              style={{
                fontFamily: 'var(--font-jetbrains)',
                fontSize: 9,
                fill: 'rgba(30,10,32,0.60)',
              }}
            >
              Aucune donnée de routing disponible.
            </text>
          )}

          {/* Hover tooltip */}
          {hoveredKey && (() => {
            const b = bands.find(x => x.key === hoveredKey);
            if (!b) return null;
            return (
              <text
                x={300}
                y={390}
                textAnchor="middle"
                style={{
                  fontFamily: 'var(--font-jetbrains)',
                  fontSize: 8,
                  fill: 'rgba(30,10,32,0.60)',
                }}
              >
                {b.layer} → {b.platform} · {b.count} agents
              </text>
            );
          })()}
        </svg>
      )}
    </div>
  );
}
