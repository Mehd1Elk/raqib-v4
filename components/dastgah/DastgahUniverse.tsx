'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';

/* ═══════════════════════════════════════════════════════
   PALETTE & TOKENS — 7 rouges + blanc exclusivement
   ═══════════════════════════════════════════════════════ */
const C = {
  void: '#D60000',
  walnut: '#AA0000',
  chamber: '#8B0000',
  wood: '#FF2C2C',
  bark: '#FF5353',
  cinnabar: '#FF0000',
  coral: '#FF5353',
  gold: '#FFA5A5',
  goldMuted: '#FF7979',
  lilac: '#FFA5A5',
  lilacDust: '#FF7979',
  ivory: '#FFFFFF',
  ivoryDim: '#FFA5A5',
  ivoryMuted: '#FF7979',
} as const;

const GR = "'Cormorant Garamond', 'Playfair Display', Georgia, serif";
const MN = "'JetBrains Mono', monospace";
const SN = "'DM Sans', 'Geist', sans-serif";

/* ═══════════════════════════════════════════════════════
   SVG ICONS — inline, zero external deps
   ═══════════════════════════════════════════════════════ */
const typeIcons: Record<string, React.ReactNode> = {
  artwork: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect x="2" y="2" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="6" cy="6" r="1.5" stroke="currentColor" strokeWidth="1" />
      <path d="M2 11 L6 7 L9 10 L11 8 L14 11" stroke="currentColor" strokeWidth="1" fill="none" />
    </svg>
  ),
  music: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M6 3 L6 11" stroke="currentColor" strokeWidth="1.2" />
      <path d="M6 3 L13 1.5 L13 9.5" stroke="currentColor" strokeWidth="1.2" fill="none" />
      <circle cx="4" cy="11.5" r="2" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="11" cy="10" r="2" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  ),
  place: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M8 1.5 C5 1.5 2.5 4 2.5 7 C2.5 11 8 14.5 8 14.5 C8 14.5 13.5 11 13.5 7 C13.5 4 11 1.5 8 1.5Z" stroke="currentColor" strokeWidth="1.2" fill="none" />
      <circle cx="8" cy="7" r="2" stroke="currentColor" strokeWidth="1" />
    </svg>
  ),
  book: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M3 2 L3 13 C3 13 5 12 8 12 C11 12 13 13 13 13 L13 2 C13 2 11 3 8 3 C5 3 3 2 3 2Z" stroke="currentColor" strokeWidth="1.2" fill="none" />
      <path d="M8 3 L8 12" stroke="currentColor" strokeWidth="1" />
    </svg>
  ),
  person: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.2" />
      <path d="M3 14 C3 10.5 5 9 8 9 C11 9 13 10.5 13 14" stroke="currentColor" strokeWidth="1.2" fill="none" />
    </svg>
  ),
};

const typeLabels: Record<string, string> = {
  artwork: 'Artwork',
  music: 'Music',
  place: 'Place',
  book: 'Book',
  person: 'Person',
};

/* ═══════════════════════════════════════════════════════
   DATA MODEL
   ═══════════════════════════════════════════════════════ */
interface DastgahRef {
  id: string;
  title: string;
  creator: string;
  type: string;
  note: string;
  tags: string[];
  moods: string[];
  colors: string[];
  intensity: number;
  significance: string;
  year: string;
  relations: string[];
}

interface ClusterDef {
  id: string;
  name: string;
  description: string;
  items: string[];
  color: string;
}

interface SynergyDef {
  cluster: string;
  reading: string;
  tension: string;
  seeds: string[];
}

interface RelationDef {
  from: string;
  to: string;
  type: string;
  label: string;
}

/* ═══════════════════════════════════════════════════════
   SAMPLE DATA — 7 r\u00e9f\u00e9rences
   ═══════════════════════════════════════════════════════ */
const REFERENCES: DastgahRef[] = [
  {
    id: 'r1',
    title: 'Luz roja sobre campo ocre',
    creator: 'Soledad Sevilla',
    type: 'artwork',
    note: 'The surface breathes like a membrane. A chromatic field that teaches patience \u2014 every band of red shifts into the next without announcing itself. This painting restructured how I see warmth as a spatial event.',
    tags: ['chromatic field', 'abstraction', 'meditation', 'warmth'],
    moods: ['contemplative', 'luminous', 'still'],
    colors: ['#B83A2A', '#D4735A', '#E8D5B8'],
    intensity: 9,
    significance: 'core',
    year: '1985',
    relations: ['r3', 'r5'],
  },
  {
    id: 'r2',
    title: 'Disintegration Loops',
    creator: 'William Basinski',
    type: 'music',
    note: 'Tape loops decaying across hours. The sublime is not built; it erodes into view. A nocturnal masterpiece that taught me beauty can be found in systematic collapse \u2014 each repetition slightly less than the last.',
    tags: ['ambient', 'decay', 'nocturnal', 'loop'],
    moods: ['nocturnal', 'melancholic', 'transcendent'],
    colors: ['#0E0B09', '#2A1F18', '#5C412E'],
    intensity: 10,
    significance: 'core',
    year: '2002',
    relations: ['r1', 'r4'],
  },
  {
    id: 'r3',
    title: 'Casa Barrag\u00e1n \u2014 Red Corridor',
    creator: 'Luis Barrag\u00e1n',
    type: 'place',
    note: 'A corridor drenched in cinnabar. The light enters from above, filtered through pink glass, and the space becomes an emotion rather than an address. Architecture as mood regulation.',
    tags: ['architecture', 'immersive', 'color', 'ritual'],
    moods: ['sacred', 'intimate', 'warm'],
    colors: ['#B83A2A', '#D4735A', '#B89A5E'],
    intensity: 9,
    significance: 'core',
    year: '1948',
    relations: ['r1', 'r5'],
  },
  {
    id: 'r4',
    title: 'The Personal Library of Jorge Luis Borges',
    creator: 'Jorge Luis Borges',
    type: 'place',
    note: 'A room dense with bindings. Borges could no longer read when he served as director of the National Library \u2014 a man surrounded by 900,000 books he could only touch. The library as metaphor for the gap between accumulation and comprehension.',
    tags: ['library', 'memory', 'labyrinth', 'knowledge'],
    moods: ['intellectual', 'nostalgic', 'dense'],
    colors: ['#3D2B1E', '#5C412E', '#C8BFA8'],
    intensity: 8,
    significance: 'formative',
    year: '1955',
    relations: ['r5', 'r2'],
  },
  {
    id: 'r5',
    title: 'The Poetics of Space',
    creator: 'Gaston Bachelard',
    type: 'book',
    note: 'Bachelard treats houses, drawers, nests, and shells as structures of intimate thought. Space is not geometry; it is the form that reverie takes when it has a body. This book grounded my belief that design is phenomenology.',
    tags: ['phenomenology', 'space', 'intimacy', 'philosophy'],
    moods: ['reflective', 'poetic', 'grounding'],
    colors: ['#F0E8DA', '#A090B0', '#3D2B1E'],
    intensity: 9,
    significance: 'core',
    year: '1958',
    relations: ['r3', 'r4'],
  },
  {
    id: 'r6',
    title: 'Rothko Chapel',
    creator: 'Mark Rothko',
    type: 'place',
    note: 'Fourteen dark canvases in a non-denominational chapel. The paintings swallow light. After twenty minutes, the black begins to open. Spiritual architecture without doctrine.',
    tags: ['sacred', 'darkness', 'immersion', 'painting'],
    moods: ['transcendent', 'solemn', 'expansive'],
    colors: ['#0E0B09', '#2A1F18', '#2E4A6E'],
    intensity: 10,
    significance: 'core',
    year: '1971',
    relations: ['r1', 'r2'],
  },
  {
    id: 'r7',
    title: 'In Praise of Shadows',
    creator: "Jun'ichir\u014d Tanizaki",
    type: 'book',
    note: 'A meditation on Japanese aesthetics \u2014 the beauty of lacquerware in candlelight, of gold leaf glimpsed in gloom. Tanizaki argues that the West dispels shadow; the East composes with it.',
    tags: ['aesthetics', 'shadow', 'Japan', 'materiality'],
    moods: ['meditative', 'refined', 'warm'],
    colors: ['#2A1F18', '#B89A5E', '#5C412E'],
    intensity: 7,
    significance: 'formative',
    year: '1933',
    relations: ['r5', 'r6'],
  },
];

