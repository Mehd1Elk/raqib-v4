import { createClient } from './client';

export function subscribeToCohortMessages(
  discussionId: string,
  onMessage: (msg: Record<string, unknown>) => void
) {
  const supabase = createClient();

  const channel = supabase
    .channel(`discussion-${discussionId}`)
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'cohort_messages',
        filter: `discussion_id=eq.${discussionId}`,
      },
      (payload) => {
        onMessage(payload.new);
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}

export function subscribeToAgentComms(
  agentId: string,
  onComm: (comm: Record<string, unknown>) => void
) {
  const supabase = createClient();

  const channel = supabase
    .channel(`comms-${agentId}`)
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'agent_communications',
        filter: `to_agent=eq.${agentId}`,
      },
      (payload) => {
        onComm(payload.new);
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}
