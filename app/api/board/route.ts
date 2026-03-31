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
    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': process.env.ANTHROPIC_API_KEY!,
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
      responses.push({
        agent_id: agent.id,
        agent_name: agent.name,
        content: data.content?.[0]?.text || 'Pas de réponse',
      });
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : 'Unknown error';
      responses.push({
        agent_id: agent.id,
        agent_name: agent.name,
        content: `Erreur : ${message}`,
      });
    }
  }

  // Persist to Supabase
  const supabase = await createClient();
  await supabase.from('board_meetings').insert({
    question,
    agents: selectedIds,
    responses,
  });

  return Response.json({
    question,
    responses,
    timestamp: new Date().toISOString(),
  });
}

export async function GET() {
  const supabase = await createClient();
  const { data, error } = await (supabase as any)
    .from('board_meetings')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(20);

  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json(data);
}
