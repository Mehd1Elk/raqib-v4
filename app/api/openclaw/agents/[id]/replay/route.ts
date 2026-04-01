import { NextRequest, NextResponse } from 'next/server';
import { fetchFromBridge } from '@/lib/openclaw/config';
import { createClient } from '@supabase/supabase-js';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: agentId } = await params;

  const real = await fetchFromBridge(`/agents/${agentId}/replay`);
  if (real) return NextResponse.json({ source: 'openclaw', replay: real });

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  const { data: agent } = await supabase
    .from('agent_registry').select('*').eq('id', agentId).single();

  const name = agent?.name || agentId;
  const replay = {
    agentId,
    agentName: name,
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    duration: '34s',
    tokens: { input: 1847, output: 2103, total: 3950 },
    cost: { amount: 0.012, currency: 'USD' },
    prompt: `# SOUL — ${name}\n\nTu es ${name}, agent de l'écosystème EIGEN.\n\n## Mission\nProduire les livrables assignés pour la couche en cours.\n\n## Contexte\nEntité : ${agent?.entity || 'EIGEN'}\nCouche : ${agent?.layer || 'L1'}\nPlateforme : ${agent?.platform || 'Claude'}\n\n## Tâche actuelle\nAnalyser les données de la couche 47 et produire les entries manquantes.`,
    response: `## Analyse couche 47\n\nJ'ai identifié 12 entries manquantes dans la couche 47.\n\n### Entries produites\n\n1. Entry C47-001 : Mapping des flux de données internes\n2. Entry C47-002 : Analyse des dépendances cross-entités\n3. Entry C47-003 : Rapport de conformité pipeline\n\n### Métriques\n- Temps d'analyse : 12s\n- Sources consultées : 4\n- Confiance : 94%\n\n### Recommandations\nLa couche 48 nécessite une revue manuelle avant traitement automatisé.`,
    status: 'success',
  };

  return NextResponse.json({ source: 'simulated', replay });
}
