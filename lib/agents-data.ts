export type AgentLayer = 'L1' | 'L1.5' | 'L2' | 'L3' | 'L4' | 'OPS';
export type AgentPole =
  | 'Neurosciences & Santé'
  | 'IA & Ingénierie'
  | 'Données & Conformité'
  | 'Marché & Acquisition'
  | 'Communication & Design'
  | 'Raqib'
  | 'Viz'
  | 'Réserve';
export type AgentPlatform = 'Claude' | 'GPT' | 'Gemini' | 'Mistral' | 'Qwen' | 'DeepSeek';
export type AgentStatus = 'Actif' | 'En attente' | 'Erreur' | 'Inactif';

export interface Agent {
  id: string;
  name: string;
  layer: AgentLayer;
  pole: AgentPole;
  platform: AgentPlatform;
  fallback: string;
  model: string;
  instructions: string;
  tone: string;
  languages: string[];
  perimeter: string;
  knowledge: string;
  status: AgentStatus;
  lastRunAt: string;
  entriesProduced: number;
  errorCount: number;
}

const BASE_TIME = Date.parse('2026-03-31T12:00:00.000Z');

const PLATFORM_DEFAULTS: Record<AgentPlatform, { fallback: string; model: string }> = {
  Claude: { fallback: 'Perplexity', model: 'Claude Opus 4.6' },
  GPT: { fallback: 'Claude', model: 'GPT-5.2' },
  Gemini: { fallback: 'GPT', model: 'Gemini 3 Pro' },
  Mistral: { fallback: 'Claude', model: 'Mistral Large' },
  Qwen: { fallback: 'DeepSeek', model: 'Qwen 2.5' },
  DeepSeek: { fallback: 'Claude', model: 'DeepSeek R1' },
};