const CLUSTERS: ClusterDef[] = [
  {
    id: 'cl1',
    name: 'The Red Alcove',
    description: 'Immersive warmth, cinnabar saturation, architectures of emotional intensity',
    items: ['r1', 'r3', 'r6'],
    color: C.cinnabar,
  },
  {
    id: 'cl2',
    name: 'The Nocturnal Library',
    description: 'Dense knowledge, shadows, the space between accumulation and understanding',
    items: ['r2', 'r4', 'r7'],
    color: C.lilacDust,
  },
  {
    id: 'cl3',
    name: 'Phenomenological Ground',
    description: 'Space as experience, the body as reader, architecture as philosophy',
    items: ['r3', 'r5', 'r7'],
    color: C.gold,
  },
];

const SYNERGIES: SynergyDef[] = [
  {
    cluster: 'cl1',
    reading: "Your universe gravitates toward immersive chromatic environments \u2014 spaces where color becomes atmosphere rather than decoration. Sevilla's fields, Barrag\u00e1n's corridors, and Rothko's chapel share a logic: they replace representation with saturation. You don't look at them; you are inside them.",
    tension: "This cluster is entirely visual and spatial. There is no text, no narrative, no temporal structure. Consider adding a literary or musical reference that deals with immersion through language \u2014 Clarice Lispector's prose, or \u00c9liane Radigue's long-form drones.",
    seeds: [
      'An immersive installation that layers chromatic fields with ambient sound in a domestic-scale room',
      'A brand identity system built on color temperature shifts rather than fixed palettes',
      'A meditation app whose interface changes chromatically over the session duration',
    ],
  },
  {
    cluster: 'cl2',
    reading: "The Nocturnal Library captures your relationship to knowledge as something dense, melancholic, and slightly out of reach. Basinski's decaying tapes, Borges' unreadable library, and Tanizaki's praise of shadow all share a conviction: the most important things are half-visible. You trust the fragment over the totality.",
    tension: 'This cluster lacks a constructive or generative force. Everything here is about loss, erosion, and incompleteness. Introduce a reference that builds from fragments \u2014 Kintsugi practice, or Sebald\'s literary reconstructions.',
    seeds: [
      'A journal interface that preserves deleted entries as fading traces rather than erasing them',
      'A knowledge graph that highlights gaps and absences rather than connections',
      "An exhibition concept: 'What the Library Cannot Hold'",
    ],
  },
];

const RELATIONS: RelationDef[] = [
  { from: 'r1', to: 'r3', type: 'resonates_with', label: 'chromatic saturation' },
  { from: 'r1', to: 'r5', type: 'extends', label: 'space as sensation' },
  { from: 'r2', to: 'r4', type: 'resonates_with', label: 'beautiful decay' },
  { from: 'r2', to: 'r6', type: 'belongs_to_same_world', label: 'transcendence through darkness' },
  { from: 'r3', to: 'r5', type: 'inspired_by', label: 'phenomenology of dwelling' },
  { from: 'r4', to: 'r5', type: 'extends', label: 'intimate architecture' },
  { from: 'r5', to: 'r7', type: 'resonates_with', label: 'aesthetics of interiority' },
  { from: 'r6', to: 'r1', type: 'belongs_to_same_world', label: 'color as presence' },
  { from: 'r7', to: 'r6', type: 'resonates_with', label: 'composed darkness' },
];

const GRAPH_POSITIONS: Record<string, { x: number; y: number }> = {
  r1: { x: 180, y: 80 },
  r2: { x: 480, y: 60 },
  r3: { x: 100, y: 260 },
  r4: { x: 550, y: 240 },
  r5: { x: 320, y: 340 },
  r6: { x: 60, y: 140 },
  r7: { x: 440, y: 380 },
};

/* ═══════════════════════════════════════════════════════
   MICRO COMPONENTS
   ═══════════════════════════════════════════════════════ */
function ColorDot({ color, size = 10 }: { color: string; size?: number }) {
  return (
    <span
      style={{
        display: 'inline-block',
        width: size,
        height: size,
        borderRadius: '50%',
        backgroundColor: color,
        border: `1px solid ${C.bark}44`,
        flexShrink: 0,
      }}
    />
  );
}

function Badge({ children, color = C.bark }: { children: React.ReactNode; color?: string }) {
  return (
    <span
      style={{
        display: 'inline-block',
        padding: '3px 10px',
        borderRadius: 16,
        fontSize: 10,
        letterSpacing: '0.06em',
        textTransform: 'uppercase' as const,
        color: C.ivory,
        border: `1px solid ${color}55`,
        background: `${color}25`,
        fontFamily: SN,
      }}
    >
      {children}
    </span>
  );
}

function IntensityBar({ value, max = 10 }: { value: number; max?: number }) {
  return (
    <div style={{ display: 'flex', gap: 2, alignItems: 'center' }}>
      {Array.from({ length: max }, (_, i) => (
        <div
          key={i}
          style={{
            width: 4,
            height: 14,
            borderRadius: 2,
            background: i < value ? C.coral : `${C.bark}30`,
            transition: 'background 0.4s ease',
          }}
        />
      ))}
    </div>
  );
}

