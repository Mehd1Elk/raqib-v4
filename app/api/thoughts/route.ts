import { createClient } from '@/lib/supabase/server';

const entityKeywords: Record<string, string[]> = {
  noos: ['psychiatre', 'scid', 'kappa', 'scoring', 'diagnostic', 'patient', 'tdah', 'dépression'],
  aelya: ['consentement', 'consent', 'rgpd', 'privacy', 'zkp', 'anonymisation'],
  myne: ['données', 'marketplace', 'dataset', 'anonymisé', 'rémunération', 'producteur'],
  burhan: ['blockchain', 'hash', 'audit', 'polygon', 'smart contract', 'mica'],
  yrknown: ['savoir', 'tacite', 'artisan', 'griot', 'patrimoine', 'lora'],
  diwane: ['art', 'artiste', 'galerie', 'expertise', 'faux', 'lombard'],
  alguesov: ['algue', 'pêcheur', 'dakhla', 'traçabilité', 'onssa'],
  amana: ['don', 'charitable', 'ong', 'holmarcom', 'yza'],
  cg: ['investissement', 'gitex', 'londres', 'startup', 'cfc', 'deal'],
};

function routeThought(content: string) {
  const lower = content.toLowerCase();
  let bestEntity = 'eigen';
  let bestScore = 0;

  for (const [entity, keywords] of Object.entries(entityKeywords)) {
    const score = keywords.filter((k) => lower.includes(k)).length;
    if (score > bestScore) {
      bestScore = score;
      bestEntity = entity;
    }
  }

  return { entity: bestEntity, confidence: bestScore / 3 };
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { content } = body;

    if (!content || typeof content !== 'string') {
      return Response.json({ error: 'content is required' }, { status: 400 });
    }

    const routing = routeThought(content);

    const supabase = await createClient();
    const { data, error } = await supabase
      .from('captured_thoughts')
      .insert({
        content,
        routed_to_entity: routing.entity,
        status: routing.confidence > 0 ? 'routed' : 'captured',
      })
      .select()
      .single();

    if (error) throw error;

    return Response.json({ ...data, routing }, { status: 201 });
  } catch (e) {
    return Response.json({ error: 'Failed to capture thought' }, { status: 500 });
  }
}
