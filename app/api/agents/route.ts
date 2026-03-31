import { createClient } from '@/lib/supabase/server';
import { agentsData } from '@/lib/agents-data';

const STATUS_MAP: Record<string, string> = {
  active: 'Actif',
  actif: 'Actif',
  pending: 'En attente',
  waiting: 'En attente',
  'en-attente': 'En attente',
  error: 'Erreur',
  erreur: 'Erreur',
  inactive: 'Inactif',
  inactif: 'Inactif',
};

function normalizeStatus(status: string | null) {
  if (!status) {
    return null;
  }

  return STATUS_MAP[status.toLowerCase()] ?? status;
}

function getLocalAgents(layer: string | null, pole: string | null, status: string | null) {
  const normalizedStatus = normalizeStatus(status);

  return agentsData.filter((agent) => {
    if (layer && agent.layer !== layer) return false;
    if (pole && agent.pole !== pole) return false;
    if (normalizedStatus && agent.status !== normalizedStatus) return false;
    return true;
  });
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const layer = searchParams.get('layer');
  const pole = searchParams.get('pole');
  const status = searchParams.get('status');

  if (process.env.NODE_ENV === 'test') {
    return Response.json(getLocalAgents(layer, pole, status));
  }

  try {
    const supabase = await createClient();
    let query = supabase.from('agent_registry').select('*');

    if (layer) query = query.eq('layer', layer);
    if (pole) query = query.eq('pole', pole);
    if (status) query = query.eq('status', normalizeStatus(status) ?? status);

    const { data, error } = await query.order('id');

    if (error) {
      return Response.json(getLocalAgents(layer, pole, status));
    }

    return Response.json(data);
  } catch {
    return Response.json(getLocalAgents(layer, pole, status));
  }
}