function buildAgents(): Agent[] {
  const agents: Agent[] = [];

  const addAgent = (partial: Partial<Agent>) => {
    const index = agents.length + 1;
    const padId = index.toString().padStart(3, '0');
    const platform = partial.platform ?? 'Claude';
    const defaults = PLATFORM_DEFAULTS[platform];

    agents.push({
      id: partial.id ?? `#${padId}`,
      name: partial.name ?? `Agent ${padId}`,
      layer: partial.layer ?? 'L1',
      pole: partial.pole ?? 'Réserve',
      platform,
      fallback: partial.fallback ?? defaults.fallback,
      model: partial.model ?? defaults.model,
      instructions:
        partial.instructions ??
        "Instructions d'exécution standards. Vérifier les sources, structurer la sortie et remonter les risques avant publication.",
      tone: partial.tone ?? 'Technique',
      languages: partial.languages ?? ['FR', 'EN'],
      perimeter: partial.perimeter ?? 'EIGEN OS',
      knowledge: partial.knowledge ?? 'Base de données souveraine Raqib',
      status: partial.status ?? 'En attente',
      lastRunAt:
        partial.lastRunAt ??
        new Date(BASE_TIME - index * 45 * 60 * 1000).toISOString(),
      entriesProduced: partial.entriesProduced ?? Math.max(12, 1800 - index * 7),
      errorCount: partial.errorCount ?? 0,
    });
  };

  const collectors = ['noos', 'aelya', 'myne', 'burhan', 'yrknown', 'diwane', 'alguesov', 'amana', 'cg', 'cercle'];
  const vizNames = ['viz-charts', 'viz-maps', 'viz-tables', 'viz-networks', 'viz-timelines', 'viz-dashboards'];

  // L1 (120)
  const neuroNames = [
    'Calibrateur NOOS',
    'Architecte UX patient',
    'Neuroscientifique computationnel',
    'Chercheur SCID-5',
    'Ingénieur NLP clinique',
    'Data engineer MYNE',
    'Spécialiste observance',
    'Chercheur fertilité LALLA',
    'Spécialiste trauma SAWT',
    'Analyste addictologie NAFAS',
  ];
  neuroNames.forEach((name, index) =>
    addAgent({
      id: `#NOOS-${String(index + 1).padStart(2, '0')}`,
      name,
      layer: 'L1',
      pole: 'Neurosciences & Santé',
      platform: 'Claude',
      status: 'En attente',
    }),
  );

  const engineeringNames = [
    'Ingénieur Rust NOOS',
    'Ingénieur TypeScript API',
    'Ingénieur React portails',
    'Architecte BURHAN Solidity',
    'Ingénieur AELYA ZKP',
    'DevSecOps',
    'DBA PostgreSQL',
    'Ingénieur MLX/LoRA',
    'QA automaticien',
    'Ingénieur MCP/A2A',
    'Architecte Web 4.0',
    'Ingénieur mobile React Native',
  ];
  engineeringNames.forEach((name) =>
    addAgent({
      name,
      layer: 'L1',
      pole: 'IA & Ingénierie',
      platform: 'GPT',
      model: 'GPT-5.2',
    }),
  );

  const dataNames = [
    'DPO RGPD',
    'Analyste AI Act',
    'Analyste MiCA',
    'Spécialiste ISO 13485',
    'Cartographe données',
    'Analyste KYC/AML',
    'Veilleur réglementaire',
    'Data quality analyst',
  ];
  dataNames.forEach((name) =>
    addAgent({
      name,
      layer: 'L1',
      pole: 'Données & Conformité',
      platform: 'Gemini',
      model: 'Gemini 3 Pro',
    }),
  );

  const marketNames = [
    'Analyste concurrentiel NOOS',
    'Analyste TAM/SAM/SOM',
    'Chasseur VC',
    'Profiler GITEX',
    'Rédacteur pitch deck',
    'Analyste M&A',
    'Business developer corridor',
    'Growth hacker',
    'Pricing analyst',
    'LP relationship manager',
  ];
  marketNames.forEach((name) =>
    addAgent({
      name,
      layer: 'L1',
      pole: 'Marché & Acquisition',
      platform: 'Mistral',
      model: 'Mistral Large',
    }),
  );

  const communicationNames = [
    'Rédacteur content FR',
    'Rédacteur content EN',
    'Designer UI/UX',
    'Vidéaste motion',
    'Community manager',
    'PR/Media',
    'Traducteur AR/FR',
    'Brand strategist',
  ];
  communicationNames.forEach((name) =>
    addAgent({
      name,
      layer: 'L1',
      pole: 'Communication & Design',
      platform: 'Claude',
      model: 'Claude Sonnet',
    }),
  );

  collectors.forEach((collector) =>
    addAgent({
      id: `#${collector.toUpperCase()}-COL`,
      name: `Collector ${collector}`.toUpperCase(),
      layer: 'L1',
      pole: 'Raqib',
      platform: 'DeepSeek',
      model: 'DeepSeek R1',
      status: 'Actif',
      entriesProduced: 2200 - agents.length * 4,
    }),
  );

  vizNames.forEach((name) =>
    addAgent({
      name,
      layer: 'L1',
      pole: 'Viz',
      platform: 'Qwen',
      model: 'Qwen 2.5',
    }),
  );

  for (let index = 0; index < 56; index += 1) {
    const reservePlatform: AgentPlatform[] = ['Claude', 'GPT', 'Gemini'];
    addAgent({
      name: `Agent Réserve Alpha ${index + 1}`,
      layer: 'L1',
      pole: 'Réserve',
      platform: reservePlatform[index % reservePlatform.length],
      status: 'Inactif',
      entriesProduced: 80 + index,
    });
  }

  // L1.5 (72)
  const terminologyTerms = ['FR', 'EN', 'AR', 'OHADA', 'UE', 'MA', 'Corridor'];
  terminologyTerms.forEach((term, index) =>
    addAgent({
      id: `SA${String(index + 1).padStart(2, '0')}`,
      name: `Vérificateur terminologique ${term}`,
      layer: 'L1.5',
      pole: 'Données & Conformité',
      platform: 'Claude',
      status: 'En attente',
    }),
  );

  const factualDomains = ['santé', 'finance', 'juridique', 'tech', 'géo', 'marché', 'science'];
  factualDomains.forEach((domain, index) =>
    addAgent({
      id: `SA${String(index + 8).padStart(2, '0')}`,
      name: `Vérificateur factuel ${domain}`,
      layer: 'L1.5',
      pole: 'Données & Conformité',
      platform: 'Gemini',
      model: 'Gemini 3 Pro',
    }),
  );

  const codeDomains = ['Rust', 'TypeScript', 'Solidity', 'Python', 'React', 'SQL', 'infra', 'API', 'perf', 'sécu'];
  codeDomains.forEach((domain, index) =>
    addAgent({
      id: `SA${String(index + 15).padStart(2, '0')}`,
      name: `Vérificateur code ${domain}`,
      layer: 'L1.5',
      pole: 'IA & Ingénierie',
      platform: 'GPT',
      model: 'GPT-5.2',
    }),
  );

  for (let index = 1; index <= 16; index += 1) {
    addAgent({
      id: `SA${index + 24}`,
      name: `QA Adversariale Unité ${index}`,
      layer: 'L1.5',
      pole: 'IA & Ingénierie',
      platform: 'Qwen',
      model: 'Qwen 2.5',
    });
  }

  for (let index = 0; index < 32; index += 1) {
    addAgent({
      id: `SV${String(index + 1).padStart(2, '0')}`,
      name: `Superviseur qualité L1.5 ${index + 1}`,
      layer: 'L1.5',
      pole: index % 2 === 0 ? 'Réserve' : 'Données & Conformité',
      platform: index % 2 === 0 ? 'Claude' : 'Gemini',
      status: index % 3 === 0 ? 'Inactif' : 'En attente',
      entriesProduced: 40 + index,
    });
  }

  // L2 (6) -> active to total exactly 16 active agents with the 10 collectors
  const l2Names = ['Superviseur NOOS', 'AELYA/MYNE', 'BURHAN/YrKnown', 'DIWANE/AlgueSov', 'CG/Cercle', 'AMANA'];
  l2Names.forEach((name) =>
    addAgent({
      name,
      layer: 'L2',
      pole: 'Raqib',
      platform: 'Claude',
      model: 'Claude Opus 4.6',
      status: 'Actif',
      entriesProduced: 950,
    }),
  );

  // L3 (3)
  ['Planificateur', 'Reporter', 'Optimiseur'].forEach((name, index) =>
    addAgent({
      name,
      layer: 'L3',
      pole: 'Raqib',
      platform: index === 0 ? 'Claude' : 'GPT',
      status: 'En attente',
      entriesProduced: 420 - index * 30,
    }),
  );

  // L4 (8)
  addAgent({
    name: 'Mehdi (Fondateur)',
    layer: 'L4',
    pole: 'Raqib',
    platform: 'Claude',
    status: 'En attente',
    entriesProduced: 320,
  });
  [
    'Rust',
    'Psychométricien',
    'Réglementaire',
    'Chief of Staff',
    'Data Science',
    'Blockchain',
    'Biotech',
  ].forEach((domain, index) =>
    addAgent({
      name: `Architecte Stagiaire ${domain} (À recruter)`,
      layer: 'L4',
      pole: 'Réserve',
      platform: index % 2 === 0 ? 'Claude' : 'GPT',
      status: 'Inactif',
      entriesProduced: 10 + index,
    }),
  );

  // OPS (28)
  const opsNames = [
    'scaffold',
    'data-extract',
    'components',
    'api-routes',
    'assembly',
    'qa',
    'verif',
    'supervisor-local',
    'raqib-supervisor',
    'eigen-collector',
    ...collectors.map((collector) => `${collector}-collector`),
    ...vizNames.map((name) => `${name}-gen`),
    'artifact-sync',
    'release-notifier',
  ];

  opsNames.forEach((name, index) =>
    addAgent({
      name: `ops-${name}`,
      layer: 'OPS',
      pole: 'Raqib',
      platform: 'GPT',
      model: index % 2 === 0 ? 'GPT-4o' : 'GPT-5.2',
      status: index % 5 === 0 ? 'Inactif' : 'En attente',
      entriesProduced: 210 - index * 3,
    }),
  );

  return agents;
}

export const agentsData: Agent[] = buildAgents();
