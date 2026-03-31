export interface WormholeRule {
  target: string;
  type: 'consent' | 'audit' | 'data' | 'knowledge' | 'proof' | 'cert' | 'invest' | 'command';
  label: string;
  description: string;
  condition: (entry: any) => boolean;
  targetLayerPrefix?: string;
}

export const WORMHOLE_MATRIX: Record<string, WormholeRule[]> = {
  noos: [
    { target: 'aelya', type: 'consent', label: 'Consentement patient', description: 'ÆLYA vérifie le consentement avant chaque évaluation NOOS', condition: (e) => !!e.data?.nom, targetLayerPrefix: 'a0' },
    { target: 'burhan', type: 'audit', label: 'Audit diagnostic hashé', description: 'Chaque session SCID-5 est hashée en Tx 501 sur Polygon', condition: () => true, targetLayerPrefix: 'b0' },
    { target: 'myne', type: 'data', label: 'Données anonymisées', description: 'Les résultats anonymisés alimentent les datasets MYNε T1-T5', condition: () => true, targetLayerPrefix: 'm0' },
    { target: 'yrknown', type: 'knowledge', label: 'Savoir praticien', description: 'Le savoir du Pr. Bayle est encodé en agent LoRA dans YrKnown', condition: (e) => e.layer_id?.startsWith('n6'), targetLayerPrefix: 'y0' },
  ],
  aelya: [
    { target: 'noos', type: 'consent', label: 'Patient source', description: 'Le patient évalué par NOOS a consenti via ÆLYA', condition: () => true, targetLayerPrefix: 'n0' },
    { target: 'burhan', type: 'proof', label: 'Preuve consentement on-chain', description: 'Tx 502 (grant) ou 503 (revoke) ancrée sur Polygon', condition: () => true, targetLayerPrefix: 'b0' },
    { target: 'myne', type: 'consent', label: 'Vérification avant ingestion', description: 'MYNε vérifie le consentement ÆLYA avant toute ingestion de données', condition: () => true, targetLayerPrefix: 'm2' },
    { target: 'alguesov', type: 'consent', label: 'Consent pêcheur', description: 'Les pêcheurs Dakhla consentent via ÆLYA pour la traçabilité', condition: () => true, targetLayerPrefix: 's0' },
  ],
  myne: [
    { target: 'noos', type: 'data', label: 'Données psychiatrie', description: 'Premier dataset : dépression, TDAH, anxiété issues de NOOS', condition: () => true, targetLayerPrefix: 'n3' },
    { target: 'aelya', type: 'consent', label: 'Consent vérifié', description: 'Chaque ingestion vérifie le consentement ÆLYA du producteur', condition: () => true, targetLayerPrefix: 'a0' },
    { target: 'burhan', type: 'proof', label: 'Preuve anonymisation', description: 'Chaque transition T1→T5 est hashée en Tx 504. Vente = Tx 505', condition: () => true, targetLayerPrefix: 'b0' },
    { target: 'alguesov', type: 'data', label: 'Données algues', description: 'Deuxième vertical : données traçabilité algues Dakhla', condition: () => true, targetLayerPrefix: 's0' },
  ],
  burhan: [
    { target: 'noos', type: 'audit', label: 'Diagnostic hashé', description: 'Tx 501 : hash du résultat SCID-5 complet', condition: (e) => e.data?.type_transaction === '501' },
    { target: 'aelya', type: 'proof', label: 'Consent hashé', description: 'Tx 502/503 : preuve de consentement immuable', condition: (e) => ['502','503'].includes(e.data?.type_transaction) },
    { target: 'myne', type: 'proof', label: 'Anonymisation hashée', description: 'Tx 504 : preuve de processus + Tx 505 : traçabilité vente', condition: (e) => ['504','505'].includes(e.data?.type_transaction) },
    { target: 'diwane', type: 'cert', label: 'Certificat art', description: 'Tx 506 : certificat d\'authenticité DIWANE ancré on-chain', condition: (e) => e.data?.type_transaction === '506' },
    { target: 'alguesov', type: 'audit', label: 'Audit lot algues', description: 'Tx 506 : audit de traçabilité lot algues ONSSA', condition: (e) => e.data?.type_transaction === '506' },
    { target: 'amana', type: 'audit', label: 'Traçabilité don', description: 'Tx 506 : preuve de don charitable immuable', condition: (e) => e.data?.type_transaction === '506' },
  ],
  yrknown: [
    { target: 'noos', type: 'knowledge', label: 'Savoir clinique', description: 'Agents LoRA des praticiens seniors pour améliorer le scoring', condition: () => true },
    { target: 'diwane', type: 'knowledge', label: 'Savoir artisanal', description: 'Techniques des zelligeurs, potiers, tisserands pour l\'expertise', condition: () => true },
    { target: 'alguesov', type: 'knowledge', label: 'Techniques récolte', description: 'Savoir ancestral des pêcheurs pour la traçabilité', condition: () => true },
  ],
  diwane: [
    { target: 'burhan', type: 'cert', label: 'Certificat authenticité', description: 'CNN/ViT + LoRA → expertise → certificat hashé Tx 506', condition: () => true },
    { target: 'myne', type: 'data', label: 'Données marché art', description: 'Cotes, enchères, provenances alimentent le catalogue MYNε', condition: () => true },
    { target: 'yrknown', type: 'knowledge', label: 'Savoir artisanal', description: 'Techniques des maîtres encodées pour l\'expertise', condition: () => true },
  ],
  alguesov: [
    { target: 'aelya', type: 'consent', label: 'Consent pêcheur', description: 'Consentement granulaire des pêcheurs via ÆLYA', condition: () => true },
    { target: 'burhan', type: 'audit', label: 'Audit lot', description: 'Chaque lot tracé de la récolte à l\'export — Tx 501-506', condition: () => true },
    { target: 'myne', type: 'data', label: 'Données traçabilité', description: 'Espèces, volumes, zones, saisons dans le catalogue MYNε', condition: () => true },
  ],
  amana: [
    { target: 'burhan', type: 'audit', label: 'Traçabilité don', description: 'Chaque don tracé du donateur au bénéficiaire — Tx 506', condition: () => true },
    { target: 'eigen', type: 'invest', label: 'Porte Holmarcom', description: 'AMANA ouvre les portes d\'Holmarcom pour les 6 briques Eigen', condition: () => true },
  ],
  cg: [
    { target: 'eigen', type: 'invest', label: 'Investissement', description: 'CG SA investit dans les subsidiaires Eigen via le corridor', condition: () => true },
    { target: 'noos', type: 'invest', label: 'First check NOOS', description: 'Premier investissement cible de CG SA', condition: () => true },
  ],
  cercle: [
    { target: 'eigen', type: 'command', label: 'Écosystème', description: 'Le Cercle du Gazoduc coordonne l\'ensemble du corridor', condition: () => true },
  ],
  eigen: [
    { target: 'noos', type: 'command', label: 'Pilotage NOOS', description: 'Holding pilote la subsidiaire NOOS', condition: () => true },
    { target: 'aelya', type: 'command', label: 'Pilotage ÆLYA', description: 'Holding pilote la subsidiaire ÆLYA', condition: () => true },
    { target: 'myne', type: 'command', label: 'Pilotage MYNε', description: 'Holding pilote la subsidiaire MYNε', condition: () => true },
    { target: 'burhan', type: 'command', label: 'Pilotage BURHAN', description: 'Holding pilote la subsidiaire BURHAN', condition: () => true },
    { target: 'yrknown', type: 'command', label: 'Pilotage YrKnown', description: 'Holding pilote la subsidiaire YrKnown', condition: () => true },
  ],
};
