import { createClient } from '@/lib/supabase/server';

const BOARD_AGENTS = [
  {
    id: 'strategie',
    name: 'Directeur Stratégie',
    system:
      "Tu es le Directeur Stratégie d'Eigen Holding. Ton directif. Écosystème : 6 subsidiaires, CG SA, corridor 22 pays, runway 31 mois. Max 150 mots. Conclus par une recommandation.",
  },
  {
    id: 'finance',
    name: 'Directeur Finance',
    system:
      "Tu es le Directeur Finance d'Eigen. Parle en chiffres : valorisations, IRR, runway, burn rate. Cible €15-45M. Budget agents ~600-810€/mois. Max 150 mots.",
  },
  {
    id: 'juridique',
    name: 'Directeur Juridique',
    system:
      "Tu es le Directeur Juridique d'Eigen. Risques : AI Act, RGPD, MiCA, droit marocain SA, CFC. Prudent. Signale les risques avant les opportunités. Max 150 mots.",
  },
  {
    id: 'technique',
    name: 'Directeur Technique',
    system:
      "Tu es le CTO d'Eigen. Stack : Rust, TypeScript, React, 160+ agents, 9 plateformes, Supabase, Vercel, OpenClaw. Évalue les délais réalistes. Max 150 mots.",
  },
  {
    id: 'commercial',
    name: 'Directeur Commercial',
    system:
      "Tu es le Directeur Commercial d'Eigen. Marché : corridor 22 pays, 1000 cibles, GITEX, ATS London, VivaTech, Holmarcom. Orienté action. Max 150 mots.",
  },
];

const FALLBACK_RESPONSES: Record<string, string> = {
  strategie:
    "Priorité immédiate : concentrer la séquence d'exécution sur les actifs qui créent du signal commercial rapide. Il faut arbitrer les chantiers longs contre les démonstrateurs à fort levier. Recommandation : lancer un sprint de preuve de traction sur 30 jours.",
  finance:
    "Le dossier est soutenable si l'initiative reste bornée en coûts variables et reliée à un pipeline commercial mesurable. La discipline budgétaire doit primer sur la dispersion. Recommandation : valider un budget plafonné avec un point de contrôle hebdomadaire.",
  juridique:
    "Le principal enjeu n'est pas la vitesse mais la conformité en amont, surtout sur les flux de données, les engagements partenaires et la documentation des décisions. Recommandation : conditionner l'exécution à une revue express des risques réglementaires.",
  technique:
    "La faisabilité est bonne si l'on réduit le périmètre au noyau démontrable et qu'on évite les dépendances externes fragiles. Le risque majeur est l'intégration simultanée de trop de briques. Recommandation : livrer une version verticale courte avant d'élargir.",
  commercial:
    "L'opportunité est crédible si l'offre parle d'usage, de ROI et de délai d'activation plutôt que d'architecture interne. Il faut transformer la question en rendez-vous qualifiés. Recommandation : préparer un message simple et une liste priorisée de cibles.",
};

async function getBoardResponse(agent: (typeof BOARD_AGENTS)[number], question: string) {
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey || process.env.NODE_ENV === 'test') {
    return FALLBACK_RESPONSES[agent.id];
  }

  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 300,
        system: agent.system,
        messages: [{ role: 'user', content: question }],
      }),
    });
    const data = await res.json();
    return data.content?.[0]?.text || FALLBACK_RESPONSES[agent.id];
  } catch {
    return FALLBACK_RESPONSES[agent.id];
  }
}

export async function POST(request: Request) {
  const {
    question,
    agents: selectedIds = [
      'strategie',
      'finance',
      'juridique',
      'technique',
      'commercial',
    ],
  } = await request.json();

  if (!question) {
    return Response.json({ error: 'question is required' }, { status: 400 });
  }

  const selectedAgents = BOARD_AGENTS.filter((a) =>
    selectedIds.includes(a.id)
  );
  const responses: Array<{
    agent_id: string;
    agent_name: string;
    content: string;
  }> = [];

  for (const agent of selectedAgents) {
    responses.push({
      agent_id: agent.id,
      agent_name: agent.name,
      content: await getBoardResponse(agent, question),
    });
  }

  try {
    const supabase = await createClient();
    await supabase.from('board_meetings').insert({
      question,
      agents: selectedIds,
      responses,
    });
  } catch {
    // Keep the route functional even when Supabase is unavailable locally.
  }

  return Response.json({
    question,
    responses,
    timestamp: new Date().toISOString(),
  });
}

export async function GET() {
  try {
    const supabase = await createClient();
    const { data, error } = await (supabase as any)
      .from('board_meetings')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(20);

    if (error) return Response.json([]);
    return Response.json(data);
  } catch {
    return Response.json([]);
  }
}