function SectionTitle({ children, sub }: { children: React.ReactNode; sub?: string }) {
  return (
    <div style={{ marginBottom: 32 }}>
      <h2
        style={{
          fontFamily: GR,
          fontSize: 32,
          fontWeight: 300,
          fontStyle: 'italic',
          color: C.ivory,
          margin: 0,
          lineHeight: 1.2,
        }}
      >
        {children}
      </h2>
      {sub && (
        <p
          style={{
            fontFamily: SN,
            fontSize: 13,
            color: C.ivoryMuted,
            marginTop: 8,
            maxWidth: 560,
            lineHeight: 1.6,
          }}
        >
          {sub}
        </p>
      )}
    </div>
  );
}

function Card({
  children,
  style: s = {},
  onClick,
  hoverable = false,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
  onClick?: () => void;
  hoverable?: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: `conic-gradient(from 220deg at 80% 20%, ${C.chamber}, ${C.walnut}, ${C.chamber})`,
        borderRadius: 16,
        border: `1px solid ${hovered && hoverable ? C.bark : C.wood}44`,
        padding: 28,
        cursor: onClick ? 'pointer' : 'default',
        transition: 'border-color 0.4s ease, transform 0.4s ease',
        transform: hovered && hoverable ? 'translateY(-2px)' : 'none',
        ...s,
      }}
    >
      {children}
    </div>
  );
}

function Divider() {
  return (
    <div
      style={{
        height: 1,
        background: `linear-gradient(90deg, transparent, ${C.wood}50, transparent)`,
        margin: '48px 0',
      }}
    />
  );
}

/* ═══════════════════════════════════════════════════════
   GRAPH VIEW
   ═══════════════════════════════════════════════════════ */
function GraphView({ onSelectItem }: { onSelectItem: (id: string) => void }) {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [hoveredEdge, setHoveredEdge] = useState<number | null>(null);
  const containerW = 660;
  const containerH = 460;

  const connectedTo = useCallback(
    (nodeId: string) => {
      if (!hoveredNode) return false;
      return RELATIONS.some(
        (r) =>
          (r.from === hoveredNode && r.to === nodeId) ||
          (r.to === hoveredNode && r.from === nodeId),
      );
    },
    [hoveredNode],
  );

  return (
    <div>
      <SectionTitle sub="Les noeuds sont vos gusheh. Les lignes sont les relations. La proximit\u00e9 r\u00e9v\u00e8le l'affinit\u00e9. Les lacunes r\u00e9v\u00e8lent les possibles.">
        Graphe
      </SectionTitle>
      <div
        style={{
          position: 'relative' as const,
          width: containerW,
          height: containerH,
          margin: '0 auto',
          borderRadius: 16,
          background: `conic-gradient(from 190deg at 70% 30%, ${C.chamber}, ${C.walnut}, ${C.chamber})`,
          border: `1px solid ${C.wood}30`,
          overflow: 'hidden',
        }}
      >
        {/* Ambient glow */}
        <div
          style={{
            position: 'absolute' as const,
            top: '30%',
            left: '40%',
            width: 200,
            height: 200,
            borderRadius: '50%',
            background: `conic-gradient(from 160deg at 40% 50%, ${C.cinnabar}10, transparent 50%)`,
            pointerEvents: 'none' as const,
          }}
        />

        {/* SVG edges */}
        <svg
          width={containerW}
          height={containerH}
          style={{ position: 'absolute' as const, top: 0, left: 0, pointerEvents: 'none' as const }}
        >
          {RELATIONS.map((rel, i) => {
            const from = GRAPH_POSITIONS[rel.from];
            const to = GRAPH_POSITIONS[rel.to];
            if (!from || !to) return null;
            const isActive = hoveredNode === rel.from || hoveredNode === rel.to || hoveredEdge === i;
            const relColor =
              rel.type === 'resonates_with'
                ? C.coral
                : rel.type === 'extends'
                  ? C.gold
                  : rel.type === 'inspired_by'
                    ? C.lilac
                    : C.bark;
            return (
              <g key={i}>
                <line
                  x1={from.x + 24}
                  y1={from.y + 24}
                  x2={to.x + 24}
                  y2={to.y + 24}
                  stroke={isActive ? relColor : `${C.bark}40`}
                  strokeWidth={isActive ? 1.8 : 0.8}
                  style={{ transition: 'stroke 0.4s, stroke-width 0.3s', pointerEvents: 'stroke' as const, cursor: 'pointer' }}
                  onMouseEnter={() => setHoveredEdge(i)}
                  onMouseLeave={() => setHoveredEdge(null)}
                />
                {isActive && (
                  <text
                    x={(from.x + to.x) / 2 + 24}
                    y={(from.y + to.y) / 2 + 20}
                    textAnchor="middle"
                    fill={C.ivoryMuted}
                    fontSize={9}
                    fontFamily={SN}
                  >
                    {rel.label}
                  </text>
                )}
              </g>
            );
          })}
        </svg>

        {/* Nodes */}
        {REFERENCES.map((ref) => {
          const pos = GRAPH_POSITIONS[ref.id];
          if (!pos) return null;
          const isHovered = hoveredNode === ref.id;
          const isConnected = connectedTo(ref.id);
          const opacity = hoveredNode ? (isHovered || isConnected ? 1 : 0.25) : 1;

          return (
            <div
              key={ref.id}
              onMouseEnter={() => setHoveredNode(ref.id)}
              onMouseLeave={() => setHoveredNode(null)}
              onClick={() => onSelectItem(ref.id)}
              style={{
                position: 'absolute' as const,
                left: pos.x,
                top: pos.y,
                width: 48,
                height: 48,
                borderRadius: 14,
                background: isHovered ? ref.colors[0] : `${ref.colors[0]}60`,
                border: `1.5px solid ${isHovered ? ref.colors[0] : C.bark}88`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                opacity,
                transition: 'all 0.4s ease',
                zIndex: isHovered ? 10 : 1,
              }}
            >
              <span style={{ color: C.ivory, opacity: 0.9 }}>{typeIcons[ref.type]}</span>
              {isHovered && (
                <div
                  style={{
                    position: 'absolute' as const,
                    top: -36,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    whiteSpace: 'nowrap' as const,
                    background: C.void,
                    border: `1px solid ${C.bark}60`,
                    borderRadius: 8,
                    padding: '4px 10px',
                    fontSize: 11,
                    color: C.ivory,
                    fontFamily: SN,
                  }}
                >
                  {ref.title}
                </div>
              )}
            </div>
          );
        })}

        {/* Legend */}
        <div
          style={{
            position: 'absolute' as const,
            bottom: 16,
            right: 20,
            display: 'flex',
            gap: 14,
            fontSize: 9,
            color: C.ivoryMuted,
            fontFamily: SN,
          }}
        >
          {(
            [
              ['resonates', C.coral],
              ['extends', C.gold],
              ['inspired_by', C.lilac],
              ['same_world', C.bark],
            ] as [string, string][]
          ).map(([label, c]) => (
            <span key={label} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <span
                style={{
                  width: 14,
                  height: 2,
                  background: c,
                  display: 'inline-block',
                  borderRadius: 1,
                }}
              />
              {label}
            </span>
          ))}
        </div>
      </div>

      {/* Bridges & Gaps */}
      <div style={{ display: 'flex', gap: 20, marginTop: 32 }}>
        <Card style={{ flex: 1 }}>
          <p
            style={{
              fontSize: 10,
              textTransform: 'uppercase' as const,
              letterSpacing: '0.08em',
              color: C.gold,
              marginBottom: 12,
              fontFamily: SN,
            }}
          >
            Ponts les plus forts
          </p>
          {RELATIONS.filter((_, i) => i < 3).map((r, i) => {
            const fromRef = REFERENCES.find((x) => x.id === r.from);
            const toRef = REFERENCES.find((x) => x.id === r.to);
            return (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  marginBottom: 8,
                  fontSize: 12,
                  color: C.ivoryDim,
                  fontFamily: SN,
                }}
              >
                <span style={{ color: C.ivory }}>{fromRef?.title?.slice(0, 20)}</span>
                <span style={{ color: C.bark }}>\u2014</span>
                <span style={{ color: C.ivory }}>{toRef?.title?.slice(0, 20)}</span>
                <Badge>{r.label}</Badge>
              </div>
            );
          })}
        </Card>
        <Card style={{ flex: 1 }}>
          <p
            style={{
              fontSize: 10,
              textTransform: 'uppercase' as const,
              letterSpacing: '0.08em',
              color: C.cinnabar,
              marginBottom: 12,
              fontFamily: SN,
            }}
          >
            Lacunes d\u00e9tect\u00e9es
          </p>
          <p style={{ fontSize: 12, color: C.ivoryDim, lineHeight: 1.6, fontFamily: SN }}>
            Aucune r\u00e9f\u00e9rence cin\u00e9matographique ou d&apos;image en mouvement. Votre univers est enti\u00e8rement fixe \u2014 peinture,
            architecture, texte, son. Envisagez d&apos;ajouter une r\u00e9f\u00e9rence du cin\u00e9ma, de l&apos;art vid\u00e9o ou de
            l&apos;animation pour introduire la narration temporelle.
          </p>
          <p style={{ fontSize: 12, color: C.ivoryDim, lineHeight: 1.6, marginTop: 8, fontFamily: SN }}>
            Aucune personne vivante n&apos;est r\u00e9f\u00e9renc\u00e9e. Tous les cr\u00e9ateurs sont historiques. Ajouter une
            influence contemporaine r\u00e9v\u00e9lerait comment ces filiations vivent dans le pr\u00e9sent.
          </p>
        </Card>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   ITEM DETAIL VIEW
   ═══════════════════════════════════════════════════════ */
