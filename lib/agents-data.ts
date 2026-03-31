export type AgentLayer = 'L1' | 'L1.5' | 'L2' | 'L3' | 'L4' | 'OPS';
export type AgentPole = 'Neurosciences & Santé' | 'IA & Ingénierie' | 'Données & Conformité' | 'Marché & Acquisition' | 'Communication & Design' | 'Raqib' | 'Viz' | 'Réserve';
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

const generateMockData = (): Agent[] => {
  const agents: Agent[] = [];
  
  const addAgent = (partial: Partial<Agent>) => {
    const idNum = agents.length + 1;
    const padId = idNum.toString().padStart(3, '0');
    agents.push({
      id: partial.id || `#${padId}`,
      name: partial.name || `Agent ${padId}`,
      layer: partial.layer || 'L1',
      pole: partial.pole || 'Réserve',
      platform: partial.platform || 'Claude',
      fallback: partial.fallback || 'Perplexity',
      model: partial.model || 'Claude Opus 4.6',
      instructions: partial.instructions || 'Instructions standards d\'exécution et de classification. Vérification des sources de données avant production. Format de sortie JSON structuré.',
      tone: partial.tone || 'Technique',
      languages: partial.languages || ['FR', 'EN'],
      perimeter: partial.perimeter || 'EIGEN OS',
      knowledge: partial.knowledge || 'Base de données générale Raqib',
      status: partial.status || 'Inactif',
      lastRunAt: partial.lastRunAt || new Date(Date.now() - Math.random() * 100000000).toISOString(),
      entriesProduced: partial.entriesProduced ?? Math.floor(Math.random() * 1000),
      errorCount: partial.errorCount ?? (Math.random() > 0.9 ? 1 : 0),
    });
  };

  // L1 Pôle Neurosciences & Santé (10)
  const neuroNames = ['Calibrateur NOOS', 'Architecte UX patient', 'Neuroscientifique computationnel', 'Chercheur SCID-5', 'Ingénieur NLP clinique', 'Data engineer MYNε', 'Spécialiste observance', 'Chercheur fertilité LALLA', 'Spécialiste trauma SAWT', 'Analyste addictologie NAFAS'];
  neuroNames.forEach((n, i) => addAgent({
    id: `#NOOS-${(i+1).toString().padStart(2, '0')}`, name: n, layer: 'L1', pole: 'Neurosciences & Santé', platform: 'Claude', model: 'Claude Opus 4.6', status: i === 0 ? 'Actif' : 'En attente'
  }));

  // L1 IA & Ingénierie (12)
  const iaNames = ['Ingénieur Rust NOOS', 'Ingénieur TypeScript API', 'Ingénieur React portails', 'Architecte BURHAN Solidity', 'Ingénieur ÆLYA ZKP', 'DevSecOps', 'DBA PostgreSQL', 'Ingénieur MLX/LoRA', 'QA automaticien', 'Ingénieur MCP/A2A', 'Architecte Web 4.0', 'Ingénieur mobile React Native'];
  iaNames.forEach(n => addAgent({ name: n, layer: 'L1', pole: 'IA & Ingénierie', platform: 'GPT', model: 'GPT-5.2' }));

  // L1 Données & Conformité (8)
  const dataNames = ['DPO RGPD', 'Analyste AI Act', 'Analyste MiCA', 'Spécialiste ISO 13485', 'Cartographe données', 'Analyst KYC/AML', 'Veilleur réglementaire', 'Data quality analyst'];
  dataNames.forEach(n => addAgent({ name: n, layer: 'L1', pole: 'Données & Conformité', platform: 'Gemini', model: 'Gemini 3 Pro' }));

  // L1 Marché & Acquisition (10)
  const marketNames = ['Analyste concurrentiel NOOS', 'Analyste TAM/SAM/SOM', 'Chasseur VC', 'Profiler GITEX', 'Rédacteur pitch deck', 'Analyste M&A', 'Business developer corridor', 'Growth hacker', 'Pricing analyst', 'LP relationship manager'];
  marketNames.forEach(n => addAgent({ name: n, layer: 'L1', pole: 'Marché & Acquisition', platform: 'Mistral', model: 'Mistral Large' }));

  // L1 Communication & Design (8)
  const commNames = ['Rédacteur content FR', 'Rédacteur content EN', 'Designer UI/UX', 'Vidéaste motion', 'Community manager', 'PR/Media', 'Traducteur AR/FR', 'Brand strategist'];
  commNames.forEach(n => addAgent({ name: n, layer: 'L1', pole: 'Communication & Design', platform: 'Claude', model: 'Claude Sonnet' }));

  // L1 Raqib collectors (10)
  const collectors = ['noos', 'aelya', 'myne', 'burhan', 'yrknown', 'diwane', 'alguesov', 'amana', 'cg', 'cercle'];
  collectors.forEach(n => addAgent({ name: `Collector ${n}`.toUpperCase(), layer: 'L1', pole: 'Raqib', platform: 'DeepSeek', model: 'DeepSeek R1', status: 'Actif' }));

  // L1 Viz (6)
  const vizNames = ['viz-charts', 'viz-maps', 'viz-tables', 'viz-networks', 'viz-timelines', 'viz-dashboards'];
  vizNames.forEach(n => addAgent({ name: n, layer: 'L1', pole: 'Viz', platform: 'Qwen', model: 'Qwen 2.5' }));

  // Réserve L1 (56) pour arriver à 120 (10+12+8+10+8+10+6=64, 120-64=56)
  for (let i = 0; i < 56; i++) {
    addAgent({ name: `Agent Réserve Alpha ${i+1}`, layer: 'L1', pole: 'Réserve', status: 'Inactif', platform: ['Claude', 'GPT', 'Gemini'][Math.floor(Math.random() * 3)] as AgentPlatform });
  }

  // L1.5 SUPER-AGENTS (40)
  const saTerms = ['FR', 'EN', 'AR', 'OHADA', 'UE', 'MA', 'Corridor'];
  saTerms.forEach((zone, i) => addAgent({ id: `SA${(i+1).toString().padStart(2, '0')}`, name: `Vérificateur terminologique ${zone}`, layer: 'L1.5', pole: 'Données & Conformité', status: 'En attente' }));
  
  const saFacts = ['santé', 'finance', 'juridique', 'tech', 'géo', 'marché', 'science'];
  saFacts.forEach((dom, i) => addAgent({ id: `SA${(i+8).toString().padStart(2, '0')}`, name: `Vérificateur factuel ${dom}`, layer: 'L1.5', pole: 'Données & Conformité' }));

  const saCode = ['Rust', 'TypeScript', 'Solidity', 'Python', 'React', 'SQL', 'infra', 'API', 'perf', 'sécu'];
  saCode.forEach((cod, i) => addAgent({ id: `SA${(i+15).toString().padStart(2, '0')}`, name: `Vérificateur code ${cod}`, layer: 'L1.5', pole: 'IA & Ingénierie' }));

  for(let i=1; i<=16; i++) {
    addAgent({ id: `SA${i+24}`, name: `QA Adversariale Unité ${i}`, layer: 'L1.5', pole: 'IA & Ingénierie' });
  }

  // L2 SUPERVISION (6)
  const l2Names = ['Superviseur NOOS', 'ÆLYA/MYNε', 'BURHAN/YrKnown', 'DIWANE/AlgueSov', 'CG/Cercle', 'AMANA'];
  l2Names.forEach(n => addAgent({ name: n, layer: 'L2', pole: 'Raqib', platform: 'Claude', model: 'Claude Opus 4.6', status: 'Actif' }));

  // L3 REPORTING (3)
  const l3Names = ['Planificateur', 'Reporter', 'Optimiseur'];
  l3Names.forEach(n => addAgent({ name: n, layer: 'L3', pole: 'Raqib', status: 'Actif' }));

  // L4 FONDATEUR (8)
  addAgent({ name: 'Mehdi (Fondateur)', layer: 'L4', pole: 'Raqib', status: 'Actif' });
  const l4Stagiaires = ['Rust', 'Psychométricien', 'Réglementaire', 'Chief of Staff', 'Data Science', 'Blockchain', 'Biotech'];
  l4Stagiaires.forEach(n => addAgent({ name: `Architecte Stagiaire ${n} (À recruter)`, layer: 'L4', pole: 'Réserve', status: 'Inactif' }));

  // OPS RAQIB (28)
  const opsNames = ['scaffold', 'data-extract', 'components', 'api-routes', 'assembly', 'qa', 'verif', 'supervisor-local', 'raqib-supervisor', 'eigen-collector', ...collectors.map(c => `${c}-collector`), ...vizNames.map(v => `${v}-gen`)];
  opsNames.forEach(n => addAgent({ 
    name: `ops-${n}`, layer: 'OPS', pole: 'Raqib', 
    status: Math.random() > 0.5 ? 'Actif' : 'En attente',
    platform: 'GPT', model: 'GPT-4o'
  }));

  // On complète OPS si on n'a pas 28. (10 + 10 collectors + 6 viz = 26). Plus 'raqib-supervisor', 'eigen-collector' = 28. Perfect.

  // Total should be exactly 237. Let's enforce it exactly.
  if (agents.length < 237) {
    const remaining = 237 - agents.length;
    for(let i=0; i<remaining; i++) addAgent({ name: `Agent Supplémentaire ${i}`, layer: 'L1', pole: 'Réserve' });
  }
  agents.splice(237); // truncate just in case

  return agents;
};

export const agentsData: Agent[] = generateMockData();