function ItemView({
  itemId,
  onBack,
  onSelectItem,
}: {
  itemId: string;
  onBack: () => void;
  onSelectItem: (id: string) => void;
}) {
  const item = REFERENCES.find((r) => r.id === itemId);
  if (!item) return null;

  const related = REFERENCES.filter((r) => item.relations?.includes(r.id));
  const itemRelations = RELATIONS.filter((r) => r.from === itemId || r.to === itemId);

  /* Contextual synergy reading */
  const contextCluster = CLUSTERS.find((cl) => cl.items.includes(itemId));
  const contextSynergy = contextCluster ? SYNERGIES.find((s) => s.cluster === contextCluster.id) : null;

  return (
    <div>
      <button
        onClick={onBack}
        style={{
          background: 'none',
          border: 'none',
          color: C.ivoryMuted,
          cursor: 'pointer',
          fontSize: 13,
          fontFamily: SN,
          marginBottom: 24,
          padding: 0,
          transition: 'color 0.3s ease',
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.color = C.ivory;
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.color = C.ivoryMuted;
        }}
      >
        \u2190 Retour
      </button>

      <div style={{ display: 'flex', gap: 32 }}>
        {/* Left: main item */}
        <div style={{ flex: 2 }}>
          {/* Image placeholder */}
          <div
            style={{
              width: '100%',
              height: 220,
              borderRadius: 16,
              background: `conic-gradient(from 30deg at 60% 40%, ${item.colors[0]}40, ${item.colors[1] || item.colors[0]}20, ${C.chamber}, ${item.colors[0]}15)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 24,
              border: `1px solid ${item.colors[0]}30`,
            }}
          >
            <span style={{ color: C.ivory, opacity: 0.5, transform: 'scale(3)' }}>{typeIcons[item.type]}</span>
          </div>

          {/* Type + year */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            <span style={{ color: item.colors[0] }}>{typeIcons[item.type]}</span>
            <span
              style={{
                fontSize: 10,
                textTransform: 'uppercase' as const,
                letterSpacing: '0.08em',
                color: C.ivoryMuted,
                fontFamily: SN,
              }}
            >
              {typeLabels[item.type]} \u00b7 {item.year}
            </span>
          </div>

          {/* Title + creator */}
          <h2
            style={{
              fontFamily: GR,
              fontSize: 28,
              fontWeight: 400,
              color: C.ivory,
              margin: '0 0 6px',
              lineHeight: 1.25,
            }}
          >
            {item.title}
          </h2>
          <p style={{ fontSize: 14, color: C.goldMuted, margin: '0 0 20px', fontFamily: SN }}>{item.creator}</p>

          {/* Note */}
          <p style={{ fontSize: 14, color: C.ivoryDim, lineHeight: 1.7, fontFamily: SN, marginBottom: 24 }}>{item.note}</p>

          {/* Colors + Intensity + Significance */}
          <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 16 }}>
            <div>
              <span
                style={{
                  fontSize: 9,
                  textTransform: 'uppercase' as const,
                  letterSpacing: '0.08em',
                  color: C.ivoryMuted,
                  fontFamily: SN,
                  display: 'block',
                  marginBottom: 6,
                }}
              >
                Colors
              </span>
              <div style={{ display: 'flex', gap: 4 }}>
                {item.colors.map((c, i) => (
                  <ColorDot key={i} color={c} size={16} />
                ))}
              </div>
            </div>
            <div>
              <span
                style={{
                  fontSize: 9,
                  textTransform: 'uppercase' as const,
                  letterSpacing: '0.08em',
                  color: C.ivoryMuted,
                  fontFamily: SN,
                  display: 'block',
                  marginBottom: 6,
                }}
              >
                Intensity
              </span>
              <IntensityBar value={item.intensity} />
            </div>
            <div>
              <span
                style={{
                  fontSize: 9,
                  textTransform: 'uppercase' as const,
                  letterSpacing: '0.08em',
                  color: C.ivoryMuted,
                  fontFamily: SN,
                  display: 'block',
                  marginBottom: 6,
                }}
              >
                Significance
              </span>
              <Badge color={item.significance === 'core' ? C.cinnabar : C.bark}>{item.significance}</Badge>
            </div>
          </div>

          {/* Tags */}
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' as const, marginBottom: 16 }}>
            {item.tags.map((t) => (
              <Badge key={t}>{t}</Badge>
            ))}
          </div>

          {/* Moods */}
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' as const }}>
            {item.moods.map((m) => (
              <Badge key={m} color={C.lilacDust}>
                {m}
              </Badge>
            ))}
          </div>
        </div>

        {/* Right: AI reading + relations */}
        <div style={{ flex: 1, minWidth: 260 }}>
          {/* Lecture IA */}
          <Card style={{ marginBottom: 20, borderColor: `${C.gold}30` }}>
            <p
              style={{
                fontSize: 10,
                textTransform: 'uppercase' as const,
                letterSpacing: '0.1em',
                color: C.gold,
                marginBottom: 10,
                fontFamily: SN,
              }}
            >
              Lecture IA \u2014 Owj
            </p>
            <p style={{ fontSize: 13, color: C.ivoryDim, lineHeight: 1.7, fontFamily: SN }}>
              This reference anchors your universe in the territory of {item.moods[0]} experience. It connects
              to {related.length} other items, forming a cluster around {item.tags[0]} and {item.tags[1]}. Its
              presence shifts the center of gravity of your graph toward{' '}
              {item.type === 'place' ? 'spatial' : item.type === 'book' ? 'textual' : 'sensory'} intelligence.
            </p>
            {contextSynergy && (
              <p style={{ fontSize: 12, color: C.ivoryMuted, lineHeight: 1.6, fontFamily: SN, marginTop: 12 }}>
                via {contextCluster?.name}
              </p>
            )}
          </Card>

          {/* Relations */}
          <p
            style={{
              fontSize: 10,
              textTransform: 'uppercase' as const,
              letterSpacing: '0.08em',
              color: C.ivoryMuted,
              marginBottom: 12,
              fontFamily: SN,
            }}
          >
            Relations
          </p>
          {itemRelations.map((rel, i) => {
            const otherId = rel.from === itemId ? rel.to : rel.from;
            const other = REFERENCES.find((r) => r.id === otherId);
            return (
              <div
                key={i}
                onClick={() => onSelectItem(otherId)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '10px 14px',
                  borderRadius: 12,
                  background: C.chamber,
                  border: `1px solid ${C.wood}40`,
                  marginBottom: 8,
                  cursor: 'pointer',
                  transition: 'border-color 0.3s',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = `${C.bark}88`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = `${C.wood}40`;
                }}
              >
                <span style={{ color: other?.colors[0] || C.ivory }}>{typeIcons[other?.type || 'artwork']}</span>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 12, color: C.ivory, margin: 0, fontFamily: SN }}>{other?.title}</p>
                  <p style={{ fontSize: 10, color: C.ivoryMuted, margin: 0, fontFamily: SN }}>
                    {rel.type.replace(/_/g, ' ')} \u00b7 {rel.label}
                  </p>
                </div>
              </div>
            );
          })}

          {/* Related Items */}
          <p
            style={{
              fontSize: 10,
              textTransform: 'uppercase' as const,
              letterSpacing: '0.08em',
              color: C.ivoryMuted,
              marginTop: 24,
              marginBottom: 12,
              fontFamily: SN,
            }}
          >
            Items reli\u00e9s
          </p>
          {related.map((rel) => (
            <div
              key={rel.id}
              onClick={() => onSelectItem(rel.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '10px 14px',
                borderRadius: 12,
                background: C.chamber,
                border: `1px solid ${C.wood}40`,
                marginBottom: 8,
                cursor: 'pointer',
                transition: 'border-color 0.3s',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = `${C.bark}88`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = `${C.wood}40`;
              }}
            >
              <span style={{ color: rel.colors[0] }}>{typeIcons[rel.type]}</span>
              <div>
                <p style={{ fontSize: 12, color: C.ivory, margin: 0, fontFamily: SN }}>{rel.title}</p>
                <p style={{ fontSize: 10, color: C.ivoryMuted, margin: 0, fontFamily: SN }}>{rel.creator}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   UNIVERSE VIEW
   ═══════════════════════════════════════════════════════ */
function UniverseView({
  onSelectItem,
  onOpenAdd,
}: {
  onSelectItem: (id: string) => void;
  onOpenAdd: () => void;
}) {
  const [filter, setFilter] = useState('all');
  const [layout, setLayout] = useState<'gallery' | 'list'>('gallery');
  const types = ['all', 'artwork', 'music', 'place', 'book'];
  const filtered = filter === 'all' ? REFERENCES : REFERENCES.filter((r) => r.type === filter);
  const recent = useMemo(() => [...REFERENCES].slice(-3).reverse(), []);

  return (
    <div>
      <SectionTitle sub="Vos gusheh \u2014 fragments m\u00e9lodiques de votre univers. Chaque item est un noeud de votre syst\u00e8me modal.">
        Votre Dastgah
      </SectionTitle>

      {/* Derniers Gusheh \u2014 horizontal snap carousel */}
      <div style={{ marginBottom: 36 }}>
        <p
          style={{
            fontSize: 10,
            textTransform: 'uppercase' as const,
            letterSpacing: '0.1em',
            color: C.goldMuted,
            marginBottom: 14,
            fontFamily: SN,
          }}
        >
          Derniers Gusheh
        </p>
        <div
          style={{
            display: 'flex',
            gap: 16,
            overflowX: 'auto' as const,
            scrollSnapType: 'x mandatory' as const,
            paddingBottom: 8,
            WebkitOverflowScrolling: 'touch' as const,
          }}
        >
          {recent.map((ref) => (
            <div
              key={ref.id}
              onClick={() => onSelectItem(ref.id)}
              style={{
                scrollSnapAlign: 'start' as const,
                minWidth: 240,
                maxWidth: 240,
                borderRadius: 16,
                overflow: 'hidden',
                background: C.walnut,
                border: `1px solid ${C.wood}50`,
                cursor: 'pointer',
                flexShrink: 0,
                transition: 'border-color 0.3s',
              }}
            >
              <div
                style={{
                  height: 140,
                  background: `conic-gradient(from 45deg at 75% 35%, ${ref.colors[0]}50, ${ref.colors[1] || ref.colors[0]}25, ${C.chamber}, ${ref.colors[0]}18)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <span style={{ color: C.ivory, opacity: 0.4, transform: 'scale(2)' }}>{typeIcons[ref.type]}</span>
              </div>
              <div style={{ padding: '14px 16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 6 }}>
                  <span style={{ color: ref.colors[0] }}>{typeIcons[ref.type]}</span>
                  <span
                    style={{
                      fontSize: 9,
                      textTransform: 'uppercase' as const,
                      color: C.ivoryMuted,
                      fontFamily: SN,
                      letterSpacing: '0.06em',
                    }}
                  >
                    {typeLabels[ref.type]}
                  </span>
                </div>
                <p
                  style={{
                    fontSize: 14,
                    color: C.ivory,
                    margin: '0 0 3px',
                    fontFamily: GR,
                    fontWeight: 500,
                  }}
                >
                  {ref.title}
                </p>
                <p style={{ fontSize: 11, color: C.ivoryMuted, margin: 0, fontFamily: SN }}>{ref.creator}</p>
                <div style={{ display: 'flex', gap: 3, marginTop: 10 }}>
                  {ref.colors.map((c, i) => (
                    <ColorDot key={i} color={c} size={8} />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Filters + layout toggle */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' as const, alignItems: 'center' }}>
        {types.map((t) => (
          <button
            key={t}
            onClick={() => setFilter(t)}
            style={{
              background: filter === t ? C.wood : 'transparent',
              color: filter === t ? C.ivory : C.ivoryMuted,
              border: `1px solid ${filter === t ? C.bark : C.wood}55`,
              borderRadius: 16,
              padding: '6px 16px',
              fontSize: 12,
              fontFamily: SN,
              cursor: 'pointer',
              textTransform: 'capitalize' as const,
              transition: 'all 0.3s',
            }}
          >
            {t === 'all' ? `All (${REFERENCES.length})` : typeLabels[t]}
          </button>
        ))}
        <div style={{ flex: 1 }} />
        <div style={{ display: 'flex', gap: 2, background: `${C.wood}40`, borderRadius: 10, padding: 2 }}>
          {(['gallery', 'list'] as const).map((l) => (
            <button
              key={l}
              onClick={() => setLayout(l)}
              style={{
                background: layout === l ? C.wood : 'transparent',
                color: layout === l ? C.ivory : C.ivoryMuted,
                border: 'none',
                borderRadius: 8,
                padding: '4px 12px',
                fontSize: 11,
                fontFamily: SN,
                cursor: 'pointer',
                textTransform: 'capitalize' as const,
              }}
            >
              {l}
            </button>
          ))}
        </div>
        <button
          onClick={onOpenAdd}
          style={{
            background: C.cinnabar,
            color: C.ivory,
            border: 'none',
            borderRadius: 16,
            padding: '6px 20px',
            fontSize: 12,
            fontFamily: SN,
            cursor: 'pointer',
            letterSpacing: '0.04em',
          }}
        >
          + Ajouter un Gusheh
        </button>
      </div>

      {/* Cluster bar */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 32, flexWrap: 'wrap' as const }}>
        {CLUSTERS.map((cl) => {
          const clItems = REFERENCES.filter((r) => cl.items.includes(r.id));
          return (
            <div
              key={cl.id}
              style={{
                flex: 1,
                minWidth: 180,
                padding: '12px 16px',
                borderRadius: 14,
                border: `1px solid ${cl.color}30`,
                background: `${cl.color}08`,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: cl.color }} />
                <span style={{ fontSize: 12, color: C.ivory, fontFamily: GR }}>{cl.name}</span>
              </div>
              <div style={{ display: 'flex', marginBottom: 4 }}>
                {clItems.map((item, idx) => (
                  <div
                    key={item.id}
                    style={{
                      width: 18,
                      height: 18,
                      borderRadius: 6,
                      background: item.colors[0],
                      border: `1.5px solid ${C.walnut}`,
                      marginLeft: idx > 0 ? -4 : 0,
                      zIndex: clItems.length - idx,
                    }}
                  />
                ))}
              </div>
              <span style={{ fontSize: 10, color: C.ivoryMuted, fontFamily: SN }}>{cl.items.length} items</span>
            </div>
          );
        })}
      </div>

      {/* Gallery layout \u2014 masonry with CSS columns */}
      {layout === 'gallery' && (
        <div style={{ columnCount: 2, columnGap: 16 }}>
          {filtered.map((ref) => {
            const heights: Record<string, number> = { artwork: 260, music: 200, place: 240, book: 180, person: 200 };
            const h = heights[ref.type] || 200;
            return (
              <div
                key={ref.id}
                onClick={() => onSelectItem(ref.id)}
                style={{
                  breakInside: 'avoid' as const,
                  marginBottom: 16,
                  borderRadius: 16,
                  overflow: 'hidden',
                  background: C.walnut,
                  border: `1px solid ${C.wood}50`,
                  cursor: 'pointer',
                  transition: 'border-color 0.3s, transform 0.3s',
                }}
              >
                <div
                  style={{
                    height: h,
                    background: `conic-gradient(from 10deg at 20% 60%, ${ref.colors[0]}45, ${C.chamber}, ${ref.colors[1] || ref.colors[0]}20, ${ref.colors[0]}15)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative' as const,
                  }}
                >
                  <span style={{ color: C.ivory, opacity: 0.3, transform: 'scale(2.5)' }}>{typeIcons[ref.type]}</span>
                  <div
                    style={{
                      position: 'absolute' as const,
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: 3,
                      background: `linear-gradient(90deg, ${ref.colors[0]}, transparent)`,
                      opacity: ref.intensity / 10,
                    }}
                  />
                </div>
                <div style={{ padding: '14px 16px 16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 6 }}>
                    <span style={{ color: ref.colors[0] }}>{typeIcons[ref.type]}</span>
                    <span
                      style={{
                        fontSize: 9,
                        textTransform: 'uppercase' as const,
                        color: C.ivoryMuted,
                        fontFamily: SN,
                        letterSpacing: '0.06em',
                      }}
                    >
                      {typeLabels[ref.type]} \u00b7 {ref.year}
                    </span>
                    <div style={{ marginLeft: 'auto' }}>
                      <Badge color={ref.significance === 'core' ? C.cinnabar : C.bark}>{ref.significance}</Badge>
                    </div>
                  </div>
                  <p
                    style={{
                      fontSize: 16,
                      color: C.ivory,
                      margin: '0 0 3px',
                      fontFamily: GR,
                      fontWeight: 500,
                      lineHeight: 1.25,
                    }}
                  >
                    {ref.title}
                  </p>
                  <p style={{ fontSize: 11, color: C.ivoryMuted, margin: '0 0 10px', fontFamily: SN }}>{ref.creator}</p>
                  <div style={{ display: 'flex', gap: 3, alignItems: 'center' }}>
                    {ref.colors.map((c, i) => (
                      <ColorDot key={i} color={c} size={8} />
                    ))}
                    <span style={{ width: 8 }} />
                    <IntensityBar value={ref.intensity} />
                  </div>
                  {ref.relations && ref.relations.length > 0 && (
                    <p style={{ fontSize: 10, color: C.bark, marginTop: 8, fontFamily: SN }}>
                      {ref.relations.length} connection{ref.relations.length > 1 ? 's' : ''}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* List layout */}
      {layout === 'list' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {filtered.map((ref) => (
            <Card key={ref.id} hoverable onClick={() => onSelectItem(ref.id)} style={{ padding: 16 }}>
              <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 12,
                    background: `conic-gradient(from 60deg at 50% 50%, ${ref.colors[0]}40, ${ref.colors[1] || ref.colors[0]}20, ${ref.colors[0]}10)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <span style={{ color: C.ivory, opacity: 0.5 }}>{typeIcons[ref.type]}</span>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: 14, color: C.ivory, margin: 0, fontFamily: GR, fontWeight: 500 }}>{ref.title}</p>
                  <p style={{ fontSize: 11, color: C.ivoryMuted, margin: 0, fontFamily: SN }}>
                    {ref.creator} \u00b7 {ref.year}
                  </p>
                </div>
                <div style={{ display: 'flex', gap: 3 }}>
                  {ref.colors.map((c, i) => (
                    <ColorDot key={i} color={c} size={8} />
                  ))}
                </div>
                <IntensityBar value={ref.intensity} />
                <Badge color={ref.significance === 'core' ? C.cinnabar : C.bark}>{ref.significance}</Badge>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   SYNERGIES VIEW
   ═══════════════════════════════════════════════════════ */
function SynergiesView({ onSelectItem }: { onSelectItem: (id: string) => void }) {
  return (
    <div>
      <SectionTitle sub="L'IA lit vos sho'beh, nomme leur logique cach\u00e9e, r\u00e9v\u00e8le les tensions manquantes et g\u00e9n\u00e8re des pistes cr\u00e9atives.">
        Synergies
      </SectionTitle>

      {SYNERGIES.map((syn, idx) => {
        const cluster = CLUSTERS.find((c) => c.id === syn.cluster);
        const clusterItems = REFERENCES.filter((r) => cluster?.items.includes(r.id));

        return (
          <div key={idx} style={{ marginBottom: 40 }}>
            <Card>
              {/* Cluster header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: cluster?.color }} />
                <h3 style={{ fontFamily: GR, fontSize: 22, fontWeight: 400, color: C.ivory, margin: 0 }}>
                  {cluster?.name}
                </h3>
                <span style={{ fontSize: 11, color: C.ivoryMuted, fontFamily: SN, marginLeft: 'auto' }}>
                  {clusterItems.length} items
                </span>
              </div>

              {/* Cluster items */}
              <div style={{ display: 'flex', gap: 10, marginBottom: 20, flexWrap: 'wrap' as const }}>
                {clusterItems.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => onSelectItem(item.id)}
                    style={{
                      flex: 1,
                      minWidth: 140,
                      padding: '10px 14px',
                      borderRadius: 12,
                      background: C.chamber,
                      border: `1px solid ${cluster?.color}20`,
                      cursor: 'pointer',
                      transition: 'border-color 0.3s',
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = `${cluster?.color}60`;
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = `${cluster?.color}20`;
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ color: item.colors[0] }}>{typeIcons[item.type]}</span>
                      <span style={{ fontSize: 12, color: C.ivory, fontFamily: SN }}>{item.title}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Lecture IA \u2014 Owj */}
              <div
                style={{
                  background: `${cluster?.color}08`,
                  border: `1px solid ${cluster?.color}18`,
                  borderRadius: 14,
                  padding: 20,
                  marginBottom: 16,
                }}
              >
                <p
                  style={{
                    fontSize: 10,
                    textTransform: 'uppercase' as const,
                    letterSpacing: '0.1em',
                    color: cluster?.color,
                    marginBottom: 10,
                    fontFamily: SN,
                  }}
                >
                  Lecture IA \u2014 Owj
                </p>
                <p style={{ fontSize: 14, color: C.ivoryDim, lineHeight: 1.75, fontFamily: SN }}>{syn.reading}</p>
              </div>

              {/* Tension Manquante */}
              <div
                style={{
                  background: `${C.cinnabar}08`,
                  border: `1px solid ${C.cinnabar}18`,
                  borderRadius: 14,
                  padding: 20,
                  marginBottom: 16,
                }}
              >
                <p
                  style={{
                    fontSize: 10,
                    textTransform: 'uppercase' as const,
                    letterSpacing: '0.1em',
                    color: C.coral,
                    marginBottom: 10,
                    fontFamily: SN,
                  }}
                >
                  Tension Manquante
                </p>
                <p style={{ fontSize: 14, color: C.ivoryDim, lineHeight: 1.75, fontFamily: SN }}>{syn.tension}</p>
              </div>

              {/* Graines d'id\u00e9es */}
              <p
                style={{
                  fontSize: 10,
                  textTransform: 'uppercase' as const,
                  letterSpacing: '0.1em',
                  color: C.gold,
                  marginBottom: 12,
                  fontFamily: SN,
                }}
              >
                Graines d&apos;id\u00e9es
              </p>
              {syn.seeds.map((seed, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 10,
                    marginBottom: 10,
                    padding: '10px 14px',
                    borderRadius: 12,
                    background: `${C.gold}06`,
                    border: `1px solid ${C.gold}15`,
                  }}
                >
                  <span
                    style={{
                      fontSize: 11,
                      color: C.goldMuted,
                      fontFamily: SN,
                      fontWeight: 600,
                      flexShrink: 0,
                      marginTop: 1,
                    }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p style={{ fontSize: 13, color: C.ivoryDim, lineHeight: 1.6, fontFamily: SN, margin: 0 }}>{seed}</p>
                </div>
              ))}
            </Card>
          </div>
        );
      })}

      {/* Identity Mirror */}
      <Card style={{ borderColor: `${C.lilac}25` }}>
        <p
          style={{
            fontSize: 10,
            textTransform: 'uppercase' as const,
            letterSpacing: '0.1em',
            color: C.lilac,
            marginBottom: 12,
            fontFamily: SN,
          }}
        >
          Identity Mirror
        </p>
        <p
          style={{
            fontFamily: GR,
            fontSize: 20,
            fontWeight: 300,
            fontStyle: 'italic',
            color: C.ivory,
            lineHeight: 1.5,
            marginBottom: 12,
          }}
        >
          Your universe reveals a mind that thinks through environments rather than arguments.
        </p>
        <p style={{ fontSize: 14, color: C.ivoryDim, lineHeight: 1.75, fontFamily: SN }}>
          The dominant cognitive mode is spatial-phenomenological: you understand ideas through the rooms they inhabit,
          the light they receive, and the textures they carry. This is not a weakness of abstraction \u2014 it is a different
          kind of precision. Your graph suggests that you design from atmosphere inward, not from structure outward. The
          strongest creative direction implied by this universe is immersive experience design: installation,
          architecture, brand environments, or editorial spaces where the medium is the mood itself.
        </p>
      </Card>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   ADD MODAL
   ═══════════════════════════════════════════════════════ */
function AddModal({ onClose }: { onClose: () => void }) {
  return (
    <div
      style={{
        position: 'fixed' as const,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `${C.void}E0`,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: 480,
          maxHeight: '80vh',
          background: C.walnut,
          borderRadius: 16,
          border: `1px solid ${C.wood}60`,
          padding: 36,
          overflow: 'auto' as const,
        }}
      >
        <h3
          style={{
            fontFamily: GR,
            fontSize: 24,
            fontWeight: 400,
            fontStyle: 'italic',
            color: C.ivory,
            margin: '0 0 24px',
          }}
        >
          Ajouter un Gusheh
        </h3>

        {[
          { label: 'Titre', placeholder: "Le nom de cette influence" },
          { label: 'Cr\u00e9ateur', placeholder: "Qui l'a cr\u00e9\u00e9" },
        ].map(({ label, placeholder }) => (
          <div key={label} style={{ marginBottom: 16 }}>
            <label
              style={{
                display: 'block',
                fontSize: 10,
                textTransform: 'uppercase' as const,
                letterSpacing: '0.08em',
                color: C.ivoryMuted,
                marginBottom: 6,
                fontFamily: SN,
              }}
            >
              {label}
            </label>
            <input
              placeholder={placeholder}
              style={{
                width: '100%',
                background: C.chamber,
                border: `1px solid ${C.wood}50`,
                borderRadius: 12,
                padding: '10px 14px',
                color: C.ivory,
                fontSize: 14,
                fontFamily: SN,
                outline: 'none',
                boxSizing: 'border-box' as const,
              }}
            />
          </div>
        ))}

        {/* Type buttons */}
        <div style={{ marginBottom: 16 }}>
          <label
            style={{
              display: 'block',
              fontSize: 10,
              textTransform: 'uppercase' as const,
              letterSpacing: '0.08em',
              color: C.ivoryMuted,
              marginBottom: 6,
              fontFamily: SN,
            }}
          >
            Type
          </label>
          <div style={{ display: 'flex', gap: 8 }}>
            {(['artwork', 'book', 'music', 'place', 'person'] as const).map((t) => (
              <button
                key={t}
                style={{
                  flex: 1,
                  background: C.chamber,
                  border: `1px solid ${C.wood}50`,
                  borderRadius: 10,
                  padding: '8px 4px',
                  color: C.ivoryMuted,
                  fontSize: 11,
                  fontFamily: SN,
                  cursor: 'pointer',
                  textTransform: 'capitalize' as const,
                  display: 'flex',
                  flexDirection: 'column' as const,
                  alignItems: 'center',
                  gap: 4,
                }}
              >
                <span style={{ color: C.ivoryMuted }}>{typeIcons[t]}</span>
                {typeLabels[t]}
              </button>
            ))}
          </div>
        </div>

        {/* Note */}
        <div style={{ marginBottom: 20 }}>
          <label
            style={{
              display: 'block',
              fontSize: 10,
              textTransform: 'uppercase' as const,
              letterSpacing: '0.08em',
              color: C.ivoryMuted,
              marginBottom: 6,
              fontFamily: SN,
            }}
          >
            Note Personnelle
          </label>
          <textarea
            placeholder="Pourquoi cette influence compte-t-elle pour vous ?"
            rows={3}
            style={{
              width: '100%',
              background: C.chamber,
              border: `1px solid ${C.wood}50`,
              borderRadius: 12,
              padding: '10px 14px',
              color: C.ivory,
              fontSize: 14,
              fontFamily: SN,
              outline: 'none',
              resize: 'vertical' as const,
              boxSizing: 'border-box' as const,
            }}
          />
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: 12 }}>
          <button
            onClick={onClose}
            style={{
              flex: 1,
              background: 'none',
              border: `1px solid ${C.wood}50`,
              borderRadius: 14,
              padding: '10px',
              color: C.ivoryMuted,
              fontSize: 13,
              fontFamily: SN,
              cursor: 'pointer',
            }}
          >
            Annuler
          </button>
          <button
            onClick={onClose}
            style={{
              flex: 1,
              background: C.cinnabar,
              border: 'none',
              borderRadius: 14,
              padding: '10px',
              color: C.ivory,
              fontSize: 13,
              fontFamily: SN,
              cursor: 'pointer',
            }}
          >
            Ajouter au Dastgah
          </button>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   MAIN EXPORT — DastgahUniverse
   ═══════════════════════════════════════════════════════ */
export default function DastgahUniverse() {
  const [view, setView] = useState<'universe' | 'graph' | 'synergies' | 'item'>('universe');
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [addOpen, setAddOpen] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setFadeIn(false);
    const t = setTimeout(() => setFadeIn(true), 30);
    return () => clearTimeout(t);
  }, [view, selectedItem]);

  const navigateTo = useCallback((v: 'universe' | 'graph' | 'synergies') => {
    setSelectedItem(null);
    setView(v);
  }, []);

  const selectItem = useCallback((id: string) => {
    setSelectedItem(id);
    setView('item');
  }, []);

  return (
    <div style={{ color: C.ivory, fontFamily: SN }}>
      {/* Inner navigation tabs */}
      <nav
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 32,
        }}
      >
        <div style={{ display: 'flex', gap: 4 }}>
          {(
            [
              ['universe', 'Univers'],
              ['graph', 'Graphe'],
              ['synergies', 'Synergies'],
            ] as const
          ).map(([key, label]) => (
            <button
              key={key}
              onClick={() => navigateTo(key)}
              style={{
                background: view === key || (view === 'item' && key === 'universe') ? C.wood : 'transparent',
                color: view === key || (view === 'item' && key === 'universe') ? C.ivory : C.ivoryMuted,
                border: 'none',
                borderRadius: 12,
                padding: '6px 16px',
                fontSize: 12,
                fontFamily: SN,
                cursor: 'pointer',
                transition: 'all 0.3s',
              }}
            >
              {label}
            </button>
          ))}
        </div>

        <button
          onClick={() => setAddOpen(true)}
          style={{
            background: C.cinnabar,
            color: C.ivory,
            border: 'none',
            borderRadius: 14,
            padding: '7px 18px',
            fontSize: 12,
            fontFamily: SN,
            cursor: 'pointer',
            transition: 'opacity 0.3s ease',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.opacity = '0.85';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.opacity = '1';
          }}
        >
          + Ajouter un Gusheh
        </button>
      </nav>

      {/* Content area with fade */}
      <div
        style={{
          opacity: fadeIn ? 1 : 0,
          transform: fadeIn ? 'translateY(0)' : 'translateY(8px)',
          transition: 'opacity 0.5s ease, transform 0.5s ease',
        }}
      >
        {view === 'universe' && <UniverseView onSelectItem={selectItem} onOpenAdd={() => setAddOpen(true)} />}
        {view === 'graph' && <GraphView onSelectItem={selectItem} />}
        {view === 'synergies' && <SynergiesView onSelectItem={selectItem} />}
        {view === 'item' && selectedItem && (
          <ItemView itemId={selectedItem} onBack={() => navigateTo('universe')} onSelectItem={selectItem} />
        )}
      </div>

      {/* Add Modal */}
      {addOpen && <AddModal onClose={() => setAddOpen(false)} />}
    </div>
  );
}
